import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'metodologia',
  subject: 'espagnol',
  order: 6,
  title: 'Méthodologie de l’espagnol',
  theme: 'Metodología',
  summary: 'Méthodes pour la compréhension écrite et orale, l’expression écrite et orale, les connecteurs, les erreurs fréquentes et les faux amis.',
  duration: '3 semaines',
  objectives: [
    'Repérer la nature, le sujet et les informations clés d’un document écrit ou sonore',
    'Rédiger un texte structuré (courriel formel, paragraphe argumenté, récit) en utilisant des connecteurs adaptés',
    'Préparer et présenter un exposé et répondre à une question en interaction',
    'Identifier et éviter les erreurs fréquentes et les faux amis',
    'Connaître la forme des évaluations du cycle terminal et adapter sa préparation',
  ],
  keywords: ['comprensión', 'expresión escrita', 'expresión oral', 'conectores', 'falsos amigos', 'méthodologie', 'bac'],
  fiche: [
    { type: 'h2', text: 'Compréhension écrite et orale' },
    {
      type: 'steps',
      items: [
        { title: 'Lire le paratexte', text: 'Titre, source, date, auteur, type de document : cela oriente déjà la compréhension.' },
        { title: 'Lire pour le sens global', text: 'Première lecture sans s’arrêter sur les mots inconnus. Qui, quoi, où, quand ?' },
        { title: 'Chercher l’information précise', text: 'Revenir aux questions : repérer les mots-clés, les chiffres, les noms propres.' },
        { title: 'Ne pas traduire mot à mot', text: 'Déduire le sens d’un mot grâce au contexte, à la famille de mots et aux mots transparents.' },
      ],
    },
    { type: 'h2', text: 'Expression écrite' },
    {
      type: 'list',
      items: [
        '**Courriel formel** : formule d’appel (Estimado señor / Estimada señora), présentation (Me dirijo a usted para…), demande polie au conditionnel ou au subjonctif imparfait (Le agradecería que me enviara…), formule finale (Quedo a la espera de su respuesta. Atentamente,).',
        '**Paragraphe argumenté** : introduction (idée + annonce du plan), développement (arguments + exemples), conclusion (synthèse + opinion).',
        '**Connecteurs** : en primer lugar, además, por otro lado, sin embargo, no obstante, por lo tanto, en conclusión.',
      ],
    },
    { type: 'h2', text: 'Expression orale' },
    {
      type: 'list',
      items: [
        '**Exposé** : introduction (Hoy voy a hablar de…), 2 ou 3 parties claires, transitions, conclusion.',
        '**Interaction** : écouter la question jusqu’au bout, demander de répéter (¿Puede repetir, por favor?), gagner du temps (Es una buena pregunta…).',
        '**Préparer** : des notes courtes sur fiches, pas de texte rédigé lu mot à mot.',
      ],
    },
    { type: 'h2', text: 'Erreurs fréquentes et faux amis' },
    {
      type: 'table',
      headers: ['Espagnol', 'Ne pas traduire par', 'Signifie'],
      rows: [
        ['actualmente', 'actuellement', 'en ce moment (actuellement = currently)'],
        ['embarazada', 'embarrassée', 'enceinte'],
        ['éxito', 'exit', 'succès'],
        ['asistir a', 'assister (= aider)', 'assister à (un événement)'],
        ['soportar', 'soutenir (= apoyar)', 'supporter, tolérer'],
        ['sensible', 'sensible (= raisonnable)', 'sensible (émotionnellement)'],
        ['pretender', 'prétendre (= affirmer)', 'avoir l’intention de, chercher à'],
        ['carpeta', 'carpette (= alfombra)', 'dossier, chemise'],
        ['constipado', 'constipé (= estreñido)', 'enrhumé'],
        ['realizar', 'se rendre compte (= darse cuenta)', 'accomplir, réaliser (un projet)'],
      ],
    },
    { type: 'divider' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Réflexe à acquérir',
      content: [
        { type: 'p', text: 'Avant de traduire, demandez-vous : ce mot ressemble-t-il à un mot français avec un sens différent ? Si oui, c’est probablement un faux ami.' },
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Principes généraux de la méthodologie' },
    {
      type: 'p',
      text: 'En langue vivante, on évalue la capacité à **comprendre**, **s’exprimer** et **interagir**. L’objectif n’est pas une connaissance exhaustive du vocabulaire, mais une compréhension du sens et une production claire, correcte et adaptée à la situation de communication.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Les quatre compétences',
      content: [
        {
          type: 'table',
          headers: ['Compétence', 'Activité', 'Clé de réussite'],
          rows: [
            ['Compréhension de l’écrit', 'Lire un document et répondre à des questions', 'Chercher l’information, pas le sens de chaque mot'],
            ['Compréhension de l’oral', 'Écouter un document (une ou plusieurs fois)', 'Noter les mots-clés, les chiffres, les noms propres'],
            ['Expression écrite', 'Rédiger un texte (courriel, paragraphe, récit)', 'Structure, connecteurs, temps verbaux adaptés'],
            ['Expression orale', 'Exposé en continu, puis échange', 'Fluidité, structure, réactivité'],
          ],
        },
      ],
    },
    { type: 'h2', text: '2. Compréhension de l’écrit' },
    { type: 'h3', text: '2.1 Méthode' },
    {
      type: 'steps',
      items: [
        { title: 'Identifier le document', text: 'Type (article, mail, affiche, extrait littéraire), source, date, auteur. Cela suffit parfois à répondre à une question.' },
        { title: 'Lire les questions avant le texte', text: 'Vous savez ainsi quelles informations chercher. Soulignez les mots-clés des questions.' },
        { title: 'Lire le texte pour le sens global', text: 'Première lecture rapide. Identifiez l’idée principale de chaque paragraphe.' },
        { title: 'Répondre précisément', text: 'Repérez le passage de référence, reformulez, ne recopiez pas tout le texte. Vérifiez la cohérence avec la question.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Déduire le sens d’un mot inconnu',
      content: [
        {
          type: 'list',
          items: [
            '**Mots transparents** : universidad, información, problema, música.',
            '**Famille de mots** : conocer (connaître) → conocimiento (connaissance), desconocido (inconnu).',
            '**Contexte** : la phrase autour, la structure grammaticale, les synonymes.',
            '**Préfixes et suffixes** : -dad (-té), -ción (-tion), -mente (-ment), in- / des- (négation).',
          ],
        },
      ],
    },
    { type: 'h3', text: '2.2 Exemple guidé' },
    {
      type: 'quote',
      text: 'Mi nombre es Lucía. Vivo en Sevilla con mis padres y mi hermano. Me encanta la música, sobre todo el flamenco, y toco la guitarra desde hace cinco años. Sin embargo, no me gusta madrugar, así que las clases de la mañana son difíciles para mí.',
    },
    {
      type: 'list',
      items: [
        'Repérer les informations clés : **Sevilla** (lieu), **cinco años** (durée), **guitarra** (instrument).',
        '**Sin embargo** signale une opposition : Lucía aime la musique, mais elle n’aime pas se lever tôt.',
        'Le mot **madrugar** n’est pas compris ? Le contexte (clases de la mañana, difíciles) suggère « se lever tôt ».',
      ],
    },
    { type: 'h2', text: '3. Compréhension de l’oral' },
    {
      type: 'steps',
      items: [
        { title: 'Anticiper', text: 'Lisez attentivement les questions et le titre éventuel. Imaginez le sujet et le vocabulaire probable.' },
        { title: 'Écouter pour le sens global', text: 'Première écoute : identifiez le thème, la situation, les personnes qui parlent.' },
        { title: 'Prendre des notes', text: 'Notez les mots-clés, les chiffres, les heures, les noms propres, en abrégeant. Pas de phrases complètes.' },
        { title: 'Vérifier', text: 'Deuxième écoute pour répondre précisément. Justifiez votre réponse par un élément entendu.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Ce qui fait perdre des points',
      content: [
        {
          type: 'list',
          items: [
            'Vouloir tout comprendre et se bloquer sur un mot.',
            'Répondre avec une information approximative (le chiffre est exact ou faux, pas « à peu près »).',
            'Oublier les négations (no, nunca, ni) et les contrastes (pero, sin embargo, aunque).',
          ],
        },
      ],
    },
    { type: 'h2', text: '4. Expression écrite' },
    { type: 'h3', text: '4.1 Le courriel formel' },
    {
      type: 'table',
      headers: ['Partie', 'Formules utiles'],
      rows: [
        ['Formule d’appel', 'Estimado señor / Estimada señora, (Muy señor mío : très formel, rare)'],
        ['Motif', 'Me dirijo a usted para solicitar información sobre…'],
        ['Demande polie', 'Le agradecería que me enviara el programa. / ¿Podría indicarme…?'],
        ['Remerciements', 'Le agradezco de antemano su atención.'],
        ['Formule finale', 'Quedo a la espera de su respuesta. / Atentamente,'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Registre et temps',
      content: [
        { type: 'p', text: 'Un courriel formel s’écrit avec **usted** (ou **ustedes**), jamais avec **tú**. La demande polie utilise le **conditionnel** (**Me gustaría…**, **¿Podría…?**) ou le **subjonctif imparfait** (**Le agradecería que me enviara…**).' },
      ],
    },
    { type: 'h3', text: '4.2 Le paragraphe argumenté' },
    {
      type: 'steps',
      items: [
        { title: 'Introduction', text: 'Présenter le sujet et votre position : Hoy en día, muchos jóvenes… En mi opinión…' },
        { title: 'Développement', text: 'Deux ou trois arguments, chacun suivi d’un exemple : En primer lugar… Además… Por otro lado…' },
        { title: 'Nuance', text: 'Reconnaître un point de vue opposé : Es cierto que… Sin embargo, creo que…' },
        { title: 'Conclusion', text: 'Résumer et ouvrir : En conclusión, considero que… Por lo tanto…' },
      ],
    },
    { type: 'h3', text: '4.3 Connecteurs' },
    {
      type: 'table',
      headers: ['Fonction', 'Connecteurs'],
      rows: [
        ['Ajouter', 'además, también, asimismo, de igual modo'],
        ['Ordonner', 'en primer lugar, en segundo lugar, por último, finalmente'],
        ['Opposer', 'sin embargo, no obstante, en cambio, por el contrario, mientras que'],
        ['Concéder', 'aunque, a pesar de que, es cierto que'],
        ['Cause et conséquence', 'porque, ya que, por lo tanto, por eso, así que'],
        ['Illustrer, reformuler', 'por ejemplo, es decir, o sea, en otras palabras'],
        ['Conclure', 'en resumen, en conclusión, para terminar'],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Attention au sens',
      content: [
        { type: 'p', text: '**Sin embargo** signifie « cependant » ; **a pesar de que** + indicatif, **aunque** + indicatif ou subjonctif selon le sens. **Mientras que** oppose deux idées (mientras seul marque le temps simultané : mientras estudio…).' },
      ],
    },
    { type: 'h2', text: '5. Expression orale' },
    { type: 'h3', text: '5.1 Exposé en continu' },
    {
      type: 'steps',
      items: [
        { title: 'Préparer le plan', text: 'Trois idées maximum. Pour chacune, un exemple concret et une phrase de transition.' },
        { title: 'Rédiger des notes', text: 'Mots-clés, chiffres, dates sur fiches ou feuille. Pas de texte entier à lire.' },
        { title: 'Présenter', text: 'Introduction (Hoy voy a hablar de…), développement, conclusion (Para terminar…).' },
        { title: 'Parler lentement', text: 'Mieux vaut un discours clair et court qu’un discours rapide avec des erreurs.' },
      ],
    },
    { type: 'h3', text: '5.2 Interaction' },
    {
      type: 'list',
      items: [
        'Écouter la question entière avant de répondre. Demander de répéter : **¿Puede repetir, por favor?**',
        'Gagner du temps : **Es una buena pregunta…**, **Déjeme pensar…**, **Pues…**.',
        'Donner son avis et le justifier : **Creo que…**, **En mi opinión…**, **Porque…**',
        'Exprimer l’accord ou le désaccord : **Estoy de acuerdo.** / **No estoy de acuerdo, porque…**',
      ],
    },
    { type: 'h2', text: '6. Les évaluations du cycle terminal' },
    {
      type: 'p',
      text: 'Les modalités précises (durée, format, coefficients, niveaux visés) évoluent. Consultez toujours les textes en vigueur (Bulletin officiel et Eduscol) et les consignes de votre professeur. En LVB, le niveau visé en fin de cycle terminal est le **B1** du Cadre européen commun de référence (CECRL).',
    },
    {
      type: 'table',
      headers: ['Épreuve', 'Ce qui est évalué', 'Préparation'],
      rows: [
        ['Contrôle continu', 'Compréhension, expression écrite et orale, tout au long de l’année', 'Régularité : petits écrits, oraux réguliers'],
        ['Épreuve écrite terminale', 'Compréhension de documents, production écrite', 'Entraînement sur annales, respect de la durée'],
        ['Épreuve orale terminale', 'Exposé en continu et échange avec l’examinateur', 'Préparer des exposés types, s’entraîner à l’improvisation'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Organiser ses révisions',
      content: [
        {
          type: 'list',
          items: [
            'Apprendre le vocabulaire par thèmes, avec des exemples de phrases.',
            'Réviser les connecteurs et les formules de courriel avant chaque entraînement.',
            'Écouter régulièrement de l’espagnol (podcasts, journaux) pour s’habituer à différents accents.',
          ],
        },
      ],
    },
    { type: 'h2', text: '7. Erreurs fréquentes' },
    {
      type: 'table',
      headers: ['Erreur', 'Correction', 'Explication'],
      rows: [
        ['*Es frío (je suis frileux)', 'Tengo frío.', 'Avoir froid, chaud, faim, peur se dit avec tener.'],
        ['*Soy cansado (je suis fatigué)', 'Estoy cansado.', 'L’état se dit avec estar.'],
        ['*Estoy de médico', 'Soy médico.', 'La profession se dit avec ser.'],
        ['*Yo gusto el café', 'Me gusta el café.', 'Gustar se construit avec un pronom indirect.'],
        ['*Yo he ido ayer', 'Yo fui ayer.', 'Ayer + action achevée : on emploie le prétérit indéfini.'],
        ['*Quiero que tú vienes', 'Quiero que vengas.', 'Après une volonté : subjonctif.'],
      ],
    },
    { type: 'h2', text: '8. Faux amis' },
    {
      type: 'keyvalue',
      items: [
        { key: 'actualmente', value: 'actuellement (en ce moment), jamais « en fait » (en realidad).' },
        { key: 'embarazada', value: 'enceinte, pas embarrassée (avergonzado).' },
        { key: 'éxito', value: 'succès, pas sortie (salida).' },
        { key: 'asistir', value: 'assister à (un événement) ; aider = ayudar.' },
        { key: 'soportar', value: 'supporter, tolérer ; soutenir = apoyar.' },
        { key: 'sensible', value: 'sensible au sens émotionnel ; raisonnable = sensato.' },
        { key: 'pretender', value: 'avoir l’intention de ; prétendre (affirmer) = afirmar.' },
        { key: 'carpeta', value: 'dossier, chemise ; carpette = alfombra.' },
        { key: 'constipado', value: 'enrhumé ; constipé = estreñido.' },
        { key: 'realizar', value: 'accomplir, réaliser (un projet) ; se rendre compte = darse cuenta.' },
      ],
    },
  ],
  exercices: [
    {
      id: 'meth-ex-1',
      title: 'Connecteurs',
      difficulty: 1,
      duration: 8,
      tags: ['conectores'],
      statement: [
        {
          type: 'p',
          text: 'Complétez le paragraphe avec un connecteur adapté.',
        },
        {
          type: 'cloze',
          text: 'El teletrabajo tiene muchas ventajas. {{En primer lugar}}, permite ahorrar tiempo de transporte. {{Además}}, facilita la conciliación de la vida familiar. {{Sin embargo}}, puede aislar a los empleados. {{Por lo tanto}}, es importante mantener el contacto con los compañeros.',
        },
      ],
      solution: [
        { type: 'p', text: 'Les connecteurs ordonnent les arguments (**en primer lugar**), ajoutent un argument (**además**), opposent une idée (**sin embargo**) et introduisent une conséquence (**por lo tanto**).' },
        { type: 'p', text: 'Remarque : **sin embargo** ne sert pas à ajouter un argument favorable ; il introduit une idée contraire.' },
      ],
    },
    {
      id: 'meth-ex-2',
      title: 'Faux amis',
      difficulty: 1,
      duration: 8,
      tags: ['falsos amigos'],
      statement: [
        {
          type: 'qcm',
          questions: [
            {
              question: 'Que signifie « actualmente » ?',
              choices: ['en fait', 'actuellement', 'réellement', 'à ce moment-là'],
              answer: 1,
              explanation: 'actualmente = actuellement. En fait se dit en realidad.',
            },
            {
              question: 'Que signifie « embarazada » ?',
              choices: ['embarrassée', 'enceinte', 'gênée', 'agacée'],
              answer: 1,
              explanation: 'Faux ami : embarazada = enceinte.',
            },
            {
              question: 'Que signifie « asistir a la reunión » ?',
              choices: ['aider à la réunion', 'assister à la réunion', 'attendre la réunion', 'animer la réunion'],
              answer: 1,
              explanation: 'asistir a = assister à. Pour « aider » : ayudar.',
            },
            {
              question: 'Que signifie « me di cuenta de que… » ?',
              choices: ['je me suis rendu compte que…', 'je me suis dit que…', 'j’ai compté que…', 'je suis allé compter que…'],
              answer: 0,
              explanation: 'darse cuenta de = se rendre compte de.',
            },
          ],
        },
      ],
      solution: [
        { type: 'p', text: '1. **actuellement** — 2. **enceinte** — 3. **assister à** — 4. **se rendre compte**.' },
        { type: 'p', text: 'Règle : quand un mot ressemble à un mot français, vérifiez son sens dans le contexte.' },
      ],
    },
    {
      id: 'meth-ex-3',
      title: 'Compréhension écrite : vrai ou faux',
      difficulty: 2,
      duration: 12,
      tags: ['comprensión escrita'],
      statement: [
        {
          type: 'quote',
          text: 'Mi nombre es Lucía. Vivo en Sevilla con mis padres y mi hermano. Me encanta la música, sobre todo el flamenco, y toco la guitarra desde hace cinco años. Sin embargo, no me gusta madrugar, así que las clases de la mañana son difíciles para mí.',
        },
        {
          type: 'truefalse',
          statements: [
            { text: 'Lucía vit à Séville.', answer: true },
            { text: 'Elle joue du piano.', answer: false, explanation: 'Elle joue de la guitare (toco la guitarra).' },
            { text: 'Elle joue de la guitare depuis cinq ans.', answer: true },
            { text: 'Elle aime se lever tôt.', answer: false, explanation: 'No le gusta madrugar : elle n’aime pas se lever tôt.' },
          ],
        },
      ],
      solution: [
        { type: 'p', text: '1. Vrai : « Vivo en Sevilla ». 2. Faux : « toco la guitarra ». 3. Vrai : « desde hace cinco años ». 4. Faux : « no me gusta madrugar ».' },
        { type: 'p', text: 'Méthode : repérer les mots-clés dans les questions, puis chercher le passage correspondant. Le piège est souvent une négation ou un mot proche (piano / guitarra).' },
      ],
    },
    {
      id: 'meth-ex-4',
      title: 'Plan d’un paragraphe argumenté',
      difficulty: 2,
      duration: 10,
      tags: ['expresión escrita', 'argumentación'],
      statement: [
        {
          type: 'p',
          text: 'Remettez dans l’ordre les étapes de la rédaction d’un paragraphe argumenté sur le thème : « Los jóvenes deben estudiar idiomas. ».',
        },
        {
          type: 'ordering',
          items: [
            'Introduction : présenter le sujet et annoncer sa position (En mi opinión, los jóvenes deben estudiar idiomas.)',
            'Premier argument avec exemple (En primer lugar, facilita viajar y trabajar en el extranjero.)',
            'Deuxième argument avec exemple (Además, mejora la capacidad de comunicación.)',
            'Nuance et réfutation (Es cierto que aprender es difícil, sin embargo…)',
            'Conclusion : synthèse et ouverture (En conclusión, considero que…)',
          ],
        },
      ],
      solution: [
        { type: 'p', text: 'L’ordre correct est celui de la liste ci-dessus : introduction, arguments, nuance, conclusion. La nuance peut être placée avant la conclusion pour montrer qu’on a réfléchi aux objections.' },
      ],
    },
    {
      id: 'meth-ex-5',
      title: 'Compréhension orale : prise de notes',
      difficulty: 2,
      duration: 12,
      tags: ['comprensión oral'],
      statement: [
        {
          type: 'p',
          text: 'Un professeur décrit son week-end (texte lu à voix haute) : « El sábado me levanté a las siete para ir a la montaña con mis amigos. Llovió toda la mañana, pero por la tarde salió el sol. Comimos en un restaurante del pueblo y volvimos a casa a las nueve. No fue un día perfecto, pero me divertí mucho. » Répondez par vrai ou faux.',
        },
        {
          type: 'truefalse',
          statements: [
            { text: 'Il s’est levé à sept heures.', answer: true },
            { text: 'Il a plu toute la journée.', answer: false, explanation: 'Il a plu le matin ; l’après-midi, le soleil est revenu (salió el sol).' },
            { text: 'Ils ont mangé dans un restaurant du village.', answer: true },
            { text: 'Il s’est beaucoup amusé.', answer: true },
          ],
        },
      ],
      solution: [
        { type: 'p', text: 'Notes utiles : 7 h, montagne, pluie le matin, soleil l’après-midi, restaurant du pueblo, retour à 21 h, « me divertí mucho ». Les pièges : « toda la mañana » (pas toute la journée), et les heures.' },
      ],
    },
    {
      id: 'meth-ex-6',
      title: 'Expression écrite : courriel formel',
      difficulty: 3,
      duration: 20,
      tags: ['expresión escrita', 'type bac'],
      statement: [
        {
          type: 'p',
          text: 'Rédigez un courriel formel (environ 80 mots) à l’École de langues de Salamanque pour demander des informations sur un cours d’été d’espagnol : dates, prix, niveau requis. Utilisez le vouvoiement (usted) et une formule de politesse finale.',
        },
      ],
      hints: [
        'Commencez par une formule d’appel et une phrase d’introduction avec « Me dirijo a usted para… ».',
        'Utilisez le conditionnel ou le subjonctif imparfait pour formuler vos demandes.',
      ],
      solution: [
        {
          type: 'p',
          text: 'Estimados señores:\n\nMe dirijo a ustedes para solicitar información sobre el curso de verano de español. Me gustaría saber las fechas exactas del curso, el precio y el nivel mínimo requerido.\n\nLe agradecería que me enviara el programa completo y las condiciones de inscripción. ¿Podrían indicarme también si hay alojamiento disponible?\n\nLe agradezco de antemano su atención. Quedo a la espera de su respuesta.\n\nAtentamente,\n[Prénom Nom]',
        },
        {
          type: 'list',
          items: [
            'Formule d’appel adaptée au registre formel.',
            'Demandes polies : Me gustaría (conditionnel), Le agradecería que me enviara (subjonctif imparfait), ¿Podrían…? (conditionnel).',
            'Formule finale : Quedo a la espera de su respuesta. / Atentamente,',
          ],
        },
      ],
    },
    {
      id: 'meth-ex-7',
      title: 'Faux amis et erreurs fréquentes',
      difficulty: 2,
      duration: 8,
      tags: ['errores', 'falsos amigos'],
      statement: [
        {
          type: 'cloze',
          text: 'Yo {{tengo}} frío. Ayer {{fui}} al cine con mi hermana. Mi profesora es {{médica}}, pero hoy {{está}} en el hospital. {{Me gusta}} el café. Quiero que tú {{vengas}} a la fiesta.',
        },
        {
          type: 'p',
          text: 'Complétez les phrases avec la forme correcte (erreurs classiques : avoir froid, passé, profession, gustar, subjonctif).',
        },
      ],
      solution: [
        { type: 'p', text: '1. **tengo** frío (avoir froid = tener). 2. **fui** (ayer + action achevée : indéfini). 3. **es** médica (profession = ser) et **está** (localisation actuelle = estar). 4. **Me gusta** (gustar avec pronom indirect). 5. **vengas** (volonté + sujet différent : subjonctif).' },
      ],
    },
    {
      id: 'meth-ex-8',
      title: 'Expression orale : préparer un exposé',
      difficulty: 3,
      duration: 15,
      tags: ['expresión oral', 'type bac'],
      statement: [
        {
          type: 'p',
          text: 'Vous devez présenter en espagnol, en 3 minutes, « La vida en la ciudad frente a la vida en el campo ». Organisez votre exposé avec les étapes suivantes (remettez-les dans l’ordre) :',
        },
        {
          type: 'ordering',
          items: [
            'Introduction : Hoy voy a hablar de las ventajas y desventajas de vivir en la ciudad o en el campo.',
            'Partie 1 : les avantages de la ville (transports, travail, culture), avec un exemple concret.',
            'Partie 2 : les avantages de la campagne (calme, nature, coût de la vie), avec un exemple concret.',
            'Transition et nuance : Sin embargo, la elección depende de cada persona.',
            'Conclusion : En conclusión, creo que… + ouverture sur votre propre expérience.',
          ],
        },
      ],
      solution: [
        { type: 'p', text: 'Un exposé suit un plan clair : annoncer le sujet, développer deux ou trois parties équilibrées, nuancer, puis conclure. Préparez des notes courtes et entraînez-vous à la transition entre les parties.' },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'actualmente', back: '**actuellement** (en ce moment). Faux ami : en fait = en realidad.' },
        { front: 'embarazada', back: '**enceinte**. Faux ami : embarrassée se dit avergonzado.' },
        { front: 'asistir a', back: '**assister à** un événement. Aider = ayudar.' },
        { front: 'carpeta', back: '**dossier, chemise**. Carpette = alfombra.' },
        { front: 'sensible (faux ami)', back: '**sensible** émotionnellement. Raisonnable = sensato.' },
        { front: 'constipado', back: '**enrhumé**. Constipé = estreñido.' },
        { front: 'Le agradecería que me enviara…', back: 'Formule polie d’un courriel formel : subjonctif imparfait + conditionnel de politesse.' },
        { front: 'Quedo a la espera de su respuesta.', back: 'Formule finale d’un courriel formel : « Je reste dans l’attente de votre réponse. »' },
      ],
    },
    {
      type: 'matching',
      title: 'Connecteurs et fonctions',
      pairs: [
        { left: 'En primer lugar', right: 'Ordonner (premier argument)' },
        { left: 'Además', right: 'Ajouter un argument' },
        { left: 'Sin embargo', right: 'Opposer deux idées' },
        { left: 'Por lo tanto', right: 'Conséquence' },
        { left: 'Por ejemplo', right: 'Illustrer' },
        { left: 'En conclusión', right: 'Conclure' },
      ],
    },
    {
      type: 'cloze',
      title: 'Compléter avec un connecteur',
      text: 'Hay muchas razones para aprender idiomas. {{Por un lado}}, ayuda a viajar. {{Por otro lado}}, abre nuevas oportunidades de trabajo. {{En resumen}}, es una inversión útil.',
    },
    {
      type: 'truefalse',
      title: 'Méthode : vrai ou faux ?',
      statements: [
        { text: 'En compréhension de l’oral, il faut traduire chaque mot pour comprendre le sens.', answer: false, explanation: 'Il faut chercher le sens global et les informations précises, sans traduire mot à mot.' },
        { text: 'Dans un courriel formel, on utilise le tuteo (tú).', answer: false, explanation: 'Le registre formel se fait avec usted / ustedes.' },
        { text: 'Un bon exposé commence par annoncer son plan.', answer: true },
        { text: '« Sensible » en espagnol signifie toujours « raisonnable ».', answer: false, explanation: 'Sensible = sensible (émotionnellement). Raisonnable = sensato.' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quel connecteur convient pour exprimer une opposition ?',
          choices: ['además', 'por lo tanto', 'sin embargo', 'en primer lugar'],
          answer: 2,
          explanation: 'Sin embargo = cependant, il introduit une opposition.',
        },
        {
          question: 'Dans un courriel formel, quelle formule de clôture est correcte ?',
          choices: ['Hasta luego, ¡un abrazo!', 'Quedo a la espera de su respuesta. Atentamente,', 'Nos vemos, tío.', 'Besos y adiós.'],
          answer: 1,
          explanation: 'Le registre formel impose une formule d’attente et une salutation sobre.',
        },
      ],
    },
  ],
}

export default chapter
