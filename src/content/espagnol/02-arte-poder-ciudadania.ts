import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'arte-poder-ciudadania',
  subject: 'espagnol',
  order: 2,
  title: 'Arte y poder · Ciudadanía y mundos virtuales',
  theme: 'Ejes 3 y 4',
  summary:
    'L’art comme pouvoir, contre-pouvoir et mémoire (Goya, Picasso, muralisme, chanson engagée) ; citoyenneté, réseaux sociaux, mobilisations et désinformation dans le monde hispanique.',
  duration: '4 semaines',
  objectives: [
    'Analyser une œuvre d’art (tableau, chanson, film) comme instrument de pouvoir ou de contestation.',
    'Connaître les repères : Goya, Picasso, muralisme, Víctor Jara, Botero, El Sistema.',
    'Employer le lexique de la citoyenneté, du vote, du numérique et de la désinformation.',
    'Débattre des opportunités et des dangers du monde virtuel pour la participation citoyenne.',
    'Rédiger un texte d’opinion structuré avec exemples datés.',
  ],
  keywords: ['arte', 'poder', 'Guernica', 'muralismo', 'canción protesta', 'ciudadanía', 'redes sociales', 'bulos'],

  fiche: [
    { type: 'h2', text: 'Eje 3 · Arte y poder' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿El arte sirve al poder o lo cuestiona ?',
            '¿Puede el arte cambiar la sociedad ?',
            '¿Cómo los regímenes autoritarios utilizan o censuran la cultura ?',
            '¿El mecenazgo es una forma de dominación o de apoyo a la creación ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Artista / obra', 'Fecha', 'Idea clave'],
      rows: [
        ['Velázquez, Las Meninas', '1656', 'El pintor de corte se autorretrata junto a la familia de Felipe IV : reflexión sobre el poder y el estatus del artista'],
        ['Goya, El 3 de mayo de 1808', '1814', 'Fusilamientos de españoles por las tropas napoleónicas : el pueblo como héroe y víctima'],
        ['Goya, Los desastres de la guerra', '1810-1815', 'Serie de grabados contra la violencia de la guerra'],
        ['Picasso, Guernica', '1937', 'Denuncia del bombardeo de Gernika (26 de abril de 1937) ; en Madrid (Reina Sofía) desde 1981-1992'],
        ['Muralismo mexicano', '1920-1950', 'Rivera, Orozco, Siqueiros : arte público para educar al pueblo'],
        ['Víctor Jara', '1932-1973', 'Cantautor chileno asesinado tras el golpe del 11 de septiembre de 1973'],
        ['Botero, serie Abu Ghraib', '2005', 'El artista colombiano denuncia las torturas en una cárcel iraquí'],
      ],
    },
    { type: 'h2', text: 'Eje 4 · Ciudadanía y mundos virtuales' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problemáticas clave',
      content: [
        {
          type: 'list',
          items: [
            '¿Internet es una herramienta de participación ciudadana o de manipulación ?',
            '¿Cómo proteger la libertad de expresión y los datos personales ?',
            '¿Quién es ciudadano en el mundo virtual ?',
            '¿La brecha digital crea nuevas desigualdades ?',
          ],
        },
      ],
    },
    {
      type: 'table',
      headers: ['Fecha', 'Hecho'],
      rows: [
        ['1 enero 1994', 'El EZLN (Chiapas) se da a conocer y utiliza internet para difundir su mensaje'],
        ['1931', 'La Constitución republicana española reconoce el voto de las mujeres (Clara Campoamor) ; primeras elecciones con voto femenino : 1933'],
        ['6 diciembre 1978', 'Referéndum de la Constitución española'],
        ['2011', '15-M en España, primavera árabe : redes sociales y movilización'],
        ['2012', 'Movimiento #YoSoy132 (México)'],
        ['2015', '#NiUnaMenos (Argentina, 3 de junio)'],
        ['2018', 'Entra en aplicación el RGPD europeo (protección de datos)'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode — analyser une œuvre',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Présenter : auteur, titre, date, support, contexte historique.',
            'Décrire : composition, personnages, couleurs, lumière.',
            'Interpréter : message politique, symboles.',
            'Conclure : le pouvoir de l’art — dénoncer, mémoire, propagande.',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Eje 3 · Arte y poder' },
    {
      type: 'p',
      text: 'Desde siempre, el poder (reyes, Iglesia, Estados) ha utilizado el arte para afirmar su prestigio : retratos reales, monumentos, arquitectura religiosa. Pero los artistas también han empleado su obra para **cuestionar** o **denunciar**. El arte puede ser instrumento de propaganda, de resistencia, de memoria.',
    },
    { type: 'h3', text: '1. Pintores y poder : de Velázquez a Picasso' },
    {
      type: 'p',
      text: '**Diego Velázquez** (1599-1660), pintor de cámara de Felipe IV, pinta *Las Meninas* (1656) : el artista aparece en el cuadro, ante un lienzo gigante, junto a la infanta Margarita ; un espejo refleja a los reyes. Reflexión sobre la mirada, el poder y la dignidad del pintor.',
    },
    {
      type: 'p',
      text: '**Francisco de Goya** (1746-1828) pinta *El 2 de mayo de 1808* y *El 3 de mayo de 1808* (1814) tras la invasión napoleónica. En *El 3 de mayo*, un soldado francés, anónimo, dispara contra un hombre de camisa blanca con los brazos abiertos, iluminado por un farol : la víctima se vuelve símbolo de todo un pueblo. Sus grabados *Los desastres de la guerra* (1810-1815) muestran la crueldad sin héroes. Goya murió exiliado en Burdeos en 1828.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Guernica de Picasso (1937)',
      content: [
        {
          type: 'p',
          text: 'El 26 de abril de 1937, durante la Guerra Civil, la aviación alemana (Legión Cóndor), aliada de Franco, bombardea la ciudad vasca de Gernika. El Gobierno de la República encarga a **Pablo Picasso** un gran mural para el pabellón español de la Exposición Internacional de París (1937). El cuadro, en blanco, negro y gris, muestra un toro, un caballo herido, una madre con su hijo muerto, una bombilla-ojo. No representa ningún avión : es un símbolo universal del horror de la guerra. Picasso pidió que no volviera a España hasta el restablecimiento de la democracia : llegó en **1981** y desde 1992 se expone en el Museo Reina Sofía de Madrid.',
        },
      ],
    },
    { type: 'h3', text: '2. El muralismo mexicano' },
    {
      type: 'p',
      text: 'Tras la Revolución mexicana (1910-1920), el ministro José Vasconcelos impulsa un arte público para educar a un pueblo mayoritariamente analfabeto. **Diego Rivera** (historia de México en el Palacio Nacional), **José Clemente Orozco** y **David Alfaro Siqueiros** pintan murales con mensajes sociales y políticos. En 1933, el mural de Rivera para el Rockefeller Center de Nueva York fue destruido (1934) porque incluía un retrato de Lenin : el poder económico censuró al artista.',
    },
    { type: 'h3', text: '3. La canción comprometida' },
    {
      type: 'p',
      text: 'En América Latina, la **Nueva Canción** (años 1960-1970) mezcla folclore y compromiso político. **Violeta Parra** (Chile, 1917-1967) es su precursora : *Gracias a la vida* (1966). **Víctor Jara** (1932-1973), cantautor y militante, es detenido tras el golpe de Estado de Pinochet (11 de septiembre de 1973) y asesinado en el Estadio de Chile. **Mercedes Sosa** (Argentina, 1935-2009), «la Negra», se exilió durante la dictadura y regresó en 1982. En España, bajo el franquismo, cantautores como Joan Manuel Serrat o Lluís Llach fueron censurados.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Otros ejemplos',
      content: [
        {
          type: 'list',
          items: [
            '**Fernando Botero** (Colombia, 1932-2023) : volúmenes exagerados ; serie sobre las torturas de Abu Ghraib (2005) y sobre la violencia en Colombia.',
            '**Almodóvar** y la *Movida madrileña* (años 1980) : explosión cultural tras la muerte de Franco.',
            '**Guillermo del Toro**, *El laberinto del fauno* (2006) : un cuento de hadas que denuncia el franquismo (1944).',
            '**El Sistema** (Venezuela, 1975, fundado por José Antonio Abreu) : educación musical gratuita para niños de barrios pobres.',
            '**Arpilleras chilenas** : tapices bordados por mujeres que denunciaban la dictadura.',
          ],
        },
      ],
    },
    { type: 'h3', text: '4. Censura y propaganda' },
    {
      type: 'p',
      text: 'Los regímenes autoritarios controlan la creación : bajo Franco (1939-1975), la censura vigilaba cine, teatro y prensa ; durante las dictaduras del Cono Sur, muchos artistas fueron perseguidos o exiliados. Pero el arte también escapa del control : la poesía de Federico García Lorca, fusilado en 1936 en Granada, es hoy símbolo de la libertad.',
    },
    { type: 'h2', text: 'Eje 4 · Ciudadanía y mundos virtuales' },
    { type: 'h3', text: '1. Ser ciudadano' },
    {
      type: 'p',
      text: 'La **ciudadanía** supone derechos (voto, libertad de expresión, educación) y deberes (respetar la ley, participar). La conquista del voto femenino lo ilustra : en España, la Constitución de 1931 lo reconoce gracias a **Clara Campoamor** ; en Argentina, la ley de 1947 (Eva Perón) ; en Chile, 1949 ; en México, a nivel federal, 1953 ; en Colombia, 1954. La Constitución española de **1978** consagra España como Estado social y democrático de derecho.',
    },
    { type: 'h3', text: '2. Internet, redes y participación' },
    {
      type: 'p',
      text: 'Las redes sociales han permitido nuevas formas de movilización. El **EZLN** (Ejército Zapatista de Liberación Nacional, Chiapas, 1994) fue pionero en usar internet para llamar la atención internacional. El **15-M** (2011), **#YoSoy132** (México, 2012, estudiantes frente a la manipulación mediática), **#NiUnaMenos** (Argentina, 2015) y las protestas chilenas de 2019 se organizaron en gran parte en línea. El *hashtag* se ha convertido en instrumento de visibilidad ; el *activismo digital* o *ciberactivismo* completa la acción en la calle.',
    },
    { type: 'h3', text: '3. Riesgos y desafíos' },
    {
      type: 'list',
      items: [
        '**Desinformación** : los *bulos* (fake news), los *deepfakes*, las campañas de manipulación en elecciones.',
        '**Ciberacoso** y odio en línea, sobre todo entre adolescentes.',
        '**Datos personales** : vigilancia, uso comercial ; el RGPD (2018) y la Ley orgánica española de 2018 protegen a los ciudadanos.',
        '**Brecha digital** : en zonas rurales de América Latina o de la «España vaciada», el acceso a internet es desigual.',
        '**Adicción** a las pantallas, aislamiento, culto a la imagen.',
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Cómo argumentar (debate)',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Tesis', text: 'Afirmar claramente tu posición.' },
            { title: 'Argumento 1 + ejemplo', text: 'Ventaja : movilización (15-M, #NiUnaMenos).' },
            { title: 'Argumento 2 + ejemplo', text: 'Peligro : bulos, ciberacoso, vigilancia.' },
            { title: 'Matizar', text: 'Sin embargo… / Aunque…' },
            { title: 'Concluir', text: 'Propuesta : educación mediática, regulación.' },
          ],
        },
      ],
    },
    { type: 'h2', text: 'Vocabulario esencial' },
    {
      type: 'keyvalue',
      items: [
        { key: 'el cuadro / el lienzo', value: 'le tableau / la toile' },
        { key: 'el mural', value: 'la fresque murale' },
        { key: 'el grabado', value: 'la gravure' },
        { key: 'denunciar', value: 'dénoncer' },
        { key: 'el compromiso / comprometido', value: 'l’engagement / engagé' },
        { key: 'la censura / censurar', value: 'la censure / censurer' },
        { key: 'el poder / el mecenas', value: 'le pouvoir / le mécène' },
        { key: 'el cantautor', value: 'l’auteur-compositeur-interprète' },
        { key: 'el ciudadano', value: 'le citoyen' },
        { key: 'votar / el voto', value: 'voter / le vote' },
        { key: 'las elecciones', value: 'les élections' },
        { key: 'la red social', value: 'le réseau social' },
        { key: 'el bulo / las noticias falsas', value: 'la rumeur infondée / les fake news' },
        { key: 'la brecha digital', value: 'la fracture numérique' },
        { key: 'el ciberacoso', value: 'le cyberharcèlement' },
        { key: 'los datos personales', value: 'les données personnelles' },
        { key: 'la libertad de expresión', value: 'la liberté d’expression' },
        { key: 'el internauta', value: 'l’internaute' },
      ],
    },
    { type: 'h2', text: 'Expresiones útiles' },
    {
      type: 'table',
      headers: ['Para…', 'Expresiones'],
      rows: [
        ['Describir una obra', 'En primer plano… ; al fondo… ; a la izquierda / derecha… ; el pintor representa…'],
        ['Interpretar', 'Este cuadro simboliza… ; da a entender que… ; denuncia…'],
        ['Debatir', 'Estoy a favor / en contra de… ; Por un lado… por otro lado… ; Cabe destacar que…'],
        ['Matizar', 'Hasta cierto punto… ; Todo depende de… ; No hay que generalizar.'],
        ['Proponer', 'Habría que + inf. ; Sería necesario + inf. ; Es fundamental que + subj.'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Ejemplo de producción escrita (≈ 150 palabras)',
      content: [
        { type: 'p', text: '**Consigna : ¿Puede el arte cambiar el mundo ?**' },
        {
          type: 'p',
          text: 'En mi opinión, el arte no puede cambiar el mundo por sí solo, pero sí puede cambiar las conciencias. El Guernica de Picasso, pintado en 1937 para denunciar el bombardeo de una ciudad vasca, se ha convertido en un símbolo universal contra la guerra : se reprodujo en manifestaciones por todo el mundo. Del mismo modo, las canciones de Víctor Jara dieron voz a quienes sufrían la injusticia en Chile, y su asesinato en 1973 lo transformó en mártir de la libertad. Sin embargo, el arte también puede ser manipulado : los regímenes autoritarios lo utilizan como propaganda. Por eso, hay que desarrollar el espíritu crítico. En conclusión, el arte tiene un poder real, aunque limitado : despierta emociones, preserva la memoria y empuja a actuar.',
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
            '**el arte** est masculin au singulier (*el arte*) mais féminin au pluriel (*las artes*).',
            '**la gente / el pueblo** : *el pueblo* = le peuple ou le village.',
            '**Subjonctif après opinion négative** : *No creo que internet sea siempre peligroso.*',
            '**noticia** = nouvelle (information) ; *notas* = notes (scolaires).',
            '**actual** = actuel, *realmente* = vraiment ; *actualmente* = actuellement.',
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'e1-repere-obras',
      title: 'Repères : œuvres et auteurs',
      difficulty: 1,
      duration: 10,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Associez chaque œuvre à son auteur : 1) Las Meninas ; 2) Guernica ; 3) El 3 de mayo de 1808 ; 4) Gracias a la vida ; 5) mural de la historia de México au Palacio Nacional.' },
      ],
      solution: [
        { type: 'list', items: ['1) Velázquez (1656)', '2) Picasso (1937)', '3) Goya (1814)', '4) Violeta Parra (1966)', '5) Diego Rivera'] },
      ],
    },
    {
      id: 'e2-vocabulario',
      title: 'Vocabulaire du numérique',
      difficulty: 1,
      duration: 10,
      tags: ['vocabulario'],
      statement: [
        { type: 'p', text: 'Traduisez en espagnol : a) la fracture numérique ; b) les données personnelles ; c) le cyberharcèlement ; d) les réseaux sociaux ; e) une rumeur infondée (fake news) ; f) l’internaute.' },
      ],
      solution: [
        { type: 'list', items: ['a) la brecha digital', 'b) los datos personales', 'c) el ciberacoso', 'd) las redes sociales', 'e) un bulo / una noticia falsa', 'f) el internauta'] },
      ],
    },
    {
      id: 'e3-guernica',
      title: 'Analyse d’une œuvre : Guernica',
      difficulty: 2,
      duration: 25,
      tags: ['comprensión', 'cultura'],
      statement: [
        { type: 'p', text: 'En español (8-10 líneas), presenta el Guernica : autor, fecha, contexto histórico, elementos del cuadro, mensaje.' },
      ],
      hints: ['Contexte : Guerre civile, 26 avril 1937, Légion Condor, Exposition de Paris.', 'Éléments : taureau, cheval, mère, ampoule, noir/blanc/gris.'],
      solution: [
        { type: 'p', text: 'El Guernica es un cuadro de Pablo Picasso, pintado en 1937 para el pabellón de la República española en la Exposición Internacional de París. Denuncia el bombardeo de la ciudad vasca de Gernika, el 26 de abril de 1937, por la aviación alemana aliada de Franco, durante la Guerra Civil. El cuadro, de grandes dimensiones, está pintado en blanco, negro y gris, lo que refuerza el dramatismo. Se ven un toro, un caballo herido, una madre que llora con su hijo muerto en brazos, un guerrero caído y una bombilla en forma de ojo. No aparecen aviones : Picasso quiso crear un símbolo universal del sufrimiento de los civiles. Hoy el cuadro se expone en el Museo Reina Sofía de Madrid. Es un ejemplo del poder del arte para denunciar la violencia y preservar la memoria.' },
      ],
    },
    {
      id: 'e4-traduccion',
      title: 'Traduction français → espagnol',
      difficulty: 2,
      duration: 15,
      tags: ['traducción'],
      statement: [
        { type: 'p', text: 'Traduisez : « Les réseaux sociaux permettent aux jeunes de s’exprimer librement, mais il faut se méfier des fausses informations. Beaucoup d’entre eux ne vérifient pas leurs sources avant de partager. »' },
      ],
      hints: ['« se méfier de » = desconfiar de ; « vérifier » = comprobar / verificar.', '« beaucoup d’entre eux » = muchos de ellos.'],
      solution: [
        { type: 'p', text: '**Las redes sociales permiten a los jóvenes expresarse con libertad, pero hay que desconfiar de las noticias falsas. Muchos de ellos no comprueban sus fuentes antes de compartir.**' },
        { type: 'p', text: 'Remarque : *permitir a alguien + infinitif*, *hay que + infinitif* = « il faut ».' },
      ],
    },
    {
      id: 'e5-victor-jara',
      title: 'Compréhension : chanson engagée',
      difficulty: 2,
      duration: 20,
      tags: ['comprensión'],
      statement: [
        { type: 'p', text: 'Lee : «Víctor Jara fue un cantautor, director de teatro y militante chileno. Tras el golpe de Estado del 11 de septiembre de 1973, fue detenido y llevado al Estadio de Chile, donde murió asesinado pocos días después. Sus canciones, mezcla de folclore y compromiso social, siguen cantándose en todo el mundo.» Responde : 1) ¿Cuál era su oficio ? 2) ¿Qué ocurrió el 11 de septiembre de 1973 ? 3) ¿Dónde fue llevado ? 4) ¿Qué caracteriza sus canciones ?' },
      ],
      solution: [
        { type: 'list', ordered: true, items: [
          'Era cantautor, director de teatro y militante.',
          'Hubo un golpe de Estado en Chile (el general Pinochet derrocó a Salvador Allende).',
          'Al Estadio de Chile, en Santiago.',
          'Mezclan folclore y compromiso social.',
        ] },
      ],
    },
    {
      id: 'e6-expresion-arte',
      title: 'Expression écrite : l’art engagé',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿Crees que los artistas tienen la responsabilidad de denunciar la injusticia ? Explica tu postura con ejemplos. »' },
      ],
      hints: ['Choisissez : oui / oui mais / non.', 'Exemples : Goya, Picasso, Jara, Botero.'],
      solution: [
        { type: 'p', text: 'Pienso que los artistas no tienen la obligación de denunciar la injusticia, pero muchos eligen hacerlo porque su voz llega lejos. Goya, por ejemplo, con Los desastres de la guerra mostró sin adornos la crueldad de la invasión napoleónica, y Botero denunció en 2005 las torturas de Abu Ghraib. Además, la música de Víctor Jara dio voz a los más humildes en Chile. Sin embargo, el arte también puede ser puramente estético, y eso no lo hace menos valioso. Obligar a un artista a comprometerse sería otra forma de censura. Por consiguiente, creo que lo importante es la libertad de elegir : si el artista decide comprometerse, su obra puede cambiar las conciencias ; si no, también tiene derecho a crear belleza. En definitiva, el arte vive de la libertad.' },
      ],
    },
    {
      id: 'e7-redes',
      title: 'Expression écrite : réseaux sociaux et citoyenneté',
      difficulty: 3,
      duration: 30,
      tags: ['expresión escrita', 'bac'],
      statement: [
        { type: 'p', text: '**Sujet (150 mots)** : « ¿Las redes sociales favorecen la participación ciudadana ? »' },
      ],
      hints: ['Pour : mobilisation (15-M, #NiUnaMenos). Contre : bulos, bulles de filtres.'],
      solution: [
        { type: 'p', text: 'Creo que las redes sociales favorecen la participación ciudadana, siempre que se usen con espíritu crítico. Por un lado, permiten organizar movilizaciones muy rápidamente : el 15-M en España (2011) o #NiUnaMenos en Argentina (2015) nacieron en gran parte en internet. Además, dan voz a personas que no aparecen en los medios tradicionales. Por otro lado, la difusión de bulos y el ciberacoso amenazan el debate democrático. Es más, los algoritmos nos encierran en burbujas de opinión. Por eso, sería necesario reforzar la educación mediática en los colegios y regular a las grandes plataformas. En conclusión, las redes son una herramienta poderosa : depende de nosotros que sirvan a la democracia o que la debiliten.' },
      ],
    },
    {
      id: 'e8-voto-femenino',
      title: 'Repères : conquête du vote féminin',
      difficulty: 2,
      duration: 15,
      tags: ['cultura'],
      statement: [
        { type: 'p', text: 'Associe chaque pays à l’année de reconnaissance du vote féminin : España (Constitución) ; Argentina ; Chile ; México (federal) ; Colombia. Années : 1931, 1947, 1949, 1953, 1954.' },
      ],
      solution: [
        { type: 'list', items: ['España : 1931 (Clara Campoamor ; premier vote féminin en 1933)', 'Argentina : 1947 (ley 13.010)', 'Chile : 1949', 'México : 1953 (réforme constitutionnelle, vote en 1955)', 'Colombia : 1954 (appliqué en 1957)'] },
      ],
    },
  ],

  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1656', title: 'Las Meninas (Velázquez)' },
        { date: '1814', title: 'El 3 de mayo de 1808 (Goya)' },
        { date: '1931', title: 'Voto femenino en España (Constitución)' },
        { date: '1937', title: 'Guernica (Picasso)' },
        { date: '1973', title: 'Golpe de Estado en Chile ; muerte de Víctor Jara' },
        { date: '1994', title: 'Levantamiento zapatista y uso de internet' },
        { date: '2011', title: 'Movimiento 15-M' },
        { date: '2015', title: '#NiUnaMenos' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: '¿Quién pintó Las Meninas ?', choices: ['Goya', 'Velázquez', 'Picasso', 'El Greco'], answer: 1 },
        { question: '¿Qué ciudad fue bombardeada el 26 de abril de 1937 ?', choices: ['Madrid', 'Gernika', 'Barcelona', 'Toledo'], answer: 1 },
        { question: '¿Dónde se expone hoy el Guernica ?', choices: ['Museo del Prado', 'Museo Reina Sofía', 'Museo Guggenheim', 'Museo Picasso de Málaga'], answer: 1 },
        { question: '¿Qué artista colombiano es famoso por sus figuras voluminosas ?', choices: ['Botero', 'Orozco', 'Siqueiros', 'Sorolla'], answer: 0 },
        { question: '¿Quién defendió el voto femenino en las Cortes de 1931 ?', choices: ['Victoria Kent', 'Clara Campoamor', 'La Pasionaria', 'Eva Perón'], answer: 1 },
        { question: '¿Qué es un bulo ?', choices: ['Un impuesto', 'Una noticia falsa', 'Un tipo de música', 'Un programa de televisión'], answer: 1 },
        { question: '¿Qué movimiento nació en Argentina en 2015 contra los feminicidios ?', choices: ['15-M', '#YoSoy132', '#NiUnaMenos', 'Los zapatistas'], answer: 2 },
        { question: '¿Cuál es el proyecto venezolano de educación musical fundado en 1975 ?', choices: ['La Movida', 'El Sistema', 'Nueva Canción', 'Los Panchos'], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'el cuadro', back: 'le tableau' },
        { front: 'el lienzo', back: 'la toile' },
        { front: 'el grabado', back: 'la gravure' },
        { front: 'denunciar', back: 'dénoncer' },
        { front: 'comprometido', back: 'engagé' },
        { front: 'la censura', back: 'la censure' },
        { front: 'el cantautor', back: 'l’auteur-compositeur-interprète' },
        { front: 'el ciudadano', back: 'le citoyen' },
        { front: 'el voto', back: 'le vote' },
        { front: 'el bulo', back: 'la fausse nouvelle, la rumeur' },
        { front: 'la brecha digital', back: 'la fracture numérique' },
        { front: 'el ciberacoso', back: 'le cyberharcèlement' },
        { front: 'los datos personales', back: 'les données personnelles' },
        { front: 'la libertad de expresión', back: 'la liberté d’expression' },
        { front: 'el pabellón', back: 'le pavillon' },
        { front: 'fusilar', back: 'fusiller' },
        { front: 'Guernica', back: '26 avril 1937 ; Picasso ; Reina Sofía' },
        { front: 'Violeta Parra', back: 'Chilienne, Nueva Canción, Gracias a la vida (1966)' },
      ],
    },
    {
      type: 'matching',
      title: 'Artista y obra / dato',
      pairs: [
        { left: 'Velázquez', right: 'Las Meninas (1656)' },
        { left: 'Goya', right: 'El 3 de mayo de 1808' },
        { left: 'Picasso', right: 'Guernica (1937)' },
        { left: 'Víctor Jara', right: 'Cantautor chileno asesinado en 1973' },
        { left: 'Mercedes Sosa', right: 'Cantante argentina de la Nueva Canción' },
        { left: 'Clara Campoamor', right: 'Voto femenino en la Constitución de 1931' },
      ],
    },
    {
      type: 'cloze',
      title: 'Completa',
      text: 'Picasso pintó el {{Guernica}} en {{1937}} para denunciar el {{bombardeo|ataque}} de una ciudad vasca. El cuadro está pintado en {{blanco}}, negro y gris.',
    },
    {
      type: 'truefalse',
      title: 'Verdadero o falso',
      statements: [
        { text: 'Goya pintó El 3 de mayo de 1808 en 1814.', answer: true },
        { text: 'El Guernica se encuentra en el Museo del Prado.', answer: false, explanation: 'Está en el Museo Reina Sofía.' },
        { text: 'El EZLN se dio a conocer en 1994.', answer: true },
        { text: 'El RGPD europeo entró en aplicación en 2018.', answer: true },
      ],
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'es', verb: 'denunciar' },
      title: 'Conjuguer : denunciar',
      caption: 'Révisez aussi expresar, votar, participar au subjonctif présent.',
    },
  ],
}

export default chapter
