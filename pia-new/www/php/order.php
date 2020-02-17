<?php
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data["check"])) {
    $customer = $data['email'];
    $customerName = $data['name'];
    $customerAddress = $data['address'];
    $customerPhone = $data['phone'];
    
    $company = isset($data['company']) ? trim($data['company']) : "";
    if ($company == "") $company = "–";
    
    $delivery = $data['delivery'];
    $deliveryText = $delivery;
    if ($delivery == 'gls') $deliveryText = $data['glsShop'];
    else if ($delivery == 'pickup') $deliveryText = "Afhentes";
    
    $payment = $data['payment'];
    $paymentText = $payment;
    if ($payment == "bank") $paymentText = "overføres via bank";
    else if ($payment == "paypal") $paymentText = "betalt via PayPal, id ".$data['paymentId'];
    $price = $data['price']." kroner";

    $comment = isset($data['message']) ? trim($data['message']) : "";
    if ($comment == "") $comment = "–";
    if (!empty($comment)) $comment = str_replace(array("\r\n", "\n", "\r"), "<br/>", $comment);

    $urls = array();
    $titles = "";
    for ($i = 0; $i < sizeof($data["pictures"]); $i++) {
        $posterNames = $data["pictures"][$i]["posterNames"];
        $posterNames = $posterNames ? " (".str_replace(", "," og ", $posterNames).")" : "";
        $amount = $data["pictures"][$i]["amount"];
        $frame = $data["pictures"][$i]["frame"] ? "" : " (u. ramme)";
        $urls[$i] = $amount." x http://www.piaolsen.com".$data["pictures"][$i]["image"].$frame.$posterNames;
        if ($i > 0) $titles .= $i + 1 < sizeof($data["pictures"]) ? ", " : " og ";
        $titles .= ($amount > 1 ? $amount." x " : "")."\"".$data["pictures"][$i]["title"]."\"".$frame.$posterNames;
    }

    // Ordre:
    $subject = "Ny bestilling fra ".$customerName;
    $message = "<html>
    	<head><title>".$subject."</title></head>
    	<body>
  			Kære Pia<br/><br/>
  			Du har fået en bestilling:<br/>
  			<br/><br/>
  			<table>
    		<tr><th align='right' valign='top'>Email:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$customer."</td></tr>
    		<tr><th align='right' valign='top'>Navn:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$customerName."</td></tr>
    		<tr><th align='right' valign='top'>Adresse:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$customerAddress."</td></tr>
    		<tr><th align='right' valign='top'>Telefon:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$customerPhone."</td></tr>
    		<tr><td>&nbsp;</td></tr>
    		<tr><th align='right' valign='top'>Billeder:</th><td>&nbsp;&nbsp;</td><td valign='top'>".join("<br/>", $urls)."</td></tr>
    		<tr><td>&nbsp;</td></tr>
    		<tr><th align='right' valign='top'>Betaling:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$price." (".$paymentText.")</td></tr>
    		<tr><td>&nbsp;</td></tr>
    		<tr><th align='right' valign='top'>Levering:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$deliveryText."</td></tr>
    		<tr><td>&nbsp;</td></tr>
    		<tr><th align='right' valign='top'>Besked:</th><td>&nbsp;&nbsp;</td><td valign='top'>".$comment."</td></tr>
    		</table>
    		<br/><br/>
    		Kærlig hilsen<br/>
    		Netgalleriet
		</body>
		</html>";
    sendEmail("Netgalleriet <shop@piaolsen.com>", "Pia Olsen <po@piaolsen.com>", $subject, $message);
    sendEmail("Netgalleriet <shop@piaolsen.com>", "Stine <post@stinesplace.com>", $subject, $message);
	
    // Kvittering:
    $subject = "Pia Olsen har modtaget din bestilling";
    
    $message_price = "Prisen er ".$price;
    if ($payment == "paypal") {
    	$message_price = $message_price.", som du har betalt via PayPal (id ".$data['paymentId'].")";
    }
    $message_price = $message_price.".";
    
    $meesage_delivery = "";
    if ($delivery == "gls") {
    	$meesage_delivery = "<tr><td>Du har bedt om levering med GLS til ".$data['glsShop'].".</td></tr><tr><td>&nbsp;</td></tr>";
    } 
    
    if ($delivery == "pickup" || $payment == "bank") {
	    $message_status = "Jeg vender tilbage til dig så hurtigt som muligt";
		$message_status = $message_status.", så vi kan aftale de nærmere detaljer omkring";
		if ($delivery == "pickup") {
			$message_status = $message_status." afhentning";
			if ($payment == "bank") {
				$message_status = $message_status." og";
			}
		}
		if ($payment == "bank") {
			$message_status = $message_status." betaling";
		}
		$message_status = $message_status.".";
	} else {
		$message_status = "Jeg sender din bestilling afsted inden for de kommende tre dage.";
	}
	
    $message = "<html>
    	<head><title>".$subject."</title></head>
    	<body>
    		<table>
    		<tr><td>Kære ".$customerName."</td></tr>
    		<tr><td>&nbsp;</td></tr>
  			<tr><td>Tak for din bestilling af ".$titles." fra mit netgalleri.</td></tr>
    		<tr><td>&nbsp;</td></tr>
  			<tr><td>".$message_price."</td></tr>
    		<tr><td>&nbsp;</td></tr>
    		".$meesage_delivery."
  			<tr><td>".$message_status."</td></tr>
    		<tr><td>&nbsp;</td></tr>
  			<tr><td>Mange hilsener fra</td></tr>
  			<tr><td>Pia Olsen</td></tr>
    		<tr><td>&nbsp;</td></tr>
  			<tr><td><a href='http://www.piaolsen.com/'>www.piaolsen.com</a></td></tr>
  			</table>
		</body>
		</html>";
    sendEmail("Pia Olsen <po@piaolsen.com>", $customer, $subject, $message);
}

function sendEmail($from, $to, $subject, $message) {
	$headers = "From: ".$from."\nMIME-Version: 1.0\nContent-type: text/html; charset=UTF-8\n";
	// For at sende e-mails ved brug af PHPs "mail"-funktion skal e-mailadressen i "til" eller "fra" være en aktiv e-mailkonto på domænet hos One.com.
    mail($to, $subject, $message, $headers);
};
?>
