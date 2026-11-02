(() => {
 'use strict';
 const $=id=>document.getElementById(id),key='atelier-relations-v1';
 const norm=(s,strict=true)=>{let text=String(s).normalize('NFC').toLowerCase().replace(/’/g,"'").trim().replace(/\s+/g,' ').replace(/\s*'\s*/g,"'");return strict?text:text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe');};
 const form=word=>word.f&&word.f!==word.fr?`${word.fr} / ${word.f}`:word.fr;
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const definitions=new Map(INTERROGATIFS.map(x=>[x.id,x]));
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
 const cleanCounts=p=>{const valid=n=>Number.isSafeInteger(n)&&n>=0?n:0;const total=valid(p?.total);return {total,correct:Math.min(valid(p?.correct),total)};};
 const scores={opposites:cleanCounts(saved.opposites),questions:cleanCounts(saved.questions)};
 let kind='opposites',deck=[],base=[],exercise=null,done=0,correct=0,goal=0,answered=false,settings={},previous='';
 function persist(){try{localStorage.setItem(key,JSON.stringify(scores));}catch{$('r-storage').textContent='Almacenamiento no disponible: los resultados duran esta sesión.';}renderStats();}
 function renderStats(){const p=scores[kind];$('r-stats').textContent=`${kind==='opposites'?'Contrarios':'Interrogativos'}: ${p.correct} / ${p.total} aciertos acumulados. Las flashcards son una autoevaluación.`;}
 function filteredPairs(){const q=norm($('r-search').value,false);return CONTRAIRES.filter(p=>($('r-type').value==='all'||p.type===$('r-type').value)&&norm(`${p.a.fr} ${p.a.f||''} ${p.a.es} ${p.b.fr} ${p.b.f||''} ${p.b.es} ${p.theme}`,false).includes(q));}
 function pool(){return kind==='opposites'?filteredPairs():QUESTIONS_FR.filter(q=>$('r-question-filter').value==='all'||q.word===$('r-question-filter').value);}
 function refresh(){
  const entries=pool();$('r-count').textContent=kind==='opposites'?`${entries.length} / ${CONTRAIRES.length} parejas · practica el contrario en ambos sentidos.`:`${entries.length} frases disponibles · ${INTERROGATIFS.length} grupos interrogativos en la guía.`;
  $('r-start').disabled=!entries.length;renderStats();
 }
 function renderPairs(){
  $('r-pairs').replaceChildren();const pairs=filteredPairs();
  for(const pair of pairs){const card=document.createElement('article');card.className='r-pair';const meta=document.createElement('p');meta.className='word-meta';meta.textContent=`${pair.type} · ${pair.theme}`;const line=document.createElement('h3');line.lang='fr';line.textContent=`${form(pair.a)} ↔ ${form(pair.b)}`;const es=document.createElement('p');es.textContent=`${pair.a.es} ↔ ${pair.b.es}`;card.append(meta,line,es);$('r-pairs').append(card);}
  if(!pairs.length){const p=document.createElement('p');p.textContent='No hay parejas con estos filtros.';$('r-pairs').append(p);}refresh();
 }
 function renderDefinitions(){
  $('r-definitions').replaceChildren();for(const d of INTERROGATIFS.filter(x=>$('r-question-filter').value==='all'||x.id===$('r-question-filter').value)){
   const card=document.createElement('article');card.className='word-card';const h=document.createElement('h3');h.lang='fr';h.textContent=d.fr;const es=document.createElement('strong');es.textContent=d.es;const note=document.createElement('p');note.className='hint';note.textContent=d.note;const example=document.createElement('p');example.lang='fr';example.textContent=d.example;card.append(h,es,note,example);$('r-definitions').append(card);
  }refresh();
 }
 function setKind(next){
  kind=next;$('r-opposite-library').hidden=kind!=='opposites';$('r-question-library').hidden=kind!=='questions';$('r-direction-label').hidden=kind!=='opposites';
  const cardOption=[...$('r-mode').children].find(o=>o.value==='cards');if(cardOption)cardOption.disabled=kind==='questions';if(kind==='questions'&&$('r-mode').value==='cards')$('r-mode').value='quiz';
  for(const [id,type]of [['r-opposites-tab','opposites'],['r-questions-tab','questions']]){$(id).setAttribute('aria-pressed',String(kind===type));$(id).className=kind===type?'secondary':'small';}
  $('r-library').hidden=false;$('r-game').hidden=true;$('r-summary').hidden=true;exercise=null;
  if(kind==='opposites')renderPairs();else renderDefinitions();
 }
 function makeExercise(item,reverse=false){
  if(kind==='opposites'){
   const source=reverse?item.b:item.a,target=reverse?item.a:item.b;
   const answers=[target.fr,target.f].filter(Boolean);
   const wrong=CONTRAIRES.filter(p=>p.type===item.type).flatMap(p=>[p.a.fr,p.b.fr]).filter(x=>![...answers,source.fr,source.f].filter(Boolean).some(a=>norm(a)===norm(x)));
   return {id:item.id,prompt:`Escribe o elige el contrario trabajado para «${source.es}». Contexto: ${item.theme.toLowerCase()}.`,question:source.fr,meaning:source.f&&source.f!==source.fr?`Femenino: ${source.f}. Se aceptan las dos formas del contrario.`:'',answers,solution:form(target),explanation:`${form(source)} (${source.es}) ↔ ${form(target)} (${target.es}). Pareja de ${item.theme.toLowerCase()}.`,options:shuffle([target.fr,...shuffle([...new Set(wrong)]).slice(0,3)]),speak:target.fr};
  }
  const d=definitions.get(item.word);const wrong=QUESTIONS_FR.map(q=>q.answer).filter(a=>norm(a)!==norm(item.answer));
  // Las opciones se deduplican también por mayúsculas y apóstrofos.
  const unique=[...new Map(wrong.map(x=>[norm(x),x])).values()];
  const full=item.stem.replace('_____',item.answer);
  return {id:item.id,prompt:'Completa la pregunta con la palabra o expresión interrogativa que corresponde al español.',question:item.stem,meaning:item.es,reply:`Réponse : ${item.reply}`,answers:[item.answer],solution:full,explanation:`${d.fr}: ${d.note}`,options:shuffle([item.answer,...shuffle(unique).slice(0,3)]),speak:full};
 }
 function start(){
  base=pool();if(!base.length)return;settings={mode:$('r-mode').value,strict:$('r-strict').checked,direction:$('r-direction').value};
  if(kind==='questions'&&settings.mode==='cards')settings.mode='quiz';
  deck=shuffle(base);goal=$('r-length').value==='free'?Infinity:Math.min(Number($('r-length').value),base.length);done=0;correct=0;previous='';
  $('r-library').hidden=true;$('r-summary').hidden=true;$('r-game').hidden=false;next();
 }
 function next(){
  if(done>=goal){summary();return;}
  if(!deck.length){deck=shuffle(base);if(deck.length>1&&deck[0].id===previous)[deck[0],deck[1]]=[deck[1],deck[0]];}
  const item=deck.shift();previous=item.id;const reverse=settings.direction==='reverse'||settings.direction==='mixed'&&Math.random()<.5;exercise=makeExercise(item,reverse);answered=false;
  $('r-position').textContent=`${done+1}${goal===Infinity?' · PRÁCTICA LIBRE':' / '+goal}`;
  $('r-prompt').textContent=exercise.prompt;$('r-question').textContent=exercise.question;$('r-meaning').textContent=exercise.meaning;
  $('r-reply').hidden=!exercise.reply;$('r-reply').textContent=exercise.reply||'';
  $('r-options').hidden=settings.mode!=='quiz';$('r-write').hidden=settings.mode!=='write';$('r-card').hidden=settings.mode!=='cards';
  $('r-input').value='';$('r-input').disabled=false;$('r-check').disabled=false;$('r-feedback').textContent='';$('r-feedback').className='v-feedback';
  for(const id of ['r-full-answer','r-explanation','r-next','r-audio','r-revealed'])$(id).hidden=true;
  $('r-solution').hidden=false;$('r-flip').hidden=false;$('r-knew').disabled=false;$('r-forgot').disabled=false;
  $('r-card-answer').textContent=exercise.solution;$('r-next').textContent=done+1>=goal?'Ver resultados →':'Siguiente →';
  $('r-options').replaceChildren();if(settings.mode==='quiz')for(const option of exercise.options){const b=document.createElement('button');b.textContent=option;b.lang='fr';b.addEventListener('click',()=>{if(answered)return;const ok=matches(option);if(!ok)b.classList.add('wrong');finish(ok);});$('r-options').append(b);}
  if(settings.mode==='write')$('r-input').focus();
 }
 function matches(input){return exercise.answers.some(a=>norm(a,settings.strict)===norm(input,settings.strict));}
 function finish(ok,revealed=false){
  if(answered||!exercise)return;answered=true;done++;if(ok)correct++;scores[kind].total++;if(ok)scores[kind].correct++;persist();
  $('r-feedback').className=`v-feedback ${ok?'good':'bad'}`;$('r-feedback').textContent=ok?'¡Bien hecho!':revealed?'Solución consultada: repasa esta respuesta.':'Esta es la respuesta prevista para el ejercicio. Compárala con la tuya.';
  $('r-full-answer').textContent=exercise.solution;$('r-full-answer').hidden=false;$('r-explanation').textContent=exercise.explanation;$('r-explanation').hidden=false;
  $('r-input').disabled=true;$('r-check').disabled=true;$('r-knew').disabled=true;$('r-forgot').disabled=true;
  for(const b of $('r-options').children){b.disabled=true;if(matches(b.textContent))b.classList.add('correct');}
  $('r-solution').hidden=true;$('r-flip').hidden=true;$('r-next').hidden=false;$('r-audio').hidden=false;$('r-next').focus();
 }
 function summary(){exercise=null;$('r-game').hidden=true;$('r-summary').hidden=false;$('r-result').textContent=`${correct} / ${done} aciertos. Puedes cambiar de modo o practicar otra selección.`;$('r-again').focus();}
 $('r-opposites-tab').addEventListener('click',()=>setKind('opposites'));$('r-questions-tab').addEventListener('click',()=>setKind('questions'));
 $('r-search').addEventListener('input',renderPairs);$('r-type').addEventListener('change',renderPairs);$('r-question-filter').addEventListener('change',renderDefinitions);
 $('r-start').addEventListener('click',start);$('r-back').addEventListener('click',summary);$('r-again').addEventListener('click',()=>setKind(kind));$('r-next').addEventListener('click',()=>{if(answered)next();});
 $('r-write').addEventListener('submit',e=>{e.preventDefault();if(answered||!exercise)return;const text=$('r-input').value.trim();if(!text){$('r-feedback').textContent='Escribe una respuesta antes de comprobar.';return;}finish(matches(text));});
 $('r-flip').addEventListener('click',()=>{$('r-flip').hidden=true;$('r-revealed').hidden=false;});$('r-knew').addEventListener('click',()=>finish(true));$('r-forgot').addEventListener('click',()=>finish(false));$('r-solution').addEventListener('click',()=>finish(false,true));
 $('r-audio').addEventListener('click',()=>{if(!exercise||!answered)return;if(!('speechSynthesis' in window)){alert('Este navegador no admite pronunciación.');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(exercise.speak);u.lang='fr-FR';u.rate=.85;speechSynthesis.speak(u);});
 for(const d of INTERROGATIFS){const o=document.createElement('option');o.value=d.id;o.textContent=`${d.fr} · ${d.es}`;$('r-question-filter').append(o);}
 for(const char of ['é','è','ê','à','â','î','ô','ù','û','ç','œ','’','-']){const b=document.createElement('button');b.type='button';b.textContent=char;b.setAttribute('aria-label',`Insertar ${char}`);b.addEventListener('click',()=>{const input=$('r-input');if(input.disabled)return;input.setRangeText(char,input.selectionStart,input.selectionEnd,'end');input.focus();});$('r-accents').append(b);}
 renderPairs();renderStats();
})();
