Groups.groups = {
    plakater: {
    	text: "Plakater. De angivne mål og priser er uden ramme.",
        showTitles: true,
        items: [
            { image: "/www/shop/plakat_yoga_a3.jpg", size: "A3", price: 250, priceText: "(uden ramme)", title: "Yoga &bull; Soløvelsen", text2: "Offsettryk på kraftigt papir.", basketTitle: "Soløvelsen (A3-plakat)", printed: true, pickup: false },
            { image: "/www/shop/plakat_crossfit_a3.jpg", size: "A3", price: 250, priceText: "(uden ramme)", title: "Crossfit &bull; WOD", text2: "Offsettryk på kraftigt papir.", basketTitle: "WOD (A3-plakat)", printed: true, pickup: false },
            { image: "/www/shop/plakat_baby_a3.jpg", size: "A3", price: 250, priceText: "(uden ramme)", title: "Homo Sapiens &bull; Baby", text2: "Offsettryk på kraftigt papir.", basketTitle: "Baby (A3-plakat)", printed: true, pickup: false },

            { image: "/www/shop/plakat_dame_a3.gif", size: "A3", price: 250, priceText: "(uden ramme)", title: "Dame", text2: "Offsettryk på kraftigt papir.", basketTitle: "Dame (A3-plakat)", printed: true, pickup: false },
            { image: "/www/shop/plakat_pige_a3.gif", size: "A3", price: 250, priceText: "(uden ramme)", title: "Pige", text2: "Offsettryk på kraftigt papir.", basketTitle: "Pige (A3-plakat)", printed: true, pickup: false },

            // abc points to this item as well using parent: { key: "plakater", index: 5 }:
            { image: "/www/shop/plakat_abc.jpg", title: "ABC", size: "A2", price: 200, priceText: "(uden ramme)", text2: "Printet plakat.", basketTitle: "ABC (A2-plakat)", printed: true, pickup: true },

            { image: "/www/shop/plakat_linedanser.jpg", title: "Linedanser", size: "A3", sizeText: "(liggende)", price: 250, priceText: "(uden ramme)", text2: "Print på kraftigt papir.", basketTitle: "Linedanser (A3-plakat)", printed: true, pickup: false },
            { image: "/www/shop/plakat_swimmingpool.jpg", title: "Svømmehal", size: "A3", sizeText: "(liggende)", price: 250, priceText: "(uden ramme)", text2: "Print på kraftigt papir.", basketTitle: "Swimmingpool (A3-plakat)", printed: true, pickup: false },
            { image: "/www/shop/plakat_poelsevogn.jpg", title: "Pølsevogn", size: "A3", sizeText: "(liggende)", price: 250, priceText: "(uden ramme)", text2: "Print på kraftigt papir.", basketTitle: "Pølsevogn (A3-plakat)", printed: true, pickup: false }
        ]
    },
    navneplakater: {
        text: "Bestil ét af de tegnede dyr og skriv dit barns navn &ndash; så laver jeg en personlig plakat til dig.<br/>Plakaten printes på lækkert 170 grams A4-papir (monteres ikke i ramme).",
        showTitles: true,      
        float: true,
        items: [
            { image: "/www/shop/navne1.jpg", title: "Løve", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Løve med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne2.jpg", title: "Zebra", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Zebra med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne3.jpg", title: "Elefant", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Elefant med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne4.jpg", title: "Kat", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Kat med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne5.jpg", title: "Gris", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Gris med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne6.jpg", title: "Får", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Får med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne7.jpg", title: "Mus", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Mus med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne8.jpg", title: "Ugle", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Ugle med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne9.jpg", title: "Panda", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Panda med navn (A4-plakat)", printed: true },
            { image: "/www/shop/navne10.jpg", title: "Enhjørning", size: "A4", price: 250, priceText: "(uden ramme)", basketTitle: "Enhjørning med navn (A4-plakat)", printed: true }
        ]
    },
    abc: {
        text: "Illustrerede alfabetkort i størrelsen 9 x 9 cm.<br/>De laminerede kort er robuste overfor fedtfingre og kommer i en hyggelig bomuldspose med ræv på.<br/>Det er muligt at at bestille det dobbelte alfabet, så man kan stave flere ord og navne og bruge kortene til vendespil.<br/>Der kan også bestilles ekstra kort enkeltvis.",
        showTitles: true,     
        float: true,
        items: [
            { image: "/www/shop/abc1.jpg", text2: "29 laminerede kort.", title: "Enkelt alfabet", price: 350, printed: true },
            { image: "/www/shop/abc2.jpg", text2: "58 laminerede kort.", title: "Dobbelt alfabet", price: 550, printed: true },

            { image: "/www/shop/abc_a.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "A for abe", printed: true },
            { image: "/www/shop/abc_b.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "B for bål", printed: true },
            { image: "/www/shop/abc_c.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "C for citron", printed: true },
            { image: "/www/shop/abc_d.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "D for dykker", printed: true },
            { image: "/www/shop/abc_e.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "E for elefant", printed: true },
            { image: "/www/shop/abc_f.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "F for fisk", printed: true },
            { image: "/www/shop/abc_g.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "G for gris", printed: true },
            { image: "/www/shop/abc_h.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "H for hane", printed: true },
            { image: "/www/shop/abc_i.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "I for is", printed: true },
            { image: "/www/shop/abc_j.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "J for juletræ", printed: true },
            { image: "/www/shop/abc_k.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "K for kage", printed: true },
            { image: "/www/shop/abc_l.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "L for løve", printed: true },
            { image: "/www/shop/abc_m.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "M for mus", printed: true },
            { image: "/www/shop/abc_n.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "N for nisse", printed: true },
            { image: "/www/shop/abc_o.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "O for orm", printed: true },
            { image: "/www/shop/abc_p.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "P for pølse", printed: true },
            { image: "/www/shop/abc_q.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Q for quiz", printed: true },
            { image: "/www/shop/abc_r.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "R for ræv", printed: true },
            { image: "/www/shop/abc_s.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "S for skildpadde", printed: true },
            { image: "/www/shop/abc_t.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "T for træ", printed: true },
            { image: "/www/shop/abc_u.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "U for ugle", printed: true },
            { image: "/www/shop/abc_v.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "V for vandmelon", printed: true },
            { image: "/www/shop/abc_w.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "W for WC", printed: true },
            { image: "/www/shop/abc_x.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "X for xylofon", printed: true },
            { image: "/www/shop/abc_y.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Y for ymer", printed: true },
            { image: "/www/shop/abc_z.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Z for zebra", printed: true },
            { image: "/www/shop/abc_ae.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Æ for æble", printed: true },
            { image: "/www/shop/abc_oe.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Ø for ø", printed: true },
            { image: "/www/shop/abc_aa.jpg", text2: "Et enkelt lamineret kort.", size: { height: 9, width: 9 }, price: 20, title: "Å for ål", printed: true },

            { parent: { key: "plakater", index: 5 } },
        ]
    },
    smaa_orig: {
        text: "Mindre originaltegninger monteret i sort ramme (rammen er inkluderet i mål og pris).<br/>Tusch og akvarel på håndlavet offsetpapir.",
        showTitles: true,
        float: true,
        items: [
            { image: "/www/shop/mel1.jpg", price: 650, title: "Lilla Lotus", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel2.jpg", price: 650, title: "I love crossfit", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel11.jpg", price: 650, title: "Strandsild", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel5.jpg", price: 650, title: "Type i sprint", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel6.jpg", price: 650, title: "Yogababe", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel12.jpg", price: 650, title: "Stærk type", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel10.jpg", price: 650, title: "Squatter", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel9.jpg", price: 650, title: "Yogafreak", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel7.jpg", price: 650, title: "Yogi", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel3.jpg", price: 650, title: "Yogafreak", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel13.jpg", price: 650, title: "Zebrasild", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel14.jpg", price: 650, title: "Yogi", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/mel8.jpg", price: 650, title: "Lotus i stribede bukser", size: "A5", priceText: "(med ramme)", sold: false, newline: true },
            
            { image: "/www/shop/lille21.jpg", price: 650, title: "Batman", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille23.jpg", price: 650, title: "Snehvide", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille19.jpg", price: 650, title: "Spiderman", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille22.jpg", price: 650, title: "Pippi", size: "A5", priceText: "(med ramme)", sold: true },
            { image: "/www/shop/lille20.jpg", price: 650, title: "Superman", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille24.jpg", price: 650, title: "Askepot", size: "A5", priceText: "(med ramme)", sold: false },
            
            { image: "/www/shop/lille3.jpg", price: 650, title: "Isfreaks", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille5.jpg", price: 650, title: "Feriefreaks", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille8.jpg", price: 650, title: "Diva i blåt", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille9.jpg", price: 650, title: "Hr. Sommer", size: "A5", priceText: "(med ramme)", sold: false },
            { image: "/www/shop/lille12.jpg", price: 650, title: "Mutter med Nutter", size: "A5", priceText: "(med ramme)", sold: false, newline: true},
            
            { image: "/www/shop/lilbas3.jpg", title: "Lille bar basse", basketTitle: "Lille bar basse 1", size: "A6", priceText: "(med ramme)", price: 250, sold: false },
            { image: "/www/shop/lilbas7.jpg", title: "Lille bar basse", basketTitle: "Lille bar basse 3", size: "A6", priceText: "(med ramme)", price: 250, sold: false },
            { image: "/www/shop/lilbas6.jpg", title: "Lille bar basse", basketTitle: "Lille bar basse 2", size: "A6", priceText: "(med ramme)", price: 250, sold: false },
            { image: "/www/shop/lilbas8.jpg", title: "Lille bar basse", basketTitle: "Lille bar basse 4", size: "A6", priceText: "(med ramme)", price: 250, sold: false },            
            { image: "/www/shop/bas1.jpg", title: "To små bare basser", basketTitle: "To små bare basser 1", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas2.jpg", title: "To små bare basser", basketTitle: "To små bare basser 2", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas3.jpg", title: "To små bare basser", basketTitle: "To små bare basser 3", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas5.jpg", title: "To små bare basser", basketTitle: "To små bare basser 4", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas6.jpg", title: "To små bare basser", basketTitle: "To små bare basser 5", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas7.jpg", title: "To små bare basser", basketTitle: "To små bare basser 6", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas8.jpg", title: "To små bare basser", basketTitle: "To små bare basser 7", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas9.jpg", title: "To små bare basser", basketTitle: "To små bare basser 8", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/bas10.jpg", title: "To små bare basser", basketTitle: "To små bare basser 9", size: "A5", sizeText: "(liggende)", priceText: "(med ramme)", price: 550, sold: false },
            { image: "/www/shop/basserpaastribe1.jpg", title: "Bare basser på stribe", size: { height: 17, width: 42 }, priceText: "(med ramme)", price: 1050, sold: false }
    	]
    },
    store_orig: {
    	text: "Store malerier og originaltegninger.<br/>De angivne mål og priser er inklusive eventuel ramme.", 
        showTitles: true,
        items: [
            { image: "/www/shop/stor11.jpg", title: "Mennesker i by", text2: "Flydende tusch og pen på håndlavet offsetpapir.", size: { height: 43, width: 52.5 }, priceText: "(med ramme)", price: 2500, sold: false, pickup: true },     
            { image: "/www/shop/stor12.jpg", title: "Folk", text2: "Akryl på pap monteret i gammel træramme.", size: { height: 52, width: 42.5 }, priceText: "(med ramme)", price: 2500, sold: false, pickup: true },     
            { image: "/www/shop/stor13.jpg", title: "Party", text2: "Flydende tusch og pen på håndlavet offsetpapir.", size: { height: 50, width: 70 }, priceText: "(med ramme)", price: 3500, sold: false, pickup: true },     
            { image: "/www/shop/stor15.jpg", title: "Bare basser", text2: "Flydende tusch og pen på håndlavet offsetpapir.", size: { height: 50, width: 70 }, priceText: "(med ramme)", price: 3500, sold: false, pickup: true },     
            { image: "/www/shop/stor16.jpg", title: "Mennesker", text2: "Akvarel, akryl og flydende tusch på papir.", size: { height: 31, width: 44 }, priceText: "(med ramme)", price: 2000, sold: false, pickup: true },     
            { image: "/www/shop/stor17.jpg", title: "I parken", text2: "Flydende tusch og pen på håndlavet offsetpapir.", size: { height: 43, width: 52.5 }, priceText: "(med ramme)", price: 2500, sold: false, pickup: true },   

            { image: "/www/shop/orig_a4_7.jpg", title: "Yoga", text2: "Flydende tusch og pen på papir.", size: "A4", sizeText: "(liggende)", priceText: "(med ramme)", price: 950, sold: false },                

            { image: "/www/shop/maleri3.gif", title: "Jordbærdrøm og sværmende bæst", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 120, width: 100 }, price: 9500, sold: true, pickup: true },
            { image: "/www/shop/maleri1.gif", title: "Næbet eremit med pool", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri2.gif", title: "Hanen og ægget", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri4.gif", title: "Stjernekiggeren", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri5.gif", title: "Sværmer med tunge ben", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 120, width: 100 }, price: 15000, sold: true, pickup: true },
            { image: "/www/shop/maleri6.gif", title: "Fugl og fugl imellem", text2: "Maleri. Akryl og flydende tusch på lærred.", size: { height: 120, width: 100 }, price: 15000, sold: true, pickup: true }
        ]
    },
    litografier: {
        text: "Håndkolorerede litografier. 250 stykker.",
        showTitles: true,
        items: [
            { image: "/www/shop/litografi1.gif", title: "Festlig Frue", size: { height: 21, width: 27.5 }, price: 350, printed: true },
            { image: "/www/shop/litografi2.gif", title: "Madam Blå", size: { height: 30, width: 21 }, price: 350, printed: true }
        ]
    },
    serigrafi: {
        text: "3i1. Serigrafi på tykt papir.",
        showTitles: true,
        items: [
            { image: "/www/shop/seri1.jpg", size: { height: 100, width: 70 }, price: 4000, title: "Festlige prikker", text: "3i1", sold: false, pickup: true },
            { image: "/www/shop/seri2.jpg", size: { height: 100, width: 70 }, price: 4000, title: "Forbrændingsprikker", text: "3i1", sold: false, pickup: true },
            { image: "/www/shop/seri3.jpg", size: { height: 100, width: 70 }, price: 4000, title: "Prikker der springer", text: "3i1", sold: false, pickup: true },
            { image: "/www/shop/seri4.jpg", size: { height: 100, width: 70 }, price: 4000, title: "Grafiske prikker", text: "3i1", sold: false, pickup: true }
        ]
    },
    malerier: {
        text: "Malerier. Akryl og flydende tusch på lærred.",
        items: [
            { image: "/www/shop/maleri3.gif", title: "Jordbærdrøm og sværmende bæst", size: { height: 120, width: 100 }, price: 9500, sold: true, pickup: true },
            { image: "/www/shop/maleri1.gif", title: "Næbet eremit med pool", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri2.gif", title: "Hanen og ægget", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri4.gif", title: "Stjernekiggeren", size: { height: 100, width: 120 }, price: 6500, sold: true, pickup: true },
            { image: "/www/shop/maleri5.gif", title: "Sværmer med tunge ben", size: { height: 120, width: 100 }, price: 15000, sold: true, pickup: true },
            { image: "/www/shop/maleri6.gif", title: "Fugl og fugl imellem", size: { height: 120, width: 100 }, price: 15000, sold: true, pickup: true }
        ]
    },
    malerier_i_rum: {
        text: "Malerier i rum.",
        items: [
            { image: "/www/shop/malerirum1.gif" },
            { image: "/www/shop/malerirum4.gif" }
        ]
    },
    bare_basser_bog: {
        text: "Printede bare basser sat sammen i en lille kvadratisk bog.<br/>Dobbeltsidet print på tykt papir.<br/>8 opslag.",
        showTitles: true,
        items: [
            { image: "/www/shop/bar-bog1.jpg", title: "Bare Basser", size: { height: 10.5, width: 10.5 }, price: 45 }
        ]
    },
    kort: {
        text: "Store, dobbelte luksuskort med tilhørende kuvert. Trykt på kraftigt, lækkert papir.<br/>" +
            "Kortenes størrelse er A5, og de passer således perfekt ind i en standard A5-ramme.",
        showTitles: false,
        //teaser: "/www/shop/kort_top.jpg",
        items: [
            { image: "/www/shop/kort_ego.gif", price: 40, title: "Ego (kort)", printed: true },
            { image: "/www/shop/kort_bryllup.gif", price: 40, title: "Bryllup (kort)", printed: true },
            { image: "/www/shop/kort_spider.gif", price: 40, title: "Spiderman (kort)", printed: true },
            { image: "/www/shop/kort_fe.gif", price: 40, title: "Fe (kort)", printed: true },
            { image: "/www/shop/kort_tarzan.gif", price: 40, title: "Tarzan (kort)", printed: true },
            { image: "/www/shop/kort_boesser.gif", price: 40, title: "Bøsser (kort)", printed: true },
            { image: "/www/shop/kort_margrethe.gif", price: 40, title: "Margrethe (kort)", printed: true },
            { image: "/www/shop/kort_henrik.gif", price: 40, title: "Henrik (kort)", printed: true }
        ]
    },
    kort_smaa: {
        text: "Små, enkeltsidede kort med tilhørende kuvert. Printet på kraftigt papir og eftercoloreret.<br/>" +
            "Kortenes størrelse er A6 (10,5 x 14,8 cm).<br/><br/>" +
            "Alle kort er forskellige, hvad angår hår, farve og tøj, så kortet, du får tilsendt, kan afvige fra " +
            "det viste billede af kortet.",
        showTitles: false,
        items: [
            { image: "/www/shop/lillekort1.gif", price: 40, title: "På ét ben (kort)", printed: true },
            { image: "/www/shop/lillekort2.gif", price: 40, title: "Tpushup (kort)", printed: true },
            { image: "/www/shop/lillekort3.gif", price: 40, title: "Squat (kort)", printed: true },
            { image: "/www/shop/lillekort4.gif", price: 40, title: "Solbader (kort)", printed: true },
            { image: "/www/shop/lillekort5.gif", price: 40, title: "Lotus (kort)", printed: true },
            { image: "/www/shop/lillekort6.gif", price: 40, title: "Jogger (kort)", printed: true }
        ]
    },
    gavekalaset: {
        text: "Jeg er en del af <a class=\"gavekalaset\" href=\"javascript:Links.open('http://www.gavekalaset.dk/');\">Gavekalset</a>, som giver mulighed for at få Lisa Strøander, Mai-Britt Amsler og mig til at komme forbi med en pop-up-shop af fristende originalkunst til meget lave priser.<br/><br/><a href=\"javascript:Links.open('http://www.gavekalaset.dk/');\" title=\"Klik for at besøge Gavekalaset.dk\"><img src=\"/www/shop/gavekalaset1.jpg\"/></a>",
        showTitles: false,
        items: [
        ]
    },
    markeder: {
        text: "Herunder finder du information om de markeder, jeg planlægger at deltage i i den nærmeste fremtid.<br/><br/>Jeg er også en del af <a class=\"gavekalaset\" href=\"javascript:Links.open('http://www.gavekalaset.dk/');\">Gavekalset</a>, som giver mulighed for at få Lisa Strøander, Mai-Britt Amsler og mig til at komme forbi med en pop-up-shop af fristende originalkunst til meget lave priser.",
        items: [
            //{ image: "/www/shop/marked2.jpg", text: "Lørdag den 3. september 2016 klokken 11-17.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/VtrfN7XfbDU2');\"'>Øens Spisested, Holmbladsgade 71, 2300 København S</a>.<br/>Besøg Designmarkedet i Prismens Facebookside <a class=\"marked_prismen\" href=\"javascript:Links.open('https://www.facebook.com/events/200731060329866');\">her</a>." },
            //{ image: "/www/shop/marked1.gif", text: "Søndag den 25. september 2016, klokken 10-16.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/oLkV8gpXBKT2');\">Ravnsborggade 21B, 2200 Kbh. N</a>." }
            //{ image: "/www/shop/marked4.jpg", text: "Søndag den 20. november 2016, klokken 10-16.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/oLkV8gpXBKT2');\"'>Ravnsborggade 21B, 2200 Kbh. N</a>." },
            //{ image: "/www/shop/marked7.png", text: "Søndag den 27. november 2016 holder Lisa Strøander og Pia Olsen åben tegnestue klokken 13.30 - 17. Det vil være muligt at købe originaltegninger, prints, tryk med meget mere. Du er naturligvis også velkommen til bare at komme og kigge.<br/><a class=\"baghuset21b\" href=\"javascript:Links.open('https://www.facebook.com/Baghuset21B-926410697505160');\">Tegnestuen BAGHUSET21B</a>.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/oLkV8gpXBKT2');\">Ravnsborggade 21B, 2200 Kbh. N</a>.<br/>Hvis porten er lukket, så skal du bare ringe på dørtelefonen ude på gaden." },
            //{ image: "/www/shop/marked3.jpg", text: "Lørdag den 3. og søndag den 4. december 2016, klokken 11-17.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/vrgfT2oBbY82');\"'>Nørrebrohallen</a>.<br/>Besøg Flids Julemarkeds Facebookside <a class=\"marked\" href=\"javascript:Links.open('https://www.facebook.com/events/1761504077414259');\">her</a>." },
            //{ image: "/www/shop/marked5.jpg", text: "Lørdag den 10. december 2016, klokken 10-17.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/BeHgH4JLV2R2');\"'>Elmegade, 2200 Kbh. N</a>." },
            //{ image: "/www/shop/marked7.jpg", text: "Søndag den 18. december 2016, klokken 10:30-17.<br/><a class=\"baghuset21b\" href=\"javascript:Links.open('https://www.facebook.com/Baghuset21B-926410697505160');\">Tegnestuen BAGHUSET21B</a>.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/oLkV8gpXBKT2');\"'>Ravnsborggade 21B, 2200 Kbh. N</a>.<br/>Hvis porten er lukket, så skal du bare ringe på dørtelefonen ude på gaden." }
            { image: "/www/shop/marked8.jpg", text: "Søndag den 11. juni 2017, klokken 10-16.<br/><a href=\"javascript:Links.open('https://goo.gl/maps/oLkV8gpXBKT2');\"'>Ravnsborggade, 2200 Kbh. N</a>." }
        ]
    },
    stoette_tegninger: {
        text: "Køb en minioriginal og støt Red Barnet.<br/>" +
            "Alle penge, der kommer ind for tegningerne, går til <a class=\"redbarnet\" href=\"javascript:Links.open('http://www.redbarnet.dk/');\">Red Barnets vigtige arbejde ude i verden</a>. Tegningerne koster 100 kroner stykket, men man må naturligvis meget gerne give mere, hvis man har lyst til det! :) Tegningerne måler cirka 4 x 6 cm og er monteret på et kraftigt, lækkert A6-papir - lige til at putte i en fin lille ramme.<br/>Jeg lægger 10 kroner oveni til porto.<br/>Husk at skrive din pris i bestillingsformularen.",
        showTitles: true,
        items: [
            { image: "/www/shop/rb1.jpg", price: 100, title: "Lille frøken", sold: true },
            { image: "/www/shop/rb2.jpg", price: 100, title: "Festlig frue med barn", sold: true },
            { image: "/www/shop/rb3.jpg", price: 100, title: "Mr. Cool", sold: true },
            { image: "/www/shop/rb4.jpg", price: 100, title: "Lille basse" },
            { image: "/www/shop/rb5.jpg", price: 100, title: "Herre med vind i hår" },
            { image: "/www/shop/rb6.jpg", price: 100, title: "Frøken" },
            { image: "/www/shop/rb7.jpg", price: 100, title: "Motionsfreak", sold: true },
            { image: "/www/shop/rb8.jpg", price: 100, title: "Blundende herre", sold: true },
            { image: "/www/shop/rb9.jpg", price: 100, title: "Festlig frue", sold: true },
            { image: "/www/shop/rb10.jpg", price: 100, title: "Motionsfreak 2" },
            { image: "/www/shop/rb11.jpg", price: 100, title: "Frøken i festklæder", sold: true },
            { image: "/www/shop/rb12.jpg", price: 100, title: "Herre", sold: true },
            { image: "/www/shop/rb13.jpg", price: 100, title: "Tarzan" },
            { image: "/www/shop/rb14.jpg", price: 100, title: "Motionsfreak 3", sold: true },
            { image: "/www/shop/rb15.jpg", price: 100, title: "Boldhaj", sold: true },
            { image: "/www/shop/rb16.jpg", price: 100, title: "Lille nutter med vogn og røde kinder", sold: true },
            { image: "/www/shop/rb17.jpg", price: 100, title: "Lille frøken med hund", sold: true },
            { image: "/www/shop/rb18.jpg", price: 100, title: "Festfreak" },
            { image: "/www/shop/rb19.jpg", price: 100, title: "Lille dame med hat", sold: true },
            { image: "/www/shop/rb20.jpg", price: 100, title: "Herre med hat" }
        ]
    }
};