function js_medRundt() {
	var imgWin = window.open("", "medrundt", "resizable=yes,scrollbars=yes,width=800,height=600,screenX=100,screenY=100,left=100,top=100");
    imgWin.document.open();
    imgWin.document.write("<html><head><title>Pia Olsen i Med Rundt</title></head><body style=\"padding: 0;\"><img src=\"http://www.piaolsen.com/www/imgs/medrundt.jpg\"/></body></html>");    
    imgWin.document.close();
    imgWin.focus();
}

function js_rewrite(id, html) {
    document.getElementById(id).innerHTML = html;
}

function js_append(id, html) {
    document.getElementById(id).innerHTML += html;
}

function js_trim(text) {
    if (text == null) {
	return text;
    }
    while ((text.substring(0,1) == ' ') || 
	   (text.substring(0,1) == '\n') || 
	   (text.substring(0,1) == '\r')) {
	text = text.substring(1, text.length);
    }    
    while ((text.substring(text.length - 1, text.length) == ' ') || 
	   (text.substring(text.length - 1, text.length) == '\n') || 
	   (text.substring(text.length - 1, text.length) == '\r')) {
	text = text.substring(0, text.length - 1);
    }
    return text;
}

function js_replace(text, oldText, newText) {
    var index = text.indexOf(oldText);
    while (index != -1) {
	text = text.substring(0, index) + newText + text.substring(index + oldText.length, text.length);
	index = text.indexOf(oldText);
    }
    return text;
}

function js_split(string, splitter) {
    var strings = new Array();
    if (string == null) return strings;
    var index = string.indexOf(splitter);
    while (index != -1) {
    	var s = js_trim(string.substring(0, index));
    	if (s != "") {
			strings[strings.length] = s;
    	}
		string = js_trim(string.substring(index + 1, string.length));
		index = string.indexOf(splitter);
    }
    if (string != "") {
	    strings[strings.length] = string;
    }
    return strings;
} 

function js_transNoFromDaToEn(no) {
	return ("" + no).replace(",", ".");	
}

function js_transNoFromEnToDa(no) {
	return ("" + no).replace(".", ",");	
}

function js_getKeyCode(event) {    
    if (!event) {
        event = window.event;
    }
    var code;
    if (event.keyCode) {
        code = event.keyCode;
    } else if (event.which) {
        code = event.which;
    }
    return code;
}

function js_enter(event) {
    return (js_getKeyCode(event) == '13');
}

function js_sortStrings(a, b) {
    var x = a.toLowerCase();
    var y = b.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));    
}

function js_sortNumbers(a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));    
}

var js_busy = false;

function js_busyness(take) {
    if (take && js_busy) {
        return false;
    }

    if (take) {
        js_busy = true;
        js_glassPane(true);
    } else {
        js_glassPane(false);
        js_busy = false;
    }        

    return true;
}

function js_glassPane(show) {
    var glassPane = document.getElementById("glass_pane");
    if (show) {
	var xy = getPageSizeWithScroll();
        glassPane.style.width = xy[0] + "px";
        glassPane.style.height =  xy[1] + "px";
        glassPane.style.visibility = "visible";
        glassPane.style.zIndex = 10;
    } else {
        glassPane.style.visibility = "hidden";
        glassPane.style.zIndex = -1;
    }
}

function getPageSizeWithScroll(){
    if (window.innerHeight && window.scrollMaxY) {// Firefox
        yWithScroll = window.innerHeight + window.scrollMaxY;
        xWithScroll = window.innerWidth + window.scrollMaxX;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // All but Explorer Mac
        yWithScroll = document.body.scrollHeight;
        xWithScroll = document.body.scrollWidth;
    } else { // Works in Explorer 6 Strict, Mozilla (not FF) and Safari
        yWithScroll = document.body.offsetHeight;
        xWithScroll = document.body.offsetWidth;
    }
    return new Array(xWithScroll, yWithScroll);
}

function js_viewImage(img) {
    var imgWin = window.open("", "", "resizable=yes,scrollbars=yes,width=400,height=400,screenX=300,screenY=200,left=300,top=200");
    imgWin.document.open();
    imgWin.document.write("<html><head><title>GMs adminmodul :: Zoom</title></head><body style=\"padding: 10px; font-family: verdana, Arial, Helvetica, sans-serif; font-size: 11px; color: #555;\"><img src=\"" + img + "\"/></body></html>");    
    imgWin.document.close();
    imgWin.focus();
}

function js_viewFlyer(url, title, width, height) {
    var win = window.open("", url, "resizable=yes,scrollbars=yes,width=" + (width + 50) + ",height=" + height + ",screenX=300,screenY=180,left=300,top=180");
    win.document.open();
    win.document.write("<html style=\"padding: 0px; margin: 0px;\"><head><title>" + title + "</title></head><body style=\"padding: 0px; margin: 0px;\"><div style=\"text-align: center;\"><img src=\"" + url + "\"/></div></body></html>");    
    win.document.close();
    win.focus();
}
