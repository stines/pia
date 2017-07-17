<!DOCTYPE html>
<html>
<head>
    <title>Pia Olsen</title>
    <meta charset="UTF-8"/>
    <?php
      $fb_url = "http://piaolsen.com$_SERVER[REQUEST_URI]";
      $fb_image = "http://piaolsen.com/www/shop/fb.gif";
      $fb_title = "Pia Olsen · Butik";
      $fb_desc = "Salg af kort, plakater og originaltegninger.";
      if ($_SERVER[REQUEST_URI] == "/butik/markeder") {
      	$fb_image = "http://piaolsen.com/www/shop/fb_markeder.jpg";
      	$fb_title = "Pia Olsen · Markeder";
      	$fb_desc = "Find Pia Olsen på forskellige markeder i den nærmeste fremtid.";
      }
    ?>
    <meta property="og:url" content="<?php print $fb_url; ?>"/>
    <meta property="og:image" content="<?php print $fb_image; ?>"/>
    <meta property="og:title" content="<?php print $fb_title; ?>"/>
    <meta property="og:description" content="<?php print $fb_desc; ?>"/>
    <meta name="description" content="Salg af kort, plakater og originaltegninger."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0"/>
    <link rel="shortcut icon" type="image/ico" href="/www/images/favicon.ico"/>
    <link rel="apple-touch-icon" href="/www/images/appicon.png"/>
    <link rel="stylesheet" type="text/css" href="/www/css/jquery-ui-1.11.2.smoothness/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="/www/css/style.css" media="screen">
    <script language="javascript" type="text/javascript" src="/www/js/jquery-1.11.1.min.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/jquery-ui-1.11.2.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/jquery.cookie.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/script.js"></script>
    <script language="javascript" type="text/javascript" src="/www/js/shop.js"></script>
</head>
<body>

<div class="canvas shop">
    <div id="top">
        <div class="title">
            <a href="/opgaver"><img src="/www/images/signature.gif" alt="Pia Olsen"/></a>
        </div>
        <div class="navigation">
            <nav>
                <a href="/opgaver">Site</a>
                <a href="/forhandlere">Forhandlere</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook external" href="https://www.facebook.com/piaolsenillustration"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram external" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <a class="pinterest external" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>

    <div id="basket-nav"><a href="javascript: Basket.show(true, false);">Kurv (<span class="basket-count">0</span>)</a></div>
    <div id="basket">
        <form id="form" onsubmit="return false;">
            <div id="pictures"></div>
            <div id="price">I alt <b><span></span> kr.</b> inklusive 39 kr. i porto.</div>
            <div class="field">
                <label for="from">Din email:</label> <input type="text" id="from"/>
            </div>
            <div class="field">
                <label for="phone">Dit telefonnummer:</label> <input type="text" id="phone"/>
            </div>
            <div class="field">
                <label for="message">Kommentar?</label> <textarea id="message"></textarea>
            </div>
            <div class="send"><a href="javascript: Basket.submit();">Bestil &#187;</a></div>
        </form>
    </div>

    <div id="explore"></div>

    <div id="middle">
        <div class="navigation">
            <nav>
                <a href="/opgaver">Site</a>
                <a href="/forhandlere">Forhandlere</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook external" href="https://www.facebook.com/piaolsenillustration"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram external" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <a class="pinterest external" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>

    <!--div class="teaser">
        <img src="/www/shop/butik_top.jpg">
    </div-->

    <div id="categories" class="float">
        <!--div class="item" onclick="Groups.show(true, 'butik', 'stoette-tegninger', -1, false);">
            <div class="link"><img src="/www/shop/rb1.jpg" alt=""/></div>
            <div class="text link">Støt Red Barnet</div>
        </div-->
        <div class="item" onclick="Groups.show(true, 'butik', 'markeder', -1, false);">
            <div class="link"><img src="/www/shop/marked0.jpg" alt=""/></div>
            <div class="text link">Kommende markeder</div>
        </div><br/>
        <div class="item" onclick="Groups.show(true, 'butik', 'plakater', -1, false);">
            <div class="link"><img src="/www/shop/plakat0.gif" alt=""/></div>
            <div class="text link">Plakater</div>
        </div>  
        <div class="item" onclick="Groups.show(true, 'butik', 'gavekalaset', -1, false);">
            <div class="link"><img src="/www/shop/gavekalaset0.jpg" alt=""/></div>
            <div class="text link">Gavekalaset</div>
        </div>  
        <div class="item" onclick="Groups.show(true, 'butik', 'orig-ramme-a5', -1, false);">
            <div class="link"><img src="/www/shop/g0.jpg" alt=""/></div>
            <div class="text link">Originaltegninger i A5-rammer</div>
        </div>  
        <div class="item" onclick="Groups.show(true, 'butik', 'dyr', -1, false);">
            <div class="link"><img src="/www/shop/dyr0.jpg" alt=""/></div>
            <div class="text link">Collage</div>
        </div>         
        <div class="item" onclick="Groups.show(true, 'butik', 'panorama', -1, false);">
            <div class="link"><img src="/www/shop/panorama0.gif" alt=""/></div>
            <div class="text link">Friser</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'litografier', -1, false);">
            <div class="link"><img src="/www/shop/litografi0.gif" alt=""/></div>
            <div class="text link">Litografier</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'prints', -1, false);">
            <div class="link"><img src="/www/shop/print0.gif" alt=""/></div>
            <div class="text link">Prints</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'orig-lange', -1, false);">
            <div class="link"><img src="/www/shop/eventyr0.gif" alt=""/></div>
            <div class="text link">Lange originaltegninger</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'malerier', -1, false);">
            <div class="link"><img src="/www/shop/maleri0.gif" alt=""/></div>
            <div class="text link">Malerier</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'malerier-i-rum', -1, false);">
            <div class="link"><img src="/www/shop/malerirum0.gif" alt=""/></div>
            <div class="text link">Malerier i rum</div>
        </div>
        <!--div class="item" onclick="Groups.show(true, 'butik', 'portraetter-ramme', -1, false);">
            <div class="link"><img src="/www/shop/mel0.gif" alt=""/></div>
            <div class="text link">Originalportrætter i ramme</div>
        </div-->
        <div class="item" onclick="Groups.show(true, 'butik', 'orig-ramme-a4', -1, false);">
            <div class="link"><img src="/www/shop/sort0.jpg" alt=""/></div>
            <div class="text link">Originaltegninger i A4-rammer</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'sorte-sager', -1, false);">
            <div class="link"><img src="/www/shop/sortsag0.jpg" alt=""/></div>
            <div class="text link">Sorte sager</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'portraetter-smaa', -1, false);">
            <div class="link"><img src="/www/shop/mini0.gif" alt=""/></div>
            <div class="text link">Små originalportrætter</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'kort', -1, false);">
            <div class="link"><img src="/www/shop/kort0.gif" alt=""/></div>
            <div class="text link">Store kort</div>
        </div>
        <div class="item" onclick="Groups.show(true, 'butik', 'kort-smaa', -1, false);">
            <div class="link"><img src="/www/shop/lillekort0.gif" alt=""/></div>
            <div class="text link">Små kort</div>
        </div>
    </div>

    <div id="bottom">
        <div class="navigation">
            <nav>
                <a href="/opgaver">Site</a>
                <a href="/forhandlere">Forhandlere</a>
                <a href="/butik" class="active">Butik</a>
                <a class="facebook external" href="https://www.facebook.com/piaolsenillustration"><img src="/www/images/facebook.jpg"/></a>
                <a class="instagram external" href="https://www.instagram.com/piaolsenillustration"><img src="/www/images/instagram.jpg"/></a>
                <a class="pinterest external" href="https://dk.pinterest.com/source/piaolsen.com"><img src="/www/images/pinterest.jpg"/></a>
            </nav>
        </div>
        <div class="copyright">&copy; Pia Olsen <span class="year"></span></div>
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