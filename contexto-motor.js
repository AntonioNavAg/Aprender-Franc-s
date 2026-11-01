/* Motor puro: genera únicamente combinaciones previstas por las plantillas. */
(() => {
 const words=new Map(VOCABULARIO.map(w=>[w.id,w])),verbs=new Map(VERBOS.map(v=>[v.fr,v]));
 const subjects=[['je','yo',0],['tu','tú',1],['elle','ella',2],['nous','nosotros/as',3],['vous','vosotros/as o usted(es)',4],['ils','ellos',5]];
 const times={P:{label:'Presente',marker:'Chaque jour,',es:'cada día'},PC:{label:'Passé composé',marker:'Hier,',es:'ayer'},FP:{label:'Futuro próximo',marker:'Demain,',es:'mañana'},I:{label:'Imperfecto',marker:'Autrefois,',es:'antes / antiguamente'}};
 const norm=(s,strict=true)=>{let x=String(s).normalize('NFC').toLowerCase().replace(/’/g,"'").replace(/\s+/g,' ').trim().replace(/\s*'\s*/g,"'").replace(/[.,!?]/g,'').trim();return strict?x:x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe');};
 const join=chunks=>chunks.join(' ').replace(/’\s+/g,'’').replace(/\s+/g,' ').trim();
 const pick=(xs,rng=Math.random)=>xs[Math.floor(rng()*xs.length)];
 function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function article(rule,item){if(rule==='plural')return 'des';if(rule==='indef')return item.gender==='f'?'une':'un';const vowel=/^[aeiouéèêàâîôûh]/i.test(item.noun);if(rule==='def')return vowel?'l’':item.gender==='f'?'la':'le';return vowel?'de l’':item.gender==='f'?'de la':'du';}
 const key=(type,id)=>`${type}:${id}`;
 function descriptors(){
  const out=[];
  for(const t of CONTEXTE_TEMPLATES)for(const item of t.items){
   if(!words.has(item.id))throw Error('Falta vocabulario: '+item.id);
   if(t.kind==='action'){
    if(!verbs.has(t.verb))throw Error('Falta verbo: '+t.verb);
    for(const tense of Object.keys(times))for(let s=0;s<subjects.length;s++)for(const grammar of ['verbs','vocab'])out.push({id:`${t.id}:${item.id}:${tense}:${s}:${grammar}`,t,item,tense,s,grammar,level:tense==='P'?'A1':'A2',targetKey:key(grammar==='verbs'?'verb':'word',grammar==='verbs'?t.verb:item.id)});
   }else if(t.kind==='article')out.push({id:`${t.id}:${item.id}`,t,item,grammar:'articles',level:t.level,targetKey:key('word',item.id)});
   else for(const adj of t.adjectives){if(!words.has(adj.id)||words.get(adj.id).type!=='adjective')throw Error('Falta adjetivo: '+adj.id);out.push({id:`${t.id}:${item.id}:${adj.id}`,t,item,adj,grammar:'agreement',level:t.level,targetKey:key('word',adj.id)});}
  }return out;
 }
 const all=descriptors();
 function catalog(){const map=new Map();for(const d of all){const [type,id]=d.targetKey.split(':');const v=type==='verb'?verbs.get(id):words.get(id);if(!map.has(d.targetKey))map.set(d.targetKey,{key:d.targetKey,fr:v.fr,es:v.es,themes:new Set()});map.get(d.targetKey).themes.add(d.t.theme);}return [...map.values()].sort((a,b)=>a.fr.localeCompare(b.fr,'fr'));}
 function eligible(config,state={}){
  const favorites=new Set(state.favorites||[]),learned=new Set(state.learned||[]),manual=new Set(config.manual||[]);
  return all.filter(d=>(!config.themes?.length||config.themes.includes(d.t.theme))&&(config.grammar==='all'||d.grammar===config.grammar)&&(config.level==='all'||d.level===config.level)&&(d.t.kind!=='action'||config.tense==='all'||d.tense===config.tense)&&(config.source==='all'||config.source==='favorites'&&favorites.has(d.targetKey)||config.source==='learned'&&learned.has(d.targetKey)||config.source==='pending'&&!learned.has(d.targetKey)||config.source==='manual'&&manual.has(d.targetKey)));
 }
 function build(d,format='fill',rng=Math.random){
  const {t,item}=d;let chunks,stem,answer,instruction,hint,translation,rule,wrong=[];
  if(t.kind==='action'){
   const v=verbs.get(t.verb),tm=times[d.tense],sub=subjects[d.s];
   const form=Conjugador.conjugate(v,d.tense)[sub[2]];
   if(!form||form.includes('/'))throw Error('Forma no válida para la plantilla: '+d.id);
   const pronoun=sub[0]==='je'&&/^[aeiouéèêàâîôûh]/i.test(form)?'j’':sub[0];
   chunks=[tm.marker,pronoun,form,item.phrase];
   translation=`${tm.es} · ${sub[1]} · ${v.es} · ${item.es}`;
   if(d.grammar==='verbs'){
    answer=form;stem=join([tm.marker,pronoun,'_____',item.phrase]);instruction=`Conjuga el verbo «${v.es}» en ${tm.label.toLowerCase()}. Escribe toda la forma verbal, incluido el auxiliar si lo hay.`;hint=`Infinitivo: ${v.fr}. Sujeto: ${sub[0]}.`;
    rule=`${tm.label}: ${sub[0]} → ${form}. ${Conjugador.tenses[d.tense][1]}`;
    wrong=[...Conjugador.conjugate(v,d.tense),...v.forms.P,...v.forms.I,...v.forms.F].filter(x=>x&&!x.includes('/'));
   }else{
    answer=item.id;stem=join([tm.marker,pronoun,form,item.phrase.replace(item.id,'_____')]);instruction=`Completa con la palabra que significa «${words.get(item.id).es}». Conserva el artículo que ya aparece.`;hint=`Empieza por «${answer[0]}». ${words.get(item.id).gender==='f'?'Femenino':'Masculino'}.`;
    rule=`${item.phrase} = ${item.es}. El verbo y el artículo ya estaban escritos.`;wrong=t.items.map(x=>x.id);wrong.push(...VOCABULARIO.filter(w=>w.type==='noun'&&w.id!==answer).slice(0,100).map(w=>w.fr));
   }
  }else if(t.kind==='article'){
   answer=article(t.rule,item);chunks=[t.before,answer,item.noun];stem=join([t.before,'_____',item.noun]);
   const names={indef:'indefinido singular',def:'definido singular',plural:'indefinido plural',partitive:'partitivo'};
   instruction=`Completa con el artículo ${names[t.rule]}.`;hint=`${item.noun}: ${item.gender==='f'?'femenino':'masculino'}${t.rule==='plural'?', plural':''}.`;
   translation=`Palabra: ${words.get(item.id).es}.`;
   rule=`${hint} Se usa «${answer}»: ${join([answer,item.noun])}. ${['l’','de l’'].includes(answer)?'Se hace elisión ante vocal o h muda.':''}`;
   wrong=['un','une','le','la','l’','des','du','de la','de l’'];
  }else{
   const {adj}=d;const i=(item.number==='p'?2:0)+(item.gender==='f'?1:0);answer=adj.forms[i];const form=item.number==='p'?'sont':'est';chunks=[item.noun,form,answer];stem=join([item.noun,form,'_____']);
   instruction=`Completa con el adjetivo «${words.get(adj.id).es}», haciendo la concordancia.`;hint=`Forma de referencia: ${adj.id}.`;
   translation=`${words.get(item.id).es} · ${words.get(adj.id).es}.`;
   rule=`${item.noun}: ${item.gender==='f'?'femenino':'masculino'} ${item.number==='p'?'plural':'singular'}. La forma correspondiente es «${answer}».`;
   wrong=[...adj.forms,adj.id+'s',adj.id+'e',adj.id+'es'];
  }
  const sentence=join(chunks)+'.';
  const answers=format==='order'?[sentence]:[answer];
  const alternatives=[...new Set(wrong)].filter(x=>!answers.some(a=>norm(a)===norm(x)));
  const options=shuffle([answer,...shuffle(alternatives,rng).slice(0,3)],rng);
  let tokens=shuffle(chunks.map((text,i)=>({id:i,text})),rng);if(tokens.every((x,i)=>x.id===i)){tokens=[...tokens.slice(1),tokens[0]];}
  return {id:d.id,format,targetKey:d.targetKey,theme:t.theme,level:d.level,grammar:d.grammar,sentence,stem,answer,answers,instruction:format==='order'?'Ordena los grupos. Empieza por el marcador temporal, si lo hay; después sujeto, verbo y complemento.':instruction,hint,translation,rule,options,tokens};
 }
 function matches(exercise,input,strict=true){return exercise.answers.some(a=>norm(a,strict)===norm(input,strict));}
 window.Contexte={all,catalog,eligible,build,matches,join,shuffle,times};
})();
