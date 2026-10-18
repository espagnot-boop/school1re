import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'art-pouvoir-citoyennete-virtuel',
  subject: 'anglais',
  order: 2,
  title: 'Art and Power · Citizenship and Virtual Worlds',
  theme: 'Axes 3 & 4',
  summary:
    "Axes 3 et 4 : l’art comme outil de pouvoir ou de contestation (portraits, propagande, street art, poésie) ; la citoyenneté à l’ère numérique, entre engagement en ligne et dérives des mondes virtuels.",
  duration: '4 semaines',
  objectives: [
    "Expliquer comment le pouvoir utilise l’art (propagande, mécénat, image) et comment les artistes le contestent.",
    "Analyser une œuvre ou un extrait (poème, discours, image) en anglais.",
    "Présenter les formes d’engagement citoyen en ligne et leurs limites (fake news, cyberharcèlement, bulles de filtres).",
    "Mobiliser des repères : Elizabeth I, Wilfred Owen, Harlem Renaissance, Banksy, Obama, Amanda Gorman, #MeToo, Black Lives Matter, Greta Thunberg…",
    "Rédiger un commentaire ou un paragraphe argumenté sur ces thèmes (120–200 mots).",
  ],
  keywords: ['propaganda', 'censorship', 'street art', 'protest', 'activism', 'fake news', 'cyberbullying', 'virtual reality'],

  fiche: [
    { type: 'h2', text: 'Axis 3 — Art and Power' },
    {
      type: 'list',
      items: [
        "**Problématiques** : How do rulers use art to build their image? Can art resist power? Where does freedom of expression stop?",
        "**Art for power** : Tudor portraits (Elizabeth I, Armada Portrait, c. 1588) ; propaganda posters ; Obama’s “Hope” poster (Shepard Fairey, 2008) ; official portraits (Kehinde Wiley’s portrait of Barack Obama, 2018).",
        "**Art against power** : Wilfred Owen (WWI poetry) ; Chaplin, *The Great Dictator* (1940) ; Billie Holiday, *Strange Fruit* (1939) ; Orwell, *Animal Farm* (1945) ; Banksy ; Rushdie’s *The Satanic Verses* (1988).",
        "**Poetry and ceremony** : Amanda Gorman, *The Hill We Climb* (inauguration of Joe Biden, 20 January 2021).",
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'propaganda', value: 'information used to promote a political cause' },
        { key: 'censorship', value: 'the banning of ideas, books or images by authority' },
        { key: 'to challenge authority', value: 'to question and resist those in power' },
        { key: 'a patron', value: 'a rich person or institution that funds artists' },
        { key: 'satire', value: 'humour used to criticise politics or society' },
      ],
    },
    { type: 'h2', text: 'Axis 4 — Citizenship and Virtual Worlds' },
    {
      type: 'list',
      items: [
        "**Problématiques** : Can one be an active citizen online? Do social networks strengthen or weaken democracy? What is real in a virtual world?",
        "**Repères** : Obama’s 2008 online campaign ; #BlackLivesMatter (2013) ; #MeToo (2017) ; Greta Thunberg and *Fridays for Future* (2018) ; Cambridge Analytica (2018) ; *The Matrix* (1999) ; *Black Mirror* (2011) ; *Ready Player One* (novel 2011, film 2018) ; Meta (2021).",
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'a hashtag campaign', value: 'online movement organised around a keyword' },
        { key: 'fake news / disinformation', value: 'false information spread on purpose' },
        { key: 'cyberbullying', value: 'harassment of someone online' },
        { key: 'a filter bubble', value: 'an online space where you only see views like yours' },
        { key: 'the digital divide', value: 'the gap between those with and without internet access' },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        { type: 'p', text: "Deux idées-clés : (1) l’art est **à la fois un instrument et un contre-pouvoir** ; (2) Internet est **à la fois un outil d’émancipation et un risque** pour la démocratie. Toujours présenter les deux faces." },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Part 1 — Art and Power' },
    { type: 'h3', text: '1. Art serving power: image and propaganda' },
    {
      type: 'p',
      text: "Rulers have always used art to display their authority. **Queen Elizabeth I** (reigned 1558–1603) carefully controlled her image through portraits: in the **Armada Portrait** (c. 1588), painted after the English victory over the Spanish Armada, her hand rests on a globe, a symbol of ambition and empire. Her face never aged in official paintings, projecting an image of permanent, almost divine power. Before her, **Henry VIII** had been portrayed by **Hans Holbein** as a larger-than-life, imposing figure.",
    },
    {
      type: 'p',
      text: "In the modern age, governments use posters, films and slogans. During the First World War, the British poster “**Your Country Needs YOU**” (1914) showing Lord Kitchener recruited hundreds of thousands of volunteers. In the 21st century, art is also a tool of political communication: **Shepard Fairey**’s red, white and blue poster “**Hope**” became the icon of Barack Obama’s 2008 campaign, and in 2018 the first official portraits of Barack and Michelle Obama, by **Kehinde Wiley** and **Amy Sherald**, broke with tradition by choosing Black artists.",
    },
    { type: 'h3', text: '2. Art against power: resistance and protest' },
    {
      type: 'p',
      text: "Artists can denounce abuses of power. **Wilfred Owen**, a soldier-poet killed in November 1918, attacked the glorification of war in *Dulce et Decorum Est*: he called the idea that “it is sweet and right to die for one’s country” “**the old Lie**”. In 1940, **Charlie Chaplin** mocked Hitler in *The Great Dictator*. **George Orwell**’s *Animal Farm* (1945) is an allegory of the Russian Revolution and Stalinism: “All animals are equal, but some animals are more equal than others.”",
    },
    {
      type: 'p',
      text: "In the USA, the **Harlem Renaissance** of the 1920s gave a voice to African-American artists. **Langston Hughes** wrote in *I, Too*: “I, too, sing America. / I am the darker brother.” In 1939, **Billie Holiday** recorded *Strange Fruit*, a song about the lynching of Black Americans in the South. In the 1960s, folk singers such as **Bob Dylan** (*The Times They Are a-Changin’*, 1964) became the voices of the civil rights and anti-war movements.",
    },
    {
      type: 'quote',
      text: "My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori.",
      author: 'Wilfred Owen',
      source: 'Dulce et Decorum Est (written 1917, published 1920) — extract',
    },
    { type: 'h3', text: '3. Street art and the limits of expression' },
    {
      type: 'p',
      text: "**Banksy**, the anonymous street artist from Bristol, uses stencils to criticise war, consumerism and the treatment of migrants. In **October 2018**, his painting *Girl with Balloon* partly shredded itself just after being sold at Sotheby’s for about £1 million: the artwork, renamed *Love is in the Bin*, became a comment on the art market itself. Freedom of expression has limits, however: in 1989 Ayatollah Khomeini issued a **fatwa** against **Salman Rushdie** after the publication of *The Satanic Verses* (1988); Rushdie lived in hiding for years and was seriously wounded in an attack in New York in 2022.",
    },
    { type: 'h3', text: '4. Poetry in the heart of power' },
    {
      type: 'p',
      text: "On **20 January 2021**, at the inauguration of President Joe Biden, 22-year-old **Amanda Gorman** recited her poem *The Hill We Climb*, in the tradition of Maya Angelou (1993) and Robert Frost (1961). She said: “For there is always light, / if only we’re brave enough to see it. / If only we’re brave enough to be it.” Here art does not oppose power: it gives it a vision and calls the nation to unity.",
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Comment analyser une image ou un tableau',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Describe', text: 'In the foreground / background / on the left, we can see… The colours are…' },
            { title: 'Identify', text: 'Author, date, medium (oil painting, poster, mural), context.' },
            { title: 'Interpret', text: 'The artist wants to show/denounce/glorify… The … symbolises…' },
            { title: 'Conclude', text: 'Who is the target audience? What effect is produced? Link to the axis.' },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Useful phrases — Art and Power',
      content: [
        {
          type: 'list',
          items: [
            'to glorify / to denounce / to condemn',
            'to convey a message',
            'to shape public opinion',
            'to raise awareness of injustice',
            'to be banned / to be censored',
            'an iconic image',
            'a masterpiece / a piece of work',
            'to give a voice to the voiceless',
          ],
        },
      ],
    },

    { type: 'h2', text: 'Part 2 — Citizenship and Virtual Worlds' },
    { type: 'h3', text: '1. Online activism: a new way to be a citizen' },
    {
      type: 'p',
      text: "Digital tools allow citizens to organise quickly. **Barack Obama**’s 2008 campaign used websites and social networks to raise funds and mobilise young voters. The hashtag **#BlackLivesMatter** appeared in 2013 after the acquittal of the man who killed Trayvon Martin and spread worldwide after the death of **George Floyd** (25 May 2020). **#MeToo**, popularised in October 2017 (the phrase was first used by activist **Tarana Burke** in 2006), encouraged women to speak out about sexual harassment. The Swedish teenager **Greta Thunberg** started a school strike for the climate in August 2018, which grew into the global movement *Fridays for Future*.",
    },
    {
      type: 'p',
      text: "Critics speak of **“slacktivism”**: liking or sharing a post is easy but may not lead to real change. Yet these movements have often led to concrete action in the streets, in courts and in politics.",
    },
    { type: 'h3', text: '2. Dangers: disinformation, bubbles and harassment' },
    {
      type: 'p',
      text: "The same networks can be dangerous for democracy. During the 2016 US presidential election, **fake news** spread massively. In 2018, the **Cambridge Analytica** scandal revealed the misuse of personal data from Facebook. Algorithms create **filter bubbles**: users mostly see opinions similar to their own, which reinforces polarisation. **Cyberbullying** affects many teenagers, with the anonymity of the internet encouraging cruelty. Finally, the **digital divide** excludes people without internet access or digital skills.",
    },
    { type: 'h3', text: '3. Virtual worlds in fiction and reality' },
    {
      type: 'p',
      text: "Fiction explores the risk of confusing virtual and real life. In the film **The Matrix** (1999), humans live in a simulated reality created by machines. The TV series **Black Mirror** (created by Charlie Brooker, 2011) imagines the dark side of technology. In **Ready Player One** (novel by Ernest Cline, 2011; film by Steven Spielberg, 2018), people escape a poor and polluted world in the OASIS, a giant virtual universe. In reality, online games, **Second Life** (2003) and the **metaverse** (Facebook renamed itself **Meta** in October 2021) raise questions: Who owns a virtual world? Can rules and rights exist there? Is a virtual friendship real?",
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Opportunities', text: 'Quick mobilisation, free expression, global solidarity, access to knowledge (Wikipedia), remote education.', icon: 'Megaphone' },
        { title: 'Risks', text: 'Fake news, cyberbullying, filter bubbles, addiction, data exploitation, digital divide.', icon: 'ShieldAlert' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Grammar focus — reported speech',
      content: [
        {
          type: 'p',
          text: "Pour rapporter des paroles au passé, on **recule d’un temps** : “I **am** worried” → She said (that) she **was** worried. “I **have seen** it” → He said he **had seen** it. *will* → *would* ; *can* → *could*. Les marqueurs changent : *now → then*, *today → that day*, *tomorrow → the next day*, *here → there*.",
        },
        { type: 'p', text: "Questions : “Why **are** you here?” → She asked me why I **was** there (ordre de la phrase affirmative, pas de *do*)." },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Model paragraph (about 140 words)',
      content: [
        {
          type: 'p',
          text: "*Do social networks help democracy?* In my opinion, they are a double-edged sword. On the one hand, they give a voice to people who are usually ignored. For example, the #MeToo movement, which started in 2017, enabled thousands of women to denounce harassment and led to real consequences in the workplace. Likewise, Greta Thunberg turned a lonely school strike into a global climate movement. On the other hand, social networks spread fake news very quickly: in 2016, false stories reached millions of voters during the American election. Moreover, algorithms lock users in filter bubbles, which makes debate more difficult. Therefore, I think that citizens should learn to check their sources, and platforms should be held responsible for what they promote. In short, the internet can strengthen democracy, but only if its users remain critical.",
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex-vocab-2',
      title: 'Vocabulary — art, power and the internet',
      difficulty: 1,
      duration: 10,
      tags: ['vocabulaire'],
      statement: [
        { type: 'p', text: 'Match each French expression with its English translation, then use three of them in sentences.' },
        {
          type: 'table',
          headers: ['Français', 'English (to find)'],
          rows: [
            ['la propagande', '…'],
            ['la censure', '…'],
            ['dénoncer', '…'],
            ['le cyberharcèlement', '…'],
            ['les fausses informations', '…'],
            ['un lanceur de mouvement / un militant', '…'],
            ['la fracture numérique', '…'],
            ['une bulle de filtres', '…'],
          ],
        },
      ],
      hints: ['Relisez la fiche : tous les termes y figurent.'],
      solution: [
        {
          type: 'table',
          headers: ['Français', 'English'],
          rows: [
            ['la propagande', 'propaganda'],
            ['la censure', 'censorship'],
            ['dénoncer', 'to denounce / to condemn'],
            ['le cyberharcèlement', 'cyberbullying'],
            ['les fausses informations', 'fake news / disinformation'],
            ['un militant', 'an activist'],
            ['la fracture numérique', 'the digital divide'],
            ['une bulle de filtres', 'a filter bubble'],
          ],
        },
        { type: 'p', text: "Exemples : *Propaganda posters encouraged men to join the army. Banksy denounces consumerism. The digital divide excludes many elderly people.*" },
      ],
    },
    {
      id: 'ex-compr-2',
      title: 'Reading comprehension — Amanda Gorman',
      difficulty: 1,
      duration: 15,
      tags: ['compréhension'],
      statement: [
        {
          type: 'quote',
          text: 'For there is always light, / if only we’re brave enough to see it. / If only we’re brave enough to be it.',
          author: 'Amanda Gorman',
          source: 'The Hill We Climb, 20 January 2021 (extract)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Who wrote and recited this poem, and on what occasion?',
            'What does “light” symbolise here?',
            'Which stylistic device is used in the repetition of “if only we’re brave enough”? What is its effect?',
            'Is the message pessimistic or optimistic? Justify.',
            'Does this poem serve power or challenge it? Discuss in 3 lines.',
          ],
        },
      ],
      hints: ['La lumière s’oppose aux ténèbres : espoir, vérité, avenir.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Amanda Gorman, a young American poet, recited it at Joe Biden’s presidential inauguration on 20 January 2021.',
            '“Light” symbolises hope, truth and a better future after a period of division.',
            'It is an **anaphora** (repetition at the beginning of lines). It gives rhythm, insists on the idea of courage and makes the audience feel they are part of the message (“we”).',
            'Optimistic: “there is always light” shows that hope remains even in dark times, but it depends on our courage.',
            'It mainly supports the ceremony of power by calling for national unity, but it also challenges the nation to face its divisions and to act: the artist is both a guest of power and a conscience.',
          ],
        },
      ],
    },
    {
      id: 'ex-trad-2',
      title: 'Traduction — thème et version',
      difficulty: 2,
      duration: 20,
      tags: ['traduction'],
      statement: [
        { type: 'h3', text: 'Version (anglais → français)' },
        { type: 'p', text: '“Banksy’s works are often found on the walls of cities, where they can be seen by everyone. Although he has never revealed his identity, he has become one of the most famous artists in the world.”' },
        { type: 'h3', text: 'Thème (français → anglais)' },
        { type: 'p', text: '« Les réseaux sociaux permettent à des jeunes de se mobiliser pour le climat, mais ils diffusent aussi de fausses informations. »' },
      ],
      hints: ['Version : *Although* = bien que ; *has never revealed* = present perfect (« n’a jamais révélé »).', 'Thème : *permettre à quelqu’un de* = **to allow/enable someone to** + infinitif.'],
      solution: [
        { type: 'p', text: "**Version** : « Les œuvres de Banksy se trouvent souvent sur les murs des villes, où tout le monde peut les voir. Bien qu’il n’ait jamais révélé son identité, il est devenu l’un des artistes les plus célèbres du monde. »" },
        { type: 'p', text: "**Thème** : “Social networks enable young people to mobilise for the climate, but they also spread fake news.” (*news* est indénombrable : *fake news* → verbe sans -s au pluriel ; ici « spread » est le verbe de *they*.)" },
      ],
    },
    {
      id: 'ex-grammar-2',
      title: 'Grammar — reported speech',
      difficulty: 2,
      duration: 12,
      tags: ['grammaire'],
      statement: [
        { type: 'p', text: 'Turn the following sentences into reported speech (introductory verb in the past).' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Greta Thunberg: “I am not going to school today.”',
            'The journalist: “Have you ever used social networks to protest?”',
            'The artist: “I will paint a new mural tomorrow.”',
            'The teacher: “Don’t believe everything you read online.”',
          ],
        },
      ],
      hints: ['Reculez le temps, adaptez les marqueurs (today, tomorrow) et les pronoms.', 'Impératif → *told us (not) to + infinitif*.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Greta Thunberg said (that) she was not going to school that day.',
            'The journalist asked whether/if I had ever used social networks to protest.',
            'The artist said he would paint a new mural the next day.',
            'The teacher told us not to believe everything we read online.',
          ],
        },
      ],
    },
    {
      id: 'ex-ecrit-3',
      title: 'Expression écrite — Art and power (150 words)',
      difficulty: 2,
      duration: 30,
      tags: ['expression écrite'],
      statement: [
        { type: 'p', text: '**Subject:** *“Can art really change the world?”* Write a paragraph of about 150 words with at least one example from the axis and one counter-argument.' },
      ],
      hints: ['Exemples : Strange Fruit, Owen, Banksy, Chaplin.', 'Nuance : l’art influence les mentalités, mais change rarement seul les lois.'],
      solution: [
        {
          type: 'p',
          text: "I believe that art can change the world, but rarely on its own. First, art can make people aware of injustice. Billie Holiday’s song *Strange Fruit*, recorded in 1939, shocked audiences by describing the lynching of Black Americans, and it contributed to a climate in which the civil rights movement could grow. Similarly, Wilfred Owen’s poems showed the horror of the trenches and challenged the idea that dying for one’s country was glorious. Furthermore, a striking image such as Banksy’s murals reaches people who never go to museums. Nevertheless, art alone does not change laws or governments: it needs activists, voters and politicians to turn emotion into action. Besides, regimes often censor artists, as Rushdie’s case shows. In conclusion, art is a powerful spark that changes minds, and changing minds is the first step towards changing the world.",
        },
      ],
    },
    {
      id: 'ex-doc-2',
      title: 'Document analysis — Orwell’s Animal Farm',
      difficulty: 3,
      duration: 25,
      tags: ['compréhension', 'type bac'],
      statement: [
        {
          type: 'quote',
          text: 'The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.',
          author: 'George Orwell',
          source: 'Animal Farm, 1945 — final sentence',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Describe the situation at the end of the novel in your own words (2 lines).',
            'What does the final sentence suggest about the pigs?',
            'Which political reality does this allegory refer to?',
            'Why is satire a good weapon against power? (4–5 lines, with another example from the axis)',
          ],
        },
      ],
      hints: ['Les cochons ont pris les habitudes des fermiers humains qu’ils avaient chassés.', 'Satire : rire permet de dire ce qu’on ne peut pas dire ouvertement.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'The animals who had overthrown the human farmer now look through the window at the pigs and the human farmers having dinner together: the pigs behave exactly like humans.',
            'The pigs have become as corrupt, greedy and oppressive as the humans they replaced; the revolution has been betrayed.',
            'The novel is an allegory of the Russian Revolution of 1917 and of the Stalinist dictatorship in the USSR.',
            'Satire uses humour and exaggeration to criticise those in power while being harder to censor than direct attack, and it is easy to remember. Chaplin’s *The Great Dictator* (1940) did the same: by making Hitler ridiculous, it weakened his image of invincibility.',
          ],
        },
      ],
    },
    {
      id: 'ex-ecrit-4',
      title: 'Expression écrite — Virtual worlds (type bac)',
      difficulty: 3,
      duration: 35,
      tags: ['expression écrite', 'type bac'],
      statement: [
        { type: 'p', text: '**Subject (about 200 words):** *“Virtual worlds: an escape from reality or a new space for citizens?”* Take a stand and illustrate it with at least two references (fiction, real events).' },
      ],
      hints: ['Ready Player One et The Matrix pour la fiction ; #MeToo, BLM, Fridays for Future pour la citoyenneté.', 'Terminez par une position nuancée.'],
      solution: [
        {
          type: 'p',
          text: "Virtual worlds are often seen as a way to escape reality, but I would argue that they can also become genuine spaces of citizenship. Fiction warns us about the first danger. In *Ready Player One*, people spend their lives in the OASIS because the real world has become poor and polluted, and in *The Matrix* humans do not even realise that their reality is an illusion. In both cases, virtual life makes people passive. However, real events show another face of the internet. The hashtags #MeToo and #BlackLivesMatter began online but led to demonstrations, new laws and a change in attitudes. Likewise, Greta Thunberg’s school strike for the climate became global thanks to social networks. Admittedly, these platforms also spread fake news and allow cyberbullying, so users must learn to think critically. Moreover, the digital divide reminds us that not everybody can take part. To sum up, virtual worlds are neither good nor bad in themselves: they are what citizens make of them.",
        },
      ],
    },
  ],

  representations: [
    {
      type: 'flashcards',
      cards: [
        { front: 'la propagande', back: 'propaganda' },
        { front: 'la censure / censurer', back: 'censorship / to censor' },
        { front: 'un chef-d’œuvre', back: 'a masterpiece' },
        { front: 'un portrait officiel', back: 'an official portrait' },
        { front: 'dénoncer', back: 'to denounce / to condemn' },
        { front: 'un mécène', back: 'a patron' },
        { front: 'la satire', back: 'satire' },
        { front: 'l’art de rue, un graffeur', back: 'street art, a graffiti artist' },
        { front: 'un pochoir', back: 'a stencil' },
        { front: 'contester l’autorité', back: 'to challenge authority' },
        { front: 'véhiculer un message', back: 'to convey a message' },
        { front: 'sensibiliser', back: 'to raise awareness' },
        { front: 'un militant', back: 'an activist' },
        { front: 'un hashtag / un mot-dièse', back: 'a hashtag' },
        { front: 'les fausses informations', back: 'fake news' },
        { front: 'le cyberharcèlement', back: 'cyberbullying' },
        { front: 'une bulle de filtres', back: 'a filter bubble' },
        { front: 'la fracture numérique', back: 'the digital divide' },
        { front: 'une pétition en ligne', back: 'an online petition' },
        { front: 'la réalité virtuelle', back: 'virtual reality' },
        { front: 'un réseau social', back: 'a social network' },
        { front: 'se mobiliser', back: 'to mobilise / to rally' },
      ],
    },
    {
      type: 'matching',
      title: 'Work — Author',
      pairs: [
        { left: 'Animal Farm (1945)', right: 'George Orwell' },
        { left: 'Dulce et Decorum Est', right: 'Wilfred Owen' },
        { left: 'I, Too', right: 'Langston Hughes' },
        { left: 'The Great Dictator (1940)', right: 'Charlie Chaplin' },
        { left: 'The Satanic Verses (1988)', right: 'Salman Rushdie' },
        { left: 'The Hill We Climb (2021)', right: 'Amanda Gorman' },
        { left: 'Ready Player One (2011)', right: 'Ernest Cline' },
        { left: 'Black Mirror (2011)', right: 'Charlie Brooker' },
      ],
    },
    {
      type: 'matching',
      title: 'Movement — Year',
      pairs: [
        { left: '#BlackLivesMatter (hashtag)', right: '2013' },
        { left: '#MeToo (viral hashtag)', right: '2017' },
        { left: 'Greta Thunberg’s school strike', right: '2018' },
        { left: 'Fairey’s “Hope” poster', right: '2008' },
        { left: 'Facebook becomes Meta', right: '2021' },
        { left: 'The Matrix', right: '1999' },
      ],
    },
    {
      type: 'cloze',
      title: 'Complete the text',
      text: "The {{Armada}} Portrait shows Queen {{Elizabeth}} I as a powerful ruler. In {{Animal Farm}}, Orwell uses an {{allegory}} to criticise Stalinism. Banksy is a {{street}} artist from Bristol. {{Fake}} news and cyberbullying are two dangers of social networks, but hashtags such as #{{MeToo}} also give a voice to victims.",
    },
    {
      type: 'truefalse',
      title: 'True or false?',
      statements: [
        { text: 'Wilfred Owen was a poet who fought in the First World War.', answer: true },
        { text: 'Shepard Fairey designed the “Hope” poster for Obama’s 2008 campaign.', answer: true },
        { text: 'Amanda Gorman recited her poem at the 2009 inauguration of Barack Obama.', answer: false, explanation: 'It was at Joe Biden’s inauguration, in 2021.' },
        { text: 'Animal Farm is an allegory of the Russian Revolution.', answer: true },
        { text: '“Slacktivism” means taking real, costly action for a cause.', answer: false, explanation: 'It refers to low-effort online support such as liking or sharing.' },
        { text: 'The OASIS is a virtual universe in Ready Player One.', answer: true },
      ],
    },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Which queen is shown in the Armada Portrait?',
          choices: ['Victoria', 'Elizabeth I', 'Mary I', 'Elizabeth II'],
          answer: 1,
        },
        {
          question: '“Reported speech”: She said, “I am tired.” →',
          choices: ['She said she is tired.', 'She said she was tired.', 'She said she has been tired.', 'She said I was tired.'],
          answer: 1,
          explanation: 'Present → past simple (backshift).',
        },
        {
          question: 'Who is the author of The Satanic Verses?',
          choices: ['Zadie Smith', 'Salman Rushdie', 'Orwell', 'Dylan'],
          answer: 1,
        },
        {
          question: 'A filter bubble is…',
          choices: ['a type of soap', 'a space where you only see similar opinions online', 'a virtual money', 'a hacking technique'],
          answer: 1,
        },
        {
          question: 'Which movement started in 2017 against sexual harassment?',
          choices: ['#MeToo', '#BlackLivesMatter', '#Occupy', '#Brexit'],
          answer: 0,
        },
        {
          question: 'Which of these is a literary device that repeats words at the beginning of lines?',
          choices: ['Metaphor', 'Anaphora', 'Oxymoron', 'Irony'],
          answer: 1,
        },
        {
          question: 'Billie Holiday’s Strange Fruit is a song about…',
          choices: ['love', 'the lynching of Black Americans', 'the Armada', 'the Internet'],
          answer: 1,
        },
      ],
    },
    {
      type: 'timeline',
      events: [
        { date: 'c. 1588', title: 'Armada Portrait of Elizabeth I' },
        { date: '1914', title: '“Your Country Needs YOU” poster' },
        { date: '1917–18', title: 'Wilfred Owen writes his war poems' },
        { date: '1939', title: 'Billie Holiday records Strange Fruit' },
        { date: '1940', title: 'Chaplin’s The Great Dictator' },
        { date: '1945', title: 'Orwell publishes Animal Farm' },
        { date: '1989', title: 'Fatwa against Salman Rushdie' },
        { date: '2008', title: 'Obama’s “Hope” poster and online campaign' },
        { date: '2013', title: '#BlackLivesMatter is born' },
        { date: '2017', title: '#MeToo goes viral' },
        { date: '2018', title: 'Fridays for Future; Banksy shredded painting; Obama portraits' },
        { date: '2021', title: 'Amanda Gorman at Biden’s inauguration' },
      ],
    },
    {
      type: 'widget',
      id: 'verb-conjugator',
      props: { lang: 'en', verb: 'say' },
      title: 'Verb tenses — say / said / said',
      caption: 'Testez le recul des temps pour le discours rapporté : say, tell, ask, speak…',
    },
    {
      type: 'reveal',
      title: 'Méthode : commenter une œuvre d’art en anglais',
      content: [
        { type: 'p', text: "Utilisez ce canevas : *The document I have chosen is… It was created by… in… It shows… The artist wants to… In the foreground… This reminds me of… To conclude, this work illustrates the notion of Art and Power because…*" },
      ],
    },
  ],
}

export default chapter
