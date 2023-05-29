var Delivery = {
	initialize: function() {	
		console.log("Delivery.initialize()");
	
		// Start listening for user input:
		$("input[name=delivery]").change(function() {
			if (!$(this).is(":checked")) return; // To avoid executing statements for both the checked and the unchecked radio button
			Basket.updateData($(this).attr("name"), $(this).val());
			Delivery.showPrice();
			Delivery.validateGlsShop();
  		});
  		
		Delivery.showGlsShop();
		
		if (!Delivery.chosen() || (Delivery.snailMailChosen() && !Basket.snailmailsOnly())) Delivery.choosePickUp();
		else Delivery.showPrice();
	},
	
	showGlsShop: function() {
	 	if (Basket.data.glsShop) {
	 		$("#gls-shops-link").removeClass("error")
	 		    .html(Basket.data.glsShop.companyName + ", " + Basket.data.glsShop.streetName);
        }
	},
	
	toggleEditable: function(editable) {
	    Utils.toggleEnabledInput("#delivery .basket-form-input", editable);
        Utils.toggleEnabledLink("#gls-shops-link", editable);
        if (!Delivery.pickupChosen()) Utils.toggleOpaqueness(".delivery-pickup", editable);
        if (!Delivery.glsChosen()) Utils.toggleOpaqueness(".delivery-gls", editable);
        if (!Delivery.snailMailChosen()) Utils.toggleOpaqueness(".delivery-snailmail", editable);
	},
	
	removeGls: function(remove) {
        Utils.toggleEnabledInput("#delivery-gls", !remove);
        Utils.toggleEnabledLink("#gls-shops-link", !remove)
        Utils.toggleOpaqueness(".delivery-gls", !remove);
        
        if (remove) $("#pickup-footnote-stars, #pickup-footnote").show(0);
        else $("#pickup-footnote-stars, #pickup-footnote").hide(0);
	},
	
	removeSnailMail: function(remove) {
        Utils.toggleEnabledInput("#delivery-snailmail", !remove);
        Utils.toggleOpaqueness(".delivery-snailmail", !remove);
        
        //if (remove) $("#snailmail-footnote-stars, #snailmail-footnote").show(0);
        //else $("#snailmail-footnote-stars, #snailmail-footnote").hide(0);
	},
	
	choice: function() {
		return $("input[name=delivery]:checked").val();
	},
	
	choosePickUp: function() {
		console.log("Delivery.choosePickUp()");
		$("input[name=delivery]").val(["pickup"]).trigger("change");
	},
	
	chooseSnailMail: function() {	
		console.log("Delivery.chooseSnailMail()");
		$("input[name=delivery]").val(["snailmail"]).trigger("change");
	},
	
	chooseGls: function() {	
		console.log("Delivery.chooseGls()");
		$("input[name=delivery]").val(["gls"]).trigger("change");
	},
	
	chosen: function() {
		return typeof Delivery.choice() !== "undefined";
	},
	
	pickupChosen: function() {
		return Delivery.choice() === "pickup";
	},
	
	snailMailChosen: function() {
		return Delivery.choice() === "snailmail";
	},
	
	snailMailPrice: function() {
		var snailmailCount = Basket.snailmailsCount();
		return 12 * Math.ceil(snailmailCount / 3);
	},
	
	glsChosen: function() {
		return Delivery.choice() === "gls";
	},
	
	glsPrice: 49,
	
	price: function() {
		if (Delivery.glsChosen()) {
			return Delivery.glsPrice;
		} 
		if (Delivery.snailMailChosen()) {
			return Delivery.snailMailPrice();
		}
		return 0;
	},
	
	showPrice: function() {
		$(".delivery-gls .price").html(Delivery.glsChosen() ? Delivery.glsPrice + " kr." : "");
    	$(".delivery-pickup .price").html(Delivery.pickupChosen() ? "0 kr." : "");
    	$(".delivery-snailmail .price").html(Delivery.snailMailChosen() ? Delivery.snailMailPrice() + " kr." : "");
    	Basket.showTotalPrice();
    },
    
    handlePickUpOnly: function() {
    	var pickUpOnly = Basket.pickUpOnly();
    	var glsSelector = ".delivery-gls, .delivery-gls a, .delivery-gls input";
    	if (pickUpOnly) {
    		$(glsSelector).addClass("removed");
    		if (Delivery.glsChosen()) Delivery.choosePickUp();
    		
    	} else {
    		$(glsSelector).removeClass("removed");
    	}
    	Delivery.removeGls(pickUpOnly);
    },
    
    handleSnailMail: function() {
    	var noSnailMail = Basket.pickUpOnly() || !Basket.snailmailsOnly();
    	var snailMailSelector = ".delivery-snailmail, .delivery-snailmail input";
    	if (noSnailMail) {
    		$(snailMailSelector).addClass("removed");
    		if (Delivery.snailMailChosen()) Delivery.choosePickUp();
    		
    	} else {
    		$(snailMailSelector).removeClass("removed");
    	}
    	Delivery.removeSnailMail(noSnailMail);
    },
	
	pickGlsShop: function(zipCode) {
		if (!Utils.linkEnabled($("#gls-shops-link"))) return;
		
		if (zipCode) {
			Basket.updateData("zipCode", zipCode);
			$.ajax({
				type: "GET",
				url: "https://www.gls.dk/webservices_v4/wsShopFinder.asmx/GetParcelShopsInZipcode?zipcode=" + zipCode + "&countryIso3166A2=DK",
				dataType: "xml",
				async: false,
				context: this,
				success: function(response) {
					var shops = {};
					var html = "";
					var i = 0;
					$(response).find("PakkeshopData").each(function() {
						var shop = { 
							number: $(this).find("Number").text(), 
							companyName: $(this).find("CompanyName").text(), 
							streetName: $(this).find("Streetname").text(),
							streetname2: $(this).find("Streetname2").text(), 
							zipCode: $(this).find("ZipCode").text(), 
							cityName: $(this).find("CityName").text()
						};
						shop.text = shop.companyName + ", " + shop.streetName + " (GLS-" + shop.number + ")"; 
						shops[shop.number] = shop;
						var checked = (i === 0) || (Basket.data.glsShop ? Basket.data.glsShop.number === shop.number : false);
						html += "<div class=\"gls-shop\">"
							+ "  <input id=\"gls-" + shop.number + "\" type=\"radio\" name=\"gls-id\" value=\"" + shop.number + "\"" + (checked ? " checked" : "") + "/>"
						    + "  <label for=\"gls-" + shop.number + "\">"
						    + "    <div class=\"gls-shop-info\">"
						    + "      <div class=\"company-name\">" + shop.companyName + "</div>"
							+ "      <div class=\"street-name\">" + shop.streetName + "</div>"
							+ "      <div class=\"city\">" + shop.zipCode + " " + shop.cityName + "</div>"
							+ "      <div class=\"gls-id\">" + "GLS-" + shop.number + "</div>"
							+ "    </div>"
							+ "  </label>"
							+ "</div>";
						i++;
					});
					
					if (i === 0) {
						Basket.removeData("zipCode");
						Delivery.pickGlsShop();
						
					} else {
						Dialogs.openLarge(html, [
						 	Dialogs.button("Vælg", function () {
								Basket.updateData("glsShop", shops[$("input[name=gls-id]:checked").val()]);
								Delivery.validateGlsShop();
								Delivery.showGlsShop();
							}),
							Dialogs.button("Fortryd")
						]);
					}
				},
				error: function () {
					Dialogs.open("Beklager, listen af GLS pakkeshops kan åbenbart ikke hentes lige nu.");
				}
			});
			
		} else {
			Delivery.chooseGls();
		
			Dialogs.open("Postnummer? <input id=\"zipcode\" class=\"dialog-input-center\" type=\"text\"" + (Basket.data.zipCode ? " value=\"" + Basket.data.zipCode + "\"" : "") + "/>",
				[
					Dialogs.button("Søg", function () {
					   var zipCode = $("#zipcode").val().trim();
					   if (/^[0-9]{4}$/.test(zipCode)) Delivery.pickGlsShop(zipCode);
					   else {
						   Basket.removeData("zipCode");
						   Delivery.pickGlsShop();
					   }
					}),
					Dialogs.button("Fortryd", function() {
						if (!Basket.data.zipCode && Basket.data.glsShop) {
							Basket.updateData("zipCode", Basket.data.glsShop.zipCode);
						}
					})
				]
			);         
        }
	},
	
	validate: function(errors) {
		if (!Delivery.validateGlsShop()) {
			Basket.showError("error-gls");
        	$("#gls-shops-link").addClass("error");
        	return true;
   		}
   		
   		return errors;
	},
	
	validateGlsShop: function() {
		if (Delivery.pickupChosen() || Delivery.snailMailChosen() || Basket.data.glsShop) {
			Basket.fixError("error-gls");
    		$("#gls-shops-link").removeClass("error");
    		return true;
    	} 
    	return false;
	}
};