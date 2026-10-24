/* One Axo 02 mark; the supplied PNG is used without any pixel edits. */
const axoLogoAsset="assets/axo-head.png";
function renderLogo({size=120,animated=true,label="Axo 02"}={}){
 if(!Number.isFinite(size)||size<=0)throw new RangeError("Logo size must be a positive number");
 if(typeof animated!=="boolean")throw new TypeError("Logo animated must be a boolean");
 const name=String(label).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
 return '<span class="axo-logo" role="img" aria-label="'+name+'" data-animated="'+animated+'" style="--axo-logo-size:'+size+'px">'+
  '<span class="axo-logo-core"><img class="axo-logo-head" src="'+axoLogoAsset+'" width="1774" height="887" alt="" draggable="false"></span></span>';
}
function logoSample(caption,options={}){
 return '<figure class="logo-sample">'+renderLogo(options)+'<figcaption>'+caption+'</figcaption></figure>';
}
function renderLogoCatalog(){
 const host=document.getElementById("sectionContent");
 if(!host)return;
 host.innerHTML='<div class="logo-gallery">'+
  '<div class="foundation-note">Logo V1 · Návrh ke schválení. Jeden kruhový znak s bílou hlavou axolotla; pohybuje se pouze barevný okraj.</div>'+
  '<section class="logo-card"><header><h2>01 · Logo Default</h2><p>Hlavní znak Axo 02. Tmavý střed a hlava zůstávají statické.</p></header><div class="logo-stage">'+logoSample("Axo 02 · 120 px")+'</div></section>'+
  '<section class="logo-card"><header><h2>02 · Logo Sizes</h2><p>Stejné proporce od malé ikony po hlavní značku.</p></header><div class="logo-sizes">'+
  [32,48,64,96,120].map(size=>logoSample(size+" px",{size})).join("")+'</div></section>'+
  '<section class="logo-card"><header><h2>03 · Dark / Light</h2><p>Vnitřek loga zůstává tmavý na obou površích.</p></header><div class="logo-comparison">'+
  '<div class="logo-stage logo-stage--dark">'+logoSample("Dark")+'</div><div class="logo-stage logo-stage--light">'+logoSample("Light")+'</div></div></section>'+
  '<section class="logo-card"><header><h2>04 · Motion</h2><p>Plynulý oběh gradientu a stejný znak bez pohybu. Nastavení reduced motion animaci vypne.</p></header><div class="logo-comparison">'+
  '<div class="logo-stage">'+logoSample("Animated")+'</div><div class="logo-stage">'+logoSample("Static",{animated:false})+'</div></div></section></div>';
}
