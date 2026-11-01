(() => {
 'use strict';
 const $=id=>document.getElementById(id),engine=window.Contexte,learning=window.Apprentissage;
 const items=engine.catalog(),manual=new Set(),themeChecks=new Map();
 let exercise=null,config=null,available=[],initial=[],goal=0,done=0,correct=0,answered=false,round=1,ordered=[],usedTargets=new Map();
 const grammarNames={verbs:'Conjugación',vocab:'Vocabulario',articles:'Artículos',agreement:'Concordancia'};
 function readJSON(key){try{const x=JSON.parse(localStorage.getItem(key)||'{}');return x&&typeof x==='object'?x:{};}catch{return {};}}
 function savedSelection(){
  const v=readJSON('atelier-francais-v1'),w=readJSON('atelier-vocabulaire-v1');
  const array=x=>Array.isArray(x)?x:[];
  const favorites=[...array(v.favorites).map(x=>'verb:'+x),...array(w.favorites).map(x=>'word:'+x)];
  const learned=new Set(array(w.learned).map(x=>'word:'+x));
  for(const item of items){const p=learning.get(item.key);if(p.review)learned.delete(item.key);else if(p.recognized||p.recalled||p.used)learned.add(item.key);}
  return {favorites,learned:[...learned]};
 }
 function settings(){return {plan:$('c-plan').value,source:$('c-source').value,grammar:$('c-grammar').value,format:$('c-format').value,tense:$('c-tense').value,level:$('c-level').value,length:$('c-length').value,hints:$('c-hints').checked,spanish:$('c-spanish').checked,strict:$('c-strict').checked,themes:[...themeChecks].filter(([,input])=>input.checked).map(([theme])=>theme),manual:[...manual]};}
 function refresh(){
  const cfg=settings(),pool=engine.eligible(cfg,savedSelection());
  $('c-selection').hidden=cfg.source!=='manual';
  const count=new Set(pool.map(d=>d.targetKey)).size;
  $('c-coverage').textContent=pool.length?`${count} elementos compatibles · ${pool.length.toLocaleString('es')} variantes de frase. La colección cubre ${items.length} elementos del diccionario.`:'No hay ejercicios con esta selección. Cambia los filtros o añade elementos compatibles.';
  $('c-start').disabled=!pool.length;
  $('c-picked').textContent=`${manual.size} seleccionados`;
  renderProgress();
 }
 function renderManual(){
  $('c-items').replaceChildren();const q=$('c-search').value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  for(const item of items.filter(w=>(w.fr+' '+w.es).toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(q))){
   const label=document.createElement('label');label.className='c-pick';const check=document.createElement('input');check.type='checkbox';check.value=item.key;check.checked=manual.has(item.key);check.addEventListener('change',()=>{if(check.checked)manual.add(item.key);else manual.delete(item.key);refresh();});
   const text=document.createElement('span');text.textContent=`${item.fr} · ${item.es}`;label.append(check,text);$('c-items').append(label);
  }
 }
 function renderProgress(){
  $('c-progress').replaceChildren();const practiced=items.filter(w=>learning.get(w.key).attempts>0);
  if(!practiced.length){$('c-progress').textContent='Aún no hay ejercicios comprobados para los elementos de esta colección.';return;}
  for(const item of practiced){const row=document.createElement('p');const p=learning.get(item.key);row.textContent=`${item.fr} · ${learning.status(item.key)} · ${p.attempts-p.errors}/${p.attempts} aciertos`; $('c-progress').append(row);}
  if(!learning.persistent())$('c-storage').textContent='Almacenamiento no disponible: la evidencia de aprendizaje dura esta sesión.';
 }
 function start(){
  config=settings();initial=engine.eligible(config,savedSelection());if(!initial.length){refresh();return;}
  available=[...initial];goal=config.length==='free'?Infinity:Math.min(Number(config.length),initial.length);done=0;correct=0;round=1;usedTargets=new Map();
  $('c-settings').hidden=true;$('c-summary').hidden=true;$('c-session').hidden=false;next();
 }
 function choose(){
  const weights=available.map(d=>(config.plan==='recommended'?learning.priority(d.targetKey):1)/(1+(usedTargets.get(d.targetKey)||0)*4));
  let n=Math.random()*weights.reduce((a,b)=>a+b,0),index=weights.length-1;
  for(let i=0;i<weights.length;i++){n-=weights[i];if(n<0){index=i;break;}}
  const [descriptor]=available.splice(index,1);usedTargets.set(descriptor.targetKey,(usedTargets.get(descriptor.targetKey)||0)+1);return descriptor;
 }
 function next(){
  if(done>=goal){summary();return;}
  if(!available.length){if(goal!==Infinity){summary();return;}available=[...initial];round++;usedTargets.clear();}
  const d=choose();const format=config.format==='all'?['fill','quiz','order'][Math.floor(Math.random()*3)]:config.format;
  exercise=engine.build(d,format);answered=false;ordered=[];
  $('c-counter').textContent=goal===Infinity?`Ejercicio ${done+1} · vuelta ${round}`:`Ejercicio ${done+1} de ${goal}`;
  $('c-kind').textContent=`${exercise.theme} · ${exercise.level} · ${grammarNames[exercise.grammar]}`;
  $('c-skill').textContent=learning.status(exercise.targetKey);
  $('c-instruction').textContent=exercise.instruction;
  $('c-sentence').textContent=format==='order'?'Reconstruye la frase.':exercise.stem;
  $('c-translation').hidden=!config.spanish;$('c-translation').textContent=`Sentido en español: ${exercise.translation}`;
  $('c-hint').hidden=!config.hints;$('c-hint').textContent=exercise.hint;
  $('c-write').hidden=format!=='fill';$('c-options').hidden=format!=='quiz';$('c-order').hidden=format!=='order';
  $('c-input').value='';$('c-input').disabled=false;$('c-check').disabled=false;
  $('c-feedback').textContent='';$('c-feedback').className='v-feedback';
  for(const id of ['c-solution','c-rule','c-audio','c-next'])$(id).hidden=true;
  $('c-reveal').hidden=false;$('c-order-check').disabled=false;$('c-order-reset').disabled=false;
  $('c-next').textContent=done+1>=goal?'Ver resultado →':'Siguiente →';
  if(format==='quiz')renderOptions();if(format==='order')renderOrder();if(format==='fill')$('c-input').focus();
 }
 function renderOptions(){
  $('c-options').replaceChildren();for(const option of exercise.options){const b=document.createElement('button');b.textContent=option;b.lang='fr';b.addEventListener('click',()=>{if(answered)return;const ok=engine.matches(exercise,option,config.strict);if(!ok)b.classList.add('wrong');finish(ok,option);});$('c-options').append(b);}
 }
 function renderOrder(){
  $('c-bank').replaceChildren();$('c-assembled').replaceChildren();
  for(const token of exercise.tokens){const b=document.createElement('button');b.type='button';b.lang='fr';b.textContent=token.text;b.disabled=answered||ordered.includes(token.id);b.setAttribute('aria-label',`Añadir: ${token.text}`);b.addEventListener('click',()=>{if(answered||ordered.includes(token.id))return;ordered.push(token.id);renderOrder();});$('c-bank').append(b);}
  for(const id of ordered){const token=exercise.tokens.find(x=>x.id===id),b=document.createElement('button');b.type='button';b.lang='fr';b.textContent=token.text;b.disabled=answered;b.setAttribute('aria-label',`Quitar: ${token.text}`);b.addEventListener('click',()=>{if(answered)return;ordered=ordered.filter(x=>x!==id);renderOrder();});$('c-assembled').append(b);}
 }
 function finish(ok,input='',revealed=false){
  if(answered||!exercise)return;answered=true;done++;if(ok)correct++;
  learning.record(exercise.targetKey,'used',ok,{independent:ok&&!revealed&&!config.hints&&exercise.format==='fill'&&exercise.grammar!=='articles'&&engine.matches(exercise,input,true)});
  $('c-feedback').className=`v-feedback ${ok?'good':'bad'}`;
  $('c-feedback').textContent=ok?'¡Bien hecho! Has aplicado la estructura.':revealed?'Solución consultada. Queda marcada para repasar.':'No coincide con la respuesta prevista. Compara tu respuesta con la estructura.';
  $('c-solution').textContent=exercise.sentence;$('c-solution').hidden=false;$('c-rule').textContent=exercise.rule;$('c-rule').hidden=false;
  $('c-input').disabled=true;$('c-check').disabled=true;$('c-order-check').disabled=true;$('c-order-reset').disabled=true;
  for(const b of $('c-options').children){b.disabled=true;if(engine.matches(exercise,b.textContent,true))b.classList.add('correct');}
  if(exercise.format==='order')renderOrder();
  $('c-reveal').hidden=true;$('c-next').hidden=false;$('c-audio').hidden=false;$('c-skill').textContent=learning.status(exercise.targetKey);renderProgress();$('c-next').focus();
 }
 function summary(){
  exercise=null;$('c-session').hidden=true;$('c-summary').hidden=false;$('c-result').textContent=`${correct} de ${done} ejercicios resueltos correctamente. Las soluciones consultadas cuentan como repaso. Puedes elegir otra combinación cuando quieras.`;$('c-return').focus();renderProgress();
 }
 function returnSettings(){$('c-summary').hidden=true;$('c-settings').hidden=false;refresh();$('c-start').focus();}
 for(const theme of [...new Set(CONTEXTE_TEMPLATES.map(t=>t.theme))]){const label=document.createElement('label');label.className='check';const input=document.createElement('input');input.type='checkbox';input.value=theme;input.addEventListener('change',refresh);const text=document.createElement('span');text.textContent=theme;label.append(input,text);$('c-themes').append(label);themeChecks.set(theme,input);}
 for(const id of ['c-plan','c-source','c-grammar','c-format','c-tense','c-level','c-length','c-hints','c-spanish','c-strict'])$(id).addEventListener('change',refresh);
 $('c-search').addEventListener('input',renderManual);
 $('c-pick-visible').addEventListener('click',()=>{for(const label of $('c-items').children)manual.add(label.children[0].value);renderManual();refresh();});
 $('c-unpick').addEventListener('click',()=>{manual.clear();renderManual();refresh();});
 $('c-start').addEventListener('click',start);$('c-exit').addEventListener('click',summary);$('c-return').addEventListener('click',returnSettings);
 $('c-next').addEventListener('click',()=>{if(answered)next();});$('c-reveal').addEventListener('click',()=>finish(false,'',true));
 $('c-write').addEventListener('submit',event=>{event.preventDefault();if(answered||!exercise)return;const text=$('c-input').value.trim();if(!text){$('c-feedback').textContent='Escribe una respuesta antes de comprobar.';return;}finish(engine.matches(exercise,text,config.strict),text);});
 $('c-order-check').addEventListener('click',()=>{if(answered||!exercise)return;if(ordered.length!==exercise.tokens.length){$('c-feedback').textContent='Coloca todos los grupos antes de comprobar.';return;}const text=engine.join(ordered.map(id=>exercise.tokens.find(x=>x.id===id).text));finish(engine.matches(exercise,text,config.strict),text);});
 $('c-order-reset').addEventListener('click',()=>{if(answered)return;ordered=[];renderOrder();});
 $('c-audio').addEventListener('click',()=>{if(!exercise||!answered)return;if(!('speechSynthesis' in window)){alert('Este navegador no admite pronunciación.');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(exercise.sentence);u.lang='fr-FR';u.rate=.85;speechSynthesis.speak(u);});
 for(const char of ['é','è','ê','à','â','î','ô','ù','û','ç','œ','’']){const b=document.createElement('button');b.type='button';b.textContent=char;b.setAttribute('aria-label',`Insertar ${char}`);b.addEventListener('click',()=>{const input=$('c-input');if(input.disabled)return;input.setRangeText(char,input.selectionStart,input.selectionEnd,'end');input.focus();});$('c-accents').append(b);}
 document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.view==='context')refresh();}));
 renderManual();refresh();
})();
