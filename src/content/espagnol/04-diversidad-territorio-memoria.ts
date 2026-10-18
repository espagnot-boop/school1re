import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'diversidad-territorio-memoria',
  subject: 'espagnol',
  order: 4,
  title: 'Diversidad e inclusión · Territorio y memoria',
  theme: 'Ejes 7 y 8',
  summary:
    'Peuples indigènes, langues, genre, handicap, inclusion ; territoires, Guerre civile, franquisme, dictatures latino-américaines, mémoire historique et lieux de mémoire.',
  duration: '5 semaines',
  objectives: [
    'Présenter la diversité du monde hispanique (peuples, langues, genre, handicap) et les politiques d’inclusion.',
    'Maîtriser les repères historiques : Guerre civile, franquisme, Transition, dictatures du Cône Sud.',
    'Expliquer le sens de la « mémoire historique » et des lois mémorielles.',
    'Utiliser le lexique de l’inclusion, du territoire, de la dictature et de la mémoire.',
    'Rédiger un texte argumenté ou narratif sur la mémoire et l’identité d’un territoire.',
  ],
  keywords: ['diversidad', 'inclusión', 'pueblos indígenas', 'Guerra Civil', 'franquismo', 'dictadura', 'memoria histórica', 'desaparecidos'],

  fiche: [
    { type: 'h2', text: 'Eje 7 · Diversidad e inclusión' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Cómo vivir juntos respetando las diferencias ?',
            '¿Qué políticas favorecen la inclusión de las minorías ?',
            '¿La igualdad de derechos es suficiente o hace falta una igualdad real ?',
            '¿La diversidad cultural y lingüística es una riqueza o una fuente de tensiones ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Fecha', 'Hecho'],
      rows: [
        ['1978', 'Constitución española : lenguas cooficiales (art. 3) y Estado de las autonomías'],
        ['1992', 'Premio Nobel de la Paz a Rigoberta Menchú (Guatemala, maya quiché)'],
        ['2004', 'Ley española contra la violencia de género'],
        ['2005', 'España legaliza el matrimonio igualitario (3 de julio de 2005, ley 13/2005)'],
        ['2006', 'Evo Morales, primer presidente indígena de Bolivia'],
        ['2007', 'Ley de Igualdad efectiva de mujeres y hombres (España)'],
        ['2009', 'Bolivia se convierte en Estado Plurinacional'],
        ['2010', 'Argentina, primer país latinoamericano con matrimonio igualitario'],
      ],
    },
    { type: 'h2', text: 'Eje 8 · Territorio y memoria' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Cómo recordar un pasado doloroso sin dividir a la sociedad ?',
            '¿Quién escribe la historia : el Estado, las víctimas, los historiadores ?',
            '¿Qué es un lugar de memoria ?',
            '¿Verdad, justicia y reparación : cómo salir de una dictadura ?',
          ],
        },
      ],
    },
    {
      type: 'timeline',
      events: [
        { date: '14 abril 1931', title: 'Segunda República española' },
        { date: '17-18 julio 1936', title: 'Golpe militar y comienzo de la Guerra Civil' },
        { date: '1 abril 1939', title: 'Fin de la guerra : victoria de Franco' },
        { date: '20 noviembre 1975', title: 'Muerte de Franco' },
        { date: '6 diciembre 1978', title: 'Constitución democrática' },
        { date: '2007', title: 'Ley de Memoria Histórica' },
        { date: '2022', title: 'Ley de Memoria Democrática' },
        { date: '11 septiembre 1973', title: 'Golpe de Estado de Pinochet (Chile)' },
        { date: '24 marzo 1976', title: 'Golpe militar en Argentina (Videla)' },
        { date: '1984', title: 'Informe Nunca más (CONADEP) en Argentina' },
        { date: '2016', title: 'Acuerdo de paz entre el Gobierno colombiano y las FARC' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode — texte sur la mémoire',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Situer : pays, période, régime.',
            'Distinguer histoire (travail des historiens) et mémoire (souvenir collectif).',
            'Acteurs : victimes, familles, associations, État.',
            'Exemple précis daté (Madres, ARMH, Valle de Cuelgamuros).',
            'Position personnelle : le devoir de mémoire est-il nécessaire ?',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Eje 7 · Diversidad e inclusión' },
    { type: 'h3', text: '1. Diversidad étnica y cultural' },
    {
      type: 'p',
      text: 'América Latina es un continente de enorme diversidad : pueblos indígenas (quechuas, aimaras, mayas, nahuas, guaraníes, mapuches…), descendientes de africanos (Caribe, Colombia, Brasil), mestizos, inmigrantes europeos y asiáticos. Durante siglos, estos pueblos sufrieron discriminación, pero su participación política ha crecido : **Benito Juárez**, indígena zapoteca, fue presidente de México (1858-1872) ; **Evo Morales**, aimara, fue elegido presidente de Bolivia en 2005 y asumió el cargo en enero de 2006 ; la Constitución boliviana de 2009 definió el país como **Estado Plurinacional**. **Rigoberta Menchú**, maya quiché de Guatemala, recibió el Nobel de la Paz en 1992.',
    },
    {
      type: 'p',
      text: 'En España, la diversidad es también lingüística y cultural : el castellano, el catalán, el gallego, el euskera, el valenciano, el aranés. La **comunidad gitana** (alrededor de 750 000 personas), presente desde el siglo XV, ha dado el flamenco, declarado Patrimonio Inmaterial de la UNESCO en 2010, pero sigue sufriendo discriminación en educación y empleo.',
    },
    { type: 'h3', text: '2. Igualdad de género y derechos' },
    {
      type: 'p',
      text: 'España aprobó en 2004 una ley integral contra la violencia de género y en 2007 una ley de igualdad. En 2005 legalizó el **matrimonio entre personas del mismo sexo** (tercer país del mundo tras Países Bajos y Bélgica) ; Argentina lo hizo en 2010, primero en América Latina. El movimiento feminista latinoamericano, con **#NiUnaMenos** (2015), denuncia los feminicidios ; en Argentina, la «marea verde» logró la legalización del aborto en diciembre de 2020.',
    },
    { type: 'h3', text: '3. Discapacidad e inclusión' },
    {
      type: 'p',
      text: 'La **ONCE** (Organización Nacional de Ciegos Españoles, fundada en 1938) ofrece empleo y servicios a personas con discapacidad visual y es un modelo de inclusión social. Hoy se habla de **accesibilidad** (rampas, lengua de signos, braille), de **escuela inclusiva** y de adaptar el trabajo a todas las capacidades.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Cultura y diversidad',
      content: [
        {
          type: 'list',
          items: [
            '**Celia Cruz** (Cuba, 1925-2003), reina de la salsa, símbolo de la cultura afrocaribeña.',
            '**Palenque de San Basilio** (Colombia) : primer pueblo libre de América según la tradición ; Patrimonio de la UNESCO (2005).',
            '**Lorca**, *Romancero gitano* (1928) : poesía andaluza y gitana.',
            '**Almodóvar** : películas con personajes diversos (*Todo sobre mi madre*, 1999).',
            '**Lenguas indígenas** : el quechua es oficial en Perú y Bolivia ; el guaraní es oficial en Paraguay.',
          ],
        },
      ],
    },
    { type: 'h2', text: 'Eje 8 · Territorio y memoria' },
    { type: 'h3', text: '1. Territorio : identidad, poder y conflicto' },
    {
      type: 'p',
      text: 'El territorio es un espacio con una identidad histórica, cultural y política. En España, el **Estado de las autonomías** (17 comunidades autónomas y 2 ciudades autónomas) organiza esa diversidad. Las tensiones territoriales existen : el referéndum de independencia en Cataluña del 1 de octubre de 2017 fue declarado ilegal. La **«España vaciada»** designa las zonas rurales despobladas del interior. En América Latina, las comunidades indígenas reivindican sus territorios frente a la minería o la deforestación. Las **Malvinas** (Falkland), objeto de la guerra del 2 de abril al 14 de junio de 1982 entre Argentina y Reino Unido, son un símbolo del reclamo territorial argentino.',
    },
    { type: 'h3', text: '2. España : Guerra Civil y franquismo' },
    {
      type: 'p',
      text: 'La **Segunda República** (1931-1936) emprende reformas (voto femenino, reforma agraria, educación). El **17-18 de julio de 1936**, un golpe militar dirigido por varios generales (Mola, Sanjurjo, Franco) provoca una **guerra civil** que dura hasta el **1 de abril de 1939**. Dos bandos : el republicano (apoyado por la URSS y las Brigadas Internacionales) y el sublevado o «nacional» (apoyado por la Alemania nazi y la Italia fascista). Hechos : bombardeo de Gernika (26 de abril de 1937), batalla del Ebro (1938), asesinato de García Lorca (agosto de 1936). Cientos de miles de muertos y unos 450 000 exiliados.',
    },
    {
      type: 'p',
      text: 'La **dictadura de Franco** (1939-1975) se caracteriza por la represión, la censura, el partido único (Falange), el nacionalcatolicismo, la prohibición de las lenguas regionales en la vida pública y la persecución de los vencidos. Franco muere el **20 de noviembre de 1975** ; la **Transición** conduce a la democracia : elecciones de 1977, **Constitución del 6 de diciembre de 1978**, intento de golpe de Estado del 23 de febrero de 1981 (23-F) fracasado. La Transición se apoyó en un «pacto de olvido» y en la **Ley de Amnistía de 1977**.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'La memoria histórica en España',
      content: [
        {
          type: 'list',
          items: [
            '**2000** : Emilio Silva funda la ARMH (Asociación para la Recuperación de la Memoria Histórica) y exhuma una fosa común en Priaranza del Bierzo ; empiezan a abrirse fosas por todo el país.',
            '**2007** : Ley de Memoria Histórica (Ley 52/2007) : reconocimiento de víctimas, retirada de símbolos franquistas.',
            '**24 de octubre de 2019** : exhumación de Franco del Valle de los Caídos y traslado al cementerio de Mingorrubio-El Pardo.',
            '**2022** : Ley de Memoria Democrática (Ley 20/2022) : más derechos para las víctimas, búsqueda de desaparecidos ; el Valle de los Caídos pasa a llamarse **Valle de Cuelgamuros**.',
            'Se estima que aún quedan decenas de miles de personas desaparecidas enterradas en fosas comunes.',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'La literatura y el cine han contribuido a esta memoria : *Soldados de Salamina* (Javier Cercas, 2001), *La lengua de las mariposas* (película de José Luis Cuerda, 1999), *Los girasoles ciegos* (Alberto Méndez, 2004), *El laberinto del fauno* (2006). El poeta **Antonio Machado**, muerto en Collioure el 22 de febrero de 1939, simboliza el exilio.',
    },
    { type: 'h3', text: '3. América Latina : dictaduras y memoria' },
    {
      type: 'table',
      headers: ['País', 'Dictadura', 'Memoria'],
      rows: [
        ['Chile', 'Pinochet : golpe del 11 sept. 1973 contra Salvador Allende (muerte en La Moneda) ; régimen hasta 1990 ; Estadio Nacional, tortura', 'Informe Rettig (1991), Informe Valech (2004) ; Museo de la Memoria y los Derechos Humanos (2010)'],
        ['Argentina', 'Junta militar (Videla) : 24 marzo 1976 – 1983 ; «guerra sucia», vuelos de la muerte ; unos 30 000 desaparecidos según los organismos de derechos humanos', 'Madres (1977) y Abuelas de Plaza de Mayo ; CONADEP, informe Nunca más (1984) ; Juicio a las Juntas (1985) ; ESMA convertida en museo (2004)'],
        ['Uruguay', 'Dictadura cívico-militar 1973-1985', 'Referéndums de 1989 y 2009 mantienen la ley de caducidad'],
        ['Guatemala', 'Guerra civil 1960-1996 ; masacres de poblaciones mayas', 'Comisión para el Esclarecimiento Histórico (1999)'],
        ['Perú', 'Conflicto armado interno (Sendero Luminoso, 1980-2000)', 'Comisión de la Verdad y Reconciliación (2003)'],
        ['Colombia', 'Conflicto armado de más de cincuenta años', 'Acuerdo de paz con las FARC (2016) ; Comisión de la Verdad (2022)'],
      ],
    },
    {
      type: 'p',
      text: 'Los **lugares de memoria** (museos, monumentos, ex centros de detención como la ESMA en Buenos Aires, memoriales) permiten conservar el recuerdo. Las **Abuelas de Plaza de Mayo** buscan a los niños nacidos en cautiverio y apropiados : han recuperado a más de 130 nietos. El **«Nunca más»** es el lema del deber de memoria.',
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Cómo hablar de la memoria (méthode)',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Contexto', text: 'Fechas, régimen, actores.' },
            { title: 'Hechos', text: 'Represión, desapariciones, exilio.' },
            { title: 'Reparación', text: 'Comisiones, leyes, juicios, museos.' },
            { title: 'Debate', text: 'Reconciliación y olvido contra verdad y justicia.' },
            { title: 'Conclusión', text: 'Por qué recordar : para que no se repita.' },
          ],
        },
      ],
    },
    { type: 'h2', text: 'Vocabulario esencial' },
    {
      type: 'keyvalue',
      items: [
        { key: 'la diversidad / diverso', value: 'la diversité / divers' },
        { key: 'la inclusión / incluir', value: 'l’inclusion / inclure' },
        { key: 'el pueblo indígena', value: 'le peuple autochtone' },
        { key: 'la discriminación', value: 'la discrimination' },
        { key: 'la discapacidad', value: 'le handicap' },
        { key: 'la igualdad', value: 'l’égalité' },
        { key: 'el matrimonio igualitario', value: 'le mariage pour tous' },
        { key: 'la lengua cooficial', value: 'la langue co-officielle' },
        { key: 'el territorio', value: 'le territoire' },
        { key: 'el golpe de Estado', value: 'le coup d’État' },
        { key: 'la dictadura / el dictador', value: 'la dictature / le dictateur' },
        { key: 'la guerra civil', value: 'la guerre civile' },
        { key: 'los vencidos / los vencedores', value: 'les vaincus / les vainqueurs' },
        { key: 'el desaparecido', value: 'le disparu' },
        { key: 'la fosa común', value: 'la fosse commune' },
        { key: 'la memoria histórica', value: 'la mémoire historique' },
        { key: 'exhumar / la exhumación', value: 'exhumer / l’exhumation' },
        { key: 'la víctima / el verdugo', value: 'la victime / le bourreau' },
        { key: 'la tortura / torturar', value: 'la torture / torturer' },
        { key: 'el juicio / juzgar', value: 'le procès / juger' },
        { key: 'el olvido', value: 'l’oubli' },
        { key: 'la reconciliación', value: 'la réconciliation' },
      ],
    },
    { type: 'h2', text: 'Expresiones útiles' },
    {
      type: 'table',
      headers: ['Para…', 'Expresiones'],
      rows: [
        ['Situar en el pasado', 'Durante la dictadura… ; tras el golpe de Estado… ; a partir de 1939… ; por aquel entonces…'],
        ['Narrar', 'Pretérito indefinido (hechos) / imperfecto (descripción) : Era 1973 cuando estalló el golpe.'],
        ['Voz pasiva / impersonal', 'Fue detenido… ; se calcula que… ; se estima que… ; se les prohibió…'],
        ['Reivindicar', 'Exigir verdad, justicia y reparación ; luchar por… ; reclamar…'],
        ['Opinar', 'Es un deber de memoria ; hay que recordar para que no se repita ; es imprescindible que + subj.'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Ejemplo de producción escrita (≈ 150 palabras)',
      content: [
        { type: 'p', text: '**Consigna : ¿Por qué es importante recordar el pasado de una dictadura ?**' },
        {
          type: 'p',
          text: 'Considero que recordar el pasado de una dictadura es imprescindible para construir una democracia sólida. En primer lugar, las víctimas y sus familias tienen derecho a la verdad : en Argentina, las Madres de Plaza de Mayo llevan desde 1977 reclamando saber qué ocurrió con sus hijos desaparecidos. En segundo lugar, conocer la historia permite que las nuevas generaciones comprendan el valor de la libertad. En España, la Ley de Memoria Democrática de 2022 pretende reparar a quienes sufrieron la represión franquista y localizar a los desaparecidos. Sin embargo, algunos opinan que reabrir las heridas divide a la sociedad. Aun así, creo que no se trata de buscar venganza, sino de reconocer lo ocurrido. En conclusión, el lema «Nunca más» solo tiene sentido si recordamos.',
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
            '**Date en espagnol** : *el 18 de julio de 1936* (de + année), pas de majuscule sur les mois.',
            '**Indefinido / imperfecto** : *Franco murió en 1975* ; *vivía bajo una dictadura*.',
            '**Desaparecido** ne se traduit pas par « disparu » seulement : en contexte, c’est une victime d’une disparition forcée.',
            '**La guerra civil** : minuscules en général, sauf *Guerra Civil española* quand on la nomme.',
            '**el golpe** (coup d’État) / *la golpe* n’existe pas.',
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'e1-fechas',
      title: 'Repères chronologiques : Espagne',
      difficulty: 1,
      duration: 10,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Associez la date et l’événement : 17 julio 1936 ; 26 abril 1937 ; 1 abril 1939 ; 20 noviembre 1975 ; 6 diciembre 1978. Événements : mort de Franco ; Constitution ; fin de la guerre ; bombardement de Gernika ; début du coup d’État.' },
      ],
      solution: [
        { type: 'list', items: ['17 juillet 1936 : début du coup d’État militaire', '26 avril 1937 : bombardement de Gernika', '1er avril 1939 : fin de la guerre', '20 novembre 1975 : mort de Franco', '6 décembre 1978 : Constitution'] },
      ],
    },
    {
      id: 'e2-america',
      title: 'Repères : dictatures latino-américaines',
      difficulty: 1,
      duration: 10,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Complète : a) Le coup d’État de Pinochet a eu lieu le ___ ; b) En Argentine, la junte prend le pouvoir le ___ ; c) Les Madres de Plaza de Mayo se réunissent depuis ___ ; d) Le rapport de la CONADEP s’intitule ___ .' },
      ],
      solution: [
        { type: 'list', items: ['a) 11 septembre 1973', 'b) 24 mars 1976', 'c) 1977 (30 avril)', 'd) Nunca más (1984)'] },
      ],
    },
    {
      id: 'e3-vocabulario',
      title: 'Vocabulaire de la mémoire',
      difficulty: 1,
      duration: 10,
      tags: ['vocabulario'],
      statement: [
        { type: 'p', text: 'Traduisez en espagnol : a) la fosse commune ; b) le coup d’État ; c) les vaincus ; d) exhumer ; e) le disparu ; f) le devoir de mémoire.' },
      ],
      solution: [
        { type: 'list', items: ['a) la fosa común', 'b) el golpe de Estado', 'c) los vencidos', 'd) exhumar', 'e) el desaparecido', 'f) el deber de memoria'] },
      ],
    },
    {
      id: 'e4-comprension-memoria',
      title: 'Compréhension : loi de mémoire',
      difficulty: 2,
      duration: 20,
      tags: ['comprensión'],
      statement: [
        { type: 'p', text: 'Lee (texte adapté) : «En 2000, un periodista, Emilio Silva, buscó los restos de su abuelo, fusilado en 1936 y enterrado en una fosa en el norte de España. Su iniciativa dio origen a la ARMH. Desde entonces, se han abierto cientos de fosas. En 2007 se aprobó la Ley de Memoria Histórica, y en 2022 una nueva ley amplió los derechos de las víctimas.» Responde : 1) ¿A quién buscaba Emilio Silva ? 2) ¿Qué asociación nació ? 3) ¿Qué leyes se mencionan ? 4) ¿Por qué es importante abrir las fosas ?' },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          'Buscaba los restos de su abuelo, fusilado en 1936.',
          'La Asociación para la Recuperación de la Memoria Histórica (ARMH).',
          'La Ley de Memoria Histórica (2007) y la Ley de Memoria Democrática (2022).',
          'Para que las familias puedan enterrar dignamente a sus muertos, conocer la verdad y reparar a las víctimas.',
        ] },
      ],
    },
    {
      id: 'e5-traduccion',
      title: 'Traduction français → espagnol',
      difficulty: 2,
      duration: 15,
      tags: ['traducción'],
      statement: [
        { type: 'p', text: 'Traduisez : « Pendant la dictature, des milliers de personnes ont été arrêtées et beaucoup ont disparu. Leurs familles ont continué à demander la vérité pendant des décennies. »' },
      ],
      hints: ['« ont été arrêtées » : fueron detenidas (passif) ou se detuvo a… ', '« ont continué à demander » : siguieron pidiendo / continuaron pidiendo (gérondif).'],
      solution: [
        { type: 'p', text: '**Durante la dictadura, miles de personas fueron detenidas y muchas desaparecieron. Sus familias siguieron pidiendo la verdad durante décadas.**' },
        { type: 'p', text: 'Remarque : *seguir + gérondif* = continuer à ; *décadas* → *décadas* (accent) ; *miles de* (sans article).' },
      ],
    },
    {
      id: 'e6-expresion-memoria',
      title: 'Expression écrite : mémoire et réconciliation',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿Hay que olvidar el pasado para reconciliar a un país o, al contrario, recordarlo ? »' },
      ],
      hints: ['Défendez une position nuancée.', 'Exemples : pacto de olvido (1977), Ley 2007/2022, Argentine Nunca más.'],
      solution: [
        { type: 'p', text: 'Pienso que la reconciliación auténtica no puede basarse en el olvido. Es cierto que, durante la Transición española, se optó por un «pacto de olvido» y por la Ley de Amnistía de 1977 para evitar nuevos enfrentamientos, y esa decisión permitió una transición pacífica. Sin embargo, décadas después, miles de familias seguían buscando a sus desaparecidos en fosas comunes. Por eso, las leyes de 2007 y de 2022 reconocieron los derechos de las víctimas. Del mismo modo, en Argentina, el informe Nunca más (1984) y los juicios contra los militares demostraron que la justicia es una condición de la paz. En mi opinión, recordar no significa buscar venganza, sino reconocer el sufrimiento y aprender de él. En definitiva, solo una sociedad que mira su pasado de frente puede construir un futuro en común.' },
      ],
    },
    {
      id: 'e7-inclusion',
      title: 'Expression écrite : inclusion',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿Qué se puede hacer para que la escuela sea más inclusiva ? »' },
      ],
      hints: ['Idées : accessibilité, sensibilisation, langue des signes, mixité.', 'Utilisez habría que / sería necesario que + subjonctif.'],
      solution: [
        { type: 'p', text: 'Para que la escuela sea más inclusiva, habría que actuar en varios frentes. En primer lugar, es necesario que los edificios sean accesibles : rampas, ascensores y material adaptado para los alumnos con discapacidad. Además, sería importante formar a los profesores para que sepan atender a estudiantes con necesidades diferentes. Es más, los programas deberían reflejar la diversidad cultural, lingüística y de género de la sociedad. Por último, hay que luchar contra el acoso escolar mediante la sensibilización. Algunos piensan que estas medidas son costosas ; sin embargo, una escuela que acoge a todos beneficia a todo el mundo. En conclusión, la inclusión no es un favor, sino un derecho : todos los niños merecen aprender juntos y en igualdad.' },
      ],
    },
    {
      id: 'e8-guerra-civil',
      title: 'Synthèse : la Guerra Civil española',
      difficulty: 3,
      duration: 25,
      tags: ['comprensión', 'cultura'],
      statement: [
        { type: 'p', text: 'En español (8-10 líneas), resume las causas, las fechas, los dos bandos y las consecuencias de la Guerra Civil española.' },
      ],
      solution: [
        { type: 'p', text: 'La Guerra Civil española comenzó el 17-18 de julio de 1936 con un golpe militar contra la Segunda República, proclamada en 1931. El país se dividió en dos bandos : los republicanos, apoyados por la Unión Soviética y las Brigadas Internacionales, y los sublevados, liderados por Franco, que recibieron la ayuda de la Alemania nazi y de la Italia fascista. Hubo episodios muy graves, como el bombardeo de Gernika en 1937. La guerra terminó el 1 de abril de 1939 con la victoria de Franco, que instauró una dictadura hasta su muerte en 1975. Hubo cientos de miles de muertos, represión y unos 450 000 exiliados. Todavía hoy, las leyes de memoria intentan reparar a las víctimas.' },
      ],
    },
  ],

  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1931', title: 'Segunda República' },
        { date: '1936', title: 'Golpe militar y Guerra Civil' },
        { date: '1939', title: 'Victoria de Franco ; exilio' },
        { date: '1973', title: 'Golpe de Estado de Pinochet' },
        { date: '1975', title: 'Muerte de Franco' },
        { date: '1976', title: 'Golpe militar en Argentina' },
        { date: '1978', title: 'Constitución española' },
        { date: '1984', title: 'Informe Nunca más' },
        { date: '2007', title: 'Ley de Memoria Histórica' },
        { date: '2019', title: 'Exhumación de Franco' },
        { date: '2022', title: 'Ley de Memoria Democrática' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '¿Cuándo terminó la Guerra Civil española ?', choices: ['1936', '1939', '1945', '1975'], answer: 1 },
        { question: '¿Quién fue el primer presidente indígena de Bolivia ?', choices: ['Evo Morales', 'Hugo Chávez', 'Benito Juárez', 'Salvador Allende'], answer: 0 },
        { question: '¿Qué país legalizó primero el matrimonio igualitario en América Latina ?', choices: ['México', 'Chile', 'Argentina', 'Cuba'], answer: 2, explanation: 'Argentina, en 2010.' },
        { question: '¿Qué año se aprobó la primera Ley de Memoria Histórica ?', choices: ['1977', '1995', '2007', '2022'], answer: 2 },
        { question: '¿Qué ocurrió el 11 de septiembre de 1973 ?', choices: ['Golpe en Argentina', 'Golpe de Pinochet en Chile', 'Muerte de Franco', 'Revolución cubana'], answer: 1 },
        { question: '¿Cómo se llama el informe argentino de 1984 ?', choices: ['Informe Rettig', 'Nunca más', 'Valech', 'Verdad y reconciliación'], answer: 1 },
        { question: '¿En qué año murió Franco ?', choices: ['1969', '1975', '1978', '1981'], answer: 1 },
        { question: '¿Qué asociación española nació en 2000 para abrir fosas comunes ?', choices: ['ONCE', 'ARMH', 'PAH', 'CONADEP'], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'la discapacidad', back: 'le handicap' },
        { front: 'el pueblo indígena', back: 'le peuple autochtone' },
        { front: 'la igualdad', back: 'l’égalité' },
        { front: 'el golpe de Estado', back: 'le coup d’État' },
        { front: 'la dictadura', back: 'la dictature' },
        { front: 'los vencidos', back: 'les vaincus' },
        { front: 'el desaparecido', back: 'le disparu' },
        { front: 'la fosa común', back: 'la fosse commune' },
        { front: 'exhumar', back: 'exhumer' },
        { front: 'la verdad, la justicia, la reparación', back: 'vérité, justice, réparation' },
        { front: 'el olvido', back: 'l’oubli' },
        { front: 'el juicio', back: 'le procès' },
        { front: 'el verdugo', back: 'le bourreau' },
        { front: 'el exilio', back: 'l’exil' },
        { front: 'el territorio', back: 'le territoire' },
        { front: 'la lengua cooficial', back: 'la langue co-officielle' },
        { front: 'la España vaciada', back: 'zones rurales dépeuplées d’Espagne' },
        { front: 'Nunca más', back: 'Plus jamais ça : lema de la memoria argentina' },
      ],
    },
    {
      type: 'ordering',
      title: 'Ordena cronológicamente',
      items: [
        'Proclamación de la Segunda República (1931)',
        'Golpe militar y comienzo de la Guerra Civil (1936)',
        'Muerte de Franco (1975)',
        'Constitución democrática (1978)',
        'Ley de Memoria Histórica (2007)',
        'Exhumación de Franco (2019)',
      ],
    },
    {
      type: 'matching',
      title: 'País y dictadura / memoria',
      pairs: [
        { left: 'Chile', right: 'Pinochet (1973-1990), Informe Rettig' },
        { left: 'Argentina', right: 'Videla (1976-1983), Nunca más' },
        { left: 'España', right: 'Franco (1939-1975), Ley de Memoria Democrática' },
        { left: 'Guatemala', right: 'Guerra civil 1960-1996, Rigoberta Menchú' },
        { left: 'Colombia', right: 'Acuerdo de paz con las FARC (2016)' },
        { left: 'Bolivia', right: 'Estado Plurinacional (2009)' },
      ],
    },
    {
      type: 'cloze',
      title: 'Completa',
      text: 'La Guerra Civil empezó en {{1936}} y terminó en {{1939}}. Franco murió el 20 de {{noviembre}} de 1975. En Argentina, las Madres de Plaza de {{Mayo}} reclaman saber qué pasó con los {{desaparecidos}}.',
    },
    {
      type: 'truefalse',
      title: 'Verdadero o falso',
      statements: [
        { text: 'España legalizó el matrimonio igualitario en 2005.', answer: true },
        { text: 'Evo Morales es el presidente de Chile.', answer: false, explanation: 'Fue presidente de Bolivia (2006-2019).' },
        { text: 'El Valle de los Caídos se llama hoy Valle de Cuelgamuros.', answer: true },
        { text: 'Pinochet derrocó a Videla en 1973.', answer: false, explanation: 'Pinochet derrocó a Allende ; Videla es argentino.' },
      ],
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'es', verb: 'recordar' },
      title: 'Conjuguer : recordar',
      caption: 'Révisez indefinido et imperfecto pour narrer le passé : morir, desaparecer, huir.',
    },
  ],
}

export default chapter
