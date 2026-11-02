import {test,expect,catalog} from './fixtures.mjs';
export const ids=['metadata','headings','find','screenshot','webp','images','pdf','qr','structured','trends'];
const dims={small:{width:320,height:280},large:{width:640,height:320}};
test('registry exposes all ten tools and independent lifecycle',async({page})=>{
 await catalog(page,'widget-studio');
 expect(await page.evaluate(()=>window.AxoWidgetRegistry.list().map(x=>x.id))).toEqual(ids);
 expect(await page.evaluate(()=>{
  const R=window.AxoWidgetRegistry,required=['id','name','toolId','supportedSizes','defaultSize','states','capabilities','render','mount','getState','setState','destroy'];
  const valid=R.list().every(e=>required.every(key=>key in e));
  const a=document.createElement('div'),b=document.createElement('div');document.body.append(a,b);
  const first=R.create('qr',a),second=R.create('qr',b,{size:'large'});
  first.setState({query:'https://example.com/one',scenario:'result'});
  const independent=second.getState().query===''&&first.getState().scenario==='result';
  const saved=JSON.parse(JSON.stringify(first.getState()));first.setState(saved);
  const idUnique=a.querySelector('input').id!==b.querySelector('input').id;
  const before=first.getState();first.destroy();first.destroy();let rejects=false;try{first.setState({query:'x'})}catch{rejects=true}
  a.innerHTML='<input type="url" value="https://example.com/reused-host">';const retained=JSON.stringify(first.getState())===JSON.stringify(before);second.destroy();a.remove();b.remove();
  return {valid,independent,idUnique,rejects,retained};
 })).toEqual({valid:true,independent:true,idUnique:true,rejects:true,retained:true});
});
for(const id of ids)test(`${id}: both compositions, content states, interaction and overflow`,async({page})=>{
 await catalog(page,'widget-studio');await page.locator(`[data-studio-widget="${id}"]`).click();
 for(const size of ['small','large']){
  await page.locator(`[data-studio-size="${size}"]`).click();
  const card=page.locator('.axo-widget');
  for(const state of id==='qr'?['empty','filled','error','result']:['empty','filled','loading','error','result']){
   await page.locator(`[data-studio-scenario="${state}"]`).click();
   expect(await card.evaluate(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height}})).toEqual(dims[size]);
   expect(await card.evaluate(e=>({x:e.scrollWidth-e.clientWidth,y:e.scrollHeight-e.clientHeight,offenders:[...e.querySelectorAll('*')].filter(n=>n.getBoundingClientRect().right>e.getBoundingClientRect().right).map(n=>n.className)})),`${id}/${size}/${state} overflow`).toEqual({x:0,y:0,offenders:[]});
   if(id!=='qr'){const overlap=await card.evaluate(e=>{const top=e.querySelector('.aw-disclaimer').getBoundingClientRect().top;return [...e.querySelectorAll('.aw-body *')].filter(n=>n.getBoundingClientRect().height&&n.getBoundingClientRect().bottom>top-2).map(n=>n.className||n.tagName)});expect(overlap,`${id}/${size}/${state} content must clear its footer`).toEqual([])}
   if(id==='find'&&state==='error')await expect(card.locator('.aw-ready')).toHaveAttribute('data-ready','false');
   if(id!=='qr')await expect(card.getByText('Ukázková data · nástroj není připojen')).toBeVisible();
  }
  for(const state of ['hover','focus','pressed','disabled','default']){
   await page.locator(`[data-studio-interaction="${state}"]`).click();
   expect(await card.evaluate(e=>({width:e.offsetWidth,height:e.offsetHeight}))).toEqual(dims[size]);
   if(state==='disabled')for(const b of await card.locator('button.axo-btn').all())await expect(b).toBeDisabled();
  }
  if(id!=='qr'){
   await page.locator('[data-studio-scenario="empty"]').click();
   const q=card.locator('input[type=search],input[type=url]');
   if(await q.count())await q.fill('https://example.com/'+ 'long-'.repeat(100)+'<script>');
   await card.locator('[data-widget-action="demo"]').click();await expect(card).toHaveAttribute('data-scenario','result');
   expect(await card.evaluate(e=>e.scrollWidth===e.clientWidth)).toBe(true);
   await card.locator('[data-widget-action="reset"]').click();await expect(card).toHaveAttribute('data-scenario','empty');
  }
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Studio compares all twenty, independent drafts, keyboard and route cleanup',async({page})=>{
 await catalog(page,'widget-studio');
 await page.locator('[data-studio-widget="find"]').click();await page.getByRole('searchbox').fill('Rozepsaná fráze');
 await page.locator('[data-studio-widget="qr"]').click();await page.locator('[data-studio-widget="find"]').click();await expect(page.getByRole('searchbox')).toHaveValue('Rozepsaná fráze');
 await page.locator('[data-studio-widget="metadata"]').focus();await page.keyboard.press('End');await expect(page.locator('[data-studio-widget="trends"]')).toBeFocused();
 await page.locator('[data-studio-view="compare"]').click();await expect(page.locator('.axo-widget')).toHaveCount(2);
 await page.locator('[data-studio-view="library"]').click();await expect(page.locator('.axo-widget')).toHaveCount(20);
 const allIds=await page.locator('.widget-studio input[id]').evaluateAll(es=>es.map(e=>e.id));expect(new Set(allIds).size).toBe(allIds.length);
 const theme=await page.locator('html').getAttribute('data-theme');await page.locator('#themeToggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme',theme==='dark'?'light':'dark');await expect(page.locator('.axo-widget')).toHaveCount(20);await page.locator('#themeToggle').click();
 await page.evaluate(()=>location.hash='buttons');await expect(page.locator('.axo-widget')).toHaveCount(0);
 await page.evaluate(()=>location.hash='widget-studio');await expect(page.locator('.axo-widget')).toHaveCount(20);
});
