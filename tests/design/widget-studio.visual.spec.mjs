import fs from 'node:fs/promises';
import path from 'node:path';
import {test,expect,catalog} from './fixtures.mjs';
const ids=['metadata','headings','find','screenshot','webp','images','pdf','qr','structured','trends'];
test('@visual @capture Widget System: twenty variants and complete library',async({page},testInfo)=>{
 await catalog(page,'widget-studio');await page.locator('[data-studio-view="library"]').click();
 const theme=testInfo.project.use.colorScheme,dir=path.resolve('docs/widget-system/screenshots',theme);await fs.mkdir(dir,{recursive:true});
 for(const id of ids)for(const size of ['small','large']){
  const card=page.locator(`.axo-widget[data-widget-id="${id}"][data-size="${size}"]`);await expect(card).toHaveAttribute('data-scenario','result');
  await expect(card).toHaveScreenshot(`widget-system-${id}-${size}-result.png`);
  await card.screenshot({path:path.join(dir,`${id}-${size}.png`),animations:'disabled'});
 }
 await page.locator('.widget-studio-gallery').screenshot({path:path.join(dir,'library.png'),animations:'disabled'});
 await page.evaluate(()=>{window.scrollTo(0,0);const stage=document.querySelector('.widget-studio-stage');stage.scrollLeft=0;stage.scrollTop=0});
 await page.screenshot({path:path.join(dir,'studio-1366x768.png'),fullPage:false,animations:'disabled'});
});
