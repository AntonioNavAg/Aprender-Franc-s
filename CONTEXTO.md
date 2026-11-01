# Practicar en contexto

Entra en **04 · Practicar en contexto**. Esta ampliación funciona sin IA, sin servidor y sin conexión: usa 48 estructuras redactadas con complementos compatibles y las conjugaciones del diccionario.

## Qué incluye esta primera colección

- **Completar escribiendo**, **elegir una opción** y **ordenar grupos de palabras**.
- Cuatro objetivos: conjugar, recuperar vocabulario, elegir artículos y concordar adjetivos.
- Presente, passé composé, futuro próximo e imperfecto en las estructuras verbales.
- 3.120 variantes de ejercicio antes de variar el formato, correspondientes a 93 elementos objetivo compatibles del diccionario. Son variantes de las plantillas, no 3.120 estructuras gramaticales distintas.
- Estructuras A1–A2. No se han añadido todavía transformación, negación, preguntas, conversación libre ni estructuras B1–B2 a esta sección.

La cobertura es explícita: no todos los 350 verbos ni las 2.500 entradas están incluidos en el generador. Se conservan completos en sus secciones anteriores. La selección manual muestra únicamente los elementos que tienen una estructura disponible.

## Tú eliges

Puedes combinar formato, gramática, tiempo verbal, nivel, uno o varios temas, duración de 5/10/20 ejercicios o práctica libre, pista en francés, sentido en español y exigencia de acentos.

El contenido puede ser todo lo compatible, tus favoritos, palabras marcadas como aprendidas o practicadas con acierto, pendientes o una selección manual. Este filtro se aplica al **elemento que debes responder**: el resto de la frase puede incluir palabras de apoyo.

Si tus filtros dejan cero ejercicios, aparece un aviso y se desactiva el inicio. Nunca se introducen otros contenidos silenciosamente. Cuando hay menos variantes que la duración elegida, se acorta la sesión. Los filtros se aplican al iniciar la sesión; puedes terminarla y volver a elegir cuando quieras.

En «Recomiéndame una sesión» se priorizan los elementos con errores y los que aún no has comprobado. La selección sigue respetando tus filtros. Es una recomendación sencilla basada en resultados, no un sistema de IA ni un programa completo de repetición espaciada.

## Ejemplos

- Conjugar: **Hier, nous _____ une pomme.** Se pide comprar, passé composé → **avons acheté**.
- Vocabulario: **Chaque jour, elle mange une _____.** Se pide plátano → **banane**.
- Artículos: **Il boit _____ eau.** Se pide partitivo → **de l’**.
- Concordancia: **Les bananes sont _____.** Se pide verde → **vertes**.
- Ordenar: **Hier, / nous / avons acheté / une pomme**. Se reconstruye la frase con grupos completos.

Las instrucciones identifican el verbo, el significado o la clase de artículo que se pretende practicar. No es una actividad de respuesta completamente libre: la corrección comprueba las respuestas previstas por la plantilla. La ayuda española muestra el sentido mediante pistas, no una traducción completa de cada oración.

En los ejercicios de ordenar se pide marcador temporal, si lo hay, seguido de sujeto, verbo y complemento. Los grupos se mueven pulsándolos; puedes devolverlos o empezar de nuevo. Este formato evita contar como error otras posiciones posibles de complementos que no se estén evaluando.

Tras responder se muestra la frase completa y la explicación. «Mostrar solución y repasar» cuenta como consulta, no como acierto. Cada ejercicio se puntúa una sola vez. En práctica libre se recorren las variantes sin repetir su identificador hasta iniciar una nueva vuelta; una misma frase puede evaluar objetivos diferentes.

## Evidencia de aprendizaje

El estado de comprobación es independiente de la casilla manual «Aprendida» y de las autoevaluaciones de flashcards:

- **Reconocida:** acertada en un test de infinitivos o vocabulario.
- **Recordada:** escrita correctamente en esos juegos sin opciones.
- **Utilizada:** resuelta dentro de una estructura en contexto.
- **Consolidada:** resuelta por escrito en contexto, con ortografía correcta y sin pista francesa, en **tres días distintos** desde el último fallo en contexto.
- **Por repasar:** el último intento registrado fue un fallo.

La práctica de artículos, los test y ordenar cuentan como uso guiado, pero no consolidan por sí solos. La consolidación tampoco se consigue repitiendo el mismo día. Es una señal orientativa de práctica, no una certificación de nivel ni una garantía de memoria a largo plazo.

Los estados aparecen en los catálogos cuando hay evidencia, y los elementos compatibles con esta colección se resumen en «Qué has comprobado». Los aciertos anteriores a esta versión no se convierten retroactivamente en evidencia individual: se conservan sus estadísticas y marcas originales.

## Archivos nuevos

- `contexto-datos.js`: plantillas, complementos, artículos y formas de concordancia revisadas.
- `contexto-motor.js`: filtros y construcción de los ejercicios.
- `contexto-app.js`: controles, sesiones, corrección y recomendación.
- `apprentissage.js`: registro independiente de evidencia en el navegador.

Se han actualizado también `index.html`, `styles.css`, `app.js` y `vocabulario-app.js`. Para instalar, reemplaza la carpeta de archivos completa y conserva la misma ubicación de apertura si quieres mantener el acceso al progreso del navegador.

## Verificación y alcance

Probadas las 3.120 variantes para comprobar que se pueden construir, que incluyen la respuesta prevista y que no contienen formas ausentes. Probados los tres formatos, filtros combinados, selección manual, favoritos incompatibles, no duplicación de puntuación, final de sesión, recomendación y consolidación por días distintos. También se han pasado las pruebas de los juegos anteriores y los recuentos del diccionario.

Estas comprobaciones son de datos y de lógica de interfaz mediante un DOM de prueba. La revisión visual en un navegador real sigue sin verificarse por la limitación de la vista local de la herramienta.
