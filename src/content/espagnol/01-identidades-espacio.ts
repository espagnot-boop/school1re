import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'identidades-espacio',
  subject: 'espagnol',
  order: 1,
  title: 'Identidades e intercambios · Espacio privado y espacio público',
  theme: 'Ejes 1 y 2',
  summary:
    'Migraciones, mestizaje, lenguas en contacto y exilio ; casa, calle, plaza y espacios de protesta : repères culturels hispaniques, vocabulaire et méthode de la production écrite.',
  duration: '4 semaines',
  objectives: [
    'Présenter et problématiser les axes « Identités et échanges » et « Espace privé et espace public ».',
    'Mobiliser des repères culturels précis (Espagne et Amérique latine) pour illustrer un propos.',
    'Employer le lexique de la migration, de l’identité, de la ville et de la sphère privée.',
    'Rédiger une expression écrite argumentée (synthèse, opinion, lettre) en espagnol correct.',
    'Traduire de courts passages en tenant compte des pièges français-espagnol.',
  ],
  keywords: ['migración', 'identidad', 'mestizaje', 'exilio', 'frontera', 'hogar', 'plaza', 'espacio público'],

  fiche: [
    { type: 'h2', text: 'Eje 1 · Identidades e intercambios' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Cómo se construye la identidad de una persona o de un pueblo entre dos culturas?',
            '¿La migración es una pérdida o una riqueza cultural?',
            '¿Las fronteras separan o ponen en contacto?',
            '¿Qué papel desempeñan la lengua y las tradiciones en la identidad?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Fecha', 'Hecho'],
      rows: [
        ['1848', 'Tratado de Guadalupe Hidalgo : México cede a EE. UU. Texas, California, Nuevo México… (la frontera «cruza» a los mexicanos que allí viven)'],
        ['1939', 'Exilio republicano español : unas 450 000 personas cruzan los Pirineos (la Retirada) ; México del presidente Lázaro Cárdenas acoge a miles de exiliados'],
        ['1942-1964', 'Programa Bracero : trabajadores mexicanos temporales en EE. UU.'],
        ['1959', 'Revolución cubana : exilio cubano hacia Miami'],
        ['1987', 'Gloria Anzaldúa publica Borderlands / La Frontera (identidad «mestiza» y lengua mezclada)'],
        ['1991', 'Creación del Instituto Cervantes'],
        ['2012', 'DACA : protección de jóvenes migrantes llegados de niños a EE. UU.'],
      ],
    },
    { type: 'h2', text: 'Eje 2 · Espacio privado y espacio público' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Dónde está el límite entre lo íntimo y lo público ?',
            '¿La calle y la plaza son espacios de convivencia o de reivindicación ?',
            '¿Las redes y el confinamiento han borrado la frontera entre casa y espacio público ?',
            '¿Quién tiene derecho a ocupar el espacio público (mujeres, jóvenes, manifestantes) ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Referencia', 'Lo que hay que saber'],
      rows: [
        ['La casa de Bernarda Alba', 'Obra de Lorca (escrita en 1936, estrenada en 1945 en Buenos Aires) : encierro de cinco hijas bajo el poder de la madre ; casa = prisión'],
        ['Madres de Plaza de Mayo', 'Desde el 30 de abril de 1977, rondas de las madres de desaparecidos cada jueves en Buenos Aires : la plaza se vuelve espacio de denuncia'],
        ['15-M (2011)', 'Movimiento de los «indignados» : ocupación de la Puerta del Sol (Madrid) desde el 15 de mayo de 2011'],
        ['Muralismo', 'Rivera, Orozco, Siqueiros : el arte sale al espacio público (México, años 1920-1950)'],
        ['Confinamiento', 'Marzo de 2020 : España decreta el estado de alarma ; balcones, aplausos de las 20 h, teletrabajo'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode — expression écrite',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Lire la consigne et repérer l’axe et la consigne précise (opinion, lettre, récit, comparaison).',
            'Annoncer la problématique en une phrase dans l’introduction.',
            'Deux ou trois arguments, chacun illustré d’un exemple culturel daté.',
            'Connecteurs : en primer lugar, además, sin embargo, por lo tanto, en conclusión.',
            'Se relire : accords, ser/estar, por/para, temps verbaux, accents.',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Eje 1 · Identidades e intercambios' },
    {
      type: 'p',
      text: 'La identidad no es fija : se construye por la familia, la lengua, la religión, el lugar de nacimiento, pero también por los encuentros y los desplazamientos. El mundo hispánico es un laboratorio de **mestizaje** : desde la conquista de América (a partir de 1492) se mezclan poblaciones indígenas, europeas y africanas. El mestizo, el mulato, el criollo… son categorías históricas que han dado lugar a identidades plurales.',
    },
    { type: 'h3', text: '1. Migraciones y fronteras' },
    {
      type: 'p',
      text: 'España, país de emigración durante gran parte del siglo XX (hacia Argentina, Cuba, Venezuela, luego Alemania, Francia y Suiza en los años 1960), se ha convertido desde los años 1990 en un país de **inmigración** : latinoamericanos, marroquíes, rumanos, subsaharianos. Los cayucos y pateras que llegan a Canarias o al sur de la Península ilustran el drama de la migración irregular.',
    },
    {
      type: 'p',
      text: 'En América, la frontera entre México y Estados Unidos (unos 3 100 km) es un símbolo. Los chicanos, mexicano-americanos, viven entre dos mundos. La frase «Nosotros no cruzamos la frontera, la frontera nos cruzó a nosotros» recuerda que tras el **Tratado de Guadalupe Hidalgo (1848)** México perdió más de la mitad de su territorio. Las remesas que los emigrantes envían a sus familias son una fuente esencial de ingresos para varios países (México, Guatemala, El Salvador, Honduras).',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'El exilio republicano (1939)',
      content: [
        {
          type: 'p',
          text: 'Al terminar la **Guerra Civil** (1936-1939), cientos de miles de republicanos huyen de España. Muchos se quedan en campos del sur de Francia (Argelès-sur-Mer), otros embarcan hacia América. México, con el presidente Lázaro Cárdenas, acoge a unos 20 000 españoles : escritores, científicos, artistas (el poeta Luis Cernuda, el cineasta Luis Buñuel, la pensadora María Zambrano pasó por varios países). Antonio Machado murió en Collioure en febrero de 1939, pocos días después de cruzar la frontera.',
        },
      ],
    },
    { type: 'h3', text: '2. Lengua e identidad' },
    {
      type: 'p',
      text: 'El español es la lengua oficial de 21 países y lo hablan unos 500 millones de personas como lengua materna (más de 590 millones contando a quienes lo dominan en algún grado). En Estados Unidos, más de 60 millones de personas son de origen hispano : surge el **spanglish**, mezcla de español e inglés (*parquear* el carro, *lonche*). Para la escritora chicana **Gloria Anzaldúa**, la frontera es una «herida abierta» y la lengua mezclada es una forma de resistencia y de pertenencia.',
    },
    {
      type: 'p',
      text: 'En España, la Constitución de 1978 reconoce el castellano como lengua oficial del Estado y permite que otras lenguas (catalán, gallego, euskera, valenciano, aranés) sean cooficiales en sus comunidades. Este plurilingüismo forma parte de la identidad de cada territorio.',
    },
    { type: 'h3', text: '3. Intercambios culturales' },
    {
      type: 'list',
      items: [
        '**Gastronomía** : el maíz, la patata, el tomate y el cacao llegan a Europa desde América (intercambio colombino).',
        '**Música** : salsa (Nueva York, años 1960-1970, raíces cubanas y puertorriqueñas), reguetón (Puerto Rico), flamenco (Andalucía), tango (Río de la Plata).',
        '**Literatura** : el boom latinoamericano (años 1960) — García Márquez, Vargas Llosa, Cortázar, Fuentes — se publica en Barcelona gracias a editores como Carlos Barral.',
        '**Fiestas** : el Día de Muertos mexicano (1-2 de noviembre), Patrimonio inmaterial de la UNESCO desde 2008, mezcla tradiciones prehispánicas y católicas.',
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Frida Kahlo (1907-1954)',
      content: [
        {
          type: 'p',
          text: 'La pintora mexicana mezcla en sus autorretratos símbolos indígenas (trajes tehuanos, plantas, monos) e influencias europeas. Su identidad es **mestiza** : padre alemán, madre mexicana de ascendencia indígena y española. Su obra afirma una mexicanidad orgullosa tras la Revolución de 1910.',
        },
      ],
    },
    { type: 'h2', text: 'Eje 2 · Espacio privado y espacio público' },
    { type: 'h3', text: '1. La casa, el hogar, la intimidad' },
    {
      type: 'p',
      text: 'El espacio privado es el de la familia y la intimidad : *el hogar*, *la vivienda*, *el dormitorio*. Pero la casa puede ser refugio o prisión. En **La casa de Bernarda Alba** de Federico García Lorca (asesinado en agosto de 1936, cerca de Granada), Bernarda impone ocho años de luto tras la muerte del marido : sus hijas están encerradas, vigiladas por las apariencias y la «honra». En **La casa de los espíritus** (1982) de Isabel Allende, la casa familiar es el escenario de la historia política y familiar de Chile.',
    },
    {
      type: 'p',
      text: 'La vivienda es también un problema social : la burbuja inmobiliaria española estalló en 2008, provocando desahucios (expulsiones de viviendas) ; el movimiento PAH (Plataforma de Afectados por la Hipoteca, 2009) defendió a las familias endeudadas. Hoy, el precio del alquiler y la dificultad de emancipación de los jóvenes siguen siendo temas de debate.',
    },
    { type: 'h3', text: '2. La calle, la plaza, la ciudad' },
    {
      type: 'p',
      text: 'En el mundo hispánico, la **plaza** (Plaza Mayor, Zócalo de México, Plaza de Mayo, Plaza de Bolívar) es el corazón de la ciudad : lugar de encuentro, de paseo, de fiesta (*el paseo*, *la tertulia*, *las tapas*, *el botellón*) y de poder (iglesia, ayuntamiento). Es también el lugar de la protesta y la reivindicación.',
    },
    {
      type: 'timeline',
      events: [
        { date: '30 abril 1977', title: 'Madres de Plaza de Mayo', text: 'Primera ronda de las madres en Buenos Aires durante la dictadura argentina : ocupar la plaza para exigir saber qué pasó con sus hijos desaparecidos.' },
        { date: '1994', title: 'Zapatistas', text: 'El EZLN se levanta en Chiapas el 1 de enero y ocupa varias ciudades : reivindicación de los derechos de los pueblos indígenas.' },
        { date: '15 mayo 2011', title: 'Movimiento 15-M', text: 'Los «indignados» acampan en la Puerta del Sol ; lema : «No nos representan», «Democracia real ya».' },
        { date: '2015', title: 'Ni Una Menos', text: 'Marcha del 3 de junio en Argentina contra los feminicidios, movimiento que se extiende por América Latina.' },
        { date: '2019', title: 'Estallido social en Chile', text: 'Protestas masivas desde octubre en la Plaza Italia (rebautizada Plaza de la Dignidad) de Santiago.' },
      ],
    },
    {
      type: 'p',
      text: 'El **muralismo mexicano** (Diego Rivera, José Clemente Orozco, David Alfaro Siqueiros) convierte los muros de los edificios públicos en soporte de un arte para el pueblo, después de la Revolución mexicana. Hoy, el *grafiti* y el arte urbano continúan esta tradición.',
    },
    { type: 'h3', text: '3. Fronteras entre lo privado y lo público' },
    {
      type: 'p',
      text: 'Las redes sociales difuminan los límites : se comparte lo íntimo en público, se vive la intimidad bajo la mirada de los demás. El **confinamiento de 2020** transformó el hogar en oficina, escuela y lugar de ocio ; los balcones se convirtieron en pequeñas plazas donde los vecinos aplaudían a las 20 h al personal sanitario. Se plantea además la cuestión de la protección de la vida privada (datos personales, vigilancia).',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Cómo analizar un documento (méthode)',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Presentar', text: 'Naturaleza (texto, imagen, vídeo), autor, fecha, contexto, tema.' },
            { title: 'Describir', text: 'Qué se ve o qué se cuenta : personajes, lugar, acción, tono.' },
            { title: 'Interpretar', text: 'Mensaje del autor, símbolos, relación con el eje cultural.' },
            { title: 'Enlazar', text: 'Relacionar con otro documento o con un repère culturel preciso.' },
            { title: 'Concluir', text: 'Responder a la problemática en dos frases.' },
          ],
        },
      ],
    },
    { type: 'h2', text: 'Vocabulario esencial' },
    {
      type: 'keyvalue',
      items: [
        { key: 'emigrar / inmigrar', value: 'quitter son pays / arriver dans un pays' },
        { key: 'el/la migrante', value: 'le migrant' },
        { key: 'la patera / el cayuco', value: 'embarcation de fortune (côtes espagnoles / Canaries)' },
        { key: 'la frontera', value: 'la frontière' },
        { key: 'el desarraigo', value: 'le déracinement' },
        { key: 'acoger / la acogida', value: 'accueillir / l’accueil' },
        { key: 'el mestizaje', value: 'le métissage' },
        { key: 'las raíces', value: 'les racines' },
        { key: 'el exilio / el exiliado', value: 'l’exil / l’exilé' },
        { key: 'los papeles / sin papeles', value: 'les papiers / sans-papiers' },
        { key: 'el hogar', value: 'le foyer (au sens affectif)' },
        { key: 'el vecino / el vecindario', value: 'le voisin / le voisinage' },
        { key: 'el desahucio', value: 'l’expulsion d’un logement' },
        { key: 'la plaza / el barrio', value: 'la place / le quartier' },
        { key: 'manifestarse / la manifestación', value: 'manifester / la manifestation' },
        { key: 'la intimidad / la vida privada', value: 'l’intimité / la vie privée' },
        { key: 'el confinamiento', value: 'le confinement' },
        { key: 'el alquiler', value: 'la location, le loyer' },
      ],
    },
    { type: 'h2', text: 'Expresiones útiles' },
    {
      type: 'table',
      headers: ['Para…', 'Expresiones'],
      rows: [
        ['Introducir', 'El documento trata de… ; Se trata de… ; Este texto plantea la cuestión de…'],
        ['Opinar', 'En mi opinión… ; Me parece que… ; Estoy convencido/a de que… ; Pienso que + indicatif / No creo que + subjonctif'],
        ['Añadir', 'Además… ; Asimismo… ; Es más…'],
        ['Oponer', 'Sin embargo… ; No obstante… ; Por el contrario… ; Aunque + subjonctif'],
        ['Causa / consecuencia', 'Dado que… ; Puesto que… ; Por eso… ; Por consiguiente…'],
        ['Concluir', 'En definitiva… ; En conclusión… ; Para terminar…'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Ejemplo de producción escrita (≈ 150 palabras)',
      content: [
        {
          type: 'p',
          text: '**Consigna : ¿La migración empobrece o enriquece la identidad de un país ?**',
        },
        {
          type: 'p',
          text: 'Desde mi punto de vista, la migración enriquece la identidad de un país, aunque plantea retos reales. En primer lugar, los intercambios culturales aportan diversidad : la música, la gastronomía y las lenguas se mezclan, como lo demuestra el spanglish en Estados Unidos. En segundo lugar, los migrantes contribuyen a la economía y al dinamismo demográfico de los países de acogida ; España, por ejemplo, ha recibido millones de personas desde los años noventa. Sin embargo, no hay que olvidar el sufrimiento del desarraigo ni los riesgos del viaje : miles de personas mueren cada año en el Mediterráneo o en el Atlántico intentando llegar a Canarias. Por eso, es indispensable garantizar una acogida digna. En definitiva, la identidad no es una esencia inmutable : se transforma al contacto con los demás, y esa evolución es una riqueza.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Faux amis et pièges fréquents',
      content: [
        {
          type: 'list',
          items: [
            '**emigrar** ≠ immigrer : *emigrar* = partir ; *inmigrar* = arriver.',
            '**asistir a** = assister à (être présent) ; *ayudar* = assister (aider).',
            '**la gente** est singulier : *la gente es amable* (et non « son »).',
            '**por / para** : *por* = cause, durée, moyen ; *para* = but, destinataire, date limite.',
            '**ser / estar** : *es inmigrante* (identité) ; *está en España* (localisation).',
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'e1-vocabulario',
      title: 'Vocabulaire de la migration',
      difficulty: 1,
      duration: 10,
      tags: ['vocabulario'],
      statement: [
        { type: 'p', text: 'Traduisez en français : a) el desarraigo ; b) la patera ; c) acoger ; d) los sin papeles ; e) las raíces ; f) el mestizaje.' },
      ],
      hints: ['« arraigo » vient de « raíz ». Pensez au champ lexical du bateau et du métissage.'],
      solution: [
        { type: 'list', items: ['a) le déracinement', 'b) l’embarcation de fortune (pateras = côtes espagnoles)', 'c) accueillir', 'd) les sans-papiers', 'e) les racines', 'f) le métissage'] },
      ],
    },
    {
      id: 'e2-cultura',
      title: 'Repères culturels : Eje 1',
      difficulty: 1,
      duration: 10,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Complétez : a) El Tratado de Guadalupe Hidalgo se firmó en el año ___. b) El presidente mexicano que acogió a los republicanos españoles era ___. c) Gloria Anzaldúa publicó ___ en 1987. d) El Instituto Cervantes fue creado en ___.' },
      ],
      solution: [
        { type: 'list', items: ['a) 1848', 'b) Lázaro Cárdenas', 'c) Borderlands / La Frontera', 'd) 1991'] },
      ],
    },
    {
      id: 'e3-traduccion',
      title: 'Traduction français → espagnol',
      difficulty: 2,
      duration: 15,
      tags: ['traducción'],
      statement: [
        { type: 'p', text: 'Traduisez en espagnol : « Beaucoup de jeunes Espagnols ont quitté leur pays pendant la crise de 2008 pour chercher du travail à l’étranger. Ils ont souvent du mal à s’adapter, mais ils gardent le contact avec leur famille. »' },
      ],
      hints: ['« chercher du travail » : buscar trabajo (pas de « a » devant un nom de chose).', 'Passé composé / passé simple ? Les jeunes « ont quitté » : action terminée → pretérito indefinido ou perfecto selon le contexte.'],
      solution: [
        { type: 'p', text: '**Muchos jóvenes españoles se fueron de su país durante la crisis de 2008 para buscar trabajo en el extranjero. A menudo les cuesta adaptarse, pero mantienen el contacto con su familia.**' },
        { type: 'p', text: 'Points d’attention : *se fueron* (indefinido de *irse*), *les cuesta* (construction de *gustar*), *buscar trabajo* sans préposition, *mantener el contacto*.' },
      ],
    },
    {
      id: 'e4-comprension',
      title: 'Compréhension : texte sur la frontière',
      difficulty: 2,
      duration: 20,
      tags: ['comprensión'],
      statement: [
        { type: 'quote', text: 'Llegué a Estados Unidos con diez años. En casa hablábamos español, en la escuela inglés. A veces mezclaba las dos lenguas en la misma frase y mis maestros me corregían. Con el tiempo entendí que no tenía que elegir : yo era de los dos lados.', author: 'Texto de fabricación propia, inspirado en testimonios chicanos' },
        { type: 'p', text: 'Responde en español : 1) ¿Cuántos años tenía el narrador cuando llegó ? 2) ¿Qué lengua hablaba en casa ? 3) ¿Qué problema tenía en la escuela ? 4) ¿Qué comprendió con el tiempo ? 5) ¿A qué fenómeno lingüístico se refiere el texto ?' },
      ],
      hints: ['Cherchez les chiffres, puis les verbes de perception ou de compréhension.'],
      solution: [
        { type: 'list', ordered: true, items: [
          'Tenía diez años.',
          'En casa hablaba español.',
          'Mezclaba el español y el inglés y sus maestros lo corregían.',
          'Comprendió que no tenía que elegir entre las dos lenguas ni las dos culturas : pertenecía a ambos mundos.',
          'Al spanglish (alternancia de códigos entre español e inglés).',
        ] },
      ],
    },
    {
      id: 'e5-expresion-migracion',
      title: 'Expression écrite : migration et identité',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots minimum)** : « ¿Crees que vivir en otro país cambia la identidad de una persona ? Justifica tu respuesta con ejemplos. »' },
      ],
      hints: ['Prenez position dans l’introduction.', 'Deux arguments : enrichissement / difficulté (désarraigo).', 'Appuyez-vous sur Frida Kahlo, l’exil de 1939 ou le spanglish.'],
      solution: [
        { type: 'p', text: '**Corrigé modèle**' },
        { type: 'p', text: 'Creo que vivir en otro país cambia profundamente la identidad de una persona, pero no la borra. Por un lado, quien emigra descubre otra lengua, otras costumbres y otra manera de ver el mundo : se enriquece. Un ejemplo claro son los exiliados republicanos españoles en México tras 1939, que contribuyeron a la vida cultural del país sin olvidar nunca sus orígenes. Por otro lado, el desarraigo puede provocar nostalgia y sentimiento de no pertenecer a ninguna parte. Los chicanos, por ejemplo, viven entre dos culturas y, según Gloria Anzaldúa, esa situación es a la vez dolorosa y creativa. En mi opinión, la identidad no es algo fijo, sino un proceso : cada experiencia vivida en el extranjero añade una capa más. En definitiva, emigrar no significa dejar de ser quien uno es, sino llegar a serlo de otra manera.' },
      ],
    },
    {
      id: 'e6-espacio-publico',
      title: 'Compréhension : plaza et protesta',
      difficulty: 2,
      duration: 20,
      tags: ['comprensión', 'cultura'],
      statement: [
        { type: 'p', text: 'Explique en español (5 à 8 lignes) por qué las Madres de Plaza de Mayo convirtieron un espacio público en un símbolo político. Indica la fecha de la primera ronda, el contexto histórico y el significado del pañuelo blanco.' },
      ],
      hints: ['Contexte : dictadura militar 1976-1983. Le pañuelo blanc rappelle les couches des enfants disparus.'],
      solution: [
        { type: 'p', text: 'El 30 de abril de 1977, durante la dictadura militar argentina (1976-1983), un grupo de madres empezó a reunirse en la Plaza de Mayo, frente a la Casa Rosada, para pedir información sobre sus hijos desaparecidos. Como las manifestaciones estaban prohibidas, caminaban en rondas alrededor de la pirámide cada jueves. Llevaban un pañuelo blanco, símbolo de los pañales de sus hijos y de su lucha pacífica. Al ocupar el espacio público, hicieron visible lo que el régimen quería ocultar. Su ejemplo inspiró a otros movimientos de derechos humanos en el mundo y la plaza sigue siendo hoy un lugar de memoria.' },
      ],
    },
    {
      id: 'e7-ser-estar',
      title: 'Grammaire en contexte : ser / estar / por / para',
      difficulty: 1,
      duration: 10,
      tags: ['gramática'],
      statement: [
        { type: 'p', text: 'Complétez avec la forme correcte : 1) Mis abuelos ___ (ser/estar) de Andalucía, pero ahora ___ (ser/estar) en Barcelona. 2) Emigró ___ (por/para) buscar una vida mejor. 3) El tren sale ___ (por/para) Madrid a las ocho. 4) Hemos paseado ___ (por/para) la plaza toda la tarde.' },
      ],
      solution: [
        { type: 'list', items: ['1) son … están', '2) para (but)', '3) para (destination)', '4) por (lieu traversé)'] },
      ],
    },
    {
      id: 'e8-privado-publico',
      title: 'Expression écrite : espace privé et espace public',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet** : « Las redes sociales han borrado la frontera entre lo privado y lo público. ¿Estás de acuerdo ? » (150 mots minimum)' },
      ],
      hints: ['Définissez les deux espaces.', 'Un exemple : confinement de 2020, protection des données, exhibition de l’intimité.'],
      solution: [
        { type: 'p', text: 'Estoy en parte de acuerdo con esta afirmación. Es verdad que hoy compartimos en internet fotos, opiniones y momentos íntimos que antes se quedaban en casa. Además, durante el confinamiento de 2020, el hogar se convirtió en escuela y oficina, y los balcones en espacios de encuentro. Sin embargo, la frontera no ha desaparecido por completo : cada persona decide qué publica y qué guarda para sí. Es más, existen leyes, como el Reglamento General de Protección de Datos europeo (2018), que protegen la intimidad de los ciudadanos. En mi opinión, el problema no son las redes en sí mismas, sino la falta de educación digital. Por lo tanto, hay que enseñar a los jóvenes a proteger su vida privada y a reflexionar antes de publicar. En conclusión, lo privado y lo público se mezclan más que antes, pero seguimos teniendo la libertad de trazar el límite.' },
      ],
    },
  ],

  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1492', title: 'Llegada de Colón a América' },
        { date: '1848', title: 'Tratado de Guadalupe Hidalgo' },
        { date: '1936-1939', title: 'Guerra Civil española' },
        { date: '1939', title: 'Exilio republicano (la Retirada)' },
        { date: '1959', title: 'Revolución cubana' },
        { date: '1977', title: 'Primera ronda de las Madres de Plaza de Mayo' },
        { date: '2011', title: 'Movimiento 15-M' },
        { date: '2020', title: 'Confinamiento en España' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '¿Qué año se firmó el Tratado de Guadalupe Hidalgo ?', choices: ['1821', '1848', '1910', '1939'], answer: 1, explanation: 'En 1848, tras la guerra México-Estados Unidos.' },
        { question: '¿Quién escribió «La casa de Bernarda Alba» ?', choices: ['Cervantes', 'Lorca', 'Machado', 'Allende'], answer: 1, explanation: 'Federico García Lorca, 1936 (estreno 1945).' },
        { question: '¿Dónde se instaló el movimiento 15-M en Madrid ?', choices: ['Plaza Mayor', 'Puerta del Sol', 'Cibeles', 'Plaza de España'], answer: 1 },
        { question: '¿Qué simboliza el pañuelo blanco de las Madres de Plaza de Mayo ?', choices: ['La paz entre naciones', 'El pañal de sus hijos desaparecidos', 'La bandera argentina', 'El luto'], answer: 1 },
        { question: '¿Qué es el spanglish ?', choices: ['Un dialecto de Andalucía', 'Una mezcla de español e inglés', 'Un idioma oficial de México', 'Un curso de inglés'], answer: 1 },
        { question: '¿Qué presidente mexicano acogió a los exiliados republicanos ?', choices: ['Porfirio Díaz', 'Benito Juárez', 'Lázaro Cárdenas', 'Vicente Fox'], answer: 2 },
        { question: '¿Qué pintor es uno de los tres grandes muralistas mexicanos ?', choices: ['Diego Rivera', 'Joan Miró', 'Salvador Dalí', 'Fernando Botero'], answer: 0 },
        { question: '¿Qué significa «desahucio» ?', choices: ['Une promotion', 'Une expulsion de logement', 'Un déménagement joyeux', 'Un contrat de travail'], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'el desarraigo', back: 'le déracinement' },
        { front: 'la patera', back: 'l’embarcation de fortune' },
        { front: 'acoger', back: 'accueillir' },
        { front: 'los sin papeles', back: 'les sans-papiers' },
        { front: 'el mestizaje', back: 'le métissage' },
        { front: 'las remesas', back: 'l’argent envoyé par les migrants à leur famille' },
        { front: 'el exiliado', back: 'l’exilé' },
        { front: 'la frontera', back: 'la frontière' },
        { front: 'el hogar', back: 'le foyer' },
        { front: 'el vecino', back: 'le voisin' },
        { front: 'el desahucio', back: 'l’expulsion (d’un logement)' },
        { front: 'manifestarse', back: 'manifester' },
        { front: 'el alquiler', back: 'le loyer / la location' },
        { front: 'la intimidad', back: 'l’intimité' },
        { front: 'el confinamiento', back: 'le confinement' },
        { front: 'la convivencia', back: 'le vivre-ensemble' },
        { front: 'Madres de Plaza de Mayo', back: '30 avril 1977, Buenos Aires, rondes des mères de disparus' },
        { front: '15-M', back: '15 mai 2011, mouvement des indignés, Puerta del Sol' },
      ],
    },
    {
      type: 'matching',
      title: 'Asocia el personaje o la obra con su dato',
      pairs: [
        { left: 'Frida Kahlo', right: 'Pintora mexicana mestiza (1907-1954)' },
        { left: 'Gloria Anzaldúa', right: 'Borderlands / La Frontera (1987)' },
        { left: 'Lázaro Cárdenas', right: 'Presidente de México que acogió a los exiliados' },
        { left: 'Lorca', right: 'La casa de Bernarda Alba' },
        { left: 'Isabel Allende', right: 'La casa de los espíritus (1982)' },
        { left: 'Diego Rivera', right: 'Muralismo mexicano' },
      ],
    },
    {
      type: 'cloze',
      title: 'Completa el texto',
      text: 'Muchos españoles tuvieron que {{emigrar}} en los años sesenta hacia Alemania o Francia para buscar {{trabajo}}. Hoy España acoge a muchos {{inmigrantes}} y se ha convertido en un país {{multicultural|plural|diverso}}.',
    },
    {
      type: 'truefalse',
      title: 'Verdadero o falso',
      statements: [
        { text: 'Las Madres de Plaza de Mayo se reúnen en Montevideo.', answer: false, explanation: 'Se reúnen en Buenos Aires (Argentina).' },
        { text: 'El español es lengua oficial de 21 países.', answer: true },
        { text: 'La casa de Bernarda Alba es una novela de García Márquez.', answer: false, explanation: 'Es una obra de teatro de Lorca.' },
        { text: 'El Programa Bracero duró de 1942 a 1964.', answer: true },
      ],
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'es', verb: 'emigrar' },
      title: 'Conjuguer : emigrar',
      caption: 'Entraînez-vous aussi avec acoger, irse, manifestarse.',
    },
    {
      type: 'reveal',
      title: 'Idea para la expresión oral',
      content: [
        { type: 'p', text: 'Prepare une minute sur : « La plaza como espacio de libertad ». Plan : 1) definición ; 2) ejemplo (Plaza de Mayo / 15-M) ; 3) tu opinión.' },
      ],
    },
  ],
}

export default chapter
