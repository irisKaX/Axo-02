import {createRequire} from 'node:module';
import {expect,catalog} from './fixtures.mjs';
const require=createRequire(import.meta.url);
export const widgetSizes={small:{width:320,height:280},large:{width:640,height:320}};
export async function openWidget(page,widget,size){await catalog(page,'widget-studio');await page.locator(`[data-studio-widget="${widget}"]`).click();await page.locator(`[data-studio-size="${size}"]`).click();await scenario(page,'empty');return page.locator('.axo-widget')}
export async function scenario(page,state){await page.locator(`[data-studio-scenario="${state}"]`).click()}
export async function stableSize(preview,size){expect(await preview.evaluate(e=>({width:e.offsetWidth,height:e.offsetHeight}))).toEqual(widgetSizes[size]);await expect(preview).toHaveCSS('transform','none')}
export async function decodeQr(page,src){
 if(!await page.evaluate(()=>typeof window.jsQR==='function'))await page.addScriptTag({path:require.resolve('jsqr/dist/jsQR.js')});
 return page.evaluate(async src=>{const image=new Image();image.src=src;await image.decode();const canvas=document.createElement('canvas');canvas.width=canvas.height=Math.max(400,image.naturalWidth);const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);const pixels=context.getImageData(0,0,canvas.width,canvas.height);return window.jsQR(pixels.data,pixels.width,pixels.height)?.data??null},src);
}
export async function decodeVisibleQr(page,preview){const svg=await preview.locator('.aw-qr-pattern svg').evaluate(e=>e.outerHTML);return decodeQr(page,'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'))}
