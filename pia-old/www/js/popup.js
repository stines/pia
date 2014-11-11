var p = 0;
var js_popups = new Array();
var js_popup = null;

function js_Popup(id, location, focusId) {
    this.id = id;
    this.location = location;    
    this.focusId = focusId;
    
    this.clicked = false;

    this.init = function() {
        var popup = document.getElementById(this.id);
        popup.style.visibility = "hidden";
        popup.style.display = "block";
        var link = document.getElementById(this.id + "_link");
        if (this.location == "below_right") {
            popup.style.top = (link.offsetTop + 20) + "px";
            popup.style.left = link.offsetLeft + "px";
        } else if (this.location == "above_right") {
            popup.style.top = (link.offsetTop - popup.clientHeight) + "px";
            popup.style.left = link.offsetLeft + "px";
        } else if (this.location == "below_left") {
            popup.style.top = (link.offsetTop + 20) + "px";
            popup.style.left = (link.offsetLeft - popup.clientWidth + 65) + "px";
        }
        popup.style.display = "none";
        popup.style.visibility = "visible";
    }
    
    this.update = function() {
        var popup = document.getElementById(this.id);
        if (this.isVisible()) {
            popup.style.display = "none";  
            if (js_popup == this) { 
                js_popup = null;
            }
        } else {
            if ((js_popup != null) && (js_popup != this)) {
                js_popup.update();
            }
            popup.style.display = "block";
            document.getElementById(focusId).focus();
            js_popup = this;
        }
    }

	this.hide = function() {
	 	var popup = document.getElementById(this.id);
        if (this.isVisible()) {
            popup.style.display = "none";  
            if (js_popup == this) { 
                js_popup = null;
            }
        } 	
	}

    this.isVisible = function() {
        return (document.getElementById(this.id).style.display == "block");
    }

    this.click = function() {
        this.clicked = true;
    }   
}

function js_popup_onmouseup() {
    var ignore = false;
    for (var i = 0; i < js_popups.length; i++) {
        if (js_popups[i].clicked) {
            js_popups[i].clicked = false;
            ignore = true;
        }
    }
    if (ignore) return;
    for (var i = 0; i < js_popups.length; i++) {
        if (js_popups[i].isVisible()) {
            js_popups[i].update();
        }
    }    
}

function js_popup_init() {
    for (var i = 0; i < js_popups.length; i++) {
        js_popups[i].init();
    }
}