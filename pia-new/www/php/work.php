<!DOCTYPE html>
<html>
<head>
    <title>Pia Olsen | ILLUSTRATION</title>
    <meta charset="UTF-8"/>
    <meta property="og:url" content="https://piaolsen.com"/>
    <meta property="og:title" content="Pia Olsen | ILLUSTRATION"/>
    <meta property="og:image" content="https://piaolsen.com/www/work/work_fb.gif"/>
    <meta name="description" content="Se et udpluk af Pia Olsens illustrationer og besøg webbutikken."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0"/>
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
    <script language="javascript" type="text/javascript" src="/www/js/work.js"></script>
</head>
<body>

<div class="canvas work">
    <div id="top">
        <div class="title">
            <a href="/opgaver"><img src="/www/images/signature.gif" alt="Pia Olsen"/></a>
        </div>
        <div class="navigation">
            <nav>
                <a href="/opgaver" class="active">Opgaver</a>
                <a href="/kontakt">Kontakt</a>
                <a href="/kunder">Kunder</a>
                <a href="/om">Om</a>                
                <?php /* <a href="/butik" class="nav_shop"><img src="/www/images/butik.jpg" alt="Butik"/></a> */ ?>
                <a href="/butik">Butik</a>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>

    <div id="explore" class="level level2"></div>

    <div id="middle">
        <div class="navigation">
            <nav>
                <a href="/opgaver" class="active">Opgaver</a>
                <a href="/kontakt">Kontakt</a>
                <a href="/kunder">Kunder</a>
                <a href="/om">Om</a>
                <a href="/butik">Butik</a>
            </nav>
        </div>
        <div class="clearer"></div>
    </div>

    <div id="categories" class="float">
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'arkitektur', -1, false);">
            <div id="arkitektur"><img src="/www/work/arkitekten0.jpg" alt=""/></div>
            <div class="text">ArkitekTUR i børnehaven</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'moedrehjaelpen', -1, false);">
            <div id="psyk"><img src="/www/work/moedrehjaelpen0.jpg" alt=""/></div>
            <div class="text">Mødrehjælpen</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'giffer', -1, false);">
            <div id="giffer"><img src="/www/work/gif_gymnast_forside.gif" alt=""/></div>
            <div class="text">Giffer</div>    
        </div>    
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'bupl', -1, false);">
            <div id="bupl"><img src="/www/work/bupl0.jpg" alt=""/></div>
            <div class="text">Bupl</div>
        </div>    
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'akutmodtagelsen', -1, false);">
            <div id="akutmodtagelsen"><img src="/www/work/hosp0.jpg" alt=""/></div>
            <div class="text">Region Hovedstaden</div>
        </div>                            
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'boeger', -1, false);">
            <div id="indenimig"><img src="/www/work/samtaleboeger0.jpg" alt=""/></div>
            <div class="text">Samtalebøger</div>
        </div>         
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'moobaa', -1, false);">
            <div id="moobaa"><img src="/www/work/moobaa0.jpg" alt=""/></div>
            <div class="text">App</div>
        </div>
        <?php /* <div class="item link" onclick="Groups.show(true, 'opgaver', 'vuggestue', -1, false);">
            <div id="vuggestue"><img src="/www/work/vuggestue0.jpg" alt=""/></div>
            <div class="text">Se mere...</div>
        </div> */ ?>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'sundhedsplejen', -1, false);">
            <div id="sundhedsplejen"><img src="/www/work/sundhedsplejen0.jpg" alt=""/></div>
            <div class="text">Sundhedsplejen</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'glistrup', -1, false);">
            <div id="glistrup"><img src="/www/work/dep0.jpg" alt=""/></div>
            <div class="text">Snak om det</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'syg', -1, false);">
            <div id="syg"><img src="/www/work/syg0.gif" alt=""/></div>
            <div class="text">Sygeplejersken</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'q', -1, false);">
            <div id="q"><img src="/www/work/q0.gif" alt=""/></div>
            <div class="text">Q</div>
        </div>
        <?php /* 
        <div class="item link" onclick="Utils.goTo('/butik/plakater-sort-hvid', -1, false);">
            <div id="posters"><img src="/www/work/shop_posters.jpg" alt=""/></div>
            <div class="text">Køb den her...</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'appit', -1, false);">
            <div id="appit"><img src="/www/work/appit0.gif" alt=""/></div>
            <div class="text">Se mere...</div>
        </div>
        */ ?>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'fsb', -1, false);">
            <div id="fsb"><img src="/www/work/fsb0.gif" alt=""/></div>
            <div class="text">Fsb</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'digogmig', -1, false);">
            <div id="digogmig"><img src="/www/work/digmig0.gif" alt=""/></div>
            <div class="text">Magnolia Press</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'skoleboern', -1, false);">
            <div id="skoleboern"><img src="/www/work/skoleboern0.jpg" alt=""/></div>
            <div class="text">Skolemagasinet</div>
        </div>       
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'voresboern', -1, false);">
            <div id="voresboern"><img src="/www/work/voresboern0.jpg" alt=""/></div>
            <div class="text">Vores Børn</div>
        </div> 
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'klip', -1, false);">
            <div id="giffer"><img src="/www/work/klip0.jpg" alt=""/></div>
            <div class="text">Ny illustrationsstil</div>    
        </div>                 
        <?php /*
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'artikelillu', -1, false);">
            <div id="artikelillu"><img src="/www/work/artikelillu0.jpg" alt=""/></div>
            <div class="text">Artikelillustration</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'plakater', -1, false);">
            <div id="plakater"><img src="/www/work/plakat1.gif" alt=""/></div>
            <div class="text">Se mere...</div>
        </div>
        <div class="item link" onclick="Groups.show(true, 'opgaver', 'moder', -1, false);">
            <div id="moder"><img src="/www/work/moder0.gif" alt=""/></div>
            <div class="text">Se mere...</div>
        </div>
        */ ?>
    </div>

    <div id="teasers" class="float">
        <div class="item link" onclick="Utils.goTo('/butik');">
            <div id="shop"><img src="/www/images/shop.jpg" alt=""/></div>
        </div>
    </div>

    <div id="bottom">
        <div class="navigation">
            <nav>
                <a href="/opgaver" class="active">Opgaver</a>
                <a href="/kontakt">Kontakt</a>
                <a href="/kunder">Kunder</a>
                <a href="/om">Om</a>
                <a href="/butik">Butik</a>
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