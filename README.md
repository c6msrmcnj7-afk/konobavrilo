# Konoba Vrilo — web stranica

Jednostavna, responzivna jednostranična prezentacija za **Konobu Vrilo**
(Prud 193, 20350 Metković). Statični HTML/CSS/JS — bez build koraka i bez
vanjskih ovisnosti osim Google Fontova i ugrađene Google karte.

## Pokretanje

Dvoklik na `index.html` ili:

```bash
cd vrilo-prud && python3 -m http.server 8080   # → http://localhost:8080
```

## Struktura

| Datoteka | Što je |
|---|---|
| `index.html` | cijela stranica + JSON-LD (schema.org Restaurant), uključuje sekcije `#video` i `#blog` |
| `blog/index.html` | popis blog priča (hub) |
| `blog/neretvanski-brudet.html` | članak: *Neretvanski brudet — soul of the Neretva valley* (+ JSON-LD BlogPosting) |
| `blog/konoba-vrilo-u-medijima.html` | članak: *Konoba Vrilo u svjetskim medijima* — BBC Travel i Gault&Millau |
| `styles.css` | dizajn: paleta rijeka-zelena / pijesak / mjed, responzivni grid, tipografija članaka, video |
| `script.js` | sticky header, mobilna navigacija, reveal-on-scroll, lightbox (slike + video), click-to-play, aktivni naslov u sadržaju članka |
| `i18n.js` | **višejezičnost (HR/EN/DE/IT)** — rječnik + prekidač jezika; generira se, ne uređuje ručno |
| `translations.tsv` | **prijevodi** — jedina datoteka koju prevoditelj uređuje |
| `tools/i18n.py` | oznake (apply), provjera (check), izvoz ključeva (keys) |
| `tools/gen_dict.py` | spaja hrvatski iz HTML-a s prijevodima u rječnik |
| `tools/make_i18n.py` | sastavlja `i18n.js` iz `tools/runtime.js` + rječnika |
| `tools/runtime.js` | predložak runtime dijela `i18n.js` |
| `assets/` | 9 fotografija konobe i jela + logo (`logo.png`, `logo-192.png`, `logo-92.png`) + `neretva-delta.svg` + `video-brod.jpg`, `video-brudet.jpg` |
| `tools/extract-menu.py` | pomoćna skripta za izvlačenje teksta iz PDF jelovnika |

## Video

Dva YouTube videa kanala *Zvonimir Taslak* (`@zvontasvrilo`):

| Video | ID | Gdje se prikazuje |
|---|---|---|
| Kad naš brod plovi — Konoba Vrilo | `uC8h6fVJC-8` | naslovnica, sekcija `#video` |
| BRUDET | `RHNb4iPOMU0` | naslovnica `#video` + blog hub + članak o brudetu |

**Kako radi:** u HTML-u stoji samo `.video-facade` s lokalnom naslovnicom (thumbnail
skinut u `assets/`) i gumbom. YouTube iframe se stvara **tek na klik** — do tada se ne
učitava nijedan zahtjev prema YouTubeu, pa stranica ostaje brza i bez kolačića trećih
strana. Na stranicama s lightboxom video se otvara u lightboxu (iframe se prazni pri
zatvaranju, da zvuk stane); na stranici članka ugrađuje se na mjesto naslovnice.

Dodavanje novog videa:

1. skini naslovnicu: `curl -o assets/video-novi.jpg https://i.ytimg.com/vi/<ID>/maxresdefault.jpg`
   (ako ne postoji, uzmi `hqdefault.jpg`),
2. kopiraj `<figure class="video-figure">` blok i zamijeni `data-yt`, `data-yt-title`,
   `src` naslovnice i tekst u `figcaption`,
3. ako novi video ide u članak, koristi `<figure class="post-figure post-figure-video">`.

Domena za ugrađivanje je u `styles.css` kao CSS varijabla `--embed-domain`
(`:root`), zadano `youtube-nocookie.com`. `script.js` je čita i propušta samo ako je
YouTube adresa — ako želite obični `youtube.com`, promijenite tu varijablu.

## Blog

Blog je obični HTML — bez build koraka i bez CMS-a. Dodavanje nove priče:

1. kopiraj `blog/neretvanski-brudet.html` u `blog/<nova-adresa>.html`,
2. zamijeni naslov, `<title>`, `meta description`, `og:*` oznake, JSON-LD i tekst
   unutar `<div class="post-body">` (naslovi `h2` s `id` atributom hrane sadržaj u
   bočnoj traci),
3. dodaj karticu u `blog/index.html` **i** u `index.html` (sekcija `#blog`) —
   ista oznaka `<article class="blog-card">`,
4. nove slike spremi u `assets/` i uveži relativnom putanjom (`../assets/…` iz mape
   `blog/`).

Koristi se devet gotovih komponenti: `.callout` (istaknuta pravila), `.ingredients`
(dvostupčani popis sastojaka), `.steps` (numerirana priprema), `.tips`, `.post-quote`,
`.post-figure` (slika s potpisom), `.post-cta`, `.post-facts` (traka s vremenom i
brojem osoba) i `.aside-box` (bočna traka).

## Jezici (HR / EN / DE / IT)

Stranica je dostupna na **hrvatskom, engleskom, njemačkom i talijanskom**. Jezik se
mijenja prekidačem u zaglavlju i podnožju, pamti se u `localStorage` i upisuje u
URL (`?lang=de`), pa je svaka jezična verzija dijeljiva linkom. Bez JavaScripta
stranica ostaje na hrvatskom.

**Hrvatski je izvor.** Nalazi se u HTML-u; prijevodi žive odvojeno, u
`translations.tsv`. Veza je `data-i18n` oznaka čiji je ključ hash hrvatskog
teksta — isti tekst na više stranica dijeli jedan prijevod, pa su prijevodi
konzistentni.

### Kako promijeniti tekst

1. Uredi **hrvatski** tekst u HTML-u.
2. `python3 tools/i18n.py apply` — upiše oznake (sigurno za ponovno pokretanje).
3. `python3 tools/i18n.py check` — kaže koji ključ nema prijevod.
4. Upiši prijevod u `translations.tsv` (kolone: `ključ`, `en`, `de`, `it`).
5. `python3 tools/gen_dict.py && python3 tools/make_i18n.py` — sastavi `i18n.js`.

`i18n.js` **ne uređuj ručno** — prepisuje se u koraku 5.

### Trenutno stanje

| Što | Broj |
|---|---|
| Tekstualnih jedinica (oznaka) | 364 |
| Atributa (alt, aria-label, title) | 58 |
| Jedinstvenih ključeva | 308 |
| Prijevoda | 308 × 3 jezika |

Sve provjere: `python3 tools/i18n.py check` (mora ispisati `SVE OK`).
Test u pregledniku (traži `jsdom`): `node tools/test-i18n.js` — provjerava sve
četiri stranice u sva četiri jezika.

### Što ostaje na hrvatskom

Nazivi jela i pića na jelovniku prevode se opisno (npr. *Brudet od žaba i jegulje*
→ *Brudet of frogs and eel*), ali riječi poput **brudet**, **peka**, **teća**,
**kutlača** i **kvasina** namjerno ostaju u izvornom obliku — to su pojmovi bez
pravog prijevoda i dio su identiteta kuhinje. Isto vrijedi za **Konoba Vrilo**.

## Logo

Logo (žaba i jegulja u barki) preuzet je s Facebook stranice konobe preko javnog
endpointa `graph.facebook.com/konobavrilo/picture?width=1024&height=1024`
(Facebook ne vraća više od ~840 px). Spremljen je u tri veličine:

- `assets/logo.png` — 512 px, izvorna kopija za print i buduće izmjene
- `assets/logo-192.png` — favicon i `apple-touch-icon`
- `assets/logo-92.png` — prikaz u headeru (46 px @2x); footer koristi isti file na 56 px

Ako imaš logo u vektoru (SVG/AI/PDF), pošalji ga — zamijenit ću PNG i rubovi će
biti savršeno oštri na svim ekranima. Logo se prikazuje kao zaobljeni kvadrat
(`.brand-logo` u `styles.css`); za kružni oblik promijeni `border-radius` na
`50%`, ali tada se vrh vesla na desnoj strani malo reže.

## Sadržaj i izvori

Podaci su prikupljeni s javnih izvora (provjereno 24. 9. 2026.):

- **Gault&Millau** — ocjena 13/20, chefica Stojka Taslak, kuhinja *lokalna i
  tradicionalna*, opis specijaliteta (žabe na luku, pohane žabe, rižot od žaba,
  brudet, jegulja s ražnju, gambori, hobotnica ispod peke, meso ispod peke,
  palačinke) —
  <https://hr.gaultmillau.com/hr/restaurants/konoba-vrilo>
- **BBC Travel** — reportaža *Leaping into Croatia's frog leg tradition*
  (21. 7. 2013.), u kojoj je središte priče Konoba Vrilo: noćni lov na žabe uz
  lampu, brudet od žaba i jegulja, palenta i žilavka, Stipe Taslak —
  <https://www.bbc.com/travel/article/20130721-leaping-into-croatias-frog-leg-tradition>
- **Smokvina / BookYour** — adresa (Prud 193, 20350 Metković), telefon
  +385 20 687 139, WhatsApp +385 98 667 806, e-mail `booking@smokvina.hr`,
  radno vrijeme 10:00–23:00 svaki dan, fotografije —
  <https://smokvina.hr/bookyour/r/kvrilo>
  (Gault&Millau vodi rezervacije na <https://bookyour.smokvina.hr/b/kvrilo>)
- **Google / top-rated.online** — ocjena 4,8/5 iz 858 recenzija, sadržaji
  (besplatan parking, pristup kolicima, ljubimci, terasa, kartice, dostava) —
  <https://www.top-rated.online/cities/Grad+Metkovi%C4%87/place/p/12368646/Konoba+Vrilo>
- **Koordinate** za kartu i navigaciju: 43.095118, 17.618279 (Gault&Millau)
- **Facebook** — logo konobe (žaba i jegulja u barki); detalji u poglavlju *Logo*
- **YouTube** — videa *Kad naš brod plovi* i *BRUDET* s kanala Zvonimir Taslak
  (`@zvontasvrilo`); naslovnice su lokalne kopije thumbnaila (`i.ytimg.com`), videa se
  ugrađuju s `youtube-nocookie.com`
- **Gastronaut** — profil konobe i fotografije; odatle su tri velike fotografije:
  `assets/hero-jegulja.jpg` (jegulja na ražnju, naslovna), `assets/interior.jpg`
  (interijer) i `assets/hero-jegulja-ognjiste.jpg` (jegulja nad žeravicom) —
  <https://www.gastronaut.hr/restorani/dubrovacko-neretvanska-zupanija/prud-20352/vrilo/5826/>

### Fotografije

| Datoteka | Rezolucija | Gdje se koristi |
|---|---|---|
| `hero-jegulja.jpg` | 1320×600 | **naslovna (hero) sekcija** — jegulja na ražnju pred vatrom |
| `hero-jegulja-ognjiste.jpg` | 1920×750 | galerija — jegulja nad žeravicom |
| `interior.jpg` | 1920×750 | sekcija `#o-nama` + galerija |
| `hero-grill.jpg` | 1024×538 | galerija — meso s gradela |
| `exterior.jpg` | 870×490 | galerija + naslovnica članka *Konoba Vrilo u svjetskim medijima* |
| `brudet-zabe.jpg` | 600×450 | kartica bloga, oba članka, galerija |
| `video-brod.jpg`, `video-brudet.jpg` | 1280×720 | naslovnice videa |
| `neretva-delta.svg` | vektor | ilustracija delte (crtana za ovaj site) |
| `interior-pano-960.jpg` | 960×237 | **ne koristi se** — stara panorama interijera, arhiva |

Fotografije sa Smokvine imaju skromnu rezoluciju (550–1024 px), pa se na velikim
ekranima blago rastežu; one s Gastronauta su veće. Ako imate vlastite snimke u punoj
rezoluciji, zamijenite ih pod istim imenima. Interijer je širok (1920×750) pa mu je u
`#o-nama` `aspect-ratio` postavljen na 16/9 umjesto zadanog 4/3, da se manje reže.
Naslovna fotografija je omjer 2,2:1, što dobro podnosi okomit `object-fit: cover`.

### Prije objave provjeriti

1. **Cijene nisu navedene** — jelovnik prikazuje samo jela; cijene su u konobi.
   Ako ih želite na stranici, dodajte ih u `.menu-col ul` u `index.html`.
2. **Fotografije** su preuzete s javnog profila za rezervacije; zamijenite ih
   vlastitim, većim fotografijama (hero je trenutno 1024 px širok pa se na
   velikim ekranima blago rasteže).
3. **Radno vrijeme** je prikazano po danima u tablici — ako se ljeti mijenja,
   uredite tablicu `.hours` i JSON-LD `openingHours`.
4. **Rezervacije** vode na `tel:` i na postojeći Smokvina obrazac; ako imate
   vlastiti sustav, zamijenite link u gumbu *Rezerviraj online*.
5. **Blog fotografije** — članak o brudetu koristi postojeće fotografije iz
   `assets/`; ako imate snimke pripreme u konobi (teća, palenta, Brudetijada),
   zamijenite ih i stranica će dobiti mnogo više. Ilustracija `neretva-delta.svg`
   je crtana za ovaj site i slobodno je mijenjajte.
6. **ADRESA — nesuglasje koje treba riješiti.** Google i Smokvina/BookYour vode
   **Prud 193**, a Gault&Millau **Prud 192**. Provjerite točan kućni broj i
   uskladite ga na svim mjestima: `<title>`/meta, JSON-LD `streetAddress`
   (u `index.html` i u oba članka), footer i `.contact-list` u sekciji
   `#posjet`. Do tada je u članku *Konoba Vrilo u svjetskim medijima* to
   otvoreno napisano i navigacija upućuje na koordinate.
7. **KATEGORIJA GAULT&MILLAU.** Stranica vodiča (provjereno 25. 9. 2026.) navodi
   kategoriju **„Autentična kuhinja“**, dok se u hero sekciji naslovnice još
   stoji starija oznaka *Chef's Restaurant*. Provjerite koja je aktualna i
   uskladite `.hero-badges` i `.media-tag` u `index.html`.

## Kako brzo mijenjati

- Naslov i podnaslov hero sekcije: `<section class="hero">` u `index.html`.
- Jela / specijaliteti: `.cards` (kartice) i `.menu-grid` (jelovnik).
- Boje i tipografija: varijable na vrhu `styles.css` (`:root`).
- Galerija: `.gallery` — svaki `<button class="g-item" data-full="assets/x.jpg">`
  otvara lightbox s velikom slikom.
- Blog: vidi poglavlje **Blog** iznad; tekst članka je u `blog/neretvanski-brudet.html`
  unutar `<div class="post-body">`.
- Jezici: vidi poglavlje **Jezici** iznad. Prijevodi su u `translations.tsv`,
  `i18n.js` se generira.

## Pristupačnost i detalji

- Responzivno: 4 / 2 / 1 kolone, mobilna navigacija s hamburgerom.
- `prefers-reduced-motion` isključuje animacije.
- Bez JS-a sadržaj ostaje vidljiv (`.js` klasa se dodaje samo kad JS radi).
- Lightbox se zatvara na `Esc`, klik izvan slike i gumb ×.
- Blog članak ima semantičnu strukturu (`article`, `h2` s `id`), sadržaj u bočnoj
  traci i istaknut aktivni naslov; svi lokalni linkovi i slike su provjereni.
