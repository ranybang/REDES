(function(){
  'use strict';
  const cfg = window.RANYBANG_CONFIG || {};
  ['nombre','subtitulo','mensaje','pie'].forEach(k => {
    const el=document.getElementById(k);
    if(el && typeof cfg[k] === 'string') el.textContent=cfg[k];
  });
  const icons={
    Instagram:'<rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2"/>',
    TikTok:'<path d="M16 2c.2 3.1 1.9 5 5 5.1v4.1c-2-.1-3.8-.7-5-1.6v6.8c0 4-2.8 6.8-6.7 6.8S2.5 20 2.5 16.5c0-4.3 3.3-7.3 7.7-7.1v4.1c-1.9-.2-3.3.8-3.3 2.7 0 1.5 1 2.7 2.5 2.7 1.7 0 2.6-1.3 2.6-3V2z"/>',
    Facebook:'<path d="M14.6 22v-8.9h3l.5-3.6h-3.5V7.2c0-1 .3-1.7 1.8-1.7h1.9V2.3c-.3-.1-1.4-.3-2.8-.3-2.8 0-4.7 1.7-4.7 4.9v2.6H7.7v3.6h3.1V22z"/>',
    X:'<path d="M18.5 2h3.1L14.8 9.7 23 22h-6.5l-5.1-7.6L4.8 22H1.7l7.4-8.6L1 2h6.7l4.6 6.9L18.5 2zm-1.1 18h1.7L6.7 3.9H4.9z"/>',
    WhatsApp:'<path d="M12 2a10 10 0 0 0-8.65 15.02L2 22l5.13-1.34A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.05.8.81-2.97-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.5-6.15c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.52.12-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.71 4.29 3.8.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.19.21-.59.21-1.1.15-1.19-.06-.11-.23-.17-.48-.3z" fill="currentColor"/>',
  };
  const wrap=document.getElementById('redes');
  (Array.isArray(cfg.redes)?cfg.redes:[]).forEach(red=>{
    if(red.visible===false || !red.url)return;
    let url;
    try{url=new URL(red.url);if(!['https:','http:'].includes(url.protocol))return;}catch{return;}
    const a=document.createElement('a');a.className='social-link';a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',`Abrir ${red.plataforma} en una pestaña nueva`);
    const icon=document.createElement('span');icon.className='social-icon';
    icon.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'+(icons[red.plataforma]||'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>')+'</svg>';
    const info=document.createElement('span');info.className='social-text';
    const title=document.createElement('span');title.className='social-title';title.textContent=red.plataforma||'Red social';
    const username=document.createElement('span');username.className='social-username';username.textContent=red.usuario||'';
    info.append(title,username);
    const arrow=document.createElement('span');arrow.className='arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
    a.append(icon,info,arrow);wrap.append(a);
  });
  document.getElementById('compartir').addEventListener('click',async()=>{
    const aviso=document.getElementById('aviso');
    try{
      if(navigator.share){await navigator.share({title:document.title,url:location.href});aviso.textContent='¡Gracias por compartir!';}
      else if(navigator.clipboard && location.protocol==='https:'){await navigator.clipboard.writeText(location.href);aviso.textContent='Enlace copiado al portapapeles.';}
      else{aviso.textContent='Copia la dirección que aparece en tu navegador para compartir.';}
    }catch(err){if(err.name!=='AbortError')aviso.textContent='Puedes compartir copiando la dirección del navegador.';}
  });
})();
