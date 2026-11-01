/* 48 estructuras guiadas; los complementos se redactan completos para controlar
   artículos, preposiciones, sentido y traducción. No se mezcla vocabulario libre. */
(() => {
 const actions=[
 ['acheter','Alimentación','pomme|une pomme|una manzana; pain|du pain|pan'],
 ['manger','Alimentación','banane|une banane|un plátano; soupe|de la soupe|sopa'],
 ['boire','Alimentación','eau|de l’eau|agua; café|du café|café'],
 ['préparer','Alimentación','repas|le repas|la comida; soupe|de la soupe|sopa'],
 ['cuisiner','Alimentación','riz|du riz|arroz; poisson|du poisson|pescado'],
 ['couper','Alimentación','pain|le pain|el pan; tomate|la tomate|el tomate'],
 ['chercher','Casa','clé|la clé|la llave; manteau|le manteau|el abrigo'],
 ['trouver','Casa','clé|la clé|la llave; stylo|le stylo|el bolígrafo'],
 ['ouvrir','Casa','porte|la porte|la puerta; fenêtre|la fenêtre|la ventana'],
 ['fermer','Casa','porte|la porte|la puerta; fenêtre|la fenêtre|la ventana'],
 ['nettoyer','Casa','cuisine|la cuisine|la cocina; chambre|la chambre|la habitación'],
 ['ranger','Casa','chambre|la chambre|la habitación; cuisine|la cuisine|la cocina'],
 ['porter','Ropa','manteau|un manteau|un abrigo; veste|une veste|una chaqueta'],
 ['mettre','Ropa','chemise|une chemise|una camisa; manteau|un manteau|un abrigo'],
 ['choisir','Ropa','robe|une robe|un vestido; chemise|une chemise|una camisa'],
 ['lire','Estudios y ocio','journal|le journal|el periódico; manuel|le manuel|el libro de texto'],
 ['écrire','Estudios y ocio','message|un message|un mensaje; courriel|un courriel|un correo electrónico'],
 ['écouter','Estudios y ocio','musique|de la musique|música; radio|la radio|la radio'],
 ['regarder','Estudios y ocio','film|un film|una película; tableau|le tableau|la pizarra'],
 ['visiter','Viajes','musée|un musée|un museo; château|un château|un castillo'],
 ['réserver','Viajes','chambre|une chambre|una habitación; billet|un billet|un billete'],
 ['prendre','Viajes','train|le train|el tren; bus|le bus|el autobús'],
 ['attendre','Viajes','train|le train|el tren; bus|le bus|el autobús'],
 ['conduire','Viajes','voiture|une voiture|un coche; camion|un camion|un camión'],
 ['réparer','Tecnología','vélo|le vélo|la bicicleta; ordinateur|l’ordinateur|el ordenador'],
 ['utiliser','Tecnología','ordinateur|un ordinateur|un ordenador; tablette|une tablette|una tableta'],
 ['envoyer','Comunicación','message|un message|un mensaje; colis|un colis|un paquete'],
 ['recevoir','Comunicación','colis|un colis|un paquete; message|un message|un mensaje'],
 ['offrir','Relaciones','fleur|une fleur|una flor; bijou|un bijou|una joya'],
 ['dessiner','Estudios y ocio','maison|une maison|una casa; arbre|un arbre|un árbol'],
 ['montrer','Estudios y ocio','dessin|le dessin|el dibujo; tableau|le tableau|la pizarra'],
 ['apprendre','Estudios y ocio','cours|le cours|el contenido de la clase; leçon|la leçon|la lección']
 ].map(([verb,theme,list],i)=>({id:`action-${i+1}`,kind:'action',verb,theme,level:'A1',items:list.split(';').map(s=>{const [id,phrase,es]=s.trim().split('|');return {id,phrase,es};})}));
 const articles=[
 ['Voici','indef','Casa','maison|maison|f;appartement|appartement|m'],
 ['Je porte','indef','Ropa','robe|robe|f;manteau|manteau|m'],
 ['Tu regardes','def','Estudios y ocio','tableau|tableau|m;porte|porte|f'],
 ['Elle cherche','def','Casa','clé|clé|f;ordinateur|ordinateur|m'],
 ['Nous achetons','plural','Alimentación','pomme|pommes|f;banane|bananes|f'],
 ['Vous préparez','partitive','Alimentación','soupe|soupe|f;riz|riz|m'],
 ['Il boit','partitive','Alimentación','eau|eau|f;café|café|m'],
 ['Il y a','indef','Viajes','hôtel|hôtel|m;gare|gare|f']
 ].map(([before,rule,theme,list],i)=>({id:`article-${i+1}`,kind:'article',before,rule,theme,level:rule==='partitive'?'A2':'A1',items:list.split(';').map(s=>{const [id,noun,gender]=s.split('|');return {id,noun,gender};})}));
 const adjectives=[
 ['Alimentación','pomme|La pomme|f|s;banane|Les bananes|f|p','vert|verte|verts|vertes;bon|bonne|bons|bonnes'],
 ['Alimentación','soupe|La soupe|f|s;café|Les cafés|m|p','chaud|chaude|chauds|chaudes;froid|froide|froids|froides'],
 ['Casa','chambre|La chambre|f|s;appartement|Les appartements|m|p','propre|propre|propres|propres;sale|sale|sales|sales'],
 ['Ropa','robe|La robe|f|s;manteau|Les manteaux|m|p','rouge|rouge|rouges|rouges;vert|verte|verts|vertes'],
 ['Casa','maison|Les maisons|f|p;appartement|L’appartement|m|s','grand|grande|grands|grandes;petit|petite|petits|petites'],
 ['Viajes','voiture|La voiture|f|s;camion|Les camions|m|p','rouge|rouge|rouges|rouges;propre|propre|propres|propres'],
 ['Tecnología','ordinateur|Les ordinateurs|m|p;tablette|La tablette|f|s','neuf|neuve|neufs|neuves;petit|petite|petits|petites'],
 ['Estudios y ocio','film|Le film|m|s;leçon|Les leçons|f|p','amusant|amusante|amusants|amusantes;ennuyeux|ennuyeuse|ennuyeux|ennuyeuses']
 ].map(([theme,list,adjs],i)=>({id:`agreement-${i+1}`,kind:'agreement',theme,level:'A2',items:list.split(';').map(s=>{const [id,noun,gender,number]=s.split('|');return {id,noun,gender,number};}),adjectives:adjs.split(';').map(s=>{const [id,f,mp,fp]=s.split('|');return {id,forms:[id,f,mp,fp]};})}));
 // 'neuf' pertenece al numeral en el catálogo; usamos un adjetivo inequívoco.
 adjectives[6].adjectives[0]={id:'réparable',forms:['réparable','réparable','réparables','réparables']};
 window.CONTEXTE_TEMPLATES=[...actions,...articles,...adjectives];
})();

