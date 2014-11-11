var Groups = {
    groups: {},

    initialize: function () {
        var matches = Utils.path().match(/\/butik\/kurv/);
        if (matches == null) {
            matches = Utils.path().match(/\/(opgaver|butik)(\/([a-z0-9\-]*))*/);
            if (matches != null) {
                var scope = matches[1];
                var key = matches[3];
                if (scope && key) Groups.show(false, scope, key); else Groups.hide();
            }
        }
    },

    find: function (key) {
        return Groups.groups[key.replace(/\-/g, '_')];
    },

    show: function (addHistory, scope, key, index) {
        console.log("Groups.show(" + addHistory + ", '" + scope + "', '" + key + "', " + index + ")");

        // Scroll to top:
        Utils.scrollTo(0);

        // Hide basket:
        Basket.hide();

        // Find group to display:
        var group = Groups.find(key);
        if (group == null) return;

        // Manipulate address line:
        if (addHistory) History.add("/" + scope + "/" + key);

        // Generate group HTML:
        var html = $("<div>");
        if (group.text) html.append($("<div>").addClass("text").html(group.text));
        for (var i = 0; i < group.items.length; i++) {
            var item = group.items[i];
            var itemHtml = $("<div>").addClass("item").attr("id", key + "_" + i).html($("<img>").attr("src", item.image));
            if (item.text) itemHtml.append($("<div>").addClass("text").html(item.text));
            if (item.title) itemHtml.append($("<div>").addClass("title").html(item.title));
            if (item.size || item.price) {
                var size = item.size ? Utils.displayNumber(item.size.height) + " x " + Utils.displayNumber(item.size.width) + " cm" : "";
                var price = item.price ? Utils.displayNumber(item.price) + " kr." : "";
                var splitter = item.size && item.price ? "&nbsp;&nbsp;&middot;&nbsp;&nbsp;" : "";
                itemHtml.append($("<div>").addClass("size-price").html(" " + size + splitter + price));
            }
            if (item.price) {
                if (item.sold) itemHtml.append($("<div>").addClass("sold").html("Solgt"));
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

    hide: function () {
        console.log("Groups.hide()");

        // Scroll to top:
        Utils.scrollTo(0);

        // Hide explore layers:
        $("#explore").hide();
        $("#middle").hide();
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
            if (!Basket.content || !Basket.content.length) Basket.content = [];
            else {
                for (var i = 0; i < Basket.content.length; i++) {
                    if (Basket.key(i) == null || Basket.index(i) == null) {
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
        if (matches != null) if (matches[2]) Basket.show(false); else Basket.hide();
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

    size: function () {
        return Basket.content.length;
    },

    isEmpty: function () {
        return Basket.size() == 0;
    },

    show: function (addHistory) {
        console.log("Basket.show()");

        // Empty?
        if (Basket.isEmpty()) {
            if (!addHistory) History.modify("/butik");
            return Dialogs.open("Indkøbskurven er tom. Du lægger noget i kurven ved at trykke BESTIL under et billede, når du bevæger dig rundt i billedkategorierne.");
        }

        // Manipulate address line:
        if (addHistory) History.add("/butik/kurv");

        // Scroll to top:
        Utils.scrollTo(0);

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
            console.log("Basket.manifest() - Basket[" + i + "]: { key: '" + key + "', index: " + index + " }");
            var item = Groups.find(key).items[index];
            picturesField.append(
                    $("<div>")
                            .addClass("picture")
                            .html($("<img>").addClass("link").attr("src", item.image).attr("title", item.title).attr("onClick", "Groups.show(true, 'butik', '" + key + "', " + index + ");"))
                            .append($("<a>").addClass("close").attr("href", "javascript: Basket.remove('" + key + "', " + index + ");").html($("<img>").attr("src", "/www/images/remove.gif")))
            );
        }
    },

    add: function (key, index) {
        if (!Basket.contains(key, index)) Basket.content.push({ key: key, index: index });
        Basket.manifest();
        Basket.status(key, index);
        var item = Groups.find(key).items[index];
        Dialogs.open("\"" + item.title + "\" er nu lagt i indkøbskurven.");
    },

    remove: function (key, index) {
        var item = Groups.find(key).items[index];
        Dialogs.open("Vil du fjerne \"" + item.title + "\" fra indkøbskurven?",
                     [
                         Dialogs.button("Ja",
                                        function () {
                                            Basket.removeConfirmed(key, index);
                                        }
                         ),
                         Dialogs.button("Nej")
                     ]);
    },

    removeConfirmed: function (key, index) {
        // Remove item from basket:
        var content = [];
        for (var i = 0; i < Basket.size(); i++) {
            if (Basket.key(i) != key || Basket.index(i) != index) content.push(Basket.content[i]);
        }
        Basket.content = content;

        // If basket ends up empty then manipulate address line:
        if (Basket.isEmpty()) History.modify("/butik");

        Basket.manifest();
    },

    contains: function (key, index) {
        for (var i = 0; i < Basket.size(); i++) if (Basket.key(i) == key && Basket.index(i) == index) return true;
        return false;
    },

    status: function (key, index, element) {
        if (!element) element = $("#basket_" + key + "_" + index);
        return element.html(
                Basket.contains(key, index) ?
                $("<a>").addClass("in-basket").attr("href", "javascript: Basket.show(true);").html("Kurv (<span class=\"basket-count\">" + Basket.size() + "</span>)") :
                $("<a>").addClass("add-to-basket").attr("href", "javascript: Basket.add('" + key + "', " + index + ");").html("Bestil &#187;")
                /*
                 $("<button>").html("Bestil &#187;").button({ disabled: false }).click(
                 function (event) {
                 event.preventDefault();
                 Basket.add(key, index);
                 }
                 )
                 */
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
            var item = Groups.find(Basket.key(i)).items[Basket.index(i)];
            submit.push({ image: item.image, title: item.title});
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
                    url: "/www/order?sid=" + Math.random(),
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

        window.onpopstate = function () {
            console.log("State pop -> " + Utils.path());
            Basket.initialize();
            Groups.initialize();
        };
    },

    add: function (path) {
        window.history.pushState({ "path": path }, "Pia Olsen", path);
    },

    modify: function (path) {
        window.history.replaceState({ path: path }, "Pia Olsen", path);
    }
};

var Links = {
    initialize: function () {
        $('.external').click(function () {
            Links.open($(this).prop("href"));
            return false;
        });
    },

    open: function (address) {
        var newWindow = window.open(address, "", "height=" + (window.innerHeight * 0.75) + ",width=" + (window.innerWidth * 0.75));
        if (newWindow.focus) newWindow.focus();
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
            /*.keyup(function (e) {
             if (e.keyCode != $.ui.keyCode.ENTER) return;
             $(".ui-dialog-buttonpane button:last").focus().trigger("click");
             })*/
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

    scrollTo: function (top) {
        return $("html,body").scrollTop(top);
    },

    goTo: function (path) {
        window.location.href = path;
    },

    displayNumber: function (number) {
        return ("" + number).replace(".", ",");
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
                        url: "/www/auth?sid=" + Math.random(),
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
});