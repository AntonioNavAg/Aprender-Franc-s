# Empieza aquí: abecedario y números

Después de elegir francés, la primera sección de una nueva apertura es **00 · Empieza aquí**. Puedes pasar libremente a cualquiera de las otras secciones. Si vuelves al menú de idiomas durante una sesión y entras de nuevo, se conserva la sección que estabas utilizando.

## Abecedario

Incluye las **26 letras**, su nombre francés, una transcripción fonética orientativa entre barras y una palabra de ejemplo con traducción.

- Pulsa la letra para oír su nombre en la frase «La lettre A», por ejemplo.
- Pulsa la palabra para escuchar cómo se pronuncia en francés.
- Elige una voz francesa y una velocidad lenta, de aprendizaje o natural.
- Practica con un ejercicio de **escuchar y elegir**, en sesiones de 10 letras distintas.

Las opciones del ejercicio se activan cuando el navegador comunica que la reproducción ha comenzado. Puedes volver a escuchar. Ver la solución cuenta como repaso, no como acierto. Los nombres de las letras no equivalen a todos sus sonidos dentro de las palabras: C se llama cé, pero suena distinto en café y cinéma.

Los acentos y signos modifican letras existentes; no son nuevas letras del abecedario. Esta introducción no sustituye una guía completa de fonética, enlaces o pronunciación de combinaciones como ou, oi y eau.

## Audio

El sonido usa **síntesis de voz del navegador o sistema**, no una API propia, grabaciones incluidas ni IA generativa. Se solicitan voces francesas y se pueden elegir las que el navegador expone.

La disponibilidad, calidad y funcionamiento sin conexión dependen de tu equipo. Si no suena, comprueba el volumen, cambia de voz o instala una voz francesa en el sistema. Algunas voces pueden necesitar conexión. La página muestra errores de reproducción; los ejercicios de números que no usan audio siguen disponibles.

Si el navegador no ofrece síntesis de voz, el ejercicio de escuchar letras se desactiva y no se permite iniciar el dictado de números. No se pide acceso al micrófono ni se graba al usuario.

## Números

Se trabajan **cardinales aislados del francés de Francia**, desde **0 hasta 999 999**.

El explorador permite introducir un número, consultar su escritura y escucharlo. Las tablas incluyen 0–20, ejemplos de decenas, todos los números 70–99 y ejemplos de centenas y millares.

Las reglas explican:

- 0–16: formas que hay que memorizar.
- 17–19: dix-sept, dix-huit, dix-neuf.
- 20–69 y el uso de et con 1: vingt et un, trente et un.
- 70–79: soixante-dix, soixante et onze…
- 80–99: quatre-vingts, quatre-vingt-un, quatre-vingt-dix…
- Cent y su plural: deux cents, pero deux cent un.
- Mille invariable: deux mille, quatre-vingt mille, deux cent mille.
- Guiones tradicionales y grafía rectificada de 1990.
- Variantes regionales, que se explican pero no son las respuestas de estos ejercicios.

No se trabajan todavía ordinales, fechas, horas, decimales ni millones. El número aislado se escribe un; delante de un sustantivo femenino puede aparecer une.

## Cuatro ejercicios

1. **Elegir cómo se escribe:** aparece una cifra y cuatro opciones francesas.
2. **Escribir en francés:** aparecen cifras y escribes sus palabras.
3. **Leer en francés y escribir cifras.**
4. **Escuchar y escribir cifras:** el número escrito no se muestra hasta corregir.

Elige el rango, sesiones de 10 o 20 ejercicios o práctica libre, y si se exigen acentos. Las sesiones no repiten números hasta agotar el rango. Al terminar una vuelta de práctica libre empieza otra.

En escritura se aceptan espacios y guiones tradicionales o rectificados, pero se comprueban las palabras, et y las s: `deux-cent-un` es válido; `deux cents un` no lo es para 201. En cifras puedes usar espacios entre grupos; no uses puntos ni comas. No se aceptan decimales ni notación científica.

El progreso de letras y números se guarda por separado del resto de la web. Los aciertos repetidos no se contabilizan dos veces en una misma pregunta. Las respuestas vacías y los intentos de dictado antes de reproducir el audio no puntúan.

## Instalar y verificar

Copia todos los archivos del ZIP en la carpeta anterior. Los archivos nuevos son `inicio-datos.js` e `inicio-app.js`; también cambian `index.html`, `app.js` y `styles.css`.

Se han probado las 26 letras, la apertura inicial, las solicitudes de voz francesa y sus eventos con un simulador, las cuatro modalidades numéricas y el guardado independiente. Se han comprobado 10.000 conversiones distintas y casos específicos hasta 999 999, incluidas las terminaciones de cent, vingt y mille. También han pasado las pruebas de las secciones anteriores.

Las pruebas de audio verifican la integración y los eventos, no la salida sonora real. La revisión visual y la reproducción real en navegador siguen pendientes por la limitación de la vista local de la herramienta.
