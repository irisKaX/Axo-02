# AXO-02 · práce s designovým katalogem

Projekt je pouze Design System katalog. Composition Lab a Widget Studio jsou katalogové experimenty; nejsou hotový Dashboard, aplikace ani aplikační prototyp.

## Design workflow

- Před návrhem, implementací nebo vizuální kontrolou čti `.agents/skills/axo-design-guardian/SKILL.md`, `docs/SOURCE-OF-TRUTH.md` a kanonické zdroje dotčené komponenty.
- Jediná designová autorita je stávající katalog a jeho zdroj pravdy. `DESIGN.md` a `PRODUCT.md` jsou pouze vstupní odkazy pro nástroje; nevytvářej v nich druhou paletu ani pravidla.
- Frontend Design a Impeccable jsou projektové skills v `.agents/skills/`. Jejich obecné estetické preference nejsou oprávnění měnit Geist, tokeny, schválené komponenty či katalogové demo stavy.
- Nejdřív návrh: existující komponenta, rozdíl, soubory, stavy, ověření. Implementuj až v rámci uživatelem schváleného zadání. Výslovný pokyn k implementaci je autorizace daného rozsahu; nevyžaduj opakované potvrzení.
- Před novou komponentou hledej existující renderer a CSS pomocí `rg`. Žádné kopie komponent, CSS override vrstvy, opravné selektory na konci souboru ani `!important`.
- Vizuální testy jsou vývojové nástroje, nikoli build katalogu. Běží přes `npm run design:test`; postup a limity: `docs/DESIGN-WORKFLOW.md`.
- Neaktualizuj screenshotové reference jen proto, aby test prošel. Zkontroluj diff a dolož zamýšlenou změnu. Reference současného stavu neznamená vizuální schválení designu.
- Rozlišuj instalované soubory, skutečně spuštěné nástroje a neověřené automatické integrace. Jestli runtime skill nezobrazuje, přečti jeho konkrétní `SKILL.md` přímo; netvrď, že tím byl aktivován nativní plugin nebo hook.

## Bezpečnost tohoto setupu

Změny design workflow drž v samostatné větvi. Neměň vzhled ani existující runtime soubory, nevytvářej aplikační obrazovky, nemaž komponenty či tokeny. Nepushuj do `main`, nemerguj a nenasazuj. Stávající Pages workflow se nemění. Každé pozdější publikování vyžaduje výslovné zadání.
