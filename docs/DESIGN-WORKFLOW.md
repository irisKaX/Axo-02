# AXO-02 · Design Workflow

Projekt je **pouze Design System katalog**. Existující sekce Composition Lab a Widget Studio jsou katalogová pracovní prostředí, nikoli hotová aplikace, Dashboard nebo aplikační prototyp. Tento setup nepřidává obrazovky a nemění vzhled katalogu.

## Co je skutečně integrované

| Nástroj | Instalace v repozitáři | Ověření v tomto cloudu |
| --- | --- | --- |
| Frontend Design | Původní Anthropic Agent Skill, `.agents/skills/frontend-design` | Soubory odpovídají upstream SHA; ručně načten v agentním scénáři. Je to sada instrukcí, nikoli spustitelný plugin nebo renderer. |
| Impeccable | Původní Codex skill 4.8.0, npm CLI 4.8.0, engine 0.1.18 | Kontrolní součty; skutečný `context`, statický `detect` i detekce vykreslené stránky přes CDP. |
| AXO-02 Design Guardian | Vlastní projektový Agent Skill | Ověřen read-only scénářem společně s oběma upstream skills; respektuje existující renderer a designová rozhodnutí. |
| Playwright Test | Přesně 1.64.1 v `devDependencies` a lockfile | Skutečné screenshoty, interakce, čtyři kombinace téma/viewport a pixelové porovnání. |

Upstream původ a SHA všech skill souborů: `tools/design/skills-lock.json`. Apache-2.0 licence a Impeccable notices jsou zachované u kopií. Upstream soubory nejsou přepsané projektovými pravidly; jejich obecná doporučení mají menší váhu než aktuální zadání, katalog a `docs/SOURCE-OF-TRUTH.md`.

`.gitattributes` zachovává původní bajty těchto dvou upstream kopií včetně CRLF Windows launcheru. Výjimka z whitespace kontroly je omezená pouze na ně; vlastní Guardian, nástroje, testy a dokumentace ji nemají.

### Codex Web: přesné hranice

- V tomto spravovaném prostředí funguje terminálový Playwright, původní Impeccable engine a explicitní čtení projektových `SKILL.md`. Uživatel nemusí nic instalovat na svém počítači.
- `.agents/skills` je upstream distribuce pro Codex CLI a formát Agent Skills. **Automatické načtení těchto nově přidaných projektových skills v Codex Web nebylo potvrzeno**; runtime seznam executor skills byl prázdný. `AGENTS.md` proto přímo odkazuje na soubory. Explicitní načtení není vydáváno za aktivaci nativního pluginu.
- **Automatický Impeccable hook není nainstalovaný ani aktivní.** Tento Web runtime nenabízí jeho `/hooks` schvalování; samotný skill hlásí `MANUAL_DETECTOR_REQUIRED`. Detektor se spouští explicitně. Nejsou integrovány browser extension ani Impeccable Live editor.
- Přímé oficiální webové stránky dokumentace Codexu byly z tohoto prostředí blokované 403. Upstream README a distribuce byly ověřeny přes GitHub; Codex CLI podporu neprezentujeme jako důkaz automatické podpory Webu.
- `PRODUCT.md` a `DESIGN.md` jsou stručné odkazové adaptéry do jediného zdroje pravdy. Neproběhl plný Impeccable `init`/interview; `context` upozorňuje na chybějící aktuální product-record schema. Nevytváříme druhý designový master jen kvůli odstranění této hlášky.

## Spuštění v Codex cloudu

Setup příkazy pro prostředí připojené k tomuto repozitáři:

```sh
npm ci --ignore-scripts
npm run design:setup
npm run design:doctor
```

Vyžaduje Node >=22.18, npm, curl a Chromium. Instalace je projektová; žádné globální npm balíčky, uživatelské tokeny nebo přihlašování. `.npmrc` směruje npm cache do ignorovaného `.cache/`. `design:setup` propojí původní skill launcher s lokálním npm enginem a stáhne jen kontrolním součtem uzamčené fontové fixtures. Nemění runtime katalogu ani konfiguraci hostovaného cloudového prostředí.

**Browser zde:** systémový Chromium **154.0.8037.57**, Linux x64; Playwright 1.64.1 ho skutečně spouští. Playwrightem dodávaný Chromium 156 / revision 1248 **nebyl nainstalován**, protože `cdn.playwright.dev` v této síti vrací `403 Domain forbidden`. Nejde o náhradu Playwrightu: používá se původní Playwright se skutečnou volbou `executablePath`, pouze jiný browser binary.

V jiném prostředí lze použít podporovaný download:

```sh
npx --no-install playwright install chromium
```

Vyžaduje povolené download destinace a případné systémové knihovny. Při 403 neobcházej proxy; použij existující Chromium nebo nechej upravit síť prostředí. Volitelný `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/cesta/chromium` má přednost. Setup sám neinstaluje OS balíčky a neslibuje dostupnost browseru v novém cloudu; `doctor` ověří skutečný stav. Zvolený browser, plná verze a zdroj se zaznamenávají do reportu.

## Práce na komponentě

1. Načti `AGENTS.md`, `$axo-design-guardian` a zdroj pravdy. Pokud Web skill neobjeví, otevři přímo `.agents/skills/axo-design-guardian/SKILL.md`.
2. Pro návrh lze přidat `$frontend-design`; pro cílenou kritiku `$impeccable critique Search Input`. Při nedostupném nativním vyvolání přečti příslušný `SKILL.md` a uvedenou referenci. Nejprve návrh a reuse, pak implementace autorizovaného rozsahu. U návrhu/review se UI neupravuje.
3. Využij existující renderer, tokeny a kanonické CSS. Nový návrh neznamená automatické schválení. Žádné patch vrstvy nebo `!important`.
4. Spusť cílené kontroly, prohlédni screenshoty a zaznamenej limity. Publikování je samostatně autorizovaný krok.

Příklady zadání:

> Použij AXO-02 Design Guardian a Frontend Design. Navrhni úpravu spacingu Search Inputu podle katalogu. Zatím nic neimplementuj.

> Použij AXO-02 Design Guardian a Impeccable critique pro již vybranou komponentu. Vrať konkrétní nálezy; zachovej Geist, tokeny a schválené varianty.

Skutečný lokální kontext a detektor:

```sh
npm run design:context
npm run design:detect -- --json components/button.css
```

Výstup `context` je podklad pro agenta. Detektor neprovádí designové úpravy. Exit **0** znamená bez primárních nálezů, **2** nálezy, **1** selhání skenu. Nezaměňuj nálezy za nefunkční instalaci ani za oprávnění automaticky předělat katalog. Pro čisté JSON použij `npm run --silent design:detect -- --json ...`.

Pro browser detekci: spusť `node tools/design/server.mjs` a v dalším terminálu `npm run design:detect -- --viewport 390x844 http://127.0.0.1:4173/#inputs`. Engine používá nainstalované Chromium. Běžný URL sken nemusí mít stejné síťové/fontové podmínky jako uzamčené Playwright fixtures; nejsou to zaměnitelné výsledky. Ověřovací běh tohoto setupu použil původní `detect --cdp` nad stránkou připravenou skutečným Playwrightem s uzamčeným Geist.

## Screenshoty a stavy

```sh
npm run design:test
npm run design:screenshots
DESIGN_ROUTE=inputs DESIGN_SELECTOR='.input-search-shell' npm run design:screenshots
npm run design:visual
```

Test runner spouští vlastní statický server na `127.0.0.1:4173`; existující proces na tomto portu odmítne, aby netestoval jiný checkout. Server poskytuje jen katalogové runtime assety. Před testem proto ukonči samostatný server použitý pro Impeccable.

- **Projekty:** dark/light × desktop **1366×768** a mobile **390×844**, vždy 1 CSS pixel na device pixel.
- **Aktuální rozsah:** Primary se všemi šesti katalogovými stavy, Search Input, skutečný focus/hover/disabled u pěti Button variant, loading semantika, editace Inputu, theme toggle a cílená kontrola rozměrů/responzivity. Další komponenty přidávej cíleně, nevydávej tuto počáteční sadu za audit celého katalogu.
- Fonty pro browser testy jsou přesné fixtures původního Google Fonts požadavku; `tests/design/fonts-lock.json` uzamyká URL a SHA, bajty se cachují. Browser testy je poskytují pouze dočasně přes Playwright routing. Katalogové fonty se nemění. Reduced motion a screenshot `animations: disabled` stabilizují animované okraje; nevypovídají o kvalitě pohybu v čase.
- Screenshoty: `artifacts/design/<projekt>/component.png`, HTML report: `playwright-report/design/index.html`, failure screenshots, měření a traces: `test-results/design/`. Runtime výstupy jsou ignorované, nesmí nahrazovat verzované reference.
- Cílená kontrola Search Inputu potvrzuje jeho vlastní hranice; širší Inputs route má na mobilu **existující overflow skrytého URL tooltipu** (cca 408px dokument při 390px viewportu). Je zaznamenán jako `existing-catalog-finding` s naměřenými hodnotami v reportu. Setup ho neopravuje ani neoznačuje celou route za bezchybnou.

## Vizuální regrese

Osm počátečních PNG referencí v `tests/design/baselines/` zachycuje **současný nezměněný stav**, nikoli nové vizuální schválení. Názvy oddělují browser major, OS/architekturu, téma a viewport; plnou browser verzi zkontroluj v `doctor` a metadatech. Jiná verze browseru/fontů může mít odlišnou rasterizaci. Chybějící baseline musí selhat; není to čistý výsledek testu.

Při změně otevři expected/actual/diff v HTML reportu. Pokud jde o regresi, oprav implementaci. Pokud jde o autorizovanou vizuální změnu, po prohlídce:

```sh
npm run design:visual:update -- --approve
npm run design:visual
```

Bez explicitního `--approve` projektový update příkaz odmítne přepsání. Aktualizace referencí a designové schválení jsou různé věci. Nikdy automaticky nezvyšuj toleranci, nemaž baseline ani neaktualizuj snapshot jen proto, aby prošel. Pro novou komponentu doplň konkrétní locator a její relevantní stavy do `tests/design/catalog.spec.mjs`.

## Bez deploymentu

Větev `chore/design-workflow-setup` je oddělená od `main`. Setup nemění `index.html`, `components/`, `assets/` ani `.github/workflows/pages.yml`. Nevznikl automatický CI/deployment hook ani změna konfigurace Codex Web prostředí; uvedené setup příkazy jsou připravené k vložení do jeho setup nastavení, tato vzdálená konfigurace nebyla sama změněna.


## Ověřovací záznam setupu · 2. 11. 2026

- Cloud Node 24.19.0 / npm 11.9.0, Playwright 1.64.1, systémový Chromium 154.0.8037.57. Původní Impeccable 4.8.0 / engine 0.1.18 ověřen SHA-256.
- Počáteční Playwright sada: **20 prošlých kontrol**, osm pixelových referencí. Ručně prohlédnuty reprezentativní dark/desktop a light/mobile výstupy. Existující mobilní tooltip overflow je samostatný diagnostický nález, nikoli potichu opravený problém.
- Fontové fixtures přijímají pouze přesné URL z manifestu, včetně CSS požadavku na rodinu/váhy. Dočasný požadavek na jinou rodinu byl ověřeně odmítnut; nedojde k tichému nahrazení starým Geist.
- Negativní kontrola: dočasná změna barvy jednoho tlačítka pouze v browser DOM způsobila skutečné selhání porovnání (**1959 odlišných pixelů**). Testovací probe byl odstraněn; žádný runtime zdroj se neměnil. Update bez `--approve` byl skutečně odmítnut.
- Impeccable `context` načetl oba projektové adaptéry; statický sken `index.html components` vrátil **10 nálezů, z toho 8 primárních** (exit 2). Browser/CDP sken Buttons vrátil **35 nálezů, z toho 28 primárních** (exit 2). Nálezy zahrnují i obecné estetické heuristiky a záměrné katalogové ukázky; neznamenají automaticky potvrzené chyby. Katalog nebyl označen za bezchybný ani redesignován.
- Read-only agentní kontrola s původními skills a Guardianem zachovala původní renderer, Geist, tokeny, oddělení návrhu/implementace a zákaz deploymentu. Kontrolní scénář bez Guardianu také respektoval existující pravidla; není tvrzeno, že jediný scénář prokazuje zvýšení bezpečnosti nebo garantuje budoucí chování modelu.
- `git diff` potvrzuje nezměněný `index.html`, všechny `components/`, `assets/` a Pages workflow vůči výchozímu commitu `94b862c`.
