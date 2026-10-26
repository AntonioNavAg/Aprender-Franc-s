/* Vocabulario local: catálogo, filtros y sesiones de hasta 20 palabras. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const words=window.VOCABULARIO;
  const labels={noun:'Sustantivo',adjective:'Adjetivo',adverb:'Adverbio',expression:'Expresión',numeral:'Número',pronoun:'Pronombre',conjunction:'Conjunción',preposition:'Preposición'};
  const genders={m:'masculino',f:'femenino',mf:'masculino / femenino',mp:'masculino plural',fp:'femenino plural'};
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/’/g,"'").replace(/\s+/g,' ').trim();
  const strictText=text=>String(text).normalize('NFC').toLowerCase().replace(/’/g,"'").replace(/\s+/g,' ').trim();
  const senses=word=>word.es.split(/\s*[;/]\s*/).map(normalize);
  const equivalent=(a,b)=>senses(a).some(sense=>senses(b).includes(sense));
  const description=word=>[labels[word.type],word.type==='noun'&&word.feminine?'masculino / femenino':genders[word.gender],word.level].filter(Boolean).join(' · ');
  const display=word=>word.feminine && word.feminine!==word.fr ? `${word.fr} / ${word.feminine}` : word.fr;
  const storageKey='atelier-vocabulaire-v1';
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch{}
  const validIds=new Set(words.map(word=>word.id));
  const safeIds=values=>new Set(Array.isArray(values)?values.filter(id=>validIds.has(id)):[]);
  const favorites=safeIds(saved.favorites), learned=safeIds(saved.learned);
  const validCount=n=>Number.isSafeInteger(n)&&n>=0?n:0;
  let attempts=validCount(saved.attempts),correct=Math.min(validCount(saved.correct),attempts);
  let filtered=[],page=0,session=[],index=0,current=null,answered=false,sessionCorrect=0;
  const pageSize=24;
  const themes=[...new Set(words.map(word=>word.theme))];
  const themeButtons=new Map();
  function persist(){
    try{localStorage.setItem(storageKey,JSON.stringify({favorites:[...favorites],learned:[...learned],attempts,correct}));}
    catch{$('v-save-note').textContent='Almacenamiento no disponible: el aprendizaje de palabras dura esta sesión.';}
    renderStats();
  }
  function renderStats(){
    $('v-stats').textContent=`${learned.size} / ${words.length.toLocaleString('es')} aprendidas · ${correct} / ${attempts} aciertos`;
    for(const [theme,{button,count}] of themeButtons){
      const items=words.filter(w=>w.theme===theme);
      count.textContent=`${items.length} entradas · ${items.filter(w=>learned.has(w.id)).length} aprendidas`;
      const active=$('v-theme').value===theme;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    }
  }
  function button(text,fn,className='small'){
    const el=document.createElement('button');el.type='button';el.textContent=text;el.className=className;el.addEventListener('click',fn);return el;
  }
  function starState(el,word){
    const active=favorites.has(word.id);el.textContent=active?'★ Favorito':'☆ Favorito';el.classList.toggle('selected',active);
    el.setAttribute('aria-pressed',String(active));el.setAttribute('aria-label',`${active?'Quitar de':'Añadir a'} favoritos: ${word.fr}`);
  }
  function toggleFavorite(word){
    if(favorites.has(word.id))favorites.delete(word.id);else favorites.add(word.id);
    persist();applyFilters(false);if(current)starState($('v-star'),current);
  }
  function speak(text){
    if(!('speechSynthesis' in window)){alert('Este navegador no admite pronunciación.');return;}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.85;
    const voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('fr'));if(voice)utterance.voice=voice;
    speechSynthesis.speak(utterance);
  }
  function applyFilters(reset=true){
    const query=normalize($('v-search').value),theme=$('v-theme').value,level=$('v-level').value,type=$('v-type').value;
    filtered=words.filter(word=>(theme==='all'||word.theme===theme)&&(level==='all'||word.level===level)&&(type==='all'||word.type===type)&&(!$('v-favorites').checked||favorites.has(word.id))&&(!$('v-pending').checked||!learned.has(word.id))&&normalize(`${word.fr} ${word.feminine||''} ${word.es} ${word.note||''}`).includes(query));
    if(reset)page=0;
    page=Math.min(page,Math.max(0,Math.ceil(filtered.length/pageSize)-1));renderList();renderStats();
  }
  function renderList(){
    $('v-count').textContent=`${filtered.length.toLocaleString('es')} de ${words.length.toLocaleString('es')} entradas`;
    $('v-start').disabled=!filtered.length;
    $('v-start').textContent=filtered.length?`Practicar ${Math.min(20,filtered.length)} palabras →`:'Sin palabras para practicar';
    $('v-list').replaceChildren();
    if(!filtered.length){const p=document.createElement('p');p.className='empty';p.textContent='No hay palabras con estos filtros. Prueba otro tema o limpia los filtros.';$('v-list').append(p);}
    for(const word of filtered.slice(page*pageSize,(page+1)*pageSize)){
      const article=document.createElement('article');article.className='word-card';
      const meta=document.createElement('p');meta.className='word-meta';meta.textContent=description(word);
      const title=document.createElement('h3');title.lang='fr';title.textContent=display(word);
      const translation=document.createElement('p');translation.className='word-translation';translation.textContent=word.es;
      const theme=document.createElement('p');theme.className='word-theme';theme.textContent=word.theme;
      const actions=document.createElement('div');actions.className='word-actions';
      const star=button('',()=>toggleFavorite(word));starState(star,word);
      const audio=button('♫',()=>speak(word.fr));audio.setAttribute('aria-label',`Escuchar ${word.fr}`);
      const known=button(learned.has(word.id)?'✓ Aprendida':'Marcar aprendida',()=>{
        if(learned.has(word.id))learned.delete(word.id);else learned.add(word.id);persist();applyFilters(false);
      });known.setAttribute('aria-pressed',String(learned.has(word.id)));known.setAttribute('aria-label',`${learned.has(word.id)?'Marcar por aprender':'Marcar aprendida'}: ${word.fr}`);known.classList.toggle('selected',learned.has(word.id));
      actions.append(star,audio,known);article.append(meta,title,translation);if(word.note){const note=document.createElement('p');note.className='word-note';note.textContent=word.note;article.append(note);}article.append(theme,actions);$('v-list').append(article);
    }
    const pages=Math.max(1,Math.ceil(filtered.length/pageSize));
    $('v-page').textContent=`Página ${page+1} de ${pages}`;
    $('v-prev-page').disabled=page===0;$('v-next-page').disabled=page>=pages-1;
  }
  function shuffle(items){
    const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
  }
  function startSession(){
    if(!filtered.length)return;
    session=shuffle(filtered).slice(0,20);index=0;sessionCorrect=0;
    $('v-browser').hidden=true;$('v-study').hidden=false;showQuestion();
  }
  function showQuestion(){
    current=session[index];if(!current)return;answered=false;
    const mode=$('v-mode').value;
    $('v-position').textContent=`PALABRA ${index+1} / ${session.length}`;
    $('v-context').textContent=`${current.theme} · ${description(current)}`;
    $('v-question').textContent=current.es;
    $('v-cards').hidden=mode!=='cards';$('v-choices').hidden=mode!=='quiz';$('v-write').hidden=mode!=='write';
    $('v-reveal').hidden=false;$('v-revealed').hidden=true;$('v-listen').hidden=true;$('v-next').hidden=true;
    $('v-known').disabled=false;$('v-again').disabled=false;$('v-check').disabled=false;$('v-input').disabled=false;$('v-input').value='';
    $('v-feedback').textContent='';$('v-feedback').className='v-feedback';
    $('v-answer').textContent=display(current);$('v-grammar').textContent=description(current)+(current.note?' · '+current.note:'');
    $('v-next').textContent=index===session.length-1?'Terminar sesión →':'Siguiente →';
    starState($('v-star'),current);
    if(mode==='quiz')renderOptions();
    if(mode==='write')$('v-input').focus();else $('v-question').setAttribute('tabindex','-1');
  }
  function renderOptions(){
    $('v-choices').replaceChildren();
    const isDistractor=w=>w.id!==current.id&&!equivalent(w,current);
    const nearby=shuffle(words.filter(w=>w.theme===current.theme&&w.type===current.type&&isDistractor(w)));
    const distractors=nearby.slice(0,3);
    if(distractors.length<3){const ids=new Set(distractors.map(w=>w.id));distractors.push(...shuffle(words.filter(w=>isDistractor(w)&&!ids.has(w.id))).slice(0,3-distractors.length));}
    for(const word of shuffle([current,...distractors])){
      const choice=button(display(word),()=>{
        if(answered)return;
        const ok=word.id===current.id;
        for(const child of $('v-choices').children){child.disabled=true;if(child.dataset.id===current.id)child.classList.add('correct');}
        if(!ok)choice.classList.add('wrong');finish(ok);
      },'');choice.lang='fr';choice.dataset.id=word.id;$('v-choices').append(choice);
    }
  }
  function finish(ok,extra=''){
    if(answered||!current)return;
    answered=true;attempts++;
    if(ok){correct++;sessionCorrect++;learned.add(current.id);}else learned.delete(current.id);
    persist();$('v-feedback').className=`v-feedback ${ok?'good':'bad'}`;
    $('v-feedback').textContent=(ok?'¡Bien hecho! ': 'Para repasar: ')+display(current)+'.'+(extra?' '+extra:'');
    $('v-input').disabled=true;$('v-check').disabled=true;$('v-known').disabled=true;$('v-again').disabled=true;
    $('v-listen').hidden=false;$('v-next').hidden=false;$('v-next').focus();
  }
  function backToList(){
    current=null;$('v-study').hidden=true;$('v-browser').hidden=false;applyFilters(false);$('v-start').focus();
  }
  function checkWritten(event){
    event.preventDefault();if(answered||!current)return;
    const input=$('v-input').value.trim();if(!input){$('v-feedback').textContent='Escribe una respuesta antes de comprobar.';return;}
    const clean=$('v-strict').checked?strictText:normalize;
    const answers=words.filter(w=>w.id===current.id||equivalent(w,current));
    const match=answers.find(word=>{
      const typed=word.type==='noun'?clean(input).replace(/^(?:l'|le |la |les |un |une |des )/,''):clean(input);
      return [word.fr,word.feminine].filter(Boolean).some(form=>clean(form)===typed);
    });
    let extra=match&&match.id!==current.id?`También es válido: ${display(match)}.`:'';
    if(match&&!$('v-strict').checked)extra+=` Ortografía: ${display(match)}.`;
    finish(Boolean(match),extra.trim());
  }
  for(const theme of themes){
    const option=document.createElement('option');option.value=theme;option.textContent=theme;$('v-theme').append(option);
    const tile=button('',()=>{$('v-theme').value=theme;applyFilters();$('v-start').focus();},'theme-tile');
    const title=document.createElement('strong');title.textContent=theme;
    const count=document.createElement('span');tile.append(title,count);$('v-themes').append(tile);themeButtons.set(theme,{button:tile,count});
  }
  for(const id of ['v-theme','v-level','v-type','v-favorites','v-pending'])$(id).addEventListener('change',()=>applyFilters());
  $('v-search').addEventListener('input',()=>applyFilters());
  $('v-clear').addEventListener('click',()=>{for(const id of ['v-theme','v-level','v-type'])$(id).value='all';$('v-search').value='';$('v-favorites').checked=false;$('v-pending').checked=false;applyFilters();});
  $('v-prev-page').addEventListener('click',()=>{if(page>0){page--;renderList();}});
  $('v-next-page').addEventListener('click',()=>{if((page+1)*pageSize<filtered.length){page++;renderList();}});
  $('v-start').addEventListener('click',startSession);$('v-back').addEventListener('click',backToList);
  $('v-mode').addEventListener('change',()=>{
    // Cambiar de juego continúa con una nueva tarjeta: no permite puntuar dos veces la misma.
    if(answered){index++;if(index>=session.length){backToList();return;}}
    if(current)showQuestion();
  });
  $('v-reveal').addEventListener('click',()=>{$('v-reveal').hidden=true;$('v-revealed').hidden=false;$('v-listen').hidden=false;});
  $('v-known').addEventListener('click',()=>finish(true));$('v-again').addEventListener('click',()=>finish(false));
  $('v-star').addEventListener('click',()=>{if(current)toggleFavorite(current);});
  $('v-listen').addEventListener('click',()=>{if(current)speak(current.fr);});
  $('v-next').addEventListener('click',()=>{
    if(!answered)return;
    index++;
    if(index>=session.length){const total=session.length;backToList();$('v-count').textContent=`Sesión completada: ${sessionCorrect} / ${total} aciertos. ${filtered.length.toLocaleString('es')} entradas en tu selección.`;}
    else showQuestion();
  });
  $('v-write').addEventListener('submit',checkWritten);
  for(const char of ['é','è','ê','ë','à','â','î','ï','ô','ù','û','ç','œ']){
    const accent=button(char,()=>{const input=$('v-input');if(input.disabled)return;input.setRangeText(char,input.selectionStart,input.selectionEnd,'end');input.focus();});accent.setAttribute('aria-label',`Insertar ${char}`);$('v-accents').append(accent);
  }
  persist();applyFilters();
})();
