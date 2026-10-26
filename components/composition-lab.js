/* Composition Lab · approved empty dashboard composition + shared Header V4. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 host.innerHTML='<div class="composition-lab"><div class="composition-lab-screen"><div class="composition-lab-header"><div id="header-nav-catalog"></div></div><div class="composition-lab-grid">'+tiles.map(([id,label])=>'<article class="composition-lab-tile '+id+'">'+icon+'<h3>'+label+'</h3></article>').join("")+'</div></div></div>';
 renderHeaderNav(host.querySelector("#header-nav-catalog"),true);
}
