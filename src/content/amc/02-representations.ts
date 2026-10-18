import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'representations',
  subject: 'amc',
  order: 2,
  title: 'Représentations',
  theme: 'Thématique 2 — Représentations',
  summary:
    'Faire entendre sa voix (pouvoirs, contre-pouvoirs, citoyenneté), informer et s’informer (médias, liberté de la presse, fake news, photojournalisme), représenter le monde et se représenter (stéréotypes, symboles, cinéma).',
  duration: '8 semaines',
  objectives: [
    'Comprendre comment les citoyens font entendre leur voix dans les démocraties anglophones (vote, manifestation, mouvements sociaux).',
    'Analyser le rôle des médias, la liberté de la presse et les mécanismes de la désinformation.',
    'Décrypter une image (photojournalisme) ou une séquence de film : cadrage, point de vue, intention.',
    'Identifier et déconstruire stéréotypes, clichés et symboles du monde anglophone.',
    'Mobiliser des repères datés et des œuvres de référence dans une synthèse ou un essai.',
    'Rédiger en anglais (B2) analyses, synthèses, essais et traductions.',
  ],
  keywords: [
    'free press',
    'First Amendment',
    'fake news',
    'misinformation',
    'photojournalism',
    'stereotype',
    'representation',
    'civil rights',
    'protest',
    'propaganda',
  ],

  fiche: [
    { type: 'h2', text: 'The programme at a glance' },
    {
      type: 'table',
      headers: ['Axe d’étude', 'Questions clés', 'Exemples / terrains'],
      rows: [
        [
          '**Axe 1** — Faire entendre sa voix : représentation et participation',
          'Qui a le droit de parler ? Comment agir en démocratie ?',
          'Suffragettes, Civil Rights, #MeToo, Black Lives Matter, vote, pétitions',
        ],
        [
          '**Axe 2** — Informer et s’informer',
          'Peut-on faire confiance aux médias ? Qui contrôle l’information ?',
          'First Amendment, Watergate, BBC, Fox/CNN, fake news, photojournalisme',
        ],
        [
          '**Axe 3** — Représenter le monde et se représenter',
          'Comment les images fabriquent-elles nos idées sur les autres ?',
          'Stéréotypes, Hollywood, symboles (Union Jack, Statue of Liberty), diversité à l’écran',
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
            '**Representation** has two meanings: *political* (elected people act for citizens) and *cultural* (how people/groups are shown in images and stories).',
            '**Checks and balances / counter-powers**: courts, free press, civil society limit those in power.',
            '**Misinformation** = false information shared without intent to harm; **disinformation** = deliberately false; **propaganda** = information used to push a cause.',
            'A **stereotype** is a simplified, fixed idea about a group. Repeated images can make it look like “truth”.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'Repères chronologiques' },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['1215', 'Magna Carta: the king is subject to law'],
        ['1644', 'Milton’s *Areopagitica* defends freedom of expression'],
        ['1735', 'Zenger trial (colonial New York): truth as defence against libel'],
        ['1791', 'First Amendment (freedom of speech, religion, press)'],
        ['1863', 'Gettysburg Address (Lincoln)'],
        ['1913', 'Emily Davison dies at the Derby: suffragette movement'],
        ['1918 / 1928 (UK), 1920 (US)', 'Votes for women (UK partial 1918, equal 1928; US 19th Amendment 1920)'],
        ['1936', 'Dorothea Lange, *Migrant Mother*'],
        ['1938', 'Radio broadcast of *The War of the Worlds* (Orson Welles)'],
        ['1955–1965', 'US Civil Rights Movement (Rosa Parks 1955; March on Washington 1963; Voting Rights Act 1965)'],
        ['1972–1974', 'Watergate scandal: Nixon resigns'],
        ['1978', 'Edward Said, *Orientalism*'],
        ['2013 / 2017', '#BlackLivesMatter / #MeToo go viral'],
        ['2016–2017', 'Brexit, Trump election; “fake news” becomes mainstream; “fake news” is Collins Word of the Year 2017'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Méthode express — analyser une image',
      content: [
        {
          type: 'p',
          text: '**Describe** (what do we see? foreground/background) → **Context** (date, photographer, publication) → **Interpret** (framing, angle, light, colours, caption) → **Evaluate** (message, impact, possible manipulation).',
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Axe 1 — Making one’s voice heard: representation and participation' },
    { type: 'h3', text: '1. Powers and counter-powers' },
    {
      type: 'p',
      text: 'In democracies, power is divided and controlled. In the **USA**, the Constitution (1787) separates the legislative (Congress), executive (President) and judicial (Supreme Court) branches: this is the system of **checks and balances**. In the **UK**, Parliament is sovereign and the monarch’s role is symbolic; the *Magna Carta* (1215) is the historical symbol of limits placed on royal power. Besides institutions, **counter-powers** exist: independent courts, a free press, trade unions, NGOs and citizens’ movements.',
    },
    {
      type: 'table',
      headers: ['', 'United Kingdom', 'United States'],
      rows: [
        ['Head of state', 'Monarch (since 2022 Charles III), symbolic', 'President, elected, real power'],
        ['Legislature', 'Parliament (Commons, Lords)', 'Congress (House, Senate)'],
        ['Constitution', 'Not a single written document', 'Written (1787), with Amendments'],
        ['Voting', 'First-past-the-post, general election', 'Electoral College for the presidency'],
      ],
      caption: 'Two political systems',
    },
    { type: 'h3', text: '2. Citizens in action' },
    {
      type: 'p',
      text: 'Voting is only one form of participation. Others include petitions, strikes, demonstrations, boycotts, lobbying and **online activism** (hashtag campaigns). Social movements have changed laws:',
    },
    {
      type: 'timeline',
      events: [
        { date: '1903–1918', title: 'The Suffragettes', text: 'Emmeline Pankhurst’s WSPU used militant tactics (“Deeds not words”) to win votes for women in the UK.' },
        { date: '1955–1965', title: 'Civil Rights', text: 'Rosa Parks and the Montgomery bus boycott (1955); in 1963 Martin Luther King’s “I have a dream” speech at the March on Washington; Civil Rights Act 1964, Voting Rights Act 1965.' },
        { date: '2013', title: '#BlackLivesMatter', text: 'Born online after the death of Trayvon Martin; protests worldwide, especially in 2020.' },
        { date: '2017', title: '#MeToo', text: 'Hashtag used by millions to denounce sexual harassment and abuse.' },
        { date: '2018–', title: 'Youth climate strikes', text: 'Greta Thunberg’s school strike inspires “Fridays for Future”.' },
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Public-domain voice',
      content: [
        { type: 'quote', text: 'Government of the people, by the people, for the people.', author: 'Abraham Lincoln', source: 'Gettysburg Address, 1863' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Attention',
      content: [
        {
          type: 'p',
          text: 'Do not confuse **to demonstrate / a demonstration** (manifester) and **a demonstration of a product**; and note **rally** (meeting politique), **march**, **sit-in**, **strike** (grève), **picket line** (piquet de grève).',
        },
      ],
    },
    { type: 'h3', text: '3. Digital citizenship' },
    {
      type: 'p',
      text: 'Social networks let anyone speak and organise quickly (the Arab Spring, 2011; #MeToo), but they may also create **echo chambers** (people only see opinions like their own), encourage online harassment and allow political manipulation. “Clicktivism” (liking or sharing instead of acting) is criticised as shallow.',
    },

    { type: 'h2', text: 'Axe 2 — Informing and being informed' },
    { type: 'h3', text: '1. Freedom of the press' },
    {
      type: 'p',
      text: 'John Milton’s *Areopagitica* (1644) argued against censorship. In 1735 the printer **John Peter Zenger** was acquitted in New York after publishing criticism of the governor: truth became a defence. The **First Amendment** (1791) forbids Congress from limiting freedom of speech or of the press. The press is called the **“Fourth Estate”**: a counter-power watching the government.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Watergate (1972–1974)',
      content: [
        {
          type: 'p',
          text: 'Washington Post journalists Bob Woodward and Carl Bernstein, helped by an anonymous source (“Deep Throat”), investigated a break-in at Democratic Party headquarters. Their reporting revealed that President Nixon’s team had tried to cover it up; Nixon **resigned** in August 1974. In 1971 the **Pentagon Papers** (secret documents on the Vietnam War) had already shown the importance of investigative journalism and the courts’ protection of the press. The film *All the President’s Men* (1976) and *The Post* (2017) dramatise these cases.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Country / model', 'Media features'],
      rows: [
        ['UK', 'BBC: public service broadcaster funded by the licence fee; tabloids (*The Sun*) vs. broadsheets (*The Guardian*, *The Times*); press regulation debated after the phone-hacking scandal (2011)'],
        ['USA', 'Strong First Amendment tradition; commercial networks; partisan TV news (Fox News, MSNBC); local newspapers in decline'],
        ['Both', 'Newspapers lose readers and advertising to online platforms; subscriptions and paywalls; “news deserts”'],
      ],
    },
    { type: 'h3', text: '2. Misinformation and fake news' },
    {
      type: 'p',
      text: 'False information is not new: in 1938 Orson Welles’s radio adaptation of *The War of the Worlds* made some listeners believe in a Martian invasion (the panic has been exaggerated by newspapers, itself a lesson on media). What has changed is **speed and scale**: algorithms promote content that triggers strong emotions; anyone can publish; AI makes **deepfakes** cheap. The 2016 US election and the Brexit referendum brought “fake news” into everyday vocabulary — Collins Dictionary chose it as 2017 Word of the Year. The expression is also used by politicians to discredit journalists they dislike.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Check the source', text: 'Who published it? Is the site known? Is the author named?' },
        { title: 'Cross-check', text: 'Do other reliable sources report the same fact?' },
        { title: 'Look at the date and context', text: 'Old images are often recycled with a new caption.' },
        { title: 'Examine the image', text: 'Reverse image search; look for signs of editing or AI generation.' },
        { title: 'Watch your emotions', text: 'Content that makes you very angry or afraid is designed to be shared.' },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'misinformation', value: 'false information spread without intent to deceive' },
        { key: 'disinformation', value: 'false information spread deliberately' },
        { key: 'bias', value: 'a tendency to favour one side' },
        { key: 'spin', value: 'presenting facts in a way that favours someone, often in politics' },
        { key: 'fact-checking', value: 'verifying claims against reliable evidence' },
        { key: 'echo chamber / filter bubble', value: 'an environment where one only meets similar opinions' },
        { key: 'headline / scoop / clickbait', value: 'title of an article / exclusive story / sensational title designed to get clicks' },
      ],
    },
    { type: 'h3', text: '3. Photojournalism: the power of an image' },
    {
      type: 'p',
      text: 'A photograph seems to “prove” reality, but it is always a **choice** (framing, moment, caption). Famous examples help us understand its power and its limits:',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { icon: 'Camera', title: 'Migrant Mother (1936)', text: 'Dorothea Lange photographs a destitute farm worker and her children during the Great Depression; the image became the face of American poverty and helped mobilise aid.' },
        { icon: 'Camera', title: 'Napalm Girl (1972)', text: 'Nick Ut’s photo of children fleeing a napalm attack in Vietnam shocked public opinion and is said to have contributed to the anti-war movement.' },
        { icon: 'Camera', title: 'Robert Capa (1930s–1954)', text: 'War photographer (“If your pictures aren’t good enough, you’re not close enough”); the authenticity of one famous Spanish Civil War picture is still debated.' },
        { icon: 'Camera', title: 'Ethics', text: 'Showing suffering vs. respecting dignity; staging and retouching; consent; copyright; AI-generated “photos”.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Useful phrases to analyse an image',
      content: [
        {
          type: 'list',
          items: [
            'In the **foreground / background / centre**, we can see…',
            'The **low-angle / high-angle shot** makes the person look powerful / vulnerable.',
            'The photographer **chose to** focus on…, which **conveys / evokes / denounces**…',
            'The **caption** guides our interpretation.',
            'The image **aims to** raise awareness / shock / persuade the viewer.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'Axe 3 — Representing the world and representing oneself' },
    { type: 'h3', text: '1. Stereotypes and clichés' },
    {
      type: 'p',
      text: 'Stereotypes simplify: “the British drink tea and talk about the weather”, “Americans are loud and optimistic”. They can be playful, but also harmful when they reduce people to a single trait (race, gender, religion, nationality). The Nigerian writer **Chimamanda Ngozi Adichie** speaks of the “danger of a single story” (2009 talk): when we only see one story about a people, we flatten their experience. **Edward Said**’s *Orientalism* (1978) analysed how Western art and literature created a simplified, inferior image of the East.',
    },
    {
      type: 'table',
      headers: ['Cliché', 'Reality / nuance'],
      rows: [
        ['“The British are always reserved and polite.”', 'Very diverse society; London is one of the most multicultural cities in the world; but politeness (queueing, “sorry”) is part of the *self-image*.'],
        ['“The USA is one big melting pot.”', 'Debate: *melting pot* (assimilation) vs. *salad bowl / mosaic* (cultures keep their identity).'],
        ['“All Americans own guns / eat fast food.”', 'Large regional, social differences; gun culture is a political divide.'],
      ],
    },
    { type: 'h3', text: '2. Symbols and national identity' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { icon: 'Flag', title: 'Union Jack', text: 'Combines the crosses of England, Scotland and Ireland (Northern Ireland today); used in 1801 form. Symbol of the UK and of its imperial past.' },
        { icon: 'Landmark', title: 'Statue of Liberty (1886)', text: 'Gift from France; welcome to immigrants arriving in New York; Emma Lazarus’s poem is on its pedestal.' },
        { icon: 'Crown', title: 'The monarchy', text: 'Tradition and change: Elizabeth II (reign 1952–2022), the coronation of Charles III (2023), debates on the future of the institution and the Commonwealth.' },
        { icon: 'Star', title: 'Stars and Stripes', text: '13 stripes (original colonies) and 50 stars (states): unity and the “American Dream”.' },
        { icon: 'Users', title: 'Uncle Sam / John Bull', text: 'Personifications of the United States and England in cartoons and propaganda.' },
        { icon: 'Globe2', title: 'The Commonwealth', text: 'Association of 56 countries, mostly former British colonies: shared history, contested legacy of empire.' },
      ],
    },
    {
      type: 'p',
      text: '**Tradition and change**: societies re-examine their symbols. Statues linked to slavery or colonialism were removed or contested in 2020 (e.g. Edward Colston in Bristol); the Confederate flag and monuments have been debated in the United States. Questions: Should we remove, explain or keep them?',
    },
    { type: 'h3', text: '3. Cinema and television: who is on screen?' },
    {
      type: 'p',
      text: 'Cinema constructs images of nations and groups. *The Birth of a Nation* (1915) technically innovative but openly racist, shows how film can spread prejudice; *Citizen Kane* (1941) criticised the power of media owners. Later, studios were criticised for the lack of diversity: the **#OscarsSoWhite** campaign (2015) protested that no actors of colour were nominated; the **Bechdel test** (named after cartoonist Alison Bechdel, 1985) asks whether a film has two named women who talk to each other about something other than a man. Films like *Black Panther* (2018) or series with diverse casts show a changing industry; **soft power** — a country’s cultural influence — explains the global importance of Hollywood and British drama.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Documents de référence (œuvres et repères)',
      content: [
        {
          type: 'list',
          items: [
            '**All the President’s Men** (1976) and **The Post** (2017): journalism and power.',
            '**Citizen Kane** (Orson Welles, 1941): media magnates.',
            '**Good Night, and Good Luck** (2005): TV news against McCarthyism (1950s).',
            '**Selma** (2014): the 1965 voting rights march.',
            '**Suffragette** (2015): the British women’s vote campaign.',
            '**The Danger of a Single Story** (Adichie, TED talk, 2009).',
            '**Migrant Mother** (Lange, 1936) and **Napalm Girl** (Ut, 1972): iconic images.',
            '**Black Panther** (2018) and **Get Out** (2017): representation of Black identity in film.',
          ],
        },
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Analyse d’un document iconographique', text: 'Décrire → contextualiser → interpréter (cadrage, plan, couleurs, légende) → évaluer l’intention et l’effet.' },
        { title: 'Synthèse', text: 'Problématique commune ; 2–3 axes croisant les documents ; conclusion. Never summarise each text separately.' },
        { title: 'Essai', text: 'Thesis + 2–3 arguments illustrés d’exemples précis (dates, œuvres) ; counter-argument ; conclusion nuancée.' },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex1-vocab',
      title: 'Vocabulary: media and politics',
      difficulty: 1,
      duration: 15,
      tags: ['vocabulaire'],
      statement: [
        { type: 'p', text: 'Translate into English: (a) la liberté de la presse ; (b) une manifestation ; (c) une fausse information ; (d) une bulle de filtre ; (e) vérifier les faits ; (f) le droit de vote.' },
      ],
      hints: ['freedom/free …', 'fact-…'],
      solution: [
        {
          type: 'list',
          items: [
            '(a) **freedom of the press** / press freedom',
            '(b) **a demonstration / a protest / a march**',
            '(c) **fake news** (uncountable) / a false piece of information',
            '(d) **a filter bubble** (or echo chamber)',
            '(e) **to fact-check**',
            '(f) **the right to vote** / suffrage',
          ],
        },
      ],
    },
    {
      id: 'ex2-image',
      title: 'Analyse d’une image décrite',
      difficulty: 1,
      duration: 20,
      tags: ['photojournalisme', 'analyse de document'],
      statement: [
        { type: 'p', text: '**Document (original description).** *Black-and-white photograph, 1937. A tired woman sits on the steps of a wooden house, hands folded, eyes looking away from the camera. Two children lean on her shoulders. Behind them, the house is in poor condition. The caption reads: “A farm family during the drought.”*' },
        { type: 'p', text: 'Analyse this document in 5–7 sentences: what does it show and what effect does it aim for?' },
      ],
      hints: ['Décrivez avant d’interpréter.', 'Que signifie le regard détourné ?'],
      solution: [
        {
          type: 'p',
          text: 'This black-and-white photograph, taken in 1937, belongs to the tradition of documentary photography. In the foreground we see a tired woman with two children leaning on her; the house in the background is run-down, which suggests poverty. The mother’s gaze turns away from the camera, which gives an impression of worry and dignity at the same time, and the children’s closeness conveys protection. The caption places the scene in a precise context (drought), turning one family into a symbol of a whole social crisis. The photographer clearly aims to arouse empathy and to make viewers aware of rural hardship, as the Depression-era photographers working for the government did. However, the choice of framing and moment reminds us that such an image is a **selection**, not a neutral record.',
        },
      ],
    },
    {
      id: 'ex3-version',
      title: 'Version : texte sur les fake news',
      difficulty: 2,
      duration: 25,
      tags: ['traduction', 'fake news'],
      statement: [
        { type: 'p', text: 'Translate into French (text original):' },
        { type: 'quote', text: 'False stories have always existed, but social media has changed the rules. A rumour that once took weeks to cross a country can now reach millions of people in a few hours, and by the time a correction appears, the damage is often done. That is why teaching young people to question what they read has become a priority.' },
      ],
      hints: ['« by the time » : le temps que / lorsque', '« the damage is done » : le mal est fait'],
      solution: [
        {
          type: 'p',
          text: 'Les fausses histoires ont toujours existé, mais les réseaux sociaux ont changé les règles. Une rumeur qui mettait autrefois des semaines à traverser un pays peut désormais toucher des millions de personnes en quelques heures et, lorsqu’un démenti paraît, le mal est souvent déjà fait. C’est pourquoi apprendre aux jeunes à remettre en question ce qu’ils lisent est devenu une priorité.',
        },
      ],
    },
    {
      id: 'ex4-theme',
      title: 'Thème : la liberté de la presse',
      difficulty: 2,
      duration: 25,
      tags: ['traduction'],
      statement: [
        { type: 'p', text: 'Translate into English:' },
        { type: 'p', text: '« Dans une démocratie, la presse joue un rôle essentiel : elle surveille ceux qui détiennent le pouvoir et informe les citoyens. Pourtant, dans certains pays, des journalistes sont menacés ou emprisonnés simplement parce qu’ils ont révélé la vérité. »' },
      ],
      hints: ['« ceux qui détiennent le pouvoir » : those in power / who hold power', '« simplement parce que » : simply because'],
      solution: [
        {
          type: 'p',
          text: 'In a democracy, the press plays an essential role: it watches those in power and informs citizens. Yet in some countries, journalists are threatened or jailed simply because they have revealed the truth.',
        },
        { type: 'p', text: '*Points de vigilance : « la presse » prend un verbe singulier ici (the press plays) ; « informer » = to inform (pas to inform about sans complément) ; « révélé » = have revealed (present perfect).*' },
      ],
    },
    {
      id: 'ex5-synthese',
      title: 'Synthèse : social media and political voice',
      difficulty: 2,
      duration: 40,
      tags: ['synthèse', 'citoyenneté'],
      statement: [
        { type: 'p', text: '**Document A (original).** *A young activist explains that her campaign, started with a hashtag, gathered 50,000 signatures in a week and forced the city council to change its decision about a library closure. “Without social media, nobody would have listened to us,” she says.*' },
        { type: 'p', text: '**Document B (original).** *A researcher notes that online campaigns often fade quickly. She also points out that platforms show users what they already agree with, so campaigns mostly convince those who were already convinced, and may spread false information about opponents.*' },
        { type: 'p', text: 'Write a synthesis (about 200 words) with a problem statement.' },
      ],
      hints: ['Problématique : Do social media really strengthen citizens’ voices?', 'Plan : 1) a powerful tool for participation ; 2) limits (echo chambers, short-lived, false info).'],
      solution: [
        {
          type: 'p',
          text: 'These two documents discuss the influence of social media on political participation. They raise the following question: do online platforms genuinely give citizens a stronger voice?',
        },
        {
          type: 'p',
          text: 'On the one hand, Document A presents social media as an effective tool for mobilisation. A young activist managed to collect 50,000 signatures in only a week and persuaded the council to reverse its decision, which shows that digital campaigns can reach decision-makers quickly and give a voice to people who are normally unheard.',
        },
        {
          type: 'p',
          text: 'On the other hand, Document B stresses the limits of this phenomenon. Online campaigns are often short-lived, and because algorithms create **echo chambers**, they tend to preach to the converted. In addition, disinformation about opponents can circulate easily, which weakens democratic debate.',
        },
        {
          type: 'p',
          text: 'In conclusion, social media are a useful complement to traditional participation, but they cannot replace sustained action, reliable information and public debate.',
        },
      ],
    },
    {
      id: 'ex6-essay-press',
      title: 'Essay: can we still trust the media?',
      difficulty: 3,
      duration: 50,
      tags: ['essay', 'médias', 'type bac'],
      statement: [
        { type: 'p', text: '“In the age of social media, the traditional press is no longer necessary.” Discuss. (250–300 words)' },
      ],
      hints: ['Exemples : Watergate (1972–74), Pentagon Papers (1971), BBC, fact-checking.', 'Contre-argument : réseaux = rapidité, pluralité, citizen journalism.', 'Nuance : complémentarité, éducation aux médias.'],
      solution: [
        {
          type: 'p',
          text: 'Today anyone with a smartphone can publish news, so some people claim that professional journalism has become useless. I disagree: social media have enriched the information landscape, but the traditional press still plays an essential role in democracy.',
        },
        {
          type: 'p',
          text: 'It is true that social networks have advantages. They allow eyewitnesses to share events in real time, as happened during the Arab Spring of 2011, and they give a voice to groups that traditional media often ignore. Moreover, newspapers have sometimes made serious mistakes or reflected the interests of their owners, which justifies criticism.',
        },
        {
          type: 'p',
          text: 'Nevertheless, professional journalists follow methods that platforms do not guarantee: verifying sources, correcting errors and investigating over long periods. The Watergate scandal shows this clearly: it took months of patient work by two Washington Post reporters to prove that the President’s team had lied, and Nixon resigned in 1974. By contrast, social media algorithms favour emotional content, so false stories travel faster than corrections, as the debate on fake news in 2016–2017 demonstrated.',
        },
        {
          type: 'p',
          text: 'In conclusion, the press and social media should be seen as complementary rather than rivals. What citizens need most is media literacy: the ability to compare sources and to tell facts from opinions.',
        },
      ],
    },
    {
      id: 'ex7-essay-stereo',
      title: 'Essay: stereotypes on screen',
      difficulty: 3,
      duration: 45,
      tags: ['essay', 'stéréotypes', 'cinéma', 'type bac'],
      statement: [
        { type: 'p', text: 'To what extent do films and television series reinforce or challenge stereotypes? Use at least two examples. (250 words)' },
      ],
      hints: ['Reinforce : Birth of a Nation (1915), clichés d’Hollywood sur les peuples. Challenge : Black Panther (2018), Get Out (2017).', 'Pensez à #OscarsSoWhite (2015) et au test de Bechdel.'],
      solution: [
        {
          type: 'p',
          text: 'Films and series shape how we imagine other people, so they can either spread or challenge stereotypes. In the past, cinema often did the former: *The Birth of a Nation* (1915) presented Black Americans in a racist way and helped to popularise a dangerous myth, while for decades Hollywood offered few roles to women, people of colour or foreign characters other than villains or sidekicks.',
        },
        {
          type: 'p',
          text: 'However, the industry has been pushed to change. In 2015 the #OscarsSoWhite campaign denounced the absence of actors of colour among the nominees, and tools like the Bechdel test help viewers notice how women are portrayed. Recent productions such as *Black Panther* (2018) show a technologically advanced African nation led by Black characters, a counter-image to the stereotype of Africa as a continent of poverty, while *Get Out* (2017) uses horror to denounce hidden racism.',
        },
        {
          type: 'p',
          text: 'Nevertheless, progress remains partial: a diverse cast does not guarantee complex stories, and some films replace one cliché with another. In conclusion, screens can both reinforce and challenge stereotypes; what matters is who tells the story, and whether audiences learn to read images critically.',
        },
      ],
    },
  ],

  representations: [
    {
      type: 'svg',
      caption: 'Information: from event to reader — where can distortion occur?',
      maxWidth: 580,
      svg: '<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12"><g stroke="currentColor" stroke-width="1" fill="none"><rect x="10" y="40" width="90" height="50"/><rect x="125" y="40" width="90" height="50"/><rect x="240" y="40" width="90" height="50"/><rect x="355" y="40" width="90" height="50"/><rect x="470" y="40" width="80" height="50"/></g><g fill="currentColor" text-anchor="middle"><text x="55" y="70">Event</text><text x="170" y="70">Witness /</text><text x="170" y="84">source</text><text x="285" y="70">Journalist</text><text x="400" y="70">Platform /</text><text x="400" y="84">algorithm</text><text x="510" y="70">Reader</text></g><g stroke="currentColor" stroke-width="1.5"><line x1="100" y1="65" x2="125" y2="65"/><line x1="215" y1="65" x2="240" y2="65"/><line x1="330" y1="65" x2="355" y2="65"/><line x1="445" y1="65" x2="470" y2="65"/></g><g fill="hsl(0 84% 60%)" font-size="11" text-anchor="middle"><text x="170" y="115">bias</text><text x="285" y="115">framing</text><text x="400" y="115">virality</text><text x="510" y="115">confirmation</text><text x="510" y="128">bias</text></g></svg>',
    },
    {
      type: 'timeline',
      events: [
        { date: '1215', title: 'Magna Carta' },
        { date: '1644', title: 'Milton’s Areopagitica' },
        { date: '1735', title: 'Zenger trial' },
        { date: '1791', title: 'First Amendment' },
        { date: '1913', title: 'Emily Davison dies at the Derby' },
        { date: '1936', title: 'Migrant Mother (Lange)' },
        { date: '1955', title: 'Rosa Parks and the Montgomery boycott' },
        { date: '1963', title: 'March on Washington' },
        { date: '1971', title: 'Pentagon Papers' },
        { date: '1972', title: 'Napalm Girl (Nick Ut); Watergate begins' },
        { date: '1974', title: 'Nixon resigns' },
        { date: '1978', title: 'Said’s Orientalism' },
        { date: '2013', title: '#BlackLivesMatter' },
        { date: '2015', title: '#OscarsSoWhite' },
        { date: '2017', title: '#MeToo; “fake news” Word of the Year' },
        { date: '2023', title: 'Coronation of Charles III' },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'the Fourth Estate', value: 'the press, seen as a power watching the government' },
        { key: 'censorship', value: 'control of what can be published or said' },
        { key: 'investigative journalism', value: 'in-depth reporting that uncovers hidden facts' },
        { key: 'source', value: 'person or document giving information to a journalist' },
        { key: 'libel / slander', value: 'false written / spoken statements that harm someone’s reputation' },
        { key: 'tabloid / broadsheet', value: 'popular sensational paper / serious newspaper' },
        { key: 'outlet', value: 'a media organisation (newspaper, channel, website)' },
        { key: 'to go viral', value: 'to spread extremely fast online' },
        { key: 'to debunk', value: 'to prove that something is false' },
        { key: 'to rally / rally', value: 'to gather support / a political gathering' },
        { key: 'to lobby', value: 'to try to influence politicians' },
        { key: 'grassroots', value: 'ordinary people at local level (grassroots movement)' },
        { key: 'ballot / to cast a vote', value: 'a vote / to vote' },
        { key: 'turnout', value: 'percentage of people who actually vote' },
        { key: 'inclusion / diversity', value: 'making sure all groups are represented and welcomed' },
        { key: 'to stereotype', value: 'to judge a person by simplified ideas about their group' },
        { key: 'portrayal', value: 'the way someone is shown in a film or story' },
        { key: 'framing', value: 'the way a photographer or journalist chooses what to show; also how an issue is presented' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'First Amendment (1791)', back: 'Part of the US Bill of Rights protecting freedom of religion, speech, press, assembly and petition.' },
        { front: 'Magna Carta (1215)', back: 'Charter forcing King John to accept limits on royal power; symbol of the rule of law.' },
        { front: 'Watergate', back: 'Political scandal (1972–74) revealed by Washington Post journalists; led to President Nixon’s resignation.' },
        { front: 'Pentagon Papers (1971)', back: 'Secret US study on the Vietnam War, leaked to the press by Daniel Ellsberg.' },
        { front: 'fake news', back: 'False information presented as news; Collins Word of the Year 2017.' },
        { front: 'echo chamber', back: 'Online environment where people only hear opinions that match their own.' },
        { front: 'Suffragettes', back: 'Women activists in Britain (early 20th century) who campaigned, sometimes militantly, for the right to vote.' },
        { front: 'Civil Rights Movement', back: 'US movement (1950s–60s) against racial segregation and discrimination; led to the Civil Rights Act 1964 and Voting Rights Act 1965.' },
        { front: '#MeToo', back: 'Movement against sexual harassment, which went viral in 2017.' },
        { front: 'Migrant Mother', back: 'Dorothea Lange’s 1936 photograph, an icon of the Great Depression.' },
        { front: 'Napalm Girl', back: 'Nick Ut’s 1972 photograph of children fleeing a napalm attack in Vietnam.' },
        { front: 'Orientalism (1978)', back: 'Edward Said’s book on the West’s stereotyped image of the East.' },
        { front: 'the danger of a single story', back: 'Adichie’s idea: reducing a people to one narrative creates stereotypes.' },
        { front: 'Bechdel test', back: 'Do two named women talk to each other about something other than a man?' },
        { front: '#OscarsSoWhite', back: '2015 campaign denouncing the lack of diversity among Oscar nominees.' },
        { front: 'melting pot vs salad bowl', back: 'Two images of US society: assimilation vs. coexistence of distinct cultures.' },
        { front: 'checks and balances', back: 'System where each branch of government limits the others.' },
        { front: 'BBC', back: 'British Broadcasting Corporation: public service broadcaster founded in 1922, funded by the licence fee.' },
        { front: 'soft power', back: 'A country’s influence through culture and values rather than force.' },
        { front: 'deepfake', back: 'AI-generated fake audio or video that looks real.' },
      ],
    },
    {
      type: 'matching',
      title: 'Match the event and the date',
      pairs: [
        { left: 'First Amendment', right: '1791' },
        { left: 'Montgomery bus boycott', right: '1955' },
        { left: 'Nixon resigns', right: '1974' },
        { left: 'Said’s Orientalism', right: '1978' },
        { left: '#OscarsSoWhite', right: '2015' },
        { left: 'Collins Word of the Year: fake news', right: '2017' },
      ],
    },
    {
      type: 'matching',
      title: 'Match the work and its subject',
      pairs: [
        { left: 'All the President’s Men', right: 'Watergate investigation' },
        { left: 'Selma', right: '1965 voting rights march' },
        { left: 'Suffragette', right: 'British women’s vote campaign' },
        { left: 'Citizen Kane', right: 'a powerful media owner' },
        { left: 'Good Night, and Good Luck', right: 'TV journalism against McCarthyism' },
        { left: 'Black Panther', right: 'African nation and Black heroes on screen' },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: 'Which journalists investigated Watergate?', choices: ['Woodward and Bernstein', 'Lange and Capa', 'Welles and Kane', 'Said and Adichie'], answer: 0 },
        { question: 'Disinformation is…', choices: ['false information shared by mistake', 'false information spread on purpose', 'a type of photograph', 'a press law'], answer: 1 },
        { question: 'Who took the photograph “Migrant Mother”?', choices: ['Nick Ut', 'Dorothea Lange', 'Robert Capa', 'Steve McCurry'], answer: 1 },
        { question: 'The Fourth Estate refers to…', choices: ['the Supreme Court', 'the press', 'Congress', 'the monarchy'], answer: 1 },
        { question: 'The “melting pot” idea emphasises…', choices: ['assimilation into a common culture', 'strict segregation', 'tourism', 'trade'], answer: 0 },
        { question: 'The Bechdel test concerns…', choices: ['photo editing', 'the representation of women in fiction', 'election turnout', 'press freedom'], answer: 1 },
        { question: 'A “tabloid” is…', choices: ['a serious newspaper', 'a popular, sensational newspaper', 'a TV channel', 'a news agency'], answer: 1 },
        { question: 'The Voting Rights Act dates from…', choices: ['1865', '1920', '1965', '2008'], answer: 2 },
        { question: 'Which expression means “to prove that something is false”?', choices: ['to rally', 'to debunk', 'to lobby', 'to cast'], answer: 1 },
      ],
    },
    {
      type: 'truefalse',
      title: 'True or false?',
      statements: [
        { text: 'The BBC is funded mainly by advertising.', answer: false, explanation: 'It is a public service broadcaster funded by the licence fee.' },
        { text: 'The First Amendment protects freedom of the press in the United States.', answer: true },
        { text: 'A stereotype is always completely false.', answer: false, explanation: 'It is a simplification that may contain a grain of truth but ignores diversity.' },
        { text: 'A photograph is a neutral and objective record of reality.', answer: false, explanation: 'Framing, timing and caption all involve choices.' },
        { text: 'Women obtained the vote in the USA in 1920.', answer: true, explanation: '19th Amendment, 1920.' },
        { text: 'Misinformation always implies the intention to deceive.', answer: false, explanation: 'That is disinformation; misinformation can be shared by mistake.' },
      ],
    },
    {
      type: 'ordering',
      title: 'Put in chronological order',
      items: [
        'Magna Carta',
        'First Amendment',
        'Suffragette movement peaks',
        'March on Washington',
        'Watergate: Nixon resigns',
        '#MeToo goes viral',
      ],
    },
    {
      type: 'cloze',
      title: 'Complete the text',
      text: 'The press is sometimes called the {{Fourth Estate}} because it watches those in power. Journalists Woodward and Bernstein revealed the {{Watergate}} scandal, and President {{Nixon}} resigned in {{1974}}. False information spread deliberately is called {{disinformation}}.',
    },
    {
      type: 'reveal',
      title: 'Exemple de plan d’analyse d’une photographie (cliquer pour révéler)',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Presentation**: type, date, photographer, source, caption.',
            '**Description**: foreground, background, people, gaze, light, colours.',
            '**Interpretation**: framing and angle, symbolism, emotions provoked, the role of the caption.',
            '**Evaluation**: message, impact on opinion, limits (selection, manipulation), link with the axis studied.',
          ],
        },
      ],
    },
  ],
}

export default chapter
