import fs from 'node:fs';
import path from 'node:path';
import { test as base, expect } from '@playwright/test';
import { root,cache,sha256 } from '../../tools/design/runtime.mjs';

export const test=base.extend({
 page:async({page},use)=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'tests/design/fonts-lock.json')));
  const files=new Map();
  for(const entry of manifest.files){
   const file=path.join(cache,'fonts',entry.file);
   if(!fs.existsSync(file))throw new Error('Pinned font fixture missing. Run npm run design:setup.');
   const bytes=fs.readFileSync(file);expect(await sha256(bytes),'Font fixture integrity: '+entry.file).toBe(entry.sha256);files.set(entry.url,bytes);
  }
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//,async route=>{
   const url=route.request().url();
   const body=files.get(url);
   if(!body){errors.push('Unpinned font request: '+url);await route.abort('blockedbyclient');return}
   await route.fulfill({status:200,contentType:url.includes('googleapis')?'text/css':'font/ttf',headers:{'Access-Control-Allow-Origin':'*'},body});
  });
  await page.addInitScript(theme=>localStorage.setItem('axo02-theme',theme),base.info().project.use.colorScheme);
  await use(page);
  expect(errors,'Browser runtime / console errors').toEqual([]);
 }
});
export {expect};
export async function catalog(page,route){
 await page.goto('/#'+route);await page.evaluate(async()=>{await document.fonts.load('500 13px Geist');await document.fonts.ready});
 await expect(page.locator('html')).toHaveAttribute('data-theme',test.info().project.use.colorScheme);
 await expect(page.locator(`[data-section="${route}"]`)).toHaveAttribute('aria-current','page');
 await expect.poll(()=>page.evaluate(()=>document.fonts.check('500 13px Geist'))).toBe(true);
}
