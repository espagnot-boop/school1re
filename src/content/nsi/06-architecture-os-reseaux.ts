import type { Chapter } from '../types'

// ---------------------------------------------------------------------------
// Schémas SVG
// ---------------------------------------------------------------------------

const SVG_VON_NEUMANN = `<svg viewBox="0 0 680 360" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs>
    <marker id="avn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
  </defs>
  <rect x="30" y="20" width="330" height="220" fill="hsl(217 91% 60% / 0.08)" stroke="hsl(217 91% 60%)"/>
  <text x="195" y="40" text-anchor="middle" fill="hsl(217 91% 60%)" font-weight="600">Processeur (CPU)</text>
  <rect x="50" y="55" width="140" height="80" fill="none" stroke="currentColor"/>
  <text x="120" y="80" text-anchor="middle" fill="currentColor" font-weight="600">Unité de commande</text>
  <text x="120" y="98" text-anchor="middle" fill="currentColor" font-size="11">décode les instructions,</text>
  <text x="120" y="112" text-anchor="middle" fill="currentColor" font-size="11">pilote les échanges</text>
  <text x="120" y="126" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.8">PC, registre d’instruction</text>
  <rect x="205" y="55" width="140" height="80" fill="none" stroke="currentColor"/>
  <text x="275" y="80" text-anchor="middle" fill="currentColor" font-weight="600">UAL</text>
  <text x="275" y="98" text-anchor="middle" fill="currentColor" font-size="11">unité arithmétique</text>
  <text x="275" y="112" text-anchor="middle" fill="currentColor" font-size="11">et logique (+, −, ET, OU)</text>
  <rect x="50" y="150" width="295" height="40" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>
  <text x="197" y="175" text-anchor="middle" fill="currentColor">registres R0, R1, … (mémoires internes très rapides)</text>
  <line x1="190" y1="95" x2="205" y2="95" stroke="currentColor" marker-end="url(#avn)" marker-start="url(#avn)"/>
  <text x="195" y="225" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">horloge : cadence les opérations (fréquence en GHz)</text>
  <rect x="440" y="20" width="210" height="220" fill="hsl(142 71% 45% / 0.08)" stroke="hsl(142 71% 45%)"/>
  <text x="545" y="40" text-anchor="middle" fill="hsl(142 71% 45%)" font-weight="600">Mémoire</text>
  <g font-family="monospace" font-size="11" fill="currentColor">
    <rect x="460" y="55" width="170" height="24" fill="none" stroke="currentColor"/><text x="468" y="71">0  LDR R0, 100</text>
    <rect x="460" y="79" width="170" height="24" fill="none" stroke="currentColor"/><text x="468" y="95">1  ADD R0, R0, #1</text>
    <rect x="460" y="103" width="170" height="24" fill="none" stroke="currentColor"/><text x="468" y="119">2  STR R0, 100</text>
    <rect x="460" y="127" width="170" height="24" fill="none" stroke="currentColor"/><text x="468" y="143">3  HALT</text>
    <text x="545" y="166" text-anchor="middle">…</text>
    <rect x="460" y="175" width="170" height="24" fill="hsl(25 95% 53% / 0.15)" stroke="currentColor"/><text x="468" y="191">100  41</text>
  </g>
  <text x="545" y="222" text-anchor="middle" fill="currentColor" font-size="11">programme ET données</text>
  <text x="545" y="235" text-anchor="middle" fill="currentColor" font-size="11">dans la même mémoire</text>
  <rect x="30" y="300" width="620" height="22" fill="hsl(263 70% 60% / 0.15)" stroke="hsl(263 70% 60%)"/>
  <text x="340" y="315" text-anchor="middle" fill="currentColor">bus : données, adresses, commandes</text>
  <line x1="195" y1="240" x2="195" y2="300" stroke="currentColor" marker-end="url(#avn)" marker-start="url(#avn)"/>
  <line x1="545" y1="240" x2="545" y2="300" stroke="currentColor" marker-end="url(#avn)" marker-start="url(#avn)"/>
  <rect x="380" y="250" width="40" height="0" fill="none"/>
  <rect x="300" y="255" width="100" height="30" fill="none" stroke="hsl(25 95% 53%)"/>
  <text x="350" y="274" text-anchor="middle" fill="currentColor" font-size="11">Entrées-sorties</text>
  <line x1="350" y1="285" x2="350" y2="300" stroke="currentColor" marker-end="url(#avn)" marker-start="url(#avn)"/>
  <text x="430" y="268" fill="currentColor" font-size="10" opacity="0.8">clavier, écran, disque,</text>
  <text x="430" y="281" fill="currentColor" font-size="10" opacity="0.8">réseau, capteurs…</text>
  <text x="340" y="348" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">Modèle décrit par John von Neumann en 1945 (rapport sur l’EDVAC)</text>
</svg>`

const SVG_CYCLE = `<svg viewBox="0 0 600 200" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <defs><marker id="acy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <rect x="20" y="60" width="160" height="70" fill="hsl(217 91% 60% / 0.12)" stroke="hsl(217 91% 60%)"/>
  <text x="100" y="85" text-anchor="middle" fill="currentColor" font-weight="600">1. Chargement</text>
  <text x="100" y="103" text-anchor="middle" fill="currentColor" font-size="11">lire l’instruction à</text>
  <text x="100" y="117" text-anchor="middle" fill="currentColor" font-size="11">l’adresse PC</text>
  <rect x="220" y="60" width="160" height="70" fill="hsl(25 95% 53% / 0.12)" stroke="hsl(25 95% 53%)"/>
  <text x="300" y="85" text-anchor="middle" fill="currentColor" font-weight="600">2. Décodage</text>
  <text x="300" y="103" text-anchor="middle" fill="currentColor" font-size="11">identifier l’opération</text>
  <text x="300" y="117" text-anchor="middle" fill="currentColor" font-size="11">et les opérandes</text>
  <rect x="420" y="60" width="160" height="70" fill="hsl(142 71% 45% / 0.12)" stroke="hsl(142 71% 45%)"/>
  <text x="500" y="85" text-anchor="middle" fill="currentColor" font-weight="600">3. Exécution</text>
  <text x="500" y="103" text-anchor="middle" fill="currentColor" font-size="11">calcul (UAL), accès</text>
  <text x="500" y="117" text-anchor="middle" fill="currentColor" font-size="11">mémoire ou saut</text>
  <line x1="180" y1="95" x2="218" y2="95" stroke="currentColor" marker-end="url(#acy)"/>
  <line x1="380" y1="95" x2="418" y2="95" stroke="currentColor" marker-end="url(#acy)"/>
  <path d="M500 130 L500 165 L100 165 L100 132" fill="none" stroke="currentColor" marker-end="url(#acy)"/>
  <text x="300" y="185" text-anchor="middle" fill="currentColor" font-size="11">PC ← PC + 1 (ou adresse du saut), puis on recommence</text>
  <text x="300" y="35" text-anchor="middle" fill="currentColor" font-weight="600">Cycle d’exécution d’une instruction</text>
</svg>`

const SVG_ARBO = `<svg viewBox="0 0 640 280" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" fill="none" stroke-width="1">
    <line x1="320" y1="38" x2="120" y2="78"/>
    <line x1="320" y1="38" x2="320" y2="78"/>
    <line x1="320" y1="38" x2="520" y2="78"/>
    <line x1="320" y1="100" x2="220" y2="140"/>
    <line x1="320" y1="100" x2="420" y2="140"/>
    <line x1="220" y1="162" x2="120" y2="200"/>
    <line x1="220" y1="162" x2="220" y2="200"/>
    <line x1="220" y1="162" x2="330" y2="200"/>
    <line x1="420" y1="162" x2="460" y2="200"/>
    <line x1="330" y1="222" x2="330" y2="250"/>
  </g>
  <g font-family="monospace" fill="currentColor" text-anchor="middle">
    <rect x="290" y="16" width="60" height="22" fill="hsl(263 70% 60% / 0.2)" stroke="hsl(263 70% 60%)"/><text x="320" y="32">/</text>
    <rect x="90" y="78" width="60" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="120" y="94">bin</text>
    <rect x="290" y="78" width="60" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="320" y="94">home</text>
    <rect x="490" y="78" width="60" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="520" y="94">etc</text>
    <rect x="185" y="140" width="70" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="220" y="156">alice</text>
    <rect x="385" y="140" width="70" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="420" y="156">bob</text>
    <rect x="85" y="200" width="70" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="120" y="216">photos</text>
    <rect x="180" y="200" width="80" height="22" fill="none" stroke="currentColor"/><text x="220" y="216">notes.txt</text>
    <rect x="295" y="200" width="70" height="22" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="330" y="216">nsi</text>
    <rect x="420" y="200" width="80" height="22" fill="none" stroke="currentColor"/><text x="460" y="216">jeu.py</text>
    <rect x="295" y="250" width="70" height="22" fill="none" stroke="currentColor"/><text x="330" y="266">tp1.py</text>
  </g>
  <g font-size="11" fill="currentColor">
    <text x="20" y="140">chemin absolu :</text>
    <text x="20" y="155" font-family="monospace">/home/alice/nsi/tp1.py</text>
    <text x="440" y="250">depuis /home/alice/nsi,</text>
    <text x="440" y="265">chemin relatif vers jeu.py :</text>
    <text x="440" y="280" font-family="monospace">../../bob/jeu.py</text>
  </g>
  <rect x="20" y="245" width="14" height="10" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/><text x="40" y="254" fill="currentColor" font-size="11">répertoire</text>
  <rect x="20" y="262" width="14" height="10" fill="none" stroke="currentColor"/><text x="40" y="271" fill="currentColor" font-size="11">fichier</text>
</svg>`

const SVG_COUCHES = `<svg viewBox="0 0 680 300" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <text x="20" y="22" fill="currentColor" font-weight="600">Modèle TCP/IP : chaque couche ajoute son en-tête (encapsulation)</text>
  <g font-size="12">
    <text x="20" y="62" fill="currentColor" font-weight="600">Application</text>
    <text x="20" y="77" fill="currentColor" font-size="10" opacity="0.8">HTTP, DNS, SMTP</text>
    <rect x="400" y="45" width="200" height="34" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)"/>
    <text x="500" y="67" text-anchor="middle" fill="currentColor">données</text>

    <text x="20" y="122" fill="currentColor" font-weight="600">Transport</text>
    <text x="20" y="137" fill="currentColor" font-size="10" opacity="0.8">TCP, UDP — ports</text>
    <rect x="320" y="105" width="80" height="34" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53%)"/>
    <text x="360" y="127" text-anchor="middle" fill="currentColor" font-size="11">en-tête TCP</text>
    <rect x="400" y="105" width="200" height="34" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)"/>
    <text x="500" y="127" text-anchor="middle" fill="currentColor">données</text>
    <text x="620" y="127" fill="currentColor" font-size="10">segment</text>

    <text x="20" y="182" fill="currentColor" font-weight="600">Internet (réseau)</text>
    <text x="20" y="197" fill="currentColor" font-size="10" opacity="0.8">IP — adresses IP, routage</text>
    <rect x="240" y="165" width="80" height="34" fill="hsl(217 91% 60% / 0.2)" stroke="hsl(217 91% 60%)"/>
    <text x="280" y="187" text-anchor="middle" fill="currentColor" font-size="11">en-tête IP</text>
    <rect x="320" y="165" width="80" height="34" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53%)"/>
    <text x="360" y="187" text-anchor="middle" fill="currentColor" font-size="11">en-tête TCP</text>
    <rect x="400" y="165" width="200" height="34" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)"/>
    <text x="500" y="187" text-anchor="middle" fill="currentColor">données</text>
    <text x="620" y="187" fill="currentColor" font-size="10">paquet</text>

    <text x="20" y="242" fill="currentColor" font-weight="600">Accès réseau</text>
    <text x="20" y="257" fill="currentColor" font-size="10" opacity="0.8">Ethernet, Wi-Fi — adresses MAC</text>
    <rect x="160" y="225" width="80" height="34" fill="hsl(263 70% 60% / 0.2)" stroke="hsl(263 70% 60%)"/>
    <text x="200" y="247" text-anchor="middle" fill="currentColor" font-size="11">en-tête Eth.</text>
    <rect x="240" y="225" width="80" height="34" fill="hsl(217 91% 60% / 0.2)" stroke="hsl(217 91% 60%)"/>
    <text x="280" y="247" text-anchor="middle" fill="currentColor" font-size="11">en-tête IP</text>
    <rect x="320" y="225" width="80" height="34" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53%)"/>
    <text x="360" y="247" text-anchor="middle" fill="currentColor" font-size="11">en-tête TCP</text>
    <rect x="400" y="225" width="200" height="34" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)"/>
    <text x="500" y="247" text-anchor="middle" fill="currentColor">données</text>
    <text x="620" y="247" fill="currentColor" font-size="10">trame</text>
  </g>
  <text x="340" y="290" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">À l’émission on descend les couches (encapsulation) ; à la réception on les remonte (désencapsulation).</text>
</svg>`

const SVG_RESEAU = `<svg viewBox="0 0 680 230" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <rect x="10" y="10" width="290" height="210" fill="none" stroke="hsl(217 91% 60%)" stroke-dasharray="5 4"/>
  <text x="20" y="28" fill="hsl(217 91% 60%)" font-size="12">réseau 192.168.1.0/24</text>
  <rect x="380" y="10" width="290" height="210" fill="none" stroke="hsl(142 71% 45%)" stroke-dasharray="5 4"/>
  <text x="390" y="28" fill="hsl(142 71% 45%)" font-size="12">réseau 10.0.0.0/24</text>
  <g stroke="currentColor" fill="none">
    <line x1="150" y1="115" x2="60" y2="60"/><line x1="150" y1="115" x2="60" y2="170"/><line x1="150" y1="115" x2="250" y2="60"/>
    <line x1="150" y1="115" x2="340" y2="115"/>
    <line x1="340" y1="115" x2="530" y2="115"/>
    <line x1="530" y1="115" x2="620" y2="60"/><line x1="530" y1="115" x2="620" y2="170"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <rect x="125" y="102" width="50" height="26" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53%)"/><text x="150" y="119">switch</text>
    <rect x="505" y="102" width="50" height="26" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53%)"/><text x="530" y="119">switch</text>
    <circle cx="340" cy="115" r="20" fill="hsl(263 70% 60% / 0.2)" stroke="hsl(263 70% 60%)"/><text x="340" y="119">R</text>
    <text x="340" y="150">routeur</text>
    <text x="300" y="105" font-size="10">.254</text><text x="380" y="105" font-size="10">.1</text>
    <rect x="35" y="45" width="50" height="26" fill="none" stroke="currentColor"/><text x="60" y="62">A</text><text x="60" y="88" font-size="10">192.168.1.10</text>
    <rect x="35" y="157" width="50" height="26" fill="none" stroke="currentColor"/><text x="60" y="174">B</text><text x="60" y="200" font-size="10">192.168.1.11</text>
    <rect x="225" y="45" width="50" height="26" fill="none" stroke="currentColor"/><text x="250" y="62">C</text><text x="250" y="88" font-size="10">192.168.1.12</text>
    <rect x="595" y="45" width="50" height="26" fill="none" stroke="currentColor"/><text x="620" y="62">D</text><text x="620" y="88" font-size="10">10.0.0.5</text>
    <rect x="595" y="157" width="50" height="26" fill="none" stroke="currentColor"/><text x="620" y="174">E</text><text x="620" y="200" font-size="10">10.0.0.6</text>
  </g>
</svg>`

const SVG_BIT_ALTERNE = `<svg viewBox="0 0 640 400" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <defs>
    <marker id="aba" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
    <marker id="abx" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9"><path d="M1 1 L9 9 M9 1 L1 9" stroke="hsl(0 84% 60%)" stroke-width="2"/></marker>
  </defs>
  <text x="120" y="22" text-anchor="middle" fill="currentColor" font-weight="600" font-size="12">Émetteur A</text>
  <text x="520" y="22" text-anchor="middle" fill="currentColor" font-weight="600" font-size="12">Récepteur B</text>
  <line x1="120" y1="30" x2="120" y2="395" stroke="currentColor"/>
  <line x1="520" y1="30" x2="520" y2="395" stroke="currentColor"/>
  <line x1="120" y1="45" x2="520" y2="70" stroke="hsl(217 91% 60%)" marker-end="url(#aba)"/>
  <text x="300" y="48" fill="hsl(217 91% 60%)">M0, bit 0</text>
  <text x="530" y="74" fill="currentColor">accepté, attend 1</text>
  <line x1="520" y1="78" x2="120" y2="103" stroke="hsl(142 71% 45%)" marker-end="url(#aba)"/>
  <text x="300" y="82" fill="hsl(142 71% 45%)">ACK 0</text>
  <line x1="120" y1="115" x2="320" y2="127" stroke="hsl(217 91% 60%)" marker-end="url(#abx)"/>
  <text x="200" y="113" fill="hsl(217 91% 60%)">M1, bit 1</text>
  <text x="335" y="132" fill="hsl(0 84% 60%)">perdu</text>
  <rect x="20" y="120" width="95" height="40" fill="none" stroke="hsl(25 95% 53%)" stroke-dasharray="3 3"/>
  <text x="67" y="137" text-anchor="middle" fill="hsl(25 95% 53%)">délai dépassé</text>
  <text x="67" y="151" text-anchor="middle" fill="hsl(25 95% 53%)">→ réémission</text>
  <line x1="120" y1="165" x2="520" y2="190" stroke="hsl(217 91% 60%)" marker-end="url(#aba)"/>
  <text x="300" y="168" fill="hsl(217 91% 60%)">M1, bit 1</text>
  <text x="530" y="194" fill="currentColor">accepté, attend 0</text>
  <line x1="520" y1="198" x2="320" y2="210" stroke="hsl(142 71% 45%)" marker-end="url(#abx)"/>
  <text x="400" y="200" fill="hsl(142 71% 45%)">ACK 1</text>
  <text x="290" y="222" fill="hsl(0 84% 60%)">perdu</text>
  <rect x="20" y="225" width="95" height="40" fill="none" stroke="hsl(25 95% 53%)" stroke-dasharray="3 3"/>
  <text x="67" y="242" text-anchor="middle" fill="hsl(25 95% 53%)">délai dépassé</text>
  <text x="67" y="256" text-anchor="middle" fill="hsl(25 95% 53%)">→ réémission</text>
  <line x1="120" y1="270" x2="520" y2="295" stroke="hsl(217 91% 60%)" marker-end="url(#aba)"/>
  <text x="300" y="273" fill="hsl(217 91% 60%)">M1, bit 1</text>
  <text x="530" y="292" fill="hsl(0 84% 60%)">bit 1 ≠ 0 attendu :</text>
  <text x="530" y="306" fill="hsl(0 84% 60%)">doublon ignoré</text>
  <line x1="520" y1="310" x2="120" y2="335" stroke="hsl(142 71% 45%)" marker-end="url(#aba)"/>
  <text x="300" y="315" fill="hsl(142 71% 45%)">ACK 1 (renvoyé)</text>
  <line x1="120" y1="355" x2="520" y2="380" stroke="hsl(217 91% 60%)" marker-end="url(#aba)"/>
  <text x="300" y="358" fill="hsl(217 91% 60%)">M2, bit 0</text>
  <text x="530" y="384" fill="currentColor">accepté, attend 1</text>
</svg>`

// ---------------------------------------------------------------------------
// Codes
// ---------------------------------------------------------------------------

const ASM_SOMME = `        LDR R0, 100      ; R0 ← contenu de la case mémoire 100
        LDR R1, 101      ; R1 ← contenu de la case mémoire 101
        ADD R2, R0, R1   ; R2 ← R0 + R1
        STR R2, 102      ; case 102 ← R2
        HALT             ; arrêt du programme`

const ASM_BOUCLE = `        MOV R0, #0       ; R0 : somme, initialisée à 0
        MOV R1, #1       ; R1 : compteur i, initialisé à 1
boucle:
        CMP R1, #5       ; compare i à 5
        BGT fin          ; si i > 5, saut à « fin »
        ADD R0, R0, R1   ; somme ← somme + i
        ADD R1, R1, #1   ; i ← i + 1
        B boucle         ; retour au test
fin:
        STR R0, 100      ; mémorise la somme dans la case 100
        HALT`

const ASM_MAX = `        LDR R0, 50       ; a
        LDR R1, 51       ; b
        CMP R0, R1
        BGT premier      ; si a > b, aller à « premier »
        MOV R2, R1       ; sinon max ← b
        B fin
premier:
        MOV R2, R0       ; max ← a
fin:
        STR R2, 52
        HALT`

const CODE_MICROBIT = `from microbit import *

while True:
    t = temperature()               # capteur de température (°C)
    if button_a.was_pressed():      # capteur : bouton A
        display.scroll(str(t) + " C")   # actionneur : matrice de LED
    if t > 28:
        display.show(Image.SAD)
        pin0.write_digital(1)       # actionneur : allume un ventilateur branché sur la broche 0
    else:
        display.show(Image.HAPPY)
        pin0.write_digital(0)
    sleep(500)                      # attente de 500 ms`

// ---------------------------------------------------------------------------

const chapter: Chapter = {
  id: 'architecture-os-reseaux',
  subject: 'nsi',
  order: 6,
  title: 'Architectures matérielles, systèmes d’exploitation et réseaux',
  theme: 'Architectures matérielles et systèmes d’exploitation',
  summary:
    'Modèle d’architecture de von Neumann, langage machine et assembleur, rôle et commandes d’un système d’exploitation (Linux, droits), transmission de données dans un réseau (TCP/IP, paquets, protocole du bit alterné), périphériques, capteurs et actionneurs.',
  duration: '5 semaines',
  objectives: [
    'Distinguer les rôles et les caractéristiques des différents constituants d’une machine (modèle de von Neumann).',
    'Dérouler l’exécution d’une séquence d’instructions simples du type langage machine.',
    'Identifier les fonctions d’un système d’exploitation.',
    'Utiliser les commandes de base en ligne de commande.',
    'Gérer les droits et permissions d’accès aux fichiers.',
    'Mettre en évidence l’intérêt du découpage des données en paquets et de leur encapsulation.',
    'Dérouler le fonctionnement d’un protocole simple de récupération de perte de paquets (bit alterné).',
    'Simuler ou mettre en œuvre un réseau.',
    'Identifier le rôle des capteurs et actionneurs ; réaliser par programmation une IHM répondant à un cahier des charges.',
  ],
  keywords: [
    'von Neumann',
    'UAL',
    'unité de commande',
    'registre',
    'bus',
    'assembleur',
    'système d’exploitation',
    'Linux',
    'shell',
    'chmod',
    'droits',
    'TCP/IP',
    'paquet',
    'encapsulation',
    'bit alterné',
    'capteur',
    'actionneur',
  ],

  // =========================================================================
  // FICHE
  // =========================================================================
  fiche: [
    { type: 'h2', text: 'Architecture de von Neumann (1945)' },
    {
      type: 'list',
      items: [
        '**Mémoire** unique contenant **programme et données**.',
        '**Processeur** = **unité de commande** (charge et décode les instructions, contient le compteur de programme PC) + **UAL** (calculs arithmétiques et logiques) + **registres**.',
        '**Entrées-sorties** (périphériques) ; le tout relié par des **bus** (données, adresses, commandes).',
        'Cycle : **chargement → décodage → exécution**, cadencé par l’horloge.',
      ],
    },
    {
      type: 'table',
      headers: ['Instruction (assembleur)', 'Effet'],
      rows: [
        ['`LDR R0, 100`', 'R0 ← mémoire[100]'],
        ['`STR R0, 100`', 'mémoire[100] ← R0'],
        ['`MOV R0, #5`', 'R0 ← 5'],
        ['`ADD R2, R0, R1` / `SUB`', 'R2 ← R0 + R1 / R0 − R1'],
        ['`CMP R0, #3`', 'compare R0 et 3 (prépare un saut conditionnel)'],
        ['`B etiq` / `BEQ` `BNE` `BGT` `BLT`', 'saut inconditionnel / si =, ≠, >, <'],
        ['`HALT`', 'arrêt'],
      ],
    },
    { type: 'h2', text: 'Système d’exploitation' },
    {
      type: 'p',
      text: 'Logiciel qui gère le matériel et le partage entre les programmes : **processus**, **mémoire**, **fichiers**, **périphériques** (pilotes), **utilisateurs et droits**, interface (shell, graphique). Ex. : Linux (libre), Windows, macOS, Android, iOS.',
    },
    {
      type: 'table',
      headers: ['Commande', 'Rôle'],
      rows: [
        ['`pwd`', 'affiche le répertoire courant'],
        ['`ls` / `ls -l`', 'liste le contenu (détails et droits)'],
        ['`cd rep` / `cd ..` / `cd ~`', 'change de répertoire (parent, personnel)'],
        ['`mkdir rep` / `rmdir rep`', 'crée / supprime un répertoire vide'],
        ['`touch f` / `cat f`', 'crée un fichier vide / affiche son contenu'],
        ['`cp src dest` / `mv src dest`', 'copie / déplace ou renomme'],
        ['`rm f` / `rm -r rep`', 'supprime (définitivement !)'],
        ['`chmod u+x f` / `chmod 754 f`', 'modifie les droits'],
        ['`man cmd`', 'manuel de la commande'],
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Droits Unix',
      content: [
        {
          type: 'p',
          text: '`-rwxr-x---` : type (`-` fichier, `d` répertoire) puis 3 triplets **u**tilisateur (propriétaire), **g**roupe, **o**thers. `r` = 4, `w` = 2, `x` = 1 → `rwxr-x---` = **750**.',
        },
      ],
    },
    { type: 'h2', text: 'Réseaux' },
    {
      type: 'list',
      items: [
        'Les données sont découpées en **paquets** acheminés indépendamment ; chaque couche ajoute un **en-tête** (**encapsulation**).',
        'Modèle TCP/IP : **application** (HTTP, DNS) → **transport** (TCP : fiable, ports) → **internet** (IP : adresses, routage) → **accès réseau** (Ethernet, Wi-Fi : adresses MAC).',
        'Adresse IPv4 : 32 bits ; `/24` = les 24 premiers bits identifient le réseau. Le **switch** relie les machines d’un réseau local, le **routeur** relie des réseaux.',
        '**Bit alterné** : chaque trame porte un bit (0/1) qui alterne ; le récepteur acquitte ; sans acquittement avant la fin du délai, l’émetteur réémet ; un doublon (bit inattendu) est ignoré mais réacquitté.',
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Capteurs et actionneurs',
      content: [
        {
          type: 'p',
          text: '**Capteur** : grandeur physique → information pour le système (bouton, thermomètre, accéléromètre, luminosité). **Actionneur** : commande du système → action physique (LED, moteur, haut-parleur, écran). Un système embarqué boucle : *lire les capteurs → traiter → commander les actionneurs*.',
        },
      ],
    },
  ],

  // =========================================================================
  // COURS
  // =========================================================================
  cours: [
    { type: 'h2', text: '1. Le modèle d’architecture de von Neumann' },
    {
      type: 'p',
      text: 'En 1945, le mathématicien **John von Neumann** décrit, dans un rapport sur le projet d’ordinateur EDVAC, une architecture qui reste aujourd’hui le modèle de base de presque tous les ordinateurs. Son idée essentielle : le **programme est stocké en mémoire**, au même titre que les données. Une machine peut ainsi changer de tâche simplement en chargeant un autre programme, sans recâblage.',
    },
    { type: 'svg', svg: SVG_VON_NEUMANN, caption: 'Architecture de von Neumann.' },
    {
      type: 'keyvalue',
      items: [
        { key: 'Mémoire', value: 'Suite de cases numérotées (**adresses**) contenant instructions et données, codées en binaire. La mémoire vive (RAM) est **volatile** : son contenu disparaît sans alimentation.' },
        { key: 'Unité de commande', value: 'Lit l’instruction suivante en mémoire, la **décode** et organise son exécution. Le **compteur de programme** (PC, ou compteur ordinal) contient l’adresse de la prochaine instruction ; le **registre d’instruction** contient l’instruction en cours.' },
        { key: 'UAL', value: '**Unité arithmétique et logique** : effectue les calculs (addition, soustraction, comparaison, ET, OU, NON…), réalisés par des circuits de portes logiques.' },
        { key: 'Registres', value: 'Petites mémoires internes au processeur, extrêmement rapides, qui contiennent les valeurs en cours de traitement.' },
        { key: 'Entrées-sorties', value: 'Permettent les échanges avec les périphériques (clavier, écran, disque, carte réseau…).' },
        { key: 'Bus', value: 'Ensemble de fils reliant les composants : **bus de données** (valeurs transportées), **bus d’adresses** (case mémoire visée), **bus de commandes** (lecture ou écriture…).' },
      ],
    },
    { type: 'svg', svg: SVG_CYCLE, caption: 'Le processeur répète indéfiniment ce cycle.' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Le goulot d’étranglement de von Neumann',
      content: [
        {
          type: 'p',
          text: 'Instructions et données transitent par le **même bus** entre processeur et mémoire. Le processeur, beaucoup plus rapide que la mémoire, passe une partie de son temps à attendre. Pour y remédier : **mémoires cache** (petites mémoires rapides proches du processeur) et architecture de **Harvard** (mémoires et bus séparés pour instructions et données, fréquente dans les microcontrôleurs).',
        },
      ],
    },
    { type: 'h3', text: 'Hiérarchie des mémoires' },
    {
      type: 'table',
      headers: ['Mémoire', 'Capacité typique', 'Temps d’accès', 'Volatile ?'],
      rows: [
        ['Registres', 'quelques centaines d’octets', '< 1 ns', 'oui'],
        ['Cache (L1, L2, L3)', 'Ko à quelques dizaines de Mo', '1 à 20 ns environ', 'oui'],
        ['Mémoire vive (RAM)', '8 à 64 Go', '≈ 50 à 100 ns', 'oui'],
        ['SSD', '256 Go à quelques To', '≈ 0,1 ms (100 µs)', 'non'],
        ['Disque dur (HDD)', '1 à 20 To', '≈ 5 à 10 ms', 'non'],
      ],
      caption: 'Plus une mémoire est rapide, plus elle est chère et petite (ordres de grandeur).',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Quelques repères',
      content: [
        {
          type: 'timeline',
          events: [
            { date: '1945', title: 'Rapport de von Neumann sur l’EDVAC', text: 'Modèle du programme enregistré.' },
            { date: '1947', title: 'Invention du transistor', text: 'Bardeen, Brattain et Shockley (laboratoires Bell).' },
            { date: '1965', title: 'Loi de Moore', text: 'Le nombre de transistors par puce double à intervalle régulier (environ tous les deux ans, selon la révision de 1975).' },
            { date: '1971', title: 'Intel 4004', text: 'Premier microprocesseur commercial : environ 2 300 transistors.' },
            { date: 'années 2000', title: 'Processeurs multicœurs', text: 'La fréquence plafonne : on multiplie les cœurs sur une même puce.' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'Un processeur actuel contient plusieurs **cœurs**, chacun étant un processeur complet capable d’exécuter son propre flot d’instructions. Un **système sur puce** (SoC) de smartphone réunit sur la même puce processeur, processeur graphique, mémoire et contrôleurs.',
    },

    { type: 'h2', text: '2. Langage machine et assembleur' },
    {
      type: 'p',
      text: 'Le processeur n’exécute que des **instructions machine** : des mots binaires très simples (charger une valeur, additionner deux registres, sauter à une autre adresse…). L’**assembleur** est la représentation lisible de ce langage : chaque ligne correspond à une instruction machine, désignée par un **mnémonique** (`ADD`, `LDR`…). Un programme Python ou C est traduit (par un compilateur ou un interpréteur) en une longue suite de telles instructions.',
    },
    {
      type: 'p',
      text: 'On utilise ici le jeu d’instructions simplifié du simulateur en ligne de Peter Higginson (« AQA assembly language »), très utilisé en NSI. Les registres sont notés `R0` à `R12` ; `#n` désigne la valeur immédiate n ; un nombre seul désigne une **adresse** mémoire. Les commentaires placés après `;` sont ajoutés ici pour l’explication (leur syntaxe peut varier selon le simulateur).',
    },
    {
      type: 'table',
      headers: ['Instruction', 'Signification'],
      rows: [
        ['`LDR Rd, adr`', 'charge dans Rd le contenu de la case mémoire `adr`'],
        ['`STR Rd, adr`', 'range le contenu de Rd dans la case mémoire `adr`'],
        ['`MOV Rd, #n` / `MOV Rd, Rm`', 'Rd ← n / Rd ← Rm'],
        ['`ADD Rd, Rn, #n` ou `ADD Rd, Rn, Rm`', 'Rd ← Rn + n ou Rn + Rm'],
        ['`SUB Rd, Rn, …`', 'Rd ← Rn − …'],
        ['`CMP Rn, #n` ou `CMP Rn, Rm`', 'compare et mémorise le résultat pour le saut suivant'],
        ['`B etiquette`', 'saut inconditionnel'],
        ['`BEQ`, `BNE`, `BGT`, `BLT etiquette`', 'saut si égal, différent, plus grand, plus petit (selon le dernier `CMP`)'],
        ['`HALT`', 'fin du programme'],
      ],
    },
    { type: 'h3', text: 'Exemple 1 : une addition' },
    { type: 'code', lang: 'asm', code: ASM_SOMME },
    {
      type: 'p',
      text: 'Si la case 100 contient 7 et la case 101 contient 35, après exécution : R0 = 7, R1 = 35, R2 = 42 et la case 102 contient 42. Remarquer qu’on ne calcule jamais directement en mémoire : on **charge** dans des registres, on **calcule** avec l’UAL, puis on **range** le résultat.',
    },
    { type: 'h3', text: 'Exemple 2 : une structure conditionnelle' },
    {
      type: 'p',
      text: 'Le programme suivant range dans la case 52 le maximum des valeurs des cases 50 et 51. Il correspond au code Python `if a > b: m = a` / `else: m = b`.',
    },
    { type: 'code', lang: 'asm', code: ASM_MAX },
    {
      type: 'callout',
      variant: 'method',
      title: 'Traduire un si … sinon',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Comparer', text: '`CMP` entre les deux valeurs.' },
            { title: 'Saut conditionnel', text: 'Si la condition est vraie, sauter vers le bloc « alors » (ou, inversement, sauter vers le bloc « sinon » si elle est fausse).' },
            { title: 'Bloc à la suite', text: 'Écrire l’autre bloc, terminé par un `B fin` pour ne pas exécuter le bloc suivant.' },
            { title: 'Étiquette fin', text: 'Les deux chemins se rejoignent à l’étiquette `fin`.' },
          ],
        },
      ],
    },
    { type: 'h3', text: 'Exemple 3 : une boucle' },
    {
      type: 'p',
      text: 'En assembleur, il n’y a ni `for` ni `while` : une boucle est réalisée par un **test** suivi d’un **saut en arrière**. Ce programme calcule $1 + 2 + 3 + 4 + 5$ :',
    },
    { type: 'code', lang: 'asm', code: ASM_BOUCLE },
    {
      type: 'table',
      headers: ['Passage au test', 'R1 (i)', 'R0 (somme) avant le test', 'i > 5 ?'],
      rows: [
        ['1', '1', '0', 'non'],
        ['2', '2', '1', 'non'],
        ['3', '3', '3', 'non'],
        ['4', '4', '6', 'non'],
        ['5', '5', '10', 'non'],
        ['6', '6', '15', 'oui → fin'],
      ],
      caption: 'À la fin, la case 100 contient 15.',
    },
    {
      type: 'code',
      lang: 'python',
      caption: 'Programme Python équivalent',
      code: `somme = 0
i = 1
while i <= 5:
    somme = somme + i
    i = i + 1`,
    },
    {
      type: 'callout',
      variant: 'tip',
      content: [
        {
          type: 'p',
          text: 'Chaque instruction assembleur est codée en binaire dans une case mémoire, comme les données : c’est précisément le principe de von Neumann. Un « bug » qui écrirait par erreur dans la zone du programme modifierait donc le programme lui-même !',
        },
      ],
    },

    { type: 'h2', text: '3. Les systèmes d’exploitation' },
    {
      type: 'p',
      text: 'Un **système d’exploitation** (SE, ou *OS* pour *Operating System*) est le logiciel qui fait l’intermédiaire entre le matériel et les applications. Sans lui, chaque programme devrait savoir piloter lui-même le disque, l’écran, le clavier, la carte réseau…',
    },
    {
      type: 'grid',
      columns: 3,
      items: [
        { title: 'Processus', icon: 'Cpu', text: 'Lance et arrête les programmes, partage le temps de processeur entre eux (**ordonnancement**) : plusieurs programmes semblent s’exécuter en même temps.' },
        { title: 'Mémoire', icon: 'MemoryStick', text: 'Attribue à chaque processus sa zone de mémoire et l’empêche d’accéder à celle des autres.' },
        { title: 'Fichiers', icon: 'FolderTree', text: 'Organise les données sur les supports en fichiers et répertoires (système de fichiers).' },
        { title: 'Périphériques', icon: 'Printer', text: 'Communique avec le matériel grâce aux **pilotes** (*drivers*).' },
        { title: 'Sécurité', icon: 'ShieldCheck', text: 'Gère les comptes utilisateurs, l’authentification et les **droits** d’accès.' },
        { title: 'Interface', icon: 'Terminal', text: 'Fournit une interface : graphique (fenêtres) ou en ligne de commande (**shell**).' },
      ],
    },
    {
      type: 'p',
      text: 'Le cœur du système, appelé **noyau** (*kernel*), s’exécute avec tous les privilèges ; les applications passent par lui (appels système) pour accéder au matériel.',
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Histoire et enjeux',
      content: [
        {
          type: 'timeline',
          events: [
            { date: '1969', title: 'Unix', text: 'Ken Thompson et Dennis Ritchie, laboratoires Bell (AT&T). Réécrit en langage C au début des années 1970.' },
            { date: '1981', title: 'MS-DOS', text: 'Microsoft, pour l’IBM PC.' },
            { date: '1983', title: 'Projet GNU', text: 'Richard Stallman lance le projet d’un système entièrement libre ; Free Software Foundation en 1985.' },
            { date: '1984 – 1985', title: 'Interfaces graphiques grand public', text: 'Macintosh d’Apple (1984), Windows 1.0 (1985).' },
            { date: '1991', title: 'Noyau Linux', text: 'Linus Torvalds ; associé aux outils GNU, il forme les systèmes GNU/Linux.' },
            { date: '2007 – 2008', title: 'Smartphones', text: 'iOS (Apple, 2007), Android (Google, basé sur le noyau Linux, 2008).' },
          ],
        },
        {
          type: 'p',
          text: 'Un logiciel **libre** (Linux, sous licence GPL) peut être utilisé, étudié, modifié et redistribué ; le code d’un logiciel **propriétaire** (Windows, macOS) n’est pas accessible. Ce choix a des enjeux économiques, de sécurité et de souveraineté.',
        },
      ],
    },

    { type: 'h2', text: '4. La ligne de commande Linux' },
    { type: 'h3', text: '4.1 Arborescence et chemins' },
    {
      type: 'p',
      text: 'Sous Linux, tous les fichiers sont rangés dans une **arborescence** unique dont la racine est notée `/`. Les répertoires personnels des utilisateurs sont dans `/home`.',
    },
    { type: 'svg', svg: SVG_ARBO, caption: 'Une arborescence Linux.' },
    {
      type: 'list',
      items: [
        'Un **chemin absolu** part de la racine : `/home/alice/nsi/tp1.py`.',
        'Un **chemin relatif** part du **répertoire courant** : depuis `/home/alice`, le même fichier est `nsi/tp1.py`.',
        '`.` désigne le répertoire courant, `..` le répertoire parent, `~` le répertoire personnel.',
      ],
    },
    { type: 'h3', text: '4.2 Commandes de base' },
    {
      type: 'code',
      lang: 'bash',
      code: `alice@pc:~$ pwd
/home/alice
alice@pc:~$ ls
nsi  notes.txt  photos
alice@pc:~$ cd nsi
alice@pc:~/nsi$ mkdir projet             # crée le répertoire projet
alice@pc:~/nsi$ touch projet/main.py     # crée un fichier vide
alice@pc:~/nsi$ cp tp1.py projet/        # copie tp1.py dans projet
alice@pc:~/nsi$ mv projet/tp1.py projet/tp1_v2.py   # renomme
alice@pc:~/nsi$ ls projet
main.py  tp1_v2.py
alice@pc:~/nsi$ cat ../notes.txt         # affiche un fichier du répertoire parent
Réviser le chapitre 6 !
alice@pc:~/nsi$ rm projet/main.py        # supprime (pas de corbeille !)
alice@pc:~/nsi$ cd ..
alice@pc:~$ rm -r photos                 # supprime un répertoire et tout son contenu`,
    },
    {
      type: 'table',
      headers: ['Commande', 'Exemple', 'Effet'],
      rows: [
        ['`pwd`', '`pwd`', '*print working directory* : affiche le répertoire courant'],
        ['`ls`', '`ls -l /home`', 'liste ; `-l` détaillé, `-a` fichiers cachés (commençant par `.`)'],
        ['`cd`', '`cd ..`', 'change de répertoire ; `cd` seul ramène dans `~`'],
        ['`mkdir`', '`mkdir tp`', 'crée un répertoire'],
        ['`rmdir`', '`rmdir tp`', 'supprime un répertoire **vide**'],
        ['`touch`', '`touch a.txt`', 'crée un fichier vide (ou met à jour sa date)'],
        ['`cat`', '`cat a.txt`', 'affiche le contenu'],
        ['`cp`', '`cp a.txt b.txt`', 'copie ; `cp -r` pour un répertoire'],
        ['`mv`', '`mv a.txt docs/`', 'déplace ou renomme'],
        ['`rm`', '`rm a.txt`, `rm -r docs`', 'supprime définitivement'],
        ['`echo`', '`echo "salut" > a.txt`', 'affiche un texte ; `>` redirige vers un fichier (écrase), `>>` ajoute'],
        ['`grep`', '`grep def tp1.py`', 'affiche les lignes contenant un motif'],
        ['`man`', '`man ls`', 'affiche le manuel'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Prudence',
      content: [
        {
          type: 'p',
          text: '`rm` ne passe pas par une corbeille : la suppression est immédiate. Et `rm -r` sur un mauvais répertoire peut effacer beaucoup de travail. La touche **Tab** complète automatiquement les noms, ce qui évite les fautes de frappe ; les flèches haut/bas rappellent les commandes précédentes.',
        },
      ],
    },
    { type: 'h3', text: '4.3 Utilisateurs, groupes et droits' },
    {
      type: 'p',
      text: 'Linux est **multi-utilisateur**. Chaque fichier a un **propriétaire** et un **groupe**, et des droits pour trois catégories : le propriétaire (**u**, *user*), les membres du groupe (**g**, *group*) et les autres (**o**, *others*). L’administrateur `root` a tous les droits ; on exécute une commande en tant qu’administrateur avec `sudo`.',
    },
    {
      type: 'code',
      lang: 'bash',
      code: `alice@pc:~/nsi$ ls -l
-rwxr-x--- 1 alice eleves  2048 oct. 12 10:00 jeu.sh
-rw-r--r-- 1 alice eleves   512 oct. 12 09:41 tp1.py
drwxr-xr-x 2 alice eleves  4096 oct. 12 09:30 projet`,
    },
    {
      type: 'table',
      headers: ['Partie', '`-rwxr-x---`'],
      rows: [
        ['type', '`-` fichier ordinaire (`d` = répertoire)'],
        ['propriétaire (u)', '`rwx` : lecture, écriture, exécution'],
        ['groupe (g)', '`r-x` : lecture et exécution'],
        ['autres (o)', '`---` : aucun droit'],
      ],
    },
    {
      type: 'table',
      headers: ['Droit', 'sur un fichier', 'sur un répertoire'],
      rows: [
        ['`r` (read, 4)', 'lire le contenu', 'lister son contenu (`ls`)'],
        ['`w` (write, 2)', 'modifier le contenu', 'créer, renommer, supprimer des fichiers dedans'],
        ['`x` (execute, 1)', 'exécuter (programme, script)', 'le traverser, y entrer (`cd`)'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'La commande chmod',
      content: [
        {
          type: 'list',
          items: [
            '**Notation symbolique** : `chmod u+x jeu.sh` (ajoute l’exécution au propriétaire), `chmod g-w f` (retire l’écriture au groupe), `chmod o=r f` (les autres : lecture seule), `chmod a+r f` (tous : lecture).',
            '**Notation octale** : on additionne r = 4, w = 2, x = 1 pour chaque catégorie. `rwx` = 7, `r-x` = 5, `r--` = 4, `rw-` = 6, `---` = 0.',
            '`chmod 750 jeu.sh` donne `rwxr-x---` ; `chmod 644 tp1.py` donne `rw-r--r--`.',
            'Seuls le propriétaire et `root` peuvent changer les droits ; `chown` change le propriétaire (réservé à `root`).',
          ],
        },
      ],
    },

    { type: 'h2', text: '5. Les réseaux' },
    { type: 'h3', text: '5.1 Commutation de paquets' },
    {
      type: 'p',
      text: 'Pour transmettre un fichier sur un réseau, on ne l’envoie pas d’un bloc : il est **découpé en paquets** de taille limitée (en Ethernet, au plus 1 500 octets par trame pour le paquet IP). Chaque paquet porte les informations nécessaires à son acheminement et à la reconstitution du message.',
    },
    {
      type: 'list',
      items: [
        '**Partage** du réseau : les paquets de plusieurs communications s’entrelacent sur les mêmes câbles ; aucun utilisateur ne monopolise une liaison.',
        '**Robustesse** : chaque paquet peut suivre un chemin différent ; si un routeur tombe en panne, les paquets suivants sont routés autrement.',
        '**Efficacité en cas d’erreur** : si un paquet est perdu ou abîmé, on ne retransmet que lui, pas tout le fichier.',
      ],
    },
    { type: 'h3', text: '5.2 Protocoles et encapsulation' },
    {
      type: 'p',
      text: 'Un **protocole** est un ensemble de règles qui définit le format et l’ordre des messages échangés. Les protocoles sont organisés en **couches** : chacune rend un service à la couche supérieure, sans se soucier du détail des autres. À l’émission, chaque couche ajoute son **en-tête** aux données reçues de la couche supérieure : c’est l’**encapsulation**.',
    },
    { type: 'svg', svg: SVG_COUCHES, caption: 'Encapsulation dans le modèle TCP/IP.' },
    {
      type: 'table',
      headers: ['Couche', 'Rôle', 'Protocoles', 'Adressage'],
      rows: [
        ['Application', 'service rendu à l’utilisateur', 'HTTP, HTTPS, DNS, SMTP, FTP', 'URL, adresse électronique'],
        ['Transport', 'communication entre **programmes** ; TCP : fiabilité (numérotation, accusés de réception, retransmission, remise dans l’ordre)', 'TCP, UDP', '**ports** (80, 443…)'],
        ['Internet (réseau)', 'acheminement entre **machines** à travers les réseaux (routage)', 'IP', '**adresses IP**'],
        ['Accès réseau', 'transmission sur le support physique local', 'Ethernet, Wi-Fi', '**adresses MAC**'],
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'TCP et UDP',
      content: [
        {
          type: 'p',
          text: 'IP achemine les paquets « au mieux », sans garantie : un paquet peut être perdu, dupliqué ou arriver dans le désordre. **TCP** ajoute la fiabilité (au prix d’échanges supplémentaires) ; il est utilisé pour le Web, le courrier, les transferts de fichiers. **UDP** n’offre aucune garantie mais est plus rapide : visioconférence, jeux en ligne, DNS.',
        },
      ],
    },
    { type: 'h3', text: '5.3 Adresses IP et architecture d’un réseau' },
    {
      type: 'p',
      text: 'Une adresse **IPv4** est un nombre de 32 bits, noté en 4 octets décimaux séparés par des points : `192.168.1.10`. La notation **CIDR** `192.168.1.10/24` indique que les **24 premiers bits** désignent le **réseau** et les 8 derniers la **machine** dans ce réseau. Le **masque** correspondant est `255.255.255.0`.',
    },
    { type: 'svg', svg: SVG_RESEAU, caption: 'Deux réseaux locaux reliés par un routeur.' },
    {
      type: 'list',
      items: [
        'Deux machines sont dans le **même réseau** si leurs adresses ont la même partie réseau : A (`192.168.1.10/24`) et C (`192.168.1.12/24`) peuvent communiquer directement via le **switch** (commutateur).',
        'Pour joindre D (`10.0.0.5`), A envoie ses paquets à sa **passerelle** : le **routeur** (`192.168.1.254`), qui les transmet vers l’autre réseau. Sur Internet, les paquets traversent ainsi de nombreux routeurs, qui choisissent la route grâce à leurs **tables de routage**.',
        'Dans un réseau `/24`, il y a $2^8 = 256$ adresses, dont 2 réservées : l’adresse du **réseau** (`192.168.1.0`) et l’adresse de **diffusion** (`192.168.1.255`). Il reste **254** adresses pour les machines.',
        'Les adresses IPv4 étant en nombre limité (environ 4,3 milliards), on passe progressivement à **IPv6** (128 bits).',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Simuler un réseau',
      content: [
        {
          type: 'p',
          text: 'Le logiciel libre **Filius** permet de construire un réseau (ordinateurs, switchs, routeurs), de configurer les adresses IP et d’observer les échanges. Sur une vraie machine, `ping 192.168.1.12` teste la connexion et `traceroute` (`tracert` sous Windows) affiche les routeurs traversés.',
        },
      ],
    },
    { type: 'h3', text: '5.4 Le protocole du bit alterné' },
    {
      type: 'p',
      text: 'Comment garantir qu’un message est bien arrivé quand le réseau peut **perdre** des trames ? Idée : le récepteur envoie un **accusé de réception** (*ACK*) ; si l’émetteur ne le reçoit pas au bout d’un certain délai, il **réémet**. Mais si c’est l’accusé de réception qui a été perdu, le récepteur reçoit le même message deux fois : il faut pouvoir reconnaître un **doublon**. Le protocole du **bit alterné** résout ce problème avec un seul bit de numérotation.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Émetteur', text: 'Il envoie le message avec un **bit de contrôle** (0 pour le premier) et déclenche un chronomètre.' },
        { title: 'Récepteur : message attendu', text: 'S’il reçoit le bit qu’il attend, il **accepte** le message, envoie un **ACK portant ce bit**, puis attend désormais l’autre valeur du bit.' },
        { title: 'Récepteur : doublon', text: 'S’il reçoit un message portant le bit **non attendu**, c’est une réémission d’un message déjà reçu : il l’**ignore** mais **renvoie l’ACK** correspondant (le précédent s’était perdu).' },
        { title: 'Émetteur : ACK reçu', text: 'S’il reçoit l’ACK du bit envoyé, il passe au message suivant en **inversant le bit**.' },
        { title: 'Émetteur : délai dépassé', text: 'Sans ACK à temps (message ou ACK perdu), il **réémet** le même message avec le même bit.' },
      ],
    },
    { type: 'svg', svg: SVG_BIT_ALTERNE, caption: 'Bit alterné : une perte de message puis une perte d’acquittement.' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Variantes et limites',
      content: [
        {
          type: 'list',
          items: [
            'Dans certains manuels, l’ACK porte le bit du **prochain** message attendu (ACK 1 après réception du message 0) : c’est une convention différente, le principe est le même.',
            'Le protocole suppose que les trames ne sont **pas réordonnées** ni retardées indéfiniment : un très vieil ACK arrivant en retard pourrait être confondu avec un ACK récent. TCP, lui, numérote les octets sur 32 bits.',
            'Il est **lent** : l’émetteur attend chaque ACK avant d’envoyer la suite (un seul message « en vol »). TCP envoie plusieurs segments avant d’attendre (fenêtre glissante).',
          ],
        },
      ],
    },

    { type: 'h2', text: '6. Périphériques, capteurs et actionneurs' },
    {
      type: 'p',
      text: 'Les **périphériques** sont les dispositifs connectés à l’ordinateur via les entrées-sorties : périphériques d’**entrée** (clavier, souris, micro, scanner), de **sortie** (écran, imprimante, haut-parleur), ou les deux (écran tactile, clé USB, carte réseau). Le système d’exploitation communique avec eux par l’intermédiaire des **pilotes**.',
    },
    {
      type: 'grid',
      columns: 2,
      items: [
        { title: 'Capteur', icon: 'Thermometer', text: 'Mesure une grandeur physique (température, luminosité, accélération, distance, appui sur un bouton) et la convertit en signal électrique, puis en nombre exploitable par le programme.' },
        { title: 'Actionneur', icon: 'Cog', text: 'Transforme une commande du programme en action physique : allumer une LED, faire tourner un moteur, émettre un son, afficher sur un écran.' },
      ],
    },
    {
      type: 'p',
      text: 'Un **système embarqué** (thermostat connecté, robot, voiture, montre) est un système informatique intégré à un objet, qui interagit avec son environnement via des capteurs et des actionneurs. Son programme exécute une **boucle infinie** : *lire les capteurs → décider → commander les actionneurs*.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Avec une carte micro:bit (MicroPython)',
      content: [
        {
          type: 'p',
          text: 'La carte BBC micro:bit possède des boutons, un capteur de température, un accéléromètre, une boussole et une matrice de 5 × 5 LED. Ce programme réalise une petite IHM : un appui sur A affiche la température, et un ventilateur se déclenche au-delà de 28 °C.',
        },
        { type: 'code', lang: 'python', code: CODE_MICROBIT },
      ],
    },
    {
      type: 'table',
      headers: ['Élément du programme', 'Nature'],
      rows: [
        ['`temperature()`', 'lecture d’un capteur'],
        ['`button_a.was_pressed()`', 'lecture d’un capteur (bouton) : `True` si A a été pressé depuis le dernier appel'],
        ['`display.scroll(…)`, `display.show(…)`', 'commande d’un actionneur (LED)'],
        ['`pin0.write_digital(1)`', 'commande d’un actionneur externe branché sur la broche 0'],
        ['`while True:` + `sleep(500)`', 'boucle de contrôle répétée toutes les 0,5 s'],
      ],
    },
  ],

  // =========================================================================
  // EXERCICES
  // =========================================================================
  exercices: [
    {
      id: 'composants-von-neumann',
      title: 'Les constituants d’un ordinateur',
      difficulty: 1,
      duration: 10,
      tags: ['von Neumann'],
      statement: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Citer les quatre éléments du modèle de von Neumann et leur rôle.',
            'Quelle est l’idée principale de ce modèle par rapport aux premières machines comme l’ENIAC, programmé en modifiant son câblage ?',
            'Dans quel composant se trouve le compteur de programme (PC) ? Que contient-il ?',
            'Classer de la plus rapide à la plus lente : RAM, registre, SSD, cache. Pourquoi ne fabrique-t-on pas toute la mémoire avec la technologie la plus rapide ?',
          ],
        },
      ],
      hints: ['Mémoire, unité de commande, UAL, entrées-sorties.', 'Rapide = cher et de faible capacité.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Mémoire** : stocke le programme et les données. **Unité de commande** : charge les instructions, les décode et pilote leur exécution. **UAL** : réalise les opérations arithmétiques et logiques. **Entrées-sorties** : échanges avec les périphériques. (Les bus relient le tout.)',
            'Le **programme est enregistré en mémoire**, comme les données : on change de programme en chargeant un autre contenu en mémoire, sans modifier le matériel.',
            'Dans l’**unité de commande**. Il contient l’**adresse** de la prochaine instruction à exécuter (il est incrémenté après chaque instruction, ou modifié par un saut).',
            'Registre < cache < RAM < SSD (du plus rapide au plus lent). Les mémoires les plus rapides sont aussi les plus **chères** par octet, les plus **gourmandes** (énergie, place sur la puce), et certaines sont volatiles : on combine donc une petite quantité de mémoire rapide avec beaucoup de mémoire lente (hiérarchie mémoire).',
          ],
        },
      ],
    },
    {
      id: 'asm-derouler',
      title: 'Dérouler un programme assembleur',
      difficulty: 1,
      duration: 15,
      tags: ['assembleur'],
      statement: [
        { type: 'p', text: 'Avant l’exécution, la case 30 contient 12 et la case 31 contient 5.' },
        {
          type: 'code',
          lang: 'asm',
          code: `        LDR R0, 30
        LDR R1, 31
        SUB R2, R0, R1
        ADD R2, R2, R2
        MOV R3, #100
        SUB R3, R3, R2
        STR R3, 32
        HALT`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner le contenu des registres R0 à R3 après chaque instruction.',
            'Que contient la case 32 à la fin ? Exprimer ce résultat en fonction de a (case 30) et b (case 31).',
          ],
        },
      ],
      hints: ['`ADD R2, R2, R2` double R2.', '`#100` est la valeur 100, pas l’adresse 100.'],
      solution: [
        {
          type: 'table',
          headers: ['Instruction', 'R0', 'R1', 'R2', 'R3'],
          rows: [
            ['`LDR R0, 30`', '12', '—', '—', '—'],
            ['`LDR R1, 31`', '12', '5', '—', '—'],
            ['`SUB R2, R0, R1`', '12', '5', '7', '—'],
            ['`ADD R2, R2, R2`', '12', '5', '14', '—'],
            ['`MOV R3, #100`', '12', '5', '14', '100'],
            ['`SUB R3, R3, R2`', '12', '5', '14', '86'],
          ],
        },
        {
          type: 'p',
          text: '`STR R3, 32` range 86 dans la case 32. Le programme calcule $100 - 2(a - b)$ : ici $100 - 2 \\times 7 = 86$.',
        },
      ],
    },
    {
      id: 'asm-boucle',
      title: 'Une multiplication par additions successives',
      difficulty: 2,
      duration: 20,
      tags: ['assembleur', 'boucle'],
      statement: [
        { type: 'p', text: 'La case 20 contient 4 et la case 21 contient 3.' },
        {
          type: 'code',
          lang: 'asm',
          code: `        LDR R0, 20
        LDR R1, 21
        MOV R2, #0
boucle:
        CMP R1, #0
        BEQ fin
        ADD R2, R2, R0
        SUB R1, R1, #1
        B boucle
fin:
        STR R2, 22
        HALT`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dérouler le programme dans un tableau donnant R1 et R2 à chaque passage par l’instruction `CMP`.',
            'Que contient la case 22 à la fin ? Que calcule ce programme en général ?',
            'Combien de fois l’instruction `CMP` est-elle exécutée ? Combien d’instructions sont exécutées au total (`HALT` compris) ?',
            'Écrire un programme Python équivalent.',
            'Que se passe-t-il si la case 21 contient une valeur négative, par exemple −2 ?',
          ],
        },
      ],
      hints: ['La boucle s’arrête quand R1 vaut 0.', 'Compter : 3 instructions avant la boucle, 5 par tour complet, 2 pour le dernier test, 2 après.'],
      solution: [
        {
          type: 'table',
          headers: ['Passage au CMP', 'R1', 'R2', 'R1 = 0 ?'],
          rows: [
            ['1', '3', '0', 'non'],
            ['2', '2', '4', 'non'],
            ['3', '1', '8', 'non'],
            ['4', '0', '12', 'oui → fin'],
          ],
        },
        {
          type: 'p',
          text: '**2.** La case 22 contient **12** = 4 × 3. Le programme calcule le produit $a \\times b$ (pour $b \\geqslant 0$) en ajoutant $b$ fois la valeur $a$.',
        },
        {
          type: 'p',
          text: '**3.** `CMP` est exécuté **4** fois ($b + 1$). Total : 3 instructions d’initialisation + 3 tours complets × 5 instructions (`CMP`, `BEQ`, `ADD`, `SUB`, `B`) + 2 au dernier test (`CMP`, `BEQ`) + `STR` et `HALT` = $3 + 15 + 2 + 2 = 22$ instructions.',
        },
        {
          type: 'code',
          lang: 'python',
          code: `a = 4
b = 3
p = 0
while b != 0:
    p = p + a
    b = b - 1`,
        },
        {
          type: 'p',
          text: '**5.** Avec R1 = −2, R1 décroît (−3, −4, …) et ne vaut jamais 0 : la boucle est **infinie** (en pratique, jusqu’au dépassement de capacité du registre). Il faudrait tester `BLT`/`BGT` plutôt qu’une égalité, ou traiter le signe à part.',
        },
      ],
    },
    {
      id: 'asm-traduire',
      title: 'Traduire une condition en assembleur',
      difficulty: 2,
      duration: 20,
      tags: ['assembleur', 'condition'],
      statement: [
        { type: 'p', text: 'La variable `x` est stockée dans la case 40, `y` dans la case 41. Traduire en assembleur :' },
        {
          type: 'code',
          lang: 'python',
          code: `if x < 10:
    y = x + 5
else:
    y = 0`,
        },
        { type: 'p', text: 'Puis dérouler votre programme pour x = 7 et pour x = 12.' },
      ],
      hints: ['Charger x dans R0, comparer à #10.', 'Penser au `B fin` à la fin du premier bloc.'],
      solution: [
        {
          type: 'code',
          lang: 'asm',
          code: `        LDR R0, 40        ; R0 ← x
        CMP R0, #10
        BLT alors         ; si x < 10, aller à « alors »
        MOV R1, #0        ; sinon : y ← 0
        B fin
alors:
        ADD R1, R0, #5    ; y ← x + 5
fin:
        STR R1, 41        ; ranger y
        HALT`,
        },
        {
          type: 'list',
          items: [
            '**x = 7** : R0 = 7 ; 7 < 10, donc `BLT` saute à `alors` ; R1 = 12 ; la case 41 reçoit **12**.',
            '**x = 12** : R0 = 12 ; 12 < 10 est faux, pas de saut : R1 = 0, puis `B fin` ; la case 41 reçoit **0**.',
          ],
        },
        {
          type: 'p',
          text: 'Autre organisation possible : sauter vers le bloc « sinon » lorsque la condition est fausse, c’est-à-dire si x > 10 (`BGT`) ou x = 10 (`BEQ`), le bloc « alors » étant écrit juste après le test. L’essentiel est que **chaque chemin** aboutisse à `fin` sans exécuter l’autre bloc.',
        },
      ],
    },
    {
      id: 'linux-arbo',
      title: 'Naviguer dans une arborescence',
      difficulty: 1,
      duration: 15,
      tags: ['Linux', 'chemins', 'commandes'],
      statement: [
        { type: 'p', text: 'On reprend l’arborescence du cours : `/home/alice` contient `photos/`, `notes.txt` et `nsi/` (qui contient `tp1.py`) ; `/home/bob` contient `jeu.py`. Alice est dans `/home/alice/nsi`.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner le chemin absolu et un chemin relatif (depuis le répertoire courant) du fichier `notes.txt`.',
            'Quelle commande affiche le contenu de `jeu.py` sans changer de répertoire ?',
            'Écrire la suite de commandes pour : créer un répertoire `sauvegarde` dans `/home/alice`, y copier `tp1.py`, puis renommer la copie en `tp1_old.py`.',
            'Qu’affiche `pwd` après `cd ../photos` puis `cd ..` puis `cd nsi` ?',
            'Alice tape `rmdir /home/alice/sauvegarde`. Pourquoi obtient-elle une erreur ? Quelle commande utiliser ?',
          ],
        },
      ],
      hints: ['`..` remonte d’un niveau.', '`rmdir` ne supprime que les répertoires vides.'],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Absolu : `/home/alice/notes.txt` ; relatif : `../notes.txt`.',
            '`cat ../../bob/jeu.py` (ou `cat /home/bob/jeu.py`), à condition qu’Alice ait le droit de lecture sur ce fichier et le droit `x` sur `/home/bob`.',
            'Par exemple : `mkdir ../sauvegarde` puis `cp tp1.py ../sauvegarde/` puis `mv ../sauvegarde/tp1.py ../sauvegarde/tp1_old.py`. (On peut aussi copier et renommer en une fois : `cp tp1.py ../sauvegarde/tp1_old.py`.)',
            '`cd ../photos` → `/home/alice/photos` ; `cd ..` → `/home/alice` ; `cd nsi` → `/home/alice/nsi`. `pwd` affiche donc `/home/alice/nsi`.',
            'Le répertoire n’est pas vide (il contient `tp1_old.py`) : `rmdir` refuse. Il faut `rm -r /home/alice/sauvegarde` (ou supprimer d’abord le fichier avec `rm`).',
          ],
        },
      ],
    },
    {
      id: 'droits',
      title: 'Lire et modifier des droits',
      difficulty: 2,
      duration: 20,
      tags: ['droits', 'chmod'],
      statement: [
        { type: 'p', text: 'L’utilisatrice `alice` (groupe `eleves`) obtient :' },
        {
          type: 'code',
          lang: 'bash',
          code: `$ ls -l
-rw-r----- 1 alice eleves  830 oct. 14 08:12 bilan.txt
-rw-rw-rw- 1 alice eleves  412 oct. 14 08:15 liste.csv
-rwxr-xr-x 1 alice eleves 1200 oct. 14 08:20 calcul.sh
drwx--x--- 2 alice eleves 4096 oct. 14 08:25 secret`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Donner les droits de chaque fichier en notation octale.',
            '`bob` fait partie du groupe `eleves`. Peut-il lire `bilan.txt` ? Le modifier ? Et `charlie`, qui n’est pas dans le groupe ?',
            'Pourquoi les droits de `liste.csv` sont-ils dangereux ? Donner une commande qui les corrige pour que seule Alice puisse écrire, tout le monde pouvant lire.',
            'Bob peut-il faire `ls secret` ? `cat secret/code.txt` (fichier de droits `-rw-r--r--`) ? Justifier.',
            'Alice veut qu’on ne puisse plus exécuter `calcul.sh` sauf elle. Donner une commande symbolique et une commande octale.',
          ],
        },
      ],
      hints: ['r = 4, w = 2, x = 1.', 'Sur un répertoire, `r` permet de lister, `x` de traverser.'],
      solution: [
        {
          type: 'p',
          text: '**1.** `bilan.txt` : rw- r-- --- = **640** ; `liste.csv` : rw- rw- rw- = **666** ; `calcul.sh` : rwx r-x r-x = **755** ; `secret` : rwx --x --- = **710**.',
        },
        {
          type: 'p',
          text: '**2.** Bob (groupe) a `r--` : il peut **lire** mais pas modifier `bilan.txt`. Charlie (autres) a `---` : il ne peut **ni lire ni modifier**.',
        },
        {
          type: 'p',
          text: '**3.** Tout utilisateur de la machine peut **modifier** (ou vider) `liste.csv`. Correction : `chmod 644 liste.csv` (ou `chmod go-w liste.csv`), qui donne `rw-r--r--`.',
        },
        {
          type: 'p',
          text: '**4.** Pour le répertoire `secret`, le groupe a `--x` : Bob peut le **traverser** mais pas le **lister** : `ls secret` échoue (*Permission denied*). En revanche, s’il connaît le nom exact du fichier, `cat secret/code.txt` **fonctionne** : le droit `x` du répertoire permet d’y accéder et le fichier est lisible par tous (`r--` pour le groupe).',
        },
        {
          type: 'p',
          text: '**5.** `chmod go-x calcul.sh` ou `chmod 744 calcul.sh` (résultat : `rwxr--r--`).',
        },
      ],
    },
    {
      id: 'adresses-ip',
      title: 'Adresses IP et réseaux locaux',
      difficulty: 2,
      duration: 20,
      tags: ['réseau', 'IP', 'routeur'],
      statement: [
        {
          type: 'p',
          text: 'Dans un lycée, on relève les adresses : PC1 `192.168.10.17/24`, PC2 `192.168.10.200/24`, PC3 `192.168.11.5/24`, imprimante `192.168.10.250/24`. Un routeur possède les interfaces `192.168.10.254/24` et `192.168.11.254/24`.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Combien de bits comporte une adresse IPv4 ? Que signifie `/24` ? Donner le masque correspondant.',
            'Quelles machines sont dans le même réseau ? Donner l’adresse de chaque réseau.',
            'PC1 envoie un document à l’imprimante. Par quels équipements passent les paquets ?',
            'PC1 envoie un paquet à PC3. Quel est le rôle du routeur ? Quelle adresse PC1 doit-il connaître ?',
            'Combien de machines peut-on au maximum connecter au réseau de PC1 ? Un technicien propose l’adresse `192.168.10.255` pour un nouveau PC : est-ce possible ?',
          ],
        },
      ],
      hints: ['Avec /24, les trois premiers octets forment la partie réseau.', 'Deux adresses sont réservées dans chaque réseau.'],
      solution: [
        {
          type: 'p',
          text: '**1.** 32 bits (4 octets). `/24` : les 24 premiers bits (les 3 premiers octets) identifient le réseau. Masque : `255.255.255.0`.',
        },
        {
          type: 'p',
          text: '**2.** PC1, PC2, l’imprimante (et une interface du routeur) sont dans le réseau `192.168.10.0/24`. PC3 (et l’autre interface du routeur) est dans le réseau `192.168.11.0/24`.',
        },
        {
          type: 'p',
          text: '**3.** Même réseau : les paquets passent seulement par le **switch** du réseau local (et les câbles ou le Wi-Fi), sans routeur.',
        },
        {
          type: 'p',
          text: '**4.** PC3 n’est pas dans le même réseau : PC1 envoie le paquet à sa **passerelle par défaut**, le routeur (`192.168.10.254`), qui le transmet sur l’autre réseau vers PC3. PC1 doit connaître l’adresse de cette passerelle (configurée manuellement ou distribuée automatiquement par DHCP).',
        },
        {
          type: 'p',
          text: '**5.** $2^8 - 2 = 254$ adresses utilisables, dont certaines déjà prises (l’interface du routeur, l’imprimante…). `192.168.10.255` est l’adresse de **diffusion** (*broadcast*) du réseau : elle ne peut pas être attribuée à une machine.',
        },
      ],
    },
    {
      id: 'paquets-encapsulation',
      title: 'Découpage en paquets et encapsulation',
      difficulty: 2,
      duration: 20,
      tags: ['paquets', 'encapsulation', 'TCP/IP'],
      statement: [
        {
          type: 'p',
          text: 'On transfère une image de 1 Mo ($10^6$ octets) avec TCP/IP sur un réseau Ethernet. Chaque paquet IP fait au plus 1 500 octets, dont 20 octets d’en-tête IP et 20 octets d’en-tête TCP.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Combien d’octets de données utiles un paquet transporte-t-il au maximum ?',
            'Combien de paquets faut-il pour transférer l’image ?',
            'Quelle quantité d’en-têtes TCP et IP est transmise en plus ? Quel pourcentage de l’image cela représente-t-il ?',
            'Le paquet n° 312 est perdu. Que se passe-t-il avec TCP ? Pourquoi est-ce un avantage du découpage en paquets ?',
            'Remettre dans l’ordre d’encapsulation, de la couche la plus haute à la plus basse : en-tête IP, données HTTP, en-tête Ethernet, en-tête TCP.',
          ],
        },
      ],
      hints: ['1 500 − 40.', 'Arrondir le nombre de paquets à l’entier supérieur.'],
      solution: [
        { type: 'p', text: '**1.** $1\\,500 - 20 - 20 = 1\\,460$ octets de données par paquet.' },
        {
          type: 'p',
          text: '**2.** $10^6 / 1\\,460 \\approx 684{,}9$ : il faut **685 paquets** (684 paquets pleins et un dernier partiellement rempli : $10^6 - 684 \\times 1\\,460 = 1\\,360$ octets).',
        },
        {
          type: 'p',
          text: '**3.** $685 \\times 40 = 27\\,400$ octets d’en-têtes, soit $27\\,400 / 10^6 = 2{,}74\\,\\%$ de la taille de l’image (sans compter les en-têtes Ethernet ni les accusés de réception).',
        },
        {
          type: 'p',
          text: '**4.** Le destinataire n’acquitte pas les données du paquet 312 ; l’émetteur, faute d’accusé de réception, **retransmet uniquement ce paquet**. Grâce aux numéros de séquence, le destinataire replace les données dans le bon ordre. Sans découpage, une seule erreur obligerait à renvoyer tout le fichier.',
        },
        {
          type: 'p',
          text: '**5.** Données HTTP (application) → en-tête TCP (transport) → en-tête IP (internet) → en-tête Ethernet (accès réseau). Dans la trame finale, on trouve dans l’ordre : en-tête Ethernet | en-tête IP | en-tête TCP | données HTTP.',
        },
      ],
    },
    {
      id: 'microbit-ihm',
      title: 'Une IHM avec capteurs et actionneurs',
      difficulty: 2,
      duration: 25,
      tags: ['capteurs', 'actionneurs', 'micro:bit'],
      statement: [
        {
          type: 'p',
          text: 'Cahier des charges d’un « niveau à bulle » sur carte micro:bit : si la carte est inclinée vers la gauche, afficher une flèche vers la gauche ; vers la droite, une flèche vers la droite ; sinon, afficher un carré. Un appui sur le bouton B affiche la valeur mesurée.',
        },
        {
          type: 'p',
          text: 'On dispose de : `accelerometer.get_x()` (renvoie un entier, négatif si la carte penche à gauche, positif à droite, proche de 0 à plat), `display.show(Image.ARROW_W)`, `display.show(Image.ARROW_E)`, `display.show(Image.SQUARE)`, `button_b.was_pressed()`, `display.scroll(texte)`, `sleep(ms)`.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identifier les capteurs et les actionneurs utilisés.',
            'Écrire le programme, en considérant que la carte est « à plat » si la valeur est comprise entre −200 et 200.',
            'Pourquoi le programme est-il écrit dans une boucle `while True` ?',
          ],
        },
      ],
      hints: ['Utiliser une structure `if … elif … else`.', 'Un système embarqué doit réagir en permanence.'],
      solution: [
        {
          type: 'p',
          text: '**1.** Capteurs : **accéléromètre** (inclinaison), **bouton B**. Actionneur : la **matrice de LED** (affichage).',
        },
        {
          type: 'code',
          lang: 'python',
          code: `from microbit import *

while True:
    x = accelerometer.get_x()
    if button_b.was_pressed():
        display.scroll(str(x))
    if x < -200:
        display.show(Image.ARROW_W)
    elif x > 200:
        display.show(Image.ARROW_E)
    else:
        display.show(Image.SQUARE)
    sleep(100)`,
        },
        {
          type: 'p',
          text: '**3.** L’inclinaison change à tout moment : il faut **relire le capteur en permanence** et mettre l’affichage à jour. La boucle infinie, rythmée par `sleep(100)` (10 mesures par seconde), est la structure typique d’un système embarqué. La zone morte entre −200 et 200 évite que l’affichage clignote à cause des petites vibrations.',
        },
      ],
    },
    {
      id: 'bac-bit-alterne',
      title: 'Type bac — Le protocole du bit alterné',
      difficulty: 3,
      duration: 40,
      tags: ['type bac', 'bit alterné', 'réseau'],
      statement: [
        {
          type: 'p',
          text: 'Alice envoie à Bob les messages M0, M1, M2, M3 avec le protocole du bit alterné (version du cours : l’ACK porte le bit du message reçu ; Bob attend initialement le bit 0 ; Alice réémet si elle n’a pas reçu l’ACK après un délai fixé).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quel bit accompagne chacun des messages M0, M1, M2, M3 ?',
            'Lors de l’échange, il se produit successivement : (a) M0 arrive, ACK reçu ; (b) M1 est **perdu** ; (c) M1 réémis arrive, mais son ACK est **perdu** ; (d) la suite se passe sans perte jusqu’à M2 compris. Représenter les échanges sur un diagramme (ou un tableau : émission, bit, réception, décision de Bob, ACK).',
            'À l’étape (c), comment Bob sait-il que le second M1 qu’il reçoit est un doublon ? Que fait-il, et pourquoi doit-il quand même renvoyer un ACK ?',
            'Combien de trames (messages + ACK) ont été émises au total pour transmettre M0, M1 et M2 ?',
            'Que se passerait-il si Bob n’utilisait **pas** de bit de contrôle et acceptait tout message reçu ?',
            'On suppose maintenant que le réseau peut retarder longtemps un ACK. Décrire un scénario où Alice croit à tort que M2 a été reçu.',
          ],
        },
      ],
      hints: [
        'Le bit alterne : 0, 1, 0, 1…',
        'Bob ne reçoit M1 qu’au deuxième essai, puis une troisième fois.',
        'Un vieil ACK 0 peut arriver alors qu’Alice attend l’ACK de M2 (bit 0).',
      ],
      solution: [
        { type: 'p', text: '**1.** M0 : bit 0 ; M1 : bit 1 ; M2 : bit 0 ; M3 : bit 1.' },
        {
          type: 'table',
          headers: ['Étape', 'Alice émet', 'Réception par Bob', 'Bob attend', 'Décision de Bob', 'ACK'],
          rows: [
            ['1', 'M0, bit 0', 'reçu', '0', 'accepte M0, attend 1', 'ACK 0 → reçu par Alice'],
            ['2', 'M1, bit 1', '**perdu**', '1', '—', '—'],
            ['3', 'délai dépassé : M1, bit 1', 'reçu', '1', 'accepte M1, attend 0', 'ACK 1 → **perdu**'],
            ['4', 'délai dépassé : M1, bit 1', 'reçu', '0', 'bit 1 ≠ 0 : **doublon ignoré**', 'ACK 1 → reçu'],
            ['5', 'M2, bit 0', 'reçu', '0', 'accepte M2, attend 1', 'ACK 0 → reçu'],
          ],
        },
        {
          type: 'p',
          text: '**3.** Après avoir accepté M1 (bit 1), Bob attend le bit 0. Le message reçu porte le bit 1 : ce ne peut être qu’une **réémission** de M1, déjà accepté. Il ne le transmet pas une seconde fois à l’application, mais renvoie **ACK 1** : sinon Alice, qui n’a jamais reçu d’ACK 1, réémettrait M1 indéfiniment.',
        },
        {
          type: 'p',
          text: '**4.** Messages : M0, M1 (perdu), M1, M1, M2 = **5** ; ACK : ACK 0, ACK 1 (perdu), ACK 1, ACK 0 = **4**. Total : **9 trames** pour 3 messages utiles.',
        },
        {
          type: 'p',
          text: '**5.** À l’étape 4, Bob accepterait le M1 réémis comme un **nouveau** message : l’application recevrait M1 **deux fois** (ex. un virement effectué deux fois). Le bit de contrôle sert précisément à détecter les doublons.',
        },
        {
          type: 'p',
          text: '**6.** Exemple : l’ACK 0 de M0 est très retardé ; Alice, faute d’ACK, réémet M0, reçoit cette fois un ACK 0 et continue normalement avec M1. Plus tard, lorsqu’Alice envoie M2 (bit 0), M2 est perdu… mais le **vieil ACK 0** de M0 arrive enfin : Alice le prend pour l’accusé de réception de M2 et passe à M3, alors que Bob n’a jamais reçu M2. Le protocole du bit alterné n’est correct que si le canal **ne réordonne pas** les trames ; c’est pourquoi TCP utilise des numéros de séquence beaucoup plus grands.',
        },
      ],
    },
  ],

  // =========================================================================
  // REPRÉSENTATIONS
  // =========================================================================
  representations: [
    { type: 'svg', svg: SVG_VON_NEUMANN, caption: 'Le modèle de von Neumann.' },
    {
      type: 'widget',
      id: 'logic-gates',
      title: 'Au cœur de l’UAL : les portes logiques',
      caption: 'Les calculs de l’UAL sont réalisés par des circuits de portes logiques. Ici, la somme de deux bits (demi-additionneur) : a XOR b.',
      props: { expression: 'a XOR b' },
    },
    {
      type: 'widget',
      id: 'base-converter',
      title: 'Contenu d’un registre 8 bits',
      caption: 'Un registre ou une case mémoire ne contient que des bits : leur interprétation (entier, instruction, caractère) dépend du programme.',
      props: { value: 42, bits: 8 },
    },
    { type: 'svg', svg: SVG_COUCHES, caption: 'Encapsulation TCP/IP.' },
    { type: 'svg', svg: SVG_BIT_ALTERNE, caption: 'Le protocole du bit alterné face aux pertes.' },
    { type: 'svg', svg: SVG_ARBO, caption: 'Arborescence de fichiers Linux.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'Dans l’architecture de von Neumann, le programme est stocké :',
          choices: ['dans l’UAL', 'dans la même mémoire que les données', 'dans une mémoire séparée des données', 'sur le bus'],
          answer: 1,
        },
        {
          question: 'Quel composant effectue les additions et les comparaisons ?',
          choices: ['L’unité de commande', 'L’UAL', 'Le bus d’adresses', 'La mémoire vive'],
          answer: 1,
        },
        {
          question: 'Après `MOV R0, #3` puis `ADD R1, R0, R0`, R1 contient :',
          choices: ['3', '6', '9', 'le contenu de la case 3'],
          answer: 1,
        },
        {
          question: 'Quelle commande affiche le répertoire courant ?',
          choices: ['`ls`', '`cd`', '`pwd`', '`cat`'],
          answer: 2,
        },
        {
          question: 'Le fichier a les droits `rw-r-----`. En octal :',
          choices: ['640', '750', '644', '460'],
          answer: 0,
        },
        {
          question: '`chmod u+x script.sh` :',
          choices: ['retire le droit d’exécution à tous', 'ajoute le droit d’exécution au propriétaire', 'rend le fichier lisible par tous', 'change le propriétaire'],
          answer: 1,
        },
        {
          question: 'Quel protocole assure la fiabilité de la transmission (retransmission, remise en ordre) ?',
          choices: ['IP', 'TCP', 'UDP', 'Ethernet'],
          answer: 1,
        },
        {
          question: 'Quel équipement relie deux réseaux IP différents ?',
          choices: ['Un switch', 'Un routeur', 'Une carte réseau', 'Un câble croisé'],
          answer: 1,
        },
        {
          question: 'Dans le protocole du bit alterné, le récepteur qui attend le bit 0 reçoit un message portant le bit 1. Il :',
          choices: ['accepte le message', 'ignore le message et ne répond pas', 'ignore le message mais renvoie l’ACK 1', 'demande une nouvelle connexion'],
          answer: 2,
          explanation: 'C’est un doublon : l’ACK précédent s’est perdu, il faut le renvoyer pour débloquer l’émetteur.',
        },
        {
          question: 'Un thermomètre connecté à une carte micro:bit est :',
          choices: ['un actionneur', 'un capteur', 'un pilote', 'un processeur'],
          answer: 1,
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer chaque commande à son effet',
      pairs: [
        { left: '`ls -l`', right: 'liste détaillée avec les droits' },
        { left: '`cd ..`', right: 'remonte au répertoire parent' },
        { left: '`mkdir tp`', right: 'crée le répertoire tp' },
        { left: '`cp a b`', right: 'copie a vers b' },
        { left: '`mv a b`', right: 'déplace ou renomme a en b' },
        { left: '`rm -r d`', right: 'supprime d et tout son contenu' },
        { left: '`chmod 755 f`', right: 'donne les droits rwxr-xr-x' },
      ],
    },
    {
      type: 'ordering',
      title: 'Encapsulation : de la couche la plus haute à la plus basse',
      items: ['Application (HTTP)', 'Transport (TCP)', 'Internet (IP)', 'Accès réseau (Ethernet)'],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'La mémoire vive (RAM) conserve ses données sans alimentation.', answer: false, explanation: 'Elle est volatile.' },
        { text: 'Le compteur de programme contient l’adresse de la prochaine instruction.', answer: true },
        { text: 'Linux est un système d’exploitation libre.', answer: true },
        { text: '`rmdir` supprime un répertoire et tout son contenu.', answer: false, explanation: '`rmdir` ne supprime qu’un répertoire vide ; il faut `rm -r`.' },
        { text: 'Le droit `x` sur un répertoire permet d’y entrer.', answer: true },
        { text: 'Tous les paquets d’un même fichier empruntent forcément le même chemin.', answer: false },
        { text: 'Dans un réseau /24, on peut adresser 256 machines.', answer: false, explanation: '256 adresses dont 2 réservées : 254 machines.' },
        { text: 'Une LED est un actionneur.', answer: true },
      ],
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Architecture de von Neumann', back: 'Mémoire unique (programme + données), unité de commande, UAL, entrées-sorties, bus.' },
        { front: 'UAL', back: 'Unité arithmétique et logique : calculs et comparaisons.' },
        { front: 'Compteur de programme (PC)', back: 'Registre contenant l’adresse de la prochaine instruction.' },
        { front: 'Cycle d’instruction', back: 'Chargement → décodage → exécution.' },
        { front: '`LDR R0, 100` / `STR R0, 100`', back: 'R0 ← mémoire[100] / mémoire[100] ← R0' },
        { front: 'Système d’exploitation', back: 'Gère processus, mémoire, fichiers, périphériques, utilisateurs et droits.' },
        { front: 'Chemin absolu / relatif', back: 'Depuis la racine `/` / depuis le répertoire courant.' },
        { front: '`rwxr-xr--`', back: '754 : propriétaire tout, groupe lecture + exécution, autres lecture.' },
        { front: 'Encapsulation', back: 'Chaque couche ajoute son en-tête aux données de la couche supérieure.' },
        { front: 'TCP / IP', back: 'TCP : transport fiable entre programmes (ports) ; IP : acheminement entre machines (adresses IP).' },
        { front: 'Routeur / switch', back: 'Routeur : relie des réseaux différents ; switch : relie les machines d’un même réseau local.' },
        { front: 'Bit alterné', back: 'Bit 0/1 alterné sur chaque message, ACK, réémission après délai, doublons détectés par le bit.' },
        { front: 'Capteur', back: 'Grandeur physique → information numérique (bouton, thermomètre, accéléromètre).' },
        { front: 'Actionneur', back: 'Commande → action physique (LED, moteur, haut-parleur).' },
      ],
    },
    {
      type: 'cloze',
      title: 'Droits et permissions',
      text: 'La commande {{ls -l}} affiche les droits des fichiers. Dans `-rwxr-x---`, le premier triplet concerne le {{propriétaire|utilisateur}}, le deuxième le {{groupe}} et le troisième les {{autres}}. Le droit r vaut {{4}}, w vaut {{2}} et x vaut {{1}} : ces droits s’écrivent donc {{750}} en octal. On les modifie avec la commande {{chmod}}.',
    },
  ],
}

export default chapter
