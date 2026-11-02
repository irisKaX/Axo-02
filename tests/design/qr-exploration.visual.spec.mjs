import fs from 'node:fs';
import path from 'node:path';
import {test,expect} from './fixtures.mjs';
import {root} from '../../tools/design/runtime.mjs';

test('@capture QR exploration: all three compositions and states',async({page},testInfo)=>{
 await page.goto('/labs/qr-design-exploration/');await expect(page.locator('#qr-exploration')).toBeVisible();await page.evaluate(async()=>{await document.fonts.load('500 13px Geist');await document.fonts.ready});
 const theme=testInfo.project.use.colorScheme;const dir=path.join(root,'docs/qr-design-exploration/screenshots');fs.mkdirSync(dir,{recursive:true});
 for(const state of ['empty','filled','result']){
  for(const variant of ['a','b','c'])await page.locator(`[data-qrx-study="${variant}"] [data-qrx-state="${state}"]`).click();
  for(const variant of ['a','b','c']){
   const widget=page.locator(`[data-qrx-study="${variant}"] .qrx-widget`);await expect(widget).toBeVisible();
   const screenshot=await widget.screenshot({animations:'disabled'});expect([screenshot.readUInt32BE(16),screenshot.readUInt32BE(20)]).toEqual([320,280]);fs.writeFileSync(path.join(dir,`${variant}-${state}-${theme}.png`),screenshot);await testInfo.attach(`${variant}-${state}-${theme}`,{body:screenshot,contentType:'image/png'});
  }
  await page.evaluate(()=>document.activeElement.blur());await page.screenshot({path:path.join(dir,`comparison-${state}-${theme}-1366x768.png`),animations:'disabled',fullPage:false});
 }
});
