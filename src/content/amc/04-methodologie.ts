import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'methodologie',
  subject: 'amc',
  order: 4,
  title: `Méthodologie de la spécialité AMC`,
  theme: 'Méthodologie',
  summary: `Synthèse de documents, traduction, essay, analyse d'images, de caricatures et de graphiques, expression orale : méthodes, connecteurs et vocabulaire de l'analyse.`,
  duration: 'Toute l’année',
  objectives: [
    `Rédiger une synthèse structurée à partir d'un dossier de documents (textes, images, graphiques).`,
    `Traduire (version et thème) en évitant faux amis et calques.`,
    `Rédiger un essay argumenté avec introduction, développement et conclusion.`,
    `Analyser une image, une caricature ou un graphique avec le vocabulaire adapté.`,
    `Présenter et défendre un point de vue à l'oral, en continu puis en interaction.`,
    `Utiliser des connecteurs logiques variés et un vocabulaire de l'analyse précis.`,
  ],
  keywords: ['synthesis', 'essay', 'translation', 'connectors', 'caricature', 'graph', 'oral', 'thesis'],

  /* ------------------------------------------------------------------ */
  fiche: [
    { type: 'h2', text: `Les épreuves en un coup d'œil` },
    {
      type: 'callout', variant: 'remember', title: `À savoir`,
      content: [{ type: 'p', text: `En spécialité LLCER AMC, l'épreuve écrite de terminale repose sur une **synthèse de documents** (dossier de 3 ou 4 documents de nature variée) et un exercice de **traduction ou transposition**. En Première, le travail se fait en **contrôle continu** : on s'entraîne aux mêmes compétences (synthèse, essay, traduction, oral). Vérifiez les modalités exactes auprès de votre professeur et au Bulletin officiel, elles peuvent évoluer.` }],
    },
    {
      type: 'table',
      headers: ['Exercice', 'Objectif', 'Longueur indicative'],
      rows: [
        ['Synthèse', `faire dialoguer les documents autour d'une problématique`, `environ 500 mots`],
        ['Essay', `défendre une thèse argumentée`, `250 à 400 mots`],
        ['Traduction', `restituer le sens avec naturel et précision`, `5 à 8 lignes`],
        ['Oral', `présenter une problématique puis dialoguer`, `5 à 10 min selon l'exercice`],
      ],
    },
    { type: 'h3', text: `Plan type d'une synthèse` },
    {
      type: 'steps',
      items: [
        { title: `Introduction`, text: `Accroche, présentation des documents (nature, source, date), problématique, annonce du plan.` },
        { title: `Partie 1`, text: `Une idée directrice, appuyée par au moins deux documents confrontés.` },
        { title: `Partie 2`, text: `Une seconde idée (nuance, contraste, évolution).` },
        { title: `Conclusion`, text: `Réponse à la problématique, ouverture éventuelle.` },
      ],
    },
    {
      type: 'callout', variant: 'warning', title: `Les 4 erreurs classiques`,
      content: [{
        type: 'list',
        items: [
          `Résumer chaque document **l'un après l'autre** (au lieu de les croiser).`,
          `**Copier** des phrases entières du dossier.`,
          `Donner son opinion alors que l'on demande une synthèse.`,
          `Oublier de **citer** les documents (Document A, line 5 / the graph shows...).`,
        ],
      }],
    },
    { type: 'h3', text: `Connecteurs essentiels` },
    {
      type: 'table',
      headers: ['Fonction', 'Connecteurs'],
      rows: [
        ['Ajouter', `moreover, in addition, furthermore, besides`],
        ['Opposer', `however, whereas, while, yet, nevertheless, on the other hand`],
        ['Causer', `because of, due to, since, as, owing to`],
        ['Conséquence', `therefore, thus, as a result, consequently, so`],
        ['Concéder', `although, even though, despite, in spite of`],
        ['Illustrer', `for instance, for example, such as, as shown by`],
        ['Conclure', `in conclusion, to sum up, all in all`],
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  cours: [
    { type: 'h2', text: `1. La synthèse de documents` },
    { type: 'p', text: `La synthèse n'est ni un résumé ni un commentaire : c'est un **texte nouveau, organisé autour d'une problématique**, qui met les documents **en relation**. On attend de vous de **comprendre**, de **sélectionner**, de **comparer** et de **reformuler**.` },
    {
      type: 'steps',
      items: [
        { title: `1. Lire la consigne`, text: `Elle donne souvent la notion ou la question guide. Soulignez les mots-clés.` },
        { title: `2. Analyser chaque document`, text: `Nature, auteur, date, destinataire, idée principale, ton, point de vue. Pour une image : sujet, composition, message.` },
        { title: `3. Repérer les liens`, text: `Convergences, oppositions, évolutions dans le temps, différences de pays.` },
        { title: `4. Formuler la problématique`, text: `Une question qui engage tous les documents, par ex. "To what extent have the struggles for equality changed over time?"` },
        { title: `5. Construire le plan`, text: `2 ou 3 parties thématiques ou dialectiques. Chaque paragraphe croise au moins deux documents.` },
        { title: `6. Rédiger et relire`, text: `Reformulez, citez brièvement (quelques mots entre guillemets), vérifiez accords, temps et connecteurs.` },
      ],
    },
    { type: 'h3', text: `Introduction modèle` },
    {
      type: 'quote',
      text: `The documents under study, a speech from 1963, an editorial published in 2020 and a graph on wages, all deal with equality in the United States. They raise the following question: to what extent have the fight for equal rights and its results evolved over time? First, we will see that activists have used different forms of protest. Then, we will examine why inequalities have persisted.`,
      source: `Exemple original, introduction de synthèse`,
    },
    {
      type: 'callout', variant: 'tip', title: `Citer sans copier`,
      content: [{ type: 'p', text: `Reformulez avec vos mots (synonymes, changement de structure). Si vous citez, gardez **moins de 5 mots** entre guillemets et précisez la source : *the author describes a "growing gap" (Document B)*.` }],
    },
    {
      type: 'callout', variant: 'example', title: `Juxtaposer ou croiser ?`,
      content: [
        { type: 'p', text: `**À éviter (juxtaposition)** : *Document A says that... Document B says that...*` },
        { type: 'p', text: `**À privilégier (croisement)** : *While Document A insists on the role of peaceful protest, Document B suggests that legal victories were not enough to remove inequality.*` },
      ],
    },

    { type: 'h2', text: `2. La traduction` },
    { type: 'p', text: `On vous demande selon les cas une **version** (anglais vers français) ou un **thème** (français vers anglais). Le but : un texte **fidèle** au sens et **naturel** dans la langue d'arrivée.` },
    {
      type: 'steps',
      items: [
        { title: `Lire le texte en entier`, text: `Comprendre le sujet, le registre, les temps.` },
        { title: `Repérer les pièges`, text: `Faux amis, expressions idiomatiques, verbes à particule, temps (present perfect), articles, ordre des mots.` },
        { title: `Traduire par groupes de sens`, text: `Pas mot à mot : on traduit des idées.` },
        { title: `Relire en français (ou anglais) naturel`, text: `Le résultat doit sonner juste. Aucun mot ne doit rester sans traduction.` },
      ],
    },
    { type: 'h3', text: `Faux amis fréquents` },
    {
      type: 'table',
      headers: ['English', 'Ne veut PAS dire', 'Veut dire'],
      rows: [
        ['actually', `actuellement`, `en fait, à vrai dire (actuellement = currently)`],
        ['to attend', `attendre`, `assister à (attendre = to wait for)`],
        ['eventually', `éventuellement`, `finalement (éventuellement = possibly)`],
        ['a lecture', `une lecture`, `un cours magistral, une conférence (lecture = reading)`],
        ['to pretend', `prétendre`, `faire semblant (prétendre = to claim)`],
        ['sensible', `sensible`, `raisonnable (sensible = sensitive)`],
        ['a library', `une librairie`, `une bibliothèque (librairie = bookshop)`],
        ['to resume', `résumer`, `reprendre (résumer = to sum up)`],
      ],
    },
    { type: 'h3', text: `Points de grammaire sensibles` },
    {
      type: 'table',
      headers: ['Français', 'Anglais', 'Remarque'],
      rows: [
        [`Il habite ici depuis 2010.`, `He has lived here since 2010.`, `depuis + point de départ ou durée : present perfect (since/for)`],
        [`On dit que...`, `It is said that... / People say that...`, `le « on » devient souvent un passif ou "people"`],
        [`Il faut que tu viennes.`, `You must come. / You need to come.`, `pas de subjonctif en anglais courant`],
        [`J'ai vu ce film hier.`, `I saw this film yesterday.`, `marqueur passé précis : preterite`],
        [`Plus on lit, plus on apprend.`, `The more you read, the more you learn.`, `structure comparative parallèle`],
      ],
    },
    {
      type: 'callout', variant: 'warning', title: `Rendre « on » et les passifs`,
      content: [{ type: 'p', text: `*On a construit des écoles* se traduit plutôt *Schools were built* ; à l'inverse, *It was decided that...* devient en français « On a décidé que... ». Ne calquez pas la structure.` }],
    },

    { type: 'h2', text: `3. L'essay` },
    { type: 'p', text: `L'essay est un texte argumenté répondant à une question ou à une affirmation (*Discuss*, *To what extent...*, *Do you agree...*). Il est **structuré** et défend une **thèse**.` },
    {
      type: 'table',
      headers: ['Partie', 'Contenu', 'Exemples de formules'],
      rows: [
        ['Introduction', `accroche, définition des termes, problématique, annonce du plan`, `Nowadays..., It is often said that..., This raises the question of whether...`],
        ['Développement', `2 ou 3 paragraphes : idée, explication, exemple précis (date, fait, chiffre), mini-conclusion`, `Firstly..., Moreover..., For instance..., However...`],
        ['Conclusion', `réponse nette à la question, éventuellement ouverture`, `To sum up..., In conclusion..., It could also be asked whether...`],
      ],
    },
    {
      type: 'callout', variant: 'method', title: `Le paragraphe PEEL`,
      content: [{
        type: 'list',
        items: [
          `**P**oint : l'idée en une phrase (topic sentence).`,
          `**E**vidence : un fait, un exemple, un chiffre (ex. Civil Rights Act, 1964).`,
          `**E**xplanation : pourquoi cet exemple prouve l'idée.`,
          `**L**ink : transition vers la question ou le paragraphe suivant.`,
        ],
      }],
    },
    {
      type: 'callout', variant: 'tip', title: `Donner son opinion`,
      content: [{ type: 'p', text: `In my opinion / As far as I am concerned / I firmly believe that / It seems to me that / I would argue that... Évitez de répéter « I think ». Nuancez : *to some extent, up to a point, it depends on...*` }],
    },

    { type: 'h2', text: `4. Analyser une image, une caricature, un graphique` },
    { type: 'h3', text: `Image / photographie / affiche` },
    {
      type: 'steps',
      items: [
        { title: `Identify`, text: `Nature (photo, poster, painting), source, date, artist, context.` },
        { title: `Describe`, text: `In the foreground / background / on the left / on the right / in the centre; people, objects, colours, caption.` },
        { title: `Interpret`, text: `What message? Which symbols? Which tone (ironic, solemn, hopeful)? Who is the target audience?` },
        { title: `Link`, text: `Connect it to the notion and to a historical fact.` },
      ],
    },
    { type: 'h3', text: `Caricature (cartoon)` },
    {
      type: 'list',
      items: [
        `A **political cartoon** uses **exaggeration**, **symbols**, **irony**, **metaphor** and **caricature** of known figures.`,
        `Decode: who is represented? what do the labels and objects symbolise? what is criticised?`,
        `Say: *The cartoonist ridicules / denounces / mocks / satirises...*`,
        `Ex. : a drawing of a lifeboat labelled "UK" leaving a ship labelled "EU" can denounce, or celebrate, the idea of Brexit depending on who is on the boat.`,
      ],
    },
    { type: 'h3', text: `Graphique et statistiques` },
    {
      type: 'table',
      headers: ['Élément', 'Vocabulaire', 'Exemple'],
      rows: [
        ['Type', `bar chart, pie chart, line graph, table`, `The bar chart compares...`],
        ['Hausse', `to rise, to increase, to soar, to climb, a sharp rise`, `Turnout rose from 59% to 66%.`],
        ['Baisse', `to fall, to drop, to decline, to plummet`, `Unemployment fell slightly.`],
        ['Stabilité', `to remain stable, to level off, to stagnate`, `The figure levelled off after 2010.`],
        ['Proportions', `a majority / a minority, a third, half, nearly, roughly, about`, `Roughly a quarter of respondents...`],
        ['Source', `according to, the survey shows, the data suggest`, `According to the poll...`],
      ],
    },
    {
      type: 'callout', variant: 'warning', title: `Chiffres et nuances`,
      content: [{ type: 'p', text: `Un graphique **montre** des corrélations, pas forcément des causes. Vérifiez l'échelle, la période, la source et l'échantillon avant de conclure. Employez *suggest*, *indicate*, *seem to show* plutôt que *prove*.` }],
    },

    { type: 'h2', text: `5. L'oral` },
    {
      type: 'p',
      text: `À l'oral, on attend une **présentation structurée**, une **prononciation intelligible**, un **lexique varié** et une **réactivité** dans l'échange avec l'examinateur.`,
    },
    {
      type: 'steps',
      items: [
        { title: `Introduce`, text: `Name the document or the notion, present the context, state the issue (problématique).` },
        { title: `Develop`, text: `Two or three points with examples; use signposting (first, then, finally).` },
        { title: `Conclude`, text: `Answer the issue, open the debate.` },
        { title: `Interact`, text: `Listen to the question, rephrase if needed, justify, nuance. Never say "I don't know": say *Let me think about that...* / *I'm not sure, but I would say that...*` },
      ],
    },
    {
      type: 'callout', variant: 'tip', title: `Gagner du temps et de la fluidité`,
      content: [{
        type: 'list',
        items: [
          `Préparez 5 à 6 **exemples précis** par thématique (dates, noms, chiffres).`,
          `Entraînez-vous à voix haute, **chronomètre** en main.`,
          `Utilisez des **fillers** acceptables : *well*, *actually*, *to be honest*, *let me put it this way*.`,
          `Accentuation : attention aux mots-pièges (*photograph* /ˈfəʊtəɡrɑːf/, *democracy* /dɪˈmɒkrəsi/, *Wednesday* /ˈwenzdeɪ/).`,
        ],
      }],
    },

    { type: 'h2', text: `6. Vocabulaire de l'analyse` },
    {
      type: 'keyvalue',
      items: [
        { key: `to highlight / to stress`, value: `souligner, mettre en avant` },
        { key: `to illustrate`, value: `illustrer` },
        { key: `to suggest / to imply`, value: `suggérer, laisser entendre` },
        { key: `to denounce / to criticise`, value: `dénoncer / critiquer` },
        { key: `to claim / to argue / to assert`, value: `prétendre / soutenir / affirmer` },
        { key: `to reveal / to show`, value: `révéler / montrer` },
        { key: `to mock / to ridicule`, value: `se moquer de / ridiculiser` },
        { key: `the tone is ironic / solemn / bitter`, value: `le ton est ironique / solennel / amer` },
        { key: `the author's point of view`, value: `le point de vue de l'auteur` },
        { key: `the target audience`, value: `le public visé` },
        { key: `a theme / an issue / a stake`, value: `un thème / une question / un enjeu` },
        { key: `to contrast with / to echo`, value: `contraster avec / faire écho à` },
      ],
    },
    {
      type: 'callout', variant: 'remember', title: `Les temps de l'analyse`,
      content: [{ type: 'p', text: `On analyse un document au **présent** (*The author denounces...*). On utilise le **prétérit** pour les faits historiques (*King delivered his speech in 1963*) et le **present perfect** pour les effets actuels (*Inequalities have persisted*).` }],
    },
  ],

  /* ------------------------------------------------------------------ */
  exercices: [
    {
      id: 'meth-ex1',
      title: `Choisir le bon connecteur`,
      difficulty: 1,
      duration: 10,
      tags: ['connecteurs'],
      statement: [
        { type: 'p', text: `Choose the best connector: *however / therefore / for instance / despite / moreover / whereas*.` },
        {
          type: 'list', ordered: true,
          items: [
            `Segregation was banned in 1964. ______, inequalities persisted.`,
            `______ the new law, many people still faced discrimination.`,
            `Immigration brings skills. ______, it creates tensions in some places.`,
            `Many countries are diverse. ______, Canada has a multiculturalism policy.`,
            `Document A is optimistic, ______ Document B is critical.`,
            `Turnout was low; ______, the result lacked legitimacy.`,
          ],
        },
      ],
      solution: [
        {
          type: 'list', ordered: true,
          items: [
            `**However** (opposition).`,
            `**Despite** (concession + nom).`,
            `**However** (contraste : les compétences sont un avantage, les tensions un inconvénient).`,
            `**For instance** (illustration).`,
            `**whereas** (contraste dans une même phrase).`,
            `**therefore** (conséquence).`,
          ],
        },
      ],
    },
    {
      id: 'meth-ex2',
      title: `Faux amis : traduire`,
      difficulty: 1,
      duration: 10,
      tags: ['traduction', 'faux amis'],
      statement: [
        { type: 'p', text: `Translate into French, paying attention to the false friends: (1) "She actually works in a library." (2) "He eventually attended the lecture." (3) "They pretended to be sensible." (4) "We are currently studying immigration."` },
      ],
      hints: [`actually = en fait.`, `eventually = finalement.`],
      solution: [
        {
          type: 'list', ordered: true,
          items: [
            `En fait, elle travaille dans une bibliothèque.`,
            `Il a finalement assisté au cours (à la conférence).`,
            `Ils ont fait semblant d'être raisonnables.`,
            `Nous étudions actuellement l'immigration. (*currently*, et non *actually*.)`,
          ],
        },
      ],
    },
    {
      id: 'meth-ex3',
      title: `Décrire un graphique`,
      difficulty: 2,
      duration: 20,
      tags: ['graphique', 'writing'],
      statement: [
        { type: 'p', text: `A fictional survey gives the percentage of young people who voted in general elections. Write 4 or 5 sentences describing it.` },
        {
          type: 'table',
          headers: ['Year', '2005', '2010', '2015', '2020'],
          rows: [['Turnout of 18-24 year-olds', '38%', '44%', '43%', '55%']],
        },
      ],
      hints: [`Identify the trend over the whole period.`, `Give figures for the start and the end.`, `Mention the small dip.`],
      solution: [
        { type: 'p', text: `**Model answer**` },
        { type: 'quote', text: `The table shows the turnout of 18-24 year-olds in general elections between 2005 and 2020. Overall, participation rose significantly, from 38% in 2005 to 55% in 2020. The sharpest increase took place between 2015 and 2020, when turnout climbed by 12 percentage points. There was, however, a slight dip between 2010 and 2015, from 44% to 43%. These figures suggest that young people have become more politically engaged, although more than four in ten still did not vote in 2020.` },
        { type: 'p', text: `Vérification : 55 - 43 = 12 points ; 100 - 55 = 45 % (plus de quatre sur dix). Notez *percentage points* (points de pourcentage) et non *percent*.` },
      ],
    },
    {
      id: 'meth-ex4',
      title: `Analyser une caricature (description écrite)`,
      difficulty: 2,
      duration: 25,
      tags: ['image', 'caricature'],
      statement: [
        { type: 'p', text: `Imagine this original cartoon: a giant ballot box has a tiny voter climbing a ladder to reach the slot. A speech bubble from a politician at the bottom says "Of course your vote counts!" while he holds the base of the ladder with his foot. The caption reads: "Democracy: access conditions apply."` },
        { type: 'p', text: `Write an analysis in 100-120 words: identify, describe, interpret, link to a notion.` },
      ],
      hints: [`What do the ladder and the box symbolise?`, `Find the irony between the caption and the politician's words.`, `Use: The cartoonist denounces / ridicules...`],
      solution: [
        { type: 'quote', text: `This political cartoon is about the obstacles that citizens face when they want to vote. In the foreground, a tiny voter struggles to climb a ladder to reach an enormous ballot box, which symbolises how difficult it can be to take part in elections. At the bottom, a politician claims that every vote counts while holding the ladder with his foot, which is ironic. The caption, "Democracy: access conditions apply", mocks the gap between democratic ideals and reality. The cartoonist therefore denounces practices such as restrictive voting laws and suggests that equal citizenship is not guaranteed. It illustrates the notion of democracy and inequality in access to rights.` },
      ],
    },
    {
      id: 'meth-ex5',
      title: `Transposition : plan et problématique`,
      difficulty: 2,
      duration: 20,
      tags: ['synthèse', 'plan'],
      statement: [
        { type: 'p', text: `A dossier contains: (A) a photograph of a 1963 march; (B) a short original text by a modern teacher about discrimination in schools; (C) a bar chart on unemployment by ethnic group in 2020. The instruction: "Show how the documents illustrate the persistence of inequality." Propose a problématique and a two-part plan with the document(s) used in each part.` },
      ],
      hints: [`Part 1 should look at the past/the fight; part 2 at the present.`, `Each part must cross at least two documents.`],
      solution: [
        { type: 'p', text: `**Problématique :** To what extent do the documents show that the fight for equality has made progress but not removed inequality?` },
        {
          type: 'list',
          items: [
            `**Part 1 — A history of mobilisation and legal progress:** A (the 1963 march shows a mass peaceful movement) + B (discrimination in schools shows that the law now forbids it, but the issue is still discussed).`,
            `**Part 2 — Persistent inequalities today:** C (the chart shows unemployment gaps) + B (the teacher's testimony shows how inequality works in everyday life).`,
          ],
        },
        { type: 'p', text: `Remarque : chaque document peut apparaître dans plusieurs parties s'il éclaire plusieurs idées ; l'essentiel est de **croiser** et de ne pas faire un paragraphe par document.` },
      ],
    },
    {
      id: 'meth-ex6',
      title: `Type bac : rédiger une synthèse`,
      difficulty: 3,
      duration: 50,
      tags: ['synthèse', 'type bac'],
      statement: [
        { type: 'p', text: `Original training dossier on the theme "Living together".` },
        { type: 'callout', variant: 'example', title: `Document 1 : a local newspaper report (original)`, content: [{ type: 'p', text: `In a neighbourhood of a northern English city, volunteers from several communities have created a weekly street market. Residents say they now talk to neighbours they had never met. The organiser insists that the market is "a place where everyone is welcome". However, a local councillor warns that funding is limited and that some groups feel left out.` }] },
        { type: 'callout', variant: 'example', title: `Document 2 : survey results (original data)`, content: [{ type: 'table', headers: ['"I feel I belong to my neighbourhood."', 'Agree'], rows: [['Under 30', '48%'], ['30-60', '62%'], ['Over 60', '75%']] }] },
        { type: 'callout', variant: 'example', title: `Document 3 : a cartoon (described)`, content: [{ type: 'p', text: `A group of people stand on separate islands, each holding a phone. A tiny wooden bridge between two islands is almost invisible under a "Likes" cloud. The title: "Connected".` }] },
        { type: 'p', text: `**Task:** In about 250 words, explain what the documents reveal about the challenges of living together today.` },
      ],
      hints: [`Find a common thread: community links exist but are fragile / unequal.`, `Part 1: initiatives that create links (doc 1, doc 2 for older people). Part 2: limits and obstacles (doc 1's funding and exclusion, doc 2's youth gap, doc 3's isolation).`, `Do not copy: reformulate and use comparison connectors.`],
      solution: [
        { type: 'p', text: `**Problématique :** How do the documents show that living together today is both made possible by local initiatives and weakened by new forms of isolation?` },
        { type: 'quote', text: `The three documents deal with the challenges of living together in contemporary societies: a newspaper report on a community market, a survey on belonging and a cartoon about digital isolation. They raise the question of how far local initiatives can create real social bonds. First, the documents show that people can build links at a local level. In the report, residents from different communities meet at a weekly market, and the organiser says everybody is welcome. Similarly, the survey indicates that a majority of the 30-60 age group (62%) and three quarters of people over 60 (75%) feel they belong to their neighbourhood. However, these bonds remain fragile and unequally shared. The councillor mentions limited funding and groups that feel excluded, and the survey reveals that fewer than half of the under-30s (48%) feel they belong. The cartoon helps explain this gap: while people seem connected through their phones, they remain on separate islands, and the bridge between them is barely visible. Thus, although concrete projects can strengthen community life, living together also requires inclusion of all groups and real, not only virtual, contact between generations.` },
        { type: 'p', text: `Barème indicatif : problématique pertinente (4), croisement des documents (6), exactitude des données (3), langue et connecteurs (5), absence de copie (2).` },
      ],
    },
    {
      id: 'meth-ex7',
      title: `Thème (FR vers EN)`,
      difficulty: 3,
      duration: 25,
      tags: ['traduction', 'thème'],
      statement: [
        { type: 'p', text: `Translate into English: « Depuis les années 1960, la société britannique est devenue plus diverse. Beaucoup de gens pensent que cette diversité est une richesse, mais certains regrettent que les inégalités n'aient pas disparu. »` },
      ],
      hints: [`« Depuis les années 1960 » + état actuel : present perfect.`, `« n'aient pas disparu » : subjonctif après regretter, mais en anglais on utilise « have not disappeared ».`, `« une richesse » = an asset / a source of richness.`],
      solution: [
        { type: 'quote', text: `Since the 1960s, British society has become more diverse. Many people think that this diversity is an asset, but some regret that inequalities have not disappeared.` },
        { type: 'p', text: `Points clés : *since* + present perfect ; *many people think* (pluriel, pas de « s ») ; *inequalities have not disappeared* (pas de subjonctif) ; *an asset* évite le calque « a richness ».` },
      ],
    },
    {
      id: 'meth-ex8',
      title: `Oral : introduire un document`,
      difficulty: 2,
      duration: 15,
      tags: ['oral'],
      statement: [
        { type: 'p', text: `You have to present a photograph of a 1960s march in front of a government building. Prepare a 60-second introduction (about 100 words) in English, including the nature of the document, a description, the issue and the plan.` },
      ],
      hints: [`Start with: "The document I have chosen is..."`, `Use spatial prepositions: in the foreground, in the background, on the left...`],
      solution: [
        { type: 'quote', text: `The document I have chosen is a black-and-white photograph taken during a civil rights march in the 1960s. In the foreground, we can see a crowd of men and women, some of them holding banners calling for freedom and equal rights. In the background, there is a large government building, which symbolises the power that protesters address. The atmosphere is determined and peaceful. This document raises the question of how ordinary citizens can change the law. First, I will show how the march illustrates peaceful protest; then I will explain what results it achieved.` },
        { type: 'p', text: `Conseil : entraînez-vous à voix haute en visant 1 minute ; terminez toujours par l'annonce claire de votre plan.` },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  representations: [
    {
      type: 'steps',
      items: [
        { title: `Read the instruction`, text: `Underline the keywords. What is the question?` },
        { title: `Analyse each document`, text: `Nature, source, date, message, tone.` },
        { title: `Cross them`, text: `Agreements, contrasts, evolution in time or space.` },
        { title: `Write the problématique`, text: `A question that all the documents answer.` },
        { title: `Plan`, text: `2 or 3 parts; each part crosses at least two documents.` },
        { title: `Write`, text: `Introduction / development / conclusion, in your own words.` },
        { title: `Proofread`, text: `Tenses, agreement, connectors, no copy, word count.` },
      ],
    },
    {
      type: 'matching',
      title: `Match the connector with its function`,
      pairs: [
        { left: `moreover`, right: `addition` },
        { left: `whereas`, right: `contrast` },
        { left: `therefore`, right: `consequence` },
        { left: `despite`, right: `concession` },
        { left: `for instance`, right: `illustration` },
        { left: `owing to`, right: `cause` },
        { left: `to sum up`, right: `conclusion` },
      ],
    },
    {
      type: 'matching',
      title: `Faux amis : English word and real meaning`,
      pairs: [
        { left: `actually`, right: `en fait` },
        { left: `eventually`, right: `finalement` },
        { left: `to attend`, right: `assister à` },
        { left: `a library`, right: `une bibliothèque` },
        { left: `sensible`, right: `raisonnable` },
        { left: `to pretend`, right: `faire semblant` },
        { left: `to resume`, right: `reprendre` },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: `Which sentence is a good synthesis sentence?`, choices: [`Document A says X. Document B says Y.`, `While Document A stresses X, Document B points out Y.`, `I think X is better than Y.`, `Document A is boring.`], answer: 1, explanation: `La synthèse croise les documents et ne donne pas d'opinion personnelle.` },
        { question: `"Actually" means...`, choices: [`actuellement`, `en fait`, `autrefois`, `bientôt`], answer: 1 },
        { question: `Which verb is best to describe a cartoon that criticises a policy?`, choices: [`to denounce`, `to attend`, `to pretend`, `to resume`], answer: 0 },
        { question: `Turnout rose from 40% to 52%. The increase is...`, choices: [`12 percent`, `12 percentage points`, `52 percentage points`, `1.2 points`], answer: 1, explanation: `52 - 40 = 12 points de pourcentage.` },
        { question: `Which tense for analysing a document?`, choices: [`present simple`, `past perfect`, `future perfect`, `past continuous`], answer: 0 },
        { question: `What does PEEL stand for?`, choices: [`Point, Evidence, Explanation, Link`, `Plan, Example, Essay, Length`, `Problem, Effect, Evaluation, Logic`, `Present, Explain, End, Leave`], answer: 0 },
        { question: `"Depuis 2010, il vit à Londres." becomes...`, choices: [`He lives in London since 2010.`, `He has lived in London since 2010.`, `He is living in London since 2010.`, `He lived in London since 2010.`], answer: 1 },
        { question: `A graph shows a correlation. You should write...`, choices: [`this proves that`, `this suggests that`, `this is the only cause`, `nobody knows`], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: `to highlight`, back: `souligner, mettre en évidence` },
        { front: `to denounce`, back: `dénoncer` },
        { front: `to mock / to ridicule`, back: `se moquer de / ridiculiser` },
        { front: `the foreground`, back: `le premier plan` },
        { front: `the background`, back: `l'arrière-plan` },
        { front: `on the left / on the right`, back: `à gauche / à droite` },
        { front: `the caption`, back: `la légende` },
        { front: `the target audience`, back: `le public visé` },
        { front: `to soar`, back: `grimper en flèche` },
        { front: `to plummet`, back: `chuter, s'effondrer` },
        { front: `to level off`, back: `se stabiliser` },
        { front: `a sharp rise / a slight dip`, back: `forte hausse / légère baisse` },
        { front: `a percentage point`, back: `un point de pourcentage` },
        { front: `the survey shows`, back: `l'enquête montre` },
        { front: `on the other hand`, back: `d'autre part` },
        { front: `nevertheless`, back: `néanmoins` },
        { front: `consequently`, back: `par conséquent` },
        { front: `to sum up`, back: `pour résumer` },
        { front: `as far as I am concerned`, back: `en ce qui me concerne` },
        { front: `to some extent`, back: `dans une certaine mesure` },
        { front: `the issue / the stake`, back: `la question / l'enjeu` },
        { front: `to put forward an argument`, back: `avancer un argument` },
        { front: `to back up a statement`, back: `étayer une affirmation` },
      ],
    },
    {
      type: 'cloze',
      title: `Describe a graph`,
      text: `The line graph {{shows|illustrates}} the evolution of voter turnout. Between 2000 and 2010, the figure {{rose|increased|climbed}} sharply, then it {{levelled off|remained stable|stagnated}}. {{According}} to the survey, a {{majority}} of respondents are optimistic. These figures {{suggest|indicate}} that people are more engaged.`,
    },
    {
      type: 'cloze',
      title: `Analyse a cartoon`,
      text: `In the {{foreground}}, we can see a crowd. The cartoonist {{denounces|criticises|mocks}} the politicians by using {{irony|exaggeration}}. The {{caption}} reinforces the message. The {{tone}} is bitter.`,
    },
    {
      type: 'truefalse',
      title: `Good practice or not?`,
      statements: [
        { text: `In a synthesis, you should copy long sentences from the documents.`, answer: false, explanation: `Reformulez ; citation de quelques mots seulement.` },
        { text: `A synthesis should cross at least two documents in each paragraph.`, answer: true },
        { text: `"Eventually" can be translated by "éventuellement".`, answer: false, explanation: `Eventually = finalement.` },
        { text: `In an essay, every paragraph needs a precise example.`, answer: true },
        { text: `You should give your personal opinion in a synthesis.`, answer: false, explanation: `La synthèse est neutre ; l'opinion a sa place dans l'essay.` },
        { text: `An analysis of a document is written in the present tense.`, answer: true },
      ],
    },
    {
      type: 'ordering',
      title: `Order the parts of an essay`,
      items: [
        `Hook and definition of the key terms`,
        `Problématique and announcement of the plan`,
        `Paragraph 1: first argument with evidence`,
        `Paragraph 2: second argument with evidence`,
        `Paragraph 3: counter-argument or nuance`,
        `Conclusion answering the question`,
      ],
    },
    {
      type: 'timeline',
      events: [
        { date: '0-5 min', title: `Read and understand the documents` },
        { date: '5-10 min', title: `Annotate and cross documents` },
        { date: '10-15 min', title: `Problématique and plan` },
        { date: '15-40 min', title: `Writing` },
        { date: '40-45 min', title: `Proofreading and word count` },
      ],
    },
  ],
}
export default chapter
