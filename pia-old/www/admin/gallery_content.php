<?php
clearstatcache();

// Synchronize database and the folder "gallery":
synchronizeDatabaseAndServer("../gallery", "www_gallery_illu_group", "www_gallery_illu");
?>

<script language="javascript" type="text/javascript">
<!--
function js_GalleryGroup(id, text_en, text_da, keyword, sort, visible) {
	this.id = id;
	this.text_en = text_en;
	this.text_da = text_da;
	this.keyword = keyword;	
	this.sort = sort;
	this.visible = visible;

	this.text = function() {
		if ((this.text_da != null) && (this.text_da != "")) {
			return this.text_da;	
		}	
		if ((this.text_en != null) && (this.text_en != "")) {
			return this.text_en;	
		}	
		return this.keyword;
	}	

	this.illus = new Array();
	this.addIllu = function(illu) {
		this.illus[this.illus.length] = illu;	
	}

	this.open = false;

	this.fold = function() {
		this.open = !this.open;
		document.getElementById("illus_" + this.id).style.display = this.open ? "block" : "none";	
	}
	
	this.write = function() {
		var html
                = "<div class=\"gallery-group\">"
                + "<table cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%;\">"
                + "<tr>"
                + "<td class=\"gallery-group-header\"><a href=\"javascript: js_galleryGroup_" + this.id + ".fold();\" title=\"Klik for at folde ud / ind\">" + this.text() + "</a> <span style=\"cursor: default;\" title=\"Navnet på den tilsvarende folder under gallery på serveren\">(" + this.keyword + ")</span></td>"
                + "</tr>"
                + "<tr>"
                + "<td>"
                + "<div class=\"gallery-group-illus\" id=\"illus_" + this.id + "\" style=\"display: " + (this.open ? "block" : "none") + ";\"></div>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>";
		return html;
	}
	
	this.writeIllus = function() {
		var count = 0;
		var	html 
			= "<table class=\"illu-list\">"
			+ "<tr>"
			+ "<td class=\"top\"></td>"
			+ "<td class=\"top\"></td>"
			+ "<td class=\"top\" title=\"Teksten der dukker op under billedet på www.piaolsen.com\">Titel</td>"
			+ "<td class=\"top\" title=\"Billedets pris i DKR\">Pris i kr.</td>"
			+ "<td class=\"top\" title=\"Billedets bredde i cm\">Bredde i cm</td>"
			+ "<td class=\"top\" title=\"Billedets højde i cm\">Højde i cm</td>"
			+ "<td class=\"top\" title=\"Hvad skal der stå under billedet, når det ikke er til salg?\">Ikke-til-salg-tekst</td>"
			+ "<td class=\"top\" title=\"Er billedet ikke til salg i øjeblikket?\">Ikke-til-salg</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Vises billedet på webgalleriet?\">Synlig</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Er dette blot et reklamebanner?\">Reklame</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Skal billedet vises på forsiden?\">Forside</td>"
			+ "<td class=\"top sort\" align=\"center\">Placering</td>"
			//+ "<td class=\"top sort\" align=\"center\"><a href=\"javascript: js_galleryGroup_" + this.id + ".sort();\" title=\"Billedets placering i røkkefølgen - Klik her for at sortere!\" style=\"text-decoration: underline;\">Placering</a></td>"
			+ "</tr>";
		for (var i = 0; i < this.illus.length; i++) {
			if (this.illus[i] == null) continue;
			count++;
			html += this.illus[i].write();	
		}	
		html += "</table>";
		if (count == 0) {
			html = "<i>Tom...</i>";		
		}
		document.getElementById("illus_" + this.id).innerHTML = html;
		for (var i = 0; i < this.illus.length; i++) {
			if (this.illus[i] == null) continue;
			this.illus[i].writeDelete();	
		}	
	}
	
	this.sort = function() {
		try {
			this.save();
			this.illus.sort(js_sort);
			this.writeIllus();
		} catch (error) {
			alert(error);	
		}
	}
	
	this.save = function() {
		for (var i = 0; i < this.illus.length; i++) {
			if (this.illus[i] == null) continue;
			this.illus[i].save();	
		}	
	}
}

function js_Illu(id, fileName, text_en, text_da, price, width, height, sold, sort, visible, ghost, group, advertisement, frontPage, frontPageSort, sold_text_en, sold_text_da) {
	
	this.id = id;
	this.fileName = fileName;
	this.text_en = text_en;
	this.text_da = text_da;
	this.price = price;
	this.width = width;
	this.height = height;
	this.sold = sold;
	this.sort = sort;
	this.visible = visible;
	this.ghost = ghost;
	this.group = group;
    this.advertisement = advertisement;
	this.frontPage = frontPage;
	this.frontPageSort = frontPageSort;
	this.sold_text_en = sold_text_en;
	this.sold_text_da = sold_text_da;
	
	this.removed = false;
	
	this.remove = function() {
		js_changes = true;
		this.removed = true;
		this.writeDelete();
	}
	
	this.restore = function() {
		this.removed = false;	
		this.writeDelete();
	}
	
	this.save = function() {
		this.text_da = document.getElementById("text_da_" + this.id).value;
		this.text_en = document.getElementById("text_en_" + this.id).value;
		this.price = parseFloat(js_transNoFromDaToEn(document.getElementById("price_" + this.id).value));
		if (isNaN(this.price)) {
			throw "Den pris, du har angivet for billede " + this.id + " i gruppen \"" + this.group.text() + "\", er ikke et kommatal..."; 
		}
		this.width = parseFloat(js_transNoFromDaToEn(document.getElementById("width_" + this.id).value));
		if (isNaN(this.width)) {
			throw "Den bredde, du har angivet for billede " + this.id + " i gruppen \"" + this.group.text() + "\", er ikke et kommatal..."; 
		}
		this.height = parseFloat(js_transNoFromDaToEn(document.getElementById("height_" + this.id).value));		
		if (isNaN(this.height)) {
			throw "Den højde, du har angivet for billede " + this.id + " i gruppen \"" + this.group.text() + "\", er ikke et kommatal...";
		}
		this.sold = document.getElementById("sold_" + this.id).checked;
		this.visible = document.getElementById("visible_" + this.id).checked;
		this.sort = parseFloat(js_transNoFromDaToEn(document.getElementById("sort_" + this.id).value));
		if (isNaN(this.sort)) {
			throw "Den placering, du har angiver for billede " + this.id + " i gruppen \"" + this.group.text() + "\", er ikke et kommatal...";
		}
		this.advertisement = document.getElementById("advertisement_" + this.id).checked;
		this.frontPage = document.getElementById("front_page_" + this.id).checked;
		this.frontPageSort = parseFloat(js_transNoFromDaToEn(document.getElementById("front_page_sort_" + this.id).value));
		if (isNaN(this.frontPageSort)) {
			throw "Den forsideplacering, du har angiver for billede " + this.id + " i gruppen \"" + this.group.text() + "\", er ikke et kommatal...";
		}
		this.sold_text_da = document.getElementById("sold_text_da_" + this.id).value;
		this.sold_text_en = document.getElementById("sold_text_en_" + this.id).value;
	}
	
	this.write = function() {
		var img = (this.ghost ? "../imgs/ghost.gif" : "../gallery/" + this.group.keyword + "/" + this.fileName);
        var thumb = (this.ghost ? "../imgs/ghost.gif" : "../gallery/" + this.group.keyword + "/thumbs/" + this.fileName);
        var html 
            = "<tr>" 
            + "<td class=\"no\" title=\"Billedets nummer\">" + this.id + "</td>"
            + "<td class=\"illu\" id=\"illu_" + this.id + "\">"
            + "<a href=\"javascript: js_viewImage('" + img + "');\"><img src=\"" + img + "\" alt=\"" + this.fileName + "\" title=\"" + this.fileName + "\" style=\"width: 50px;\"/></a>"
            + "</td>"
            + "<td title=\"Skriv den tekst der skal dukke op under billedet på www.piaolsen.com...\">"
            + "<input class=\"text\" type=\"text\" id=\"text_da_" + this.id + "\" value=\"" + this.text_da + "\" onchange=\"js_changes = true;\" title=\"Skriv den tekst (dansk) der skal dukke op under billedet på www.piaolsen.com...\"/><br/>"
            + "<input class=\"text\" type=\"text\" id=\"text_en_" + this.id + "\" value=\"" + this.text_en + "\" onchange=\"js_changes = true;\" title=\"Skriv den tekst (engelsk) der skal dukke op under billedet på www.piaolsen.com...\"/>"
            + "</td>"
            + "<td title=\"Skriv hvad billedet skal koste...\">"
            + "<input class=\"text\" type=\"text\" id=\"price_" + this.id + "\" value=\"" + js_transNoFromEnToDa(this.price) + "\" onchange=\"js_changes = true;\" style=\"width: 70px;\"/>"
            + "</td>"
            + "<td title=\"Skriv billedets bredde i cm...\">"
            + "<input class=\"text\" type=\"text\" id=\"width_" + this.id + "\" value=\"" + js_transNoFromEnToDa(this.width) + "\" onchange=\"js_changes = true;\" style=\"width: 70px;\"/>"
            + "</td>"
            + "<td title=\"Skriv billedets højde i cm...\">"
            + "<input class=\"text\" type=\"text\" id=\"height_" + this.id + "\" value=\"" + js_transNoFromEnToDa(this.height) + "\" onchange=\"js_changes = true;\" style=\"width: 70px;\"/>"
            + "</td>" 
            + "<td title=\"Skriv en ikke-til-salg-tekst...\">"
            + "<input class=\"text\" type=\"text\" id=\"sold_text_da_" + this.id + "\" value=\"" + this.sold_text_da + "\" onchange=\"js_changes = true;\" title=\"Skriv en dansk ikke-til-salg-tekst...\"/><br/>"
            + "<input class=\"text\" type=\"text\" id=\"sold_text_en_" + this.id + "\" value=\"" + this.sold_text_en + "\" onchange=\"js_changes = true;\" title=\"Skriv en engelsk ikke-til-salg-tekst...\"/>"
            + "</td>"            
            + "<td align=\"center\" title=\"Kryds af hvis illustrationen ikke er til salg i øjeblikket...\"><input type=\"checkbox\" id=\"sold_" + this.id + "\" " + (this.sold ? "checked" : "") + " onchange=\"js_changes = true;\"/></td>"
            + "<td align=\"center\" title=\"Kryds af hvis illustrationen skal være synlig på www.piaolsen.com...\"><input type=\"checkbox\" id=\"visible_" + this.id + "\" " + (this.visible ? "checked" : "") + " onchange=\"js_changes = true;\"/></td>"
            + "<td align=\"center\" title=\"Kryds af hvis der er tale om en reklame...\"><input type=\"checkbox\" id=\"advertisement_" + this.id + "\" " + (this.advertisement ? "checked" : "") + " onchange=\"js_changes = true;\"/></td>"
            + "<td align=\"center\">"
            + "<input title=\"Kryds af hvis du vil have illustrationen på forsiden...\" type=\"checkbox\" id=\"front_page_" + this.id + "\" " + (this.frontPage ? "checked" : "") + " onchange=\"js_changes = true;\"/>&nbsp;"
            + "<input title=\"Skriv et tal der indsætter illustrationen det rigtige sted i forsiderækkefølgen...\" class=\"text\" type=\"input\" id=\"front_page_sort_" + this.id + "\" value=\"" + js_transNoFromEnToDa(this.frontPageSort) + "\" style=\"width: 50px;\" onchange=\"js_changes = true;\"/>"
            + "</td>"
            + "<td title=\"Skriv et tal der indsætter illustrationen det rigtige sted i rækkefølgen...\"><input class=\"text\" type=\"input\" id=\"sort_" + this.id + "\" value=\"" + js_transNoFromEnToDa(this.sort) + "\" style=\"width: 50px;\" onchange=\"js_changes = true;\"/></td>"
            + "<td class=\"button\" id=\"delete_" + this.id + "\"></td>"			
            + "</tr>";
            return html;
	}
	
	this.writeDelete = function() {
		document.getElementById("delete_" + this.id).innerHTML = 
			(this.removed ? "<input type=\"button\" class=\"button-restore\" value=\"Gendan\" onclick=\"js_illu_" + this.id + ".restore();\" title=\"Klik for at annullere sletningen\"/>" : "<input type=\"button\" value=\"Slet\" onclick=\"js_illu_" + this.id + ".remove();\" title=\"Klik for at slette illustrationen - den egentlige sletning foretages først, når du trykker Gem\"/>");
		document.getElementById("illu_" + this.id).style.border = "1px solid #" + (this.removed ? "f00" : "fff");	
	}
}

function js_sort(a, b) {
	var x = (a == null) ? -1 : a.sort;
	var y = (b == null) ? -1 : b.sort;
	return (x < y) ? 1 : ((x > y) ? -1 : 0);	
}

var js_galleryGroups = new Array();

<?php
$sql_groups = "select * from www_gallery_illu_group order by sort";
$sql_groups2 = mysql_query($sql_groups) or die(mysql_error());
while ($sql_groups3 = mysql_fetch_array($sql_groups2)) {
    print "var js_galleryGroup_".$sql_groups3[id]." = new js_GalleryGroup(".$sql_groups3[id].", \"".htmlspecialchars($sql_groups3[text_en])."\", \"".htmlspecialchars($sql_groups3[text_da])."\", \"".htmlspecialchars($sql_groups3[keyword])."\", ".$sql_groups3[sort].", ".$sql_groups3[visible].");\n";
    print "js_galleryGroups[js_galleryGroups.length] = js_galleryGroup_".$sql_groups3[id].";\n";
    $sql_illus = "select * from www_gallery_illu where group_id = ".$sql_groups3[id]." order by sort desc"; 
    $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
    while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
    	print "var js_illu_".$sql_illus3[id]." = new js_Illu(".$sql_illus3[id].", \"".htmlspecialchars($sql_illus3[file_name])."\", \"".htmlspecialchars($sql_illus3[text_en])."\", \"".htmlspecialchars($sql_illus3[text_da])."\", ".$sql_illus3[price].", ".$sql_illus3[width].", ".$sql_illus3[height].", ".$sql_illus3[sold].", ".$sql_illus3[sort].", ".$sql_illus3[visible].", ".$sql_illus3[ghost].", js_galleryGroup_".$sql_groups3[id].", ".$sql_illus3[advertisement].", ".$sql_illus3[front_page].", ".$sql_illus3[front_page_sort].", \"".htmlspecialchars($sql_illus3[sold_text_en])."\", \"".htmlspecialchars($sql_illus3[sold_text_da])."\");\n";
        print "js_galleryGroup_".$sql_groups3[id].".addIllu(js_illu_".$sql_illus3[id].");\n";
    }
}
?>

function js_removeIllus() {
    for (var i = 0; i < js_galleryGroups.length; i++) {
        var illus = js_galleryGroups[i].illus;
        for (var j = 0; j < illus.length; j++) {
            if ((illus[j] != null) && illus[j].removed) {
                illus[j] = null;	
            }	
        }	
    }	
}

function js_save() {
	js_busyness(true);
    try {
		js_saveSome(0, 0);
	} catch (error) {
        js_busyness(false);
        alert(error);
    }
}

function js_saveSome(groupIndex, illuIndex) {
	if (groupIndex >= js_galleryGroups.length) {
		return js_illusSaved();
	}
	js_galleryGroups[groupIndex].save();
    if (illuIndex >= js_galleryGroups[groupIndex].illus.length) {
		return js_saveSome(groupIndex + 1, 0);
	}
	var illu = js_galleryGroups[groupIndex].illus[illuIndex];
       if (illu == null) {
		return js_saveSome(groupIndex, illuIndex + 1);
	}
	var i = 0;
	var parameters = "save_gallery=true&user_id=<?php print $userId; ?>&sid=" + Math.random();
	do {
		parameters += "&id[]=" + illu.id + "&remove[]=" + illu.removed + "&text_en[]=" + escape(illu.text_en) + "&text_da[]=" + escape(illu.text_da) + "&price[]=" + illu.price + "&width[]=" + illu.width + "&height[]=" + illu.height + "&sold[]=" + illu.sold + "&visible[]=" + illu.visible + "&sort[]=" + illu.sort + "&advertisement[]=" + illu.advertisement + "&front_page[]=" + illu.frontPage + "&front_page_sort[]=" + illu.frontPageSort + "&sold_text_en[]=" + escape(illu.sold_text_en) + "&sold_text_da[]=" + escape(illu.sold_text_da); 
		illu = null;
		if (++illuIndex < js_galleryGroups[groupIndex].illus.length) {
			illu = js_galleryGroups[groupIndex].illus[illuIndex];
		}
	} while ((i++ < 10) && (illu != null));

    js_doAjax("js_saveSome(" + groupIndex + ", " + illuIndex + ")", js_error, "gallery_ajax.php", parameters);
}

function js_illusSaved() {
	js_changes = false;
	js_removeIllus();
	js_writeGalleryGroups();
	if (js_exportOnReturn) {
		js_makePages();	
	} else {
	    js_busyness(false);
    	alert("Så er det hele gemt i databasen :)\n\nHusk at ændringerne ikke kan ses på www.piaolsen.com, før du har trykket på knappen \"Eksportér\"...");
	}
}

function js_writeGalleryGroups() {
	var html = "";
	for (var i = 0; i < js_galleryGroups.length; i++) {
		html += js_galleryGroups[i].write();
	}	
	js_rewrite("gallery_groups", html);
	for (var i = 0; i < js_galleryGroups.length; i++) {
		js_galleryGroups[i].writeIllus();
	}	
}

function js_onLoad() {
	js_writeGalleryGroups();
}
//-->
</script>

<div id="gallery_groups"></div>
