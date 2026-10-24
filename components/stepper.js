/* Stepper V1: navigation progress and read-only progress, one renderer */
const stepperLabels=["Nastavení","Kontrola","Výsledky","Export"];
let stepperCurrent=1;
const stepperCheck='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
function stepperSteps(current,interactive,error=false){
 return '<ol class="stepper-steps" aria-label="Průběh procesu">'+stepperLabels.map((name,i)=>{
 const status=error&&i===current?"error":i<current?"completed":i===current?"active":"upcoming";
 const content=i<current?stepperCheck:i+1;
 const dot=interactive?'<button class="stepper-dot" type="button" data-step-index="'+i+'" aria-label="'+name+', krok '+(i+1)+'"'+(i===current?' aria-current="step"':'')+'>'+content+'</button>':'<span class="stepper-dot"'+(i===current?' aria-current="step"':'')+'>'+content+'</span>';
 return '<li class="stepper-step" data-state="'+status+'">'+dot+'<span class="stepper-name">'+name+'</span></li>';
 }).join('')+'</ol>';
}
function drawStepper(){
 const dynamic=document.getElementById("stepper-dynamic");if(!dynamic)return;
 dynamic.innerHTML=stepperSteps(stepperCurrent,true)+'<div class="stepper-footer">'+
 renderButton({label:"Zpět",variant:"secondary",state:stepperCurrent===0?"disabled":"default"}).replace("<button ","<button data-step-back ")+
 renderButton({label:stepperCurrent===stepperLabels.length-1?"Dokončeno":"Pokračovat",variant:"primary",state:stepperCurrent===stepperLabels.length-1?"disabled":"default"}).replace("<button ","<button data-step-next ")+
 '</div>';
}
function renderStepper(){
 const root=document.getElementById("stepper-catalog");if(!root)return;
 root.innerHTML='<div class="stepper-gallery">'+
 '<section class="pagination-card"><div><h2>07 · Navigation Stepper</h2><p>Čtyři kroky s aktivním stavem, fajfkami dokončených kroků a možností přecházet mezi kroky.</p></div><div id="stepper-dynamic"></div></section>'+
 '<section class="pagination-card"><div><h2>08 · Progress Stepper</h2><p>Neinteraktivní znázornění postupu, například při zpracování nebo exportu.</p></div>'+stepperSteps(2,false)+'<span class="stepper-static-note">Pouze informativní, bez možnosti přecházení mezi kroky.</span></section>'+
 '<section class="pagination-card"><div><h2>09 · Stepper Error State</h2><p>Stav, kdy kontrolu nelze dokončit. Chyba je vizuálně oddělená od aktivního kroku.</p></div>'+stepperSteps(1,false,true)+'</section></div>';
 drawStepper();
}
document.addEventListener("click",event=>{
 const step=event.target.closest("[data-step-index]");
 if(step){stepperCurrent=Number(step.dataset.stepIndex);drawStepper();document.querySelector('[data-step-index="'+stepperCurrent+'"]')?.focus();return}
 if(event.target.closest("[data-step-back]")){stepperCurrent=Math.max(0,stepperCurrent-1);drawStepper();return}
 if(event.target.closest("[data-step-next]")){stepperCurrent=Math.min(stepperLabels.length-1,stepperCurrent+1);drawStepper()}
});
