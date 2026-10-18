import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'france-nationalites',
  subject: 'histoire-geo',
  order: 2,
  title: 'La France dans l’Europe des nationalités (1848-1871)',
  theme: 'Histoire — Thème 2',
  summary:
    'De la IIe République à la Commune : le Second Empire, entre autoritarisme et libéralisation, l’industrialisation de la société française, et les unités italienne et allemande qui bouleversent l’équilibre européen.',
  duration: '4 semaines',
  objectives: [
    'Caractériser la vie politique française de 1848 à 1871 : IIe République, Second Empire autoritaire puis libéral, guerre de 1870, Commune.',
    'Décrire les transformations économiques et sociales du Second Empire (chemin de fer, banques, urbanisation, mondes ouvriers et paysans).',
    'Expliquer comment s’est réalisée l’unité italienne, puis l’unité allemande, et le rôle de la France dans ces processus.',
    'Montrer les conséquences de ces unifications sur l’équilibre européen et sur la France (perte de l’Alsace-Moselle).',
    'Utiliser des repères chronologiques précis et analyser un document (discours, caricature, carte).',
  ],
  keywords: [
    'IIe République',
    'Second Empire',
    'plébiscite',
    'Napoléon III',
    'libéralisation',
    'industrialisation',
    'Haussmann',
    'unité italienne',
    'unité allemande',
    'Bismarck',
    'Cavour',
    'Commune de Paris',
    'traité de Francfort',
  ],

  fiche: [
    { type: 'h2', text: 'L’essentiel du thème 2' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problématique',
      content: [
        {
          type: 'p',
          text: 'Entre 1848 et 1871, la France passe de la **république** à l’**empire**, puis à la **République**. Napoléon III, qui a favorisé l’essor économique et soutenu le principe des nationalités, voit se constituer à ses frontières deux grandes puissances (Italie et Allemagne). La guerre de 1870 le renverse, fait perdre l’Alsace-Moselle à la France et consacre l’Empire allemand.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['24 février 1848', 'Proclamation de la IIe République'],
        ['10 décembre 1848', 'Louis-Napoléon Bonaparte élu président (suffrage universel masculin)'],
        ['2 décembre 1851', 'Coup d’État de Louis-Napoléon Bonaparte'],
        ['2 décembre 1852', 'Proclamation du Second Empire ; Napoléon III'],
        ['1853-1870', 'Transformation de Paris par Haussmann'],
        ['1859', 'Campagne d’Italie (Magenta, Solférino)'],
        ['1860', 'Traité de libre-échange avec le Royaume-Uni ; annexion de Nice et de la Savoie ; libéralisation du régime'],
        ['17 mars 1861', 'Proclamation du royaume d’Italie'],
        ['3 juillet 1866', 'Sadowa : victoire de la Prusse sur l’Autriche'],
        ['19 juillet 1870', 'Déclaration de guerre de la France à la Prusse'],
        ['2 septembre 1870', 'Sedan : capitulation de Napoléon III'],
        ['4 septembre 1870', 'Proclamation de la République (IIIe)'],
        ['18 janvier 1871', 'Proclamation de l’Empire allemand à Versailles'],
        ['18 mars – 28 mai 1871', 'Commune de Paris'],
        ['10 mai 1871', 'Traité de Francfort : perte de l’Alsace et d’une partie de la Lorraine'],
      ],
    },
    { type: 'h3', text: 'Les deux unités en bref' },
    {
      type: 'table',
      headers: ['', 'Italie', 'Allemagne'],
      rows: [
        ['Moteur', 'Royaume de Piémont-Sardaigne (Victor-Emmanuel II, Cavour)', 'Royaume de Prusse (Guillaume Ier, Bismarck)'],
        ['Adversaire principal', 'Autriche', 'Danemark (1864), Autriche (1866), France (1870)'],
        ['Moyens', 'Diplomatie, alliance française, guerre (1859), Garibaldi (1860)', '« Fer et sang » : trois guerres, diplomatie, Zollverein'],
        ['Achèvement', 'Royaume proclamé le 17 mars 1861 ; Vénétie 1866 ; Rome 1870', 'Empire proclamé le 18 janvier 1871'],
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Principe des nationalités', value: 'Droit de chaque peuple à constituer une nation indépendante.' },
        { key: 'Plébiscite', value: 'Vote par oui ou non sur une question de confiance au chef de l’État (rien à voir avec un référendum libre).' },
        { key: 'Bonapartisme', value: 'Régime fondé sur le suffrage universel, l’autorité d’un chef, l’ordre et la prospérité.' },
        { key: 'Libre-échange', value: 'Suppression ou réduction des droits de douane (traité Cobden-Chevalier, 1860).' },
        { key: 'Commune de Paris', value: 'Gouvernement insurrectionnel de Paris (18 mars – 28 mai 1871) en opposition à l’Assemblée de Versailles.' },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'Au milieu du XIXe siècle, l’Europe est marquée par l’affirmation du **principe des nationalités**. La France, qui a connu la révolution de 1848, entre dans une période de transformations profondes : un régime autoritaire, le Second Empire, y accompagne la révolution industrielle. Dans le même temps, deux États-nations naissent aux portes de la France : l’Italie et l’Allemagne. Comment la France de Napoléon III se transforme-t-elle politiquement et économiquement, et comment l’unité de l’Italie et de l’Allemagne remodèle-t-elle l’Europe ?',
    },

    { type: 'h2', text: 'I. De la IIe République au Second Empire (1848-1852)' },
    {
      type: 'p',
      text: 'La IIe République, proclamée le **24 février 1848**, établit le suffrage universel masculin (2 mars) et abolit l’esclavage (27 avril). Après la répression des journées de juin 1848 et l’adoption d’une constitution présidentielle (novembre 1848), le **10 décembre 1848**, le neveu de Napoléon Ier, **Louis-Napoléon Bonaparte**, est élu président de la République avec environ 74 % des voix grâce au prestige de son nom et à la peur des désordres. Il s’appuie sur le « parti de l’Ordre » (conservateurs) : loi Falloux (15 mars 1850) qui favorise l’enseignement catholique, loi du 31 mai 1850 qui restreint le suffrage universel (environ 3 millions d’électeurs exclus).',
    },
    {
      type: 'p',
      text: 'Comme la Constitution lui interdit de se représenter en 1852, il réalise un **coup d’État le 2 décembre 1851** : dissolution de l’Assemblée, arrestation des opposants, rétablissement du suffrage universel, répression de la résistance républicaine. Un **plébiscite** (20-21 décembre 1851) approuve le coup d’État à plus de 7 millions de voix. Une nouvelle constitution (janvier 1852) donne au président dix ans de mandat. Après un voyage dans le Midi et le discours de Bordeaux (9 octobre 1852, « L’Empire, c’est la paix »), un nouveau plébiscite (21-22 novembre 1852) rétablit l’Empire : le **2 décembre 1852**, Louis-Napoléon devient **Napoléon III**, empereur des Français.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Pourquoi Napoléon III ?',
      content: [
        { type: 'p', text: 'Napoléon Ier avait un fils, Napoléon II (le « roi de Rome »), qui n’a jamais régné : Louis-Napoléon choisit donc « III » pour s’inscrire dans la dynastie.' },
      ],
    },

    { type: 'h2', text: 'II. Le Second Empire : un régime politique en évolution (1852-1870)' },
    { type: 'h3', text: 'A. L’Empire autoritaire (1852-1860)' },
    {
      type: 'svg',
      caption: 'Les institutions du Second Empire autoritaire (constitution de 1852)',
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="220" y="10" width="200" height="50" fill="none" stroke="hsl(263 70% 60%)" stroke-width="2"/>
<text x="320" y="32" text-anchor="middle" fill="currentColor" font-weight="bold">Empereur Napoléon III</text>
<text x="320" y="49" text-anchor="middle" fill="currentColor">Exécutif, initiative des lois</text>
<line x1="320" y1="60" x2="320" y2="90" stroke="currentColor"/>
<line x1="100" y1="90" x2="540" y2="90" stroke="currentColor"/>
<line x1="100" y1="90" x2="100" y2="110" stroke="currentColor"/>
<line x1="320" y1="90" x2="320" y2="110" stroke="currentColor"/>
<line x1="540" y1="90" x2="540" y2="110" stroke="currentColor"/>
<rect x="20" y="110" width="160" height="70" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="100" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Conseil d’État</text>
<text x="100" y="150" text-anchor="middle" fill="currentColor">Rédige les lois</text>
<text x="100" y="166" text-anchor="middle" fill="currentColor">(membres nommés)</text>
<rect x="240" y="110" width="160" height="70" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="320" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Sénat</text>
<text x="320" y="150" text-anchor="middle" fill="currentColor">Gardien de la Constitution</text>
<text x="320" y="166" text-anchor="middle" fill="currentColor">(membres nommés)</text>
<rect x="460" y="110" width="160" height="70" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
<text x="540" y="132" text-anchor="middle" fill="currentColor" font-weight="bold">Corps législatif</text>
<text x="540" y="150" text-anchor="middle" fill="currentColor">Vote lois et impôts</text>
<text x="540" y="166" text-anchor="middle" fill="currentColor">(élu, candidatures officielles)</text>
<line x1="540" y1="180" x2="540" y2="215" stroke="currentColor"/>
<rect x="400" y="215" width="220" height="50" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
<text x="510" y="236" text-anchor="middle" fill="currentColor" font-weight="bold">Suffrage universel masculin</text>
<text x="510" y="253" text-anchor="middle" fill="currentColor">Plébiscites, pression des préfets</text>
<text x="160" y="250" text-anchor="middle" fill="currentColor" opacity="0.8">Presse contrôlée, police, opposants</text>
<text x="160" y="266" text-anchor="middle" fill="currentColor" opacity="0.8">exilés (Hugo) ou emprisonnés</text>
</svg>`,
    },
    {
      type: 'p',
      text: 'La constitution de janvier 1852 donne à l’empereur l’essentiel du pouvoir : c’est lui qui nomme les ministres, qui a seul l’initiative des lois, qui commande l’armée. Le **Corps législatif**, élu au suffrage universel masculin, vote les lois et le budget mais ne les propose pas ; les candidats officiels sont soutenus par l’administration. Le Sénat est nommé. La presse, les réunions publiques, les syndicats sont strictement contrôlés ; les opposants (Victor Hugo, qui publie *Napoléon le Petit* en 1852) sont exilés. Le régime se prétend légitimé par le **plébiscite**.',
    },
    { type: 'h3', text: 'B. L’Empire libéral (1860-1870)' },
    {
      type: 'p',
      text: 'À partir de 1860, Napoléon III desserre progressivement l’étau : en **1860**, le Corps législatif obtient un droit d’adresse puis le droit d’interpellation (1867) ; la **liberté de la presse** est élargie (loi de 1868) ainsi que le **droit de réunion** (1868) ; le **droit de grève** est reconnu par la loi du 25 mai 1864 (loi Ollivier) ; la **loi Duruy** (1867) rend obligatoire l’ouverture d’une école de filles dans les communes de plus de 500 habitants. Les républicains progressent aux élections de 1863 et 1869. En **janvier 1870**, Émile Ollivier forme un gouvernement qui répond devant le Corps législatif : c’est l’**Empire parlementaire** ; le plébiscite du 8 mai 1870 (7,3 millions de oui contre 1,5 million de non) approuve ces réformes. Mais le régime se fragilise par ses échecs extérieurs (expédition du Mexique, 1861-1867, désastreuse).',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Les deux Empires de Napoléon III',
      content: [
        {
          type: 'table',
          headers: ['', 'Empire autoritaire', 'Empire libéral'],
          rows: [
            ['Dates', '1852-1860', '1860-1870'],
            ['Pouvoirs', 'Empereur dominant, Corps législatif sans initiative', 'Pouvoirs élargis du Corps législatif ; ministère responsable (1870)'],
            ['Libertés', 'Presse et réunion muselées', 'Presse, réunion, grève'],
            ['Légitimité', 'Plébiscites, suffrage universel', 'Plébiscite de 1870, opposition républicaine en progrès'],
          ],
        },
      ],
    },
    { type: 'h3', text: 'C. La politique extérieure : prestige et revers' },
    {
      type: 'list',
      items: [
        '**Guerre de Crimée** (1853-1856) avec le Royaume-Uni contre la Russie ; congrès de Paris (1856) : la France retrouve un rôle de premier plan.',
        '**Campagne d’Italie** (1859) au côté du Piémont ; **annexion de Nice et de la Savoie** (traité de Turin, 24 mars 1860, confirmé par plébiscite).',
        '**Expansion coloniale** : Algérie, Sénégal (Faidherbe), Cochinchine (1862), Cambodge (1863), canal de Suez (inauguré en 1869 par Ferdinand de Lesseps).',
        '**Intervention au Mexique** (1861-1867) pour installer l’empereur Maximilien : échec coûteux.',
        'La France peine à s’opposer à la montée de la Prusse (neutralité en 1866).',
      ],
    },

    { type: 'h2', text: 'III. Industrialisation et société sous le Second Empire' },
    { type: 'h3', text: 'A. Une croissance industrielle soutenue par l’État' },
    {
      type: 'p',
      text: 'La France entre pleinement dans la **révolution industrielle**. Le réseau ferré passe d’environ 3 600 km en 1851 à près de 18 000 km en 1870. La production de charbon, de fonte et d’acier croît fortement. Le régime encourage les banques d’investissement : **Crédit mobilier** (frères Pereire, 1852), **Crédit lyonnais** (1863), **Société générale** (1864). Le **traité de libre-échange franco-britannique** (Cobden-Chevalier, 23 janvier 1860) stimule la concurrence. Les **expositions universelles** (1855 et 1867 à Paris) montrent la puissance de l’industrie française. Les grands magasins (Bon Marché, 1852) se développent.',
    },
    { type: 'h3', text: 'B. La transformation de Paris et de l’espace urbain' },
    {
      type: 'p',
      text: 'Le préfet de la Seine **Georges Eugène Haussmann** (1853-1870) transforme Paris : percement de larges boulevards (pour l’hygiène, la circulation et aussi le contrôle de l’ordre), adduction d’eau, égouts, parcs (bois de Boulogne et de Vincennes), gares, Opéra Garnier (commencé en 1861). Les quartiers populaires du centre sont détruits et leurs habitants repoussés vers la périphérie. Marseille, Lyon et d’autres villes connaissent aussi des transformations.',
    },
    { type: 'h3', text: 'C. Une société en mutation' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Les paysans', text: 'Ils restent majoritaires (environ les deux tiers de la population). Progrès agricoles (engrais, machines), mais exode rural croissant.', icon: 'Wheat' },
        { title: 'Les ouvriers', text: 'Conditions dures (journées de 12 à 14 heures), salaires faibles. Droit de grève en 1864, première Internationale (Londres, 1864), naissance d’un mouvement ouvrier.', icon: 'Factory' },
        { title: 'La bourgeoisie', text: 'Elle s’enrichit par l’industrie, le négoce, la finance. Elle impose son mode de vie : cercle, loisirs, éducation.', icon: 'Briefcase' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'À ne pas confondre',
      content: [
        {
          type: 'p',
          text: 'La France du Second Empire reste majoritairement **rurale** (la population urbaine devient majoritaire seulement en 1931) même si l’industrialisation et l’urbanisation progressent rapidement. Elle est en retard sur le Royaume-Uni mais rattrape l’Allemagne avant 1870.',
        },
      ],
    },

    { type: 'h2', text: 'IV. L’unité italienne (1848-1871)' },
    {
      type: 'p',
      text: 'En 1848, l’Italie est un « simple nom géographique » (Metternich) : elle est morcelée en plusieurs États (royaume de Piémont-Sardaigne, royaume des Deux-Siciles, États pontificaux, duchés), et la Lombardie-Vénétie est autrichienne. Le mouvement national, le **Risorgimento** (« résurrection »), s’appuie sur le romantisme et des figures comme **Mazzini** (républicain) et **Garibaldi** (patriote). Après l’échec de 1848-1849 (défaite de Charles-Albert à Novare, 23 mars 1849), c’est le royaume de **Piémont-Sardaigne**, avec le roi **Victor-Emmanuel II** et son Premier ministre **Cavour** (à partir de 1852), qui prend la tête du mouvement.',
    },
    {
      type: 'timeline',
      events: [
        { date: 'Juillet 1858', title: 'Entrevue de Plombières', text: 'Napoléon III promet son aide militaire à Cavour contre l’Autriche en échange de Nice et de la Savoie.' },
        { date: '1859', title: 'Guerre contre l’Autriche', text: 'Victoires franco-piémontaises de Magenta (4 juin) et Solférino (24 juin).' },
        { date: '11 juillet 1859', title: 'Armistice de Villafranca', text: 'Napoléon III traite seul avec l’Autriche ; le Piémont obtient la Lombardie.' },
        { date: '1860', title: 'Annexions de l’Italie centrale', text: 'Toscane, Émilie par plébiscites ; Nice et la Savoie à la France (24 mars 1860).' },
        { date: 'Mai 1860', title: 'Expédition des Mille', text: 'Garibaldi débarque à Marsala (11 mai), conquiert la Sicile puis Naples, et remet ses conquêtes à Victor-Emmanuel II (rencontre de Teano, 26 octobre 1860).' },
        { date: '17 mars 1861', title: 'Royaume d’Italie', text: 'Victor-Emmanuel II est proclamé roi d’Italie ; Turin capitale. Cavour meurt le 6 juin 1861.' },
        { date: '1866', title: 'Vénétie', text: 'Alliée à la Prusse contre l’Autriche, l’Italie obtient la Vénétie.' },
        { date: '20 septembre 1870', title: 'Prise de Rome', text: 'Après le retrait des troupes françaises (guerre franco-prussienne), les troupes italiennes entrent à Rome ; elle devient capitale en 1871.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lecture critique',
      content: [
        {
          type: 'p',
          text: 'L’unité italienne se fait en réalité « par le haut » (diplomatie, armée piémontaise, alliance française) davantage que par un soulèvement populaire. Elle laisse de forts déséquilibres (Nord/Sud) et des revendications non satisfaites (**Trentin, Trieste**, « terres irrédentes »), lourdes de conséquences jusqu’en 1914-1918.',
        },
      ],
    },

    { type: 'h2', text: 'V. L’unité allemande (1848-1871)' },
    {
      type: 'p',
      text: 'Depuis 1815, les États allemands forment la **Confédération germanique** (39 États) dominée par l’Autriche. Le **Zollverein** (union douanière, 1834), dirigée par la Prusse, unifie le marché économique. L’échec du Parlement de Francfort en 1849 laisse en suspens la question : unification par le bas ou par la force ? En 1862, le roi de Prusse Guillaume Ier nomme **Otto von Bismarck** ministre-président. Dans un discours au Landtag (30 septembre 1862), celui-ci affirme que les grandes questions se résoudront « par le fer et le sang » et non par des discours et des votes de majorité.',
    },
    {
      type: 'steps',
      items: [
        { title: '1864 : guerre des Duchés', text: 'La Prusse et l’Autriche battent le Danemark et s’emparent du Schleswig et du Holstein.' },
        { title: '1866 : guerre austro-prussienne', text: 'Bismarck isole l’Autriche (neutralité de la France, alliance avec l’Italie), puis l’écrase à **Sadowa** (3 juillet 1866). Paix de Prague (23 août 1866) : dissolution de la Confédération germanique ; création de la **Confédération de l’Allemagne du Nord** (1867) sous la direction de la Prusse. L’Autriche, écartée de l’Allemagne, devient en 1867 l’Autriche-Hongrie (compromis austro-hongrois).' },
        { title: '1870 : la guerre contre la France', text: 'Prétexte : la candidature d’un prince Hohenzollern au trône d’Espagne. Bismarck publie la **dépêche d’Ems** (13 juillet 1870), version abrégée et provocatrice d’un télégramme du roi. La France déclare la guerre le 19 juillet 1870. Les États du Sud rejoignent la Prusse.' },
        { title: '18 janvier 1871 : l’Empire allemand', text: 'Guillaume Ier est proclamé empereur allemand dans la galerie des Glaces du château de Versailles, avant même la fin de la guerre. Bismarck est chancelier.' },
      ],
    },
    {
      type: 'svg',
      caption: 'Les étapes de l’unification allemande (schéma)',
      svg: `<svg viewBox="0 0 700 150" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<g fill="none" stroke-width="1.5">
<rect x="5" y="30" width="125" height="70" stroke="currentColor"/>
<rect x="150" y="30" width="125" height="70" stroke="hsl(217 91% 60%)"/>
<rect x="295" y="30" width="125" height="70" stroke="hsl(25 95% 53%)"/>
<rect x="440" y="30" width="125" height="70" stroke="hsl(0 84% 60%)"/>
<rect x="585" y="30" width="110" height="70" stroke="hsl(142 71% 45%)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="67" y="55" font-weight="bold">1834</text><text x="67" y="72">Zollverein</text><text x="67" y="88">(union douanière)</text>
<text x="212" y="55" font-weight="bold">1862</text><text x="212" y="72">Bismarck</text><text x="212" y="88">ministre-président</text>
<text x="357" y="55" font-weight="bold">1864</text><text x="357" y="72">Guerre des Duchés</text><text x="357" y="88">(Danemark)</text>
<text x="502" y="55" font-weight="bold">1866</text><text x="502" y="72">Sadowa</text><text x="502" y="88">(Autriche vaincue)</text>
<text x="640" y="55" font-weight="bold">1870-71</text><text x="640" y="72">Guerre contre la</text><text x="640" y="88">France ; Empire</text>
</g>
<g stroke="currentColor"><line x1="130" y1="65" x2="150" y2="65"/><line x1="275" y1="65" x2="295" y2="65"/><line x1="420" y1="65" x2="440" y2="65"/><line x1="565" y1="65" x2="585" y2="65"/></g>
</svg>`,
    },

    { type: 'h2', text: 'VI. La guerre de 1870, la fin du Second Empire et la Commune' },
    {
      type: 'p',
      text: 'La France entre en guerre le **19 juillet 1870** mal préparée. Les armées prussiennes et alliées remportent des victoires rapides (Wissembourg, Frœschwiller, Gravelotte). Le **2 septembre 1870**, Napoléon III capitule à **Sedan** avec environ 80 000 hommes. Le **4 septembre**, à Paris, la foule envahit le Corps législatif, la déchéance de l’empereur est prononcée et la **République** est proclamée à l’Hôtel de ville. Un **Gouvernement de la Défense nationale** (Trochu, Jules Favre, Gambetta) poursuit la guerre. Paris est assiégé du 19 septembre 1870 au 28 janvier 1871 ; Gambetta quitte Paris en ballon (7 octobre) pour organiser la résistance en province. Le **28 janvier 1871**, un armistice est signé.',
    },
    {
      type: 'p',
      text: 'Les élections du **8 février 1871** envoient à l’Assemblée nationale une majorité de monarchistes favorables à la paix. **Adolphe Thiers** devient chef du pouvoir exécutif (17 février). Les préliminaires de paix sont signés le 26 février ; le **traité de Francfort** (10 mai 1871) cède à l’Allemagne l’**Alsace** (sauf Belfort) et une partie de la **Lorraine** (Moselle), et impose une indemnité de **cinq milliards de francs** (avec occupation jusqu’à son paiement : en 1873).',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'La Commune de Paris (18 mars – 28 mai 1871)',
      content: [
        {
          type: 'p',
          text: 'Les Parisiens, qui ont subi le siège, sont méfiants envers l’Assemblée monarchiste et envers Thiers. Le **18 mars 1871**, la tentative de l’armée pour reprendre les canons de la Garde nationale (Montmartre) provoque une insurrection. Le gouvernement se replie à Versailles. Le **26 mars**, élection du **Conseil de la Commune**. Elle prend des mesures sociales et politiques : séparation de l’Église et de l’État, école gratuite et laïque, remise des loyers, travail de nuit interdit dans les boulangeries, drapeau rouge. Mais, isolée (les communes de province sont rapidement vaincues), elle est écrasée par l’armée versaillaise lors de la **Semaine sanglante** (21-28 mai 1871) : plusieurs milliers de morts (au moins 10 000, souvent estimé à 20 000), des dizaines de milliers d’arrestations, des milliers de déportés (Nouvelle-Calédonie).',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan 1871',
      content: [
        {
          type: 'list',
          items: [
            'La France est vaincue, amputée, mais la **République** s’installe (elle ne s’imposera définitivement qu’en 1875-1879).',
            'L’Allemagne devient la première puissance du continent : **l’équilibre européen est bouleversé** ; la France isolée rêve de revanche.',
            'La question de l’**Alsace-Lorraine** empoisonnera les relations franco-allemandes jusqu’en 1914 (et au-delà).',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : le commentaire d’un discours',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Identifier', text: 'Qui parle ? À qui ? Où et quand ? Dans quelles circonstances ?' },
            { title: 'Repérer les idées', text: 'Thèse de l’auteur, arguments, vocabulaire marquant.' },
            { title: 'Critiquer', text: 'Intentions, public visé, part de propagande ; ce que le discours ne dit pas.' },
            { title: 'Contextualiser', text: 'Replacer le document dans ses suites : qu’en est-il advenu ?' },
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex-chrono-nationalites',
      title: 'Repères : unités italienne et allemande',
      difficulty: 1,
      duration: 10,
      tags: ['repères'],
      statement: [
        {
          type: 'p',
          text: 'Associez chaque date à son événement : 1834, 1859, 17 mars 1861, 3 juillet 1866, 20 septembre 1870, 18 janvier 1871. Événements : Zollverein ; Sadowa ; proclamation de l’Empire allemand ; Magenta et Solférino ; prise de Rome ; proclamation du royaume d’Italie.',
        },
      ],
      solution: [
        {
          type: 'list',
          items: [
            '1834 : création du Zollverein.',
            '1859 : Magenta et Solférino.',
            '17 mars 1861 : royaume d’Italie.',
            '3 juillet 1866 : Sadowa.',
            '20 septembre 1870 : prise de Rome par les Italiens.',
            '18 janvier 1871 : proclamation de l’Empire allemand à Versailles.',
          ],
        },
      ],
    },
    {
      id: 'ex-plebiscite',
      title: 'Le plébiscite et le suffrage universel',
      difficulty: 2,
      duration: 20,
      tags: ['notions', 'document'],
      statement: [
        {
          type: 'p',
          text: 'Les résultats suivants sont ceux des plébiscites de Napoléon III : décembre 1851 (≈ 7,4 millions de oui, 0,6 million de non) ; novembre 1852 (≈ 7,8 millions de oui, 0,25 million de non) ; mai 1870 (≈ 7,3 millions de oui, 1,5 million de non).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Définissez « plébiscite ». En quoi diffère-t-il d’un référendum démocratique ?',
            'Montrez que le régime repose sur le suffrage universel mais n’est pas démocratique.',
            'Que montre l’évolution des résultats entre 1851-1852 et 1870 ?',
          ],
        },
      ],
      hints: ['Qui pose la question ? Y a-t-il une opposition libre ?'],
      solution: [
        { type: 'p', text: '**1.** Un plébiscite est un vote par oui ou non par lequel le peuple approuve une décision ou la personne du chef de l’État. Il n’y a pas de débat contradictoire libre, la question est posée par le pouvoir (parfois liée à sa personne), et le gouvernement fait pression sur les électeurs (préfets, maires) : ce n’est pas un référendum démocratique.' },
        { type: 'p', text: '**2.** Le régime utilise le suffrage universel masculin (rétabli en décembre 1851) comme source de légitimité, mais les libertés (presse, réunion, association) sont limitées, les candidats officiels sont soutenus par l’administration, le Corps législatif n’a pas l’initiative des lois : le pouvoir est concentré dans les mains de l’empereur.' },
        { type: 'p', text: '**3.** Le nombre de non augmente nettement (de 0,25 million en 1852 à 1,5 million en 1870), signe d’une opposition républicaine plus forte et d’une libéralisation du régime, même si le plébiscite de 1870 reste une victoire pour Napoléon III.' },
      ],
    },
    {
      id: 'ex-second-empire-bilan',
      title: 'Second Empire : une croissance sans démocratie ?',
      difficulty: 2,
      duration: 25,
      tags: ['rédaction'],
      statement: [
        { type: 'p', text: 'Rédigez un développement structuré (une vingtaine de lignes) pour répondre à la question : **« Quels sont les aspects économiques et sociaux du Second Empire ? »** Vous mentionnerez au moins deux transformations économiques, une transformation urbaine et deux évolutions sociales.' },
      ],
      hints: ['Chemin de fer, banques, libre-échange, Haussmann, ouvriers, paysans, droit de grève.'],
      solution: [
        { type: 'p', text: 'Le Second Empire est marqué par une **croissance économique rapide**, soutenue par l’État. Le réseau ferroviaire passe d’environ 3 600 km en 1851 à près de 18 000 km en 1870, ce qui unifie le marché national. Des banques d’investissement (Crédit mobilier, 1852 ; Crédit lyonnais, 1863) financent l’industrie. Le traité de libre-échange avec le Royaume-Uni (Cobden-Chevalier, 1860) stimule la modernisation. Les expositions universelles (1855, 1867) célèbrent ce progrès.' },
        { type: 'p', text: 'L’**urbanisation** s’accélère : Haussmann, préfet de la Seine de 1853 à 1870, transforme Paris (boulevards, égouts, parcs, gares), ce qui améliore l’hygiène et la circulation mais refoule les classes populaires vers la périphérie.' },
        { type: 'p', text: 'Sur le plan **social**, la bourgeoisie s’enrichit tandis que la condition ouvrière demeure difficile (longues journées, bas salaires). Toutefois, les ouvriers obtiennent le droit de grève (1864) et s’organisent (Internationale, 1864). Le monde rural reste majoritaire mais connaît un exode rural croissant. La croissance est donc réelle, mais ses bénéfices sont inégalement partagés.' },
      ],
    },
    {
      id: 'ex-bismarck',
      title: 'Document : « le fer et le sang »',
      difficulty: 2,
      duration: 25,
      tags: ['document', 'Allemagne'],
      statement: [
        {
          type: 'quote',
          text: 'Les grandes questions de l’époque ne se résoudront pas par des discours et des décisions de majorité – c’est là la grande erreur de 1848 et 1849 – mais par le fer et le sang.',
          author: 'Otto von Bismarck',
          source: 'Discours devant la commission du budget de la Chambre prussienne, 30 septembre 1862',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Présentez l’auteur et le contexte du discours.',
            'À quelle « erreur de 1848 et 1849 » Bismarck fait-il allusion ?',
            'Montrez, à l’aide de trois événements, que la politique de Bismarck a bien suivi ces principes.',
          ],
        },
      ],
      hints: ['Parlement de Francfort ; guerres de 1864, 1866, 1870.'],
      solution: [
        { type: 'p', text: '**1.** Otto von Bismarck est depuis septembre 1862 ministre-président de Prusse, nommé par le roi Guillaume Ier en pleine crise avec le Parlement qui refuse d’augmenter le budget militaire. Il s’adresse à des députés pour justifier une politique de renforcement de l’armée sans accord de la Chambre.' },
        { type: 'p', text: '**2.** Il fait allusion à l’échec des libéraux de 1848-1849 : le Parlement de Francfort avait voulu unifier l’Allemagne par la discussion et une constitution libérale, mais il n’avait pas de force armée et le roi de Prusse avait refusé la couronne impériale (avril 1849).' },
        { type: 'p', text: '**3.** Bismarck unifie l’Allemagne par la guerre : contre le Danemark (1864, guerre des Duchés), contre l’Autriche (1866, victoire de Sadowa le 3 juillet) et contre la France (1870-1871). L’Empire est proclamé le 18 janvier 1871 à Versailles. C’est une unification « par le haut », réalisée par la monarchie prussienne et son armée.' },
      ],
    },
    {
      id: 'ex-italie-prob',
      title: 'Comment l’Italie s’est-elle unifiée ?',
      difficulty: 3,
      duration: 30,
      tags: ['question problématisée', 'Italie'],
      statement: [
        { type: 'p', text: 'Répondez à la question : **« Quel rôle ont joué la diplomatie, la guerre et les mouvements populaires dans l’unité italienne (1858-1870) ? »** Un plan en trois parties est attendu, appuyé sur des dates et des noms précis.' },
      ],
      hints: ['Cavour et Napoléon III à Plombières ; Garibaldi et les Mille ; 1866 ; 1870.'],
      solution: [
        { type: 'p', text: '**Introduction.** En 1850, l’Italie est divisée en États, dont une partie est dominée par l’Autriche. En une douzaine d’années, le royaume de Piémont-Sardaigne réunit la péninsule autour de la monarchie de Victor-Emmanuel II. Quelle part reviennent la diplomatie, la guerre et la mobilisation populaire ?' },
        { type: 'p', text: '**I. La diplomatie de Cavour.** Premier ministre piémontais depuis 1852, Cavour cherche des alliés : participation à la guerre de Crimée, accord secret de Plombières avec Napoléon III (juillet 1858) contre la cession de Nice et de la Savoie.' },
        { type: 'p', text: '**II. La guerre.** Guerre de 1859 contre l’Autriche (Magenta, 4 juin ; Solférino, 24 juin) ; armistice de Villafranca (11 juillet) : Lombardie au Piémont. En 1866, alliance avec la Prusse : la Vénétie rejoint l’Italie. En 1870, après le retrait français de Rome, les troupes italiennes entrent à Rome (20 septembre).' },
        { type: 'p', text: '**III. Le mouvement populaire.** Plébiscites en Italie centrale (1860) ; expédition des Mille de Garibaldi (mai 1860) qui conquiert la Sicile et Naples, et remet ses conquêtes au roi (Teano, 26 octobre) ; royaume d’Italie proclamé le 17 mars 1861. **Conclusion** : l’unité est le résultat d’un jeu d’alliances, de guerres et d’élans populaires, mais elle est menée avant tout par le Piémont ; Rome et Trente-Trieste restent des enjeux.' },
      ],
    },
    {
      id: 'ex-bac-1870',
      title: 'Type bac : 1870-1871, une année charnière',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'composition'],
      statement: [
        { type: 'p', text: '**Sujet.** « Pourquoi 1870-1871 est-elle une année charnière pour la France et pour l’Europe ? »' },
        { type: 'p', text: 'Rédigez l’introduction et proposez un plan détaillé avec exemples.' },
      ],
      hints: ['Pensez en trois temps : la chute du régime, l’Allemagne, les conséquences durables (Alsace-Lorraine, République, Commune).'],
      solution: [
        { type: 'p', text: '**Introduction.** Entre juillet 1870 et mai 1871, la guerre franco-prussienne et ses suites emportent le Second Empire, achèvent l’unité allemande et font naître un nouvel ordre européen. Dans quelle mesure cette période est-elle une rupture pour la France et l’Europe ? On verra d’abord la chute du Second Empire, puis la naissance de l’Empire allemand, enfin les conséquences durables.' },
        { type: 'p', text: '**I. La chute de Napoléon III.** Déclaration de guerre le 19 juillet 1870 (dépêche d’Ems) ; défaite de Sedan le 2 septembre ; République proclamée le 4 septembre ; Gouvernement de la Défense nationale ; siège de Paris ; armistice le 28 janvier 1871.' },
        { type: 'p', text: '**II. L’achèvement de l’unité allemande.** Proclamation de l’Empire à Versailles le 18 janvier 1871 ; Guillaume Ier empereur, Bismarck chancelier ; humiliation française symbolique ; l’Allemagne devient la première puissance continentale.' },
        { type: 'p', text: '**III. Des conséquences durables.** Traité de Francfort (10 mai 1871) : perte de l’Alsace et de la Moselle, 5 milliards de francs ; Commune de Paris (18 mars – 28 mai) et Semaine sanglante ; installation difficile de la République ; rancœur nationale (revanchisme) ; système bismarckien d’alliances ; l’Italie prend Rome (20 septembre 1870). **Conclusion** : 1870-1871 inaugure une Europe dominée par l’Allemagne et prépare les tensions de 1914.' },
      ],
    },
  ],

  representations: [
    { type: 'h2', text: 'Frise chronologique : 1848-1871' },
    {
      type: 'timeline',
      events: [
        { date: '24 février 1848', title: 'IIe République' },
        { date: '10 décembre 1848', title: 'Louis-Napoléon Bonaparte élu président' },
        { date: '2 décembre 1851', title: 'Coup d’État' },
        { date: '2 décembre 1852', title: 'Second Empire' },
        { date: '1853', title: 'Haussmann préfet de la Seine' },
        { date: 'Juillet 1858', title: 'Plombières' },
        { date: '1859', title: 'Magenta et Solférino' },
        { date: '23 janvier 1860', title: 'Traité de libre-échange franco-britannique' },
        { date: '24 mars 1860', title: 'Traité de Turin (Nice et Savoie)' },
        { date: '17 mars 1861', title: 'Royaume d’Italie' },
        { date: '1862', title: 'Bismarck ministre-président' },
        { date: '25 mai 1864', title: 'Droit de grève' },
        { date: '3 juillet 1866', title: 'Sadowa' },
        { date: '1867', title: 'Fin de l’expédition du Mexique' },
        { date: '8 mai 1870', title: 'Dernier plébiscite' },
        { date: '19 juillet 1870', title: 'Déclaration de guerre' },
        { date: '2 septembre 1870', title: 'Sedan' },
        { date: '4 septembre 1870', title: 'République' },
        { date: '18 janvier 1871', title: 'Empire allemand' },
        { date: '18 mars 1871', title: 'Début de la Commune' },
        { date: '10 mai 1871', title: 'Traité de Francfort' },
        { date: '21-28 mai 1871', title: 'Semaine sanglante' },
      ],
    },
    { type: 'h2', text: 'Ordonner' },
    {
      type: 'ordering',
      title: 'Les étapes de l’unité allemande',
      items: [
        'Création du Zollverein (1834)',
        'Bismarck, ministre-président de Prusse (1862)',
        'Guerre des Duchés contre le Danemark (1864)',
        'Victoire de Sadowa (3 juillet 1866)',
        'Dépêche d’Ems (13 juillet 1870)',
        'Proclamation de l’Empire allemand (18 janvier 1871)',
      ],
    },
    {
      type: 'ordering',
      title: 'Les régimes de la France',
      items: ['IIe République', 'Second Empire autoritaire', 'Second Empire libéral', 'Gouvernement de la Défense nationale', 'Commune de Paris'],
    },
    { type: 'h2', text: 'Associer' },
    {
      type: 'matching',
      title: 'Personnages',
      pairs: [
        { left: 'Napoléon III', right: 'Empereur des Français de 1852 à 1870' },
        { left: 'Haussmann', right: 'Préfet de la Seine, transformateur de Paris' },
        { left: 'Cavour', right: 'Premier ministre du Piémont-Sardaigne, artisan de l’unité italienne' },
        { left: 'Garibaldi', right: 'Chef de l’expédition des Mille (1860)' },
        { left: 'Victor-Emmanuel II', right: 'Premier roi d’Italie (1861)' },
        { left: 'Bismarck', right: 'Chancelier, artisan de l’unité allemande' },
        { left: 'Thiers', right: 'Chef du pouvoir exécutif en 1871, écrase la Commune' },
        { left: 'Ferdinand de Lesseps', right: 'Canal de Suez (1869)' },
      ],
    },
    {
      type: 'matching',
      title: 'Dates et lieux',
      pairs: [
        { left: 'Sedan', right: '2 septembre 1870' },
        { left: 'Sadowa', right: '3 juillet 1866' },
        { left: 'Solférino', right: '24 juin 1859' },
        { left: 'Marsala', right: '11 mai 1860' },
        { left: 'Galerie des Glaces', right: '18 janvier 1871' },
        { left: 'Traité de Francfort', right: '10 mai 1871' },
      ],
    },
    { type: 'h2', text: 'Flashcards' },
    {
      type: 'flashcards',
      cards: [
        { front: '10 décembre 1848', back: 'Louis-Napoléon Bonaparte élu président de la République.' },
        { front: '2 décembre 1851', back: 'Coup d’État de Louis-Napoléon.' },
        { front: '2 décembre 1852', back: 'Proclamation du Second Empire.' },
        { front: '23 janvier 1860', back: 'Traité de libre-échange franco-britannique (Cobden-Chevalier).' },
        { front: '17 mars 1861', back: 'Proclamation du royaume d’Italie.' },
        { front: '25 mai 1864', back: 'Loi qui reconnaît le droit de grève.' },
        { front: '3 juillet 1866', back: 'Victoire prussienne de Sadowa sur l’Autriche.' },
        { front: '19 juillet 1870', back: 'Déclaration de guerre de la France à la Prusse.' },
        { front: '2 septembre 1870', back: 'Capitulation de Napoléon III à Sedan.' },
        { front: '4 septembre 1870', back: 'Proclamation de la République.' },
        { front: '18 janvier 1871', back: 'Proclamation de l’Empire allemand à Versailles.' },
        { front: '18 mars 1871', back: 'Début de la Commune de Paris.' },
        { front: '10 mai 1871', back: 'Traité de Francfort : perte de l’Alsace (sauf Belfort) et d’une partie de la Lorraine.' },
        { front: '21-28 mai 1871', back: 'Semaine sanglante : fin de la Commune.' },
        { front: 'Risorgimento', back: 'Mouvement de l’unité italienne.' },
        { front: 'Zollverein', back: 'Union douanière allemande, 1834.' },
      ],
    },
    { type: 'h2', text: 'Schéma : l’unité italienne' },
    {
      type: 'svg',
      caption: 'Les étapes de l’unité italienne (schéma)',
      svg: `<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<line x1="40" y1="130" x2="660" y2="130" stroke="currentColor" stroke-width="1.5"/>
<g stroke="currentColor"><line x1="80" y1="122" x2="80" y2="138"/><line x1="190" y1="122" x2="190" y2="138"/><line x1="300" y1="122" x2="300" y2="138"/><line x1="410" y1="122" x2="410" y2="138"/><line x1="520" y1="122" x2="520" y2="138"/><line x1="620" y1="122" x2="620" y2="138"/></g>
<g fill="currentColor" text-anchor="middle" font-weight="bold">
<text x="80" y="155">1858-59</text><text x="190" y="155">1860</text><text x="300" y="155">1861</text><text x="410" y="155">1866</text><text x="520" y="155">1870</text>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="80" y="60">Plombières</text><text x="80" y="76">Magenta, Solférino</text><text x="80" y="92">Lombardie</text>
<text x="190" y="190">Expédition</text><text x="190" y="206">des Mille</text><text x="190" y="222">Nice-Savoie : France</text>
<text x="300" y="60">17 mars 1861</text><text x="300" y="76">Royaume</text><text x="300" y="92">d’Italie</text>
<text x="410" y="190">Alliance avec</text><text x="410" y="206">la Prusse :</text><text x="410" y="222">Vénétie</text>
<text x="520" y="60">20 septembre</text><text x="520" y="76">Prise de Rome</text><text x="520" y="92">(capitale 1871)</text>
</g>
<text x="620" y="155" text-anchor="middle" fill="currentColor" opacity="0.7">Reste :</text>
<text x="620" y="190" text-anchor="middle" fill="currentColor" opacity="0.7">Trentin,</text>
<text x="620" y="206" text-anchor="middle" fill="currentColor" opacity="0.7">Trieste</text>
</svg>`,
    },
    { type: 'h2', text: 'Vrai ou faux ?' },
    {
      type: 'truefalse',
      title: 'Vérifiez vos connaissances',
      statements: [
        { text: 'Napoléon III est élu président de la IIe République en décembre 1848.', answer: true },
        { text: 'Le Second Empire supprime le suffrage universel masculin.', answer: false, explanation: 'Le suffrage universel masculin est maintenu (il est même rétabli après la loi de 1850), mais encadré.' },
        { text: 'Haussmann transforme Paris sous la IIIe République.', answer: false, explanation: 'Sous le Second Empire (préfet de 1853 à 1870).' },
        { text: 'Le droit de grève est reconnu en 1864.', answer: true },
        { text: 'Garibaldi dirige l’expédition des Mille en 1860.', answer: true },
        { text: 'L’Empire allemand est proclamé à Berlin.', answer: false, explanation: 'Il est proclamé dans la galerie des Glaces du château de Versailles, le 18 janvier 1871.' },
        { text: 'Le traité de Francfort donne à l’Allemagne l’Alsace (sauf Belfort) et une partie de la Lorraine.', answer: true },
        { text: 'La Commune de Paris est écrasée durant la Semaine sanglante.', answer: true },
      ],
    },
    { type: 'h2', text: 'QCM' },
    {
      type: 'qcm',
      questions: [
        { question: 'Qui est le Premier ministre qui prépare l’unité italienne avec le Piémont ?', choices: ['Cavour', 'Mazzini', 'Garibaldi', 'Crispi'], answer: 0 },
        { question: 'Quelle bataille de 1866 assure la domination de la Prusse en Allemagne ?', choices: ['Sadowa', 'Sedan', 'Magenta', 'Leipzig'], answer: 0 },
        { question: 'Quel est le prétexte de la guerre de 1870 ?', choices: ['La candidature Hohenzollern au trône d’Espagne', 'L’annexion de la Savoie', 'Le canal de Suez', 'La guerre de Crimée'], answer: 0 },
        { question: 'Que signifie « Risorgimento » ?', choices: ['Résurrection (mouvement d’unité italien)', 'Union douanière', 'Principe des nationalités', 'République romaine'], answer: 0 },
        { question: 'Quel traité de 1860 stimule les échanges entre la France et le Royaume-Uni ?', choices: ['Traité Cobden-Chevalier', 'Traité de Francfort', 'Traité de Prague', 'Traité de Tilsit'], answer: 0 },
        { question: 'Quelle ville est proclamée capitale du royaume d’Italie en 1871 ?', choices: ['Rome', 'Turin', 'Florence', 'Milan'], answer: 0, explanation: 'Turin (1861), Florence (1865), puis Rome (1871).' },
        { question: 'Qui devient chef du pouvoir exécutif en février 1871 ?', choices: ['Adolphe Thiers', 'Léon Gambetta', 'Jules Favre', 'Mac Mahon'], answer: 0 },
        { question: 'La Semaine sanglante marque :', choices: ['La fin de la Commune de Paris', 'La fin du siège de Paris', 'Le début de la Commune', 'La chute du Second Empire'], answer: 0 },
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Complétez',
      text: 'Le {{2 décembre 1852}}, Louis-Napoléon devient {{Napoléon III}}. L’unité allemande est réalisée par la {{Prusse}} de {{Bismarck}}. La victoire de {{Sadowa}} (1866) écarte l’{{Autriche}} d’Allemagne. Le {{18 janvier 1871}}, {{Guillaume Ier}} est proclamé empereur à {{Versailles}}. Le traité de {{Francfort}} fait perdre à la France l’{{Alsace}}.',
    },
  ],
}

export default chapter
