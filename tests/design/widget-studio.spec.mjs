import fs from 'node:fs/promises';
import { test,expect } from './fixtures.mjs';
import { openWidget,scenario,stableSize,interactionSizes,decodeQr,decodeVisibleQr,widgetScenarios } from './widget-studio-helpers.mjs';

for(const size of ['small','large']){
 test(`Find Phrase ${size}: existing states, keyboard and fixed dimensions`,async({page},testInfo)=>{
  const preview=await openWidget(page,'find',size);
  const query=preview.getByRole('searchbox');const ready=preview.locator('.composition-find-ready');
  for(const state of widgetScenarios.find){
   await scenario(page,state);await stableSize(preview,size);
   await expect(query).toHaveValue(state==='asset'?'oneplay':state==='phrase'?'Online televize':'');
   await expect(preview.getByRole('radio',{name:state==='phrase'?'Fráze':'Asset',exact:true})).toBeChecked();
   await expect(ready).toHaveAttribute('data-ready',state==='unavailable'?'false':'true');
  }
  await scenario(page,'empty');await query.fill('Kontrola existující komponenty');
  await preview.getByRole('radio',{name:'Asset',exact:true}).focus();await page.keyboard.press('ArrowRight');
  await expect(preview.getByRole('radio',{name:'Fráze',exact:true})).toBeChecked();await expect(query).toHaveAttribute('placeholder','Hledat frázi…');
  await expect(query).toHaveValue('Kontrola existující komponenty');await page.keyboard.press('Tab');await expect(query).toBeFocused();
  await page.keyboard.press('Tab');await expect(ready).toBeFocused();await page.keyboard.press('Space');await expect(ready).toHaveAttribute('data-ready','false');
  await stableSize(preview,size);await interactionSizes(page,preview,'find',size);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  testInfo.annotations.push({type:'limitation',description:'Find Phrase has no search backend or result view. Tested editing, mode, demo availability and existing input interaction previews only.'});
 });

 test(`QR Generator ${size}: actual QR, PNG, reset and fixed dimensions`,async({page},testInfo)=>{
  const preview=await openWidget(page,'qr',size);const input=preview.getByRole('textbox',{name:'URL pro QR kód'});
  const generate=preview.getByRole('button',{name:'Generovat',exact:true});
  for(const state of widgetScenarios.qr){
   await scenario(page,state);await stableSize(preview,size);
   await expect(preview.locator('.composition-qr')).toHaveAttribute('data-qr-stage',state==='result'?'download':state==='valid'?'generate':'paste');
   if(state==='result'){await expect(preview.locator('.composition-qr-pattern svg')).toBeVisible();await expect(preview.locator('.composition-qr-heading')).toBeHidden()}
   else if(state==='valid')await expect(generate).toBeEnabled();else await expect(generate).toBeDisabled();
  }
  await scenario(page,'empty');
  for(const invalid of ['není-url','javascript:alert(1)','ftp://example.com/file']){await input.fill(invalid);await expect(generate).toBeDisabled();await stableSize(preview,size)}
  const url=`https://example.com/widget/${size}?theme=${testInfo.project.use.colorScheme}`;
  await input.fill(url);await expect(generate).toBeEnabled();await interactionSizes(page,preview,'qr',size);await generate.click();
  await expect(preview.locator('.composition-qr-result')).toBeVisible();await stableSize(preview,size);
  expect(await decodeVisibleQr(page,preview),'Independent jsQR decoder reads the actual visible SVG').toBe(url);
  const downloadPromise=page.waitForEvent('download');await preview.getByRole('button',{name:'Stáhnout PNG',exact:true}).click();const download=await downloadPromise;
  expect(download.suggestedFilename()).toBe('axo-qr.png');expect(await download.failure()).toBeNull();
  const saved=testInfo.outputPath(`qr-${size}.png`);await download.saveAs(saved);const png=await fs.readFile(saved);
  expect(png.subarray(0,8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]));expect(png.readUInt32BE(16)).toBe(png.readUInt32BE(20));expect(png.readUInt32BE(16)).toBeGreaterThan(300);
  expect(await decodeQr(page,'data:image/png;base64,'+png.toString('base64')),'Downloaded PNG decodes to the exact input URL').toBe(url);
  await testInfo.attach('generated-qr-png',{body:png,contentType:'image/png'});
  await interactionSizes(page,preview,'qr',size);
  const reset=preview.getByRole('button',{name:'Nová URL',exact:true});await reset.click();
  await expect(input).toBeFocused();await expect(input).toHaveValue('');await expect(generate).toBeDisabled();await expect(preview.locator('.composition-qr-result')).toBeHidden();await stableSize(preview,size);
  const next=url+'&second=1';await input.fill(next);await input.press('Enter');await expect(preview.locator('.composition-qr-result')).toBeVisible();
  expect(await decodeVisibleQr(page,preview),'Regeneration uses the new URL, not stale content').toBe(next);await stableSize(preview,size);await reset.click();await stableSize(preview,size);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}
