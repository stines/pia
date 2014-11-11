var js_ajaxMode = true;
var js_xmlHttp = null;
var js_readyFunction = null;
var js_errorFunction = null;

function js_getXmlHttpObject() {
    try {
		// Firefox, Opera 8.0+, Safari
		js_xmlHttp = new XMLHttpRequest();
    } catch (e) {
		//Internet Explorer
		try {
	    	js_xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) { 
			try {
		    	js_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				js_xmlHttp = null;	
			}
		}
    }
    return js_xmlHttp;
}

function js_doAjax(readyFunction, errorFunction, phpFile, parameters) {	
	if (js_xmlHttp == null) {
	    js_getXmlHttpObject();  
	} 
	if (js_xmlHttp != null) {
	    js_readyFunction = readyFunction;
	    js_errorFunction = errorFunction;
	    js_xmlHttp.onreadystatechange = js_ajaxDone;
	    js_xmlHttp.open("POST", phpFile, true);
	    js_xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    js_xmlHttp.setRequestHeader("Content-length", parameters.length);
	    js_xmlHttp.setRequestHeader("Connection", "close");
	    js_xmlHttp.send(parameters);
	    return true;
	}
	return false;
}

function js_ajaxDone() {
    if ((js_xmlHttp.readyState == 4) || (js_xmlHttp.readyState == "complete")) { 
		if (js_xmlHttp.responseText.indexOf("Error") != -1) {
			js_errorFunction(js_xmlHttp.responseText);
		} else {
			eval(js_readyFunction);
		}	
    }
}

function js_ajax_done(result) {}
function js_ajax_error(error) {}