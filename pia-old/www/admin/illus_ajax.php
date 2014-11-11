<?php
include "connect.php";
include "utils.php";

if (isset($_POST['save_illus'])) {
	$userId = $_POST['user_id'];
    $ids = $_POST['id'];
    $texts_da = $_POST['text_da'];
    $texts_en = $_POST['text_en'];
    $extras_da = $_POST['extra_da'];
    $extras_en = $_POST['extra_en'];
    $years = $_POST['year'];
    $seasons = $_POST['season'];
    $months = $_POST['month'];
    $visibles = $_POST['visible'];
    $sorts = $_POST['sort'];
    $removes = $_POST['remove'];
	foreach ($ids as $i => $id) {
		if ($removes[$i] == "true") {
			// Delete illu from server:
			$sql_illu = "select group_id, file_name from www_illu where id = $id";
			$sql_illu2 = mysql_query($sql_illu) or print "Error in [".$sql_illu."]: ".mysql_error();
			if ($sql_illu3 = mysql_fetch_array($sql_illu2)) {
				$sql_group = "select keyword from www_illu_group where id = ".$sql_illu3[group_id];
				$sql_group2 = mysql_query($sql_group) or print "Error in [".$sql_group."]: ".mysql_error();
				if ($sql_group3 = mysql_fetch_array($sql_group2)) {
					$fileName = "../illus/".$sql_group3[keyword]."/".$sql_illu3[file_name];
					if (file_exists($fileName)) {
						unlink($fileName);	 
					}
					$thumbName = "../illus/".$sql_group3[keyword]."/thumbs/".$sql_illu3[file_name];
                    if (file_exists($thumbName)) {
						unlink($thumbName);
					}
				}
			}
			// Delete illu from the database:
			$sql_delete = "delete from www_illu where id = $id";
			mysql_query($sql_delete) or print "Error in [".$sql_delete."]: ".mysql_error();
		} else {
	  		$sql_update = "update www_illu set text_en = \"".$texts_en[$i]."\", text_da = \"".$texts_da[$i]."\", extra_en = \"".$extras_en[$i]."\", extra_da = \"".$extras_da[$i]."\", year = ".$years[$i].", season = ".$seasons[$i].", month = ".$months[$i].", visible = ".(($visibles[$i] == "true") ? 1 : 0).", sort = ".$sorts[$i].", user_id = ".$userId." where id = $id";
  			mysql_query($sql_update) or print "Error in [".$sql_update."]: ".mysql_error();
		}
	}
}
?>
