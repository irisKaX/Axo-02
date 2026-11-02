import {execFileSync} from 'node:child_process';
import {test,expect,catalog} from './fixtures.mjs';
// Baseline is the immutable merged source, not a newly generated screenshot reference.
const previous=execFileSync('git',['show','51daf280c9d086cba60c724d4468af8207a9c95a:components/dashboard-widgets.js'],{encoding:'utf8'});
async function presentation(locator){return locator.evaluate(root=>[root,...root.querySelectorAll('*')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,classes:e.getAttribute('class'),text:e.children.length?'':e.textContent,rect:{x:r.x,y:r.y,width:r.width,height:r.height},styles:Object.fromEntries([...s].map(k=>[k,s.getPropertyValue(k)])),value:e.value,checked:e.checked}}))}
async function stableShot(locator){let previous=await locator.screenshot({animations:'disabled'});for(let i=0;i<5;i++){const current=await locator.screenshot({animations:'disabled'});if(current.equals(previous))return current;previous=current}throw new Error('Composition did not settle to a stable rendered frame')}
test('Composition Lab keeps original widget appearance and behavior',async({page},testInfo)=>{
 const before=[],styles=[];
 const intercept=route=>route.fulfill({status:200,contentType:'text/javascript',body:previous});
 await page.route('**/components/dashboard-widgets.js*',intercept);await catalog(page,'composition');
 for(const selector of ['.composition-find','.composition-qr']){const bytes=await stableShot(page.locator(selector));before.push(bytes);styles.push(await presentation(page.locator(selector)));await testInfo.attach('before'+selector,{body:bytes,contentType:'image/png'})}
 const input=page.locator('.composition-qr input');await input.fill('https://example.com/unchanged');await page.locator('.composition-qr-entry .axo-btn').click();const result=await presentation(page.locator('.composition-qr'));
 await page.unroute('**/components/dashboard-widgets.js*',intercept);await page.reload();await page.evaluate(()=>document.fonts.ready);await page.mouse.move(0,0);
 for(const [i,selector] of ['.composition-find','.composition-qr'].entries()){const bytes=await stableShot(page.locator(selector));await testInfo.attach('after'+selector,{body:bytes,contentType:'image/png'});expect(await presentation(page.locator(selector)),selector+' exact DOM geometry and computed styles').toEqual(styles[i])}
 await page.locator('.composition-qr input').fill('https://example.com/unchanged');await page.locator('.composition-qr-entry .axo-btn').click();expect(await presentation(page.locator('.composition-qr'))).toEqual(result);
 await page.locator('.composition-qr-result .axo-btn--ghost').click();await expect(page.locator('.composition-qr input')).toBeFocused();
});
