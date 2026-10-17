(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const verbs = window.VERBOS;
  const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe').replace(/’/g,"'").trim().replace(/\s+/g,' ');
  const key = 'atelier-francais-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch { /* Modo privado o datos corruptos: continuar en memoria. */ }
  const favorites = new Set(Array.isArray(saved.favorites) ? saved.favorites.filter(fr=>verbs.some(v=>v.fr===fr)) : []);
  let stats = {
    attempts: Number.isSafeInteger(saved.attempts) && saved.attempts >= 0 ? saved.attempts : 0,
    correct: Number.isSafeInteger(saved.correct) && saved.correct >= 0 ? saved.correct : 0
  };
  stats.correct = Math.min(stats.correct, stats.attempts);
  let current, selected = verbs[0], answered = false, deck = [], deckIndex = 0, round = 1, previous;
  function persist() {
    try { localStorage.setItem(key, JSON.stringify({...stats,favorites:[...favorites]})); }
    catch { $('storage-note').textContent = 'Almacenamiento no disponible: el progreso dura esta sesión.'; }
    renderStats();
  }
  function renderStats() {
    $('stats').textContent = `${stats.correct} de ${stats.attempts} acertadas · ${stats.attempts ? Math.round(stats.correct/stats.attempts*100) : 0}%`;
  }
  function shuffle(items) {
    const copy = [...items];
    for (let i=copy.length-1;i>0;i--) { const j = Math.floor(Math.random()*(i+1)); [copy[i],copy[j]]=[copy[j],copy[i]]; }
    return copy;
  }
  function pool() {
    return verbs.filter(v => $('pool').value === 'all' || ($('pool').value === 'core' ? v.core : favorites.has(v.fr)));
  }
  function start() { deck=shuffle(pool()); deckIndex=0; round=1; nextQuestion(); }
  function nextQuestion() {
    if (!deck.length || !pool().length) { $('game').hidden=true; $('empty').hidden=false; current=null; return; }
    if (deckIndex >= deck.length) {
      deck=shuffle(pool()); deckIndex=0; round++;
      if (deck.length>1 && deck[0].fr===previous) [deck[0],deck[1]]=[deck[1],deck[0]];
    }
    current = deck[deckIndex++]; previous = current.fr; answered=false;
    $('game').hidden=false; $('empty').hidden=true;
    const mode = $('mode').value;
    $('question-number').textContent = `VERBO ${deckIndex} / ${deck.length} · VUELTA ${round}`;
    $('prompt').textContent = mode==='cards' ? 'Piensa en el infinitivo francés y dale la vuelta.' : '¿Cómo se dice en francés?';
    $('question').textContent = current.es;
    $('card-area').hidden=mode!=='cards'; $('quiz-area').hidden=mode!=='quiz'; $('write-area').hidden=mode!=='write';
    $('card-answer').hidden=true; $('reveal').hidden=false;
    $('next').hidden=true; $('listen').hidden=true;
    $('feedback').textContent=''; $('feedback').className='';
    $('written').value=''; $('written').disabled=false; $('check-answer').disabled=false;
    $('translation').textContent=current.fr; renderStar($('star'),current);
    if (mode==='quiz') buildOptions();
    if (mode==='write') $('written').focus();
  }
  const meanings = verb => verb.es.split(' / ').map(normalize);
  const equivalent = (a,b) => meanings(a).some(meaning=>meanings(b).includes(meaning));
  function buildOptions() {
    $('options').replaceChildren();
    // Evita distractores válidos para la misma traducción española.
    const distractors=shuffle(verbs.filter(v=>v.fr!==current.fr && !equivalent(v,current))).slice(0,3);
    for (const verb of shuffle([current,...distractors])) {
      const button=document.createElement('button'); button.textContent=verb.fr; button.lang='fr';
      button.addEventListener('click',()=>{
        if(answered) return;
        const correct=verb.fr===current.fr;
        for(const item of $('options').children) { item.disabled=true; if(item.textContent===current.fr) item.classList.add('correct'); }
        if(!correct) button.classList.add('wrong');
        finish(correct);
      });
      $('options').append(button);
    }
  }
  function finish(correct, suffix='') {
    if(answered) return;
    answered=true; stats.attempts++; if(correct) stats.correct++; persist();
    $('feedback').className=correct?'good':'bad';
    $('feedback').textContent=(correct ? '¡Bien hecho!' : `Para repasar: ${current.fr}.`) + (suffix ? ` ${suffix}` : '');
    $('next').hidden=false; $('listen').hidden=false;
    $('written').disabled=true; $('check-answer').disabled=true;
    $('remembered').disabled=true; $('forgot').disabled=true;
    $('next').focus();
  }
  function renderStar(button,verb) {
    const active=favorites.has(verb.fr);
    button.textContent=active?'★ Favorito':'☆ Favorito';button.classList.toggle('selected',active);
    button.setAttribute('aria-pressed',String(active));
    button.setAttribute('aria-label',`${active?'Quitar de':'Añadir a'} favoritos: ${verb.fr}`);
  }
  function toggleFavorite(verb) {
    if(favorites.has(verb.fr)) favorites.delete(verb.fr); else favorites.add(verb.fr);
    persist(); renderCatalog(); renderStar($('detail-star'),selected);
    if(current) renderStar($('star'),current);
    if($('pool').value==='favorites') start();
  }
  function speak(fr) {
    if(!('speechSynthesis' in window)) { alert('Este navegador no admite pronunciación.');return; }
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(fr);utterance.lang='fr-FR';utterance.rate=.85;
    const voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('fr')); if(voice) utterance.voice=voice;
    speechSynthesis.speak(utterance);
  }
  function renderCatalog() {
    const search=normalize($('search').value);
    const filtered=verbs.filter(v=>(!$('only-favorites').checked || favorites.has(v.fr)) && normalize(`${v.fr} ${v.es}`).includes(search)).sort((a,b)=>a.fr.localeCompare(b.fr,'fr'));
    $('count').textContent=`${filtered.length} / 300 verbos`;
    $('verb-list').replaceChildren();
    if(!filtered.length) { const p=document.createElement('p');p.className='empty';p.textContent='No hay resultados. Prueba otra búsqueda.';$('verb-list').append(p); }
    for(const verb of filtered) {
      const row=document.createElement('div');row.className='verb-row'+(selected.fr===verb.fr?' active':'');
      const open=document.createElement('button');open.className='verb-open';
      const name=document.createElement('strong');name.textContent=verb.fr;name.lang='fr';
      const meaning=document.createElement('span');meaning.textContent=verb.es;
      open.append(name,meaning);open.setAttribute('aria-pressed',String(selected.fr===verb.fr));
      open.addEventListener('click',()=>{selected=verb;$('aux').value='être';renderDetail();renderCatalog();});
      const star=document.createElement('button');star.className='small';renderStar(star,verb);star.textContent=favorites.has(verb.fr)?'★':'☆';
      star.addEventListener('click',()=>toggleFavorite(verb));row.append(open,star);$('verb-list').append(row);
    }
  }
  function renderDetail() {
    $('verb-title').textContent=selected.fr;$('verb-meaning').textContent=selected.es;renderStar($('detail-star'),selected);
    const tense=$('tense').value;
    $('tense-help').textContent=Conjugador.tenses[tense][1];
    $('aux-label').hidden=!Conjugador.dual.has(selected.fr) || !['PC','PQ'].includes(tense);
    const forms=Conjugador.conjugate(selected,tense,$('aux').value);
    $('forms').replaceChildren();
    forms.forEach((form,i)=>{
      if(tense==='Y' && !form) return;
      const tr=document.createElement('tr'),person=document.createElement('td'),value=document.createElement('td');
      person.textContent=Conjugador.person(i,form,tense,selected);person.lang='fr';value.textContent=form||'—';value.lang='fr';
      tr.append(person,value);$('forms').append(tr);
    });
    if(!forms.some(Boolean)) {
      const row=document.createElement('tr'),cell=document.createElement('td');
      cell.colSpan=2;cell.textContent='Este verbo no tiene formas disponibles en este tiempo.';
      row.append(cell);$('forms').append(row);
    }
    let note='Las formas son afirmativas. El guion indica una forma no aplicable o no disponible.';
    if(tense==='Y') note='En el imperativo, los pronombres entre paréntesis son una referencia: no se dicen.';
    if(['PC','PQ'].includes(tense)) {
      const withEtre=Conjugador.etre.has(selected.fr) || (Conjugador.dual.has(selected.fr) && $('aux').value==='être');
      note=withEtre ? 'Con être, el participio concuerda con el sujeto. Se muestran masculino / femenino. Para vous, se muestra el plural; si tratas de usted a una persona, usa el participio singular.' : 'Con avoir, se muestra el participio sin concordancia. Puede concordar con un objeto directo colocado antes del verbo.';
      if(Conjugador.dual.has(selected.fr)) note+=' Estos verbos pueden usar être o avoir según la construcción. Ej.: je suis sorti / j’ai sorti le livre.';
    }
    if(['falloir','pleuvoir','neiger'].includes(selected.fr)) note+=' Se muestra el uso impersonal habitual con il.';
    $('verb-note').textContent=note;
  }
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    const practice=button.dataset.view==='practice';$('practice').hidden=!practice;$('catalog').hidden=practice;
    document.querySelectorAll('[data-view]').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));});
  }));
  $('mode').addEventListener('change',start);$('pool').addEventListener('change',start);
  $('reveal').addEventListener('click',()=>{ $('reveal').hidden=true;$('card-answer').hidden=false;$('listen').hidden=false;$('remembered').disabled=false;$('forgot').disabled=false; });
  $('remembered').addEventListener('click',()=>finish(true));$('forgot').addEventListener('click',()=>finish(false));
  $('next').addEventListener('click',nextQuestion);$('star').addEventListener('click',()=>{if(current)toggleFavorite(current);});
  $('listen').addEventListener('click',()=>{if(current)speak(current.fr);});
  $('write-area').addEventListener('submit',event=>{
    event.preventDefault();if(answered || !current) return;
    const input=$('written').value.trim();if(!input){$('feedback').textContent='Escribe una respuesta antes de comprobar.';return;}
    const clean = $('strict').checked ? value=>value.normalize('NFC').toLowerCase().replace(/’/g,"'").trim().replace(/\s+/g,' ') : normalize;
    const accepted=verbs.filter(v=>v.fr===current.fr || equivalent(v,current));
    const match=accepted.find(v=>clean(v.fr)===clean(input));
    let suffix='';
    if(match && match.fr!==current.fr) suffix=`También es válido. La tarjeta propone ${current.fr}.`;
    if(match && normalize(input)===normalize(match.fr) && input.toLowerCase()!==match.fr.toLowerCase()) suffix+=` Ortografía: ${match.fr}.`;
    finish(Boolean(match),suffix.trim());
  });
  for(const char of ['é','è','ê','ë','à','â','î','ï','ô','ù','û','ç','œ']) {
    const button=document.createElement('button');button.type='button';button.textContent=char;button.setAttribute('aria-label',`Insertar ${char}`);
    button.addEventListener('click',()=>{const input=$('written');if(input.disabled)return;const start=input.selectionStart,end=input.selectionEnd;input.setRangeText(char,start,end,'end');input.focus();});$('accents').append(button);
  }
  $('search').addEventListener('input',renderCatalog);$('only-favorites').addEventListener('change',renderCatalog);
  $('detail-star').addEventListener('click',()=>toggleFavorite(selected));$('detail-listen').addEventListener('click',()=>speak(selected.fr));
  for(const [value,[label]] of Object.entries(Conjugador.tenses)){const option=document.createElement('option');option.value=value;option.textContent=label;$('tense').append(option);}
  $('tense').addEventListener('change',renderDetail);$('aux').addEventListener('change',renderDetail);
  persist();renderCatalog();renderDetail();start();
})();
