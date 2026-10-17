const PRODUCTS = [
 {id:1,name:"Studio headphones",category:"Tech",price:39.90,tag:"Bestseller",desc:"Your soundtrack, your space.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",bg:"#24243a"},
 {id:2,name:"Everyday tote",category:"Fashion",price:18.50,tag:"Easy favourite",desc:"Room for all the little things.",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",bg:"#352b32"},
 {id:3,name:"Minimal desk lamp",category:"Home",price:27.00,tag:"Good design",desc:"A softer glow for your space.",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",bg:"#2d3441"},
 {id:4,name:"Everyday trainers",category:"Fashion",price:54.95,tag:"Fresh pick",desc:"Comfort for wherever you go.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",bg:"#382a34"},
 {id:5,name:"Smart watch",category:"Tech",price:64.00,tag:"On the go",desc:"A little more connected.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",bg:"#263638"},
 {id:6,name:"Ceramic cup set",category:"Home",price:16.90,tag:"Cosy pick",desc:"Make your coffee break count.",image:"https://images.unsplash.com/photo-1514228742587-6b1558f4e1d2?auto=format&fit=crop&w=800&q=85",bg:"#40332d"},
 {id:7,name:"Everyday backpack",category:"Accessories",price:32.00,tag:"Ready to go",desc:"Your essentials, neatly packed.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",bg:"#26313b"},
 {id:8,name:"Classic sunglasses",category:"Accessories",price:14.95,tag:"Sunny days",desc:"A little shade, a lot of style.",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",bg:"#34303c"}
];
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
let activeFilter="All", cart=JSON.parse(localStorage.getItem("meryemDemoCart")||"[]"), toastTimer;
const money = value => new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR"}).format(value);
function showToast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300)}
function renderProducts(){const term=$("#productSearch").value.trim().toLowerCase();const list=PRODUCTS.filter(p=>(activeFilter==="All"||p.category===activeFilter)&&(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(term));$("#productGrid").innerHTML=list.map((p,i)=>`<article class="product-card" style="animation-delay:${i*45}ms"><div class="product-visual" style="--product-bg:${p.bg}"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.tag}</span><button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div><div class="product-meta"><span class="product-category">${p.category}</span><div class="product-title-row"><h3>${p.name}</h3><span class="product-price">${money(p.price)}</span></div><p class="product-desc">${p.desc}</p></div></article>`).join("");$("#emptyState").hidden=list.length>0}
function saveCart(){localStorage.setItem("meryemDemoCart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag")}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart()}
function renderCart(){const count=cart.reduce((n,x)=>n+x.qty,0);$("#cartCount").textContent=count;const entries=cart.map(x=>({...PRODUCTS.find(p=>p.id===x.id),qty:x.qty})).filter(x=>x.id);$("#cartItems").innerHTML=entries.length?entries.map(p=>`<article class="cart-row"><img class="cart-thumb" src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div><div><strong>${money(p.price*p.qty)}</strong><br><button class="cart-remove" data-remove="${p.id}">Remove</button></div></article>`).join(""):'<p class="cart-empty">Your bag is waiting for something good.</p>';$("#cartSubtotal").textContent=money(entries.reduce((n,p)=>n+p.price*p.qty,0))}
function openOverlay(id){$("#"+id).hidden=false;document.body.classList.add("locked")}
function closeOverlay(id){$("#"+id).hidden=true;if($$(".overlay:not([hidden])").length===0)document.body.classList.remove("locked")}
$("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
$("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q)changeQty(Number(q.dataset.qty),Number(q.dataset.delta));if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart()}});
$$("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;$$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));renderProducts()}));
$$("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>{activeFilter=a.dataset.filterLink;$$("[data-filter]").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();$("#mainNav")?.classList.remove("open")}));
$("#productSearch").addEventListener("input",renderProducts);
$("#searchToggle").addEventListener("click",()=>{$("#productSearch").focus();$("#shop").scrollIntoView({behavior:"smooth"})});
$("#cartButton").addEventListener("click",()=>{renderCart();openOverlay("cartOverlay")});
$("#accountButton").addEventListener("click",()=>openOverlay("authOverlay"));
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeOverlay(b.dataset.close)));
$$(".overlay").forEach(o=>o.addEventListener("click",e=>{if(e.target===o)closeOverlay(o.id)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".overlay:not([hidden])").forEach(o=>closeOverlay(o.id))});
$("#checkoutButton").addEventListener("click",()=>showToast(cart.length?"Checkout isn't connected in this demo yet.":"Your bag is empty"));
$("#menuButton").addEventListener("click",()=>{const nav=$(".main-nav"),opened=nav.classList.toggle("open");$("#menuButton").setAttribute("aria-expanded",String(opened))});
let authMode="signin";
function setAuthMode(mode){authMode=mode;$$("[data-auth-mode]").forEach(b=>b.classList.toggle("active",b.dataset.authMode===mode));const signup=mode==="signup";$("#authName").hidden=!signup;$("#nameLabel").hidden=!signup;$("#authName").required=signup;$("#authPassword").autocomplete=signup?"new-password":"current-password";$("#authTitle").textContent=signup?"Create your account.":"Good to see you.";$("#authIntro").textContent=signup?"A quick demo signup to explore the store.":"Sign in to your demo account or create one to try the experience." ;$("#authSubmit").innerHTML=(signup?"Create account":"Sign in")+' <span>→</span>';$("#authMessage").textContent=""}
$$("[data-auth-mode]").forEach(b=>b.addEventListener("click",()=>setAuthMode(b.dataset.authMode)));
$("#authForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#authEmail").value.trim();const password=$("#authPassword").value;if(password.length<8){$("#authMessage").textContent="Use at least 8 characters for this demo.";return}if(authMode==="signup"&&!$("#authName").value.trim()){ $("#authMessage").textContent="Please enter your name.";return }localStorage.setItem("meryemDemoUser",JSON.stringify({email,name:$("#authName").value.trim()||email.split("@")[0]}));$("#authMessage").textContent="Demo "+(authMode==="signup"?"account created":"sign-in complete")+"!";$("#accountButton").textContent="Hi, "+(($("#authName").value.trim()||email.split("@")[0]).slice(0,12));setTimeout(()=>closeOverlay("authOverlay"),900)});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Thanks! This demo does not send or save emails.";e.target.reset()});
$("#year").textContent=new Date().getFullYear();
const existingUser=JSON.parse(localStorage.getItem("meryemDemoUser")||"null");if(existingUser?.email)$("#accountButton").textContent="Hi, "+(existingUser.name||"there").slice(0,12);
renderProducts();renderCart();
