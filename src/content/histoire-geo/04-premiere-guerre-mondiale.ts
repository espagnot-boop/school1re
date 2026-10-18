import type { Chapter } from '../types'

const chapter: Chapter = {
  id: 'premiere-guerre-mondiale',
  subject: 'histoire-geo',
  order: 4,
  title: 'La Première Guerre mondiale : le « suicide de l’Europe » et la fin des empires européens',
  theme: 'Histoire — Thème 4',
  summary:
    'Causes et déclenchement de la guerre (1914), guerre totale (combattants, civils, économie), génocide des Arméniens, révolutions russes, sortie de guerre et traités de 1919-1920 qui redessinent l’Europe et mettent fin à quatre empires.',
  duration: '5 semaines',
  objectives: [
    'Expliquer les causes profondes et immédiates du déclenchement de la guerre en 1914.',
    'Décrire les grandes phases militaires (1914-1918) et le caractère mondial du conflit.',
    'Montrer en quoi la guerre est « totale » : expérience des combattants, mobilisation de l’économie et de la société, violences contre les civils.',
    'Expliquer le génocide des Arméniens (1915-1916) et la notion de génocide.',
    'Comprendre le rôle des révolutions russes de 1917 et de l’entrée en guerre des États-Unis dans l’issue du conflit.',
    'Analyser la sortie de guerre : armistice du 11 novembre 1918, traités de 1919-1920, SDN, disparition des empires, bilan humain et mémoire.',
    'Savoir dater et situer les événements majeurs et analyser un document de guerre (ordre du jour, lettre, affiche, photographie).',
  ],
  keywords: [
    'Triple-Alliance',
    'Triple-Entente',
    'Sarajevo',
    'Union sacrée',
    'guerre de tranchées',
    'Verdun',
    'guerre totale',
    'économie de guerre',
    'mutineries',
    'génocide des Arméniens',
    'révolution russe',
    'armistice',
    'traité de Versailles',
    'Société des Nations',
    'brutalisation',
  ],

  fiche: [
    { type: 'h2', text: 'L’essentiel du thème 4' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Problématique',
      content: [
        {
          type: 'p',
          text: 'Pourquoi la Grande Guerre, partie d’un conflit balkanique, devient-elle un conflit mondial et total qui ruine l’Europe, détruit quatre empires (allemand, austro-hongrois, russe, ottoman) et laisse un ordre international fragile ?',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Date', 'Événement'],
      rows: [
        ['28 juin 1914', 'Attentat de Sarajevo : assassinat de l’archiduc François-Ferdinand'],
        ['28 juillet 1914', 'L’Autriche-Hongrie déclare la guerre à la Serbie'],
        ['1er-4 août 1914', 'Mobilisations et déclarations de guerre ; invasion de la Belgique ; Union sacrée (4 août)'],
        ['6-12 septembre 1914', 'Bataille de la Marne : fin de la guerre de mouvement'],
        ['22 avril 1915', 'Premier emploi massif de gaz (Ypres)'],
        ['24 avril 1915', 'Début du génocide des Arméniens'],
        ['21 février – décembre 1916', 'Bataille de Verdun'],
        ['1er juillet – 18 novembre 1916', 'Bataille de la Somme'],
        ['6 avril 1917', 'Entrée en guerre des États-Unis'],
        ['Avril-juin 1917', 'Chemin des Dames et mutineries'],
        ['Mars et novembre 1917', 'Révolutions russes (février, octobre)'],
        ['3 mars 1918', 'Traité de Brest-Litovsk (Russie-Allemagne)'],
        ['11 novembre 1918', 'Armistice de Rethondes'],
        ['28 juin 1919', 'Traité de Versailles'],
        ['1919-1920', 'Traités de Saint-Germain, Neuilly, Trianon, Sèvres ; naissance de la SDN (janvier 1920)'],
      ],
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Triple-Alliance (1882)', text: 'Allemagne, Autriche-Hongrie, Italie (l’Italie reste neutre en 1914 et rejoint l’Entente en 1915). L’Empire ottoman et la Bulgarie rejoignent les Empires centraux.', icon: 'Shield' },
        { title: 'Triple-Entente (1907)', text: 'France, Royaume-Uni, Russie, puis Belgique, Serbie, Japon, Italie (1915), Roumanie (1916), États-Unis (1917).', icon: 'Swords' },
      ],
    },
    {
      type: 'keyvalue',
      items: [
        { key: 'Guerre totale', value: 'Conflit qui mobilise toutes les ressources (humaines, économiques, morales) des États et touche les civils.' },
        { key: 'Union sacrée', value: 'Rassemblement des partis et des Français derrière le gouvernement dès août 1914.' },
        { key: 'Brutalisation', value: 'Banalisation de la violence induite par la guerre (G. Mosse), qui marque les sociétés d’après-guerre.' },
        { key: 'Génocide', value: 'Extermination planifiée d’un groupe humain en raison de son identité ; mot forgé par Raphael Lemkin en 1944.' },
        { key: 'Diktat', value: 'Terme employé par les Allemands pour désigner le traité de Versailles, jugé imposé.' },
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
            'L’**armistice** (11 novembre 1918) met fin aux combats ; la **paix** est conclue ensuite par des **traités** (Versailles, 28 juin 1919).',
            'La Russie sort de la guerre par **Brest-Litovsk** (3 mars 1918), avant la défaite allemande.',
            'Quatre empires disparaissent : **allemand, austro-hongrois, russe, ottoman** (pas l’empire britannique ni français).',
          ],
        },
      ],
    },
  ],

  cours: [
    { type: 'h2', text: 'Introduction' },
    {
      type: 'p',
      text: 'En 1914, l’Europe domine le monde par sa puissance économique, financière, coloniale, culturelle. Quatre ans plus tard, elle est ruinée et meurtrie : environ **9 millions de soldats** et plusieurs millions de civils sont morts, des États ont disparu. Le poète Paul Valéry écrit en 1919 : « Nous autres, civilisations, nous savons maintenant que nous sommes mortelles. » On a pu parler de **« suicide de l’Europe »**. Comment la guerre éclate-t-elle ? En quoi est-elle une guerre totale ? Comment s’achève-t-elle et quel monde laisse-t-elle ?',
    },

    { type: 'h2', text: 'I. Les origines et l’entrée en guerre (1914)' },
    { type: 'h3', text: 'A. Une Europe divisée en deux blocs' },
    {
      type: 'svg',
      caption: 'Les systèmes d’alliances en 1914',
      svg: `<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="20" y="20" width="280" height="190" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2"/>
<text x="160" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Triple-Alliance (1882)</text>
<text x="160" y="70" text-anchor="middle" fill="currentColor">Allemagne (Guillaume II)</text>
<text x="160" y="90" text-anchor="middle" fill="currentColor">Autriche-Hongrie (François-Joseph)</text>
<text x="160" y="110" text-anchor="middle" fill="currentColor">Italie (neutre en 1914)</text>
<text x="160" y="140" text-anchor="middle" fill="currentColor" opacity="0.8">+ Empire ottoman (oct.-nov. 1914)</text>
<text x="160" y="158" text-anchor="middle" fill="currentColor" opacity="0.8">+ Bulgarie (octobre 1915)</text>
<text x="160" y="190" text-anchor="middle" fill="currentColor" font-style="italic">« Empires centraux »</text>
<rect x="400" y="20" width="280" height="190" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2"/>
<text x="540" y="45" text-anchor="middle" fill="currentColor" font-weight="bold">Triple-Entente (1907)</text>
<text x="540" y="70" text-anchor="middle" fill="currentColor">France (alliance franco-russe 1892-94)</text>
<text x="540" y="90" text-anchor="middle" fill="currentColor">Royaume-Uni (Entente cordiale 1904)</text>
<text x="540" y="110" text-anchor="middle" fill="currentColor">Russie</text>
<text x="540" y="140" text-anchor="middle" fill="currentColor" opacity="0.8">+ Serbie, Belgique, Japon (1914)</text>
<text x="540" y="158" text-anchor="middle" fill="currentColor" opacity="0.8">+ Italie (1915), Roumanie (1916), É.-U. (1917)</text>
<text x="540" y="190" text-anchor="middle" fill="currentColor" font-style="italic">« Alliés »</text>
<line x1="300" y1="115" x2="400" y2="115" stroke="currentColor" stroke-dasharray="5 4"/>
<text x="350" y="108" text-anchor="middle" fill="currentColor" font-size="11">rivalités</text>
<text x="350" y="240" text-anchor="middle" fill="currentColor" opacity="0.8">Tensions : course aux armements, rivalités coloniales, nationalismes, revanche (Alsace-Lorraine)</text>
</svg>`,
    },
    {
      type: 'list',
      items: [
        '**Rivalités économiques et coloniales** : l’Allemagne, devenue première puissance industrielle d’Europe, conteste la domination britannique (flotte) et réclame une « place au soleil » ; crises marocaines (Tanger 1905, Agadir 1911).',
        '**Nationalismes** : volonté de revanche française (Alsace-Lorraine perdue en 1871), pangermanisme, panslavisme (la Russie se pose en protectrice des Slaves), revendications nationales dans l’Empire austro-hongrois.',
        '**Course aux armements** et militarisme ; plans de guerre rigides (plan Schlieffen allemand : vaincre d’abord la France en passant par la Belgique, puis se retourner contre la Russie ; plan XVII français).',
        '**Poudrière balkanique** : déclin de l’Empire ottoman, guerres balkaniques de 1912-1913, affirmation de la Serbie soutenue par la Russie, contre l’Autriche-Hongrie.',
      ],
    },
    { type: 'h3', text: 'B. L’engrenage de l’été 1914' },
    {
      type: 'timeline',
      events: [
        { date: '28 juin 1914', title: 'Attentat de Sarajevo', text: 'L’archiduc François-Ferdinand, héritier du trône austro-hongrois, est assassiné par le nationaliste serbe de Bosnie Gavrilo Princip.' },
        { date: '23 juillet 1914', title: 'Ultimatum à la Serbie', text: 'L’Autriche-Hongrie, soutenue par l’Allemagne (« chèque en blanc »), présente un ultimatum inacceptable.' },
        { date: '28 juillet 1914', title: 'Guerre à la Serbie', text: 'L’Autriche-Hongrie déclare la guerre à la Serbie.' },
        { date: '30-31 juillet 1914', title: 'Mobilisation russe', text: 'La Russie mobilise (30 juillet) ; l’Allemagne lance un ultimatum. Assassinat de Jean Jaurès le 31 juillet.' },
        { date: '1er août 1914', title: 'Mobilisation générale', text: 'Mobilisation générale en France et en Allemagne ; l’Allemagne déclare la guerre à la Russie.' },
        { date: '3 août 1914', title: 'L’Allemagne déclare la guerre à la France', text: 'Puis envahit la Belgique neutre le 4 août.' },
        { date: '4 août 1914', title: 'Entrée du Royaume-Uni', text: 'Le Royaume-Uni déclare la guerre à l’Allemagne après la violation de la neutralité belge ; « Union sacrée » en France.' },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Causes lointaines et causes immédiates',
      content: [
        {
          type: 'p',
          text: 'Distinguez toujours les **causes profondes** (rivalités, nationalismes, alliances, armements) de l’**étincelle** (Sarajevo) et de l’**engrenage** des alliances et des mobilisations (juillet-août 1914). Les gouvernements pensent à une guerre courte : « les soldats seront rentrés pour Noël ».',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'L’Union sacrée',
      content: [
        {
          type: 'p',
          text: 'Le 4 août 1914, le président **Raymond Poincaré** adresse un message au Parlement : « La France sera héroïquement défendue par tous ses fils, dont rien ne brisera devant l’ennemi l’union sacrée. » Les socialistes entrent au gouvernement (août 1914), les syndicats renoncent à la grève, les catholiques et les laïcs s’unissent. Mais l’unanimité est relative et se fissure à partir de 1916-1917.',
        },
      ],
    },

    { type: 'h2', text: 'II. Les grandes phases de la guerre (1914-1918)' },
    {
      type: 'steps',
      items: [
        { title: '1914 : la guerre de mouvement et son échec', text: 'L’offensive allemande à travers la Belgique est arrêtée à la **Marne** (6-12 septembre 1914, victoire de Joffre et Gallieni ; épisode des « taxis de la Marne »). La « course à la mer » conduit à un front continu de la mer du Nord à la Suisse. Sur le front de l’Est, victoire allemande de Tannenberg (août 1914).' },
        { title: '1915 : la guerre s’enlise et s’étend', text: 'Offensives meurtrières et vaines (Artois, Champagne). Emploi des gaz à Ypres (22 avril 1915). Échec de l’expédition alliée des **Dardanelles** (Gallipoli, 1915). L’**Italie** rejoint l’Entente (mai 1915), la **Bulgarie** les Empires centraux (octobre 1915). Génocide des Arméniens (à partir d’avril 1915).' },
        { title: '1916 : les batailles d’usure', text: '**Verdun** (21 février – décembre 1916) : offensive allemande de Falkenhayn, résistance française dirigée par Pétain (« Voie sacrée »), environ 300 000 morts de part et d’autre. **Somme** (1er juillet – novembre 1916) : offensive franco-britannique, premier emploi des chars par les Britanniques en septembre ; plus d’un million de victimes ; bataille navale du Jutland (mai 1916).' },
        { title: '1917 : l’année du basculement', text: 'Guerre sous-marine à outrance (février) ; **entrée en guerre des États-Unis** (6 avril) ; échec de l’offensive Nivelle au **Chemin des Dames** (16 avril) suivi des **mutineries** (mai-juin) ; Pétain remplace Nivelle et rétablit la discipline en améliorant les conditions de vie ; **révolutions russes** (février, octobre) ; **Clemenceau** président du Conseil (novembre 1917, « Je fais la guerre »).' },
        { title: '1918 : la victoire des Alliés', text: 'Traité de **Brest-Litovsk** (3 mars) : la Russie bolchevique sort de la guerre. Grande offensive allemande de printemps (à partir du 21 mars) qui échoue ; commandement unique confié à **Foch** (avril) ; seconde bataille de la Marne (juillet) ; contre-offensive alliée (8 août 1918, « jour noir » de l’armée allemande). Chute des alliés de l’Allemagne : armistice avec la Bulgarie (29 septembre), l’Empire ottoman (30 octobre), l’Autriche-Hongrie (3 novembre).' },
      ],
    },
    {
      type: 'svg',
      caption: 'Schéma du front occidental (1914-1918) : principaux lieux de bataille',
      svg: `<svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<rect x="10" y="10" width="500" height="320" fill="none" stroke="currentColor" opacity="0.3"/>
<path d="M 130 20 C 150 60, 190 70, 200 110 C 215 150, 210 170, 240 195 C 260 215, 280 215, 300 245 C 320 275, 370 290, 400 320" fill="none" stroke="hsl(0 84% 60%)" stroke-width="3" stroke-dasharray="8 4"/>
<text x="160" y="35" fill="currentColor" font-size="11">Mer du Nord</text>
<g fill="currentColor">
<circle cx="150" cy="70" r="4"/><text x="160" y="74">Ypres (gaz, 1915)</text>
<circle cx="195" cy="130" r="4"/><text x="205" y="134">Somme (1916)</text>
<circle cx="215" cy="175" r="4"/><text x="225" y="179">Chemin des Dames (1917)</text>
<circle cx="225" cy="215" r="4"/><text x="235" y="219">Marne (1914, 1918)</text>
<circle cx="285" cy="205" r="4"/><text x="295" y="209">Verdun (1916)</text>
<circle cx="330" cy="268" r="4"/><text x="340" y="272">Vosges</text>
<circle cx="390" cy="318" r="4"/><text x="320" y="326">Suisse</text>
</g>
<text x="60" y="190" fill="hsl(217 91% 60%)" font-weight="bold">Alliés</text>
<text x="400" y="150" fill="hsl(0 84% 60%)" font-weight="bold">Allemands</text>
<text x="30" y="270" fill="currentColor" opacity="0.8">Paris</text>
<rect x="55" y="275" width="8" height="8" fill="currentColor" opacity="0.7"/>
<text x="20" y="320" fill="currentColor" font-size="11" opacity="0.7">Front stabilisé de fin 1914 à mars 1918</text>
</svg>`,
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Une guerre mondiale',
      content: [
        {
          type: 'list',
          items: [
            '**Fronts multiples** : occidental, oriental, Balkans, Italie (Caporetto, 24 octobre 1917), Dardanelles, Proche-Orient, colonies africaines et Pacifique (Japon prend les possessions allemandes en Chine et dans le Pacifique), Atlantique (sous-marins).',
            '**Puissances extra-européennes** : États-Unis (1917), Japon (1914), Empire britannique (Canada, Australie, Nouvelle-Zélande, Inde, Afrique du Sud), troupes coloniales françaises (plus de 500 000 soldats des colonies mobilisés).',
            'La **guerre sous-marine** (naufrage du Lusitania, 7 mai 1915 ; guerre à outrance dès février 1917) pousse les États-Unis dans la guerre.',
          ],
        },
      ],
    },

    { type: 'h2', text: 'III. Une guerre totale' },
    { type: 'h3', text: 'A. L’expérience des combattants' },
    {
      type: 'p',
      text: 'La France mobilise environ **8,4 millions** d’hommes. Les « **poilus** » vivent dans les tranchées : froid, boue, rats, poux, bruit de l’artillerie, peur, attente. L’**artillerie** cause la majorité des pertes. De nouvelles armes sont utilisées : mitrailleuse, gaz de combat (Ypres, 22 avril 1915), lance-flammes, chars, avions, sous-marins. Les assauts sont souvent vains. La discipline est stricte : conseils de guerre, **fusillés pour l’exemple**. Les mutineries du printemps 1917 (refus de monter à l’assaut) conduisent à des centaines de condamnations et à environ **une cinquantaine d’exécutions**, mais Pétain améliore les permissions et la nourriture. Le courrier, les journaux de tranchées, la fraternité entre soldats soutiennent le moral ; les « gueules cassées » incarnent les blessures de la guerre.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Verdun, « lieu de mémoire »',
      content: [
        {
          type: 'p',
          text: 'Verdun (21 février – 19 décembre 1916) devient le symbole de la résistance française et du sacrifice. Le principe de la « noria » fait passer la majeure partie de l’armée française dans cet enfer ; la **Voie sacrée** (route Bar-le-Duc – Verdun) ravitaille la bataille. Le fort de Douaumont, pris le 25 février, est repris en octobre. Pétain lance : « On les aura ! » (ordre du jour du 10 avril 1916). Le bilan : environ 300 000 morts et disparus (franco-allemands), un paysage lunaire dont une partie est devenue « zone rouge ».',
        },
      ],
    },
    { type: 'h3', text: 'B. La mobilisation de l’économie et de la société' },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'L’économie de guerre', text: 'État organisateur : ministère de l’Armement (Albert Thomas), production massive d’obus, réquisitions, rationnement, emprunts nationaux, inflation, impôt sur le revenu (1914 / 1917).', icon: 'Factory' },
        { title: 'Les femmes', text: '« Munitionnettes », remplacent les hommes aux champs, à l’usine, dans les transports, infirmières. Pas de droits politiques en 1918, mais une place nouvelle dans la société.', icon: 'Users' },
        { title: 'La propagande', text: 'Presse censurée, « bourrage de crâne », affiches, emprunts, culture de guerre : haine de l’ennemi, patriotisme.', icon: 'Megaphone' },
        { title: 'Les colonies', text: 'Soldats (tirailleurs sénégalais, algériens, malgaches, indochinois), travailleurs coloniaux et chinois en métropole, ressources.', icon: 'Globe2' },
      ],
    },
    { type: 'h3', text: 'C. La violence contre les civils' },
    {
      type: 'list',
      items: [
        '**Atrocités et occupation** : en août-septembre 1914, les troupes allemandes tuent environ 6 500 civils belges et français (Dinant, Louvain) ; le Nord de la France et la Belgique sont occupés (travail forcé, réquisitions, déportations).',
        '**Bombardements** : de Reims, de Paris (la « grosse Bertha » en 1918), zeppelins sur Londres.',
        '**Blocus et privations** : le blocus des Alliés provoque une famine en Allemagne (« hiver des navets » 1916-1917).',
        '**Prisonniers** : environ 7 millions de prisonniers dans l’ensemble des pays en guerre.',
        '**Déportations et massacres de masse** à l’Est et dans l’Empire ottoman.',
      ],
    },
    { type: 'h3', text: 'D. Le génocide des Arméniens (1915-1916)' },
    {
      type: 'p',
      text: 'L’Empire ottoman, allié de l’Allemagne depuis octobre-novembre 1914, subit une défaite face à la Russie (hiver 1914-1915). Le gouvernement des **Jeunes-Turcs** (Comité Union et Progrès) accuse les **Arméniens** (chrétiens, environ 2 millions dans l’Empire) de trahison. Le **24 avril 1915**, les élites arméniennes de Constantinople sont arrêtées (date de commémoration). Hommes enrôlés et exécutés, femmes, enfants et vieillards **déportés** vers le désert de Syrie, marches de la mort, massacres, famine : environ **1 million à 1,2 million** d’Arméniens (selon les estimations, 1 à 1,5 million) sont exterminés entre 1915 et 1916. Il s’agit d’une extermination planifiée d’un peuple : c’est le **premier génocide du XXe siècle**. Des témoins (consuls, missionnaires, ambassadeur américain Morgenthau) alertent l’opinion ; la Turquie actuelle refuse le terme de génocide, reconnu par de nombreux États et historiens (la France l’a reconnu par la loi du 29 janvier 2001). Le mot « génocide » sera créé en 1944 par Raphael Lemkin, qui s’est inspiré de ce massacre.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Brutalisation',
      content: [
        {
          type: 'p',
          text: 'Pour l’historien George Mosse, la guerre a « brutalisé » les sociétés européennes : habitude de la violence, culte du soldat, haine de l’ennemi. Cette notion éclaire la violence politique d’après-guerre (fascismes, nazisme).',
        },
      ],
    },

    { type: 'h2', text: 'IV. Révolutions russes et sortie de guerre' },
    { type: 'h3', text: 'A. Les révolutions russes de 1917' },
    {
      type: 'p',
      text: 'Épuisée par la guerre (défaites, pertes, pénuries), la Russie connaît en **février 1917** (23 février du calendrier julien = 8 mars) une insurrection à Petrograd ; le tsar **Nicolas II abdique** (15 mars). Un Gouvernement provisoire poursuit la guerre. Les bolcheviks de **Lénine**, qui réclament « la paix, la terre, le pain », prennent le pouvoir lors de la **révolution d’Octobre** (25 octobre julien = **7 novembre 1917**). Ils signent un armistice puis le **traité de Brest-Litovsk** (3 mars 1918) : la Russie perd la Pologne, les pays baltes, l’Ukraine… L’Entente intervient ensuite contre les bolcheviks dans la guerre civile (1918-1921).',
    },
    { type: 'h3', text: 'B. L’entrée en guerre des États-Unis' },
    {
      type: 'p',
      text: 'Le **6 avril 1917**, les États-Unis du président **Woodrow Wilson**, indignés par la guerre sous-marine à outrance, déclarent la guerre à l’Allemagne. Ils apportent des ressources industrielles et financières et, en 1918, plus d’un million de soldats (le corps expéditionnaire de Pershing). Le **8 janvier 1918**, Wilson présente ses **Quatorze points** : droit des peuples à disposer d’eux-mêmes, liberté des mers, création d’une Société des Nations.',
    },
    { type: 'h3', text: 'C. La fin des combats' },
    {
      type: 'p',
      text: 'Après l’échec de l’offensive allemande du printemps 1918, la contre-offensive alliée (8 août) fait reculer l’armée allemande. La Bulgarie, l’Empire ottoman, l’Autriche-Hongrie signent des armistices en octobre-novembre. En Allemagne, une mutinerie de marins à Kiel (début novembre) déclenche la **révolution allemande** ; l’empereur **Guillaume II abdique le 9 novembre** et la république est proclamée. L’**armistice** est signé le **11 novembre 1918** à 5 h 15 dans un wagon à **Rethondes** (forêt de Compiègne) ; les combats cessent à 11 h. Les troupes allemandes doivent évacuer les territoires occupés (Belgique, France, Alsace-Moselle) et la rive gauche du Rhin.',
    },

    { type: 'h2', text: 'V. Les traités de paix et la fin des empires' },
    { type: 'h3', text: 'A. La conférence de la paix de Paris (1919)' },
    {
      type: 'p',
      text: 'La conférence s’ouvre à Paris le **18 janvier 1919** sans les vaincus ni la Russie. Trois grands dirigent : **Wilson** (États-Unis, idéaliste), **Clemenceau** (France, qui veut des garanties de sécurité), **Lloyd George** (Royaume-Uni, plus modéré). Le **traité de Versailles** est signé le **28 juin 1919** dans la galerie des Glaces, cinq ans jour pour jour après Sarajevo.',
    },
    {
      type: 'table',
      headers: ['Traité', 'Date', 'Pays concerné', 'Points essentiels'],
      rows: [
        ['Versailles', '28 juin 1919', 'Allemagne', 'Perte de territoires (Alsace-Moselle à la France, corridor de Dantzig à la Pologne, colonies), armée limitée à 100 000 hommes, Rhénanie démilitarisée, réparations, article 231 (responsabilité de la guerre)'],
        ['Saint-Germain-en-Laye', '10 septembre 1919', 'Autriche', 'Disparition de l’Autriche-Hongrie ; interdiction de l’Anschluss'],
        ['Neuilly-sur-Seine', '27 novembre 1919', 'Bulgarie', 'Pertes territoriales'],
        ['Trianon', '4 juin 1920', 'Hongrie', 'Perte des deux tiers du territoire'],
        ['Sèvres', '10 août 1920', 'Empire ottoman', 'Démembrement ; remplacé par le traité de Lausanne (24 juillet 1923) après la victoire de Mustafa Kemal'],
      ],
    },
    {
      type: 'quote',
      text: 'Les Gouvernements alliés et associés déclarent, et l’Allemagne reconnaît, que l’Allemagne et ses alliés sont responsables, pour les avoir causés, de toutes les pertes et de tous les dommages subis par les Gouvernements alliés et associés […] du fait de la guerre qui leur a été imposée par l’agression de l’Allemagne et de ses alliés.',
      source: 'Traité de Versailles, article 231 (1919)',
    },
    { type: 'h3', text: 'B. Une nouvelle carte de l’Europe' },
    {
      type: 'svg',
      caption: 'Schéma : de quatre empires à de nouveaux États (1914 → 1919-1923)',
      svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<text x="110" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">1914 : quatre empires</text>
<text x="590" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">1919-1923 : États successeurs</text>
<g fill="none" stroke-width="1.5">
<rect x="10" y="35" width="200" height="55" stroke="hsl(0 84% 60%)"/>
<rect x="10" y="105" width="200" height="55" stroke="hsl(25 95% 53%)"/>
<rect x="10" y="175" width="200" height="55" stroke="hsl(263 70% 60%)"/>
<rect x="10" y="245" width="200" height="55" stroke="hsl(142 71% 45%)"/>
<rect x="400" y="35" width="290" height="55" stroke="hsl(0 84% 60%)"/>
<rect x="400" y="105" width="290" height="55" stroke="hsl(25 95% 53%)"/>
<rect x="400" y="175" width="290" height="55" stroke="hsl(263 70% 60%)"/>
<rect x="400" y="245" width="290" height="55" stroke="hsl(142 71% 45%)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="110" y="58" font-weight="bold">Empire allemand</text><text x="110" y="76">Guillaume II (abdique 9 nov. 1918)</text>
<text x="110" y="128" font-weight="bold">Empire austro-hongrois</text><text x="110" y="146">Charles Ier (nov. 1918)</text>
<text x="110" y="198" font-weight="bold">Empire russe</text><text x="110" y="216">Nicolas II (mars 1917)</text>
<text x="110" y="268" font-weight="bold">Empire ottoman</text><text x="110" y="286">Mehmed VI (1922)</text>
<text x="545" y="58" font-weight="bold">République de Weimar</text><text x="545" y="76">Perte de territoires, Pologne rétablie</text>
<text x="545" y="128" font-weight="bold">Autriche, Hongrie, Tchécoslovaquie, Yougoslavie</text><text x="545" y="146">+ territoires à Pologne, Roumanie, Italie</text>
<text x="545" y="198" font-weight="bold">URSS (1922), Finlande, pays baltes</text><text x="545" y="216">Estonie, Lettonie, Lituanie, Pologne</text>
<text x="545" y="268" font-weight="bold">République de Turquie (1923)</text><text x="545" y="286">Mandats britannique et français au Proche-Orient</text>
</g>
<g stroke="currentColor"><line x1="210" y1="62" x2="400" y2="62"/><line x1="210" y1="132" x2="400" y2="132"/><line x1="210" y1="202" x2="400" y2="202"/><line x1="210" y1="272" x2="400" y2="272"/></g>
</svg>`,
    },
    {
      type: 'list',
      items: [
        '**Application du droit des peuples à disposer d’eux-mêmes en Europe** : naissance ou renaissance de la Pologne, de la Tchécoslovaquie, du royaume des Serbes, Croates et Slovènes (Yougoslavie), de la Finlande, de l’Estonie, de la Lettonie, de la Lituanie, de l’Autriche et de la Hongrie. Mais ces États comptent des minorités nombreuses (Allemands des Sudètes, Hongrois de Roumanie…) : source de tensions.',
        '**Proche-Orient** : l’Empire ottoman est démembré ; mandats de la SDN confiés au Royaume-Uni (Irak, Palestine, Transjordanie) et à la France (Syrie, Liban). La République de Turquie est proclamée en 1923 par Mustafa Kemal.',
        '**Frustrations** : l’Allemagne dénonce un « diktat » ; l’Italie (« victoire mutilée »), la Hongrie, la Chine, les peuples colonisés (qui n’obtiennent pas l’autodétermination) sont déçus.',
      ],
    },
    { type: 'h3', text: 'C. La Société des Nations (SDN)' },
    {
      type: 'p',
      text: 'Créée en 1919 (Pacte inclus dans le traité de Versailles) et siégeant à Genève (première réunion en janvier 1920), la SDN a pour but d’assurer la sécurité collective et la paix par l’arbitrage et le désarmement. Elle est affaiblie dès le départ : les **États-Unis**, dont le Sénat refuse de ratifier le traité (mars 1920), n’y entrent pas ; l’Allemagne et l’URSS en sont d’abord exclues ; la SDN n’a pas de force armée.',
    },

    { type: 'h2', text: 'VI. Bilan humain, économique et mémoire' },
    {
      type: 'table',
      headers: ['Pays', 'Morts (militaires, estimations)', 'Remarques'],
      rows: [
        ['France', 'environ 1,4 million', 'Environ 4 millions de blessés, dont environ 1 million d’invalides (« gueules cassées ») ; 10 départements dévastés, perte de 10 % des actifs masculins'],
        ['Allemagne', 'environ 2 millions', 'Famine, révolution'],
        ['Russie', 'environ 1,7 million', 'Révolutions, guerre civile'],
        ['Royaume-Uni', 'environ 900 000', 'Avec l’Empire : plus d’un million'],
        ['Autriche-Hongrie', 'environ 1,1 million', 'Éclatement'],
        ['États-Unis', 'environ 116 000', 'Engagés surtout en 1918'],
        ['Total', 'environ 9 à 10 millions de soldats', 'Plusieurs millions de civils (famine, génocide, épidémies)'],
      ],
    },
    {
      type: 'p',
      text: 'La guerre affaiblit durablement l’Europe : endettement (les États-Unis deviennent le premier créancier du monde), inflation, destruction de régions entières, **grippe espagnole** (1918-1919) qui tue des dizaines de millions de personnes. Le centre de gravité économique se déplace vers les États-Unis. Politiquement, la guerre entraîne la montée du communisme (URSS), des fascismes, et laisse un goût de revanche.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Mémoire et commémorations',
      content: [
        {
          type: 'list',
          items: [
            '**Monuments aux morts** dans presque chaque commune de France (années 1920) ; associations d’anciens combattants.',
            '**Tombe du Soldat inconnu** sous l’Arc de Triomphe : inhumé le 28 janvier 1921 (le choix du corps a lieu à Verdun en novembre 1920) ; flamme du souvenir (1923).',
            '**11 novembre** : jour férié commémoratif en France depuis 1922.',
            'Une « culture de guerre » (Annette Becker, Stéphane Audoin-Rouzeau) et un pacifisme (« Plus jamais ça ») durable.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : analyser un document de guerre',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Nature et auteur', text: 'Ordre du jour d’un général, lettre de poilu, affiche, photographie… Qui l’a produit, pour qui ?' },
            { title: 'Date et contexte', text: 'Bataille, moment de la guerre, enjeu précis.' },
            { title: 'Contenu', text: 'Idées principales, vocabulaire (sacrifice, devoir, ennemi), image donnée de la guerre.' },
            { title: 'Critique', text: 'Propagande ? Censure ? Point de vue limité ? Que ne dit pas le document ?' },
          ],
        },
      ],
    },
  ],

  exercices: [
    {
      id: 'ex-reperes-1914',
      title: 'Les premiers jours de la guerre',
      difficulty: 1,
      duration: 10,
      tags: ['repères'],
      statement: [
        { type: 'p', text: 'Remettez dans l’ordre : (a) l’Allemagne déclare la guerre à la France ; (b) attentat de Sarajevo ; (c) l’Autriche-Hongrie déclare la guerre à la Serbie ; (d) le Royaume-Uni entre en guerre ; (e) mobilisation générale en France ; (f) bataille de la Marne. Donnez les dates.' },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '(b) Attentat de Sarajevo : 28 juin 1914.',
            '(c) Guerre de l’Autriche-Hongrie à la Serbie : 28 juillet 1914.',
            '(e) Mobilisation générale en France : 1er août 1914.',
            '(a) L’Allemagne déclare la guerre à la France : 3 août 1914.',
            '(d) Le Royaume-Uni entre en guerre : 4 août 1914.',
            '(f) Bataille de la Marne : 6-12 septembre 1914.',
          ],
        },
      ],
    },
    {
      id: 'ex-causes',
      title: 'Pourquoi la guerre éclate-t-elle ?',
      difficulty: 2,
      duration: 25,
      tags: ['question problématisée', 'rédaction'],
      statement: [
        { type: 'p', text: 'Rédigez un paragraphe argumenté répondant à : **« Pourquoi l’assassinat de l’archiduc François-Ferdinand conduit-il à une guerre européenne en août 1914 ? »**' },
      ],
      hints: ['Causes lointaines (alliances, nationalismes, armements), puis engrenage de juillet 1914.'],
      solution: [
        { type: 'p', text: 'L’attentat de Sarajevo (28 juin 1914) n’est que l’**étincelle** : les causes profondes tiennent aux rivalités entre puissances (économiques, coloniales — crises marocaines de 1905 et 1911), à l’exacerbation des nationalismes (revanche française, pangermanisme, panslavisme, revendications des peuples de l’Autriche-Hongrie) et à la course aux armements. L’Europe est divisée en deux systèmes d’alliances : Triple-Alliance (Allemagne, Autriche-Hongrie, Italie) et Triple-Entente (France, Royaume-Uni, Russie).' },
        { type: 'p', text: 'Après l’attentat, l’Autriche-Hongrie, assurée du soutien allemand, adresse à la Serbie un ultimatum (23 juillet) puis lui déclare la guerre (28 juillet). La Russie, protectrice des Slaves, mobilise (30 juillet), ce qui entraîne l’Allemagne, puis la France. Les plans de guerre rigides (plan Schlieffen) conduisent l’Allemagne à attaquer la France par la Belgique neutre (4 août), ce qui provoque l’entrée en guerre du Royaume-Uni. Par un jeu d’**engrenage**, un conflit local devient européen puis mondial.' },
      ],
    },
    {
      id: 'ex-verdun',
      title: 'Document : Joffre et Pétain',
      difficulty: 2,
      duration: 25,
      tags: ['document', 'combattants'],
      statement: [
        {
          type: 'quote',
          text: 'Au moment où s’engage une bataille d’où dépend le salut du pays, il importe de rappeler à tous que le moment n’est plus de regarder en arrière ; tous les efforts doivent être employés à attaquer et à refouler l’ennemi. Une troupe qui ne pourrait plus avancer devra, coûte que coûte, garder le terrain conquis et se faire tuer sur place plutôt que de reculer.',
          author: 'Général Joffre',
          source: 'Ordre du jour du 6 septembre 1914',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Présentez le document et son contexte.',
            'Quelle est l’intention du général ? Quelle conception de la guerre ce texte reflète-t-il ?',
            'Quelles sont les limites de ce document pour comprendre l’expérience des soldats ?',
          ],
        },
      ],
      hints: ['La veille de la bataille de la Marne ; Joffre commande l’armée française.'],
      solution: [
        { type: 'p', text: '**1.** Il s’agit d’un ordre du jour du général Joffre, commandant en chef des armées françaises, daté du 6 septembre 1914, jour du début de la bataille de la Marne. Après la retraite d’août et l’invasion de la Belgique, l’armée française se prépare à contre-attaquer pour arrêter l’avance allemande vers Paris.' },
        { type: 'p', text: '**2.** Joffre veut galvaniser les soldats et imposer une discipline absolue : il ordonne l’attaque et interdit tout recul (« se faire tuer sur place »). Le texte reflète une conception offensive de la guerre, où le sacrifice individuel doit servir le « salut du pays », cohérente avec l’Union sacrée et la guerre de mouvement du début.' },
        { type: 'p', text: '**3.** C’est un texte de commandement, qui exprime le point de vue de l’état-major et non l’expérience vécue par les combattants (peur, fatigue, mort de masse). Il a une visée de mobilisation et de discipline. Il faut le confronter à d’autres sources : lettres, carnets de poilus, témoignages, photographies.' },
      ],
    },
    {
      id: 'ex-guerre-totale',
      title: 'Montrer que la guerre est totale',
      difficulty: 2,
      duration: 30,
      tags: ['rédaction', 'guerre totale'],
      statement: [
        { type: 'p', text: 'En vous appuyant sur trois exemples précis (économie, société, violences), montrez que la Première Guerre mondiale est une **guerre totale**.' },
      ],
      hints: ['Économie de guerre (Albert Thomas), femmes, propagande, génocide des Arméniens, occupation.'],
      solution: [
        { type: 'p', text: 'Une guerre est « totale » quand elle mobilise toutes les ressources d’un pays et ne distingue plus combattants et civils. **1. L’économie** est tout entière tournée vers la guerre : l’État dirige la production (ministère de l’Armement d’Albert Thomas, production d’obus), rationne, réquisitionne, finance par des emprunts. **2. La société** est mobilisée : les femmes remplacent les hommes à l’usine et aux champs (« munitionnettes »), la propagande et la censure encadrent l’opinion (« bourrage de crâne »), les colonies fournissent hommes et ressources. **3. Les violences** touchent les civils : occupation du Nord de la France et de la Belgique, bombardements, blocus et famine en Allemagne, et surtout le génocide des Arméniens dans l’Empire ottoman (1915-1916) qui fait environ un million de morts. La guerre efface la frontière entre l’avant et l’arrière.' },
      ],
    },
    {
      id: 'ex-armenie',
      title: 'Le génocide des Arméniens',
      difficulty: 2,
      duration: 25,
      tags: ['génocide', 'notions'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Définissez « génocide » et précisez qui a créé ce mot et quand.',
            'Pourquoi peut-on parler de génocide pour les Arméniens de l’Empire ottoman en 1915-1916 ?',
            'Quel est le contexte militaire et politique qui permet ce crime ?',
          ],
        },
      ],
      hints: ['Raphael Lemkin, 1944 ; arrestations du 24 avril 1915 ; déportations ; contexte de guerre.'],
      solution: [
        { type: 'p', text: '**1.** Un génocide est l’extermination planifiée d’un groupe humain en raison de son identité (nationale, ethnique, religieuse). Le mot est forgé par le juriste Raphael Lemkin en 1943-1944 (il le publie en 1944), en s’inspirant du sort des Arméniens et des Juifs d’Europe.' },
        { type: 'p', text: '**2.** Le gouvernement jeune-turc organise, à partir du 24 avril 1915 (arrestation de l’élite arménienne de Constantinople), l’élimination systématique de la population arménienne : assassinat des hommes, déportation des femmes, enfants et vieillards dans le désert de Syrie, marches de la mort, massacres, famine. Environ un million à un million et demi de personnes périssent. Le caractère planifié, central et destiné à détruire le groupe en tant que tel justifie le terme de génocide.' },
        { type: 'p', text: '**3.** Le crime est commis en pleine guerre, dans un empire allié de l’Allemagne, qui subit des défaites contre la Russie et qui perçoit les Arméniens comme des traîtres potentiels. La guerre permet de masquer les violences et de les justifier ; les témoins étrangers (consuls, missionnaires, ambassadeur Morgenthau) sont nombreux mais l’Entente est occupée par la guerre. Après-guerre, les responsables ne seront pas punis durablement.' },
      ],
    },
    {
      id: 'ex-versailles',
      title: 'Document : le traité de Versailles',
      difficulty: 3,
      duration: 30,
      tags: ['document', 'traités'],
      statement: [
        {
          type: 'quote',
          text: 'Les Gouvernements alliés et associés déclarent, et l’Allemagne reconnaît, que l’Allemagne et ses alliés sont responsables, pour les avoir causés, de toutes les pertes et de tous les dommages subis par les Gouvernements alliés et associés […] du fait de la guerre qui leur a été imposée par l’agression de l’Allemagne et de ses alliés.',
          source: 'Traité de Versailles, article 231, 28 juin 1919',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Présentez le document.',
            'Quelle est la signification de cet article pour l’Allemagne ? Quelles autres dispositions du traité connaissez-vous ?',
            'Pourquoi les Allemands parlent-ils de « diktat » ? Quelles conséquences à moyen terme ?',
          ],
        },
      ],
      hints: ['Réparations, pertes territoriales, limitation de l’armée ; ressentiment.'],
      solution: [
        { type: 'p', text: '**1.** L’article 231 du traité de Versailles, signé le 28 juin 1919 dans la galerie des Glaces, est la « clause de culpabilité » : il attribue à l’Allemagne et à ses alliés la responsabilité de la guerre et sert de fondement juridique aux réparations.' },
        { type: 'p', text: '**2.** Pour l’Allemagne, c’est une humiliation morale et politique ; l’opinion refuse d’admettre sa responsabilité exclusive. Le traité prévoit aussi : restitution de l’Alsace-Moselle à la France, perte de territoires au profit de la Pologne (corridor de Dantzig) et de la Belgique, perte de toutes les colonies, armée limitée à 100 000 hommes, Rhénanie démilitarisée, paiement de réparations (fixées en 1921 à 132 milliards de marks-or), interdiction de l’Anschluss.' },
        { type: 'p', text: '**3.** Les Allemands, qui n’ont pas été associés à la négociation et à qui le traité est présenté à signer, parlent de « diktat ». Ce ressentiment nourrit les nationalismes de l’entre-deux-guerres (revanche, mythe du « coup de poignard dans le dos ») et sera exploité par Hitler. Mais le traité n’est pas seul en cause : l’absence des États-Unis à la SDN, les crises économiques, la montée des totalitarismes expliquent aussi la dégradation de la paix.' },
      ],
    },
    {
      id: 'ex-bac-suicide',
      title: 'Type bac : la Grande Guerre, « suicide de l’Europe » ?',
      difficulty: 3,
      duration: 45,
      tags: ['type bac', 'composition'],
      statement: [
        { type: 'p', text: '**Sujet.** « La Première Guerre mondiale : une guerre totale qui fait basculer l’Europe (1914-1920). »' },
        { type: 'p', text: 'Rédigez l’introduction et proposez un plan détaillé avec des exemples datés.' },
      ],
      hints: ['Plan possible : I. Une guerre mondiale et d’usure ; II. Une guerre totale ; III. Une sortie de guerre qui bouleverse l’Europe.'],
      solution: [
        { type: 'p', text: '**Introduction.** Du 28 juin 1914 (Sarajevo) au 28 juin 1919 (Versailles), la Grande Guerre fait environ 9 millions de morts parmi les soldats et d’innombrables victimes civiles. Elle détruit quatre empires et affaiblit l’Europe, que Valéry en 1919 juge « mortelle ». En quoi cette guerre est-elle totale et pourquoi bouleverse-t-elle l’Europe ? On verra d’abord la mondialisation et l’enlisement du conflit, puis la guerre totale, enfin la sortie de guerre et ses conséquences.' },
        { type: 'p', text: '**I. Un conflit européen devenu mondial (1914-1918).** Engrenage de l’été 1914, Union sacrée, Marne (6-12 septembre), guerre de tranchées, Verdun et Somme (1916), entrée des États-Unis (6 avril 1917), retrait russe (Brest-Litovsk, 3 mars 1918), contre-offensive alliée et armistice (11 novembre 1918).' },
        { type: 'p', text: '**II. Une guerre totale.** Expérience des combattants (tranchées, artillerie, gaz, mutineries de 1917), économie de guerre (Albert Thomas), mobilisation des femmes et des colonies, propagande, violences contre les civils et génocide des Arméniens (1915-1916).' },
        { type: 'p', text: '**III. Une sortie de guerre qui bouleverse l’Europe.** Traités (Versailles, 28 juin 1919 ; Saint-Germain ; Trianon ; Sèvres puis Lausanne), disparition des empires allemand, austro-hongrois, russe et ottoman, nouveaux États, SDN fragile, bilan humain (1,4 million de morts français) et mémoire (monuments aux morts, Soldat inconnu 1921). **Conclusion** : l’Europe est affaiblie, les États-Unis s’affirment, les rancœurs et les révolutions préparent l’entre-deux-guerres.' },
      ],
    },
  ],

  representations: [
    { type: 'h2', text: 'Frise chronologique : 1914-1923' },
    {
      type: 'timeline',
      events: [
        { date: '28 juin 1914', title: 'Attentat de Sarajevo' },
        { date: '28 juillet 1914', title: 'Guerre Autriche-Hongrie / Serbie' },
        { date: '1er août 1914', title: 'Mobilisation générale en France' },
        { date: '3 août 1914', title: 'Allemagne déclare la guerre à la France' },
        { date: '4 août 1914', title: 'Invasion de la Belgique ; Royaume-Uni en guerre ; Union sacrée' },
        { date: '6-12 septembre 1914', title: 'Bataille de la Marne' },
        { date: '22 avril 1915', title: 'Gaz à Ypres' },
        { date: '24 avril 1915', title: 'Début du génocide des Arméniens' },
        { date: 'Mai 1915', title: 'L’Italie entre en guerre aux côtés de l’Entente' },
        { date: '21 février 1916', title: 'Début de la bataille de Verdun' },
        { date: '1er juillet 1916', title: 'Début de la bataille de la Somme' },
        { date: '6 avril 1917', title: 'Entrée en guerre des États-Unis' },
        { date: '16 avril 1917', title: 'Offensive Nivelle (Chemin des Dames)' },
        { date: 'Mai-juin 1917', title: 'Mutineries' },
        { date: '7 novembre 1917', title: 'Révolution d’Octobre' },
        { date: '8 janvier 1918', title: 'Quatorze points de Wilson' },
        { date: '3 mars 1918', title: 'Traité de Brest-Litovsk' },
        { date: '8 août 1918', title: 'Contre-offensive alliée' },
        { date: '9 novembre 1918', title: 'Abdication de Guillaume II' },
        { date: '11 novembre 1918', title: 'Armistice de Rethondes' },
        { date: '18 janvier 1919', title: 'Ouverture de la conférence de la paix' },
        { date: '28 juin 1919', title: 'Traité de Versailles' },
        { date: '10 janvier 1920', title: 'Naissance de la SDN' },
        { date: '24 juillet 1923', title: 'Traité de Lausanne' },
      ],
    },
    { type: 'h2', text: 'Ordonner' },
    {
      type: 'ordering',
      title: 'Les grandes étapes de la guerre',
      items: [
        'Attentat de Sarajevo (28 juin 1914)',
        'Bataille de la Marne (septembre 1914)',
        'Bataille de Verdun (février 1916)',
        'Entrée en guerre des États-Unis (6 avril 1917)',
        'Traité de Brest-Litovsk (3 mars 1918)',
        'Armistice (11 novembre 1918)',
        'Traité de Versailles (28 juin 1919)',
      ],
    },
    {
      type: 'ordering',
      title: 'Les armistices de 1918 (ordre chronologique)',
      items: ['Bulgarie (29 septembre)', 'Empire ottoman (30 octobre)', 'Autriche-Hongrie (3 novembre)', 'Allemagne (11 novembre)'],
    },
    { type: 'h2', text: 'Associer' },
    {
      type: 'matching',
      title: 'Personnages',
      pairs: [
        { left: 'Joffre', right: 'Général victorieux à la Marne (1914)' },
        { left: 'Pétain', right: 'Défenseur de Verdun (1916), rétablit la discipline en 1917' },
        { left: 'Nivelle', right: 'Responsable de l’offensive du Chemin des Dames (avril 1917)' },
        { left: 'Foch', right: 'Commandant en chef unique des Alliés (1918)' },
        { left: 'Clemenceau', right: 'Président du Conseil (novembre 1917 – janvier 1920)' },
        { left: 'Wilson', right: 'Président américain, Quatorze points, SDN' },
        { left: 'Lénine', right: 'Chef des bolcheviks, révolution d’Octobre' },
        { left: 'Mustafa Kemal', right: 'Fondateur de la République de Turquie (1923)' },
      ],
    },
    {
      type: 'matching',
      title: 'Traités',
      pairs: [
        { left: 'Versailles', right: 'Allemagne (28 juin 1919)' },
        { left: 'Saint-Germain-en-Laye', right: 'Autriche (10 septembre 1919)' },
        { left: 'Neuilly-sur-Seine', right: 'Bulgarie (27 novembre 1919)' },
        { left: 'Trianon', right: 'Hongrie (4 juin 1920)' },
        { left: 'Sèvres puis Lausanne', right: 'Empire ottoman / Turquie (1920 / 1923)' },
        { left: 'Brest-Litovsk', right: 'Russie bolchevique et Allemagne (3 mars 1918)' },
      ],
    },
    { type: 'h2', text: 'Flashcards' },
    {
      type: 'flashcards',
      cards: [
        { front: '28 juin 1914', back: 'Attentat de Sarajevo.' },
        { front: '28 juillet 1914', back: 'L’Autriche-Hongrie déclare la guerre à la Serbie.' },
        { front: '1er août 1914', back: 'Mobilisation générale en France et en Allemagne.' },
        { front: '4 août 1914', back: 'Invasion de la Belgique, Royaume-Uni en guerre, Union sacrée.' },
        { front: '6-12 septembre 1914', back: 'Bataille de la Marne.' },
        { front: '22 avril 1915', back: 'Premier emploi massif de gaz à Ypres.' },
        { front: '24 avril 1915', back: 'Début du génocide des Arméniens.' },
        { front: '21 février 1916', back: 'Début de la bataille de Verdun.' },
        { front: '1er juillet 1916', back: 'Début de la bataille de la Somme.' },
        { front: '6 avril 1917', back: 'Les États-Unis entrent en guerre.' },
        { front: '16 avril 1917', back: 'Offensive Nivelle au Chemin des Dames, avant les mutineries.' },
        { front: '7 novembre 1917', back: 'Révolution d’Octobre (25 octobre julien).' },
        { front: '3 mars 1918', back: 'Traité de Brest-Litovsk.' },
        { front: '11 novembre 1918', back: 'Armistice de Rethondes.' },
        { front: '28 juin 1919', back: 'Traité de Versailles.' },
        { front: '10 août 1920', back: 'Traité de Sèvres (Empire ottoman).' },
        { front: '24 juillet 1923', back: 'Traité de Lausanne : reconnaissance de la Turquie.' },
        { front: 'Union sacrée', back: 'Rassemblement national derrière le gouvernement dès le 4 août 1914.' },
        { front: 'Guerre totale', back: 'Mobilisation de toutes les ressources, civils touchés.' },
        { front: 'Quatre empires disparus', back: 'Allemand, austro-hongrois, russe, ottoman.' },
      ],
    },
    { type: 'h2', text: 'Schéma : les causes du conflit' },
    {
      type: 'svg',
      caption: 'Des causes profondes à l’engrenage de juillet 1914',
      svg: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
<g fill="none" stroke-width="1.5">
<rect x="10" y="10" width="200" height="45" stroke="hsl(25 95% 53%)"/>
<rect x="10" y="65" width="200" height="45" stroke="hsl(25 95% 53%)"/>
<rect x="10" y="120" width="200" height="45" stroke="hsl(25 95% 53%)"/>
<rect x="10" y="175" width="200" height="45" stroke="hsl(25 95% 53%)"/>
<rect x="270" y="75" width="160" height="90" stroke="hsl(0 84% 60%)"/>
<rect x="490" y="75" width="200" height="90" stroke="hsl(263 70% 60%)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="110" y="37">Rivalités coloniales, économiques</text>
<text x="110" y="92">Nationalismes</text>
<text x="110" y="147">Course aux armements</text>
<text x="110" y="202">Système d’alliances</text>
<text x="350" y="108" font-weight="bold">28 juin 1914</text><text x="350" y="126">Attentat de Sarajevo</text><text x="350" y="144">(étincelle)</text>
<text x="590" y="108" font-weight="bold">Juillet-août 1914</text><text x="590" y="126">Ultimatums, mobilisations,</text><text x="590" y="144">déclarations de guerre</text>
</g>
<g stroke="currentColor"><line x1="210" y1="32" x2="270" y2="110"/><line x1="210" y1="87" x2="270" y2="115"/><line x1="210" y1="142" x2="270" y2="130"/><line x1="210" y1="197" x2="270" y2="140"/><line x1="430" y1="120" x2="490" y2="120"/></g>
</svg>`,
    },
    { type: 'h2', text: 'Vrai ou faux ?' },
    {
      type: 'truefalse',
      title: 'Vérifiez vos connaissances',
      statements: [
        { text: 'L’Italie fait partie des Empires centraux pendant toute la guerre.', answer: false, explanation: 'Neutre en 1914, elle rejoint l’Entente en mai 1915.' },
        { text: 'La bataille de la Marne arrête l’offensive allemande en septembre 1914.', answer: true },
        { text: 'Les États-Unis entrent en guerre en 1917.', answer: true },
        { text: 'La Russie signe la paix avec l’Allemagne à Versailles.', answer: false, explanation: 'Elle signe le traité de Brest-Litovsk (3 mars 1918).' },
        { text: 'L’armistice du 11 novembre 1918 est signé à Rethondes.', answer: true },
        { text: 'Quatre empires disparaissent à l’issue de la guerre.', answer: true },
        { text: 'Les États-Unis participent à la SDN dès 1920.', answer: false, explanation: 'Le Sénat américain refuse de ratifier le traité de Versailles.' },
        { text: 'Le génocide des Arméniens a lieu en 1915-1916.', answer: true },
      ],
    },
    { type: 'h2', text: 'QCM' },
    {
      type: 'qcm',
      questions: [
        { question: 'Qui est assassiné à Sarajevo le 28 juin 1914 ?', choices: ['L’archiduc François-Ferdinand', 'Guillaume II', 'Nicolas II', 'Jean Jaurès'], answer: 0 },
        { question: 'Quelle bataille de 1916 dure près de dix mois ?', choices: ['Verdun', 'La Marne', 'Tannenberg', 'Caporetto'], answer: 0 },
        { question: 'Que signifie l’« Union sacrée » ?', choices: ['L’union des Français derrière le gouvernement en 1914', 'L’alliance franco-russe', 'Un traité de paix', 'Une loi de 1905'], answer: 0 },
        { question: 'Quel événement pousse les États-Unis dans la guerre en 1917 ?', choices: ['La guerre sous-marine à outrance', 'La révolution russe', 'L’armistice', 'La bataille de Verdun'], answer: 0 },
        { question: 'Qui devient président du Conseil en France en novembre 1917 ?', choices: ['Clemenceau', 'Pétain', 'Joffre', 'Poincaré'], answer: 0 },
        { question: 'Quel traité met fin à la guerre entre l’Allemagne et la Russie bolchevique ?', choices: ['Brest-Litovsk', 'Versailles', 'Trianon', 'Lausanne'], answer: 0 },
        { question: 'Quel est le prénom de l’archiduc assassiné ?', choices: ['François-Ferdinand', 'François-Joseph', 'Charles', 'Guillaume'], answer: 0 },
        { question: 'Quel traité concerne la Hongrie ?', choices: ['Trianon', 'Sèvres', 'Neuilly', 'Saint-Germain'], answer: 0 },
        { question: 'Quel est le surnom donné aux soldats français de la Grande Guerre ?', choices: ['Poilus', 'Tommies', 'Doughboys', 'Landsers'], answer: 0 },
        { question: 'Où est signée la paix avec l’Allemagne le 28 juin 1919 ?', choices: ['Galerie des Glaces, Versailles', 'Rethondes', 'Trianon', 'Genève'], answer: 0 },
      ],
    },
    { type: 'h2', text: 'Texte à trous' },
    {
      type: 'cloze',
      title: 'Complétez',
      text: 'Le {{28 juin 1914}}, l’archiduc {{François-Ferdinand}} est assassiné à {{Sarajevo}}. Le {{4 août}}, la France s’unit dans l’{{Union sacrée}}. En {{1916}}, la bataille de {{Verdun}} s’enlise. En {{1917}}, les {{États-Unis}} entrent en guerre. L’armistice est signé le {{11 novembre 1918}} à {{Rethondes}}. Le traité de {{Versailles}} date du {{28 juin 1919}}.',
    },
    {
      type: 'reveal',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Des causes profondes (alliances, nationalismes, rivalités) + une étincelle (Sarajevo) = guerre européenne en août 1914.',
            'Guerre d’usure, mondiale puis totale : combattants, économie, société, civils, génocide des Arméniens.',
            '1917 : année charnière (États-Unis, révolutions russes, mutineries).',
            '1918-1920 : armistice, traités, SDN ; quatre empires disparaissent ; Europe affaiblie, rancœurs.',
          ],
        },
      ],
    },
  ],
}

export default chapter
