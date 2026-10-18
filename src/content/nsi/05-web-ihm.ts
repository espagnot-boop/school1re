import type { Chapter } from '../types'

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const SVG_URL = `<svg viewBox="0 0 700 170" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g font-family="monospace" font-size="15" fill="currentColor">
    <text x="20" y="60">https://www.exemple.fr:443/cours/nsi.html?chap=5&amp;niveau=1re#formulaires</text>
  </g>
  <g fill="none" stroke-width="2">
    <line x1="20" y1="70" x2="62" y2="70" stroke="hsl(217 91% 60%)"/>
    <line x1="92" y1="70" x2="216" y2="70" stroke="hsl(142 71% 45%)"/>
    <line x1="227" y1="70" x2="252" y2="70" stroke="hsl(25 95% 53%)"/>
    <line x1="256" y1="70" x2="388" y2="70" stroke="hsl(263 70% 60%)"/>
    <line x1="398" y1="70" x2="550" y2="70" stroke="hsl(0 84% 60%)"/>
    <line x1="560" y1="70" x2="659" y2="70" stroke="currentColor"/>
  </g>
  <g font-size="12">
    <text x="20" y="95" fill="hsl(217 91% 60%)">protocole</text>
    <text x="20" y="110" fill="hsl(217 91% 60%)">(schéma)</text>
    <text x="100" y="95" fill="hsl(142 71% 45%)">nom de domaine</text>
    <text x="100" y="110" fill="hsl(142 71% 45%)">(serveur)</text>
    <text x="225" y="130" fill="hsl(25 95% 53%)">port</text>
    <text x="265" y="95" fill="hsl(263 70% 60%)">chemin de la</text>
    <text x="265" y="110" fill="hsl(263 70% 60%)">ressource</text>
    <text x="400" y="95" fill="hsl(0 84% 60%)">paramètres (après ?)</text>
    <text x="400" y="110" fill="hsl(0 84% 60%)">nom=valeur séparés par &amp;</text>
    <text x="565" y="95" fill="currentColor">ancre (après #)</text>
    <text x="565" y="110" fill="currentColor" opacity="0.7">jamais envoyée</text>
    <text x="565" y="125" fill="currentColor" opacity="0.7">au serveur</text>
  </g>
  <text x="20" y="25" fill="currentColor" font-weight="600">Anatomie d’une URL (Uniform Resource Locator)</text>
  <text x="20" y="158" fill="currentColor" opacity="0.7" font-size="11">Port par défaut : 80 pour http, 443 pour https — on l’omet presque toujours.</text>
</svg>`

const SVG_CLIENT_SERVEUR = `<svg viewBox="0 0 680 330" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="arW" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
  </defs>
  <rect x="30" y="20" width="150" height="50" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
  <text x="105" y="42" text-anchor="middle" fill="currentColor" font-weight="600">Client</text>
  <text x="105" y="58" text-anchor="middle" fill="currentColor" font-size="11">navigateur</text>
  <rect x="500" y="20" width="150" height="50" fill="hsl(142 71% 45% / 0.15)" stroke="hsl(142 71% 45%)"/>
  <text x="575" y="42" text-anchor="middle" fill="currentColor" font-weight="600">Serveur</text>
  <text x="575" y="58" text-anchor="middle" fill="currentColor" font-size="11">serveur web</text>
  <line x1="105" y1="70" x2="105" y2="320" stroke="currentColor" stroke-dasharray="4 4" opacity="0.6"/>
  <line x1="575" y1="70" x2="575" y2="320" stroke="currentColor" stroke-dasharray="4 4" opacity="0.6"/>
  <line x1="105" y1="105" x2="575" y2="125" stroke="currentColor" marker-end="url(#arW)"/>
  <text x="340" y="100" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="11">① requête : GET /index.html HTTP/1.1</text>
  <rect x="585" y="135" width="90" height="50" fill="none" stroke="hsl(142 71% 45%)" stroke-dasharray="3 3"/>
  <text x="630" y="152" text-anchor="middle" fill="currentColor" font-size="10">② traitement</text>
  <text x="630" y="166" text-anchor="middle" fill="currentColor" font-size="10">(PHP, Python,</text>
  <text x="630" y="179" text-anchor="middle" fill="currentColor" font-size="10">base de données)</text>
  <line x1="575" y1="200" x2="105" y2="220" stroke="currentColor" marker-end="url(#arW)"/>
  <text x="340" y="198" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="11">③ réponse : HTTP/1.1 200 OK + page HTML</text>
  <rect x="5" y="235" width="200" height="60" fill="none" stroke="hsl(217 91% 60%)" stroke-dasharray="3 3"/>
  <text x="105" y="253" text-anchor="middle" fill="currentColor" font-size="10">④ le navigateur affiche la page</text>
  <text x="105" y="267" text-anchor="middle" fill="currentColor" font-size="10">et exécute le JavaScript</text>
  <text x="105" y="281" text-anchor="middle" fill="currentColor" font-size="10">(événements = côté client)</text>
  <text x="340" y="315" text-anchor="middle" fill="currentColor" opacity="0.7" font-size="11">Chaque ressource (CSS, image, script) fait l’objet d’une requête distincte.</text>
</svg>`

const SVG_DOM = `<svg viewBox="0 0 640 260" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" fill="none">
    <line x1="320" y1="40" x2="170" y2="85"/>
    <line x1="320" y1="40" x2="470" y2="85"/>
    <line x1="170" y1="105" x2="170" y2="150"/>
    <line x1="470" y1="105" x2="360" y2="150"/>
    <line x1="470" y1="105" x2="470" y2="150"/>
    <line x1="470" y1="105" x2="580" y2="150"/>
    <line x1="580" y1="170" x2="580" y2="210"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-family="monospace">
    <rect x="280" y="20" width="80" height="22" fill="hsl(263 70% 60% / 0.18)" stroke="hsl(263 70% 60%)"/><text x="320" y="36">html</text>
    <rect x="130" y="85" width="80" height="22" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/><text x="170" y="101">head</text>
    <rect x="430" y="85" width="80" height="22" fill="hsl(217 91% 60% / 0.18)" stroke="hsl(217 91% 60%)"/><text x="470" y="101">body</text>
    <rect x="130" y="150" width="80" height="22" fill="hsl(142 71% 45% / 0.18)" stroke="hsl(142 71% 45%)"/><text x="170" y="166">title</text>
    <rect x="320" y="150" width="80" height="22" fill="hsl(142 71% 45% / 0.18)" stroke="hsl(142 71% 45%)"/><text x="360" y="166">h1</text>
    <rect x="430" y="150" width="80" height="22" fill="hsl(142 71% 45% / 0.18)" stroke="hsl(142 71% 45%)"/><text x="470" y="166">p</text>
    <rect x="530" y="150" width="100" height="22" fill="hsl(142 71% 45% / 0.18)" stroke="hsl(142 71% 45%)"/><text x="580" y="166">button#ok</text>
    <rect x="530" y="210" width="100" height="22" fill="none" stroke="currentColor" stroke-dasharray="3 3"/><text x="580" y="226" font-size="11">"Valider"</text>
  </g>
  <text x="20" y="215" fill="currentColor" font-size="11">Le navigateur transforme le code HTML</text>
  <text x="20" y="230" fill="currentColor" font-size="11">en un ARBRE d’objets : le DOM.</text>
  <text x="20" y="245" fill="currentColor" font-size="11">JavaScript lit et modifie cet arbre.</text>
</svg>`

const SVG_GET_POST = `<svg viewBox="0 0 680 230" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <rect x="10" y="20" width="320" height="200" fill="none" stroke="hsl(217 91% 60%)"/>
  <text x="170" y="40" text-anchor="middle" fill="hsl(217 91% 60%)" font-weight="600">method="get"</text>
  <g font-family="monospace" font-size="11" fill="currentColor">
    <text x="20" y="65">GET /recherche?q=nsi&amp;tri=date HTTP/1.1</text>
    <text x="20" y="82">Host: www.exemple.fr</text>
    <text x="20" y="99" opacity="0.6">(pas de corps)</text>
  </g>
  <g font-size="11" fill="currentColor">
    <text x="20" y="130">• données visibles dans l’URL</text>
    <text x="20" y="147">• gardées dans l’historique, partageables</text>
    <text x="20" y="164">• taille limitée</text>
    <text x="20" y="181">• pour LIRE / rechercher</text>
  </g>
  <rect x="350" y="20" width="320" height="200" fill="none" stroke="hsl(25 95% 53%)"/>
  <text x="510" y="40" text-anchor="middle" fill="hsl(25 95% 53%)" font-weight="600">method="post"</text>
  <g font-family="monospace" font-size="11" fill="currentColor">
    <text x="360" y="65">POST /connexion HTTP/1.1</text>
    <text x="360" y="82">Host: www.exemple.fr</text>
    <text x="360" y="99">Content-Type: application/x-www-...</text>
    <text x="360" y="116" fill="hsl(25 95% 53%)">login=alice&amp;mdp=s3cr3t</text>
  </g>
  <g font-size="11" fill="currentColor">
    <text x="360" y="147">• données dans le CORPS de la requête</text>
    <text x="360" y="164">• absentes de l’URL et de l’historique</text>
    <text x="360" y="181">• pour ENVOYER / modifier des données</text>
    <text x="360" y="205" fill="hsl(0 84% 60%)">⚠ en clair sans HTTPS !</text>
  </g>
</svg>`

// ---------------------------------------------------------------------------
// Exemples pour le html-playground
// ---------------------------------------------------------------------------

const PG_COMPTEUR = {
  html: `<h1>Compteur de clics</h1>
<p>Nombre de clics : <span id="nb">0</span></p>
<button id="plus">+1</button>
<button id="raz">Remise à zéro</button>`,
  css: `body { font-family: sans-serif; padding: 1rem; }
button { padding: .5rem 1rem; margin-right: .5rem; cursor: pointer; }
#nb { font-weight: bold; color: #2563eb; }`,
  js: `let compteur = 0;
const affichage = document.getElementById('nb');

document.getElementById('plus').addEventListener('click', function () {
  compteur = compteur + 1;
  affichage.textContent = compteur;
});

document.getElementById('raz').addEventListener('click', function () {
  compteur = 0;
  affichage.textContent = compteur;
});`,
}

const PG_FORMULAIRE = {
  html: `<form id="f" action="/inscription" method="get">
  <label for="prenom">Prénom</label>
  <input type="text" id="prenom" name="prenom" required>
  <label for="age">Âge</label>
  <input type="number" id="age" name="age" min="10" max="20">
  <label for="spe">Spécialité</label>
  <select id="spe" name="spe">
    <option value="nsi">NSI</option>
    <option value="maths">Maths</option>
  </select>
  <button type="submit">Envoyer</button>
</form>
<p>URL qui serait demandée :</p>
<pre id="url">—</pre>`,
  css: `body { font-family: sans-serif; padding: 1rem; }
form { display: grid; gap: .4rem; max-width: 260px; }
pre { background: #eee; color: #111; padding: .5rem; white-space: pre-wrap; }`,
  js: `document.getElementById('f').addEventListener('submit', function (evt) {
  evt.preventDefault();               // on bloque l'envoi réel
  const donnees = new FormData(evt.target);
  const parametres = new URLSearchParams(donnees).toString();
  document.getElementById('url').textContent = '/inscription?' + parametres;
});`,
}

const PG_EVENEMENTS = {
  html: `<div id="zone">Survolez-moi, cliquez, double-cliquez</div>
<input id="saisie" placeholder="Tapez du texte">
<ul id="journal"></ul>`,
  css: `body { font-family: sans-serif; padding: 1rem; }
#zone { padding: 1.5rem; border: 2px solid #2563eb; margin-bottom: .5rem; }
#zone.survol { background: #dbeafe; color: #111; }
#journal { font-family: monospace; font-size: 12px; max-height: 140px; overflow: auto; }`,
  js: `const zone = document.getElementById('zone');
const journal = document.getElementById('journal');

function noter(texte) {
  const li = document.createElement('li');
  li.textContent = texte;
  journal.prepend(li);
}

zone.addEventListener('mouseover', function () { zone.classList.add('survol'); noter('mouseover'); });
zone.addEventListener('mouseout',  function () { zone.classList.remove('survol'); noter('mouseout'); });
zone.addEventListener('click',     function () { noter('click'); });
zone.addEventListener('dblclick',  function () { noter('dblclick'); });
document.getElementById('saisie').addEventListener('keydown', function (evt) {
  noter('keydown : touche ' + evt.key);
});`,
}

const PG_THEME = {
  html: `<h1 id="titre">Mode clair / sombre</h1>
<p>Un clic sur le bouton change la classe du corps de la page :
le CSS fait le reste.</p>
<button id="theme">Basculer le thème</button>`,
  css: `body { font-family: sans-serif; padding: 1rem; background: #fff; color: #111; transition: .3s; }
body.sombre { background: #111; color: #eee; }
button { padding: .5rem 1rem; }`,
  js: `document.getElementById('theme').addEventListener('click', function () {
  document.body.classList.toggle('sombre');
});`,
}

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'web-ihm',
  subject: 'nsi',
  order: 5,
  title: 'Interactions homme-machine sur le Web',
  theme: 'Interactions homme-machine sur le Web',
  summary:
    'Structure (HTML) et présentation (CSS) d’une page, gestion des événements en JavaScript, dialogue client-serveur avec le protocole HTTP, formulaires et méthodes GET/POST, URL, HTTPS et cookies.',
  duration: '4 semaines',
  objectives: [
    'Identifier les différents composants graphiques permettant d’interagir avec une application Web.',
    'Identifier les événements que les fonctions associées aux différents composants graphiques sont capables de traiter.',
    'Analyser et modifier les méthodes exécutées lors d’un clic sur un bouton d’une page Web.',
    'Distinguer ce qui est exécuté sur le client ou sur le serveur et dans quel ordre.',
    'Distinguer ce qui est mémorisé dans le client et retransmis au serveur.',
    'Reconnaître quand et pourquoi la transmission est chiffrée (HTTPS).',
    'Analyser le fonctionnement d’un formulaire simple ; distinguer les transmissions de paramètres par les méthodes GET ou POST.',
  ],
  keywords: [
    'HTML',
    'CSS',
    'JavaScript',
    'DOM',
    'événement',
    'addEventListener',
    'client',
    'serveur',
    'HTTP',
    'HTTPS',
    'URL',
    'GET',
    'POST',
    'code de statut',
    'formulaire',
    'cookie',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Trois langages côté client' },
    {
      type: 'table',
      headers: ['Langage', 'Rôle', 'Exemple'],
      rows: [
        ['**HTML**', 'Structure et contenu (balises)', '`<p class="note">Bonjour</p>`'],
        ['**CSS**', 'Présentation (sélecteur → propriétés)', '`.note { color: red; }`'],
        ['**JavaScript**', 'Comportement, réaction aux événements', '`btn.addEventListener(\'click\', f)`'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Événement',
      content: [
        {
          type: 'p',
          text: 'Action détectée par le navigateur (clic, frappe au clavier, survol, envoi d’un formulaire, fin de chargement…). On lui associe une fonction **gestionnaire** : `element.addEventListener(\'click\', maFonction)`.',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Événement', 'Déclenché quand…'],
      rows: [
        ['`click` / `dblclick`', 'clic / double-clic sur l’élément'],
        ['`mouseover` / `mouseout`', 'le pointeur entre dans / sort de l’élément'],
        ['`keydown` / `keyup`', 'une touche est enfoncée / relâchée'],
        ['`input` / `change`', 'la valeur d’un champ est modifiée (à chaque frappe / à la validation)'],
        ['`submit`', 'un formulaire est envoyé'],
        ['`load`', 'la page (ou une image) a fini de se charger'],
      ],
    },
    { type: 'h2', text: 'Client / serveur et HTTP' },
    {
      type: 'list',
      items: [
        'Le **client** (navigateur) envoie une **requête HTTP** ; le **serveur** renvoie une **réponse** (code de statut + en-têtes + contenu).',
        'HTML, CSS et JavaScript sont **exécutés par le client** ; PHP, Python (Flask)… sont exécutés **sur le serveur**, qui envoie au client le HTML produit.',
        'HTTP est **sans état** : chaque requête est indépendante ; les **cookies** permettent au serveur de « reconnaître » un client.',
        '**HTTPS** = HTTP + chiffrement **TLS** : les données (y compris POST et cookies) ne circulent plus en clair.',
      ],
    },
    {
      type: 'table',
      headers: ['Code', 'Signification'],
      rows: [
        ['**200** OK', 'succès'],
        ['**301** / **302**', 'redirection (définitive / temporaire)'],
        ['**304** Not Modified', 'la copie en cache est à jour'],
        ['**400** Bad Request', 'requête mal formée'],
        ['**401** / **403**', 'authentification requise / accès interdit'],
        ['**404** Not Found', 'ressource inexistante'],
        ['**500** Internal Server Error', 'erreur du serveur'],
      ],
      caption: '1xx information, 2xx succès, 3xx redirection, 4xx erreur du client, 5xx erreur du serveur.',
    },
    { type: 'h2', text: 'Formulaires : GET ou POST' },
    {
      type: 'code',
      lang: 'html',
      code: `<form action="/recherche" method="get">
  <input type="text" name="q">
  <button type="submit">Chercher</button>
</form>
<!-- saisie « nsi » → GET /recherche?q=nsi -->`,
    },
    {
      type: 'table',
      headers: ['', 'GET', 'POST'],
      rows: [
        ['Données envoyées', 'dans l’**URL** : `?nom=val&nom2=val2`', 'dans le **corps** de la requête'],
        ['Visibles / historique', 'oui', 'non'],
        ['Usage', 'consultation, recherche', 'connexion, envoi, modification'],
        ['Chiffré ?', 'seulement avec HTTPS', 'seulement avec HTTPS'],
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
            'Seuls les champs ayant un attribut `name` sont envoyés.',
            'POST **n’est pas** un chiffrement : un mot de passe n’est protégé que par **HTTPS**.',
            'Une vérification côté client (JavaScript, `required`) est contournable : le **serveur doit toujours revérifier**.',
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Le Web : un dialogue client-serveur' },
    {
      type: 'p',
      text: 'Le **Web** (*World Wide Web*) est une application d’Internet inventée par **Tim Berners-Lee** au CERN à partir de 1989. Il repose sur trois piliers : les **URL** pour désigner les ressources, le protocole **HTTP** pour les échanger et le langage **HTML** pour décrire les pages.',
    },
    {
      type: 'p',
      text: 'Une **interface homme-machine** (IHM) est l’ensemble des moyens par lesquels un utilisateur interagit avec un système. Sur le Web, l’IHM est la page affichée par le navigateur : boutons, champs de saisie, liens, menus… L’utilisateur agit (clic, frappe), la page réagit, éventuellement après avoir échangé avec un serveur.',
    },
    { type: 'svg', svg: SVG_CLIENT_SERVEUR, caption: 'Le cycle requête-réponse entre un client et un serveur web.' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Client', value: 'Programme qui demande une ressource : en général le **navigateur** (Firefox, Chrome, Safari…).' },
        { key: 'Serveur web', value: 'Programme (Apache, Nginx…) qui attend les requêtes et renvoie les ressources demandées. Par extension, la machine qui l’héberge.' },
        { key: 'Ressource', value: 'Tout ce qui est désigné par une URL : page HTML, feuille CSS, image, script, données JSON…' },
      ],
    },

    { type: 'h2', text: '2. Les URL' },
    {
      type: 'p',
      text: 'Une **URL** (*Uniform Resource Locator*) indique où trouver une ressource et comment y accéder.',
    },
    { type: 'svg', svg: SVG_URL, caption: 'Décomposition d’une URL.' },
    {
      type: 'list',
      items: [
        '**Protocole** : `http` ou `https` (on rencontre aussi `ftp`, `mailto`, `file`…).',
        '**Nom de domaine** : traduit en adresse IP par le système DNS.',
        '**Port** : facultatif ; 80 par défaut pour HTTP, 443 pour HTTPS.',
        '**Chemin** : emplacement de la ressource sur le serveur.',
        '**Paramètres** (*query string*) : après le `?`, des couples `nom=valeur` séparés par `&`. C’est là que sont transmises les données d’un formulaire envoyé en GET.',
        '**Ancre** (fragment) : après le `#`, une position dans la page ; elle est utilisée par le navigateur et n’est pas envoyée au serveur.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Encodage des caractères dans une URL',
      content: [
        {
          type: 'p',
          text: 'Certains caractères (espace, accents, `&`, `=`, `?`…) ne peuvent pas apparaître tels quels dans les paramètres : ils sont **encodés** sous la forme `%XX` (code hexadécimal des octets UTF-8). Ainsi `é` devient `%C3%A9` et, dans un formulaire, l’espace devient `+` (ou `%20`). Exemple : la recherche « café noir » donne `?q=caf%C3%A9+noir`.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Une URL peut aussi être **relative** à la page courante : dans `https://site.fr/cours/nsi.html`, le lien `exos.html` désigne `https://site.fr/cours/exos.html` et `../index.html` désigne `https://site.fr/index.html`.',
    },

    { type: 'h2', text: '3. HTML : la structure' },
    {
      type: 'p',
      text: 'HTML (*HyperText Markup Language*) est un langage de **balisage** : on entoure le contenu de **balises** ouvrantes et fermantes, qui peuvent porter des **attributs**.',
    },
    {
      type: 'code',
      lang: 'html',
      caption: 'Squelette d’une page HTML',
      code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Ma page</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Titre principal</h1>
    <p>Un paragraphe avec un <a href="https://www.education.gouv.fr">lien</a>
       et un mot <strong>important</strong>.</p>
    <img src="logo.png" alt="Logo du lycée">
    <button id="ok">Valider</button>
    <script src="script.js"></script>
  </body>
</html>`,
    },
    {
      type: 'list',
      items: [
        '`<head>` contient les informations sur la page (titre de l’onglet, encodage, liens vers CSS) ; `<body>` contient ce qui est affiché.',
        'Les balises s’**emboîtent** sans se chevaucher : `<p><strong>…</strong></p>` est correct, `<p><strong>…</p></strong>` ne l’est pas.',
        'Certaines balises sont **vides** (pas de balise fermante) : `<img>`, `<input>`, `<br>`, `<meta>`, `<link>`.',
        'L’attribut `id` identifie un élément **unique** de la page ; l’attribut `class` regroupe plusieurs éléments.',
      ],
    },
    {
      type: 'table',
      headers: ['Balise', 'Rôle'],
      rows: [
        ['`<h1>` … `<h6>`', 'titres de niveaux 1 à 6'],
        ['`<p>`', 'paragraphe'],
        ['`<a href="…">`', 'lien hypertexte'],
        ['`<img src="…" alt="…">`', 'image (avec texte alternatif pour l’accessibilité)'],
        ['`<ul>`, `<ol>`, `<li>`', 'listes à puces / numérotée, élément de liste'],
        ['`<div>`, `<span>`', 'conteneurs génériques (bloc / en ligne)'],
        ['`<table>`, `<tr>`, `<td>`', 'tableau, ligne, cellule'],
        ['`<form>`, `<input>`, `<button>`', 'formulaire et composants d’interaction'],
      ],
    },
    { type: 'h3', text: 'Le DOM' },
    {
      type: 'p',
      text: 'En lisant le code HTML, le navigateur construit un **arbre** d’objets appelé **DOM** (*Document Object Model*). Chaque balise devient un nœud ; les éléments emboîtés deviennent ses enfants. C’est sur cet arbre qu’agissent CSS (pour l’affichage) et JavaScript (pour le modifier).',
    },
    { type: 'svg', svg: SVG_DOM, caption: 'Arbre DOM d’une page simple.' },

    { type: 'h2', text: '4. CSS : la présentation' },
    {
      type: 'p',
      text: 'CSS (*Cascading Style Sheets*) décrit l’apparence des éléments. Une **règle** CSS associe un **sélecteur** à un ensemble de déclarations `propriété: valeur;`.',
    },
    {
      type: 'code',
      lang: 'css',
      code: `/* sélecteur de balise : tous les paragraphes */
p { color: #333; line-height: 1.5; }

/* sélecteur de classe : les éléments class="alerte" */
.alerte { color: white; background-color: crimson; padding: 8px; }

/* sélecteur d'identifiant : l'élément id="ok" */
#ok { font-weight: bold; }

/* descendant : les liens situés dans un élément nav */
nav a { text-decoration: none; }

/* pseudo-classe : au survol de la souris */
button:hover { background-color: lightblue; }`,
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'La cascade : quelle règle l’emporte ?',
      content: [
        {
          type: 'list',
          items: [
            'Quand plusieurs règles s’appliquent au même élément pour la même propriété, la plus **spécifique** gagne : identifiant `#id` > classe `.classe` > balise `p`.',
            'À spécificité égale, c’est la règle écrite **en dernier** qui l’emporte.',
            'Un style écrit directement dans l’attribut `style="…"` de la balise est prioritaire sur les feuilles de style (sauf `!important`).',
            'Certaines propriétés (couleur du texte, police) sont **héritées** par les éléments enfants.',
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Séparer structure (HTML) et présentation (CSS) permet de changer tout le style d’un site en modifiant un seul fichier, et facilite l’accessibilité (lecteurs d’écran, affichage sur mobile).',
    },

    { type: 'h2', text: '5. JavaScript et les événements' },
    { type: 'h3', text: '5.1 Programmation événementielle' },
    {
      type: 'p',
      text: 'Un programme d’IHM ne s’exécute pas de façon linéaire « du début à la fin » : il **attend** des événements et y **réagit**. On parle de **programmation événementielle**. En JavaScript, on enregistre une fonction (appelée *gestionnaire* ou *écouteur*) qui sera appelée par le navigateur à chaque fois que l’événement se produit.',
    },
    {
      type: 'code',
      lang: 'javascript',
      code: `// 1. Récupérer l'élément dans le DOM
const bouton = document.getElementById('ok');

// 2. Définir la fonction à exécuter
function quandOnClique() {
  alert('Vous avez cliqué !');
}

// 3. Associer la fonction à l'événement 'click'
bouton.addEventListener('click', quandOnClique);`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'On passe la fonction, on ne l’appelle pas',
      content: [
        {
          type: 'p',
          text: '`addEventListener(\'click\', quandOnClique)` transmet la fonction, qui sera appelée **plus tard**, lors du clic. Écrire `addEventListener(\'click\', quandOnClique())` l’exécuterait **immédiatement**, au chargement, et passerait son résultat (`undefined`) comme gestionnaire : le clic ne ferait alors plus rien.',
        },
      ],
    },
    {
      type: 'p',
      text: 'On rencontre aussi l’ancienne écriture avec un attribut HTML : `<button onclick="quandOnClique()">`. Elle fonctionne mais mélange structure et comportement.',
    },
    { type: 'h3', text: '5.2 Lire et modifier la page' },
    {
      type: 'table',
      headers: ['Instruction', 'Effet'],
      rows: [
        ['`document.getElementById(\'nb\')`', 'renvoie l’élément d’identifiant `nb`'],
        ['`document.querySelector(\'.note\')`', 'renvoie le premier élément correspondant au sélecteur CSS'],
        ['`el.textContent = \'Bonjour\'`', 'remplace le texte de l’élément'],
        ['`champ.value`', 'valeur saisie dans un `<input>` (toujours une **chaîne**)'],
        ['`el.style.color = \'red\'`', 'modifie une propriété CSS'],
        ['`el.classList.add(\'x\')` / `.remove` / `.toggle`', 'ajoute / retire / bascule une classe'],
        ['`document.createElement(\'li\')`', 'crée un nouvel élément (à insérer avec `append`)'],
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : un compteur de clics',
      content: [
        {
          type: 'p',
          text: 'La variable `compteur` est **mémorisée dans le navigateur** tant que la page est ouverte. Aucun échange avec le serveur n’a lieu : tout est exécuté côté client. Si l’on recharge la page, le compteur repart de 0.',
        },
      ],
    },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'Compteur de clics',
      caption: 'Modifiez le code : faites un bouton « −1 », ou changez la couleur quand le compteur dépasse 10.',
      props: PG_COMPTEUR,
    },
    { type: 'h3', text: '5.3 L’objet événement' },
    {
      type: 'p',
      text: 'Le gestionnaire reçoit en paramètre un **objet événement** qui décrit ce qui s’est passé : `evt.target` (l’élément concerné), `evt.key` (la touche pour `keydown`), `evt.clientX` / `evt.clientY` (position de la souris)… La méthode `evt.preventDefault()` annule l’action par défaut du navigateur (suivre un lien, envoyer un formulaire).',
    },
    {
      type: 'code',
      lang: 'javascript',
      code: `const champ = document.getElementById('saisie');
champ.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    console.log('Valeur saisie : ' + champ.value);
  }
});`,
    },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'Observer les événements',
      caption: 'Chaque action de la souris ou du clavier est journalisée. Ajoutez un écouteur pour l’événement « input ».',
      props: PG_EVENEMENTS,
    },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'JavaScript + CSS : changer de thème',
      caption: 'Le JavaScript ne fait que basculer une classe ; c’est le CSS qui décrit l’apparence.',
      props: PG_THEME,
    },

    { type: 'h2', text: '6. Ce qui s’exécute sur le client, ce qui s’exécute sur le serveur' },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Côté client (navigateur)',
          icon: 'Monitor',
          text: 'Affichage HTML/CSS, exécution du JavaScript, réactions immédiates aux événements (menus, animations, vérification de saisie), stockage local (cookies, localStorage). Le code est **visible** par l’utilisateur (« Afficher le code source »).',
        },
        {
          title: 'Côté serveur',
          icon: 'Server',
          text: 'Traitement des requêtes, accès aux **bases de données**, authentification, calcul de pages **dynamiques** (PHP, Python, Node.js…). Le code n’est **pas visible** du client, qui ne reçoit que le résultat (HTML).',
        },
      ],
    },
    {
      type: 'p',
      text: 'Une page **statique** est un fichier HTML envoyé tel quel. Une page **dynamique** est fabriquée par un programme du serveur au moment de la requête (par exemple la liste de *vos* notes sur un ENT). Voici un serveur minimal en Python avec la bibliothèque Flask :',
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Exécuté sur le serveur (Flask)',
      code: `from flask import Flask, request

app = Flask(__name__)

@app.route('/bonjour')
def bonjour():
    prenom = request.args.get('prenom', 'inconnu')   # paramètre GET
    return '<h1>Bonjour ' + prenom + ' !</h1>'

# Requête : GET /bonjour?prenom=Lina
# Réponse : <h1>Bonjour Lina !</h1>   (le client ne voit jamais ce code Python)`,
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Ordre des opérations lors d’un chargement de page',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Saisie de l’URL / clic', text: 'Le navigateur résout le nom de domaine (DNS), puis envoie une requête HTTP.' },
            { title: 'Serveur', text: 'Il exécute éventuellement un programme (PHP, Python) et renvoie une réponse HTML.' },
            { title: 'Analyse', text: 'Le navigateur construit le DOM et demande les ressources liées (CSS, images, scripts) : autant de nouvelles requêtes.' },
            { title: 'Affichage et JavaScript', text: 'La page est affichée, les scripts s’exécutent et enregistrent leurs écouteurs.' },
            { title: 'Interaction', text: 'Les événements déclenchent du code client ; un lien ou un formulaire provoque une nouvelle requête.' },
          ],
        },
      ],
    },

    { type: 'h2', text: '7. Le protocole HTTP' },
    {
      type: 'p',
      text: '**HTTP** (*HyperText Transfer Protocol*) définit le format des messages échangés. Ce sont des messages **texte** (en HTTP/1.1) composés d’une première ligne, d’**en-têtes** puis, éventuellement, d’un **corps**.',
    },
    {
      type: 'code',
      lang: 'http',
      caption: 'Une requête HTTP',
      code: `GET /cours/nsi.html HTTP/1.1
Host: www.exemple.fr
User-Agent: Mozilla/5.0 (X11; Linux x86_64) Firefox/131.0
Accept: text/html
Accept-Language: fr-FR,fr
Cookie: theme=sombre`,
    },
    {
      type: 'code',
      lang: 'http',
      caption: 'La réponse du serveur',
      code: `HTTP/1.1 200 OK
Date: Sun, 18 Oct 2026 08:30:00 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 1534
Set-Cookie: session=a8f3c2; HttpOnly; Secure

<!DOCTYPE html>
<html lang="fr"> ... </html>`,
    },
    {
      type: 'list',
      items: [
        'Ligne de requête : **méthode** (`GET`, `POST`…), **chemin** de la ressource, version du protocole.',
        'L’en-tête `Host` (obligatoire en HTTP/1.1) indique le site visé : un même serveur peut héberger plusieurs sites.',
        'Ligne de statut de la réponse : version, **code de statut** et message (`200 OK`).',
        '`Content-Type` indique la nature du contenu renvoyé (*type MIME* : `text/html`, `text/css`, `image/png`, `application/json`…).',
      ],
    },
    {
      type: 'table',
      headers: ['Famille', 'Codes fréquents'],
      rows: [
        ['**1xx** information', '`100 Continue`'],
        ['**2xx** succès', '`200 OK`, `201 Created`'],
        ['**3xx** redirection', '`301 Moved Permanently`, `302 Found`, `304 Not Modified`'],
        ['**4xx** erreur du client', '`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`'],
        ['**5xx** erreur du serveur', '`500 Internal Server Error`, `503 Service Unavailable`'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'HTTP est un protocole sans état',
      content: [
        {
          type: 'p',
          text: 'Le serveur ne garde **aucun souvenir** des requêtes précédentes : pour lui, deux requêtes successives du même navigateur sont indépendantes. Pour suivre un utilisateur (panier, connexion), il faut un mécanisme supplémentaire : les **cookies**, ou des paramètres répétés dans chaque requête.',
        },
      ],
    },
    {
      type: 'p',
      text: 'On peut observer toutes ces requêtes dans les **outils de développement** du navigateur (touche F12, onglet *Réseau*) : méthode, URL, code de statut, en-têtes, taille et durée de chaque échange.',
    },

    { type: 'h2', text: '8. Les formulaires' },
    {
      type: 'p',
      text: 'Un **formulaire** permet à l’utilisateur de transmettre des données au serveur. L’élément `<form>` précise **où** envoyer les données (`action`) et **comment** (`method`).',
    },
    {
      type: 'code',
      lang: 'html',
      code: `<form action="/inscription" method="post">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>

  <label for="mail">Courriel :</label>
  <input type="email" id="mail" name="mail">

  <label for="mdp">Mot de passe :</label>
  <input type="password" id="mdp" name="mdp" minlength="8">

  <input type="radio" id="g1" name="groupe" value="1"> <label for="g1">Groupe 1</label>
  <input type="radio" id="g2" name="groupe" value="2"> <label for="g2">Groupe 2</label>

  <input type="checkbox" id="cgu" name="cgu" value="oui">
  <label for="cgu">J'accepte le règlement</label>

  <select name="spe">
    <option value="nsi">NSI</option>
    <option value="pc">Physique-chimie</option>
  </select>

  <textarea name="message" rows="4"></textarea>
  <button type="submit">Envoyer</button>
</form>`,
    },
    {
      type: 'list',
      items: [
        'Chaque champ est envoyé sous la forme `name=valeur` : **sans attribut `name`, un champ n’est pas transmis**.',
        'Pour les boutons radio, un seul choix par groupe (même `name`) ; c’est l’attribut `value` du bouton coché qui est envoyé. Une case à cocher non cochée n’est pas envoyée du tout.',
        '`<label for="…">` associe un libellé au champ d’`id` correspondant (cliquer sur le libellé active le champ, utile pour l’accessibilité).',
        'Si `method` est absent, la méthode est **GET** ; si `action` est absent, les données sont envoyées à l’URL de la page courante.',
        'Les attributs `required`, `minlength`, `type="email"`, `min`/`max` déclenchent une **vérification par le navigateur** avant l’envoi.',
      ],
    },
    { type: 'h3', text: 'GET et POST' },
    { type: 'svg', svg: SVG_GET_POST, caption: 'Une même saisie envoyée en GET ou en POST.' },
    {
      type: 'p',
      text: 'Avec **GET**, les paramètres sont ajoutés à l’URL après un `?`. L’URL obtenue peut être mise en favori, partagée, et reste dans l’historique : c’est adapté à une **recherche** (`?q=…`). Avec **POST**, les paramètres sont placés dans le **corps** de la requête : adapté à l’envoi de données qui **modifient** l’état du serveur (inscription, message, commande) ou qui sont **sensibles** (mot de passe).',
    },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'Que transmet un formulaire en GET ?',
      caption: 'Remplissez puis envoyez : le script affiche l’URL construite à partir des attributs name. Essayez des espaces et des accents.',
      props: PG_FORMULAIRE,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'POST ne protège pas les données',
      content: [
        {
          type: 'p',
          text: 'Les données POST n’apparaissent pas dans la barre d’adresse, mais elles circulent **en clair** sur le réseau si la connexion est en HTTP : toute personne interceptant le trafic (Wi-Fi public, par exemple) peut les lire. Seul **HTTPS** chiffre la communication. Un formulaire de connexion doit donc toujours utiliser POST **et** HTTPS.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Ne jamais faire confiance au client',
      content: [
        {
          type: 'p',
          text: 'La vérification d’un formulaire en JavaScript ou par les attributs HTML améliore le **confort** (message immédiat), mais l’utilisateur peut la désactiver ou envoyer une requête fabriquée à la main. Le serveur doit **revérifier toutes les données** reçues.',
        },
      ],
    },
    { type: 'p', text: 'Exemple de vérification côté client avant envoi :' },
    {
      type: 'code',
      lang: 'javascript',
      code: `const formulaire = document.querySelector('form');
formulaire.addEventListener('submit', function (evt) {
  const mdp = document.getElementById('mdp').value;
  if (mdp.length < 8) {
    evt.preventDefault();          // annule l'envoi
    alert('Le mot de passe doit contenir au moins 8 caractères.');
  }
});`,
    },

    { type: 'h2', text: '9. HTTPS' },
    {
      type: 'p',
      text: '**HTTPS** est HTTP transporté dans une connexion chiffrée par le protocole **TLS**. Il garantit :',
    },
    {
      type: 'list',
      items: [
        '**la confidentialité** : les échanges (URL complète, en-têtes, cookies, corps) sont illisibles pour un intermédiaire ;',
        '**l’intégrité** : les données ne peuvent pas être modifiées en chemin sans que cela soit détecté ;',
        '**l’authentification du serveur** : grâce à un **certificat** délivré par une autorité de certification, le navigateur vérifie qu’il parle bien au site annoncé (cadenas dans la barre d’adresse).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: [
        {
          type: 'p',
          text: 'HTTPS ne dit rien de l’honnêteté du site : un site d’hameçonnage peut parfaitement avoir un certificat valide. Le cadenas garantit seulement que la connexion avec *ce* domaine est chiffrée.',
        },
      ],
    },

    { type: 'h2', text: '10. Les cookies (approche)' },
    {
      type: 'p',
      text: 'Un **cookie** est une petite donnée (couple `nom=valeur`) que le **serveur demande au navigateur de mémoriser** grâce à l’en-tête de réponse `Set-Cookie`. Ensuite, le navigateur **renvoie automatiquement** ce cookie dans l’en-tête `Cookie` de chaque requête vers le même site.',
    },
    {
      type: 'code',
      lang: 'http',
      code: `# 1re réponse du serveur
HTTP/1.1 200 OK
Set-Cookie: session=7d1e94b2; HttpOnly; Secure
Set-Cookie: langue=fr; Max-Age=31536000

# Requêtes suivantes du navigateur vers ce site
GET /panier HTTP/1.1
Host: boutique.exemple.fr
Cookie: session=7d1e94b2; langue=fr`,
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Session', icon: 'KeyRound', text: 'Un identifiant de session permet au serveur de savoir que vous êtes connecté, sans redemander le mot de passe à chaque page.' },
        { title: 'Préférences', icon: 'Settings', text: 'Langue, thème clair/sombre, contenu d’un panier.' },
        { title: 'Pistage', icon: 'Eye', text: 'Des cookies « tiers » (déposés par des régies publicitaires) suivent la navigation d’un site à l’autre.' },
      ],
    },
    {
      type: 'list',
      items: [
        'Le cookie est **stocké sur le client** et **retransmis au serveur** : c’est ce qui « contourne » l’absence d’état de HTTP.',
        'L’attribut `Secure` impose l’envoi uniquement en HTTPS ; `HttpOnly` interdit l’accès au cookie par JavaScript (protection contre le vol de session) ; `Max-Age` ou `Expires` fixe sa durée de vie (sinon il disparaît à la fermeture du navigateur).',
        'En Europe, le **RGPD** et les recommandations de la **CNIL** imposent de recueillir le **consentement** de l’utilisateur pour les cookies non indispensables (publicité, mesure d’audience non exemptée).',
        'Un cookie de session volé permet d’usurper la session : d’où l’importance de HTTPS.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Qui mémorise quoi ?',
      content: [
        {
          type: 'table',
          headers: ['Donnée', 'Mémorisée par', 'Retransmise au serveur ?'],
          rows: [
            ['Variable JavaScript', 'client (le temps de la page)', 'non (sauf si le script l’envoie)'],
            ['Cookie', 'client (navigateur)', 'oui, à chaque requête vers le site'],
            ['`localStorage`', 'client', 'non'],
            ['Données de session, comptes', 'serveur (base de données)', '—'],
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'analyser-url',
      title: 'Décomposer des URL',
      difficulty: 1,
      duration: 10,
      tags: ['URL'],
      statement: [
        { type: 'p', text: 'Pour chaque URL, donner le protocole, le nom de domaine, le port utilisé, le chemin et les paramètres.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '`https://fr.wikipedia.org/wiki/Tim_Berners-Lee`',
            '`http://localhost:5000/bonjour?prenom=Lina&classe=1G2`',
            '`https://www.exemple.fr/recherche?q=caf%C3%A9+noir#resultats`',
          ],
        },
        { type: 'p', text: '4. Dans la troisième URL, quelle chaîne a été saisie dans le champ de recherche ? Le serveur reçoit-il `#resultats` ?' },
      ],
      hints: ['Sans port explicite, on utilise le port par défaut du protocole.', '`%C3%A9` est l’encodage UTF-8 de « é ».'],
      solution: [
        {
          type: 'table',
          headers: ['', 'Protocole', 'Domaine', 'Port', 'Chemin', 'Paramètres'],
          rows: [
            ['1', 'https', 'fr.wikipedia.org', '443 (défaut)', '/wiki/Tim_Berners-Lee', 'aucun'],
            ['2', 'http', 'localhost', '5000', '/bonjour', 'prenom = Lina, classe = 1G2'],
            ['3', 'https', 'www.exemple.fr', '443 (défaut)', '/recherche', 'q = café noir'],
          ],
        },
        {
          type: 'p',
          text: '`localhost` désigne la machine elle-même (adresse 127.0.0.1) : c’est typiquement un serveur de développement lancé sur son ordinateur.',
        },
        {
          type: 'p',
          text: '**4.** `%C3%A9` correspond à « é » et `+` à une espace : l’utilisateur a saisi **café noir**. L’ancre `#resultats` n’est **pas** envoyée au serveur : le navigateur l’utilise pour faire défiler la page jusqu’à l’élément d’`id="resultats"`.',
        },
      ],
    },
    {
      id: 'html-arbre',
      title: 'Corriger du HTML et dessiner le DOM',
      difficulty: 1,
      duration: 15,
      tags: ['HTML', 'DOM'],
      statement: [
        { type: 'p', text: 'Un élève a écrit le corps de page suivant :' },
        {
          type: 'code',
          lang: 'html',
          code: `<body>
  <h1>Mes films<h1>
  <p>Mon film préféré est <em>Le Grand Bleu</p></em>
  <ul>
    <li>Drame
    <li>Comédie</li>
  </ul>
  <img src="affiche.jpg">
</body>`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Relever les erreurs et proposer une version corrigée.',
            'Dessiner (sous forme de liste indentée) l’arbre DOM du `<body>` corrigé.',
          ],
        },
      ],
      hints: ['Vérifier que chaque balise ouverte est fermée, dans le bon ordre.', 'Une image doit avoir un attribut d’accessibilité.'],
      solution: [
        {
          type: 'list',
          items: [
            '`<h1>Mes films<h1>` : la balise fermante est `</h1>`.',
            '`<em>…</p></em>` : balises **chevauchées** ; il faut fermer `</em>` avant `</p>`.',
            '`<li>Drame` : balise `</li>` manquante (les navigateurs tolèrent cet oubli, mais c’est à éviter).',
            '`<img>` sans attribut `alt` : texte alternatif obligatoire pour l’accessibilité.',
          ],
        },
        {
          type: 'code',
          lang: 'html',
          code: `<body>
  <h1>Mes films</h1>
  <p>Mon film préféré est <em>Le Grand Bleu</em></p>
  <ul>
    <li>Drame</li>
    <li>Comédie</li>
  </ul>
  <img src="affiche.jpg" alt="Affiche du film Le Grand Bleu">
</body>`,
        },
        {
          type: 'code',
          lang: 'text',
          code: `body
├── h1 ── "Mes films"
├── p
│   ├── "Mon film préféré est "
│   └── em ── "Le Grand Bleu"
├── ul
│   ├── li ── "Drame"
│   └── li ── "Comédie"
└── img (src, alt)`,
        },
      ],
    },
    {
      id: 'css-cascade',
      title: 'Quelle couleur ?',
      difficulty: 1,
      duration: 10,
      tags: ['CSS', 'sélecteurs'],
      statement: [
        { type: 'p', text: 'On donne la feuille de style et le HTML suivants :' },
        {
          type: 'code',
          lang: 'css',
          code: `p        { color: black; }
.info    { color: blue; }
#chapo   { color: red; }
p.info   { color: green; }
.info    { font-weight: bold; }`,
        },
        {
          type: 'code',
          lang: 'html',
          code: `<p id="chapo" class="info">A</p>
<p class="info">B</p>
<p>C</p>
<div class="info">D</div>
<p class="info" style="color: orange">E</p>`,
        },
        { type: 'p', text: 'Donner la couleur de chacun des textes A à E, et indiquer lesquels sont en gras.' },
      ],
      hints: ['Spécificité : identifiant > classe > balise ; `p.info` combine une balise et une classe.', 'Le style en ligne l’emporte.'],
      solution: [
        {
          type: 'table',
          headers: ['Texte', 'Couleur', 'Justification'],
          rows: [
            ['A', 'rouge', 'le sélecteur `#chapo` (identifiant) est le plus spécifique'],
            ['B', 'vert', '`p.info` (balise + classe) est plus spécifique que `.info` (classe seule) et que `p`'],
            ['C', 'noir', 'seule la règle `p` s’applique'],
            ['D', 'bleu', 'c’est un `div` : ni `p` ni `p.info` ne s’appliquent, seulement `.info`'],
            ['E', 'orange', 'l’attribut `style` est prioritaire sur la feuille de style'],
          ],
        },
        {
          type: 'p',
          text: 'Sont en **gras** tous les éléments de classe `info` : A, B, D et E (la dernière règle ne concerne que `font-weight`, elle ne change pas les couleurs).',
        },
      ],
    },
    {
      id: 'client-ou-serveur',
      title: 'Client ou serveur ?',
      difficulty: 1,
      duration: 10,
      tags: ['client-serveur'],
      statement: [
        { type: 'p', text: 'Sur un site de vente en ligne, indiquer pour chaque action si elle est réalisée côté **client** ou côté **serveur**.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Un menu déroulant s’ouvre au survol de la souris.',
            'La liste des produits est extraite de la base de données.',
            'Un message rouge signale que le code postal saisi n’a pas 5 chiffres, avant tout envoi.',
            'Le mot de passe saisi est comparé à celui enregistré pour le compte.',
            'Le cookie de préférence de langue est mémorisé.',
            'Le prix total du panier est recalculé au moment de payer.',
          ],
        },
      ],
      hints: ['Ce qui a besoin de données centralisées ou doit être sûr se fait sur le serveur.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Client** : événement `mouseover` géré par CSS (`:hover`) ou JavaScript.',
            '**Serveur** : seul le serveur a accès à la base de données.',
            '**Client** : vérification JavaScript (ou attribut `pattern`) pour le confort de l’utilisateur — le serveur devra revérifier.',
            '**Serveur** : les mots de passe (en réalité leurs empreintes) ne sont jamais envoyés au client ; la comparaison côté client serait contournable.',
            '**Client** : le cookie est stocké par le navigateur (il a été envoyé par le serveur via `Set-Cookie`, et sera renvoyé au serveur à chaque requête).',
            '**Serveur** : le calcul fait foi, car un prix calculé par le client pourrait être falsifié.',
          ],
        },
      ],
    },
    {
      id: 'js-evenements',
      title: 'Analyser et modifier un gestionnaire d’événement',
      difficulty: 2,
      duration: 20,
      tags: ['JavaScript', 'événements'],
      statement: [
        { type: 'p', text: 'On considère la page suivante :' },
        {
          type: 'code',
          lang: 'html',
          code: `<p>Température : <span id="t">20</span> °C</p>
<button id="moins">−</button>
<button id="plus">+</button>
<script>
  let temp = 20;
  const affiche = document.getElementById('t');
  function monter() {
    temp = temp + 1;
    affiche.textContent = temp;
  }
  document.getElementById('plus').addEventListener('click', monter);
  document.getElementById('moins').addEventListener('click', monter());
</script>`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quels sont les composants graphiques d’interaction ? Quel événement est traité ?',
            'Quelle valeur est affichée juste après le chargement de la page ? Pourquoi ?',
            'Que se passe-t-il quand on clique 3 fois sur « + » ? Et sur « − » ?',
            'Corriger et compléter le script pour que « − » diminue la température, sans descendre sous 15 °C, et que le texte devienne rouge au-delà de 25 °C.',
          ],
        },
      ],
      hints: [
        'Regarder attentivement la dernière ligne : `monter()` avec des parenthèses.',
        '`affiche.style.color = \'red\'` change la couleur.',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** Les deux boutons `<button>` ; l’événement traité est `click`. Le `<span>` est seulement un élément d’affichage modifié par le script.',
        },
        {
          type: 'p',
          text: '**2.** La dernière ligne **appelle** `monter()` au chargement (au lieu de transmettre la fonction) : `temp` passe à 21 et la page affiche **21** dès le départ. La valeur renvoyée par `monter()` est `undefined`, qui est passée comme gestionnaire : le bouton « − » n’a donc aucun effet.',
        },
        { type: 'p', text: '**3.** Trois clics sur « + » : 22, 23, puis **24**. Les clics sur « − » ne font rien.' },
        {
          type: 'code',
          lang: 'javascript',
          code: `let temp = 20;
const affiche = document.getElementById('t');

function mettreAJour() {
  affiche.textContent = temp;
  if (temp > 25) {
    affiche.style.color = 'red';
  } else {
    affiche.style.color = '';     // couleur par défaut
  }
}

function monter() {
  temp = temp + 1;
  mettreAJour();
}

function descendre() {
  if (temp > 15) {
    temp = temp - 1;
  }
  mettreAJour();
}

document.getElementById('plus').addEventListener('click', monter);
document.getElementById('moins').addEventListener('click', descendre);`,
        },
        {
          type: 'p',
          text: 'Factoriser l’affichage dans `mettreAJour()` évite de dupliquer la gestion de la couleur. Toute cette logique s’exécute **côté client** : aucune requête n’est envoyée au serveur.',
        },
      ],
    },
    {
      id: 'http-messages',
      title: 'Lire des échanges HTTP',
      difficulty: 2,
      duration: 20,
      tags: ['HTTP', 'codes de statut'],
      statement: [
        { type: 'p', text: 'On a relevé, dans l’onglet Réseau du navigateur, les échanges suivants lors du chargement d’une page :' },
        {
          type: 'table',
          headers: ['N°', 'Méthode', 'URL', 'Statut', 'Type'],
          rows: [
            ['1', 'GET', 'http://lycee.exemple.fr/', '301', '—'],
            ['2', 'GET', 'https://lycee.exemple.fr/', '200', 'text/html'],
            ['3', 'GET', 'https://lycee.exemple.fr/style.css', '304', 'text/css'],
            ['4', 'GET', 'https://lycee.exemple.fr/logo.png', '200', 'image/png'],
            ['5', 'GET', 'https://lycee.exemple.fr/menu.js', '404', 'text/html'],
            ['6', 'POST', 'https://lycee.exemple.fr/sondage', '500', 'text/html'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Expliquer chacun des codes de statut obtenus.',
            'Pourquoi la page provoque-t-elle plusieurs requêtes ?',
            'À quel moment la requête 6 a-t-elle probablement été envoyée ? Qui est responsable de l’erreur ?',
            'Quelle conséquence visible peut avoir l’erreur de la requête 5 ?',
          ],
        },
      ],
      hints: ['3xx : redirection ; 4xx : erreur du client ; 5xx : erreur du serveur.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**301** : redirection définitive ; le site redirige la version HTTP vers la version HTTPS (d’où la requête 2). **200** : succès, la ressource est envoyée. **304** : *Not Modified*, la feuille de style en cache est encore à jour, le serveur n’envoie pas de contenu. **404** : le fichier `menu.js` n’existe pas sur le serveur. **500** : erreur interne du serveur lors du traitement.',
            'Le HTML reçu (requête 2) fait référence à d’autres ressources (CSS, image, script) : le navigateur envoie **une requête par ressource**.',
            'La requête 6 utilise POST : elle a été envoyée lors de l’**envoi d’un formulaire** (le sondage), après une action de l’utilisateur. Le code 5xx indique que c’est le **serveur** qui a échoué (bug du programme de traitement, base de données indisponible…), pas la requête du client.',
            'Le script `menu.js` n’a pas été chargé : les fonctionnalités JavaScript qu’il définit (par exemple l’ouverture d’un menu au clic) ne fonctionnent pas. La page s’affiche quand même, avec son style.',
          ],
        },
      ],
    },
    {
      id: 'formulaire-get-post',
      title: 'Ce que transmet un formulaire',
      difficulty: 2,
      duration: 25,
      tags: ['formulaire', 'GET', 'POST'],
      statement: [
        { type: 'p', text: 'Une page `https://cine.exemple.fr/` contient le formulaire :' },
        {
          type: 'code',
          lang: 'html',
          code: `<form action="/seances" method="get">
  <input type="text" name="film">
  <select name="jour">
    <option value="sam">Samedi</option>
    <option value="dim">Dimanche</option>
  </select>
  <input type="checkbox" name="vo" value="1"> VO
  <input type="text" id="remarque">
  <button type="submit">Voir les séances</button>
</form>`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'L’utilisateur saisit `Dune` dans le premier champ, choisit Dimanche, coche VO et écrit « merci » dans le dernier champ. Écrire l’URL de la requête envoyée.',
            'Même question s’il ne coche pas VO et saisit `Le Roi Lion`.',
            'Le développeur remplace `method="get"` par `method="post"`. Écrire la ligne de requête et le corps du message pour la question 1.',
            'Pour ce formulaire, laquelle des deux méthodes est la plus adaptée ? Et pour un formulaire de connexion ?',
          ],
        },
      ],
      hints: [
        'Seuls les champs ayant un attribut `name` sont envoyés.',
        'Dans les paramètres, une espace est encodée par `+`.',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** `https://cine.exemple.fr/seances?film=Dune&jour=dim&vo=1`. Le champ « remarque » n’a pas d’attribut `name` : il n’est **pas transmis**. Pour le `select`, c’est la `value` (`dim`) qui est envoyée, pas le texte affiché.',
        },
        {
          type: 'p',
          text: '**2.** `https://cine.exemple.fr/seances?film=Le+Roi+Lion&jour=sam` (en supposant que le jour reste sur sa valeur par défaut, Samedi) : une case non cochée n’est pas envoyée du tout ; les espaces sont encodées en `+`.',
        },
        { type: 'p', text: '**3.** Les paramètres passent dans le corps :' },
        {
          type: 'code',
          lang: 'http',
          code: `POST /seances HTTP/1.1
Host: cine.exemple.fr
Content-Type: application/x-www-form-urlencoded

film=Dune&jour=dim&vo=1`,
        },
        {
          type: 'p',
          text: '**4.** Rechercher des séances est une **consultation** qui ne modifie rien : **GET** est adapté (on peut partager le lien ou le mettre en favori). Pour une connexion, on utilise **POST** (le mot de passe ne doit pas apparaître dans l’URL, l’historique ou les journaux du serveur) **et HTTPS** pour qu’il soit chiffré.',
        },
      ],
    },
    {
      id: 'cookies-session',
      title: 'Cookies et connexion',
      difficulty: 2,
      duration: 20,
      tags: ['cookies', 'HTTPS', 'sans état'],
      statement: [
        { type: 'p', text: 'Voici trois échanges successifs entre un navigateur et l’ENT d’un lycée :' },
        {
          type: 'code',
          lang: 'http',
          code: `(1) POST /login HTTP/1.1
    Host: ent.exemple.fr
    login=lina.b&mdp=Tr0mb0ne!

(2) HTTP/1.1 302 Found
    Location: /accueil
    Set-Cookie: sid=91c4e7f0; HttpOnly; Secure

(3) GET /accueil HTTP/1.1
    Host: ent.exemple.fr
    Cookie: sid=91c4e7f0`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Décrire ce qui se passe à chaque étape.',
            'Pourquoi le serveur a-t-il besoin d’un cookie ? Que se passerait-il sans lui ?',
            'Où est stockée la valeur `91c4e7f0` ? Qui la retransmet, et quand ?',
            'Le site fonctionne en HTTP et non en HTTPS. Quels sont les risques ? Que signifie `Secure` dans ce cas ?',
          ],
        },
      ],
      hints: ['HTTP est sans état.', '`Secure` restreint l’envoi aux connexions HTTPS.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '(1) Le navigateur envoie le formulaire de connexion en POST. (2) Le serveur vérifie les identifiants, crée une **session**, demande au navigateur de mémoriser l’identifiant `sid` et le **redirige** (302) vers `/accueil`. (3) Le navigateur suit la redirection et joint **automatiquement** le cookie à sa requête : le serveur sait qu’il s’agit de Lina.',
            'HTTP est **sans état** : sans cookie, la requête (3) serait anonyme et le serveur redemanderait les identifiants à chaque page.',
            'Le cookie est stocké **dans le navigateur (client)**. Le navigateur le **renvoie** dans l’en-tête `Cookie` de chaque requête vers `ent.exemple.fr`, jusqu’à son expiration (ici, fermeture du navigateur, puisqu’aucune durée n’est précisée).',
            'En HTTP, le mot de passe (requête 1) et l’identifiant de session circulent **en clair** : une personne qui écoute le réseau peut les lire et **usurper** la session de Lina. Avec l’attribut `Secure`, le navigateur ne renverra pas le cookie sur une connexion non chiffrée : la session ne fonctionnerait tout simplement pas en HTTP. La seule solution correcte est de passer le site en **HTTPS**.',
          ],
        },
      ],
    },
    {
      id: 'bac-quiz-web',
      title: 'Type bac — Une page de quiz interactive',
      difficulty: 3,
      duration: 45,
      tags: ['type bac', 'synthèse', 'JavaScript', 'formulaire'],
      statement: [
        { type: 'p', text: 'Un professeur propose la page suivante, servie par `https://quiz.exemple.fr/q1` :' },
        {
          type: 'code',
          lang: 'html',
          code: `<h1>Question 1</h1>
<p>Quel code HTTP signifie « ressource introuvable » ?</p>
<form id="form" action="/reponse" method="post">
  <input type="text" id="rep" name="reponse">
  <input type="hidden" name="question" value="1">
  <button type="submit">Valider</button>
</form>
<p id="aide" class="cache">Indice : c'est une erreur du client.</p>
<button id="btn-aide">Afficher l'indice</button>
<style> .cache { display: none; } </style>
<script>
  document.getElementById('btn-aide').addEventListener('click', function () {
    document.getElementById('aide').classList.remove('cache');
  });
  document.getElementById('form').addEventListener('submit', function (evt) {
    const r = document.getElementById('rep').value;
    if (r === '') {
      evt.preventDefault();
      alert('Réponse vide !');
    }
  });
</script>`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lister les événements gérés par ce script et l’effet de chacun.',
            'L’utilisateur clique sur « Afficher l’indice ». Une requête est-elle envoyée au serveur ? Justifier.',
            'L’utilisateur clique sur « Valider » sans rien saisir. Que se passe-t-il ? Même question s’il saisit `404`.',
            'Écrire la requête HTTP (ligne de requête et corps) envoyée dans le second cas. À quoi sert le champ `hidden` ?',
            'Un élève malin affiche le code source pour y chercher la réponse. Pourquoi ne la trouvera-t-il pas, si la correction est faite sur le serveur ? Que se passerait-il si le professeur avait écrit la vérification de la réponse en JavaScript ?',
            'Le professeur veut que le bouton « Valider » ne soit cliquable que lorsque le champ n’est pas vide. Proposer un code JavaScript utilisant l’événement `input` et la propriété `disabled` du bouton.',
            'Le serveur répond `HTTP/1.1 200 OK` avec une page « Bravo ! » et l’en-tête `Set-Cookie: score=1`. Expliquer ce que fera le navigateur lors de la requête vers la question 2. Quel est le défaut de stocker le score de cette façon ?',
          ],
        },
      ],
      hints: [
        'Le seul échange avec le serveur est provoqué par l’envoi du formulaire.',
        'Le code source ne contient que ce qui est envoyé au client.',
        '`bouton.disabled = true` désactive un bouton.',
        'Un cookie est stocké… chez qui ?',
      ],
      solution: [
        {
          type: 'p',
          text: '**1.** Deux événements : `click` sur le bouton d’aide (retire la classe `cache`, ce qui rend le paragraphe d’indice visible) ; `submit` sur le formulaire (si la réponse est vide, annule l’envoi avec `preventDefault()` et affiche une alerte).',
        },
        {
          type: 'p',
          text: '**2.** Non : le gestionnaire modifie seulement le DOM (une classe CSS). L’indice était **déjà présent** dans la page reçue, simplement masqué par CSS. Tout se passe côté client.',
        },
        {
          type: 'p',
          text: '**3.** Réponse vide : l’événement `submit` est déclenché, le gestionnaire appelle `preventDefault()` : **aucune requête** n’est envoyée et une alerte s’affiche. Avec `404` : la condition est fausse, l’envoi n’est pas annulé, le navigateur envoie le formulaire au serveur.',
        },
        { type: 'p', text: '**4.**' },
        {
          type: 'code',
          lang: 'http',
          code: `POST /reponse HTTP/1.1
Host: quiz.exemple.fr
Content-Type: application/x-www-form-urlencoded

reponse=404&question=1`,
        },
        {
          type: 'p',
          text: 'Le champ `hidden` (invisible) transmet au serveur le **numéro de la question** : HTTP étant sans état, le serveur ne sait pas sinon à quelle question correspond la réponse. Remarque : ce champ est modifiable par l’utilisateur (outils de développement), le serveur doit donc vérifier qu’il est valide.',
        },
        {
          type: 'p',
          text: '**5.** Le code source ne montre que ce qui est **envoyé au client** (HTML, CSS, JS). Le programme de correction s’exécute sur le serveur et n’est jamais transmis : la réponse attendue n’apparaît nulle part dans la page. Si la vérification était en JavaScript, la bonne réponse figurerait dans le script, **lisible** par n’importe qui ; de plus, le score pourrait être falsifié.',
        },
        { type: 'p', text: '**6.** On ajoute un `id` au bouton de validation, par exemple `<button type="submit" id="valider">` :' },
        {
          type: 'code',
          lang: 'javascript',
          code: `const champ = document.getElementById('rep');
const valider = document.getElementById('valider');
valider.disabled = true;                      // désactivé au départ

champ.addEventListener('input', function () {
  valider.disabled = (champ.value === '');    // actif seulement si non vide
});`,
        },
        {
          type: 'p',
          text: 'L’événement `input` se déclenche **à chaque modification** du champ (frappe, effacement, collage), contrairement à `change` qui n’est déclenché qu’à la perte du focus.',
        },
        {
          type: 'p',
          text: '**7.** Le navigateur mémorise le cookie `score=1` et l’ajoutera automatiquement (`Cookie: score=1`) à la requête vers la question 2 (même site). Défaut : le cookie est **stocké chez le client**, qui peut le modifier librement (`score=100`) ; un score ne doit pas être confié au client. Il vaut mieux conserver le score **sur le serveur** et ne stocker dans le cookie qu’un identifiant de session.',
        },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    { type: 'svg', svg: SVG_CLIENT_SERVEUR, caption: 'Requête et réponse HTTP.' },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'Bac à sable HTML / CSS / JavaScript',
      caption: 'Point de départ : un compteur. Ajoutez vos propres éléments et événements.',
      props: PG_COMPTEUR,
    },
    {
      type: 'widget',
      id: 'html-playground',
      title: 'Formulaire et paramètres GET',
      caption: 'Observez quels champs sont transmis et comment les caractères spéciaux sont encodés.',
      props: PG_FORMULAIRE,
    },
    { type: 'svg', svg: SVG_URL, caption: 'Les parties d’une URL.' },
    { type: 'svg', svg: SVG_GET_POST, caption: 'GET et POST.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Quel langage décrit la structure et le contenu d’une page web ?',
          choices: ['CSS', 'HTML', 'JavaScript', 'HTTP'],
          answer: 1,
        },
        {
          question: 'Avec `btn.addEventListener(\'click\', f)`, quand la fonction `f` est-elle exécutée ?',
          choices: ['Immédiatement', 'À chaque clic sur `btn`', 'Au chargement de la page uniquement', 'Quand le serveur répond'],
          answer: 1,
        },
        {
          question: 'Un formulaire `method="get"` avec un champ `name="ville"` rempli par « Lyon » et `action="/meteo"` produit la requête :',
          choices: ['`POST /meteo` avec `ville=Lyon` dans le corps', '`GET /meteo?ville=Lyon`', '`GET /meteo#ville=Lyon`', '`GET /Lyon`'],
          answer: 1,
        },
        {
          question: 'Le code de statut 404 signifie :',
          choices: ['Succès', 'Redirection', 'Ressource introuvable', 'Erreur interne du serveur'],
          answer: 2,
        },
        {
          question: 'Avec la méthode POST sur une connexion HTTP (non chiffrée), le mot de passe :',
          choices: ['est chiffré', 'n’est pas transmis', 'circule en clair dans le corps de la requête', 'est visible dans l’URL'],
          answer: 2,
          explanation: 'Seul HTTPS chiffre les échanges ; POST place juste les données dans le corps.',
        },
        {
          question: 'Où est exécuté un script JavaScript inclus dans une page ?',
          choices: ['Sur le serveur web', 'Dans le navigateur du client', 'Sur le serveur DNS', 'Sur les deux'],
          answer: 1,
        },
        {
          question: 'Un cookie est :',
          choices: ['un programme exécuté par le serveur', 'une donnée stockée par le navigateur et renvoyée au serveur', 'un virus', 'un fichier CSS'],
          answer: 1,
        },
        {
          question: 'Quel sélecteur CSS cible l’élément `<div id="menu">` ?',
          choices: ['`.menu`', '`#menu`', '`menu`', '`div.menu`'],
          answer: 1,
        },
        {
          question: 'Que fait `evt.preventDefault()` dans un gestionnaire de l’événement `submit` ?',
          choices: ['Envoie le formulaire deux fois', 'Annule l’envoi du formulaire', 'Vide les champs', 'Chiffre les données'],
          answer: 1,
        },
        {
          question: 'Quel est le port par défaut de HTTPS ?',
          choices: ['80', '443', '8080', '21'],
          answer: 1,
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque événement à sa cause',
      pairs: [
        { left: '`click`', right: 'clic sur l’élément' },
        { left: '`mouseover`', right: 'le pointeur entre dans l’élément' },
        { left: '`keydown`', right: 'une touche du clavier est enfoncée' },
        { left: '`input`', right: 'la valeur d’un champ change' },
        { left: '`submit`', right: 'un formulaire est envoyé' },
        { left: '`load`', right: 'la page a fini de se charger' },
      ],
    },
    {
      type: 'matching',
      title: 'Codes de statut HTTP',
      pairs: [
        { left: '200', right: 'OK' },
        { left: '301', right: 'Redirection définitive' },
        { left: '304', right: 'Non modifié (cache à jour)' },
        { left: '403', right: 'Accès interdit' },
        { left: '404', right: 'Introuvable' },
        { left: '500', right: 'Erreur interne du serveur' },
      ],
    },
    {
      type: 'ordering',
      title: 'Remettre dans l’ordre : de la saisie de l’URL à l’affichage',
      items: [
        'L’utilisateur saisit l’URL',
        'Le nom de domaine est traduit en adresse IP (DNS)',
        'Le navigateur envoie une requête HTTP GET',
        'Le serveur traite la requête et renvoie une réponse 200 avec le HTML',
        'Le navigateur construit le DOM et demande CSS, images, scripts',
        'La page est affichée et le JavaScript enregistre ses écouteurs',
      ],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le code PHP ou Python d’un site est visible avec « Afficher le code source ».', answer: false, explanation: 'Il s’exécute sur le serveur ; le client ne reçoit que le résultat.' },
        { text: 'Un champ de formulaire sans attribut `name` n’est pas envoyé.', answer: true },
        { text: 'La méthode POST chiffre les données.', answer: false, explanation: 'C’est HTTPS (TLS) qui chiffre.' },
        { text: 'HTTP est un protocole sans état.', answer: true },
        { text: 'L’ancre `#section` d’une URL est envoyée au serveur.', answer: false },
        { text: 'Une vérification de formulaire en JavaScript suffit à garantir la validité des données reçues par le serveur.', answer: false, explanation: 'Elle peut être contournée : le serveur doit revérifier.' },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'HTML', back: 'Langage de balisage : structure et contenu de la page.' },
        { front: 'CSS', back: 'Feuilles de style : présentation (sélecteur { propriété: valeur; }).' },
        { front: 'DOM', back: 'Arbre d’objets construit par le navigateur à partir du HTML, modifiable en JavaScript.' },
        { front: 'Événement', back: 'Action détectée (clic, touche, survol, envoi…) déclenchant une fonction gestionnaire.' },
        { front: 'addEventListener', back: '`el.addEventListener(\'type\', fonction)` : associe un gestionnaire à un événement.' },
        { front: 'URL', back: 'protocole://domaine:port/chemin?paramètres#ancre' },
        { front: 'Requête HTTP', back: 'Méthode + chemin + version, en-têtes (Host…), corps éventuel.' },
        { front: 'GET', back: 'Paramètres dans l’URL ; consultation, recherche.' },
        { front: 'POST', back: 'Paramètres dans le corps ; envoi/modification de données.' },
        { front: 'HTTPS', back: 'HTTP + TLS : confidentialité, intégrité, authentification du serveur (certificat).' },
        { front: 'Cookie', back: 'Donnée envoyée par le serveur (`Set-Cookie`), stockée par le navigateur, renvoyée (`Cookie`) à chaque requête.' },
        { front: 'Codes 2xx / 3xx / 4xx / 5xx', back: 'Succès / redirection / erreur du client / erreur du serveur.' },
        { front: 'Page dynamique', back: 'Page fabriquée par un programme du serveur au moment de la requête.' },
        { front: 'preventDefault()', back: 'Annule l’action par défaut (suivre un lien, envoyer un formulaire).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Le dialogue client-serveur',
      text: 'Le navigateur, appelé {{client}}, envoie une {{requête}} HTTP au {{serveur}}, qui renvoie une réponse contenant un code de {{statut|état}} (par exemple 200 si tout va bien ou {{404}} si la ressource n’existe pas). Les données d’un formulaire envoyé avec la méthode {{GET}} apparaissent dans l’URL, après le caractère {{?}}. Avec la méthode {{POST}}, elles sont dans le corps de la requête. Pour que ces données soient chiffrées, il faut utiliser le protocole {{HTTPS}}.',
    },
  ],
}

export default chapter
