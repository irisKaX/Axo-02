import {test,expect} from './fixtures.mjs';
import {decodeQr} from './widget-studio-helpers.mjs';
import fs from 'node:fs/promises';

export async function openQrLab(page,testInfo){
 await page.goto('/labs/qr-design-exploration');await expect(page).toHaveURL(/\/labs\/qr-design-exploration\/$/);
 await expect(page.locator('#qr-exploration')).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.load('500 13px Geist');await document.fonts.ready});
 await expect(page.locator('html')).toHaveAttribute('data-theme',testInfo.project.use.colorScheme);
}
for(const variant of ['a','b','c'])test(`QR exploration ${variant}: states, real export, keyboard and bounds`,async({page},testInfo)=>{
 await openQrLab(page,testInfo);const study=page.locator(`[data-qrx-study="${variant}"]`),widget=study.locator('.qrx-widget');
 const size=async()=>{await expect.poll(()=>widget.evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))).toEqual({width:320,height:280})};
 for(const state of ['empty','filled','result']){await study.locator(`[data-qrx-state="${state}"]`).click();await size();await expect(widget).toHaveAttribute('data-qr-stage',state==='result'?'download':state==='filled'?'generate':'paste')}
 await study.locator('[data-qrx-state="empty"]').click();const input=widget.getByRole('textbox',{name:'URL pro QR kód'}),generate=widget.getByRole('button',{name:'Generovat',exact:true});await expect(generate).toBeDisabled();
 await input.fill('javascript:alert(1)');await expect(generate).toBeDisabled();const url=`https://example.com/axo-02/${variant}?theme=${testInfo.project.use.colorScheme}`;await input.fill(url);await expect(generate).toBeEnabled();await input.press('Enter');await size();
 await expect(widget.getByRole('button',{name:'Stáhnout PNG',exact:true})).toBeFocused();
 const svg=await widget.locator('.composition-qr-pattern svg').evaluate(e=>e.outerHTML);expect(await decodeQr(page,'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'))).toBe(url);
 const pending=page.waitForEvent('download');await widget.getByRole('button',{name:'Stáhnout PNG',exact:true}).click();const download=await pending;expect(await download.failure()).toBeNull();const file=testInfo.outputPath(`qr-${variant}.png`);await download.saveAs(file);const png=await fs.readFile(file);expect(await decodeQr(page,'data:image/png;base64,'+png.toString('base64'))).toBe(url);
 await widget.getByRole('button',{name:'Nová URL',exact:true}).click();await expect(input).toBeFocused();await expect(input).toHaveValue('');await expect(generate).toBeDisabled();await size();
 const longUrl='https://'+'destination.'.repeat(8)+'example.com/'+'long-path/'.repeat(10);await input.fill(longUrl);await generate.click();await size();
 const bounds=await widget.evaluate(e=>{const r=e.getBoundingClientRect();return [...e.querySelectorAll('.qrx-code,.qrx-result-heading,.qrx-result-toolbar,.qrx-actions')].filter(x=>x.getClientRects().length).every(x=>{const b=x.getBoundingClientRect();return b.left>=r.left&&b.right<=r.right&&b.top>=r.top&&b.bottom<=r.bottom})});expect(bounds,'Long URL content stays inside the widget').toBe(true);
 const originalTheme=await page.locator('html').getAttribute('data-theme');await page.locator('#qrx-theme button').click();await expect(page.locator('html')).toHaveAttribute('data-theme',originalTheme==='dark'?'light':'dark');await size();await expect(widget.locator('.qrx-code')).toHaveAttribute('aria-label','QR kód pro '+longUrl);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
