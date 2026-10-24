/* Axo 02 Navigation: three pagination demos, no framework */
const paginationState={numbered:{page:3,total:18},compact:{page:1,total:12},table:{page:1,total:10,count:93,size:10}};
function paginationButton(label,page,model,options={}){
 const {disabled=false,current=false,aria=""}=options;
 const attrs=(disabled?" disabled":"")+(current?' aria-current="page"':"")+(aria?' aria-label="'+aria+'"':"");
 return '<button type="button" class="page-btn" data-model="'+model+'" data-page="'+page+'"'+attrs+'>'+label+'</button>';
}
function paginationNumbers(page,total){
 const pages=[...new Set([1,total,page-1,page,page+1].filter(n=>n>0&&n<=total))].sort((a,b)=>a-b);
 const out=[];
 for(let i=0;i<pages.length;i++){if(i&&pages[i]-pages[i-1]>1)out.push("…");out.push(pages[i])}
 return out;
}
function paginationView(model){
 const state=paginationState[model],p=state.page,t=state.total;
 if(model==="numbered")return '<nav class="pagination-controls" aria-label="Stránkování výsledků">'+
 paginationButton("‹",p-1,model,{disabled:p===1,aria:"Předchozí stránka"})+
 paginationNumbers(p,t).map(n=>n==="…"?'<span class="page-ellipsis" aria-hidden="true">…</span>':paginationButton(n,n,model,{current:n===p,aria:"Stránka "+n})).join("")+
 paginationButton("›",p+1,model,{disabled:p===t,aria:"Další stránka"})+'</nav>';
 const controls='<nav class="pagination-controls" aria-label="Stránkování">'+
 paginationButton("‹ Předchozí",p-1,model,{disabled:p===1})+
 '<span class="page-meta">Stránka '+p+' z '+t+'</span>'+
 paginationButton("Další ›",p+1,model,{disabled:p===t})+'</nav>';
 if(model!=="table")return controls;
 return '<div class="page-tablebar"><label>Řádků na stránku <select id="pagination-size">'+
 [10,20,50].map(n=>'<option value="'+n+'"'+(n===state.size?' selected':'')+'>'+n+'</option>').join("")+
 '</select></label><span class="page-meta">'+((p-1)*state.size+1)+'–'+Math.min(p*state.size,state.count)+' z '+state.count+' záznamů</span>'+controls+'</div>';
}
function renderPagination(){
 const node=document.getElementById("sectionContent");
 if(!node)return;
 node.innerHTML='<div class="pagination-catalog">'+
 '<div class="foundation-note">Tři varianty Pagination v základním stylu Axo 02, všechny funkční v dark i light režimu.</div>'+
 [['numbered','Klasická Pagination','Číselné stránky, aktivní výběr, zkrácení rozsahu.'],['compact','Compact Pagination','Předchozí a další stránka v úsporném provedení.'],['table','Table Pagination','Rozsah záznamů a výběr počtu řádků.']].map(([id,title,desc],i)=>
 '<section class="pagination-card"><div><h2>0'+(i+1)+' · '+title+'</h2><p>'+desc+'</p></div><div id="pagination-'+id+'"></div></section>').join("")+
 '</div>';
 refreshPagination();
}
function refreshPagination(){
 for(const model of Object.keys(paginationState)){const el=document.getElementById("pagination-"+model);if(el)el.innerHTML=paginationView(model)}
}
document.addEventListener("click",event=>{
 const btn=event.target.closest("[data-model][data-page]");
 if(!btn||btn.disabled)return;
 const state=paginationState[btn.dataset.model],page=Number(btn.dataset.page);
 if(page>=1&&page<=state.total){state.page=page;refreshPagination()}
});
document.addEventListener("change",event=>{
 if(event.target.id!=="pagination-size")return;
 const state=paginationState.table;state.size=Number(event.target.value);
 state.total=Math.ceil(state.count/state.size);state.page=1;refreshPagination();
});
