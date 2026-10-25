# Axo 02 · Source of Truth

> **Stav:** aktivní designový katalog. **Aktualizováno:** 25. 10. 2026.
> **Závaznost:** Tento soubor je průběžný zdroj pravdy pro Axo 02. Po každé funkční, designové nebo architektonické změně aktualizovat příslušnou část ve stejném zadání a commitu, nebo bezprostředně navazujícím commitu. GitHub historie zachovává minulost; zde je vždy pouze aktuální stav.

## 1. Projekt a odkazy

- **Název:** Axo 02.
- **Repozitář:** https://github.com/irisKaX/Axo-02 (public, hlavní větev `main`).
- **Katalog:** https://iriskax.github.io/Axo-02/ (GitHub Pages).
- **Účel nyní:** kreativní designový katalog; **není to ještě produkční aplikace**.
- **Starý projekt:** Axolotl 2.0 a jeho repozitáře zůstávají nedotčené. Žádný starý kód sem nebyl migrován.
- **Publikování:** jeden jednoduchý GitHub Actions workflow `.github/workflows/pages.yml`. Push do `main` publikuje statický katalog; bez screenshotových/produkčních release bran.

## 2. Skutečná technologie (nyní)

- **HTML + CSS + vanilla JavaScript**. `index.html` skládá katalog; Button má kanonické zdroje v `components/button.js` a `components/button.css`. Navigační komponenty mají své malé samostatné soubory.
- **Bez Reactu, Vite, TypeScriptu, npm závislostí a bundleru.** React ekosystém **není nainstalovaný**.
- **Globální dark/light:** proměnné v `:root` a `:root[data-theme="light"]`; změna režimu přepíná katalog i jeho komponenty; volba se ukládá do `localStorage`.
- **Písmo:** Geist načítaný přes Google Fonts, systémové fallbacky.
- **Ikony dnes:** jednoduchá **inline SVG napsaná přímo ve zdroji** (např. v akčních tlačítkách a jejich ukázkách ve Foundations). **Nejde o import Hugeicons**. Žádný icon package, žádný React wrapper.
- Dokumentace a ukázkové hodnoty ve Foundations nejsou automaticky komplexní produkční token knihovnou.

## 3. Obsah katalogu

| Sekce | Stav | Obsah |
| --- | --- | --- |
| Foundations | **Rozpracováno, funkční** | Palety, role, stavové barvy, O2 modrá, gradienty, Geist, typography/spacing/radius scale, borders/shadows, interactions, motion, opacity/blur, layout/layers, iconography, Accessibility, Breakpoints a Iconography Rules |
| Tlačítka | **Button System V1, funkční ukázky** | Button Variants, Button Formats, Action Examples a Hover Concepts; jeden renderer a základ, velikost S, pět variant, tři formáty a šest stavů |
| Navigace | **Rozpracováno** | Pagination (Numbered/Compact/Table), Tabs (Pill/Underline) a Breadcrumbs (plná/kompaktní ukázka). Další navigační komponenty zatím nejsou vytvořené. |
| Inputy a formuláře | **Rozpracováno** | URL Input, Search Input, nové návrhy Select, Checkbox/Radio a Switch |
| Karty | **Prázdná sekce** | Návrh teprve vznikne |
| Dialogs a popovers | **Schváleno V1** | Confirm Dialog, Information Dialog a Action Popover, vizuálně schváleno uživatelkou |
| Feedback a status | **Rozpracováno** | Inline Notices, Progress / Processing, Status Badges, Empty State a Toast, interaktivní návrhy |
| Logo | **V1 · Návrh ke schválení** | Jeden kruhový znak: originální bílá PNG hlava, stálý tmavý střed, rotující gradient; velikosti, Dark / Light a Animated / Static |
| Brand | **Prázdná sekce** | Návrh teprve vznikne |
| Loaders | **Prázdná sekce** | Návrh teprve vznikne |
| Další prvky | **Rozpracováno** | Primary Violet Scrollbar a izolované Cursor Studio (Glow, Click Burst), návrhy ke schválení |

**Navigace samotného katalogu již funguje.** To neznamená, že máme navrženou budoucí komponentu pro navigaci celé aplikace.

## 4. Foundations · existující rozhodnutí

### Barvy

- **Aktivní téma:** Catppuccin-inspirované Mocha (dark) / Latte (light) pro jemnější pozadí a povrchy. **Dark Accent je nově `#8C00FF`** (token `--accent`, rozhodnutí 24. 10. 2026); light Accent zůstává `#8839EF`. Ostatní barvy a gradienty beze změny.
- **Původní Axo paleta** je zachovaná v `--axo-original-*`, nemaže se.
- **O2 modrá:** `#0050FF`, token `--o2-blue`.
- **Stavové role:** `--error`, `--warning`, `--success`; rozdílné odstíny pro dark/light.
- **Barevné role (rozhodnutí 24. 10. 2026):** dark `--accent` / `--primary` = `#8C00FF`, light = `#8839EF`. Primary je hlavní barva akcí; `--border-hover`, `--focus` a `--selected` používají stejnou fialovou pro běžné interakce. `--active` odkazuje na `--accent-bg`; v dark režimu je nyní `--accent-bg: #2A2F4F` (tlumená modrošedá plocha), zatímco samotný `--accent` zůstává `#8C00FF`. V light režimu zůstává původní světlé `--accent-bg`. `--secondary` je neutrální povrch, `--tertiary` transparentní, `--hover` neutrální zvýraznění, `--disabled` nenápadná barva.
- **Textové role:** `--primary-foreground` (bílá na primární akci), `--secondary-foreground`, `--text-primary`, `--text-secondary`, `--text-subtle`, `--text-inverse`. `--border-hover` neznamená přebarvení všech borderů; výchozí `--border` zůstává neutrální.
- **Kontextové focus barvy:** běžné UI `--focus` fialová; destruktivní akce `--focus-error` červená, upozornění `--focus-warning` žlutá, úspěch `--focus-success` zelená. Varování a úspěch jsou připravené role, nikoli hotové typy tlačítek. Použití musí respektovat čitelnost a stav komponenty.
- **Pět gradientů:** přesné uživatelské CSS hodnoty uložené v `--gradient-1` až `--gradient-5`. Bez nevyžádaného použití v UI.

### Typografie

- Hlavní a jediný vybraný font: **Geist**. Typografická škála ve Foundations zahrnuje Display, H1–H6, Body, Small, Caption.
- Geist Mono **není instalovaný** ani zavedený jako druhý font.

### Proporce, interakce a efekty

- Vlastní spacing/radius katalogu byly zachovány při změně barev na Catppuccin.
- Foundations obsahuje přípravné tokeny pro spacing, radius, borders, shadows, motion, opacity, blur a z-index.
- Demo interakčních stavů neznamená, že jsme už vytvořili všechny budoucí komponenty.
- Respektovat `prefers-reduced-motion`, keyboard focus, semantic HTML a dark/light režim.

### Iconography

**Vybraný budoucí ikonový směr:** **Hugeicons Free, Stroke Rounded**. Bezplatná sada `@hugeicons/core-free-icons` má MIT licenci; komerční použití i redistribuce jsou možné se zachováním licenčního oznámení. **Pro ikony Pro tato licence neplatí.**  
Oficiální zdroje: https://github.com/hugeicons/hugeicons a https://hugeicons.com/docs/faqs/license-questions .

**Skutečný stav dnes:** několik **vlastních inline SVG** definovaných v `components/button.js`, které katalog používá i ve Foundations. Nejsou importované z balíčku Hugeicons, proto je neoznačovat jako oficiální Hugeicons SVG. Foundations zobrazuje malý výběr jejich reálných ukázek. V akčních tlačítkách používáme stejné ikony.

**Designový záměr:** 24×24 viewBox, velikosti použití 16 / 20 / 24 px, zaoblené line caps/joins, `currentColor`, přístupný popisek `aria-label` u čistě ikonových tlačítek.

**Budoucí krok, nikoliv aktuální implementace:** pokud a až přejdeme na React, zvážit instalaci `@hugeicons/react` + `@hugeicons/core-free-icons` a nahrazení provizorních SVG podle konkrétních ikon. Nepřidávat React jen kvůli ikonám. Pokud se přímo převezmou MIT SVG, uložit předepsané licenční oznámení.

### Foundations V1 · Accessibility, Breakpoints, Iconography Rules (24. 10. 2026)

**Stav: doplněno jako návrhové zásady v existujícím katalogu**, nikoliv formální certifikace nebo dokončená implementace všech budoucích komponent.

- **Accessibility (cíl WCAG 2.2 AA):** běžný text minimálně 4,5:1, velký text 3:1, relevantní netextové hranice a indikátory 3:1; viditelný klávesnicový focus, kontextové barvy pro error/warning/success, ovladatelnost klávesnicí, reduced motion. WCAG 2.2 AA má požadavek na cíle nejméně 24×24 CSS px nebo odpovídající prostorové výjimky; pro pohodlné dotykové ovládání **doporučujeme 44×44 px**. Současná S tlačítka mají 34px vizuální výšku, což samo o sobě nepotvrzuje splnění celé přístupnosti.
- **Breakpoints:** návrhové rozdělení Mobile 0–599, Tablet 600–1023, Laptop 1024–1439, Desktop 1440+ px. **Nejde o jednotné implementované breakpoints celé aplikace**. Dosud skutečné CSS: navigace katalogu pod 790 px, button grid pod 980 a 560 px. Budoucí obrazovky stavět mobile-first, flexibilní a bez nechtěného horizontálního overflow.
- **Iconography Rules:** Hugeicons Free Stroke Rounded je zvolený budoucí směr. V katalogu jsou prozatím vlastní inline SVG; 24×24 viewBox, velikosti 16/20/24 px, currentColor, zaoblené konce/spoje, pracovní stroke 1.8. Dekorativní ikona aria-hidden, ikonové tlačítko popsané aria-label. Nemíchat nahodile ikonové rodiny. React a Hugeicons npm balíčky **nejsou nainstalované**.
- Vše přidáno přímo do stávající sekce Foundations, bez nového frameworku, katalogu nebo povinné screenshotové gate. **Foundations V1 = dostatečný návrhový základ**, další pravidla rozvíjet dle skutečných komponent.

## 5. Tlačítka · Button System V1

- Velikost **S**, cca 34px výška; běžná tlačítka **pill**, ikonová **circle**.
- Styly: Primary, Secondary, Outline, Ghost, Destructive.
- Stavy: Default / Hover / Focus / Pressed / Disabled / Loading.
- Destructive má červený focus od `--error`, nikoli fialový. Styly se mají měnit **přímo v existujícím zdrojovém pravidle**, nikoli přidáním přepisovacích CSS patchů.
- Akce v katalogu: Stáhnout, Uložit, Smazat, Smazat vše, Nahrát, Přidat, Otevřít, Skrýt, Kopírovat, Upravit. Každá má textovou a kulatou ikonovou variantu. **Jde o vizuální demonstrace; nejsou propojené na skutečné akce aplikace.**
- Budoucí navigační položky řešit v sekci **Navigace**, nikoli automaticky jako další Button varianty.

### Jediný zdroj a renderer (24. 10. 2026)

- **Kanonické styly:** `components/button.css`. Jediný základ `.axo-btn` určuje sdílenou geometrii, border, radius, typografii a stavy; velikost S má jediný lokální parametr `--button-size:34px`. Kruhový formát z něj odvozuje šířku i výšku. Varianty, formáty a experiment mají pouze své rozdílové parametry; žádná nová CSS override vrstva ani `!important`.
- **Kanonický renderer:** `renderButton(config)` v `components/button.js`. Také loading používá tento renderer. Původní `makeButton`, samostatné HTML loading tlačítek a ručně složená tlačítka v akčních ukázkách byly odstraněny z `index.html`. Ten pouze načítá komponentu a umisťuje její `buttonsHTML`; globální přepínač tématu ani Foundations se neměnily.
- Config: `label`, `variant` (`primary`, `secondary`, `outline`, `ghost`, `destructive`), `size` (pouze `s`), `format` (`text`, `icon-text`, `icon-only`), `state` (`default`, `hover`, `focus`, `pressed`, `disabled`, `loading`), volitelný `icon`, `iconPosition`, `motion`, `tooltip`, `tooltipId`, `ariaLabel`, `title` a explicitní experiment `concept:"reveal-fill"`. `icon` přijímá důvěryhodné SVG/obsah katalogu, není to sanitizer externího HTML. Labely, tooltipy a atributové hodnoty renderer escapuje. Nepodporovaná velikost/varianta/formát/stav se odmítne; **M/L nejsou implementované**.
- Disabled používá skutečný atribut `disabled` a nemá hover/pressed efekt ani animaci akční ikony. Loading má `aria-busy`, přístupný název a společný spinner (13 px / 15 px pro Icon Only); zachovává dosavadní demonstrační blokování pointer událostí. Hover/Focus/Pressed v configu vytvářejí demonstrační třídy, zatímco reálné interakce dál ovládají CSS pseudotřídy.
- `motion` se aktivuje pouze pro Icon Only. Deset stávajících akcí zachovává své pohyby; Smazat/Smazat vše používají pouze víko se skutečným pantem. Textové akce zůstávají statické. Animace nyní patří přímo Buttonu s `data-action`, nejsou závislé na umístění v `.action-pair`. U nově sjednoceného použití je animace stále explicitně volitelná.
- Volitelný vlastní tooltip sdílí jeden renderer i CSS, nese `role=tooltip`, unikátní ID a vazbu `aria-describedby`; Icon Only má vždy přístupný název. Akční ukázky zachovávají všech deset tooltipů při hoveru i keyboard focusu bez nativního `title`. Stavové kruhové ukázky si ponechávají své původní jednoduché titulky; automatické tooltip ID je dostupné pro další konfigurace.
- **Katalog:** 01 · Button Variants (všech pět variant a šest stavů), 02 · Button Formats (Text / Icon + Text / Icon Only a všechny kruhové stavové ukázky), 03 · Action Examples (deset akcí v obou provedeních), 04 · Hover Concepts (jen neschválený Reveal Fill). Nevznikl nový katalog ani Playground.
- **Reveal Fill:** generuje jej stejný renderer a sdílí geometrii `.axo-btn`, ale má explicitní lokální modifier `reveal-fill` pro dosavadní borderless podklad, odlišný padding/gap, fontový line-height, gradient 02 a animaci. Jeho žádoucí odlišnosti nejsou druhou implementací Buttonu ani novou podobou běžného Primary. Zůstává návrhem ke schválení. Reduced motion vypíná jeho přechody; disabled neodhaluje gradient.
- Nejde o framework nebo produkční knihovnu. Není přidán React, TypeScript, Vite, nové varianty, M/L, napojení na API ani skutečné destruktivní akce. `components/button.js` obsahuje i malé konfigurační generátory katalogových ukázek; nevznikla další vrstva abstrakcí.
- **Ověření V1:** cílené kontroly v Chromium prošly v dark/light pro všechny varianty/formáty, šest stavů, disabled bez efektů, loading, tooltip hover/focus, všech deset akčních animací a statické textové ikony, červený destructive focus, reduced motion i Reveal Fill včetně pressed. Porovnání původních 81 tlačítek na šířkách 1440 a 360 px nezjistilo rozdíl ve sledovaných vykreslených rozměrech, barvách, borderech, typografii a stavových filtrech; Reveal nově dědí `min-height` ze základu při zachování stejné skutečné výšky. Dočasná změna jediného `--button-size` na 38 px ovlivnila všechna použití včetně Reveal a rozměrů kruhu, po kontrole vráceno na 34 px. Ověřena i volitelná animace mimo obal Action Examples, názvy a vazby tooltipů. Mobil bez horizontálního overflow; prohlédnut aktuální desktop/mobil. Bez JavaScriptových výjimek; `node --check` a `git diff --check` prošly. Do repozitáře nepřibyl testovací framework, screenshotová baseline ani auditní infrastruktura.

Příklady konfigurace:

```js
renderButton({label:"Uložit",variant:"primary",format:"text"});
renderButton({label:"Stáhnout",variant:"secondary",format:"icon-text",icon:actionIcon("download")});
renderButton({label:"Smazat",variant:"destructive",format:"icon-only",icon:actionIcon("trash",true),motion:"trash",tooltip:"Smazat"});
```

## CSS pravidlo · závazné od 24. 10. 2026

**Nepřidávat CSS override vrstvy.** Neopravovat původní komponentu tím, že se na konec CSS souboru připojí nový selektor přebíjející starý. Každou opravu provést přímo ve vlastním původním pravidle nebo tokenu. Každá CSS komponenta má mít jeden srozumitelný zdroj definice.

**Audit katalogu 24. 10. 2026:** v `index.html` byly nalezeny pozdější druhé bloky `:root` a `:root[data-theme="light"]` s Foundations tokeny. Ty jsou nyní sloučeny do jediného původního dark a light bloku. Speciální destructive hover nyní určuje lokální parametr varianty ve společném Button CSS; SVG pravidlo pro Foundations zůstává v sekci Foundations. Provedena kontrola párování CSS složených závorek a unikátních tokenových bloků. **Bez nové CSS vrstvy a bez změny výsledných hodnot.** Nejde o tvrzení automatického browser/a11y auditu každého vizuálního stavu.

**Legitimní CSS kaskáda není zakázaná:** tematické hodnoty dark/light, stavové selektory `:hover`, `:focus-visible`, `:disabled`, varianty `.axo-btn--destructive` a cílené `@media` se liší záměrně. Jsou to součásti návrhu, ne záplaty. Zakázané je neřízené duplikování stejné komponenty nebo tokenu v pozdější vrstvě.

### CSS Cleanup & Code Quality · 24. 10. 2026

Kompletní kontrola zahrnula základní CSS, media queries, obě témata, Foundations, tlačítka, navigaci i inline styly v HTML a JS šablonách. Nálezy počítáme jako **9 skupin: 7 vyčištěných při prvním úklidu a 2 interakční odchylky opravené následnou cílenou opravou**; jednotlivé počty deklarací níže nejsou počtem samostatných vizuálních chyb.

**Provedený úklid bez záměrné změny designu:**

1. Odstraněno **24 identických deklarací** z light tématu: O2 Blue, sdílené sémantické aliasy a pět gradientů. Jejich jediným zdrojem je nyní základní `:root`; aliasy nadále vyhodnocují aktuální tematické barvy. Skutečně odlišné light barvy, původní paleta a stíny zůstávají.
2. Odstraněno **10 nepoužívaných pravidel**: `.type-title`, `.type-heading`, `.type-body`, `.type-caption`, `.radius-samples`, `.spacing-line`, `.spacing-line i`, `.fdn-type`, `.fdn-type:last-child`, `.fdn-type-label`. Konzumenti nebyli nalezeni ani ve zdrojových šablonách, ani při průchodu sekcemi katalogu.
3. Odstraněn neplatný shorthand `font:600 12px/1 inherit` v `.axo-btn`, který prohlížeč ignoroval. Rodinu dál dědí přes `button{font:inherit}`, platné velikosti, váha a line-height zůstaly.
4. Odstraněny nadbytečné `min-height:34px` a `line-height:1` z kruhové varianty; stejné hodnoty již určuje základní `.axo-btn`.
5. Odstraněny **oba `!important`** z Foundations reduced-motion pravidla. Jeho umístění a specificita stačí; odstraněno také zbytečné `animation:none` u ukázek, které nemají CSS animaci. Omezení přechodů zůstává, stejně jako samostatné reduced-motion pravidlo spinneru.
6. Opraven konflikt vlastnictví rozměrů `.radius-sample`: původní nevyužité 78×70 px byly vždy přepsány inline na 76×64 px. Výsledných **76×64 px** je nyní přímo v základním pravidle, inline zůstává pouze dynamický radius.
7. Statická váha tečky loga patří k `.brandmark span`; opakované focus ukázky používají místní `.fdn-demo.demo-focus` a error/selected modifikátory vedle původní komponenty. **Počet zdrojových míst se `style` klesl z 31 na 26** (počet míst v šablonách, nikoli vykreslených elementů).

**Záměrně zachováno:** opakované `.sidebar` a `.foot` upravují mobilní layout, `.axo-btn .spinner` respektuje reduced motion a `.axo-btn--circle .spinner` skutečně potřebuje jiné rozměry. Specifické SVG rozměry akčních tlačítek jsou oprávněnou variantou. Dynamické swatche, gradienty, typografické parametry, spacing, radius, border/shadow a velikosti ikon zůstávají inline. Také několik jednorázových místních rozestupů a obalů ukázek zůstává inline; jejich nahrazení samostatnými třídami by zde přidávalo další systém bez zjednodušení. Dokumentační tokeny bez přímého použití v komponentách nejsou mrtvé styly: zůstávají součástí Foundations. Statická kontrola nenašla opakované vlastnosti uvnitř jednoho pravidla; všech 83 kořenových tokenů má neprázdnou vypočtenou hodnotu.

**Final CSS Cleanup Fix · status `CLEAN` (24. 10. 2026):**

Dvě odchylky z výchozího commitu `5f3d3eb2aefc1efd5caabd97d8c0e0a382238ca2` jsou opravené:

- **Destructive Hover vs. Pressed:** destructive hover měl stejnou specificitu jako obecný active stav, ale následoval až po něm. Jeho existující pravidlo je nyní u společného hover pravidla, před pressed pravidlem. Enabled destructive má nadále červený podklad, hover `brightness(1.05)` a červený focus přes `--focus-error`; při stisku vyhrává `brightness(.9)` a posun o 1 px. Ostatní enabled varianty si ponechávají své hodnoty.
- **Disabled Hover:** původní Outline/Ghost hover selektory, simulační `.demo-hover`/`.demo-pressed` selektory tlačítek a Foundations hover/active selektory nyní obsahují `:not(:disabled)`. Enabled efekty zůstávají funkční, disabled zachovává barvu, opacity i pozici. Skutečný atribut `disabled` a HTML/JS šablony zůstaly beze změny.

Cílené ověření v Chromium nejprve reprodukovalo obě chyby a po opravě prošlo v dark/light: skutečná sekvence myši Hover → Pressed → Hover → Default u textového i kruhového destructive, červený focus, disabled + hover/active u všech pěti variant v obou tvarech a disabled Foundations. Ověřeno i potlačení demonstračních hover/pressed tříd při současném `disabled` a zachování enabled stavů ostatních variant. Bez JavaScriptových výjimek; `git diff --check` prošel. Kořenové tokeny i HTML/JS šablony jsou totožné s výchozím commitem. V rozsahu těchto dvou oprav nezůstává známý problém. Bez nové testovací infrastruktury, screenshotové baseline nebo celoprojektového auditu.

**Trvalé pravidlo proti CSS override vrstvám nadále platí:** upraveny původní selektory a pořadí existujícího pravidla, žádná nová opravná vrstva, duplicitní selektor ani `!important`.

Ověření prvního úklidu (před cílenou opravou výše): dočasné porovnání v Chromium prošlo bez rozdílů ve sledovaných vizuálních CSS vlastnostech, rozměrech a kořenových tokenech před/po úklidu. Zahrnulo dark/light, Foundations, Tlačítka a prázdnou sekci, šířky 1440/981/980/791/790/561/560/390 px, hover, focus-visible, pressed, disabled, loading i reduced motion. Přechody byly dokončeny a spinner porovnán ve stejné fázi; nejde o pixelový audit. Funkční kontrola prošla pro render všech variant, přepnutí a obnovení tématu, červený destructive focus, disabled/loading i mobilní menu, Escape a zavření menu po navigaci. Konzole bez JavaScriptových výjimek. Dvě ponechané interakční odchylky byly potvrzeny na původní i upravené verzi. Prohlédnuty aktuální mobilní light Foundations a desktopové dark Tlačítka; ve zkontrolovaném rozsahu nebyla zjištěna nová viditelná regrese. `git diff --check` prošel. Nevznikla testovací infrastruktura, screenshotová baseline, framework ani nový release workflow. Nejde o úplný audit přístupnosti nebo všech prohlížečů.

### Table Pagination · oprava plovoucího menu (25. 10. 2026)

- Předchozí oprava zavírání menu při scrollování nestačila; uživatelka stále viděla útvar pod patičkou. V Navigaci už bylo správné odebrání `.canvas`, nejde o příčinu problému.
- Nabídka počtu řádků nyní nepoužívá `popover="manual"` ani top layer. Jde o běžné pevně pozicované menu s atributem `hidden`, které při uzavření nebo výměně obsahu skutečně zmizí. Přímo ve stávající CSS definici je stav `.page-size-list[hidden]{display:none}`. Zůstává výběr počtu řádků, rozestupy, klávesnice a zavírání při scrollování.
- Změny pouze v `components/pagination.js`, `components/pagination.css` a aktualizaci verzí assetů v `index.html`. Žádné CSS override vrstvy. Veřejné vizuální ověření není k dispozici.

### Oprava Table Pagination popover při scrollování (25. 10. 2026)

- Screenshot konce stránky ukazoval pravděpodobně otevřenou plovoucí nabídku Table Pagination mimo původní komponentu. Při scrollování stránky nebo viewportu se nyní výběr počtu řádků zavře místo toho, aby dál plaval nad jinou částí stránky. Zachované otevření, volba, klávesnice i ostatní navigační prvky. Změna pouze v původních event listenerech `components/pagination.js`, bez CSS override vrstev. Přímé vizuální ověření veřejného deploymentu neproběhlo.

### Notebook Dock · skutečná magnification jako React Bits (25. 10. 2026)

- Předchozí řešení stále nebylo podobné referenci: jen roztahovalo slot a škálovalo tlačítka. Nyní se skutečně animuje **velikost dlaždic i šířka jejich layoutu** podle vzdálenosti kurzoru, s Gaussovým poklesem pro sousední položky a tlumenou spring fyzikou přes requestAnimationFrame. Výchozí rozměr 50 px, maximální cíl 70 px, vliv cca 105 px, gap 10 px; na mobilních šířkách základ 40 px. Nejde o převzetí React komponenty, projekt zůstává bez knihoven.
- Animace, layout i reduced motion upraveny přímo v `components/dock.css` a `components/dock.js`, bez CSS override vrstev. Tooltipy, badge, vybraný stav a stávající demo navigace zachovány. Výsledek čeká na vizuální potvrzení.

### Notebook Dock · úprava rozestupů (25. 10. 2026)

- Podle screenshotu a reference React Bits bylo zvětšování ikon příliš namačkané. Zvětšeny mezery i vnitřní padding v původní definici `components/dock.css`.
- Magnification v `components/dock.js` nyní roztahuje skutečnou šířku položky v layoutu (60 až 81 px) a vlastní tlačítko škáluje jen jemně (max. 1.13×, zdvih 9 px). Sousední ikony tím dostávají více prostoru. Menší obrazovky mají kompaktnější rozsah.
- Tooltips, badge, aktivní položka a reduced motion zachovány; bez override vrstev. Dock nadále čeká na vizuální schválení.

### Notebook Dock V2 · zaoblený focus bez čtverce (25. 10. 2026)

- Globální `button:focus-visible` způsoboval při ovládání Docku klávesnicí hranatý outline kolem celé interaktivní oblasti. Přímo v kanonických pravidlech `components/dock.css` dostává `.axo-dock-item` odpovídající border-radius a `.axo-dock-item:focus-visible` ruší pouze vnější globální outline; čitelný **fialový zaoblený focus ring na `.axo-dock-face` zůstává zachovaný**. Žádná změna magnification, aktivního stavu nebo jiných komponent. Žádné CSS override vrstvy.

### Notebook Dock V2 · Primary Focus (25. 10. 2026)

- **Oprava po testu:** původní úprava ovlivnila pouze `:focus-visible`, nikoliv výběr myší. Nyní také `aria-pressed="true"` používá `--primary` jako plné pozadí, `--primary-foreground` pro ikonu a fialový border. Kliknutí i klávesnicový focus mají konzistentní primární vizuál. Upraveno v původních stavových selektorech, bez override vrstev.

- Klávesnicový `:focus-visible` na dlaždici Docku nyní používá plné pozadí `--primary` (primární fialová), `--primary-foreground` pro kontrast ikony a stejně fialový border/outline. Hover a active, fyzika magnification i ostatní navigační komponenty beze změn. Upraveno přímo v kanonickém pravidle `components/dock.css`, bez CSS override vrstev.

## Navigation · Notebook Dock V2 · React Bits Motion Fidelity (25. 10. 2026)

- **Stav: Notebook Dock V2 · Návrh ke schválení.** Existující `10 · Notebook Dock` v sekci Navigace, stále izolované demo pro budoucí Notebook, nikoli skutečná navigace aplikace. Osm původních akcí, vlastní inline SVG, aktivní fialová položka/indikátor, tooltipy, badge Úkoly, notifikační tečka Poznámky a oddělovač před Košem zachovány. Barvy nadále z Foundations a globálního dark/light, bez palety React Bits.
- **Reference:** uživatelkou dodaný kompletní zdroj [React Bits Dock](https://reactbits.dev/components/dock). Jeho matematika a rozdělení layoutu byly převedeny do vanilla JS, bez Reactu, Motion, Framer Motion nebo dalších závislostí. Původní gaussovské zvětšování, měření středů měnících se dlaždic a dvojí vertikální posun byly odstraněny.
- **Parametry:** bottom, baseItemSize 50, magnification 70, distance 200, panelHeight 68, gap 10, roundness 0.5; spring mass 0.1 / stiffness 150 / damping 12. Panel je stále viditelný (autoHide false), popisky, indikátory i badge zapnuté. Zaoblení panelu/dlaždice se odvozuje z base a roundness podle reference; stávající Axo povrchy, ikony a stavové barvy zůstávají.
- **Magnification:** referenční středy se počítají pouze ze základních velikostí, mezery a oddělovače, relativně ke stálému středu Docku. Cíl `base + (peak-base) * cos(reach*π/2)²` pro reach < 1, jinak base; reach je vzdálenost kurzoru od referenčního středu dělená distance. Animované rozměry jednotlivých položek nejsou vstupem výpočtu vzdálenosti.
- **Spring:** převzata referenční integrace `v=(v+h*k*(target-size))/(1+h*c+h*h*k)`, `size+=v*h`, kde k=stiffness/mass a c=damping/mass; časový krok max. 1/30 s a podkroky alespoň 240 Hz. Po opuštění myší a bez keyboard focusu návrat na base. `requestAnimationFrame` se zastavuje po ustálení; žádný souběžný CSS transition/animation pro rozměry nebo scale. Při novém renderu/opuštění sekce se ruší RAF, ResizeObserver a lokální listenery.
- **Panel / Item / Tile:** panel má pevnou výšku 68 px (na úzké ploše proporcionálně zmenšenou), spodní hranu a střed. Tlačítko Item řídí skutečnou šířku/výšku místa v layoutu; vnitřní Tile má základní rozměr a škáluje se od levého horního rohu přesně do tohoto místa. Zarovnání položek ke spodní hraně způsobí růst nahoru. Panel může růst vodorovně, nikdy podle výšky dlaždic. Hover pás nad panelem přebírá referenční princip souvislé oblasti pro pohyb mezi vyvýšenými položkami.
- **Responzivita:** ResizeObserver sleduje dostupnou šířku plochy po odečtení paddingu. Jeden fit faktor násobí base, peak, distance, gap, panel, padding i doprovodnou geometrii. Žádný horizontální scroller. **Vědomá odchylka:** reference rezervuje jen base délku + jedno zvětšení a omezuje fit minimem 0.4. Zde je rezervováno současné zvětšení sousedů: maximum statické kosinusové obálky po nejvýše 1px intervalech s konzervativní rezervou odvozenou z maximální derivace. Fit není omezen 0.4, takže i osm položek na 320px viewportu zůstane celé v dostupné ploše. Velikost se nepřepočítává podle právě běžícího hoveru.
- **Přístupnost:** nativní tlačítka s názvy, aria-pressed, aria-describedby a tooltipy, viditelný focus z `--focus`, původní Tab/Enter/Space a navíc referenční šipky vlevo/vpravo a Home/End. Focus z klávesnice umí zvětšit vybranou položku. **Vědomá odchylka:** reduced motion nevykresluje ani okamžité zvětšení jako reference, ale drží base pro myš i klávesnici, bez poskakování. Změna systémového nastavení se respektuje za běhu. Nové click bounce, kontextová menu, auto-hide a jiné orientace nebyly do této opravy přidány.
- **Ověření:** Chromium, dark/light, šířky 1440 / 800 / 360 / 320 px. Panel na desktopu trvale 68 px, spodní hrana neměnná; při rychlých přejezdech žádné překrytí dlaždic ani přetékání Docku, správné kosinusové cíle a návrat do klidu. Ověřeny Tab, šipky, Home/End, Enter/Space, focus tooltip/outline, reduced motion včetně změny za běhu a opuštění/návrat sekce. Průběh springu byl v 150 časových krocích porovnán s původní tick funkcí přílohy; rozdíl vykreslených velikostí pod 0.01 px (reference vynechává zápisy se stejným zaokrouhlením na setiny). Prohlédnuty aktuální desktop/mobil i mezikroky růstu, přejezdu a návratu. Jde o kontrolu dodané matematiky a místní animace, nikoli tvrzení vizuální identity s běžící React aplikací.
- **Limity kontroly:** na 320 px mají původní karty Pagination vlastní cca 12px horizontální overflow, potvrzený také na výchozím `main`; tato oprava je nemění. Cloudové Chromium nedůvěřovalo proxy certifikátu Google Fonts, proto finální kontrola s Geist používá stejné fontové soubory stažené přes nakonfigurovaný proxy s ověřením TLS a předané pouze do dočasné browser session; kód/fontové URL katalogu se neměnily. Finální kontrola bez JavaScriptových výjimek i chyb konzole, bez testovací infrastruktury či screenshotové baseline.
- **Izolace:** kanonické `components/dock.js` a `components/dock.css`, v `index.html` pouze cache verze těchto dvou assetů. Stepper, Pagination, Tabs, Breadcrumbs a Foundations beze změn. Žádné CSS override vrstvy ani `!important`; odstraněny zastaralé mobilní styly a starý magnification engine.

## Navigation · Stepper V1 (25. 10. 2026)

- Na základě uživatelkou schválené vizuální ukázky přidány tři příklady v sekci `#navigation`: **07 Navigation Stepper** (klikací 4 kroky, Zpět / Pokračovat), **08 Progress Stepper** (neklikací postup), **09 Stepper Error State** (chybový krok).
- Jediná kanonická vizuální definice v `components/stepper.css`, jediný společný `stepperSteps()` pro oba módy v `components/stepper.js`; navigační ovládací tlačítka přes existující `renderButton()`. Žádné dodatečné CSS override vrstvy, nové balíčky ani změny ostatních komponent.
- Stavy completed / active / upcoming / error, dokončené kroky s fajfkou, aktivní krok fialový, barvy z Foundations. Přístupná tlačítka s `aria-current="step"`, klávesnice a focus. Lokální demo, nespojeno s nástroji.
- **Stav:** Stepper V1 návrh ke schválení v katalogu; použitá podoba byla uživatelkou předběžně schválena v konverzační ukázce.

## Navigation · Pagination (24. 10. 2026)

- Tři interaktivní katalogové varianty: Numbered, Compact a Table. Tabulková varianta umožňuje přepínání počtu řádků.
- Jde o ukázku s lokálními daty, bez napojení na reálnou tabulku či API.
- Jediný vlastník stylů: `components/pagination.css`; chování: `components/pagination.js`; `index.html` komponentu pouze načítá a umisťuje do Navigace. Žádné přepisovací CSS vrstvy.
- Sdílí dark/light a barevné tokeny Foundations. Katalogová demonstrace, nikoli produkční integrace.

### Pagination Visual Fix (24. 10. 2026)

- Číselná tlačítka původně přebírala horizontální padding `12px` textových ovládání; dvouciferná hodnota tak měla přibližně 39×34 px. Samostatná varianta `.page-btn--number` nyní určuje šířku 34 px, `aspect-ratio:1 / 1`, nulový padding a pevný flex basis bez smršťování. Výška zůstává 34 px ze základního pravidla. Číslice jsou vycentrované, původní gap 7 px a sdílené stavové styly zůstávají. Compact a textová ovládání Table tuto variantu nepoužívají.
- Table výběr počtu řádků nyní používá tlačítko s hodnotou a vlastním inline SVG chevronem. Symetrický padding `--space-3` (12 px), mezera `--space-2` (8 px), radius `--radius-sm`, výška 34 px. Hodnoty Foundations se neměnily.
- Nativní select i jeho původní CSS a change handler byly nahrazeny vlastním single-select listboxem. Trigger má `aria-haspopup`, `aria-expanded`, `aria-controls` a přístupné jméno obsahující popisek i hodnotu. Listbox má vlastní popisek, skutečný DOM fokus a `aria-activedescendant`; položky mají `role=option`, `aria-selected`, vybraná check ikonu a aktivní položka viditelný focus z `--focus`. Šipky, Home/End mění aktivní položku; Enter/Space potvrzují, Escape zavírá a vrací fokus. Tab/Shift+Tab opouštějí nabídku a zavírají ji bez pasti na fokus. Kliknutí mimo, opětovný klik na trigger i změna sekce nabídku zavřou. Volba 10/20/50 přepočítá total a rozsah záznamů, vrátí stránku na 1 a fokus na trigger.
- Panel používá nativní Popover API s vlastním Catppuccin CSS v horní vykreslovací vrstvě prohlížeče. Není ořezaný rodičovským overflow; poloha se přizpůsobuje viewportu, podle místa nad/pod triggerem a při scrollu/resize. Při odscrollování triggeru mimo viewport se zavře. Použití předpokládá moderní prohlížeč s Popover API; bez nové UI knihovny či polyfillu.
- Cíleně ověřeno v Chromium v dark/light na šířkách 1440 a 360 px: kruhy včetně stránky 18, aktivní a disabled hranice, výběr všech tří velikostí, rozsah 51–93 při velikosti 50 na stránce 2, klávesnice včetně Tab/Shift+Tab, Escape, návrat fokusu, toggle/outside click, panel nad triggerem u spodního okraje a panel pod ořezávajícím rodičem. Prohlédnut aktuální desktop dark a mobilní light vzhled; bez JavaScriptových výjimek. `node --check` a `git diff --check` prošly. Bez screenshotové baseline či nové testovací infrastruktury; nejde o úplný audit screen readerů nebo všech prohlížečů.
- Styly mají jediného vlastníka v `components/pagination.css`: upraveny příslušné původní definice, nová pravidla listboxu jsou jednou vedle ostatních pravidel Table. Žádná CSS override vrstva ani `!important`. `index.html`, Foundations, sekce Tlačítka a navigace katalogu zůstaly v tomto úkolu beze změny.

## Navigation · Tabs & Breadcrumbs (24. 10. 2026)

- **Hover refinement:** Underline Tabs nemají na hover pozadí, zvýrazňuje se pouze text a spodní linka fialovou. Breadcrumbs mají na hover čitelný text `--ink`, neutrální plochu `--surface-2` a jemné fialové podtržení. Úprava provedena přímo v původních pravidlech `components/navigation-extras.css`, žádné override vrstvy.


- **Pill Tabs** a **Underline Tabs** jsou interaktivní katalogové komponenty se stavem selected, navázaným demonstračním panelem a podporou kláves Home/End/šipek, focus a dark/light.
- **Breadcrumbs** mají běžnou hierarchickou variantu a kompaktní ukázku delší cesty. Zatím jde o ukázkové odkazy, nikoliv napojení na router skutečné aplikace.
- Kanonické styly pro tyto nové prvky žijí v `components/navigation-extras.css`, chování v `components/navigation-extras.js`; `index.html` je pouze načítá a zobrazuje v sekci Navigace. Žádné CSS override vrstvy.
- Stránkování zůstává oddělené v `components/pagination.css` a `components/pagination.js`.

### Tlačítka · Reveal Fill (návrh ke schválení, 24. 10. 2026)

- V sekci Tlačítka přibyla jediná izolovaná interaktivní ukázka **Primary · Reveal Fill**. Jde o návrh hoveru, **není schválenou výchozí podobou Primary**.
- Výchozí podklad využívá `--accent-bg`, hover plynule odhaluje existující `--gradient-2` za 400 ms; tlačítko nemá border (focus outline zůstává). Zachována velikost S, kapslový radius, focus a reduced motion.
- Styly jsou součástí jediného bloku experimentu v `components/button.css`; společný renderer a `.axo-btn` poskytují základ, lokální modifier zachovává odlišný efekt. Běžné Primary a ostatní varianty efekt nepřebírají. Žádné CSS override vrstvy.

### Hover animace kulatých akčních ikon (24. 10. 2026)

- Jen kulatá ikonová tlačítka: Stáhnout posun dolů 2 px, Nahrát nahoru 2 px, Uložit rotace 8°, Přidat rotace 90°, Otevřít diagonální posun 2 px, Skrýt rotace −8° a jemné ztlumení, Kopírovat posun doprava 2 px, Upravit rotace 12°.
- Kulaté Smazat a Smazat vše zachovávají pouze dříve schválenou animaci víka; textové varianty se nemění. Tooltipy a přístupné popisky se zachovávají.
- Příslušné hover/focus selektory jsou v jediném bloku `components/button.css`, rozlišení podle `data-action` z volitelného `motion` v rendereru. Mají podmínku `:not(:disabled)`. Bez CSS override vrstvy. Animace využívají `--duration-normal` / `--ease-standard` a respektují reduced motion.

### Tooltip u ikonových akčních tlačítek (24. 10. 2026)

- Všech deset kulatých akčních tlačítek má jednotný tooltip s názvem akce, který se zobrazuje při hoveru i keyboard focusu. Pro Smazat / Smazat vše zůstávají ikony i animace beze změn.
- Tooltip je jednoduché sdílené pravidlo `.action-tooltip` a `.action-tooltip-wrap` v `components/button.css`, generované pomocí `renderButton` v `components/button.js`; není to nový CSS override. Zůstává `aria-label` a doplněno `aria-describedby`. Nativní `title` odstraněn, aby nevznikaly dva tooltipy.
- Používá barvy, radius, motion a vrstvy Foundations; respektuje reduced motion. Jde o katalogový vzor, nikoli hotovou univerzální overlay komponentu pro celou budoucí aplikaci.

### Akční tlačítka · Animovaný koš (24. 10. 2026)

- **Textová Smazat / Smazat vše:** obě používají shodný čistý statický symbol z `actionPaths.trash`. Z původní statické varianty `trashAll` odstraněn nadbytečný diagonální tah připomínající druhé víko; samostatná duplicitní definice už není potřeba. Textová tlačítka nemají animovanou skupinu víka. Přístupné názvy zůstávají odlišné, barva a SVG velikost 15 px se nezměnily.
- **Kulatá Smazat / Smazat vše:** vlastní SVG s jedinou skupinou víka, stejné tělo koše a velikost SVG 16 px uvnitř tlačítka 34×34 px. Původní `fill-box/right center` otáčel víko kolem středu jeho pravého bounding boxu, nikoli skutečného pantu; při 35° horní tahy opouštěly SVG viewBox a ořezávaly se. Víko má nyní symetrické konce x=4 a x=20 a skutečný pant (20,6) určený pomocí `transform-box:view-box` a `transform-origin:20px 6px`. Otevírá se jemně o **14° za 300 ms**, bez zmenšení celé ikony, nového obalu nebo overflow hacku.
- Hover a keyboard focus otevírají víko, po opuštění těchto stavů se zavírá. Disabled víko neotevírá. Destructive červený focus, původní button stavy a `prefers-reduced-motion` zůstávají: reduced motion vypíná přechod, stav se mění bez plynulého pohybu.
- Cíleně ověřeno v Chromium v dark/light: obě textové ikony jsou statické a čisté; oba kruhy mají 34×34 px v default/hover/focus/pressed i disabled. Vzorkování SVG cest včetně tloušťky tahu v koncových stavech i během otevírání ověřilo, že neopouštějí viewBox ani kruh tlačítka. Skutečný pohyb myši ověřil otevření i zavření. Zkontrolován červený focus, disabled a reduced motion, prohlédnut zvětšený aktuální vzhled v obou tématech. Bez JavaScriptových výjimek; `git diff --check` prošel. Bez screenshotové baseline či nové testovací infrastruktury.
- Kanonické SVG definice jsou nyní v `components/button.js`, pravidla víka v `components/button.css`; ostatní komponenty a Foundations tokeny zůstávají beze změny. Žádné CSS override vrstvy, duplicitní styly ani `!important`. SVG je vlastní inline implementace, nikoli import Hugeicons.

### Primary styly · schválená sada (24. 10. 2026)

- **Primary 01 Classic:** výchozí styl.
- **Primary 02 Reveal Fill:** volitelný efekt s Gradientem 02.
- **Primary 03 Animated Border:** volitelný efekt nepřetržitého animovaného borderu.
- Všechny varianty používají jediný `renderButton(config)` s volitelným `concept` a společné základy Button V1. Nejde o nové komponenty ani samostatné implementace. Zatím žádné další efekty nevytvářet.

### Primary 03 · Animated Border (24. 10. 2026)

- **Stav:** vizuálně schválená volitelná varianta Primary 03 v sekci Primary Styles. Nezaměňovat s výchozím Primary 01 ani schválenou Primary 02 / Reveal Fill.
- **Reference:** https://21st.dev/community/components/s/button?preview=%2F%40shadcnspace%2Fcomponents%2Fbutton-33 . Uživatelka následně dodala přímo React zdroj reference. Současná vanilla CSS implementace přebírá jeho princip nepřetržitě rotujícího gradientu s průhlednými úseky a vnitřní krycí plochou; nejde o instalovanou React komponentu.
- **Barvy:** `--accent` dark `#8C00FF` + nová `--detail-magenta: #D10062`; nová barva je ve Foundations v dark i light. Zbylá paleta beze změn. Detail Magenta je doplňkový akcent, **nenahrazuje stavovou Error**.
- **Implementace:** sdílený `renderButton(config)` v `components/button.js` podporuje koncept `animated-border`, CSS vlastní `components/button.css` u dalších Primary konceptů. Hrana využívá rotující pseudo-element `::before` s průhlednými úseky `conic-gradient`, vnitřní plochu `::after`, vlastní text nad oběma vrstvami a periodu 2,5 s **nepřetržitě**, nikoli jen při hoveru. `@property` se již nepoužívá. Barvy zůstávají `--accent` a `--detail-magenta`; bez další knihovny nebo duplicitního rendereru. Respektuje reduced motion.
- **CSS zásada:** žádné override vrstvy, žádné `!important` a žádná změna ostatních Button stylů.

### Sdílený hover Secondary / Pill Tabs (24. 10. 2026)

- Podle schválené Compact Pagination převzaly **Secondary** textové i kulaté ikonové Button S při hoveru pozadí `--accent-bg` a border `--border-hover`. Default, focus, pressed, disabled a ostatní varianty zachované. Hover filtr Secondary je vypnutý, aby se zachovaly přesné tokenové barvy.
- **Pill Tabs:** při hoveru neaktivní položky používají stejnou barevnou kombinaci; aktivní záložka zůstává ve svém selected stylu. **Underline Tabs** nadále používají pouze fialový text a podtržení bez hover pozadí.
- Změněna pouze původní stavová pravidla v `components/button.css` a `components/navigation-extras.css`, bez CSS override vrstvy či dalších tokenů.

### Akční tlačítka · sjednocení Secondary (24. 10. 2026)

- Akce **Otevřít** a **Upravit** byly původně nakonfigurovány jako `outline`, proto vizuálně neodpovídaly Stáhnout, Nahrát a Kopírovat. Obě akce nyní používají `secondary` ve společném seznamu `actions` v `components/button.js`. Textové i kulaté formáty automaticky sdílejí stejný styl a hover. Žádné CSS změny ani override vrstvy.

### Dropdown spacing refinement (24. 10. 2026)

- Na základě screenshotů uživatelky zvětšen vnitřní prostor **Select / Dropdown** a **Table Pagination** menu: Select menu padding 9 px, volby min. 47 px s horizontálním paddingem 15 px; Table Pagination menu padding podle `--space-2`, min. šířka 104 px, volby min. 43 px s paddingem 10 × 12 px. Poslední doladění: +1 px výšky položky u obou menu. V reakci na téměř neviditelný rozdíl přidána také mezera 3 px mezi položky přímo do kanonických menu definic (display:grid;row-gap:3px), bez CSS override vrstev.
- Zachovány současné hover, focus, selected stavy a ovládání. Změny pouze v kanonických definicích `components/form-controls.css` a `components/pagination.css`, žádné override vrstvy ani `!important`.

### Tool Form Controls V1 · první návrhy (24. 10. 2026)

- Sekce **Inputy a formuláře** zahrnuje nové živé ukázky **Select / Dropdown**, **Checkbox / Radio** a **Switch / Toggle** pro pracovní nástroje. Není to přihlašovací ani registrační formulář.
- **Select:** vlastní dropdown v designu Axo 02, centrovaná SVG šipka, vlastní nabídka formátů WebP / PNG / JPEG / AVIF, hover, selected, focus a disabled. Ovládání myší a klávesnicí (šipky, Enter, Escape), bez nativního systémového menu. Aktualizace 24. 10. 2026; čeká na vizuální potvrzení.
- **Checkbox / Radio:** nezávislé přepínače zahrnutí podstránek a assetů, exkluzivní volba Fráze / Asset ID / Regulární výraz; stav disabled.
- **Switch:** vizuální přepínač s nativním `input type="checkbox" role="switch"`, focus a disabled.
- Ukázky jsou funkční lokálně a vypisují zvolený stav, ale **nespouštějí reálné nástroje**. Vizuální schválení uživatelem zatím neproběhlo.
- **Vlastnictví stylů:** pouze první a jediné definice v `components/form-controls.css`; interakce v `components/form-controls.js`, integrace v `index.html`. Globální dark/light, sémantické tokeny, žádné override vrstvy ani `!important`. Respektuje reduced motion.

### Inputs V1 · délka, klidnější hover a psaný placeholder (24. 10. 2026)

- **Šířka:** URL i Search používají `width:100%;max-width:520px`. V katalogu jsou kratší; budoucí kontejnery mohou určit ještě menší šířku, aniž by se kopírovala komponenta. Nejde o fixní velikost pro všechny budoucí obrazovky.
- **Search border:** rotace má stálou periodu 4,5 s v default, hover i focus; hover zesiluje tloušťku a vizuální sytost úseků gradientu, nikoliv rychlost. Focus zachovává vnější animovanou hranu a vnitřní fialový border.
- **Search placeholder:** lokální JS střídá čtyři ukázkové fráze o hledání textu, obrázků a assetů pomocí efektu psaní. Při focusu/psaní animace přestane zasahovat do pole; při opuštění prázdného pole pokračuje. Systémový reduced motion zobrazí statický text. Skutečné vyhledávání zatím není implementováno.
- **Zdroje:** změněny původní `components/inputs.css` a `components/inputs.js`, bez CSS override vrstev nebo nové infrastruktury.

### Inputs V1 · vizuální doladění (24. 10. 2026)

- **URL Input:** ikona Globe (web) místo Link. Hover i focus uvnitř pole přebarvují Globe na `--accent`; URL input má na hover/focus skutečný 2px `--border-hover` a pevnou celkovou výšku 43 px. Copy a výběr ukázkových karet odděluje jemný divider. Jejich ikony mají vlastní mikroanimaci (copy malý posun, tabs malé natočení) a popisky při hoveru i focusu; nativní `title` odstraněn. Ovládání výběru karet zůstává pouze lokální demo.
- **Search Input:** výchozí rotující gradient zachován, na hover se zesílí gradientová hrana (3px a širší barevné segmenty). Ikona lupy se barví na `--accent` při hoveru a focusu. Při focusu je gradient vnější 4px prstenec a **vnitřní** 2px fialový focus border na `.input-search-inner`, nikoli další vnější jednobarevný outline.
- **Udržovatelnost:** změněny původní definice v `components/inputs.css` a `components/inputs.js`, žádné nové CSS override vrstvy, tokeny a ostatní komponenty beze změny. Dark/light a reduced motion zachovány. Skutečný browser audit celé přístupnosti neproběhl.

### Inputs V1 · první dva návrhy (24. 10. 2026)

- **URL Input:** editovatelné pole typu `url`, ikonka odkazu, kopírování přes Clipboard API a dropdown s výběrem tří lokálních ukázkových karet. **Katalog nemá browser extension ani oprávnění získat reálné otevřené karty**; dropdown tuto schopnost pouze demonstruje. Bez napojení na aktivní kartu.
- **Search Input:** vstup typu `search`, ikona lupy a stále animovaná fialovo-růžová hrana analogická schválené Primary 03; používá `--accent`, `--detail-magenta`, `--surface` a `prefers-reduced-motion`. Zatím **nehledá ve skutečných datech**.
- **Kanonické soubory:** `components/inputs.css` pro styly a `components/inputs.js` pro zobrazení a lokální ovládání. V `index.html` pouze napojení, žádné přepisovací CSS vrstvy.
- Oba návrhy přebírají globální dark/light a Foundations; ovládání menu zahrnuje Escape, šipky a klik mimo. Další formulářové prvky se zatím nevytvářely.
- **Stav:** návrhy do katalogu k vizuálnímu schválení, nikoli hotová produkční implementace browser tabs nebo vyhledávání.

### Dialogs & Popovers V1 (24. 10. 2026)

- První pracovní příklady: **Confirm Dialog** (potvrzení smazání bez skutečné destruktivní akce), **Information Dialog** (vysvětlení omezení skenu) a **Action Popover** (uložení, kopírování, odebrání, vše jen demo). Stav: k vizuálnímu schválení.
- Dialogy používají nativní HTML `<dialog>` a `showModal()`, podporují Escape, správnou modalitu a focus prohlížeče. Popover je vlastní malá nabídka s kliknutím mimo a Escape; akce pouze přepisují lokální demo zprávu.
- Oba vzory používají **stávající `renderButton()`** ze společného Button System V1; nezavádí se druhá implementace tlačítek. Kanonické styly v `components/overlays.css`, chování v `components/overlays.js`, napojení na sekci `#overlays` v `index.html`.
- Semantické barvy z Foundations, globální dark/light, bez CSS override vrstev a `!important`. Reálné tool operace se neprovádějí.

### Inline Notices · návrat k původnímu V1 (25. 10. 2026)

- Uživatelka odmítla Premium Soft redesign jako neodpovídající vizuálnímu stylu Axo 02. **Původní Inline Notices V1 byly obnoveny beze změn**, včetně ikon a popisků.
- Další redesign Inline Notices je **odložen, dokud uživatelka nepřinese vlastní nápad**. Nic dalšího zde bez nového zadání nenavrhovat.
- Zpětný návrat je přímo v kanonických definicích `components/feedback.css` a `components/feedback.js`, žádné CSS override vrstvy. Ostatní Feedback komponenty zůstaly beze změn.

### Feedback & Status V1 (25. 10. 2026)

- Nové katalogové ukázky pro pracovní nástroje: **Inline Notices** (info, success, warning, error), **Progress / Processing** (simulace kontroly 120 URL s možností zastavení), **Status Badges** (čeká, dokončeno, s omezeními, chyba), **Empty State** (žádný výskyt) a **Toast** (neblokující oznámení).
- Interakce používají lokální demonstrační data, nespouštějí žádné skenování ani ukládání. Dialogs & Popovers V1 uživatelka výslovně schválila.
- Nové soubory: `components/feedback.css` (jediné kanonické definice stylů) a `components/feedback.js` (ukázky a lokální stavy), napojené do `#feedback` v `index.html`. Tlačítka zůstávají přes jediný sdílený `renderButton()`.
- Stavy používají barevné role Foundations; dark/light a reduced motion, bez CSS override vrstev a `!important`. **Vizuální schválení Feedback V1 ještě neproběhlo.**

## Logo V1 · Animated Orbital Identity (25. 10. 2026)

- **Stav: V1 · Návrh ke schválení.** Značka je pouze v existující sekci `#logo`, nenahrazuje dosavadní značku v sidebaru ani jiné části katalogu.
- **Originální asset:** `assets/axo-head.png`, přímo z dodaného ZIPu, 1774×887 px, RGBA s průhledností. Bajty jsou shodné s originálem (SHA-256 `75785d2783fdcab6394efa7d16975ebd5d75acc1890b9d9c229a8658982b1703`). Bez překreslení, retuše, ořezu, převodu nebo zásahu do proporcí, očí, úsměvu či žaber. PNG se při vykreslení pouze proporcionálně zmenšuje přes `<img>`.
- **Jedna komponenta:** `renderLogo({size:120,animated:true,label:"Axo 02"})` v `components/logo.js`, kanonické styly `components/logo.css`. `size` je kladná číselná velikost v px, předaná lokálním `--axo-logo-size`; `animated:false` nechá stejný znak statický. Komponenta funguje i mimo katalogové obaly. Přístupné jméno nese vnější `role=img`, vnitřní PNG je dekorativní s prázdným alt.
- **Konstrukce:** kruhový samostatný pseudo-element s gradientem, nehybný kruhový střed o 92 % rozměru a nehybné vystředěné PNG o 88 % šířky středu s přirozeným poměrem stran 2:1. Logo nemá vnější čtvercovou plochu, stíny, glow, 3D ani nové obrysy hlavy.
- **Barvy:** gradient používá výhradně `--accent` (dark `#8C00FF`, light existující `#8839EF`), `--detail-magenta` (`#D10062`) a `--o2-blue` (`#0050FF`). Střed je v obou tématech pevně `#1e1e2e`, tedy existující tmavá hodnota Background z Foundations; nezávisí na světlé hodnotě `--bg`. Žádné nové globální barevné tokeny nebo změna palety. Srovnávací prezentační plochy používají existující dark/light Background a Text hodnoty.
- **Motion:** pouze gradientní pseudo-element se nepřetržitě otáčí o 360° za 6 s, lineárně. Střed a hlava nemají transformaci ani animaci; bez blikání, pulzování nebo zrychlování. `prefers-reduced-motion:reduce` všechny oběhy vypne, explicitní Static je bez animace vždy.
- **Katalogové ukázky:** 01 · Logo Default (120 px), 02 · Logo Sizes (32 / 48 / 64 / 96 / 120 px), 03 · Dark / Light (stejné logo na obou plochách), 04 · Motion (Animated a Static). Jde o deset instancí jediné komponenty, nikoli různé návrhy loga.
- **Ověření:** v Chromium prošly dark/light na šířkách 1440 a 320 px, načtení a přirozené rozměry originálního PNG u všech instancí, kruhový tvar, požadované velikosti a centrování bez deformace. Ověřena změna transformace okraje v čase při stabilní poloze hlavy, šestisekundová lineární smyčka, statická varianta, tmavý střed v obou tématech, reduced motion a použití komponenty mimo galerii. Mobil bez horizontálního overflow, bez JavaScriptových výjimek. Soubor podávaný přes HTTP je bajtově shodný s PNG ze ZIPu. `node --check` a `git diff --check` prošly; cílená vizuální kontrola desktop/mobil, bez screenshotové baseline či nového testovacího systému.
- **Izolace:** v `index.html` přibylo pouze načtení CSS/JS a obsluha/popis sekce Logo. Zbytek indexu je oproti výchozímu `main` nezměněný; Buttons, Navigation, Inputs, Feedback a Foundations se neupravovaly. Nové definice jsou pouze v jediném komponentovém CSS, bez override vrstev, duplicitních základů, `!important`, nových závislostí či build systému.

## 6. Pravidla spolupráce a vývoje

1. **Design-first:** nejdřív konkrétní zadání, rychlá vizuální úprava, publikace katalogu, zpětná vazba.
2. **Žádný Playground, nové laboratoře ani paralelní katalogy.**
3. **Žádné pixel-perfect baseline, 96 screenshotů, production-grade QA či schvalovací release gate pro designové experimenty.** Kontrolovat základní funkčnost, příslušnou komponentu a dostupnost náhledu.
4. **Čisté úpravy, trvalé pravidlo:** měnit původní CSS/JS definici, **nikdy nepřidávat nové přepisovací CSS bloky na konec**. Legitimizované hover/focus, varianty a @media zůstávají v místě vlastníka. Žádné patchové vrstvy nebo kopie komponent.
5. **Jednotný dark/light:** nové komponenty používají existující role; globální toggle mění vše.
6. **Žádná migrace ze starého Axolotl 2.0 automaticky.** Případné převzetí konkrétní části vyžaduje samostatné rozhodnutí.
7. **Dokument aktualizovat při každé významné změně.** Vždy rozlišovat IMPLEMENTOVÁNO / SCHVÁLENO / PLÁN. Nikdy neoznačovat neexistující framework za nainstalovaný.
8. Produkční aplikace, extension a rigorózní integrační QA přijdou až po samostatném budoucím rozhodnutí.

## 7. První budoucí kroky

- Foundations V1 jsou návrhově připravené; jejich pravidla dále upřesňovat pouze podle reálných komponent a přístupnost průběžně ověřovat.
- Pokračovat v návrzích tlačítek a poté navigace, inputů, karet a overlays.
- Výběr skutečných SVG z Hugeicons Free a podmínky MIT jsou budoucí implementační krok.
- React/TypeScript/Vite nejsou aktuální povinnost ani dokončená práce.
- Až se začne vytvářet **skutečná aplikace**, odděleně rozhodnout o architektuře a testech.

## Další prvky V1 · Scrollbar a Cursor Studio (25. 10. 2026)

- **Primary Violet Scrollbar:** lokální ukázka `--accent` scrollbar se zaoblením a hoverem v sekci `#other`, bez globálních změn.
- **Schválené efekty v Cursor Studiu:** **Click Burst**, **O2 Bubble**, **O2 Shimmer**, **Magnetic Cursor**. Zachovány stávající přepínače a implementace, efekty zůstávají omezeny na testovací plochu.
- **O2 Bubble:** vlastní Canvas adaptace podle `bubbleCursor` od tholman/cursor-effects (MIT, https://github.com/tholman/cursor-effects); uživatelka schválila.
- **O2 Shimmer:** vlastní decentní mikrozáblesky inspirované https://custom-cursor.com/cursor-trails/sparkles-and-twinkles/glitter, bez kopírovaných assetů; uživatelka schválila.
- **Magnetic Cursor:** jemné přitahování demonstračního tlačítka v Cursor Studiu; uživatelka schválila.
- **Axo Cursor a Ambient Glow:** uživatelka je výslovně odmítla. Byly **odstraněny z katalogu i z CSS/JS**, odstraněn také nepotřebný asset `assets/axo-cursor.svg`. **Bez nového zadání je znovu nezavádět.**
- Kanonické soubory `components/other.css` a `components/other.js`; žádné CSS override vrstvy ani nové závislosti. Cards jsou stále odloženy; Logo V1 čeká na výslovné vizuální schválení.

## 8. Udržování dokumentu a Obsidian

**Kanonické umístění je tento Markdown soubor v repozitáři Axo-02.** Lze jej otevřít/editovat jako běžnou poznámku v Obsidianu po synchronizaci repozitáře nebo importu Markdown souboru.

Aby nevznikly dva soupeřící zdroje pravdy, **nekopírovat jej jako samostatně ručně editovaný master** do starého `axolotl-knowledge`. V existujícím Obsidian trezoru lze mít odkaz na tento GitHub dokument či čtenou kopii, ale při rozporu platí kanonický soubor v `Axo-02`.

> Udržovací pravidlo pro asistenty a Codex: před jakýmkoli úkolem v Axo 02 nejdřív přečíst tento dokument a aktuální kód, po změně aktualizovat pravdivý stav. Nedoplňovat testy ani infrastrukturu bez zadání.
