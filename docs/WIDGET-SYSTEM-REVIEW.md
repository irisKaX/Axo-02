# Widget System · evidence a kontrola

Fáze: **Implementace → vizuální revize**, 2. 11. 2026. Rozsah: pouze integrované Widget Studio, dvacet kompozic a jejich registry. Žádný nový Lab, Dashboard, merge nebo deployment.

## Design workflow

Použity skutečně dostupné projektové skills: **AXO Design Guardian**, původní **Frontend Design** a **Impeccable 4.8.0**. Přečten katalog, Source of Truth, schválené vstupy/tlačítka a původní widgety. `design:context -- --target components/widget-studio.js` načetl projektový kontext. Frontend Design vedl návrh kompozic; Impeccable layout/polish vedly kontrolu čtecího pořadí, seskupení, hustoty a extrémů. Neproběhla samostatná dvouagentová procedura `critique`; jde o přímou kontrolu implementace a vykreslených snímků.

Srovnání Small/Large bylo vizuálně prohlédnuto na obou celých knihovních snímcích, po úpravách také jednotlivě Screenshot Small, WebP Large a QR Small. Opraveno skutečné těsné sousedství výsledku s patičkou u Screenshot Small a WebP Large. U QR Small upraven pravý odstup akcí, aby tooltip Nová URL zůstal uvnitř karty. Automatické kontroly zahrnují i obsah výsledku vůči patičce, nikoli pouze vnější rozměry.

Hierarchie: nástroj → nadpis → vstup/kontext → výsledek → viditelné omezení prototypu. Large přidává související detail, Small stručný souhrn. Knihovní režim záměrně ukazuje všech deset možností najednou pro společnou revizi; při návrhu jednotlivého widgetu slouží samostatný režim. Bez doprovodných dekorací a nového vizuálního jazyka.

`npm run design:detect -- --json components/widget-registry.js` skutečně spustil původní engine: `[]`, exit 0. Je to statický sken dynamického JS, **nikoli důkaz absence vizuálních nebo přístupnostních problémů**. Live overlay ani nativní Codex Web hook se netvrdí. `design:doctor` a `design:skills:check` ověřily připnuté skills a engine.

## Playwright

Prostředí: Playwright **1.64.1**, systémový **Chromium 154.0.8037.57**, Linux x64, DPR 1, locale cs-CZ, Praha, reduced motion. Geist z připnutých a hashově ověřených fontových fixtures. Desktop **1366 × 768**, mobil **390 × 844**, v obou tématech.

- Všech 20 variant: pevné rozměry, výchozí/vyplněné/výsledné/chybové stavy; u prototypů také demonstrační zpracování.
- Hover/Focus/Pressed/Disabled/Default náhledy, skutečné disabled atributy a stabilní rozměry.
- Dlouhé vstupy včetně znaků HTML; žádné rozšíření karty. Obsah výsledků nekoliduje s patičkou.
- Demonstrační akce a resety všech devíti prototypů; viditelné označení nepřipojených nástrojů.
- QR SVG a stažené PNG nezávisle dekódované knihovnou **jsQR** na přesnou zadanou URL; nepovolené protokoly, Enter, reset a další generování.
- Find Phrase: skutečné původní režimy Asset/Fráze, klávesové šipky, editace a přepnutí demo dostupnosti.
- WebP: skutečné otevření file chooseru a výběr souboru, přiznaná absence konverze.
- Registry: deset záznamů a všechny povinné členy, dvě nezávislé instance, jedinečná ID, serializace, opakovaný destroy a odmítnutí změny zničené instance.
- Studio: výběr, drafty, klávesnice, porovnání a všech dvacet instancí v knihovně, odchod/návrat mezi sekcemi.
- Composition Lab: původní sdílený controller z merged commitu `51daf280` proti nové verzi; přesně shodná geometrie a všechny computed CSS vlastnosti Find/QR před i po generování v obou tématech/viewpor­tech. Před/po PNG přiloženy k reportu a vizuálně porovnány. Raw PNG test odhalil čtyři rozdílné antialiasované pixely na zaoblených hranách radio labelů v light desktopu (max. rozdíl kanálu 11); proto se zde netvrdí absolutní pixelová identita. Nové Studio reference nadále používají nulovou pixelovou toleranci. Vyžaduje tento commit v lokální Git historii (u shallow clone jej nejprve fetchněte).
- Původní Button/Search regresní reference zachované; chyby runtime/konzole ve fixture způsobují selhání.

**Finální kompletní běh `npm run design:test`: 90 passed, 0 failed, 0 skipped (2,6 min).** Zahrnuje 40 nových pixelových porovnání výsledků a původních 8 katalogových referencí. Po posledním sjednocení výchozího režimu Find Phrase na Asset proběhla navíc cílená kontrola ve všech čtyřech projektech; **4 passed, 0 failed** (`widget-studio.spec.mjs`, filtr `Find Phrase preserves`, reporter list, samostatný output; kompletní HTML report 90 testů zůstává zachovaný). HTML report: `playwright-report/design/index.html`; selhání/traces/přílohy: `test-results/design`. Tyto adresáře jsou generované a nejsou součástí commitu.

## Screenshoty a regresní reference

**44 čitelných PNG v repozitáři:** dvacet jednotlivých výsledků × dvě témata, dva společné přehledy a dva desktopové viewporty. [Rozcestník všech náhledů](WIDGET-SYSTEM.md).

**40 nových aktivních regresních referencí** `tests/design/baselines/chromium-154-linux-x64-{dark,light}-desktop/widget-system-{id}-{small,large}-result.png`. Záznam původu a SHA-256: `widget-system/screenshots/manifest.json`. Rozměry widgetu se ověřují přímo v DOM; PNG clip zaokrouhluje frakční pozici na pixely (jednotlivé snímky zde mají 320 × 281 / 640 × 321 px, zatímco CSS rozměry zůstávají přesně 320 × 280 / 640 × 320).

Vytvořeny až po skutečné vizuální kontrole vykreslených knihovních přehledů a opravených karet; nebyl spuštěn slepý `--update-snapshots`. Následný běh provádí pixelové porovnání s nulovou tolerancí.

Původních 8 Button/Search referencí je stále aktivních a nezměněných. Původních 32 `widget-find-*` / `widget-qr-*` snímků z V1 zůstává jako historická evidence a už není aktivní referencí nové kompozice. Reference znamená kontrolovaný výchozí stav kódu, **nikoli finální schválení designu**. Nové stavy se bez vizuální kontroly nebaselineují.

## Neověřené a záměrně nepřipojené

Reálné funkce devíti prototypů chybějí; neprobíhal audit nebo test neexistujících backendů. Ověřen je Chromium, ne Safari/Firefox, skutečný telefon ani čtečka obrazovky. Žádný nový API kontrakt, cross-origin fetch ani obcházení CORS. Nepřidána produkční služba.

Původní Impeccable context hlásí starší schéma `PRODUCT.md`; jde o již existující projektový adaptér. Migrace přes `init` nebyla součástí tohoto zadání. Automatické rozpoznání skills v Codex Web a automatické hooks zůstávají neověřené; explicitní čtení skills a spuštění původního enginu funguje.
