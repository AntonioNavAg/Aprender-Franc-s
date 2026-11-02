(() => {
 'use strict';
 const $=id=>document.getElementById(id),alphabet=window.ALPHABET_FR,numbers=window.NOMBRES_FR,key='atelier-bases-v1';
 const canSpeak=Boolean(window.speechSynthesis&&typeof window.SpeechSynthesisUtterance==='function');
 let voices=[],audioToken=0,letter=null,lDeck=[],lDone=0,lCorrect=0,lAnswered=false,lHeard=false;
 let number=null,nConfig={},nDone=0,nCorrect=0,nGoal=0,nAnswered=false,nHeard=false,nUsed=new Set();
 let raw={};try{raw=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
 const valid=x=>Number.isSafeInteger(x)&&x>=0?x:0;
 const counts=p=>({total:valid(p?.total),correct:Math.min(valid(p?.correct),valid(p?.total))});
 const scores={letters:counts(raw.letters),numbers:counts(raw.numbers)};
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 function stats(){$('b-letter-stats').textContent=`Abecedario: ${scores.letters.correct} / ${scores.letters.total} aciertos.`;$('b-number-stats').textContent=`Números: ${scores.numbers.correct} / ${scores.numbers.total} aciertos.`;}
 function save(){try{localStorage.setItem(key,JSON.stringify(scores));}catch{$('b-storage').textContent='Almacenamiento no disponible: los resultados duran esta sesión.';}stats();}
 function stopAudio(){audioToken++;if(canSpeak)window.speechSynthesis.cancel();}
 function loadVoices(){
  if(!canSpeak){$('b-audio-status').textContent='Este navegador no permite reproducir voz. Puedes leer la guía y practicar los números sin audio.';return;}
  const selected=$('b-voice').value;voices=window.speechSynthesis.getVoices().filter(v=>/^fr(?:[-_]|$)/i.test(v.lang));$('b-voice').replaceChildren();const auto=document.createElement('option');auto.value='';auto.textContent=voices.length?'Voz francesa automática':'Francés del navegador';$('b-voice').append(auto);
  for(const v of voices){const option=document.createElement('option');option.value=v.voiceURI;option.textContent=`${v.name} (${v.lang})`;$('b-voice').append(option);}
  $('b-voice').value=voices.some(v=>v.voiceURI===selected)?selected:'';
  $('b-audio-status').textContent=voices.length?'Elige una voz francesa y pulsa un botón de audio. La disponibilidad sin conexión depende de la voz.':'Todavía no aparece una voz francesa. El navegador intentará cargarla al reproducir; si no suena, instala una voz francesa en tu sistema o prueba otro navegador.';
 }
 function speak(text,onStart){
  if(!canSpeak){$('b-audio-status').textContent='Audio no disponible en este navegador. Los ejercicios escritos siguen disponibles.';return;}
  stopAudio();const token=audioToken,u=new window.SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=Number($('b-rate').value)||.85;const voice=voices.find(v=>v.voiceURI===$('b-voice').value)||voices.find(v=>v.lang==='fr-FR')||voices[0];if(voice)u.voice=voice;
  u.onstart=()=>{if(token!==audioToken)return;$('b-audio-status').textContent='Reproduciendo en francés…';onStart?.();};
  u.onend=()=>{if(token===audioToken)$('b-audio-status').textContent='Puedes volver a escuchar o elegir una velocidad más lenta.';};
  u.onerror=()=>{if(token===audioToken)$('b-audio-status').textContent='No se ha podido reproducir la voz francesa. Prueba otra voz, comprueba el sonido o instala una voz francesa en tu sistema.';};
  try{window.speechSynthesis.speak(u);}catch{$('b-audio-status').textContent='El navegador no ha podido iniciar el audio. Prueba otra voz o navegador.';}
 }
 function button(text,handler,className='small'){const b=document.createElement('button');b.type='button';b.textContent=text;b.className=className;b.addEventListener('click',handler);return b;}
 for(const item of alphabet){
  const card=document.createElement('article');card.className='b-letter-card';const audio=button(item.letter,()=>speak('La lettre '+item.letter+'.'),'b-letter-button');audio.disabled=!canSpeak;audio.setAttribute('aria-label',`Escuchar el nombre de la letra ${item.letter}`);
  const name=document.createElement('p');name.lang='fr';name.textContent=`${item.name} · /${item.ipa}/`;const sample=button('♫ '+item.word,()=>speak(item.word));sample.lang='fr';sample.disabled=!canSpeak;sample.setAttribute('aria-label',`Escuchar ${item.word}`);const es=document.createElement('p');es.className='hint';es.textContent=item.es;card.append(audio,name,sample,es);$('b-letter-grid').append(card);
 }
 function showPart(part){stopAudio();$('b-alphabet').hidden=part!=='alphabet';$('b-numbers').hidden=part!=='numbers';for(const [id,p]of [['b-alphabet-tab','alphabet'],['b-numbers-tab','numbers']]){$(id).className=part===p?'secondary':'small';$(id).setAttribute('aria-pressed',String(part===p));}}
 function startLetters(){if(!canSpeak)return;lDeck=shuffle(alphabet).slice(0,10);lDone=0;lCorrect=0;$('b-letter-library').hidden=true;$('b-letter-game').hidden=false;nextLetter();}
 function nextLetter(){
  stopAudio();if(!lDeck.length){$('b-letter-game').hidden=true;$('b-letter-library').hidden=false;$('b-letter-stats').textContent=`Sesión terminada: ${lCorrect} / ${lDone}. Total: ${scores.letters.correct} / ${scores.letters.total} aciertos.`;$('b-letter-start').focus();letter=null;return;}
  letter=lDeck.shift();lAnswered=false;lHeard=false;$('b-letter-count').textContent=`LETRA ${lDone+1} / 10`;$('b-letter-feedback').textContent='Pulsa Escuchar letra antes de responder.';$('b-letter-feedback').className='v-feedback';$('b-letter-next').hidden=true;$('b-letter-reveal').hidden=false;
  $('b-letter-options').replaceChildren();for(const item of shuffle([letter,...shuffle(alphabet.filter(x=>x!==letter)).slice(0,3)])){const b=button(item.letter,()=>{if(!lHeard||lAnswered)return;if(item.letter!==letter.letter)b.classList.add('wrong');finishLetter(item.letter===letter.letter);},'');b.disabled=true;$('b-letter-options').append(b);}
 }
 function finishLetter(ok){if(lAnswered||!letter)return;lAnswered=true;lDone++;if(ok)lCorrect++;scores.letters.total++;if(ok)scores.letters.correct++;save();$('b-letter-feedback').className=`v-feedback ${ok?'good':'bad'}`;$('b-letter-feedback').textContent=`${ok?'¡Bien hecho!':'Para repasar:'} ${letter.letter} se llama ${letter.name}, /${letter.ipa}/. Ejemplo: ${letter.word} (${letter.es}).`;for(const b of $('b-letter-options').children){b.disabled=true;if(b.textContent===letter.letter)b.classList.add('correct');}$('b-letter-next').hidden=false;$('b-letter-reveal').hidden=true;$('b-letter-next').textContent=lDeck.length?'Siguiente →':'Ver resultado →';$('b-letter-next').focus();}
 function explore(){const raw=$('b-explore').value.trim(),n=Number(raw);const ok=raw!==''&&Number.isInteger(n)&&n>=0&&n<=999999;$('b-spelled').textContent=ok?numbers.spell(n):'Escribe un entero de 0 a 999 999.';$('b-explore-play').disabled=!ok||!canSpeak;return ok?n:null;}
 const tables={first:Array.from({length:21},(_,i)=>i),tens:[20,21,22,29,30,31,39,40,41,49,50,51,59,60,61,69],special:Array.from({length:30},(_,i)=>70+i),large:[100,101,120,180,200,201,280,300,999,1000,1001,2000,2021,10000,80000,81000,100000,200000,200100,999999]};
 function renderTable(){$('b-number-table').replaceChildren();for(const n of tables[$('b-number-table-range').value]||tables.first){const row=document.createElement('div');row.className='b-number-row';const label=document.createElement('strong');label.textContent=n.toLocaleString('fr-FR');const text=document.createElement('span');text.lang='fr';text.textContent=numbers.spell(n);const audio=button('♫',()=>speak(numbers.spell(n)));audio.disabled=!canSpeak;audio.setAttribute('aria-label',`Escuchar ${n}`);row.append(label,text,audio);$('b-number-table').append(row);}}
 for(const [title,explanation,example] of numbers.rules){const card=document.createElement('article');card.className='g-card';const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=explanation;const e=document.createElement('p');e.className='g-formula';e.lang='fr';e.textContent=example;card.append(h,p,e);$('b-number-rules').append(card);}
 function startNumbers(){
  const [min,max]=$('b-number-range').value.split(':').map(Number);nConfig={min,max,mode:$('b-number-mode').value,strict:$('b-number-strict').checked};if(nConfig.mode==='listen'&&!canSpeak)return;
  nGoal=$('b-number-length').value==='free'?Infinity:Math.min(Number($('b-number-length').value),max-min+1);nDone=0;nCorrect=0;nUsed=new Set();$('b-number-library').hidden=true;$('b-number-summary').hidden=true;$('b-number-game').hidden=false;nextNumber();
 }
 function pickNumber(){const {min,max}=nConfig;if(nUsed.size>=max-min+1)nUsed.clear();let n;for(let i=0;i<50;i++){n=min+Math.floor(Math.random()*(max-min+1));if(!nUsed.has(n)){nUsed.add(n);return n;}}for(n=min;nUsed.has(n);n++);nUsed.add(n);return n;}
 function nextNumber(){
  stopAudio();if(nDone>=nGoal){numberSummary();return;}number=pickNumber();nAnswered=false;nHeard=false;const {mode}=nConfig;
  $('b-number-position').textContent=`${nDone+1}${nGoal===Infinity?' · PRÁCTICA LIBRE':' / '+nGoal}`;
  $('b-number-question').textContent=mode==='listen'?'Escucha el número':mode==='digits'?numbers.spell(number):number.toLocaleString('fr-FR');
  $('b-number-instruction').textContent={quiz:'Elige la escritura correcta en francés de Francia.',write:'Escribe el número en francés de Francia.',digits:'Escribe este número con cifras.',listen:'Escucha y escribe el número con cifras.'}[mode];
  $('b-number-play').hidden=mode!=='listen';$('b-number-options').hidden=mode!=='quiz';$('b-number-write').hidden=mode==='quiz';$('b-number-accents').hidden=mode!=='write';
  $('b-number-input-label').textContent=mode==='write'?'Número escrito en francés':'Número en cifras (sin puntos ni comas)';$('b-number-input').value='';$('b-number-input').inputMode=mode==='write'?'text':'numeric';$('b-number-input').disabled=false;$('b-number-check').disabled=false;
  $('b-number-feedback').textContent=mode==='write'?'Se aceptan guiones tradicionales o la grafía rectificada. Conserva et y las s necesarias.':'';$('b-number-feedback').className='v-feedback';
  for(const id of ['b-number-answer','b-number-answer-audio','b-number-next'])$(id).hidden=true;$('b-number-reveal').hidden=false;$('b-number-next').textContent=nDone+1>=nGoal?'Ver resultado →':'Siguiente →';
  $('b-number-options').replaceChildren();if(mode==='quiz'){const alternatives=new Set([number]);for(const offset of shuffle([-1,1,-10,10,-20,20])){const n=number+offset;if(n>=nConfig.min&&n<=nConfig.max)alternatives.add(n);if(alternatives.size===4)break;}while(alternatives.size<4)alternatives.add(nConfig.min+Math.floor(Math.random()*(nConfig.max-nConfig.min+1)));for(const n of shuffle([...alternatives])){const b=button(numbers.spell(n),()=>{if(nAnswered)return;if(n!==number)b.classList.add('wrong');finishNumber(n===number);},'');$('b-number-options').append(b);}}
  if(mode!=='quiz')$('b-number-input').focus();
 }
 function finishNumber(ok){
  if(nAnswered||number===null)return;nAnswered=true;nDone++;if(ok)nCorrect++;scores.numbers.total++;if(ok)scores.numbers.correct++;save();$('b-number-feedback').className=`v-feedback ${ok?'good':'bad'}`;$('b-number-feedback').textContent=ok?'¡Bien hecho!':'Para repasar: compara tu respuesta con la forma correcta.';
  $('b-number-answer').textContent=`${number.toLocaleString('fr-FR')} → ${numbers.spell(number)}`;$('b-number-answer').hidden=false;$('b-number-input').disabled=true;$('b-number-check').disabled=true;
  for(const b of $('b-number-options').children){b.disabled=true;if(b.textContent===numbers.spell(number))b.classList.add('correct');}
  $('b-number-reveal').hidden=true;$('b-number-answer-audio').hidden=!canSpeak;$('b-number-next').hidden=false;$('b-number-next').focus();
 }
 function numberSummary(){stopAudio();number=null;$('b-number-game').hidden=true;$('b-number-summary').hidden=false;$('b-number-result').textContent=`${nCorrect} / ${nDone} aciertos. Puedes elegir otro rango o tipo de ejercicio.`;$('b-number-return').focus();}
 $('b-alphabet-tab').addEventListener('click',()=>showPart('alphabet'));$('b-numbers-tab').addEventListener('click',()=>showPart('numbers'));$('b-stop-audio').addEventListener('click',stopAudio);
 $('b-letter-start').disabled=!canSpeak;$('b-letter-start').addEventListener('click',startLetters);$('b-letter-play').addEventListener('click',()=>{if(!letter)return;const target=letter;speak('La lettre '+letter.letter+'.',()=>{if(letter!==target||lAnswered)return;lHeard=true;$('b-letter-feedback').textContent='Elige la letra que has oído.';for(const b of $('b-letter-options').children)b.disabled=false;});});
 $('b-letter-reveal').addEventListener('click',()=>finishLetter(false));$('b-letter-next').addEventListener('click',()=>{if(lAnswered)nextLetter();});$('b-letter-exit').addEventListener('click',()=>{stopAudio();letter=null;$('b-letter-game').hidden=true;$('b-letter-library').hidden=false;});
 $('b-explore').addEventListener('input',explore);$('b-explore-play').addEventListener('click',()=>{const n=explore();if(n!==null)speak(numbers.spell(n));});$('b-number-table-range').addEventListener('change',renderTable);
 $('b-number-start').addEventListener('click',startNumbers);$('b-number-mode').addEventListener('change',()=>{$('b-number-start').disabled=$('b-number-mode').value==='listen'&&!canSpeak;});$('b-number-next').addEventListener('click',()=>{if(nAnswered)nextNumber();});$('b-number-exit').addEventListener('click',numberSummary);$('b-number-reveal').addEventListener('click',()=>finishNumber(false));$('b-number-return').addEventListener('click',()=>{$('b-number-summary').hidden=true;$('b-number-library').hidden=false;$('b-number-start').focus();});
 $('b-number-play').addEventListener('click',()=>{if(number===null)return;const target=number;speak(numbers.spell(number),()=>{if(number===target&&!nAnswered)nHeard=true;});});$('b-number-answer-audio').addEventListener('click',()=>{if(number!==null&&nAnswered)speak(numbers.spell(number));});
 $('b-number-write').addEventListener('submit',event=>{event.preventDefault();if(nAnswered||number===null)return;if(nConfig.mode==='listen'&&!nHeard){$('b-number-feedback').textContent='Escucha el número antes de responder.';return;}const text=$('b-number-input').value.trim();if(!text){$('b-number-feedback').textContent='Escribe una respuesta antes de comprobar.';return;}finishNumber(nConfig.mode==='write'?numbers.matchWords(number,text,nConfig.strict):numbers.matchDigits(number,text));});
 for(const char of ['é','è','ê','à','ç','-']){const b=button(char,()=>{const input=$('b-number-input');if(input.disabled)return;input.setRangeText(char,input.selectionStart,input.selectionEnd,'end');input.focus();});b.setAttribute('aria-label',`Insertar ${char}`);$('b-number-accents').append(b);}
 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.view!=='basics')stopAudio();}));for(const id of ['language-home','change-language'])$(id).addEventListener('click',stopAudio);
 if(canSpeak)window.speechSynthesis.addEventListener?.('voiceschanged',loadVoices);
 loadVoices();explore();renderTable();stats();
})();
