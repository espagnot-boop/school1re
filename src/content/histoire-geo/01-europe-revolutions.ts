import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'europe-revolutions',
  subject: 'histoire-geo',
  order: 1,
  title: 'L’Europe face aux révolutions (1789-1848)',
  theme: 'Histoire — Thème 1',
  summary:
    'De la Révolution française à l’Empire napoléonien (1789-1815), puis de la Restauration au Printemps des peuples (1814-1848) : un nouveau modèle politique et social, ses diffusions et ses contestations en Europe.',
  duration: '5 semaines',
  objectives: [
    'Expliquer comment la Révolution française fonde un nouveau modèle politique (souveraineté nationale, droits, constitution) et social (égalité civile).',
    'Distinguer les grandes phases de la Révolution : monarchie constitutionnelle, République, Terreur, Directoire.',
    'Montrer comment Bonaparte puis Napoléon Ier stabilisent et consolident l’héritage révolutionnaire (Code civil, administration) tout en instaurant un régime autoritaire.',
    'Analyser l’Europe napoléonienne : domination, diffusion des idées, naissance des résistances nationales.',
    'Caractériser l’ordre européen défini par le congrès de Vienne et la Restauration en France.',
    'Expliquer pourquoi les idées libérales et nationales provoquent des révolutions en 1820-1830 puis en 1848.',
    'Savoir situer et dater les événements majeurs et analyser un document historique (nature, auteur, contexte, portée).',
  ],
  keywords: [
    'Révolution',
    'Ancien Régime',
    'souveraineté nationale',
    'monarchie constitutionnelle',
    'Terreur',
    'Directoire',
    'Consulat',
    'Empire',
    'Code civil',
    'Restauration',
    'congrès de Vienne',
    'libéralisme',
    'nationalisme',
    'Printemps des peuples',
  ],

  fiche: [
    { type: 'h2', text: 'L’essentiel du thème 1' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problématique générale',
      content: [
        {
          type: 'p',
          text: 'De 1789 à 1848, la Révolution française **bouleverse l’Europe** : elle détruit l’Ancien Régime en France, invente un modèle (souveraineté de la Nation, droits de l’homme, égalité civile) que Napoléon diffuse par la conquête, mais que les monarchies tentent d’effacer en 1815. Les idées **libérales et nationales** survivent et éclatent en 1830 puis en 1848.',
        },
      ],
    },
    { type: 'h3', text: 'Repères chronologiques' },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['5 mai 1789', 'Ouverture des États généraux à Versailles'],
        ['17 juin 1789', 'Les députés du tiers état se proclament Assemblée nationale'],
        ['14 juillet 1789', 'Prise de la Bastille'],
        ['4 août 1789', 'Abolition des privilèges (nuit du 4 août)'],
        ['26 août 1789', 'Déclaration des droits de l’homme et du citoyen'],
        ['20-21 juin 1791', 'Fuite du roi, arrêté à Varennes'],
        ['3 septembre 1791', 'Constitution : monarchie constitutionnelle'],
        ['20 avril 1792', 'Déclaration de guerre à l’Autriche'],
        ['21-22 septembre 1792', 'Abolition de la royauté, début de la Ire République (an I)'],
        ['21 janvier 1793', 'Exécution de Louis XVI'],
        ['5 septembre 1793 – 27 juillet 1794', 'La Terreur ; chute de Robespierre le 9 thermidor an II (27 juillet 1794)'],
        ['1795-1799', 'Directoire'],
        ['9 novembre 1799', 'Coup d’État du 18 brumaire : Bonaparte, Premier consul'],
        ['21 mars 1804', 'Code civil'],
        ['2 décembre 1804', 'Sacre de Napoléon Ier'],
        ['2 décembre 1805', 'Victoire d’Austerlitz'],
        ['1812', 'Campagne de Russie'],
        ['18 juin 1815', 'Waterloo'],
        ['sept. 1814 – juin 1815', 'Congrès de Vienne'],
        ['1830', 'Trois Glorieuses ; indépendance de la Belgique ; indépendance de la Grèce reconnue'],
        ['février-mars 1848', 'Révolution en France, « Printemps des peuples » en Europe'],
      ],
    },
    { type: 'h3', text: 'Notions clés' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Ancien Régime', value: 'Société d’ordres (clergé, noblesse, tiers état) et monarchie absolue de droit divin, avant 1789.' },
        { key: 'Souveraineté nationale', value: 'Le pouvoir appartient à la Nation et non au roi (art. 3 de la Déclaration de 1789).' },
        { key: 'Monarchie constitutionnelle', value: 'Le roi partage le pouvoir avec une assemblée élue ; ses pouvoirs sont limités par une constitution.' },
        { key: 'Suffrage censitaire', value: 'Droit de vote réservé aux citoyens payant un certain niveau d’impôt (le cens).' },
        { key: 'Terreur', value: 'Politique d’exception de 1793-1794 : répression des « ennemis de la Révolution » (Tribunal révolutionnaire, loi des suspects).' },
        { key: 'Restauration', value: 'Retour des Bourbons sur le trône (Louis XVIII, Charles X) : 1814-1830.' },
        { key: 'Libéralisme', value: 'Doctrine des libertés individuelles et politiques, du régime représentatif et d’un gouvernement limité par une constitution.' },
        { key: 'Nationalisme', value: 'Idée que chaque nation (communauté de langue, d’histoire, de culture) a droit à sa liberté et à un État.' },
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
            'La monarchie n’est pas abolie en 1789 mais en **septembre 1792**.',
            'La Terreur ne commence pas en 1789 mais en **septembre 1793** (« la Terreur à l’ordre du jour », 5 septembre) et prend fin avec Thermidor (1794).',
            'Napoléon n’efface pas la Révolution : il en conserve l’**égalité civile** mais supprime la **liberté politique** (presse, élections).',
            'Le congrès de Vienne ne restaure pas tout : l’Europe revient à un équilibre des puissances, mais les idées de 1789 ne disparaissent pas.',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Introduction : l’Europe de la fin du XVIIIe siècle' },
    {
      type: 'p',
      text: 'À la fin du XVIIIe siècle, la France de Louis XVI est le royaume le plus peuplé d’Europe occidentale (environ 28 millions d’habitants). Elle est une **monarchie absolue de droit divin** et une **société d’ordres** : le clergé (premier ordre) et la noblesse (deuxième ordre) bénéficient de privilèges (fiscaux, honorifiques), tandis que le tiers état (plus de 95 % de la population) – paysans, artisans, bourgeois – supporte l’essentiel de l’impôt et ne participe pas au pouvoir.',
    },
    {
      type: 'p',
      text: 'Les Lumières (Montesquieu, Voltaire, Rousseau) critiquent l’arbitraire et diffusent l’idée de liberté, d’égalité et de souveraineté du peuple. L’indépendance des États-Unis (1776-1783), à laquelle la France a participé, sert de modèle. Mais c’est la **crise financière de la monarchie** (dette liée à la guerre d’indépendance américaine) et la **crise économique** de 1788-1789 (mauvaises récoltes, cherté du pain) qui déclenchent la crise.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problématique du chapitre',
      content: [
        {
          type: 'p',
          text: 'Comment la Révolution française et l’Empire créent-ils un nouveau modèle politique et social, et pourquoi ce modèle est-il à la fois diffusé et combattu en Europe ?',
        },
      ],
    },

    { type: 'h2', text: 'I. La Révolution française : la fin de l’Ancien Régime (1789-1792)' },
    { type: 'h3', text: 'A. 1789 : l’année de la rupture' },
    {
      type: 'p',
      text: 'Pour résoudre la crise des finances, Louis XVI convoque les **États généraux**, qui s’ouvrent à Versailles le **5 mai 1789**. Un conflit éclate sur le mode de vote : par ordre (le tiers état serait toujours battu) ou par tête. Le tiers, soutenu par une partie du bas clergé et de la noblesse libérale, refuse. L’abbé Sieyès avait résumé l’enjeu dans sa brochure *Qu’est-ce que le tiers état ?* (janvier 1789).',
    },
    {
      type: 'quote',
      text: 'Qu’est-ce que le tiers état ? Tout. Qu’a-t-il été jusqu’ici dans l’ordre politique ? Rien. Que demande-t-il ? À y devenir quelque chose.',
      author: 'Emmanuel-Joseph Sieyès',
      source: 'Qu’est-ce que le tiers état ?, janvier 1789',
    },
    {
      type: 'timeline',
      events: [
        { date: '5 mai 1789', title: 'Ouverture des États généraux', text: 'Versailles ; le roi refuse le vote par tête.' },
        { date: '17 juin 1789', title: 'Assemblée nationale', text: 'Les députés du tiers état se proclament seuls représentants de la Nation.' },
        { date: '20 juin 1789', title: 'Serment du Jeu de paume', text: 'Les députés jurent de ne pas se séparer avant d’avoir donné une constitution à la France.' },
        { date: '9 juillet 1789', title: 'Assemblée nationale constituante', text: 'L’Assemblée se déclare constituante.' },
        { date: '14 juillet 1789', title: 'Prise de la Bastille', text: 'Le peuple parisien s’arme, la forteresse symbole de l’arbitraire royal tombe.' },
        { date: 'Juillet-août 1789', title: 'La Grande Peur', text: 'Panique et révoltes dans les campagnes ; châteaux attaqués.' },
        { date: '4 août 1789', title: 'Abolition des privilèges', text: 'Fin des droits seigneuriaux et de la société d’ordres.' },
        { date: '26 août 1789', title: 'Déclaration des droits de l’homme et du citoyen', text: '17 articles : liberté, égalité, propriété, sûreté, résistance à l’oppression.' },
        { date: '5-6 octobre 1789', title: 'Marche des femmes sur Versailles', text: 'Le roi et sa famille sont ramenés à Paris.' },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'La Déclaration des droits de l’homme et du citoyen (26 août 1789)',
      content: [
        {
          type: 'p',
          text: 'Texte fondateur qui proclame que « les hommes naissent et demeurent libres et égaux en droits » (art. 1), que « le principe de toute souveraineté réside essentiellement dans la Nation » (art. 3), que « la loi est l’expression de la volonté générale » (art. 6). Elle garantit la liberté d’opinion (art. 10), la liberté d’expression (art. 11) et la propriété (art. 17). Elle a une **portée universelle** mais elle ignore les femmes, les esclaves et ne définit pas le droit de vote.',
        },
      ],
    },
    { type: 'h3', text: 'B. L’œuvre de la Constituante (1789-1791)' },
    {
      type: 'list',
      items: [
        '**Sur le plan politique** : division du royaume en 83 départements (décembre 1789), suppression des anciennes provinces ; séparation des pouvoirs ; suffrage **censitaire** (distinction entre citoyens « actifs » et « passifs »).',
        '**Sur le plan économique** : suppression des corporations (décret d’Allarde, mars 1791) et interdiction des coalitions ouvrières (loi Le Chapelier, 14 juin 1791) ; vente des **biens nationaux** (biens du clergé nationalisés le 2 novembre 1789) ; création des assignats.',
        '**Sur le plan religieux** : la **Constitution civile du clergé** (12 juillet 1790) fait des prêtres des fonctionnaires élus. Le pape la condamne (1791) : le clergé se divise entre prêtres « jureurs » et « réfractaires ».',
        '**Fête de la Fédération** (14 juillet 1790) : symbole de l’unité de la Nation.',
      ],
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Fuite à Varennes (20-21 juin 1791)',
      content: [
        {
          type: 'p',
          text: 'Louis XVI tente de s’enfuir vers l’est pour rejoindre les troupes royalistes. Il est reconnu et arrêté à Varennes (Meuse). Cet épisode ruine la confiance : le roi apparaît comme un traître qui veut s’allier aux monarchies étrangères. Une partie des Français commence à envisager la République.',
        },
      ],
    },
    {
      type: 'p',
      text: 'La **Constitution du 3 septembre 1791** instaure une **monarchie constitutionnelle** : le roi dispose du pouvoir exécutif et d’un veto suspensif, l’Assemblée législative élue au suffrage censitaire vote les lois. Elle succède à la Constituante le 1er octobre 1791.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Les droits des femmes',
      content: [
        {
          type: 'p',
          text: 'Les femmes participent à la Révolution (marche du 5 octobre 1789, clubs) mais n’obtiennent pas le droit de vote. **Olympe de Gouges** publie en septembre 1791 la *Déclaration des droits de la femme et de la citoyenne*. Le divorce est autorisé le 20 septembre 1792 et l’égalité des héritiers filles/garçons proclamée. Les clubs de femmes sont interdits en octobre 1793 ; Olympe de Gouges est guillotinée en novembre 1793.',
        },
      ],
    },

    { type: 'h2', text: 'II. La République et la Terreur (1792-1799)' },
    { type: 'h3', text: 'A. La guerre et la chute de la monarchie' },
    {
      type: 'p',
      text: 'Le **20 avril 1792**, la France déclare la guerre au « roi de Bohême et de Hongrie » (l’Autriche) : les Girondins veulent propager la liberté, le roi espère une défaite qui rétablirait son autorité. Les premiers revers provoquent la patrie « en danger » (juillet). Le **10 août 1792**, les sans-culottes parisiens et les fédérés prennent le palais des Tuileries : le roi est suspendu et emprisonné. Les 2-6 septembre ont lieu les massacres dans les prisons parisiennes. Le **20 septembre 1792**, la victoire de **Valmy** sauve la Révolution ; le même jour se réunit la **Convention**, élue au suffrage universel masculin, qui abolit la royauté le **21 septembre 1792**. Le 22 septembre 1792 devient le premier jour de l’an I de la République.',
    },
    {
      type: 'p',
      text: 'Louis XVI est jugé par la Convention, reconnu coupable de conspiration contre la sûreté de l’État et condamné à mort ; il est guillotiné le **21 janvier 1793**. La France est alors en guerre contre une coalition européenne (Angleterre, Espagne, Provinces-Unies, Autriche, Prusse…).',
    },
    { type: 'h3', text: 'B. La Terreur (1793-1794)' },
    {
      type: 'p',
      text: 'En 1793, la République est menacée sur tous les fronts : invasion, insurrection de la **Vendée** (mars 1793), soulèvements fédéralistes en province, crise économique. La Convention met en place un gouvernement d’exception :',
    },
    {
      type: 'list',
      items: [
        'Création du **Tribunal révolutionnaire** (mars 1793) et du **Comité de salut public** (6 avril 1793) ;',
        'Exclusion des Girondins (2 juin 1793, journée insurrectionnelle des sans-culottes) ; la Montagne domine ; **Robespierre** entre au Comité le 27 juillet 1793 ;',
        '**Levée en masse** (23 août 1793) : tous les Français sont mobilisés pour défendre la patrie ;',
        '**5 septembre 1793** : la « Terreur à l’ordre du jour » ; **loi des suspects** (17 septembre 1793) ; **loi du Maximum général** sur les prix et salaires (29 septembre 1793) ;',
        'Exécutions : la reine Marie-Antoinette (16 octobre 1793), les Girondins (octobre 1793), les « hébertistes » et les « indulgents » (printemps 1794) ;',
        'Politique révolutionnaire : calendrier républicain (an II), déchristianisation, culte de l’Être suprême (8 juin 1794), **abolition de l’esclavage dans les colonies** (4 février 1794).',
      ],
    },
    {
      type: 'quote',
      text: 'La Terreur n’est autre chose que la justice prompte, sévère, inflexible ; elle est donc une émanation de la vertu.',
      author: 'Maximilien de Robespierre',
      source: 'Discours à la Convention, 5 février 1794',
    },
    {
      type: 'p',
      text: 'La Terreur fait environ **16 600 condamnations à mort** officielles (guillotinés) et des dizaines de milliers de victimes au total, dont la guerre de Vendée où les « colonnes infernales » du général Turreau ravagent le pays (1794). La Terreur est à la fois un système de **défense nationale** (victoire de Fleurus, 26 juin 1794) et une dérive autoritaire. Elle s’achève avec la chute de Robespierre, le **9 thermidor an II (27 juillet 1794)**.',
    },
    { type: 'h3', text: 'C. Le Directoire (1795-1799)' },
    {
      type: 'p',
      text: 'La **Constitution de l’an III** (août 1795) instaure le Directoire : un exécutif de cinq Directeurs, un Parlement de deux chambres (Conseil des Cinq-Cents et Conseil des Anciens), un suffrage censitaire. Le régime veut éviter à la fois la monarchie et la dictature jacobine, mais il est instable : coups d’État contre les royalistes (fructidor an V, 4 septembre 1797) ou les jacobins, corruption, difficultés financières. Il repose de plus en plus sur l’armée, dont les victoires (campagne d’Italie 1796-1797 du général **Bonaparte**) assurent le prestige.',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Les trois conceptions de la République',
      content: [
        {
          type: 'list',
          items: [
            '**République libérale** de la Convention thermidorienne et du Directoire : priorité à la propriété, au suffrage censitaire.',
            '**République jacobine** de l’an II : centralisation, Terreur, égalité sociale limitée (maximum).',
            '**République girondine** : libérale, fédéraliste, favorable à la guerre.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'III. Napoléon Bonaparte : consolider la Révolution (1799-1815)' },
    { type: 'h3', text: 'A. Du Consulat à l’Empire' },
    {
      type: 'p',
      text: 'Le **18 brumaire an VIII (9 novembre 1799)**, le général Bonaparte, soutenu par Sieyès et des membres du Directoire, renverse le régime par un coup d’État. La Constitution de l’an VIII (décembre 1799) donne le pouvoir à trois consuls, en fait au **Premier consul**. Le 15 décembre 1799, la proclamation des consuls affirme que « la Révolution est fixée aux principes qui l’ont commencée : elle est finie ». En 1802, Bonaparte devient **consul à vie** (2 août 1802). Le **18 mai 1804**, le Sénat proclame l’Empire ; le **2 décembre 1804**, Napoléon Ier est sacré empereur à Notre-Dame en présence du pape Pie VII, mais se couronne lui-même.',
    },
    { type: 'h3', text: 'B. Les « masses de granit » : un régime qui conserve et organise' },
    {
      type: 'table',
      headers: ['Domaine', 'Mesures', 'Dates'],
      rows: [
        ['Administration', 'Préfets nommés, centralisation (loi du 28 pluviôse an VIII)', '17 février 1800'],
        ['Finances', 'Banque de France ; franc germinal stable', '18 janvier 1800 ; 1803'],
        ['Religion', 'Concordat avec le pape Pie VII : catholicisme « religion de la majorité des Français »', '15 juillet 1801'],
        ['Éducation', 'Lycées ; Université impériale ; baccalauréat', '1802 ; 1806-1808'],
        ['Honneurs', 'Légion d’honneur (récompense du mérite civil et militaire)', '19 mai 1802'],
        ['Droit', 'Code civil des Français (« Code Napoléon »)', '21 mars 1804'],
        ['Noblesse d’Empire', 'Titres accordés au mérite, à la fidélité', '1808'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Le Code civil de 1804',
      content: [
        {
          type: 'p',
          text: 'Il unifie le droit : **égalité devant la loi**, liberté individuelle, liberté de conscience, **propriété** (art. 544 : « droit de jouir et disposer des choses de la manière la plus absolue »), laïcité de l’état civil et du mariage civil, abolition de la féodalité. Mais il est aussi **patriarcal** : la femme mariée est juridiquement incapable (art. 213 : « le mari doit protection à sa femme, la femme obéissance à son mari ») ; l’autorité du père est renforcée ; le travail est défavorable aux ouvriers (art. 1781 : « le maître est cru sur son affirmation » pour les salaires). L’esclavage est rétabli dans les colonies en 1802.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Un régime autoritaire',
      content: [
        {
          type: 'list',
          items: [
            'Presse censurée : en 1811, seulement 4 journaux subsistent à Paris ; police de Fouché.',
            'Plébiscites truqués, pouvoir personnel, assemblées sans pouvoir réel.',
            'Rétablissement de l’esclavage en 1802 (loi du 20 mai 1802) : révolte de Saint-Domingue, indépendance d’Haïti en 1804.',
            'Conscription : lourde « impôt du sang » pour les guerres.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'C. L’Europe napoléonienne (1805-1812)' },
    {
      type: 'p',
      text: 'Napoléon bat les coalitions successives : **Austerlitz** (2 décembre 1805) contre l’Autriche et la Russie, **Iéna** (14 octobre 1806) contre la Prusse, **Friedland** (14 juin 1807) puis le traité de **Tilsit** (juillet 1807) avec le tsar Alexandre Ier. Seule l’Angleterre résiste : sa flotte détruit la flotte franco-espagnole à **Trafalgar** (21 octobre 1805). Napoléon répond par le **Blocus continental** (décret de Berlin, 21 novembre 1806) qui interdit aux ports européens de commercer avec l’Angleterre.',
    },
    {
      type: 'p',
      text: 'À son apogée (1810-1811), l’Empire compte 130 départements. Autour de la « Grande Nation » : des **États vassaux** confiés à ses frères et beaux-frères (royaume d’Espagne – Joseph, royaume de Hollande – Louis, royaume de Westphalie – Jérôme, royaume de Naples – Murat, royaume d’Italie), la **Confédération du Rhin** (1806), le **Grand-Duché de Varsovie** (1807) et des États alliés (Autriche après 1810 par le mariage avec Marie-Louise, Prusse).',
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Ambivalence de la domination napoléonienne',
      content: [
        {
          type: 'list',
          items: [
            '**Diffusion** : Code civil, abolition de la féodalité et du servage, égalité devant la loi, administration moderne, émancipation des Juifs (dans certaines régions).',
            '**Domination** : impôts, réquisitions, conscription, pillage d’œuvres d’art, pouvoir de la famille Bonaparte, imposition de la domination française.',
            '**Réaction** : guérilla espagnole (1808, soulèvement du 2 mai à Madrid), sentiment national allemand (Fichte, *Discours à la nation allemande*, 1807-1808), résistance de l’Angleterre.',
          ],
        },
      ],
    },
    { type: 'h3', text: 'D. La chute (1812-1815)' },
    {
      type: 'steps',
      items: [
        { title: '1808 : le « bourbier espagnol »', text: 'Napoléon place son frère Joseph sur le trône d’Espagne ; insurrection du 2 mai 1808 à Madrid, guérilla durable, intervention anglaise.' },
        { title: '1812 : la campagne de Russie', text: 'Le tsar refuse d’appliquer le Blocus. La Grande Armée (environ 600 000 hommes) franchit le Niémen en juin 1812 ; bataille de la Moskova/Borodino (7 septembre), entrée dans Moscou en flammes (14 septembre), retraite en hiver, passage de la Bérézina (fin novembre) : quelques dizaines de milliers d’hommes seulement rentrent.' },
        { title: '1813 : la défaite en Allemagne', text: 'Bataille de Leipzig (16-19 octobre 1813), « bataille des Nations ». La coalition (Russie, Prusse, Autriche, Angleterre, Suède) l’emporte.' },
        { title: '1814 : la campagne de France et l’abdication', text: 'Les Alliés entrent à Paris (31 mars 1814). Napoléon abdique à Fontainebleau le 6 avril 1814 et part pour l’île d’Elbe.' },
        { title: '1815 : les Cent-Jours', text: 'Retour de l’île d’Elbe (1er mars 1815), reprise du pouvoir à Paris (20 mars). Défaite de **Waterloo** le 18 juin 1815. Deuxième abdication (22 juin), exil à **Sainte-Hélène** où il meurt le 5 mai 1821.' },
      ],
    },
    {
      type: 'svg',
      caption: 'Les régimes politiques successifs en France (1789-1815)',
      svg: `<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="10" y="20" width="110" height="60" class="svg-card svg-stroke" stroke-width="1.5" fill="none" stroke="currentColor"/>
<text x="65" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Monarchie</text>
<text x="65" y="62" text-anchor="middle" fill="currentColor">constitutionnelle</text>
<text x="65" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">1789-1792</text>
<rect x="135" y="20" width="110" height="60" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
<text x="190" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Convention</text>
<text x="190" y="62" text-anchor="middle" fill="currentColor">Ire République</text>
<text x="190" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">1792-1795</text>
<rect x="260" y="20" width="110" height="60" fill="none" stroke="hsl(0 84% 60%)" stroke-width="1.5"/>
<text x="315" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Terreur</text>
<text x="315" y="62" text-anchor="middle" fill="currentColor">sept. 1793-juil. 1794</text>
<text x="315" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">(dans la Convention)</text>
<rect x="385" y="20" width="110" height="60" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
<text x="440" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Directoire</text>
<text x="440" y="62" text-anchor="middle" fill="currentColor">5 Directeurs</text>
<text x="440" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">1795-1799</text>
<rect x="510" y="20" width="90" height="60" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>
<text x="555" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Consulat</text>
<text x="555" y="62" text-anchor="middle" fill="currentColor">Bonaparte</text>
<text x="555" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">1799-1804</text>
<rect x="615" y="20" width="95" height="60" fill="none" stroke="hsl(263 70% 60%)" stroke-width="1.5"/>
<text x="662" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Empire</text>
<text x="662" y="62" text-anchor="middle" fill="currentColor">Napoléon Ier</text>
<text x="662" y="95" text-anchor="middle" fill="currentColor" opacity="0.7">1804-1814/15</text>
<line x1="10" y1="140" x2="710" y2="140" stroke="currentColor" stroke-width="1"/>
<g fill="currentColor" font-size="11" text-anchor="middle">
<line x1="30" y1="134" x2="30" y2="146" stroke="currentColor"/><text x="30" y="162">1789</text>
<line x1="155" y1="134" x2="155" y2="146" stroke="currentColor"/><text x="155" y="162">1792</text>
<line x1="280" y1="134" x2="280" y2="146" stroke="currentColor"/><text x="280" y="162">1793</text>
<line x1="400" y1="134" x2="400" y2="146" stroke="currentColor"/><text x="400" y="162">1795</text>
<line x1="525" y1="134" x2="525" y2="146" stroke="currentColor"/><text x="525" y="162">1799</text>
<line x1="625" y1="134" x2="625" y2="146" stroke="currentColor"/><text x="625" y="162">1804</text>
<line x1="690" y1="134" x2="690" y2="146" stroke="currentColor"/><text x="690" y="162">1815</text>
</g>
</svg>`,
    },

    { type: 'h2', text: 'IV. L’Europe entre restauration et révolution (1814-1848)' },
    { type: 'h3', text: 'A. Le congrès de Vienne et l’ordre européen (1814-1815)' },
    {
      type: 'p',
      text: 'Après la chute de Napoléon, les vainqueurs se réunissent au **congrès de Vienne** (septembre 1814 – juin 1815) sous la direction du chancelier autrichien **Metternich**. Le Français **Talleyrand** y défend les intérêts de la France vaincue. L’**Acte final** est signé le 9 juin 1815. Trois principes guident les négociations :',
    },
    {
      type: 'list',
      items: [
        '**Légitimité** : rétablir les dynasties légitimes (Bourbons en France et en Espagne, Naples…) ;',
        '**Équilibre** entre les grandes puissances (Russie, Autriche, Prusse, Royaume-Uni, France) pour empêcher toute domination nouvelle ;',
        '**Solidarité** des souverains contre les révolutions : **Sainte-Alliance** (26 septembre 1815 : Russie, Autriche, Prusse) puis **Quadruple-Alliance** (20 novembre 1815 : Royaume-Uni, Russie, Autriche, Prusse), « Concert européen ».',
      ],
    },
    {
      type: 'p',
      text: 'Les remaniements territoriaux ignorent les **aspirations nationales** : la Pologne est partagée (Russie, Prusse, Autriche), l’Italie reste divisée sous domination autrichienne (Lombardie-Vénétie), l’Allemagne est organisée en **Confédération germanique** de 39 États sous présidence autrichienne ; la Belgique est unie aux Pays-Bas ; la Norvège passe sous la couronne suédoise. La France revient aux frontières de 1790 (à quelques détails près : deuxième traité de Paris, 20 novembre 1815, qui lui retire encore quelques territoires et impose une indemnité).',
    },
    {
      type: 'svg',
      caption: 'Schéma : l’ordre de Vienne (1815) et ses lignes de fracture',
      svg: `<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="270" y="10" width="160" height="50" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="350" y="32" text-anchor="middle" fill="currentColor" font-weight="bold">Congrès de Vienne</text>
<text x="350" y="49" text-anchor="middle" fill="currentColor">sept. 1814 – juin 1815</text>
<line x1="350" y1="60" x2="350" y2="90" stroke="currentColor"/>
<line x1="90" y1="90" x2="610" y2="90" stroke="currentColor"/>
<line x1="90" y1="90" x2="90" y2="110" stroke="currentColor"/>
<line x1="350" y1="90" x2="350" y2="110" stroke="currentColor"/>
<line x1="610" y1="90" x2="610" y2="110" stroke="currentColor"/>
<rect x="10" y="110" width="160" height="90" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
<text x="90" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Légitimité</text>
<text x="90" y="152" text-anchor="middle" fill="currentColor">Retour des dynasties</text>
<text x="90" y="168" text-anchor="middle" fill="currentColor">Bourbons (France, Espagne,</text>
<text x="90" y="184" text-anchor="middle" fill="currentColor">Naples), pape</text>
<rect x="270" y="110" width="160" height="90" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
<text x="350" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Équilibre</text>
<text x="350" y="152" text-anchor="middle" fill="currentColor">5 grandes puissances :</text>
<text x="350" y="168" text-anchor="middle" fill="currentColor">Russie, Autriche, Prusse,</text>
<text x="350" y="184" text-anchor="middle" fill="currentColor">Royaume-Uni, France</text>
<rect x="530" y="110" width="160" height="90" fill="none" stroke="hsl(0 84% 60%)" stroke-width="1.5"/>
<text x="610" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Solidarité</text>
<text x="610" y="152" text-anchor="middle" fill="currentColor">Sainte-Alliance (1815)</text>
<text x="610" y="168" text-anchor="middle" fill="currentColor">Quadruple-Alliance</text>
<text x="610" y="184" text-anchor="middle" fill="currentColor">Concert européen</text>
<line x1="350" y1="200" x2="350" y2="235" stroke="currentColor" stroke-dasharray="4 3"/>
<rect x="150" y="235" width="400" height="110" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5" stroke-dasharray="6 3"/>
<text x="350" y="257" text-anchor="middle" fill="currentColor" font-weight="bold">Mais : ignore libéralisme et nationalités</text>
<text x="350" y="280" text-anchor="middle" fill="currentColor">Pologne partagée • Italie divisée (Autriche)</text>
<text x="350" y="298" text-anchor="middle" fill="currentColor">Allemagne : Confédération germanique (39 États)</text>
<text x="350" y="316" text-anchor="middle" fill="currentColor">Belgique unie aux Pays-Bas • Grèce sous l’Empire ottoman</text>
<text x="350" y="334" text-anchor="middle" fill="currentColor" opacity="0.8">=&gt; révolutions de 1820-1830, puis 1848</text>
</svg>`,
    },
    { type: 'h3', text: 'B. La Restauration en France (1814-1830)' },
    {
      type: 'p',
      text: 'Louis XVIII, frère de Louis XVI, rentre en 1814 et octroie la **Charte constitutionnelle** (4 juin 1814) : monarchie **constitutionnelle** (le roi nomme les ministres et propose les lois), deux chambres (Chambre des pairs nommés, Chambre des députés élus au suffrage très censitaire : environ 90 000 électeurs sur 30 millions d’habitants), maintien de l’égalité devant la loi, de la liberté individuelle, du Code civil, de la vente des biens nationaux. Le catholicisme est « religion de l’État ». Après la « Chambre introuvable » (1815) et la Terreur blanche, Louis XVIII pratique une politique modérée. Son frère **Charles X** (1824-1830), sacré à Reims (1825), mène une politique ultra-royaliste et cléricale (loi sur le sacrilège 1825, « milliard des émigrés »). Face à l’opposition libérale, il signe le 25 juillet 1830 les **quatre ordonnances de Saint-Cloud** (dissolution de la Chambre, restriction du suffrage, suppression de la liberté de la presse).',
    },
    {
      type: 'p',
      text: 'Paris se soulève lors des **Trois Glorieuses** (27, 28 et 29 juillet 1830). Charles X abdique et s’exile. Les libéraux (Thiers, La Fayette) portent sur le trône **Louis-Philippe d’Orléans**, « roi des Français » (et non « roi de France »), qui adopte le drapeau tricolore : c’est la **monarchie de Juillet** (1830-1848), régime censitaire dominé par la bourgeoisie (cens abaissé à 200 francs, environ 240 000 électeurs). Sous la devise attribuée à Guizot « enrichissez-vous par le travail et par l’épargne », le régime refuse le suffrage universel et les réformes sociales, malgré l’essor industriel et la montée de la « question sociale » (révoltes des canuts de Lyon en 1831 et 1834).',
    },
    { type: 'h3', text: 'C. Les idées libérales et nationales (1815-1848)' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Libéralisme', text: 'Libertés individuelles, régime représentatif, constitution, souvent suffrage censitaire. Bourgeoisie, intellectuels.', icon: 'Scale' },
        { title: 'Nationalisme', text: 'Droit des peuples à disposer d’eux-mêmes ; langue, histoire, culture communes. Soutenu par le romantisme.', icon: 'Flag' },
        { title: 'Socialisme', text: 'Critique des inégalités de la société industrielle (Saint-Simon, Fourier, Proudhon, Louis Blanc) ; naissance du mouvement ouvrier.', icon: 'Users' },
      ],
    },
    { type: 'h3', text: 'D. Les révolutions de 1820-1830' },
    {
      type: 'table',
      headers: ['Date', 'Lieu', 'Événement et issue'],
      rows: [
        ['1820-1821', 'Espagne, Naples, Piémont', 'Soulèvements libéraux écrasés (intervention autrichienne en Italie ; intervention française en Espagne en 1823)'],
        ['1821-1830', 'Grèce', 'Insurrection contre l’Empire ottoman (1821) ; soutien des philhellènes (Byron, Delacroix) ; victoire navale de Navarin (20 octobre 1827) ; indépendance reconnue en 1830 (royaume en 1832)'],
        ['Décembre 1825', 'Russie', 'Révolte des décembristes, écrasée par Nicolas Ier'],
        ['Juillet 1830', 'France', 'Trois Glorieuses : chute de Charles X, monarchie de Juillet'],
        ['Août-octobre 1830', 'Belgique', 'Insurrection contre les Pays-Bas ; indépendance proclamée en octobre 1830 ; Léopold Ier roi (21 juillet 1831)'],
        ['Novembre 1830 – 1831', 'Pologne', 'Insurrection contre la Russie, écrasée'],
        ['1831', 'Italie centrale', 'Insurrections (Carbonari) réprimées par l’Autriche'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Le cas belge : une révolution réussie parce qu’internationale',
      content: [
        {
          type: 'p',
          text: 'La Belgique réussit parce que la Grande-Bretagne et la France soutiennent son indépendance, et que la Russie est occupée par la Pologne. La conférence de Londres reconnaît la Belgique, neutre, en 1831. Les Pays-Bas ne la reconnaîtront officiellement qu’en 1839.',
        },
      ],
    },
    { type: 'h3', text: 'E. 1848 : la « Révolution des peuples »' },
    {
      type: 'p',
      text: 'En **février 1848**, la monarchie de Juillet s’effondre à Paris (journées des 22-24 février, interdiction du banquet réformiste). Louis-Philippe abdique et part pour l’Angleterre. La **IIe République** est proclamée le 24 février. Le gouvernement provisoire (Lamartine) instaure le **suffrage universel masculin** (2 mars 1848), la liberté de la presse, les Ateliers nationaux et, sur proposition de Victor Schœlcher, l’**abolition définitive de l’esclavage** dans les colonies françaises (décret du 27 avril 1848). Les premières élections au suffrage universel masculin (23-24 avril 1848) donnent une Assemblée constituante modérée ; après la fermeture des ateliers nationaux, Paris se soulève : les **journées de juin** (22-26 juin 1848) sont réprimées par le général Cavaignac. En décembre 1848, **Louis-Napoléon Bonaparte** est élu président de la République au suffrage universel masculin.',
    },
    {
      type: 'p',
      text: 'La révolution française déclenche en mars 1848 le **Printemps des peuples** : à **Vienne** (13 mars), Metternich démissionne et s’enfuit ; à **Berlin** (18 mars), le roi de Prusse promet une constitution ; à **Milan** (18-22 mars, « cinq journées ») et à **Venise**, les Italiens se soulèvent contre l’Autriche ; en **Hongrie**, Kossuth réclame l’autonomie ; à **Francfort**, un Parlement réunit des députés allemands (mai 1848) pour unifier l’Allemagne et rédiger une constitution libérale.',
    },
    {
      type: 'p',
      text: 'Mais **la contre-révolution l’emporte** : les mouvements nationaux se contredisent entre eux (Allemands, Slaves, Hongrois), les libéraux modérés craignent la révolution sociale, et les monarchies conservent l’armée. L’empereur d’Autriche reprend Vienne (octobre 1848) ; Radetzky bat le roi de Piémont-Sardaigne Charles-Albert à Novare (23 mars 1849) ; la Hongrie est écrasée avec l’aide de la Russie (août 1849) ; la République romaine est renversée par la France (juillet 1849) ; le roi de Prusse Frédéric-Guillaume IV refuse la couronne impériale offerte par le Parlement de Francfort (avril 1849).',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan de 1848',
      content: [
        {
          type: 'list',
          items: [
            'Échec politique immédiat en Europe, mais **progrès durables** : abolition du servage en Autriche (1848), suffrage universel masculin en France, constitutions libérales (Prusse 1850, Piémont avec le Statuto albertino de 1848).',
            'Les deux grands combats du siècle sont posés : **liberté et nation**. Les unifications italienne et allemande se feront ensuite par la force des États (Piémont, Prusse) : c’est l’objet du chapitre suivant.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : analyser un document historique',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Présenter', text: 'Nature (discours, affiche, tableau, texte de loi…), auteur, date, destinataire.' },
            { title: 'Contextualiser', text: 'Que se passe-t-il à cette date ? Qui est l’auteur, quel est son point de vue ?' },
            { title: 'Extraire', text: 'Relever les informations essentielles, les mots clés, citer des passages courts entre guillemets.' },
            { title: 'Interpréter', text: 'Que montre ce document ? Quelle est l’intention de l’auteur ? Quelles limites (point de vue, propagande) ?' },
            { title: 'Conclure', text: 'Apport pour répondre à la question posée.' },
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex-dates-1789',
      title: 'Ordonner et dater les événements de 1789',
      difficulty: 1,
      duration: 10,
      tags: ['repères'],
      statement: [
        {
          type: 'p',
          text: 'Placez dans l’ordre chronologique et donnez la date précise des événements suivants : (a) Serment du Jeu de paume ; (b) prise de la Bastille ; (c) ouverture des États généraux ; (d) Déclaration des droits de l’homme et du citoyen ; (e) nuit du 4 août ; (f) création de l’Assemblée nationale.',
        },
      ],
      hints: ['Pensez au déroulement : États généraux, puis Assemblée, puis Bastille, puis abolition des privilèges.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '(c) Ouverture des États généraux : 5 mai 1789.',
            '(f) Les députés du tiers état se proclament Assemblée nationale : 17 juin 1789.',
            '(a) Serment du Jeu de paume : 20 juin 1789.',
            '(b) Prise de la Bastille : 14 juillet 1789.',
            '(e) Abolition des privilèges (nuit du 4 août) : 4 août 1789.',
            '(d) Déclaration des droits de l’homme et du citoyen : 26 août 1789.',
          ],
        },
      ],
    },
    {
      id: 'ex-ddhc',
      title: 'Analyser la Déclaration de 1789',
      difficulty: 2,
      duration: 20,
      tags: ['document'],
      statement: [
        {
          type: 'quote',
          text: 'Art. 1 – Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l’utilité commune.\nArt. 3 – Le principe de toute souveraineté réside essentiellement dans la Nation. Nul corps, nul individu ne peut exercer d’autorité qui n’en émane expressément.\nArt. 6 – La loi est l’expression de la volonté générale.',
          source: 'Déclaration des droits de l’homme et du citoyen, 26 août 1789 (extraits)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Présentez le document (nature, date, contexte).',
            'Quels principes de l’Ancien Régime ces articles remettent-ils en cause ?',
            'Montrez que ce texte a une portée universelle mais reste limité dans son application en 1789.',
          ],
        },
      ],
      hints: [
        'Rappelez-vous ce qu’étaient la société d’ordres et la monarchie de droit divin.',
        'Qui est exclu du droit de vote en 1791 ? Et les esclaves ?',
      ],
      solution: [
        {
          type: 'p',
          text: '**1. Présentation.** Ce texte est la Déclaration des droits de l’homme et du citoyen, adoptée le 26 août 1789 par l’Assemblée nationale constituante, quelques semaines après la prise de la Bastille et l’abolition des privilèges. Elle sert de préambule à la future constitution et définit les principes de la nouvelle société.',
        },
        {
          type: 'p',
          text: '**2. Remises en cause.** L’article 1 supprime la société d’ordres fondée sur la naissance et les privilèges : tous sont égaux en droits, les distinctions ne reposent que sur l’utilité commune. L’article 3 retire la souveraineté au roi de droit divin pour la donner à la Nation (souveraineté nationale). L’article 6 affirme que la loi est la même pour tous et émane de la volonté générale, ce qui s’oppose à l’arbitraire royal (lettres de cachet).',
        },
        {
          type: 'p',
          text: '**3. Portée et limites.** Le texte parle d’« hommes » en général : son ambition est universelle et il inspirera de nombreux mouvements dans le monde. Mais, en 1789-1791, les femmes n’ont pas de droits politiques, les esclaves des colonies ne sont pas libérés (l’esclavage ne sera aboli qu’en 1794, puis rétabli en 1802 et définitivement aboli en 1848) et le suffrage est censitaire (citoyens « actifs » et « passifs »). Les principes dépassent donc largement leur application immédiate.',
        },
      ],
    },
    {
      id: 'ex-terreur',
      title: 'Expliquer la Terreur',
      difficulty: 2,
      duration: 25,
      tags: ['rédaction', 'question problématisée'],
      statement: [
        { type: 'p', text: 'Rédigez un paragraphe argumenté (10-15 lignes) répondant à la question : **« Pourquoi la Révolution française connaît-elle un régime de Terreur en 1793-1794 ? »** Vous mobiliserez au moins quatre repères chronologiques.' },
      ],
      hints: ['Menaces extérieures, menaces intérieures, crise économique, conflits politiques.', 'Citez le 21 janvier 1793, mars 1793, 5 septembre 1793, 27 juillet 1794.'],
      solution: [
        {
          type: 'p',
          text: 'La Terreur s’explique d’abord par la situation de **danger extrême** que connaît la République en 1793. Depuis la déclaration de guerre du 20 avril 1792, la France affronte une vaste coalition ; l’exécution de Louis XVI (21 janvier 1793) a convaincu les monarchies européennes que la Révolution est une menace. À l’intérieur, l’insurrection de la Vendée (mars 1793) et les révoltes fédéralistes en province menacent l’unité de la Nation. La crise économique (inflation, cherté du pain) nourrit la colère des sans-culottes parisiens, qui pèsent sur la Convention (journée du 2 juin 1793 contre les Girondins).',
        },
        {
          type: 'p',
          text: 'Face à cela, la Convention, dominée par les Montagnards et le Comité de salut public (créé le 6 avril 1793, Robespierre y entre le 27 juillet), met en place un **gouvernement d’exception** : levée en masse (23 août), Terreur « à l’ordre du jour » (5 septembre 1793), loi des suspects (17 septembre), maximum des prix (29 septembre). Le Tribunal révolutionnaire condamne les « ennemis de la Révolution ». La Terreur est ainsi à la fois un instrument de défense nationale et un système répressif. Une fois la menace extérieure écartée (victoire de Fleurus le 26 juin 1794), elle perd sa justification : Robespierre est renversé le 9 thermidor an II (27 juillet 1794).',
        },
      ],
    },
    {
      id: 'ex-napoleon-heritage',
      title: 'Napoléon : héritier ou fossoyeur de la Révolution ?',
      difficulty: 2,
      duration: 25,
      tags: ['document', 'Napoléon'],
      statement: [
        {
          type: 'quote',
          text: 'Citoyens, la Révolution est fixée aux principes qui l’ont commencée : elle est finie.',
          source: 'Proclamation des consuls, 15 décembre 1799',
        },
        {
          type: 'quote',
          text: 'Art. 213 – Le mari doit protection à sa femme, la femme obéissance à son mari.\nArt. 544 – La propriété est le droit de jouir et disposer des choses de la manière la plus absolue, pourvu qu’on n’en fasse pas un usage prohibé par les lois ou par les règlements.',
          source: 'Code civil des Français, 21 mars 1804 (extraits)',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Que signifie la phrase « la Révolution est finie » ? Pourquoi les consuls la prononcent-ils en 1799 ?',
            'Quels acquis de 1789 le Code civil conserve-t-il ? Quels sont ses aspects en rupture avec la Révolution ?',
            'En vous appuyant sur vos connaissances, montrez que le régime est autoritaire.',
          ],
        },
      ],
      hints: ['Pensez à ce que la Révolution avait de « fixé » : propriété, égalité civile, abolition des privilèges.', 'Souvenez-vous du sort de la presse et du divorce sous l’Empire.'],
      solution: [
        {
          type: 'p',
          text: '**1.** Les consuls veulent rassurer les Français après dix ans de troubles : la Révolution a atteint ses buts (fin de l’Ancien Régime, égalité civile, propriété garantie) et doit maintenant être stabilisée. La formule annonce la fin de l’instabilité politique et du Directoire, mais aussi, implicitement, la fin du temps des assemblées et de la lutte politique.',
        },
        {
          type: 'p',
          text: '**2.** Le Code civil conserve l’**égalité devant la loi**, la liberté individuelle et de conscience, la **propriété** privée (art. 544), la laïcité de l’état civil, l’abolition des droits féodaux : ce sont des acquis de 1789. Mais il s’éloigne de l’esprit révolutionnaire sur la place des femmes (art. 213 : la femme mariée doit obéissance à son mari, elle est juridiquement incapable) et sur celle des ouvriers (livret ouvrier ; art. 1781). Il restreint aussi le divorce (supprimé en 1816 sous la Restauration).',
        },
        {
          type: 'p',
          text: '**3.** Le régime est autoritaire : pouvoir personnel de Napoléon (consul à vie en 1802, empereur en 1804), plébiscites contrôlés, assemblées sans pouvoir réel, presse censurée (en 1811 il ne reste que quatre journaux parisiens), police de Fouché, rétablissement de l’esclavage en 1802. Napoléon conserve donc l’égalité civile mais supprime la liberté politique.',
        },
      ],
    },
    {
      id: 'ex-vienne',
      title: 'Le congrès de Vienne : un ordre durable ?',
      difficulty: 2,
      duration: 25,
      tags: ['question problématisée', 'Restauration'],
      statement: [
        { type: 'p', text: 'Répondez à la question : **« Dans quelle mesure le congrès de Vienne rétablit-il l’ordre d’avant la Révolution ? »** Vous présenterez les principes du congrès, les décisions territoriales, puis les limites de l’ordre établi.' },
      ],
      hints: ['Trois principes : légitimité, équilibre, solidarité.', 'Les peuples (Pologne, Italie, Allemagne, Belgique) sont-ils pris en compte ?'],
      solution: [
        {
          type: 'p',
          text: 'Réuni de septembre 1814 à juin 1815 sous la direction de Metternich, le congrès de Vienne veut éviter le retour de la révolution et de l’hégémonie française. Il s’appuie sur trois principes : la **légitimité** (retour des dynasties : Bourbons en France, en Espagne, à Naples), l’**équilibre** entre les cinq grandes puissances (Russie, Autriche, Prusse, Royaume-Uni, France) et la **solidarité** des monarques contre les révolutions (Sainte-Alliance du 26 septembre 1815, Quadruple-Alliance du 20 novembre 1815).',
        },
        {
          type: 'p',
          text: 'Territorialement, la France est ramenée aux frontières de 1790 (2e traité de Paris en novembre 1815), la Prusse et la Russie sont agrandies, l’Autriche domine l’Italie du Nord, la Confédération germanique (39 États) maintient l’Allemagne divisée, la Belgique est donnée aux Pays-Bas pour contenir la France. On revient donc largement à l’**Ancien Régime politique**.',
        },
        {
          type: 'p',
          text: 'Mais l’ordre de Vienne a des **limites** : il ignore les aspirations des peuples (Polonais, Italiens, Allemands, Belges, Grecs) et les idées libérales. Les révolutions de 1820, 1830 puis 1848 le fragilisent (indépendance de la Belgique et de la Grèce, révolution de Juillet). Il assure toutefois une relative paix en Europe pendant près de quarante ans sans guerre généralisée (jusqu’à la guerre de Crimée, 1853-1856). La Révolution a donc changé le monde de manière irréversible : on ne peut revenir à l’Ancien Régime.',
        },
      ],
    },
    {
      id: 'ex-bac-1848',
      title: 'Type bac : 1848 en Europe, échec ou semence ?',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'composition'],
      statement: [
        { type: 'p', text: '**Sujet de composition.** « Le Printemps des peuples (1848-1849) : un échec ? »' },
        { type: 'p', text: 'Votre introduction doit comporter : accroche, définition des termes, problématique, annonce du plan. Proposez ensuite un plan détaillé en deux ou trois parties avec des exemples précis (dates, lieux, acteurs).' },
      ],
      hints: [
        'Un plan possible : I. Un mouvement de grande ampleur (causes, extension) ; II. Une contre-révolution victorieuse ; III. Des acquis durables.',
        'Citez au moins trois pays : France, Autriche/Hongrie, Italie, Allemagne.',
      ],
      solution: [
        {
          type: 'p',
          text: '**Introduction.** En février 1848, la monarchie de Juillet tombe à Paris ; en quelques semaines, l’agitation gagne Vienne, Berlin, Milan, Budapest, Francfort : c’est le « Printemps des peuples ». Cette vague révolutionnaire, portée par les idées libérales, nationales et sociales, vise à renverser l’ordre fixé à Vienne en 1815. Peut-on parler d’échec ? On montrera que, si les révolutions sont écrasées en 1849, elles laissent des acquis durables.',
        },
        {
          type: 'p',
          text: '**I. Un mouvement de grande ampleur (février-mai 1848).** Causes : crise économique de 1846-1847 (mauvaises récoltes), chômage, aspirations libérales de la bourgeoisie, aspirations nationales, question sociale. Extension : Paris (24 février, IIe République, suffrage universel masculin le 2 mars), Vienne (13 mars, chute de Metternich), Berlin (18 mars), Milan (18-22 mars), Hongrie (Kossuth), Parlement de Francfort (mai). Les souverains font des concessions (constitutions, abolition du servage en Autriche).',
        },
        {
          type: 'p',
          text: '**II. La victoire de la contre-révolution (1848-1849).** Divisions entre libéraux modérés et révolutionnaires sociaux (journées de juin à Paris, 22-26 juin) ; rivalités entre nationalités dans l’empire d’Autriche ; armées restées fidèles aux monarques (Windischgrätz à Prague en juin et Vienne en octobre ; Radetzky vainqueur à Novare le 23 mars 1849) ; intervention russe en Hongrie (août 1849) ; refus de la couronne impériale par Frédéric-Guillaume IV (avril 1849) ; Rome reprise par la France (juillet 1849). En France, Louis-Napoléon Bonaparte est élu président en décembre 1848.',
        },
        {
          type: 'p',
          text: '**III. Des acquis durables.** Suffrage universel masculin en France (maintenu sous le Second Empire), abolition de l’esclavage (27 avril 1848), abolition du servage dans l’Empire d’Autriche, constitutions libérales (Piémont, Prusse 1850), prise de conscience nationale : les unifications italienne et allemande seront réalisées par le Piémont et la Prusse dans les années 1860-1870. **Conclusion** : 1848 est un échec immédiat mais une étape décisive pour la démocratie et les nationalités.',
        },
      ],
    },
  ],

  representations: [
    { type: 'h2', text: 'Frise chronologique : 1789-1848' },
    {
      type: 'timeline',
      events: [
        { date: '5 mai 1789', title: 'Ouverture des États généraux' },
        { date: '14 juillet 1789', title: 'Prise de la Bastille' },
        { date: '26 août 1789', title: 'Déclaration des droits de l’homme et du citoyen' },
        { date: '3 septembre 1791', title: 'Constitution de la monarchie constitutionnelle' },
        { date: '20 avril 1792', title: 'Guerre contre l’Autriche' },
        { date: '10 août 1792', title: 'Prise des Tuileries' },
        { date: '21 septembre 1792', title: 'Abolition de la royauté' },
        { date: '21 janvier 1793', title: 'Exécution de Louis XVI' },
        { date: '5 septembre 1793', title: 'La Terreur « à l’ordre du jour »' },
        { date: '27 juillet 1794', title: 'Chute de Robespierre (9 thermidor an II)' },
        { date: '1795', title: 'Directoire (constitution de l’an III)' },
        { date: '9 novembre 1799', title: '18 brumaire : coup d’État de Bonaparte' },
        { date: '15 juillet 1801', title: 'Concordat' },
        { date: '21 mars 1804', title: 'Code civil' },
        { date: '2 décembre 1804', title: 'Sacre de Napoléon' },
        { date: '2 décembre 1805', title: 'Austerlitz' },
        { date: '21 novembre 1806', title: 'Blocus continental' },
        { date: '1812', title: 'Campagne de Russie' },
        { date: '6 avril 1814', title: 'Première abdication' },
        { date: '4 juin 1814', title: 'Charte constitutionnelle (Louis XVIII)' },
        { date: 'Sept. 1814 – juin 1815', title: 'Congrès de Vienne' },
        { date: '18 juin 1815', title: 'Waterloo' },
        { date: '27-29 juillet 1830', title: 'Trois Glorieuses' },
        { date: '1830', title: 'Indépendance de la Belgique' },
        { date: '24 février 1848', title: 'IIe République' },
        { date: '13 mars 1848', title: 'Chute de Metternich à Vienne' },
        { date: '27 avril 1848', title: 'Abolition définitive de l’esclavage en France' },
      ],
    },
    { type: 'h2', text: 'Ordonner les événements' },
    {
      type: 'ordering',
      title: 'Remettez dans l’ordre chronologique',
      items: [
        'Prise de la Bastille (14 juillet 1789)',
        'Fuite du roi à Varennes (juin 1791)',
        'Victoire de Valmy (20 septembre 1792)',
        'Exécution de Louis XVI (21 janvier 1793)',
        'Chute de Robespierre (27 juillet 1794)',
        'Coup d’État du 18 brumaire (9 novembre 1799)',
        'Code civil (21 mars 1804)',
        'Waterloo (18 juin 1815)',
        'Trois Glorieuses (juillet 1830)',
        'Chute de Metternich (13 mars 1848)',
      ],
    },
    {
      type: 'ordering',
      title: 'Les régimes politiques en France, dans l’ordre',
      items: [
        'Monarchie constitutionnelle',
        'Convention (Ire République)',
        'Directoire',
        'Consulat',
        'Premier Empire',
        'Restauration',
        'Monarchie de Juillet',
        'IIe République',
      ],
    },
    { type: 'h2', text: 'Associer' },
    {
      type: 'matching',
      title: 'Associez le personnage à son rôle',
      pairs: [
        { left: 'Sieyès', right: 'Auteur de « Qu’est-ce que le tiers état ? »' },
        { left: 'Olympe de Gouges', right: 'Auteure de la Déclaration des droits de la femme et de la citoyenne (1791)' },
        { left: 'Robespierre', right: 'Membre du Comité de salut public pendant la Terreur' },
        { left: 'Bonaparte', right: 'Général devenu Premier consul après le 18 brumaire' },
        { left: 'Metternich', right: 'Chancelier autrichien, inspirateur du congrès de Vienne' },
        { left: 'Talleyrand', right: 'Représentant de la France au congrès de Vienne' },
        { left: 'Louis-Philippe', right: 'Roi des Français après les Trois Glorieuses' },
        { left: 'Victor Schœlcher', right: 'Inspirateur du décret d’abolition définitive de l’esclavage (1848)' },
      ],
    },
    {
      type: 'matching',
      title: 'Associez la date à l’événement',
      pairs: [
        { left: '26 août 1789', right: 'Déclaration des droits de l’homme et du citoyen' },
        { left: '20 septembre 1792', right: 'Valmy' },
        { left: '9 thermidor an II', right: 'Chute de Robespierre' },
        { left: '2 décembre 1805', right: 'Austerlitz' },
        { left: '18 juin 1815', right: 'Waterloo' },
        { left: '9 juin 1815', right: 'Acte final du congrès de Vienne' },
        { left: '24 février 1848', right: 'Proclamation de la IIe République' },
        { left: '23 mars 1849', right: 'Novare' },
      ],
    },
    { type: 'h2', text: 'Flashcards : dates et notions' },
    {
      type: 'flashcards',
      cards: [
        { front: '5 mai 1789', back: 'Ouverture des États généraux à Versailles.' },
        { front: '17 juin 1789', back: 'Le tiers état se proclame Assemblée nationale.' },
        { front: '20 juin 1789', back: 'Serment du Jeu de paume.' },
        { front: '14 juillet 1789', back: 'Prise de la Bastille.' },
        { front: '4 août 1789', back: 'Abolition des privilèges.' },
        { front: '26 août 1789', back: 'Déclaration des droits de l’homme et du citoyen.' },
        { front: '12 juillet 1790', back: 'Constitution civile du clergé.' },
        { front: '20-21 juin 1791', back: 'Fuite du roi, arrêté à Varennes.' },
        { front: '3 septembre 1791', back: 'Constitution : monarchie constitutionnelle.' },
        { front: '21 septembre 1792', back: 'Abolition de la royauté ; le 22, début de l’an I de la République.' },
        { front: '21 janvier 1793', back: 'Exécution de Louis XVI.' },
        { front: '5 septembre 1793', back: 'La Terreur « à l’ordre du jour ».' },
        { front: '4 février 1794', back: 'Première abolition de l’esclavage dans les colonies françaises.' },
        { front: '27 juillet 1794 (9 thermidor an II)', back: 'Chute de Robespierre.' },
        { front: '9 novembre 1799 (18 brumaire an VIII)', back: 'Coup d’État de Bonaparte.' },
        { front: '15 juillet 1801', back: 'Concordat.' },
        { front: '21 mars 1804', back: 'Code civil.' },
        { front: '2 décembre 1804', back: 'Sacre de Napoléon.' },
        { front: '2 décembre 1805', back: 'Victoire d’Austerlitz.' },
        { front: '18 juin 1815', back: 'Défaite de Waterloo.' },
        { front: '27-29 juillet 1830', back: 'Trois Glorieuses : chute de Charles X.' },
        { front: '24 février 1848', back: 'Proclamation de la IIe République.' },
      ],
    },
    { type: 'h2', text: 'Schéma : l’Europe napoléonienne vers 1812' },
    {
      type: 'svg',
      caption: 'Schéma des cercles de domination napoléoniens (d’après la typologie classique : France, États vassaux, États alliés)',
      svg: `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<ellipse cx="320" cy="160" rx="300" ry="145" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5" stroke-dasharray="6 4"/>
<ellipse cx="320" cy="160" rx="210" ry="105" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
<ellipse cx="320" cy="160" rx="110" ry="55" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"/>
<text x="320" y="156" text-anchor="middle" fill="currentColor" font-weight="bold">Empire français</text>
<text x="320" y="173" text-anchor="middle" fill="currentColor">130 départements (1811)</text>
<text x="320" y="85" text-anchor="middle" fill="currentColor" font-weight="bold">États vassaux</text>
<text x="320" y="102" text-anchor="middle" fill="currentColor">Espagne, Naples, Westphalie, Italie, Hollande,</text>
<text x="320" y="118" text-anchor="middle" fill="currentColor">Confédération du Rhin, Grand-Duché de Varsovie</text>
<text x="320" y="32" text-anchor="middle" fill="currentColor" font-weight="bold">États alliés ou soumis</text>
<text x="320" y="48" text-anchor="middle" fill="currentColor">Autriche, Prusse, Danemark, Suède (puis Bernadotte)</text>
<text x="320" y="300" text-anchor="middle" fill="currentColor" opacity="0.8">Hors du système : Royaume-Uni (Blocus continental), Russie (rupture en 1810-1812)</text>
</svg>`,
    },
    { type: 'h2', text: 'Vrai ou faux ?' },
    {
      type: 'truefalse',
      title: 'Testez vos connaissances',
      statements: [
        { text: 'La monarchie est abolie en France le 14 juillet 1789.', answer: false, explanation: 'La royauté est abolie le 21 septembre 1792, après la prise des Tuileries (10 août).' },
        { text: 'La Constitution de 1791 instaure une monarchie constitutionnelle.', answer: true },
        { text: 'Le Code civil de 1804 reconnaît l’égalité entre les hommes et les femmes.', answer: false, explanation: 'Il fait de la femme mariée une incapable juridique.' },
        { text: 'Le congrès de Vienne a pour principes la légitimité, l’équilibre et la solidarité des souverains.', answer: true },
        { text: 'La Belgique obtient son indépendance en 1830.', answer: true },
        { text: 'Charles X abdique après la révolution de février 1848.', answer: false, explanation: 'Charles X est renversé en juillet 1830 ; c’est Louis-Philippe qui tombe en février 1848.' },
        { text: 'Le suffrage universel masculin est instauré en France en 1848.', answer: true, explanation: 'Décret du 2 mars 1848 ; il avait été brièvement appliqué en 1792 pour la Convention.' },
        { text: 'Le Parlement de Francfort réussit à unifier l’Allemagne en 1849.', answer: false, explanation: 'Le roi de Prusse refuse la couronne impériale en avril 1849.' },
      ],
    },
    { type: 'h2', text: 'QCM' },
    {
      type: 'qcm',
      questions: [
        { question: 'Quelle bataille de 1792 sauve la Révolution française de l’invasion prussienne ?', choices: ['Valmy', 'Fleurus', 'Austerlitz', 'Wagram'], answer: 0, explanation: 'Valmy, 20 septembre 1792.' },
        { question: 'Quel texte instaure la monarchie constitutionnelle en France ?', choices: ['Constitution de 1791', 'Constitution de l’an III', 'Constitution de l’an VIII', 'Charte de 1814'], answer: 0 },
        { question: 'Qu’est-ce que la loi des suspects (17 septembre 1793) ?', choices: ['Une loi autorisant l’arrestation des personnes jugées hostiles à la Révolution', 'Une loi fixant les prix', 'Une loi abolissant l’esclavage', 'Une loi organisant le culte'], answer: 0 },
        { question: 'Le Concordat de 1801 est signé avec :', choices: ['Le pape Pie VII', 'Le tsar Alexandre Ier', 'Louis XVIII', 'Le roi d’Angleterre'], answer: 0 },
        { question: 'Que désigne le Blocus continental ?', choices: ['L’interdiction faite aux ports européens de commercer avec le Royaume-Uni', 'Le blocus de l’Espagne', 'Le siège de Moscou', 'L’interdiction des journaux'], answer: 0 },
        { question: 'Qui préside le congrès de Vienne comme principal inspirateur ?', choices: ['Metternich', 'Talleyrand', 'Bismarck', 'Cavour'], answer: 0 },
        { question: 'Quelle révolution conduit à l’indépendance de la Belgique ?', choices: ['Celle de 1830', 'Celle de 1848', 'Celle de 1789', 'Celle de 1820'], answer: 0 },
        { question: 'Qui est élu président de la IIe République en décembre 1848 ?', choices: ['Louis-Napoléon Bonaparte', 'Cavaignac', 'Lamartine', 'Ledru-Rollin'], answer: 0 },
        { question: 'Quel est le principal résultat de la bataille de Waterloo (18 juin 1815) ?', choices: ['Défaite définitive de Napoléon', 'Victoire de Napoléon', 'Fin de la Terreur', 'Début du Blocus continental'], answer: 0 },
        { question: 'Quel mot désigne le droit de vote soumis à un impôt minimal ?', choices: ['Suffrage censitaire', 'Suffrage universel', 'Plébiscite', 'Référendum'], answer: 0 },
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Complétez',
      text: 'Le {{14 juillet 1789}} les Parisiens prennent la {{Bastille}}. La nuit du {{4 août}}, l’Assemblée abolit les {{privilèges}}. Le {{21 janvier 1793}}, {{Louis XVI}} est guillotiné. En 1804, Napoléon promulgue le {{Code civil}}. Le {{congrès de Vienne|congrès de Vienne}} se réunit de 1814 à 1815 sous l’influence de {{Metternich}}. En {{1848}}, la IIe République établit le suffrage {{universel}} masculin.',
    },
    {
      type: 'reveal',
      title: 'Synthèse à retenir (cliquer pour afficher)',
      content: [
        {
          type: 'list',
          items: [
            '1789-1792 : fin de l’Ancien Régime et monarchie constitutionnelle.',
            '1792-1799 : République, Terreur (1793-1794), Directoire.',
            '1799-1815 : Bonaparte, Napoléon ; « masses de granit » ; Europe napoléonienne.',
            '1815-1848 : ordre de Vienne ; révolutions libérales et nationales ; 1848, Printemps des peuples.',
          ],
        },
      ],
    },
  ],
}

export default chapter
