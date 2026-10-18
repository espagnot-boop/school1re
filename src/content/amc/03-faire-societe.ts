import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'faire-societe',
  subject: 'amc',
  order: 3,
  title: `Faire société (Shaping Society)`,
  theme: 'Thématique 3 — Faire société',
  summary: `Vivre ensemble, inégalités, Civil Rights Movement, immigration, multiculturalisme, démocratie et Brexit dans le monde anglophone : notions, repères datés et vocabulaire pour la synthèse de documents.`,
  duration: '5 semaines',
  objectives: [
    `Comprendre comment les sociétés anglophones (États-Unis, Royaume-Uni, Commonwealth) organisent le vivre ensemble : unité et pluralité, égalités et inégalités.`,
    `Situer et expliquer les grandes étapes du Civil Rights Movement et leurs prolongements (Black Lives Matter).`,
    `Comparer les modèles d'intégration (melting pot, salad bowl, multiculturalism) et les politiques d'immigration.`,
    `Analyser le fonctionnement démocratique (rule of law, referendum, devolution) et l'exemple du Brexit.`,
    `Mobiliser un vocabulaire précis et des repères datés pour étayer une synthèse ou un essay.`,
  ],
  keywords: [
    'civil rights', 'segregation', 'discrimination', 'immigration', 'melting pot', 'multiculturalism',
    'inequality', 'democracy', 'referendum', 'Brexit', 'Windrush', 'devolution', 'inclusion',
  ],

  /* ------------------------------------------------------------------ */
  fiche: [
    { type: 'h2', text: `Shaping Society: the big picture` },
    {
      type: 'callout', variant: 'remember', title: `Key questions`,
      content: [{
        type: 'list',
        items: [
          `How do diverse societies **live together** (unity vs. diversity)?`,
          `Why do **inequalities** persist, and how do citizens fight them?`,
          `What does **citizenship** mean in a **democracy**: rights, duties, participation?`,
        ],
      }],
    },
    { type: 'h3', text: `Essential dates` },
    {
      type: 'table',
      headers: ['Date', 'Event'],
      rows: [
        ['1215', `Magna Carta (limits the king's power)`],
        ['1863', `Emancipation Proclamation (Lincoln)`],
        ['1865', `13th Amendment: slavery abolished in the USA`],
        ['1920', `19th Amendment: women's right to vote in the USA`],
        ['1948', `Arrival of HMT Empire Windrush at Tilbury (UK)`],
        ['1954', `Brown v. Board of Education: school segregation unconstitutional`],
        ['1955-56', `Montgomery bus boycott (Rosa Parks)`],
        ['1963', `March on Washington, "I Have a Dream" (28 August)`],
        ['1964', `Civil Rights Act`],
        ['1965', `Voting Rights Act; Hart-Celler Act (US immigration reform)`],
        ['1968', `Assassination of Martin Luther King (4 April)`],
        ['1971-88', `Canada: multiculturalism policy (1971), Multiculturalism Act (1988)`],
        ['1998', `Good Friday Agreement (Northern Ireland)`],
        ['2008', `Barack Obama elected, first Black US president`],
        ['23 June 2016', `Brexit referendum: 51.9% Leave, 48.1% Remain`],
        ['2020', `George Floyd killed (25 May); UK leaves the EU (31 January)`],
      ],
    },
    { type: 'h3', text: `Models of integration` },
    {
      type: 'table',
      headers: ['Model', 'Idea', 'Associated with'],
      rows: [
        ['Melting pot', `Differences blend into one common culture`, `USA (traditional image)`],
        ['Salad bowl / mosaic', `Cultures keep their identity side by side`, `USA (modern), Canada`],
        ['Multiculturalism', `Public policy recognising and valuing diversity`, `Canada, UK, Australia`],
        ['Assimilation', `Newcomers adopt the dominant culture`, `Historical pressure on immigrants`],
      ],
    },
    {
      type: 'callout', variant: 'tip', title: `Quick method`,
      content: [{ type: 'p', text: `For any document on society, ask: **WHO** is concerned? **WHAT** is the problem or claim? **WHY** (causes)? **WHAT NEXT** (consequences, solutions)? Then link it to a **date** and a **notion** from this chapter.` }],
    },
    {
      type: 'keyvalue',
      items: [
        { key: `segregation`, value: `legal or social separation of people, esp. by race` },
        { key: `discrimination`, value: `unfair treatment because of race, gender, religion, origin...` },
        { key: `inequality`, value: `unequal distribution of wealth, rights or opportunities` },
        { key: `civil disobedience`, value: `peaceful refusal to obey an unjust law` },
        { key: `rule of law`, value: `everyone, including the government, is subject to the law` },
        { key: `devolution`, value: `transfer of powers from central government to regions (Scotland, Wales, N. Ireland)` },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  cours: [
    { type: 'h2', text: `1. Living together: unity and diversity` },
    { type: 'p', text: `English-speaking societies are shaped by centuries of migration, empire and trade. The question "Faire société" asks what holds a diverse population together: shared **values**, shared **institutions**, a shared **history**, or simply the willingness to live side by side.` },
    {
      type: 'callout', variant: 'definition', title: `Key notions`,
      content: [{
        type: 'keyvalue',
        items: [
          { key: `community`, value: `a group sharing a place, an identity or interests` },
          { key: `social cohesion`, value: `the bonds that keep a society united` },
          { key: `inclusion / exclusion`, value: `being accepted into / kept out of the group` },
          { key: `minority / majority`, value: `smaller / larger part of the population` },
          { key: `stereotype`, value: `a fixed, oversimplified idea about a group` },
          { key: `prejudice`, value: `an opinion formed without knowledge or evidence` },
        ],
      }],
    },
    { type: 'h3', text: `Three images of the American nation` },
    {
      type: 'grid', columns: 3,
      items: [
        { title: `Melting pot`, text: `The image popularised in 1908 by Israel Zangwill's play *The Melting Pot*: immigrants "melt" into one American identity. Critics say it demands that people give up their culture.`, icon: 'Flame' },
        { title: `Salad bowl`, text: `Each ingredient keeps its own taste but contributes to the whole. It stresses ethnic neighbourhoods, languages and traditions.`, icon: 'Utensils' },
        { title: `E pluribus unum`, text: `"Out of many, one": the national motto on the Great Seal. It expresses the ideal of unity built from diversity.`, icon: 'Users' },
      ],
    },
    {
      type: 'callout', variant: 'warning', title: `Avoid this trap`,
      content: [{ type: 'p', text: `Do not present the USA as a single "melting pot" without nuance. Historians stress that integration was never equal: enslaved Africans, Native Americans and Asian immigrants (see the Chinese Exclusion Act, 1882) were long excluded from the national story.` }],
    },

    { type: 'h2', text: `2. Inequalities: race, gender, class` },
    { type: 'p', text: `**Inequality** can be legal (a law treats groups differently), economic (income, housing, education) or social (access to networks and respect). **Equality of opportunity** means everyone has the same chance to succeed; **equality of outcome** means results are similar. Debates about *affirmative action* (positive measures to help under-represented groups) and about the *gender pay gap* illustrate this distinction.` },
    {
      type: 'table',
      headers: ['Field', 'Examples of inequality', 'Examples of response'],
      rows: [
        ['Race', `segregation, racial profiling, unequal schools`, `Civil Rights Act 1964, Race Relations Acts (UK), Black Lives Matter`],
        ['Gender', `unequal pay, glass ceiling, under-representation in politics`, `suffrage movements, Equal Pay Acts (US 1963, UK 1970), #MeToo`],
        ['Class / wealth', `housing costs, access to higher education, regional gaps`, `welfare state, minimum wage, grants and scholarships`],
        ['Sexual orientation', `criminalisation, lack of marriage rights`, `Stonewall riots (1969), marriage equality (Obergefell v. Hodges, USA, 2015)`],
      ],
    },
    {
      type: 'callout', variant: 'history', title: `Women and the vote`,
      content: [{ type: 'p', text: `In the UK, the **suffragettes** (Emmeline Pankhurst's WSPU) campaigned with direct action. The 1918 Act gave the vote to women over 30 who met property criteria; equal voting age (21) came in 1928. In the USA, the **19th Amendment** (1920) forbade denying the vote on grounds of sex, although many Black women in the South were still blocked until 1965.` }],
    },

    { type: 'h2', text: `3. The Civil Rights Movement (USA, 1950s-1960s)` },
    { type: 'h3', text: `Background: slavery, Reconstruction, Jim Crow` },
    { type: 'p', text: `Slavery was abolished by the **13th Amendment (1865)**; the 14th (1868) granted citizenship and "equal protection of the laws", the 15th (1870) the vote to Black men. But after Reconstruction, Southern states passed **Jim Crow laws**: segregation in schools, buses, restaurants, plus literacy tests and poll taxes to block Black voters. In **Plessy v. Ferguson (1896)** the Supreme Court accepted "separate but equal", although facilities were never equal.` },
    { type: 'h3', text: `Key moments` },
    {
      type: 'timeline',
      events: [
        { date: '1954', title: `Brown v. Board of Education`, text: `The Supreme Court rules that segregated public schools are unconstitutional.` },
        { date: '1955-56', title: `Montgomery bus boycott`, text: `After Rosa Parks refuses to give up her seat (1 December 1955), the Black community boycotts the buses for 381 days. A young pastor, Martin Luther King Jr., becomes a leader.` },
        { date: '1957', title: `Little Rock Nine`, text: `Nine Black students enter Central High School, Arkansas, escorted by federal troops sent by President Eisenhower.` },
        { date: '1960', title: `Greensboro sit-ins`, text: `Students occupy a "whites only" lunch counter; the tactic spreads across the South.` },
        { date: '1963', title: `March on Washington`, text: `About 250,000 people gather at the Lincoln Memorial; King delivers his "I Have a Dream" speech.` },
        { date: '1964', title: `Civil Rights Act`, text: `Outlaws discrimination in public places and employment on grounds of race, colour, religion, sex or national origin.` },
        { date: '1965', title: `Selma marches and Voting Rights Act`, text: `Violence against marchers at Selma shocks the nation; the Act removes barriers such as literacy tests.` },
        { date: '1968', title: `King assassinated`, text: `Killed in Memphis on 4 April; the Fair Housing Act is passed days later.` },
      ],
    },
    { type: 'h3', text: `Strategies and leaders` },
    {
      type: 'table',
      headers: ['Approach', 'Figures / groups', 'Ideas'],
      rows: [
        ['Nonviolent direct action', `Martin Luther King Jr., SCLC, SNCC, Rosa Parks`, `boycotts, sit-ins, marches, civil disobedience; moral pressure on the nation`],
        ['Legal strategy', `NAACP, Thurgood Marshall`, `win cases in court (Brown, 1954)`],
        ['Black Power / self-defence', `Malcolm X, Black Panther Party (founded 1966)`, `racial pride, community control, rejecting integration as the only goal`],
      ],
    },
    {
      type: 'quote',
      text: `I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.`,
      author: `Martin Luther King Jr.`,
      source: `March on Washington, 1963 (famous short extract)`,
    },
    { type: 'h3', text: `After the 1960s: unfinished business` },
    { type: 'p', text: `Laws changed, but **de facto** inequalities (housing, wealth, policing, incarceration) remained. The election of **Barack Obama (2008)** was a historic symbol; yet debates about "post-racial" America continued. The **Black Lives Matter** movement began as a hashtag in 2013 after the acquittal of the man who killed Trayvon Martin, and grew worldwide after the death of **George Floyd** in Minneapolis on 25 May 2020, prompting protests in the UK too (e.g. debate over statues linked to the slave trade).` },
    {
      type: 'callout', variant: 'warning', title: `De jure vs. de facto`,
      content: [{ type: 'p', text: `**De jure** = by law (Jim Crow). **De facto** = in reality, even without a law (unequal neighbourhoods and schools). Using both terms shows precision in an essay.` }],
    },

    { type: 'h2', text: `4. Immigration and multiculturalism` },
    { type: 'h3', text: `The United States: a nation of immigrants?` },
    {
      type: 'list',
      items: [
        `**1892-1954**: Ellis Island, New York, the main immigration station; millions of Europeans pass through.`,
        `**1882**: Chinese Exclusion Act, the first major law restricting immigration by nationality.`,
        `**1924**: Immigration Act sets national-origin quotas favouring Northern Europeans.`,
        `**1965**: Hart-Celler Act abolishes national-origin quotas; immigration from Asia and Latin America grows.`,
        `**Today**: debates on the southern border, undocumented immigrants, the DACA programme (2012) for people brought to the USA as children, and "sanctuary cities".`,
      ],
    },
    { type: 'h3', text: `The United Kingdom: Empire, Commonwealth, Windrush` },
    { type: 'p', text: `The **British Nationality Act (1948)** gave Commonwealth citizens the right to live in Britain. On **22 June 1948** the *Empire Windrush* brought nearly 500 Caribbean passengers to Tilbury, and the **Windrush generation** helped rebuild post-war Britain (NHS, transport). Immigration laws then became stricter (Commonwealth Immigrants Act, 1962), while **Race Relations Acts** (1965, 1968, 1976) outlawed discrimination. The **Windrush scandal (2018)** revealed that some long-settled Caribbean-born residents lacked papers and were wrongly threatened with deportation or lost access to services; the government apologised.` },
    {
      type: 'grid', columns: 2,
      items: [
        { title: `Canada`, text: `Officially bilingual (English/French) and the first country with a national multiculturalism policy (1971; Act of 1988). Points-based immigration system.`, icon: 'Leaf' },
        { title: `Australia`, text: `"White Australia" policy ended progressively (1950s-1973). The 1967 referendum on Aboriginal people and the 2008 national apology show a reckoning with the past.`, icon: 'Globe2' },
      ],
    },
    {
      type: 'callout', variant: 'method', title: `Arguments for and against multiculturalism`,
      content: [{
        type: 'table',
        headers: ['In favour', 'Criticisms'],
        rows: [
          [`enriches culture, cuisine, ideas`, `may create separate communities ("parallel lives")`],
          [`fights discrimination, protects minorities`, `may weaken a shared national identity`],
          [`brings skills and workers, boosts economy`, `fuels tensions over jobs, housing, public services`],
        ],
      }],
    },

    { type: 'h2', text: `5. Democracy and citizenship` },
    { type: 'p', text: `A **democracy** is a system in which power comes from the people, usually through free and fair **elections**. Key ingredients: **universal suffrage**, **separation of powers**, a free **press**, independent **courts**, protection of **minority rights** and the **rule of law**.` },
    {
      type: 'table',
      headers: ['', 'United States', 'United Kingdom'],
      rows: [
        ['Constitution', `written (1787), amended 27 times`, `uncodified (Magna Carta 1215, Bill of Rights 1689, Acts of Parliament...)`],
        ['Head of state', `President (elected, also head of government)`, `Monarch (symbolic); Prime Minister leads government`],
        ['Legislature', `Congress: Senate + House of Representatives`, `Parliament: House of Commons (elected) + House of Lords`],
        ['Federal / unitary', `federal: 50 states`, `unitary, with devolution to Scotland, Wales, Northern Ireland`],
      ],
    },
    { type: 'h3', text: `Citizens' participation` },
    { type: 'p', text: `Voting is one form of participation; others are **petitions**, **demonstrations**, **lobbying**, **volunteering**, **activism** on social media. Concerns include **voter turnout**, **gerrymandering** (drawing electoral districts to favour a party), **voter ID laws**, **disinformation** and **polarisation**.` },
    { type: 'h3', text: `Devolution and referendums` },
    { type: 'p', text: `Since 1998-99 Scotland, Wales and Northern Ireland have their own elected bodies. The **Good Friday Agreement (1998)** ended the worst of the Troubles in Northern Ireland. In **2014**, Scotland voted 55% to 45% to stay in the UK; the question returned after Brexit because a majority of Scots had voted Remain.` },

    { type: 'h2', text: `6. Case study: Brexit` },
    {
      type: 'timeline',
      events: [
        { date: '1973', title: `UK joins the European Economic Community` },
        { date: '1975', title: `First referendum on membership: 67% vote to stay` },
        { date: '2013', title: `David Cameron promises an in/out referendum` },
        { date: '23 June 2016', title: `Referendum`, text: `Leave 51.9%, Remain 48.1%; turnout about 72%. England and Wales vote Leave; Scotland and Northern Ireland vote Remain.` },
        { date: '29 March 2017', title: `Article 50 triggered by Theresa May` },
        { date: '31 January 2020', title: `The UK formally leaves the EU` },
        { date: '31 December 2020', title: `End of the transition period; Trade and Cooperation Agreement` },
      ],
    },
    {
      type: 'grid', columns: 2,
      items: [
        { title: `Arguments for Leave`, text: `"Take back control": sovereignty, control of borders and laws, freedom to make trade deals, savings on EU contributions.`, icon: 'Flag' },
        { title: `Arguments for Remain`, text: `Access to the single market, jobs and investment, free movement for British citizens, cooperation on security and research, the union of the UK itself.`, icon: 'Link' },
      ],
    },
    { type: 'p', text: `Brexit revealed **divisions**: age (older voters more likely to choose Leave), education, region (London and Scotland vs. much of England outside London), and attitudes to immigration and globalisation. It also showed how a **referendum** (direct democracy) can sit uneasily with **representative democracy** (Parliament).` },
    {
      type: 'callout', variant: 'tip', title: `Useful phrases to describe a society`,
      content: [{
        type: 'list',
        items: [
          `The document highlights a **growing gap** between...`,
          `This illustrates the **tension between** unity and diversity.`,
          `Minorities are **under-represented** in...`,
          `Campaigners **demand** / **call for** equal rights.`,
          `The law **bans** / **outlaws** discrimination, but inequalities **persist**.`,
        ],
      }],
    },
  ],

  /* ------------------------------------------------------------------ */
  exercices: [
    {
      id: 'fs-ex1',
      title: `Dating the Civil Rights Movement`,
      difficulty: 1,
      duration: 10,
      tags: ['civil rights', 'dates'],
      statement: [
        { type: 'p', text: `Match each event with the correct year, then write one sentence about its importance: **Brown v. Board of Education**, **Montgomery bus boycott begins**, **March on Washington**, **Voting Rights Act**, **King assassinated**.` },
        { type: 'p', text: `Years: 1955, 1954, 1968, 1963, 1965.` },
      ],
      hints: [`The Supreme Court decision came first, in the mid-1950s.`, `The Voting Rights Act followed the Selma marches.`],
      solution: [
        {
          type: 'list',
          items: [
            `**Brown v. Board of Education: 1954.** The Supreme Court declared racial segregation in public schools unconstitutional.`,
            `**Montgomery bus boycott begins: 1955** (Rosa Parks, 1 December). It showed the power of nonviolent mass protest and made King a national leader.`,
            `**March on Washington: 1963.** About 250,000 people demanded jobs and freedom; King gave his "I Have a Dream" speech.`,
            `**Voting Rights Act: 1965.** It banned practices like literacy tests that kept Black citizens from voting.`,
            `**King assassinated: 1968** (4 April, Memphis). His death triggered riots and marked a turning point in the movement.`,
          ],
        },
      ],
    },
    {
      id: 'fs-ex2',
      title: `Vocabulary: society and inequality`,
      difficulty: 1,
      duration: 10,
      tags: ['vocabulary'],
      statement: [
        { type: 'p', text: `Complete each sentence with one of these words: *segregation, stereotype, rule of law, referendum, devolution, discrimination, boycott, inclusion*.` },
        {
          type: 'list',
          ordered: true,
          items: [
            `Under Jim Crow laws, ______ separated Black and white Americans in schools and buses.`,
            `The Brexit ______ took place on 23 June 2016.`,
            `Employers must not practise ______ against candidates because of their origin.`,
            `Scotland and Wales have more powers since ______ in 1998-99.`,
            `Believing that all teenagers are lazy is a ______.`,
            `In 1955-56 Black residents of Montgomery organised a bus ______.`,
            `The ______ means that nobody, including ministers, is above the law.`,
            `Schools should promote ______ so that every pupil feels welcome.`,
          ],
        },
      ],
      solution: [
        { type: 'list', ordered: true, items: [`segregation`, `referendum`, `discrimination`, `devolution`, `stereotype`, `boycott`, `rule of law`, `inclusion`] },
      ],
    },
    {
      id: 'fs-ex3',
      title: `Melting pot or salad bowl?`,
      difficulty: 2,
      duration: 20,
      tags: ['multiculturalism', 'writing'],
      statement: [
        { type: 'p', text: `In 100-120 words, explain the difference between the "melting pot" and the "salad bowl" images of a nation, and say which one better describes the society you live in. Use at least three connectors and two terms from the chapter.` },
      ],
      hints: [`Define each image in one sentence.`, `Use a contrast connector: whereas, while, on the other hand.`, `Give one concrete example (a neighbourhood, a festival, a language).`],
      solution: [
        { type: 'p', text: `**Model answer (about 115 words)**` },
        { type: 'quote', text: `The "melting pot" suggests that immigrants gradually blend into one shared national culture, whereas the "salad bowl" implies that each community keeps its own traditions while contributing to the whole. The first image stresses unity, while the second celebrates diversity. In my opinion, France today looks more like a salad bowl in everyday life: in big cities, you can hear many languages and find restaurants and festivals from all over the world. However, the Republic's ideal is rather assimilationist, since everyone is expected to share the same civic values and the French language. Therefore, I would say that both images coexist, which creates both richness and tension.` },
        { type: 'p', text: `Why it works: two clear definitions, contrast connectors (*whereas, while, however*), a consequence connector (*therefore*), a personal but argued opinion, concrete examples.` },
      ],
    },
    {
      id: 'fs-ex4',
      title: `Analysing a statistic: the Brexit vote`,
      difficulty: 2,
      duration: 20,
      tags: ['Brexit', 'data'],
      statement: [
        { type: 'p', text: `Here are the results of the 2016 referendum by nation (approximate percentages).` },
        {
          type: 'table',
          headers: ['Nation', 'Leave', 'Remain'],
          rows: [['England', '53.4', '46.6'], ['Wales', '52.5', '47.5'], ['Scotland', '38.0', '62.0'], ['Northern Ireland', '44.2', '55.8']],
        },
        { type: 'list', ordered: true, items: [
          `Which nations voted Remain?`,
          `Why is this result a problem for the unity of the United Kingdom?`,
          `Write three sentences interpreting the data, using expressions of comparison.`,
        ] },
      ],
      hints: [`Compare each Leave percentage with 50.`, `Think about the Scottish independence referendum of 2014.`],
      solution: [
        { type: 'list', ordered: true, items: [
          `**Scotland** (62% Remain) and **Northern Ireland** (55.8% Remain) voted to stay in the EU.`,
          `Because the UK as a whole voted Leave although two of its four nations voted Remain. It reopened debates about **Scottish independence** (the Scottish government argued Scotland was being taken out of the EU against its will) and about the **Irish border**, since Northern Ireland is the only part of the UK with a land border with the EU.`,
          `**Model:** Whereas England and Wales voted narrowly to leave, Scotland rejected Brexit by a large margin. Northern Ireland also chose Remain, but by a smaller majority than Scotland. This shows that the result was far from uniform across the UK.`,
        ] },
      ],
    },
    {
      id: 'fs-ex5',
      title: `Comparing two documents (synthesis practice)`,
      difficulty: 3,
      duration: 40,
      tags: ['synthesis', 'méthode'],
      statement: [
        { type: 'p', text: `Two short extracts are summarised below (original wording, for training).` },
        { type: 'callout', variant: 'example', title: `Document A (a 1960s activist's pamphlet, paraphrased)`, content: [{ type: 'p', text: `The author urges Black citizens to join peaceful sit-ins. He argues that segregation is a moral wrong and that violence would give opponents an excuse to ignore the cause. He insists that suffering without hatred can change the nation's conscience.` }] },
        { type: 'callout', variant: 'example', title: `Document B (a 2020 newspaper editorial, paraphrased)`, content: [{ type: 'p', text: `The editorial explains that, although segregation laws ended long ago, Black Americans still face more unemployment and police violence than white Americans. Protesters are demanding reforms rather than symbolic gestures, and the writer asks whether the promises of the 1960s have been kept.` }] },
        { type: 'p', text: `**Task:** In about 150 words, show how the two documents illustrate the evolution of the fight for equality in the USA. (Do not summarise each document separately.)` },
      ],
      hints: [`Find a common theme: the fight against racial inequality.`, `Plan: similarities / differences (law vs. reality, strategy, goals).`, `Use comparison connectors and avoid copying.`],
      solution: [
        { type: 'p', text: `**Plan:** (1) A shared struggle against racial injustice; (2) different targets and methods: legal segregation then, systemic inequality now.` },
        { type: 'quote', text: `Both documents deal with the fight for racial equality in the United States, but they reflect two different stages. In the 1960s, activists targeted legal segregation, a visible injustice, and chose peaceful protest to appeal to the nation's conscience. Document B shows that, although those laws were repealed, inequalities persist in employment and policing. Whereas the pamphlet insists on nonviolence and moral persuasion, the editorial describes protesters who call for concrete reforms. Thus, the two texts suggest that the Civil Rights Movement achieved major legal victories, yet the struggle continues today in a different form, which raises the question of whether formal equality is enough to ensure real equality.` },
        { type: 'p', text: `Check: thesis in the introduction, comparison rather than juxtaposition, no quotation overload, own words, conclusion with an opening.` },
      ],
    },
    {
      id: 'fs-ex6',
      title: `Type bac: essay on democracy`,
      difficulty: 3,
      duration: 45,
      tags: ['essay', 'type bac', 'democracy'],
      statement: [
        { type: 'p', text: `**Essay (about 200-250 words):** "Is a referendum a good way to make important decisions in a democracy?" Use at least two examples from the chapter (e.g. Brexit 2016, Scotland 2014).` },
      ],
      hints: [`Plan: arguments for / arguments against / your balanced conclusion.`, `Use precise facts: 51.9% Leave, 55% No in Scotland.`, `Link paragraphs with connectors: firstly, however, moreover, in conclusion.`],
      solution: [
        { type: 'h3', text: `Model essay` },
        { type: 'p', text: `A referendum asks citizens to answer a single question directly. It is often seen as the purest form of democracy, but it also has limits.` },
        { type: 'p', text: `Firstly, a referendum gives people a real voice on major issues. In 2014, 84.6% of the Scottish electorate voted on independence, which shows a high level of engagement, and the result (55% No) was widely accepted. Moreover, it can settle a question that parties are reluctant to address.` },
        { type: 'p', text: `However, complex issues are difficult to reduce to "yes" or "no". The Brexit campaign of 2016 showed this: the result was narrow (51.9% Leave), voters were exposed to simplified slogans and, afterwards, it took years of negotiation to define what "leaving" meant. In addition, a referendum can divide a country, as the gap between England and Scotland or between age groups revealed, and it can clash with representative democracy when Parliament disagrees with the result.` },
        { type: 'p', text: `In conclusion, referendums can strengthen democratic legitimacy, but only if the question is clear, the debate is honest and the consequences are well explained. Therefore, they seem better suited to precise constitutional questions than to broad political choices.` },
      ],
    },
    {
      id: 'fs-ex7',
      title: `Translation: version (EN to FR)`,
      difficulty: 2,
      duration: 20,
      tags: ['traduction'],
      statement: [
        { type: 'p', text: `Translate into French: "The Windrush generation arrived in Britain in the late 1940s to help rebuild the country. Decades later, many of them were treated as if they were illegal immigrants, which caused public outrage."` },
      ],
      hints: [`"to help rebuild": proposition de but.`, `"were treated as if": voix passive à rendre naturellement en français.`, `Attention à "decades later" : plusieurs décennies plus tard.`],
      solution: [
        { type: 'quote', text: `La génération Windrush est arrivée en Grande-Bretagne à la fin des années 1940 pour aider à reconstruire le pays. Des décennies plus tard, nombre de ses membres ont été traités comme des immigrés en situation irrégulière, ce qui a provoqué l'indignation de l'opinion publique.` },
        { type: 'p', text: `Points de vigilance : *illegal immigrants* se traduit par « immigrés en situation irrégulière » (registre plus neutre) ; *many of them* = « nombre d'entre eux » ; *which caused* : proposition relative à antécédent phrase, rendue par « ce qui ».` },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  representations: [
    {
      type: 'timeline',
      events: [
        { date: '1863', title: `Emancipation Proclamation` },
        { date: '1896', title: `Plessy v. Ferguson: "separate but equal"` },
        { date: '1948', title: `Windrush arrives at Tilbury` },
        { date: '1954', title: `Brown v. Board of Education` },
        { date: '1955', title: `Rosa Parks, Montgomery` },
        { date: '1963', title: `March on Washington` },
        { date: '1964', title: `Civil Rights Act` },
        { date: '1965', title: `Voting Rights Act` },
        { date: '1971', title: `Canada adopts multiculturalism policy` },
        { date: '1998', title: `Good Friday Agreement` },
        { date: '2008', title: `Obama elected` },
        { date: '2016', title: `Brexit referendum` },
        { date: '2020', title: `George Floyd protests; UK leaves the EU` },
      ],
    },
    {
      type: 'matching',
      title: `Match the term with its definition`,
      pairs: [
        { left: `segregation`, right: `separation of people by race by law or custom` },
        { left: `civil disobedience`, right: `peaceful refusal to obey an unjust law` },
        { left: `devolution`, right: `transfer of powers to regional parliaments` },
        { left: `gerrymandering`, right: `redrawing electoral districts to favour one party` },
        { left: `glass ceiling`, right: `invisible barrier blocking promotion of women or minorities` },
        { left: `rule of law`, right: `principle that everyone is subject to the law` },
        { left: `suffrage`, right: `the right to vote` },
      ],
    },
    {
      type: 'matching',
      title: `Match the person with the role`,
      pairs: [
        { left: `Rosa Parks`, right: `refused to give up her bus seat in Montgomery (1955)` },
        { left: `Martin Luther King Jr.`, right: `leader of nonviolent protest, "I Have a Dream"` },
        { left: `Malcolm X`, right: `spokesman for Black pride and self-defence` },
        { left: `Thurgood Marshall`, right: `NAACP lawyer in Brown v. Board; later Supreme Court judge` },
        { left: `Emmeline Pankhurst`, right: `British suffragette leader` },
        { left: `Lyndon B. Johnson`, right: `president who signed the 1964 and 1965 laws` },
      ],
    },
    {
      type: 'qcm',
      questions: [
        { question: `Which case declared school segregation unconstitutional?`, choices: [`Plessy v. Ferguson`, `Brown v. Board of Education`, `Obergefell v. Hodges`, `Roe v. Wade`], answer: 1, explanation: `Brown v. Board of Education (1954) overturned the "separate but equal" doctrine in public schools.` },
        { question: `How long did the Montgomery bus boycott last?`, choices: [`1 week`, `100 days`, `381 days`, `5 years`], answer: 2, explanation: `From December 1955 to December 1956, 381 days.` },
        { question: `What percentage voted Leave in the 2016 referendum?`, choices: [`48.1%`, `51.9%`, `55%`, `62%`], answer: 1, explanation: `51.9% Leave against 48.1% Remain.` },
        { question: `The Windrush arrived in Britain in...`, choices: [`1919`, `1948`, `1965`, `1998`], answer: 1, explanation: `22 June 1948, at Tilbury.` },
        { question: `Which law outlawed discrimination in public places and employment in the USA?`, choices: [`Voting Rights Act`, `Hart-Celler Act`, `Civil Rights Act of 1964`, `19th Amendment`], answer: 2 },
        { question: `"Devolution" refers to...`, choices: [`leaving the EU`, `transfer of powers to Scotland, Wales and N. Ireland`, `abolition of the monarchy`, `a US federal system`], answer: 1 },
        { question: `Which model says cultures keep their identity side by side?`, choices: [`melting pot`, `assimilation`, `salad bowl`, `segregation`], answer: 2 },
        { question: `Which agreement brought peace to Northern Ireland in 1998?`, choices: [`Magna Carta`, `Maastricht Treaty`, `Good Friday Agreement`, `Treaty of Versailles`], answer: 2 },
        { question: `What did the 1965 Hart-Celler Act do?`, choices: [`ended slavery`, `abolished national-origin quotas`, `gave women the vote`, `created the NHS`], answer: 1 },
        { question: `The abbreviation "de facto" means...`, choices: [`by law`, `in reality`, `in theory`, `by vote`], answer: 1 },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: `to fight for equality`, back: `se battre pour l'égalité` },
        { front: `a gap between rich and poor`, back: `un fossé entre riches et pauvres` },
        { front: `to outlaw / to ban`, back: `interdire par la loi` },
        { front: `to enforce a law`, back: `faire appliquer une loi` },
        { front: `a minority group`, back: `un groupe minoritaire` },
        { front: `a rally / a demonstration`, back: `un rassemblement / une manifestation` },
        { front: `a sit-in`, back: `un sit-in (occupation pacifique d'un lieu)` },
        { front: `the right to vote`, back: `le droit de vote (suffrage)` },
        { front: `turnout`, back: `le taux de participation` },
        { front: `a newcomer`, back: `un nouvel arrivant` },
        { front: `a refugee / an asylum seeker`, back: `un réfugié / un demandeur d'asile` },
        { front: `undocumented immigrant`, back: `immigré sans papiers` },
        { front: `border control`, back: `le contrôle aux frontières` },
        { front: `to integrate / integration`, back: `s'intégrer / l'intégration` },
        { front: `to belong`, back: `appartenir, avoir sa place` },
        { front: `the working class / the middle class`, back: `la classe ouvrière / la classe moyenne` },
        { front: `affirmative action`, back: `discrimination positive` },
        { front: `the pay gap`, back: `l'écart salarial` },
        { front: `the ballot`, back: `le scrutin, le bulletin` },
        { front: `to run for office`, back: `se présenter à une élection` },
        { front: `a landslide victory`, back: `une victoire écrasante` },
        { front: `a narrow majority`, back: `une courte majorité` },
        { front: `Leave / Remain`, back: `camp du Brexit / camp du maintien dans l'UE` },
        { front: `sovereignty`, back: `la souveraineté` },
        { front: `Jim Crow laws`, back: `lois de ségrégation du Sud des États-Unis` },
        { front: `law-abiding`, back: `respectueux de la loi` },
        { front: `outcry / outrage`, back: `tollé, indignation` },
        { front: `to tackle inequality`, back: `s'attaquer aux inégalités` },
      ],
    },
    {
      type: 'cloze',
      title: `Civil Rights: fill in the blanks`,
      text: `In {{1954}}, the Supreme Court ruled in {{Brown|Brown v. Board of Education}} that school {{segregation}} was unconstitutional. In 1955, {{Rosa Parks}} refused to give up her seat on a bus in {{Montgomery}}. In {{1963}}, Martin Luther King gave his famous speech at the {{Lincoln Memorial}}. The {{Civil Rights}} Act of 1964 outlawed {{discrimination}}, and the {{Voting Rights}} Act of 1965 protected the right to {{vote}}.`,
    },
    {
      type: 'cloze',
      title: `Brexit: fill in the blanks`,
      text: `The Brexit {{referendum}} took place on 23 {{June}} 2016. {{Leave}} won with 51.9% of the votes. {{Scotland}} and Northern Ireland voted to {{Remain}}. The UK formally left the EU on 31 {{January}} 2020. The slogan "take back {{control}}" stressed national {{sovereignty}}.`,
    },
    {
      type: 'truefalse',
      title: `True or false?`,
      statements: [
        { text: `The Civil Rights Act of 1964 gave the vote to women in the USA.`, answer: false, explanation: `Women's suffrage came with the 19th Amendment (1920). The 1964 Act banned discrimination in public places and employment.` },
        { text: `The "salad bowl" image suggests that cultures keep their identity.`, answer: true },
        { text: `The UK has a single written constitution.`, answer: false, explanation: `It is uncodified: a mix of statutes, conventions and historic documents.` },
        { text: `Scotland voted Remain in 2016.`, answer: true },
        { text: `Rosa Parks started the Black Lives Matter movement.`, answer: false, explanation: `BLM began in 2013; Rosa Parks was a leading figure of the 1950s.` },
        { text: `"De jure" segregation means segregation established by law.`, answer: true },
      ],
    },
    {
      type: 'ordering',
      title: `Put the events in chronological order`,
      items: [
        `Brown v. Board of Education (1954)`,
        `Montgomery bus boycott (1955-56)`,
        `March on Washington (1963)`,
        `Civil Rights Act (1964)`,
        `Voting Rights Act (1965)`,
        `Assassination of Martin Luther King (1968)`,
      ],
    },
    {
      type: 'steps',
      items: [
        { title: `Identify the nature and source`, text: `Who wrote it, when, for whom? (speech, editorial, poster, statistics)` },
        { title: `Find the main idea`, text: `What problem does the document raise? What stand does it take?` },
        { title: `Link it to the notion`, text: `Unity/diversity? Inequality? Citizenship? Democracy?` },
        { title: `Add context`, text: `One date and one fact from the course (e.g. 1964, Brexit 2016).` },
        { title: `Compare with the other documents`, text: `Similarities, differences, evolution over time or between places.` },
        { title: `Build a plan`, text: `2 or 3 paragraphs, each with an idea, evidence from documents, a link to the question.` },
      ],
    },
  ],
}
export default chapter
