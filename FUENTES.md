# Fuentes y licencias

Las formas simples y los participios proceden del archivo `dist/conjugations.json` del paquete **french-verbs-lefff, versión 3.3.0**, derivado de Lefff, de Benoît Sagot y colaboradores, empaquetado por RosaeNLG / Ludan Stoecklé.

- Paquete y documentación: https://app.unpkg.com/french-verbs-lefff@3.3.0/files/README.md
- Proyecto: https://github.com/RosaeNLG/rosaenlg
- Lefff (Lexique des Formes Fléchies du Français): http://pauillac.inria.fr/~sagot/index.html#lefff

La base lingüística derivada se distribuye bajo **LGPL-LR (Lesser General Public License for Linguistic Resources)**. El texto correspondiente del paquete está incluido íntegramente en `LICENCIA-LEFFF.txt`. Conserva esta atribución y la licencia al redistribuir los datos. `verbos.js` contiene únicamente las entradas seleccionadas y los tiempos utilizados, reorganizados junto con traducciones españolas redactadas para esta aplicación.

Se construyen en `conjugador.js` los tiempos compuestos a partir de las formas del auxiliar y el participio; el futuro próximo se construye con `aller` + infinitivo. Los datos de partida se pueden obtener del paquete indicado. No se consulta una API al usar la web.

El código original de interfaz (`index.html`, `styles.css`, `conjugador.js`, `app.js`) y las traducciones españolas pueden usarse y modificarse bajo licencia MIT: se permite usar, copiar, modificar y distribuir este código conservando este aviso. Se proporciona sin garantía. Esta autorización no sustituye la licencia LGPL-LR de las formas francesas.


## Ampliación A1–B2

Los 50 verbos nuevos utilizan el mismo recurso Lefff, con 350 entradas seleccionadas en total. Los niveles de verbos y vocabulario son etiquetas editoriales orientativas, no una lista oficial del MCER.

La selección de 2.500 entradas en `vocabulario.js`, sus traducciones españolas, géneros, variantes y notas se han redactado para este proyecto. Incluye lemas y unidades léxicas de uso cotidiano y de ampliación; no se ha copiado ni traducido automáticamente una lista externa. No constituye un diccionario exhaustivo ni una revisión lingüística profesional. Se aplica a este contenido original y a `vocabulario-app.js` la misma licencia MIT descrita arriba. La licencia LGPL-LR sigue aplicándose a las formas francesas de Lefff.
