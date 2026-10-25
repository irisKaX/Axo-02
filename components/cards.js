/* Base Card Studio V1 · local comparisons only */
const cardTypes=[["clean","01 · Clean","Jemný border a klidný povrch.","Čistý základ"],["depth","02 · Depth","Subtilní hloubka, světlo a měkký stín.","Prostorový materiál"],["accent","03 · Accent","Fialový detail a výraznější interakce.","Akcentní materiál"]];
const cardGlyph='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 9h8M8 13h6"/></svg>';
function cardExample(material,title,description,footnote){
 return '<button type="button" class="axo-base-card" data-material="'+material+'" data-card-demo="'+material+'"><span class="axo-card-symbol">'+cardGlyph+'</span><span class="axo-card-name">'+title+'</span><span class="axo-card-description">'+description+'</span><span class="axo-card-bottom">'+footnote+'</span></button>';
}
function renderCards(){
 const host=document.getElementById("sectionContent");if(!host)return;
 host.innerHTML='<div class="card-studio"><div class="foundation-note">Base Card Studio V1: porovnání tří materiálových stylů. Zatím žádná varianta není finálně schválená.</div><div class="card-studio-heading"><h2>01 · Base Card Studio</h2><p>Clean, Depth a Accent sdílejí stejnou strukturu. Vyzkoušej hover, focus pomocí Tab a kliknutí.</p></div><div class="card-studio-grid">'+cardTypes.map(([material,title,description,footnote])=>cardExample(material,title,description,footnote)).join("")+'</div><div class="card-studio-feedback" id="card-studio-feedback" aria-live="polite">Vyber kartu pro zobrazení jejího stylu.</div><div class="card-studio-heading"><h2>02 · Dark / Light Comparison</h2><p>Stejná Base Card na světlém a tmavém povrchu.</p></div><div class="card-studio-context"><div class="card-studio-surface" data-preview-theme="dark"><div class="card-studio-surface-label">Dark</div>'+cardExample("clean","Clean Base Card","Kontrola typografie a kontrastu.","Default material")+'</div><div class="card-studio-surface" data-preview-theme="light"><div class="card-studio-surface-label">Light</div>'+cardExample("clean","Clean Base Card","Kontrola typografie a kontrastu.","Default material")+'</div></div></div>';
}
document.addEventListener("click",event=>{
 const selected=event.target.closest("[data-card-demo]");if(!selected)return;
 const message=document.getElementById("card-studio-feedback");
 if(message)message.textContent="Vybraná ukázka: "+selected.dataset.cardDemo+". Karty zatím neotevírají žádný nástroj.";
});
