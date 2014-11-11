var js_news_english = false;
var js_news_busy = false;
var js_news_operation;

function js_submitNewsForm(english, operation) {
	if (js_news_busy) return;
	js_news_busy = true;
	js_news_english = english;
	js_news_operation = operation;	
    // E-mail addresses:
    var email = js_trim(document.getElementById("news_email").value); 
	if (email == "") {
	    alert(english ? 'Please fill in your e-mail address' : 'Hov - du glemte vist at fylde din emailadresse ind :)');
	    js_news_busy = false;
	    document.getElementById("news_email").focus();
	    return;
    } 
	email = escape(email);
	// Put busy image there:
	document.getElementById("news_submit").style.display = "none";
	document.getElementById("news_busy").style.display = "block";
	// Submit:
    var parameters = (english ? "e=1&" : "") + "check=true&news=1&news_email=" + email + "&news_operation=" + operation + "&sid=" + Math.random();
    js_doAjax("js_newsFormSubmitted()", "js_ajax_error", "http://www.piaolsen.com/www/admin/send.php", parameters);
}
	
function js_newsFormSubmitted() {
	document.getElementById("news_busy").style.display = "none";
	document.getElementById("news_submit").style.display = "block"; 
	js_popup_news.hide();
	alert(js_news_english ? (js_news_operation ? "You are now subscribed :)" : "You are now unsubscribed!") : (js_news_operation ? "Du er nu tilmeldt nyhedsbrevet :)" : "Du er nu afmeldt nyhedsbrevet!"));
	js_news_busy = false;
}	