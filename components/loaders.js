/* Loaders V1 · reusable renderer, CSS-only motion */
function loaderMarkup(type,size="m",tone="violet"){
 const count=type==="dots"?8:type==="blades"?12:0;
 const pieces=Array.from({length:count},(_,i)=>'<span class="axo-loader-'+(type==="dots"?"dot":"blade")+'" style="--'+(type==="dots"?"dot":"blade")+'-index:'+i+'"></span>').join("");
 return '<span class="axo-loader'+(type==="ring"?" axo-loader-ring":"")+'" data-size="'+size+'" data-tone="'+tone+'" aria-hidden="true">'+pieces+'</span>';
}
function renderLoaders(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const designs=[["dots","01 · Dot Spinner","Osm postupně pulzujících teček, podle dodané reference."],["blades","02 · Blade Spinner","Dvanáct jemných paprsků s postupným zeslabováním."],["ring","03 · Gradient Ring","Kruhový gradientní spinner s klidnější rotací."]];
 host.innerHTML='<div class="axo-loader-gallery"><div class="foundation-note">Loaders V1 · tři varianty podle dodaných referencí, sjednocené s Foundations. Animace jsou pouze vizuální; běžící nástroj musí svůj stav oznámit také textem.</div>'+
 designs.map(([type,title,desc])=>'<section class="axo-loader-card"><div><h2>'+title+'</h2><p>'+desc+'</p></div><div class="axo-loader-preview">'+["s","m","l"].map(size=>'<div class="axo-loader-sample">'+loaderMarkup(type,size)+'<span>'+size.toUpperCase()+'</span></div>').join("")+'</div></section>').join("")+
 '<section class="axo-loader-card"><div><h2>04 · Playground</h2><p>Vyber typ, velikost a barevnou variantu. Nastavení platí jen pro tuto ukázku.</p></div><div class="axo-loader-controls"><label>Typ <select id="axo-loader-type"><option value="dots">Dot Spinner</option><option value="blades">Blade Spinner</option><option value="ring">Gradient Ring</option></select></label><label>Velikost <select id="axo-loader-size"><option value="s">S</option><option value="m" selected>M</option><option value="l">L</option></select></label><label>Barva <select id="axo-loader-tone"><option value="violet">Primary</option><option value="neutral">Neutral</option></select></label></div><div class="axo-loader-preview" id="axo-loader-playground">'+loaderMarkup("dots")+'</div><span class="axo-loader-note" role="status">Načítání · demonstrační stav</span></section></div>';
}
document.addEventListener("change",e=>{
 if(!e.target.matches("#axo-loader-type,#axo-loader-size,#axo-loader-tone"))return;
 const type=document.getElementById("axo-loader-type").value,size=document.getElementById("axo-loader-size").value,tone=document.getElementById("axo-loader-tone").value;
 document.getElementById("axo-loader-playground").innerHTML=loaderMarkup(type,size,tone);
});
