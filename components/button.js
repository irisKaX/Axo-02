/* Axo 02 Button V1: trusted catalog SVG, one renderer, one style owner. */
const actionPaths={
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6m4-6v6"/>',
upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
open:'<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.8 5.3A10.9 10.9 0 0 1 12 5c4.5 0 8 3 10 7a14.7 14.7 0 0 1-3.1 4.1M6.2 6.2A14.6 14.6 0 0 0 2 12c2 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.2"/>',
copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
edit:'<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4L16.5 3.5Z"/>'
};
function actionIcon(key,animated=false){
 if(animated&&(key==="trash"||key==="trashAll")){
  return '<svg class="bin-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+
   '<g class="bin-lid"><path d="M4 6h16M8 6V4h8v2"/></g>'+
   '<path d="M5 6l1 15h12l1-15M10 11v6m4-6v6"/>'+
   '</svg>';
 }
 return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+actionPaths[key==="trashAll"?"trash":key]+'</svg>';
}
const buttonVariants=[["primary","Primary"],["secondary","Secondary"],["outline","Outline"],["ghost","Ghost"],["destructive","Destructive"]];
const buttonStates=[["Default","default"],["Hover","hover"],["Focus","focus"],["Pressed","pressed"],["Disabled","disabled"],["Loading","loading"]];
let buttonTooltipSequence=0;
function escapeButtonText(value){
 return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
// icon is trusted SVG/content supplied by this catalog, never external HTML.
function renderButton({label,variant="primary",size="s",format="text",state="default",icon="",iconPosition="start",motion="",tooltip="",tooltipId="",ariaLabel="",title="",concept=""}){
 if(size!=="s")throw new RangeError("Button V1 supports only size s");
 if(!buttonVariants.some(([key])=>key===variant))throw new RangeError("Unknown Button variant");
 if(!["text","icon-text","icon-only"].includes(format))throw new RangeError("Unknown Button format");
 if(!buttonStates.some(([,key])=>key===state))throw new RangeError("Unknown Button state");
 if(!String(label||"").trim())throw new TypeError("Button requires an accessible label");
 if(format!=="text"&&!icon&&state!=="loading")throw new TypeError("Icon format requires icon content");
 if(concept&&concept!=="reveal-fill")throw new RangeError("Unknown Button concept");
 const round=format==="icon-only",loading=state==="loading";
 const actionMotion=round&&!loading?motion:"";
 const classes=["axo-btn","axo-btn--"+variant];
 if(round)classes.push("axo-btn--circle");
 if(["hover","focus","pressed"].includes(state))classes.push("demo-"+state);
 if(actionMotion==="trash"||actionMotion==="trashAll")classes.push("axo-btn--bin");
 if(concept)classes.push(concept);
 const tipId=tooltip?(tooltipId||"button-tooltip-"+(++buttonTooltipSequence)):"";
 let attrs=' type="button" class="'+classes.join(" ")+'" data-size="'+size+'" data-format="'+format+'"';
 if(state==="disabled")attrs+=' disabled';
 if(loading)attrs+=' aria-busy="true"';
 const name=ariaLabel||(loading?"Načítání "+label:round?label:"");
 if(name)attrs+=' aria-label="'+escapeButtonText(name)+'"';
 if(actionMotion)attrs+=' data-action="'+escapeButtonText(actionMotion)+'"';
 if(tipId)attrs+=' aria-describedby="'+escapeButtonText(tipId)+'"';
 else if(title)attrs+=' title="'+escapeButtonText(title)+'"';
 const text='<span>'+escapeButtonText(loading?"Načítání":label)+'</span>';
 let content;
 if(loading)content='<span class="spinner" aria-hidden="true"></span>'+(round?"":text);
 else if(round)content=icon;
 else if(format==="text")content=text;
 else content=iconPosition==="end"?text+icon:icon+text;
 const button='<button'+attrs+'>'+content+'</button>';
 return tooltip?'<span class="action-tooltip-wrap">'+button+'<span class="action-tooltip" id="'+escapeButtonText(tipId)+'" role="tooltip">'+escapeButtonText(tooltip)+'</span></span>':button;
}

/* Catalog examples configure the same renderer; no copied button markup. */
const actions=[["Stáhnout","download","secondary"],["Uložit","save","primary"],["Smazat","trash","destructive"],["Smazat vše","trashAll","destructive"],["Nahrát","upload","secondary"],["Přidat","plus","primary"],["Otevřít","open","outline"],["Skrýt","hide","ghost"],["Kopírovat","copy","secondary"],["Upravit","edit","outline"]];
const buttonExampleIcon='<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
function renderButtonSet(format){
 const round=format==="icon-only";
 return buttonVariants.map(([variant,label])=>
  '<div class="btn-row"><h2>'+label+'</h2><p>'+(round?'Kulaté ikonové tlačítko · 34 × 34 px':'Klasické tlačítko · výška 34 px')+'</p><div class="btn-states">'+
  buttonStates.map(([name,state])=>'<div class="btn-state"><small>'+name+'</small>'+renderButton({
   label:round?'Akce '+label:'Tlačítko',variant,format,state,icon:round?buttonExampleIcon:"",
   ariaLabel:state==="loading"?'Načítání '+label:round?'Akce '+label:"",title:round&&state!=="loading"?'Akce '+label:""
  })+'</div>').join("")+'</div></div>'
 ).join("");
}
function renderActionButtons(){
 return '<div class="action-grid">'+actions.map(([label,key,variant])=>
  '<div class="action-card"><div class="action-title">'+label+'</div><div class="action-pair">'+
  renderButton({label,variant,format:"icon-text",icon:actionIcon(key),ariaLabel:label})+
  renderButton({label,variant,format:"icon-only",icon:actionIcon(key,true),motion:key,tooltip:label,tooltipId:"action-tip-"+key})+
  '</div><div class="action-caption">Text + ikona / pouze ikona · S</div></div>'
 ).join("")+'</div>';
}
function buttonSection(id,title,description,content){
 return '<section class="btn-section" aria-labelledby="'+id+'"><header class="btn-section-head"><h2 id="'+id+'">'+title+'</h2><p class="btn-catalog-head">'+description+'</p></header>'+content+'</section>';
}
function renderButtonCatalog(){
 const formats='<div class="button-formats action-grid">'+[
  ["Text",{label:"Tlačítko"}],
  ["Icon + Text",{label:"Stáhnout",variant:"secondary",format:"icon-text",icon:actionIcon("download")}],
  ["Icon Only",{label:"Stáhnout",variant:"secondary",format:"icon-only",icon:actionIcon("download"),tooltip:"Stáhnout"}]
 ].map(([name,config])=>'<div class="action-card"><div class="action-title">'+name+'</div><div class="action-pair">'+renderButton(config)+'</div></div>').join("")+'</div>';
 const reveal='<div class="reveal-demo">'+renderButton({label:"Vyzkoušet hover",format:"icon-text",icon:"→",iconPosition:"end",concept:"reveal-fill"})+'<span class="reveal-demo-caption">Plynulé odhalení modrofialového gradientu · dark/light · reduced motion</span></div>';
 return '<div class="btn-catalog"><div class="foundation-note">Základní sada velikosti S. Přepínač dark/light mění všechny varianty. Stavové ukázky jsou viditelné a tlačítka lze také reálně ovládat myší a klávesnicí.</div>'+
  buttonSection("button-variants","01 · Button Variants","Primary · Secondary · Outline · Ghost · Destructive",renderButtonSet("text"))+
  buttonSection("button-formats","02 · Button Formats","Text, Icon + Text a Icon Only používají stejný Button základ. Níže jsou všechny stavy kruhových variant S.",formats+renderButtonSet("icon-only"))+
  buttonSection("button-actions","03 · Action Examples","Deset běžných akcí ve dvou provedeních: text s ikonou a kulaté ikonové. Destructive používá červenou i pro focus.",renderActionButtons())+
  buttonSection("button-concepts","04 · Hover Concepts","Primary · Reveal Fill: samostatný návrh hover efektu ke schválení. Stávající Primary zůstává beze změny.",reveal)+
  '<p class="btn-note">Ukázkové tlačítko neprovádí žádnou destruktivní akci. Loading je pouze demonstrační stav. Všechny barvy vycházejí z Foundations.</p></div>';
}
const buttonsHTML=renderButtonCatalog();
