/* Evidencia de aprendizaje independiente de las marcas manuales del catálogo. */
(() => {
 const KEY='atelier-apprentissage-v1';let state={};let persistent=true;
 try{const parsed=JSON.parse(localStorage.getItem(KEY)||'{}');if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))state=parsed;}catch{}
 const day=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
 function get(key){const raw=state[key];const n=v=>Number.isSafeInteger(v)&&v>=0?v:0;return {recognized:n(raw?.recognized),recalled:n(raw?.recalled),used:n(raw?.used),attempts:n(raw?.attempts),errors:n(raw?.errors),days:Array.isArray(raw?.days)?raw.days.filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)):[],review:Boolean(raw?.review),last:raw?.last||''};}
 function record(key,skill,ok,options={}){
  if(!['recognized','recalled','used'].includes(skill))return;
  const item=get(key);item.attempts++;item.last=day();
  if(ok){item[skill]++;item.review=false;if(options.independent&&skill==='used')item.days=[...new Set([...item.days,day()])].slice(-12);}
  else{item.errors++;item.review=true;if(skill==='used')item.days=[];}
  state[key]=item;try{localStorage.setItem(KEY,JSON.stringify(state));}catch{persistent=false;}
 }
 function status(key){const p=get(key);if(p.review)return 'Por repasar';if(p.days.length>=3)return 'Consolidada';if(p.used)return 'Utilizada';if(p.recalled)return 'Recordada';if(p.recognized)return 'Reconocida';return 'Sin comprobar';}
 function priority(key){const p=get(key);return p.review?8:p.attempts===0?4:status(key)==='Consolidada'?1:2;}
 window.Apprentissage={get,record,status,priority,persistent:()=>persistent};
})();
