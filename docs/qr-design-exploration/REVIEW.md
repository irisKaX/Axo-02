# QR Small · critique, layout, audit a polish

## Postup a nezávislost

Použit projektový AXO-02 Design Guardian a původní Frontend Design. Impeccable `context` skutečně načetl projektové adaptéry; použity jeho playbooky audit, critique, layout a polish. Nejde o tvrzení, že nativní Codex Web hook nebo automatické načítání skills funguje. Zvolený směr zachovává existující AXO identitu, nikoli obecné preference upstream nástroje.

Před návrhem proběhly dvě izolované kontroly: A hodnotila skutečné dark/light vykreslení bez znalosti detektoru; B nezávisle měřila geometrii, klávesnici, export a mechanický sken. Každá použila vlastní browser/context. A byla dokončena před syntézou B. Následovalo skutečné vykreslení a samostatné závěrečné vizuální i mechanické review.

## Výchozí nález

- Původní widget:320 ×280, QR120×120, dvě34px ikonové akce vedle něj. QR má nad a pod sebou přibližně80px volného místa, ale viditelný cílový kontext zcela zmizí.
- P1 návrhový problém: váha QR neodpovídá hlavnímu účelu výsledku; zůstává podvyužitá plocha.
- P1 návrhový problém: nelze na první pohled ověřit cíl před exportem.
- P2: plus vyžaduje rozpoznání/hover pro význam Nová URL.34px splňuje24px AA minimum cíle, ale není44px komfortní dotyková velikost; neoznačujeme to za automatické porušení WCAG.
- P2 mechanický nález: Enter skryje původní fokusované pole; focus zůstane BODY, Tab ho obnoví na stažení. Není to trap. Původní widget se v tomto zadání nemění.
- Původní PNG se skutečně stáhlo a nezávisle dekódovalo, reset a přístupné názvy fungovaly, konzole bez chyb. Původní izolovaný statický detektor byl bez nálezů; nebyl to důkaz vizuální kvality nebo kontrastu.

Nielsen skóre původního výsledku (A): status2, real-world match3, control2, consistency3, prevention2, recognition1, efficiency3, minimalism2, recoveryN/A, help2 = **20/36**. Jde o omezený designový úsudek nad konkrétním výsledným stavem, nikoli certifikaci celého katalogu.

## Výsledek návrhu

A je vystředěná sekvence, B artefakt se samostatnou utility zónou a C asymetrický kontext s oddělenou horní/spodní akcí. Nejde pouze o změnu barvy nebo o jinak velký stejný cluster. Nezávislé design review doporučilo A pro obecné použití, C pro důraz na cílovou adresu a B pro maximální velikost QR.

Polish opravil dvě skutečné lokální odchylky pouze v Labu:

1. B v light režimu ztrácela oddělení bílé plochy a footeru. Doplněn1 px divider z existujícího `--border` přímo v kanonických pravidlech varianty.
2. Text popisků na světlém pozadí Labu měl s `--muted` poměr4,37 :1. Použit stávající `--ink`, bez nové barvy.11 px úvodní caption zvýšen na12 px. Původní globální tokeny se neměnily.

Závěrečný opakovaný vykreslený Impeccable/CDP scan potvrdil odstranění těchto kontrastních a tiny-text nálezů v obou tématech. Zůstal pouze `overused-font` pro Geist (engine exit2). Tento obecný estetický nález je v rozporu s výslovně danou typografií AXO-02; nebyl potichu potlačen ani použit jako důvod měnit font. Nový statický layout scan vrátil0nálezů/exit0.

Code review potvrdilo reuse controlleru, bezpečné textContent/escapování a izolaci od produkčních zdrojů. Zachytilo chybu cesty bez závěrečného lomítka; lokální server nyní přesměruje na kanonickou cestu a tento případ je součástí testů.

## Stav a limity

Po posledním polish a opravě směrování celá závěrečná sada prošla: **58 testů,0 selhání,0 přeskočených** (44původních +14Lab). Důkazy ve screenshotových souborech jsou skutečné browser PNG, nikoli Image Gen či dekorativní makety. Digitální dekódování ověřuje obsah SVG a PNG, ne fyzickou kameru.

**Status: exploration implemented for user review; no variant approved.**

Questions skipped: uživatel výslovně zadal tři varianty a jejich hranice. Výběr finální podoby zůstává na uživateli; žádný merge ani produkční deployment se neprovádí. Původní critique snapshot zůstává otevřený, protože původní produkční widget záměrně zůstal nezměněný.
