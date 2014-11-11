function js_add(english, number) {
	var numbersString = js_trim(document.getElementById("numbers").value);
	var numbers = js_split(numbersString, ",");
	var add = true;
	for (var i = 0; i < numbers.length; i++) {
		if (numbers[i] == number) {	
			add = false;
			break;
		}	
	}
	if (add) {
		numbers[numbers.length] = number;
		numbers.sort(js_sortNumbers);	
	}
	numbersString = "";
	for (var  i = 0; i < numbers.length; i++) {
		if (i > 0) {
			numbersString += ", ";
		}
		numbersString += numbers[i]
	}
	document.getElementById("numbers").value = numbersString;
	alert(english ? "Portrait number " + number + " has now been added to the order form above :)" : "Original nummer " + number + " er nu tilføjet til bestillingsformularen øverst på siden :)");
}


function js_submitGalleryForm(english) {
    // E-mail addresses / Phone:
    var email = js_trim(document.getElementById("from").value);
	email = escape(email);
	var phone = js_trim(document.getElementById("phone").value);
	if ((email == "") && (phone == "")) {
	    alert(english ? 'Please fill in either your e-mail address or your phone number' : 'Vær sød at angive enten din emailadresse eller dit telefonnummer');
	    document.getElementById("from").focus();
	    return;
    }  
	// Message: 
	var message = js_trim(document.getElementById("message").value);
	message = escape(message);
	// Numbers:
	var numbers = js_trim(document.getElementById("numbers").value);
	if (numbers == "") {
	    alert(english ? 'Please fill in the numbers of the portraits you want to buy :)' : 'Hov - du har glemt at skrive numrene på de originaler, du vil bestille :)');
	    document.getElementById("numbers").focus();
	    return;
    }
	numbers = escape(numbers);
	// Put the thanks message there:
	document.getElementById("gallery_form").style.display = "none";
	document.getElementById("gallery_form_thanks").style.display = "block";
	// Submit:
    var parameters = (english ? "e=1&" : "") + "check=true&gallery=1&from=" + email + "&phone=" + phone + "&numbers=" + numbers + "&message=" + message + "&sid=" + Math.random();
    js_doAjax("js_galleryFormSubmitted()", "js_ajax_error", "http://www.piaolsen.com/www/admin/send.php", parameters);	
}
	
function js_galleryFormSubmitted() {
	window.setTimeout('js_galleryFormSubmitted2();', 3000);	
}

function js_galleryFormSubmitted2() {
	document.getElementById("gallery_form_thanks").style.display = "none"; 
	document.getElementById("gallery_form").style.display = "block";
}	

function js_sendEmail(english) {
	document.getElementById("email_thanks").innerHTML = english ? "Thanks :)" : "Tak :)";	
	window.setTimeout('document.form_email.submit();', 4000);	
}