import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'methodologie',
  subject: 'anglais',
  order: 6,
  title: 'Méthodologie',
  theme: 'Méthodologie',
  summary: 'Compréhension écrite et orale, expression écrite (essay, article, letter), expression orale, connecteurs logiques, évaluations, erreurs fréquentes et faux amis.',
  duration: '3 semaines',
  objectives: [
    'Repérer les informations d’un document écrit ou oral (skimming, scanning, repérage des mots-clés)',
    'Rédiger un essay argumenté structuré, un article et une lettre adaptés à leur destinataire',
    'S’exprimer à l’oral en continu et en interaction, en gérant les hésitations',
    'Utiliser les connecteurs logiques pour structurer un discours',
    'Connaître le format des évaluations du cycle terminal et du contrôle continu',
    'Éviter les erreurs fréquentes des francophones et les faux amis',
  ],
  keywords: ['compréhension', 'expression écrite', 'essay', 'article', 'letter', 'expression orale', 'connecteurs', 'faux amis', 'contrôle continu'],
  fiche: [
    { type: 'h2', text: 'Compréhension : trois lectures' },
    {
      type: 'steps',
      items: [
        { title: 'Skimming', text: 'Survol rapide : titre, sous-titres, premier et dernier paragraphes, source, date. Question : de quoi parle le document, à qui s’adresse-t-il ?' },
        { title: 'Scanning', text: 'Recherche ciblée d’un chiffre, d’un nom, d’une date, à partir des mots-clés de la question.' },
        { title: 'Lecture détaillée', text: 'Lire la phrase entière autour de l’information trouvée. Ne traduis pas mot à mot : cherche le sens global.' },
      ],
    },
    { type: 'h2', text: 'Connecteurs logiques' },
    {
      type: 'table',
      headers: ['Fonction', 'Connecteurs'],
      rows: [
        ['Addition', 'moreover, furthermore, in addition, also, besides'],
        ['Opposition', 'however, nevertheless, on the other hand, whereas, although'],
        ['Cause', 'because, since, as, due to, owing to'],
        ['Conséquence', 'therefore, as a result, consequently, so, thus'],
        ['Exemple', 'for instance, for example, such as, namely'],
        ['Conclusion', 'in conclusion, to sum up, overall, all in all'],
      ],
    },
    { type: 'h2', text: 'Expression écrite' },
    {
      type: 'list',
      items: [
        '**Essay** : introduction (accroche, contextualisation, problématique, annonce du plan), 2 ou 3 paragraphes argumentés (idée + exemple + lien), conclusion (réponse à la problématique + ouverture).',
        '**Article** : titre accrocheur, sous-titres, ton adapté au lectorat, questions rhétoriques, citations.',
        '**Letter** : formel → *Dear Sir or Madam* … *Yours faithfully* (si nom inconnu) / *Dear Mr Smith* … *Yours sincerely* ; informel → *Dear Tom* … *Best wishes*.',
      ],
    },
    { type: 'h2', text: 'Expression orale' },
    {
      type: 'list',
      items: [
        'Prépare un plan en trois ou quatre points et une introduction mémorisée.',
        'Gagne du temps avec des marqueurs : *Well…, Let me think…, That’s an interesting question.*',
        'Si un mot manque, contourne-le (« the thing you use to open a bottle » pour *corkscrew*).',
        'Articule les terminaisons : -ed (/t/, /d/, /ɪd/) et -s (/s/, /z/, /ɪz/).',
      ],
    },
    { type: 'h2', text: 'Évaluations' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À vérifier sur Éduscol',
      content: [
        { type: 'p', text: 'Le contrôle continu de Première et les épreuves terminales (écrit et oral) suivent des modalités publiées chaque année au Bulletin officiel. Durées, coefficients et formats exacts doivent être vérifiés sur Éduscol avant chaque examen.' },
      ],
    },
    { type: 'h2', text: 'Erreurs et faux amis' },
    {
      type: 'table',
      headers: ['Faux ami', 'Signifie en anglais', 'Pour dire en français'],
      rows: [
        ['actually', 'en fait, en réalité', 'actuellement = currently, at present'],
        ['eventually', 'finalement, à la fin', 'éventuellement = possibly, if necessary'],
        ['library', 'bibliothèque', 'librairie = bookshop'],
        ['sensible', 'raisonnable', 'sensible = sensitive'],
        ['assist', 'aider', 'assister à = attend'],
        ['location', 'lieu, emplacement', 'location (logement) = rental / rent'],
        ['college', 'établissement d’enseignement supérieur', 'collège = secondary school (lower)'],
        ['pain', 'douleur', 'peine = sorrow, trouble'],
      ],
    },
  ],
  cours: [
    { type: 'h2', text: '1. Compréhension écrite' },
    {
      type: 'p',
      text: 'La compréhension écrite demande de **repérer** et **inférer**. Avant de lire, identifie le **type de document** (article de presse, lettre, publicité, extrait de roman), sa **source**, sa **date** et son **destinataire**. Lis ensuite les questions : elles guident ta recherche.',
    },
    {
      type: 'list',
      items: [
        '**Repérage de l’information** : une question sur « what, when, who, how many » appelle une réponse littérale, souvent reformulée dans le texte (synonymes, paraphrases).',
        '**Inférence** : une question sur « why » ou « what can we infer » demande de relier plusieurs indices.',
        '**Mots inconnus** : ne traduis pas tout. Devine le sens grâce à la racine, au contexte et au mot de liaison (*however* indique un contraste).',
        '**Réponse** : réponds en phrases complètes, en reprenant la question (*The author thinks that…*).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Piège',
      content: [
        { type: 'p', text: 'Une réponse fausse est souvent une phrase vraie du texte mais qui répond à une autre question. Vérifie toujours le lien avec la question posée.' },
      ],
    },
    { type: 'h2', text: '2. Compréhension orale' },
    {
      type: 'p',
      text: 'À l’oral, tu ne peux pas revenir en arrière. Il faut donc **anticiper** et **prendre des notes** efficaces.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Avant l’écoute', text: 'Lis les questions et les mots-clés. Imagine le vocabulaire probable du thème.' },
        { title: 'Première écoute', text: 'Repère le sujet général (gist) et le type de document : interview, bulletin, reportage.' },
        { title: 'Écoutes suivantes', text: 'Cherche les détails : chiffres, noms, dates. Note des mots-clés, pas des phrases.' },
        { title: 'Vérification', text: 'Relis tes réponses et vérifie qu’elles correspondent bien à ce que tu as entendu.' },
      ],
    },
    {
      type: 'p',
      text: 'Habitue-toi aux différents accents (britannique, américain, australien, indien) en écoutant des podcasts, des bulletins d’information et des vidéos authentiques.',
    },
    { type: 'h2', text: '3. Expression écrite : l’essay argumenté' },
    {
      type: 'p',
      text: 'Un essay répond à une **problématique** par un raisonnement organisé. La clarté du plan compte autant que la langue.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Introduction', text: 'Accroche (fait, citation, question), contextualisation, reformulation de la question, annonce du plan (*This essay will first examine… then…*).' },
        { title: 'Développement', text: 'Un paragraphe par idée : topic sentence, argument, exemple précis, lien avec la thèse. Utilise des connecteurs variés.' },
        { title: 'Conclusion', text: 'Résume les idées principales sans les répéter mot pour mot, réponds clairement à la problématique, ouvre sur une perspective.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple d’introduction',
      content: [
        { type: 'p', text: '*Social media has changed the way young people communicate. While some argue that it isolates them, others believe it creates new opportunities for dialogue. This essay will first examine the risks of online life before considering its benefits.*' },
      ],
    },
    { type: 'h2', text: '4. Article et lettre' },
    {
      type: 'p',
      text: 'Un **article** de presse a un titre accrocheur, des sous-titres et un ton adapté au public (plus familier pour un magazine jeune, plus neutre pour un journal). Une **lettre formelle** commence par la formule d’appel adaptée et l’objet de la lettre est annoncé dès le premier paragraphe : *I am writing to complain about…*',
    },
    {
      type: 'table',
      headers: ['Élément', 'Lettre formelle', 'Lettre informelle'],
      rows: [
        ['Appel', 'Dear Sir or Madam / Dear Mr Smith', 'Dear Tom / Hi Sarah'],
        ['Ouverture', 'I am writing to…', 'How are you? / It was great to hear from you'],
        ['Formule finale', 'Yours faithfully / Yours sincerely', 'Best wishes / Love'],
        ['Registre', 'Phrases complètes, pas de contractions', 'Contractions et expressions familières'],
      ],
    },
    { type: 'h2', text: '5. Expression orale' },
    {
      type: 'p',
      text: 'L’épreuve d’oral évalue l’expression en continu (présentation argumentée d’un document ou d’un sujet) et l’interaction (échange avec l’examinateur). Pour l’**expression en continu**, prépare un plan mental : introduction, deux ou trois arguments, conclusion.',
    },
    {
      type: 'list',
      items: [
        '**Mots de liaison** : *First of all, Furthermore, On the other hand, To conclude*.',
        '**Hésitations** : *Well, let me think, that’s a good point, as far as I know*.',
        '**Interaction** : demande une précision (*Could you repeat that, please?*), reformule ce que tu as compris (*So you mean that…?*).',
        '**Réagir** : *I agree with you to some extent, but…* / *I see your point, however…*',
      ],
    },
    { type: 'h2', text: '6. Connecteurs : fonctions et pièges' },
    {
      type: 'p',
      text: 'Un connecteur doit être choisi en fonction de la **relation logique** entre deux idées, et non de la traduction française.',
    },
    {
      type: 'table',
      headers: ['Relation', 'Connecteur', 'Usage correct', 'Piège'],
      rows: [
        ['Opposition', 'although / though', 'Although it was raining, we went out.', 'Pas de *but* après *although*'],
        ['Opposition', 'however', 'It was raining. However, we went out.', 'Virgule après however'],
        ['Cause', 'because / since / as', 'We stayed because it was late.', 'Pas de *because of* + proposition'],
        ['Cause', 'because of / due to', 'Because of the rain, we stayed.', 'Suivi d’un nom'],
        ['Conséquence', 'so / therefore', 'It was late, so we stayed.', 'Pas de *so that* (but)'],
        ['But', 'in order to / so that', 'We left early in order to catch the train.', 'Pas de *for to*'],
      ],
    },
    { type: 'h2', text: '7. Évaluations : contrôle continu et épreuves terminales' },
    {
      type: 'p',
      text: 'En Première, l’évaluation se fait dans le cadre du **contrôle continu** : écrit et oral sont notés régulièrement. Au cycle terminal, les épreuves finales (écrit et oral) évaluent les compétences de compréhension, d’expression écrite et orale. Le niveau visé suit le **CECRL** (Cadre européen commun de référence pour les langues). Les modalités exactes (durée, consigne, coefficient) sont publiées sur Éduscol.',
    },
    { type: 'h2', text: '8. Erreurs fréquentes des francophones' },
    {
      type: 'table',
      headers: ['Erreur', 'Correction', 'Explication'],
      rows: [
        ['I am agree.', 'I agree.', '*agree* est un verbe, pas un adjectif.'],
        ['I have 20 years.', 'I am 20 years old.', 'On dit *be* + âge, pas *have*.'],
        ['I am living here since 2 years.', 'I have lived here for two years.', 'Durée jusqu’à maintenant : present perfect.'],
        ['informations', 'information', 'Nom indénombrable (pas de pluriel).'],
        ['advices', 'advice', 'Idem : indénombrable.'],
        ['people is', 'people are', '*people* est un pluriel.'],
        ['make a question', 'ask a question', 'Le verbe anglais est *ask*.'],
        ['Its raining.', 'It’s raining.', 'It’s = it is ; its = à lui / à elle.'],
        ['I do a mistake.', 'I make a mistake.', 'Make pour erreur, décision, effort.'],
      ],
    },
    { type: 'h2', text: '9. Faux amis' },
    {
      type: 'p',
      text: 'Les faux amis sont des mots qui se ressemblent en français et en anglais mais ont un sens différent. Retenir la traduction exacte te fera gagner des points à chaque épreuve.',
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'actually', value: 'en fait (et non « actuellement », qui se dit currently)' },
        { key: 'eventually', value: 'finalement (et non « éventuellement », qui se dit possibly)' },
        { key: 'library', value: 'bibliothèque (et non « librairie », qui se dit bookshop)' },
        { key: 'sensible', value: 'raisonnable (et non « sensible », qui se dit sensitive)' },
        { key: 'assist', value: 'aider (et non « assister à », qui se dit attend)' },
        { key: 'location', value: 'lieu (et non « location », qui se dit rental)' },
        { key: 'pain', value: 'douleur (et non « pain », qui se dit bread)' },
      ],
    },
  ],
  exercices: [
    {
      id: 'm-connecteurs',
      title: 'Choisir le bon connecteur',
      difficulty: 1,
      duration: 8,
      tags: ['connecteurs'],
      statement: [
        { type: 'p', text: 'Complète avec le connecteur qui convient à la relation logique entre les deux idées.' },
        {
          type: 'cloze',
          text: 'The film was long; {{however}}, I enjoyed it.\nWe stayed at home {{because}} it was raining.\nIt was late, {{so}} we took a taxi.\n{{Although}} he was tired, he finished the race.\nFor {{example}}, Paris, London and Rome are popular destinations.',
        },
      ],
      hints: [
        'Une opposition appelle however, although. Une cause appelle because ; une conséquence so, therefore.',
        'Un exemple : for example, for instance, such as.',
      ],
      solution: [
        { type: 'p', text: '1. *however* (opposition, précédé d’un point-virgule). 2. *because* (cause). 3. *so* (conséquence). 4. *Although* (concession, suivi d’une proposition). 5. *example* (for example : exemple).' },
      ],
    },
    {
      id: 'm-faux-amis',
      title: 'Faux amis : QCM',
      difficulty: 1,
      duration: 6,
      tags: ['faux amis'],
      statement: [
        {
          type: 'qcm',
          questions: [
            { question: '« Actually, I’m happy with the result. » signifie :', choices: ['actuellement', 'en fait', 'éventuellement', 'réellement'], answer: 1, explanation: 'Actually = en fait, en réalité.' },
            { question: 'Où emprunter des livres ?', choices: ['a bookshop', 'a library', 'a college', 'a pain'], answer: 1, explanation: 'Library = bibliothèque.' },
            { question: '« I want to assist the meeting. » Quel est le bon verbe ?', choices: ['assist', 'attend', 'help', 'listen'], answer: 1, explanation: 'assister à = attend. Assist signifie aider.' },
            { question: 'Comment traduire « une location d’appartement » ?', choices: ['a location', 'a rental', 'a renting place', 'a leasing location'], answer: 1, explanation: 'Une location de logement = a rental (ou a rent).' },
          ],
        },
      ],
      hints: ['Un faux ami a une forme proche du français mais un sens différent.'],
      solution: [
        { type: 'p', text: '1. en fait — 2. a library — 3. attend — 4. a rental.' },
      ],
    },
    {
      id: 'm-erreurs',
      title: 'Corriger les erreurs',
      difficulty: 1,
      duration: 8,
      tags: ['erreurs'],
      statement: [
        {
          type: 'cloze',
          title: 'Choisis la forme correcte',
          text: 'I have some {{information|informations}} about the trip. → (information est indénombrable)\nShe {{gave|gives}} me good advice yesterday. → (prétérit)\nThe people {{are|is}} waiting outside. → (pluriel)\nI {{made|did}} a mistake in my essay. → (make une erreur)',
        },
      ],
      hints: ['Un nom indénombrable ne prend pas de -s.', 'Make pour une erreur, do pour une tâche.'],
      solution: [
        { type: 'p', text: '1. *information* (pas de pluriel). 2. *gave* (prétérit de give). 3. *are* (*people* est pluriel). 4. *made* (*make a mistake*). Le -s est toujours inutile pour *advice*, *information*, *news*.' },
      ],
    },
    {
      id: 'm-compréhension-écrite',
      title: 'Compréhension écrite',
      difficulty: 2,
      duration: 15,
      tags: ['compréhension écrite'],
      statement: [
        {
          type: 'p',
          text: '*Every year, thousands of students in the United Kingdom take a gap year before university. Some travel abroad to learn languages, while others volunteer in local communities. Critics argue that a gap year is an expensive luxury. However, many employers value the independence and maturity that such experiences develop.*',
        },
        { type: 'p', text: '1. Quelle est l’idée principale du texte ?' },
        { type: 'p', text: '2. Quelle critique est formulée contre le gap year ?' },
        { type: 'p', text: '3. Quel mot introduit la réponse à cette critique ? Quelle relation logique exprime-t-il ?' },
      ],
      hints: [
        'Cherche la phrase qui résume le texte, souvent au début ou à la fin.',
        'Un connecteur indique la relation entre deux idées.',
      ],
      solution: [
        { type: 'p', text: '1. Le texte présente le gap year, une année de pause avant l’université, et ses bénéfices.' },
        { type: 'p', text: '2. Les critiques jugent qu’il s’agit d’un luxe coûteux.' },
        { type: 'p', text: '3. *However* introduit une opposition : les employeurs valorisent l’autonomie et la maturité acquises.' },
      ],
    },
    {
      id: 'm-lettre',
      title: 'Écrire une lettre',
      difficulty: 2,
      duration: 20,
      tags: ['expression écrite', 'letter'],
      statement: [
        { type: 'p', text: 'Tu as acheté un téléphone dont l’écran est cassé après une semaine. Écris une lettre formelle au service client (environ 100 mots) pour demander un remplacement. Respecte la structure et les formules de politesse.' },
      ],
      hints: [
        'Commence par Dear Sir or Madam, puis annonce l’objet : I am writing to…',
        'Termine par Yours faithfully, car tu ne connais pas le nom du destinataire.',
      ],
      solution: [
        { type: 'p', text: 'Modèle possible :' },
        {
          type: 'code',
          lang: 'text',
          code: 'Dear Sir or Madam,\n\nI am writing to complain about a smartphone I purchased from your store on 3 March.\nOne week after the purchase, the screen cracked without any impact.\n\nI would therefore like to request a replacement or a full refund.\nI have attached a copy of my receipt and I look forward to your prompt response.\n\nYours faithfully,\n\nLéa Martin',
        },
        { type: 'p', text: 'Points évalués : formule d’appel et de fin cohérentes, objet annoncé dès le début, ton poli, phrases complètes, pas de contractions.' },
      ],
    },
    {
      id: 'm-essay',
      title: 'Plan d’un essay',
      difficulty: 2,
      duration: 12,
      tags: ['essay'],
      statement: [
        { type: 'p', text: 'Sujet : « Should homework be banned? » Remets dans l’ordre les étapes d’un essay argumenté.' },
        {
          type: 'ordering',
          title: 'Ordonne le plan',
          items: [
            'Introduction : hook, context, thesis statement',
            'Body paragraph 1 : first argument with example',
            'Body paragraph 2 : counter-argument and rebuttal',
            'Conclusion : summary and final opinion',
          ],
        },
      ],
      hints: ['Un essay commence par une accroche et finit par une conclusion. L’argument contraire vient avant la réfutation.'],
      solution: [
        { type: 'p', text: 'Introduction → premier argument → contre-argument et réfutation → conclusion. Le plan est bien celui présenté dans le cours.' },
      ],
    },
    {
      id: 'm-oral',
      title: 'Expression orale : réagir',
      difficulty: 2,
      duration: 10,
      tags: ['expression orale'],
      statement: [
        { type: 'p', text: 'Ton interlocuteur dit : « Social networks are useful for learning. » Tu n’es pas d’accord. Choisis la réponse la plus adaptée à un échange oral.' },
        {
          type: 'qcm',
          questions: [
            { question: 'Réponse la plus adaptée ?', choices: ['No, you are wrong.', 'I see your point, but I think they can also distract students.', 'Yes, I am agree.', 'Social networks is useful.'], answer: 1, explanation: 'Reconnaître l’argument puis nuancer est la stratégie la plus efficace à l’oral.' },
            { question: 'Tu ne trouves pas le mot « corkscrew ». Que fais-tu ?', choices: ['Tu parles en français.', 'Tu te tais.', 'Tu contournes : the thing you use to open a bottle.', 'Tu inventes un mot.'], answer: 2, explanation: 'La périphrase permet de garder le fil de l’échange.' },
          ],
        },
      ],
      hints: ['Un désaccord poli passe par une reconnaissance puis une nuance.'],
      solution: [
        { type: 'p', text: '1. La réponse nuancée. 2. La périphrase.' },
      ],
    },
    {
      id: 'm-article',
      title: 'Article de presse',
      difficulty: 2,
      duration: 20,
      tags: ['article', 'expression écrite'],
      statement: [
        { type: 'p', text: 'Rédige le début d’un article (environ 80 mots) pour un magazine de lycéens intitulé « Is Homework Still Useful? ». Donne un titre accrocheur, un sous-titre et une accroche.' },
      ],
      hints: [
        'Une question dans le titre attire le lecteur.',
        'Une accroche peut commencer par une anecdote ou une statistique.',
      ],
      solution: [
        { type: 'p', text: 'Modèle : **Is Homework Still Worth the Effort?** *Students spend an average of two hours a night on assignments. But does all this work really help?* Ce début utilise une question de titre, un sous-titre qui annonce le sujet et une accroche chiffrée. Le registre reste simple et direct pour un lectorat jeune.' },
      ],
    },
    {
      id: 'm-bac-synthese',
      title: 'Type bac : synthèse écrite',
      difficulty: 3,
      duration: 30,
      tags: ['bac', 'synthèse'],
      statement: [
        { type: 'p', text: 'Lis le document (extrait fictif) puis réponds en anglais.' },
        {
          type: 'p',
          text: '*Public transport is cheaper, cleaner and safer than private cars. Nevertheless, many commuters refuse to leave their cars at home, because buses are often late and crowded. Cities that want to change this habit must invest in reliable services, although such investments are expensive.*',
        },
        { type: 'p', text: 'a) Summarise the main idea in two sentences.' },
        { type: 'p', text: 'b) Explain the logical relation expressed by « because » and « although ».' },
        { type: 'p', text: 'c) Write a short paragraph (60 to 80 words) giving your own opinion, using at least three connectors.' },
      ],
      hints: [
        'Une synthèse reformule sans recopier : évite les phrases exactes du texte.',
        'Pour ton opinion, utilise une structure : In my view… / Although… / Therefore…',
      ],
      solution: [
        { type: 'p', text: 'a) *The text argues that public transport has clear advantages, but that people still prefer cars because of poor reliability. Cities must therefore invest, despite the cost.*' },
        { type: 'p', text: 'b) *Because* indique la cause (les bus sont en retard et bondés) ; *although* exprime la concession (les investissements coûtent cher, mais sont nécessaires).' },
        { type: 'p', text: 'c) Modèle : *In my view, public transport should be the priority. Although the cost of new lines is high, the long-term benefits for health and pollution are considerable. Therefore, local governments should act now.*' },
      ],
    },
  ],
  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'actually', back: 'en fait, en réalité (et non « actuellement » = currently)' },
        { front: 'eventually', back: 'finalement (et non « éventuellement » = possibly)' },
        { front: 'college (en GB)', back: 'établissement d’enseignement supérieur (collège = secondary school)' },
        { front: 'Dear Sir or Madam ↔ formule finale', back: 'Yours faithfully' },
        { front: 'Dear Mr Smith ↔ formule finale', back: 'Yours sincerely' },
        { front: 'however', back: 'opposition : it was late. However, we stayed.' },
        { front: 'therefore', back: 'conséquence : it was late, therefore we took a taxi.' },
        { front: 'for instance', back: 'exemple' },
        { front: 'skimming', back: 'survol rapide pour comprendre le sujet général' },
        { front: 'scanning', back: 'recherche ciblée d’une information précise' },
      ],
    },
    {
      type: 'matching',
      title: 'Fonction des connecteurs',
      pairs: [
        { left: 'moreover', right: 'addition' },
        { left: 'nevertheless', right: 'opposition' },
        { left: 'as a result', right: 'conséquence' },
        { left: 'for instance', right: 'exemple' },
        { left: 'to sum up', right: 'conclusion' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Dans une lettre formelle, on écrit Dear Tom.', answer: false, explanation: 'Dear Tom est informel. Formel : Dear Sir or Madam ou Dear Mr Smith.' },
        { text: 'Information est un nom indénombrable.', answer: true, explanation: 'Pas de pluriel en -s.' },
        { text: 'Actually signifie « actuellement ».', answer: false, explanation: 'Actually = en fait. Actuellement = currently.' },
        { text: 'Un essay doit répondre à une problématique dans sa conclusion.', answer: true, explanation: 'La conclusion répond à la problématique posée en introduction.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Expression orale',
      text: 'Well, let me {{think}}. That’s a good {{question|point}}. {{On the other hand}}, I believe that {{homework}} can be useful if it is not too long.',
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'en' },
      title: 'Conjugueur interactif',
      caption: 'Révise les temps et les verbes irréguliers avant tes évaluations.',
    },
  ],
}

export default chapter
