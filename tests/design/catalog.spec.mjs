import fs from 'node:fs';
import path from 'node:path';
import { test,expect,catalog } from './fixtures.mjs';
import { root } from '../../tools/design/runtime.mjs';

test('@capture component screenshot',async({page},testInfo)=>{
 const route=process.env.DESIGN_ROUTE||'buttons';
 const selector=process.env.DESIGN_SELECTOR||'.btn-row';
 await catalog(page,route);
 const component=page.locator(selector).first();await expect(component).toBeVisible();
 const image=await component.screenshot({animations:'disabled'});
 await testInfo.attach('component',{body:image,contentType:'image/png'});
 const dir=path.join(root,'artifacts/design',testInfo.project.name);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'component.png'),image);
});

test('@visual Button Primary and its catalog states',async({page})=>{
 await catalog(page,'buttons');
 await expect(page.locator('.btn-row').first()).toHaveScreenshot('button-primary.png');
});

test('@visual approved Search Input',async({page})=>{
 await catalog(page,'inputs');
 await expect(page.locator('.input-card').nth(1)).toHaveScreenshot('search-input.png');
});

test('Button interaction states and responsive containment',async({page})=>{
 await catalog(page,'buttons');
 const variants=page.locator('.btn-section').filter({has:page.locator('#button-variants')});
 for(const variant of ['primary','secondary','outline','ghost','destructive']){
  const button=variants.locator('.axo-btn--'+variant).first();
  const disabled=variants.locator('.axo-btn--'+variant+':disabled');
  const size=await button.boundingBox();expect(size.height).toBe(34);
  await button.hover();await button.focus();await expect(button).toBeFocused();
  const color=await button.evaluate(e=>getComputedStyle(e).outlineColor);
  const token=variant==='destructive'?'--focus-error':'--focus';
  expect(color).toBe(await button.evaluate((e,token)=>{const probe=document.createElement('span');probe.style.color=`var(${token})`;e.append(probe);const c=getComputedStyle(probe).color;probe.remove();return c},token));
  await expect(disabled).toBeDisabled();
  const appearance=e=>{const s=getComputedStyle(e);return [s.backgroundColor,s.opacity,s.transform,s.filter]};
  const before=await disabled.evaluate(appearance);await disabled.hover();expect(await disabled.evaluate(appearance)).toEqual(before);
 }
 await expect(variants.locator('.axo-btn[aria-busy="true"]')).toHaveCount(5);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('Search Input focus, editing, theme toggle and responsive containment',async({page},testInfo)=>{
 await catalog(page,'inputs');
 const search=page.locator('#axo-search-input');await search.focus();await expect(search).toBeFocused();await search.fill('Kontrola komponenty');await expect(search).toHaveValue('Kontrola komponenty');
 await expect(page.locator('.input-search-shell')).toHaveCSS('height','48px');
 expect(await page.locator('.input-search-inner').evaluate(e=>getComputedStyle(e).boxShadow)).not.toBe('none');
 const initial=await page.locator('html').getAttribute('data-theme');await page.locator('#themeToggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme',initial==='dark'?'light':'dark');
 await expect(search).toHaveValue('Kontrola komponenty');
 const bounds=await page.locator('.input-search-shell').evaluate(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,viewport:innerWidth,page:document.documentElement.scrollWidth}});
 expect(bounds.left).toBeGreaterThanOrEqual(0);expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
 await testInfo.attach('responsive-measurements',{body:JSON.stringify(bounds),contentType:'application/json'});
 if(bounds.page>bounds.viewport)testInfo.annotations.push({type:'existing-catalog-finding',description:'Inputs route has horizontal overflow from its existing hidden URL tooltip; Search Input itself fits. Recorded without changing catalog UI.'});
});
