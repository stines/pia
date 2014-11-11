<?php
function resetIds($table) {
   $sql_tmp = "update ".$table." set id = 10000 * id";
   mysql_query($sql_tmp) or die(mysql_error().": ".$sql_tmp);
   $id = 1;	
   $sql_illus = "select illu.id from ".$table." illu, ".$table."_group gr where illu.group_id = gr.id order by illu.advertisement, illu.visible desc, gr.visible, gr.sort, illu.group_id, illu.sort desc";
   $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
   while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
     $sql_update = "update ".$table." set id = ".$id." where id = ".$sql_illus3[id];
     mysql_query($sql_update) or die(mysql_error().": ".$sql_update);
     $id = $id + 1;
   }
}

// Synchronizes database and folder on the server.
function synchronizeDatabaseAndServer($folder, $table_folder, $table_file) {
	$date = date("Y-m-d H:i:s");
	$openFolder = @opendir($folder);
	while ($subFolder = readdir($openFolder)) {
		if (($subFolder != '.') && ($subFolder != '..') && is_dir($folder."/".$subFolder)) {
			// Make sure folder for thumb nails exists:
			/*
			$thumbs = $folder."/".$subFolder."/thumbs/";
			if (!is_dir($thumbs)) {
				mkdir($thumbs);
			}
			*/
			// Make sure that the folder is registered in the database:
			$sql_folder = "select * from ".$table_folder." where keyword = '$subFolder'";
			$sql_folder2 = mysql_query($sql_folder) or die(mysql_error());
			if ($sql_folder3 = mysql_fetch_array($sql_folder2)) {
				$folderId = $sql_folder3[id];
			} else {
				$folderId = getFreshNo($table_folder, "id");
				$sql_createFolder = "insert into ".$table_folder." (id, keyword, visible) values ($folderId, '$subFolder', 0)";
				mysql_query($sql_createFolder) or die(mysql_error());	
			}
			$openSubFolder = @opendir($folder."/".$subFolder);
			while ($file = readdir($openSubFolder)) {
				$filePath = $folder."/".$subFolder."/".$file;
				$fileType = exif_imagetype($filePath);		
				if (($file != '.') && ($file != '..') && !is_dir($filePath) && (($fileType == IMAGETYPE_GIF) || ($fileType == IMAGETYPE_JPEG))) {
	    			// Make sure that the file is registered in the database:
	    			$sql_file = "select * from ".$table_file." where file_name = '$file' and group_id = $folderId";
					$sql_file2 = mysql_query($sql_file) or die(mysql_error());
					if ($sql_file3 = mysql_fetch_array($sql_file2)) {
						$fileId = $sql_file3[id];
					} else {
						$fileId = getFreshNo($table_file, "id");
						$visible = (1 == 2);
						$sort = findSortFromFileName($table_file, $folderId, $file);
						$text = makeTextFromFileName($subFolder, $file);
						$sql_createfile = "insert into ".$table_file." (id, group_id, file_name, text_da, visible, year, sort) values ($fileId, $folderId, '$file', '$text', 1, ".date("Y").", ".$sort.")";						
						mysql_query($sql_createfile) or die(mysql_error().$sql_createfile);	
					}
					$sql_stamp = "update ".$table_file." set last_seen = '$date', ghost = 0 where id = $fileId";
					mysql_query($sql_stamp) or die(mysql_error());
					// Make thumb nail:
					/*
					$makeThump = 1;
					if (file_exists($thumbs.$file)) {
						if (filemtime($thumbs.$file) > filemtime($filePath)) {
							$makeThump = 0;
						} else {
							unlink($thumbs.$file);
						} 
					}
					if ($makeThump == 1) {
						list($widthBig, $heightBig) = getimagesize($filePath);
						$widthThumb = 50;
						$heightThumb = (50 * $heightBig)/$widthBig;
						$thumb = imagecreatetruecolor($widthThumb, $heightThumb);
						$big = ($fileType == IMAGETYPE_GIF) ? imagecreatefromgif($filePath) : imagecreatefromjpeg($filePath);
						imagecopyresized($thumb, $big, 0, 0, 0, 0, $widthThumb, $heightThumb, $widthBig, $heightBig);
						($fileType == IMAGETYPE_GIF) ? imagegif($thumb, $thumbs.$file) : imagejpeg($thumb, $thumbs.$file);
					}		
					*/		
		    	}	
			}
			closedir($openSubFolder);
		}
	} 
	closedir($openFolder);
	// Ghost-mark non-existing files in the database:
	$sql_files = "select * from ".$table_file; 
	$sql_files2 = mysql_query($sql_files) or die(mysql_error());
	while ($sql_files3 = mysql_fetch_array($sql_files2)) {
		if ($sql_files3[last_seen] != $date) {
			$sql_ghost = "update ".$table_file." set ghost = 1, visible = 0 where id = $sql_files3[id]";
			mysql_query($sql_ghost) or die(mysql_error());
		}
	}	
}

function findSortFromFileName($table_file, $folderId, $fileName) {
	$sort = (int) $fileName; 
	if ($sort == 0) {
	  $sql_sort = "select max(sort) as s from ".$table_file." where group_id = $folderId";
	  $sql_sort2 = mysql_query($sql_sort) or die(mysql_error());
	  if ($sql_sort3 = mysql_fetch_array($sql_sort2)) {
	    $sort = ((int) $sql_sort3[s]) + 20;
	  }				
	}
	return $sort;
}

function makeTextFromFileName($folderName, $fileName) {
	$text = trim($fileName);
	// Remove leading number:
	$no = "".((int)$text);
	$noPos = strpos($text, $no);
	if (($noPos !== false) && ($noPos == 0)) {		
		$text = trim(substr($text, strlen($no)));
	}
	// Remove folder name from beginning:
	$folderPos = strpos(strtoupper($text), strtoupper($folderName)." ");
	if (($folderPos !== false) && ($folderPos == 0)) {		
		$text = trim(substr($text, strlen($folderName)));
	}
	// Make first letter upper case:
	$text = ucfirst($text);
	// Remove file type:
	$text = trim(substr($text, 0, strrpos($text, ".")));
	// Put æ, ø and å there:
	$text = str_replace(array("Aa", "aa", "Ae", "ae", "Oe", "oe", "-"), array("Å", "å", "Æ", "æ", "Ø", "ø", " "), $text);
	return $text;
}

function getFreshNo($tableName, $field) {
	$sql_no = "select (max(".$field.") + 1) as no from ".$tableName;
	$sql_no2 = mysql_query($sql_no) or die(mysql_error());
	$sql_no3 = mysql_fetch_array($sql_no2);
	if ($sql_no3[no] == null) {
		return 1;
	}
	return $sql_no3[no];
}

function writeFile($fileName, $content) {
	$fp = fopen($fileName, "wb"); 
	fwrite($fp, $content);
	fclose($fp);	
}

function getTextByLang($english, $text_en, $text_da) {
	$text = $english ? $text_en : $text_da;
	if (($text == null) || ($text == "")) {
		$text = $text_da;	
	}
	return $text;
}

function getCompleteUrl($rootDir, $url) {
	$http = strpos($url, "http://");
	if (($http === false) || ($http != 0)) {			
		return $rootDir.$url;
	}
	return $url;
}

function getLevelAsSpace($level) {
	$space = "";
	while ($level > 0) {
		$space .= "&nbsp;&nbsp;&nbsp;&nbsp;";
		$level -= 1;
	}
	return $space;
}

function getMonth($number, $english) {
	$months = array(
	1 => array("Januar", "January"),
	2 => array("Februar", "February"),
	3 => array("Marts", "March"),
	4 => array("April", "April"),
	5 => array("Maj", "May"),
	6 => array("Juni", "June"),
	7 => array("Juli", "July"),
	8 => array("August", "August"),
	9 => array("September", "September"),
	10 => array("Oktober", "October"),
	11 => array("November", "November"),
	12 => array("December", "December"));
	return $months[$number][$english];		
}

function getSeason($number, $english) {
	$seasons = array(
	1 => array("Forår", "Spring"),
	2 => array("Sommer", "Summer"),
	3 => array("Efterår", "Autumn"),
	4 => array("Vinter", "Winther"));
	return $seasons[$number][$english];
}

function transNoFromEnToDa($float) {
	return str_replace(array("."), array(","), $float);
}

function transNoFromDaToEn($float) {
	return str_replace(array(","), array("."), $float);
}
?>