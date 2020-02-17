var Groups = {
    groups: {},

    matches: function() {
        var matches = Utils.path().match(/\/butik\/kurv/);
        if (matches === null) matches = Utils.path().match(/\/(opgaver|butik)(\/([a-z0-9\-]*))*/);
        return matches;
    },

    scope: function() {
        var matches = this.matches();
        return matches !== null ? matches[1] : null;
    },

    key: function() {
        var matches = this.matches();
        return matches !== null ? matches[3] : null;
    },

    initialize: function() {
        var scope = this.scope();
        var key = this.key();
        if (scope && key) Groups.show(false, scope, key, -1, true); else Groups.hide(true);
    },

    show: function(addHistory, scope, key, index, entering) {
        console.log("Groups.show(" + addHistory + ", '" + scope + "', '" + key + "', " + index + ", " + entering + ")");

        // Hide basket:
        Basket.hide(false, entering);

        // Find group to display:
        var group = Groups.group(key);
        if (group === null) return;

        // Manipulate address line:
        if (addHistory) History.add("/" + scope + "/" + key);

        // Generate group HTML:
        var html = $("<div>");
        if (group.teaser) html.append($("<div>").addClass("teaser").html($("<img>").attr("src", group.teaser)));
        if (group.text) html.append($("<div>").addClass("text").html(group.text));
        for (var i = 0; i < group.items.length; i++) {
            var item = Groups.item(key, i);
            
            var itemHtml = $("<div>").addClass("item").attr("id", key + "_" + i).html($("<img>").attr("src", item.image));

            if (item.text) itemHtml.append($("<div>").addClass("text").html(item.text));
            if ((group.showTitles === null || group.showTitles) && item.title) itemHtml.append($("<div>").addClass("title").html(item.title));

 			if (item.text2) itemHtml.append($("<div>").addClass("text").html(item.text2));
           
            var dot = $("<span>").addClass("dot").html("&nbsp;&nbsp;&middot;&nbsp;&nbsp");
            if (item.size) {
                var size = typeof item.size !== 'object' ? item.size : Utils.displayNumber(item.size.height) + " x " + Utils.displayNumber(item.size.width) + " cm";
                if (item.sizeText) size += " " + item.sizeText;
                if (item.price && !item.priceNoFrame) {
                    sizePrice = $("<div>").addClass("size-price").html(size).append(dot).append(Utils.displayPrice(item.price));
                    if (item.priceText) sizePrice.append(" " + item.priceText);
                    itemHtml.append(sizePrice);
                 } else {
                    itemHtml.append($("<div>").addClass("size").html(size));
                }
            }
            if (item.price && (!item.size || item.priceNoFrame)) {
                var price = $("<div>").addClass("price");
                if (item.priceNoFrame) {
                    price.append($("<div>").html("Med ramme: " + Utils.displayPrice(item.price))).append(dot).append($("<div>").html("Uden ramme: " + Utils.displayPrice(item.priceNoFrame)));
                } else {
                    price.html(Utils.displayPrice(item.price));
                    if (item.priceText) price.append(" " + item.priceText);
                }
                itemHtml.append(price);
            }
            
            if (item.text3) itemHtml.append($("<div>").addClass("text").html(item.text3));

            if (item.price) {
                if (item.sold) itemHtml.append($("<div>").addClass("sold").html(item.soldText ? item.soldText : "Solgt"));
                else itemHtml.append(Basket.status(key, i, $("<div>").addClass("basket-status").attr("id", "basket_" + key + "_" + i)));
            }
            
            html.append(itemHtml);
            
            if (item.newline) html.append("<br>");
        }
        var explore = $("#explore").html(html.html());

        // Show "more" text:
        $("#middle").show();

        // Should items float?
        if (group.float === null || group.float) explore.addClass("float"); else explore.removeClass("float");

        // Reveal explore area:
        Utils.fadeIn(explore, function() {
            if (index >= 0) Utils.scrollTo($("#" + key + "_" + index).offset().top);
        });
    },

    hide: function(entering) {
        console.log("Groups.hide(" + entering + ")");

        // Scroll to top:
        Utils.scrollToTop(entering);

        // Hide explore layers:
        $("#explore").hide();
        $("#middle").hide();
    },
    
    group: function(key) {
        return key ? Groups.groups[key.replace(/\-/g, '_')] : null;
    },
    
    item: function(key, index) {
      var group = Groups.group(key);
      var item = group.items[index];
      item.key = key;
      item.index = index;
      return item.parent ? Groups.item(item.parent.key, item.parent.index) : item;
    },
    
    basketTitle: function(key, index, emph) {
        var item = Groups.item(key, index);
        var title = item.basketTitle ? item.basketTitle : (item.title ? item.title : null);
        if (title) return emph ? "<b>" + title + "</b>" : title;
        return "billede";
    },
    
    printed: function(key, index) {
        var item = Groups.item(key, index);
        return item.printed === true;
    }
};

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
        
        Payment.initialize();
    	Delivery.initialize();
    	
    	Basket.initializeContent();

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
            .attr("src", item.image)
            .attr("title", Groups.basketTitle(key, index, false))
            .attr("onClick", "Groups.show(true, 'butik', '" + key + "', " + index + ", false);");
                
            var titleTag = $("<a>")
            .attr("href", "javascript: Groups.show(true, 'butik', '" + key + "', " + index + ", false);")
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
            .append($("<td>").addClass("price").html((amount * item.price) + " kr."));
            
            picturesTable.append(pictureRow);
        }
        $("#pictures").html(Basket.size() > 0 ? picturesTable : "");
        
        Delivery.handlePickUpOnly();
	        
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

    price: function() {
        var price = 0;
        for (var i = 0; i < Basket.size(); i++) {
            var item = Groups.item(Basket.key(i), Basket.index(i));
            var amount = Basket.amount(i);
            var frame = Basket.frame(i);
            price += amount * (frame ? item.price : item.priceNoFrame);
        }
        return price;
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
    
    updateFrame: function(key, index, frame) {
        History.statistics(Utils.path(), "Changed frame for " + Groups.basketTitle(key, index, false) + " to " + frame);
        Basket.get(key, index).frame = frame;
        Basket.updatedContent();
        Basket.status(key, index);
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
		Dialogs.wait("Behandles...");
		
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
        		Dialogs.open("De angivne oplysninger er i orden.<br/><br/><b><i>Tryk på den blå PayPal-knap, når du er klar til at betale og afgive bestillingen.</i></b><br/><br/>Hvis der er noget, du ønsker at rette, så tryk på linket 'Ret din bestilling' under PayPal-knappen.");
        	} else {
        		Dialogs.open("De angivne oplysninger er i orden.<br/><br/><b><i>Tryk på BESTIL-knappen, når du er klar til at afgive bestillingen.</i></b><br/><br/>Hvis der er noget, du ønsker at rette, så tryk på linket 'Ret din bestilling' under BESTIL-knappen.");
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
		Dialogs.wait("Behandles...");
		
        Basket.submitAfterPayment();
	},
	
    submitAfterPayment: function(paymentId) {
		var submit = [];
        for (var i = 0; i < Basket.size(); i++) {
        	var key = Basket.key(i);
        	var amount = Basket.amount(i);
        	var posterNames = Basket.posterNames(i);
         	submit.push({
				image: Groups.item(key, Basket.index(i)).image,
				title: Groups.basketTitle(key, Basket.index(i), false),
				amount: amount,
				posterNames: posterNames,
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

var History = {
    initialize: function() {
        console.log("History.initialize()");

        if (Utils.path() == "/") History.modify("/opgaver");
        else History.statistics(Utils.path());

        window.onpopstate = function() {
            console.log("State pop -> " + Utils.path());
            Basket.initialize();
            Groups.initialize();
        };
    },

    add: function(path) {
        window.history.pushState({ "path": path }, "Pia Olsen", path);
        History.statistics(Utils.path());
    },

    modify: function(path) {
        window.history.replaceState({ path: path }, "Pia Olsen", path);
        History.statistics(Utils.path());
    },

    statistics: function(path, text) {
        if (text == null) text = "Viewed";
        console.log("Statistics: '" + path + "', '" + text + "'");
        _gaq.push(["_trackEvent", path, text]);
    }
};

var Links = {
    initialize: function() {
        $(".external").click(function() {
        	if (Utils.linkEnabled($(this))) {
        		Links.open($(this).prop("href"));
        	}
            return false;
        });
    },

    apps: [
        { app: "fb://", web: "https://www.facebook.com/" },
        { app: "instagram://", web: "https://www.instagram.com/" }
    ],

    open: function(address) {
        if (address.indexOf("http") == 0) {
            var windowHeight = window.innerHeight * 0.8;
            var windowWidth = window.innerWidth * 0.8;
            var windowTop = (window.innerHeight * 0.1) + (window.screenTop ? window.screenTop : window.screenY);
            var windowLeft = (window.innerWidth * 0.1) + (window.screenLeft ? window.screenLeft : window.screenX);
            var newWindow = window.open(address, "_blank", "top=" + windowTop + ",left=" + windowLeft + ",height=" + windowHeight + ",width=" + windowWidth + ",scrollbars=1");
            if (newWindow.focus) newWindow.focus();

        } else {
            // fb://page/894032124000742
            for (var i = 0; i < Links.apps.length; i++) {
                var app = Links.apps[i];
                if (address.indexOf(app.app) == 0) {
                    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                        var start = new Date();
                        window.location = address;
                        setTimeout(function() {
                            var wait = new Date() - start;
                            if (wait < 2.0 * 1250) Links.open(address.replace(app.app, app.web));
                        }, 1250);

                    } else Links.open(address.replace(app.app, app.web));
                    return;
                }
            }
        }
    }
};

var Dialogs = {
    initialize: function() {
    	var dialogSettings = { 
        	autoOpen: false, 
        	modal: true, 
        	resizable: false
		};
		if (Utils.smallScreen()) {
			dialogSettings.position = { my: "center top+100", at: "center top" };
		}
        $("#dialog").dialog(dialogSettings);
    },
    
    maxWidth: function() {
    	return Math.min(600, $("#categories").width());
    },
    
    maxHeight: function() {
    	return Math.min(500, 0.8 * $(window).height());
    },
    
    wait: function(html) {
    	Dialogs.open(html, []);
    },
    
    open: function(html, buttons) {
        Dialogs.openWidthHeight(null, null, html, buttons);
    },
    
    openLarge: function(html, buttons) {
        Dialogs.openWidthHeight(Dialogs.maxWidth(), Dialogs.maxHeight(), 
                                "<div id='dialog-scroll'>" + html + "</div>", 
                                buttons);
    },
    
    openWidthHeight: function(width, height, html, buttons) {
    	Utils.switchOffScrolling();
				
        if (!buttons) buttons = [ Dialogs.button("Fint") ];

		$("#dialog")
			.dialog({ open: function() { if (Utils.bigScreen()) $("#dialog input").first().select(); }})
 			.html(html)
			.dialog("option", "width", width ? width : 300)
        	.dialog("option", "height", height ? height : "auto")
        	.dialog("option", "buttons", buttons)
 			.dialog("open");
    },

    close: function() {
        $("#dialog").dialog("close");
        
        Utils.switchOnScrolling();
        
        // Hack to fix the fact that opening a dialog makes the page scroll down a bit:
        if (Utils.inViewPort("#top .title")) Utils.scrollToTop(false);
    },

    button: function(text, action) {
        return {
            text: text,
            click: function() {
                Dialogs.close();
                if (typeof action !== 'undefined' && action !== null) action();
            }
        };
    }
};

var Utils = {
	initialize: function() {
		$("form")
			.on("submit", function() { return false; }) // To prevent form is actually submitted 
			.on("keydown", ":input:not(textarea)", function(event) { return event.key != "Enter"; }); // To prevent button is fired on Enter in input field 
	},
	
    fadeIn: function(element, complete) {
        element.fadeIn({ duration: "slow", easing: "linear", complete: complete });
    },
	
	visible: function(selector) {
    	return $(selector).is(":visible");
	},
	    
    inViewPort: function(selector) {
    	return $(selector).inViewport(true);
	},
	
    scrollTo: function(position) {
        return $("html,body").scrollTop(position);
    },

    scrollToTop: function(entering) {
        if (entering || Utils.bigScreen()) return Utils.scrollTo(0);
        else {
            var top = $("#top");				
            Utils.scrollTo(top.position().top + top.outerHeight(true) + 5);
            Basket.handleP();
        }
    },
    
    switchOffScrolling: function() {
		$("body").addClass("no-scroll");
    },
    
    switchOnScrolling: function() {
 		$("body").removeClass("no-scroll");
    },
    
    goTo: function(path) {
        window.location.href = path;
    },

    displayNumber: function(number) {
        return ("" + number).replace(".", ",");
    },

    displayPrice: function(kroner) {
        return Utils.displayNumber(kroner) + " kr.";
    },

    exists: function(selector) {
        return $(selector)[0];
    },
    
    toggleOpaqueness: function(selector, opaque) {
    	$(selector).each(function(i, element) {
			if ($(element).hasClass("removed")) $(element).addClass("transparent");
    		else if (opaque || $(element).hasClass("transparent")) $(element).removeClass("transparent");
			else $(element).addClass("transparent");
		});
    },
    
    toggleVisibility: function(selector, visible) {
    	$(selector).each(function(i, element) {
    		if ($(element).hasClass("removed")) $(element).css("visibility", "hidden");
    		else if (visible || $(element).css("visibility") === "hidden") $(element).css("visibility", "visible");
			else if ($(element).css("visibility") === "visible") $(element).css("visibility", "hidden");
			else $(element).css("visibility",  "hidden");
    	});
    },
	
	toggleEnabledInput: function(selector, enabled) {
		$(selector).each(function(i, element) {
			if ($(element).hasClass("removed")) $(element).prop("disabled", true);
			else if (enabled) $(element).prop("disabled", false);
			else if ($(element).prop("disabled") === false) $(element).prop("disabled", true);
			else if ($(element).prop("disabled") === "false") $(element).prop("disabled", true);
			else if ($(element).prop("disabled") === "enabled") $(element).prop("disabled", true);
			else if ($(element).prop("disabled") === true) $(element).prop("disabled", false);
			else if ($(element).prop("disabled") === "true") $(element).prop("disabled", false);
			else if ($(element).prop("disabled") === "disabled") $(element).prop("disabled", false);
			else if ($(element).prop("disabled")) $(element).prop("disabled", false);
			else $(element).prop("disabled", true);
		});
	},
	
	toggleEnabledLink: function(selector, enabled) {
		$(selector).each(function(i, element) {
			if ($(element).hasClass("removed")) $(element).addClass("link-disabled");
			else if (enabled) $(element).removeClass("link-disabled");
			else if ($(element).hasClass("link-disabled")) $(element).removeClass("link-disabled");
			else $(element).addClass("link-disabled");
		});
	}, 	
	
	linkEnabled: function(link) {
		return !link.hasClass("link-disabled");
	},

    touchScreen: function() {
        return "ontouchstart" in document.documentElement;
    },

    bigScreen: function() {
        return $("#x").is(":visible");
    },
    
    smallScreen: function() {
        return !Utils.bigScreen();
    },

    path: function() {
        return window.location.pathname;
    },

    param: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    paramExists: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "$");
        var results = regex.exec(location.search);
        return results !== null;
    },
    
    writeCookie: function(key, value) {
    	$.cookie(key, JSON.stringify(value), { path: "/" });
    },
    
    readCookie: function(key) {
    	return JSON.parse($.cookie(key));
    }
};

var Auth = {
    auth: function(success) {
        var username = $("<div>").html($("<label>").html("Brugernavn:")).append($("<input>").attr("id", "username"));
        var password = $("<div>").html($("<label>").html("Kodeord:")).append($("<input>").attr("id", "password"));
        var html = $("<div>").html(username).append(password);

        var doAuth = function() {
            console.log("doAuth()");
            var username = $("#username").val();
            var password = $("#password").val();

            $.ajax(
                    {
                        type: "GET",
                        url: "/auth?sid=" + Math.random(),
                        async: false,
                        headers: {
                            "Authorization": "Basic " + btoa(username + ":" + password)
                        },
                        context: this,
                        success: success,
                        error: function() {
                            Dialogs.open("Beklager, ugyldigt brugernavn/kodeord.");
                        }
                    }
            );
        };

        Dialogs.open(html, [ Dialogs.button("Fint", doAuth) ]);
    }
};

$(document).ready(function() {
    Utils.initialize();
    Dialogs.initialize();
    Links.initialize();
    History.initialize();
    Basket.initialize();
    Groups.initialize();

    $(".year").html(new Date().getFullYear());
});    