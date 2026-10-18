import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'gramatica',
  subject: 'espagnol',
  order: 5,
  title: 'Grammaire essentielle',
  theme: 'Gramática',
  summary: 'Ser et estar, hay et gustar, présent et prétérits, subjonctif, impératif, pronoms, por et para : les structures indispensables du cycle terminal.',
  duration: '4 semaines',
  objectives: [
    'Distinguer ser et estar, et employer hay, gustar et les verbes du même type',
    'Conjuguer les verbes réguliers et irréguliers au présent, au prétérit, à l’imparfait, au futur et au conditionnel',
    'Choisir entre pretérito indefinido et imperfecto, et employer le pretérito perfecto compuesto',
    'Former et employer le subjonctif présent et imparfait, dans le respect de la concordance des temps',
    'Construire l’impératif affirmatif et négatif, et placer correctement les pronoms (enclise)',
    'Traduire on, il faut, devenir, et choisir entre por et para',
    'Appliquer les règles d’accentuation écrite',
  ],
  keywords: ['ser', 'estar', 'hay', 'gustar', 'indefinido', 'imperfecto', 'subjuntivo', 'imperativo', 'pronombres', 'por', 'para', 'acentuación'],
  fiche: [
    { type: 'h2', text: 'Ser ou estar ?' },
    {
      type: 'table',
      headers: ['Emploi', 'Exemple', 'Verbe'],
      rows: [
        ['Identité, origine, profession', 'Soy de Lyon. Soy profesora.', '**ser**'],
        ['Caractéristique durable', 'El cielo es azul.', '**ser**'],
        ['Heure, date, jour', 'Son las cinco. Hoy es lunes.', '**ser**'],
        ['Lieu d’un événement', 'La boda es en la iglesia.', '**ser**'],
        ['Localisation', 'Madrid está en España.', '**estar**'],
        ['État, sentiment, état transitoire', 'Estoy cansado.', '**estar**'],
        ['Résultat d’une action', 'La puerta está cerrada.', '**estar**'],
        ['Gérondif (action en cours)', 'Estoy leyendo.', '**estar**'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Même adjectif, sens différent',
      content: [
        { type: 'p', text: '**Es listo** : il est intelligent. **Está listo** : il est prêt.\n**Es aburrido** : il est ennuyeux. **Está aburrido** : il s’ennuie.\n**Es malo** : il est méchant. **Está malo** : il est malade.' },
      ],
    },
    { type: 'h2', text: 'Hay, gustar, présent' },
    {
      type: 'list',
      items: [
        '**Hay** = il y a (invariable). Hay tres libros. Passé : **había** (imparfait), **hubo** (indéfini). Futur : **habrá**.',
        '**Hay que + infinitif** = il faut. Hay que estudiar.',
        '**Me gusta el cine / Me gustan los libros** : le sujet grammatical est ce qui plaît ; le verbe s’accorde avec lui.',
        '**Présent** : diphtongues e→ie (pienso, quiero, empiezo), o→ue (puedo, duermo), e→i (pido) ; yo irréguliers (tengo, salgo, conozco, sé).',
      ],
    },
    { type: 'h2', text: 'Passés et futur' },
    {
      type: 'list',
      items: [
        '**Indéfini** : action ponctuelle achevée. Ayer llegué tarde.',
        '**Imparfait** : habitude, description, action de fond. Cuando era niño, vivía en el campo.',
        '**Cuando llegué, llovía** : l’arrivée est un événement ponctuel (indéfini), la pluie est un décor (imparfait).',
        '**Pretérito perfecto** : he hablado, has comido… ; action reliée au présent (hoy, nunca, ya, todavía no).',
        '**Futur** : radical + -é, -ás, -á, -emos, -éis, -án. **Conditionnel** : radical + -ía, -ías, -ía, -íamos, -íais, -ían.',
      ],
    },
    { type: 'h2', text: 'Subjonctif' },
    {
      type: 'list',
      items: [
        '**Présent** : partir de yo (hablo → hable, como → coma, vivo → viva) et changer de voyelle : -ar → -e, -er/-ir → -a.',
        '**Imparfait** : 3e pl. du prétérit sans -ron + -ra (ou -se) : hablaron → hablara, tuvieron → tuviera.',
        '**Emplois** : souhait, ordre (Quiero que vengas), obligation (Es necesario que estudies), doute (Dudo que sea vrai), émotion (Me alegro de que estés aquí), ojalá, cuando + futur (Cuando llegues, llámame).',
        '**Concordance** : principale au présent/futur/impératif → subjonctif présent ; principale au passé (indéfini, imparfait, conditionnel) → subjonctif imparfait.',
      ],
    },
    { type: 'h2', text: 'Impératif et pronoms' },
    {
      type: 'list',
      items: [
        '**tú affirmatif** : habla, come, vive. Irréguliers : di, haz, pon, sal, ven, ten, ve, sé.',
        '**tú négatif** = subjonctif présent : no hables, no comas. **usted** = subjonctif présent (hable).',
        '**Pronoms** : indirect avant direct (me lo, se lo). Enclise à l’impératif affirmatif : Dímelo ! Négatif : No me lo digas.',
      ],
    },
    { type: 'h2', text: 'Por, para, accents' },
    {
      type: 'list',
      items: [
        '**Por** : cause (por la lluvia), moyen (por avión), durée (por dos horas), prix (pagué cinco euros por el libro).',
        '**Para** : destination (para ti), but (estudio para aprobar), délai (para mañana), opinion (para mí, es fácil).',
        '**Accents** : aguda finissant par voyelle, -n ou -s (canción) ; llana finissant par consonne autre que -n ou -s (lápiz) ; esdrújula toujours accentuée (música).',
        '**Accent diacritique** : él / el, tú / tu, sí / si, sé / se, más / mas, té / te.',
      ],
    },
    { type: 'divider' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Choisir le verbe : « Mi hermano ___ médico. »',
          choices: ['está', 'es', 'hay', 'tiene'],
          answer: 1,
          explanation: 'La profession est une caractéristique : on emploie ser.',
        },
        {
          question: '« Cuando ___ a casa, te llamo. »',
          choices: ['llego', 'llegaré', 'llegue', 'llegué'],
          answer: 2,
          explanation: 'Après cuando qui renvoie au futur, on emploie le subjonctif présent : llegue.',
        },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Ser et estar' },
    {
      type: 'p',
      text: 'En espagnol, il existe deux verbes pour dire « être ». Le choix dépend de ce qu’on exprime : une **essence** (ser) ou un **état / une localisation** (estar).',
    },
    {
      type: 'table',
      headers: ['Emploi', 'Exemple', 'Verbe'],
      rows: [
        ['Identité, nom, nationalité', 'Soy Ana. Soy francesa.', '**ser**'],
        ['Origine', 'Somos de Bogotá.', '**ser**'],
        ['Profession, matière', 'Es ingeniero. La mesa es de madera.', '**ser**'],
        ['Caractéristique permanente ou durable', 'El mar es profundo. Ella es alta.', '**ser**'],
        ['Heure, date, jour, saison', 'Son las dos. Hoy es martes. Es invierno.', '**ser**'],
        ['Possession', 'Este coche es de mi padre.', '**ser**'],
        ['Lieu d’un événement (fête, concert, réunion)', 'La fiesta es en mi casa.', '**ser**'],
        ['Localisation (ville, objet, personne)', 'Barcelona está en Cataluña. La llave está en el bolso.', '**estar**'],
        ['État physique ou émotionnel', 'Estoy triste. Estás muy guapo.', '**estar**'],
        ['Résultat d’une action', 'La ventana está abierta.', '**estar**'],
        ['Action en cours (estar + gérondif)', 'Estamos estudiando.', '**estar**'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Adjectifs qui changent de sens',
      content: [
        {
          type: 'table',
          headers: ['Adjectif', 'avec ser', 'avec estar'],
          rows: [
            ['listo', 'intelligent (Es muy listo.)', 'prêt (Ya estamos listos.)'],
            ['aburrido', 'ennuyeux (La clase es aburrida.)', 'ennuyé (Estoy aburrido.)'],
            ['malo', 'méchant, mauvais (Es malo.)', 'malade, de mauvaise qualité (Estoy malo ; La carne está mala.)'],
            ['bueno', 'bon, gentil (Es buena persona.)', 'bon au goût, en bonne santé (La sopa está buena.)'],
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Test rapide',
      content: [
        {
          type: 'p',
          text: 'Demandez-vous : **est-ce que ça change ?** Si oui (humeur, lieu, résultat), c’est **estar**. Si c’est une définition, une identité ou un fait stable, c’est **ser**.',
        },
      ],
    },
    { type: 'h2', text: '2. Hay, il y a' },
    {
      type: 'list',
      items: [
        '**Hay** est impersonnel et invariable : **hay** un libro, **hay** muchos libros (jamais *están*).',
        '**Hay que + infinitif** traduit « il faut » : Hay que respetar las reglas.',
        'Passé : **había** (imparfait, description) ; **hubo** (indéfini, fait ponctuel) ; futur : **habrá**.',
        'Attention : **hay** ≠ **está** : Hay un banco cerca (il y a une banque). El banco está cerca (la banque est proche).',
      ],
    },
    { type: 'h2', text: '3. Gustar et les verbes du même type' },
    {
      type: 'p',
      text: 'Avec **gustar**, la construction est inversée : on part de ce qui plaît à quelqu’un. Le pronom indirect désigne la personne concernée, et le sujet grammatical est la chose ou la personne qui plaît.',
    },
    {
      type: 'table',
      headers: ['Pronom indirect', 'Exemple'],
      rows: [
        ['me (à moi)', 'Me gusta el té. / Me gustan los gatos.'],
        ['te (à toi)', 'Te gusta bailar ? / Te gustan las matemáticas.'],
        ['le (à lui, elle, vous)', 'Le gusta viajar. / Le interesan las ciencias.'],
        ['nos (à nous)', 'Nos encantan las vacaciones.'],
        ['os (à vous, vosotros)', '¿Os molesta el ruido?'],
        ['les (à eux, elles, vous)', 'Les duele la cabeza.'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Préciser ou insister',
      content: [
        {
          type: 'p',
          text: 'On ajoute **a + pronom tonique** pour préciser : **A mí me gusta** el cine. **A ella le gusta** el teatro. Le pronom « le » reste obligatoire même avec le nom.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Verbes construits de la même façon : **encantar**, **interesar**, **molestar**, **doler**, **faltar**, **importar**, **parecer**, **preocupar**.',
    },
    { type: 'h2', text: '4. Le présent de l’indicatif' },
    { type: 'h3', text: '4.1 Formes régulières' },
    {
      type: 'table',
      headers: ['Personne', 'hablar', 'comer', 'vivir'],
      rows: [
        ['yo', 'hablo', 'como', 'vivo'],
        ['tú', 'hablas', 'comes', 'vives'],
        ['él / ella / usted', 'habla', 'come', 'vive'],
        ['nosotros / -as', 'hablamos', 'comemos', 'vivimos'],
        ['vosotros / -as', 'habláis', 'coméis', 'vivís'],
        ['ellos / ellas / ustedes', 'hablan', 'comen', 'viven'],
      ],
    },
    { type: 'h3', text: '4.2 Verbes irréguliers' },
    {
      type: 'table',
      headers: ['Verbe', 'yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos'],
      rows: [
        ['ser', 'soy', 'eres', 'es', 'somos', 'sois', 'son'],
        ['estar', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
        ['ir', 'voy', 'vas', 'va', 'vamos', 'vais', 'van'],
        ['tener', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
        ['hacer', 'hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
        ['decir (e→i)', 'digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
        ['poder (o→ue)', 'puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
        ['querer (e→ie)', 'quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
        ['pensar (e→ie)', 'pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan'],
        ['dormir (o→ue)', 'duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'],
        ['pedir (e→i)', 'pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
        ['venir', 'vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
        ['salir', 'salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
        ['saber', 'sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Les changements de radical',
      content: [
        {
          type: 'p',
          text: 'Les verbes e→ie, o→ue et e→i changent la voyelle du radical **sauf** avec **nosotros** et **vosotros**. Exemple : **pensamos** (et non *piensamos*), **podéis** (et non *puedéis*).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Autres verbes irréguliers à la 1re personne seulement (yo) : **conocer** (conozco), **traer** (traigo), **oír** (oigo), **poner** (pongo), **ver** (veo), **dar** (doy).',
    },
    { type: 'h2', text: '5. Le prétérit (pretérito indefinido)' },
    { type: 'h3', text: '5.1 Formes régulières' },
    {
      type: 'table',
      headers: ['Personne', 'hablar', 'comer', 'vivir'],
      rows: [
        ['yo', 'hablé', 'comí', 'viví'],
        ['tú', 'hablaste', 'comiste', 'viviste'],
        ['él / ella / usted', 'habló', 'comió', 'vivió'],
        ['nosotros / -as', 'hablamos', 'comimos', 'vivimos'],
        ['vosotros / -as', 'hablasteis', 'comisteis', 'vivisteis'],
        ['ellos / ellas / ustedes', 'hablaron', 'comieron', 'vivieron'],
      ],
    },
    {
      type: 'p',
      text: 'Remarque : **hablamos** et **vivimos** existent au présent et au prétérit. Le contexte fait la différence (Ayer hablamos con Ana : hier nous avons parlé).',
    },
    { type: 'h3', text: '5.2 Verbes irréguliers' },
    {
      type: 'table',
      headers: ['Verbe', 'Forme de base', 'Exemple'],
      rows: [
        ['ser / ir', 'fui, fuiste, fue, fuimos, fuisteis, fueron', 'Fue un día bonito. Fuimos al museo.'],
        ['dar', 'di, diste, dio, dimos, disteis, dieron', 'Di un regalo a mi madre.'],
        ['ver', 'vi, viste, vio, vimos, visteis, vieron', 'Vimos una película.'],
        ['tener', 'tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron', 'Tuve mucha suerte.'],
        ['estar', 'estuve, estuviste, estuvo…', 'Estuvimos en Sevilla.'],
        ['hacer', 'hice, hiciste, hizo…', 'Hizo frío toda la semana.'],
        ['decir', 'dije, dijiste, dijo…', 'Dijeron la verdad.'],
        ['poder', 'pude, pudiste, pudo…', 'No pude venir.'],
        ['querer', 'quise, quisiste, quiso…', 'Quisimos ayudar.'],
        ['saber', 'supe, supiste, supo…', 'Supe la noticia ayer.'],
        ['venir', 'vine, viniste, vino…', 'Vinieron tarde.'],
        ['haber (hay)', 'hubo', 'Hubo un accidente.'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Changement de radical à la 3e personne',
      content: [
        {
          type: 'p',
          text: 'Les verbes en **-ir** à changement de voyelle prennent le changement à la 3e personne : **pedir** → **pidió**, **pidieron** ; **dormir** → **durmió**, **durmieron** ; **sentir** → **sintió**. Orthographe : **leer** → **leyó**, **oír** → **oyó**.',
        },
      ],
    },
    { type: 'h2', text: '6. L’imparfait' },
    {
      type: 'table',
      headers: ['Personne', 'hablar', 'comer', 'vivir', 'ser', 'ir', 'ver'],
      rows: [
        ['yo', 'hablaba', 'comía', 'vivía', 'era', 'iba', 'veía'],
        ['tú', 'hablabas', 'comías', 'vivías', 'eras', 'ibas', 'veías'],
        ['él / ella / usted', 'hablaba', 'comía', 'vivía', 'era', 'iba', 'veía'],
        ['nosotros / -as', 'hablábamos', 'comíamos', 'vivíamos', 'éramos', 'íbamos', 'veíamos'],
        ['vosotros / -as', 'hablabais', 'comíais', 'vivíais', 'erais', 'ibais', 'veíais'],
        ['ellos / ellas / ustedes', 'hablaban', 'comían', 'vivían', 'eran', 'iban', 'veían'],
      ],
    },
    {
      type: 'p',
      text: 'L’imparfait ne connaît **que trois verbes irréguliers** : ser, ir, ver. Pour les autres verbes, il suffit de remplacer -ar par -aba (-ábamos), et -er/-ir par -ía (-íamos).',
    },
    { type: 'h2', text: '7. Indéfini ou imparfait ?' },
    {
      type: 'table',
      headers: ['Situation', 'Temps', 'Exemple'],
      rows: [
        ['Action ponctuelle, achevée', 'indéfini', 'Ayer llegué tarde.'],
        ['Succession d’actions (le récit)', 'indéfini', 'Entró, se sentó y pidió un café.'],
        ['Durée délimitée', 'indéfini', 'Estuve tres horas en la biblioteca.'],
        ['Action en cours, décor, arrière-plan', 'imparfait', 'Llovía cuando salí.'],
        ['Habitude, répétition', 'imparfait', 'De niño jugaba al fútbol todos los días.'],
        ['Description au passé (temps, âge, heure)', 'imparfait', 'Hacía sol. Tenía diez años. Eran las tres.'],
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Identifier l’action principale', text: 'Un fait qui fait avancer le récit : indéfini.' },
        { title: 'Identifier le décor', text: 'Ce qui se passe en arrière-plan, sans début ni fin marqués : imparfait.' },
        { title: 'Vérifier avec un marqueur', text: 'Cuando + indéfini (action ponctuelle) / Mientras + imparfait (action qui dure).' },
      ],
    },
    { type: 'h2', text: '8. Le pretérito perfecto compuesto' },
    {
      type: 'p',
      text: 'Il se forme avec **haber** au présent + le **participe passé** : **he hablado**, **has comido**, **ha vivido**, **hemos hecho**, **habéis visto**, **han dicho**.',
    },
    {
      type: 'list',
      items: [
        'Participes réguliers : -ar → **-ado** (hablado), -er/-ir → **-ido** (comido, vivido).',
        'Participes irréguliers : hacer → **hecho** ; decir → **dicho** ; ver → **visto** ; escribir → **escrito** ; poner → **puesto** ; volver → **vuelto** ; abrir → **abierto** ; romper → **roto**.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Emploi',
      content: [
        {
          type: 'p',
          text: 'Action passée **reliée au présent** : hoy, esta semana, este año, nunca, ya, todavía no. Ex. : **Hoy he estudiado mucho.** En Espagne, il est très courant ; en Amérique latine, on emploie souvent le prétérit à la place.',
        },
      ],
    },
    { type: 'h2', text: '9. Le futur' },
    { type: 'h3', text: '9.1 Futur simple' },
    {
      type: 'p',
      text: 'Le futur se forme sur l’**infinitif entier** (sans rien enlever) + **-é, -ás, -á, -emos, -éis, -án**, pour les trois groupes : hablaré, comerás, viviremos, hablarán.',
    },
    {
      type: 'table',
      headers: ['Infinitif', 'Radical irrégulier', 'Ex. (yo / ellos)'],
      rows: [
        ['tener', 'tendr-', 'tendré / tendrán'],
        ['poner', 'pondr-', 'pondré / pondrán'],
        ['salir', 'saldr-', 'saldré / saldrán'],
        ['venir', 'vendr-', 'vendré / vendrán'],
        ['poder', 'podr-', 'podré / podrán'],
        ['querer', 'querr-', 'querré / querrán'],
        ['saber', 'sabr-', 'sabré / sabrán'],
        ['hacer', 'har-', 'haré / harán'],
        ['decir', 'dir-', 'diré / dirán'],
        ['haber', 'habr-', 'habré / habrán (habrá : il y aura)'],
      ],
    },
    {
      type: 'p',
      text: 'Pour le futur proche, on emploie **ir a + infinitif** : **voy a estudiar** (je vais étudier).',
    },
    { type: 'h3', text: '9.2 Conditionnel' },
    {
      type: 'p',
      text: 'Même radical que le futur, avec les terminaisons **-ía, -ías, -ía, -íamos, -íais, -ían** : hablaría, comerías, tendría, haría, diría.',
    },
    {
      type: 'list',
      items: [
        '**Politesse** : ¿Podría ayudarme ? (pourriez-vous m’aider ?)',
        '**Conseil** : Deberías dormir más. (tu devrais dormir davantage)',
        '**Hypothèse** : Si tuviera tiempo, viajaría. (si j’avais le temps, je voyagerais)',
        '**Futur dans le passé** : Dijo que vendría. (il a dit qu’il viendrait)',
      ],
    },
    { type: 'h2', text: '10. Le subjonctif présent' },
    {
      type: 'p',
      text: 'Formation : on part de la 1re personne du présent (**yo**), on enlève **-o**, puis on ajoute les terminaisons de la voyelle **opposée** : -ar → **-e** (hable, hables…) ; -er/-ir → **-a** (coma, vivas…).',
    },
    {
      type: 'table',
      headers: ['Personne', 'hablar', 'comer', 'vivir', 'tener (yo tengo)'],
      rows: [
        ['yo', 'hable', 'coma', 'viva', 'tenga'],
        ['tú', 'hables', 'comas', 'vivas', 'tengas'],
        ['él / ella / usted', 'hable', 'coma', 'viva', 'tenga'],
        ['nosotros / -as', 'hablemos', 'comamos', 'vivamos', 'tengamos'],
        ['vosotros / -as', 'habléis', 'comáis', 'viváis', 'tengáis'],
        ['ellos / ellas / ustedes', 'hablen', 'coman', 'vivan', 'tengan'],
      ],
    },
    {
      type: 'list',
      items: [
        '**Verbes irréguliers** : ser → sea ; ir → vaya ; estar → esté ; dar → dé ; saber → sepa ; haber → haya ; hacer → haga ; decir → diga ; venir → venga ; salir → salga ; oír → oiga ; conocer → conozca.',
        '**Changements de radical** : pensar → piense ; poder → pueda ; querer → quiera ; volver → vuelva ; pedir → pida ; dormir → duerma.',
      ],
    },
    { type: 'h3', text: '10.1 Emplois du subjonctif' },
    {
      type: 'table',
      headers: ['Type', 'Déclencheur', 'Exemple'],
      rows: [
        ['Volonté, souhait, ordre', 'querer que, pedir que, decir que (ordre), mandar que', 'Quiero que vengas. Te pido que me ayudes.'],
        ['Obligation impersonnelle', 'es necesario / importante / mejor que', 'Es necesario que estudies más.'],
        ['Doute, négation de certitude', 'dudar que, no creer que', 'Dudo que sea verdad. No creo que llueva. (mais : Creo que es verdad.)'],
        ['Émotion', 'alegrarse de que, es triste que, temer que', 'Me alegro de que estés aquí.'],
        ['Souhait, espoir', 'ojalá (que)', '¡Ojalá llueva mañana!'],
        ['Temps futur', 'cuando, en cuanto, hasta que, antes de que, para que', 'Cuando llegues, llámame.'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Sujet identique : infinitif',
      content: [
        {
          type: 'p',
          text: 'Si le sujet est le même dans les deux propositions, on utilise l’infinitif : **Quiero ir** (je veux aller) ; mais **Quiero que vayas** (je veux que tu ailles).',
        },
      ],
    },
    { type: 'h2', text: '11. Le subjonctif imparfait' },
    {
      type: 'p',
      text: 'Formation : on prend la **3e personne du pluriel du prétérit**, on enlève **-ron**, puis on ajoute **-ra** (ou **-se**). Exemples : hablaron → **hablara** ; comieron → **comiera** ; tuvieron → **tuviera** ; fueron → **fuera**.',
    },
    {
      type: 'table',
      headers: ['Personne', 'hablar', 'comer', 'ir / ser', 'tener'],
      rows: [
        ['yo', 'hablara / hablase', 'comiera / comiese', 'fuera / fuese', 'tuviera / tuviese'],
        ['tú', 'hablaras / hablases', 'comieras / comieses', 'fueras / fueses', 'tuvieras / tuvieses'],
        ['él / ella / usted', 'hablara / hablase', 'comiera / comiese', 'fuera / fuese', 'tuviera / tuviese'],
        ['nosotros / -as', 'habláramos / hablásemos', 'comiéramos / comiésemos', 'fuéramos / fuésemos', 'tuviéramos / tuviésemos'],
        ['vosotros / -as', 'hablarais / hablaseis', 'comierais / comieseis', 'fuerais / fueseis', 'tuvierais / tuvieseis'],
        ['ellos / ellas / ustedes', 'hablaran / hablasen', 'comieran / comiesen', 'fueran / fuesen', 'tuvieran / tuviesen'],
      ],
    },
    {
      type: 'p',
      text: 'En classe, on privilégie la forme en **-ra**, plus courante ; la forme en **-se** est plus littéraire.',
    },
    { type: 'h3', text: '11.1 Concordance des temps' },
    {
      type: 'table',
      headers: ['Proposition principale', 'Subordonnée'],
      rows: [
        ['présent, futur, impératif, passé composé', 'subjonctif présent (ou parfait)'],
        ['indéfini, imparfait, conditionnel', 'subjonctif imparfait'],
      ],
    },
    {
      type: 'list',
      items: [
        'Quiero que vengas. → **Quería que vinieras.** (je voulais que tu viennes)',
        'Es posible que llueva. → **Era posible que lloviera.** (il était possible qu’il pleuve)',
        'Espero que tengas suerte. → **Esperaba que tuvieras suerte.**',
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Hypothèse irréelle',
      content: [
        {
          type: 'p',
          text: 'Si + **subjonctif imparfait** → conditionnel : **Si tuviera tiempo, viajaría.** (et non *Si tendría*). Si + présent → futur : **Si tengo tiempo, viajaré.**',
        },
      ],
    },
    { type: 'h2', text: '12. L’impératif' },
    {
      type: 'table',
      headers: ['Verbe', 'tú (+)', 'tú (–)', 'usted (+ / –)', 'vosotros (+)'],
      rows: [
        ['hablar', 'habla', 'no hables', 'hable', 'hablad'],
        ['comer', 'come', 'no comas', 'coma', 'comed'],
        ['vivir', 'vive', 'no vivas', 'viva', 'vivid'],
        ['tener', 'ten', 'no tengas', 'tenga', 'tened'],
        ['decir', 'di', 'no digas', 'diga', 'decid'],
        ['hacer', 'haz', 'no hagas', 'haga', 'haced'],
        ['ir', 've', 'no vayas', 'vaya', 'id'],
        ['ser', 'sé', 'no seas', 'sea', 'sed'],
      ],
    },
    {
      type: 'list',
      items: [
        'Impératif **affirmatif** : tú = présent 3e pers. (habla) sauf les irréguliers ; usted, ustedes = subjonctif présent ; vosotros = infinitif avec **-d** (hablad).',
        'Impératif **négatif** : tout = subjonctif présent (no hables, no comas, no digáis).',
      ],
    },
    { type: 'h2', text: '13. Les pronoms' },
    {
      type: 'table',
      headers: ['Personne', 'COD (direct)', 'COI (indirect)'],
      rows: [
        ['me / te / nos / os', 'me, te, nos, os', 'me, te, nos, os'],
        ['3e personne', 'lo, la, los, las', 'le, les'],
      ],
    },
    {
      type: 'list',
      items: [
        '**Place** : devant le verbe conjugué (**Lo compro**) ou attaché à l’infinitif, au gérondif, ou à l’impératif affirmatif (**Quiero comprarlo** / **Lo quiero comprar** ; **Cómpralo**).',
        '**Ordre** : COI avant COD : **me lo**, **te la**, **nos los**.',
        '**le / les devient se** devant lo, la, los, las : **Se lo doy.** (Je le lui donne.) ; **Se lo** → à lui, elle, vous, eux.',
        '**Impératif affirmatif** : pronoms après le verbe, avec accent si nécessaire : **Dámelo** (dar + me + lo). **Impératif négatif** : pronoms avant : **No me lo des**.',
      ],
    },
    { type: 'h2', text: '14. Traduire « on », « il faut », « devenir »' },
    {
      type: 'table',
      headers: ['Français', 'Espagnol', 'Exemple'],
      rows: [
        ['on (impersonnel)', 'se + 3e pers. du singulier', 'Aquí se habla español.'],
        ['on (sujet indéfini pluriel)', '3e pers. du pluriel', 'Dicen que va a nevar. (on dit qu’il va neiger)'],
        ['il faut + infinitif', 'hay que + infinitif', 'Hay que estudiar mucho.'],
        ['il faut que', 'es necesario que + subjonctif', 'Es necesario que vengas.'],
        ['devoir (obligation personnelle)', 'tener que + infinitif', 'Tengo que trabajar hoy.'],
        ['devenir (changement d’état)', 'ponerse / hacerse / volverse / convertirse en', 'Se puso nervioso. / Se hizo médico. / Se volvió loco. / Se convirtió en héroe.'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Choisir le verbe « devenir »',
      content: [
        {
          type: 'list',
          items: [
            '**ponerse + adjectif** : changement passager ou émotionnel (se puso rojo).',
            '**hacerse** : effort, profession, devenir par volonté (se hizo abogado).',
            '**volverse** : changement brusque, souvent négatif (se volvió loco).',
            '**convertirse en** : transformation complète (se convirtió en un símbolo).',
          ],
        },
      ],
    },
    { type: 'h2', text: '15. Por et para' },
    {
      type: 'table',
      headers: ['Por', 'Para'],
      rows: [
        ['Cause, motif : Gracias por venir.', 'But, destination : Este regalo es para ti.'],
        ['Moyen, voie : Viajamos por tren.', 'Finalité : Estudio para aprobar.'],
        ['Durée : Estuve allí por dos días.', 'Délai : Lo necesito para mañana.'],
        ['Échange, prix : Pagué diez euros por el libro.', 'Opinion, comparaison : Para ser niño, es muy alto.'],
        ['Lieu de passage : Pasamos por Bogotá.', 'Direction : Salgo para Madrid.'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège',
      content: [
        {
          type: 'p',
          text: '**Gracias por** (pour la cause) mais **estar para** + infinitif = être sur le point de : **Estoy para salir** (je suis sur le point de sortir).',
        },
      ],
    },
    { type: 'h2', text: '16. Accentuation' },
    {
      type: 'table',
      headers: ['Type de mot', 'Position de la syllabe tonique', 'Règle écrite', 'Exemple'],
      rows: [
        ['aguda (agudo)', 'dernière syllabe', 'accent si terminaison voyelle, -n ou -s', 'canción, café, Perú'],
        ['llana (llano)', 'avant-dernière syllabe', 'accent si terminaison autre que voyelle, -n ou -s', 'lápiz, árbol, mármol'],
        ['esdrújula (esdrújulo)', 'antépénultième', 'accent toujours', 'música, rápido, cómpratelo'],
      ],
    },
    {
      type: 'p',
      text: 'Accents diacritiques (qui distinguent deux mots) : **él / el**, **tú / tu**, **sí / si**, **sé / se**, **más / mas**, **té / te**, **mí / mi**, **dé / de**. Les mots interrogatifs et exclamatifs portent aussi un accent : **qué, quién, cómo, cuándo, dónde, cuánto**.',
    },
    { type: 'h2', text: '17. Le gérondif' },
    {
      type: 'p',
      text: 'Il exprime une action en cours avec **estar** : **estoy hablando**, **estamos comiendo**. Formation : -ar → **-ando** (hablando) ; -er/-ir → **-iendo** (comiendo, viviendo). Irréguliers : **leer** → leyendo ; **dormir** → durmiendo ; **ir** → yendo ; **poder** → pudiendo.',
    },
    { type: 'divider' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Ser = essence, identité, lieu d’un événement ; estar = état, localisation, résultat.',
            'Indéfini = fait ponctuel qui fait avancer le récit ; imparfait = décor, habitude, description.',
            'Subjonctif après volonté, doute, émotion, obligation impersonnelle, ojalá et cuando + futur.',
            'Concordance : principale au passé → subjonctif imparfait.',
            'Enclise à l’impératif affirmatif, pronoms avant le verbe au négatif.',
          ],
        },
      ],
    },
  ],
  exercices: [
    {
      id: 'gram-ex-1',
      title: 'Ser ou estar ?',
      difficulty: 1,
      duration: 10,
      tags: ['ser', 'estar'],
      statement: [
        {
          type: 'p',
          text: 'Complétez avec **ser** ou **estar** conjugué (présent).',
        },
        {
          type: 'cloze',
          text: '1. Mi abuela {{es}} de Perú, pero ahora {{está}} en Lima.\n2. La sopa {{está}} muy caliente.\n3. ¿De quién {{es}} este libro?\n4. Los niños {{están}} en el jardín.\n5. La fiesta {{es}} en casa de Ana.\n6. Hoy {{es}} martes.',
        },
      ],
      solution: [
        { type: 'p', text: '1. **es** (origine) / **está** (localisation actuelle).' },
        { type: 'p', text: '2. **está** : la soupe est dans un état momentané (chaude).' },
        { type: 'p', text: '3. **es** : la possession se traduit avec ser.' },
        { type: 'p', text: '4. **están** : localisation des enfants.' },
        { type: 'p', text: '5. **es** : le lieu d’un événement se construit avec ser.' },
        { type: 'p', text: '6. **es** : jour de la semaine, date, heure → ser.' },
      ],
    },
    {
      id: 'gram-ex-2',
      title: 'Indéfini ou imparfait',
      difficulty: 2,
      duration: 12,
      tags: ['indefinido', 'imperfecto'],
      statement: [
        {
          type: 'p',
          text: 'Mettez les verbes entre parenthèses au temps correct (indéfini ou imparfait) : le décor en arrière-plan est à l’imparfait, l’événement ponctuel à l’indéfini.',
        },
        {
          type: 'cloze',
          text: 'Cuando yo {{era}} niño, mi familia {{vivía}} en un pueblo. Un día, mientras {{jugábamos}} en el campo, {{llegó}} un perro desconocido. Ese mismo día {{decidimos}} adoptarlo.',
        },
      ],
      solution: [
        { type: 'p', text: '**era** : description au passé (imparfait de ser). **vivía** : habitude (imparfait).' },
        { type: 'p', text: '**jugábamos** : action de fond, décor de l’arrivée (mientras + imparfait).' },
        { type: 'p', text: '**llegó** : événement ponctuel qui fait avancer le récit (indéfini).' },
        { type: 'p', text: '**decidimos** : décision prise à un moment précis (indéfini).' },
      ],
    },
    {
      id: 'gram-ex-3',
      title: 'Verbes irréguliers au présent',
      difficulty: 1,
      duration: 8,
      tags: ['presente', 'irregulares'],
      statement: [
        {
          type: 'p',
          text: 'Conjuguez le verbe entre parenthèses au présent.',
        },
        {
          type: 'cloze',
          text: 'Yo {{tengo}} hambre. Nosotros {{queremos}} ir al cine. Ellos {{pueden}} venir mañana. Tú {{dices}} la verdad. Ella {{pide}} un café. Vosotros {{hacéis}} los deberes. Yo {{salgo}} a las ocho.',
        },
      ],
      solution: [
        { type: 'p', text: '**tengo** (tener, yo), **queremos** (querer e→ie, nosotros : pas de changement de radical), **pueden** (poder o→ue, ellos).' },
        { type: 'p', text: '**dices** (decir), **pide** (pedir e→i, 3e pers. sg.), **hacéis** (hacer, vosotros).' },
        { type: 'p', text: '**salgo** (salir, irrégulier en yo).' },
      ],
    },
    {
      id: 'gram-ex-4',
      title: 'Gustar et les verbes du même type',
      difficulty: 1,
      duration: 8,
      tags: ['gustar'],
      statement: [
        {
          type: 'qcm',
          questions: [
            {
              question: 'Traduisez : « Nous aimons les films. »',
              choices: ['Nos gustan las películas.', 'Nosotros gustamos las películas.', 'Nos gusta las películas.', 'Gustamos las películas.'],
              answer: 0,
              explanation: 'Le sujet grammatical (las películas) est au pluriel : gustan. Le pronom indirect est nos.',
            },
            {
              question: 'Traduisez : « À ma sœur, les chats lui plaisent beaucoup. »',
              choices: ['A mi hermana le gusta mucho los gatos.', 'A mi hermana le gustan mucho los gatos.', 'Mi hermana gusta los gatos.', 'A mi hermana le gustan los gatos mucho.'],
              answer: 1,
              explanation: 'Le sujet est los gatos (pluriel) : gustan. On précise avec a + pronom tonique ou nom, et le pronom le reste.',
            },
            {
              question: 'Traduisez : « Tu aimes la musique ? »',
              choices: ['¿Te gustas la música?', '¿Tú gustas la música?', '¿Te gusta la música?', '¿Gustas tú la música?'],
              answer: 2,
              explanation: 'La musique est au singulier : gusta. Le pronom indirect est te.',
            },
          ],
        },
      ],
      solution: [
        { type: 'p', text: 'Dans la construction de **gustar**, on accorde le verbe avec la chose qui plaît, pas avec la personne. Le pronom indirect (me, te, le, nos, os, les) désigne celui à qui ça plaît.' },
        { type: 'list', items: ['« Nos gustan las películas. »', '« A mi hermana le gustan mucho los gatos. »', '« ¿Te gusta la música? »'] },
      ],
    },
    {
      id: 'gram-ex-5',
      title: 'Choisir le subjonctif présent',
      difficulty: 2,
      duration: 10,
      tags: ['subjuntivo'],
      statement: [
        {
          type: 'qcm',
          questions: [
            {
              question: '« Quiero que tú ___ conmigo. »',
              choices: ['vienes', 'vengas', 'ven', 'vendrás'],
              answer: 1,
              explanation: 'Volonté + sujet différent : subjonctif présent. venir (yo vengo) → vengas.',
            },
            {
              question: '« Es importante que nosotros ___ la verdad. »',
              choices: ['decimos', 'digamos', 'diremos', 'dijimos'],
              answer: 1,
              explanation: 'Obligation impersonnelle + subjonctif. decir → (yo digo) → digamos.',
            },
            {
              question: '« Espero que ellos ___ bien el examen. »',
              choices: ['pasan', 'pasen', 'pasarán', 'pasaran'],
              answer: 1,
              explanation: 'Espérer que (souhait) : subjonctif présent. pasar → pasen.',
            },
            {
              question: '« Dudo que ___ a tiempo. »',
              choices: ['llegue', 'llega', 'llegará', 'llegaba'],
              answer: 0,
              explanation: 'Doute : subjonctif. llegar → llegue.',
            },
            {
              question: '« Cuando ___ a casa, te llamo. »',
              choices: ['llegaré', 'llegue', 'llega', 'llegué'],
              answer: 1,
              explanation: 'Cuando + idée de futur : subjonctif présent (llegue).',
            },
          ],
        },
      ],
      solution: [
        { type: 'p', text: '1. **vengas** (valor de volonté).' },
        { type: 'p', text: '2. **digamos** (decir → digo → diga → digamos).' },
        { type: 'p', text: '3. **pasen** (esperar que + subjonctif).' },
        { type: 'p', text: '4. **llegue** (dudar que + subjonctif).' },
        { type: 'p', text: '5. **llegue** : cuando + futur = subjonctif présent, même si l’on parle d’un événement à venir.' },
      ],
    },
    {
      id: 'gram-ex-6',
      title: 'Concordance des temps',
      difficulty: 3,
      duration: 15,
      tags: ['concordancia', 'subjuntivo imperfecto', 'type bac'],
      statement: [
        {
          type: 'p',
          text: '**Partie A.** Mettez les phrases au passé en respectant la concordance (la principale passe à l’imparfait).',
        },
        {
          type: 'list',
          ordered: true,
          items: ['Quiero que vengas a la fiesta.', 'Es necesario que estudies más.', 'Espero que tengas suerte.'],
        },
        {
          type: 'p',
          text: '**Partie B.** Traduisez en espagnol : « Il fallait que nous partions tôt. »',
        },
      ],
      hints: [
        'La principale devient querer / ser / esperar à l’imparfait.',
        'Pour salir, pensez au radical de l’indéfini ellos « salieron ».',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Quería que vinieras a la fiesta.** (venir : vinieron → vinieran → vinieras)',
            '**Era necesario que estudiaras más.**',
            '**Esperaba que tuvieras suerte.** (tener : tuvieron → tuvieran → tuvieras)',
          ],
        },
        {
          type: 'p',
          text: 'Partie B : **Era necesario que saliéramos temprano.** (ou Hacía falta que saliéramos temprano). Salir : salieron → salieran → saliéramos (avec accent sur la forme nosotros).',
        },
      ],
    },
    {
      id: 'gram-ex-7',
      title: 'Impératif et pronoms',
      difficulty: 2,
      duration: 10,
      tags: ['imperativo', 'pronombres'],
      statement: [
        {
          type: 'p',
          text: '**1.** Mettez à l’impératif (tú), affirmatif puis négatif : « Tú compras el pan. » / « Tú dices la verdad. » / « Tú pones la mesa. »',
        },
        {
          type: 'p',
          text: '**2.** Remplacez les compléments par des pronoms et mettez à l’impératif affirmatif puis négatif : « Tú le das el libro a tu hermana. » (tú = tu, sans pronom : le libro = lo, a tu hermana = le)',
        },
      ],
      solution: [
        {
          type: 'list',
          items: [
            'Compra el pan. / No compres el pan.',
            'Di la verdad. / No digas la verdad.',
            'Pon la mesa. / No pongas la mesa.',
          ],
        },
        {
          type: 'p',
          text: '2. Pronoms : **le** + **lo** → **se lo**. Affirmatif : **Dáselo.** (accent pour garder la tonique sur la syllabe de dar). Négatif : **No se lo des.** (pronoms avant le verbe, subjonctif présent de dar : des).',
        },
      ],
    },
    {
      id: 'gram-ex-8',
      title: 'Por ou para',
      difficulty: 2,
      duration: 8,
      tags: ['por', 'para'],
      statement: [
        {
          type: 'cloze',
          text: 'Este regalo es {{para}} ti. Gracias {{por}} todo. Viajamos {{por}} tren. Necesito el informe {{para}} mañana. Estudio español {{para}} trabajar en Madrid. Pagué cinco euros {{por}} el libro.',
        },
      ],
      solution: [
        { type: 'p', text: '1. **para** : destination. 2. **por** : cause. 3. **por** : moyen de transport. 4. **para** : délai. 5. **para** : but. 6. **por** : prix / échange.' },
      ],
    },
    {
      id: 'gram-ex-9',
      title: 'Accents et accentuation',
      difficulty: 1,
      duration: 6,
      tags: ['acentuación'],
      statement: [
        {
          type: 'truefalse',
          statements: [
            { text: 'Le pronom personnel « él » prend un accent pour se distinguer de l’article « el ».', answer: true },
            { text: '« canción » ne prend pas d’accent : il se termine par -n.', answer: false, explanation: 'canción est aguda (accent sur la dernière syllabe) et se termine par -n : l’accent est obligatoire.' },
            { text: '« lápiz » prend un accent : c’est un mot llano qui se termine par -z.', answer: true },
            { text: 'Le possessif « tu » ne prend pas d’accent, contrairement au pronom « tú ».', answer: true },
            { text: 'Les mots interrogatifs comme « ¿cómo? » ou « ¿dónde? » portent un accent écrit.', answer: true },
          ],
        },
      ],
      solution: [
        { type: 'p', text: 'Les réponses fausses concernent la règle des mots aguda : tout mot aguda finissant par -n, -s ou une voyelle prend un accent écrit.' },
      ],
    },
    {
      id: 'gram-ex-10',
      title: 'Type bac : passer un récit au passé',
      difficulty: 3,
      duration: 20,
      tags: ['type bac', 'pasado', 'redacción'],
      statement: [
        {
          type: 'p',
          text: 'Traduisez en espagnol, en choisissant pour chaque verbe l’indéfini ou l’imparfait :',
        },
        {
          type: 'quote',
          text: 'Hier, je suis allé au marché avec ma mère. Il faisait beau, mais nous avons acheté peu de choses parce que nous étions fatigués. Quand nous sommes rentrés, il a commencé à pleuvoir.',
        },
      ],
      hints: [
        'Décor (il faisait beau, nous étions fatigués) : imparfait.',
        'Actions qui font avancer le récit : indéfini.',
      ],
      solution: [
        {
          type: 'p',
          text: '**Ayer fui al mercado con mi madre. Hacía buen tiempo, pero compramos pocas cosas porque estábamos cansadas. Cuando volvimos a casa, empezó a llover.**',
        },
        {
          type: 'list',
          items: [
            '**fui** (ir, indéfini) : action ponctuelle achevée.',
            '**Hacía** (imparfait) : description du temps.',
            '**compramos** (indéfini) : action achevée.',
            '**estábamos** (imparfait) : état, arrière-plan.',
            '**volvimos** (indéfini) et **empezó** (indéfini) : enchaînement d’événements.',
          ],
        },
      ],
    },
  ],
  representations: [
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'es' },
      title: 'Conjugueur de verbes espagnols',
      caption: 'Vérifiez vos conjugaisons : présent, prétérit, imparfait, futur, conditionnel, subjonctif et impératif.',
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Ser ou estar : « Madrid ___ en España. »', back: '**está** : localisation.' },
        { front: 'Ser ou estar : « Estoy ___ leyendo. »', back: '**estar** + gérondif : action en cours.' },
        { front: 'Hay que + infinitif =', back: 'Il faut + infinitif.' },
        { front: 'Gustar : « Nos ___ los viajes. »', back: '**encantan** (ou gustan) : le sujet est au pluriel.' },
        { front: 'Pretérito indefinido de « ir » (yo)', back: '**fui**. Identique à ser : fui, fuiste, fue…' },
        { front: 'Imparfait de « ver » (nosotros)', back: '**veíamos**. Seul ser, ir, ver sont irréguliers à l’imparfait.' },
        { front: 'Futur de « tener » (yo)', back: '**tendré** (radical tendr- + -é).' },
        { front: 'Conditionnel de « hacer » (ellos)', back: '**harían** (radical har- + -ían).' },
        { front: 'Subjonctif présent de « tener » (yo)', back: '**tenga** (yo tengo → tenga).' },
        { front: 'Subjonctif imparfait de « ir » (ellos)', back: '**fueran** (ellos fueron → fueran).' },
        { front: 'Impératif négatif tú de « decir »', back: '**no digas** (subjonctif présent de decir).' },
        { front: 'Participe passé de « escribir »', back: '**escrito** (pretérito perfecto : he escrito).' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Choisissez le temps : « Cuando yo ___ niño, jugaba en el parque. »',
          choices: ['fui', 'era', 'fue', 'he sido'],
          answer: 1,
          explanation: 'Description d’un état au passé (âge, habitude) : imparfait.',
        },
        {
          question: 'Quel est le subjonctif correct ? « Es posible que ___ (llover) mañana. »',
          choices: ['llueve', 'llueva', 'lloverá', 'llovía'],
          answer: 1,
          explanation: 'Doute / possibilité : subjonctif présent, llover (o→ue) → llueva.',
        },
        {
          question: 'Si + subjonctif imparfait : « Si ___ tiempo, viajaría. »',
          choices: ['tengo', 'tendría', 'tuviera', 'tuve'],
          answer: 2,
          explanation: 'Hypothèse irréelle : si + subjonctif imparfait, puis conditionnel.',
        },
        {
          question: 'Pronoms corrects : « ___ quiero dar. » (Je veux le lui donner.)',
          choices: ['Le lo', 'Se lo', 'Lo le', 'Se le'],
          answer: 1,
          explanation: 'Le + lo devient se lo : Se lo quiero dar, ou Quiero dárselo.',
        },
      ],
    },
    {
      type: 'cloze',
      title: 'Por ou para',
      text: 'Compré flores {{para}} mi madre. Muchas gracias {{por}} tu ayuda. Llegamos {{por}} la mañana. Lo necesito {{para}} el lunes. Viajó {{por}} avión.',
    },
    {
      type: 'matching',
      title: 'Association : temps et emplois',
      pairs: [
        { left: 'Pretérito indefinido', right: 'Action ponctuelle achevée' },
        { left: 'Imperfecto', right: 'Habitude ou description au passé' },
        { left: 'Pretérito perfecto', right: 'Action passée reliée au présent (hoy, nunca)' },
        { left: 'Subjuntivo presente', right: 'Souhait, doute, émotion (concordance au présent)' },
        { left: 'Subjuntivo imperfecto', right: 'Concordance après une principale au passé' },
        { left: 'Condicional', right: 'Politesse, conseil, hypothèse' },
      ],
    },
    {
      type: 'ordering',
      title: 'Former le subjonctif imparfait de « hablar »',
      items: [
        'Partir de la 3e personne du pluriel du prétérit : hablaron',
        'Enlever la terminaison -ron',
        'Ajouter -ra (ou -se) : hablara / hablase',
        'Conjuguer selon la personne : hablaras, habláramos…',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Avec « Creo que » on emploie l’indicatif ; avec « No creo que » on emploie le subjonctif.', answer: true },
        { text: 'L’impératif négatif de « tú » se forme à partir de l’indicatif présent.', answer: false, explanation: 'Il se forme à partir du subjonctif présent : no hables, no comas, no vengas.' },
        { text: 'Le futur de « poner » est « ponrá ».', answer: false, explanation: 'Radical pondr- : pondrá.' },
        { text: 'Hay que + infinitif signifie « il faut ».', answer: true },
      ],
    },
  ],
}

export default chapter
