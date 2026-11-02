/* La selección aparece en cada apertura. Volver al menú conserva la sesión. */
(() => {
 const $=id=>document.getElementById(id);
 function showFrench(){
  $('language-menu').hidden=true;$('french-app').hidden=false;
  $('language-badge').hidden=false;$('change-language').hidden=false;$('language-tagline').hidden=true;
  document.title='Atelier · Francés de A1 a B2';
  document.querySelector('[data-view][aria-pressed="true"]')?.focus();
  window.scrollTo?.({top:0,behavior:'instant'});
 }
 function showLanguages(){
  $('french-app').hidden=true;$('language-menu').hidden=false;
  $('language-badge').hidden=true;$('change-language').hidden=true;$('language-tagline').hidden=false;
  document.title='Atelier · Elige tu idioma';
  if('speechSynthesis' in window)window.speechSynthesis.cancel();
  $('enter-french').focus();window.scrollTo?.({top:0,behavior:'instant'});
 }
 $('enter-french').addEventListener('click',showFrench);
 $('change-language').addEventListener('click',showLanguages);
 $('language-home').addEventListener('click',event=>{event.preventDefault();showLanguages();});
})();
