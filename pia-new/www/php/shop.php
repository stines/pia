<?php 
  //if ("1" == $_GET["hest"]) { setcookie("hest", "hest"); } else if ("0" == $_GET["hest"]) { unset($_COOKIE["hest"]); } 
  $wmMode = false; //isset($_COOKIE["hest"]);
?>
    
<!DOCTYPE html>
<html>
<head>
    <title>Pia Olsen | BUTIK</title>
    <meta charset="UTF-8"/>
    <?php
      $fb_url = "https://piaolsen.com$_SERVER[REQUEST_URI]";
      $fb_image = "https://piaolsen.com/www/shop/fb.jpg";
      $fb_title = "Pia Olsen | BUTIK";
      $fb_desc = "Salg af originaltegninger og tryk.";
      if ($_SERVER['REQUEST_URI'] == "/butik/navneplakater") {
      	$fb_image = "https://piaolsen.com/www/shop/sille.jpg";
      }
      else if ($_SERVER['REQUEST_URI'] == "/butik/abc") {
      	$fb_image = "https://piaolsen.com/www/shop/abc0.jpg";
      }
      else if ($_SERVER['REQUEST_URI'] == "/butik/plakater") {
      	$fb_image = "https://piaolsen.com/www/shop/plakat0.jpg";
      }
      else if ($_SERVER['REQUEST_URI'] == "/butik/markeder") {
      	$fb_image = "https://piaolsen.com/www/shop/fb_markeder.jpg";
      	$fb_title = "Pia Olsen | MARKEDER";
      	$fb_desc = "Find Pia Olsen på forskellige markeder i den nærmeste fremtid.";
      }
      
    ?>
    <meta property="og:url" content="<?php print $fb_url; ?>"/>
    <meta property="og:image" content="<?php print $fb_image; ?>"/>
    <meta property="og:title" content="<?php print $fb_title; ?>"/>
    <meta property="og:description" content="<?php print $fb_desc; ?>"/>
    <meta name="description" content="Salg af kort, plakater og originaltegninger."/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="shortcut icon" type="image/ico" href="/www/images/favicon.ico"/>
    <link rel="apple-touch-icon" href="/www/images/appicon.png"/>
    <link rel="stylesheet" type="text/css" href="/www/css/jquery-ui-1.12.1.smoothness/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="/www/css/style.css" media="screen">
    <script language="javascript" type="text/javascript" src="/www/js/jquery-3.4.1.min.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/jquery-ui-1.12.1.min.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/jquery.cookie.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/jquery.viewport.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/script.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/basket.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/shop.js"></script> 
    <script language="javascript" type="text/javascript" src="https://www.paypal.com/sdk/js?currency=DKK&client-id=AYhTaecXhdt3zCEdSJTE1hjhz1C462RvWqCVmR5Fw08bLQA_DSppqGGYSBoQIytATarhAKtsUv4GDwyl"></script>
    <script language="javascript" type="text/javascript" src="/www/js/payment.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/delivery.js"></script>
    <script>var bankOnly = <?php print ($wmMode) ? "false" : "true"; ?>;</script>
</head>
<body>

<div class="canvas shop">
    <div id="top">
        <div class="title">
            <a href="/opgaver"><img src="/www/images/signature.gif" alt="Pia Olsen"/></a>
        </div>
        <div class="navigation">
            <nav>
                <a href="/opgaver">Illustration</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook" href="https://www.facebook.com/pia.olsen.3956"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <?php /* <a class="pinterest" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a> */ ?>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>
    
    <?php if (true || $wmMode) { ?>
    
    <div id="basket-nav"><a href="javascript: Basket.toggle();">&nbsp;</a></div>
    <div id="basket">
    	<form id="form">
        	<div id="errors">
        	  <ul>
        		<li id="error-email" class="error-entry">Husk at angive en emailadresse</li>
        		<li id="error-name" class="error-entry">Husk at angive dit fulde navn.</li>
        		<li id="error-address" class="error-entry">Husk at angive en adresse.</li>
        		<li id="error-phone" class="error-entry">Husk at angive et telefonnummer.</li>
        		<li id="error-gls" class="error-entry">Husk at vælge en GLS-shop – med mindre du vælger at hente bestillingen hos Pia Olsen på tegnestuen.</li>
        	  </ul>
        	</div>
        
        	<div id="personal">
				<div class="input-container"><label for="email">Email:</label> <input type="text" id="email" name="email" autocomplete="email" class="basket-form-input"/></div>
				<div class="input-container"><label for="name">Navn:</label> <input type="text" id="name" name="name" autocomplete="name" class="basket-form-input"/></div>
				<?php /* <div class="input-container"><label for="company">Evt. firma:</label> <input type="text" id="company" name="company" autocomplete="organization" class="basket-form-input"/></div> */ ?>
				<div class="input-container"><label for="address">Adresse:</label> <input type="text" id="address" name="address" autocomplete="street-address" class="basket-form-input"/></div>
				<div class="input-container"><label for="phone">Telefon:</label> <input type="text" id="phone" name="phone" autocomplete="tel-national" class="basket-form-input"/></div>
				<div class="input-container"><label for="message">Bemærkninger?</label> <textarea id="message" class="basket-form-input"></textarea></div>
            </div>
            
            <div id="pictures"></div>
            
            <?php /* <div class="free-angel">Bemærk at ved køb for over 200 kroner får du en <a class="angel" href="javascript: Groups.show(true, 'butik', 'engel', -1, false);">Engel</a> gratis med! :)</div> */ ?>
        
            <div id="delivery">
				<table>
				<!-- Pick up -->
				<tr class="delivery-pickup">
				  <td class="radio"><input id="delivery-pickup" type="radio" name="delivery" value="pickup" class="basket-form-input"/></td>
				  <td><label for="delivery-pickup">Afhentes på tegnestuen.</label><span id="pickup-footnote-stars" class="footnote-stars">*</span></td>
				  <td class="price"></td>
				</tr>
				<tr><td id="pickup-gls-spacer">&nbsp;</td></tr>
				<!-- Snail mail -->
				<tr class="delivery-snailmail">
				  <td class="radio"><input id="delivery-snailmail" type="radio" disabled="true" name="delivery" value="snailmail" class="basket-form-input"/></td>
				  <td><label for="delivery-snailmail">Ønskes tilsendt i almindeligt brev.</label><!--span id="snailmail-footnote-stars" class="footnote-stars">**</span--></td>
				  <td class="price"></td>
				</tr>
				<tr><td id="pickup-gls-spacer">&nbsp;</td></tr>
				<!-- GLS shop -->
				<tr class="delivery-gls">
				  <td class="radio"><input id="delivery-gls" type="radio" name="delivery" value="gls" class="basket-form-input"/></td>
				  <td class="label"><label for="delivery-gls">Ønskes sendt til GLS pakkeshop:</label></td>
				  <td class="price"></td>
				</tr>
				<tr class="delivery-gls">
				  <td></td>
				  <td id="gls-shop"><a id="gls-shops-link" class="link-ordinary" href="javascript:Delivery.pickGlsShop();">Vælg shop</a></td>
				  <td></td>
				</tr>
				</table>
            </div>
            
            <div id="total">I alt <div></div></div>
        
            <div id="payment">
              <table>
              <!-- PayPal -->
              <tr class="payment-paypal">
	            <td class="radio"><input id="payment-paypal" type="radio" name="payment" value="paypal" class="basket-form-input"/></td>
                <td class="label">
                  <label for="payment-paypal">PayPal.</label>
                  <a id="paypal-info" class="popup" href="https://www.paypal.com/dk/webapps/mpp/home">
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logo_PayPal_betalingsmuligheder_dk.jpg" alt="PayPal"/>
                  </a>
                </td>
              </tr>
              <tr><td id="bank-paypal-spacer">&nbsp;</td></tr>
              <!-- Bank -->
              <tr class="payment-bank">
	            <td class="radio"><input id="payment-bank" type="radio" name="payment" value="bank" class="basket-form-input"/></td>
                <td class="label"><label for="payment-bank">Bankoverførsel.</label></td>
              </tr>
              </table>
            </div>
            
            <div id="validate-button-container">
    	      <button class="link" onclick="Basket.validate();">Godkend &#187;</button>
    		</div>
    		
  		    <div id="payment-buttons-container">
    		    <div id="paypal-button-container"></div>
    		    <div id="bank-button-container">
    		      <button class="link" type="button" onclick="Basket.submit();">Bestil &#187;</button>
    		    </div>
    		    <a class="link-ordinary" href="javascript:Basket.toggleEditable(true);">Ret din bestilling</a>
    		</div>
            
            <div id="footnotes">
            	<div id="pickup-footnote" class="footnote"><span class="footnote-stars">*</span> Beklager, men der er mindst ét billede i kurven, der gør, at afhentning på tegnestuen er eneste mulighed.</div>
                <?php /* <div id="snailmail-footnote" class="footnote"><span class="footnote-stars">**</span> Tilsendelse i almindeligt brev kan kun vælges for visse varer.</div> */ ?>
            </div>
        </form>
    </div>

    <div id="explore"></div>

    <div id="middle">
        <div class="navigation">
            <nav>
                <a href="/opgaver">Illustration</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook" href="https://www.facebook.com/pia.olsen.3956"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <?php /* <a class="pinterest" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a> */ ?>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>

    <?php /* <div class="teaser">
        <img src="/www/shop/butik_top.jpg">
    </div> */ ?>

    <div id="categories" class="float">
        <div class="item" onclick="Groups.show(true, 'butik', 'melodibasser', -1, false);">
            <div class="link"><img src="/www/shop/melodibasser0.jpg" alt=""/></div>
            <div class="text link">Basser med melodi</div>
        </div> 
        <div class="item" onclick="Groups.show(true, 'butik', 'kaffehaetter', -1, false);">
            <div class="link"><img src="/www/shop/kaffehaetter0.jpg" alt=""/></div>
            <div class="text link">Kaffehætter</div>
        </div> 
        <div class="item" onclick="Groups.show(true, 'butik', 'tehaetter', -1, false);">
            <div class="link"><img src="/www/shop/tehaetter0.jpg" alt=""/></div>
            <div class="text link">Tehætter</div>
        </div>          
        <div class="item" onclick="Groups.show(true, 'butik', 'aeggevarmere', -1, false);">
            <div class="link"><img src="/www/shop/aeggevarmere0.jpg" alt=""/></div>
            <div class="text link">Æggevarmere</div>
        </div>             
        <div class="item" onclick="Groups.show(true, 'butik', 'boerneboeger', -1, false);">
            <div class="link"><img src="/www/shop/boerneboeger0.jpg" alt=""/></div>
            <div class="text link">Børnebøger</div>
        </div>
        <br/>
        <div class="item" onclick="Groups.show(true, 'butik', 'miniorig', -1, false);">
            <div class="link"><img src="/www/shop/miniorig0.jpg" alt=""/></div>
            <div class="text link">Minioriginaler</div>
        </div>        
        <div class="item" onclick="Groups.show(true, 'butik', 'collager', -1, false);">
            <div class="link"><img src="/www/shop/collager0.jpg" alt=""/></div>
            <div class="text link">Collager</div>
        </div>    
        <div class="item" onclick="Groups.show(true, 'butik', 'store-orig', -1, false);">
            <!--div class="link"><img src="/www/shop/farver0.jpg" alt=""/></div-->
            <div class="link"><img src="/www/shop/stororig0.jpg" alt=""/></div>
            <div class="text link">Store originaler</div>
        </div>  
        <div class="item" onclick="Groups.show(true, 'butik', 'plakater-boern', -1, false);">
            <div class="link"><img src="/www/shop/boerneplakater0.jpg" alt=""/></div>
            <div class="text link">Plakater til børn</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'plakater-voksne', -1, false);">
            <div class="link"><img src="/www/shop/voksenplakater0.jpg" alt=""/></div>
            <div class="text link">Plakater til voksne</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'snakkekort', -1, false);">
            <div class="link"><img src="/www/shop/snakkekort0.jpg" alt=""/></div>
            <div class="text link">Snakkekort</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'isfreaks', -1, false);">
            <div class="link"><img src="/www/shop/is0.jpg" alt=""/></div>
            <div class="text link">Originale isfreaks</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'bare-basser', -1, false);">
            <div class="link"><img src="/www/shop/bas0.jpg" alt=""/></div>
            <div class="text link">Originale bare basser</div>
        </div>	
        <div class="item" onclick="Groups.show(true, 'butik', 'smaa-orig', -1, false);">
            <div class="link"><img src="/www/shop/lille0.jpg" alt=""/></div>
            <div class="text link">Originale billeder til børneværelset</div>
        </div>	
        <div class="item" onclick="Groups.show(true, 'butik', 'navneplakater', -1, false);">
            <div class="link"><img src="/www/shop/navne0.jpg" alt=""/></div>
            <div class="text link">Plakater med navn</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'abc', -1, false);">
            <div class="link"><img src="/www/shop/abc0.jpg" alt=""/></div>
            <div class="text link">ABC</div>
        </div> 
        <div class="item" onclick="Groups.show(true, 'butik', 'engel', -1, false);">
            <div class="link"><img src="/www/shop/engel0.jpg" alt=""/></div>
            <div class="text link">Engel</div>
        </div>
        <?php /*
        <div class="item" onclick="Groups.show(true, 'butik', 'stoette-tegninger', -1, false);">
            <div class="link"><img src="/www/shop/rb1.jpg" alt=""/></div>
            <div class="text link">Støt Red Barnet</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'gavekalaset', -1, false);">
            <div class="link"><img src="/www/shop/gavekalaset0.jpg" alt=""/></div>
            <div class="text link">Gavekalaset</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'markeder', -1, false);">
            <div class="link"><img src="/www/shop/marked0.jpg" alt=""/></div>
            <div class="text link">Kommende markeder</div>
        </div><br/>
        <div class="item" onclick="Groups.show(true, 'butik', 'bare-basser-bog', -1, false);">
            <div class="link"><img src="/www/shop/bar-bog0.jpg" alt=""/></div>
            <div class="text link">Lille bog</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'litografier', -1, false);">
            <div class="link"><img src="/www/shop/litografi0.gif" alt=""/></div>
            <div class="text link">Litografier</div>
        </div>		
		<div class="item" onclick="Groups.show(true, 'butik', 'serigrafi', -1, false);">
            <div class="link"><img src="/www/shop/seri0.jpg" alt=""/></div>
            <div class="text link">Store serigrafiske tryk</div>
        </div> 
        <div class="item" onclick="Groups.show(true, 'butik', 'malerier', -1, false);">
            <div class="link"><img src="/www/shop/maleri0.gif" alt=""/></div>
            <div class="text link">Malerier</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'malerier-i-rum', -1, false);">
            <div class="link"><img src="/www/shop/malerirum0.gif" alt=""/></div>
            <div class="text link">Malerier i rum</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'kort', -1, false);">
            <div class="link"><img src="/www/shop/kort0.gif" alt=""/></div>
            <div class="text link">Store kort</div>
        </div>  
        <div class="item" onclick="Groups.show(true, 'butik', 'kort-smaa', -1, false);">
            <div class="link"><img src="/www/shop/lillekort0.gif" alt=""/></div>
            <div class="text link">Små kort</div>
        </div> 
        */ ?>
    </div>
    
    <?php } else { ?> <div style="font-style: italic; padding: 40px 0;">Undskyld, men webmaster arbejder lige et øjeblik på at forbedre Pias webshop en anelse &ndash; vær endelig sød at vende tilbage lidt senere, tak!<br/><br/>Hvis det haster, så tøv ikke med at skrive til Pia på <a href="mailto: po@piaolsen.com" style="color: purple">po@piaolsen.com</a>.</div> <?php } ?>

    <div id="bottom">
        <div class="navigation">
            <nav>
                <a href="/opgaver">Illustration</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook" href="https://www.facebook.com/pia.olsen.3956"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <?php /* <a class="pinterest" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a> */ ?>
            </nav>
        </div>
        <div class="copyright">&copy; <a href="https://piaolsen.com/">Pia Olsen</a> <span class="year"></span></div>
        <div class="clearer"></div>
    </div>
</div>

<div id="dialog"></div>

<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-2802134-3']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
</script>

<span id="x"></span>

</body>
</html>