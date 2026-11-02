# AXO-02 · Complete Widget System

**Implementováno k vizuálnímu schválení**, větev `feat/complete-widget-system`. Existující katalogová sekce `#widget-studio`, nikoli nová aplikace nebo Dashboard. Bez merge a deploymentu.

## Společná revize

V otevřeném katalogu přejděte na **Widget Studio → Celá knihovna → Výsledek**. Deset řádků ukazuje Small a Large vedle sebe. Jednotlivý nástroj lze otevřít samostatně nebo v porovnání. Globální přepínač katalogu mění Dark / Light bez ztráty obsahu.

- [Celá knihovna · Dark](widget-system/screenshots/dark/library.png)
- [Celá knihovna · Light](widget-system/screenshots/light/library.png)
- [Studio 1366 × 768 · Dark](widget-system/screenshots/dark/studio-1366x768.png)
- [Studio 1366 × 768 · Light](widget-system/screenshots/light/studio-1366x768.png)

Všechny snímky vznikají skutečným Chromium renderem při desktopovém viewportu **1366 × 768**, DPR 1, s připnutými soubory Geist. Snímky knihovny zachycují celou rolovací oblast. Náhledy se neškálují: Small **320 × 280**, Large **640 × 320 CSS px**. Na úzkém viewportu se posouvá pracovní plocha, nikoli samotná karta.

| Nástroj | Small | Large | Skutečně dostupná funkce |
| --- | --- | --- | --- |
| Metadata | [Dark](widget-system/screenshots/dark/metadata-small.png) / [Light](widget-system/screenshots/light/metadata-small.png) | [Dark](widget-system/screenshots/dark/metadata-large.png) / [Light](widget-system/screenshots/light/metadata-large.png) | Prototyp SERP a meta polí; nepřipojeno |
| Nadpisy | [Dark](widget-system/screenshots/dark/headings-small.png) / [Light](widget-system/screenshots/light/headings-small.png) | [Dark](widget-system/screenshots/dark/headings-large.png) / [Light](widget-system/screenshots/light/headings-large.png) | Prototyp souhrnu a hierarchie; nepřipojeno |
| Find Phrase | [Dark](widget-system/screenshots/dark/find-small.png) / [Light](widget-system/screenshots/light/find-small.png) | [Dark](widget-system/screenshots/dark/find-large.png) / [Light](widget-system/screenshots/light/find-large.png) | Původní editace, Asset / Fráze a demo dostupnosti; hledání nepřipojeno |
| Screenshot | [Dark](widget-system/screenshots/dark/screenshot-small.png) / [Light](widget-system/screenshots/light/screenshot-small.png) | [Dark](widget-system/screenshots/dark/screenshot-large.png) / [Light](widget-system/screenshots/light/screenshot-large.png) | HTML ukázka náhledu, nikoli skutečný snímek URL |
| Obrázky do WebP | [Dark](widget-system/screenshots/dark/webp-small.png) / [Light](widget-system/screenshots/light/webp-small.png) | [Dark](widget-system/screenshots/dark/webp-large.png) / [Light](widget-system/screenshots/light/webp-large.png) | Nativní výběr souborů a demo kvality; konverze nepřipojena |
| Obrázky z URL | [Dark](widget-system/screenshots/dark/images-small.png) / [Light](widget-system/screenshots/light/images-small.png) | [Dark](widget-system/screenshots/dark/images-large.png) / [Light](widget-system/screenshots/light/images-large.png) | Prototyp inventáře a formátů; nepřipojeno |
| PDF Scout | [Dark](widget-system/screenshots/dark/pdf-small.png) / [Light](widget-system/screenshots/light/pdf-small.png) | [Dark](widget-system/screenshots/dark/pdf-large.png) / [Light](widget-system/screenshots/light/pdf-large.png) | Prototyp seznamu dokumentů; nepřipojeno |
| QR Generator | [Dark](widget-system/screenshots/dark/qr-small.png) / [Light](widget-system/screenshots/light/qr-small.png) | [Dark](widget-system/screenshots/dark/qr-large.png) / [Light](widget-system/screenshots/light/qr-large.png) | **Funkční lokální QR, skutečné SVG a PNG, reset, Enter** |
| Strukturovaná data | [Dark](widget-system/screenshots/dark/structured-small.png) / [Light](widget-system/screenshots/light/structured-small.png) | [Dark](widget-system/screenshots/dark/structured-large.png) / [Light](widget-system/screenshots/light/structured-large.png) | Prototyp typů a JSON-LD; nepřipojeno |
| Trendy | [Dark](widget-system/screenshots/dark/trends-small.png) / [Light](widget-system/screenshots/light/trends-small.png) | [Dark](widget-system/screenshots/dark/trends-large.png) / [Light](widget-system/screenshots/light/trends-large.png) | Prototyp pořadí a grafu; bez datové služby |

## Návrhové rozhodnutí

Jedna rodina: hlavička bez dekorativních ikon, katalogové vstupy, `renderButton`, Geist, existující povrchy a tokeny. Small zobrazuje souhrn, Large přidává hierarchii, kontext, vlastnosti či graf ve druhé oblasti; nejsou to CSS scale kopie. Žádné nové barvy, gradienty ani varianty tlačítek.

QR Small přebírá **směr B** z `design/qr-small-exploration` (`0417d02`): bílá čtecí plocha, QR 184 px, samostatný spodní pás s cílem a akcemi. Pravý odstup používá existující 24px token, aby se dovnitř vešly i katalogové tooltipy. Large má čtecí plochu vlevo a kontext s textovými akcemi vpravo. Směr je vybraný; finální implementace stále čeká na vizuální schválení.

Demonstrační výsledky mají v každé kartě označení **Prototyp** a **Ukázková data · nástroj není připojen**. Akce „Ukázat výsledek“ načte pevnou ukázku, neanalyzuje zadaný web ani vybrané soubory. Výběr vlastního souboru pouze ukáže počet; soubory se nikam neposílají ani neuchovávají při přepnutí náhledu. Rozpracovaná URL/fráze, režim, dostupnost a demo kvalita se uchovávají v paměti podle nástroje/velikosti. Po obnovení stránky se drafty neobnovují.

Audit zdrojů našel pouze lokální QR encoder/export a demonstrační Find Phrase (`dashboard-widgets.js`); žádný crawler, screenshot backend, konvertor, parser PDF ani trendové API zde není. Registry nevytváří nové API, neprovádí síťové požadavky na zadané URL a nepředstírá propojení s nástroji.

## Registry a opětovné použití

Kanonické definice: `components/widget-registry.js`, `components/widget-system.css`. Studio chrome: `components/widget-studio.js/css`. Původní `dashboard-widgets.js` dále vlastní jedinou implementaci QR a původní ovládání Find Phrase; přidané volitelné selektory a `destroy()` dovolují nové kompozice bez kopie logiky. Původní markup a CSS Composition Labu zůstávají beze změny.

```js
const registry = window.AxoWidgetRegistry;
const definition = registry.get('qr');
const instance = definition.mount(hostElement, {
  size: 'small',
  state: { scenario: 'filled', query: 'https://example.com' }
});
const content = definition.getState(instance); // plain JSON data
const saved = { version: registry.version, id: definition.id, size: instance.size, state: content };
definition.setState(instance, { scenario: 'result' });
definition.destroy(instance); // idempotent, releases listeners and export URLs
```

Každý z deseti záznamů má `id`, `name`, `toolId`, `supportedSizes`, `defaultSize`, `states`, `capabilities`, `render`, `mount`, `getState`, `setState`, `destroy`. `render(options)` vrací HTML; skutečné chování a QR se připojí přes `mount(host,options)`. Host patří jedné instanci, kterou vlastník před odstraněním zničí. Automatická ID jsou jedinečná. Volitelné vlastní `instanceId` musí být jedinečné v dokumentu.

`getState` vrací kopii `{scenario,query,mode,ready,quality}`; neukládá DOM, File objekty, služby ani skryté časovače. `setState` přijímá částečnou změnu a validuje stav. Nepodporovaná velikost/stav/id vyvolá chybu. Po `destroy` zůstává poslední snapshot čitelný, změny jsou odmítnuté. Instance sdílí definici, nikoli vlastní stav. `widget:change` poskytuje `{id,size,state}` pro budoucího hostitele.

Capabilities výslovně rozlišují `execution: local | prototype`, `backendConnected`, `multipleInstances`, `resizable`, `serializable`, `download`, `fileInput`. Všechny kompozice umožňují více nezávislých instancí; reálné backendové limity budou řešeny až při připojení nástroje. `toolId` je stabilní katalogový identifikátor, nikoli existující API endpoint.

Budoucí Builder může podle metadat přidat/odebrat instanci, přesunout její host, znovu vytvořit instanci s jinou podporovanou velikostí a obnovit JSON snapshot. Pořadí, pozici a výchozí layout bude vlastnit Builder. **Drag & drop, ukládání uživatelského layoutu, reset layoutu ani produkční Dashboard nyní nejsou implementované.**

## Ověření a limity

Postup a výsledky: [WIDGET-SYSTEM-REVIEW.md](WIDGET-SYSTEM-REVIEW.md).

```sh
npm ci --ignore-scripts
npm run design:setup
npm run design:doctor
npm run design:test
```

Pro otevření katalogu: `node tools/design/server.mjs`, potom `http://127.0.0.1:4173/#widget-studio`. Server je pouze lokální vývojový náhled; zastavení Ctrl+C. Testy server spouštějí samy, proto jej před testy ukončete.

**Stav: implementováno pro společnou revizi. Vizuální schválení uživatelkou ani schválení backendové integrace není součástí tohoto výsledku.**
