<?php
header('Content-Type: text/html; charset=ISO-8859-1');

session_start();

include "connect.php";
include "vars.php";
include "user.php";
include "utils.php";

$PAGE_MODE_LOGIN = "login";
$PAGE_MODE_FRONT = "front";
$PAGE_MODE_ILLUS = "illus";
$PAGE_MODE_GALLERY = "gallery";
$pageMode = $PAGE_MODE_FRONT;
if (!isset($userId)) {
	$pageMode = $PAGE_MODE_LOGIN;
} else if (isset($_GET[p])) {
	$pageMode = $_GET[p];	
}

$SUB_PAGE_MODE_MENU = "menu";
$SUB_PAGE_MODE_CONTENT = "content";
$subPageMode = $_GET[sp];	

// resetIds("www_gallery_illu");
// resetIds("www_illu");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>

<link rel="shortcut icon" href="http://www.piaolsen.com/www/imgs/favicon.ico"/>
<link rel="icon" href="http://www.piaolsen.com/www/imgs/favicon.ico" type="image/x-icon"/>

<meta http-equiv="imagetoolbar" content="no"/>
<meta http-equiv="imagetoolbar" content="false"/>

<link href="<?php print $rootDir; ?>css/style_admin.css" rel="stylesheet" type="text/css"/>

<title>GMs adminmodul</title>

<?php if ($pageMode != $PAGE_MODE_LOGIN) { ?>
<script language="javascript" type="text/javascript" src="<?php print $rootDir; ?>js/utils.js"></script>
<script language="javascript" type="text/javascript" src="<?php print $rootDir; ?>js/ajax.js"></script>
<script language="javascript" type="text/javascript">
<!--
function js_writeButtons() {
	var html = "<input type=\"button\" value=\"Eksportér\" onclick=\"js_makePages();\" title=\"Tryk her hvis du vil overføre til www.piaolsen.com\"/>";
	<?php if (($pageMode == $PAGE_MODE_ILLUS) || ($pageMode == $PAGE_MODE_GALLERY)) { ?>
		html += "&nbsp;<input type=\"button\" value=\"Gem\" onclick=\"js_save();\" title=\"Tryk her hvis du vil gemme i databasen\"/>";
	<?php } ?>
	document.getElementById("buttons_top").innerHTML = html;
	<?php if (($pageMode == $PAGE_MODE_ILLUS) || ($pageMode == $PAGE_MODE_GALLERY)) { ?>
		document.getElementById("buttons_bottom").innerHTML = html;
	<?php } ?>	
}

var js_exportOnReturn = false;
var js_changes = false;

function js_makePages() {
	if (js_changes && confirm("Ønsker du at opdatere databasen med dine ændringer, inden der eksporteres til www.piaolsen.com? :)")) {
		js_exportOnReturn = true;
		js_save();
	} else {
	 	js_busyness(true);
	 	js_exportOnReturn = false;
   		var parameters = "make=true&sid=" + Math.random();
		js_doAjax("js_pagesMade()", js_error, "make.php", parameters);
	}
}

function js_pagesMade(text) {
	js_busyness(false);
	alert("Der er nu eksporteret til www.piaolsen.com :)");
}

function js_error(error) {
	js_busyness(false);
	alert(error);	
}
//-->
</script>
<?php } ?>

</head>

<body onload="<?php print ($pageMode != $PAGE_MODE_LOGIN) ? 'js_writeButtons();' : ''; ?> js_onLoad();" <?php print ($pageMode == $PAGE_MODE_LOGIN) ? "class=\"body-login\"" : ""; ?>>

<div style="position: absolute; top: 0; left: 0; visibility: hidden;">
<?php
/*
$dir = opendir("../imgs");
while ($file = readdir($dir)) {
    if (($file != '.') && ($file != '..')) {
	print "<img src=\"".$rootDir."imgs/".$file."\" alt=\"\"/>\n";
    }	
}
closedir($dir);
*/
?>
</div>

<div class="top-menu" align="right">
  <div class="wmdesign" align="right"><a href="http://www.stinesplace.com" title="Besøg WMs hjemmeside :)" target="_new">wmdesign &copy; <?php print date("Y"); ?></a></div>
  <table cellpadding="0" cellspacing="0">
  <tr>
  <?php if ($pageMode != $PAGE_MODE_LOGIN) { ?>
    <td class="logout"><a href="<?php print $rootDir; ?>admin/logout" title="Klik for at logge ud">Log ud</a></td>
    <td>|</td>
  <?php } ?>
  <td class="hotline"><a href="skype:stinesonder?chat" title="WM - always online 8)" target="_new">Hotline</a></td>
  </tr>
  </table>
  <?php if ($pageMode != $PAGE_MODE_LOGIN) { ?>
    <div class="user" align="right" title="Du er logget ind som <?php print $sql_user3[login_name]; ?>"><table cellpadding="0" cellspacing="0"><tr><td style="padding-right: 4px;">Daaaavs <?php print $sql_user3[login_name]; ?></td><td><img src="<?php print $rootDir; ?>imgs/smil.gif"/></td></tr></table></div>
  <?php } ?>
</div>

<div class="header">
  <table cellpadding="" cellspacing="0">
  <tr>
  <td valign="middle"><a href="<?php print $rootDir; ?>admin/" title="Gå til forsiden"><img src="<?php print $rootDir; ?>imgs/header_admin.gif" alt="GMs Adminmodul"/></a></td>
  <?php if ($pageMode != $PAGE_MODE_FRONT) { ?>
    <td style="padding: 0px 16px 0px 18px;" valign="middle"><img src="<?php print $rootDir; ?>imgs/bullet_admin_<?php print $pageMode; ?>.gif" alt=""/></td>
    <?php if ($pageMode == $PAGE_MODE_LOGIN) { ?>
    	<td valign="middle"><a href="<?php print $rootDir; ?>admin/" title="Opfrisk"><img src="<?php print $rootDir; ?>imgs/header_admin_<?php print $pageMode; ?>.gif"/></a></td>    
    <?php } else { ?>
    	<td valign="middle"><img src="<?php print $rootDir; ?>imgs/header_admin_<?php print $pageMode; ?>.gif"/></td> 
        <td valign="middle">&nbsp;<img src="<?php print $rootDir; ?>imgs/header_admin_sep.gif"/>&nbsp;</td>
    	<td valign="middle"><a href="<?php print $rootDir; ?>admin/<?php print $pageMode; ?>_<?php print $subPageMode; ?>" title="Opfrisk"><img src="<?php print $rootDir; ?>imgs/header_admin_<?php print $subPageMode; ?>.gif"/></a></td>
  	<?php } ?>
  <?php } ?>
  </tr>
  </table>
</div>

<?php if ($pageMode != $PAGE_MODE_LOGIN) { ?>
  <div id="buttons_top" class="buttons"></div>
<?php } ?>

<table cellpadding="0" cellspacing="0">
<tr>
<td class="content">
  <?php include $pageMode.((($pageMode == $PAGE_MODE_ILLUS) || ($pageMode == $PAGE_MODE_GALLERY)) ? "_".$subPageMode : "").".php"; ?>
</td>
</tr>
</table>

<div id="buttons_bottom" class="buttons"></div>

<!-- Popup -->
<div id="popup"></div>

<!-- Glass pane -->
<div id="glass_pane"></div>

<!--
<iframe name="test"></iframe>
-->

</body>

</html>
