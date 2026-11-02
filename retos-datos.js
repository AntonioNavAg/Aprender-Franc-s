/* Contrarios y contrastes de uso: contexto explícito y femeninos completos. */
(() => {
 const rows=`blanc|blanche|blanco|noir|noire|negro|Colores
haut|haute|alto|bas|basse|bajo|Altura o posición
grand|grande|grande|petit|petite|pequeño|Tamaño
long|longue|largo|court|courte|corto|Longitud
étroit|étroite|estrecho|large|large|ancho / amplio|Anchura
gros|grosse|grueso / corpulento|mince|mince|delgado|Grosor o constitución
épais|épaisse|grueso|fin|fine|fino|Espesor
lourd|lourde|pesado|léger|légère|ligero|Peso
plein|pleine|lleno|vide|vide|vacío|Contenido
ouvert|ouverte|abierto|fermé|fermée|cerrado|Estado de una puerta
propre|propre|limpio|sale|sale|sucio|Limpieza
neuf|neuve|nuevo / sin usar|usé|usée|gastado|Estado de un objeto
jeune|jeune|joven|vieux|vieille|viejo|Edad
chaud|chaude|caliente|froid|froide|frío|Temperatura
humide|humide|húmedo|sec|sèche|seco|Humedad
dur|dure|duro|mou|molle|blando|Consistencia
lisse|lisse|liso|rugueux|rugueuse|áspero|Textura
clair|claire|claro|foncé|foncée|oscuro|Tono de un color
lumineux|lumineuse|luminoso|sombre|sombre|oscuro|Iluminación
transparent|transparente|transparente|opaque|opaque|opaco|Paso de la luz
rapide|rapide|rápido|lent|lente|lento|Velocidad
facile|facile|fácil|difficile|difficile|difícil|Dificultad
simple|simple|simple|compliqué|compliquée|complicado|Complejidad
possible|possible|posible|impossible|impossible|imposible|Posibilidad
vrai|vraie|verdadero|faux|fausse|falso|Veracidad
correct|correcte|correcto|incorrect|incorrecte|incorrecto|Corrección
utile|utile|útil|inutile|inutile|inútil|Utilidad
nécessaire|nécessaire|necesario|superflu|superflue|superfluo|Necesidad
important|importante|importante|insignifiant|insignifiante|insignificante|Importancia
fort|forte|fuerte|faible|faible|débil|Fuerza
solide|solide|resistente|fragile|fragile|frágil|Resistencia
souple|souple|flexible|rigide|rigide|rígido|Flexibilidad
profond|profonde|profundo|superficiel|superficielle|superficial|Profundidad
proche|proche|cercano|lointain|lointaine|lejano|Distancia
cher|chère|caro|bon marché|bon marché|barato|Precio
gratuit|gratuite|gratuito|payant|payante|de pago|Coste
riche|riche|rico|pauvre|pauvre|pobre|Recursos económicos
heureux|heureuse|feliz|malheureux|malheureuse|infeliz|Estado de ánimo
content|contente|contento|mécontent|mécontente|descontento|Satisfacción
calme|calme|tranquilo|agité|agitée|agitado|Estado de ánimo
patient|patiente|paciente|impatient|impatiente|impaciente|Paciencia
poli|polie|educado|impoli|impolie|maleducado|Cortesía
gentil|gentille|bueno / amable|méchant|méchante|malo / malintencionado|Trato a los demás
généreux|généreuse|generoso|égoïste|égoïste|egoísta|Actitud hacia los demás
courageux|courageuse|valiente|peureux|peureuse|miedoso|Ante el miedo
optimiste|optimiste|optimista|pessimiste|pessimiste|pesimista|Perspectiva
honnête|honnête|honesto|malhonnête|malhonnête|deshonesto|Honestidad
prudent|prudente|prudente|imprudent|imprudente|imprudente|Precaución
sûr|sûre|seguro|dangereux|dangereuse|peligroso|Seguridad
sain|saine|saludable|malsain|malsaine|insalubre|Efecto sobre la salud
frais|fraîche|fresco|rassis|rassise|duro / pasado|Pan
cru|crue|crudo|cuit|cuite|cocido|Cocción
sucré|sucrée|dulce|salé|salée|salado|Contraste de sabores
vivant|vivante|vivo|mort|morte|muerto|Vida
présent|présente|presente|absent|absente|ausente|Asistencia
visible|visible|visible|invisible|invisible|invisible|Visibilidad
connu|connue|conocido|inconnu|inconnue|desconocido|Conocimiento
public|publique|público|privé|privée|privado|Acceso o propiedad
individuel|individuelle|individual|collectif|collective|colectivo|Organización
intérieur|intérieure|interior|extérieur|extérieure|exterior|Ubicación
ancien|ancienne|antiguo|moderne|moderne|moderno|Estilo o época
normal|normale|normal|anormal|anormale|anormal|Normalidad
régulier|régulière|regular|irrégulier|irrégulière|irregular|Regularidad
légal|légale|legal|illégal|illégale|ilegal|Legalidad
naturel|naturelle|natural|artificiel|artificielle|artificial|Origen
actif|active|activo|passif|passive|pasivo|Participación
réel|réelle|real|imaginaire|imaginaire|imaginario|Realidad
positif|positive|positivo|négatif|négative|negativo|Valoración o signo
agréable|agréable|agradable|désagréable|désagréable|desagradable|Sensación
confortable|confortable|cómodo|inconfortable|inconfortable|incómodo|Comodidad
efficace|efficace|eficaz|inefficace|inefficace|ineficaz|Eficacia
certain|certaine|seguro / cierto|incertain|incertaine|incierto|Certeza
stable|stable|estable|instable|instable|inestable|Estabilidad
égal|égale|igual|inégal|inégale|desigual|Igualdad
complet|complète|completo|incomplet|incomplète|incompleto|Integridad`;
 const adjectives=rows.split('\n').map((r,i)=>{const [a,af,ae,b,bf,be,theme]=r.split('|');return {id:`adj-${a}-${b}`,type:'Adjetivos',a:{fr:a,f:af,es:ae},b:{fr:b,f:bf,es:be},theme};});
 const other=`tôt|temprano|tard|tarde|Momento|Adverbios
avant|antes|après|después|Orden temporal|Adverbios
dedans|dentro|dehors|fuera|Lugar|Adverbios
dessus|encima|dessous|debajo|Posición|Adverbios
devant|delante|derrière|detrás|Posición|Adverbios
près|cerca|loin|lejos|Distancia|Adverbios
toujours|siempre|jamais|nunca|Frecuencia|Adverbios
souvent|a menudo|rarement|raramente|Frecuencia|Adverbios
beaucoup|mucho|peu|poco|Cantidad|Adverbios
plus|más|moins|menos|Cantidad|Adverbios
ensemble|juntos|séparément|por separado|Agrupación|Adverbios
entrer|entrar|sortir|salir|Movimiento|Verbos
monter|subir|descendre|bajar|Movimiento|Verbos
ouvrir|abrir|fermer|cerrar|Acción|Verbos
commencer|empezar|finir|terminar|Etapas|Verbos
acheter|comprar|vendre|vender|Intercambio|Verbos
donner|dar|recevoir|recibir|Intercambio|Verbos
gagner|ganar|perdre|perder|Resultado|Verbos
accepter|aceptar|refuser|rechazar|Decisión|Verbos
permettre|permitir|interdire|prohibir|Permiso|Verbos
allumer|encender|éteindre|apagar|Luz o aparato|Verbos
remplir|llenar|vider|vaciar|Contenido|Verbos
avancer|avanzar|reculer|retroceder|Movimiento|Verbos
attacher|atar|détacher|desatar|Unión|Verbos
réussir|tener éxito|échouer|fracasar|Resultado|Verbos`;
 const rest=other.split('\n').map(r=>{const [a,ae,b,be,theme,type]=r.split('|');return {id:`${type}-${a}-${b}`,type,a:{fr:a,es:ae},b:{fr:b,es:be},theme};});
 window.CONTRAIRES=[...adjectives,...rest];
 const definitions=[
 ['quand','Quand','Cuándo','Pregunta por el momento. No se confunde con combien de temps, que pregunta por duración.','Quand pars-tu ? — Demain.'],
 ['comment','Comment','Cómo','Pregunta por la manera, el estado o el nombre en comment tu t’appelles.','Comment vas-tu ? — Très bien.'],
 ['ou','Où','Dónde','Lleva acento. Où pregunta por un lugar; ou, sin acento, significa «o».','Où habites-tu ? — À Lyon.'],
 ['pourquoi','Pourquoi','Por qué','Pregunta por la causa o el motivo. La respuesta suele empezar por parce que.','Pourquoi ris-tu ? — Parce que c’est drôle.'],
 ['qui','Qui','Quién','Pregunta por personas. Puede funcionar como sujeto o complemento.','Qui parle ? — Léa.'],
 ['que','Que / qu’','Qué','Delante de una pregunta con inversión. Que se convierte en qu’ ante vocal: Qu’as-tu acheté ?','Que lis-tu ? — Un roman.'],
 ['questce','Qu’est-ce que / qu’est-ce qu’','Qué','Construcción seguida del sujeto y el verbo, sin inversión. Se elide ante vocal.','Qu’est-ce que tu lis ? — Un roman.'],
 ['quoi','Quoi','Qué, tras preposición','Se usa después de una preposición o en ciertas preguntas coloquiales. No sustituye a que en todas las posiciones.','De quoi parles-tu ? — Du voyage.'],
 ['combien','Combien','Cuánto / cuántos','Pregunta por una cantidad o un precio, sin sustantivo justo detrás.','Combien coûte ce livre ? — Dix euros.'],
 ['combien-de','Combien de / combien d’','Cuánto/a/os/as + sustantivo','De no cambia con el género ni el número; se elide ante vocal.','Combien de livres as-tu ? — Trois.'],
 ['quel','Quel / quelle / quels / quelles','Qué / cuál + sustantivo','Concuerda con el sustantivo: quel livre, quelle heure, quels jours, quelles langues.','Quelle langue apprends-tu ? — Le français.'],
 ['lequel','Lequel / laquelle / lesquels / lesquelles','Cuál / cuáles de varios','Sustituye a un sustantivo ya mencionado y concuerda con él.','Tu vois ces deux robes. Laquelle préfères-tu ?'],
 ['dou','D’où','De dónde','Pregunta por el origen o punto de partida.','D’où viens-tu ? — De Madrid.'],
 ['aqui','À qui','A quién / de quién','Pregunta por el destinatario; con appartenir, por el propietario.','À qui appartient ce sac ? — À Paul.'],
 ['depuis','Depuis quand','Desde cuándo','Pregunta por el comienzo de una situación que continúa.','Depuis quand habites-tu ici ? — Depuis 2020.'],
 ['duree','Combien de temps','Cuánto tiempo','Pregunta por una duración.','Combien de temps dure le film ? — Deux heures.']
 ];
 window.INTERROGATIFS=definitions.map(([id,fr,es,note,example])=>({id,fr,es,note,example}));
 const sentences=`quand|_____ pars-tu en vacances ?|Quand|¿Cuándo te vas de vacaciones?|Le mois prochain.
quand|_____ commence le cours ?|Quand|¿Cuándo empieza la clase?|Demain matin.
quand|_____ est ton anniversaire ?|Quand|¿Cuándo es tu cumpleaños?|Le 12 mai.
comment|_____ vas-tu ?|Comment|¿Cómo estás?|Très bien, merci.
comment|_____ prépare-t-on cette soupe ?|Comment|¿Cómo se prepara esta sopa?|On fait cuire les légumes.
comment|_____ t’appelles-tu ?|Comment|¿Cómo te llamas?|Je m’appelle Léa.
ou|_____ habites-tu ?|Où|¿Dónde vives?|À Lyon.
ou|_____ sont mes clés ?|Où|¿Dónde están mis llaves?|Sur la table.
ou|_____ travaille ta sœur ?|Où|¿Dónde trabaja tu hermana?|À la bibliothèque.
pourquoi|_____ es-tu en retard ?|Pourquoi|¿Por qué llegas tarde?|Parce que le bus est en retard.
pourquoi|_____ apprends-tu le français ?|Pourquoi|¿Por qué aprendes francés?|Pour voyager.
pourquoi|_____ la fenêtre est-elle ouverte ?|Pourquoi|¿Por qué está abierta la ventana?|Parce qu’il fait chaud.
qui|_____ parle français ici ?|Qui|¿Quién habla francés aquí?|Ma sœur.
qui|_____ a préparé le repas ?|Qui|¿Quién ha preparado la comida?|Mon père.
qui|_____ invites-tu ce soir ?|Qui|¿A quién invitas esta noche?|J’invite mes amis.
que|_____ lis-tu ?|Que|¿Qué lees?|Un roman.
que|_____ veux-tu manger ?|Que|¿Qué quieres comer?|Une salade.
que|_____as-tu acheté ?|Qu’|¿Qué has comprado?|Du pain.
questce|_____ tu fais ?|Qu’est-ce que|¿Qué haces?|Je cuisine.
questce|_____ vous cherchez ?|Qu’est-ce que|¿Qué buscáis?|La gare.
questce|_____elle prépare ?|Qu’est-ce qu’|¿Qué prepara ella?|Une soupe.
quoi|De _____ parles-tu ?|quoi|¿De qué hablas?|Du voyage.
quoi|Avec _____ écris-tu ?|quoi|¿Con qué escribes?|Avec un stylo.
quoi|À _____ penses-tu ?|quoi|¿En qué piensas?|À mes vacances.
combien|_____ coûte ce billet ?|Combien|¿Cuánto cuesta este billete?|Vingt euros.
combien|_____ faut-il payer ?|Combien|¿Cuánto hay que pagar?|Dix euros.
combien|Vous êtes _____ ?|combien|¿Cuántos sois?|Nous sommes quatre.
combien-de|_____ livres as-tu ?|Combien de|¿Cuántos libros tienes?|J’en ai trois.
combien-de|_____eau faut-il ?|Combien d’|¿Cuánta agua hace falta?|Un litre.
combien-de|_____ personnes viennent ?|Combien de|¿Cuántas personas vienen?|Six personnes.
quel|_____ livre préfères-tu ?|Quel|¿Qué libro prefieres?|Celui-ci.
quel|_____ heure est-il ?|Quelle|¿Qué hora es?|Il est huit heures.
quel|_____ jours travailles-tu ?|Quels|¿Qué días trabajas?|Le lundi et le mardi.
quel|_____ langues parles-tu ?|Quelles|¿Qué lenguas hablas?|Le français et l’espagnol.
lequel|Tu vois ces deux sacs. _____ choisis-tu ?|Lequel|Ves estos dos bolsos. ¿Cuál eliges?|Le sac bleu.
lequel|Tu vois ces deux robes. _____ préfères-tu ?|Laquelle|Ves estos dos vestidos. ¿Cuál prefieres?|La robe verte.
lequel|Parmi ces livres, _____ veux-tu lire ?|lesquels|De estos libros, ¿cuáles quieres leer?|Les deux premiers.
lequel|Parmi ces photos, _____ veux-tu garder ?|lesquelles|De estas fotos, ¿cuáles quieres guardar?|Les trois dernières.
dou|_____ viens-tu ?|D’où|¿De dónde vienes?|De Madrid.
dou|_____ part ce train ?|D’où|¿De dónde sale este tren?|De Paris.
dou|_____ vient ce fromage ?|D’où|¿De dónde viene este queso?|De Normandie.
aqui|_____ écris-tu ?|À qui|¿A quién escribes?|À ma mère.
aqui|_____ appartient ce vélo ?|À qui|¿De quién es esta bicicleta?|À mon frère.
aqui|_____ offres-tu ces fleurs ?|À qui|¿A quién regalas estas flores?|À mon amie.
depuis|_____ habites-tu ici ?|Depuis quand|¿Desde cuándo vives aquí?|Depuis 2020.
depuis|_____ travailles-tu dans cette école ?|Depuis quand|¿Desde cuándo trabajas en esta escuela?|Depuis septembre.
depuis|_____ connais-tu Léa ?|Depuis quand|¿Desde cuándo conoces a Léa?|Depuis notre enfance.
duree|_____ dure le film ?|Combien de temps|¿Cuánto tiempo dura la película?|Deux heures.
duree|_____ faut-il pour aller à la gare ?|Combien de temps|¿Cuánto tiempo hace falta para ir a la estación?|Dix minutes.
duree|Pendant _____ restes-tu à Paris ?|combien de temps|¿Durante cuánto tiempo te quedas en París?|Une semaine.`;
 window.QUESTIONS_FR=sentences.split('\n').map((r,i)=>{const [word,stem,answer,es,reply]=r.split('|');return {id:'question-'+(i+1),word,stem,answer,es,reply};});
})();
