(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,root=document.documentElement;
/* Persistent light / dark appearance switch. */
const themeToggle=$("#theme-toggle");
let savedTheme="light";try{const storedTheme=localStorage.getItem("portfolio-theme");if(storedTheme==="dark"||storedTheme==="light")savedTheme=storedTheme}catch(e){}
function applyTheme(theme){
 const dark=theme==="dark";
 root.setAttribute("data-theme",dark?"dark":"light");
 if(themeToggle){
  themeToggle.setAttribute("aria-pressed",String(dark));
  themeToggle.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");
  themeToggle.title=dark?"Switch to light mode":"Switch to dark mode";
  const icon=themeToggle.querySelector(".theme-icon"),label=themeToggle.querySelector(".theme-label");
  if(icon)icon.textContent=dark?"☀":"☾";
  if(label)label.textContent=dark?"Light mode":"Dark mode";
 }
}
applyTheme(savedTheme);
if(themeToggle)themeToggle.addEventListener("click",()=>{
 const next=root.getAttribute("data-theme")==="dark"?"light":"dark";
 applyTheme(next);
 try{localStorage.setItem("portfolio-theme",next)}catch(e){}
});

/* Static editorial hero; no rotating headline or typing animation. */
/* spotlight */
const hero=$("#top");if(!reduce)hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();hero.style.setProperty("--mx",(e.clientX-r.left)+"px");hero.style.setProperty("--my",(e.clientY-r.top)+"px")});
/* Rotating subtitle ticker removed for a quieter, more readable experience. */
/* film strip */
let lf="all";const strip=$("#strip"),fc=$("#fc");
[["all","All"],["en","English"],["mr","Marathi"],["hi","Hindi"]].forEach(([k,t])=>{const b=document.createElement("button");b.className="chip";b.textContent=t;b.dataset.k=k;b.onclick=()=>{lf=k;drawL();strip.scrollTo({left:0})};fc.insertBefore(b,fc.firstChild===null?null:$(".arrows",fc))});
const order=["all","en","mr","hi"];$$("button.chip",fc).sort((a,b)=>order.indexOf(a.dataset.k)-order.indexOf(b.dataset.k)).forEach(b=>fc.insertBefore(b,$(".arrows",fc)));
function lang(x){return x.l}
function drawL(){const xs=L.filter(x=>!x.p&&(lf==="all"||lang(x)===lf));strip.innerHTML=xs.map((x,i)=>`<figure class="fr${x.l==="en"?" e":""}" style="margin:0"><div class="n">FRAME ${String(i+1).padStart(2,"0")}</div><blockquote lang="${lang(x)}">${esc(x.q)}</blockquote><figcaption class="w">${esc(x.w)}<span>${esc(x.t)}</span>${ol(x)?`<a href="${ol(x)}" target="_blank" rel="noopener">See the original</a>`:""}</figcaption></figure>`).join("");$$("button.chip",fc).forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.k===lf)))}
drawL();
const step=()=>Math.min(strip.clientWidth*.8,348);$("#nx").onclick=()=>strip.scrollBy({left:step(),behavior:reduce?"auto":"smooth"});$("#pv").onclick=()=>strip.scrollBy({left:-step(),behavior:reduce?"auto":"smooth"});
strip.addEventListener("keydown",e=>{if(e.key==="ArrowRight")$("#nx").click();if(e.key==="ArrowLeft")$("#pv").click()});
/* campaigns */
$("#pw").innerHTML=C.map(c=>`<article class="pz"><div class="m">${esc(c.m)}</div><h3>${esc(c.h)}</h3><p class="case-role">${esc(c.role||"Creative contribution")}</p><div class="case-part"><b>Brief</b><p>${esc(c.brief||c.p)}</p></div><div class="case-part"><b>Idea</b><p>${esc(c.idea||"See project description.")}</p></div>${c.q.map(q=>`<blockquote lang="${q[2]}">${esc(q[0])}</blockquote>`).join("")}<div class="case-part"><b>Result</b><p>${esc(c.result||"Selected work; see the original project.")}</p></div>${c.a?`<p style="margin-top:10px"><a href="${c.a}" target="_blank" rel="noopener">${c.al||"See the original"}</a></p>`:""}</article>`).join("");
/* screen */
const videoId=url=>{const m=String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);return m?m[1]:""};
$("#tg").innerHTML=F.map((f,i)=>{const id=videoId(f[3]);return `<article class="tk video-card${i===4?" award-winning-film":""}" style="--card-index:${i}"><button class="video-thumb has-video" type="button" data-video="${id}" data-title="${esc(f[0])}" aria-label="Play ${esc(f[0])}">${i===4?`<span class="film-award-pin" aria-label="Award-winning short film"><span class="award-medal" aria-hidden="true">🏆</span><span class="award-copy"><strong>AWARD-WINNING</strong><small>SHORT FILM</small></span></span>`:""}<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${esc(f[0])} video thumbnail" loading="lazy"><span class="video-index">FILM / ${String(i+1).padStart(2,"0")}</span><span class="playtag" aria-hidden="true">▶</span><span class="video-watch-label">WATCH FILM</span></button><div class="video-card-copy"><div class="a">SCREEN CREDIT · ${String(i+1).padStart(2,"0")}</div><h3>${esc(f[0])}</h3><div class="video-meta">${esc(f[1])}</div><div class="case-part"><b>My role</b><p>${esc(f[2])}</p></div>${i===0?`<div class="case-part"><b>Credit</b><p>Marathi promotional film, 3 min 44 sec; CBFC Universal certificate dated 16 June 2022.</p></div>`:""}<button class="video-open-link" type="button" data-video="${id}" data-title="${esc(f[0])}">Play this film <span aria-hidden="true">↗</span></button></div></article>`}).join("");
const videoModal=document.createElement("div");videoModal.className="video-modal";videoModal.hidden=true;videoModal.innerHTML=`<div class="video-modal-backdrop" data-video-close></div><section class="video-modal-panel" role="dialog" aria-modal="true" aria-labelledby="video-modal-title"><button class="video-modal-close" type="button" aria-label="Close video">×</button><div class="video-modal-player"><iframe title="Selected film" src="about:blank" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><aside class="video-modal-info"><span class="a">NOW PLAYING / SCREEN WORK</span><h2 id="video-modal-title"></h2><p>Selected screen work and creative credits.</p><span class="video-modal-rule"></span><span class="video-modal-note">A film by the people who made it. A contribution by Yogesh.</span></aside></section>`;
document.body.appendChild(videoModal);
const videoFrame=$("iframe",videoModal),videoTitle=$("#video-modal-title",videoModal),videoClose=$(".video-modal-close",videoModal);
let lastVideoTrigger=null;
function closeVideo(){videoModal.hidden=true;videoModal.classList.remove("is-open");videoFrame.src="about:blank";document.body.classList.remove("video-playing");if(lastVideoTrigger&&document.contains(lastVideoTrigger))lastVideoTrigger.focus();lastVideoTrigger=null}
function openVideo(id,title){if(!id)return;lastVideoTrigger=document.activeElement;videoTitle.textContent=title||"Selected film";videoFrame.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&rel=0";videoModal.hidden=false;document.body.classList.add("video-playing");requestAnimationFrame(()=>videoModal.classList.add("is-open"));videoClose.focus()}
videoModal.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const items=$("button:not([disabled]),iframe",videoModal).filter(el=>el.offsetParent!==null);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
$("#tg").addEventListener("click",e=>{const trigger=e.target.closest("[data-video]");if(trigger)openVideo(trigger.dataset.video,trigger.dataset.title)});
videoClose.addEventListener("click",closeVideo);videoModal.addEventListener("click",e=>{if(e.target.hasAttribute("data-video-close"))closeVideo()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!videoModal.hidden)closeVideo()});
/* Long-form writing is linked directly from the Writing section. */
/* work */
$("#cs").innerHTML=E.map(e=>`<div class="cs ${e.w==="Project"?"project":"experience"}"><button aria-expanded="false"><span class="w">${esc(e.w)}</span><span class="t">${esc(e.t)}<small>${esc(e.o)}</small></span><span class="x" aria-hidden="true">+</span></button><div class="b">${e.d.length>1?"<ul>"+e.d.map(d=>`<li>${esc(d)}</li>`).join("")+"</ul>":`<p>${esc(e.d[0])}</p>`}</div></div>`).join("");
$("#cs").addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b)return;const c=b.closest(".cs"),o=c.classList.toggle("open");b.setAttribute("aria-expanded",String(o))});
const c0=$(".cs");c0.classList.add("open");$("button",c0).setAttribute("aria-expanded","true");
const ta=$("#ta");
const picked={},needs=["Slogan","Ad script","Brand voice","Website copy","Film script","Social captions"];
needs.forEach(n=>{const b=document.createElement("button");b.className="chip";b.textContent=n;b.setAttribute("aria-pressed","false");b.onclick=()=>{picked[n]=!picked[n];b.setAttribute("aria-pressed",String(!!picked[n]));build()};$("#needs").appendChild(b)});
function build(){const list=needs.filter(n=>picked[n]).join(", ")||"(not chosen)";const body="Hi Yogesh,\n\nI'd like help with: "+list+"\n\n"+(ta.value||"(add a few lines)")+"\n\nThanks!";$("#send").href="mailto:yogeshkokane14@gmail.com?subject="+encodeURIComponent("Writing project: "+list)+"&body="+encodeURIComponent(body);return body}
build();ta.addEventListener("input",build);$("#copy").onclick=function(){const b=this;try{navigator.clipboard.writeText(build()).then(()=>{b.textContent="Copied";setTimeout(()=>{b.textContent="Copy"},1500)},()=>{})}catch(e){}};
/* scroll: progress, nav, fab, reveal */
const bar=$("#bar"),links=$$("nav a[data-s]"),fab=$("#fab"),ids=["lines","campaigns","screen","writing","art","work","contact"];
function onS(){const h=root;bar.style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+"%";const sections=ids.map(id=>$("#"+id)).filter(Boolean);let cur="top";for(const s of sections){if(s.getBoundingClientRect().top<=150)cur=s.id}links.forEach(a=>{const active=a.dataset.s===cur;a.classList.toggle("on",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});fab.classList.toggle("show",cur!=="contact"&&h.scrollTop>420)}
addEventListener("scroll",onS,{passive:true});
/* Continuous editorial navigation: all rooms are part of one readable page. */
const rooms=[{id:"top",name:"Home"},{id:"lines",name:"Lines"},{id:"campaigns",name:"Campaigns"},{id:"screen",name:"Screen"},{id:"writing",name:"Writing"},{id:"art",name:"Art"},{id:"work",name:"Work"},{id:"contact",name:"Brief me"}];
$$(".app-view").forEach(v=>v.classList.add("active"));
const roomIndicator=$(".room-indicator");if(roomIndicator)roomIndicator.remove();
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute("href").slice(1);if(!id)return;const target=document.getElementById(id);if(target){e.preventDefault();history.pushState({room:id},"","#"+id);target.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}});
function scrollToHash(){const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);if(target)target.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}
addEventListener("hashchange",scrollToHash);
addEventListener("popstate",scrollToHash);
if("IntersectionObserver" in window){
 const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const id=entry.target.id;links.forEach(a=>{const active=a.dataset.s===id;a.classList.toggle("on",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}})},{rootMargin:"-18% 0px -68% 0px",threshold:0});
 rooms.filter(r=>r.id!=="top").forEach(r=>{const el=$("#"+r.id);if(el)navObserver.observe(el)});
}
onS();
/* One-time production stamp impact when the footer enters view. */
const approvalStamp=$(".production-stamp");
if(approvalStamp){
 if(reduce){approvalStamp.classList.add("hit")}
 else{
  const stampObserver=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){
    approvalStamp.classList.add("hit");
    stampObserver.disconnect();
   }
  },{threshold:.45});
  stampObserver.observe(approvalStamp);
 }
}

/* Motion system: one observer per section, with staggered child choreography. */
root.classList.add("js");
const revealSections=$$("header.app-view,section.app-view");
const motionSelector=".slugline,h2,.sub,.essay-feature,.essay-latest,.worklist article,.pz,.video-card,.art-image-link,.cs,.fav li,.contact-socials,.ct";
revealSections.forEach(section=>{
 section.setAttribute("data-rv","");
 const targets=$$(motionSelector,section);
 targets.forEach((el,i)=>{
  el.classList.add("up");
  el.style.setProperty("--motion-order",String(Math.min(i,8)));
 });
 $$(".dev",section).forEach(el=>el.classList.add("dev"));
 $$("img",section).forEach(el=>el.classList.add("dev"));
 $$("h2 em",section).forEach(el=>el.classList.add("sk"));
});
/* The hero enters on load; the rest enter as the reader reaches each scene. */
const heroSection=$("#top");
if(heroSection){
 $$("#top .wrap > *").forEach((el,i)=>{
  el.classList.add("hero-enter");
  el.style.setProperty("--hero-order",String(i));
 });
 heroSection.classList.add("in");
}
if(reduce){
 revealSections.forEach(section=>section.classList.add("in"));
}else if("IntersectionObserver" in window){
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    entry.target.classList.add("in");
    revealObserver.unobserve(entry.target);
   }
  });
 },{threshold:.12,rootMargin:"0px 0px -10% 0px"});
 revealSections.filter(section=>section!==heroSection).forEach(section=>revealObserver.observe(section));
}else{
 revealSections.forEach(section=>section.classList.add("in"));
}
/* Measure the real SVG path, so the contact loop draws completely at any size. */
const contactLoop=$("#contact .circ path");
if(contactLoop){
 const length=contactLoop.getTotalLength();
 contactLoop.style.setProperty("--loop-length",String(length));
 contactLoop.style.strokeDasharray=String(length);
 contactLoop.style.strokeDashoffset=reduce?"0":String(length);
}
/* Ensure the marquee begins from a clean animation state after layout. */
const tickerTrack=$(".client-ticker-track");
if(tickerTrack){
 tickerTrack.style.willChange="transform";
 tickerTrack.setAttribute("aria-label","Selected clients and collaborations");
}

})();
