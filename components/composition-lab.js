/* Composition Lab V1: fixed dashboard composition with viewport switch. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const sizes=[["1470","MacBook Air 13″ · 1470 px"],["1366","Notebook · 1366 px"],["1920","Desktop · 1920 px"],["390","Mobile · 390 px"]];
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 host.innerHTML='<div class="composition-lab"><p class="composition-lab-note">Dashboard Layout V1 · Schválené rozmístění dle reference. Office a widgety jsou záměrně prázdné, bez generovaného obsahu.</p><div class="composition-lab-controls"><label for="composition-viewport">Viewport</label><select id="composition-viewport">'+sizes.map(([value,label])=>'<option value="'+value+'" '+(value==="1470"?"selected":"")+'>'+label+'</option>').join("")+'</select></div><div class="composition-lab-stage"><div class="composition-lab-screen" data-size="1470" style="--composition-width:1470px"><div class="composition-lab-header"><span>Main Header V4 · vyhrazená oblast 72 px</span><a href="#navigation">Otevřít skutečný Header V4</a></div><div class="composition-lab-grid">'+tiles.map(([id,label])=>'<article class="composition-lab-tile '+id+'">'+icon+'<h3>'+label+'</h3></article>').join("")+'</div></div></div><p class="composition-lab-footnote">Při širším viewportu lze náhled horizontálně procházet. Header zde není duplikován; funkční instance je v sekci Navigace.</p></div>';
 const select=host.querySelector("#composition-viewport"),screen=host.querySelector(".composition-lab-screen");
 select.addEventListener("change",()=>{screen.style.setProperty("--composition-width",select.value+"px");screen.dataset.size=select.value});
}
