const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
function getCart(){try{return JSON.parse(localStorage.getItem('cart')||'[]')}catch{return[]}}
function setCart(c){localStorage.setItem('cart',JSON.stringify(c));updateCartCount()}
function updateCartCount(){const n=getCart().reduce((a,i)=>a+i.quantity,0);$$('#cart-count').forEach(e=>e.textContent=n)}
function addToCart(product,size,quantity=1){const cart=getCart();const key=`${product.id}-${size}`;const found=cart.find(i=>i.key===key);if(found)found.quantity+=quantity;else cart.push({key,id:product.id,name:product.nome,price:product.oferta?product.preco:product.preco,image:product.imagem,size,quantity});setCart(cart)}
function removeFromCart(key){setCart(getCart().filter(i=>i.key!==key))}
function showToast(msg='Adicionado ao carrinho'){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function initNav(){const nav=$('#navbar');let last=scrollY;addEventListener('scroll',()=>{if(!nav)return;nav.classList.toggle('scrolled',scrollY>30);if(scrollY>last+8&&scrollY>120)nav.classList.add('hidden');if(scrollY<last-8)nav.classList.remove('hidden');last=scrollY},{passive:true});const menu=$('[data-menu]'),mobile=$('#mobile-menu');menu?.addEventListener('click',()=>mobile?.classList.toggle('open'));$('[data-search]')?.addEventListener('click',()=>$('#search-panel')?.classList.add('open'));$('[data-close-search]')?.addEventListener('click',()=>$('#search-panel')?.classList.remove('open'));updateCartCount()}
function initLenis(){if(!window.Lenis||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const lenis=new Lenis({duration:1.15,smoothWheel:true,touchMultiplier:1});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);window.vintageLenis=lenis}
document.addEventListener('DOMContentLoaded',()=>{initNav();initLenis()});
