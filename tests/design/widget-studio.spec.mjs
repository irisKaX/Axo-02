import fs from 'node:fs/promises';
import {test,expect} from './fixtures.mjs';
import {openWidget,scenario,stableSize,decodeQr,decodeVisibleQr} from './widget-studio-helpers.mjs';
for(const size of ['small','large'])test(`QR ${size}: real SVG, PNG, reset and keyboard`,async({page},testInfo)=>{
 const card=await openWidget(page,'qr',size),input=card.getByRole('textbox',{name:'URL pro QR kód'}),generate=card.getByRole('button',{name:'Generovat',exact:true});
 for(const invalid of ['není-url','javascript:alert(1)','ftp://example.com/file']){await input.fill(invalid);await expect(generate).toBeDisabled()}
 const url=`https://example.com/widget/${size}?theme=${testInfo.project.use.colorScheme}`;
 await input.fill(url);await input.press('Enter');await expect(card.locator('.aw-qr-result')).toBeVisible();expect(await decodeVisibleQr(page,card)).toBe(url);await stableSize(card,size);
 const downloadPromise=page.waitForEvent('download');await card.getByRole('button',{name:'Stáhnout PNG',exact:true}).click();const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('axo-qr.png');expect(await download.failure()).toBeNull();const saved=testInfo.outputPath('qr.png');await download.saveAs(saved);const png=await fs.readFile(saved);expect(png.subarray(0,8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]));expect(await decodeQr(page,'data:image/png;base64,'+png.toString('base64'))).toBe(url);
 await card.getByRole('button',{name:'Nová URL',exact:true}).click();await expect(input).toBeFocused();await expect(input).toHaveValue('');await expect(generate).toBeDisabled();await stableSize(card,size);
 await input.fill(url+'&second=1');await generate.click();expect(await decodeVisibleQr(page,card)).toBe(url+'&second=1');
});
test('Find Phrase preserves modes, query and demonstrative availability',async({page})=>{
 const card=await openWidget(page,'find','small'),query=card.getByRole('searchbox');await expect(card.getByRole('radio',{name:'Asset',exact:true})).toBeChecked();await query.fill('návody');await card.getByRole('radio',{name:'Asset',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(card.getByRole('radio',{name:'Fráze',exact:true})).toBeChecked();await expect(query).toHaveValue('návody');await card.locator('.aw-ready').click();await expect(card.locator('.aw-ready')).toHaveAttribute('data-ready','false');await stableSize(card,'small');
});

test('WebP prototype selects files honestly; result remains labeled fixture data',async({page})=>{
 const card=await openWidget(page,'webp','small');
 const chooser=page.waitForEvent('filechooser');await card.getByRole('button',{name:'Vybrat obrázky',exact:true}).click();await (await chooser).setFiles({name:'moje-fotka.png',mimeType:'image/png',buffer:Buffer.from('prototype-file')});
 await expect(card.getByRole('status')).toContainText('1 vybraných souborů · konverze není připojena');
 await card.getByRole('button',{name:'Ukázat výsledek',exact:true}).click();await expect(card.getByText('cover.jpg')).toBeVisible();await expect(card.getByText('Ukázková data · nástroj není připojen')).toBeVisible();
});
