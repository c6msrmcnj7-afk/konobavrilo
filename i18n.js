/* ==========================================================================
   Konoba Vrilo — visejezicnost (HR / EN / DE / IT)
   --------------------------------------------------------------------------
   Hrvatski je izvor i nalazi se u HTML-u. Ostali jezici zive u I18N rjecniku
   ispod, pod kljucem iz data-i18n oznake (kljuc = hash hrvatskog teksta).

   Kako dodati ili promijeniti tekst:
     1. uredi hrvatski tekst u HTML-u
     2. python3 tools/i18n.py apply     # upise oznake (idempotentno)
     3. python3 tools/i18n.py check     # kaze koji kljuc nema prijevod
     4. upisi prijevod u tools/translations.tsv i pokreni:
        python3 tools/gen_dict.py && python3 tools/make_i18n.py

   Jezik se pamti u localStorage i u URL-u (?lang=en), pa je svaka jezicna
   verzija dijeljiva linkom. Bez JavaScripta stranica ostaje na hrvatskom.
   ========================================================================== */
(function () {
  'use strict';

  var I18N = {
      '0cafdd7f61': {
        hr: 'Konoba Vrilo',
        en: 'Konoba Vrilo',
        de: 'Konoba Vrilo',
        it: 'Konoba Vrilo'
      },
      '28c90f2ecc': {
        hr: 'Prud · Metković',
        en: 'Prud · Metković',
        de: 'Prud · Metković',
        it: 'Prud · Metković'
      },
      '394d912286': {
        hr: 'O nama',
        en: 'About us',
        de: 'Über uns',
        it: 'Chi siamo'
      },
      'acaddc4eb7': {
        hr: 'Specijaliteti',
        en: 'Specialities',
        de: 'Spezialitäten',
        it: 'Specialità'
      },
      'd41683899f': {
        hr: 'Jelovnik',
        en: 'Menu',
        de: 'Speisekarte',
        it: 'Menù'
      },
      '66fadc7e10': {
        hr: 'Galerija',
        en: 'Gallery',
        de: 'Galerie',
        it: 'Galleria'
      },
      'bc17c1f017': {
        hr: 'Video',
        en: 'Video',
        de: 'Video',
        it: 'Video'
      },
      '0b9d2b2362': {
        hr: 'Blog',
        en: 'Blog',
        de: 'Blog',
        it: 'Blog'
      },
      '41ba510de4': {
        hr: 'Posjetite nas',
        en: 'Visit us',
        de: 'Besuchen Sie uns',
        it: 'Visitaci'
      },
      'a9b3275af6': {
        hr: 'Rezerviraj',
        en: 'Book',
        de: 'Reservieren',
        it: 'Prenota'
      },
      '8ea088d73d': {
        hr: 'Od 10 do 23 · svaki dan · Prud, Metković',
        en: '10 am – 11 pm · every day · Prud, Metković',
        de: '10–23 Uhr · jeden Tag · Prud, Metković',
        it: '10–23 · ogni giorno · Prud, Metković'
      },
      '224b49386e': {
        hr: 'Neretvanski<br><em>specijaliteti</em><br>uz izvor Norina',
        en: 'Neretva<br><em>specialities</em><br>at the spring of the Norin',
        de: 'Neretva-<br><em>Spezialitäten</em><br>an der Quelle des Norin',
        it: 'Specialità<br><em>della Neretva</em><br>alla sorgente del Norin'
      },
      '977c261707': {
        hr: 'Jegulja i žabe iz neretvanskih rukavaca, slatkovodni škampi, riba s gradela i meso ispod peke — u konobi koja se nalazi tik uz vrilo rijeke Norin.',
        en: 'Eel and frogs from the Neretva backwaters, freshwater prawns, fish from the grill and meat baked under the peka — in a konoba that stands right beside the spring of the river Norin.',
        de: 'Aal und Frösche aus den Neretva-Seitenarmen, Süßwassergarnelen, Fisch vom Grill und Fleisch unter der Peka — in einer Konoba direkt an der Quelle des Flusses Norin.',
        it: 'Anguille e rane delle lanche della Neretva, gamberi d\'acqua dolce, pesce alla griglia e carne sotto la peka — in una konoba proprio accanto alla sorgente del fiume Norin.'
      },
      '8122b3011b': {
        hr: 'Pozovi i rezerviraj',
        en: 'Call and book',
        de: 'Anrufen und reservieren',
        it: 'Chiama e prenota'
      },
      'b02b04f691': {
        hr: 'Pogledaj jelovnik',
        en: 'See the menu',
        de: 'Speisekarte ansehen',
        it: 'Vedi il menù'
      },
      'a33803ea70': {
        hr: '<strong>4,8 / 5</strong><span>858 Google recenzija</span>',
        en: '<strong>4.8 / 5</strong><span>858 Google reviews</span>',
        de: '<strong>4,8 / 5</strong><span>858 Google-Bewertungen</span>',
        it: '<strong>4,8 / 5</strong><span>858 recensioni Google</span>'
      },
      '1f737590f4': {
        hr: '<strong>13 / 20</strong><span>Gault&amp;Millau, Chef\'s Restaurant</span>',
        en: '<strong>13 / 20</strong><span>Gault&amp;Millau, Chef\'s Restaurant</span>',
        de: '<strong>13 / 20</strong><span>Gault&amp;Millau, Chef\'s Restaurant</span>',
        it: '<strong>13 / 20</strong><span>Gault&amp;Millau, Chef\'s Restaurant</span>'
      },
      'e586d68a04': {
        hr: '<strong>10–23 h</strong><span>svaki dan u tjednu</span>',
        en: '<strong>10 am – 11 pm</strong><span>every day of the week</span>',
        de: '<strong>10–23 Uhr</strong><span>jeden Tag der Woche</span>',
        it: '<strong>10–23</strong><span>tutti i giorni</span>'
      },
      'd9d9725450': {
        hr: '<span class="media-tag-num">13</span> <span class="media-tag-txt">/20 Gault&amp;Millau<br>Chef\'s Restaurant</span>',
        en: '<span class="media-tag-num">13</span> <span class="media-tag-txt">/20 Gault&amp;Millau<br>Chef\'s Restaurant</span>',
        de: '<span class="media-tag-num">13</span> <span class="media-tag-txt">/20 Gault&amp;Millau<br>Chef\'s Restaurant</span>',
        it: '<span class="media-tag-num">13</span> <span class="media-tag-txt">/20 Gault&amp;Millau<br>Chef\'s Restaurant</span>'
      },
      '3c27ac4d9a': {
        hr: 'O konobi',
        en: 'About the konoba',
        de: 'Über die Konoba',
        it: 'La konoba'
      },
      'd64b37f3f3': {
        hr: 'Kuhinja koja miriše na Neretvu',
        en: 'A kitchen that smells of the Neretva',
        de: 'Eine Küche, die nach Neretva riecht',
        it: 'Una cucina che profuma di Neretva'
      },
      'ed98d90deb': {
        hr: 'Konoba Vrilo nalazi se uz samo vrilo rijeke Norin, nekoliko minuta vožnje od Metkovića prema granici s Bosnom i Hercegovinom. Prostor je uređen u tradicijskom dalmatinskom duhu — ribarske vrše, drvene barke i simbol žabe, zaštitni znak neretvanske kuhinje.',
        en: 'Konoba Vrilo stands beside the very spring of the river Norin, a few minutes\' drive from Metković towards the border with Bosnia and Herzegovina. The interior is furnished in the traditional Dalmatian style — fishing traps, wooden boats and the frog, the emblem of Neretva cuisine.',
        de: 'Die Konoba Vrilo liegt direkt an der Quelle des Flusses Norin, wenige Minuten von Metković in Richtung der Grenze zu Bosnien und Herzegowina. Der Raum ist im traditionellen dalmatinischen Stil eingerichtet — Fischerreusen, Holzboote und der Frosch, das Wahrzeichen der Neretva-Küche.',
        it: 'La Konoba Vrilo si trova proprio accanto alla sorgente del fiume Norin, a pochi minuti d\'auto da Metković verso il confine con la Bosnia ed Erzegovina. L\'interno è arredato in stile dalmata tradizionale — nasse da pesca, barche di legno e la rana, simbolo della cucina della Neretva.'
      },
      '2db91c9ad6': {
        hr: 'Kuhinju vodi chefica <strong>Stojka Taslak</strong>. Iz neretvanskih rukavaca na stol dolaze jegulja i žabe, slatkovodni škampi, riječna i morska riba, a iz peke meso i domaći kruh koji se umače u slatko-slanu frotu. Zaokružuju ih vina iz obližnjih neretvanskih vinograda.',
        en: 'The kitchen is led by chef <strong>Stojka Taslak</strong>. From the Neretva backwaters come eel and frogs, freshwater prawns, river and sea fish, and from the peka meat and home-made bread dipped in the sweet-and-savoury frota. Local Neretva wines complete the meal.',
        de: 'Die Küche leitet Chefköchin <strong>Stojka Taslak</strong>. Aus den Neretva-Seitenarmen kommen Aal und Frösche, Süßwassergarnelen, Fluss- und Meeresfisch, aus der Peka Fleisch und hausgemachtes Brot, das in die süß-salzige Frota getunkt wird. Weine aus den nahen Neretva-Weinbergen runden das Ganze ab.',
        it: 'La cucina è guidata dalla chef <strong>Stojka Taslak</strong>. Dalle lanche della Neretva arrivano anguilla e rane, gamberi d\'acqua dolce, pesce di fiume e di mare, e dalla peka carne e pane fatto in casa da intingere nella frota agrodolce. I vini dei vicini vigneti della Neretva completano il pasto.'
      },
      '06c90bdc50': {
        hr: '<span>Specijaliteti</span>Jegulja · žabe · škampi · peka',
        en: '<span>Specialities</span>Eel · frogs · prawns · peka',
        de: '<span>Spezialitäten</span>Aal · Frösche · Garnelen · Peka',
        it: '<span>Specialità</span>Anguilla · rane · gamberi · peka'
      },
      '517a3b9672': {
        hr: '<span>Chefica</span>Stojka Taslak',
        en: '<span>Chef</span>Stojka Taslak',
        de: '<span>Chefin</span>Stojka Taslak',
        it: '<span>Chef</span>Stojka Taslak'
      },
      'b5437d3005': {
        hr: '<span>Ocjena gostiju</span>4,8 / 5 — 858 recenzija',
        en: '<span>Guest rating</span>4.8 / 5 — 858 reviews',
        de: '<span>Gästebewertung</span>4,8 / 5 — 858 Bewertungen',
        it: '<span>Valutazione degli ospiti</span>4,8 / 5 — 858 recensioni'
      },
      '2a65934512': {
        hr: '<span>Parking</span>Besplatan, uz konobu',
        en: '<span>Parking</span>Free, beside the konoba',
        de: '<span>Parkplatz</span>Kostenlos, neben der Konoba',
        it: '<span>Parcheggio</span>Gratuito, accanto alla konoba'
      },
      '722d5a44d2': {
        hr: 'S potpisa kuće',
        en: 'From the house signature',
        de: 'Aus der Handschrift des Hauses',
        it: 'Dalla firma della casa'
      },
      '61479b536f': {
        hr: 'Jela po koja se dolazi u Prud',
        en: 'The dishes people come to Prud for',
        de: 'Gerichte, für die man nach Prud kommt',
        it: 'I piatti per cui si viene a Prud'
      },
      '35c4894773': {
        hr: 'Rijeka daje okus, peka daje miris. Ovo su jela koja gosti najčešće spominju u recenzijama.',
        en: 'The river gives the flavour, the peka gives the aroma. These are the dishes guests mention most often in their reviews.',
        de: 'Der Fluss gibt den Geschmack, die Peka den Duft. Das sind die Gerichte, die Gäste in ihren Bewertungen am häufigsten nennen.',
        it: 'Il fiume dà il sapore, la peka il profumo. Questi sono i piatti che gli ospiti citano più spesso nelle recensioni.'
      },
      'cc75384068': {
        hr: 'Žabe i jegulja u brudetu',
        en: 'Frogs and eel in brudet',
        de: 'Frösche und Aal im Brudet',
        it: 'Rane e anguilla in brudet'
      },
      '74e41b8e6b': {
        hr: 'Žabe pirjane s lukom i jegulja u gustom, slatko-slanom brudetu — jelo zbog kojeg se u Neretvu vraćaju generacije.',
        en: 'Frogs stewed with onion and eel in a thick, sweet-and-savoury brudet — the dish that brings generations back to the Neretva.',
        de: 'Frösche mit Zwiebel geschmort und Aal in einem dicken, süß-salzigen Brudet — das Gericht, für das Generationen in die Neretva zurückkehren.',
        it: 'Rane stufate con la cipolla e anguilla in un brudet denso e agrodolce — il piatto per cui generazioni tornano nella Neretva.'
      },
      'cda6e37a7e': {
        hr: 'Riba i jegulja s gradela',
        en: 'Fish and eel from the grill',
        de: 'Fisch und Aal vom Grill',
        it: 'Pesce e anguilla alla griglia'
      },
      '3c2816e78a': {
        hr: 'Jegulja s ražnja te riječna i morska riba s gradela, uz blitvu, krumpir ili sezonsko povrće.',
        en: 'Eel on the spit and river and sea fish from the grill, with chard, potatoes or seasonal vegetables.',
        de: 'Aal am Spieß sowie Fluss- und Meeresfisch vom Grill, mit Mangold, Kartoffeln oder Saisongemüse.',
        it: 'Anguilla allo spiedo e pesce di fiume e di mare alla griglia, con bietola, patate o verdure di stagione.'
      },
      '6c729dc908': {
        hr: 'Meso i kruh ispod peke',
        en: 'Meat and bread under the peka',
        de: 'Fleisch und Brot unter der Peka',
        it: 'Carne e pane sotto la peka'
      },
      'f0cb5e0932': {
        hr: 'Janjetina, teleća koljenica i piletina ispod peke, uz domaći kruh pečen pod istom pekom.',
        en: 'Lamb, veal shank and chicken under the peka, with home-made bread baked under the same peka.',
        de: 'Lamm, Kalbshaxe und Huhn unter der Peka, dazu hausgemachtes Brot, das unter derselben Peka gebacken wird.',
        it: 'Agnello, stinco di vitello e pollo sotto la peka, con pane fatto in casa cotto sotto la stessa peka.'
      },
      '60eecb9045': {
        hr: 'Hobotnica i lignje',
        en: 'Octopus and squid',
        de: 'Polpo und Tintenfisch',
        it: 'Polpo e calamari'
      },
      '78e61ec352': {
        hr: 'Hobotnica ispod peke, salata od hobotnice i lignje s gradela — hladna i topla predjela za početak.',
        en: 'Octopus under the peka, octopus salad and grilled squid — cold and warm starters to begin with.',
        de: 'Polpo unter der Peka, Polpo-Salat und Tintenfisch vom Grill — kalte und warme Vorspeisen für den Anfang.',
        it: 'Polpo sotto la peka, insalata di polpo e calamari alla griglia — antipasti freddi e caldi per iniziare.'
      },
      'ccebdf902f': {
        hr: 'Što se jede u Vrilu',
        en: 'What is eaten at Vrilo',
        de: 'Was man im Vrilo isst',
        it: 'Cosa si mangia al Vrilo'
      },
      'e757829b5f': {
        hr: 'Ponuda se mijenja dnevno, prema ulovu i sezoni. Za jela ispod peke i veće grupe preporučujemo rezervaciju dan prije.',
        en: 'The offer changes daily, according to the catch and the season. For dishes under the peka and larger groups we recommend booking a day ahead.',
        de: 'Das Angebot wechselt täglich, je nach Fang und Saison. Für Gerichte unter der Peka und größere Gruppen empfehlen wir eine Reservierung einen Tag vorher.',
        it: 'L\'offerta cambia ogni giorno, secondo la pesca e la stagione. Per i piatti sotto la peka e i gruppi numerosi consigliamo di prenotare un giorno prima.'
      },
      'd0106c442e': {
        hr: 'Iz rijeke i mora',
        en: 'From river and sea',
        de: 'Aus Fluss und Meer',
        it: 'Dal fiume e dal mare'
      },
      'ad45986a5c': {
        hr: 'Jegulja s ražnja',
        en: 'Eel on the spit',
        de: 'Aal am Spieß',
        it: 'Anguilla allo spiedo'
      },
      'da3b824167': {
        hr: 'Žabe na lukcu',
        en: 'Frogs on the onion base',
        de: 'Frösche auf Zwiebelbett',
        it: 'Rane in cipollata'
      },
      'e8dc6495da': {
        hr: 'Brudet od žaba i jegulje',
        en: 'Brudet of frogs and eel',
        de: 'Brudet von Fröschen und Aal',
        it: 'Brudet di rane e anguilla'
      },
      '11c231fb27': {
        hr: 'Rižot od žaba',
        en: 'Frog risotto',
        de: 'Frosch-Risotto',
        it: 'Risotto di rane'
      },
      '235f69636f': {
        hr: 'Slatkovodni škampi na buzaru',
        en: 'Freshwater prawns buzara',
        de: 'Süßwassergarnelen Buzara',
        it: 'Gamberi d\'acqua dolce alla buzara'
      },
      '90e4f1adbb': {
        hr: 'Slatkovodni škampi s gradela',
        en: 'Freshwater prawns from the grill',
        de: 'Süßwassergarnelen vom Grill',
        it: 'Gamberi d\'acqua dolce alla griglia'
      },
      '026e5aab2a': {
        hr: 'Hobotnica ispod peke',
        en: 'Octopus under the peka',
        de: 'Polpo unter der Peka',
        it: 'Polpo sotto la peka'
      },
      'fa168dfc1c': {
        hr: 'Rižot od plodova mora',
        en: 'Seafood risotto',
        de: 'Meeresfrüchte-Risotto',
        it: 'Risotto ai frutti di mare'
      },
      'efe8d96011': {
        hr: 'Ispod peke i s gradela',
        en: 'Under the peka and from the grill',
        de: 'Unter der Peka und vom Grill',
        it: 'Sotto la peka e alla griglia'
      },
      '32e997723d': {
        hr: 'Janjetina ispod peke',
        en: 'Lamb under the peka',
        de: 'Lamm unter der Peka',
        it: 'Agnello sotto la peka'
      },
      '7f44c15f10': {
        hr: 'Teleća koljenica ispod peke',
        en: 'Veal shank under the peka',
        de: 'Kalbshaxe unter der Peka',
        it: 'Stinco di vitello sotto la peka'
      },
      'd3d84891e2': {
        hr: 'Piletina ispod peke',
        en: 'Chicken under the peka',
        de: 'Huhn unter der Peka',
        it: 'Pollo sotto la peka'
      },
      '168c1a2d5e': {
        hr: 'Domaći kruh ispod peke',
        en: 'Home-made bread under the peka',
        de: 'Hausgemachtes Brot unter der Peka',
        it: 'Pane fatto in casa sotto la peka'
      },
      '6f002e4853': {
        hr: 'Miješano meso s gradela',
        en: 'Mixed meat from the grill',
        de: 'Gemischtes Fleisch vom Grill',
        it: 'Carne mista alla griglia'
      },
      '8900f97a8f': {
        hr: 'Ramstek',
        en: 'Rump steak',
        de: 'Rumpsteak',
        it: 'Roastbeef'
      },
      'df9a843206': {
        hr: 'Lignje s gradela',
        en: 'Squid from the grill',
        de: 'Tintenfisch vom Grill',
        it: 'Calamari alla griglia'
      },
      '4c8ba8c8c2': {
        hr: 'Prilozi, slastice i piće',
        en: 'Sides, desserts and drinks',
        de: 'Beilagen, Desserts und Getränke',
        it: 'Contorni, dolci e bevande'
      },
      'cbdf06fbf3': {
        hr: 'Grilovano povrće',
        en: 'Grilled vegetables',
        de: 'Grillgemüse',
        it: 'Verdure alla griglia'
      },
      'eaa451a80d': {
        hr: 'Blitva s krumpirom',
        en: 'Chard with potatoes',
        de: 'Mangold mit Kartoffeln',
        it: 'Bietola con patate'
      },
      '9507715255': {
        hr: 'Domaći krumpir i sezonska salata',
        en: 'Home-grown potatoes and seasonal salad',
        de: 'Hauskartoffeln und Saisonsalat',
        it: 'Patate di casa e insalata di stagione'
      },
      'a19a05bd61': {
        hr: 'Palačinke i kolač dana',
        en: 'Pancakes and cake of the day',
        de: 'Pfannkuchen und Tageskuchen',
        it: 'Pancake e dolce del giorno'
      },
      '89194a4e8b': {
        hr: 'Vina iz neretvanskih vinograda',
        en: 'Wines from Neretva vineyards',
        de: 'Weine aus Neretva-Weinbergen',
        it: 'Vini dei vigneti della Neretva'
      },
      '2e5c9eb36a': {
        hr: 'Domaće rakije, pivo, kava',
        en: 'Home-made brandies, beer, coffee',
        de: 'Hausgemachte Schnäpse, Bier, Kaffee',
        it: 'Acquaviti di casa, birra, caffè'
      },
      'db9871be96': {
        hr: 'Cijene su istaknute u konobi. Za alergene i posebne želje recite nam prilikom rezervacije — kuhinja se prilagođava.',
        en: 'Prices are displayed in the konoba. Tell us about allergies and special wishes when you book — the kitchen adapts.',
        de: 'Die Preise stehen in der Konoba. Allergien und Sonderwünsche sagen Sie uns bei der Reservierung — die Küche passt sich an.',
        it: 'I prezzi sono esposti nella konoba. Comunicaci allergie e richieste particolari al momento della prenotazione — la cucina si adatta.'
      },
      '354e8108d6': {
        hr: 'Kako izgleda večer u Vrilu',
        en: 'What an evening at Vrilo looks like',
        de: 'Wie ein Abend im Vrilo aussieht',
        it: 'Com\'è una serata al Vrilo'
      },
      '87aeaba929': {
        hr: 'Video · s terena',
        en: 'Video · from the field',
        de: 'Video · vom Feld',
        it: 'Video · dal campo'
      },
      'b5f15418c9': {
        hr: 'Pogledajte prije nego dođete',
        en: 'Watch before you come',
        de: 'Schauen Sie vorher rein',
        it: 'Guarda prima di venire'
      },
      'cc47fd46e3': {
        hr: 'Dvije snimke s kanala <strong>Zvonimir Taslak</strong> — jedna s vode, jedna iz kuhinje. Prva vas provede kroz Neretvu, druga pokazuje kako se kuha pravi brudet.',
        en: 'Two clips from the channel <strong>Zvonimir Taslak</strong> — one from the water, one from the kitchen. The first takes you through the Neretva, the second shows how a real brudet is cooked.',
        de: 'Zwei Clips vom Kanal <strong>Zvonimir Taslak</strong> — einer vom Wasser, einer aus der Küche. Der erste führt durch die Neretva, der zweite zeigt, wie ein echter Brudet gekocht wird.',
        it: 'Due filmati dal canale <strong>Zvonimir Taslak</strong> — uno dall\'acqua, uno dalla cucina. Il primo porta attraverso la Neretva, il secondo mostra come si cucina un vero brudet.'
      },
      '558865a16f': {
        hr: 'YouTube',
        en: 'YouTube',
        de: 'YouTube',
        it: 'YouTube'
      },
      'c1cac41b91': {
        hr: '<strong>Kad naš brod plovi — Konoba Vrilo</strong> Neretvanski rukavci, lađe i ljudi koji od rijeke žive.',
        en: '<strong>When our boat sails — Konoba Vrilo</strong> Neretva backwaters, boats and the people who live from the river.',
        de: '<strong>Wenn unser Boot fährt — Konoba Vrilo</strong> Neretva-Seitenarme, Boote und Menschen, die vom Fluss leben.',
        it: '<strong>Quando la nostra barca naviga — Konoba Vrilo</strong> Lanche della Neretva, barche e gente che vive del fiume.'
      },
      'cc75383438': {
        hr: '<strong>BRUDET</strong> Jegulja, žabe i teća — jelo koje je obilježilo dolinu. <a href="blog/neretvanski-brudet.html">Cijeli recept →</a>',
        en: '<strong>BRUDET</strong> Eel, frogs and the teća — the dish that shaped the valley. <a href="blog/neretvanski-brudet.html">Full recipe →</a>',
        de: '<strong>BRUDET</strong> Aal, Frösche und die Teća — das Gericht, das das Tal geprägt hat. <a href="blog/neretvanski-brudet.html">Das ganze Rezept →</a>',
        it: '<strong>BRUDET</strong> Anguilla, rane e la teća — il piatto che ha segnato la valle. <a href="blog/neretvanski-brudet.html">La ricetta completa →</a>'
      },
      'fc03b87bf8': {
        hr: '„Žabe pirjane s lukom posebno su ukusne, poslužene s domaćim kruhom ispod peke, idealnim za umakanje u slatko-slanu frotu. Jegulja — jedan od najcjenjenijih delikatesa doline — peče se na ražnju.“',
        en: '“Frogs stewed with onion are especially tasty, served with home-made bread baked under the peka, ideal for dipping into the sweet-and-savoury frota. The eel — one of the most prized delicacies of the valley — is roasted on the spit.”',
        de: '„Frösche mit Zwiebel geschmort sind besonders schmackhaft, serviert mit hausgemachtem Brot aus der Peka, ideal zum Tunken in die süß-salzige Frota. Der Aal — eine der geschätztesten Delikatessen des Tals — wird am Spieß gebraten.“',
        it: '"Le rane stufate con la cipolla sono particolarmente gustose, servite con pane fatto in casa sotto la peka, ideale per intingere nella frota agrodolce. L\'anguilla — una delle prelibatezze più apprezzate della valle — si arrostisce allo spiedo."'
      },
      '53675019a2': {
        hr: 'Gault&amp;Millau, ocjena <strong>13/20</strong>',
        en: 'Gault&amp;Millau, rating <strong>13/20</strong>',
        de: 'Gault&amp;Millau, Bewertung <strong>13/20</strong>',
        it: 'Gault&amp;Millau, valutazione <strong>13/20</strong>'
      },
      '35e2f6dbd9': {
        hr: '858 recenzija gostiju na Googleu',
        en: '858 guest reviews on Google',
        de: '858 Gästebewertungen auf Google',
        it: '858 recensioni degli ospiti su Google'
      },
      'e11294ddb7': {
        hr: 'Najbolje ocijenjeno mjesto u Metkoviću po broju recenzija.',
        en: 'The best-rated place in Metković by number of reviews.',
        de: 'Der bestbewertete Ort in Metković nach Anzahl der Bewertungen.',
        it: 'Il locale meglio valutato di Metković per numero di recensioni.'
      },
      'd67964190c': {
        hr: 'Blog · Priče iz doline',
        en: 'Blog · Stories from the valley',
        de: 'Blog · Geschichten aus dem Tal',
        it: 'Blog · Storie dalla valle'
      },
      '4bd6d16130': {
        hr: 'Neretva na tanjuru',
        en: 'The Neretva on a plate',
        de: 'Die Neretva auf dem Teller',
        it: 'La Neretva nel piatto'
      },
      '93d9b3fd73': {
        hr: 'Recepti, običaji i jela koja se u Neretvi ne mijenjaju stoljećima. Pišemo ono što i kuhamo — od rukavaca do palente.',
        en: 'Recipes, customs and dishes that have not changed in the Neretva for centuries. We write what we cook — from the backwaters to the polenta.',
        de: 'Rezepte, Bräuche und Gerichte, die sich in der Neretva seit Jahrhunderten nicht ändern. Wir schreiben, was wir kochen — von den Seitenarmen bis zur Polenta.',
        it: 'Ricette, usanze e piatti che nella Neretva non cambiano da secoli. Scriviamo ciò che cuciniamo — dalle lanche alla polenta.'
      },
      '97f9c73461': {
        hr: 'Delta Neretve — rukavci, trstika i barka.',
        en: 'The Neretva delta — backwaters, reeds and a boat.',
        de: 'Das Neretva-Delta — Seitenarme, Schilf und ein Boot.',
        it: 'Il delta della Neretva — lanche, canneti e una barca.'
      },
      'c053414d9f': {
        hr: '<strong>2</strong><span>objavljene priče</span>',
        en: '<strong>2</strong><span>published stories</span>',
        de: '<strong>2</strong><span>veröffentlichte Geschichten</span>',
        it: '<strong>2</strong><span>storie pubblicate</span>'
      },
      '13454acf90': {
        hr: '<strong>2013.</strong><span>BBC Travel piše o konobi i neretvanskim žabama</span>',
        en: '<strong>2013.</strong><span>BBC Travel writes about the konoba and Neretva frogs</span>',
        de: '<strong>2013</strong><span>BBC Travel schreibt über die Konoba und die Frösche der Neretva</span>',
        it: '<strong>2013</strong><span>BBC Travel scrive della konoba e delle rane della Neretva</span>'
      },
      '12d6e49e9e': {
        hr: '<strong>13/20</strong><span>ocjena Gault&amp;Millau</span>',
        en: '<strong>13/20</strong><span>Gault&amp;Millau rating</span>',
        de: '<strong>13/20</strong><span>Gault&amp;Millau-Bewertung</span>',
        it: '<strong>13/20</strong><span>valutazione Gault&amp;Millau</span>'
      },
      '3df23388a0': {
        hr: 'Iz pressa',
        en: 'From the press',
        de: 'Aus der Presse',
        it: 'Dalla stampa'
      },
      '2c18e1b6aa': {
        hr: '6 min čitanja',
        en: '6 min read',
        de: '6 Min. Lesezeit',
        it: '6 min di lettura'
      },
      '9b2a63e3a8': {
        hr: 'Konoba Vrilo u svjetskim medijima',
        en: 'Konoba Vrilo in the world\'s media',
        de: 'Konoba Vrilo in den Weltmedien',
        it: 'Konoba Vrilo sui media internazionali'
      },
      'fdff0ca603': {
        hr: 'BBC Travel je 2013. posvetio cijeli članak neretvanskoj tradiciji žaba — i pisao ga iz naše kuhinje u Prudu. Gault&amp;Millau trinaest godina poslije daje 13/20. Što su napisali i koja adresa treba provjeru.',
        en: 'In 2013 BBC Travel devoted a whole article to the Neretva frog tradition — and wrote it from our kitchen in Prud. Thirteen years later Gault&amp;Millau gives 13/20. What they wrote, and which address needs checking.',
        de: '2013 widmete BBC Travel der Neretva-Froschtradition einen ganzen Artikel — geschrieben aus unserer Küche in Prud. Dreizehn Jahre später gibt Gault&amp;Millau 13/20. Was sie schrieben und welche Adresse zu prüfen ist.',
        it: 'Nel 2013 BBC Travel ha dedicato un intero articolo alla tradizione delle rane della Neretva — scritto dalla nostra cucina a Prud. Tredici anni dopo Gault&amp;Millau assegna 13/20. Cosa hanno scritto e quale indirizzo va verificato.'
      },
      '33c5cf6585': {
        hr: 'Pročitaj cijelu priču →',
        en: 'Read the whole story →',
        de: 'Die ganze Geschichte lesen →',
        it: 'Leggi tutta la storia →'
      },
      '63683b8b28': {
        hr: 'Recept i priča',
        en: 'Recipe and story',
        de: 'Rezept und Geschichte',
        it: 'Ricetta e storia'
      },
      'c246f0c374': {
        hr: 'Kuhinja Neretve',
        en: 'Neretva cuisine',
        de: 'Küche der Neretva',
        it: 'Cucina della Neretva'
      },
      '9dc48dd715': {
        hr: '8 min čitanja',
        en: '8 min read',
        de: '8 Min. Lesezeit',
        it: '8 min di lettura'
      },
      'eb7db253a3': {
        hr: 'Neretvanski brudet — soul of the Neretva valley',
        en: 'Neretva brudet — soul of the Neretva valley',
        de: 'Neretva-Brudet — soul of the Neretva valley',
        it: 'Brudet della Neretva — soul of the Neretva valley'
      },
      '6a68c0dfea': {
        hr: 'Nekad sirotinjsko jelo od jegulja i žaba, danas gastronomski simbol doline i zaštićeno kulturno dobro. Priča o brudetu, zlatna pravila pripreme i klasični recept za 4–6 osoba.',
        en: 'Once a poor man\'s dish of eel and frogs, today the gastronomic symbol of the valley and a protected cultural asset. The story of brudet, the golden rules of preparation and the classic recipe for 4–6 people.',
        de: 'Einst ein Arme-Leute-Gericht aus Aal und Fröschen, heute das gastronomische Symbol des Tals und ein geschütztes Kulturgut. Die Geschichte des Brudet, die goldenen Regeln und das klassische Rezept für 4–6 Personen.',
        it: 'Un tempo piatto povero di anguilla e rane, oggi simbolo gastronomico della valle e bene culturale protetto. La storia del brudet, le regole d\'oro e la ricetta classica per 4–6 persone.'
      },
      'e6d0e9d873': {
        hr: '<span>Sve priče iz doline</span> <span class="blog-all-ico" aria-hidden="true">→</span>',
        en: '<span>All stories from the valley</span> <span class="blog-all-ico" aria-hidden="true">→</span>',
        de: '<span>Alle Geschichten aus dem Tal</span> <span class="blog-all-ico" aria-hidden="true">→</span>',
        it: '<span>Tutte le storie dalla valle</span> <span class="blog-all-ico" aria-hidden="true">→</span>'
      },
      '52916e7900': {
        hr: 'Prud 193, 20350 Metković',
        en: 'Prud 193, 20350 Metković',
        de: 'Prud 193, 20350 Metković',
        it: 'Prud 193, 20350 Metković'
      },
      'ac91b8547e': {
        hr: 'Uz vrilo rijeke Norin, na cesti prema granici s Bosnom i Hercegovinom.',
        en: 'Beside the spring of the river Norin, on the road towards the border with Bosnia and Herzegovina.',
        de: 'An der Quelle des Flusses Norin, an der Straße zur Grenze nach Bosnien und Herzegowina.',
        it: 'Accanto alla sorgente del fiume Norin, sulla strada verso il confine con la Bosnia ed Erzegovina.'
      },
      '8925828cfb': {
        hr: '<strong>Telefon</strong> <a href="tel:+38520687139">+385 20 687 139</a>',
        en: '<strong>Phone</strong> <a href="tel:+38520687139">+385 20 687 139</a>',
        de: '<strong>Telefon</strong> <a href="tel:+38520687139">+385 20 687 139</a>',
        it: '<strong>Telefono</strong> <a href="tel:+38520687139">+385 20 687 139</a>'
      },
      '1fcb5d888c': {
        hr: '<strong>Mobitel</strong> <a href="tel:+385955148011">+385 95 514 8011</a>',
        en: '<strong>Mobile</strong> <a href="tel:+385955148011">+385 95 514 8011</a>',
        de: '<strong>Mobil</strong> <a href="tel:+385955148011">+385 95 514 8011</a>',
        it: '<strong>Cellulare</strong> <a href="tel:+385955148011">+385 95 514 8011</a>'
      },
      '6f4e789c64': {
        hr: 'Adresa',
        en: 'Address',
        de: 'Adresse',
        it: 'Indirizzo'
      },
      '649b976f1e': {
        hr: 'Radno vrijeme',
        en: 'Opening hours',
        de: 'Öffnungszeiten',
        it: 'Orari di apertura'
      },
      '87659d63af': {
        hr: 'Ponedjeljak – Četvrtak',
        en: 'Monday – Thursday',
        de: 'Montag – Donnerstag',
        it: 'Lunedì – Giovedì'
      },
      '7cb9e3c53c': {
        hr: 'Petak – Subota',
        en: 'Friday – Saturday',
        de: 'Freitag – Samstag',
        it: 'Venerdì – Sabato'
      },
      '3fffcb34e3': {
        hr: 'Nedjelja',
        en: 'Sunday',
        de: 'Sonntag',
        it: 'Domenica'
      },
      '9319789089': {
        hr: 'Besplatan parking',
        en: 'Free parking',
        de: 'Kostenloser Parkplatz',
        it: 'Parcheggio gratuito'
      },
      'ae5f507649': {
        hr: 'Terasa',
        en: 'Terrace',
        de: 'Terrasse',
        it: 'Terrazza'
      },
      '52eec6539a': {
        hr: 'Ljubimci dobrodošli',
        en: 'Pets welcome',
        de: 'Haustiere willkommen',
        it: 'Animali benvenuti'
      },
      '170bb025c1': {
        hr: 'Pristup kolicima',
        en: 'Wheelchair access',
        de: 'Rollstuhlzugang',
        it: 'Accesso per disabili'
      },
      'c3bc1cd5e6': {
        hr: 'Kartice i NFC',
        en: 'Cards and NFC',
        de: 'Karten und NFC',
        it: 'Carte e NFC'
      },
      'bae4ae6595': {
        hr: 'Dostava i preuzimanje',
        en: 'Delivery and takeaway',
        de: 'Lieferung und Abholung',
        it: 'Consegna e asporto'
      },
      '237637e1c3': {
        hr: 'Nazovi konobu',
        en: 'Call the konoba',
        de: 'Konoba anrufen',
        it: 'Chiama la konoba'
      },
      'b8c5a3dea5': {
        hr: 'Otvori navigaciju →',
        en: 'Open navigation →',
        de: 'Navigation öffnen →',
        it: 'Apri la navigazione →'
      },
      '7e59eee71c': {
        hr: 'Prud 193, 20350 Metković · +385 20 687 139',
        en: 'Prud 193, 20350 Metković · +385 20 687 139',
        de: 'Prud 193, 20350 Metković · +385 20 687 139',
        it: 'Prud 193, 20350 Metković · +385 20 687 139'
      },
      'a92b9bcb16': {
        hr: 'Kontakt',
        en: 'Contact',
        de: 'Kontakt',
        it: 'Contatti'
      },
      'b6f834db27': {
        hr: '© <span id="year">2026</span> Konoba Vrilo. Sadržaj i fotografije sastavljeni su iz javnih izvora (Gault&amp;Millau, smokvina.hr, Google recenzije) — prije objave zamijenite ih vlastitim fotografijama i aktualnim cijenama.',
        en: '© <span id="year">2026</span> Konoba Vrilo. Content and photographs were compiled from public sources (Gault&amp;Millau, smokvina.hr, Google reviews) — replace them with your own photographs and current prices before publishing.',
        de: '© <span id="year">2026</span> Konoba Vrilo. Inhalte und Fotos wurden aus öffentlichen Quellen zusammengestellt (Gault&amp;Millau, smokvina.hr, Google-Bewertungen) — vor der Veröffentlichung durch eigene Fotos und aktuelle Preise ersetzen.',
        it: '© <span id="year">2026</span> Konoba Vrilo. Contenuti e fotografie sono stati compilati da fonti pubbliche (Gault&amp;Millau, smokvina.hr, recensioni Google) — prima della pubblicazione sostituirli con foto proprie e prezzi aggiornati.'
      },
      'bc8471fced': {
        hr: 'Konoba Vrilo — žaba i jegulja u barki',
        en: 'Konoba Vrilo — frog and eel in a boat',
        de: 'Konoba Vrilo — Frosch und Aal im Boot',
        it: 'Konoba Vrilo — rana e anguilla in barca'
      },
      '83c4cba1ad': {
        hr: 'Otvori navigaciju',
        en: 'Open navigation',
        de: 'Navigation öffnen',
        it: 'Apri la navigazione'
      },
      'a862b600f7': {
        hr: 'Jegulja na ražnju pred otvorenom vatrom u ognjištu konobe Vrilo',
        en: 'Eel on the spit in front of the open fire in the konoba\'s hearth',
        de: 'Aal am Spieß vor dem offenen Feuer im Herd der Konoba',
        it: 'Anguilla allo spiedo davanti al fuoco aperto nel focolare della konoba'
      },
      'f5d979e0da': {
        hr: 'Skrolaj do sadržaja',
        en: 'Scroll to content',
        de: 'Zum Inhalt scrollen',
        it: 'Scorri al contenuto'
      },
      'ee5bccbda2': {
        hr: 'Unutrašnjost konobe Vrilo — kameni zidovi, drveni stolovi i bar',
        en: 'Interior of Konoba Vrilo — stone walls, wooden tables and bar',
        de: 'Innenraum der Konoba Vrilo — Steinwände, Holztische und Bar',
        it: 'Interno della Konoba Vrilo — muri in pietra, tavoli di legno e bar'
      },
      '03b57c2ec1': {
        hr: 'Riba s gradela s povrćem',
        en: 'Grilled fish with vegetables',
        de: 'Fisch vom Grill mit Gemüse',
        it: 'Pesce alla griglia con verdure'
      },
      '0cc1588e75': {
        hr: 'Meso ispod peke na otvorenoj vatri',
        en: 'Meat under the peka over an open fire',
        de: 'Fleisch unter der Peka über offenem Feuer',
        it: 'Carne sotto la peka su fuoco aperto'
      },
      '7ee9f8c8e5': {
        hr: 'Hobotnica i lignje s gradela',
        en: 'Octopus and squid from the grill',
        de: 'Polpo und Tintenfisch vom Grill',
        it: 'Polpo e calamari alla griglia'
      },
      '2bcf05937f': {
        hr: 'Ulaz i terasa konobe Vrilo',
        en: 'Entrance and terrace of Konoba Vrilo',
        de: 'Eingang und Terrasse der Konoba Vrilo',
        it: 'Ingresso e terrazza della Konoba Vrilo'
      },
      'bad5b3b14c': {
        hr: 'Pečeno meso s povrćem',
        en: 'Roast meat with vegetables',
        de: 'Bratenfleisch mit Gemüse',
        it: 'Carne arrosto con verdure'
      },
      '5f9f195635': {
        hr: 'Meso s gradela, krumpir i umak',
        en: 'Meat from the grill, potatoes and sauce',
        de: 'Fleisch vom Grill, Kartoffeln und Sauce',
        it: 'Carne alla griglia, patate e salsa'
      },
      'ecbe2bc6d4': {
        hr: 'Unutrašnjost konobe',
        en: 'Interior of the konoba',
        de: 'Innenraum der Konoba',
        it: 'Interno della konoba'
      },
      '1add1ec1d6': {
        hr: 'Salata od hobotnice i lignje s gradela',
        en: 'Octopus salad and squid from the grill',
        de: 'Polpo-Salat und Tintenfisch vom Grill',
        it: 'Insalata di polpo e calamari alla griglia'
      },
      '8b94bd4c6c': {
        hr: 'Otvorena vatra i peka',
        en: 'Open fire and peka',
        de: 'Offenes Feuer und Peka',
        it: 'Fuoco aperto e peka'
      },
      'a5d5db2d1b': {
        hr: 'Riba s gradela i povrće',
        en: 'Fish from the grill and vegetables',
        de: 'Fisch vom Grill und Gemüse',
        it: 'Pesce alla griglia e verdure'
      },
      'e34202a370': {
        hr: 'Meso s gradela u Konobi Vrilo',
        en: 'Meat from the grill at Konoba Vrilo',
        de: 'Fleisch vom Grill in der Konoba Vrilo',
        it: 'Carne alla griglia alla Konoba Vrilo'
      },
      'fc11ac6991': {
        hr: 'Jegulja na ražnju nad žeravicom u ognjištu konobe',
        en: 'Eel on the spit over the embers in the konoba\'s hearth',
        de: 'Aal am Spieß über der Glut im Herd der Konoba',
        it: 'Anguilla allo spiedo sulla brace nel focolare della konoba'
      },
      '18202c3ce9': {
        hr: 'Kad naš brod plovi — Konoba Vrilo',
        en: 'When our boat sails — Konoba Vrilo',
        de: 'Wenn unser Boot fährt — Konoba Vrilo',
        it: 'Quando la nostra barca naviga — Konoba Vrilo'
      },
      '97b900082f': {
        hr: 'Pokreni video: Kad naš brod plovi — Konoba Vrilo',
        en: 'Play video: When our boat sails — Konoba Vrilo',
        de: 'Video abspielen: Wenn unser Boot fährt — Konoba Vrilo',
        it: 'Riproduci video: Quando la nostra barca naviga — Konoba Vrilo'
      },
      'c7b504f25b': {
        hr: 'BRUDET — snimka pripreme neretvanskog brudeta',
        en: 'BRUDET — a clip of the Neretva brudet being prepared',
        de: 'BRUDET — ein Clip über die Zubereitung des Neretva-Brudet',
        it: 'BRUDET — filmato della preparazione del brudet della Neretva'
      },
      'd3c6959b55': {
        hr: 'Pokreni video: BRUDET',
        en: 'Play video: BRUDET',
        de: 'Video abspielen: BRUDET',
        it: 'Riproduci video: BRUDET'
      },
      'f594e313bb': {
        hr: '4,8 od 5',
        en: '4.8 out of 5',
        de: '4,8 von 5',
        it: '4,8 su 5'
      },
      'd9aeac0939': {
        hr: 'Ilustracija neretvanske delte s rukavcima, trstikom i barkom',
        en: 'Illustration of the Neretva delta with backwaters, reeds and a boat',
        de: 'Illustration des Neretva-Deltas mit Seitenarmen, Schilf und Boot',
        it: 'Illustrazione del delta della Neretva con lanche, canneti e una barca'
      },
      '5837f77149': {
        hr: 'Ulaz i terasa Konobe Vrilo u Prudu',
        en: 'Entrance and terrace of Konoba Vrilo in Prud',
        de: 'Eingang und Terrasse der Konoba Vrilo in Prud',
        it: 'Ingresso e terrazza della Konoba Vrilo a Prud'
      },
      'c567ca05d8': {
        hr: 'Brudet od žaba i jegulje u teći',
        en: 'Brudet of frogs and eel in a teća',
        de: 'Brudet von Fröschen und Aal in einer Teća',
        it: 'Brudet di rane e anguilla in una teća'
      },
      '13ed186edd': {
        hr: 'Karta — Konoba Vrilo, Prud',
        en: 'Map — Konoba Vrilo, Prud',
        de: 'Karte — Konoba Vrilo, Prud',
        it: 'Mappa — Konoba Vrilo, Prud'
      },
      '549f59348d': {
        hr: 'Konoba Vrilo — logo',
        en: 'Konoba Vrilo — logo',
        de: 'Konoba Vrilo — Logo',
        it: 'Konoba Vrilo — logo'
      },
      'f811bbb8f4': {
        hr: 'Uvećani prikaz',
        en: 'Enlarged view',
        de: 'Vergrößerte Ansicht',
        it: 'Vista ingrandita'
      },
      '83848bfb9d': {
        hr: 'Zatvori',
        en: 'Close',
        de: 'Schließen',
        it: 'Chiudi'
      },
      '929d65a300': {
        hr: 'Konoba Vrilo u Prudu kod Metkovića — jegulja i žabe iz neretvanskih rukavaca, riba s gradela, meso i kruh ispod peke. Gault&Millau 13/20, ocijena gostiju 4,8/5.',
        en: 'Konoba Vrilo in Prud near Metković — eel and frogs from the Neretva backwaters, fish from the grill, meat and bread under the peka. Gault&amp;Millau 13/20, guest rating 4.8/5.',
        de: 'Konoba Vrilo in Prud bei Metković — Aal und Frösche aus den Neretva-Seitenarmen, Fisch vom Grill, Fleisch und Brot unter der Peka. Gault&amp;Millau 13/20, Gästebewertung 4,8/5.',
        it: 'Konoba Vrilo a Prud presso Metković — anguilla e rane delle lanche della Neretva, pesce alla griglia, carne e pane sotto la peka. Gault&amp;Millau 13/20, valutazione degli ospiti 4,8/5.'
      },
      '210457ba5d': {
        hr: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <span>Blog</span>',
        en: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <span>Blog</span>',
        de: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <span>Blog</span>',
        it: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <span>Blog</span>'
      },
      'add6ccf81e': {
        hr: 'Recepti, običaji i jela koja se u dolini Neretve ne mijenjaju stoljećima. Pišemo ono što i kuhamo — od rukavaca do palente.',
        en: 'Recipes, customs and dishes that have not changed for centuries in the Neretva valley. We write what we cook — from the backwaters to the polenta.',
        de: 'Rezepte, Bräuche und Gerichte, die sich im Neretva-Tal seit Jahrhunderten nicht ändern. Wir schreiben, was wir kochen — von den Seitenarmen bis zur Polenta.',
        it: 'Ricette, usanze e piatti che nella valle della Neretva non cambiano da secoli. Scriviamo ciò che cuciniamo — dalle lanche alla polenta.'
      },
      '172cc2340d': {
        hr: '<strong>Uz priču: BRUDET</strong> Snimka pripreme — uz recept iz članka.',
        en: '<strong>With the story: BRUDET</strong> A clip of the preparation — with the recipe from the article.',
        de: '<strong>Zur Geschichte: BRUDET</strong> Ein Clip der Zubereitung — mit dem Rezept aus dem Artikel.',
        it: '<strong>Con la storia: BRUDET</strong> Un filmato della preparazione — con la ricetta dell\'articolo.'
      },
      '33be112d33': {
        hr: 'Nove priče objavljujemo tijekom sezone — o jegulji s ražnja, žabama na lukcu, slatkovodnim škampima i vinima iz neretvanskih vinograda.',
        en: 'We publish new stories during the season — about eel on the spit, frogs on the onion base, freshwater prawns and wines from Neretva vineyards.',
        de: 'Während der Saison veröffentlichen wir neue Geschichten — über Aal am Spieß, Frösche auf dem Zwiebelbett, Süßwassergarnelen und Weine aus Neretva-Weinbergen.',
        it: 'Durante la stagione pubblichiamo nuove storie — sull\'anguilla allo spiedo, le rane in cipollata, i gamberi d\'acqua dolce e i vini dei vigneti della Neretva.'
      },
      'f4210a0534': {
        hr: 'Umjesto čitanja',
        en: 'Instead of reading',
        de: 'Statt zu lesen',
        it: 'Invece di leggere'
      },
      '292a4131a5': {
        hr: 'Dođite probati na mjestu gdje nastaje',
        en: 'Come and taste it where it is made',
        de: 'Kommen Sie und probieren Sie es dort, wo es entsteht',
        it: 'Venite ad assaggiarlo dove nasce'
      },
      'a6ec45fc64': {
        hr: 'Brudet od žaba i jegulje, jegulja s ražnja i domaći kruh ispod peke — uz vrilo rijeke Norin u Prudu.',
        en: 'Brudet of frogs and eel, eel on the spit and home-made bread under the peka — beside the spring of the river Norin in Prud.',
        de: 'Brudet von Fröschen und Aal, Aal am Spieß und hausgemachtes Brot unter der Peka — an der Quelle des Flusses Norin in Prud.',
        it: 'Brudet di rane e anguilla, anguilla allo spiedo e pane fatto in casa sotto la peka — accanto alla sorgente del fiume Norin a Prud.'
      },
      'e1e6dd0144': {
        hr: 'Putanja',
        en: 'Breadcrumb',
        de: 'Brotkrümelnavigation',
        it: 'Percorso'
      },
      'a2974fa479': {
        hr: 'Blog Konobe Vrilo: neretvanski brudet, jegulja, žabe, palenta i običaji doline Neretve. Priče iz kuhinje i klasični recepti.',
        en: 'The Konoba Vrilo blog: Neretva brudet, eel, frogs, polenta and the customs of the Neretva valley. Stories from the kitchen and classic recipes.',
        de: 'Der Blog der Konoba Vrilo: Neretva-Brudet, Aal, Frösche, Polenta und die Bräuche des Neretva-Tals. Geschichten aus der Küche und klassische Rezepte.',
        it: 'Il blog della Konoba Vrilo: brudet della Neretva, anguilla, rane, polenta e le usanze della valle della Neretva. Storie dalla cucina e ricette classiche.'
      },
      '21d311e3bc': {
        hr: 'Blog — priče i recepti iz doline Neretve',
        en: 'Blog — stories and recipes from the Neretva valley',
        de: 'Blog — Geschichten und Rezepte aus dem Neretva-Tal',
        it: 'Blog — storie e ricette dalla valle della Neretva'
      },
      '3ccd177c63': {
        hr: 'Recepti, običaji i jela koja se u dolini Neretve ne mijenjaju stoljećima.',
        en: 'Recipes, customs and dishes that have not changed for centuries in the Neretva valley.',
        de: 'Rezepte, Bräuche und Gerichte, die sich im Neretva-Tal seit Jahrhunderten nicht ändern.',
        it: 'Ricette, usanze e piatti che nella valle della Neretva non cambiano da secoli.'
      },
      '3518061923': {
        hr: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Neretvanski brudet</span>',
        en: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Brudet</span>',
        de: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Brudet</span>',
        it: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Brudet</span>'
      },
      '7a00c44b7f': {
        hr: 'Kuhinja Neretve · recept i priča',
        en: 'Neretva cuisine · recipe and story',
        de: 'Küche der Neretva · Rezept und Geschichte',
        it: 'Cucina della Neretva · ricetta e storia'
      },
      '97f4c3d5a4': {
        hr: 'Neretvanski brudet —<br><em>soul of the Neretva valley</em>',
        en: 'Neretva brudet —<br><em>soul of the Neretva valley</em>',
        de: 'Neretva-Brudet —<br><em>soul of the Neretva valley</em>',
        it: 'Brudet della Neretva —<br><em>soul of the Neretva valley</em>'
      },
      'e08a23af7f': {
        hr: 'Ako ste ikada prošli kroz Opuzen, Metković ili Ploče i osjetili miris luka, rajčice i nečega što podsjeća na more i rijeku u isto vrijeme — vjerojatno ste naišli na neretvanski brudet (lokalno još i <em>brujet</em> ili <em>brodet</em>).',
        en: 'If you have ever passed through Opuzen, Metković or Ploče and smelled onion, tomato and something that reminds you of sea and river at the same time — you have probably come across Neretva brudet (locally also <em>brujet</em> or <em>brodet</em>).',
        de: 'Wenn Sie je durch Opuzen, Metković oder Ploče gefahren sind und den Geruch von Zwiebel, Tomate und etwas, das gleichzeitig an Meer und Fluss erinnert, wahrgenommen haben — dann sind Sie wahrscheinlich dem Neretva-Brudet begegnet (lokal auch <em>brujet</em> oder <em>brodet</em>).',
        it: 'Se avete mai attraversato Opuzen, Metković o Ploče e sentito il profumo di cipolla, pomodoro e di qualcosa che ricorda insieme mare e fiume — probabilmente avete incontrato il brudet della Neretva (localmente anche <em>brujet</em> o <em>brodet</em>).'
      },
      '2cc59fd560': {
        hr: 'Vrijeme',
        en: 'Time',
        de: 'Zeit',
        it: 'Tempo'
      },
      '4b96f011ce': {
        hr: '35–40 min',
        en: '35–40 min',
        de: '35–40 Min.',
        it: '35–40 min'
      },
      'd63bcfcf90': {
        hr: 'Za',
        en: 'Serves',
        de: 'Für',
        it: 'Per'
      },
      '42cb3ab8fe': {
        hr: '4–6 osoba',
        en: '4–6 people',
        de: '4–6 Personen',
        it: '4–6 persone'
      },
      'c39caae5e0': {
        hr: 'Težina',
        en: 'Difficulty',
        de: 'Schwierigkeit',
        it: 'Difficoltà'
      },
      '03cce32081': {
        hr: 'srednja',
        en: 'medium',
        de: 'mittel',
        it: 'media'
      },
      'f6f5a1d433': {
        hr: 'Čitanje',
        en: 'Read',
        de: 'Lesezeit',
        it: 'Lettura'
      },
      '55bc201c0f': {
        hr: '8 min',
        en: '8 min',
        de: '8 Min.',
        it: '8 min'
      },
      '1fbd503133': {
        hr: 'To nije običan riblji gulaš. To je jelo koje miriše na deltu, na lađe, na stare ribolovne tehnike i na generacije koje su od siromaštva napravile deliciju.',
        en: 'This is no ordinary fish stew. It is a dish that smells of the delta, of boats, of old fishing techniques and of generations who turned poverty into a delicacy.',
        de: 'Das ist kein gewöhnlicher Fischeintopf. Es ist ein Gericht, das nach dem Delta riecht, nach Booten, nach alten Fangmethoden und nach Generationen, die aus Armut eine Delikatesse gemacht haben.',
        it: 'Non è un normale stufato di pesce. È un piatto che profuma di delta, di barche, di antiche tecniche di pesca e di generazioni che hanno trasformato la povertà in una prelibatezza.'
      },
      '868976b2d0': {
        hr: 'Od sirotinjskog jela do zaštićenog kulturnog dobra',
        en: 'From a poor man\'s dish to a protected cultural asset',
        de: 'Vom Arme-Leute-Gericht zum geschützten Kulturgut',
        it: 'Da piatto povero a bene culturale protetto'
      },
      '0438b10b5f': {
        hr: 'Nekad su Neretvani jeli ono što su mogli uloviti u rukavcima i kanalima: <strong>jegulje i žabe</strong>. Brudet je bio svakodnevni ručak. Danas je gastronomski simbol cijele doline, a umijeće njegove pripreme upisano je <strong>2022. godine</strong> u Registar nematerijalnih kulturnih dobara Republike Hrvatske.',
        en: 'Once the people of the Neretva ate what they could catch in the backwaters and channels: <strong>eels and frogs</strong>. Brudet was an everyday lunch. Today it is the gastronomic symbol of the whole valley, and in <strong>2022</strong> the skill of preparing it was entered in the Register of Intangible Cultural Heritage of the Republic of Croatia.',
        de: 'Einst aßen die Menschen der Neretva, was sie in den Seitenarmen und Kanälen fangen konnten: <strong>Aale und Frösche</strong>. Brudet war ein alltägliches Mittagessen. Heute ist es das gastronomische Symbol des ganzen Tals, und <strong>2022</strong> wurde die Kunst seiner Zubereitung in das Register des immateriellen Kulturerbes der Republik Kroatien eingetragen.',
        it: 'Un tempo la gente della Neretva mangiava ciò che riusciva a pescare nelle lanche e nei canali: <strong>anguille e rane</strong>. Il brudet era il pranzo di ogni giorno. Oggi è il simbolo gastronomico di tutta la valle e nel <strong>2022</strong> l\'arte della sua preparazione è stata iscritta nel Registro dei beni culturali immateriali della Repubblica di Croazia.'
      },
      '1402ad749a': {
        hr: 'Svaka kuća ima svoju verziju, ali osnovna pravila ostaju ista.',
        en: 'Every household has its own version, but the basic rules stay the same.',
        de: 'Jeder Haushalt hat seine eigene Version, aber die Grundregeln bleiben gleich.',
        it: 'Ogni casa ha la sua versione, ma le regole di base restano le stesse.'
      },
      '0047510840': {
        hr: 'Zlatna pravila brudeta',
        en: 'The golden rules of brudet',
        de: 'Die goldenen Regeln des Brudet',
        it: 'Le regole d\'oro del brudet'
      },
      '2b52265b6b': {
        hr: 'Prvo ide <strong>jegulja s kapulom</strong>.',
        en: 'First comes the <strong>eel with the onion</strong>.',
        de: 'Zuerst kommt der <strong>Aal mit der Zwiebel</strong>.',
        it: 'Prima viene l\'<strong>anguilla con la cipolla</strong>.'
      },
      'fa85afbe49': {
        hr: 'Posuda se <strong>nikad ne miješa kuhačom</strong> — samo se lagano protrese.',
        en: 'The pot is <strong>never stirred with a spoon</strong> — it is only shaken gently.',
        de: 'Der Topf wird <strong>nie mit dem Löffel umgerührt</strong> — er wird nur leicht geschüttelt.',
        it: 'La pentola <strong>non si mescola mai con il cucchiaio</strong> — si scuote solo delicatamente.'
      },
      'dc7990ce98': {
        hr: 'Na kraju se doda malo <strong>octa (kvasine)</strong>.',
        en: 'At the end a little <strong>vinegar (kvasina)</strong> is added.',
        de: 'Zum Schluss kommt etwas <strong>Essig (Kvasina)</strong> dazu.',
        it: 'Alla fine si aggiunge un po\' di <strong>aceto (kvasina)</strong>.'
      },
      '47a60a2b79': {
        hr: 'Servira se s <strong>kuhanom palentom</strong>.',
        en: 'It is served with <strong>cooked polenta</strong>.',
        de: 'Serviert wird es mit <strong>gekochter Polenta</strong>.',
        it: 'Si serve con la <strong>polenta cotta</strong>.'
      },
      '599153dab1': {
        hr: 'U Opuzenu se svake godine održava <strong>Neretvanska brudetijada</strong> — natjecanje u kojem ekipe kuhaju „pravi“ brudet od jegulja i žaba. To je prava proslava lokalnog identiteta.',
        en: 'Every year Opuzen hosts the <strong>Neretva Brudetijada</strong> — a competition in which teams cook the “real” brudet of eels and frogs. It is a true celebration of local identity.',
        de: 'Jedes Jahr findet in Opuzen die <strong>Neretva-Brudetijada</strong> statt — ein Wettbewerb, bei dem Teams den „echten“ Brudet aus Aalen und Fröschen kochen. Ein wahres Fest der lokalen Identität.',
        it: 'Ogni anno a Opuzen si tiene la <strong>Brudetijada della Neretva</strong> — una gara in cui le squadre cucinano il brudet “vero” di anguille e rane. Una vera festa dell\'identità locale.'
      },
      '33524114e4': {
        hr: 'Klasični recept <span class="h2-note">za 4–6 osoba</span>',
        en: 'Classic recipe <span class="h2-note">for 4–6 people</span>',
        de: 'Klassisches Rezept <span class="h2-note">für 4–6 Personen</span>',
        it: 'Ricetta classica <span class="h2-note">per 4–6 persone</span>'
      },
      '52f163f842': {
        hr: 'Sastojci',
        en: 'Ingredients',
        de: 'Zutaten',
        it: 'Ingredienti'
      },
      'f99f4dc206': {
        hr: '1 kg jegulje (narezane na „zvona“ od 4–5 cm)',
        en: '1 kg of eel (cut into 4–5 cm “bells”)',
        de: '1 kg Aal (in 4–5 cm „Glocken“ geschnitten)',
        it: '1 kg di anguilla (tagliata a “campane” di 4–5 cm)'
      },
      'd1f19bb6d8': {
        hr: '12–16 očišćenih žaba',
        en: '12–16 cleaned frogs',
        de: '12–16 gereinigte Frösche',
        it: '12–16 rane pulite'
      },
      'a01d706dd9': {
        hr: '300–400 g cipla ili druge bijele ribe (po želji)',
        en: '300–400 g of grey mullet or other white fish (optional)',
        de: '300–400 g Meeräsche oder anderer Weißfisch (nach Wunsch)',
        it: '300–400 g di cefalo o altro pesce bianco (facoltativo)'
      },
      '1a7f16fe66': {
        hr: '2 velike kapule (luka)',
        en: '2 large onions',
        de: '2 große Zwiebeln',
        it: '2 cipolle grandi'
      },
      '9c707836c7': {
        hr: '3–4 češnja češnjaka',
        en: '3–4 cloves of garlic',
        de: '3–4 Knoblauchzehen',
        it: '3–4 spicchi d\'aglio'
      },
      '344d0533f2': {
        hr: '2–3 ljute neretvanske paprike (ili po ukusu)',
        en: '2–3 hot Neretva peppers (or to taste)',
        de: '2–3 scharfe Neretva-Paprika (oder nach Geschmack)',
        it: '2–3 peperoncini piccanti della Neretva (o q.b.)'
      },
      'b2d991af16': {
        hr: '2–3 lovorova lista',
        en: '2–3 bay leaves',
        de: '2–3 Lorbeerblätter',
        it: '2–3 foglie di alloro'
      },
      'bcd7f885e3': {
        hr: '400–500 g zrelih rajčica ili 2 žlice koncentrata',
        en: '400–500 g of ripe tomatoes or 2 tbsp of concentrate',
        de: '400–500 g reife Tomaten oder 2 EL Konzentrat',
        it: '400–500 g di pomodori maturi o 2 cucchiai di concentrato'
      },
      'bd3b3cbfc5': {
        hr: '3–4 žlice maslinovog ulja',
        en: '3–4 tbsp of olive oil',
        de: '3–4 EL Olivenöl',
        it: '3–4 cucchiai di olio d\'oliva'
      },
      '2972131cb1': {
        hr: '1–2 žlice octa (domaća kvasina)',
        en: '1–2 tbsp of vinegar (home-made kvasina)',
        de: '1–2 EL Essig (hausgemachte Kvasina)',
        it: '1–2 cucchiai di aceto (kvasina fatta in casa)'
      },
      '6a360aaaf5': {
        hr: 'sol, malo šećera (ako treba ublažiti kiselost)',
        en: 'salt, a little sugar (if the acidity needs softening)',
        de: 'Salz, etwas Zucker (wenn die Säure abgemildert werden muss)',
        it: 'sale, un po\' di zucchero (se serve attenuare l\'acidità)'
      },
      '3083635482': {
        hr: 'peršin za posipanje',
        en: 'parsley for sprinkling',
        de: 'Petersilie zum Bestreuen',
        it: 'prezzemolo per spolverare'
      },
      '21eee01077': {
        hr: 'Priprema',
        en: 'Preparation',
        de: 'Zubereitung',
        it: 'Preparazione'
      },
      '4f3d9b4299': {
        hr: 'U širokoj i plitkoj posudi (tradicionalno <em>kutlača</em> ili teća s debljim dnom) zagrijte maslinovo ulje.',
        en: 'In a wide, shallow pot (traditionally a <em>kutlača</em> or a teća with a thicker base) heat the olive oil.',
        de: 'In einem breiten, flachen Topf (traditionell eine <em>kutlača</em> oder eine Teća mit dickem Boden) das Olivenöl erhitzen.',
        it: 'In una pentola larga e bassa (tradizionalmente una <em>kutlača</em> o una teća dal fondo spesso) scaldate l\'olio d\'oliva.'
      },
      '3d4e975167': {
        hr: 'Dodajte nasjeckani luk i pirjajte dok ne postane staklast.',
        en: 'Add the chopped onion and stew until it turns glassy.',
        de: 'Die gehackte Zwiebel zugeben und anschwitzen, bis sie glasig wird.',
        it: 'Aggiungete la cipolla tritata e stufate finché non diventa trasparente.'
      },
      '4f3b9bf43a': {
        hr: 'Ubacite češnjak, lovor i ljute paprike. Nakon minute dodajte nasjeckanu rajčicu ili koncentrat.',
        en: 'Add the garlic, bay and hot peppers. After a minute add the chopped tomato or the concentrate.',
        de: 'Knoblauch, Lorbeer und scharfe Paprika zugeben. Nach einer Minute die gehackten Tomaten oder das Konzentrat hinzufügen.',
        it: 'Aggiungete aglio, alloro e peperoncini. Dopo un minuto unite i pomodori tritati o il concentrato.'
      },
      'fb4dbc5d69': {
        hr: 'Kad se rajčica ukuha, položite jegulju, zalijte vodom da je tek prekrije i posolite.',
        en: 'When the tomato has reduced, lay in the eel, pour over water just to cover it and add salt.',
        de: 'Wenn die Tomaten eingekocht sind, den Aal einlegen, mit Wasser knapp bedecken und salzen.',
        it: 'Quando il pomodoro si è ristretto, adagiate l\'anguilla, copritela appena con acqua e salate.'
      },
      '230d5e027a': {
        hr: 'Kuhajte na laganoj vatri bez miješanja — posudu samo povremeno protrešite.',
        en: 'Cook over a low heat without stirring — only shake the pot occasionally.',
        de: 'Bei schwacher Hitze ohne Umrühren kochen — den Topf nur gelegentlich schütteln.',
        it: 'Cuocete a fuoco basso senza mescolare — scuotete la pentola solo ogni tanto.'
      },
      'ac653a3195': {
        hr: 'Nakon 20–25 minuta dodajte žabe, a 2–3 minute prije kraja i ribu.',
        en: 'After 20–25 minutes add the frogs, and 2–3 minutes before the end the fish.',
        de: 'Nach 20–25 Minuten die Frösche zugeben, 2–3 Minuten vor Ende den Fisch.',
        it: 'Dopo 20–25 minuti aggiungete le rane e 2–3 minuti prima della fine il pesce.'
      },
      'b536fea1f1': {
        hr: 'Na kraju ulijte ocat. Kuha se ukupno oko 35–40 minuta.',
        en: 'Finally pour in the vinegar. Total cooking time is about 35–40 minutes.',
        de: 'Zum Schluss den Essig eingießen. Die Gesamtgarzeit beträgt etwa 35–40 Minuten.',
        it: 'Infine versate l\'aceto. La cottura totale dura circa 35–40 minuti.'
      },
      '6989d6daa0': {
        hr: 'Brudet mora biti <strong>gust, aromatičan i lagano ljut</strong>. Idealno se jede s kuhanom palentom koja upija sav taj umak.',
        en: 'Brudet must be <strong>thick, aromatic and lightly hot</strong>. It is ideally eaten with cooked polenta that soaks up all that sauce.',
        de: 'Brudet muss <strong>dick, aromatisch und leicht scharf</strong> sein. Am besten isst man ihn mit gekochter Polenta, die all die Sauce aufsaugt.',
        it: 'Il brudet deve essere <strong>denso, aromatico e leggermente piccante</strong>. Si mangia idealmente con la polenta cotta che assorbe tutta quella salsa.'
      },
      '98cd95323c': {
        hr: '<span class="video-src">YouTube</span> Pogledajte kako brudet nastaje — snimka s kanala Zvonimir Taslak. <a href="https://www.youtube.com/watch?v=RHNb4iPOMU0" target="_blank" rel="noopener">Otvori na YouTubeu →</a>',
        en: '<span class="video-src">YouTube</span> Watch how brudet is made — a clip from the Zvonimir Taslak channel. <a href="https://www.youtube.com/watch?v=RHNb4iPOMU0" target="_blank" rel="noopener">Open on YouTube →</a>',
        de: '<span class="video-src">YouTube</span> Sehen Sie, wie Brudet entsteht — ein Clip vom Kanal Zvonimir Taslak. <a href="https://www.youtube.com/watch?v=RHNb4iPOMU0" target="_blank" rel="noopener">Auf YouTube öffnen →</a>',
        it: '<span class="video-src">YouTube</span> Guardate come nasce il brudet — un filmato dal canale Zvonimir Taslak. <a href="https://www.youtube.com/watch?v=RHNb4iPOMU0" target="_blank" rel="noopener">Apri su YouTube →</a>'
      },
      'faff4173cd': {
        hr: 'Ista rijeka, drugi tanjur: riba s gradela u Konobi Vrilo.',
        en: 'The same river, a different plate: fish from the grill at Konoba Vrilo.',
        de: 'Derselbe Fluss, ein anderes Gericht: Fisch vom Grill in der Konoba Vrilo.',
        it: 'Lo stesso fiume, un altro piatto: pesce alla griglia alla Konoba Vrilo.'
      },
      'c616b5a263': {
        hr: 'Malo savjeta iz Neretve',
        en: 'A few tips from the Neretva',
        de: 'Ein paar Tipps aus der Neretva',
        it: 'Qualche consiglio dalla Neretva'
      },
      '4ca70e0b30': {
        hr: 'Jegulja mora biti <strong>svježa i dobro očišćena</strong>.',
        en: 'The eel must be <strong>fresh and well cleaned</strong>.',
        de: 'Der Aal muss <strong>frisch und gut gereinigt</strong> sein.',
        it: 'L\'anguilla deve essere <strong>fresca e ben pulita</strong>.'
      },
      '9dcf744604': {
        hr: '<strong>Ne miješajte!</strong> To je zlatno pravilo — inače se raspadne.',
        en: '<strong>Do not stir!</strong> That is the golden rule — otherwise it falls apart.',
        de: '<strong>Nicht umrühren!</strong> Das ist die goldene Regel — sonst zerfällt es.',
        it: '<strong>Non mescolate!</strong> È la regola d\'oro — altrimenti si disfa.'
      },
      '689f817715': {
        hr: 'Ljuta paprika daje karakter. Bez nje nije baš „neretvanski“.',
        en: 'Hot pepper gives character. Without it, it is not quite “Neretva”.',
        de: 'Scharfe Paprika gibt Charakter. Ohne sie ist es nicht wirklich „Neretva“.',
        it: 'Il peperoncino dà carattere. Senza non è proprio “della Neretva”.'
      },
      'd78dded1be': {
        hr: 'Ako nemate žabe, radi se i samo od jegulje i cipla — i dalje je autentično.',
        en: 'If you have no frogs, it can be made with eel and grey mullet alone — it is still authentic.',
        de: 'Wenn Sie keine Frösche haben, geht es auch nur mit Aal und Meeräsche — es bleibt authentisch.',
        it: 'Se non avete le rane, si fa anche solo con anguilla e cefalo — resta autentico.'
      },
      '7dd1c7920e': {
        hr: 'Najbolje je jesti odmah, dok je vruće, s domaćim kruhom ili palentom.',
        en: 'It is best eaten at once, while hot, with home-made bread or polenta.',
        de: 'Am besten isst man es sofort, solange es heiß ist, mit hausgemachtem Brot oder Polenta.',
        it: 'Meglio mangiarlo subito, ben caldo, con pane fatto in casa o polenta.'
      },
      'ee1df47f47': {
        hr: 'Zašto ga morate probati?',
        en: 'Why you have to try it',
        de: 'Warum Sie es probieren müssen',
        it: 'Perché dovete assaggiarlo'
      },
      'c234f4a3e6': {
        hr: 'Zato što u jednoj zdjelici dobijete cijelu priču o Neretvi: rijeku, ljude, tradiciju i ono što su generacije uspjele sačuvati. To nije samo jelo — to je sjećanje na težak život pretvoreno u užitak.',
        en: 'Because in one bowl you get the whole story of the Neretva: the river, the people, the tradition and what the generations managed to preserve. It is not just a dish — it is the memory of a hard life turned into pleasure.',
        de: 'Denn in einer Schüssel bekommen Sie die ganze Geschichte der Neretva: den Fluss, die Menschen, die Tradition und das, was die Generationen bewahrt haben. Das ist nicht nur ein Gericht — es ist die Erinnerung an ein hartes Leben, verwandelt in Genuss.',
        it: 'Perché in una scodella ricevete tutta la storia della Neretva: il fiume, la gente, la tradizione e ciò che le generazioni sono riuscite a conservare. Non è solo un piatto — è il ricordo di una vita dura trasformato in piacere.'
      },
      '7e2f035fa4': {
        hr: 'Sljedeći put kad budete u dolini Neretve, potražite konobu koja kuha pravi brudet. Ili još bolje — prođite na Brudetijadu. Doživjet ćete nešto što se ne može opisati riječima… samo okusom.',
        en: 'Next time you are in the Neretva valley, look for a konoba that cooks a real brudet. Or even better — go to the Brudetijada. You will experience something that cannot be described in words… only by taste.',
        de: 'Wenn Sie das nächste Mal im Neretva-Tal sind, suchen Sie eine Konoba, die einen echten Brudet kocht. Oder noch besser — gehen Sie zur Brudetijada. Sie erleben etwas, das sich nicht in Worten beschreiben lässt … nur im Geschmack.',
        it: 'La prossima volta che sarete nella valle della Neretva, cercate una konoba che cucini un brudet vero. O ancora meglio — andate alla Brudetijada. Vivrete qualcosa che non si può descrivere a parole… solo con il gusto.'
      },
      '44ca55866a': {
        hr: 'Zanimljivo: ovaj je kraj 2013. opisao i <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">BBC Travel</a> — reportažu o neretvanskim žabama pisao je upravo iz Konobe Vrilo. <a href="konoba-vrilo-u-medijima.html">Pročitajte što su napisali →</a>',
        en: 'Interesting: in 2013 this region was also described by <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">BBC Travel</a> — the feature on Neretva frogs was written from Konoba Vrilo itself. <a href="konoba-vrilo-u-medijima.html">Read what they wrote →</a>',
        de: 'Interessant: 2013 wurde diese Gegend auch von <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">BBC Travel</a> beschrieben — die Reportage über die Frösche der Neretva entstand direkt in der Konoba Vrilo. <a href="konoba-vrilo-u-medijima.html">Lesen Sie, was sie schrieben →</a>',
        it: 'Curioso: nel 2013 questa zona è stata descritta anche da <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">BBC Travel</a> — il servizio sulle rane della Neretva è stato scritto proprio dalla Konoba Vrilo. <a href="konoba-vrilo-u-medijima.html">Leggete cosa hanno scritto →</a>'
      },
      '1422bd50ff': {
        hr: 'Dobar tek! 🥣🌿',
        en: 'Enjoy your meal! 🥣🌿',
        de: 'Guten Appetit! 🥣🌿',
        it: 'Buon appetito! 🥣🌿'
      },
      '22da2f7e42': {
        hr: 'Brudet od žaba i jegulje u Vrilu',
        en: 'Brudet of frogs and eel at Vrilo',
        de: 'Brudet von Fröschen und Aal im Vrilo',
        it: 'Brudet di rane e anguilla al Vrilo'
      },
      'a6a25650e3': {
        hr: 'Kuhamo ga po pravilima doline — u teći, bez miješanja, s palentom.',
        en: 'We cook it by the rules of the valley — in a teća, without stirring, with polenta.',
        de: 'Wir kochen es nach den Regeln des Tals — in der Teća, ohne Umrühren, mit Polenta.',
        it: 'Lo cuciniamo secondo le regole della valle — nella teća, senza mescolare, con la polenta.'
      },
      '518543b072': {
        hr: '← Sve priče iz doline',
        en: '← All stories from the valley',
        de: '← Alle Geschichten aus dem Tal',
        it: '← Tutte le storie dalla valle'
      },
      '9181670e55': {
        hr: 'Ukratko',
        en: 'At a glance',
        de: 'Auf einen Blick',
        it: 'In breve'
      },
      '47dd511ba9': {
        hr: '<span>Jelo</span>Brudet (brujet, brodet)',
        en: '<span>Dish</span>Brudet (brujet, brodet)',
        de: '<span>Gericht</span>Brudet (brujet, brodet)',
        it: '<span>Piatto</span>Brudet (brujet, brodet)'
      },
      '751b471716': {
        hr: '<span>Kraj</span>Dolina Neretve, Dalmacija',
        en: '<span>Region</span>Neretva valley, Dalmatia',
        de: '<span>Region</span>Neretva-Tal, Dalmatien',
        it: '<span>Regione</span>Valle della Neretva, Dalmazia'
      },
      'fb97c17dd5': {
        hr: '<span>Glavno</span>Jegulja i žabe',
        en: '<span>Main</span>Eel and frogs',
        de: '<span>Hauptzutat</span>Aal und Frösche',
        it: '<span>Principale</span>Anguilla e rane'
      },
      'ee40e8077f': {
        hr: '<span>Prilog</span>Kuhana palenta',
        en: '<span>Side</span>Cooked polenta',
        de: '<span>Beilage</span>Gekochte Polenta',
        it: '<span>Contorno</span>Polenta cotta'
      },
      '5b1f3edcb7': {
        hr: '<span>Zaštita</span>Registar nematerijalnih kulturnih dobara, 2022.',
        en: '<span>Protection</span>Register of Intangible Cultural Heritage, 2022',
        de: '<span>Schutz</span>Register des immateriellen Kulturerbes, 2022',
        it: '<span>Tutela</span>Registro dei beni culturali immateriali, 2022'
      },
      'b6370157df': {
        hr: 'Sadržaj',
        en: 'Contents',
        de: 'Inhalt',
        it: 'Indice'
      },
      'b64234b6fa': {
        hr: 'Od sirotinjskog jela do zaštićenog dobra',
        en: 'From a poor man\'s dish to a protected asset',
        de: 'Vom Arme-Leute-Gericht zum geschützten Gut',
        it: 'Da piatto povero a bene protetto'
      },
      '3566c10b81': {
        hr: 'Klasični recept',
        en: 'Classic recipe',
        de: 'Klassisches Rezept',
        it: 'Ricetta classica'
      },
      '3a781b41c0': {
        hr: 'Savjeti iz Neretve',
        en: 'Tips from the Neretva',
        de: 'Tipps aus der Neretva',
        it: 'Consigli dalla Neretva'
      },
      'ced1fda270': {
        hr: 'Neretvanska brudetijada',
        en: 'The Neretva Brudetijada',
        de: 'Die Neretva-Brudetijada',
        it: 'La Brudetijada della Neretva'
      },
      '077c9004f4': {
        hr: 'Svake godine u Opuzenu ekipe kuhaju „pravi“ brudet od jegulja i žaba. Prava proslava lokalnog identiteta.',
        en: 'Every year in Opuzen teams cook the “real” brudet of eels and frogs. A true celebration of local identity.',
        de: 'Jedes Jahr kochen in Opuzen Teams den „echten“ Brudet aus Aalen und Fröschen. Ein wahres Fest der lokalen Identität.',
        it: 'Ogni anno a Opuzen le squadre cucinano il brudet “vero” di anguille e rane. Una vera festa dell\'identità locale.'
      },
      '93fc9aa00f': {
        hr: 'Pročitajte i',
        en: 'Read also',
        de: 'Lesen Sie auch',
        it: 'Leggi anche'
      },
      '46b9c21ebf': {
        hr: 'Konoba Vrilo u svjetskim medijima — BBC i Gault&amp;Millau →',
        en: 'Konoba Vrilo in the world\'s media — BBC and Gault&amp;Millau →',
        de: 'Konoba Vrilo in den Weltmedien — BBC und Gault&amp;Millau →',
        it: 'Konoba Vrilo sui media internazionali — BBC e Gault&amp;Millau →'
      },
      '6ecc9d78f9': {
        hr: 'Uz vrilo Norina',
        en: 'Beside the spring of the Norin',
        de: 'An der Quelle des Norin',
        it: 'Accanto alla sorgente del Norin'
      },
      '35fb490898': {
        hr: 'Probajte ga tamo gdje nastaje',
        en: 'Try it where it is made',
        de: 'Probieren Sie es dort, wo es entsteht',
        it: 'Assaggiatelo dove nasce'
      },
      'c0918c9523': {
        hr: 'Prud 193, 20350 Metković — deset minuta od Metkovića, prema granici s Bosnom i Hercegovinom. Otvoreno svaki dan od 10 do 23 sata.',
        en: 'Prud 193, 20350 Metković — ten minutes from Metković, towards the border with Bosnia and Herzegovina.',
        de: 'Prud 193, 20350 Metković — zehn Minuten von Metković, Richtung Grenze zu Bosnien und Herzegowina.',
        it: 'Prud 193, 20350 Metković — dieci minuti da Metković, verso il confine con la Bosnia ed Erzegovina.'
      },
      '4b788a7145': {
        hr: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=Prudi+ulica+193,+Metkovi%C4%87" target="_blank" rel="noopener">Otvori kartu</a>',
        en: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=Prudi+ulica+193,+Metkovi%C4%87" target="_blank" rel="noopener">Open the map</a>',
        de: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=Prudi+ulica+193,+Metkovi%C4%87" target="_blank" rel="noopener">Karte öffnen</a>',
        it: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=Prudi+ulica+193,+Metkovi%C4%87" target="_blank" rel="noopener">Apri la mappa</a>'
      },
      '8477ff658b': {
        hr: 'Brudet od žaba i jegulje u širokoj teći',
        en: 'Brudet of frogs and eel in a wide teća',
        de: 'Brudet von Fröschen und Aal in einer breiten Teća',
        it: 'Brudet di rane e anguilla in una teća larga'
      },
      '71fa70b0d4': {
        hr: 'Riba s gradela i povrće u Konobi Vrilo',
        en: 'Grilled fish and vegetables at Konoba Vrilo',
        de: 'Fisch vom Grill und Gemüse in der Konoba Vrilo',
        it: 'Pesce alla griglia e verdure alla Konoba Vrilo'
      },
      'a4ff44dc85': {
        hr: 'Priča o neretvanskom brudetu: od sirotinjskog jela od jegulja i žaba do zaštićenog kulturnog dobra. Zlatna pravila pripreme i klasični recept za 4–6 osoba.',
        en: 'The story of Neretva brudet: from a poor man\'s dish of eel and frogs to a protected cultural asset. The golden rules and the classic recipe for 4–6 people.',
        de: 'Die Geschichte des Neretva-Brudet: vom Arme-Leute-Gericht aus Aal und Fröschen zum geschützten Kulturgut. Die goldenen Regeln und das klassische Rezept für 4–6 Personen.',
        it: 'La storia del brudet della Neretva: da piatto povero di anguilla e rane a bene culturale protetto. Le regole d\'oro e la ricetta classica per 4–6 persone.'
      },
      '3e7e115c9a': {
        hr: 'Nekad sirotinjsko jelo od jegulja i žaba, danas gastronomski simbol doline Neretve. Priča, zlatna pravila i klasični recept za 4–6 osoba.',
        en: 'Once a poor man\'s dish of eel and frogs, today the gastronomic symbol of the Neretva valley. The story, the golden rules and the classic recipe for 4–6 people.',
        de: 'Einst ein Arme-Leute-Gericht aus Aal und Fröschen, heute das gastronomische Symbol des Neretva-Tals. Die Geschichte, die goldenen Regeln und das klassische Rezept für 4–6 Personen.',
        it: 'Un tempo piatto povero di anguilla e rane, oggi simbolo gastronomico della valle della Neretva. La storia, le regole d\'oro e la ricetta classica per 4–6 persone.'
      },
      '772b15c546': {
        hr: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>U medijima</span>',
        en: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Neretva brudet</span>',
        de: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Neretva-Brudet</span>',
        it: '<a href="../index.html">Konoba Vrilo</a> <span aria-hidden="true">/</span> <a href="index.html">Blog</a> <span aria-hidden="true">/</span> <span>Brudet della Neretva</span>'
      },
      'bf2e2d1b65': {
        hr: 'O konobi · iz pressa',
        en: 'About the konoba · from the press',
        de: 'Über die Konoba · aus der Presse',
        it: 'La konoba · dalla stampa'
      },
      'c4553d0fd2': {
        hr: 'BBC Travel je 2013. godine posvetio cijeli članak neretvanskoj tradiciji jedenja žaba — i pisao ga upravo iz naše kuhinje u Prudu. Trinaest godina poslije, Gault&amp;Millau konobi daje <strong>13/20</strong>. Dvije reference i jedna adresa koju treba provjeriti.',
        en: 'In 2013 BBC Travel devoted a whole article to the Neretva tradition of eating frogs — and wrote it from our kitchen in Prud. Thirteen years later, Gault&amp;Millau gives the konoba <strong>13/20</strong>. Two references and one address that needs checking.',
        de: '2013 widmete BBC Travel der Neretva-Tradition des Froschessens einen ganzen Artikel — geschrieben aus unserer Küche in Prud. Dreizehn Jahre später gibt Gault&amp;Millau der Konoba <strong>13/20</strong>. Zwei Referenzen und eine Adresse, die zu prüfen ist.',
        it: 'Nel 2013 BBC Travel ha dedicato un intero articolo alla tradizione della Neretva di mangiare le rane — scritto dalla nostra cucina a Prud. Tredici anni dopo, Gault&amp;Millau assegna alla konoba <strong>13/20</strong>. Due referenze e un indirizzo da verificare.'
      },
      '768ce7d692': {
        hr: 'Izvori',
        en: 'Sources',
        de: 'Quellen',
        it: 'Fonti'
      },
      '232c5f7d2b': {
        hr: 'BBC · Gault&amp;Millau',
        en: 'BBC · Gault&amp;Millau',
        de: 'BBC · Gault&amp;Millau',
        it: 'BBC · Gault&amp;Millau'
      },
      '160b284f6a': {
        hr: '<span>BBC objavljen</span><strong>21. 7. 2013.</strong>',
        en: '<span>BBC published</span><strong>21 July 2013</strong>',
        de: '<span>BBC veröffentlicht</span><strong>21. Juli 2013</strong>',
        it: '<span>BBC pubblicato</span><strong>21 luglio 2013</strong>'
      },
      '284757c9f5': {
        hr: '<span>Ocjena</span><strong>13/20</strong>',
        en: '<span>Rating</span><strong>13/20</strong>',
        de: '<span>Bewertung</span><strong>13/20</strong>',
        it: '<span>Valutazione</span><strong>13/20</strong>'
      },
      'a715321f88': {
        hr: '6 min',
        en: '6 min',
        de: '6 Min.',
        it: '6 min'
      },
      '5851c2585f': {
        hr: 'Malo je konoba u Hrvatskoj koje mogu reći da je o njima pisao BBC. Konoba Vrilo je jedna od njih — i to ne usputno: britanski novinar je sjeo za naš stol, gledao kako se čiste žabe ulovljene prethodne noći, i napisao priču koja se i danas čita.',
        en: 'Few konobas in Croatia can say that the BBC wrote about them. Konoba Vrilo is one of them — and not in passing: the British journalist sat at our table, watched frogs caught the night before being cleaned, and wrote a story that is still read today.',
        de: 'Wenige Konobas in Kroatien können sagen, dass die BBC über sie geschrieben hat. Die Konoba Vrilo ist eine davon — und nicht nebenbei: Der britische Journalist saß an unserem Tisch, sah zu, wie die in der Nacht zuvor gefangenen Frösche gereinigt wurden, und schrieb eine Geschichte, die heute noch gelesen wird.',
        it: 'Poche konoba in Croazia possono dire che la BBC ha scritto di loro. La Konoba Vrilo è una di queste — e non di passaggio: il giornalista britannico si è seduto al nostro tavolo, ha guardato pulire le rane catturate la notte prima e ha scritto una storia che si legge ancora oggi.'
      },
      'e3f5141a4e': {
        hr: 'BBC Travel: „Leaping into Croatia’s frog leg tradition“',
        en: 'BBC Travel: “Leaping into Croatia’s frog leg tradition”',
        de: 'BBC Travel: „Leaping into Croatia’s frog leg tradition“',
        it: 'BBC Travel: “Leaping into Croatia’s frog leg tradition”'
      },
      '6e56374097': {
        hr: 'Britanski javni servis objavio je 21. srpnja 2013. reportažu o hrvatskoj tradiciji jedenja žabljih krakova. Autor je putovao deltom Neretve i <strong>sredinu priče smjestio u Konobu Vrilo</strong> u Prudu.',
        en: 'On 21 July 2013 the British public broadcaster published a feature on the Croatian tradition of eating frog legs. The author travelled the Neretva delta and <strong>placed the centre of the story in Konoba Vrilo</strong> in Prud.',
        de: 'Am 21. Juli 2013 veröffentlichte der britische öffentlich-rechtliche Sender eine Reportage über die kroatische Tradition des Froschschenkel-Essens. Der Autor bereiste das Neretva-Delta und <strong>setzte das Zentrum der Geschichte in die Konoba Vrilo</strong> in Prud.',
        it: 'Il 21 luglio 2013 il servizio pubblico britannico ha pubblicato un reportage sulla tradizione croata di mangiare le zampe di rana. L\'autore ha percorso il delta della Neretva e <strong>ha posto il centro della storia nella Konoba Vrilo</strong> a Prud.'
      },
      'aa754d4076': {
        hr: 'Članak počinje u našoj kuhinji: šezdesetak svježe očišćenih žaba u velikoj zdjeli, ulovljenih noć prije. Jelo dana bio je <strong>brudet od žaba i jegulja</strong> — gusta, komadima bogata juha začinjena lovorom i ljutim papričicama. Uz njega je išla slatka palenta i karafa <strong>žilavke</strong>, citrusnog bijelog vina iz vinograda s druge strane granice, nekoliko stotina metara dalje.',
        en: 'The article begins in our kitchen: some sixty freshly cleaned frogs in a large bowl, caught the night before. The dish of the day was <strong>brudet of frogs and eel</strong> — a thick stew rich with pieces, seasoned with bay and hot peppers. With it came sweet polenta and a carafe of <strong>žilavka</strong>, a citrusy white wine from vineyards on the other side of the border, a few hundred metres away.',
        de: 'Der Artikel beginnt in unserer Küche: rund sechzig frisch gereinigte Frösche in einer großen Schüssel, in der Nacht zuvor gefangen. Das Tagesgericht war <strong>Brudet von Fröschen und Aal</strong> — ein dicker, stückreicher Eintopf, gewürzt mit Lorbeer und scharfen Paprika. Dazu gab es süße Polenta und eine Karaffe <strong>Žilavka</strong>, ein zitrusartiger Weißwein aus Weinbergen auf der anderen Seite der Grenze, wenige hundert Meter entfernt.',
        it: 'L\'articolo inizia nella nostra cucina: una sessantina di rane appena pulite in una grande ciotola, catturate la notte prima. Il piatto del giorno era il <strong>brudet di rane e anguilla</strong> — uno stufato denso e ricco di pezzi, insaporito con alloro e peperoncini. Con esso arrivavano la polenta dolce e una caraffa di <strong>žilavka</strong>, un vino bianco agrumato dei vigneti dall\'altra parte del confine, a poche centinaia di metri.'
      },
      'd0525c796f': {
        hr: 'Što je BBC posebno istaknuo',
        en: 'What the BBC highlighted',
        de: 'Was die BBC besonders hervorhob',
        it: 'Ciò che la BBC ha evidenziato'
      },
      '0f2b74052f': {
        hr: 'Konoba Vrilo je <strong>obiteljska konoba</strong> u Prudu, na rubu delte.',
        en: 'Konoba Vrilo is a <strong>family konoba</strong> in Prud, on the edge of the delta.',
        de: 'Die Konoba Vrilo ist eine <strong>Familienkonoba</strong> in Prud, am Rand des Deltas.',
        it: 'La Konoba Vrilo è una <strong>konoba di famiglia</strong> a Prud, ai margini del delta.'
      },
      'b136ce8f5c': {
        hr: 'Žabe se love <strong>noću, uz lampu</strong> — žaba pomisli da je sunce, izađe i bude ulovljena rukom.',
        en: 'Frogs are caught <strong>at night, by lamp</strong> — the frog thinks it is the sun, comes up and is taken by hand.',
        de: 'Frösche werden <strong>nachts mit der Lampe</strong> gefangen — der Frosch hält sie für die Sonne, kommt hoch und wird mit der Hand genommen.',
        it: 'Le rane si catturano <strong>di notte, con la lampada</strong> — la rana crede che sia il sole, sale e viene presa con la mano.'
      },
      '20bc07c332': {
        hr: 'Sve žabe na jelovnicima delte <strong>ulovljene su jedna po jedna</strong>, jer je pokušaj uzgoja propao.',
        en: 'All frogs on delta menus are <strong>caught one by one</strong>, because an attempt at farming failed.',
        de: 'Alle Frösche auf den Speisekarten des Deltas werden <strong>einzeln gefangen</strong>, weil ein Zuchtversuch gescheitert ist.',
        it: 'Tutte le rane nei menù del delta sono <strong>catturate una per una</strong>, perché un tentativo di allevamento è fallito.'
      },
      'e3b1c2e5d5': {
        hr: 'Žablji krak je <strong>mrsav i lagan</strong> — malo masti, malo kolesterola.',
        en: 'The frog leg is <strong>lean and light</strong> — low in fat, low in cholesterol.',
        de: 'Das Froschschenkel ist <strong>mager und leicht</strong> — wenig Fett, wenig Cholesterin.',
        it: 'La zampa di rana è <strong>magra e leggera</strong> — pochi grassi, poco colesterolo.'
      },
      'a5197ec9e9': {
        hr: 'Autor se zapitao i otkud tradicija. Putopisac Alberto Fortis 1774. zabilježio je da bi lokalci „radije umrli od gladi nego jeli žabu“, a etnograf Ivan Lovrić to je dvije godine poslije ispravio. BBC je tu raspravu iskoristio kao okvir priče — a onda je prešao na Gorski kotar i <em>Žabarsku noć</em>, gdje se žabe natječu u skakanju.',
        en: 'The author also asked where the tradition comes from. The travel writer Alberto Fortis noted in 1774 that locals “would rather die of hunger than eat a frog”, and two years later the ethnographer Ivan Lovrić corrected him. The BBC used that debate as the frame of the story — and then moved on to Gorski kotar and <em>Frog Night</em>, where frogs compete at jumping.',
        de: 'Der Autor fragte auch nach dem Ursprung der Tradition. Der Reiseschriftsteller Alberto Fortis notierte 1774, die Einheimischen „würden lieber vor Hunger sterben, als einen Frosch zu essen“, und zwei Jahre später korrigierte ihn der Ethnograf Ivan Lovrić. Die BBC nutzte diese Debatte als Rahmen der Geschichte — und wechselte dann nach Gorski kotar zum <em>Froschabend</em>, wo Frösche um die Wette springen.',
        it: 'L\'autore si è chiesto anche da dove venga la tradizione. Il viaggiatore Alberto Fortis nel 1774 annotò che gli abitanti “preferirebbero morire di fame piuttosto che mangiare una rana”, e due anni dopo l\'etnografo Ivan Lovrić lo corresse. La BBC ha usato quel dibattito come cornice della storia — per poi passare al Gorski kotar e alla <em>Notte delle rane</em>, dove le rane gareggiano nel salto.'
      },
      '6606565a72': {
        hr: 'Uz brudet i palentu, u članku se pojavljuje i <strong>Stipe Taslak</strong>, sin naše chefrice, koji je objasnio i zašto uzgoj žaba u delti nije uspio. Uz njega je citiran i Zoran Turajlić iz agencije <em>Vacation in Dubrovnik</em>, koji svoje goste redovno dovodi na istu rutu.',
        en: 'Alongside the brudet and polenta, the article also features <strong>Stipe Taslak</strong>, the son of our chef, who explained why frog farming in the delta failed. Zoran Turajlić of the agency <em>Vacation in Dubrovnik</em> is quoted too, regularly bringing his guests on the same route.',
        de: 'Neben Brudet und Polenta erscheint im Artikel auch <strong>Stipe Taslak</strong>, der Sohn unserer Chefköchin, der erklärte, warum die Froschzucht im Delta gescheitert ist. Zitiert wird auch Zoran Turajlić von der Agentur <em>Vacation in Dubrovnik</em>, der seine Gäste regelmäßig auf dieselbe Route bringt.',
        it: 'Accanto al brudet e alla polenta, nell\'articolo compare anche <strong>Stipe Taslak</strong>, il figlio della nostra chef, che ha spiegato perché l\'allevamento delle rane nel delta è fallito. È citato anche Zoran Turajlić dell\'agenzia <em>Vacation in Dubrovnik</em>, che porta regolarmente i suoi ospiti sullo stesso percorso.'
      },
      '29e59903b1': {
        hr: 'Brudet od žaba i jegulje — jelo koje je BBC opisao 2013. godine.',
        en: 'Brudet of frogs and eel — the dish the BBC described in 2013.',
        de: 'Brudet von Fröschen und Aal — das Gericht, das die BBC 2013 beschrieb.',
        it: 'Brudet di rane e anguilla — il piatto che la BBC ha descritto nel 2013.'
      },
      '639ef48775': {
        hr: 'Cijeli članak: <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">Leaping into Croatia’s frog leg tradition</a> — BBC Travel, 21. srpnja 2013. (na engleskom)',
        en: 'Full article: <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">Leaping into Croatia’s frog leg tradition</a> — BBC Travel, 21 July 2013 (in English)',
        de: 'Ganzer Artikel: <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">Leaping into Croatia’s frog leg tradition</a> — BBC Travel, 21. Juli 2013 (auf Englisch)',
        it: 'Articolo completo: <a href="https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition" target="_blank" rel="noopener">Leaping into Croatia’s frog leg tradition</a> — BBC Travel, 21 luglio 2013 (in inglese)'
      },
      'd7d456175e': {
        hr: 'Gault&amp;Millau: 13/20 i „autentična kuhinja“',
        en: 'Gault&amp;Millau: 13/20 and “authentic cuisine”',
        de: 'Gault&amp;Millau: 13/20 und „authentische Küche“',
        it: 'Gault&amp;Millau: 13/20 e “cucina autentica”'
      },
      '47a369d15d': {
        hr: 'Hrvatsko izdanje vodiča Gault&amp;Millau ocjenjuje Konobu Vrilo s <strong>13 od 20</strong> i svrstava je u kategoriju <em>autentične kuhinje</em>. U praktičnim podacima stoje: chefica <strong>Stojka Taslak</strong>, kuhinja <em>lokalna i tradicionalna</em>, a od sadržaja se izdvajaju dozvoljeni kućni ljubimci, pristup za invalide i privatno parkiralište.',
        en: 'The Croatian edition of the Gault&amp;Millau guide rates Konoba Vrilo <strong>13 out of 20</strong> and places it in the <em>authentic cuisine</em> category. The practical data list chef <strong>Stojka Taslak</strong>, <em>local and traditional</em> cuisine, and among the amenities pets allowed, wheelchair access and private parking.',
        de: 'Die kroatische Ausgabe des Gault&amp;Millau-Führers bewertet die Konoba Vrilo mit <strong>13 von 20</strong> und ordnet sie der Kategorie <em>authentische Küche</em> zu. In den praktischen Angaben stehen Chefköchin <strong>Stojka Taslak</strong>, <em>lokale und traditionelle</em> Küche, und als Ausstattung Haustiere erlaubt, Rollstuhlzugang und Privatparkplatz.',
        it: 'L\'edizione croata della guida Gault&amp;Millau valuta la Konoba Vrilo <strong>13 su 20</strong> e la colloca nella categoria <em>cucina autentica</em>. Nei dati pratici figurano la chef <strong>Stojka Taslak</strong>, cucina <em>locale e tradizionale</em>, e tra i servizi animali ammessi, accesso per disabili e parcheggio privato.'
      },
      '1feaba2e6e': {
        hr: 'Recenzija opisuje konobu kao autentičnu neretvansku konobu uz sam izvor rijeke Norin, uređenu u tradicionalnom dalmatinskom stilu s vršama, lađama i žabom kao simbolom kraja. Preporuka je jasna: <strong>žabe dinstane na luku</strong>, uz domaći kruh ispod peke koji upija slatkasti sos.',
        en: 'The review describes the konoba as an authentic Neretva konoba beside the very spring of the river Norin, furnished in the traditional Dalmatian style with fishing traps, boats and the frog as the symbol of the region. The recommendation is clear: <strong>frogs stewed on onion</strong>, with home-made bread under the peka to soak up the sweet sauce.',
        de: 'Die Rezension beschreibt die Konoba als authentische Neretva-Konoba direkt an der Quelle des Flusses Norin, eingerichtet im traditionellen dalmatinischen Stil mit Fischerreusen, Booten und dem Frosch als Symbol der Region. Die Empfehlung ist klar: <strong>Frösche auf Zwiebel geschmort</strong>, dazu hausgemachtes Brot aus der Peka, das die süße Sauce aufsaugt.',
        it: 'La recensione descrive la konoba come un\'autentica konoba della Neretva proprio accanto alla sorgente del fiume Norin, arredata in stile dalmata tradizionale con nasse da pesca, barche e la rana come simbolo della zona. Il consiglio è chiaro: <strong>rane stufate con la cipolla</strong>, con pane fatto in casa sotto la peka per assorbire la salsa dolce.'
      },
      '0bf0b449cd': {
        hr: 'Što vodič posebno izdvaja s jelovnika',
        en: 'What the guide singles out from the menu',
        de: 'Was der Führer aus der Speisekarte hervorhebt',
        it: 'Cosa il guida evidenzia dal menù'
      },
      '006c367c65': {
        hr: 'Žabe dinstane na luku, s kruhom ispod peke',
        en: 'Frogs stewed on onion, with bread under the peka',
        de: 'Frösche auf Zwiebel geschmort, mit Brot aus der Peka',
        it: 'Rane stufate con la cipolla, con pane sotto la peka'
      },
      '440e3eea86': {
        hr: 'Pohane žabe i rižot od žaba',
        en: 'Fried frogs and frog risotto',
        de: 'Panierte Frösche und Frosch-Risotto',
        it: 'Rane fritte e risotto di rane'
      },
      'e4a261200f': {
        hr: 'Tradicionalni pikantni brudet, s jeguljama',
        en: 'Traditional spicy brudet, with eel',
        de: 'Traditioneller scharfer Brudet, mit Aal',
        it: 'Brudet tradizionale piccante, con anguilla'
      },
      '05faf61326': {
        hr: 'Jegulja s ražnja, uz blitvu i krumpir',
        en: 'Eel on the spit, with chard and potatoes',
        de: 'Aal am Spieß, mit Mangold und Kartoffeln',
        it: 'Anguilla allo spiedo, con bietola e patate'
      },
      '53a1b2541c': {
        hr: 'Gambori na buzaru ili sa žara',
        en: 'Prawns buzara or from the grill',
        de: 'Garnelen Buzara oder vom Grill',
        it: 'Gamberi alla buzara o alla griglia'
      },
      '59b65d8bb3': {
        hr: 'Biftek i janjetina ispod peke',
        en: 'Steak and lamb under the peka',
        de: 'Steak und Lamm unter der Peka',
        it: 'Bistecca e agnello sotto la peka'
      },
      '0e2c51f2ef': {
        hr: 'Palačinke i kolač dana za desert',
        en: 'Pancakes and cake of the day for dessert',
        de: 'Pfannkuchen und Tageskuchen als Dessert',
        it: 'Pancake e dolce del giorno come dessert'
      },
      '32280a9146': {
        hr: 'Vina lokalnih sorti iz obližnjih vinarija',
        en: 'Wines of local varieties from nearby wineries',
        de: 'Weine lokaler Sorten aus benachbarten Weingütern',
        it: 'Vini di vitigni locali delle cantine vicine'
      },
      'ddf705d5f2': {
        hr: 'Cijela recenzija: <a href="https://hr.gaultmillau.com/hr/restaurants/konoba-vrilo" target="_blank" rel="noopener">Konoba Vrilo</a> — Gault&amp;Millau Hrvatska',
        en: 'Full review: <a href="https://hr.gaultmillau.com/hr/restaurants/konoba-vrilo" target="_blank" rel="noopener">Konoba Vrilo</a> — Gault&amp;Millau Croatia',
        de: 'Ganze Rezension: <a href="https://hr.gaultmillau.com/hr/restaurants/konoba-vrilo" target="_blank" rel="noopener">Konoba Vrilo</a> — Gault&amp;Millau Kroatien',
        it: 'Recensione completa: <a href="https://hr.gaultmillau.com/hr/restaurants/konoba-vrilo" target="_blank" rel="noopener">Konoba Vrilo</a> — Gault&amp;Millau Croazia'
      },
      'f9c5d5dc7e': {
        hr: 'Jedna stvar koju treba provjeriti: adresa',
        en: 'One thing to check: the address',
        de: 'Eine Sache, die zu prüfen ist: die Adresse',
        it: 'Una cosa da verificare: l\'indirizzo'
      },
      '8b3602d8ae': {
        hr: 'Ovdje ćemo biti posve otvoreni, jer je to pitanje koje gostima stvara zabunu. Naši podaci i Google prikazuju adresu <strong>Prud 193</strong>, dok Gault&amp;Millau navodi <strong>Prud 192</strong>. Radi se o istoj konobi — ali kućni broj nije usklađen.',
        en: 'Here we will be completely open, because this is a question that confuses guests. Our data and Google show the address <strong>Prud 193</strong>, while Gault&amp;Millau lists <strong>Prud 192</strong>. It is the same konoba — but the house number is not aligned.',
        de: 'Hier sind wir ganz offen, denn diese Frage verwirrt Gäste. Unsere Angaben und Google zeigen die Adresse <strong>Prud 193</strong>, während Gault&amp;Millau <strong>Prud 192</strong> nennt. Es ist dieselbe Konoba — aber die Hausnummer ist nicht abgestimmt.',
        it: 'Qui saremo del tutto trasparenti, perché è una questione che confonde gli ospiti. I nostri dati e Google indicano l\'indirizzo <strong>Prud 193</strong>, mentre Gault&amp;Millau riporta <strong>Prud 192</strong>. È la stessa konoba — ma il numero civico non è allineato.'
      },
      '756d4eaeb1': {
        hr: 'Do prve provjere kod nadležnih, za navigaciju je najpouzdanije koristiti <strong>koordinate</strong> (43.095118, 17.618279) ili Google kartu, a ne kućni broj. Ako prolazite cestom prema granici, konoba se nalazi uz samo vrilo rijeke Norin i teško ju je promašiti.',
        en: 'Until the first check with the authorities, the most reliable way to navigate is to use the <strong>coordinates</strong> (43.095118, 17.618279) or Google Maps, rather than the house number. If you are driving towards the border, the konoba stands beside the very spring of the river Norin and is hard to miss.',
        de: 'Bis zur ersten Prüfung bei den Behörden ist für die Navigation am zuverlässigsten die <strong>Koordinaten</strong> (43.095118, 17.618279) oder Google Maps zu nutzen, nicht die Hausnummer. Wenn Sie Richtung Grenze fahren, liegt die Konoba direkt an der Quelle des Flusses Norin und ist kaum zu verfehlen.',
        it: 'Fino al primo controllo presso le autorità, per la navigazione è più affidabile usare le <strong>coordinate</strong> (43.095118, 17.618279) o Google Maps, non il numero civico. Se guidate verso il confine, la konoba si trova proprio accanto alla sorgente del fiume Norin ed è difficile da mancare.'
      },
      '6cd7eff613': {
        hr: 'Dođite vidjeti zašto su pisali o nama',
        en: 'Come and see why they wrote about us',
        de: 'Kommen Sie und sehen Sie, warum über uns geschrieben wurde',
        it: 'Venite a vedere perché hanno scritto di noi'
      },
      'a260acd207': {
        hr: 'Žabe na luku, brudet s jeguljom i kruh ispod peke — svaki dan od 10 do 23 sata.',
        en: 'Frogs on onion, brudet with eel and bread under the peka — every day from 10 am to 11 pm.',
        de: 'Frösche auf Zwiebel, Brudet mit Aal und Brot aus der Peka — jeden Tag von 10 bis 23 Uhr.',
        it: 'Rane in cipollata, brudet con anguilla e pane sotto la peka — ogni giorno dalle 10 alle 23.'
      },
      'f19ce56dd5': {
        hr: 'Izvori i reference',
        en: 'Sources and references',
        de: 'Quellen und Referenzen',
        it: 'Fonti e riferimenti'
      },
      '1b566e857c': {
        hr: 'Izvor',
        en: 'Source',
        de: 'Quelle',
        it: 'Fonte'
      },
      '8af9810589': {
        hr: 'Godina',
        en: 'Year',
        de: 'Jahr',
        it: 'Anno'
      },
      '956a0e5bf2': {
        hr: 'Što piše',
        en: 'What it says',
        de: 'Was darin steht',
        it: 'Cosa dice'
      },
      '021523b4bc': {
        hr: 'BBC Travel',
        en: 'BBC Travel',
        de: 'BBC Travel',
        it: 'BBC Travel'
      },
      'fa0d53fbe9': {
        hr: 'Reportaža o neretvanskoj tradiciji žaba; priča je smještena u Konobu Vrilo',
        en: 'A feature on the Neretva frog tradition; the story is set in Konoba Vrilo',
        de: 'Eine Reportage über die Neretva-Froschtradition; die Geschichte spielt in der Konoba Vrilo',
        it: 'Un reportage sulla tradizione delle rane della Neretva; la storia è ambientata nella Konoba Vrilo'
      },
      'a8cc1c2f65': {
        hr: 'Gault&amp;Millau',
        en: 'Gault&amp;Millau',
        de: 'Gault&amp;Millau',
        it: 'Gault&amp;Millau'
      },
      '88097894db': {
        hr: 'Ocjena 13/20, kategorija „autentična kuhinja“, chefica Stojka Taslak',
        en: 'Rating 13/20, category “authentic cuisine”, chef Stojka Taslak',
        de: 'Bewertung 13/20, Kategorie „authentische Küche“, Chefköchin Stojka Taslak',
        it: 'Valutazione 13/20, categoria “cucina autentica”, chef Stojka Taslak'
      },
      '60783495f1': {
        hr: 'Ako naiđete na još neki tekst o konobi — domaći ili strani — javite nam. Rado ćemo ga dodati ovdje.',
        en: 'If you come across another article about the konoba — Croatian or foreign — let us know. We will gladly add it here.',
        de: 'Wenn Sie einen weiteren Artikel über die Konoba finden — kroatisch oder ausländisch — sagen Sie uns Bescheid. Wir nehmen ihn gerne hier auf.',
        it: 'Se trovate un altro articolo sulla konoba — croato o straniero — fatecelo sapere. Lo aggiungeremo volentieri qui.'
      },
      '6ad849cd70': {
        hr: '<span>Konoba</span>Konoba Vrilo, Prud',
        en: '<span>Konoba</span>Konoba Vrilo, Prud',
        de: '<span>Konoba</span>Konoba Vrilo, Prud',
        it: '<span>Konoba</span>Konoba Vrilo, Prud'
      },
      'da4180cfc6': {
        hr: '<span>Kuhinja</span>Lokalna i tradicionalna',
        en: '<span>Cuisine</span>Local and traditional',
        de: '<span>Küche</span>Lokal und traditionell',
        it: '<span>Cucina</span>Locale e tradizionale'
      },
      'f70ec64385': {
        hr: '<span>Ocjena</span>13/20, Gault&amp;Millau',
        en: '<span>Rating</span>13/20, Gault&amp;Millau',
        de: '<span>Bewertung</span>13/20, Gault&amp;Millau',
        it: '<span>Valutazione</span>13/20, Gault&amp;Millau'
      },
      '890e08d78c': {
        hr: '<span>U medijima</span>BBC Travel, 2013.',
        en: '<span>In the media</span>BBC Travel, 2013',
        de: '<span>In den Medien</span>BBC Travel, 2013',
        it: '<span>Sui media</span>BBC Travel, 2013'
      },
      'f602f2b4d3': {
        hr: 'Što vodič izdvaja',
        en: 'What the guide highlights',
        de: 'Was der Führer hervorhebt',
        it: 'Cosa evidenzia la guida'
      },
      '4ce49275e3': {
        hr: 'Adresa za provjeru',
        en: 'Address to check',
        de: 'Indirizzo da verificare',
        it: 'Indirizzo da verificare'
      },
      '0d713c65bd': {
        hr: 'Neretvanski brudet — soul of the Neretva valley →',
        en: 'Neretva brudet — soul of the Neretva valley →',
        de: 'Neretva-Brudet — soul of the Neretva valley →',
        it: 'Brudet della Neretva — soul of the Neretva valley →'
      },
      '27ad1fddd7': {
        hr: 'Otvoreno svaki dan od 10 do 23 sata. Za jela ispod peke i veće grupe preporučujemo rezervaciju dan prije.',
        en: 'Open every day from 10 am to 11 pm. For dishes under the peka and larger groups we recommend booking a day ahead.',
        de: 'Jeden Tag von 10 bis 23 Uhr geöffnet. Für Gerichte unter der Peka und größere Gruppen empfehlen wir eine Reservierung einen Tag vorher.',
        it: 'Aperto tutti i giorni dalle 10 alle 23. Per i piatti sotto la peka e i gruppi numerosi consigliamo di prenotare un giorno prima.'
      },
      'bf975a98be': {
        hr: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=43.095118,17.618279" target="_blank" rel="noopener">Otvori kartu</a>',
        en: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=43.095118,17.618279" target="_blank" rel="noopener">Open the map</a>',
        de: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=43.095118,17.618279" target="_blank" rel="noopener">Karte öffnen</a>',
        it: '<a class="btn btn-solid" href="tel:+38520687139">+385 20 687 139</a> <a class="btn btn-ghost" href="https://maps.google.com/?q=43.095118,17.618279" target="_blank" rel="noopener">Apri la mappa</a>'
      },
      '75d005ede8': {
        hr: '© <span id="year">2026</span> Konoba Vrilo. Citati i podaci iz vanjskih izvora (BBC Travel, Gault&amp;Millau) navedeni su uz poveznicu na izvorni tekst.',
        en: '© <span id="year">2026</span> Konoba Vrilo. Quotations and data from external sources (BBC Travel, Gault&amp;Millau) are given with a link to the original text.',
        de: '© <span id="year">2026</span> Konoba Vrilo. Zitate und Daten aus externen Quellen (BBC Travel, Gault&amp;Millau) sind mit einem Link zum Originaltext versehen.',
        it: '© <span id="year">2026</span> Konoba Vrilo. Citazioni e dati da fonti esterne (BBC Travel, Gault&amp;Millau) sono riportati con un link al testo originale.'
      },
      '93969ab1ae': {
        hr: 'BBC Travel je 2013. posvetio članak neretvanskoj tradiciji žaba i konobi Vrilo u Prudu. Gault&Millau je 2026. daje 13/20. Što su napisali i što se od tada promijenilo.',
        en: 'In 2013 BBC Travel devoted an article to the Neretva frog tradition and to Konoba Vrilo in Prud. Gault&amp;Millau gives the konoba 13/20. What they wrote and which address needs checking.',
        de: '2013 widmete BBC Travel einen Artikel der Neretva-Froschtradition und der Konoba Vrilo in Prud. Gault&amp;Millau gibt der Konoba 13/20. Was sie schrieben und welche Adresse zu prüfen ist.',
        it: 'Nel 2013 BBC Travel ha dedicato un articolo alla tradizione delle rane della Neretva e alla Konoba Vrilo a Prud. Gault&amp;Millau assegna alla konoba 13/20. Cosa hanno scritto e quale indirizzo va verificato.'
      },
      '7508a44203': {
        hr: 'Konoba Vrilo u svjetskim medijima — BBC Travel i Gault&amp;Millau',
        en: 'Konoba Vrilo in the world\'s media — BBC Travel and Gault&amp;Millau',
        de: 'Konoba Vrilo in den Weltmedien — BBC Travel und Gault&amp;Millau',
        it: 'Konoba Vrilo sui media internazionali — BBC Travel e Gault&amp;Millau'
      },
      '149e42244e': {
        hr: 'BBC Travel o neretvanskoj tradiciji žaba i konobi Vrilo; Gault&Millau 13/20. Dvije reference i jedna adresa koju treba provjeriti.',
        en: 'BBC Travel on the Neretva frog tradition and Konoba Vrilo; Gault&amp;Millau 13/20. Two references and one address to check.',
        de: 'BBC Travel über die Neretva-Froschtradition und die Konoba Vrilo; Gault&amp;Millau 13/20. Zwei Referenzen und eine zu prüfende Adresse.',
        it: 'BBC Travel sulla tradizione delle rane della Neretva e la Konoba Vrilo; Gault&amp;Millau 13/20. Due referenze e un indirizzo da verificare.'
      },
      'de515e00b8': {
        hr: 'Konoba Vrilo · Prud, Metković — neretvanski specijaliteti',
        en: 'Konoba Vrilo · Prud, Metković — Neretva specialities',
        de: 'Konoba Vrilo · Prud, Metković — Spezialitäten der Neretva',
        it: 'Konoba Vrilo · Prud, Metković — specialità della Neretva'
      },
      '91e4f7bdb8': {
        hr: 'Blog — priče i recepti iz doline Neretve · Konoba Vrilo',
        en: 'Blog — stories and recipes from the Neretva valley · Konoba Vrilo',
        de: 'Blog — Geschichten und Rezepte aus dem Neretva-Tal · Konoba Vrilo',
        it: 'Blog — storie e ricette dalla valle della Neretva · Konoba Vrilo'
      },
      '04e2ee91b5': {
        hr: 'Neretvanski brudet — soul of the Neretva valley · Blog Konobe Vrilo',
        en: 'Neretva brudet — soul of the Neretva valley · Konoba Vrilo blog',
        de: 'Neretva-Brudet — soul of the Neretva valley · Blog der Konoba Vrilo',
        it: 'Brudet della Neretva — soul of the Neretva valley · blog della Konoba Vrilo'
      },
      '8d4829eeea': {
        hr: 'Konoba Vrilo u svjetskim medijima — BBC Travel i Gault&amp;Millau · Blog Konobe Vrilo',
        en: 'Konoba Vrilo in the world\'s media — BBC Travel and Gault&amp;Millau · Konoba Vrilo blog',
        de: 'Konoba Vrilo in den Weltmedien — BBC Travel und Gault&amp;Millau · Blog der Konoba Vrilo',
        it: 'Konoba Vrilo sui media internazionali — BBC Travel e Gault&amp;Millau · blog della Konoba Vrilo'
      }
    };

  var STORAGE_KEY = 'vrilo-lang';
  var DEFAULT_LANG = 'hr';
  var LANGS = ['hr', 'en', 'de', 'it'];

  var docTitle = document.title;

  /* vrati prijevod za kljuc i jezik, ili null ako ga nema */
  var t = function (key, lang) {
    var entry = I18N[key];
    if (!entry) return null;
    var value = entry[lang];
    return value === undefined || value === null ? null : value;
  };

  /* --------------------------------------------------------- jezik u URL-u */
  var readUrlLang = function () {
    var match = /[?&]lang=(hr|en|de|it)\b/i.exec(window.location.search);
    return match ? match[1].toLowerCase() : null;
  };

  var readStoredLang = function () {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return LANGS.indexOf(value) !== -1 ? value : null;
    } catch (error) {
      return null;
    }
  };

  var storeLang = function (lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (error) { /* ignoriraj */ }
  };

  var activeLang = readUrlLang() || readStoredLang() || DEFAULT_LANG;

  /* ------------------------------------------------------- primjena jezika */
  var translateNodes = function (root, lang) {
    var nodes = root.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (node) {
      var key = node.getAttribute('data-i18n');
      if (lang === 'hr') {
        if (node.dataset.i18nHr !== undefined) {
          node.innerHTML = node.dataset.i18nHr;
        }
        return;
      }
      var value = t(key, lang);
      if (value === null) return;
      if (node.dataset.i18nHr === undefined) node.dataset.i18nHr = node.innerHTML;
      node.dataset.i18nKey = key;
      node.innerHTML = value;
    });
  };

  var translateAttrs = function (root, lang) {
    var nodes = root.querySelectorAll('[data-i18n-attr]');
    Array.prototype.forEach.call(nodes, function (node) {
      node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        var attr = (bits[0] || '').trim();
        var key = (bits[1] || '').trim();
        if (!attr || !key) return;
        var store = 'i18nHr' + attr.replace(/[^a-z]/gi, '');
        if (lang === 'hr') {
          if (node.dataset[store] !== undefined) node.setAttribute(attr, node.dataset[store]);
          return;
        }
        var value = t(key, lang);
        if (value === null) return;
        if (node.dataset[store] === undefined) node.dataset[store] = node.getAttribute(attr) || '';
        node.setAttribute(attr, value);
      });
    });
  };

  /* engleski naslov kartice i meta opis */
  var translateHead = function (lang) {
    var titleEl = document.querySelector('[data-i18n-title]');
    var descEl = document.querySelector('[data-i18n-desc]');
    var ogDesc = document.querySelector('[data-i18n-desc-og]');
    var ogTitle = document.querySelector('[data-i18n-title-og]');

    if (titleEl) {
      var tk = titleEl.getAttribute('data-i18n-title');
      if (lang === 'hr') { document.title = docTitle; }
      else { var tv = t(tk, lang); if (tv !== null) document.title = tv; }
    }
    [[descEl, 'data-i18n-desc'], [ogDesc, 'data-i18n-desc-og'], [ogTitle, 'data-i18n-title-og']]
      .forEach(function (pair) {
        var el = pair[0], attr = pair[1];
        if (!el) return;
        var key = el.getAttribute(attr);
        if (lang === 'hr') {
          if (el.dataset.i18nHrContent !== undefined) el.setAttribute('content', el.dataset.i18nHrContent);
          return;
        }
        var value = t(key, lang);
        if (value === null) return;
        if (el.dataset.i18nHrContent === undefined) el.dataset.i18nHrContent = el.getAttribute('content') || '';
        el.setAttribute('content', value);
      });
  };

  var setUrlLang = function (lang) {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  var updateSwitchers = function (lang) {
    Array.prototype.forEach.call(document.querySelectorAll('.lang-switch'), function (box) {
      Array.prototype.forEach.call(box.querySelectorAll('[data-lang]'), function (btn) {
        var on = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  };

  var apply = function (lang) {
    activeLang = lang;
    document.documentElement.lang = lang;
    translateNodes(document, lang);
    translateAttrs(document, lang);
    translateHead(lang);
    updateSwitchers(lang);
    storeLang(lang);
    setUrlLang(lang);
    document.dispatchEvent(new CustomEvent('vrilo:langchange', { detail: { lang: lang } }));
  };

  /* ------------------------------------------------------------- prekidač */
  var buildSwitcher = function () {
    var box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Jezik / Language');
    box.innerHTML = LANGS.map(function (code) {
      return '<button type="button" data-lang="' + code + '" aria-pressed="false">'
        + code.toUpperCase() + '</button>';
    }).join('');
    return box;
  };

  var mountSwitchers = function () {
    var header = document.querySelector('.header-inner');
    if (header && !header.querySelector('.lang-switch')) header.appendChild(buildSwitcher());
    Array.prototype.forEach.call(document.querySelectorAll('.footer-nav'), function (nav) {
      if (nav.parentNode.querySelector('.lang-switch')) return;
      nav.parentNode.insertBefore(buildSwitcher(), nav.nextSibling);
    });
  };

  var onSwitchClick = function (event) {
    var btn = event.target.closest ? event.target.closest('[data-lang]') : null;
    if (!btn) return;
    apply(btn.getAttribute('data-lang'));
  };

  document.addEventListener('click', onSwitchClick);

  var boot = function () {
    mountSwitchers();
    apply(activeLang);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.VriloI18n = { setLang: apply, getLang: function () { return activeLang; }, dict: I18N, langs: LANGS };
})();
