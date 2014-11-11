<?php
include "connect.php";

$check = 0;
if (isset($_POST["check"])) {
    $check = ($_POST["check"] == "true");
} else if (isset($_GET["check"])) {
    $check = ($_GET["check"] == "true");
}
if ($check) {

$english = isset($_POST['e']) || isset($_GET['e']);

$style = "font-family: arial, helvetica, sans-serif; font-size: 12px; letter-spacing: 0.05em; color: #333;";

$headers2 = "\nMIME-Version: 1.0\nContent-type: text/html; charset=iso-8859-1\n";

if (isset($_POST['news'])) { // Nyhedsbrev...
	
$ip = $_SERVER["REMOTE_ADDR"];

$news_email = trim($_POST['news_email']);

$news_operation = $_POST['news_operation'];

if ($news_operation == "0") {
	$sql = "delete from www_news where email = '$news_email'";	
	mysql_query($sql) or die("[".$sql."] Could not delete entry from newsletter table: ".mysql_error());	
} else {
    $sql_lookup = "select count(*) as c from www_news where email = '$news_email'";
    $sql_lookup2 = mysql_query($sql_lookup) or die("[".$sql_lookup."] Could not lookup newsletter entry: ".mysql_error());
    if ($sql_lookup3 = mysql_fetch_array($sql_lookup2)) {
	   	if ($sql_lookup3[c] == 0) {
			$sql = "insert into www_news (ip, email, date) value ('$ip', '$news_email', '".date("D M d, Y H:i:s")."')";
			mysql_query($sql) or die("[".$sql."] Could not insert entry in newsletter table: ".mysql_error());
		}
    }
}

// Email til Pia:
$style = "font-family: arial, helvetica, sans-serif; font-size: 12px; letter-spacing: 0.05em; color: #333; padding: 10px;";
$headers = "From: ".$news_email.$headers2;   
$subject = "Nyhedsbrev - ".(($news_operation == "0") ? "afmelding" : "tilmelding");
$message =  $news_email." har ".(($news_operation == "0") ? "afmeldt" : "tilmeldt")." sig nyhedsbrevet :)";
$content = "<html><body style=\"".$style."\">".stripslashes(str_replace("\n", "<br>", $message))."</body></html>";    
mail("Pia Olsen <po@piaolsen.com>", $subject, $content, $headers);

// Kvittering til bruger:
$style = "background-image: url(http://www.piaolsen.com/www/imgs/news.gif); background-repeat: no-repeat; background-position: center center; font-family: arial, helvetica, sans-serif; font-size: 12px; letter-spacing: 0.05em; color: #333; width: 850px; height: 500px; padding: 10px;";$headers = "From: Pia Olsen <po@piaolsen.com>".$headers2;   
$subject = (($news_operation == "0") ? "[Pia Olsen] Du er nu afmeldt nyhedsbrevet" : "[Pia Olsen] Du er nu tilmeldt nyhedsbrevet :)");
$message = ($news_operation == "0") ? "Hej :) <br/><br/>Jeg vil blot lige forsikre dig om, at du nu er afmeldt mit nyhedsbrev! <br/><br/>Du kan til enhver tid gå ind på siden og tilmelde dig nyhederne igen! <br/><br/>Mange hilsener fra <br/>Pia Olsen :) <br/><br/>http://www.piaolsen.com/" : "Hej :) <br/><br/>Jeg vil blot lige forsikre dig om, at du nu er tilmeldt mit nyhedsbrev! <br/><br/>Du kan til enhver tid gå ind på siden og afmelde nyhederne igen! <br/><br/>Mange hilsener fra <br/>Pia Olsen :) <br/><br/>http://www.piaolsen.com/";
$content = "<html><body style=\"".$style."\">".stripslashes(str_replace("\n", "<br>", $message))."</body></html>";    
mail($news_email, $subject, $content, $headers);	
	
} else if (isset($_POST['gallery'])) { // Webgalleri...

// Ordre:
$from = "";
if (isset($_POST['from'])) {
	$from = trim($_POST['from']);
}
$headers = "From: ".$from.$headers2;   
$subject = $english ? "Message from the web gallery" : "Besked fra webgalleriet";
$message = "Fra: ".$from."<br><br>Telefon: ".$_POST["phone"]."<br><br>Originaler: ".$_POST["numbers"]."<br><br>Besked: ".$_POST["message"];
$content = "<html><body style=\"".$style."\">".stripslashes(str_replace("\n", "<br>", $message))."</body></html>";    
mail("Pia Olsen <po@piaolsen.com>", $subject, $content, $headers);

// Kvittering:
$headers = "From: Pia Olsen <po@piaolsen.com>".$headers2;   
$subject = $english ? "Your Pia Olsen portrait order has been submitted successfully!" : "Din bestilling af Pia Olsens originaler er kommet godt frem!";
$message = $english ? "Hello :) <br/><br/>Thank you for ordering portrait number ".$_POST["numbers"]." from my web gallery! <br/><br/>I will get back to you as soon as possible! <br/><br/>Cheers, <br/>Pia Olsen :) <br/><br/>http://www.piaolsen.com/" : "Hej :) <br/><br/>Tak for din bestilling af original nummer ".$_POST["numbers"]." fra mit netgalleri! <br/><br/>Jeg vender tilbage til dig så hurtigt som muligt, så vi kan aftale de nærmere detaljer omkring overlevering og betaling. <br/><br/>Mange hilsener fra <br/>Pia Olsen :) <br/><br/>http://www.piaolsen.com/";
$content = "<html><body style=\"".$style."\">".stripslashes(str_replace("\n", "<br>", $message))."</body></html>";    
mail($from, $subject, $content, $headers);

}

if (isset($_POST["redirect"])) {
   header("Location: ".$_POST["redirect"]);
}

}
?>