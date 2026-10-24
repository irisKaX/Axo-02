# Axo 02 · Source of Truth

> **Stav:** aktivní designový katalog. **Aktualizováno:** 24. 10. 2026.  
> **Závaznost:** Tento soubor je průběžný zdroj pravdy pro Axo 02. Po každé funkční, designové nebo architektonické změně aktualizovat příslušnou část ve stejném zadání a commitu, nebo bezprostředně navazujícím commitu. GitHub historie zachovává minulost; zde je vždy pouze aktuální stav.

## 1. Projekt a odkazy

- **Název:** Axo 02.
- **Repozitář:** https://github.com/irisKaX/Axo-02 (public, hlavní větev `main`).
- **Katalog:** https://iriskax.github.io/Axo-02/ (GitHub Pages).
- **Účel nyní:** kreativní designový katalog; **není to ještě produkční aplikace**.
- **Starý projekt:** Axolotl 2.0 a jeho repozitáře zůstávají nedotčené. Žádný starý kód sem nebyl migrován.
- **Publikování:** jeden jednoduchý GitHub Actions workflow `.github/workflows/pages.yml`. Push do `main` publikuje statický katalog; bez screenshotových/produkčních release bran.

## 2. Skutečná technologie (nyní)

- **HTML + CSS + vanilla JavaScript**, hlavní implementace v `index.html`.
- **Bez Reactu, Vite, TypeScriptu, npm závislostí a bundleru.** React ekosystém **není nainstalovaný**.
- **Globální dark/light:** proměnné v `:root` a `:root[data-theme="light"]`; změna režimu přepíná katalog i jeho komponenty; volba se ukládá do `localStorage`.
- **Písmo:** Geist načítaný přes Google Fonts, systémové fallbacky.
- **Ikony dnes:** jednoduchá **inline SVG napsaná přímo ve zdroji** (např. v akčních tlačítkách a jejich ukázkách ve Foundations). **Nejde o import Hugeicons**. Žádný icon package, žádný React wrapper.
- Dokumentace a ukázkové hodnoty ve Foundations nejsou automaticky komplexní produkční token knihovnou.

## 3. Obsah katalogu

| Sekce | Stav | Obsah |
| --- | --- | --- |
| Foundations | **Rozpracováno, funkční** | Palety, role, stavové barvy, O2 modrá, gradienty, Geist, typography/spacing/radius scale, borders/shadows, interactions, motion, opacity/blur, layout/layers, iconography, Accessibility, Breakpoints a Iconography Rules |
| Tlačítka | **Rozpracováno, funkční ukázky** | Velikost S, klasické kapslové a kruhové ikonové; Primary, Secondary, Outline, Ghost, Destructive; Default, Hover, Focus, Pressed, Disabled, Loading; deset akčních tlačítek |
| Navigace | **Rozpracováno** | Pagination (Numbered/Compact/Table), Tabs (Pill/Underline) a Breadcrumbs (plná/kompaktní ukázka). Další navigační komponenty zatím nejsou vytvořené. |
| Inputy a formuláře | **Prázdná sekce** | Návrh teprve vznikne |
| Karty | **Prázdná sekce** | Návrh teprve vznikne |
| Dialogs a popovers | **Prázdná sekce** | Návrh teprve vznikne |
| Feedback a status | **Prázdná sekce** | Návrh teprve vznikne |
| Logo | **Prázdná sekce** | Návrh teprve vznikne |
| Brand | **Prázdná sekce** | Návrh teprve vznikne |
| Loaders | **Prázdná sekce** | Návrh teprve vznikne |
| Další prvky | **Prázdná sekce** | Podle potřeby |

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

**Skutečný stav dnes:** několik **vlastních inline SVG** v `index.html`. Nejsou importované z balíčku Hugeicons, proto je neoznačovat jako oficiální Hugeicons SVG. Foundations zobrazuje malý výběr jejich reálných ukázek. V akčních tlačítkách používáme stejné ikony.

**Designový záměr:** 24×24 viewBox, velikosti použití 16 / 20 / 24 px, zaoblené line caps/joins, `currentColor`, přístupný popisek `aria-label` u čistě ikonových tlačítek.

**Budoucí krok, nikoliv aktuální implementace:** pokud a až přejdeme na React, zvážit instalaci `@hugeicons/react` + `@hugeicons/core-free-icons` a nahrazení provizorních SVG podle konkrétních ikon. Nepřidávat React jen kvůli ikonám. Pokud se přímo převezmou MIT SVG, uložit předepsané licenční oznámení.

### Foundations V1 · Accessibility, Breakpoints, Iconography Rules (24. 10. 2026)

**Stav: doplněno jako návrhové zásady v existujícím katalogu**, nikoliv formální certifikace nebo dokončená implementace všech budoucích komponent.

- **Accessibility (cíl WCAG 2.2 AA):** běžný text minimálně 4,5:1, velký text 3:1, relevantní netextové hranice a indikátory 3:1; viditelný klávesnicový focus, kontextové barvy pro error/warning/success, ovladatelnost klávesnicí, reduced motion. WCAG 2.2 AA má požadavek na cíle nejméně 24×24 CSS px nebo odpovídající prostorové výjimky; pro pohodlné dotykové ovládání **doporučujeme 44×44 px**. Současná S tlačítka mají 34px vizuální výšku, což samo o sobě nepotvrzuje splnění celé přístupnosti.
- **Breakpoints:** návrhové rozdělení Mobile 0–599, Tablet 600–1023, Laptop 1024–1439, Desktop 1440+ px. **Nejde o jednotné implementované breakpoints celé aplikace**. Dosud skutečné CSS: navigace katalogu pod 790 px, button grid pod 980 a 560 px. Budoucí obrazovky stavět mobile-first, flexibilní a bez nechtěného horizontálního overflow.
- **Iconography Rules:** Hugeicons Free Stroke Rounded je zvolený budoucí směr. V katalogu jsou prozatím vlastní inline SVG; 24×24 viewBox, velikosti 16/20/24 px, currentColor, zaoblené konce/spoje, pracovní stroke 1.8. Dekorativní ikona aria-hidden, ikonové tlačítko popsané aria-label. Nemíchat nahodile ikonové rodiny. React a Hugeicons npm balíčky **nejsou nainstalované**.
- Vše přidáno přímo do stávající sekce Foundations, bez nového frameworku, katalogu nebo povinné screenshotové gate. **Foundations V1 = dostatečný návrhový základ**, další pravidla rozvíjet dle skutečných komponent.

## 5. Tlačítka · aktuální stav

- Velikost **S**, cca 34px výška; běžná tlačítka **pill**, ikonová **circle**.
- Styly: Primary, Secondary, Outline, Ghost, Destructive.
- Stavy: Default / Hover / Focus / Pressed / Disabled / Loading.
- Destructive má červený focus od `--error`, nikoli fialový. Styly se mají měnit **přímo v existujícím zdrojovém pravidle**, nikoli přidáním přepisovacích CSS patchů.
- Akce v katalogu: Stáhnout, Uložit, Smazat, Smazat vše, Nahrát, Přidat, Otevřít, Skrýt, Kopírovat, Upravit. Každá má textovou a kulatou ikonovou variantu. **Jde o vizuální demonstrace; nejsou propojené na skutečné akce aplikace.**
- Budoucí navigační položky řešit v sekci **Navigace**, nikoli automaticky jako další Button varianty.

## CSS pravidlo · závazné od 24. 10. 2026

**Nepřidávat CSS override vrstvy.** Neopravovat původní komponentu tím, že se na konec CSS souboru připojí nový selektor přebíjející starý. Každou opravu provést přímo ve vlastním původním pravidle nebo tokenu. Každá CSS komponenta má mít jeden srozumitelný zdroj definice.

**Audit katalogu 24. 10. 2026:** v `index.html` byly nalezeny pozdější druhé bloky `:root` a `:root[data-theme="light"]` s Foundations tokeny. Ty jsou nyní sloučeny do jediného původního dark a light bloku. Speciální destructive hover byl přesunut vedle definice destructive varianty, SVG pravidlo do sekce Foundations. Provedena kontrola párování CSS složených závorek a unikátních tokenových bloků. **Bez nové CSS vrstvy a bez změny výsledných hodnot.** Nejde o tvrzení automatického browser/a11y auditu každého vizuálního stavu.

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

- **Pill Tabs** a **Underline Tabs** jsou interaktivní katalogové komponenty se stavem selected, navázaným demonstračním panelem a podporou kláves Home/End/šipek, focus a dark/light.
- **Breadcrumbs** mají běžnou hierarchickou variantu a kompaktní ukázku delší cesty. Zatím jde o ukázkové odkazy, nikoliv napojení na router skutečné aplikace.
- Kanonické styly pro tyto nové prvky žijí v `components/navigation-extras.css`, chování v `components/navigation-extras.js`; `index.html` je pouze načítá a zobrazuje v sekci Navigace. Žádné CSS override vrstvy.
- Stránkování zůstává oddělené v `components/pagination.css` a `components/pagination.js`.

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

## 8. Udržování dokumentu a Obsidian

**Kanonické umístění je tento Markdown soubor v repozitáři Axo-02.** Lze jej otevřít/editovat jako běžnou poznámku v Obsidianu po synchronizaci repozitáře nebo importu Markdown souboru.

Aby nevznikly dva soupeřící zdroje pravdy, **nekopírovat jej jako samostatně ručně editovaný master** do starého `axolotl-knowledge`. V existujícím Obsidian trezoru lze mít odkaz na tento GitHub dokument či čtenou kopii, ale při rozporu platí kanonický soubor v `Axo-02`.

> Udržovací pravidlo pro asistenty a Codex: před jakýmkoli úkolem v Axo 02 nejdřív přečíst tento dokument a aktuální kód, po změně aktualizovat pravdivý stav. Nedoplňovat testy ani infrastrukturu bez zadání.
