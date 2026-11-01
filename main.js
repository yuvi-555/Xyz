(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,root=document.documentElement;
/* theme */
try{const t=localStorage.getItem("theme");if(t)root.setAttribute("data-theme",t)}catch(e){}
$("#theme").onclick=()=>{const a=root.getAttribute("data-theme"),d=a?a==="dark":matchMedia("(prefers-color-scheme: dark)").matches,n=d?"light":"dark";root.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}};
/* slugline + typewriter words */
const slug=$("#slug"),st="INT. A DESK IN SOLAPUR. DAY.";let si=0;
if(reduce)slug.textContent=st;else(function t(){slug.textContent=st.slice(0,++si);if(si<st.length)setTimeout(t,55)})();
const words=["slogans","ad scripts","captions","brand voice","film scripts","long-form articles"],tw=$("#tw");let wi=0,ci=0,del=false;
if(reduce)tw.textContent=words[0];else(function k(){const w=words[wi];ci+=del?-1:1;tw.textContent=w.slice(0,ci);let d=del?45:95;if(!del&&ci===w.length){del=true;d=1500}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=320}setTimeout(k,d)})();
/* spotlight */
const hero=$("#top");if(!reduce)hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();hero.style.setProperty("--mx",(e.clientX-r.left)+"px");hero.style.setProperty("--my",(e.clientY-r.top)+"px")});
/* subtitles */
const H=L.filter(x=>x.h),sb=$("#sb");let hi=0,tm,paused=false;
function paint(){const s=H[hi],q=$("#sq");q.textContent=s.q;q.lang=s.l;$("#sw").textContent=s.w+", "+s.t}
function go(){if(reduce){hi=(hi+1)%H.length;paint();return}sb.classList.add("out");setTimeout(()=>{hi=(hi+1)%H.length;paint();sb.classList.remove("out")},300)}
function run(){clearInterval(tm);if(!reduce&&!paused)tm=setInterval(go,5200)}
paint();run();$("#pz").onclick=function(){paused=!paused;this.textContent=paused?"Play":"Pause";run()};
/* credits */
const names=[...new Set(L.filter(x=>!x.p).map(x=>x.w.split(",")[0]).concat(["Lokmangal Foundation","Prabhav Advertising Agency","Samosa Design","MH13BE","Madanlal Agencies","Jay Academy"]))];
$("#cr").innerHTML=(names.map(n=>`<span>${esc(n)}</span>`).join("")).repeat(2);
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
$("#tg").innerHTML=F.map((f,i)=>`<article class="tk"><div class="a">SCREEN CREDIT · ${String(i+1).padStart(2,"0")}</div><h3>${esc(f[0])}</h3><div class="case-part"><b>Brief</b><p>${esc(f[1])}</p></div><div class="case-part"><b>My role</b><p>${esc(f[2])}</p></div>${i===0?`<div class="case-part"><b>Credit</b><p>Marathi promotional film, 3 min 44 sec; CBFC Universal certificate dated 16 June 2022.</p></div>`:""}<a class="btn" href="${f[3]}" target="_blank" rel="noopener">${f[1]==="Song"||f[1]==="Rap song"?"Listen / watch":"Watch"}</a></article>`).join("");
$("#bl").innerHTML=B.map(b=>`<li><a href="${b[2]}" target="_blank" rel="noopener">${esc(b[0])}<span>${esc(b[1])}</span></a></li>`).join("");
/* Long-form writing is linked directly from the Writing section. */
/* work */
$("#cs").innerHTML=E.map(e=>`<div class="cs"><button aria-expanded="false"><span class="w">${esc(e.w)}</span><span class="t">${esc(e.t)}<small>${esc(e.o)}</small></span><span class="x" aria-hidden="true">+</span></button><div class="b">${e.d.length>1?"<ul>"+e.d.map(d=>`<li>${esc(d)}</li>`).join("")+"</ul>":`<p>${esc(e.d[0])}</p>`}</div></div>`).join("");
$("#cs").addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b)return;const c=b.closest(".cs"),o=c.classList.toggle("open");b.setAttribute("aria-expanded",String(o))});
const c0=$(".cs");c0.classList.add("open");$("button",c0).setAttribute("aria-expanded","true");
/* typewriter */
const ks=$("#keys"),kel=[];[[9,32,106],[8,48,148]].forEach(([n,x0,y])=>{for(let i=0;i<n;i++){const c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",x0+22+i*42);c.setAttribute("cy",y-72+48);c.setAttribute("r",15);c.setAttribute("class","key");ks.appendChild(c);kel.push(c)}});
kel.forEach((c,i)=>{c.setAttribute("cy",i<9?124:160)});
let snd=false,ac;const ta=$("#ta");
function click(){if(!snd)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type="square";o.frequency.value=700+Math.random()*300;g.gain.value=.05;g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.06);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.07)}catch(e){}}
ta.addEventListener("input",()=>{const k=kel[Math.floor(Math.random()*kel.length)];k.classList.add("dn");setTimeout(()=>k.classList.remove("dn"),110);click();build()});
$("#snd").onclick=function(){snd=!snd;this.setAttribute("aria-pressed",String(snd));this.textContent="Key sound: "+(snd?"on":"off");click()};
const picked={},needs=["Slogan","Ad script","Brand voice","Website copy","Film script","Social captions"];
needs.forEach(n=>{const b=document.createElement("button");b.className="chip";b.textContent=n;b.setAttribute("aria-pressed","false");b.onclick=()=>{picked[n]=!picked[n];b.setAttribute("aria-pressed",String(!!picked[n]));build()};$("#needs").appendChild(b)});
function build(){const list=needs.filter(n=>picked[n]).join(", ")||"(not chosen)";const body="Hi Yogesh,\n\nI'd like help with: "+list+"\n\n"+(ta.value||"(add a few lines)")+"\n\nThanks!";$("#send").href="mailto:yogeshkokane14@gmail.com?subject="+encodeURIComponent("Writing project: "+list)+"&body="+encodeURIComponent(body);return body}
build();$("#copy").onclick=function(){const b=this;try{navigator.clipboard.writeText(build()).then(()=>{b.textContent="Copied";setTimeout(()=>{b.textContent="Copy"},1500)},()=>{})}catch(e){}};
/* scroll: progress, nav, fab, reveal */
const bar=$("#bar"),links=$$("nav a[data-s]"),fab=$("#fab"),ids=["lines","campaigns","screen","writing","art","work","contact"];
function onS(){const h=root;bar.style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+"%";const active=$(".app-view.active");const cur=active?.id||"top";links.forEach(a=>{const active=a.dataset.s===cur;a.classList.toggle("on",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});fab.classList.toggle("show",cur!=="contact"&&h.scrollTop>260)}
addEventListener("scroll",onS,{passive:true});
/* App-like room navigation: each major section becomes a focused view. */
const rooms=[{id:"top",name:"Home"},{id:"lines",name:"Lines"},{id:"campaigns",name:"Campaigns"},{id:"screen",name:"Screen"},{id:"writing",name:"Writing"},{id:"art",name:"Art"},{id:"work",name:"Work"},{id:"contact",name:"Brief me"}];
const roomIndicator=document.createElement("div");roomIndicator.className="room-indicator";roomIndicator.setAttribute("aria-live","polite");roomIndicator.innerHTML='<span id="room-name">HOME</span><span id="room-count">01 / 08</span>';$("nav").after(roomIndicator);
function showRoom(id,updateHash=false){const room=rooms.find(x=>x.id===id)||rooms[0];$$(".app-view").forEach(v=>v.classList.toggle("active",v.id===room.id));root.classList.add("room-mode");document.body.classList.add("room-mode");$("#room-name").textContent=room.name.toUpperCase();$("#room-count").textContent=String(rooms.indexOf(room)+1).padStart(2,"0")+" / "+String(rooms.length).padStart(2,"0");links.forEach(a=>{const active=a.dataset.s===room.id;a.classList.toggle("on",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});const activeLink=links.find(a=>a.dataset.s===room.id);if(activeLink){const rail=activeLink.parentElement;const left=activeLink.offsetLeft-rail.offsetLeft;const right=left+activeLink.offsetWidth;if(left<rail.scrollLeft)rail.scrollTo({left,behavior:reduce?"auto":"smooth"});else if(right>rail.scrollLeft+rail.clientWidth)rail.scrollTo({left:right-rail.clientWidth,behavior:reduce?"auto":"smooth"})}if(updateHash){const hash=room.id==="top"?"#top":"#"+room.id;if(location.hash!==hash)history.pushState({room:room.id},"",hash)}window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});onS()}
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute("href").slice(1);const target=$("#"+CSS.escape(id));if(target&&target.classList.contains("app-view")){e.preventDefault();showRoom(id,true)}});
addEventListener("hashchange",()=>showRoom(location.hash.slice(1)||"top",false));
addEventListener("popstate",()=>showRoom(location.hash.slice(1)||"top",false));
showRoom(location.hash.slice(1)||"top",false);
if(!reduce){root.classList.add("js");const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");ro.unobserve(e.target)}}),{threshold:.05});$$("section .wrap").forEach(x=>{x.classList.add("rv");ro.observe(x)})}
})();
