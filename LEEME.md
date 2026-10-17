# Atelier: web local de verbos franceses

## Cómo abrirla en Visual Studio Code

1. Descomprime `frances-verbos.zip`.
2. En Visual Studio Code, ve a **Archivo → Abrir carpeta** y selecciona `frances-verbos`.
3. Abre `index.html` en tu navegador desde el explorador de archivos: doble clic. No necesitas instalar nada, ejecutar comandos ni tener conexión a Internet.
4. Si ya utilizas la extensión **Live Server** de Visual Studio Code, también puedes hacer clic derecho en `index.html` y elegir **Open with Live Server**. Es opcional.

Mantén todos los archivos en la misma carpeta. Si haces cambios, guarda con Ctrl+S y recarga el navegador. El archivo `index.html` es la entrada de la web.

## Estructura exacta y código completo

```text
frances-verbos/
├── index.html            # Estructura de la página
├── styles.css            # Diseño y adaptación al móvil
├── verbos.js             # Los 300 verbos y sus formas francesas
├── conjugador.js         # Selección de tiempos y tiempos compuestos
├── app.js                # Juegos, búsqueda, favoritos y progreso
├── LEEME.md              # Estas instrucciones
├── FUENTES.md            # Procedencia de los datos y alcance
└── LICENCIA-LEFFF.txt     # Licencia de los datos lingüísticos
```

Los cinco archivos de código contienen su contenido completo, sin fragmentos omitidos ni marcadores pendientes. Puedes copiarlos directamente. Si prefieres crear la carpeta tú mismo, crea exactamente esos cinco nombres y copia en cada uno todo el contenido del archivo correspondiente. Conserva también la fuente y licencia al distribuir la web.

## Qué incluye

- **Flashcards:** aparece el significado español; pulsa «Ver respuesta» y marca «Lo sabía» o «Repasar».
- **Test:** elige entre cuatro infinitivos franceses. Se muestra la opción correcta tras responder.
- **Escritura:** escribe el infinitivo francés, pulsa Enter o «Comprobar». Hay botones para insertar acentos. La opción «Exigir acentos» está activada por defecto; desactívala para practicar sin penalizarlos.
- **Catálogo:** 300 verbos únicos; busca en español o francés, incluso sin acentos.
- **Conjugaciones:** pulsa un verbo y selecciona presente, passé composé, imperfecto, pluscuamperfecto, futuro próximo, futuro simple, condicional, subjuntivo o imperativo.
- **Favoritos:** pulsa la estrella y selecciona «Mis favoritos» para practicar solo esos verbos.
- **Sesiones:** 100 verbos esenciales o el catálogo completo. Los verbos se barajan y se recorren una vez por vuelta; después empieza otra vuelta.
- **Progreso:** número de respuestas acertadas y total. En flashcards, el resultado depende de tu autoevaluación.
- **Pronunciación:** utiliza la voz francesa disponible en tu navegador/sistema. La disponibilidad y el funcionamiento sin conexión de la voz dependen de tu equipo.

## Detalles para estudiar correctamente

La selección es de uso general y orientativa para A2–B1; no constituye una lista oficial del MCER. Algunos verbos son básicos y otros amplían vocabulario. Las traducciones son pistas de estudio, no todas las acepciones posibles.

Los juegos practican **infinitivos**, no formas conjugadas. La consulta de conjugaciones es una sección separada. En escritura se admiten otros infinitivos del catálogo cuando comparten exactamente alguna de las traducciones de la tarjeta. No es un corrector semántico libre.

Se muestran formas afirmativas. Para los verbos de movimiento que admiten dos auxiliares, los tiempos compuestos incluyen un selector de uso. Por ejemplo, `je suis sorti` y `j’ai sorti le livre`. El auxiliar depende de la construcción y no de una elección arbitraria.

Con `être`, se muestran participios masculinos y femeninos. Con `vous`, se muestra la concordancia plural; al dirigirte de usted a una persona, usa el participio singular. Con `avoir`, no se aplica automáticamente la concordancia con un objeto directo anterior porque aquí no se construyen frases completas.

`Falloir`, `pleuvoir` y `neiger` se enseñan en su uso impersonal habitual con `il`. El imperativo no existe para todos los verbos. El diccionario puede mostrar una variante válida de una conjugación sin incluir todas las variantes ortográficas admitidas.

## Guardado y conexión

La aplicación no usa backend, cuentas, API, bibliotecas externas, fuentes remotas ni servicios de pago. Los datos están dentro de `verbos.js`, cargado como script local; por eso puede abrirse mediante doble clic sin los problemas habituales de cargar JSON con `fetch`.

Favoritos y progreso se guardan en el almacenamiento local del navegador. No se sincronizan entre equipos. En modo privado, al borrar los datos del navegador o si el almacenamiento está bloqueado, pueden desaparecer. Si cambias de abrir el archivo por doble clic a Live Server, el navegador puede tratarlo como un almacenamiento distinto.

## Cómo modificarla

- Colores y tamaños: `styles.css`, empezando por las variables de `:root`.
- Títulos y textos estáticos: `index.html`.
- Traducciones: propiedad `es` del verbo en `verbos.js`.
- Verbos del grupo esencial: propiedad `core` en `verbos.js`.
- Juegos y validación: `app.js`.
- Tiempos y notas gramaticales: `conjugador.js` y `renderDetail` en `app.js`.

No añadas un verbo únicamente con su traducción: necesita también sus formas francesas. Esto evita presentar conjugaciones inventadas para verbos irregulares.

## Verificación realizada

Se ha comprobado la sintaxis de JavaScript, que hay 300 verbos únicos y 100 esenciales, la construcción de los nueve tiempos, las formas no disponibles y casos representativos como `faire`, `aller`, `prendre`, `manger`, `commencer` y `sortir` con ambos auxiliares. También se ha probado la lógica de los tres juegos, respuestas vacías, bloqueo de doble puntuación, búsquedas, favoritos y selector de auxiliar mediante un DOM de prueba. No se ha podido completar la revisión visual en el navegador de la herramienta porque no conectó con la vista local.
