/* Fresh Dashboard viewport simulation. Layout is inside an actual 1366 / 1920 / 390 px iframe. */
(function(){
"use strict";
const presets={laptop:{label:"Laptop",width:1366,height:768},desktop:{label:"Desktop",width:1920,height:1080},mobile:{label:"Mobil",width:390,height:844}};
let device="laptop",zoom="fit",observer=null,frame=null;
function syncTheme(){
 if(!frame?.contentDocument)return;
 const source=getComputedStyle(document.documentElement);
 const dest=frame.contentDocument.documentElement;
 for(const [target,token] of [["--bg","--background"],["--surface","--card"],["--border","--border"],["--foreground","--foreground"],["--radius","--radius"],["--shadow","--shadow-md"]]){
  dest.style.setProperty(target,source.getPropertyValue(token));
 }
 dest.style.colorScheme=document.documentElement.dataset.theme==="dark"?"dark":"light";
}
function measure(){
 const root=document.getElementById("dashboard-device-viewer");if(!root)return;
 const stage=root.querySelector(".dashboard-viewer-viewport"),p=root.querySelector(".dashboard-viewport-positioner");
 const current=presets[device];const available=Math.max(1,stage.clientWidth-32);
 const factor=zoom==="fit"?Math.min(1,available/current.width):1;
 p.style.width=(current.width*factor)+"px";p.style.height=(current.height*factor)+"px";
 frame.style.width=current.width+"px";frame.style.height=current.height+"px";
 frame.style.transform="scale("+factor+")";
 root.querySelector("#dashboard-scale").textContent=Math.round(factor*100)+" %"+(factor===1?" · 1:1":" · náhled ve zmenšeném měřítku");
 root.querySelector("#dashboard-resolution").textContent=current.label+" · "+current.width+" × "+current.height+" CSS px";
 root.querySelectorAll("[data-dashboard-device]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.dashboardDevice===device)));
 root.querySelectorAll("[data-dashboard-zoom]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.dashboardZoom===zoom)));
}
function render(){
 const canvas=document.querySelector(".canvas");if(!canvas)return;
 let root=document.getElementById("dashboard-device-viewer");
 if(!root){
 root=document.createElement("div");root.id="dashboard-device-viewer";root.className="dashboard-device-viewer";
 root.innerHTML='<div class="dashboard-devices" role="group" aria-label="Zařízení">'+Object.entries(presets).map(([key,v])=>'<button type="button" class="dashboard-device-button" data-dashboard-device="'+key+'" aria-pressed="false">'+v.label+' · '+v.width+' × '+v.height+'</button>').join("")+'<button type="button" class="dashboard-zoom-button" data-dashboard-zoom="fit">Přizpůsobit</button><button type="button" class="dashboard-zoom-button" data-dashboard-zoom="actual">1:1</button></div><div class="dashboard-viewer-meta"><strong id="dashboard-resolution"></strong><span id="dashboard-scale"></span></div><div class="dashboard-viewer-viewport"><div class="dashboard-viewport-positioner"><iframe class="dashboard-viewport-frame" title="Dashboard layout, skutečný viewport" src="dashboard-frame.html" loading="eager"></iframe></div></div><p class="dashboard-viewer-help">Rozložení se počítá v reálném CSS viewportu zvoleného zařízení. Přizpůsobit zmenšuje pouze náhled, ne rozměry widgetů. V režimu 1:1 lze plochu posouvat. Na mobilu je obsah Dashboardu svisle posuvný.</p>';
 root.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.dashboardDevice){device=b.dataset.dashboardDevice;measure()}else if(b.dataset.dashboardZoom){zoom=b.dataset.dashboardZoom;measure()}});
 canvas.append(root);
 frame=root.querySelector("iframe");frame.addEventListener("load",syncTheme);
 observer=new ResizeObserver(measure);observer.observe(root.querySelector(".dashboard-viewer-viewport"));
 }
 measure();syncTheme();
}
function hide(){if(observer){observer.disconnect();observer=null;}document.getElementById("dashboard-device-viewer")?.remove();frame=null;}
window.AxoDashboardViewer={render,hide,syncTheme};
})();
