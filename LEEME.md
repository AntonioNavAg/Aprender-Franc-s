# Atelier · Francés de A1 a B2

Versión con ejercicios en contexto: **350 verbos y 2.500 entradas de vocabulario**, distribuidas en **25 temas**. Funciona localmente, sin cuenta, backend ni conexión a Internet. La voz francesa depende de las voces instaladas en tu navegador o sistema.

La pestaña **04 · Practicar en contexto** añade completar, elegir y ordenar frases con filtros de contenido, ayudas, recomendación y comprobación del aprendizaje. Consulta `CONTEXTO.md` para el alcance de las 48 estructuras iniciales.

La pestaña **05 · Contrarios y preguntas** incorpora 100 parejas de contrarios y contrastes, una guía de 16 grupos interrogativos y 50 preguntas para completar. Consulta `CONTRARIOS-Y-PREGUNTAS.md`.

La pestaña **06 · Gramática** añade 48 fichas explicadas y 96 ejercicios, con búsqueda, filtros y práctica de una regla concreta. Consulta `GRAMATICA.md`.

La nueva sección inicial **00 · Empieza aquí** reúne el abecedario con audio y ejemplos, y los números con reglas, explorador y cuatro modalidades de ejercicios. Es la primera pestaña al entrar en francés en una nueva apertura. Consulta `EMPIEZA-AQUI.md`.

## Menú de idiomas

Al abrir la página aparece el selector de idiomas con banderas circulares. Francés está disponible; inglés, español, alemán, italiano y japonés aparecen bloqueados con «Próximamente». Pulsa «Cambiar idioma» o el logotipo para regresar al selector sin reiniciar la sesión. Cada nueva apertura muestra el selector. Las banderas son SVG locales y funcionan sin conexión.

El nuevo archivo `idiomas.js` controla esta entrada. Copia también `index.html` y `styles.css` actualizados, o reemplaza todos los archivos con el ZIP.

## Abrir en Visual Studio Code

1. Descomprime `frances-verbos.zip`.
2. En Visual Studio Code: **Archivo → Abrir carpeta → frances-verbos**.
3. Abre `index.html` en tu navegador con doble clic desde el explorador. Si ya usas Live Server, puedes elegir **Open with Live Server**.

No hay que instalar paquetes ni ejecutar comandos. Todos los archivos deben permanecer en la misma carpeta.

## Actualizar tu versión anterior

Copia los archivos de esta carpeta sobre los de tu carpeta anterior. Copia todos los archivos del ZIP, incluidos `contexto-datos.js`, `contexto-motor.js`, `contexto-app.js` y `apprentissage.js`. Guarda y recarga la página.

Los favoritos y el progreso de verbos conservan su formato de guardado anterior. Permanecen disponibles si utilizas el mismo navegador y la misma dirección o ubicación de apertura. Cambiar de carpeta, de puerto de Live Server o de abrir un archivo directamente a usar Live Server puede cambiar el almacenamiento que utiliza el navegador. El progreso de vocabulario se guarda por separado.

## Estructura exacta

```text
frances-verbos/
├── index.html          # Las tres secciones de la web
├── styles.css          # Diseño adaptable a ordenador y móvil
├── verbos.js           # 350 verbos, niveles y formas de conjugación
├── conjugador.js       # Nueve tiempos verbales
├── app.js              # Juegos y catálogo de verbos
├── vocabulario.js      # 2.500 entradas con traducción y gramática
├── vocabulario-app.js  # Temas, filtros, aprendizaje y juegos de palabras
├── contexto-datos.js    # Estructuras y combinaciones admitidas
├── contexto-motor.js    # Generador de ejercicios
├── contexto-app.js      # Interfaz de práctica en contexto
├── apprentissage.js     # Evidencia de aprendizaje
├── CONTEXTO.md          # Guía de los nuevos ejercicios
├── idiomas.js          # Menú inicial de selección de idioma
├── retos-datos.js       # Contrarios, interrogativos y preguntas
├── retos-app.js         # Juegos de contrarios e interrogativos
├── CONTRARIOS-Y-PREGUNTAS.md # Guía de la nueva sección
├── gramatica-datos.js   # Reglas, ejemplos y ejercicios
├── gramatica-app.js     # Guía y práctica de gramática
├── GRAMATICA.md         # Instrucciones de gramática
├── inicio-datos.js      # Abecedario y formación de números
├── inicio-app.js        # Audio y ejercicios de primeros pasos
├── EMPIEZA-AQUI.md      # Instrucciones de abecedario y números
├── LEEME.md            # Estas instrucciones
├── FUENTES.md          # Procedencia de datos, alcance y licencias
└── LICENCIA-LEFFF.txt   # Licencia de los datos de conjugación
```

Todo el código está completo: los archivos se pueden copiar y modificar directamente.

## Verbos

Se conservan los 300 anteriores y se añaden 50 para ampliar la expresión: reflexionar, argumentar, gestionar, convencer, negociar, deducir, etc. Todos tienen conjugaciones y nivel orientativo. Puedes practicar los 100 esenciales, los 350, un nivel concreto o tus favoritos.

Los tres juegos son flashcards, test con cuatro opciones y escritura del infinitivo. En escritura se puede exigir o flexibilizar el uso de acentos.

La sección **Conjugaciones** permite buscar en español o francés y filtrar por nivel. Los nueve tiempos son présent, passé composé, imparfait, plus-que-parfait, futur proche, futur simple, conditionnel présent, subjonctif présent e impératif.

Los verbos que admiten être o avoir según su construcción tienen un selector en los tiempos compuestos. Los participios con être muestran masculino y femenino. En `vous` se presenta el plural: al tratar de usted a una persona, usa el participio singular. Con avoir se muestra el participio sin concordancia; un objeto directo anterior puede exigirla en una frase completa.

## Vocabulario por temas

Pulsa **03 · Vocabulario por temas**. Puedes:

- Elegir un tema y combinarlo con nivel, tipo de palabra y búsqueda en español o francés.
- Consultar sustantivos con género, adjetivos con femenino cuando cambia, adverbios, números, pronombres, conjunciones, preposiciones y expresiones.
- Guardar favoritos y marcar palabras como aprendidas o pendientes.
- Practicar hasta **20 entradas de tu selección** en flashcards, test o escritura.
- Activar «Solo por aprender» para centrarte en las que todavía necesitas repasar.

Al acertar, la entrada se marca como aprendida. Un fallo vuelve a marcarla por aprender. En flashcards es una autoevaluación. También puedes cambiar esa marca manualmente en el catálogo. No se trata de un algoritmo de repetición espaciada.

En escritura se aceptan las formas masculinas y femeninas guardadas. Para sustantivos puedes escribir el lema sin artículo; se toleran los artículos básicos. Las respuestas alternativas se admiten cuando comparten una traducción explícita del diccionario: no es un corrector semántico libre.

Las sesiones usan una selección fija de hasta 20 entradas sin repetición. Los cambios de aprendizaje se aplican a los filtros al volver al catálogo. La paginación muestra 24 entradas por página.

Las 2.500 entradas son lemas o unidades léxicas distintas; algunas son palabras compuestas o expresiones, como `mot de passe` o `parce que`. Las variantes femeninas de un adjetivo se guardan en su misma entrada. Las notas aportan algunas acepciones adicionales sin aumentar el recuento.

## Progresión orientativa

Los niveles son una selección pedagógica orientativa, no una clasificación oficial del MCER. La colección refuerza A1–A2 e introduce vocabulario de B1–B2. Memorizar este diccionario por sí solo no certifica un nivel: también hacen falta comprensión, expresión, gramática y uso en contexto.

## Guardado local

El navegador guarda favoritos, respuestas y palabras aprendidas. No hay sincronización entre dispositivos. En modo privado o al borrar los datos del navegador, el progreso puede desaparecer. Si el almacenamiento está bloqueado, la web continúa funcionando durante la sesión.

## Modificar el contenido

- Cambia diseño y colores en `styles.css`.
- Cambia textos estáticos en `index.html`.
- En `verbos.js`, `fr` es el infinitivo, `es` la traducción, `level` el nivel orientativo y `core` indica el grupo esencial. Cada verbo necesita todas sus formas francesas para funcionar.
- En `vocabulario.js`, cada entrada tiene `id`, `fr`, `es`, `theme`, `type`, `gender` y `level`; algunas incluyen `feminine` y `note`.
- Géneros: `m`, `f`, `mf` (ambos), `mp` (masculino plural) o `fp` (femenino plural). Las otras categorías usan género vacío.
- Conserva el `id` de una entrada al corregir una traducción para mantener su favorito y aprendizaje.

## Verificación

Comprobados: 350 verbos únicos, 2.500 entradas únicas, 25 temas, estructura gramatical, nueve tiempos y nuevos irregulares. Probada la lógica de los juegos, navegación, filtros combinados, paginación, acentos, femeninos, favoritos vacíos, bloqueo de doble puntuación y conservación del progreso anterior mediante un DOM de prueba.

La revisión visual en un navegador real sigue pendiente: la infraestructura de vista local de la herramienta no estuvo disponible. No se afirma una revisión lingüística profesional de las 2.500 entradas.

## Distribución del vocabulario

A1: **508** · A2: **878** · B1: **890** · B2: **224**

| Tema | Entradas |
|---|---:|
| Familia y relaciones | 100 |
| Casa y objetos | 100 |
| Alimentación y cocina | 100 |
| Ropa y apariencia | 100 |
| Cuerpo y sentidos | 100 |
| Salud y bienestar | 100 |
| Emociones y personalidad | 100 |
| Compras y servicios | 100 |
| Ciudad y lugares | 100 |
| Transporte y circulación | 100 |
| Viajes y alojamiento | 100 |
| Educación y aprendizaje | 100 |
| Trabajo y profesiones | 100 |
| Dinero y economía | 100 |
| Tecnología e internet | 75 |
| Medios y comunicación | 100 |
| Naturaleza y paisaje | 100 |
| Animales y plantas | 100 |
| Medioambiente y clima | 100 |
| Política y sociedad | 75 |
| Justicia y seguridad | 75 |
| Ciencia y conocimiento | 75 |
| Arte y cultura | 100 |
| Deporte y ocio | 100 |
| Tiempo y palabras esenciales | 200 |

## Los 50 verbos añadidos

- **agir** (B1): actuar.
- **réfléchir** (A2): reflexionar.
- **analyser** (B1): analizar.
- **considérer** (B1): considerar.
- **supposer** (B1): suponer.
- **constater** (B1): constatar / comprobar un hecho.
- **évoquer** (B2): mencionar / evocar.
- **souligner** (B1): subrayar / destacar.
- **préciser** (B1): precisar / aclarar.
- **convaincre** (B1): convencer.
- **persuader** (B2): persuadir.
- **débattre** (B2): debatir.
- **négocier** (B2): negociar.
- **revendiquer** (B2): reivindicar.
- **défendre** (B1): defender.
- **contester** (B2): cuestionar / impugnar.
- **approuver** (B1): aprobar una idea.
- **critiquer** (B1): criticar.
- **justifier** (B1): justificar.
- **démontrer** (B2): demostrar con razonamientos.
- **prouver** (B1): probar / demostrar un hecho.
- **évaluer** (B2): evaluar.
- **estimer** (B1): estimar / calcular aproximadamente.
- **contribuer** (B2): contribuir.
- **favoriser** (B2): favorecer.
- **renforcer** (B2): reforzar.
- **maintenir** (B1): mantener / conservar en un estado.
- **établir** (B2): establecer.
- **fournir** (B1): proporcionar.
- **acquérir** (B2): adquirir.
- **investir** (B2): invertir.
- **financer** (B2): financiar.
- **gérer** (B1): gestionar.
- **embaucher** (B1): contratar a un trabajador.
- **licencier** (B2): despedir a un trabajador.
- **démissionner** (B1): dimitir.
- **collaborer** (B1): colaborar.
- **entreprendre** (B2): emprender.
- **réaliser** (B1): realizar / llevar a cabo.
- **effectuer** (B1): efectuar.
- **accomplir** (B2): cumplir / llevar a término.
- **adapter** (B1): adaptar.
- **bénéficier** (B2): beneficiarse.
- **subir** (B2): sufrir / verse sometido a.
- **surmonter** (B2): superar un obstáculo.
- **parvenir** (B2): conseguir / llegar a.
- **intervenir** (B2): intervenir.
- **conclure** (B1): concluir.
- **déduire** (B2): deducir.
- **transmettre** (B1): transmitir.
