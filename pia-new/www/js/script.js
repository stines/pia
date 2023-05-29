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
            
            var itemHtml = $("<div>").addClass("item").attr("id", key + "_" + i).html("");
            
            if (item.images) for (var j = 0; j < item.images.length; j++) {
              itemHtml.append($("<img>").attr("src", item.images[j]));
			} else if (item.image) itemHtml.append($("<img>").attr("src", item.image));
			
			if (item.text) itemHtml.append($("<div>").addClass("text").html(item.text));
            if ((group.showTitles === null || group.showTitles) && item.title) itemHtml.append($("<div>").addClass("title").html(item.title));

 			if (item.text2) itemHtml.append($("<div>").addClass("text").html(item.text2));
           
            var dot = $("<span>").addClass("dot").html("&nbsp;&nbsp;&middot;&nbsp;&nbsp");
            if (item.size) {
                var size = typeof item.size !== 'object' ? item.size : Utils.displayNumber(item.size.width) + " x " + Utils.displayNumber(item.size.height) + " cm";
                if (item.sizeText) size += " " + item.sizeText;
                if (item.price && !item.priceNoFrame) {
                    sizePrice = $("<div>").addClass("size-price").html(size).append(dot).append(Utils.displayPrice(item.price));
                    if (item.priceText) sizePrice.append(" " + item.priceText);
                    itemHtml.append(sizePrice);
                 } else {
                    itemHtml.append($("<div>").addClass("size").html(size));
                }
            }
            if ((item.price || item.prices) && (!item.size || item.priceNoFrame)) {
                var price = $("<div>").addClass("price");
                if (item.priceNoFrame) {
                    price.append($("<div>").html("Med ramme: " + Utils.displayPrice(item.price))).append(dot).append($("<div>").html("Uden ramme: " + Utils.displayPrice(item.priceNoFrame)));
                } else if (item.prices) {
                	var prices = "";
                	for (var p = 0; p < item.prices.length; p++) {
                	  if (p > 0) prices += ", ";
                      prices += item.prices[p].amount + " for " + item.prices[p].price;
                	}
                	price.html(Utils.displayPrice(prices))
                } else {
                    price.html(Utils.displayPrice(item.price));
                    if (item.priceText) price.append(" " + item.priceText);
                }
                itemHtml.append(price);
            }
            
            if (item.text3) itemHtml.append($("<div>").addClass("text").html(item.text3));

            if (item.price || item.prices) {
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
        $(".popup").click(function() {
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