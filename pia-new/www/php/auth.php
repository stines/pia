<?php

$stranger = 1;

if (isset($_GET['Authorization'])) {
    $auth = $_GET['Authorization'];
    if (strpos(strtolower($auth), 'basic') === 0) {
        list($username, $password) = explode(':', base64_decode(substr($auth, 6)));
        if ($username == "sts" && $password == "fisk") $stranger = 0;
    }
}

if ($stranger) {
    header('HTTP/1.0 403 Forbidden');
    echo "Beklager, jeg kan ikke give dig lov til at editere uden gyldigt log in :/ $username $password";

    die();
}

?>