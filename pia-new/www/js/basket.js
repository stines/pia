var Basket = {
	data: {},
    content: [],
	
    initialize: function() {
        if (!Utils.exists(".shop")) return;

        console.log("Basket.initialize()");
        
        Basket.initializeData();

    	// Start listening for user input:
    	$.each(Basket.inputIds(), function(i, inputId) {
    		$("#" + inputId).keyup(function() { 
				Basket.updateData(inputId, $(this).val().trim());
    			Basket.validateInput(inputId);
			});
    	});
    	
    	/*
        $("#address").autocomplete({
			source: function(request, response) {
				$.ajax({
					url: "https://dawa.aws.dk/autocomplete",
					dataType: "jsonp",
					data: { type: "adresse", per_side: 50, q: request.term },
					success: function(data) {
						response($.map(data, function(item) { return item.tekst; }));
					}    
				});
			},
			minLength: 1
		});
		*/
		
    	Basket.initializeContent();
  		
  		Payment.initialize();
    	Delivery.initialize();
    	     
    	if (Utils.smallScreen()) {
    		$(window).on("resize scroll", function() {
    			Basket.handleP();
				if (Utils.inViewPort("#basket") && Utils.visible("#basket")) {
					Basket.showShopInBasketNav();
				} else {
					Basket.showBasketInBasketNav();
				}
			});
    	} else Basket.showBasketInBasketNav();
    	        
    	// Show basket?
        var matches = Utils.path().match(/\/butik(\/(kurv)*)*/);
        if (matches !== null) {
        	if (matches[2]) Basket.show(false, true); 
        	else Basket.hide(false, true);
        }
    },
    
    // Make the long P in Pia Olsen disappear/appear:
    handleP: function() {
    	$("#top").css("zIndex", Utils.inViewPort("#top .title") ? 101 : 95);
    },
    
    inputValidators: {
		"email": function(value) { return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value); },
		"name": function(value) { return /^\S+\s.+$/.test(value); },
		"company": function(value) { return true; },
		"address": function(value) { return /^\S+.*$/.test(value); },
		"phone": function(value) { return /^[0-9]{8}$/.test(value); },
		"message": function(value) { return true; }
	},
	
	inputIds: function() {
		return Object.getOwnPropertyNames(Basket.inputValidators);
	},
	
	initializeData: function() {
		console.log("Basket.initializeData()");
		
		// Populate basket data from cookie:
        try {
        	var data = Utils.readCookie("basket-data");
        	if (data) Basket.data = data;
        
        } catch (error) {
        	// Ignore...
        }
        
        // Fill basket data into corresponding input fields:
    	$.each(Basket.inputIds(), function(i, inputId) {
    		var val = Basket.data[inputId];
    		if (val) $("#" + inputId).val(val);
    	});
    	// Well, because it is the easiest, we let this method take care of the delivery and payment radio buttons as well
    	// even though it would be more correct to let Delivery and Payment take care of those: 
    	$.each(["delivery", "payment"], function(i, radioName) {
    		var val = Basket.data[radioName];
    		if (val) $("input[name=" + radioName + "]").val([val]);
    	});
    },
    	
    updateData: function(key, value) {
    	/*var logStart = "Basket.updateData(" + key + ","; 
    	if ($.type(value) === "object") console.log(logStart, value, ")");
    	else console.log(logStart + " '" + value + "')");*/
    	
		Basket.data[key] = value;
		Utils.writeCookie("basket-data", Basket.data);
	},	
	
	removeData: function(key) {
		console.log("Basket.removeData(" + key + ")");
		delete Basket.data[key];
		Utils.writeCookie("basket-data", Basket.data);
	},
	
	initializeContent: function() {
		console.log("Basket.initializeContent()");
		
        // Populate basket content from cookie:
        try {
        	Basket.content = Utils.readCookie("basket-content");
        	if (!Basket.content || !Basket.size()) Basket.content = [];
            else {
                for (var i = 0; i < Basket.size(); i++) {
                    if (Basket.key(i) === null || Basket.index(i) === null || Basket.amount(i) === null) {
                        Basket.content = [];
                        break;
                    }
                }
            }

        } catch (error) {
            Basket.content = [];
        }
        
        Basket.updatedContent();
    },
    
    updatedContent: function() {
    	console.log("Basket.updatedContent()");
    	
        // Save basket content to cookie:
        Utils.writeCookie("basket-content", Basket.content);

        // Display amount of items in basket in basket links:
        $(".basket-count").each(function() {
            $(this).html(Basket.size());
        });

		// Fill basket content into the basket form:
        var picturesTable = $("<table>").html("");
        for (var i = 0; i < Basket.size(); i++) {
            var key = Basket.key(i);
            var index = Basket.index(i);
            var amount = Basket.amount(i);
            var posterNames = Basket.posterNames(i);
            var frame = Basket.frame(i);
            console.log("Basket.updatedContent() - Basket[" + i + "]: { key: '" + key + "', index: " + index + ", amount: " + amount + ", frame: " + frame + (posterNames ? ", posterNames: '" + posterNames + "'" : "") + "}");
            var item = Groups.item(key, index);
                
            var thumbnailTag = $("<img>").addClass("link")
            .attr("src", item.basketImage ? item.basketImage : (item.images ? item.images[0] : item.image))
            .attr("title", Groups.basketTitle(key, index, false))
            .attr("onClick", "Groups.show(true, 'butik', '" + key + "', " + (item.basketImage ? -1 : 0) + ", false);");
                
            var titleTag = $("<a>")
            .attr("href", "javascript: Groups.show(true, 'butik', '" + key + "', " + (item.basketImage ? -1 : 0) + ", false);")
            .html(Groups.basketTitle(key, index, false));
            
            var increaseTag = $("<a>").addClass("increase")
            .attr("id", "increase-" + i)
            .attr("href", "javascript: Basket.addIfEnabled('increase-" + i + "', '" + key + "', " + index + ", " + amount + ", true, false" + (posterNames ? " , '" + posterNames + "'" : "") + ");")
            .html("x " + amount);
            var decreaseTag = $("<a>").addClass("decrease")
            .attr("href", "javascript: Basket.remove('" + key + "', " + index + ", 0, true, false" + (posterNames ? " , '" + posterNames + "'" : "") + ");")
            .html($("<img>").attr("src", "/www/images/remove.png"));

            var pictureRow = $("<tr>").addClass("picture")
            .html($("<td>").addClass("thumbnail").html(thumbnailTag))
            .append($("<td>").addClass("title").html(titleTag)
            			.append(posterNames ? $("<div>").addClass("poster-names").html("(" + (amount == 1 ? "Navn: " : "Navne: ") + posterNames + ")") : ""))
            .append($("<td>").addClass("amount").html(Groups.printed(key, index) ? increaseTag : ""))
            .append($("<td>").addClass("decrease").html(decreaseTag))
            .append($("<td>").addClass("price").html(Utils.displayPrice(Basket.pricePerItem(item, amount))));
            
            picturesTable.append(pictureRow);
            
            // Frame stuff:
            if (item.frame) {
            	var framePrice = Basket.pricePerItemFrame(item, amount, frame);
            	var frameRow = $("<tr>").addClass("picture_frame")
            		.html($("<td>"))
            		.append($("<td>").addClass("frame").html($("<label>")
            			.html($("<input>").attr("type", "checkbox").attr("onChange", "Basket.toggleFrame('" + key + "', " + index + ");").prop("checked", frame))
            			.append($("<div>").html("Ramme"))))
            		.append($("<td>"))
            		.append($("<td>"))
            		.append($("<td>").addClass("price").html(framePrice > 0 ? Utils.displayPrice(framePrice) : ""));
            	picturesTable.append(frameRow);
            }
        }
        $("#pictures").html(Basket.size() > 0 ? picturesTable : "");
        
        Delivery.handlePickUpOnly();
        Delivery.handleSnailMail();
        Delivery.showPrice();
	        
	    Basket.showTotalPrice();
    },

	addIfEnabled: function(linkId, key, index, amount, checkAmount, notify, posterNames) {
		if (Utils.linkEnabled($("#" + linkId))) {
			Basket.add(key, index, amount, checkAmount, notify, posterNames);
		}
	},

    add: function(key, index, amount, checkAmount, notify, posterNames) {
    	Basket.hideErrors();
    
        if (checkAmount && Groups.printed(key, index)) {
        	Dialogs.open(Basket.addRemoveText(key, index, amount, posterNames), [
				 Dialogs.button("Fint",
								function() {
									amount = parseInt($("#amount").val());
									var parsedPosterNames;
									if (key === "navneplakater") {
										parsedPosterNames = Basket.parsePosterNames($("#poster-names").val());
										posterNames = parsedPosterNames.join(", ");
									}
									if (isNaN(amount)) Basket.add(key, index, $("#amount").val(), true, notify, posterNames);
									else if (amount <= 0) Basket.remove(key, index, 0, false, true);
									else Basket.add(key, index, amount, key === "navneplakater" && parsedPosterNames.length !== amount, notify, posterNames);
								}
				 ),
				 Dialogs.button("Fortryd")
            ]);

        } else {
            History.statistics(Utils.path(), "Added " + amount + " x " + Groups.basketTitle(key, index, false) + " to basket");
            if (Basket.contains(key, index)) {
            	var basketItem = Basket.get(key, index);
            	basketItem.amount = amount;
            	if (key === "navneplakater") basketItem.posterNames = posterNames;
            
            } else { 
                var item = Groups.item(key, index);
                var basketItem = { key: item.key, index: item.index, amount: amount, frame: true };
                if (key === "navneplakater") basketItem.posterNames = posterNames;
            	Basket.content.push(basketItem);
            }
            
            Basket.updatedContent();
            Basket.status(key, index);
        
            if (notify) Dialogs.open("Indkøbskurven indeholder nu " + Groups.basketTitle(key, index, true) + (Groups.printed(key, index) ? " x " + amount : "") + ".");
        }
    },
    
    remove: function(key, index, amount, checkAmount, confirmed, posterNames) {
    	Basket.hideErrors();
    
        if (checkAmount && Groups.printed(key, index)) {
            Dialogs.open(Basket.addRemoveText(key, index, amount, posterNames), [
				 Dialogs.button("Fint",
								function() {
									amount = parseInt($("#amount").val());
									var parsedPosterNames;
									if (key === "navneplakater") {
										parsedPosterNames = Basket.parsePosterNames($("#poster-names").val());
										posterNames = parsedPosterNames.join(", ");
									}
									if (isNaN(amount)) Basket.remove(key, index, $("#amount").val(), true, true, posterNames);
									else if (amount <= 0) Basket.remove(key, index, 0, false, true);
									else if (key === "navneplakater" && parsedPosterNames.length !== amount) Basket.remove(key, index, amount, true, true, posterNames);
									else Basket.add(key, index, amount, false, false, posterNames);
								}
				 ),
				 Dialogs.button("Fortryd")
            ]);

        } else if (confirmed) {
            // Remove item from basket:
            var content = [];
            for (var i = 0; i < Basket.size(); i++) {
                if (Basket.key(i) === key && Basket.index(i) === index) {
                	History.statistics(Utils.path(), "Removed " + Basket.amount(i) + " x " + Groups.basketTitle(key, index, false) + " from basket");
                } else content.push(Basket.content[i]);
            }
            Basket.content = content;

            if (Basket.isEmpty()) Basket.clear();
            else Basket.updatedContent();
            
        } else {
            Dialogs.open("Vil du fjerne " + Groups.basketTitle(key, index, true) + " fra indkøbskurven?", [
            	Dialogs.button("Fint", function() {
                	Basket.remove(key, index, 0, false, true);
                }),
                Dialogs.button("Fortryd")
            ]);
        }
    },
    
    addRemoveText: function(key, index, amount, posterNames) {
    	var text = "Hvor mange eksemplarer af " + Groups.basketTitle(key, index, true) + " ønsker du i indkøbskurven? " 
            	 + "<input id='amount' class='dialog-input-center' type='text' value='" + amount + "'/>";
        if (key === "navneplakater") {
        	text += "Angiv et navn til hver plakat (separér med komma): " 
            	 + "<input id='poster-names' class='dialog-input' type='text'" + (posterNames ? " value='" + posterNames + "'" : "") + "/>";
        }
        return text; 
    },
    
    parsePosterNames: function(posterNames) {
    	var parsedPosterNames = [];
		$.each(posterNames.split(","), function(i, name) {
			name = name.trim();
			if (name !== "") parsedPosterNames.push(name);
		});
		return parsedPosterNames;
    },
    
    clear: function() {
    	Basket.content = [];
        Basket.updatedContent();
        Basket.hide(true, false);
    },
    
    size: function() {
        return Basket.content.length;
    },

    isEmpty: function() {
        return Basket.size() == 0;
    },
	 
	snailmailsOnly: function() {
    	var snailmails = 0;
    	var other = 0;
        for (var i = 0; i < Basket.size(); i++) {
            var item = Groups.item(Basket.key(i), Basket.index(i));
            var amount = Basket.amount(i);
            if (item.snailmail) {
            	snailmails += amount;
            } else {
            	other += amount;
            }
        }
        return snailmails > 0 && other == 0;
    },
    
    snailmailsCount: function() {
    	var snailmails = 0;
        for (var i = 0; i < Basket.size(); i++) {
            var item = Groups.item(Basket.key(i), Basket.index(i));
            if (item.snailmail) {
            	snailmails += Basket.amount(i);
            } 
        }
        return snailmails;
    },
    
    price: function() {
        var price = 0;
        for (var i = 0; i < Basket.size(); i++) {
            var item = Groups.item(Basket.key(i), Basket.index(i));
            var amount = Basket.amount(i);
            var frame = Basket.frame(i);
            price += 
              	Basket.pricePerItem(item, amount) +
              	Basket.pricePerItemFrame(item, amount, frame);
        }
        return price;
    },
    
     pricePerItem: function(item, amount) {
		if (item.prices) {
    	  for (var j = 0; j < item.prices.length; j++) {
            if (j == item.prices.length - 1 || amount < item.prices[j + 1].amount) {
              return Math.round(((amount * item.prices[j].price / item.prices[j].amount) + Number.EPSILON) * 100) / 100;
            }
          }
        } else {
          	return amount * (item.frame ? item.priceNoFrame : item.price);
        }
	},
	
	pricePerItemFrame: function(item, amount, frame) {
		return item.frame ? (amount * (frame ? (item.price - item.priceNoFrame) : 0)) : 0;
	},
    
    totalPrice: function() {
    	return Delivery.price() + Basket.price();
    },
    
    showTotalPrice: function() {
    	$("#total div").html(Basket.totalPrice() + " kr.");
    },
    
    pickUpOnly: function() {
        var pickup = false;
        for (var i = 0; i < Basket.size(); i++) {
            var item = Groups.item(Basket.key(i), Basket.index(i));
            if (typeof item.pickup !== "undefined" && item.pickup) pickup = true;
            else {
            	var frame = Basket.frame(i);
            	if (typeof item.pickupIfFrame !== "undefined" && item.pickupIfFrame && frame) pickup = true;
            }
        }
        return pickup;
    },
    
    toggle: function() {
    	var inViewPort = Utils.inViewPort("#basket");
    	var visible = Utils.visible("#basket");
    	if (inViewPort && visible) {
    		console.log("Basket.toggle() -> Basket.hide(true, false)");
    		Basket.hide(true, false);
    	} else if (!inViewPort && visible) {
    		console.log("Basket.toggle() -> Utils.scrollToTop()");
    		if (Utils.smallScreen()) Basket.showShopInBasketNav();
    		Utils.scrollToTop();
    	} else {
    		console.log("Basket.toggle() -> Basket.show(true, false)");
    		Basket.show(true, false);
    	}
    },
        
    show: function(addHistory, entering) {
        console.log("Basket.show(" + addHistory + ", " + entering + ")");

		// Hide any popup boxes:
		Dialogs.close();
		
        // Empty?
        if (Basket.isEmpty()) {
            if (addHistory) {
                History.statistics("/butik/kurv");
                History.statistics("/butik");
            } else {
                History.modify("/butik");
            }

            return Dialogs.open("Indkøbskurven er tom. Du lægger noget i kurven ved at trykke BESTIL under et billede, når du bevæger dig rundt i billedkategorierne.");
        }

        // Manipulate address line:
        if (addHistory) History.add("/butik/kurv");

        // Scroll to top:
        Utils.scrollToTop(entering);

		// Hide any input validation errors:
		Basket.hideErrors();
		
		// Ensure that the basket is open for editing:
		Basket.toggleEditable(true);
				
        // Hide other opened group if any:
        Groups.hide(entering);

        // Handle basket link:
        if (Utils.smallScreen()) Basket.showShopInBasketNav();
        else $("#basket-nav").hide();

        // Reveal basket:
        Utils.fadeIn($("#basket"));
    },

    hide: function(addHistory, entering) {
    	console.log("Basket.hide(" + addHistory + ", " + entering + ")");
    
        if (addHistory) History.add("/butik");      
        
        $("#basket").hide();
        
        Utils.scrollToTop(entering);
		
        if (Utils.smallScreen()) Basket.showBasketInBasketNav();
        else $("#basket-nav").show();
    },
    
    showShopInBasketNav: function() {
		$("#basket-nav a:first-of-type").html("x");
    },

    showBasketInBasketNav: function() {
		$("#basket-nav a:first-of-type")
			.html("Kurv (<span class='basket-count'>" + Basket.size() + "</span>)");
    },
    
	toggleEditable: function(editable) {
		Utils.toggleEnabledInput("#personal .basket-form-input", editable);
        Utils.toggleVisibility("a.decrease", editable);
        Utils.toggleEnabledLink("a.increase", editable)
        
        Delivery.toggleEditable(editable);
        Payment.toggleEditable(editable);
        	 
    	if (typeof editable !== "undefined" && editable) {
    		$("#payment-buttons-container").hide(0);
    		$("#validate-button-container").show(0);
    		
    	} else {
        	$("#validate-button-container, #payment-buttons-container").toggle(0);
        }
	},   
	
	status: function(key, index, element) {
        if (!element) element = $("#basket_" + key + "_" + index);
        
        return element.html(
                Basket.contains(key, index) ?
                $("<a>").addClass("in-basket").attr("href", "javascript: Basket.show(true, false);").html("Kurv (<span class='basket-count'>" + Basket.size() + "</span>)") :
                $("<a>").addClass("add-to-basket").attr("href", "javascript: Basket.add('" + key + "', " + index + ", 1, true, true);").html("Bestil &#187;")
        );
    }, 

	key: function(index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.key : null;
    },

    index: function(index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.index : null;
    },

    amount: function(index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.amount : null;
    },    
    
    posterNames: function(index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.posterNames : null;
    },

    frame: function(index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.frame : false;
    },
    
    toggleFrame: function(key, index) {
    	var basketItem = Basket.get(key, index);
        basketItem.frame = !basketItem.frame;
        History.statistics(Utils.path(), "Changed frame for " + Groups.basketTitle(key, index, false) + " to " + basketItem.frame);    
        Basket.updatedContent();    
    },

    contains: function(key, index) {
        return Basket.get(key, index) !== null;
    },

    get: function(key, index) {
    	var item = Groups.item(key, index);
        for (var i = 0; i < Basket.size(); i++) {
	        if (Basket.key(i) === item.key && Basket.index(i) === item.index) return Basket.content[i];
 		}
        return null;
    },

	validate: function() {
		Dialogs.wait("Behandles, øjeblik...");
		
		Basket.hideErrors();
		
		var errors = false;
		
		$.each(Basket.inputIds(), function(i, inputId) {
			if (!Basket.validateInput(inputId)) {
				Basket.showError("error-" + inputId);
        		$("#" + inputId).addClass("error");
        		errors = true;
   			}
		});
        
        // Delivery:
        errors = Delivery.validate(errors);
        
        if (!errors) Basket.toggleEditable(false);
        
        Dialogs.close();
        
        if (errors) {
        	Utils.scrollToTop(false);
        	Basket.showErrors();
        } else {
        	if (Payment.paypalChosen()) {
        		Dialogs.open("De oplysninger, du har angivet, ser ud til at være i orden.<br/><br/><b><i>Tryk på den blå PayPal-knap, når du er klar til at betale og afgive bestillingen.</i></b><br/><br/>Hvis der er noget, du ønsker at rette, så tryk på linket 'Ret din bestilling' under PayPal-knappen.");
        	} else {
        		Dialogs.open("De oplysninger, du har angivet, ser ud til at være i orden.<br/><br/><b><i>Tryk på BESTIL-knappen, når du er klar til at afgive bestillingen.</i></b><br/><br/>Hvis der er noget, du ønsker at rette, så tryk på linket 'Ret din bestilling' under BESTIL-knappen.");
        	}
        }
	},

	validateInput: function(inputId) {
		var value = Basket.data[inputId];
		if (typeof value === "undefined") value = "";
	    if (Basket.inputValidators[inputId](value)) {
    		Basket.fixError("error-" + inputId);
    		$("#" + inputId).removeClass("error");
    		return true;
    	} 
    	return false;
	},
	
	showErrors: function() {
		$("#errors").show(0);
	},
	
	hideErrors: function() {
		$("#errors, .error-entry").hide(0);
		$("#email, #name, #address, #phone, #message, #gls-shops-link").removeClass("error");
	},
	
	showError: function(error) {
		$("#" + error).removeClass("error-entry-fixed").addClass("error-entry-fix").show(0);
	},
	
	fixError: function(error) {
		$("#" + error).removeClass("error-entry-fix").addClass("error-entry-fixed");
	},
	
	submit: function() {
		Dialogs.wait("Behandles, øjeblik...");
		
        Basket.submitAfterPayment();
	},
	
    submitAfterPayment: function(paymentId) {
		var submit = [];
        for (var i = 0; i < Basket.size(); i++) {
        	var key = Basket.key(i);
        	var amount = Basket.amount(i);
        	var posterNames = Basket.posterNames(i);
        	var item = Groups.item(key, Basket.index(i));
         	submit.push({
				image: item.images ? item.images[0] : item.image,
				title: Groups.basketTitle(key, Basket.index(i), false),
				amount: amount,
				posterNames: posterNames,
				frameItem: item.frame,
				frame: Basket.frame(i)
            });
        }
		
		var body = {
			check: true,
			pictures: submit,
			email: Basket.data.email,
			name: Basket.data.name,
			address: Basket.data.address,
			phone: Basket.data.phone,
			delivery: Basket.data.delivery,
			payment: Basket.data.payment,
			price: Basket.totalPrice()
        };
        
        if (paymentId) body.paymentId = paymentId;
        if (Basket.data.company) body.company = Basket.data.company;
        if (Basket.data.message) body.message = Basket.data.message;
        if (Basket.data.glsShop) body.glsShop = Basket.data.glsShop.text;
        
        // Submit:
        $.ajax({
			type: "POST",
			url: "/order?sid=" + Math.random(),
			processData: false,
			contentType: "application/json",
			data: JSON.stringify(body),
			success: function() {
				Basket.clear();
				Dialogs.open("Tak, Pia vender snart tilbage til dig!");
			}
        });
    }
};
