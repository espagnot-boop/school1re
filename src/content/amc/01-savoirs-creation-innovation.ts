import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'savoirs-creation-innovation',
  subject: 'amc',
  order: 1,
  title: 'Savoirs, création, innovation',
  theme: 'Thématique 1 — Savoirs, création, innovation',
  summary:
    'Production et circulation des savoirs (universités, révolution numérique, Silicon Valley) et sciences et techniques : promesses et défis (intelligence artificielle, géants du numérique, brevets, transition écologique).',
  duration: '8 semaines',
  objectives: [
    'Comprendre comment les savoirs sont produits, transmis et diffusés dans le monde anglophone (écoles, universités, médias, numérique).',
    'Situer la Silicon Valley et expliquer son modèle d’innovation (universités, capital-risque, start-ups).',
    'Analyser les promesses et les risques de l’intelligence artificielle et des géants du numérique.',
    'Mobiliser des repères datés et des documents de référence pour construire une synthèse.',
    'Rédiger en anglais (niveau B2) une synthèse de documents, un essai argumenté et une analyse de document.',
    'Traduire et réutiliser un lexique précis de l’innovation, de la recherche et de la technologie.',
  ],
  keywords: [
    'Silicon Valley',
    'start-up',
    'venture capital',
    'patent',
    'artificial intelligence',
    'big tech',
    'digital divide',
    'open access',
    'tuition fees',
    'sustainability',
  ],

  fiche: [
    { type: 'h2', text: 'The programme at a glance' },
    {
      type: 'table',
      headers: ['Axe d’étude', 'Questions clés', 'Exemples / terrains'],
      rows: [
        [
          '**Axe 1** — Production et circulation des savoirs',
          'Qui produit le savoir ? Comment circule-t-il ? Qui y a accès ?',
          'Oxbridge, Ivy League, MOOCs, Wikipedia, open access, Silicon Valley, rôle des médias',
        ],
        [
          '**Axe 2** — Sciences et techniques : promesses et défis',
          'Le progrès technique est-il toujours un progrès ? Qui le contrôle ?',
          'IA, big tech, données personnelles, brevets, transition écologique',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Notions clés',
      content: [
        {
          type: 'list',
          items: [
            '**Innovation** = idée + financement + marché. A discovery becomes an innovation only when it is **used**.',
            '**Silicon Valley** (California): universities (Stanford) + venture capital + risk-taking culture + talent from all over the world.',
            '**Promise vs. challenge**: efficiency, health, access to knowledge *vs.* privacy, inequality, jobs, climate cost.',
            '**Knowledge is a public good** (open access, Wikipedia) *and* a commercial asset (patents, copyright).',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Repères chronologiques' },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['c. 1450', 'Gutenberg’s printing press: first mass circulation of knowledge'],
        ['1636 / 1885', 'Harvard founded / Stanford founded'],
        ['1710', 'Statute of Anne: first copyright law (Britain)'],
        ['1950 / 1956', 'Turing’s “imitation game” paper / the term “artificial intelligence” coined at Dartmouth'],
        ['1969', 'ARPANET, ancestor of the Internet'],
        ['1971', 'The name “Silicon Valley” is popularised by journalist Don Hoefler'],
        ['1989–1991', 'Tim Berners-Lee invents the World Wide Web (CERN)'],
        ['1998 / 2004 / 2007', 'Google / Facebook / iPhone'],
        ['2015', 'Paris Agreement on climate'],
        ['2018', 'GDPR in force in the EU'],
        ['Nov. 2022', 'ChatGPT released: generative AI reaches the general public'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode express',
      content: [
        {
          type: 'p',
          text: 'Pour une synthèse : (1) **problématique** commune aux documents, (2) **2 ou 3 axes** (jamais document par document), (3) **conclusion** qui ouvre. Citez brièvement : *Document A shows that…* / *Whereas B suggests…*',
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Axe 1 — Production and circulation of knowledge' },
    { type: 'h3', text: '1. Schools and universities in the English-speaking world' },
    {
      type: 'p',
      text: 'Universities are the traditional **producers** of knowledge: they combine teaching and research. In the UK, **Oxford** (teaching since the late 11th century) and **Cambridge** (1209) form “Oxbridge”, a symbol of academic excellence and, for critics, of social elitism. In the USA, the **Ivy League** (Harvard, founded in 1636, Yale, Princeton, Columbia…) and technical institutions such as **MIT** (1861) and **Stanford** (1885) attract students and researchers from all over the world.',
    },
    {
      type: 'table',
      headers: ['', 'United Kingdom', 'United States'],
      rows: [
        ['Famous institutions', 'Oxford, Cambridge, Imperial College, LSE', 'Harvard, Yale, MIT, Stanford, Berkeley'],
        ['Funding', 'Tuition fees capped in England (about £9,250 a year since 2017), student loans', 'Very high fees at private universities; large endowments; scholarships'],
        ['Selection', 'UCAS system; offers based on exam results and interviews', 'SAT/ACT (now often optional), essays, extracurriculars'],
        ['Debate', 'Access for state-school pupils; student debt', 'Student debt (over $1.5 trillion); affirmative action'],
      ],
      caption: 'Higher education: two models',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Piège de vocabulaire',
      content: [
        {
          type: 'p',
          text: 'En anglais britannique, **public school** désigne une école privée prestigieuse (Eton), alors qu’une **state school** est publique. Aux États-Unis, *public school* = école publique. **College** (US) = très souvent l’université elle-même.',
        },
      ],
    },
    { type: 'h3', text: '2. From print to pixels: how knowledge circulates' },
    {
      type: 'p',
      text: 'Each technology changed who can access knowledge. **Gutenberg’s press** (c. 1450) multiplied books; **newspapers and public libraries** spread literacy in the 19th century; **radio and television** created mass audiences; the **Internet** (ARPANET 1969, the Web 1989–91) made information instantly available. Today, **Wikipedia** (2001), **MOOCs** (massive open online courses) and **open access** journals try to make knowledge free, while a few platforms decide what we see.',
    },
    {
      type: 'timeline',
      events: [
        { date: 'c. 1450', title: 'Printing press', text: 'Books become cheaper; the Reformation and the Scientific Revolution spread faster.' },
        { date: '1710', title: 'Statute of Anne', text: 'Authors, not only printers, hold a copyright for a limited time.' },
        { date: '1969', title: 'ARPANET', text: 'First message sent between computers on a US research network.' },
        { date: '1991', title: 'The Web goes public', text: 'Berners-Lee’s hypertext system opens to everyone.' },
        { date: '2001', title: 'Wikipedia', text: 'A free encyclopedia written collaboratively by volunteers.' },
        { date: '2020', title: 'Remote learning', text: 'The pandemic pushes schools and universities online and reveals the digital divide.' },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'The digital divide',
      content: [
        {
          type: 'p',
          text: 'The **digital divide** is the gap between those who have access to computers, a reliable connection and digital skills, and those who do not. It can separate countries, regions (rural vs. urban areas), income groups or generations.',
        },
      ],
    },
    { type: 'h3', text: '3. The role of the media' },
    {
      type: 'p',
      text: 'The media do not only report discoveries: they **translate** science for the public, shape its **image** (the “mad scientist”, the “genius in a garage”) and influence public policy. Good science journalism explains uncertainty; bad coverage exaggerates (“miracle cure!”). Social media accelerate circulation but also the spread of **misinformation** (this is studied further in Thématique 2).',
    },
    { type: 'h3', text: '4. Silicon Valley: a case study' },
    {
      type: 'p',
      text: '**Silicon Valley** is the area south of San Francisco (Santa Clara Valley). Its name comes from silicon, the material of semiconductors; the journalist Don Hoefler popularised it in 1971. Several factors explain its success:',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { icon: 'GraduationCap', title: 'Universities', text: 'Stanford encouraged professors and students to create companies (Hewlett-Packard, 1939; Google, 1998).' },
        { icon: 'Banknote', title: 'Venture capital', text: 'Investors fund risky young firms in exchange for shares. Many fail; a few become giants.' },
        { icon: 'Rocket', title: 'Culture of risk', text: '“Fail fast”: failure is seen as learning. Mobility of workers and open networking.' },
        { icon: 'Globe2', title: 'Global talent', text: 'Engineers and entrepreneurs from India, China, Europe… many founders are immigrants.' },
        { icon: 'Building2', title: 'Clusters', text: 'Companies, labs, lawyers and investors located close together exchange ideas quickly.' },
        { icon: 'Scale', title: 'Limits', text: 'Very high housing costs, inequality, lack of diversity, concentration of power.' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'From garage to giant',
      content: [
        {
          type: 'p',
          text: 'Hewlett-Packard (1939), Apple (1976), Amazon (1994, Seattle), Google (1998), Facebook (2004), Tesla (2003) are often presented as “garage stories”. The myth of the self-made genius hides the role of **public funding** (military research, universities) and of teams.',
        },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'start-up', value: 'a young company with an innovative idea and a strong growth potential' },
        { key: 'venture capitalist', value: 'an investor who finances start-ups in exchange for equity' },
        { key: 'unicorn', value: 'a start-up valued at more than $1 billion' },
        { key: 'incubator', value: 'a structure that helps young companies at an early stage' },
        { key: 'to disrupt', value: 'to change an industry radically with a new product or model' },
      ],
    },

    { type: 'h2', text: 'Axe 2 — Science and technology: promises and challenges' },
    { type: 'h3', text: '1. Artificial intelligence' },
    {
      type: 'p',
      text: 'In 1950 Alan Turing asked “Can machines think?” and proposed the **imitation game** (the Turing test). The expression “artificial intelligence” was coined at a Dartmouth workshop in 1956. Milestones: **Deep Blue** beat world chess champion Garry Kasparov (1997); **AlphaGo** beat Lee Sedol at Go (2016); **ChatGPT** (November 2022) brought generative AI to hundreds of millions of users.',
    },
    {
      type: 'table',
      headers: ['Promises', 'Challenges'],
      rows: [
        ['Faster medical diagnosis, drug discovery', 'Biased algorithms (training data reflects human prejudice)'],
        ['Personalised learning, translation, accessibility', 'Cheating, loss of critical thinking, deepfakes'],
        ['Automation of dangerous or boring tasks', 'Job losses; who owns the data and the models?'],
        ['Scientific research accelerated', 'Energy consumption; concentration in a few companies'],
      ],
      caption: 'AI: a double-edged sword',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Regulation',
      content: [
        {
          type: 'p',
          text: 'The EU favours **regulation** (GDPR, 2018; the AI Act, adopted in 2024). The USA has traditionally relied more on companies’ self-regulation and sectoral rules, while the UK has promoted a “pro-innovation” approach. Writing about this, compare **models**, not only countries.',
        },
      ],
    },
    { type: 'h3', text: '2. Big Tech' },
    {
      type: 'p',
      text: 'The “Big Tech” companies (Alphabet/Google, Amazon, Apple, Meta, Microsoft) provide useful services, often “free” — because users pay with their **personal data**. Critics speak of **surveillance capitalism** (Shoshana Zuboff). Questions: monopoly and competition law, tax optimisation, content moderation, working conditions, influence on elections.',
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'privacy', value: 'the right to keep one’s personal life and data under control' },
        { key: 'data mining', value: 'analysing large amounts of data to find patterns' },
        { key: 'antitrust (US) / competition law (EU)', value: 'rules to prevent monopolies' },
        { key: 'whistleblower', value: 'someone who reveals wrongdoing inside an organisation' },
        { key: 'algorithm', value: 'a set of rules followed by a computer to solve a problem' },
      ],
    },
    { type: 'h3', text: '3. Patents, copyright and open science' },
    {
      type: 'p',
      text: 'A **patent** gives an inventor a temporary monopoly (usually 20 years) in exchange for making the invention public. It rewards investment (e.g. new medicines) but can limit access (high prices, “patent trolls”). **Copyright** protects creative works. In reaction, movements promote **open source** software (Linux), **Creative Commons** licences and **open access** publishing. The recent debate: can AI be trained on copyrighted works? Can an AI be an “inventor”?',
    },
    { type: 'h3', text: '4. Science and the ecological transition' },
    {
      type: 'p',
      text: 'Technology is part of the problem and of the solution: renewable energy, electric vehicles, carbon capture, smart grids *vs.* e-waste, mining of rare metals, data-centre energy use. The **Paris Agreement** (2015) aims to limit global warming to well below 2°C. **Greta Thunberg** and youth movements show how citizens can push scientists’ warnings into politics. Beware of **greenwashing**: presenting a company as greener than it is.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Documents de référence (œuvres et repères)',
      content: [
        {
          type: 'list',
          items: [
            '**Frankenstein** (Mary Shelley, 1818): the scientist who loses control of his creation — the founding myth of technological anxiety.',
            '**1984** (George Orwell, 1949): surveillance and manipulation of information.',
            '**The Imitation Game** (film, 2014): Turing, codebreaking and the origins of computing.',
            '**Hidden Figures** (film, 2016): Black women mathematicians at NASA — who gets credit for knowledge?',
            '**The Social Network** (film, 2010): the creation of Facebook, ethics of innovation.',
            '**Black Mirror** (TV series, 2011–) and **Her** (film, 2013): near-future fiction about technology.',
            '**Citizenfour** (documentary, 2014): Edward Snowden and mass surveillance.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'Méthodes' },
    {
      type: 'steps',
      items: [
        { title: 'Analyser un document', text: 'Nature, source, date, auteur, destinataire → thème → message et procédés (chiffres, vocabulaire, ton, image) → portée / limites. Use *the author argues / suggests / implies*.' },
        { title: 'Faire une synthèse (≈ 400–500 mots)', text: 'Introduction (thème, documents, problématique) → 2–3 parties thématiques croisant les documents → conclusion. Reformulez, ne recopiez pas.' },
        { title: 'Écrire un essai argumenté', text: 'Thesis in the introduction; each paragraph = idea + explanation + example (a date, a work, a fact); use connectors (*however, moreover, as a result*); nuanced conclusion.' },
        { title: 'Traduire', text: 'Comprendre le sens global, repérer faux amis et structures (passif, *-ing*), puis reformuler en français naturel. Pour la version : respecter le registre.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Faux amis fréquents',
      content: [
        {
          type: 'table',
          headers: ['English', 'Ne veut PAS dire', 'Veut dire'],
          rows: [
            ['actually', 'actuellement', 'en fait (currently = actuellement)'],
            ['eventually', 'éventuellement', 'finalement, au bout du compte'],
            ['a lecture', 'une lecture', 'un cours magistral (reading = lecture)'],
            ['to assist', 'assister (à)', 'aider (to attend = assister à)'],
            ['a college', 'un collège', 'une université / un établissement supérieur'],
            ['sensible', 'sensible', 'raisonnable (sensitive = sensible)'],
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex1-vocab-trad',
      title: 'Vocabulary: match and translate',
      difficulty: 1,
      duration: 15,
      tags: ['vocabulaire', 'traduction'],
      statement: [
        { type: 'p', text: 'Translate into English: (a) un brevet ; (b) la fracture numérique ; (c) une jeune pousse (start-up) ; (d) les frais de scolarité ; (e) un lanceur d’alerte ; (f) l’écoblanchiment.' },
      ],
      hints: ['Pensez aux mots du cours : patent, divide…', 'Greenwashing se construit comme whitewashing.'],
      solution: [
        {
          type: 'list',
          items: [
            '(a) a **patent**',
            '(b) the **digital divide**',
            '(c) a **start-up**',
            '(d) **tuition fees**',
            '(e) a **whistleblower**',
            '(f) **greenwashing**',
          ],
        },
      ],
    },
    {
      id: 'ex2-analyse-chiffres',
      title: 'Analyse d’un document chiffré',
      difficulty: 1,
      duration: 20,
      tags: ['analyse de document'],
      statement: [
        { type: 'p', text: '**Document (original, invented for training).** *“In 2010, 29% of households in Country X had home Internet access; in 2023, 92%. However, among the lowest-income families, the figure is only 71%, and one pupil in five has no personal computer.”*' },
        { type: 'p', text: 'In 4 to 6 sentences, present the document and explain what it shows about access to knowledge.' },
      ],
      hints: ['Distinguez la tendance générale et l’écart entre groupes.', 'Quel concept du cours est illustré ?'],
      solution: [
        {
          type: 'p',
          text: 'This statistical extract describes the spread of home Internet access in an imaginary country between 2010 and 2023. It shows spectacular progress: access has more than tripled, from 29% to 92% of households. Yet the document insists on a persistent inequality: only 71% of the poorest families are connected and 20% of pupils have no computer of their own. This illustrates the **digital divide**: even if technology makes knowledge more widely available, equal access is not guaranteed, which can widen educational inequalities, as the 2020 school closures revealed.',
        },
      ],
    },
    {
      id: 'ex3-trad-version',
      title: 'Version : texte sur la Silicon Valley',
      difficulty: 2,
      duration: 25,
      tags: ['traduction', 'Silicon Valley'],
      statement: [
        { type: 'p', text: 'Translate into French (text original):' },
        { type: 'quote', text: 'Silicon Valley owes much of its success to a simple fact: ideas travel fast there. Engineers change jobs often, investors know everybody, and a failed project is considered a lesson rather than a disgrace. Yet the region’s success has a price, as many people can no longer afford to live where the future is being invented.' },
      ],
      hints: ['« owes … to » = doit … à', '« can no longer afford to » : ne peuvent plus se permettre de / n’ont plus les moyens de'],
      solution: [
        {
          type: 'p',
          text: 'La Silicon Valley doit une grande partie de son succès à un fait simple : les idées y circulent vite. Les ingénieurs changent souvent d’emploi, les investisseurs connaissent tout le monde, et l’échec d’un projet est considéré comme une leçon plutôt que comme une honte. Pourtant, ce succès a un prix : beaucoup de gens n’ont plus les moyens de vivre là où l’on invente l’avenir.',
        },
      ],
    },
    {
      id: 'ex4-trad-theme',
      title: 'Thème : l’intelligence artificielle à l’école',
      difficulty: 2,
      duration: 25,
      tags: ['traduction', 'IA'],
      statement: [
        { type: 'p', text: 'Translate into English:' },
        { type: 'p', text: '« Beaucoup d’élèves utilisent désormais des outils d’intelligence artificielle pour faire leurs devoirs. Certains professeurs craignent que les élèves ne développent plus leur esprit critique, tandis que d’autres pensent que ces outils peuvent aider à mieux apprendre, à condition d’être bien utilisés. »' },
      ],
      hints: ['« désormais » : now / nowadays', '« à condition de » : provided that / as long as'],
      solution: [
        {
          type: 'p',
          text: 'Many pupils now use artificial intelligence tools to do their homework. Some teachers fear that students will stop developing their critical thinking, whereas others believe these tools can help them learn better, as long as they are used properly.',
        },
        { type: 'p', text: '*Remarque : « craignent que… ne » → fear that + will ; « devoirs » = homework (jamais *homeworks*).*' },
      ],
    },
    {
      id: 'ex5-synthese',
      title: 'Synthèse de deux documents',
      difficulty: 2,
      duration: 40,
      tags: ['synthèse', 'IA'],
      statement: [
        { type: 'p', text: '**Document A (original).** *A hospital uses an AI system to read X-rays. It detects tiny anomalies that doctors sometimes miss, and patients receive results in minutes instead of days. Doctors say they now have more time to talk to patients.*' },
        { type: 'p', text: '**Document B (original).** *A report warns that the same AI was trained mostly on images of patients from wealthy urban areas. For other groups it makes more mistakes. The report also notes that nobody is sure who is responsible when the system gets it wrong: the hospital, the software company or the doctor.*' },
        { type: 'p', text: 'Write a synthesis (about 200 words) of the two documents, with a problem statement.' },
      ],
      hints: ['Problématique : « Does AI improve healthcare for everyone? »', 'Plan : 1) efficiency and benefits ; 2) bias and responsibility.'],
      solution: [
        {
          type: 'p',
          text: 'Both documents deal with the use of artificial intelligence in hospitals, and they raise one question: can AI improve healthcare without creating new problems?',
        },
        {
          type: 'p',
          text: 'First, Document A presents AI as a powerful tool. It reads X-rays quickly and spots anomalies that humans may overlook, so patients get their results sooner. Moreover, automation frees doctors from routine tasks and lets them spend more time with patients, which suggests that technology can make care more human, not less.',
        },
        {
          type: 'p',
          text: 'However, Document B shows that this progress is not neutral. Because the system was trained on data from wealthy urban patients, it is less reliable for other groups: this is **algorithmic bias**, and it may deepen existing health inequalities. Furthermore, the question of legal responsibility remains open when an error occurs.',
        },
        {
          type: 'p',
          text: 'In conclusion, AI can bring real medical benefits, but only if data are diverse and if rules clearly define who is accountable. This echoes broader debates about the regulation of technology.',
        },
      ],
    },
    {
      id: 'ex6-essay-silicon',
      title: 'Essay: is Silicon Valley a model to follow?',
      difficulty: 3,
      duration: 50,
      tags: ['essay', 'Silicon Valley', 'type bac'],
      statement: [
        { type: 'p', text: '“Silicon Valley is a model that every country should imitate.” To what extent do you agree? (250–300 words)' },
      ],
      hints: ['Pour : universités, capital-risque, culture de l’échec, talents internationaux.', 'Contre : inégalités, coût de la vie, concentration du pouvoir, contexte culturel et politique différent.', 'Nuance : adapter plutôt qu’imiter (Station F à Paris, Cambridge UK “Silicon Fen”).'],
      solution: [
        {
          type: 'p',
          text: 'Silicon Valley is often described as the world capital of innovation, and many governments dream of creating their own. Yet should every country copy it? I would argue that its strengths are worth studying, but that it cannot and should not be imitated blindly.',
        },
        {
          type: 'p',
          text: 'To begin with, the Valley shows what makes innovation possible. Stanford and other universities produce research and talent, venture capitalists accept the risk of failure, and a culture of mobility lets ideas circulate quickly. Companies such as Google, founded in 1998 by two Stanford students, prove that this ecosystem can transform a laboratory idea into a global business. Other regions have drawn lessons from it, such as the Cambridge area in the UK.',
        },
        {
          type: 'p',
          text: 'However, the model has serious limits. Housing is so expensive that teachers and nurses struggle to live there, while a few giant firms concentrate wealth and power. Moreover, the Valley’s success relied on specific conditions: a huge domestic market, public military funding and a tolerance of risk that does not exist everywhere. Finally, the speed of innovation sometimes ignores social consequences, as debates on privacy and misinformation show.',
        },
        {
          type: 'p',
          text: 'In conclusion, countries should not copy Silicon Valley but adapt its best ideas — links between universities and business, support for young firms — to their own social and cultural context, while adding safeguards for citizens.',
        },
      ],
    },
    {
      id: 'ex7-analyse-oeuvre',
      title: 'Essay: science fiction as a warning',
      difficulty: 3,
      duration: 45,
      tags: ['essay', 'documents de référence', 'type bac'],
      statement: [
        { type: 'p', text: 'Using at least two reference works (novels, films or series), explain how fiction helps us think about the risks of technology. (about 250 words)' },
      ],
      hints: ['Frankenstein (1818), 1984 (1949), Black Mirror, Her, The Social Network.', 'Fiction anticipe, exagère pour faire réfléchir.'],
      solution: [
        {
          type: 'p',
          text: 'Fiction does not predict the future, but it lets us explore the consequences of technology before they happen. Mary Shelley’s *Frankenstein* (1818) was written at a time of fascination with electricity and anatomy: Victor Frankenstein creates life but refuses responsibility for his creature, a theme that echoes today’s debates about AI and genetic engineering. The novel does not condemn science itself; it criticises scientists who ignore the moral consequences of their work.',
        },
        {
          type: 'p',
          text: 'Similarly, Orwell’s *1984* (1949) imagines a state that controls individuals through constant surveillance and the manipulation of language and information. Today, the word “Orwellian” is used when governments or companies collect personal data, as in the Snowden revelations of 2013. More recently, the series *Black Mirror* turns social media rating systems or memory-recording devices into short nightmares, exaggerating real trends to make viewers reflect.',
        },
        {
          type: 'p',
          text: 'Thus, fiction works as an early warning system: it makes abstract risks concrete and emotional. However, it can also create fear and oversimplify. A responsible citizen should use these stories as starting points for debate, not as proof.',
        },
      ],
    },
  ],

  representations: [
    {
      type: 'svg',
      caption: 'The innovation ecosystem of Silicon Valley',
      maxWidth: 560,
      svg: '<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12"><rect x="1" y="1" width="518" height="278" class="svg-card svg-stroke" fill="none" stroke-width="1" opacity="0.4"/><circle cx="260" cy="140" r="52" fill="hsl(217 91% 60%)" opacity="0.2" stroke="hsl(217 91% 60%)"/><text x="260" y="136" text-anchor="middle" fill="currentColor" font-weight="600">START-UPS</text><text x="260" y="152" text-anchor="middle" fill="currentColor">innovation</text><g stroke="currentColor" stroke-width="1" fill="none"><rect x="30" y="30" width="130" height="50"/><rect x="360" y="30" width="130" height="50"/><rect x="30" y="200" width="130" height="50"/><rect x="360" y="200" width="130" height="50"/></g><text x="95" y="53" text-anchor="middle" fill="currentColor">Universities</text><text x="95" y="69" text-anchor="middle" fill="currentColor" opacity="0.7">Stanford, Berkeley</text><text x="425" y="53" text-anchor="middle" fill="currentColor">Venture capital</text><text x="425" y="69" text-anchor="middle" fill="currentColor" opacity="0.7">funding &amp; risk</text><text x="95" y="223" text-anchor="middle" fill="currentColor">Global talent</text><text x="95" y="239" text-anchor="middle" fill="currentColor" opacity="0.7">engineers, founders</text><text x="425" y="223" text-anchor="middle" fill="currentColor">Culture of risk</text><text x="425" y="239" text-anchor="middle" fill="currentColor" opacity="0.7">&quot;fail fast&quot;</text><g stroke="hsl(217 91% 60%)" stroke-width="1.5"><line x1="160" y1="70" x2="215" y2="108"/><line x1="360" y1="70" x2="305" y2="108"/><line x1="160" y1="210" x2="215" y2="172"/><line x1="360" y1="210" x2="305" y2="172"/></g></svg>',
    },
    {
      type: 'timeline',
      events: [
        { date: 'c. 1450', title: 'Printing press' },
        { date: '1636', title: 'Harvard founded' },
        { date: '1885', title: 'Stanford founded' },
        { date: '1950', title: 'Turing’s “Computing Machinery and Intelligence”' },
        { date: '1956', title: 'Dartmouth workshop: “artificial intelligence”' },
        { date: '1969', title: 'ARPANET' },
        { date: '1971', title: '“Silicon Valley” name popularised' },
        { date: '1991', title: 'The Web opens to the public' },
        { date: '1997', title: 'Deep Blue beats Kasparov' },
        { date: '1998', title: 'Google founded' },
        { date: '2007', title: 'First iPhone' },
        { date: '2015', title: 'Paris Agreement' },
        { date: '2016', title: 'AlphaGo beats Lee Sedol' },
        { date: '2018', title: 'GDPR applies in the EU' },
        { date: '2022', title: 'ChatGPT released' },
        { date: '2024', title: 'EU AI Act adopted' },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'breakthrough', value: 'a major discovery or advance' },
        { key: 'research grant', value: 'money given for a research project' },
        { key: 'peer review', value: 'evaluation of a scientific article by other experts' },
        { key: 'research', value: 'scientific study; uncountable noun (some research, not “a research”)' },
        { key: 'lecturer / professor', value: 'UK: lecturer = university teacher; professor = senior chair. US: professor = any university teacher' },
        { key: 'dropout', value: 'someone who leaves school or university before finishing' },
        { key: 'scholarship / bursary', value: 'money awarded to a student for merit or need' },
        { key: 'campus', value: 'the grounds and buildings of a university' },
        { key: 'undergraduate / postgraduate', value: 'student before / after the first degree' },
        { key: 'cutting-edge', value: 'at the most advanced level' },
        { key: 'trailblazer / pioneer', value: 'a person who does something new first' },
        { key: 'to roll out', value: 'to introduce a new product or service progressively' },
        { key: 'to harness', value: 'to control and use (energy, technology)' },
        { key: 'drawback / downside', value: 'a disadvantage' },
        { key: 'loophole', value: 'a gap in a law that allows people to avoid it' },
        { key: 'carbon footprint', value: 'the amount of CO₂ released by an activity' },
        { key: 'renewable energy', value: 'energy from sources that do not run out (wind, solar)' },
        { key: 'to track / to monitor', value: 'to follow and record' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Silicon Valley', back: 'Region in California south of San Francisco; world hub of technology and venture capital; name popularised in 1971.' },
        { front: 'venture capital', back: 'Money invested in young risky companies in exchange for shares.' },
        { front: 'patent', back: 'A legal right giving an inventor exclusive use of an invention for a limited period (usually 20 years).' },
        { front: 'digital divide', back: 'The gap between people who have access to digital tools and skills and those who do not.' },
        { front: 'Ivy League', back: 'Eight prestigious private universities in the north-east USA (Harvard, Yale, Princeton, Columbia…).' },
        { front: 'Oxbridge', back: 'Oxford and Cambridge, the UK’s oldest and most famous universities.' },
        { front: 'tuition fees', back: 'The money students pay for teaching at a university.' },
        { front: 'open access', back: 'Free, unrestricted online access to research articles.' },
        { front: 'artificial intelligence', back: 'Computer systems performing tasks that normally require human intelligence; term coined in 1956.' },
        { front: 'algorithmic bias', back: 'Systematic unfairness in an algorithm caused by biased data or design.' },
        { front: 'surveillance capitalism', back: 'Economic model (term by S. Zuboff) based on collecting and selling personal data.' },
        { front: 'GDPR', back: 'General Data Protection Regulation: EU law on personal data, in force since 2018.' },
        { front: 'whistleblower', back: 'A person who reveals illegal or unethical practices (e.g. Edward Snowden).' },
        { front: 'greenwashing', back: 'Making a company or product look more environmentally friendly than it is.' },
        { front: 'to disrupt', back: 'To transform an industry with a radically new product or model.' },
        { front: 'Turing test', back: 'Test proposed in 1950: can a machine imitate a human in conversation so well that a judge cannot tell?' },
        { front: 'Frankenstein (1818)', back: 'Mary Shelley’s novel: a scientist creates life and abandons his creature; a warning about irresponsible science.' },
        { front: 'carbon footprint', back: 'Total greenhouse gas emissions caused by a person, company or product.' },
        { front: 'MOOC', back: 'Massive open online course, free or cheap and open to many learners.' },
        { front: 'deepfake', back: 'A fake video or audio created with AI to look real.' },
      ],
    },
    {
      type: 'matching',
      title: 'Match the work with its theme',
      pairs: [
        { left: 'Frankenstein (1818)', right: 'a scientist loses control of his creation' },
        { left: '1984 (1949)', right: 'mass surveillance and manipulation of truth' },
        { left: 'The Imitation Game (2014)', right: 'Turing and the origins of computing' },
        { left: 'Hidden Figures (2016)', right: 'Black women mathematicians at NASA' },
        { left: 'The Social Network (2010)', right: 'the birth of Facebook' },
        { left: 'Citizenfour (2014)', right: 'Snowden and mass surveillance' },
      ],
    },
    {
      type: 'ordering',
      title: 'Put in chronological order',
      items: [
        'Gutenberg’s printing press',
        'Foundation of Stanford University',
        'Turing’s paper on machine intelligence',
        'The Web becomes public',
        'Google is founded',
        'ChatGPT is released',
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Which university is NOT in the Ivy League?', choices: ['Harvard', 'Yale', 'Stanford', 'Princeton'], answer: 2, explanation: 'Stanford is a private university in California but not part of the Ivy League.' },
        { question: 'A “unicorn” is…', choices: ['a failed start-up', 'a start-up valued over $1 billion', 'a research grant', 'a type of patent'], answer: 1 },
        { question: 'What does GDPR protect?', choices: ['Inventions', 'Personal data', 'Copyright of films', 'Carbon emissions'], answer: 1 },
        { question: 'In 1997, Deep Blue beat…', choices: ['Lee Sedol', 'Garry Kasparov', 'Alan Turing', 'Bill Gates'], answer: 1 },
        { question: 'Which is a “false friend”?', choices: ['a patent', 'a lecture', 'a campus', 'a scholarship'], answer: 1, explanation: 'A lecture = un cours magistral, not une lecture.' },
        { question: 'Who wrote Frankenstein?', choices: ['Mary Shelley', 'George Orwell', 'Jane Austen', 'H. G. Wells'], answer: 0 },
        { question: 'Which factor does NOT explain Silicon Valley’s success?', choices: ['Stanford University', 'Venture capital', 'Strict state control of companies', 'Global talent'], answer: 2 },
        { question: '“Greenwashing” means…', choices: ['recycling plastic', 'pretending to be more eco-friendly than you are', 'planting trees', 'cleaning data'], answer: 1 },
      ],
    },
    {
      type: 'truefalse',
      title: 'True or false?',
      statements: [
        { text: 'The Paris Agreement was signed in 2015.', answer: true },
        { text: 'A patent protects an invention forever.', answer: false, explanation: 'It lasts a limited time, usually 20 years.' },
        { text: 'In British English, a “public school” is a state school.', answer: false, explanation: 'It is an elite private school; a state school is public.' },
        { text: 'The phrase “artificial intelligence” was coined in 1956.', answer: true },
        { text: 'The digital divide only concerns poor countries.', answer: false, explanation: 'It also exists within rich countries (rural areas, low-income households, older people).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Complete the paragraph',
      text: 'Many {{start-ups|startups}} in Silicon Valley are financed by {{venture capital}}. The region has strong links with universities such as {{Stanford}}. In 2018 the EU introduced the {{GDPR}} to protect personal {{data}}.',
    },
    {
      type: 'reveal',
      title: 'Exemple de plan de synthèse (cliquer pour révéler)',
      content: [
        { type: 'p', text: '**Problématique :** To what extent does technology democratise knowledge while creating new dependencies?' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Technology opens access to knowledge (Web, Wikipedia, MOOCs).',
            'But access remains unequal (digital divide) and controlled by a few companies (Big Tech, data).',
            'Hence a need for rules and education (GDPR, critical thinking, open access).',
          ],
        },
      ],
    },
  ],
}

export default chapter
