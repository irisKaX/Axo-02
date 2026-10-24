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
| Navigace | **Prázdná sekce** | Návrh teprve vznikne |
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
