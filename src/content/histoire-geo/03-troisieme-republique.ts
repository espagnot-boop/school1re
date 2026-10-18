import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'troisieme-republique',
  subject: 'histoire-geo',
  order: 3,
  title: 'La Troisième République avant 1914',
  theme: 'Histoire — Thème 3',
  summary:
    'Un régime politique (institutions de 1875, républicanisation, laïcité, affaire Dreyfus), un empire colonial et des permanences et mutations de la société française jusqu’en 1914.',
  duration: '5 semaines',
  objectives: [
    'Montrer comment la République s’installe durablement entre 1870 et 1914 (lois constitutionnelles de 1875, crise du 16 mai 1877, lois scolaires, libertés publiques).',
    'Expliquer la laïcisation de l’école et de l’État (1881-1905) et le sens de la loi de 1905.',
    'Analyser l’affaire Dreyfus et ses conséquences politiques et culturelles.',
    'Caractériser la construction de l’empire colonial français et les justifications de la colonisation, ainsi que ses réalités pour les populations colonisées.',
    'Décrire les permanences et mutations de la société française vers 1900 (paysannerie, industrie, ouvriers, femmes, immigration).',
    'Savoir dater, situer, utiliser un vocabulaire précis et analyser un document (discours, loi, article de presse).',
  ],
  keywords: [
    'lois constitutionnelles de 1875',
    'République parlementaire',
    '16 mai 1877',
    'Jules Ferry',
    'école laïque',
    'affaire Dreyfus',
    'J’accuse',
    'loi de 1905',
    'laïcité',
    'colonisation',
    'empire colonial',
    'Belle Époque',
    'mouvement ouvrier',
    'féminisme',
  ],

  fiche: [
    { type: 'h2', text: 'L’essentiel du thème 3' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problématique',
      content: [
        {
          type: 'p',
          text: 'Comment la IIIe République s’enracine-t-elle comme régime politique tout en construisant un vaste empire colonial, et quelles permanences et mutations la société française connaît-elle avant 1914 ?',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['4 septembre 1870', 'Proclamation de la République'],
        ['30 janvier 1875', 'Amendement Wallon : le mot « République » entre dans les lois constitutionnelles'],
        ['24-25 février, 16 juillet 1875', 'Lois constitutionnelles de la IIIe République'],
        ['16 mai 1877', 'Crise du 16 mai : Mac Mahon renvoie Jules Simon'],
        ['30 janvier 1879', 'Démission de Mac Mahon ; Jules Grévy président'],
        ['14 juillet 1880', 'Fête nationale'],
        ['1881-1882', 'Lois Jules Ferry : école gratuite (1881), obligatoire et laïque (1882)'],
        ['29 juillet 1881', 'Liberté de la presse'],
        ['12 mai 1881', 'Protectorat sur la Tunisie (traité du Bardo)'],
        ['21 mars 1884', 'Loi Waldeck-Rousseau : liberté syndicale'],
        ['1887', 'Union indochinoise'],
        ['1894-1906', 'Affaire Dreyfus ; « J’accuse » le 13 janvier 1898'],
        ['1er juillet 1901', 'Loi sur la liberté d’association'],
        ['9 décembre 1905', 'Loi de séparation des Églises et de l’État'],
        ['30 mars 1912', 'Protectorat français sur le Maroc'],
      ],
    },
    { type: 'h3', text: 'Notions' },
    {
      type: 'keyvalue',
      items: [
        { key: 'République parlementaire', value: 'Régime où le gouvernement est responsable devant le Parlement ; le président de la République a un rôle limité.' },
        { key: 'Laïcité', value: 'Séparation de l’Église et de l’État, neutralité de l’État, liberté de conscience.' },
        { key: 'Nationalisme', value: 'Exaltation de la nation, parfois xénophobe et antisémite à la fin du XIXe siècle.' },
        { key: 'Colonisation', value: 'Domination politique, économique et culturelle d’un territoire et de ses habitants par une puissance étrangère.' },
        { key: 'Protectorat', value: 'Territoire conservant formellement ses institutions mais placé sous l’autorité d’une puissance (Tunisie, Maroc).' },
        { key: 'Code de l’indigénat', value: 'Ensemble de règles discriminatoires appliquées aux « indigènes » (Algérie 1881, étendu ailleurs).' },
        { key: 'Mission civilisatrice', value: 'Justification idéologique : la France aurait le devoir d’apporter la « civilisation » aux peuples colonisés.' },
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
            'Les lois scolaires de Ferry : **gratuité (1881)** puis **obligation et laïcité (1882)** ; la loi de 1905 sépare les Églises et l’État, elle n’interdit pas la religion.',
            'Dreyfus est condamné en **1894**, gracié en **1899** et réhabilité en **1906** (innocence reconnue par la Cour de cassation le 12 juillet 1906).',
            'Les femmes n’ont pas le droit de vote avant 1944 : le suffrage universel est **masculin**.',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'La IIIe République naît de la défaite de 1870 : proclamée le **4 septembre 1870**, elle est d’abord provisoire et contestée par les monarchistes. Pourtant elle durera jusqu’en 1940, soit plus longtemps que tous les régimes depuis 1789. Avant 1914, elle s’impose comme un régime démocratique et libéral, laïque, et devient aussi la deuxième puissance coloniale du monde après le Royaume-Uni. Dans quelle mesure la France de la Belle Époque est-elle une République durablement enracinée et un empire, et comment sa société évolue-t-elle ?',
    },

    { type: 'h2', text: 'I. Un régime politique : l’enracinement de la République (1870-1914)' },
    { type: 'h3', text: 'A. Les débuts difficiles (1871-1879)' },
    {
      type: 'p',
      text: 'L’Assemblée nationale élue le 8 février 1871 est à majorité monarchiste (légitimistes et orléanistes), mais divisée sur le prétendant (comte de Chambord ou comte de Paris). **Adolphe Thiers**, chef du pouvoir exécutif, devient président de la République (loi Rivet, 31 août 1871) puis est renversé le **24 mai 1873** par la majorité monarchiste, qui lui substitue le maréchal **Mac Mahon** (« Ordre moral »). Faute d’accord sur le roi, l’Assemblée vote en 1875 les lois constitutionnelles. L’**amendement Wallon** (30 janvier 1875), adopté à une voix de majorité, définit un président de la République et introduit le mot « République ».',
    },
    {
      type: 'svg',
      caption: 'Les institutions de la IIIe République (lois constitutionnelles de 1875)',
      svg: `<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="230" y="10" width="220" height="60" fill="none" stroke="hsl(263 70% 60%)" stroke-width="2"/>
<text x="340" y="32" text-anchor="middle" fill="currentColor" font-weight="bold">Président de la République</text>
<text x="340" y="50" text-anchor="middle" fill="currentColor">élu pour 7 ans par le Congrès</text>
<text x="340" y="64" text-anchor="middle" fill="currentColor" font-size="11">(Chambre + Sénat réunis)</text>
<line x1="340" y1="70" x2="340" y2="100" stroke="currentColor"/>
<rect x="230" y="100" width="220" height="50" fill="none" stroke="hsl(25 95% 53%)" stroke-width="1.5"/>
<text x="340" y="122" text-anchor="middle" fill="currentColor" font-weight="bold">Président du Conseil</text>
<text x="340" y="139" text-anchor="middle" fill="currentColor">et ministres (gouvernement)</text>
<line x1="340" y1="150" x2="340" y2="180" stroke="currentColor"/>
<text x="352" y="170" fill="currentColor" font-size="11">responsable devant les deux chambres</text>
<rect x="30" y="180" width="270" height="70" fill="none" stroke="hsl(217 91% 60%)" stroke-width="1.5"/>
<text x="165" y="202" text-anchor="middle" fill="currentColor" font-weight="bold">Chambre des députés</text>
<text x="165" y="220" text-anchor="middle" fill="currentColor">élue au suffrage universel direct</text>
<text x="165" y="236" text-anchor="middle" fill="currentColor">masculin, pour 4 ans</text>
<rect x="380" y="180" width="270" height="70" fill="none" stroke="hsl(142 71% 45%)" stroke-width="1.5"/>
<text x="515" y="202" text-anchor="middle" fill="currentColor" font-weight="bold">Sénat</text>
<text x="515" y="220" text-anchor="middle" fill="currentColor">élu au suffrage indirect</text>
<text x="515" y="236" text-anchor="middle" fill="currentColor">(notables), pour 9 ans</text>
<line x1="300" y1="215" x2="380" y2="215" stroke="currentColor" stroke-dasharray="4 3"/>
<text x="340" y="206" text-anchor="middle" fill="currentColor" font-size="11">vote des lois</text>
<line x1="165" y1="250" x2="165" y2="280" stroke="currentColor"/>
<rect x="30" y="280" width="270" height="30" fill="none" stroke="currentColor"/>
<text x="165" y="300" text-anchor="middle" fill="currentColor">Électeurs (hommes ≥ 21 ans)</text>
</svg>`,
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Une République parlementaire',
      content: [
        {
          type: 'p',
          text: 'Le Parlement (Chambre des députés et Sénat) détient le pouvoir législatif et contrôle le gouvernement. Le président de la République (élu pour sept ans par les deux Chambres réunies en Congrès) peut dissoudre la Chambre avec l’accord du Sénat. Après la crise de 1877, ce droit ne sera plus jamais utilisé : le régime devient de fait **parlementaire** et le président s’efface. Les gouvernements sont nombreux et instables (une cinquantaine entre 1879 et 1914) mais le personnel politique est assez stable.',
        },
      ],
    },
    {
      type: 'h3',
      text: 'B. La victoire des républicains (1877-1879)',
    },
    {
      type: 'p',
      text: 'Le **16 mai 1877**, le président Mac Mahon renvoie le président du Conseil républicain Jules Simon et dissout la Chambre. Les élections d’octobre 1877 (14 octobre) voient pourtant la victoire des républicains (Gambetta : « se soumettre ou se démettre »). Mac Mahon démissionne le **30 janvier 1879** et **Jules Grévy** lui succède. Les républicains contrôlent désormais la Chambre, le Sénat et la présidence : c’est la « République des républicains ». La **Marseillaise** devient hymne national (1879) et le **14 juillet** fête nationale (loi du 6 juillet 1880).',
    },
    { type: 'h3', text: 'C. Les lois républicaines : libertés et école' },
    {
      type: 'table',
      headers: ['Date', 'Loi', 'Contenu'],
      rows: [
        ['1880', 'Loi Camille Sée', 'Création de lycées de jeunes filles'],
        ['16 juin 1881', 'Loi Ferry', 'Gratuité de l’école primaire publique'],
        ['30 juin 1881', 'Liberté de réunion', 'Les réunions publiques ne sont plus soumises à autorisation'],
        ['29 juillet 1881', 'Loi sur la liberté de la presse', 'Fin de la censure et de l’autorisation préalable'],
        ['28 mars 1882', 'Loi Ferry', 'Enseignement primaire obligatoire (6-13 ans) et laïque'],
        ['21 mars 1884', 'Loi Waldeck-Rousseau', 'Liberté syndicale'],
        ['27 juillet 1884', 'Loi Naquet', 'Rétablissement du divorce'],
        ['30 octobre 1886', 'Loi Goblet', 'Laïcisation du personnel enseignant des écoles publiques'],
      ],
    },
    {
      type: 'quote',
      text: 'Je répète qu’il y a pour les races supérieures un droit, parce qu’il y a un devoir pour elles. Elles ont le devoir de civiliser les races inférieures.',
      author: 'Jules Ferry',
      source: 'Discours à la Chambre des députés, 28 juillet 1885',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Le même Ferry, l’école et les colonies',
      content: [
        {
          type: 'p',
          text: 'Jules Ferry est à la fois l’homme de l’école laïque (ministre de l’Instruction publique) et de l’expansion coloniale (président du Conseil en 1880-81 et 1883-85). Les « hussards noirs de la République » (instituteurs) diffusent l’idée républicaine et patriotique : la République veut former des citoyens.',
        },
      ],
    },
    { type: 'h3', text: 'D. Les contestations : boulangisme, scandales, anarchisme' },
    {
      type: 'list',
      items: [
        '**Boulangisme (1886-1889)** : le général Boulanger, ministre de la Guerre, rassemble mécontents et revanchards ; il s’exile en 1889 après avoir menacé la République.',
        '**Scandale de Panama (1892-1893)** : faillite de la Compagnie du canal de Panama, corruption de parlementaires ; antiparlementarisme.',
        '**Attentats anarchistes** (1892-1894) : assassinat du président **Sadi Carnot** à Lyon le 24 juin 1894 ; « lois scélérates ».',
        '**Affaire Dreyfus** (1894-1906), la crise la plus grave.',
      ],
    },

    { type: 'h2', text: 'II. L’affaire Dreyfus et la laïcisation (1894-1905)' },
    { type: 'h3', text: 'A. L’affaire Dreyfus' },
    {
      type: 'timeline',
      events: [
        { date: 'Octobre 1894', title: 'Arrestation du capitaine Alfred Dreyfus', text: 'Officier juif d’origine alsacienne, accusé d’avoir livré des documents à l’Allemagne.' },
        { date: '22 décembre 1894', title: 'Condamnation', text: 'Le conseil de guerre le condamne à la déportation à vie à l’île du Diable (Guyane) ; dégradation publique le 5 janvier 1895.' },
        { date: '1896', title: 'Le colonel Picquart', text: 'Il découvre que le vrai coupable est le commandant Esterhazy, mais est écarté.' },
        { date: 'Janvier 1898', title: 'Acquittement d’Esterhazy et « J’accuse… ! »', text: 'Le 13 janvier 1898, Émile Zola publie dans L’Aurore une lettre ouverte au président de la République ; Dreyfusards (Ligue des droits de l’homme, 1898) contre antidreyfusards.' },
        { date: '1899', title: 'Nouveau procès à Rennes et grâce', text: 'Dreyfus est de nouveau condamné (avec circonstances atténuantes) puis gracié le 19 septembre 1899.' },
        { date: '12 juillet 1906', title: 'Réhabilitation', text: 'La Cour de cassation annule le jugement ; Dreyfus est réintégré dans l’armée.' },
      ],
    },
    {
      type: 'p',
      text: 'L’affaire divise profondément la France : les **dreyfusards** (Zola, Clemenceau, Jaurès, Péguy…) défendent la vérité, la justice, les droits de l’individu ; les **antidreyfusards** (Barrès, Maurras, une partie de l’armée et de l’Église) invoquent la raison d’État et l’honneur de l’armée, dans un contexte de nationalisme et d’antisémitisme. Elle montre le poids de la **presse** et de l’opinion publique, fait émerger la figure de l’**intellectuel** engagé, et conduit à un rassemblement des forces républicaines : le **Bloc des gauches**.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: '« J’accuse… ! »',
      content: [
        {
          type: 'quote',
          text: 'Mon devoir est de parler, je ne veux pas être complice.',
          author: 'Émile Zola',
          source: 'J’accuse…! Lettre au Président de la République, L’Aurore, 13 janvier 1898',
        },
      ],
    },
    { type: 'h3', text: 'B. La République laïque' },
    {
      type: 'p',
      text: 'Après l’affaire, le gouvernement de **Waldeck-Rousseau** (1899-1902) puis celui d’**Émile Combes** (1902-1905) réduisent l’influence des congrégations religieuses dans l’enseignement. La **loi du 1er juillet 1901** reconnaît la liberté d’association mais soumet les congrégations à autorisation. En 1904, les relations avec le Vatican sont rompues. La **loi du 9 décembre 1905** sépare les Églises et l’État :',
    },
    {
      type: 'quote',
      text: 'Art. 1 – La République assure la liberté de conscience. Elle garantit le libre exercice des cultes sous les seules restrictions édictées ci-après dans l’intérêt de l’ordre public.\nArt. 2 – La République ne reconnaît, ne salarie ni ne subventionne aucun culte.',
      source: 'Loi de séparation des Églises et de l’État, 9 décembre 1905',
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Ce que fait (et ne fait pas) la loi de 1905',
      content: [
        {
          type: 'list',
          items: [
            'Elle **garantit la liberté de conscience** et le libre exercice des cultes.',
            'Elle met fin au **Concordat** de 1801 : l’État ne finance plus aucun culte ; les cultes s’organisent en associations cultuelles.',
            'L’État devient **neutre** : c’est le fondement de la laïcité française. Elle ne persécute pas la religion mais fixe un cadre pour la vie publique.',
            'Les « inventaires » des biens d’Église provoquent des tensions (1906) ; le pape condamne la loi (1906).',
          ],
        },
      ],
    },

    { type: 'h2', text: 'III. Un empire colonial : la France, deuxième empire du monde' },
    { type: 'h3', text: 'A. Une expansion en deux temps' },
    {
      type: 'p',
      text: 'La conquête commence sous la Restauration et la monarchie de Juillet avec l’**Algérie** (prise d’Alger, 1830 ; conquête achevée vers 1847). Mais c’est sous la IIIe République que se constitue la majeure partie de l’empire, dans le contexte de la **seconde expansion coloniale européenne** (conférence de Berlin, 1884-1885, qui organise le partage de l’Afrique).',
    },
    {
      type: 'table',
      headers: ['Date', 'Territoire', 'Fait'],
      rows: [
        ['1881', 'Tunisie', 'Protectorat (traité du Bardo, 12 mai 1881)'],
        ['1883-1885', 'Tonkin, Annam', 'Guerre de conquête ; protectorat ; chute du gouvernement Ferry (mars 1885)'],
        ['1884-1885', 'Congo', 'Brazza ; conférence de Berlin'],
        ['1887', 'Indochine', 'Union indochinoise (Cochinchine, Cambodge, Annam, Tonkin ; Laos en 1893)'],
        ['1895', 'AOF', 'Afrique-Occidentale française (Sénégal, Soudan, Guinée, Côte d’Ivoire, Dahomey)'],
        ['1896', 'Madagascar', 'Annexion après la conquête de 1895 ; Gallieni'],
        ['1898', 'Fachoda', 'Crise franco-britannique : la France cède au Soudan'],
        ['1910', 'AEF', 'Afrique-Équatoriale française (Gabon, Moyen-Congo, Oubangui-Chari, Tchad)'],
        ['1912', 'Maroc', 'Protectorat (traité de Fès, 30 mars 1912), Lyautey résident général'],
      ],
    },
    {
      type: 'svg',
      caption: 'Schéma : l’empire colonial français vers 1914 (principales possessions)',
      svg: `<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<g fill="none" stroke-width="1.5">
<rect x="10" y="10" width="210" height="130" stroke="hsl(217 91% 60%)"/>
<rect x="245" y="10" width="210" height="130" stroke="hsl(25 95% 53%)"/>
<rect x="480" y="10" width="210" height="130" stroke="hsl(142 71% 45%)"/>
<rect x="10" y="160" width="210" height="130" stroke="hsl(263 70% 60%)"/>
<rect x="245" y="160" width="210" height="130" stroke="hsl(0 84% 60%)"/>
<rect x="480" y="160" width="210" height="130" stroke="currentColor"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="115" y="32" font-weight="bold">Maghreb</text>
<text x="115" y="56">Algérie (1830, départements)</text>
<text x="115" y="74">Tunisie (1881, protectorat)</text>
<text x="115" y="92">Maroc (1912, protectorat)</text>
<text x="350" y="32" font-weight="bold">Afrique noire</text>
<text x="350" y="56">AOF (1895)</text>
<text x="350" y="74">AEF (1910)</text>
<text x="350" y="92">Côte française des Somalis</text>
<text x="585" y="32" font-weight="bold">Madagascar</text>
<text x="585" y="56">Annexion en 1896</text>
<text x="585" y="74">Gallieni</text>
<text x="115" y="182" font-weight="bold">Asie</text>
<text x="115" y="206">Indochine (Union, 1887)</text>
<text x="115" y="224">Cochinchine, Cambodge,</text>
<text x="115" y="242">Annam, Tonkin, Laos</text>
<text x="350" y="182" font-weight="bold">Pacifique et Antilles</text>
<text x="350" y="206">Nouvelle-Calédonie, Tahiti</text>
<text x="350" y="224">Antilles, Guyane</text>
<text x="350" y="242">Réunion (« vieilles colonies »)</text>
<text x="585" y="182" font-weight="bold">Bilan vers 1914</text>
<text x="585" y="206">≈ 10 millions de km²</text>
<text x="585" y="224">≈ 50 millions d’habitants</text>
<text x="585" y="242">2e empire après le Royaume-Uni</text>
</g>
</svg>`,
    },
    { type: 'h3', text: 'B. Pourquoi coloniser ? Les justifications' },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Économiques', text: 'Débouchés pour les produits, matières premières, investissements (thèse de Jules Ferry, 1885).', icon: 'Coins' },
        { title: 'Politiques et stratégiques', text: 'Prestige, rang de grande puissance après la défaite de 1870, bases navales et points d’appui, rivalité avec le Royaume-Uni.', icon: 'Flag' },
        { title: 'Idéologiques', text: '« Mission civilisatrice », hiérarchie des « races » (racisme scientifique), prosélytisme religieux.', icon: 'Globe2' },
      ],
    },
    {
      type: 'p',
      text: 'La colonisation est discutée : le **parti colonial** et les « Français d’outre-mer » la défendent ; Clemenceau, une partie de la gauche radicale (qui dénonce l’inégalité), la droite nationaliste (qui préfère la « ligne bleue des Vosges », c’est-à-dire l’Alsace-Lorraine) et Jaurès (qui critique la brutalité de la conquête et défend l’école pour les colonisés) la critiquent.',
    },
    { type: 'h3', text: 'C. L’administration et la vie dans les colonies' },
    {
      type: 'list',
      items: [
        '**Statuts différenciés** : colonies (Indochine, Afrique), protectorats (Tunisie, Maroc), départements en **Algérie** (colonie de peuplement : 1 million d’Européens vers 1914).',
        'Les populations colonisées sont des **sujets** et non des citoyens : **code de l’indigénat** (Algérie 1881), travaux forcés, impôts. Décret Crémieux (1870) : naturalisation des Juifs d’Algérie ; musulmans exclus de la citoyenneté.',
        'Exploitation économique (plantations, mines), infrastructures (ports, chemins de fer), écoles et dispensaires en nombre limité.',
        '**Résistances** : Abdelkader (1832-1847), révolte de Kabylie (1871), résistance à Madagascar (menalamba), Samory Touré en Afrique de l’Ouest (capturé en 1898).',
        '**Troupes coloniales** : tirailleurs sénégalais, etc., mobilisés plus tard en 1914-1918.',
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Les expositions : un imaginaire colonial',
      content: [
        {
          type: 'p',
          text: 'Les expositions universelles (Paris 1889, 1900) et les « zoos humains » diffusent une vision hiérarchisée des peuples. L’empire fait partie de la fierté nationale, même si les Français s’y intéressent peu avant 1914. La colonisation est justifiée par la « mission civilisatrice » mais repose sur des inégalités, la contrainte et la violence.',
        },
      ],
    },

    { type: 'h2', text: 'IV. Permanences et mutations de la société française' },
    { type: 'h3', text: 'A. Une société encore largement rurale' },
    {
      type: 'p',
      text: 'En 1914, environ **40 %** des actifs travaillent encore dans l’agriculture. La population française, d’environ **39,6 millions** en 1911, stagne en raison d’une natalité faible (la France est le pays d’Europe qui croît le moins) ; le recensement de 1911 compte environ **1,1 million d’étrangers**. L’**exode rural** s’accélère et la population urbaine représente 44 % de la population en 1911. La **paysannerie** est frappée par la crise agricole (phylloxéra, concurrence des blés américains), ce qui amène le **tarif protectionniste Méline** (1892). La petite propriété domine ; la République y trouve ses électeurs.',
    },
    { type: 'h3', text: 'B. L’industrialisation et la société ouvrière' },
    {
      type: 'p',
      text: 'La **deuxième révolution industrielle** (électricité, chimie, automobile avec Renault et Peugeot, sidérurgie lorraine) transforme l’économie, tandis que le petit atelier et l’artisanat subsistent. Les ouvriers (environ un tiers des actifs) vivent dans des conditions difficiles mais obtiennent des conquêtes : **liberté syndicale** (1884), **CGT** (1895), **accidents du travail** (loi du 9 avril 1898), **repos hebdomadaire** (1906), **retraites ouvrières** (1910). Le mouvement ouvrier se structure : syndicalisme révolutionnaire (**Charte d’Amiens**, 1906) et politique avec la **SFIO** (1905, Jean Jaurès et Jules Guesde). Les grèves sont nombreuses, parfois réprimées (Fourmies, 1er mai 1891 : 9 morts ; Courrières, 1906, catastrophe minière : 1 099 morts).',
    },
    { type: 'h3', text: 'C. Les classes moyennes et la bourgeoisie' },
    {
      type: 'p',
      text: 'Les **classes moyennes** (employés, fonctionnaires, instituteurs, commerçants) se développent ; les **grands magasins** (Bon Marché, Samaritaine, Galeries Lafayette 1893) changent la consommation ; la **bourgeoisie** domine l’économie et la politique, et sa culture inspire l’école républicaine. L’**impôt sur le revenu** est voté le 15 juillet 1914 (mise en œuvre en 1917).',
    },
    { type: 'h3', text: 'D. La place des femmes et des étrangers' },
    {
      type: 'list',
      items: [
        'Les femmes sont **exclues du suffrage** : inégalité civile (le Code civil les rend incapables) mais progrès : lycées de jeunes filles (1880), enseignement primaire obligatoire pour les filles, divorce (1884), droit de disposer de leur salaire (1907), **féminisme** (Hubertine Auclert, Marguerite Durand et le journal *La Fronde* en 1897, Maria Deraismes). **Marie Curie** reçoit le prix Nobel de physique en 1903, puis de chimie en 1911.',
        'L’immigration (Italiens, Belges, Polonais) alimente l’industrie ; xénophobie (massacre d’Aigues-Mortes, 1893).',
        'La République s’appuie sur l’**école** : en 1914, l’illettrisme a reculé et la langue française s’impose face aux langues régionales.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'La Belle Époque : une image à nuancer',
      content: [
        {
          type: 'p',
          text: 'La « Belle Époque » (1900-1914) renvoie à la prospérité, aux innovations (électricité, cinéma Lumière 1895, métro 1900, automobile), à l’Exposition universelle de 1900. Mais elle est aussi marquée par de fortes inégalités, les tensions sociales, le nationalisme et la montée des menaces extérieures (crises marocaines de 1905 et 1911, loi des trois ans en 1913). Le **31 juillet 1914**, Jean Jaurès, pacifiste, est assassiné.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : rédiger un paragraphe argumenté',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Idée', text: 'Une phrase qui répond clairement à la question (affirmation).' },
            { title: 'Exemples', text: 'Deux ou trois faits datés et précis (acteurs, lieux).' },
            { title: 'Explication', text: 'Expliquer le lien entre les faits et l’idée.' },
            { title: 'Transition', text: 'Une phrase de conclusion ou de transition vers la partie suivante.' },
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex-reperes-3r',
      title: 'Repères de la IIIe République',
      difficulty: 1,
      duration: 10,
      tags: ['repères'],
      statement: [
        { type: 'p', text: 'Associez chaque date à l’événement correspondant : 1875, 1882, 1898, 1905, 1906, 1881 (12 mai). Événements : réhabilitation de Dreyfus ; protectorat sur la Tunisie ; « J’accuse » ; séparation des Églises et de l’État ; lois constitutionnelles ; école obligatoire et laïque.' },
      ],
      solution: [
        {
          type: 'list',
          items: [
            '1875 : lois constitutionnelles.',
            '1882 : école primaire obligatoire et laïque (lois Ferry).',
            '1898 : « J’accuse » (13 janvier).',
            '1905 : séparation des Églises et de l’État (9 décembre).',
            '1906 : réhabilitation de Dreyfus (12 juillet).',
            '12 mai 1881 : protectorat sur la Tunisie (traité du Bardo).',
          ],
        },
      ],
    },
    {
      id: 'ex-ferry-colonial',
      title: 'Document : Jules Ferry et la colonisation',
      difficulty: 2,
      duration: 25,
      tags: ['document', 'colonies'],
      statement: [
        {
          type: 'quote',
          text: 'Messieurs, il y a un second point, un second ordre d’idées que je dois également aborder […] : c’est le côté humanitaire et civilisateur de la question. […] Je répète qu’il y a pour les races supérieures un droit, parce qu’il y a un devoir pour elles. Elles ont le devoir de civiliser les races inférieures.',
          author: 'Jules Ferry',
          source: 'Discours à la Chambre des députés, 28 juillet 1885',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Présentez le document.',
            'Quel argument Ferry avance-t-il pour justifier la colonisation ? Quels autres arguments avait-il présentés dans le même discours ?',
            'Quel regard critique peut-on porter sur ce texte ?',
          ],
        },
      ],
      hints: ['Ferry invoque aussi l’économie (débouchés) et la puissance (bases navales).', 'Que pensent les colonisés ? Que dit le texte de l’égalité ?'],
      solution: [
        { type: 'p', text: '**1.** Il s’agit d’un discours prononcé par Jules Ferry, ancien président du Conseil et grand promoteur de l’expansion coloniale, à la Chambre des députés le 28 juillet 1885, quelques mois après la chute de son gouvernement (mars 1885) provoquée par l’affaire du Tonkin. Ferry répond à ses adversaires (dont Clemenceau).' },
        { type: 'p', text: '**2.** L’argument avancé est celui de la « mission civilisatrice » : les « races supérieures » auraient le devoir d’apporter la civilisation aux autres. Dans le même discours, Ferry développe aussi des arguments économiques (la colonisation fournit des débouchés à l’industrie et des marchés) et politiques (la France doit conserver son rang de grande puissance, disposer de ports et de points d’appui pour sa flotte).' },
        { type: 'p', text: '**3.** Le texte repose sur une conception raciste et hiérarchisée de l’humanité, courante à l’époque mais en contradiction avec les principes de 1789 (égalité). La « mission civilisatrice » sert à légitimer une domination qui comporte l’exploitation économique, la violence de la conquête et l’inégalité juridique (code de l’indigénat). La parole est celle d’un homme politique défendant une politique : c’est un document engagé, qui ne donne pas le point de vue des colonisés. Ses adversaires (Clemenceau) lui répondent.' },
      ],
    },
    {
      id: 'ex-laicite',
      title: 'La loi de 1905',
      difficulty: 2,
      duration: 25,
      tags: ['document', 'laïcité'],
      statement: [
        {
          type: 'quote',
          text: 'Art. 1 – La République assure la liberté de conscience. Elle garantit le libre exercice des cultes sous les seules restrictions édictées ci-après dans l’intérêt de l’ordre public.\nArt. 2 – La République ne reconnaît, ne salarie ni ne subventionne aucun culte.',
          source: 'Loi du 9 décembre 1905',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel texte cette loi remplace-t-elle ? Quel est le contexte de son adoption ?',
            'Expliquez les deux principes énoncés par les articles 1 et 2.',
            'Montrez que cette loi n’est pas dirigée contre les religions.',
          ],
        },
      ],
      hints: ['Concordat de 1801 ; affaire Dreyfus ; Combes ; lois sur les congrégations.'],
      solution: [
        { type: 'p', text: '**1.** La loi met fin au **Concordat de 1801** entre Napoléon Bonaparte et le pape. Elle intervient après l’affaire Dreyfus, qui a révélé la force de l’antirépublicanisme d’une partie du clergé, après la politique anticléricale du gouvernement Combes et la rupture des relations avec le Vatican (1904).' },
        { type: 'p', text: '**2.** L’article 1 garantit la **liberté de conscience** et le **libre exercice des cultes** (chacun est libre de croire ou de ne pas croire). L’article 2 pose la **neutralité de l’État** : il ne reconnaît ni ne finance aucun culte ; les religions deviennent des affaires privées gérées par leurs fidèles.' },
        { type: 'p', text: '**3.** La loi protège le libre exercice des cultes (art. 1) et laisse les Églises s’organiser en associations cultuelles ; les églises restent à disposition des fidèles. Elle sépare le domaine politique du domaine religieux sans interdire la pratique religieuse. Elle a cependant été vécue comme une agression par l’Église catholique (condamnation pontificale en 1906, querelle des inventaires).' },
      ],
    },
    {
      id: 'ex-dreyfus',
      title: 'Expliquer l’affaire Dreyfus',
      difficulty: 2,
      duration: 25,
      tags: ['rédaction', 'question problématisée'],
      statement: [
        { type: 'p', text: 'Rédigez un développement de 15 lignes répondant à : **« En quoi l’affaire Dreyfus est-elle un révélateur des tensions de la société française et de la IIIe République ? »**' },
      ],
      hints: ['Pensez antisémitisme, nationalisme, rôle de la presse, intellectuels, clivage politique.'],
      solution: [
        { type: 'p', text: 'En octobre 1894, le capitaine Alfred Dreyfus, officier juif alsacien, est accusé d’espionnage au profit de l’Allemagne. Condamné le 22 décembre 1894 sur des preuves fragiles, il est déporté à l’île du Diable. Mais en 1896 le colonel Picquart découvre que le coupable est Esterhazy ; l’armée refuse de reconnaître son erreur. Le 13 janvier 1898, Zola publie « J’accuse… ! » dans *L’Aurore*.' },
        { type: 'p', text: 'L’affaire révèle des **tensions profondes** : l’antisémitisme et le nationalisme d’une partie de l’opinion (Drumont, *La Libre Parole* ; Barrès), la méfiance envers la République parlementaire, la force de l’armée et de l’Église. Elle oppose dreyfusards (défense des droits individuels, de la justice, héritage de 1789) et antidreyfusards (raison d’État, honneur de l’armée). Elle montre aussi la puissance de la **presse** (tirages en hausse) et naît la figure de l’**intellectuel** (pétitions, Ligue des droits de l’homme en 1898).' },
        { type: 'p', text: 'Après la grâce de 1899 et la réhabilitation de 1906, la victoire des dreyfusards renforce la République : le « Bloc des gauches » gouverne et mène la politique de laïcisation (1901-1905). L’affaire est donc un moment fondateur de la culture politique républicaine.' },
      ],
    },
    {
      id: 'ex-societe-1900',
      title: 'La société française vers 1900',
      difficulty: 2,
      duration: 25,
      tags: ['rédaction', 'société'],
      statement: [
        { type: 'p', text: 'À partir de vos connaissances, montrez que la société française de la Belle Époque est marquée à la fois par des **permanences** et des **mutations**. Vous présenterez deux permanences et trois mutations.' },
      ],
      hints: ['Permanences : ruralité, inégalités des sexes. Mutations : industrie, droits ouvriers, école.'],
      solution: [
        { type: 'p', text: '**Permanences.** (1) La France reste très rurale : environ 40 % des actifs travaillent dans l’agriculture et la petite propriété domine. (2) Les femmes demeurent privées de droits politiques et inégales sur le plan civil (incapacité de la femme mariée jusqu’en 1938 pour l’essentiel) ; la population stagne.' },
        { type: 'p', text: '**Mutations.** (1) L’industrialisation se poursuit (deuxième révolution industrielle : électricité, automobile, chimie), l’urbanisation progresse (44 % d’urbains en 1911). (2) Les ouvriers s’organisent et obtiennent des droits (syndicats 1884, CGT 1895, accidents du travail 1898, repos hebdomadaire 1906, retraites 1910 ; SFIO 1905). (3) L’école républicaine gratuite, obligatoire et laïque transforme la société (alphabétisation, culture commune), et les classes moyennes se développent (fonctionnaires, employés). On peut ajouter le féminisme et l’entrée des femmes dans l’enseignement.' },
      ],
    },
    {
      id: 'ex-colonial-prob',
      title: 'Question problématisée : l’empire colonial',
      difficulty: 3,
      duration: 30,
      tags: ['composition', 'colonies'],
      statement: [
        { type: 'p', text: 'Sujet : **« La construction de l’empire colonial français sous la IIIe République (1881-1914) : une entreprise discutée ? »** Proposez une introduction (accroche, définition, problématique, annonce du plan) et un plan détaillé.' },
      ],
      hints: ['I. Les étapes de la conquête. II. Les justifications. III. Les critiques et les réalités de la domination.'],
      solution: [
        { type: 'p', text: '**Introduction.** Entre 1881 et 1914, la France, humiliée en 1870, bâtit en quelques décennies le deuxième empire colonial du monde (environ 10 millions de km² vers 1914). Cette entreprise, qualifiée de « mission civilisatrice » par ses promoteurs, est pourtant contestée en métropole et par les populations colonisées. On verra les étapes de la conquête, les justifications avancées, puis les critiques et la réalité de la domination.' },
        { type: 'p', text: '**I. Les étapes.** Tunisie (1881), Tonkin et Annam (1883-1885), Indochine (1887), Congo et AOF (1895), Madagascar (1896), Fachoda (1898), AEF (1910), Maroc (1912) ; Algérie depuis 1830, département.' },
        { type: 'p', text: '**II. Les justifications.** Économiques (débouchés), politiques (rang de grande puissance, revanche indirecte après 1871), idéologiques (mission civilisatrice, hiérarchie des « races ») : discours de Ferry (1885).' },
        { type: 'p', text: '**III. Critiques et réalités.** Opposition de Clemenceau (30 juillet 1885) et de la droite nationaliste (« ligne bleue des Vosges ») ; Jaurès dénonce les violences. Pour les colonisés : statut de sujets, code de l’indigénat, travail forcé, impôt, résistances (Samory, menalamba, Kabylie 1871). **Conclusion** : la colonisation, popularisée par les expositions, repose sur une contradiction avec les principes républicains d’égalité.' },
      ],
    },
    {
      id: 'ex-bac-republique',
      title: 'Type bac : comment la République s’est-elle enracinée ?',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'composition'],
      statement: [
        { type: 'p', text: '**Sujet.** « Comment la IIIe République s’impose-t-elle comme régime politique de 1870 à 1914 ? »' },
        { type: 'p', text: 'Rédigez l’introduction et le plan détaillé (au moins trois parties, avec dates et exemples).' },
      ],
      hints: ['Institutions (1875), conflit avec les monarchistes (1877), lois républicaines, crises surmontées (Boulanger, Dreyfus), laïcité (1905).'],
      solution: [
        { type: 'p', text: '**Introduction.** Proclamée le 4 septembre 1870 dans la défaite, la République est d’abord un régime provisoire dans une Assemblée majoritairement monarchiste. Pourtant, en 1914, elle est solidement enracinée. Comment la IIIe République s’installe-t-elle durablement ? On verra d’abord la mise en place des institutions, puis la victoire des républicains et leur œuvre, enfin les crises qui renforcent le régime.' },
        { type: 'p', text: '**I. Un régime construit sur un compromis (1870-1879).** Thiers, Mac Mahon, ordre moral (1873), amendement Wallon (30 janvier 1875), lois constitutionnelles de 1875 (président de la République, Chambre des députés élue au suffrage universel, Sénat) ; crise du 16 mai 1877 et victoire républicaine (octobre 1877) ; démission de Mac Mahon (30 janvier 1879).' },
        { type: 'p', text: '**II. La République des républicains (1879-1890).** Symboles : Marseillaise, 14 juillet (1880), buste de Marianne ; lois libérales (réunion, presse 1881, syndicats 1884, divorce 1884) ; lois Ferry : école gratuite (1881), obligatoire et laïque (1882).' },
        { type: 'p', text: '**III. Des crises surmontées (1886-1905).** Boulangisme (1886-1889), Panama (1892), attentats anarchistes (Carnot assassiné en 1894), affaire Dreyfus (1894-1906) : victoire des dreyfusards, défense républicaine (Waldeck-Rousseau, 1899), loi de 1901 sur les associations, laïcité (1905). **Conclusion** : en surmontant ses contestations, la République s’enracine comme un régime démocratique, parlementaire et laïque, en 1914.' },
      ],
    },
  ],

  representations: [
    { type: 'h2', text: 'Frise chronologique : 1870-1914' },
    {
      type: 'timeline',
      events: [
        { date: '4 septembre 1870', title: 'Proclamation de la République' },
        { date: '24 mai 1873', title: 'Chute de Thiers, Mac Mahon président' },
        { date: '30 janvier 1875', title: 'Amendement Wallon' },
        { date: '16 mai 1877', title: 'Crise du 16 mai' },
        { date: '30 janvier 1879', title: 'Jules Grévy président' },
        { date: '14 juillet 1880', title: 'Fête nationale' },
        { date: '12 mai 1881', title: 'Protectorat de la Tunisie' },
        { date: '1881-1882', title: 'Lois Ferry' },
        { date: '21 mars 1884', title: 'Liberté syndicale' },
        { date: '1885', title: 'Tonkin ; discours de Ferry' },
        { date: '1886-1889', title: 'Boulangisme' },
        { date: '1892', title: 'Scandale de Panama' },
        { date: '24 juin 1894', title: 'Assassinat de Sadi Carnot' },
        { date: '22 décembre 1894', title: 'Condamnation de Dreyfus' },
        { date: '13 janvier 1898', title: '« J’accuse »' },
        { date: '1er juillet 1901', title: 'Loi sur les associations' },
        { date: '9 décembre 1905', title: 'Séparation des Églises et de l’État' },
        { date: '12 juillet 1906', title: 'Réhabilitation de Dreyfus' },
        { date: '30 mars 1912', title: 'Protectorat du Maroc' },
        { date: '31 juillet 1914', title: 'Assassinat de Jaurès' },
      ],
    },
    { type: 'h2', text: 'Ordonner' },
    {
      type: 'ordering',
      title: 'Ordre chronologique',
      items: [
        'Amendement Wallon (1875)',
        'Crise du 16 mai (1877)',
        'Lois Ferry sur l’école (1881-1882)',
        'Boulangisme (1886-1889)',
        'Condamnation de Dreyfus (1894)',
        '« J’accuse » (1898)',
        'Loi sur les associations (1901)',
        'Séparation des Églises et de l’État (1905)',
      ],
    },
    {
      type: 'ordering',
      title: 'Étapes de la conquête coloniale',
      items: ['Algérie (1830)', 'Tunisie (1881)', 'Union indochinoise (1887)', 'AOF (1895)', 'Madagascar (1896)', 'AEF (1910)', 'Maroc (1912)'],
    },
    { type: 'h2', text: 'Associer' },
    {
      type: 'matching',
      title: 'Qui est-ce ?',
      pairs: [
        { left: 'Jules Ferry', right: 'École gratuite, obligatoire, laïque ; expansion coloniale' },
        { left: 'Léon Gambetta', right: '« Se soumettre ou se démettre » (1877)' },
        { left: 'Émile Zola', right: 'Auteur de « J’accuse… ! »' },
        { left: 'Alfred Dreyfus', right: 'Capitaine condamné pour trahison, réhabilité en 1906' },
        { left: 'Émile Combes', right: 'Président du Conseil, politique anticléricale (1902-1905)' },
        { left: 'Jean Jaurès', right: 'Leader socialiste, assassiné le 31 juillet 1914' },
        { left: 'Lyautey', right: 'Résident général au Maroc' },
        { left: 'Waldeck-Rousseau', right: 'Loi sur les syndicats (1884), puis sur les associations (1901)' },
      ],
    },
    {
      type: 'matching',
      title: 'Lois',
      pairs: [
        { left: '1882', right: 'Enseignement primaire obligatoire et laïque' },
        { left: '1884', right: 'Liberté syndicale' },
        { left: '1898', right: 'Accidents du travail' },
        { left: '1901', right: 'Liberté d’association' },
        { left: '1905', right: 'Séparation des Églises et de l’État' },
        { left: '1906', right: 'Repos hebdomadaire' },
      ],
    },
    { type: 'h2', text: 'Flashcards' },
    {
      type: 'flashcards',
      cards: [
        { front: '4 septembre 1870', back: 'Proclamation de la République.' },
        { front: '30 janvier 1875', back: 'Amendement Wallon (République).' },
        { front: '16 mai 1877', back: 'Crise : Mac Mahon renvoie Jules Simon et dissout la Chambre.' },
        { front: '30 janvier 1879', back: 'Mac Mahon démissionne ; Grévy président.' },
        { front: '14 juillet 1880', back: 'Fête nationale (loi du 6 juillet 1880).' },
        { front: '16 juin 1881', back: 'Gratuité de l’école primaire.' },
        { front: '28 mars 1882', back: 'École primaire obligatoire et laïque.' },
        { front: '21 mars 1884', back: 'Liberté syndicale (loi Waldeck-Rousseau).' },
        { front: '13 janvier 1898', back: '« J’accuse » de Zola dans L’Aurore.' },
        { front: '1er juillet 1901', back: 'Loi sur la liberté d’association.' },
        { front: '9 décembre 1905', back: 'Loi de séparation des Églises et de l’État.' },
        { front: '12 juillet 1906', back: 'Réhabilitation de Dreyfus par la Cour de cassation.' },
        { front: '12 mai 1881', back: 'Traité du Bardo : protectorat sur la Tunisie.' },
        { front: '30 mars 1912', back: 'Traité de Fès : protectorat sur le Maroc.' },
        { front: 'Code de l’indigénat', back: 'Règles discriminatoires imposées aux colonisés (Algérie 1881).' },
        { front: 'Mission civilisatrice', back: 'Justification idéologique de la colonisation.' },
      ],
    },
    { type: 'h2', text: 'Schéma : les crises de la République' },
    {
      type: 'svg',
      caption: 'Les crises qui menacent puis renforcent la République (1877-1905)',
      svg: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<g fill="none" stroke-width="1.5">
<rect x="5" y="60" width="130" height="90" stroke="hsl(25 95% 53%)"/>
<rect x="155" y="60" width="130" height="90" stroke="hsl(0 84% 60%)"/>
<rect x="305" y="60" width="130" height="90" stroke="hsl(263 70% 60%)"/>
<rect x="455" y="60" width="130" height="90" stroke="hsl(217 91% 60%)"/>
<rect x="605" y="60" width="90" height="90" stroke="hsl(142 71% 45%)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="70" y="85" font-weight="bold">1877</text><text x="70" y="105">Crise du</text><text x="70" y="121">16 mai</text>
<text x="220" y="85" font-weight="bold">1886-89</text><text x="220" y="105">Boulangisme</text><text x="220" y="121">(nationalisme)</text>
<text x="370" y="85" font-weight="bold">1892</text><text x="370" y="105">Panama</text><text x="370" y="121">(corruption)</text>
<text x="520" y="85" font-weight="bold">1894-1906</text><text x="520" y="105">Affaire Dreyfus</text><text x="520" y="121">(antisémitisme)</text>
<text x="650" y="85" font-weight="bold">1905</text><text x="650" y="105">Laïcité</text>
</g>
<g stroke="currentColor"><line x1="135" y1="105" x2="155" y2="105"/><line x1="285" y1="105" x2="305" y2="105"/><line x1="435" y1="105" x2="455" y2="105"/><line x1="585" y1="105" x2="605" y2="105"/></g>
<text x="350" y="190" text-anchor="middle" fill="currentColor">Chaque crise est surmontée : la République en sort renforcée</text>
</svg>`,
    },
    { type: 'h2', text: 'Vrai ou faux ?' },
    {
      type: 'truefalse',
      title: 'Testez-vous',
      statements: [
        { text: 'Les lois constitutionnelles de 1875 instaurent un régime parlementaire.', answer: true },
        { text: 'La loi de 1905 interdit la pratique religieuse en France.', answer: false, explanation: 'Elle garantit la liberté de conscience et le libre exercice des cultes ; elle sépare les Églises et l’État.' },
        { text: 'Dreyfus est réhabilité en 1906.', answer: true },
        { text: 'Les femmes obtiennent le droit de vote avant 1914.', answer: false, explanation: 'Elles obtiennent le droit de vote en 1944.' },
        { text: 'L’école devient obligatoire et laïque en 1882.', answer: true },
        { text: 'Le Maroc devient un protectorat français en 1912.', answer: true },
        { text: 'La conquête de l’Algérie commence sous la IIIe République.', answer: false, explanation: 'Elle commence en 1830.' },
        { text: 'Fachoda (1898) est une crise franco-britannique.', answer: true },
      ],
    },
    { type: 'h2', text: 'QCM' },
    {
      type: 'qcm',
      questions: [
        { question: 'Qui préside la République lors de la crise du 16 mai 1877 ?', choices: ['Mac Mahon', 'Thiers', 'Grévy', 'Carnot'], answer: 0 },
        { question: 'Quelle loi rend l’école primaire gratuite ?', choices: ['Loi du 16 juin 1881', 'Loi de 1905', 'Loi de 1901', 'Loi de 1886'], answer: 0 },
        { question: 'Dans quel journal est publié « J’accuse » ?', choices: ['L’Aurore', 'Le Figaro', 'La Croix', 'La Libre Parole'], answer: 0 },
        { question: 'Que supprime la loi de 1905 ?', choices: ['Le Concordat', 'La liberté de culte', 'L’école publique', 'Le suffrage universel'], answer: 0 },
        { question: 'Qui est résident général du Maroc en 1912 ?', choices: ['Lyautey', 'Gallieni', 'Brazza', 'Faidherbe'], answer: 0 },
        { question: 'Quelle crise oppose la France au Royaume-Uni en 1898 ?', choices: ['Fachoda', 'Tanger', 'Agadir', 'Sedan'], answer: 0 },
        { question: 'Quelle est la durée du mandat du président de la République en 1875 ?', choices: ['7 ans', '5 ans', '4 ans', '9 ans'], answer: 0 },
        { question: 'Qu’est-ce que le code de l’indigénat ?', choices: ['Un ensemble de règles discriminatoires pour les colonisés', 'Un code civil', 'Un droit de vote', 'Un statut des colons'], answer: 0 },
        { question: 'Quelle loi autorise les syndicats ?', choices: ['La loi du 21 mars 1884', 'La loi de 1901', 'La loi de 1898', 'La loi de 1910'], answer: 0 },
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Complétez',
      text: 'La {{loi de 1905}} sépare les {{Églises}} et l’{{État}}. L’affaire {{Dreyfus}} débute en {{1894}}. Jules {{Ferry}} fait voter en {{1882}} l’école {{obligatoire}} et {{laïque}}. En 1881, la {{Tunisie}} devient un protectorat français.',
    },
    {
      type: 'reveal',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'La République s’enracine entre 1870 et 1914 par ses institutions, ses lois et la victoire sur ses contestataires.',
            'Elle construit un empire colonial justifié par la « mission civilisatrice », mais fondé sur l’inégalité.',
            'La société évolue : industrialisation, mouvement ouvrier, école, mais ruralité et inégalités persistent.',
          ],
        },
      ],
    },
  ],
}

export default chapter
