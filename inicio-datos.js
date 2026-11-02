/* Nombres de letras y números cardinaux (francés de Francia). */
(() => {
 const data=`A|a|a|ami|amigo
B|bé|be|banane|plátano
C|cé|se|café|café
D|dé|de|dent|diente
E|e|ə|école|escuela
F|èf|ɛf|fleur|flor
G|gé|ʒe|gare|estación
H|hache|aʃ|hôtel|hotel
I|i|i|île|isla
J|ji|ʒi|jardin|jardín
K|ka|ka|kiwi|kiwi
L|èl|ɛl|livre|libro
M|èm|ɛm|maison|casa
N|èn|ɛn|nuit|noche
O|o|o|orange|naranja
P|pé|pe|pomme|manzana
Q|ku|ky|question|pregunta
R|èr|ɛʁ|robe|vestido
S|ès|ɛs|soleil|sol
T|té|te|table|mesa
U|u|y|usine|fábrica
V|vé|ve|vélo|bicicleta
W|double vé|dublə ve|wagon|vagón
X|iks|iks|xylophone|xilófono
Y|i grec|i ɡʁɛk|yaourt|yogur
Z|zède|zɛd|zéro|cero`;
 window.ALPHABET_FR=data.split('\n').map(r=>{const [letter,name,ipa,word,es]=r.split('|');return {letter,name,ipa,word,es};});
 const units=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize'];
 function under100(n,follow=false){
  if(n<17)return units[n];if(n<20)return 'dix-'+units[n-10];
  if(n<70){const base=['','','vingt','trente','quarante','cinquante','soixante'][Math.floor(n/10)],r=n%10;return base+(r===0?'':r===1?' et un':'-'+units[r]);}
  if(n<80)return n===71?'soixante et onze':'soixante-'+under100(n-60);
  const r=n-80;return 'quatre-vingt'+(r===0?(follow?'':'s'):'-'+under100(r));
 }
 function under1000(n,follow=false){if(n<100)return under100(n,follow);const c=Math.floor(n/100),r=n%100;return (c===1?'cent':units[c]+' cent')+(r===0?(c>1&&!follow?'s':''):' '+under100(r,follow));}
 function spell(n){if(!Number.isInteger(n)||n<0||n>999999)throw RangeError('Usa un entero de 0 a 999999.');if(n<1000)return under1000(n);const k=Math.floor(n/1000),r=n%1000;return (k===1?'mille':under1000(k,true)+' mille')+(r?' '+under1000(r):'');}
 function normalize(s,strict=true){let x=String(s).normalize('NFC').toLowerCase().trim().replace(/[‐‑–—-]/g,' ').replace(/\s+/g,' ');return strict?x:x.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
 function matchWords(n,text,strict=true){return normalize(spell(n),strict)===normalize(text,strict);}
 function matchDigits(n,text){const s=String(text).trim().replace(/[ \u00a0\u202f]/g,'');return /^\d+$/.test(s)&&Number(s)===n;}
 const rules=[
 ['De 0 a 16','Memoriza estas formas: zéro, un, deux… seize. Son la base de las combinaciones.','0 → zéro · 11 → onze · 16 → seize'],
 ['De 17 a 19','Se forma dix + unidad, con guion.','17 → dix-sept · 18 → dix-huit · 19 → dix-neuf'],
 ['De 20 a 69','Usa la decena y añade la unidad. Con 1 aparece et: vingt et un, trente et un…','22 → vingt-deux · 31 → trente et un · 64 → soixante-quatre'],
 ['70: sesenta + diez','En francés de Francia, los setenta se construyen a partir de soixante. El 71 lleva et.','70 → soixante-dix · 71 → soixante et onze · 79 → soixante-dix-neuf'],
 ['80: cuatro veintenas','80 se escribe quatre-vingts. La s desaparece cuando sigue otro número. No se usa et en 81.','80 → quatre-vingts · 81 → quatre-vingt-un · 85 → quatre-vingt-cinq'],
 ['90: ochenta + diez','Continúa con quatre-vingt + diez, once, doce… No se añade et en 91.','90 → quatre-vingt-dix · 91 → quatre-vingt-onze · 99 → quatre-vingt-dix-neuf'],
 ['Centenas','Cent lleva s cuando está multiplicado y no le sigue otro número. Cien es cent, sin un delante.','100 → cent · 200 → deux cents · 201 → deux cent un · 280 → deux cent quatre-vingts'],
 ['Millares','Mille es invariable y mil se dice mille, no un mille. Antes de mille, cent y vingt pierden su s.','1 000 → mille · 2 000 → deux mille · 80 000 → quatre-vingt mille · 200 000 → deux cent mille'],
 ['Guiones y espacios','Aquí se muestra la grafía tradicional. También se acepta unir los componentes con guiones según las rectificaciones de 1990. Las s y la palabra et siguen siendo importantes.','21 → vingt et un / vingt-et-un · 201 → deux cent un / deux-cent-un'],
 ['Variantes regionales','En Bélgica se usan septante (70) y nonante (90). En parte de Suiza también se usa huitante (80). Los ejercicios de esta sección practican las formas de Francia.','Francia: soixante-dix, quatre-vingts, quatre-vingt-dix'],
 ['Qué queda fuera de esta primera parte','Se practican números cardinales aislados, del 0 al 999 999. Ordinales, horas, fechas, decimales y millones requieren reglas adicionales.','un puede cambiar a une delante de un sustantivo femenino: une pomme. Aquí se escribe el número aislado.']
 ];
 window.NOMBRES_FR={spell,normalize,matchWords,matchDigits,rules};
})();
