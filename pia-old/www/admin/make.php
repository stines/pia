<?php
include "connect.php";
include "vars.php";
include "utils.php";

/*
 * Generates upper right menu.
 */
function getTopMenu($rootDir, $pageKeyword, $group, $english) {
    $menu = '';
    $sql_items = "select * from www_top_menu_item where visible = 1 order by sort";
    $sql_items2 = mysql_query($sql_items) or die(mysql_error());
    while ($sql_items3 = mysql_fetch_array($sql_items2)) {
        $text = getTextByLang($english, $sql_items3[text_en], $sql_items3[text_da]);
        $descr = getTextByLang($english, $sql_items3[description_en], $sql_items3[description_da]);
        $url = getCompleteUrl($rootDir, getTextByLang($english, $sql_items3[url_en], $sql_items3[url_da]));
        $a = '<a href="'.$url.'" title="'.$descr.'">';
        $img = getCompleteUrl($rootDir, $sql_items3[image]);
        $menu .= '
            <div class="top_menu_item">
              <div class="top_menu_image">'.$a.'<img src="'.$img.'" alt="" /></a></div>
              <div class="'.(($pageKeyword == $sql_items3[keyword]) ? 'active' : '').'">'.$a.$text.'</a></div>
            </div>';
    }
    // Newsletter:
    $text = $english ? 'Newsletter' : 'Nyhedsbrev';
    $descr = $english ? 'Click to subscribe/unsubscribe my newsletter :)' : 'Klik for at afmelde/tilmelde dig mit nyhedsbrev :)';
    $menu .= '
        <div class="top_menu_item">
          <div class="top_menu_image">
            <a href="javascript: js_popup_news.update();" onmousedown="js_popup_news.click();" title="'.$descr.'"><img src="'.$rootDir.'imgs/menu/news.jpg" alt="" /></a>
          </div>
          <div><a id="news_link" style="position: relative;" href="javascript: js_popup_news.update();" onmousedown="js_popup_news.click();" title="'.$descr.'">'.$text.'</a></div>
        </div>';
    // Language:
    $text = $english ? 'Danish' : 'English';
    $descr = $english ? 'Switch to the Danish version of my home page' : 'Switch to the English version og my home page';
    $url = (($pageKeyword == "index") && $english) ? "http://www.piaolsen.com/" : $rootDir.$pageKeyword.(($group == null) ? "" : "_".$group).($english ? "" : "_en").".html";
    $image = $rootDir.'imgs/menu/'.($english ? 'danish.jpg' : 'english.jpg');
    $menu .= '
        <div class="top_menu_item">
          <div class="top_menu_image"><a href="'.$url.'" title="'.$descr.'"><img src="'.$image.'" alt="" /></a></div>
          <div><a href="'.$url.'" title="'.$descr.'">'.$text.'</a></div>
        </div>';
    return $menu;
}

/*
 * Generates content of front page.
 */
function getFront($rootDir, $english) {
/* <div style="position: absolute; top: 100px; right: 20px; z-index: 10;"><a href="javascript: js_viewFlyer(\''.$rootDir.'imgs/julemarked2008.jpg\', \'Julemarked 2008\', 722, 1001);" title="Klik for at se årets julemarkedflyer :)"><img src="'.$rootDir.'imgs/julemarked2008link.gif" alt="" /></a></div> */
    $page = '<div class="illu_front_page">';
    if ($english) {
        $page .= '<a href="http://www.piaolsen.com/www/gallery_mennesker.html" title="Click here to see drawings for sale :)"><img src="'.$rootDir.'imgs/front_en.gif" alt="" /></a>';
    } else {
        $page .= '<a href="http://www.piaolsen.com/www/gallery_mennesker.html" title="Klik her for at se tegninger til salg :)"><img src="'.$rootDir.'imgs/front.gif" alt="" /></a>';
    }
    $page .= '</div>';
    // Gallery teaser banner:
	if (0) {
    $i = 0;
    $sql_illus_no = "select count(*) as no from www_gallery_illu where front_page = 1";
    $sql_illus_no2 = mysql_query($sql_illus_no) or die(mysql_error());
    if ($sql_illus_no3 = mysql_fetch_array($sql_illus_no2)) {
        $i = $sql_illus_no3[no];
    }
    if ($i > 0) {
        $width = 900 / $i;
        $page .= '
            <div class="gallery_front_page">
              <table>
              <tr>';
        $sql_illus = "select * from www_gallery_illu where front_page = 1 order by front_page_sort desc";
        $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
        while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
            $sql_gallery = "select * from www_gallery_illu_group where id = ".$sql_illus3[group_id];
            $sql_gallery2 = mysql_query($sql_gallery) or die(mysql_error());
            if ($sql_gallery3 = mysql_fetch_array($sql_gallery2)) {
                $text = getTextByLang($english, $sql_illus3[text_en], $sql_illus3[text_da]);
                $link = 'http://www.piaolsen.com/www/gallery_'.$sql_gallery3[keyword].($english ? '_en' : '').'.html#illu_'.$sql_illus3[id];
                $title = $english ? 'Click to see '.$text.' at my web gallery' : 'Klik for at gå til '.$text.' i netgalleriet';
                $page .= '
                     <td style="width: '.$width.'px;" valign="middle">
                        <div><a href="'.$link.'" title="'.$title.'"><img style="width: '.($width - 30).'px;" src="'.$rootDir.'gallery/'.$sql_gallery3[keyword].'/'.$sql_illus3[file_name].'" alt="" /></a></div>
                        <div class="gallery_front_page_link"><a href="'.$link.'" title="'.$title.'">'.$text.' &#187;</a></div>
                     </td>';
              }
        }
        $page .= '
              </tr>
              </table>
            </div>';
		}
    }
    return $page;
}

/*
 * Generates illustrations menu.
 */
function getIlluMenu($rootDir, $illuGroupId, $parentId, $level, $english) {
    $menu = "";
    $space = getLevelAsSpace($level);
    $sql_illuGroups = "select * from www_illu_group where parent_id = $parentId and visible = 1 order by sort";
    $sql_illuGroups2 = mysql_query($sql_illuGroups) or die(mysql_error());
    while ($sql_illuGroups3 = mysql_fetch_array($sql_illuGroups2)) {
        $sql_illus = "select * from www_illu where group_id = $sql_illuGroups3[id] and visible = 1 and ghost = 0";
        $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
        if (!$sql_illuGroups3[leaf] || $sql_illus3 = mysql_fetch_array($sql_illus2)){
            $text = getTextByLang($english, $sql_illuGroups3[text_en], $sql_illuGroups3[text_da]);
            if ($sql_illuGroups3[leaf]) {
                $menu .= "<div class=\"leaf ".(($illuGroupId == $sql_illuGroups3[id]) ? "active" : "")."\">".$space."<a href=\"".$rootDir."illus_".$sql_illuGroups3[keyword].($english ? "_en" : "").".html\" title=\"".$text."\">".$text."</a></div>\n";
            } else {
                $menu .= "<div class=\"inner\">".$space.$text."</div>\n";
            }
        }
        $menu .= getIlluMenu($rootDir, $illuGroupId, $sql_illuGroups3[id], $level + 1, $english);
    }
    return $menu;
}

/*
 * Generates content of illustrations page for a given group.
 */
function getIllus($rootDir, $illuGroup, $illuGroupId, $english) {
    $illus = "";
    if ($illuGroup != null) {
        $i = 0;
        $sql_illus = "select * from www_illu where group_id = $illuGroupId and visible = 1 and ghost = 0 order by sort desc";
        $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
        while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
            $text = getTextByLang($english, $sql_illus3[text_en], $sql_illus3[text_da]);
            $date = "";
            if ($sql_illus3[month] != 0) {
                $date .= getMonth($sql_illus3[month], $english);
            } else if ($sql_illus3[season] != 0) {
                $date .= getSeason($sql_illus3[season], $english);
            }
            $date .= " ".$sql_illus3[year];
            $extra = getTextByLang($english, $sql_illus3[extra_en], $sql_illus3[extra_da]);
            $illus .= '
                <div class="illu'.(($i == 0) ? '_first' : '').'">
                  <img src="'.$rootDir.'illus/'.$illuGroup.'/'.$sql_illus3[file_name].'" alt="'.$text.'" />
                  <div class="illu_title">'.$text.'</div>';
            if ($extra != "") {
                if (strrpos($extra, "http://") == 0) {
                    $extra = '<a href="'.$extra.'">'.$extra.'</a>';
                }
                $illus .= '<div class="illu_extra">'.$extra.'</div>';
            }
            $illus .= '
                  <div class="illu_date">'.$date.'</div>        
                </div>';    
            $i++;
        }
    }
    return $illus;
}

/*
 * Generates content of gallery for a given group.
 */
function getGallery($rootDir, $galleryGroup, $galleryGroupId, $english) {
    $activeGroup = null;
    $gallery = '<div class="gallery">';
    if (0) {
      $gallery .= '
          <div class="gallery_header">'.(($galleryGroup == "indsamling") ? "Køb en original og hjælp Afrika" : ($english ? 'Buy an original' : 'Køb en original')).'</div>
          <div class="gallery_text">';
      if ($galleryGroup == "indsamling") {
         $gallery .= '
            Jeg har i dag sat 14 små originaltegninger til salg, som, jeg håber, vil kunne samle lidt penge ind til de nødlidende i Afrika. Tegningerne koster <b>150 kroner</b> stykket, men du er naturligvis meget velkommen til at give et større beløb for dem, hvis du har lyst til det.<br/><br/>
            Hvis du vil bestille en original, kan du benytte dig af formularen til højre eller sende en email til <a href="mailto:Pia Olsen <po@piaolsen.com>?subject=Jeg vil gerne støtte Afrika ved at købe en fugl" title="Send mig en email">po@piaolsen.com</a>. Her angiver du nummeret på den fugl, du ønsker at købe, samt det beløb, du ønsker at give for den. Jeg vender derefter tilbage til dig omkring betaling og den adresse, tegningen skal sendes til. Alle penge, der kommer ind, går til Red Barnet og organisationens arbejde i Afrika lige nu.<br/><br/>
            Fugleportrætterne er malet på håndlavet offsetpapir og er udført med sort tuschpen og akvarel. Fuglene er ikke monteret i ramme.<br/><br/>
            Prisen er inklusive moms og forsendelse.';
      } else {
        if ($english) {
          $gallery .= '
            Welcome to my online gallery where an amount of my portraits and paintings are for sale.<br/><br/>
            All the portraits under the categories <a href="'.$rootDir.'gallery_mennesker.html" title="People">People</a> and <a href="'.$rootDir.'gallery_fugle.html" title="Birds">Birds</a> are painted with black pen and aquarelle on hand made offset paper. 
            Each portrait comes in a beautiful old frame or in one of Ikea&#39;s Ribba frames with a passepartout.<br/><br/>
            The paintings which can be found under <a href="'.$rootDir.'gallery_malerier.html" title="Paintings">Paintings</a> are painted with acrylic paint and liquid ink on canvas.<br/><br/>
            If you would like to buy a portrait or painting please send an e-mail to <a href="mailto:Pia Olsen <po@piaolsen.com>?subject=I would like to buy from your web gallery" title="Send me an e-mail">po@piaolsen.com</a> telling the number of the portrait or painting. I will then return to you as soon as possible.<br/><br/>
            Moms and shipping are included in all prices. By picking up the portrait yourself you can save 100 kroners though.';
        } else {
          $gallery .= '
            Herunder ser du alle de værker, som jeg har til salg netop nu.<br/><br/>
            Alle portrætterne under <a href="'.$rootDir.'gallery_mennesker.html" title="Mennesker">Mennesker</a> og <a href="'.$rootDir.'gallery_fugle.html" title="Fugle">Fugle</a> er malet på håndlavet offsetpapir og er udført med sort tuschpen og akvarel. 
            Hvert portræt er monteret I en fin, gammel ramme eller I en Ribba-ramme med passepartout fra Ikea.<br/><br/>
            Værkerne under <a href="'.$rootDir.'gallery_malerier.html" title="Malerier">Malerier</a> er malet med acrylmaling og flydende tusch på lærred.<br/><br/>
            Hvis du vil bestille et portræt eller et maleri, så kan du benytte dig af formularen til højre eller sende en email til <a href="mailto:Pia Olsen <po@piaolsen.com>?subject=Jeg vil gerne købe fra netgalleriet" title="Send mig en email">po@piaolsen.com</a>, hvori du angiver nummeret på det portræt eller det maleri, som du ønsker at købe. Så vender jeg tilbage til dig så hurtigt, jeg kan.<br/><br/>
            De angivne priser er inklusive moms og forsendelse. Hvis du vil spare 100 kroner, kan du komme forbi tegnestuen og hente billedet.';
        }
      }
      $gallery .= '</div>';
    }
    // Order form:
    $gallery .= '
    <div id="gallery_form">
        <form onsubmit="return false;">
        <div class="gallery_form_header">'.($english ? 'Your e-mail address' : 'Din email-adresse').':</div><div><input type="text" id="from" /></div>
        <div class="gallery_form_header">'.($english ? 'Your phone number' : 'Dit telefonnummer').':</div><div><input type="text" id="phone" /></div>
        <div class="gallery_form_header">'.($english ? 'Order numbers' : 'Originalnumre').':</div><div><input type="text" id="numbers" /></div>
        <div class="gallery_form_header">'.($english ? 'Message' : 'Yderligere kommentar').':</div><div><textarea id="message"></textarea></div>
        <div class="gallery_form_send"><a href="javascript: js_submitGalleryForm('.$english.');" title="'.($english ? 'Submit form' : 'Send formularen afsted').'">Send &#187;</a></div>
        </form>
    </div>
    <div id="gallery_form_thanks">'.($english ? 'Thank you :) I will get back to you as soon as possible!' : 'Tak for din bestilling :) Jeg vender tilbage snarest!').'</div>
        
    <div class="gallery_menu">';              
      // Gallery menu:    
      $g = 0;
      $sql_groups = "select * from www_gallery_illu_group where visible = 1 order by sort";
      $sql_groups2 = mysql_query($sql_groups) or die(mysql_error());
      while ($sql_groups3 = mysql_fetch_array($sql_groups2)) {
      	$sql_illus = "select * from www_gallery_illu where visible = 1 and ghost = 0 and group_id = $sql_groups3[id]";
        $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
        if ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
            $g++;
            $text = getTextByLang($english, $sql_groups3[text_en], $sql_groups3[text_da]);
            if ($galleryGroup == $sql_groups3[keyword]) {
                $activeGroup = $sql_groups3;
                $gallery .= '<div class="tab_active"><div class="tab_content">'.$text.'</div></div>';        
            } else {
                $link = '<a href="'.$rootDir.'gallery_'.$sql_groups3[keyword].($english ? '_en' : '').'.html" title="'.$text.'">'.$text.'</a>';
                $gallery .= '<div class="tab"><div class="tab_content">'.$link.'</div></div>';
            }
        }
      }    
      $gallery .= '  
    </div>
    <div class="gallery_illus">';
    // Gallery images:
    if ($activeGroup != null) {
        $i = 0;
        $sql_illus = "select * from www_gallery_illu where group_id = $galleryGroupId and visible = 1 order by sort desc";
        $sql_illus2 = mysql_query($sql_illus) or die(mysql_error());
        while ($sql_illus3 = mysql_fetch_array($sql_illus2)) {
            $sold = $english ? $sql_illus3[sold_text_en] : $sql_illus3[sold_text_da];
            $width = $sql_illus3[width];
            $height = $sql_illus3[height];
            $price = $sql_illus3[price];
            if (!$english) {
                $width = transNoFromEnToDa($width);
                $height = transNoFromEnToDa($height);
                $price = transNoFromEnToDa($price);
            }
            $fileName = $rootDir.'gallery/'.$galleryGroup.'/';      
            if ($english && $sql_illus3[advertisement] && is_file('../gallery/'.$galleryGroup.'/english_'.$sql_illus3[file_name])) {
                $fileName .= "english_";
            }
            $fileName .= rawurlencode($sql_illus3[file_name]);
            if ($activeGroup[paintings] == "1") {
                // Paintings:
                $gallery .= '
                    <div class="gallery_painting" id="illu_'.$sql_illus3[id].'">
                    <div class="gallery_painting_img"><img src="'.$fileName.'" alt="" /></div>';
                if (!($sql_illus3[advertisement])) {
                    $gallery .= '
                      <div class="gallery_painting_info">
                        <div class="gallery_painting_title">'.getTextByLang($english, $sql_illus3[text_en], $sql_illus3[text_da]).'</div>
                        <div class="gallery_painting_no">'.($english ? 'No' : 'Maleri nr.').' '.$sql_illus3[id].'</div>
                        <div class="gallery_painting_facts">'.$width.' x '.$height.' cm&nbsp;&nbsp;/&nbsp;&nbsp;'.$price.' '.($english ? 'DKR' : 'kr.').'</div>';
                    if ($sql_illus3[sold]) {
                        $gallery .= '<div class="gallery_painting_sold">'.$sold.'</div>';
                    } else {
                        $gallery .= '<div class="gallery_painting_order">'.($english ? "Call me on +45 2272 9047 for further info." : "Ring til mig på 2272 9047 for at høre nærmere.").'</div>';
                    }
                    $gallery .= '
                        </div>';
                }
                $gallery .= '
                    </div>';
            } else {    
                // Drawings:        
                $gallery .= ' 
                    <div class="gallery_illu" id="illu_'.$sql_illus3[id].'">
                      <div class="gallery_illu_img"><img src="'.$fileName.'" alt="" /></div>';
                if (!($sql_illus3[advertisement])) {
                    if ($activeGroup[text_da] != "Indsamling") {
                    $gallery .= '
                        <div class="gallery_illu_title">'.getTextByLang($english, $sql_illus3[text_en], $sql_illus3[text_da]).'</div>
                        <div class="gallery_illu_no">'.($english ? 'No' : 'Original nr.').' '.$sql_illus3[id].'</div>
                        <div class="gallery_illu_facts">'.$width.' x '.$height.' cm&nbsp;&nbsp;/&nbsp;&nbsp;'.$price.' '.($english ? 'DKR' : 'kr.').'</div>';
                    }
                    if ($sql_illus3[sold]) {
                        $gallery .= '<div class="gallery_illu_sold">'.$sold.'</div>';
                    } else {
                        if ($activeGroup[text_da] == "Indsamling") {
                            $gallery .= "<div class=\"gallery_illu_order\" style=\"padding-bottom:40px;\"><a href=\"javascript: js_add($english, '".$sql_illus3[text_da]."');\" title=\"".($english ? "Add this portrait to the order form" : "Tilføj originalen til bestillingsformularen øverst på siden")."\">".($english ? "Order" : "Bestil")." &#187;</a></div>";
                        } else {
                               $gallery .= '<div class="gallery_illu_order"><a href="javascript: js_add('.$english.', '.$sql_illus3[id].');" title="'.($english ? "Add this portrait to the order form" : "Tilføj originalen til bestillingsformularen øverst på siden").'">'.($english ? "Order" : "Bestil").' &#187;</a></div>';
                        }
                    }
                    if ($activeGroup[text_da] == "Indsamling") {
                        $gallery .= '<div style="padding-bottom:40px;">&nbsp;</div>';
                    }
                }
                $gallery .= '</div>';           
            }
            $i++;                
        }
        $gallery .= '</div>';
    }
    $gallery .= '</div>';
    return $gallery;
}

/*
 * Generates content of info/contact page.
 */
function getInfo($rootDir, $english) {    
    // Images:
    $images = '
      <div class="images_contents">
        <img class="pia" src="http://www.piaolsen.com/www/imgs/gm.jpg" alt="" /><br/>
        <a href="javascript: js_medRundt();" title="'.($english ? "Click to read the interview from Med Rundt" : "Klik for at læse et interview, der blev bragt i Med Rundt").'"><img src="http://www.piaolsen.com/www/imgs/medrundt_ikon.jpg" alt="" style="width: 105px;" /></a>
      </div>';            
    // CV:
    $cv = '
      <div class="info_header">'.($english ? 'About me' : 'Om mig').'</div>
      <div class="cv_contents">';
    if ($english) {
        $cv .= '<div class="cv_contents_section">Spring 2003 I graduated as visual communication designer from the Danish Design School, Department of Visual Communications. Since then I have been working as a freelance illustrator and am part of the art studio <a href="http://www.himmelskehund.dk/" title="Visit the home page of Himmelske Hunds">Himmelske hund</a> located in the heart of Copenhagen.</div>
        <div class="cv_contents_section">I work with both drawing and painting and have a pronounced expressive style. My special interest is to portray human personalities rather than what can be observed with the naked eye.</div>
        <div class="cv_contents_section">Characteristics of my works are that they are simple, easy to decode, and have a humorous, warm and obliging expression. I work on paper or canvas and I prefer to use bright, strong colours in combination with ink. I am always putting great effort in making my strikes variated and moving.</div>
        <div class="cv_contents_section">Feel free to read more in <a href="javascript: js_medRundt();" title="Click to read an interview from Med Rundt">an interview</a> from the magazine Med Rundt, March 2009 (in Danish only).</div>';
     } else {
        $cv .= '<div class="cv_contents_section">Jeg blev i 2003 uddannet som illustrator fra Danmarks Designskole, Institut for Visuel Kommunikation. Siden da har jeg arbejdet som freelancetegner og er en del af tegnestuen <a href="http://www.himmelskehund.dk/" title="Besøg Himmelske Hunds hjemmeside">Himmelske hund</a>, som har adresse I centrum af København.</div>
        <div class="cv_contents_section">Jeg arbejder både med tegning og maleri. Min stil er ekspressiv idet min særlige interesse er at skildre menneskers sindstilstande og personligheder fremfor at tegne det, som umiddelbart kan ses med det blotte øje.</div>
        <div class="cv_contents_section">Kendetegnende for mine værker er, at de er enkle, lette at afkode og har et humoristisk, varmt og imødekommende udtryk. Jeg arbejder på papir eller lærred og fortrækker at benytte lysende, stærke farver kombineret med tusch. Jeg går meget op I at skabe variation i min streg, så den fremstår sitrende og levende.</div>
        <div class="cv_contents_section">Læs eventuelt også <a href="javascript: js_medRundt();" title="Klik for at læse et interview, der blev bragt i Med Rundt, marts 2009">et interview</a>, der blev bragt i Med Rundt, marts 2009.</div>';
    }
    $cv .= '</div>';    
    // Customers:
    $customers = '
      <div class="info_header">'.($english ? 'Customers' :'Kunderne').'</div>
      <div class="customers_contents">';
    $c = 0;
    $sql_customers = "select * from www_customer where gallery = 0 order by name_da";
    $sql_customers2 = mysql_query($sql_customers) or die(mysql_error());
    while ($sql_customers3 = mysql_fetch_array($sql_customers2)) {
        $text = getTextByLang($english, $sql_customers3[name_en], $sql_customers3[name_da]);
        $url = getTextByLang($english, $sql_customers3[url_en], $sql_customers3[url_da]);
        if ($c > 0) {
            $customers .= '<br/>';
        }
        $c++;
        $customers .= '<a href="'.$url.'" title="'.$url.'">'.$text.'</a>';
    }
    $customers .= '</div>';
    // Contact:
    $contact = '
      <div class="info_header">'.($english ? 'Contact' : 'Kontakt').'</div>
      <div class="contact_contents">';
    if ($english) { 
        $contact .= '
            <div class="contact_contents_section">I am part of the art studio <a href="http://www.himmelskehund.dk/" title="Visit the home page of Himmelske Hunds">Himmelske hund</a><br/>
            <a href="http://goo.gl/maps/WPbNg" title="Click to see the address on a map">Nørregade 45B, 4th floor,<br/>1165 Copenhagen K</a>.</div>
            <div class="contact_contents_section">My telephone number is +45 2272 9047 and my e-mail address is <a href="mailto:Pia%20Olsen%20<po@piaolsen.com>" title="Send me an e-mail">po@piaolsen.com</a>.</div>
            <div class="contact_contents_section">You can find my Webmaster <a href="http://www.stinesplace.com/" title="Visit Stine&#39;s Place">here</a>.</div>';
    } else {
        $contact .= '
            <div class="contact_contents_section">Jeg sidder på tegnestuen <a href="http://www.himmelskehund.dk/" title="Besøg Himmelske Hunds hjemmeside">Himmelske Hund</a>,<br/>
            <a href="http://goo.gl/maps/WPbNg" title="Klik for at se adressen peget ud på et kort">Nørregade 45B, 4. sal,<br/>1165 København K</a>.</div>
            <div class="contact_contents_section">Du kan ringe til mig på 2272 9047 eller skrive en mail til mig på <a href="mailto:Pia%20Olsen%20<po@piaolsen.com>" title="Klik for at skrive en e-mail til mig :)">po@piaolsen.com</a>.</div>
            <div class="contact_contents_section">Webmaster finder du <a href="http://www.stinesplace.com/" title="Besøg Stine&#39;s Place">her</a>.</div>';
    }
    $contact .= '</div>';
    // Whole page:
    $info = '
      <div class="info">
        <div class="images">'.$images.'</div>
        <div class="cv">'.$cv.'</div>
        <div class="customers">'.$customers.'</div>
        <div class="contact">'.$contact.'</div>
      </div>';
    return $info;
}

/*
 * Generates a given page.
 */
function getPage($rootDir, $pageKeyword, $group, $groupId, $english) {
    $page = '
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <!--[if IE]>
    <meta http-equiv="imagetoolbar" content="no" />
    <![endif]-->
    <link rel="shortcut icon" href="'.$rootDir.'imgs/favicon.ico" />
    <link rel="icon" type="image/x-icon" href="'.$rootDir.'imgs/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="'.$rootDir.'css/style.css" />
    <script type="text/javascript" src="'.$rootDir.'js/ajax.js"></script>
    <script type="text/javascript" src="'.$rootDir.'js/utils.js"></script>
    <script type="text/javascript" src="'.$rootDir.'js/send.js"></script>
    <script type="text/javascript" src="'.$rootDir.'js/popup.js"></script>
    <script type="text/javascript" src="'.$rootDir.'js/news.js"></script>
    <script type="text/javascript">
    <!--
    var js_popup_news = new js_Popup("news", "below_left", "news_email");
    js_popups[p++] = js_popup_news;
    document.onmouseup = function() { 
        js_popup_onmouseup();
    }
	var js_bodyMethods = {
        onload : function() {
		    js_popup_init();
		},
        onunload : function() {}
    };
    //-->
    </script>
    <title>Pia Olsen</title>
    </head>
    <body onload="js_bodyMethods.onload();">
    <div class="main">
    <div class="top">
      <div class="signatur">
        <a href="'.($english ? $rootDir.'index_en.html' : 'http://www.piaolsen.com').'"><img src="'.$rootDir.'imgs/signatur.gif" alt="" /></a>
      </div>
      <div class="top_menu">'.getTopMenu($rootDir, $pageKeyword, $group, $english).'</div>
    </div>';
    if ($pageKeyword == "illus") {
        $page .= '<div class="menu">'.getIlluMenu($rootDir, $groupId, 0, 0, $english).'</div>';  
    }
    $page .= '
    <div class="content content_'.$pageKeyword.'">
    ';
    if ($pageKeyword == "index") {
        $page .= getFront($rootDir, $english);
    } else if ($pageKeyword == "illus") {
        $page .= getIllus($rootDir, $group, $groupId, $english);
    } else if ($pageKeyword == "gallery") {
        $page .= getGallery($rootDir, $group, $groupId, $english);
    } else if ($pageKeyword == "info") {
        $page .= getInfo($rootDir, $english);
    }
    $page .= '
    </div>
    <div class="footer">';
      if (($pageKeyword == "illus") || ($pageKeyword == "gallery")) {
        $page .= '<div class="top_link"><a href="#" title="'.($english ? 'Scroll to top' : 'Gå til toppen').'">'.($english ? 'Scroll to top' : 'Gå til toppen').' &#187;</a></div>';
      }
      $page .= '
        <div class="copyright">&copy; Copyright '.date("Y").' by Pia Olsen</div>
    </div>
    </div>
    
    <div id="news" class="popup" onmousedown="js_popup_news.click();">
      <form onsubmit="return false;">
        <div>'.($english ? 'E-mail address' : 'Emailadresse').':</div>
        <div><input type="text" name="news_input" id="news_email" /></div>
        <div id="news_submit">
          <a href="javascript: js_submitNewsForm('.$english.',1);">'.($english ? 'Sub' : 'Tilmeld').' &#187;</a>&nbsp;
          <a href="javascript: js_submitNewsForm('.$english.',0);">'.($english ? 'Unsub' : 'Afmeld').' &#187;</a>&nbsp;
        </div>
        <div id="news_busy"><img src="http://www.stinesplace.com/www/imgs/busy.gif" alt="" /></div>
      </form>
    </div>

    <script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
    var pageTracker = _gat._getTracker("UA-2802134-3");
    pageTracker._trackPageview();
    </script>

    </body>
    </html>';
    return $page;    
}

/*
 * Writes data to file in UTF-8 format.
 */ 
function utf8File($fileName, $data) {
    writeFile($fileName, mb_convert_encoding($data, 'UTF-8')); 
}

/*
 * Creates pages.
 */
if (isset($_POST[make])) {
    // ** VIGTIGT ** Sørg for ikke at lave rettelser via adminmodulet imens!!
    //resetIds("www_gallery_illu");
    
    // Create front page:
    utf8File("../index.html", getPage($rootDir, "index", null, -1, 0)); 
    utf8File("../index_en.html", getPage($rootDir, "index", null, -1, 1)); 
    
    // Create all illu pages:
    $frontIllus = 0;
    $sql_leafs = "select * from www_illu_group where leaf = 1";
    $sql_leafs2 = mysql_query($sql_leafs) or die(mysql_error());
    while ($sql_leafs3 = mysql_fetch_array($sql_leafs2)) {
        // Danish:
        $fileName = "../illus_".$sql_leafs3[keyword].".html";
        utf8File($fileName, getPage($rootDir, "illus", $sql_leafs3[keyword], $sql_leafs3[id], 0)); 
        if ($sql_leafs3[start]) {
            $frontIllus = 1;
            copy($fileName, "../illus.html");
        }
        // English:
        $fileName = "../illus_".$sql_leafs3[keyword]."_en.html";
        utf8File($fileName, getPage($rootDir, "illus", $sql_leafs3[keyword], $sql_leafs3[id], 1)); 
        if ($sql_leafs3[start]) {
            copy($fileName, "../illus_en.html");
        }        
    }
    if (!$frontIllus) {
        utf8File("../illus.html", getPage($rootDir, "illus", null, -1, 0)); 
        utf8File("../illus_en.html", getPage($rootDir, "illus", null, -1, 0)); 
    }

    // Create all web gallery pages:
    $frontGallery = 0;
    $sql_gallery = "select * from www_gallery_illu_group";
    $sql_gallery2 = mysql_query($sql_gallery) or die(mysql_error());
    while ($sql_gallery3 = mysql_fetch_array($sql_gallery2)) {
        // Danish:
        $fileName = "../gallery_".$sql_gallery3[keyword].".html";
        utf8File($fileName, getPage($rootDir, "gallery", $sql_gallery3[keyword], $sql_gallery3[id], 0)); 
        if ($sql_gallery3[start] == "1") {
            $frontGallery = 1;
            copy($fileName, "../gallery.html");
        }
        // English:
        $fileName = "../gallery_".$sql_gallery3[keyword]."_en.html";
        utf8File($fileName, getPage($rootDir, "gallery", $sql_gallery3[keyword], $sql_gallery3[id], 1));
        if ($sql_gallery3[start]) {
            copy($fileName, "../gallery_en.html");
        } 
    }
    if (!$frontGallery) {
        utf8File("../gallery.html", getPage($rootDir, "gallery", null, -1, 0)); 
        utf8File("../gallery_en.html", getPage($rootDir, "gallery", null, -1, 0)); 
    }

    // Create CV/contact page:
    utf8File("../info.html", getPage($rootDir, "info", null, -1, 0)); 
    utf8File("../info_en.html", getPage($rootDir, "info", null, -1, 1)); 
    
    print "Success!";
}
?>
