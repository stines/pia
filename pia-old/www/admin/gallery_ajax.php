 <?php
include "connect.php";
include "utils.php";

if (isset($_POST['save_gallery'])) {
    $userId = $_POST['user_id'];
    $ids = $_POST['id'];
    $texts_da = $_POST['text_da'];
    $texts_en = $_POST['text_en'];
    $prices = $_POST['price'];
    $widths = $_POST['width'];
    $heights = $_POST['height'];
    $solds = $_POST['sold'];
    $visibles = $_POST['visible'];
    $sorts = $_POST['sort'];
    $removes = $_POST['remove'];
    $advertisements = $_POST['advertisement'];
    $front_pages = $_POST['front_page'];
    $front_page_sorts = $_POST['front_page_sort'];
    $sold_texts_da = $_POST['sold_text_da'];
    $sold_texts_en = $_POST['sold_text_en'];
    foreach ($ids as $i => $id) {
        if ($removes[$i] == "true") {
            // Delete illu from server:
            $sql_illu = "select group_id, file_name from www_gallery_illu where id = $id";
            $sql_illu2 = mysql_query($sql_illu) or print "Error in [".$sql_illu."]: ".mysql_error();
            if ($sql_illu3 = mysql_fetch_array($sql_illu2)) {
                $sql_group = "select keyword from www_gallery_illu_group where id = ".$sql_illu3[group_id];
                $sql_group2 = mysql_query($sql_group) or print "Error in [".$sql_group."]: ".mysql_error();
                if ($sql_group3 = mysql_fetch_array($sql_group2)) {
                    $fileName = "../gallery/".$sql_group3[keyword]."/".$sql_illu3[file_name];
                    if (file_exists($fileName)) {
                        unlink($fileName);	 
                    }
                    $thumbName = "../gallery/".$sql_group3[keyword]."/thumbs/".$sql_illu3[file_name];
                    if (file_exists($thumbName)) {
						unlink($thumbName);
					}
                }
            }
            // Delete illu from the database: 
            $sql_delete = "delete from www_gallery_illu where id = $id";
            mysql_query($sql_delete) or print "Error in [".$sql_delete."]: ".mysql_error();
        } else {
            $sql_update = "update www_gallery_illu set text_en = \"".$texts_en[$i]."\", text_da = \"".$texts_da[$i]."\", price = ".$prices[$i].", width = ".$widths[$i].", height = ".$heights[$i].", sold = ".(($solds[$i] == "true") ? 1 : 0).", visible = ".(($visibles[$i] == "true") ? 1 : 0).", sort = ".$sorts[$i].", user_id = ".$userId.", advertisement = ".(($advertisements[$i] == "true") ? 1 : 0).", front_page = ".(($front_pages[$i] == "true") ? 1 : 0).", front_page_sort = ".$front_page_sorts[$i].", sold_text_da = \"".$sold_texts_da[$i]."\", sold_text_en = \"".$sold_texts_en[$i]."\" where id = $id";         
mysql_query($sql_update) or print "Error in [".$sql_update."]: ".mysql_error();
        }
    }
}
?>
