var Groups = {
    groups: {},

    matches: function () {
        var matches = Utils.path().match(/\/butik\/kurv/);
        if (matches == null) matches = Utils.path().match(/\/(opgaver|butik)(\/([a-z0-9\-]*))*/);
        return matches;
    },

    scope: function () {
        var matches = this.matches();
        return matches != null ? matches[1] : null;
    },

    key: function () {
        var matches = this.matches();
        return matches != null ? matches[3] : null;
    },

    initialize: function () {
        var scope = this.scope();
        var key = this.key();
        if (scope && key) Groups.show(false, scope, key, -1, true); else Groups.hide(true);
    },

    find: function (key) {
        return key ? Groups.groups[key.replace(/\-/g, '_')] : null;
    },

    show: function (addHistory, scope, key, index, entering) {
        console.log("Groups.show(" + addHistory + ", '" + scope + "', '" + key + "', " + index + ", " + entering + ")");

        // Scroll to top:
        Utils.scrollToTop(entering);

        // Hide basket:
        Basket.hide();

        // Find group to display:
        var group = Groups.find(key);
        if (group == null) return;

        // Manipulate address line:
        if (addHistory) History.add("/" + scope + "/" + key);

        // Generate group HTML:
        var html = $("<div>");
        if (group.teaser) html.append($("<div>").addClass("teaser").html($("<img>").attr("src", group.teaser)));
        if (group.text) html.append($("<div>").addClass("text").html(group.text));
        for (var i = 0; i < group.items.length; i++) {
            var item = group.items[i];
            var itemHtml = $("<div>").addClass("item").attr("id", key + "_" + i).html($("<img>").attr("src", item.image));

            if (item.text) itemHtml.append($("<div>").addClass("text").html(item.text));
            if ((group.showTitles == null || group.showTitles) && item.title) itemHtml.append($("<div>").addClass("title").html(item.title));

            var dot = $("<span>").addClass("dot").html("&nbsp;&nbsp;&middot;&nbsp;&nbsp");
            if (item.size) {
                var size = item.size == "A4" ? item.size : Utils.displayNumber(item.size.height) + " x " + Utils.displayNumber(item.size.width) + " cm";
                if (item.price && !item.priceNoFrame) {
                    var sizePrice = $("<div>").addClass("size-price").html(size).append(dot).append(Utils.displayPrice(item.price));
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

            if (item.price) {
                if (item.sold) itemHtml.append($("<div>").addClass("sold").html(item.soldText ? item.soldText : "Solgt"));
                else itemHtml.append(Basket.status(key, i, $("<div>").addClass("basket-status").attr("id", "basket_" + key + "_" + i)));
            }

            html.append(itemHtml);
        }
        var explore = $("#explore").html(html.html());

        // Show "more" text:
        $("#middle").show();

        // Should items float?
        if (group.float == null || group.float) explore.addClass("float"); else explore.removeClass("float");

        // Reveal explore area:
        Utils.fadeIn(explore, function () {
            if (index >= 0) Utils.scrollTo($("#" + key + "_" + index).offset().top);
        });
    },

    hide: function (entering) {
        console.log("Groups.hide(" + entering + ")");

        // Scroll to top:
        Utils.scrollToTop(entering);

        // Hide explore layers:
        $("#explore").hide();
        $("#middle").hide();
    },

    title: function (key, index, citations) {
        var group = Groups.find(key);
        var item = group.items[index];
        if (item.title) return citations ? "\"" + item.title + "\"" : item.title;
        return firstWord ? "Billede" : "billede";
    },

    printed: function (key) {
        var group = Groups.find(key);
        return group.printed == true;
    }
};

var Basket = {
    content: [],

    initialize: function () {
        if (!Utils.exists(".shop")) return;

        console.log("Basket.initialize()");

        // Read basket content from cookie:
        try {
            Basket.content = JSON.parse($.cookie("basket-data"));
            if (!Basket.content || !Basket.size()) Basket.content = [];
            else {
                for (var i = 0; i < Basket.size(); i++) {
                    if (Basket.key(i) == null || Basket.index(i) == null || Basket.amount(i) == null) {
                        Basket.content = [];
                        break;
                    }
                }
            }

        } catch (error) {
            Basket.content = [];
        }

        Basket.manifest();

        // Show basket?
        var matches = Utils.path().match(/\/butik(\/(kurv)*)*/);
        if (matches != null) if (matches[2]) Basket.show(false, true); else Basket.hide();
    },

    key: function (index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.key : null;
    },

    index: function (index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.index : null;
    },

    amount: function (index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.amount : null;
    },

    frame: function (index) {
        if (index < 0 || index >= Basket.size()) return null;
        var item = Basket.content[index];
        return item ? item.frame : false;
    },

    size: function () {
        return Basket.content.length;
    },

    isEmpty: function () {
        return Basket.size() == 0;
    },

    show: function (addHistory, entering) {
        console.log("Basket.show(" + addHistory + ", " + entering + ")");

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

        // Hide other opened group if any:
        Groups.hide();

        // Hide basket link:
        $("#basket-nav").hide();

        // Reveal basket:
        Utils.fadeIn($("#basket"));
    },

    hide: function () {
        $("#basket").hide();
        $("#basket-nav").show();
    },

    clear: function () {
        $("#from").val("");
        $("#phone").val("");
        $("#message").val("");

        Basket.content = [];
        Basket.manifest();
    },

    price: function () {
        var price = 0;
        for (var i = 0; i < Basket.size(); i++) {
            var group = Groups.find(Basket.key(i));
            var item = group.items[Basket.index(i)];
            var amount = Basket.amount(i);
            var frame = Basket.frame(i);
            price += amount * (frame ? item.price : item.priceNoFrame);
        }
        if (price > 0) price += 39;
        return price;
    },

    manifest: function () {
        // Save basket content to cookie:
        $.cookie("basket-data", JSON.stringify(Basket.content), { path: "/" });

        // Display amount of items in basket in basket links:
        $(".basket-count").each(function () {
            $(this).html(Basket.size());
        });

        // If empty then just hide:
        if (Basket.isEmpty()) return Basket.hide();

        // Make basket content visible in basket form:
        var picturesField = $("#pictures").html("");
        for (var i = 0; i < Basket.size(); i++) {
            var key = Basket.key(i);
            var index = Basket.index(i);
            var amount = Basket.amount(i);
            var frame = Basket.frame(i);
            console.log("Basket.manifest() - Basket[" + i + "]: { key: '" + key + "', index: " + index + ", amount: " + amount + ", frame: " + frame + "}");
            var item = Groups.find(key).items[index];
            var picture = $("<div>")
                    .addClass("picture")
                    .html($("<img>").addClass("link").attr("src", item.image).attr("title", Groups.title(key, index, false)).attr("onClick", "Groups.show(true, 'butik', '" + key + "', " + index + ", false);"))
                    .append($("<div>").addClass("amount")
                                    .html(Groups.printed(key) ? $("<div>").addClass("current").html("x " + amount) : "")
                                    .append($("<a>").addClass("decrease").attr("href", "javascript: Basket.remove('" + key + "', " + index + ", 0, true, false);").html($("<img>").attr("src", "/www/images/remove.png")))
                                    .append($("<a>").addClass("increase").attr("href", "javascript: Basket.add('" + key + "', " + index + ", " + (amount + 1) + ", true, false);").html($("<img>").attr("src", "/www/images/add.png"))));
            if (item.priceNoFrame) {
                picture.append($("<div>")
                                       .addClass("frame")
                                       .append($("<input>")
                                                       .attr({"type": "checkbox", "checked": frame})
                                                       .attr("id", "basket_picture_" + key + "_" + index)
                                                       .on('change', function () {
                                                               var id = $(this).attr("id").split("_");
                                                               Basket.changeFrame(id[2], parseInt(id[3]), $(this).is(":checked"));
                                                           }))
                                       .append($("<span>").html("Ramme")));
            }
            picturesField.append(picture);
        }

        // Reveal total price:
        $("#price").find("span").html(Basket.price());
    },

    changeFrame: function (key, index, frame) {
        History.statistics(Utils.path(), "Changed frame for " + Groups.title(key, index, true) + " to " + frame);
        Basket.get(key, index).frame = frame;
        Basket.manifest();
        Basket.status(key, index);
    },

    add: function (key, index, amount, checkAmount, notify) {
        if (checkAmount && Groups.printed(key)) {
            Dialogs.open("Hvor mange eksemplarer af " + Groups.title(key, index, true) + " ønsker du i indkøbskurven? " +
                         "<input id=\"amount\" type=\"text\" value=\"" + amount + "\"/>",
                         [
                             Dialogs.button("Okay",
                                            function () {
                                                var amount = parseInt($("#amount").val());
                                                if (amount <= 0) Basket.remove(key, index, 0, false, true);
                                                else Basket.add(key, index, amount, false, notify);
                                            }
                             ),
                             Dialogs.button("Fortryd")
                         ]);

        } else {
            History.statistics(Utils.path(), "Added " + amount + " x " + Groups.title(key, index, true) + " to basket");
            if (Basket.contains(key, index)) {
                var item = Basket.get(key, index);
                item.amount = amount;
            } else Basket.content.push({ key: key, index: index, amount: amount, frame: true });
            Basket.manifest();
            Basket.status(key, index);
            if (notify) Dialogs.open("Indkøbskurven indeholder nu " + Groups.title(key, index, true) + (Groups.printed(key) ? " x " + amount : "") + ".");
        }
    },

    remove: function (key, index, amount, checkAmount, confirmed) {
        if (checkAmount && Groups.printed(key)) {
            Dialogs.open("Hvor mange eksemplarer af " + Groups.title(key, index, true) + " ønsker du i indkøbskurven? " +
                         "<input id=\"amount\" type=\"text\" value=\"" + amount + "\"/>",
                         [
                             Dialogs.button("Okay",
                                            function () {
                                                var amount = parseInt($("#amount").val());
                                                if (amount <= 0) Basket.remove(key, index, 0, false, true);
                                                else Basket.add(key, index, amount, false, false);
                                            }
                             ),
                             Dialogs.button("Fortryd")
                         ]);

        } else if (confirmed) {
            // Remove item from basket:
            var content = [];
            for (var i = 0; i < Basket.size(); i++) {
                if (Basket.key(i) != key || Basket.index(i) != index) content.push(Basket.content[i]);
            }
            Basket.content = content;

            // If basket ends up empty then manipulate address line:
            if (Basket.isEmpty()) History.modify("/butik");

            Basket.manifest();

        } else {
            Dialogs.open("Vil du fjerne " + Groups.title(key, index, true) + " fra indkøbskurven?",
                         [
                             Dialogs.button("Ja",
                                            function () {
                                                Basket.remove(key, index, 0, false, true);
                                            }
                             ),
                             Dialogs.button("Nej")
                         ]);
        }
    },

    get: function (key, index) {
        for (var i = 0; i < Basket.size(); i++) if (Basket.key(i) == key && Basket.index(i) == index) return Basket.content[i];
        return null;
    },

    contains: function (key, index) {
        return Basket.get(key, index) != null;
    },

    status: function (key, index, element) {
        if (!element) element = $("#basket_" + key + "_" + index);
        return element.html(
                Basket.contains(key, index) ?
                $("<a>").addClass("in-basket").attr("href", "javascript: Basket.show(true, false);").html("Kurv (<span class=\"basket-count\">" + Basket.size() + "</span>)") :
                $("<a>").addClass("add-to-basket").attr("href", "javascript: Basket.add('" + key + "', " + index + ", 1, true, true);").html("Bestil &#187;")
        );
    },

    submit: function () {
        // Email / Phone:
        var emailField = $("#from");
        var email = emailField.val().trim();
        var phone = $("#phone").val().trim();
        if (email == "" && phone == "") {
            return Dialogs.open("Du har glemt at angive enten din emailadresse eller dit telefonnummer.", [
                Dialogs.button("OK",
                               function () {
                                   emailField.focus();
                               }
                )
            ]);
        }

        // Build body:
        var submit = [];
        for (var i = 0; i < Basket.size(); i++) {
            submit.push(
                    {
                        image: Groups.find(Basket.key(i)).items[Basket.index(i)].image,
                        title: Groups.title(Basket.key(i), Basket.index(i), false),
                        amount: Basket.amount(i),
                        frame: Basket.frame(i)
                    }
            );
        }
        var body = JSON.stringify(
                {
                    check: true,
                    pictures: submit,
                    from: email,
                    phone: phone,
                    message: $("#message").val().trim()
                }
        );

        // Submit:
        $.ajax(
                {
                    type: "POST",
                    url: "/order?sid=" + Math.random(),
                    processData: false,
                    contentType: 'application/json',
                    data: body,
                    success: function () {
                        Basket.clear();
                        Dialogs.open("Tak, Pia vender snart tilbage!");
                    }
                }
        );
    }
};

var History = {
    initialize: function () {
        console.log("History.initialize()");

        if (Utils.path() == "/") History.modify("/opgaver");
        else History.statistics(Utils.path());

        window.onpopstate = function () {
            console.log("State pop -> " + Utils.path());
            Basket.initialize();
            Groups.initialize();
        };
    },

    add: function (path) {
        window.history.pushState({ "path": path }, "Pia Olsen", path);
        History.statistics(Utils.path());
    },

    modify: function (path) {
        window.history.replaceState({ path: path }, "Pia Olsen", path);
        History.statistics(Utils.path());
    },

    statistics: function (path, text) {
        if (text == null) text = "Viewed";
        console.log("Statistics: '" + path + "', '" + text + "'");
        _gaq.push(["_trackEvent", path, text]);
    }
};

var Links = {
    initialize: function () {
        $('.external').click(function () {
            Links.open($(this).prop("href"));
            return false;
        });
    },

    apps: [
        { app: "fb://", web: "https://www.facebook.com/" },
        { app: "instagram://", web: "https://www.instagram.com/" }
    ],

    open: function (address) {
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
                        setTimeout(function () {
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
    initialize: function () {
        $("#dialog").dialog({ autoOpen: false, modal: true });
    },

    open: function (html, buttons) {
        if (!buttons) buttons = [ Dialogs.button("OK") ];

        $("#dialog")
                .html(html)
                .dialog("option", "buttons", buttons).dialog("open");
    },

    close: function () {
        $("#dialog").dialog("close");
    },

    button: function (text, action) {
        return {
            text: text,
            click: function () {
                Dialogs.close();
                if (action != null) action();
            }
        };
    }
};

var ToolTips = {
    initialize: function () {
        $(".click").each(function () {
            $(this).html(Utils.touchScreen() ? "Tryk" : "Klik");
        });
    }
};

var Utils = {
    fadeIn: function (element, complete) {
        element.fadeIn({ duration: "slow", easing: "linear", complete: complete });
    },

    scrollTo: function (position) {
        return $("html,body").scrollTop(position);
    },

    scrollToTop: function (entering) {
        if (entering || Utils.bigScreen()) return Utils.scrollTo(0);
        else {
            var top = $("#top");
            return Utils.scrollTo(top.position().top + top.outerHeight(true) - 5);
        }
    },

    goTo: function (path) {
        window.location.href = path;
    },

    displayNumber: function (number) {
        return ("" + number).replace(".", ",");
    },

    displayPrice: function (kroner) {
        return Utils.displayNumber(kroner) + " kr.";
    },

    exists: function (selector) {
        return $(selector)[0];
    },

    visible: function (selector) {
        $(selector).css('visibility', 'visible');
    },

    touchScreen: function () {
        return 'ontouchstart' in document.documentElement;
    },

    bigScreen: function () {
        return $("#x").is(":visible");
    },

    path: function () {
        return window.location.pathname;
    },

    param: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    paramExists: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "$");
        var results = regex.exec(location.search);
        return results !== null;
    }
};

var Edit = {
    enabled: false,

    initialize: function () {
        if (Utils.paramExists("edit")) {
            Auth.auth(function () {
                Edit.enabled = true;
                Edit.manifest();
            });
        } else {
            try {
                Edit.enabled = JSON.parse($.cookie("edit"));
            } catch (error) {
                Edit.enabled = false;
            }
            Edit.manifest();
        }
    },

    manifest: function () {
        $.cookie("edit", JSON.stringify(Edit.enabled), { path: "/" });

        if (!Edit.enabled) return;

        $("#categories").find(".item > div:first-child").each(function (index, element) {
            $(this).append($("<div>").addClass("category-edit").html("- +"));
        });

        $("body").append($("<div>").attr("style", "position: absolute; top: 2px; right: 5px;").html($("<a>").attr("href", "javascript: Edit.logout();").html("Log ud")));
    },

    logout: function () {
        $.cookie("edit", null, { path: "/" });
        Utils.goTo("/opgaver");
    }
};

var Auth = {
    auth: function (success) {
        var username = $("<div>").html($("<label>").html("Brugernavn:")).append($("<input>").attr("id", "username"));
        var password = $("<div>").html($("<label>").html("Kodeord:")).append($("<input>").attr("id", "password"));
        var html = $("<div>").html(username).append(password);

        var doAuth = function () {
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
                        error: function () {
                            Dialogs.open("Beklager, ugyldigt brugernavn/kodeord.");
                        }
                    }
            );
        };

        Dialogs.open(html, [ Dialogs.button("OK", doAuth) ]);
    }
};

$(document).ready(function () {
    Dialogs.initialize();
    Links.initialize();
    ToolTips.initialize();
    Edit.initialize();
    History.initialize();
    Basket.initialize();
    Groups.initialize();

    $(".year").html(new Date().getFullYear());
});