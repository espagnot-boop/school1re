import type { Chapter } from '../types'

const r = String.raw

const FONT = 'font-family="Geist, sans-serif"'

const svgMontage = `<svg viewBox="0 0 520 440" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <!-- support -->
  <rect x="60" y="400" width="200" height="10" fill="none" stroke="currentColor"/>
  <line x1="90" y1="400" x2="90" y2="20" stroke="currentColor" stroke-width="3"/>
  <!-- pince -->
  <line x1="90" y1="90" x2="172" y2="90" stroke="currentColor" stroke-width="2"/>
  <rect x="170" y="82" width="20" height="16" fill="none" stroke="currentColor"/>
  <!-- burette -->
  <rect x="172" y="30" width="16" height="230" fill="none" stroke="currentColor"/>
  <rect x="173" y="70" width="14" height="189" fill="hsl(300 75% 55%)" fill-opacity="0.55"/>
  <g stroke="currentColor" stroke-width="0.8">
    <line x1="172" y1="50" x2="180" y2="50"/><line x1="172" y1="70" x2="178" y2="70"/><line x1="172" y1="90" x2="180" y2="90"/>
    <line x1="172" y1="110" x2="178" y2="110"/><line x1="172" y1="130" x2="180" y2="130"/><line x1="172" y1="150" x2="178" y2="150"/>
    <line x1="172" y1="170" x2="180" y2="170"/><line x1="172" y1="190" x2="178" y2="190"/><line x1="172" y1="210" x2="180" y2="210"/>
    <line x1="172" y1="230" x2="178" y2="230"/><line x1="172" y1="250" x2="180" y2="250"/>
  </g>
  <path d="M172,260 L178,280 L182,280 L188,260" fill="none" stroke="currentColor"/>
  <rect x="168" y="272" width="24" height="7" fill="currentColor"/>
  <line x1="180" y1="280" x2="180" y2="300" stroke="currentColor"/>
  <circle cx="180" cy="312" r="3" fill="hsl(300 75% 55%)"/>
  <!-- bécher -->
  <path d="M135,320 L135,385 L225,385 L225,320" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="136" y="345" width="88" height="39" fill="hsl(55 95% 55%)" fill-opacity="0.25"/>
  <rect x="168" y="376" width="24" height="5" fill="currentColor"/>
  <!-- agitateur -->
  <rect x="115" y="386" width="130" height="14" fill="none" stroke="currentColor"/>
  <circle cx="230" cy="393" r="3" fill="none" stroke="currentColor"/>
  <!-- légendes -->
  <g font-size="12">
    <line x1="190" y1="60" x2="300" y2="60" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="56">Burette graduée (25 mL)</text>
    <text x="305" y="72" opacity="0.75">solution titrante : C_B connue</text>
    <line x1="190" y1="90" x2="300" y2="110" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="114">Zéro ajusté, bulle chassée</text>
    <line x1="192" y1="275" x2="300" y2="275" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="279">Robinet (versement goutte à goutte)</text>
    <line x1="225" y1="350" x2="300" y2="330" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="326">Bécher : solution titrée</text>
    <text x="305" y="342" opacity="0.75">V_A prélevé à la pipette jaugée</text>
    <line x1="192" y1="378" x2="300" y2="365" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="368">Barreau aimanté</text>
    <line x1="245" y1="395" x2="300" y2="395" stroke="currentColor" stroke-width="0.6"/>
    <text x="305" y="399">Agitateur magnétique</text>
  </g>
</svg>`

const svgCouleurs = `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <text x="300" y="20" text-anchor="middle" font-size="13">Titrage des ions Fe²⁺ par les ions MnO₄⁻ (violets) : évolution de la couleur du bécher</text>
  <g>
    <path d="M60,60 L60,160 L160,160 L160,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="61" y="95" width="98" height="64" fill="hsl(55 95% 55%)" fill-opacity="0.2"/>
    <text x="110" y="184" text-anchor="middle">V &lt; V_E</text>
    <text x="110" y="200" text-anchor="middle" font-size="11">MnO₄⁻ limitant : décoloration</text>
    <text x="110" y="214" text-anchor="middle" font-size="11">immédiate, bécher quasi incolore</text>
  </g>
  <g>
    <path d="M250,60 L250,160 L350,160 L350,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="251" y="95" width="98" height="64" fill="hsl(320 80% 65%)" fill-opacity="0.3"/>
    <text x="300" y="184" text-anchor="middle">V = V_E</text>
    <text x="300" y="200" text-anchor="middle" font-size="11">première goutte : teinte rose</text>
    <text x="300" y="214" text-anchor="middle" font-size="11">pâle persistante</text>
  </g>
  <g>
    <path d="M440,60 L440,160 L540,160 L540,60" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="441" y="95" width="98" height="64" fill="hsl(300 75% 50%)" fill-opacity="0.7"/>
    <text x="490" y="184" text-anchor="middle">V &gt; V_E</text>
    <text x="490" y="200" text-anchor="middle" font-size="11">Fe²⁺ épuisé, MnO₄⁻ en excès :</text>
    <text x="490" y="214" text-anchor="middle" font-size="11">violet de plus en plus foncé</text>
  </g>
</svg>`

const svgQuantites = `<svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" ${FONT} font-size="12">
  <line x1="60" y1="230" x2="520" y2="230" stroke="currentColor"/>
  <line x1="60" y1="230" x2="60" y2="30" stroke="currentColor"/>
  <text x="520" y="252" text-anchor="end">V versé (mL)</text>
  <text x="66" y="36">n (mmol)</text>
  <line x1="60" y1="60" x2="300" y2="230" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
  <text x="120" y="90" fill="hsl(217 91% 60%)">réactif titré (consommé)</text>
  <line x1="60" y1="229" x2="300" y2="229" stroke="hsl(0 84% 60%)" stroke-width="2.5"/>
  <line x1="300" y1="229" x2="500" y2="90" stroke="hsl(0 84% 60%)" stroke-width="2.5"/>
  <text x="400" y="120" fill="hsl(0 84% 60%)">réactif titrant (en excès)</text>
  <line x1="60" y1="230" x2="300" y2="130" stroke="hsl(142 71% 45%)" stroke-width="2" stroke-dasharray="6 3"/>
  <line x1="300" y1="130" x2="500" y2="130" stroke="hsl(142 71% 45%)" stroke-width="2" stroke-dasharray="6 3"/>
  <text x="380" y="148" fill="hsl(142 71% 45%)">produit formé</text>
  <line x1="300" y1="30" x2="300" y2="230" stroke="currentColor" stroke-dasharray="4 4"/>
  <text x="300" y="248" text-anchor="middle">V_E</text>
  <text x="180" y="270" text-anchor="middle" font-size="11">avant l’équivalence : titrant limitant</text>
  <text x="420" y="270" text-anchor="middle" font-size="11">après l’équivalence : titré limitant</text>
</svg>`

const chapter: Chapter = {
  id: 'titrages',
  subject: 'physique-chimie',
  order: 3,
  title: 'Titrages avec suivi colorimétrique',
  theme: 'Constitution et transformations de la matière',
  summary:
    'Déterminer la quantité de matière d’une espèce par titrage direct : réaction support, équivalence (changement de réactif limitant, proportions stœchiométriques), repérage par changement de couleur et relation à l’équivalence.',
  duration: '2 semaines',
  objectives: [
    'Relier qualitativement l’évolution des quantités de matière de réactifs et de produits au volume de solution titrante ajoutée.',
    'Relier l’équivalence au changement de réactif limitant et à l’introduction des réactifs en proportions stœchiométriques.',
    'Établir la relation entre les quantités de matière de réactifs introduites pour atteindre l’équivalence.',
    'Expliquer ou prévoir le changement de couleur observé à l’équivalence d’un titrage mettant en jeu une espèce colorée.',
    'Capacité expérimentale : réaliser un titrage direct avec repérage colorimétrique de l’équivalence pour déterminer la quantité de matière d’une espèce dans un échantillon.',
  ],
  keywords: [
    'titrage',
    'dosage',
    'réaction support',
    'solution titrante',
    'solution titrée',
    'équivalence',
    'volume équivalent',
    'burette',
    'repérage colorimétrique',
    'empois d’amidon',
  ],

  // ------------------------------------------------------------------ FICHE
  fiche: [
    { type: 'h2', text: 'Principe' },
    {
      type: 'p',
      text: 'Un **titrage** (dosage par titrage) détermine la quantité de matière d’une espèce A (**réactif titré**, dans le bécher) en la faisant réagir avec une espèce B de concentration connue (**réactif titrant**, dans la burette). C’est un dosage **destructif**.',
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Réaction support',
      content: [
        { type: 'p', text: 'La réaction de titrage doit être **totale**, **rapide** et **unique** (sélective : B ne réagit qu’avec A).' },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Équivalence',
      content: [
        {
          type: 'p',
          text: 'À l’équivalence, les réactifs titré et titrant ont été introduits dans les **proportions stœchiométriques** : il y a **changement de réactif limitant**. Avant : le titrant est limitant ; après : le titré est épuisé, le titrant est en excès.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Relation à l’équivalence',
      content: [
        { type: 'p', text: r`Pour la réaction support $a\,\mathrm{A} + b\,\mathrm{B} \to \dots$ :` },
        { type: 'math', tex: r`\frac{n_A^{\,0}}{a} = \frac{n_B^{\,E}}{b}\qquad\Longleftrightarrow\qquad \frac{C_A\times V_A}{a} = \frac{C_B\times V_E}{b}` },
        { type: 'math', tex: r`C_A = \frac{a}{b}\times\frac{C_B\times V_E}{V_A}` },
      ],
    },
    { type: 'h2', text: 'Repérage colorimétrique' },
    {
      type: 'table',
      headers: ['Titrage', 'Observation à l’équivalence'],
      rows: [
        [r`$\mathrm{Fe^{2+}}$ (ou $\mathrm{H_2O_2}$) par $\mathrm{MnO_4^-}$ violet`, 'la teinte violette (rose pâle) **persiste** : MnO₄⁻ n’est plus consommé'],
        [r`$\mathrm{I_2}$ (jaune-brun) par $\mathrm{S_2O_3^{2-}}$ incolore`, 'la solution se **décolore** (empois d’amidon : le bleu disparaît)'],
        [r`vitamine C ou $\mathrm{SO_2}$ par $\mathrm{I_2}$ (+ empois d’amidon)`, 'apparition d’une coloration **bleue persistante**'],
      ],
    },
    {
      type: 'steps',
      items: [
        { title: 'Prélever', text: 'V_A de solution titrée à la pipette jaugée, dans un bécher (+ barreau aimanté).' },
        { title: 'Remplir la burette', text: 'Rincer avec la solution titrante, remplir, chasser la bulle, ajuster le zéro.' },
        { title: 'Titrage rapide', text: 'Verser mL par mL pour encadrer V_E.' },
        { title: 'Titrage précis', text: 'Recommencer, verser goutte à goutte près de V_E ; noter V_E au changement de couleur persistant.' },
        { title: 'Exploiter', text: 'Écrire la relation à l’équivalence et calculer C_A (chiffres significatifs !).' },
      ],
    },
  ],

  // ------------------------------------------------------------------ COURS
  cours: [
    { type: 'h2', text: '1. Doser une espèce : étalonnage ou titrage ?' },
    {
      type: 'p',
      text: '**Doser** une espèce chimique en solution, c’est déterminer sa concentration (ou sa quantité de matière). Deux grandes méthodes sont au programme :',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Dosage par étalonnage', text: 'On compare une grandeur physique (absorbance, conductivité…) à celle de solutions étalons. Aucune transformation chimique : méthode **non destructive**.', icon: 'LineChart' },
        { title: 'Dosage par titrage', text: 'On fait réagir l’espèce à doser avec une autre espèce de concentration connue, par une réaction chimique : méthode **destructive**.', icon: 'FlaskConical' },
      ],
    },
    { type: 'h2', text: '2. Le vocabulaire du titrage' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Réactif titré', value: 'espèce A dont on cherche la quantité de matière ; elle est dans le bécher (volume V_A prélevé précisément).' },
        { key: 'Réactif titrant', value: 'espèce B de concentration C_B connue avec précision ; elle est dans la burette.' },
        { key: 'Réaction support', value: 'réaction chimique entre A et B sur laquelle repose le titrage.' },
        { key: 'Équivalence', value: 'état du système pour lequel les réactifs ont été introduits dans les proportions stœchiométriques.' },
        { key: 'Volume équivalent V_E', value: 'volume de solution titrante versé à l’équivalence.' },
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Qualités de la réaction support',
      content: [
        {
          type: 'list',
          items: [
            '**Totale** : le réactif limitant disparaît entièrement à chaque ajout.',
            '**Rapide** : l’état final est atteint dès que la goutte est versée (on peut suivre le titrage en temps réel).',
            '**Unique** (sélective) : le réactif titrant ne réagit qu’avec le réactif titré.',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Au lycée, les réactions supports sont le plus souvent des **réactions d’oxydoréduction** (chapitre précédent), par exemple :',
    },
    {
      type: 'list',
      items: [
        r`$\mathrm{MnO_4^-(aq) + 5\,Fe^{2+}(aq) + 8\,H^+(aq) \to Mn^{2+}(aq) + 5\,Fe^{3+}(aq) + 4\,H_2O(\ell)}$`,
        r`$\mathrm{I_2(aq) + 2\,S_2O_3^{2-}(aq) \to 2\,I^-(aq) + S_4O_6^{2-}(aq)}$`,
        r`$\mathrm{2\,MnO_4^-(aq) + 5\,H_2O_2(aq) + 6\,H^+(aq) \to 2\,Mn^{2+}(aq) + 5\,O_2(g) + 8\,H_2O(\ell)}$`,
        r`$\mathrm{C_6H_8O_6(aq) + I_2(aq) \to C_6H_6O_6(aq) + 2\,I^-(aq) + 2\,H^+(aq)}$ (vitamine C)`,
      ],
    },
    { type: 'h2', text: '3. Le montage' },
    { type: 'svg', svg: svgMontage, caption: 'Montage d’un titrage direct avec suivi colorimétrique.', maxWidth: 520 },
    {
      type: 'steps',
      items: [
        { title: 'Prélever la solution titrée', text: 'À l’aide d’une pipette jaugée (et d’une propipette), prélever V_A de solution titrée et le verser dans un bécher (ou un erlenmeyer). Ajouter si besoin de l’eau distillée (cela ne change pas n_A) et l’indicateur (empois d’amidon…).' },
        { title: 'Préparer la burette', text: 'Rincer la burette avec un peu de solution titrante, la remplir au-dessus du zéro, ouvrir le robinet pour chasser la bulle d’air, puis ajuster au zéro (bas du ménisque, œil à hauteur du trait).' },
        { title: 'Agiter', text: 'Placer un barreau aimanté dans le bécher et le bécher sur l’agitateur magnétique : l’agitation homogénéise et assure une réaction rapide.' },
        { title: 'Titrage rapide (repérage)', text: 'Verser la solution titrante mL par mL jusqu’au changement de couleur : on obtient un encadrement de V_E (à 1 mL près).' },
        { title: 'Titrage précis', text: 'Recommencer avec un nouveau prélèvement : verser rapidement jusqu’à 1 ou 2 mL avant l’encadrement, puis goutte à goutte. Noter V_E dès que le changement de couleur persiste.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Erreurs de manipulation fréquentes',
      content: [
        {
          type: 'list',
          items: [
            'Ne pas rincer la burette avec la solution titrante (l’eau résiduelle dilue le titrant : V_E trop grand).',
            'Oublier de chasser la bulle d’air sous le robinet.',
            'Lecture du volume en dehors de l’axe du ménisque (erreur de parallaxe).',
            'Dépasser l’équivalence en versant trop vite : faire d’abord un titrage rapide.',
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Ajouter de l’eau dans le bécher ?',
      content: [
        {
          type: 'p',
          text: 'Ajouter de l’eau distillée dans le bécher **ne change pas** la quantité de matière de réactif titré, donc **ne change pas** V_E. Cela peut faciliter l’observation et l’agitation. En revanche, le volume V_A utilisé dans les calculs est celui **prélevé à la pipette**.',
        },
      ],
    },
    { type: 'h2', text: '4. Évolution du système au cours du titrage' },
    {
      type: 'p',
      text: 'Chaque ajout de solution titrante constitue un nouvel état initial ; la réaction étant totale et rapide, le système atteint immédiatement un nouvel état final.',
    },
    {
      type: 'table',
      headers: ['', 'Avant l’équivalence (V < V_E)', 'À l’équivalence (V = V_E)', 'Après l’équivalence (V > V_E)'],
      rows: [
        ['Réactif limitant', 'le **titrant** B (chaque goutte est entièrement consommée)', 'A et B (proportions stœchiométriques)', 'le **titré** A (déjà épuisé)'],
        ['Réactif titré A', 'présent, sa quantité diminue', 'vient de disparaître', 'absent'],
        ['Réactif titrant B', 'absent du bécher', 'absent', 'présent, s’accumule'],
        ['Produits', 'leur quantité augmente', 'quantité maximale', 'quantité constante'],
      ],
    },
    { type: 'svg', svg: svgQuantites, caption: 'Quantités de matière dans le bécher en fonction du volume de titrant versé.' },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Équivalence',
      content: [
        {
          type: 'p',
          text: 'L’**équivalence** est atteinte lorsque les réactifs titré et titrant ont été introduits dans les **proportions stœchiométriques** de la réaction support. Elle correspond à un **changement de réactif limitant** : le titrant, limitant avant l’équivalence, devient en excès après.',
        },
      ],
    },
    { type: 'h2', text: '5. Relation à l’équivalence' },
    {
      type: 'p',
      text: r`Considérons la réaction support $a\,\mathrm{A} + b\,\mathrm{B} \to c\,\mathrm{C} + d\,\mathrm{D}$, avec A le réactif titré ($n_A^0 = C_A V_A$) et B le titrant versé à la burette.`,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Démonstration avec le tableau d’avancement',
      content: [
        {
          type: 'table',
          headers: ['État', 'Avancement', r`$a\,\mathrm{A}$`, r`$b\,\mathrm{B}$`],
          rows: [
            ['initial (à l’équivalence)', '$0$', r`$n_A^0$`, r`$n_B^E = C_B V_E$`],
            ['final', r`$x_E$`, r`$n_A^0 - a\,x_E = 0$`, r`$n_B^E - b\,x_E = 0$`],
          ],
        },
        {
          type: 'p',
          text: r`À l'équivalence, les deux réactifs sont épuisés simultanément : $x_E = \dfrac{n_A^0}{a} = \dfrac{n_B^E}{b}$. D'où la relation :`,
        },
        { type: 'math', tex: r`\boxed{\dfrac{n_A^0}{a} = \dfrac{C_B\,V_E}{b}}\qquad\text{soit}\qquad C_A = \frac{a\,C_B\,V_E}{b\,V_A}` },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Le piège des coefficients',
      content: [
        {
          type: 'p',
          text: r`Il ne faut **jamais** écrire $C_AV_A = C_BV_E$ sans réfléchir : cette égalité n'est vraie que si $a = b$. Pour le titrage de $\mathrm{Fe^{2+}}$ (A, coefficient 5) par $\mathrm{MnO_4^-}$ (B, coefficient 1) : $\dfrac{n(\mathrm{Fe^{2+}})}{5} = \dfrac{C_BV_E}{1}$, donc $n(\mathrm{Fe^{2+}}) = 5\,C_BV_E$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : titrage du diiode',
      content: [
        {
          type: 'p',
          text: r`On titre $V_A = 10{,}0\ \mathrm{mL}$ d'une solution de diiode par une solution de thiosulfate de sodium à $C_B = 2{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$. La décoloration a lieu pour $V_E = 12{,}4\ \mathrm{mL}$.\nRéaction support : $\mathrm{I_2 + 2\,S_2O_3^{2-} \to 2\,I^- + S_4O_6^{2-}}$.\nÀ l'équivalence : $\dfrac{n(\mathrm{I_2})}{1} = \dfrac{C_BV_E}{2}$, donc $n(\mathrm{I_2}) = \dfrac{2{,}00\times10^{-2}\times12{,}4\times10^{-3}}{2} = 1{,}24\times10^{-4}\ \mathrm{mol}$.\n$C_A = \dfrac{1{,}24\times10^{-4}}{10{,}0\times10^{-3}} = 1{,}24\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$.`,
        },
      ],
    },
    { type: 'h2', text: '6. Repérer l’équivalence par un changement de couleur' },
    {
      type: 'p',
      text: 'Lorsqu’un réactif ou un produit est **coloré**, la couleur du contenu du bécher change à l’équivalence, puisque le réactif limitant change. On peut alors repérer V_E à la goutte près.',
    },
    { type: 'h3', text: 'Cas 1 : le réactif titrant est coloré' },
    {
      type: 'p',
      text: r`Titrage des ions $\mathrm{Fe^{2+}}$ (quasi incolores) par les ions $\mathrm{MnO_4^-}$ (violets) ; les produits $\mathrm{Mn^{2+}}$ (incolore) et $\mathrm{Fe^{3+}}$ (jaune très pâle à ces concentrations) ne colorent presque pas la solution.`,
    },
    {
      type: 'list',
      items: [
        'Avant l’équivalence, les ions MnO₄⁻ versés sont limitants : ils sont immédiatement consommés, la goutte violette se **décolore**.',
        'À l’équivalence, les ions Fe²⁺ sont épuisés : la goutte suivante de MnO₄⁻ n’est plus consommée, une **teinte rose-violette persiste**.',
      ],
    },
    { type: 'svg', svg: svgCouleurs, caption: 'Le permanganate est son propre indicateur de fin de réaction.' },
    { type: 'h3', text: 'Cas 2 : le réactif titré est coloré' },
    {
      type: 'p',
      text: r`Titrage du diiode $\mathrm{I_2}$ (jaune-brun) par les ions thiosulfate (incolores) : avant l'équivalence, il reste du diiode (solution jaune de plus en plus pâle) ; à l'équivalence, le diiode a disparu, la solution devient **incolore**.`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'L’empois d’amidon (ou thiodène)',
      content: [
        {
          type: 'p',
          text: 'La disparition d’un jaune très pâle est difficile à repérer. On ajoute, près de l’équivalence, quelques gouttes d’**empois d’amidon** : en présence de diiode, il forme un complexe **bleu foncé** intense. La disparition (ou l’apparition) de la teinte bleue est beaucoup plus nette.',
        },
      ],
    },
    { type: 'h3', text: 'Cas 3 : un indicateur révèle l’apparition du titrant' },
    {
      type: 'p',
      text: r`Titrage de la vitamine C (incolore) par le diiode, en présence d'empois d'amidon : avant l'équivalence, le diiode versé est consommé (pas de couleur) ; dès l'équivalence dépassée, le diiode en excès colore la solution en **bleu persistant**.`,
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Prévoir le changement de couleur',
      content: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Recenser les espèces colorées (réactifs, produits, indicateur).',
            'Avant l’équivalence : le titré A est présent, le titrant B est absent du bécher.',
            'Après l’équivalence : A est absent, B est présent.',
            'En déduire la couleur avant et après : le changement a lieu à V_E.',
          ],
        },
      ],
    },
    { type: 'h2', text: '7. Exploiter un titrage' },
    {
      type: 'steps',
      items: [
        { title: 'Écrire la réaction support', text: 'À partir des demi-équations si nécessaire ; identifier le réactif titré et le titrant.' },
        { title: 'Écrire la relation à l’équivalence', text: 'n_A⁰ / a = n_B^E / b, en faisant bien attention aux coefficients.' },
        { title: 'Calculer', text: 'n_A⁰ puis C_A = n_A⁰ / V_A. Convertir les volumes en L.' },
        { title: 'Remonter à l’échantillon d’origine', text: 'Tenir compte d’une dilution préalable (× F) ou d’une partie seulement prélevée (× V_total/V_A).' },
        { title: 'Comparer', text: 'À une valeur de référence : écart relatif |x_exp − x_réf| / x_réf, compatibilité avec l’incertitude.' },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : prélèvement d’une partie de la solution',
      content: [
        {
          type: 'p',
          text: r`Un comprimé est dissous dans une fiole de $100{,}0$ mL et on titre $10{,}0$ mL de cette solution. La quantité trouvée dans le bécher ne représente que $\dfrac{10{,}0}{100{,}0} = \dfrac{1}{10}$ du comprimé : $n_{\text{comprimé}} = 10\times n_{\text{bécher}}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Choisir la concentration du titrant',
      content: [
        {
          type: 'p',
          text: 'Avec une burette de 25 mL, on choisit C_B pour que V_E soit compris entre environ 10 et 20 mL : un V_E trop petit est imprécis (l’incertitude de lecture, ≈ 0,05 mL, devient relativement grande), un V_E supérieur à 25 mL oblige à remplir deux fois la burette.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'À retenir',
      content: [
        {
          type: 'list',
          items: [
            'Réaction support : totale, rapide, unique.',
            'Équivalence : proportions stœchiométriques ↔ changement de réactif limitant.',
            r`$\dfrac{n_A^0}{a} = \dfrac{C_BV_E}{b}$.`,
            'Repérage colorimétrique : persistance ou disparition d’une couleur (permanganate, diiode + empois d’amidon).',
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ EXERCICES
  exercices: [
    {
      id: 'vocabulaire-equivalence',
      title: 'Comprendre l’équivalence',
      difficulty: 1,
      duration: 8,
      tags: ['équivalence', 'réactif limitant', 'couleur'],
      statement: [
        {
          type: 'p',
          text: r`On titre une solution d'ions fer(II) par une solution violette de permanganate de potassium en milieu acide : $\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}$. Seuls les ions $\mathrm{MnO_4^-}$ sont nettement colorés.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel est le réactif titré ? le réactif titrant ? Où chacun est-il placé ?',
            'Quel est le réactif limitant avant l’équivalence ? après ?',
            'Décrire la couleur du bécher avant et après l’équivalence. Comment repère-t-on l’équivalence ?',
            'Définir l’équivalence.',
          ],
        },
      ],
      hints: ['Avant l’équivalence, chaque goutte de titrant est entièrement consommée.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`Le réactif titré est $\mathrm{Fe^{2+}}$ (dans le bécher, volume prélevé à la pipette jaugée) ; le titrant est $\mathrm{MnO_4^-}$ (dans la burette, concentration connue).`,
            r`Avant l'équivalence, $\mathrm{MnO_4^-}$ (titrant) est limitant ; après, $\mathrm{Fe^{2+}}$ est épuisé : c'est lui le réactif limitant et $\mathrm{MnO_4^-}$ est en excès.`,
            'Avant : MnO₄⁻ est consommé dès qu’il est versé, le bécher reste quasi incolore. Après : MnO₄⁻ s’accumule, la solution devient rose puis violette. L’équivalence est repérée par la **première goutte** qui donne une teinte rose **persistante**.',
            'L’équivalence est l’état du système où les réactifs titré et titrant ont été introduits dans les proportions stœchiométriques de la réaction support (changement de réactif limitant).',
          ],
        },
      ],
    },
    {
      id: 'titrage-diiode',
      title: 'Titrage d’une solution de diiode',
      difficulty: 1,
      duration: 8,
      tags: ['relation à l’équivalence'],
      statement: [
        {
          type: 'p',
          text: r`On titre $V_1 = 20{,}0\ \mathrm{mL}$ d'une solution de diiode par une solution de thiosulfate de sodium à $C_2 = 5{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$. En présence d'empois d'amidon, la teinte bleue disparaît pour $V_E = 9{,}6\ \mathrm{mL}$.\nRéaction support : $\mathrm{I_2 + 2\,S_2O_3^{2-} \to 2\,I^- + S_4O_6^{2-}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: ['Écrire la relation à l’équivalence.', 'Calculer la concentration en diiode de la solution titrée.', 'Pourquoi ajoute-t-on l’empois d’amidon ?'],
        },
      ],
      hints: ['Coefficient 1 pour I₂, 2 pour S₂O₃²⁻.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\dfrac{n(\mathrm{I_2})}{1} = \dfrac{n_E(\mathrm{S_2O_3^{2-}})}{2}$, soit $C_1V_1 = \dfrac{C_2V_E}{2}$.`,
            r`$C_1 = \dfrac{C_2V_E}{2V_1} = \dfrac{5{,}00\times10^{-2}\times9{,}6}{2\times20{,}0} = 1{,}2\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ (2 chiffres significatifs, imposés par $V_E$). Les volumes étant tous deux en mL, leur rapport ne nécessite pas de conversion.`,
            'Le jaune pâle du diiode juste avant l’équivalence est difficile à distinguer de l’incolore. L’empois d’amidon forme avec le diiode un complexe bleu intense : la disparition du bleu marque nettement l’équivalence.',
          ],
        },
      ],
    },
    {
      id: 'titrage-fer-permanganate',
      title: 'Titrage des ions fer(II)',
      difficulty: 2,
      duration: 10,
      tags: ['coefficients', 'permanganate'],
      statement: [
        {
          type: 'p',
          text: r`On titre $V_1 = 20{,}0\ \mathrm{mL}$ d'une solution de sulfate de fer(II) acidifiée par une solution de permanganate de potassium à $C_2 = 2{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$. La teinte rose persiste à partir de $V_E = 14{,}6\ \mathrm{mL}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            r`Retrouver l'équation de la réaction support à partir des couples $\mathrm{MnO_4^-/Mn^{2+}}$ et $\mathrm{Fe^{3+}/Fe^{2+}}$.`,
            r`Déterminer la quantité de matière puis la concentration en ions $\mathrm{Fe^{2+}}$.`,
            r`Un élève écrit $C_1V_1 = C_2V_E$. Quelle valeur trouve-t-il ? Commenter.`,
          ],
        },
      ],
      hints: ['Le permanganate capte 5 électrons, Fe²⁺ en cède 1.', 'n(Fe²⁺)/5 = n_E(MnO₄⁻)/1.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$ et $\mathrm{Fe^{2+} \to Fe^{3+} + e^-}$ ($\times5$) : $\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}$.`,
            r`À l'équivalence : $\dfrac{n(\mathrm{Fe^{2+}})}{5} = C_2V_E$, donc $n(\mathrm{Fe^{2+}}) = 5\times2{,}00\times10^{-2}\times14{,}6\times10^{-3} = 1{,}46\times10^{-3}\ \mathrm{mol}$ et $C_1 = \dfrac{1{,}46\times10^{-3}}{20{,}0\times10^{-3}} = 7{,}30\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$.`,
            r`Il trouverait $C_1 = \dfrac{2{,}00\times10^{-2}\times14{,}6}{20{,}0} = 1{,}46\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ : 5 fois trop petit. Il a oublié les coefficients stœchiométriques : un ion permanganate réagit avec **cinq** ions fer(II).`,
          ],
        },
      ],
    },
    {
      id: 'choix-titrant',
      title: 'Choisir la concentration du titrant',
      difficulty: 2,
      duration: 8,
      tags: ['protocole', 'burette'],
      statement: [
        {
          type: 'p',
          text: r`On veut titrer $V_A = 10{,}0\ \mathrm{mL}$ d'une solution de diiode de concentration voisine de $1\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ avec une burette de 25 mL. On dispose de trois solutions de thiosulfate : $1{,}00\times10^{-1}$, $1{,}00\times10^{-2}$ et $1{,}00\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$.`,
        },
        { type: 'p', text: 'Calculer le volume équivalent attendu dans chaque cas et choisir la solution la plus adaptée.' },
      ],
      hints: ['V_E = 2 C_A V_A / C_B.'],
      solution: [
        {
          type: 'p',
          text: r`Relation à l'équivalence : $C_AV_A = \dfrac{C_BV_E}{2}$, donc $V_E = \dfrac{2C_AV_A}{C_B} = \dfrac{2\times1\times10^{-2}\times10{,}0}{C_B}\ \mathrm{mL} = \dfrac{0{,}2}{C_B}\ \mathrm{mL}$.`,
        },
        {
          type: 'list',
          items: [
            r`$C_B = 1{,}00\times10^{-1}$ : $V_E \approx 2$ mL, trop petit, la précision relative serait mauvaise.`,
            r`$C_B = 1{,}00\times10^{-2}$ : $V_E \approx 20$ mL, **adapté** (dans la burette de 25 mL, précision relative correcte).`,
            r`$C_B = 1{,}00\times10^{-3}$ : $V_E \approx 200$ mL, impossible avec une burette de 25 mL.`,
          ],
        },
      ],
    },
    {
      id: 'protocole-titrage',
      title: 'Rédiger un protocole de titrage',
      difficulty: 1,
      duration: 10,
      tags: ['protocole', 'matériel'],
      statement: [
        {
          type: 'p',
          text: 'On veut réaliser le titrage de 10,0 mL d’une solution de diiode par une solution de thiosulfate de sodium de concentration connue.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Faire la liste du matériel nécessaire.',
            'Rédiger le protocole, depuis le prélèvement jusqu’à la lecture de V_E.',
            'Pourquoi rince-t-on la burette avec la solution titrante et non avec de l’eau distillée ?',
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Pipette jaugée de 10,0 mL + propipette, bécher (ou erlenmeyer), burette graduée de 25 mL sur support avec pince, agitateur magnétique et barreau aimanté, béchers de transvasement, empois d’amidon, pissette d’eau distillée.',
            'Prélever 10,0 mL de solution de diiode à la pipette jaugée et les verser dans le bécher avec le barreau aimanté. Rincer puis remplir la burette avec la solution de thiosulfate, chasser la bulle d’air, ajuster au zéro. Mettre en route l’agitation. Faire un titrage rapide (mL par mL) pour encadrer V_E. Refaire un prélèvement ; verser rapidement jusqu’à 1 mL avant l’encadrement, ajouter quelques gouttes d’empois d’amidon (bleu), puis verser goutte à goutte. Lire V_E à la disparition de la teinte bleue.',
            'L’eau résiduelle dans la burette diluerait la solution titrante : sa concentration réelle serait plus faible que C_B et le volume équivalent mesuré serait trop grand.',
          ],
        },
      ],
    },
    {
      id: 'vitamine-c',
      title: 'Vitamine C d’un comprimé',
      difficulty: 2,
      duration: 15,
      tags: ['vitamine C', 'écart relatif'],
      statement: [
        {
          type: 'p',
          text: r`Un comprimé de « Vitamine C 500 » contient, selon la notice, 500 mg d'acide ascorbique $\mathrm{C_6H_8O_6}$. On le dissout dans une fiole jaugée de $100{,}0\ \mathrm{mL}$ (solution S). On titre $V_1 = 10{,}0\ \mathrm{mL}$ de S par une solution de diiode à $C_2 = 2{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ en présence d'empois d'amidon. L'équivalence est obtenue pour $V_E = 14{,}1\ \mathrm{mL}$.\nRéaction support : $\mathrm{C_6H_8O_6 + I_2 \to C_6H_6O_6 + 2\,I^- + 2\,H^+}$. Données : $M(\mathrm{C}) = 12{,}0$ ; $M(\mathrm{H}) = 1{,}0$ ; $M(\mathrm{O}) = 16{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Comment repère-t-on l’équivalence ?',
            'Calculer la quantité d’acide ascorbique dans le bécher puis dans le comprimé.',
            'En déduire la masse d’acide ascorbique du comprimé et l’écart relatif avec la valeur annoncée.',
          ],
        },
      ],
      hints: ['Coefficients 1 et 1.', 'Le bécher ne contient qu’un dixième du comprimé.', 'M(C₆H₈O₆) = 176 g·mol⁻¹.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Avant l’équivalence, le diiode versé est consommé : la solution reste incolore. Dès que l’acide ascorbique est épuisé, le diiode en excès forme avec l’empois d’amidon un complexe bleu : l’équivalence correspond à l’apparition d’une **teinte bleue persistante**.',
            r`$n_{\text{bécher}} = C_2V_E = 2{,}00\times10^{-2}\times14{,}1\times10^{-3} = 2{,}82\times10^{-4}$ mol. Le bécher contient $10{,}0/100{,}0$ de la solution S, donc $n_{\text{comprimé}} = 10\times2{,}82\times10^{-4} = 2{,}82\times10^{-3}$ mol.`,
            r`$M = 6\times12{,}0 + 8\times1{,}0 + 6\times16{,}0 = 176\ \mathrm{g\cdot mol^{-1}}$ ; $m = 2{,}82\times10^{-3}\times176 = 0{,}496\ \mathrm{g} = 496\ \mathrm{mg}$.\nÉcart relatif : $\dfrac{|496 - 500|}{500} = 0{,}8\ \%$ : résultat en très bon accord avec la notice.`,
          ],
        },
      ],
    },
    {
      id: 'so2-vin',
      title: 'Dioxyde de soufre dans un vin blanc',
      difficulty: 2,
      duration: 15,
      tags: ['SO₂', 'contrôle qualité'],
      statement: [
        {
          type: 'p',
          text: r`Le dioxyde de soufre $\mathrm{SO_2}$ est un conservateur du vin (E220). Pour un vin blanc sec, la réglementation européenne limite sa concentration en masse totale à $200\ \mathrm{mg\cdot L^{-1}}$.\nOn titre $V_1 = 20{,}0\ \mathrm{mL}$ de vin blanc acidifié, additionné d'empois d'amidon, par une solution de diiode à $C_2 = 1{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$. La teinte bleue apparaît pour $V_E = 6{,}1\ \mathrm{mL}$.\nDonnées : couples $\mathrm{I_2/I^-}$ et $\mathrm{SO_4^{2-}/SO_2}$ ; $M(\mathrm{SO_2}) = 64{,}1\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Établir l’équation de la réaction support.',
            r`Déterminer la concentration en masse de $\mathrm{SO_2}$ dans le vin.`,
            'Le vin est-il conforme ? Pourquoi le résultat mérite-t-il d’être confirmé ?',
          ],
        },
      ],
      hints: ['SO₄²⁻ + 4 H⁺ + 2 e⁻ = SO₂ + 2 H₂O.', 'Coefficients 1 et 1.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            r`$\mathrm{I_2 + 2\,e^- \to 2\,I^-}$ et $\mathrm{SO_2 + 2\,H_2O \to SO_4^{2-} + 4\,H^+ + 2\,e^-}$ : $\mathrm{SO_2 + I_2 + 2\,H_2O \to SO_4^{2-} + 2\,I^- + 4\,H^+}$.`,
            r`$n(\mathrm{SO_2}) = C_2V_E = 1{,}00\times10^{-2}\times6{,}1\times10^{-3} = 6{,}1\times10^{-5}$ mol ; $C = \dfrac{6{,}1\times10^{-5}}{20{,}0\times10^{-3}} = 3{,}1\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$ ; $C_m = C\times M = 3{,}05\times10^{-3}\times64{,}1 = 0{,}20\ \mathrm{g\cdot L^{-1}}$, soit $2{,}0\times10^{2}\ \mathrm{mg\cdot L^{-1}}$ avec deux chiffres significatifs (196 mg·L⁻¹ avant arrondi).`,
            'La valeur trouvée (≈ 196 mg·L⁻¹) est inférieure à la limite de 200 mg·L⁻¹ mais très proche : compte tenu de l’incertitude (V_E connu à 2 chiffres significatifs, repérage de la teinte bleue), on ne peut pas conclure avec certitude. Il faudrait répéter le titrage, éventuellement avec un titrant plus dilué pour obtenir un V_E plus grand et plus précis.',
          ],
        },
      ],
    },
    {
      id: 'eau-oxygenee',
      title: 'Eau oxygénée « 10 volumes »',
      difficulty: 3,
      duration: 20,
      tags: ['dilution', 'titrage', 'permanganate'],
      statement: [
        {
          type: 'p',
          text: r`Une eau oxygénée commerciale porte l'indication « 10 volumes » : 1 L de solution peut libérer 10 L de dioxygène (mesurés à 0 °C et 1 atm, $V_m = 22{,}4\ \mathrm{L\cdot mol^{-1}}$) selon $\mathrm{2\,H_2O_2 \to 2\,H_2O + O_2}$.\nOn dilue 10 fois la solution commerciale. On titre $V_1 = 10{,}0\ \mathrm{mL}$ de la solution diluée, acidifiée, par une solution de permanganate de potassium à $C_2 = 2{,}00\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ : $V_E = 17{,}6\ \mathrm{mL}$.\nRéaction support : $\mathrm{2\,MnO_4^- + 5\,H_2O_2 + 6\,H^+ \to 2\,Mn^{2+} + 5\,O_2 + 8\,H_2O}$. $M(\mathrm{H_2O_2}) = 34{,}0\ \mathrm{g\cdot mol^{-1}}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire le protocole de la dilution (verrerie).',
            'Pourquoi n’a-t-on pas titré directement la solution commerciale ?',
            'Établir la relation à l’équivalence et calculer la concentration de la solution diluée, puis de la solution commerciale.',
            'Calculer la concentration en masse de H₂O₂ de la solution commerciale.',
            'Vérifier l’indication « 10 volumes ».',
          ],
        },
      ],
      hints: [
        'n(H₂O₂)/5 = n_E(MnO₄⁻)/2.',
        'Pour la question 2 : calculer le V_E qu’on aurait obtenu sans dilution.',
        'n(O₂) = n(H₂O₂)/2 pour 1 L.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Prélever 10,0 mL de solution commerciale à la pipette jaugée, les verser dans une fiole jaugée de 100,0 mL, compléter à l’eau distillée jusqu’au trait de jauge, boucher et homogénéiser.',
            'Sans dilution, le volume équivalent serait 10 fois plus grand (≈ 176 mL) : il dépasserait largement la capacité de la burette.',
            r`$\dfrac{n(\mathrm{H_2O_2})}{5} = \dfrac{C_2V_E}{2}$, donc $n(\mathrm{H_2O_2}) = \dfrac{5}{2}\times2{,}00\times10^{-2}\times17{,}6\times10^{-3} = 8{,}80\times10^{-4}$ mol.\n$C_{\text{dil}} = \dfrac{8{,}80\times10^{-4}}{10{,}0\times10^{-3}} = 8{,}80\times10^{-2}\ \mathrm{mol\cdot L^{-1}}$ et $C_{\text{com}} = 10\times C_{\text{dil}} = 0{,}880\ \mathrm{mol\cdot L^{-1}}$.`,
            r`$C_m = C_{\text{com}}\times M = 0{,}880\times34{,}0 = 29{,}9\ \mathrm{g\cdot L^{-1}}$.`,
            r`Dans 1 L : $n(\mathrm{H_2O_2}) = 0{,}880$ mol, qui libère $n(\mathrm{O_2}) = \dfrac{0{,}880}{2} = 0{,}440$ mol, soit $V = 0{,}440\times22{,}4 = 9{,}86\ \mathrm{L}$ ≈ 10 L. L'indication « 10 volumes » est vérifiée (écart relatif 1,4 %).`,
          ],
        },
      ],
    },
    {
      id: 'bac-fer-medicament',
      title: 'Type bac : contrôle d’un médicament contre l’anémie',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'titrage', 'oxydoréduction', 'esprit critique'],
      statement: [
        {
          type: 'p',
          text: r`Un médicament contre l'anémie contient du sulfate de fer(II). La notice indique : « fer : 80 mg par comprimé ». On broie un comprimé et on le dissout dans de l'eau acidifiée ; on obtient $V_0 = 100{,}0\ \mathrm{mL}$ de solution S. On titre $V_1 = 10{,}0\ \mathrm{mL}$ de S par une solution de permanganate de potassium de concentration $C_2 = 2{,}00\times10^{-3}\ \mathrm{mol\cdot L^{-1}}$.\nRésultats : titrage rapide, changement de couleur entre 14 et 15 mL ; titrage précis : $V_E = 14{,}2\ \mathrm{mL}$.\nDonnées : $M(\mathrm{Fe}) = 55{,}8\ \mathrm{g\cdot mol^{-1}}$ ; couples $\mathrm{MnO_4^-/Mn^{2+}}$ et $\mathrm{Fe^{3+}/Fe^{2+}}$ ; seules les espèces $\mathrm{MnO_4^-}$ sont colorées (violet) aux concentrations utilisées.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Faire un schéma légendé du montage.',
            'Établir l’équation de la réaction support. Quelles qualités doit-elle posséder ?',
            'Décrire l’évolution de la couleur du mélange et le repérage de l’équivalence. Pourquoi fait-on un titrage rapide ?',
            'Établir la relation à l’équivalence et calculer la quantité d’ions Fe²⁺ dans le bécher.',
            'En déduire la masse de fer contenue dans un comprimé.',
            'Calculer l’écart relatif avec la valeur annoncée et conclure. Citer deux sources d’erreur.',
          ],
        },
      ],
      hints: [
        'Voir le montage dans le cours : burette, bécher, agitateur magnétique.',
        'n(Fe²⁺)/5 = C₂V_E/1.',
        'Le bécher contient 1/10 du comprimé.',
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Burette graduée sur support contenant la solution de permanganate (C₂) ; bécher contenant V₁ = 10,0 mL de solution S et un barreau aimanté ; agitateur magnétique (voir le schéma du cours).',
            r`$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$ et $\mathrm{Fe^{2+} \to Fe^{3+} + e^-}$ ($\times5$) d'où $\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}$. Elle doit être totale, rapide et unique.`,
            'Avant l’équivalence, MnO₄⁻ est limitant et se décolore aussitôt versé : le bécher reste incolore. À l’équivalence, les ions Fe²⁺ sont épuisés : la goutte suivante de MnO₄⁻ persiste, la solution prend une teinte rose pâle persistante. Le titrage rapide donne un encadrement (14 – 15 mL) pour pouvoir ensuite verser goutte à goutte au voisinage de l’équivalence sans la dépasser.',
            r`$\dfrac{n(\mathrm{Fe^{2+}})}{5} = \dfrac{C_2V_E}{1}$, donc $n_{\text{bécher}}(\mathrm{Fe^{2+}}) = 5\times2{,}00\times10^{-3}\times14{,}2\times10^{-3} = 1{,}42\times10^{-4}$ mol.`,
            r`Le comprimé est dissous dans $100{,}0$ mL et on en titre $10{,}0$ mL : $n_{\text{comprimé}} = \dfrac{V_0}{V_1}\times n_{\text{bécher}} = 10\times1{,}42\times10^{-4} = 1{,}42\times10^{-3}$ mol.\n$m(\mathrm{Fe}) = 1{,}42\times10^{-3}\times55{,}8 = 7{,}92\times10^{-2}\ \mathrm{g} = 79{,}2\ \mathrm{mg}$.`,
            r`Écart relatif : $\dfrac{|79{,}2 - 80|}{80} = 1{,}0\ \%$. Cet écart est faible : le résultat est en accord avec la notice. Sources d'erreur : repérage visuel de la teinte rose (une goutte ≈ 0,05 mL), lecture de la burette, précision de la pipette et de la fiole, oxydation partielle des ions Fe²⁺ par le dioxygène de l'air avant le titrage (qui conduirait à sous-estimer la masse de fer).`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ REPRÉSENTATIONS
  representations: [
    {
      type: 'widget',
      id: 'titration',
      title: 'Simulateur de titrage',
      props: { cA: 0.073, vA: 20, cB: 0.02 },
      caption: 'Versez la solution titrante goutte à goutte, observez le changement de couleur et relevez le volume équivalent. Comparez avec la valeur calculée par la relation à l’équivalence.',
    },
    { type: 'svg', svg: svgMontage, caption: 'Montage de titrage : burette, bécher, agitateur magnétique.', maxWidth: 520 },
    {
      type: 'widget',
      id: 'function-plotter',
      title: 'Quantités de matière pendant le titrage du diiode',
      props: {
        expressions: ['n0 - 0.01*x', '0.02*(x - 100*n0)'],
        params: [{ name: 'n0', min: 0.05, max: 0.2, step: 0.002, value: 0.124 }],
        xMin: 0,
        xMax: 25,
        yMin: 0,
        yMax: 0.3,
        editable: false,
      },
      caption: 'Titrage de I₂ (n0 en mmol dans le bécher) par S₂O₃²⁻ à 2,00 × 10⁻² mol·L⁻¹ (x = volume versé en mL). Courbe 1 : n(I₂) restant (avant l’équivalence) ; courbe 2 : n(S₂O₃²⁻) en excès (après). Les deux s’annulent en V_E = 100·n0 mL (12,4 mL pour n0 = 0,124 mmol).',
    },
    { type: 'svg', svg: svgCouleurs, caption: 'Repérage colorimétrique de l’équivalence avec le permanganate.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'La solution titrante est placée :',
          choices: ['dans le bécher', 'dans la burette', 'dans la fiole jaugée', 'dans la pipette'],
          answer: 1,
          explanation: 'Le titrant, de concentration connue, est versé à la burette graduée.',
        },
        {
          question: 'Une réaction support de titrage doit être :',
          choices: ['lente et totale', 'rapide, totale et unique', 'non totale', 'colorée'],
          answer: 1,
          explanation: 'Rapide, totale et unique (sélective).',
        },
        {
          question: 'À l’équivalence :',
          choices: [
            'le titrant est en excès',
            'les réactifs ont été introduits dans les proportions stœchiométriques',
            'le titré est en excès',
            'la réaction s’arrête car elle est trop lente',
          ],
          answer: 1,
          explanation: 'C’est la définition de l’équivalence (changement de réactif limitant).',
        },
        {
          question: 'Avant l’équivalence, le réactif limitant est :',
          choices: ['le réactif titré', 'le réactif titrant', 'l’eau', 'aucun'],
          answer: 1,
          explanation: 'Chaque goutte de titrant est entièrement consommée.',
        },
        {
          question: r`Pour la réaction support $\mathrm{MnO_4^- + 5\,Fe^{2+} + \dots}$, la relation à l'équivalence est :`,
          choices: [
            r`$n(\mathrm{Fe^{2+}}) = C_BV_E$`,
            r`$n(\mathrm{Fe^{2+}}) = 5\,C_BV_E$`,
            r`$n(\mathrm{Fe^{2+}}) = C_BV_E/5$`,
            r`$5\,n(\mathrm{Fe^{2+}}) = C_BV_E$`,
          ],
          answer: 1,
          explanation: r`$n(\mathrm{Fe^{2+}})/5 = n(\mathrm{MnO_4^-})/1$.`,
        },
        {
          question: 'Lors du titrage de I₂ par S₂O₃²⁻ avec empois d’amidon, l’équivalence correspond à :',
          choices: ['l’apparition du bleu', 'la disparition du bleu', 'l’apparition du violet', 'un précipité'],
          answer: 1,
          explanation: 'Le diiode (titré) disparaît à l’équivalence : le complexe bleu disparaît.',
        },
        {
          question: 'Ajouter 20 mL d’eau distillée dans le bécher avant le titrage :',
          choices: ['augmente V_E', 'diminue V_E', 'ne change pas V_E', 'empêche le titrage'],
          answer: 2,
          explanation: 'La quantité de réactif titré n’est pas modifiée.',
        },
        {
          question: 'Si on ne rince pas la burette avec la solution titrante (eau résiduelle), V_E mesuré est :',
          choices: ['trop grand', 'trop petit', 'inchangé', 'nul'],
          answer: 0,
          explanation: 'Le titrant est dilué : il faut en verser davantage.',
        },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre le protocole d’un titrage',
      items: [
        'Prélever V_A de solution titrée à la pipette jaugée et la verser dans le bécher',
        'Rincer la burette avec la solution titrante puis la remplir',
        'Chasser la bulle d’air et ajuster le zéro',
        'Placer le bécher sur l’agitateur magnétique avec un barreau aimanté',
        'Réaliser un titrage rapide pour encadrer V_E',
        'Refaire un titrage précis, goutte à goutte près de V_E',
        'Noter V_E au changement de couleur persistant',
      ],
    },
    {
      type: 'matching',
      title: 'Titrage → changement de couleur à l’équivalence',
      pairs: [
        { left: 'Fe²⁺ titré par MnO₄⁻', right: 'apparition d’une teinte rose persistante' },
        { left: 'I₂ titré par S₂O₃²⁻ (+ amidon)', right: 'disparition de la teinte bleue' },
        { left: 'Vitamine C titrée par I₂ (+ amidon)', right: 'apparition d’une teinte bleue persistante' },
        { left: 'H₂O₂ titrée par MnO₄⁻', right: 'persistance de la couleur violette du permanganate' },
      ],
    },
    {
      type: 'cloze',
      title: 'L’équivalence',
      text: 'À l’équivalence, les réactifs titré et titrant ont été introduits dans les proportions {{stœchiométriques|stoechiométriques|stoechiometriques}}. Il y a changement de réactif {{limitant}}. Avant l’équivalence, le réactif limitant est le réactif {{titrant}} ; après l’équivalence, c’est le réactif {{titré|titre}}.',
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Titrage', back: 'Dosage destructif mettant en jeu une réaction chimique entre l’espèce titrée et un réactif titrant de concentration connue.' },
        { front: 'Qualités d’une réaction support', back: 'Totale, rapide, unique.' },
        { front: 'Équivalence', back: 'Réactifs titré et titrant introduits dans les proportions stœchiométriques ; changement de réactif limitant.' },
        { front: 'Relation à l’équivalence (aA + bB)', back: r`$\dfrac{C_AV_A}{a} = \dfrac{C_BV_E}{b}$` },
        { front: 'Rôle de l’empois d’amidon', back: 'Forme un complexe bleu foncé avec le diiode : repérage net de sa présence.' },
        { front: 'Pourquoi un titrage rapide ?', back: 'Pour encadrer V_E avant de faire un titrage précis goutte à goutte.' },
        { front: 'Pourquoi rincer la burette avec le titrant ?', back: 'Pour ne pas diluer la solution titrante.' },
        { front: 'Repérage avec MnO₄⁻', back: 'Persistance de la teinte rose-violette : MnO₄⁻ n’est plus consommé.' },
        { front: 'Volume équivalent idéal (burette 25 mL)', back: 'Entre 10 et 20 mL environ.' },
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Un titrage est un dosage non destructif.', answer: false, explanation: 'L’espèce titrée est consommée par la réaction support.' },
        { text: 'À l’équivalence, on a toujours C_A V_A = C_B V_E.', answer: false, explanation: 'Seulement si les coefficients stœchiométriques sont égaux.' },
        { text: 'Après l’équivalence, le réactif titrant s’accumule dans le bécher.', answer: true },
        { text: 'Le volume V_A doit être prélevé avec une pipette jaugée.', answer: true },
        { text: 'La réaction support doit être lente pour bien observer la couleur.', answer: false, explanation: 'Elle doit être rapide.' },
      ],
    },
  ],
}

export default chapter
