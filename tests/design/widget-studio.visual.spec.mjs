import { test,expect } from './fixtures.mjs';
import { openWidget,scenario,stableSize,widgetScenarios } from './widget-studio-helpers.mjs';

// Fixed-size widgets have desktop references; mobile interaction/geometry runs in widget-studio.spec.mjs.
for(const widget of ['find','qr'])for(const size of ['small','large']){
 test(`@visual @capture Widget Studio ${widget} ${size} content states`,async({page},testInfo)=>{
  const preview=await openWidget(page,widget,size);
  for(const state of widgetScenarios[widget])await test.step(state,async()=>{
   await scenario(page,state);await stableSize(preview,size);
   await expect(preview).toHaveScreenshot(`widget-${widget}-${size}-${state}.png`);
   await testInfo.attach(`${widget}-${size}-${state}`,{body:await preview.screenshot({animations:'disabled'}),contentType:'image/png'});
  });
 });
}
