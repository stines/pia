<?php
$db = mysql_connect("localhost", "piaolsen_com", "snotsnot") or die("Could not connect to your database.");
if (!$db) {
    die("no db");
}
if (!mysql_select_db("piaolsen_com", $db)) {
    die("No database selected.");
}
?>
