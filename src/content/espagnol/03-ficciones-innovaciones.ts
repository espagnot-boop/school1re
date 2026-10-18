import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'ficciones-innovaciones',
  subject: 'espagnol',
  order: 3,
  title: 'Ficciones y realidades · Innovaciones científicas y responsabilidad',
  theme: 'Ejes 5 y 6',
  summary:
    'Fiction et réalité (Don Quichotte, réalisme magique, Borges, séries) ; science, technologie, éthique et environnement dans le monde hispanique (Ramón y Cajal, Margarita Salas, CRISPR, lithium).',
  duration: '4 semaines',
  objectives: [
    'Distinguer fiction et réalité, comprendre le réalisme magique et le rôle de la fiction.',
    'Citer des œuvres et auteurs majeurs : Cervantes, Borges, García Márquez, Allende, Cortázar.',
    'Connaître des scientifiques et innovations hispaniques (Cajal, Torres Quevedo, Salas, Molina, Mojica).',
    'Débattre de la responsabilité éthique et environnementale du progrès.',
    'Rédiger un texte argumentatif sur l’intelligence artificielle, la science ou la fiction.',
  ],
  keywords: ['ficción', 'realismo mágico', 'Quijote', 'Borges', 'ciencia', 'innovación', 'ética', 'cambio climático'],

  fiche: [
    { type: 'h2', text: 'Eje 5 · Ficciones y realidades' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿La ficción nos aleja de la realidad o nos ayuda a comprenderla ?',
            '¿Dónde está la frontera entre lo real y lo imaginario ?',
            '¿Qué papel desempeñan las series, el cine y las redes en nuestra percepción del mundo ?',
            '¿Cómo la literatura puede contar la historia política (dictaduras, violencia) ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Obra / autor', 'Fecha', 'A retener'],
      rows: [
        ['Cervantes, Don Quijote de la Mancha', '1605 y 1615', 'Primera novela moderna ; el caballero que confunde molinos con gigantes ; ficción y realidad mezcladas'],
        ['Calderón, La vida es sueño', 'h. 1635', '¿Vivimos o soñamos ? Teatro del Siglo de Oro'],
        ['Borges, Ficciones', '1944', 'Cuentos fantásticos : laberintos, espejos, bibliotecas infinitas'],
        ['Cortázar, Rayuela', '1963', 'Novela que se puede leer en varios órdenes'],
        ['García Márquez, Cien años de soledad', '1967', 'Realismo mágico ; Macondo ; Nobel 1982'],
        ['Isabel Allende, La casa de los espíritus', '1982', 'Saga familiar y política en Chile'],
        ['Del Toro, El laberinto del fauno', '2006', 'Fantasía y realidad del franquismo en 1944'],
      ],
    },
    { type: 'h2', text: 'Eje 6 · Innovaciones científicas y responsabilidad' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Todo lo que es técnicamente posible es éticamente aceptable ?',
            '¿Quién es responsable de las consecuencias del progreso (científicos, empresas, Estados, ciudadanos) ?',
            '¿La tecnología puede resolver la crisis climática ?',
            '¿Cómo repartir los beneficios del progreso entre el Norte y el Sur ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Personaje', 'Dato'],
      rows: [
        ['Santiago Ramón y Cajal', 'Nobel de Medicina 1906 (con Golgi) : teoría neuronal'],
        ['Leonardo Torres Quevedo', 'Inventor : Telekino (1906), Spanish Aerocar de las cataratas del Niágara (1916)'],
        ['Severo Ochoa', 'Nobel de Medicina 1959 (síntesis del ARN)'],
        ['Mario Molina', 'Mexicano, Nobel de Química 1995 (capa de ozono)'],
        ['Margarita Salas (1938-2019)', 'Bioquímica española, discípula de Ochoa ; ADN polimerasa del fago phi29'],
        ['Francisco Mojica', 'Microbiólogo de Alicante ; descubrió y nombró las secuencias CRISPR'],
        ['Premios Nobel latinoamericanos de ciencia', 'Houssay (1947), Leloir (1970), Milstein (1984), Molina (1995)'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode — texte argumentatif',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Introduction : situer le thème, poser la question.',
            'Partie 1 : les avantages (exemple précis).',
            'Partie 2 : les risques et la responsabilité (exemple précis).',
            'Position personnelle nuancée.',
            'Conclusion : proposition ou ouverture.',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Eje 5 · Ficciones y realidades' },
    {
      type: 'p',
      text: 'La ficción es una construcción imaginaria, pero habla de la realidad. Un texto de ficción puede reflejar, deformar, criticar o incluso anticipar el mundo real. La literatura hispánica ofrece ejemplos fundamentales de este juego entre lo verdadero y lo imaginado.',
    },
    { type: 'h3', text: '1. Cervantes y el Quijote' },
    {
      type: 'p',
      text: 'En 1605 (primera parte) y 1615 (segunda parte), **Miguel de Cervantes** (1547-1616) publica *El ingenioso hidalgo don Quijote de la Mancha*. Alonso Quijano, lector obsesivo de libros de caballerías, enloquece, se hace llamar don Quijote y sale por los caminos con su escudero Sancho Panza. Confunde los molinos de viento con gigantes y a Aldonza Lorenzo con la dama Dulcinea. La novela explora el contraste entre el idealismo y la realidad ; en la segunda parte, los personajes han leído la primera, un juego metaliterario sorprendente. Es considerada la primera novela moderna.',
    },
    { type: 'h3', text: '2. Realismo mágico y literatura latinoamericana' },
    {
      type: 'p',
      text: 'El **realismo mágico** integra elementos sobrenaturales en un mundo cotidiano, sin que los personajes se sorprendan. **Gabriel García Márquez** (Colombia, 1927-2014), Premio Nobel de Literatura en 1982, publica *Cien años de soledad* (1967), historia de la familia Buendía en el pueblo imaginario de Macondo : lluvias de flores amarillas, Remedios la Bella que sube al cielo, una masacre oficial que todos olvidan (inspirada en la masacre de las bananeras de 1928). **Alejo Carpentier** habla de «lo real maravilloso» ; **Juan Rulfo** (México) escribe *Pedro Páramo* (1955), en un pueblo habitado por muertos ; **Isabel Allende** (Chile) publica *La casa de los espíritus* en 1982 ; **Laura Esquivel** (México), *Como agua para chocolate* (1989).',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Borges y los juegos con la realidad',
      content: [
        {
          type: 'p',
          text: '**Jorge Luis Borges** (Argentina, 1899-1986) construye en *Ficciones* (1944) y *El Aleph* (1949) universos de espejos, laberintos y bibliotecas infinitas : *La biblioteca de Babel*, *El jardín de senderos que se bifurcan* (1941), *Tlön, Uqbar, Orbis Tertius*. En este último cuento, un mundo inventado acaba por invadir la realidad : reflexión sobre el poder de la ficción.',
        },
      ],
    },
    { type: 'h3', text: '3. Cine, series y realidad' },
    {
      type: 'list',
      items: [
        '**El laberinto del fauno** (2006, Guillermo del Toro) : Ofelia se refugia en un mundo fantástico para escapar de la violencia de la posguerra española (1944).',
        '**Roma** (2018, Alfonso Cuarón) : recuerdos de infancia en un barrio de México (1970-71).',
        '**La casa de papel** (2017-2021) : fenómeno mundial de las series españolas (Netflix).',
        '**Telenovelas** : *Betty la fea* (Colombia, 1999) adaptada en decenas de países.',
        '**Almodóvar** : *Todo sobre mi madre* (1999, Oscar a la mejor película extranjera).',
      ],
    },
    { type: 'h3', text: '4. Realidad aumentada, desinformación y deepfakes' },
    {
      type: 'p',
      text: 'La frontera entre lo real y lo ficticio se vuelve difusa con las redes, los *deepfakes*, los *influencers* o la realidad virtual. Cuando una imagen fabricada parece auténtica, la confianza en la información se debilita. Frente a ello hacen falta educación mediática y espíritu crítico, como el que Cervantes ya invitaba a tener con las lecturas.',
    },
    { type: 'h2', text: 'Eje 6 · Innovaciones científicas y responsabilidad' },
    { type: 'h3', text: '1. Una tradición científica hispánica' },
    {
      type: 'p',
      text: '**Santiago Ramón y Cajal** (1852-1934) recibió el Nobel de Medicina en 1906, compartido con el italiano Camillo Golgi, por sus trabajos sobre la estructura del sistema nervioso : la neurona es una célula independiente. **Leonardo Torres Quevedo** (1852-1936) inventó el *Telekino*, antecedente del mando a distancia (1906), y el *Spanish Aerocar* de las cataratas del Niágara (inaugurado en 1916), todavía en servicio. **Isaac Peral** diseñó un submarino (1888) ; **Juan de la Cierva** inventó el autogiro (1923). **Severo Ochoa** (Nobel 1959) y su discípula **Margarita Salas** (1938-2019) abrieron el camino de la biología molecular ; la polimerasa del fago phi29, descubierta por Salas, se emplea en el análisis de ADN.',
    },
    {
      type: 'p',
      text: 'En América Latina : **Bernardo Houssay** (Argentina, Nobel 1947), **Luis Federico Leloir** (Argentina, Nobel de Química 1970), **César Milstein** (Argentina, Nobel de Medicina 1984), **Mario Molina** (México, Nobel de Química 1995, por sus trabajos sobre el agujero de la capa de ozono). Francisco Mojica (Universidad de Alicante) identificó las repeticiones CRISPR ; el Nobel de Química 2020 recompensó a Charpentier y Doudna por la herramienta de edición genética, a la que Mojica dio nombre.',
    },
    { type: 'h3', text: '2. Innovaciones y debates éticos' },
    {
      type: 'table',
      headers: ['Ámbito', 'Ventajas', 'Riesgos / dilemas'],
      rows: [
        ['Inteligencia artificial', 'Diagnóstico médico, traducción, productividad', 'Empleo, sesgos, desinformación, protección de datos'],
        ['Biotecnología (CRISPR)', 'Curar enfermedades genéticas', 'Bebés «a la carta», desigualdades, límites éticos'],
        ['Energías renovables', 'Reducen las emisiones de CO2 (sol, viento)', 'Impacto local, costes, minería del litio'],
        ['Agricultura transgénica', 'Más rendimiento', 'Biodiversidad, dependencia de multinacionales'],
        ['Vacunas', 'Salvar millones de vidas (covid-19)', 'Desigualdad de acceso entre países'],
      ],
    },
    { type: 'h3', text: '3. Medio ambiente y responsabilidad' },
    {
      type: 'p',
      text: 'América Latina alberga la mayor parte de la selva amazónica, «pulmón» del planeta, amenazada por la deforestación, la agricultura intensiva y la minería. El «triángulo del litio» (Argentina, Bolivia, Chile) concentra buena parte de las reservas mundiales de este metal indispensable para las baterías : ¿cómo explotar sin destruir los ecosistemas ni los derechos de las comunidades indígenas ? España es líder europeo en energía solar y eólica, pero sufre sequías y olas de calor cada vez más intensas (Doñana, Cataluña). Los movimientos indígenas del Amazonas, por su parte, defienden sus territorios frente a estas presiones.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Cómo debatir un dilema ético',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Plantear', text: 'Exponer la innovación y la pregunta ética.' },
            { title: 'Beneficios', text: 'Dar uno o dos ejemplos concretos y datados.' },
            { title: 'Riesgos', text: 'Mencionar las consecuencias posibles y quién las sufre.' },
            { title: 'Responsabilidad', text: 'Científicos, Estados, empresas, ciudadanos : ¿quién debe actuar ?' },
            { title: 'Concluir', text: 'Proponer una regla o una solución equilibrada.' },
          ],
        },
      ],
    },
    { type: 'h2', text: 'Vocabulario esencial' },
    {
      type: 'keyvalue',
      items: [
        { key: 'la ficción / ficticio', value: 'la fiction / fictif' },
        { key: 'el relato / el cuento', value: 'le récit / le conte, la nouvelle' },
        { key: 'el narrador / el personaje', value: 'le narrateur / le personnage' },
        { key: 'la trama / el argumento', value: 'l’intrigue' },
        { key: 'soñar / el sueño', value: 'rêver / le rêve ; le sommeil' },
        { key: 'engañar / el engaño', value: 'tromper / la tromperie' },
        { key: 'el descubrimiento', value: 'la découverte' },
        { key: 'el avance / el adelanto', value: 'l’avancée, le progrès' },
        { key: 'investigar / el investigador', value: 'chercher (scientifiquement) / chercheur' },
        { key: 'el inventor / el invento', value: 'l’inventeur / l’invention' },
        { key: 'la inteligencia artificial', value: 'l’intelligence artificielle' },
        { key: 'el cambio climático', value: 'le changement climatique' },
        { key: 'las energías renovables', value: 'les énergies renouvelables' },
        { key: 'la sequía', value: 'la sécheresse' },
        { key: 'la deforestación', value: 'la déforestation' },
        { key: 'ser responsable de', value: 'être responsable de' },
        { key: 'los riesgos / las ventajas', value: 'les risques / les avantages' },
        { key: 'el desarrollo sostenible', value: 'le développement durable' },
      ],
    },
    { type: 'h2', text: 'Expresiones útiles' },
    {
      type: 'table',
      headers: ['Para…', 'Expresiones'],
      rows: [
        ['Hablar de ficción', 'La novela cuenta… ; el protagonista… ; la acción se sitúa en… ; el autor mezcla lo real y lo imaginario.'],
        ['Hipótesis', 'Si + imparfait du subj. + conditionnel : Si no hubiera ficciones, el mundo sería más pobre.'],
        ['Hablar de progreso', 'Gracias a… ; a pesar de… ; a costa de… ; con el fin de…'],
        ['Responsabilidad', 'Es responsabilidad de… ; hay que asumir las consecuencias ; se debería + inf.'],
        ['Condición', 'siempre que + subj. ; a menos que + subj. ; con tal de que + subj.'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Ejemplo de producción escrita (≈ 150 palabras)',
      content: [
        { type: 'p', text: '**Consigna : ¿Hasta dónde debe llegar la ciencia ?**' },
        {
          type: 'p',
          text: 'Creo que la ciencia debe avanzar, pero con límites éticos claros. Gracias a investigadores como Margarita Salas, hoy se pueden analizar muestras de ADN diminutas, y las vacunas contra la covid-19 han salvado millones de vidas. Sin embargo, innovaciones como la edición genética CRISPR, que Francisco Mojica contribuyó a descubrir, plantean preguntas : ¿se puede modificar el ADN de un embrión ? Además, la inteligencia artificial amenaza ciertos empleos y puede difundir bulos. Por eso, es fundamental que los Estados regulen y que los científicos asuman su responsabilidad. En mi opinión, no hay que frenar la investigación, sino acompañarla con debates públicos informados. En conclusión, el progreso solo es verdadero progreso si beneficia a toda la humanidad y respeta el planeta.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Pièges',
      content: [
        {
          type: 'list',
          items: [
            '**el problema, el tema, el sistema, el programa** sont masculins en -ma.',
            '**investigar** = faire des recherches ; *buscar* = chercher (objet, personne).',
            '**el sueño** = le rêve ou le sommeil.',
            '**Subjonctif** après *aunque* (concession hypothétique) et *para que*.',
            '**el agua** : *el agua fría* (mais *las aguas*).',
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'e1-obras',
      title: 'Repères : œuvres et auteurs',
      difficulty: 1,
      duration: 10,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Associez : 1) Cien años de soledad ; 2) Ficciones ; 3) Don Quijote ; 4) La casa de los espíritus ; 5) El laberinto del fauno. Auteurs : Cervantes, Borges, García Márquez, Del Toro, Isabel Allende.' },
      ],
      solution: [
        { type: 'list', items: ['1) García Márquez (1967)', '2) Borges (1944)', '3) Cervantes (1605-1615)', '4) Isabel Allende (1982)', '5) Guillermo del Toro (2006)'] },
      ],
    },
    {
      id: 'e2-vocabulario',
      title: 'Vocabulaire de la science',
      difficulty: 1,
      duration: 10,
      tags: ['vocabulario'],
      statement: [
        { type: 'p', text: 'Traduisez en espagnol : a) la découverte ; b) la sécheresse ; c) les énergies renouvelables ; d) le chercheur ; e) l’intelligence artificielle ; f) le réchauffement climatique.' },
      ],
      solution: [
        { type: 'list', items: ['a) el descubrimiento', 'b) la sequía', 'c) las energías renovables', 'd) el investigador', 'e) la inteligencia artificial', 'f) el calentamiento global / climático'] },
      ],
    },
    {
      id: 'e3-quijote',
      title: 'Compréhension : Don Quichotte',
      difficulty: 2,
      duration: 20,
      tags: ['comprensión'],
      statement: [
        { type: 'p', text: 'Lee : «Don Quijote vio treinta o cuarenta molinos de viento y dijo a su escudero : "Aquellos que ves allí son gigantes". Sancho respondió : "Aquellos no son gigantes, sino molinos". Pero don Quijote atacó igualmente.» (texte adapté) Responde en español : 1) ¿Qué ve don Quijote ? 2) ¿Qué ve Sancho ? 3) ¿Qué simboliza este episodio ? 4) ¿Quién es el autor de la novela y cuándo se publicó ?' },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          'Don Quijote ve gigantes.',
          'Sancho ve molinos de viento, es decir, la realidad.',
          'El choque entre el idealismo y la realidad ; la locura que transforma el mundo según la imaginación.',
          'Miguel de Cervantes ; primera parte en 1605, segunda en 1615.',
        ] },
      ],
    },
    {
      id: 'e4-traduccion',
      title: 'Traduction français → espagnol',
      difficulty: 2,
      duration: 15,
      tags: ['traducción'],
      statement: [
        { type: 'p', text: 'Traduisez : « Si les scientifiques n’avaient pas découvert les vaccins, beaucoup de gens seraient morts. Aujourd’hui, il faut que tous les pays aient accès aux médicaments. »' },
      ],
      hints: ['Irréel du passé : si + plus-que-parfait du subjonctif, conditionnel passé.', '« il faut que » → es necesario que + subjonctif.'],
      solution: [
        { type: 'p', text: '**Si los científicos no hubieran descubierto las vacunas, mucha gente habría muerto. Hoy es necesario que todos los países tengan acceso a los medicamentos.**' },
        { type: 'p', text: 'Attention : *mucha gente* (singulier) ; *hubieran descubierto* (plus-que-parfait du subjonctif) ; *tengan* (subjonctif présent après *es necesario que*).' },
      ],
    },
    {
      id: 'e5-cajal',
      title: 'Repères : scientifiques hispaniques',
      difficulty: 2,
      duration: 15,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Complète : a) Ramón y Cajal reçut le prix Nobel en ___ ; b) Mario Molina est de nationalité ___ ; c) Le Spanish Aerocar est de ___ ; d) Margarita Salas est la disciple de ___.' },
      ],
      solution: [
        { type: 'list', items: ['a) 1906 (Médecine)', 'b) mexicaine (Nobel de Chimie 1995)', 'c) Leonardo Torres Quevedo (1916)', 'd) Severo Ochoa'] },
      ],
    },
    {
      id: 'e6-ficcion',
      title: 'Expression écrite : fiction et réalité',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿Por qué necesitamos las ficciones ? Reflexiona a partir de ejemplos. »' },
      ],
      hints: ['Idée : la fiction aide à comprendre le réel et à rêver.', 'Exemples : Quijote, García Márquez, El laberinto del fauno.'],
      solution: [
        { type: 'p', text: 'Necesitamos las ficciones porque nos ayudan a comprender la realidad y a soportarla. Don Quijote, por ejemplo, nos enseña que la imaginación puede ser a la vez peligrosa y liberadora : su locura es ridícula, pero también muy humana. Del mismo modo, García Márquez, con el realismo mágico, cuenta la historia de América Latina de una manera nueva, mezclando lo extraordinario con lo cotidiano. En El laberinto del fauno, la fantasía permite a una niña sobrevivir en la España de 1944, marcada por la represión franquista. Sin embargo, la ficción puede ser peligrosa cuando se confunde con la realidad, como ocurre con los bulos. Por eso, hay que ser lectores críticos. En definitiva, las ficciones no nos alejan del mundo : nos ofrecen otra manera de mirarlo.' },
      ],
    },
    {
      id: 'e7-ia',
      title: 'Expression écrite : intelligence artificielle',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿La inteligencia artificial es una oportunidad o una amenaza ? »' },
      ],
      hints: ['Oportunidad : médecine, éducation. Amenaza : emplois, deepfakes. Concluez sur la régulation.'],
      solution: [
        { type: 'p', text: 'A mi juicio, la inteligencia artificial es sobre todo una oportunidad, siempre que se regule. Por un lado, ayuda a diagnosticar enfermedades, traducir idiomas y personalizar la enseñanza. Por otro lado, plantea riesgos : puede eliminar ciertos empleos, difundir deepfakes y utilizar nuestros datos sin permiso. Además, los algoritmos reproducen a veces los prejuicios de quienes los programan. Por consiguiente, es indispensable que los Estados establezcan reglas claras, como ha empezado a hacer la Unión Europea, y que los ciudadanos aprendan a usar estas herramientas con espíritu crítico. En conclusión, la técnica no es buena ni mala en sí : todo depende del uso que le demos.' },
      ],
    },
    {
      id: 'e8-litio',
      title: 'Dossier : litio y responsabilidad',
      difficulty: 3,
      duration: 25,
      tags: ['comprensión', 'cultura'],
      statement: [
        { type: 'p', text: 'Explica en español (6-8 líneas) por qué el «triángulo del litio» plantea un dilema entre innovación y responsabilidad. Cita los tres países y dos consecuencias posibles.' },
      ],
      solution: [
        { type: 'p', text: 'El triángulo del litio, formado por Argentina, Bolivia y Chile, concentra gran parte de las reservas mundiales de este metal, esencial para las baterías de coches eléctricos y teléfonos. Su extracción ayuda a la transición energética, pero consume enormes cantidades de agua en regiones desérticas como el salar de Atacama y puede afectar a la vida de las comunidades indígenas. Por un lado, genera ingresos y empleo ; por otro lado, amenaza los ecosistemas. Los Estados y las empresas deberían, por tanto, consultar a los habitantes y limitar el impacto ambiental. Así, la innovación solo será realmente responsable si respeta a las personas y a la naturaleza.' },
      ],
    },
  ],

  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1605-1615', title: 'Don Quijote (Cervantes)' },
        { date: '1906', title: 'Nobel de Ramón y Cajal ; Telekino' },
        { date: '1944', title: 'Ficciones (Borges)' },
        { date: '1959', title: 'Nobel de Severo Ochoa' },
        { date: '1967', title: 'Cien años de soledad' },
        { date: '1982', title: 'Nobel de García Márquez' },
        { date: '1995', title: 'Nobel de Mario Molina' },
        { date: '2006', title: 'El laberinto del fauno' },
        { date: '2020', title: 'Nobel de Química : CRISPR' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '¿Quién escribió el Quijote ?', choices: ['Lope de Vega', 'Cervantes', 'Quevedo', 'Calderón'], answer: 1 },
        { question: '¿En qué año recibió García Márquez el Nobel ?', choices: ['1967', '1982', '1990', '2000'], answer: 1 },
        { question: '¿Qué pueblo imaginario aparece en Cien años de soledad ?', choices: ['Comala', 'Macondo', 'Aracataca', 'Santa María'], answer: 1 },
        { question: '¿Quién ganó el Nobel de Medicina en 1906 junto a Golgi ?', choices: ['Severo Ochoa', 'Ramón y Cajal', 'Houssay', 'Fleming'], answer: 1 },
        { question: '¿Qué científico mexicano obtuvo el Nobel de Química en 1995 ?', choices: ['Mario Molina', 'Leloir', 'Milstein', 'Houssay'], answer: 0 },
        { question: '¿Qué países forman el triángulo del litio ?', choices: ['Argentina, Bolivia, Chile', 'México, Cuba, Perú', 'España, Portugal, Francia', 'Brasil, Colombia, Ecuador'], answer: 0 },
        { question: '¿Quién escribió Pedro Páramo ?', choices: ['Cortázar', 'Rulfo', 'Borges', 'Carpentier'], answer: 1 },
        { question: '¿Quién identificó y nombró las secuencias CRISPR ?', choices: ['Margarita Salas', 'Francisco Mojica', 'Torres Quevedo', 'Peral'], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'la trama', back: 'l’intrigue' },
        { front: 'el relato', back: 'le récit' },
        { front: 'el sueño', back: 'le rêve / le sommeil' },
        { front: 'engañar', back: 'tromper' },
        { front: 'el descubrimiento', back: 'la découverte' },
        { front: 'el avance', back: 'l’avancée' },
        { front: 'investigar', back: 'faire de la recherche' },
        { front: 'el invento', back: 'l’invention' },
        { front: 'la sequía', back: 'la sécheresse' },
        { front: 'las energías renovables', back: 'les énergies renouvelables' },
        { front: 'la deforestación', back: 'la déforestation' },
        { front: 'el calentamiento global', back: 'le réchauffement climatique' },
        { front: 'los riesgos', back: 'les risques' },
        { front: 'la selva', back: 'la forêt tropicale' },
        { front: 'el molino de viento', back: 'le moulin à vent' },
        { front: 'el realismo mágico', back: 'le réalisme magique' },
        { front: 'Cien años de soledad', back: 'García Márquez, 1967, Macondo, Nobel 1982' },
        { front: 'Ramón y Cajal', back: 'Nobel de médecine 1906, neurone' },
      ],
    },
    {
      type: 'matching',
      title: 'Asocia autor / científico y dato',
      pairs: [
        { left: 'Cervantes', right: 'Don Quijote (1605-1615)' },
        { left: 'Borges', right: 'Ficciones (1944)' },
        { left: 'Rulfo', right: 'Pedro Páramo (1955)' },
        { left: 'Ramón y Cajal', right: 'Nobel 1906, neurona' },
        { left: 'Margarita Salas', right: 'Polimerasa phi29' },
        { left: 'Mario Molina', right: 'Capa de ozono, Nobel 1995' },
      ],
    },
    {
      type: 'cloze',
      title: 'Completa',
      text: 'Don Quijote confunde los {{molinos}} de viento con {{gigantes}}. Cervantes publicó la primera parte en {{1605}}. García Márquez recibió el {{Nobel|premio Nobel}} de Literatura en 1982.',
    },
    {
      type: 'truefalse',
      title: 'Verdadero o falso',
      statements: [
        { text: 'Borges es un escritor mexicano.', answer: false, explanation: 'Es argentino.' },
        { text: 'Ramón y Cajal compartió el Nobel 1906 con Golgi.', answer: true },
        { text: 'El Spanish Aerocar está en las cataratas del Niágara.', answer: true },
        { text: 'El triángulo del litio incluye a España.', answer: false },
      ],
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'es', verb: 'investigar' },
      title: 'Conjuguer : investigar',
      caption: 'Entraînez-vous au subjonctif imparfait avec descubrir et soñar (si + subjonctif imparfait).',
    },
  ],
}

export default chapter
