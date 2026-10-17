/* Formas simples de Lefff; tiempos compuestos construidos con sus auxiliares.
   Sin dependencias, peticiones de red ni reglas que aproximen los irregulares. */
(() => {
  const tenses = {
    P: ['Présent · Presente', 'Acciones habituales o actuales: je parle.'],
    PC: ['Passé composé · Pasado compuesto', 'Auxiliar en presente + participio: j’ai parlé.'],
    I: ['Imparfait · Imperfecto', 'Hábitos, descripciones y acciones en curso en el pasado: je parlais.'],
    PQ: ['Plus-que-parfait · Pluscuamperfecto', 'Auxiliar en imperfecto + participio: j’avais parlé.'],
    FP: ['Futur proche · Futuro próximo', 'Aller en presente + infinitivo: je vais parler.'],
    F: ['Futur simple · Futuro simple', 'Acciones futuras: je parlerai.'],
    C: ['Conditionnel présent · Condicional', 'Deseos, hipótesis y peticiones corteses: je parlerais.'],
    S: ['Subjonctif présent · Subjuntivo', 'Se usa tras expresiones como il faut que: que je parle.'],
    Y: ['Impératif · Imperativo', 'Órdenes y consejos; normalmente sin pronombre: parle !']
  };
  const etre = new Set(['aller','venir','arriver','partir','rester','tomber','naître','mourir','devenir','revenir']);
  const dual = new Set(['entrer','rentrer','sortir','retourner','monter','descendre','passer']);
  const weather = new Set(['falloir','pleuvoir','neiger']);
  const valid = form => typeof form === 'string' && form !== 'NA' && form.length > 0;
  const getVerb = fr => window.VERBOS.find(v => v.fr === fr);
  function conjugate(verb, tense, selectedAux = 'être') {
    const aux = dual.has(verb.fr) ? selectedAux : etre.has(verb.fr) ? 'être' : 'avoir';
    return Array.from({length:6}, (_, i) => {
      // Para el uso meteorológico habitual, solo se enseña la 3.ª singular.
      if (weather.has(verb.fr) && i !== 2) return null;
      if (tense === 'PC' || tense === 'PQ') {
        if (!valid(verb.forms.P[i]) || !valid(verb.forms.K[0])) return null;
        const auxiliary = getVerb(aux).forms[tense === 'PC' ? 'P' : 'I'][i];
        let participle = verb.forms.K[0];
        if (aux === 'être') {
          const m = verb.forms.K[i < 3 ? 0 : 1];
          const f = verb.forms.K[i < 3 ? 2 : 3];
          participle = m === f ? m : `${m} / ${f}`;
        }
        return `${auxiliary} ${participle}`;
      }
      if (tense === 'FP') return valid(verb.forms.P[i]) ? `${getVerb('aller').forms.P[i]} ${verb.fr}` : null;
      const form = verb.forms[tense]?.[i];
      return valid(form) ? form : null;
    });
  }
  function person(i, form, tense, verb) {
    const labels = ['je','tu','il / elle / on','nous','vous','ils / elles'];
    if (weather.has(verb.fr)) return tense === 'S' ? 'qu’il' : 'il';
    if (tense === 'Y') return ['—','(tu)','—','(nous)','(vous)','—'][i];
    let label = labels[i];
    if (i === 0 && /^[aàâeéèêëiîïoôuùûühœæ]/i.test(form || '')) label = 'j’';
    if (tense === 'S') label = i === 2 || i === 5 ? `qu’${label}` : `que ${label}`;
    return label;
  }
  window.Conjugador = { tenses, conjugate, person, dual, etre };
})();
