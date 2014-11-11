<?php
clearstatcache();

// Synchronize database and the folder "illus":
synchronizeDatabaseAndServer("../illus", "www_illu_group", "www_illu");
?>

<script language="javascript" type="text/javascript">
<!--
var js_years = new Array(2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012);
var js_seasons = new Array("Forår", "Sommer", "Efterår", "Vinter");
var js_months = new Array("Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December");

function js_IlluGroup(id, text_en, text_da, level, leaf, keyword, sort, visible, parent) {
	this.id = id;
	this.text_en = text_en;
	this.text_da = text_da;
	this.level = level;
	this.leaf = leaf;
	this.keyword = keyword;	
	this.sort = sort;
	this.visible = visible;
	this.parent = parent;

	this.text = function() {
		if ((this.text_da != null) && (this.text_da != "")) {
			return this.text_da;	
		}	
		if ((this.text_en != null) && (this.text_en != "")) {
			return this.text_en;	
		}	
		return this.keyword;
	}	

	this.children = new Array();
	this.addChild = function(child) {
		this.children[this.children.length] = child;	
	}
	
	this.illus = new Array();
	this.addIllu = function(illu) {
		this.illus[this.illus.length] = illu;	
	}

	this.open = false;

	this.fold = function() {
		this.open = !this.open;
		if (this.leaf) {
			document.getElementById("illus_" + this.id).style.display = this.open ? "block" : "none";
		} else if (this.children.length == 0) {
			document.getElementById("empty_" + this.id).style.display = this.open ? "block" : "none";
		} else {
			for (var i = 0; i < this.children.length; i++) {
				document.getElementById("illu_group_" + this.children[i].id).style.display = this.open ? "block" : "none";
			}		
		}	
	}
	
	this.space = function() {
		return "<img border=1 src=\"space.gif\" style=\"width: " + (this.level * 20) + "px;\" alt=\"\"/>";
	}

	this.write = function() {
		var html = "";
		if (this.leaf) {
			html 
				//= "<table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\">"
				//+ "<tr>"
				//+ "<td>"
				= "<div class=\"illu-group-leaf-header\"><a href=\"javascript: js_illuGroup_" + this.id + ".fold();\" title=\"Klik for at folde ud / ind\">" + this.text() + "</a> <span style=\"cursor: default;\" title=\"Navnet på den tilsvarende folder under illus på serveren\">(" + this.keyword + ")</td></div>"
				//+ "</td>"
				//+ "<td class=\"illu-group-leaf-upload\" align=\"right\"><input type=\"button\" onclick=\"js_illuGroup_" + this.id + ".upload();\" value=\"Upload\"/></td>"
				//+ "</tr>"
				//+ "</table>"
				+ "<div class=\"illu-group-illus\" id=\"illus_" + this.id + "\" style=\"display: " + (this.open ? "block" : "none") + ";\"></div>";
		} else {
			if (this != js_illuGroup_0) {
				html 
					= "<div class=\"illu-group-inner\">"
					+ "<div class=\"illu-group-inner-header\"><a href=\"javascript: js_illuGroup_" + this.id + ".fold();\" title=\"Klik for at folde ud / ind\">" + this.text() + "</a></div>";
			}
			if (this.children.length > 0) {
				for (var i = 0; i < this.children.length; i++) {
					html += "<div id=\"illu_group_" + this.children[i].id + "\" style=\"display: " + (this.open ? "block" : "none") + ";\"></div>";
				}
			} else {
				html 
					+= "<div class=\"illu-group-inner-empty\" id=\"empty_" + this.id + "\" style=\"display: " + (this.open ? "block" : "none") + ";\"><i>Tom...</i></div>"			
					+ "</div>";
			}
		}
		js_rewrite("illu_group_" + this.id, html);
		if (this.leaf) {
			this.writeIllus();
		} else {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].write();
			}		
		}
	}
	
	this.writeIllus = function() {
		var count = 0;
		var	html 
			= "<table class=\"illu-list\">"
			+ "<tr>"
			+ "<td class=\"top\"></td>"
			+ "<td class=\"top\"></td>"
			+ "<td class=\"top\" title=\"Teksten der dukker op under illustrationen på www.piaolsen.com\">Titel</td>"
			+ "<td class=\"top\" title=\"Teksten der dukker op under illustrationens titel på www.piaolsen.com\">Undertitel</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Årstiden eller måneden hvor illustrationen blev til\">Måned / Årstid</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Året hvor illustrationen blev til\">År</td>"
			+ "<td class=\"top\" align=\"center\" title=\"Vises illustrationen på www.piaolsen.com?\">Synlig</td>"
			+ "<td class=\"top sort\" align=\"center\"><a href=\"javascript: js_illuGroup_" + this.id + ".sort();\" title=\"Illustrationens placering i røkkefølgen - Klik her for at sortere!\" style=\"text-decoration: underline;\">Placering</a></td>"
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
	
	this.upload = function() {
		var html 
			= "<form enctype=\"multipart/form-data\" action=\"upload.php\" method=\"post\" target=\"test\">"
			+ "<div><input name=\"uploaded\" type=\"file\"/></div>"
			+ "<div><input type=\"submit\" value=\"Upload\"/></div>"
			+ "</form>";
		js_rewrite("popup", html);
		document.getElementById("popup").style.display = "block";	
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

function js_Illu(id, fileName, text_en, text_da, extra_en, extra_da, month, season, year, sort, visible, ghost, parent) {
	this.id = id;
	this.fileName = fileName;
	this.text_en = text_en;
	this.text_da = text_da;
	this.extra_en = extra_en;
	this.extra_da = extra_da;
	this.month = month;
	this.season = season;
	this.year = year;
	this.sort = sort;
	this.visible = visible;
	this.ghost = ghost;
	this.parent = parent;
	
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
		this.extra_da = document.getElementById("extra_da_" + this.id).value;
		this.extra_en = document.getElementById("extra_en_" + this.id).value;
		this.year = document.getElementById("year_" + this.id).value;
		this.season = document.getElementById("season_" + this.id).value;
		this.month = document.getElementById("month_" + this.id).value;
		this.visible = document.getElementById("visible_" + this.id).checked;
		this.sort = parseFloat(js_transNoFromDaToEn(document.getElementById("sort_" + this.id).value));
		if (isNaN(this.sort)) {
			throw "Den placering, du har angiver for illustration " + this.id + " i folderen " + this.getPath() + ", er ikke et kommatal...";
		}
	}
	
	this.getPath = function() {
		var path = "";
		var illuGroup = this.parent;
		while ((illuGroup != null) && (illuGroup != js_illuGroup_0)) {
			path = "\"" + illuGroup.text() + "\"" + ((path == "") ? "" : " -> ") + path;
			illuGroup = illuGroup.parent;			
		}	
		return path
	}
	
	this.write = function() {
        var img = (this.ghost ? "../imgs/ghost.gif" : "../illus/" + this.parent.keyword + "/" + this.fileName);
		var thumb = (this.ghost ? "../imgs/ghost.gif" : "../illus/" + this.parent.keyword + "/thumbs/" + this.fileName);
		var html 
			= "<tr>" 
			+ "<td class=\"no\" title=\"Illustrationens nummer\">" + this.id + "</td>"
			+ "<td class=\"illu\" id=\"illu_" + this.id + "\" align=\"center\" valign=\"middle\">"
			+ "<a href=\"javascript: js_viewImage('" + img + "');\"><img src=\"" + img + "\" alt=\"" + this.fileName + "\" title=\"" + this.fileName + "\" style=\"height: 50px;\"/></a>"
			+ "</td>"
			+ "<td title=\"Skriv den tekst der skal dukke op under illustrationen på www.piaolsen.com...\">"
			+ "<input class=\"text\" type=\"text\" id=\"text_da_" + this.id + "\" value=\"" + this.text_da + "\" onchange=\"js_changes = true;\" title=\"Skriv den tekst (dansk) der skal dukke op under illustrationen på www.piaolsen.com...\"/><br/>"
			+ "<input class=\"text\" type=\"text\" id=\"text_en_" + this.id + "\" value=\"" + this.text_en + "\" onchange=\"js_changes = true;\" title=\"Skriv den tekst (engelsk) der skal dukke op under illustrationen på www.piaolsen.com...\"/>"
			+ "</td>" 
			+ "<td title=\"Skriv evt. ekstra tekst der skal dukke op under illustrationen på www.piaolsen.com...\">"
			+ "<input class=\"text\" type=\"text\" id=\"extra_da_" + this.id + "\" value=\"" + this.extra_da + "\" onchange=\"js_changes = true;\" title=\"Skriv evt. den ekstra tekst (dansk) der skal dukke op under illustrationen på www.piaolsen.com...\"/><br/>"
			+ "<input class=\"text\" type=\"text\" id=\"extra_en_" + this.id + "\" value=\"" + this.extra_en + "\" onchange=\"js_changes = true;\" title=\"Skriv evt. den ekstra tekst (engelsk) der skal dukke op under illustrationen på www.piaolsen.com...\"/>"
			+ "</td>" 
			+ "<td title=\"Vælg den årstid eller måned hvor illustrationen blev til...\">"
			+ "<nobr>"
			+ "<select id=\"month_" + this.id + "\" onchange=\"js_changes = true; js_illu_" + this.id + ".monthSelect();\">"
			+ "<option value=\"0\">-</option>";
		for (var i = 0; i < js_months.length; i++) {
			html += "<option value=\"" + (i + 1) + "\" " + ((this.month == (i + 1)) ? "selected" : "") + ">" + js_months[i] + "</option>";	
		}			
		html
			+= "</select>"
			+ "&nbsp;/&nbsp;"
			+ "<select id=\"season_" + this.id + "\" onchange=\"js_changes = true; js_illu_" + this.id + ".seasonSelect();\">"
			+ "<option value=\"0\">-</option>";
		for (var i = 0; i < js_seasons.length; i++) {
			html += "<option value=\"" + (i + 1) + "\" " + ((this.season == (i + 1)) ? "selected" : "") + ">" + js_seasons[i] + "</option>";	
		}			
		html
			+= "</select>"
			+ "</nobr>"
			+ "</td>"
			+ "<td align=\"center\" title=\"Vælg det år hvor illustrationen blev til...\">"
			+ "<select id=\"year_" + this.id + "\" onchange=\"js_changes = true;\">";
		for (var i = js_years.length; i > 0; i--) {
			html += "<option value=\"" + js_years[i - 1] + "\" " + ((js_years[i - 1] == this.year) ? "selected" : "") + ">" + js_years[i - 1] + "</option>"	
		}
		html
			+= "</select>"
			+ "</td>"			
			+ "<td align=\"center\" title=\"Kryds af hvis illustrationen skal være synlig på www.piaolsen.com...\"><input type=\"checkbox\" id=\"visible_" + this.id + "\" " + (this.visible ? "checked" : "") + " onchange=\"js_changes = true;\"/></td>"
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
	
	this.seasonSelect = function() {
		var newSeason = document.getElementById("season_" + this.id).value;
		if (newSeason != "0") {
			document.getElementById("month_" + this.id).selectedIndex = 0;
		} 
	}

	this.monthSelect = function() {
		var newMonth = document.getElementById("month_" + this.id).value;
		if (newMonth != "0") {
			document.getElementById("season_" + this.id).selectedIndex = 0;
		} 
	}
}

function js_sort(a, b) {
	var x = (a == null) ? -1 : a.sort;
	var y = (b == null) ? -1 : b.sort;
	return (x < y) ? 1 : ((x > y) ? -1 : 0);	
}

var js_leafs = new Array();

var js_illuGroup_0 = new js_IlluGroup(0, "root", 0, false, "", 0, false);
js_illuGroup_0.open = true;

<?php
/*
 * Generate illu menu tree:
 */
function write($parentId, $level) {
	$sql_groups = "select * from www_illu_group where parent_id = $parentId order by sort";
	$sql_groups2 = mysql_query($sql_groups) or die(mysql_error());
	while ($sql_groups3 = mysql_fetch_array($sql_groups2)) {
		print "var js_illuGroup_".$sql_groups3[id]." = new js_IlluGroup(".$sql_groups3[id].", \"".htmlspecialchars($sql_groups3[text_en])."\", \"".htmlspecialchars($sql_groups3[text_da])."\", ".$level.", ".$sql_groups3[leaf].", \"".htmlspecialchars($sql_groups3[keyword])."\", ".$sql_groups3[sort].", ".$sql_groups3[visible].", js_illuGroup_".$parentId.");\n";
		print "js_illuGroup_".$parentId.".addChild(js_illuGroup_".$sql_groups3[id].");\n";
		if ($sql_groups3[leaf]) {
			print "js_leafs[js_leafs.length] = js_illuGroup_".$sql_groups3[id].";\n";	
			$sql_illus = "select * from www_illu where group_id = ".$sql_groups3[id]." order by sort desc"; 
			$sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
			while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
				print "var js_illu_".$sql_illus3[id]." = new js_Illu(".$sql_illus3[id].", \"".htmlspecialchars($sql_illus3[file_name])."\", \"".htmlspecialchars($sql_illus3[text_en])."\", \"".htmlspecialchars($sql_illus3[text_da])."\", \"".htmlspecialchars($sql_illus3[extra_en])."\", \"".htmlspecialchars($sql_illus3[extra_da])."\",".$sql_illus3[month].", ".$sql_illus3[season].", ".$sql_illus3[year].", ".$sql_illus3[sort].", ".$sql_illus3[visible].", ".$sql_illus3[ghost].", js_illuGroup_".$sql_groups3[id].");\n";
				print "js_illuGroup_".$sql_groups3[id].".addIllu(js_illu_".$sql_illus3[id].");\n";
			}
		} 
		print write($sql_groups3[id], $level + 1); 
	}
}

write(0, 0);
?>

function js_removeIllus() {
	for (var i = 0; i < js_leafs.length; i++) {
		var illus = js_leafs[i].illus;
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

function js_saveSome(leafIndex, illuIndex) {
	if (leafIndex >= js_leafs.length) {
		return js_illusSaved();
	}
	js_leafs[leafIndex].save();
    if (illuIndex >= js_leafs[leafIndex].illus.length) {
		return js_saveSome(leafIndex + 1, 0);
	}
	var illu = js_leafs[leafIndex].illus[illuIndex];
       if (illu == null) {
		return js_saveSome(leafIndex, illuIndex + 1);
	}
	var i = 0;
	var parameters = "save_illus=true&user_id=<?php print $userId; ?>&sid=" + Math.random();
	do {
		parameters += "&id[]=" + illu.id + "&remove[]=" + illu.removed + "&text_en[]=" + escape(illu.text_en) + "&text_da[]=" + escape(illu.text_da) + "&extra_en[]=" + escape(illu.extra_en) + "&extra_da[]=" + escape(illu.extra_da) + "&year[]=" + illu.year + "&season[]=" + illu.season + "&month[]=" + illu.month + "&visible[]=" + illu.visible + "&sort[]=" + illu.sort;
		illu = null;
		if (++illuIndex < js_leafs[leafIndex].illus.length) {
			illu = js_leafs[leafIndex].illus[illuIndex];
		}
	} while ((i++ < 10) && (illu != null));

    js_doAjax("js_saveSome(" + leafIndex + ", " + illuIndex + ")", js_error, "illus_ajax.php", parameters);
}

function js_illusSaved() {
	js_changes = false;
	js_removeIllus();
	js_illuGroup_0.write();
	if (js_exportOnReturn) {
		js_makePages();	
	} else {
	    js_busyness(false);
    	alert("Så er det hele gemt i databasen :)\n\nHusk at ændringerne ikke kan ses på www.piaolsen.com, før du har trykket på knappen \"Eksportér\"...");
	}
}

function js_onLoad() {
	js_illuGroup_0.write();
}
//-->
</script>

<div id="illu_group_0"></div>
