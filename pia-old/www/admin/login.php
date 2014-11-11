<script language="javascript" type="text/javascript">
<!--
function js_onLoad() {
    document.form_login.login_name.focus();
}
//-->
</script>

<form name="form_login" action="<?php print $rootDir; ?>admin/" method="post">
<div class="login">
<table>
<tr>
<td align="right">Brugernavn:</td>
<td><input class="text" type="text" name="login_name" title="Brugernavn"/></td>
</tr>
<tr>
<td style="padding-top: 6px;" align="right">Kodeord:</td>
<td style="padding-top: 6px;"><input class="text" type="password" name="password" title="Kodeord"/></td>
</tr>
<tr>
<td></td>
<td style="padding-top: 10px;"><input type="submit" name="login" value="Log ind" title="Klik for at logge ind"/></td>
</tr>
</table>
</div>
</form>
