(() => {
 'use strict';
 const $=id=>document.getElementById(id),rules=window.GRAMMAIRE,byId=new Map(rules.map(r=>[r.id,r])),key='atelier-grammaire-v1';
 const normalize=(value,strict=true)=>{const s=String(value).normalize('NFC').toLowerCase().replace(/’/g,"'").trim().replace(/\s+/g,' ').replace(/\s*'\s*/g,"'");return strict?s:s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe');};
 const full=q=>q.stem.replace('_____',q.answer).replace(/’\s+/g,'’');
 const accepted=q=>q.rule==='pendant'?[q.answer,'durant']:[q.answer];
 const match=(q,input,strict=true)=>accepted(q).some(a=>normalize(a,strict)===normalize(input,strict));
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 let raw={};try{const value=JSON.parse(localStorage.getItem(key)||'{}');if(value&&typeof value==='object')raw=value;}catch{}
 const safe=p=>{const n=x=>Number.isSafeInteger(x)&&x>=0?x:0;return {total:n(p?.total),correct:Math.min(n(p?.correct),n(p?.total))};};
 const scores=Object.fromEntries(rules.map(r=>[r.id,safe(raw[r.id])]));
 let filtered=[],page=0,base=[],deck=[],current=null,answered=false,done=0,correct=0,goal=0,config={},previous='';
 function persist(){try{localStorage.setItem(key,JSON.stringify(scores));}catch{$('g-storage').textContent='Almacenamiento no disponible: el progreso gramatical dura esta sesión.';}stats();}
 function stats(){const total=Object.values(scores).reduce((a,p)=>a+p.total,0),ok=Object.values(scores).reduce((a,p)=>a+p.correct,0);$('g-stats').textContent=`Gramática: ${ok} / ${total} aciertos acumulados · ${Object.values(scores).filter(p=>p.total>0).length} de ${rules.length} estructuras practicadas.`;}
 function apply(){
  const query=normalize($('g-search').value,false);filtered=rules.filter(r=>($('g-group').value==='all'||r.group===$('g-group').value)&&($('g-level').value==='all'||r.level===$('g-level').value)&&normalize(`${r.title} ${r.formula} ${r.explanation} ${r.note}`,false).includes(query));page=0;render();
 }
 function render(){
  $('g-cards').replaceChildren();$('g-count').textContent=`${filtered.length} / ${rules.length} estructuras · ${filtered.reduce((n,r)=>n+r.exercises.length,0)} ejercicios`;$('g-start').disabled=!filtered.length;
  for(const r of filtered.slice(page*8,page*8+8)){
   const card=document.createElement('article');card.className='g-card';const meta=document.createElement('p');meta.className='word-meta';meta.textContent=`${r.group} · ${r.level}`;
   const title=document.createElement('h3');title.textContent=r.title;const formula=document.createElement('p');formula.className='g-formula';formula.lang='fr';formula.textContent=r.formula;
   const text=document.createElement('p');text.textContent=r.explanation;const note=document.createElement('p');note.className='g-note';note.textContent='Fíjate: '+r.note;
   const examples=document.createElement('div');examples.className='g-examples';for(const q of r.exercises){const fr=document.createElement('p');fr.lang='fr';fr.textContent=full(q);const es=document.createElement('p');es.className='hint';es.textContent=q.es;examples.append(fr,es);}
   const practice=document.createElement('button');practice.type='button';practice.className='small';practice.textContent='Practicar esta regla →';practice.setAttribute('aria-label',`Practicar: ${r.title}`);practice.addEventListener('click',()=>start(r.exercises));
   const progress=document.createElement('p');progress.className='hint';progress.textContent=scores[r.id].total?`${scores[r.id].correct} / ${scores[r.id].total} aciertos`:'Aún sin practicar';
   card.append(meta,title,formula,text,note,examples,practice,progress);$('g-cards').append(card);
  }
  if(!filtered.length){const p=document.createElement('p');p.className='empty';p.textContent='No hay estructuras con estos filtros. Prueba otra búsqueda o limpia los filtros.';$('g-cards').append(p);}
  const pages=Math.max(1,Math.ceil(filtered.length/8));$('g-page').textContent=`Página ${page+1} de ${pages}`;$('g-prev-page').disabled=page===0;$('g-next-page').disabled=page>=pages-1;
 }
 function start(items){
  if(!items.length)return;base=[...items];deck=shuffle(base);config={mode:$('g-mode').value,help:$('g-help').checked,strict:$('g-strict').checked};goal=$('g-length').value==='free'?Infinity:Math.min(Number($('g-length').value),base.length);done=0;correct=0;previous='';
  $('g-library').hidden=true;$('g-summary').hidden=true;$('g-game').hidden=false;next();
 }
 function next(){
  if(done>=goal){summary();return;}if(!deck.length){deck=shuffle(base);if(deck.length>1&&deck[0].id===previous)[deck[0],deck[1]]=[deck[1],deck[0]];}
  current=deck.shift();previous=current.id;answered=false;const r=byId.get(current.rule);
  $('g-position').textContent=`${done+1}${goal===Infinity?' · PRÁCTICA LIBRE':' / '+goal}`;$('g-instruction').textContent=current.cue;$('g-question').textContent=current.stem;$('g-spanish').textContent=current.es;
  $('g-hint').hidden=!config.help;$('g-hint').textContent=`${r.formula}. ${r.explanation}`;
  $('g-options').hidden=config.mode!=='quiz';$('g-write').hidden=config.mode!=='write';$('g-input').value='';$('g-input').disabled=false;$('g-check').disabled=false;
  $('g-feedback').textContent='';$('g-feedback').className='v-feedback';for(const id of ['g-answer','g-explanation','g-audio','g-next'])$(id).hidden=true;$('g-reveal').hidden=false;$('g-next').textContent=done+1>=goal?'Ver resultado →':'Siguiente →';
  $('g-options').replaceChildren();if(config.mode==='quiz')for(const option of shuffle([current.answer,...current.distractors])){const b=document.createElement('button');b.textContent=option;b.lang='fr';b.addEventListener('click',()=>{if(answered)return;const ok=match(current,option,true);if(!ok)b.classList.add('wrong');finish(ok);});$('g-options').append(b);}
  if(config.mode==='write')$('g-input').focus();
 }
 function finish(ok,revealed=false){
  if(answered||!current)return;answered=true;done++;if(ok)correct++;scores[current.rule].total++;if(ok)scores[current.rule].correct++;persist();
  const r=byId.get(current.rule);$('g-feedback').className=`v-feedback ${ok?'good':'bad'}`;$('g-feedback').textContent=ok?'¡Bien hecho! Esta es la frase modelo.':revealed?'Solución consultada: repasa la regla.':'No coincide con la respuesta prevista. Revisa la regla y la frase modelo.';
  $('g-answer').textContent=full(current);$('g-answer').hidden=false;$('g-explanation').replaceChildren();for(const text of [r.formula,r.explanation,'Fíjate: '+r.note]){const p=document.createElement('p');p.textContent=text;$('g-explanation').append(p);}$('g-explanation').hidden=false;
  $('g-input').disabled=true;$('g-check').disabled=true;for(const b of $('g-options').children){b.disabled=true;if(match(current,b.textContent,true))b.classList.add('correct');}
  $('g-reveal').hidden=true;$('g-next').hidden=false;$('g-audio').hidden=false;$('g-next').focus();
 }
 function summary(){current=null;$('g-game').hidden=true;$('g-summary').hidden=false;$('g-result').textContent=`${correct} / ${done} aciertos. Puedes repasar una regla concreta o cambiar de tema.`;$('g-return').focus();}
 for(const group of [...new Set(rules.map(r=>r.group))]){const o=document.createElement('option');o.value=group;o.textContent=group;$('g-group').append(o);}
 $('g-search').addEventListener('input',apply);$('g-group').addEventListener('change',apply);$('g-level').addEventListener('change',apply);
 $('g-clear').addEventListener('click',()=>{$('g-search').value='';$('g-group').value='all';$('g-level').value='all';apply();});
 $('g-prev-page').addEventListener('click',()=>{if(page>0){page--;render();}});$('g-next-page').addEventListener('click',()=>{if((page+1)*8<filtered.length){page++;render();}});
 $('g-start').addEventListener('click',()=>start(filtered.flatMap(r=>r.exercises)));$('g-stop').addEventListener('click',summary);$('g-return').addEventListener('click',()=>{$('g-summary').hidden=true;$('g-library').hidden=false;render();$('g-start').focus();});
 $('g-next').addEventListener('click',()=>{if(answered)next();});$('g-reveal').addEventListener('click',()=>finish(false,true));
 $('g-write').addEventListener('submit',e=>{e.preventDefault();if(answered||!current)return;const text=$('g-input').value.trim();if(!text){$('g-feedback').textContent='Escribe una respuesta antes de comprobar.';return;}finish(match(current,text,config.strict));});
 $('g-audio').addEventListener('click',()=>{if(!current||!answered)return;if(!('speechSynthesis' in window)){alert('Este navegador no admite pronunciación.');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(full(current));u.lang='fr-FR';u.rate=.85;speechSynthesis.speak(u);});
 for(const char of ['é','è','ê','à','â','î','ô','ù','û','ç','œ','’','-']){const b=document.createElement('button');b.type='button';b.textContent=char;b.setAttribute('aria-label',`Insertar ${char}`);b.addEventListener('click',()=>{const input=$('g-input');if(input.disabled)return;input.setRangeText(char,input.selectionStart,input.selectionEnd,'end');input.focus();});$('g-accents').append(b);}
 window.GrammaireHelpers={normalize,full,match};apply();stats();
})();
