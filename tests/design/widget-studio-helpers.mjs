import { createRequire } from 'node:module';
import { expect,catalog } from './fixtures.mjs';

const require=createRequire(import.meta.url);
export const widgetSizes={small:{width:320,height:280},large:{width:640,height:320}};
export const widgetScenarios={find:['empty','asset','phrase','unavailable'],qr:['empty','valid','invalid','result']};

export async function openWidget(page,widget,size){
 await catalog(page,'widget-studio');
 await page.getByRole('tab',{name:widget==='find'?'Find Phrase':'QR Generator',exact:true}).click();
 await page.getByRole('button',{name:size==='small'?'Small':'Large',exact:true}).click();
 await scenario(page,'empty');
 return page.locator('.widget-studio-preview');
}
export async function scenario(page,state){
 await page.locator(`[data-studio-scenario="${state}"]`).click();
}
export async function stableSize(preview,size){
 await expect.poll(()=>preview.evaluate(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height}})).toEqual(widgetSizes[size]);
 await expect(preview).toHaveCSS('transform','none');
}
export async function interactionSizes(page,preview,widget,size){
 for(const state of widget==='find'?['default','hover','focus']:['default','hover','focus','pressed']){
  await page.locator(`[data-studio-interaction="${state}"]`).click();await stableSize(preview,size);
 }
 await page.locator('[data-studio-interaction="default"]').click();
}
export async function decodeQr(page,src){
 if(!await page.evaluate(()=>typeof window.jsQR==='function'))await page.addScriptTag({path:require.resolve('jsqr/dist/jsQR.js')});
 return page.evaluate(async src=>{
  const image=new Image();image.src=src;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=canvas.height=Math.max(400,image.naturalWidth);
  const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
  const pixels=context.getImageData(0,0,canvas.width,canvas.height);
  return window.jsQR(pixels.data,pixels.width,pixels.height)?.data??null;
 },src);
}
export async function decodeVisibleQr(page,preview){
 const svg=await preview.locator('.composition-qr-pattern svg').evaluate(e=>e.outerHTML);
 return decodeQr(page,'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'));
}
