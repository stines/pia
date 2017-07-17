<?php
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data["check"])) {
    $admin = "po@piaolsen.com";
    $customer = isset($data['from']) ? trim($data['from']) : "";

    $comment = isset($data['message']) ? trim($data['message']) : "";
    if (!empty($comment)) $comment = "\n\t".str_replace(array("\r\n", "\n", "\r"), "\n\t", $comment);

    $urls = array();
    $titles = "";
    for ($i = 0; $i < sizeof($data["pictures"]); $i++) {
        $amount = $data["pictures"][$i]["amount"];
        $frame = $data["pictures"][$i]["frame"] ? "" : " (u. ramme)";
        $urls[$i] = $amount." x http://www.piaolsen.com".$data["pictures"][$i]["image"].$frame;
        if ($i > 0) $titles .= $i + 1 < sizeof($data["pictures"]) ? ", " : " og ";
        $titles .= "\"".$data["pictures"][$i]["title"]."\"".($amount > 1 ? " x ".$amount : "").$frame;
    }

    // Ordre:
    $subject = "Ny bestilling?";
    $message = "Kære Pia\n\nNogen tastede følgende ind i bestillingsformularen:\n\n\nEmail: ".$customer."\n\nTelefon: ".$data["phone"]."\n\nBilleder:\n\t".join("\n\t", $urls)."\n\nBesked: ".$comment."\n\n\nKærlig hilsen\nNetgalleriet";
    sendEmail("Netgalleriet <".$admin.">", "Pia Olsen <".$admin.">", $subject, $message);
    sendEmail("Netgalleriet <".$admin.">", "Stine <post@stinesplace.com>", $subject, $message);

    // Kvittering:
    $subject = "Pia Olsen har modtaget din bestilling";
    $message = "Hej :)\n\nTak for din bestilling af ".$titles." fra mit netgalleri.\n\nJeg vender tilbage til dig så hurtigt som muligt, så vi kan aftale de nærmere detaljer omkring overlevering og betaling.\n\nMange hilsener fra\nPia Olsen\n\nhttp://www.piaolsen.com/";
    sendEmail("Pia Olsen <".$admin.">", $customer, $subject, $message);
}

function sendEmail($from, $to, $subject, $message) {
    $headers = "From: ".$from."\nMIME-Version: 1.0\nContent-type: text/plain; charset=UTF-8\n";
    mail($to, $subject, $message, $headers);
};
?>
