import type { Chapter } from '../types'

const svgSpectreEM = String.raw`<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <defs>
    <linearGradient id="spem" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="hsl(275 100% 40%)"/>
      <stop offset="0.15" stop-color="hsl(230 100% 55%)"/>
      <stop offset="0.35" stop-color="hsl(160 90% 42%)"/>
      <stop offset="0.55" stop-color="hsl(60 100% 50%)"/>
      <stop offset="0.8" stop-color="hsl(25 100% 50%)"/>
      <stop offset="1" stop-color="hsl(0 100% 45%)"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="1">
    <rect x="20" y="40" width="75" height="40"/><rect x="95" y="40" width="75" height="40"/>
    <rect x="170" y="40" width="75" height="40"/>
    <rect x="245" y="40" width="75" height="40" fill="url(#spem)" stroke="currentColor"/>
    <rect x="320" y="40" width="75" height="40"/><rect x="395" y="40" width="75" height="40"/><rect x="470" y="40" width="75" height="40"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-weight="600">
    <text x="57" y="64">γ</text><text x="132" y="64">X</text><text x="207" y="64">UV</text>
    <text x="357" y="64">IR</text><text x="432" y="64">micro-ondes</text><text x="507" y="64">radio</text>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10">
    <text x="95" y="102">10⁻¹¹ m</text><text x="170" y="102">10⁻⁸ m</text><text x="245" y="102">400 nm</text>
    <text x="320" y="102">800 nm</text><text x="395" y="102">1 mm</text><text x="470" y="102">≈ 30 cm</text>
    <text x="20" y="102">10⁻¹³ m</text><text x="545" y="102">10³ m</text>
    <text x="283" y="30">visible</text>
  </g>
  <g stroke="currentColor" stroke-width="1" fill="currentColor">
    <line x1="20" y1="140" x2="540" y2="140"/><path d="M545 140 l-9 -4 v8 z"/>
    <line x1="540" y1="165" x2="30" y2="165"/><path d="M25 165 l9 -4 v8 z"/>
  </g>
  <text x="280" y="132" text-anchor="middle" fill="currentColor">longueur d’onde λ croissante</text>
  <text x="280" y="186" text-anchor="middle" fill="currentColor">fréquence ν et énergie du photon E croissantes</text>
</svg>`

const svgNiveauxH = String.raw`<svg viewBox="0 0 520 330" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" stroke-width="1.6">
    <line x1="90" y1="285" x2="260" y2="285"/>
    <line x1="90" y1="173" x2="260" y2="173"/>
    <line x1="90" y1="123" x2="260" y2="123"/>
    <line x1="90" y1="104" x2="260" y2="104"/>
    <line x1="90" y1="30" x2="260" y2="30" stroke-dasharray="5 4"/>
  </g>
  <g fill="currentColor">
    <text x="82" y="289" text-anchor="end">n = 1</text><text x="268" y="289">−13,6 eV (fondamental)</text>
    <text x="82" y="177" text-anchor="end">n = 2</text><text x="268" y="177">−3,40 eV</text>
    <text x="82" y="127" text-anchor="end">n = 3</text><text x="268" y="127">−1,51 eV</text>
    <text x="82" y="108" text-anchor="end">n = 4</text><text x="268" y="108">−0,85 eV</text>
    <text x="82" y="34" text-anchor="end">n → ∞</text><text x="268" y="34">0 eV (ionisation)</text>
    <text x="20" y="18">E (eV)</text>
  </g>
  <g stroke-width="2.4" fill="none">
    <line x1="120" y1="285" x2="120" y2="178" stroke="hsl(263 70% 60%)"/>
    <line x1="170" y1="123" x2="170" y2="168" stroke="hsl(0 84% 60%)"/>
    <line x1="215" y1="104" x2="215" y2="168" stroke="hsl(217 91% 60%)"/>
  </g>
  <g fill="hsl(263 70% 60%)"><path d="M120 178 l-4 -9 h8 z" transform="translate(0,0)"/></g>
  <g fill="hsl(0 84% 60%)"><path d="M170 168 l-4 -9 h8 z" transform="rotate(180 170 163)"/></g>
  <g fill="hsl(217 91% 60%)"><path d="M215 168 l-4 -9 h8 z" transform="rotate(180 215 163)"/></g>
  <g font-size="11">
    <text x="112" y="232" text-anchor="end" fill="hsl(263 70% 60%)">absorption 1→2 : 122 nm (UV)</text>
    <text x="170" y="150" text-anchor="end" fill="hsl(0 84% 60%)" transform="translate(-6,0)">3→2 : 658 nm</text>
    <text x="215" y="148" text-anchor="start" fill="hsl(217 91% 60%)" transform="translate(6,0)">4→2 : 487 nm</text>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="320" y="230">Transitions vers n = 2 :</text>
    <text x="320" y="248">série de Balmer (visible)</text>
    <text x="320" y="270">Transitions vers n = 1 :</text>
    <text x="320" y="288">série de Lyman (UV)</text>
  </g>
</svg>`

const svgEmissionAbsorption = String.raw`<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g stroke="currentColor" stroke-width="1.8">
    <line x1="40" y1="170" x2="150" y2="170"/><line x1="40" y1="60" x2="150" y2="60"/>
    <line x1="230" y1="170" x2="340" y2="170"/><line x1="230" y1="60" x2="340" y2="60"/>
    <line x1="420" y1="170" x2="520" y2="170"/><line x1="420" y1="60" x2="520" y2="60"/>
  </g>
  <g fill="currentColor" font-size="11">
    <text x="95" y="188" text-anchor="middle">E₁</text><text x="95" y="52" text-anchor="middle">E₂</text>
    <text x="285" y="188" text-anchor="middle">E₁</text><text x="285" y="52" text-anchor="middle">E₂</text>
    <text x="470" y="188" text-anchor="middle">E₁</text><text x="470" y="52" text-anchor="middle">E₂</text>
  </g>
  <g stroke-width="2.4" fill="none">
    <line x1="75" y1="165" x2="75" y2="70" stroke="hsl(142 71% 45%)"/>
    <path d="M300 70 q -10 20 0 25 q 10 20 0 25 q -10 20 0 30" stroke="hsl(25 95% 53%)"/>
    <path d="M440 70 q -10 20 0 25 q 10 20 0 25 q -10 20 0 30" stroke="hsl(25 95% 53%)"/>
    <path d="M500 70 q -10 20 0 25 q 10 20 0 25 q -10 20 0 30" stroke="hsl(25 95% 53%)" stroke-opacity="0.9"/>
  </g>
  <g fill="hsl(142 71% 45%)"><path d="M75 66 l-5 11 h10 z"/></g>
  <g fill="hsl(25 95% 53%)"><path d="M300 170 l-5 -11 h10 z"/><path d="M440 170 l-5 -11 h10 z"/><path d="M500 170 l-5 -11 h10 z"/></g>
  <g fill="currentColor" font-size="11" text-anchor="middle">
    <text x="95" y="22" font-weight="600">Absorption</text>
    <text x="95" y="38">hν = E₂ − E₁</text>
    <text x="285" y="22" font-weight="600">Émission spontanée</text>
    <text x="285" y="38">hν = E₂ − E₁</text>
    <text x="470" y="22" font-weight="600">Émission stimulée</text>
    <text x="470" y="38">2 photons identiques</text>
    <text x="95" y="208">photon absorbé</text>
    <text x="285" y="208">photon émis (direction aléatoire)</text>
    <text x="470" y="208">même λ, même direction</text>
  </g>
</svg>`

const svgSpectresRaies = String.raw`<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <defs>
    <linearGradient id="spr" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="hsl(275 100% 40%)"/><stop offset="0.12" stop-color="hsl(250 100% 55%)"/>
      <stop offset="0.25" stop-color="hsl(215 100% 55%)"/><stop offset="0.38" stop-color="hsl(185 100% 45%)"/>
      <stop offset="0.5" stop-color="hsl(120 90% 42%)"/><stop offset="0.65" stop-color="hsl(60 100% 50%)"/>
      <stop offset="0.78" stop-color="hsl(30 100% 50%)"/><stop offset="1" stop-color="hsl(0 100% 45%)"/>
    </linearGradient>
  </defs>
  <g fill="currentColor" font-size="11">
    <text x="20" y="26">Spectre continu (corps chaud)</text>
    <text x="20" y="102">Spectre d’émission de raies (gaz)</text>
    <text x="20" y="178">Spectre d’absorption de raies (gaz froid devant source continue)</text>
  </g>
  <rect x="20" y="32" width="480" height="34" fill="url(#spr)"/>
  <rect x="20" y="108" width="480" height="34" fill="#000"/>
  <g stroke-width="3">
    <line x1="85" y1="108" x2="85" y2="142" stroke="hsl(275 100% 60%)"/>
    <line x1="150" y1="108" x2="150" y2="142" stroke="hsl(230 100% 60%)"/>
    <line x1="255" y1="108" x2="255" y2="142" stroke="hsl(120 90% 45%)"/>
    <line x1="318" y1="108" x2="318" y2="142" stroke="hsl(55 100% 50%)"/>
    <line x1="395" y1="108" x2="395" y2="142" stroke="hsl(10 100% 55%)"/>
  </g>
  <rect x="20" y="184" width="480" height="34" fill="url(#spr)"/>
  <g stroke="#000" stroke-width="3">
    <line x1="85" y1="184" x2="85" y2="218"/><line x1="150" y1="184" x2="150" y2="218"/>
    <line x1="255" y1="184" x2="255" y2="218"/><line x1="318" y1="184" x2="318" y2="218"/>
    <line x1="395" y1="184" x2="395" y2="218"/>
  </g>
  <text x="20" y="240" fill="currentColor">400 nm</text>
  <text x="500" y="240" fill="currentColor" text-anchor="end">800 nm</text>
  <text x="260" y="240" fill="currentColor" text-anchor="middle">Les raies d’absorption ont les mêmes λ que les raies d’émission</text>
</svg>`

const svgWien = String.raw`<svg viewBox="0 0 520 270" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="11">
  <g stroke="currentColor" stroke-width="1" fill="none">
    <line x1="50" y1="220" x2="500" y2="220"/><line x1="50" y1="220" x2="50" y2="25"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="50" y="236">0</text><text x="140" y="236">0,5</text><text x="230" y="236">1</text>
    <text x="320" y="236">1,5</text><text x="410" y="236">2</text><text x="495" y="236">2,5</text>
    <text x="275" y="256">λ (µm) — intensité lumineuse émise (unités arbitraires)</text>
  </g>
  <rect x="57" y="25" width="45" height="195" fill="hsl(217 91% 60%)" opacity="0.12"/>
  <text x="80" y="38" fill="currentColor" font-size="10" text-anchor="middle">visible</text>
  <path d="M52 218 C 70 150 90 50 120 38 C 150 28 200 80 260 140 C 330 190 420 212 500 218" fill="none" stroke="hsl(25 95% 53%)" stroke-width="2.2"/>
  <path d="M52 218 C 110 210 140 190 170 150 C 190 118 205 100 220 98 C 260 96 300 140 360 180 C 420 205 470 214 500 218" fill="none" stroke="hsl(0 84% 60%)" stroke-width="2.2"/>
  <path d="M52 218 C 140 218 200 212 260 180 C 300 150 330 120 355 118 C 380 118 420 150 470 190 C 490 205 500 214 500 218" fill="none" stroke="hsl(263 70% 60%)" stroke-width="2.2"/>
  <g font-size="11" font-weight="600">
    <text x="125" y="50" fill="hsl(25 95% 53%)">T plus élevée</text>
    <text x="238" y="90" fill="hsl(0 84% 60%)">T intermédiaire</text>
    <text x="365" y="112" fill="hsl(263 70% 60%)">T plus basse</text>
  </g>
  <text x="400" y="60" fill="currentColor" font-size="11">λ_max · T = cte</text>
</svg>`

const svgDualite = String.raw`<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" font-family="Geist, sans-serif" font-size="12">
  <g fill="none" stroke="hsl(217 91% 60%)" stroke-width="2">
    <path d="M20 60 q 20 -30 40 0 t 40 0 t 40 0 t 40 0 t 40 0"/>
  </g>
  <g stroke="currentColor" stroke-width="1">
    <line x1="20" y1="100" x2="60" y2="100"/><line x1="20" y1="96" x2="20" y2="104"/><line x1="60" y1="96" x2="60" y2="104"/>
  </g>
  <text x="40" y="118" text-anchor="middle" fill="currentColor">λ</text>
  <text x="120" y="22" text-anchor="middle" fill="currentColor" font-weight="600">Modèle ondulatoire</text>
  <text x="120" y="140" text-anchor="middle" fill="currentColor" font-size="11">λ, ν, c = λ·ν</text>
  <text x="120" y="156" text-anchor="middle" fill="currentColor" font-size="11">interférences, diffraction</text>
  <g fill="hsl(25 95% 53%)">
    <circle cx="340" cy="60" r="6"/><circle cx="375" cy="60" r="6"/><circle cx="410" cy="60" r="6"/><circle cx="445" cy="60" r="6"/><circle cx="480" cy="60" r="6"/>
  </g>
  <g stroke="hsl(25 95% 53%)" stroke-width="1.5"><path d="M300 60 h 25 M318 55 l 7 5 -7 5" fill="none"/></g>
  <text x="400" y="22" text-anchor="middle" fill="currentColor" font-weight="600">Modèle particulaire</text>
  <text x="400" y="140" text-anchor="middle" fill="currentColor" font-size="11">photons d’énergie E = h·ν</text>
  <text x="400" y="156" text-anchor="middle" fill="currentColor" font-size="11">émission, absorption (quantification)</text>
  <text x="260" y="62" text-anchor="middle" fill="currentColor" font-size="18">⇄</text>
</svg>`

const chapter: Chapter = {
  id: 'lumiere-photon',
  subject: 'physique-chimie',
  order: 15,
  title: 'Lumière : ondes et photons',
  theme: 'Ondes et signaux',
  summary:
    'Modèle ondulatoire (λ, ν, c = λν) et spectre électromagnétique ; modèle particulaire, photon E = hν = hc/λ, électronvolt, niveaux d’énergie quantifiés, spectres de raies.',
  duration: '3 semaines',
  objectives: [
    'Utiliser la relation $c = \\lambda\\nu$ et situer les domaines du spectre électromagnétique.',
    'Connaître la valeur de la célérité de la lumière dans le vide et sa variation dans un milieu transparent ($v = c/n$).',
    'Utiliser la relation $E = h\\nu = hc/\\lambda$ pour l’énergie d’un photon.',
    'Convertir une énergie entre joule et électronvolt.',
    'Interpréter les échanges d’énergie entre lumière et matière par la quantification des niveaux d’énergie.',
    'Relier un spectre de raies d’émission ou d’absorption aux transitions entre niveaux d’énergie : $|\\Delta E| = h\\nu$.',
    'Distinguer spectre continu d’origine thermique et spectre de raies ; utiliser la loi de Wien.',
    'Citer le principe de l’émission stimulée et du laser.',
  ],
  keywords: [
    'longueur d’onde',
    'fréquence',
    'célérité',
    'spectre électromagnétique',
    'photon',
    'constante de Planck',
    'électronvolt',
    'niveau d’énergie',
    'quantification',
    'spectre de raies',
    'loi de Wien',
    'laser',
  ],

  // ------------------------------------------------------------------ FICHE
  fiche: [
    { type: 'h2', text: 'Modèle ondulatoire' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Relation fondamentale',
      content: [
        { type: 'math', tex: String.raw`c = \lambda\,\nu = \frac{\lambda}{T}` },
        {
          type: 'p',
          text: String.raw`$c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ dans le vide ; $\lambda$ en m, $\nu$ en Hz, $T$ en s. Dans un milieu d’indice $n$ : $v = c/n$ et $\lambda = \lambda_0/n$ ; **$\nu$ ne change pas**.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Domaine', 'λ (dans le vide)'],
      rows: [
        ['Rayons γ et X', '< 10 nm (environ)'],
        ['Ultraviolets (UV)', '10 nm à 400 nm'],
        ['Visible', '400 nm à 800 nm'],
        ['Infrarouges (IR)', '800 nm à 1 mm'],
        ['Micro-ondes', '1 mm à ~30 cm'],
        ['Ondes radio', '> ~30 cm'],
      ],
      caption: 'Les limites sont des ordres de grandeur conventionnels.',
    },
    { type: 'h2', text: 'Modèle particulaire' },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Photon',
      content: [
        { type: 'math', tex: String.raw`E = h\,\nu = \frac{h\,c}{\lambda}` },
        {
          type: 'list',
          items: [
            String.raw`$h = 6{,}63\times10^{-34}\ \text{J·s}$ (constante de Planck).`,
            String.raw`$1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.`,
            String.raw`Repère utile : $E\,(\text{eV}) \approx \dfrac{1\,243}{\lambda\,(\text{nm})}$ ; un photon visible a une énergie d’environ 1,6 à 3,1 eV.`,
            String.raw`Plus $\lambda$ est petite, plus le photon est énergétique (UV, X, γ).`,
          ],
        },
      ],
    },
    { type: 'h2', text: 'Quantification et spectres' },
    {
      type: 'list',
      items: [
        String.raw`L’énergie d’un atome ne peut prendre que des **valeurs discrètes** $E_1 < E_2 < \dots$ (niveaux d’énergie) : elle est **quantifiée**. Le niveau le plus bas est l’état **fondamental**.`,
        String.raw`**Émission** : $E_{\text{haut}}\to E_{\text{bas}}$, un photon est émis : $h\nu = E_{\text{haut}}-E_{\text{bas}}$.`,
        String.raw`**Absorption** : un photon n’est absorbé que si $h\nu = E_{\text{haut}}-E_{\text{bas}}$ exactement.`,
        String.raw`Un **spectre de raies** est la signature (empreinte) d’un élément chimique : mêmes raies en émission et en absorption.`,
        String.raw`Un corps chaud émet un **spectre continu** dont le maximum $\lambda_{\max}$ vérifie la **loi de Wien** : $\lambda_{\max}\cdot T = 2{,}898\times10^{-3}\ \text{m·K}$.`,
      ],
    },
  ],

  // ------------------------------------------------------------------ COURS
  cours: [
    { type: 'h2', text: '1. Modèle ondulatoire de la lumière' },
    { type: 'h3', text: 'Grandeurs caractéristiques' },
    {
      type: 'p',
      text: String.raw`La lumière est une **onde électromagnétique** : elle se propage dans le vide, sans support matériel. Une onde lumineuse sinusoïdale est caractérisée par :`,
    },
    {
      type: 'list',
      items: [
        String.raw`sa **période** $T$ (en s) : durée d’un motif temporel ;`,
        String.raw`sa **fréquence** $\nu = 1/T$ (en hertz, Hz) ;`,
        String.raw`sa **longueur d’onde** $\lambda$ (en m) : distance parcourue par l’onde pendant une période, c’est aussi la périodicité spatiale ;`,
        String.raw`sa **célérité** $v$ (en m·s⁻¹).`,
      ],
    },
    {
      type: 'callout',
      variant: 'property',
      title: 'Relation entre λ, ν et c',
      content: [
        { type: 'math', tex: String.raw`\lambda = v\,T = \frac{v}{\nu}` },
        {
          type: 'p',
          text: String.raw`Dans le vide (et approximativement dans l’air), la célérité de toute radiation électromagnétique est la même : $c = 299\,792\,458\ \text{m·s}^{-1} \approx 3{,}00\times10^{8}\ \text{m·s}^{-1}$. Ainsi $\lambda_0 = c/\nu$.`,
        },
      ],
    },
    {
      type: 'widget',
      id: 'wave-simulator',
      title: 'Onde progressive sinusoïdale',
      caption: 'Faites varier λ et T : la célérité v = λ / T se déduit du motif. Observez la double périodicité, temporelle (T) et spatiale (λ).',
    },
    { type: 'h3', text: 'Propagation dans un milieu transparent' },
    {
      type: 'p',
      text: String.raw`Dans un milieu transparent, la lumière se propage moins vite que dans le vide. On définit l’**indice de réfraction** $n = c/v \geq 1$ du milieu (air : $n \approx 1{,}00$ ; eau : $n \approx 1{,}33$ ; verre : $n \approx 1{,}5$). La **fréquence** (donc la couleur) est imposée par la source et **ne change pas** : c’est la longueur d’onde qui varie.`,
    },
    {
      type: 'math',
      tex: String.raw`v = \frac{c}{n} \qquad\text{et}\qquad \lambda = \frac{v}{\nu} = \frac{\lambda_0}{n}`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple : lumière rouge dans l’eau',
      content: [
        {
          type: 'p',
          text: String.raw`Une radiation de longueur d’onde dans le vide $\lambda_0 = 650\ \text{nm}$ pénètre dans l’eau ($n = 1{,}33$). Sa fréquence : $\nu = \dfrac{3{,}00\times10^{8}}{650\times10^{-9}} = 4{,}6\times10^{14}\ \text{Hz}$ (inchangée). Sa célérité : $v = \dfrac{3{,}00\times10^{8}}{1{,}33} = 2{,}26\times10^{8}\ \text{m·s}^{-1}$. Sa longueur d’onde : $\lambda = \dfrac{650}{1{,}33} = 489\ \text{nm}$. La lumière reste rouge pour l’observateur sous l’eau, car sa fréquence n’a pas changé.`,
        },
      ],
    },
    { type: 'h3', text: 'Le spectre électromagnétique' },
    {
      type: 'p',
      text: String.raw`Le visible n’est qu’une toute petite partie des ondes électromagnétiques, qui s’étendent sur plus de vingt ordres de grandeur en longueur d’onde. Elles sont toutes de même nature et se propagent à la même vitesse dans le vide ; seules diffèrent leur longueur d’onde, leur fréquence et leurs effets sur la matière.`,
    },
    { type: 'svg', svg: svgSpectreEM, caption: 'Spectre électromagnétique (échelle de λ logarithmique, ordres de grandeur).' },
    {
      type: 'table',
      headers: ['Domaine', 'λ (ordre de grandeur)', 'Sources / applications'],
      rows: [
        ['Rayons γ', '< 10⁻¹¹ m', 'Désexcitation de noyaux ; radiothérapie'],
        ['Rayons X', '10⁻¹¹ à 10⁻⁸ m', 'Radiographie, scanner'],
        ['Ultraviolets', '10 à 400 nm', 'Soleil, lampes à vapeur de mercure ; bronzage, stérilisation, lampes fluorescentes'],
        ['Visible', '400 à 800 nm', 'Soleil, lampes, LED, lasers ; vision'],
        ['Infrarouges', '800 nm à 1 mm', 'Corps chauds, télécommandes, caméras thermiques, fibres optiques'],
        ['Micro-ondes', '1 mm à 30 cm', 'Four (2,45 GHz), Wi-Fi (2,4 GHz), radar, téléphonie'],
        ['Ondes radio', '> 30 cm', 'Radio FM (≈ 100 MHz), télévision, GPS'],
      ],
    },
    {
      type: 'callout',
      variant: 'method',
      title: 'Méthode : convertir et calculer',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Unités', text: String.raw`Convertir $\lambda$ en **mètres** : $1\ \text{nm} = 10^{-9}\ \text{m}$ ; $1\ \mu\text{m} = 10^{-6}\ \text{m}$ ; fréquence : $1\ \text{GHz} = 10^{9}\ \text{Hz}$.` },
            { title: 'Relation', text: String.raw`Appliquer $\nu = c/\lambda$ ou $\lambda = c/\nu$.` },
            { title: 'Chiffres significatifs', text: String.raw`Donner un résultat avec autant de chiffres significatifs que la donnée la moins précise (3 en général ici).` },
            { title: 'Cohérence', text: String.raw`Comparer à un ordre de grandeur connu : visible $\nu\sim10^{14}\ \text{Hz}$, $\lambda\sim 10^{-7}\ \text{m}$.` },
          ],
        },
      ],
    },

    { type: 'h2', text: '2. Sources de lumière : spectres continus et spectres de raies' },
    { type: 'h3', text: 'Analyser la lumière' },
    {
      type: 'p',
      text: String.raw`Un **prisme** ou un **réseau** décompose la lumière en ses radiations : on obtient son **spectre** d’émission. On distingue deux grandes familles.`,
    },
    {
      type: 'table',
      headers: ['Type', 'Aspect', 'Source', 'Origine'],
      rows: [
        ['**Spectre continu**', 'Fond coloré continu, sans interruption', 'Lampe à incandescence, Soleil, solide ou liquide chauffé', 'Agitation thermique, émission d’un corps chaud'],
        ['**Spectre de raies d’émission**', 'Raies colorées sur fond noir', 'Gaz peu dense excité (lampe spectrale, tube néon, vapeur de sodium, de mercure)', 'Désexcitation d’atomes isolés'],
        ['**Spectre de raies d’absorption**', 'Raies noires sur fond coloré continu', 'Gaz froid traversé par une lumière blanche', 'Absorption de photons par des atomes'],
      ],
    },
    { type: 'svg', svg: svgSpectresRaies, caption: 'Les raies d’absorption d’un élément se retrouvent aux mêmes longueurs d’onde que ses raies d’émission.' },
    { type: 'h3', text: 'Spectre continu d’origine thermique : loi de Wien' },
    {
      type: 'p',
      text: String.raw`Tout corps dont la température est supérieure à 0 K émet un rayonnement thermique. Plus sa température $T$ est élevée, plus ce rayonnement est intense et plus son maximum d’émission se déplace vers les **courtes longueurs d’onde**.`,
    },
    {
      type: 'callout',
      variant: 'theorem',
      title: 'Loi de Wien',
      content: [
        { type: 'math', tex: String.raw`\lambda_{\max}\cdot T = 2{,}898\times10^{-3}\ \text{m·K}` },
        {
          type: 'p',
          text: String.raw`$\lambda_{\max}$ est la longueur d’onde du maximum d’émission (en m) et $T$ la température de surface du corps (en **kelvin**, $T(\text{K}) = \theta(^\circ\text{C}) + 273{,}15$).`,
        },
      ],
    },
    { type: 'svg', svg: svgWien, caption: 'Spectres thermiques à différentes températures : le maximum se déplace vers les petites λ quand T augmente (allure qualitative).' },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemples : Soleil, corps humain, filament',
      content: [
        {
          type: 'list',
          items: [
            String.raw`**Soleil** : $T \approx 5\,800\ \text{K}$, $\lambda_{\max} = \dfrac{2{,}898\times10^{-3}}{5\,800} = 5{,}0\times10^{-7}\ \text{m} = 500\ \text{nm}$ : au centre du visible (vert-bleu).`,
            String.raw`**Corps humain** : $T \approx 310\ \text{K}$, $\lambda_{\max} = \dfrac{2{,}898\times10^{-3}}{310} = 9{,}3\ \mu\text{m}$ : dans l’**infrarouge**, d’où les caméras thermiques.`,
            String.raw`**Filament de lampe à incandescence** : $T \approx 2\,700\ \text{K}$, $\lambda_{\max} = 1{,}07\ \mu\text{m}$ : dans l’infrarouge ; la majeure partie de l’énergie est rayonnée hors du visible, ce qui explique le faible rendement lumineux.`,
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'La température de couleur',
      content: [
        {
          type: 'p',
          text: String.raw`Un objet chaud paraît **rouge** à basse température (~1 000 K), **jaune-blanc** vers 3 000 K, **blanc-bleuté** au-delà de 6 000 K : plus c’est chaud, plus c’est « bleu ». Les couleurs « chaudes » du langage courant (rouge, orange) correspondent donc à des températures plus basses.`,
        },
      ],
    },

    { type: 'h2', text: '3. Modèle particulaire : le photon' },
    {
      type: 'p',
      text: String.raw`Certains phénomènes (émission et absorption de lumière par la matière, effet photoélectrique, fonctionnement des capteurs numériques) ne peuvent pas s’expliquer par le seul modèle ondulatoire. Il faut alors décrire la lumière comme un flux de **particules sans masse et sans charge**, les **photons**, se déplaçant à la célérité $c$ dans le vide.`,
    },
    {
      type: 'callout',
      variant: 'history',
      title: 'Planck et Einstein',
      content: [
        {
          type: 'p',
          text: String.raw`En 1900, Max Planck explique la forme du spectre du rayonnement thermique en supposant que les échanges d’énergie se font par paquets $h\nu$. En 1905, Albert Einstein propose que la lumière elle-même est constituée de quanta d’énergie $h\nu$ (les « photons », nom donné en 1926) pour expliquer l’effet photoélectrique, ce qui lui vaut le prix Nobel de physique 1921.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'definition',
      title: 'Énergie d’un photon',
      content: [
        { type: 'math', tex: String.raw`E = h\,\nu = \frac{h\,c}{\lambda}` },
        {
          type: 'p',
          text: String.raw`$E$ en joules (J), $\nu$ en hertz (Hz), $\lambda$ en mètres (m), $h = 6{,}63\times10^{-34}\ \text{J·s}$ la **constante de Planck**, $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgDualite, caption: 'Deux modèles complémentaires de la lumière : onde (propagation) et photons (échanges avec la matière).' },
    {
      type: 'callout',
      variant: 'property',
      title: 'L’électronvolt',
      content: [
        {
          type: 'p',
          text: String.raw`Le joule est une unité trop grande à l’échelle d’un photon ou d’un atome. On utilise l’**électronvolt** (eV) : c’est l’énergie gagnée par un électron accéléré par une tension de 1 V.`,
        },
        { type: 'math', tex: String.raw`1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}` },
        {
          type: 'p',
          text: String.raw`Pour passer des joules aux électronvolts : $E_{\text{eV}} = \dfrac{E_{\text{J}}}{1{,}60\times10^{-19}}$ ; des eV aux J : $E_{\text{J}} = E_{\text{eV}}\times1{,}60\times10^{-19}$.`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : photon vert',
      content: [
        {
          type: 'p',
          text: String.raw`Énergie d’un photon de longueur d’onde $\lambda = 500\ \text{nm}$ : $E = \dfrac{hc}{\lambda} = \dfrac{6{,}63\times10^{-34}\times3{,}00\times10^{8}}{500\times10^{-9}} = 3{,}98\times10^{-19}\ \text{J}$, soit $E = \dfrac{3{,}98\times10^{-19}}{1{,}60\times10^{-19}} = 2{,}49\ \text{eV}$.`,
        },
      ],
    },
    {
      type: 'table',
      headers: ['Radiation', 'λ', 'ν (Hz)', 'E (J)', 'E (eV)'],
      rows: [
        ['Violet', '400 nm', '7,50×10¹⁴', '4,97×10⁻¹⁹', '3,11'],
        ['Vert', '550 nm', '5,45×10¹⁴', '3,62×10⁻¹⁹', '2,26'],
        ['Rouge', '700 nm', '4,29×10¹⁴', '2,84×10⁻¹⁹', '1,78'],
        ['UV', '300 nm', '1,00×10¹⁵', '6,63×10⁻¹⁹', '4,14'],
      ],
      caption: 'Plus la fréquence est élevée (ou la longueur d’onde petite), plus l’énergie du photon est grande.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Formule pratique',
      content: [
        {
          type: 'p',
          text: String.raw`Avec les valeurs de $h$, $c$ et de l’eV : $hc = 1{,}99\times10^{-25}\ \text{J·m} = 1{,}24\times10^{-6}\ \text{eV·m} = 1\,243\ \text{eV·nm}$. D’où $E(\text{eV}) \approx \dfrac{1\,243}{\lambda(\text{nm})}$. Elle sert à vérifier l’ordre de grandeur, mais le raisonnement doit toujours partir de $E = hc/\lambda$.`,
        },
      ],
    },
    { type: 'h3', text: 'Flux de photons et puissance lumineuse' },
    {
      type: 'p',
      text: String.raw`Une source monochromatique de puissance $P$ émet chaque seconde $N$ photons d’énergie $E$ chacun : $P = N\,E$ (avec $N$ nombre de photons par seconde). Le nombre de photons par seconde vaut donc $N = P/E$. Il est colossal à l’échelle macroscopique : c’est pourquoi la lumière paraît continue.`,
    },

    { type: 'h2', text: '4. Niveaux d’énergie quantifiés' },
    { type: 'h3', text: 'Quantification de l’énergie' },
    {
      type: 'p',
      text: String.raw`L’énergie d’un atome (ou d’une molécule) isolé ne peut prendre que certaines valeurs discrètes $E_1, E_2, E_3\dots$ : on dit qu’elle est **quantifiée**. On la représente par un **diagramme de niveaux d’énergie**, où l’énergie croît vers le haut. Le niveau de plus basse énergie est l’**état fondamental** ; les autres sont des **états excités**. Un atome est **ionisé** lorsque l’électron est arraché : l’énergie de référence est alors $E = 0$, et les niveaux liés ont des énergies négatives.`,
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Atome d’hydrogène',
      content: [
        { type: 'math', tex: String.raw`E_n = -\frac{13{,}6}{n^{2}}\ \text{eV}\qquad(n = 1, 2, 3\dots)` },
        {
          type: 'p',
          text: String.raw`$E_1 = -13{,}6\ \text{eV}$ (fondamental) ; $E_2 = -3{,}40\ \text{eV}$ ; $E_3 = -1{,}51\ \text{eV}$ ; $E_4 = -0{,}85\ \text{eV}$ ; $E_\infty = 0$. L’**énergie d’ionisation** depuis l’état fondamental est $13{,}6\ \text{eV}$.`,
        },
      ],
    },
    { type: 'svg', svg: svgNiveauxH, caption: 'Diagramme des niveaux d’énergie de l’atome d’hydrogène et quelques transitions.' },
    { type: 'h3', text: 'Émission et absorption : transitions' },
    {
      type: 'callout',
      variant: 'property',
      title: 'Lien entre photon et transition',
      content: [
        {
          type: 'list',
          items: [
            String.raw`**Émission** : un atome excité passe d’un niveau $E_{\text{haut}}$ à un niveau $E_{\text{bas}}$ en émettant un photon : $h\nu = E_{\text{haut}} - E_{\text{bas}}$.`,
            String.raw`**Absorption** : un atome passe de $E_{\text{bas}}$ à $E_{\text{haut}}$ en absorbant un photon, **seulement si** l’énergie du photon est **exactement** $E_{\text{haut}} - E_{\text{bas}}$.`,
            String.raw`Dans les deux cas : $\lambda = \dfrac{hc}{|\Delta E|}$. Ce sont donc des longueurs d’onde **discrètes**, caractéristiques de l’atome : les raies.`,
          ],
        },
      ],
    },
    { type: 'svg', svg: svgEmissionAbsorption, caption: 'Absorption, émission spontanée et émission stimulée (principe du laser).' },
    {
      type: 'widget',
      id: 'energy-levels',
      props: { atom: 'hydrogene' },
      title: 'Niveaux d’énergie et transitions de l’hydrogène',
      caption: 'Choisissez deux niveaux : l’énergie du photon, sa longueur d’onde et sa place dans le spectre s’affichent.',
    },
    {
      type: 'callout',
      variant: 'example',
      title: 'Exemple rédigé : la raie rouge de l’hydrogène',
      content: [
        {
          type: 'steps',
          items: [
            { title: 'Énergie de la transition 3 → 2', text: String.raw`$\Delta E = E_3 - E_2 = -1{,}51 - (-3{,}40) = 1{,}89\ \text{eV}$, soit $1{,}89\times1{,}60\times10^{-19} = 3{,}02\times10^{-19}\ \text{J}$.` },
            { title: 'Longueur d’onde', text: String.raw`$\lambda = \dfrac{hc}{\Delta E} = \dfrac{6{,}63\times10^{-34}\times3{,}00\times10^{8}}{3{,}02\times10^{-19}} = 6{,}58\times10^{-7}\ \text{m} = 658\ \text{nm}$.` },
            { title: 'Interprétation', text: String.raw`$658\ \text{nm}$ est dans le domaine visible (rouge) : c’est la raie $H_\alpha$ de la série de Balmer.` },
          ],
        },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Absorption : tout ou rien',
      content: [
        {
          type: 'p',
          text: String.raw`Un atome n’absorbe pas un photon dont l’énergie est « à peu près » égale à un écart de niveaux, ni un photon d’énergie inférieure ou supérieure : il faut la **coïncidence exacte** $h\nu = \Delta E$. (Un photon d’énergie supérieure à l’énergie d’ionisation peut en revanche ioniser l’atome, l’excédent étant emporté par l’électron.) C’est pourquoi un gaz éclairé en lumière blanche n’absorbe que des radiations bien précises : les raies d’absorption.`,
        },
      ],
    },
    { type: 'h3', text: 'Spectres de raies et identification' },
    {
      type: 'p',
      text: String.raw`Chaque élément chimique a son propre diagramme de niveaux, donc son propre spectre de raies, véritable **empreinte** de l’élément. La spectroscopie permet d’identifier la composition d’une étoile : les raies sombres du spectre solaire (raies de Fraunhofer) révèlent l’hydrogène, le sodium, le calcium, le fer… présents dans l’atmosphère du Soleil. En 1868, l’**hélium** a été repéré dans le spectre solaire avant d’être isolé sur Terre (d’où son nom, de *hélios*, le Soleil).`,
    },
    {
      type: 'widget',
      id: 'energy-levels',
      props: { atom: 'mercure' },
      title: 'Autre exemple : l’atome de mercure',
      caption: 'Les lampes à vapeur de mercure émettent surtout dans l’UV et quelques raies visibles.',
    },

    { type: 'h2', text: '5. Applications' },
    {
      type: 'grid',
      columns: 2,
      items: [
        {
          title: 'Lampes à vapeur et tubes fluorescents',
          icon: 'Lightbulb',
          text: String.raw`Une décharge électrique excite la vapeur de mercure, qui émet surtout de l’UV (254 nm). Un **luminophore** déposé sur la paroi absorbe ces photons UV et réémet des photons visibles de plus faible énergie : c’est la fluorescence.`,
        },
        {
          title: 'LED (diodes électroluminescentes)',
          icon: 'Zap',
          text: String.raw`Dans une LED, des électrons passent d’un niveau d’énergie à un niveau plus bas, d’écart $E_g$ (gap), en émettant un photon : $\lambda \approx hc/E_g$. Une LED blanche associe une LED bleue et un luminophore jaune.`,
        },
        {
          title: 'Laser',
          icon: 'Sun',
          text: String.raw`Dans un laser, l’**émission stimulée** (un photon incident déclenche l’émission d’un photon identique : même λ, même direction) est amplifiée dans une cavité. La lumière est quasi **monochromatique**, directive et cohérente.`,
        },
        {
          title: 'Astrophysique',
          icon: 'Telescope',
          text: String.raw`Le spectre d’une étoile renseigne sur sa température (loi de Wien) et sa composition (raies d’absorption). Le déplacement des raies renseigne sur sa vitesse (effet Doppler).`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'remember',
      title: 'Bilan du chapitre',
      content: [
        {
          type: 'list',
          items: [
            String.raw`Onde : $c = \lambda\nu$ ; photon : $E = h\nu = hc/\lambda$.`,
            String.raw`Photon visible : $\lambda\sim 10^{-7}\ \text{m}$, $\nu\sim10^{14}\ \text{Hz}$, $E\sim 2\ \text{eV}\sim 3\times10^{-19}\ \text{J}$.`,
            String.raw`Atome : niveaux quantifiés ; $h\nu = |\Delta E|$ ; spectres de raies = empreintes.`,
            String.raw`Corps chaud : spectre continu ; $\lambda_{\max}T = 2{,}898\times10^{-3}\ \text{m·K}$.`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ EXERCICES
  exercices: [
    {
      id: 'lumiere-photon-ex1',
      title: 'Fréquence et période d’une radiation',
      difficulty: 1,
      duration: 8,
      tags: ['c = λν'],
      statement: [
        {
          type: 'p',
          text: String.raw`Une lampe émet une radiation monochromatique verte de longueur d’onde dans le vide $\lambda = 550\ \text{nm}$. Donnée : $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer la fréquence $\nu$ de cette radiation.`,
            String.raw`Calculer sa période $T$.`,
            String.raw`Cette radiation entre dans un verre d’indice $n = 1{,}50$. Calculer sa célérité $v$ et sa longueur d’onde $\lambda'$ dans le verre. Sa couleur change-t-elle ?`,
          ],
        },
      ],
      hints: [String.raw`Convertissez d’abord $\lambda$ en mètres.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$\nu = \dfrac{c}{\lambda} = \dfrac{3{,}00\times10^{8}}{550\times10^{-9}} = 5{,}45\times10^{14}\ \text{Hz}$.`,
            String.raw`$T = \dfrac{1}{\nu} = \dfrac{1}{5{,}45\times10^{14}} = 1{,}83\times10^{-15}\ \text{s}$.`,
            String.raw`$v = \dfrac{c}{n} = \dfrac{3{,}00\times10^{8}}{1{,}50} = 2{,}00\times10^{8}\ \text{m·s}^{-1}$. La fréquence est inchangée, donc $\lambda' = \dfrac{v}{\nu} = \dfrac{2{,}00\times10^{8}}{5{,}45\times10^{14}} = 3{,}67\times10^{-7}\ \text{m} = 367\ \text{nm}$ (on retrouve $\lambda/n = 550/1{,}5$). La couleur ne change pas, car elle est liée à la fréquence.`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex2',
      title: 'Domaines du spectre électromagnétique',
      difficulty: 1,
      duration: 10,
      tags: ['spectre électromagnétique'],
      statement: [
        {
          type: 'p',
          text: String.raw`Donnée : $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Un four à micro-ondes fonctionne à $\nu = 2{,}45\ \text{GHz}$. Calculer la longueur d’onde. Dans quel domaine se trouve-t-elle ?`,
            String.raw`Une station de radio FM émet à $100\ \text{MHz}$. Calculer $\lambda$.`,
            String.raw`Classer par ordre de longueur d’onde croissante : une radiation de $100\ \text{nm}$, de $10\ \mu\text{m}$, de $600\ \text{nm}$, de $0{,}1\ \text{nm}$. Préciser pour chacune le domaine.`,
            String.raw`Quelle radiation transporte les photons les plus énergétiques ?`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$\lambda = \dfrac{c}{\nu} = \dfrac{3{,}00\times10^{8}}{2{,}45\times10^{9}} = 0{,}122\ \text{m} = 12{,}2\ \text{cm}$ : domaine des **micro-ondes**.`,
            String.raw`$\lambda = \dfrac{3{,}00\times10^{8}}{100\times10^{6}} = 3{,}00\ \text{m}$ : **ondes radio**.`,
            String.raw`Par ordre croissant : $0{,}1\ \text{nm}$ (rayons **X**) $<$ $100\ \text{nm}$ (**ultraviolet**) $<$ $600\ \text{nm}$ (**visible**, orange) $<$ $10\ \mu\text{m}$ (**infrarouge**).`,
            String.raw`$E = hc/\lambda$ est d’autant plus grande que $\lambda$ est petite : ce sont les photons de la radiation de $0{,}1\ \text{nm}$ (rayons X).`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex3',
      title: 'Énergie de photons',
      difficulty: 1,
      duration: 10,
      tags: ['photon', 'électronvolt'],
      statement: [
        {
          type: 'p',
          text: String.raw`Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ ; $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer l’énergie, en joules puis en électronvolts, d’un photon rouge de longueur d’onde $\lambda_R = 700\ \text{nm}$ et d’un photon violet de $\lambda_V = 400\ \text{nm}$.`,
            String.raw`Quel est le rapport $E_V/E_R$ ? Vérifier qu’il est égal à $\lambda_R/\lambda_V$.`,
            String.raw`Un photon UV a une énergie de $4{,}14\ \text{eV}$. Calculer sa longueur d’onde.`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$E_R = \dfrac{hc}{\lambda_R} = \dfrac{6{,}63\times10^{-34}\times3{,}00\times10^{8}}{700\times10^{-9}} = 2{,}84\times10^{-19}\ \text{J} = \dfrac{2{,}84\times10^{-19}}{1{,}60\times10^{-19}} = 1{,}78\ \text{eV}$. $E_V = \dfrac{1{,}989\times10^{-25}}{400\times10^{-9}} = 4{,}97\times10^{-19}\ \text{J} = 3{,}11\ \text{eV}$.`,
            String.raw`$\dfrac{E_V}{E_R} = \dfrac{4{,}97}{2{,}84} = 1{,}75$ et $\dfrac{\lambda_R}{\lambda_V} = \dfrac{700}{400} = 1{,}75$ : $E$ est inversement proportionnelle à $\lambda$.`,
            String.raw`$E = 4{,}14\times1{,}60\times10^{-19} = 6{,}62\times10^{-19}\ \text{J}$, donc $\lambda = \dfrac{hc}{E} = \dfrac{1{,}989\times10^{-25}}{6{,}62\times10^{-19}} = 3{,}00\times10^{-7}\ \text{m} = 300\ \text{nm}$ (UV).`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex4',
      title: 'Laser et flux de photons',
      difficulty: 2,
      duration: 12,
      tags: ['laser', 'puissance', 'photon'],
      statement: [
        {
          type: 'p',
          text: String.raw`Un pointeur laser vert émet une radiation de longueur d’onde $\lambda = 532\ \text{nm}$ avec une puissance $P = 5{,}0\ \text{mW}$. Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer l’énergie d’un photon émis, en joules.`,
            String.raw`Calculer le nombre $N$ de photons émis par seconde.`,
            String.raw`Combien de temps faut-il pour que le laser émette une énergie de $1{,}0\ \text{J}$ ?`,
            String.raw`Un laser infrarouge de même puissance émet à $1\,064\ \text{nm}$. Émet-il plus ou moins de photons par seconde ? Justifier sans calcul.`,
          ],
        },
      ],
      hints: [String.raw`Puissance = énergie par seconde : $P = N\,E$.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$E = \dfrac{hc}{\lambda} = \dfrac{6{,}63\times10^{-34}\times3{,}00\times10^{8}}{532\times10^{-9}} = 3{,}74\times10^{-19}\ \text{J}$.`,
            String.raw`$P = 5{,}0\times10^{-3}\ \text{W} = 5{,}0\times10^{-3}\ \text{J·s}^{-1}$, donc $N = \dfrac{P}{E} = \dfrac{5{,}0\times10^{-3}}{3{,}74\times10^{-19}} = 1{,}3\times10^{16}$ photons par seconde.`,
            String.raw`$\Delta t = \dfrac{E_{\text{tot}}}{P} = \dfrac{1{,}0}{5{,}0\times10^{-3}} = 2{,}0\times10^{2}\ \text{s} = 200\ \text{s}$ (environ 3 min 20 s).`,
            String.raw`Un photon infrarouge à 1 064 nm est **moins énergétique** (λ plus grande). À puissance égale, il en faut **plus** par seconde : le laser infrarouge émet plus de photons par seconde (environ deux fois plus : $1\,064/532 = 2{,}00$).`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex5',
      title: 'Transitions de l’atome d’hydrogène',
      difficulty: 2,
      duration: 20,
      tags: ['niveaux d’énergie', 'émission', 'absorption'],
      statement: [
        {
          type: 'p',
          text: String.raw`Les niveaux d’énergie de l’atome d’hydrogène sont donnés par $E_n = -\dfrac{13{,}6}{n^2}$ (en eV). Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ ; $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer $E_1$, $E_2$, $E_3$ et $E_4$ en eV. Représenter le diagramme d’énergie.`,
            String.raw`Calculer la longueur d’onde du photon émis lors de la transition $n=4\to n=2$. Dans quel domaine se situe-t-il ?`,
            String.raw`Même question pour $n=2\to n=1$.`,
            String.raw`Un atome d’hydrogène dans son état fondamental peut-il absorber un photon de $10{,}2\ \text{eV}$ ? de $11{,}0\ \text{eV}$ ? Justifier.`,
            String.raw`Calculer la longueur d’onde maximale d’un photon capable d’ioniser un atome d’hydrogène dans son état fondamental.`,
          ],
        },
      ],
      hints: [
        String.raw`$\lambda = \dfrac{hc}{\Delta E}$ avec $\Delta E$ converti en joules.`,
        String.raw`Pour ioniser, il faut au moins l’énergie qui amène l’électron à $E=0$.`,
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$E_1 = -13{,}6$ eV ; $E_2 = -13{,}6/4 = -3{,}40$ eV ; $E_3 = -13{,}6/9 = -1{,}51$ eV ; $E_4 = -13{,}6/16 = -0{,}85$ eV. Le diagramme (voir le schéma du cours) comporte des niveaux de plus en plus rapprochés quand $n$ augmente, qui tendent vers $0$.`,
            String.raw`$\Delta E = E_4 - E_2 = -0{,}85 + 3{,}40 = 2{,}55\ \text{eV} = 2{,}55\times1{,}60\times10^{-19} = 4{,}08\times10^{-19}\ \text{J}$. $\lambda = \dfrac{1{,}989\times10^{-25}}{4{,}08\times10^{-19}} = 4{,}87\times10^{-7}\ \text{m} = 487\ \text{nm}$ : **visible** (bleu-cyan).`,
            String.raw`$\Delta E = E_2 - E_1 = -3{,}40 + 13{,}6 = 10{,}2\ \text{eV} = 1{,}63\times10^{-18}\ \text{J}$. $\lambda = \dfrac{1{,}989\times10^{-25}}{1{,}63\times10^{-18}} = 1{,}22\times10^{-7}\ \text{m} = 122\ \text{nm}$ : **ultraviolet**.`,
            String.raw`Un photon de $10{,}2\ \text{eV}$ : **oui**, car $10{,}2 = E_2 - E_1$ exactement (transition $1\to2$). Un photon de $11{,}0\ \text{eV}$ : **non**, car cette énergie ne correspond à aucun écart $E_n - E_1$ ($E_3-E_1 = 12{,}1$ eV) et est inférieure à l’énergie d’ionisation (13,6 eV).`,
            String.raw`Il faut $\Delta E = 0 - (-13{,}6) = 13{,}6\ \text{eV} = 2{,}18\times10^{-18}\ \text{J}$, donc $\lambda_{\max} = \dfrac{1{,}989\times10^{-25}}{2{,}18\times10^{-18}} = 9{,}14\times10^{-8}\ \text{m} = 91{,}4\ \text{nm}$ (UV). Tout photon de longueur d’onde inférieure ou égale convient.`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex6',
      title: 'Absorption sélective',
      difficulty: 2,
      duration: 12,
      tags: ['absorption', 'quantification'],
      statement: [
        {
          type: 'p',
          text: String.raw`Un atome d’hydrogène est dans l’état excité $n = 2$ ($E_2 = -3{,}40\ \text{eV}$). Les énergies des niveaux supérieurs sont $E_3 = -1{,}51\ \text{eV}$, $E_4 = -0{,}85\ \text{eV}$, $E_5 = -0{,}54\ \text{eV}$. Il est éclairé par de la lumière blanche.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer l’énergie d’un photon de longueur d’onde $\lambda = 500\ \text{nm}$ (en eV). Peut-il être absorbé ?`,
            String.raw`Calculer les longueurs d’onde des photons que cet atome peut absorber en passant de $n = 2$ à $n = 3$ et à $n = 4$.`,
            String.raw`En déduire l’aspect du spectre de la lumière après traversée d’un gaz d’atomes d’hydrogène dans l’état $n=2$.`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$E = \dfrac{hc}{\lambda} = \dfrac{1{,}989\times10^{-25}}{500\times10^{-9}} = 3{,}98\times10^{-19}\ \text{J} = 2{,}49\ \text{eV}$. Les écarts possibles depuis $n=2$ sont $1{,}89$ eV, $2{,}55$ eV, $2{,}86$ eV…, aucun n’est égal à $2{,}49$ eV : le photon **ne peut pas être absorbé**.`,
            String.raw`$2\to3$ : $\Delta E = 1{,}89\ \text{eV} = 3{,}02\times10^{-19}\ \text{J}$, $\lambda = 658\ \text{nm}$ (rouge). $2\to4$ : $\Delta E = 2{,}55\ \text{eV} = 4{,}08\times10^{-19}\ \text{J}$, $\lambda = 487\ \text{nm}$ (bleu-cyan).`,
            String.raw`Le spectre est un **spectre continu parcouru de raies noires** (spectre d’absorption) à $658\ \text{nm}$, $487\ \text{nm}$, ($435\ \text{nm}$ pour $2\to5$)… Ces raies sont aux mêmes longueurs d’onde que les raies d’émission de la série de Balmer.`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex7',
      title: 'Loi de Wien : température des astres et des lampes',
      difficulty: 2,
      duration: 15,
      tags: ['Wien', 'spectre continu'],
      statement: [
        {
          type: 'p',
          text: String.raw`Loi de Wien : $\lambda_{\max}\cdot T = 2{,}898\times10^{-3}\ \text{m·K}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`La surface du Soleil est à $T = 5\,800\ \text{K}$. Calculer $\lambda_{\max}$ et commenter.`,
            String.raw`Le spectre d’une étoile présente un maximum à $\lambda_{\max} = 290\ \text{nm}$. Calculer sa température de surface. Quelle sera sa couleur apparente ?`,
            String.raw`Un corps humain a une température de $37\ ^\circ\text{C}$. Calculer $\lambda_{\max}$. Dans quel domaine émet-il ? Pourquoi ne le voit-on pas briller dans le noir ?`,
            String.raw`Une lampe à incandescence a un filament à $2\,700\ \text{K}$. Calculer $\lambda_{\max}$. Pourquoi ce type de lampe a-t-il un mauvais rendement lumineux ?`,
          ],
        },
      ],
      hints: [String.raw`Convertir les degrés Celsius en kelvins : $T = \theta + 273$.`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$\lambda_{\max} = \dfrac{2{,}898\times10^{-3}}{5\,800} = 5{,}00\times10^{-7}\ \text{m} = 500\ \text{nm}$ : au milieu du visible. L’œil humain est adapté au rayonnement solaire (sensibilité maximale vers 555 nm).`,
            String.raw`$T = \dfrac{2{,}898\times10^{-3}}{290\times10^{-9}} = 1{,}0\times10^{4}\ \text{K}$. $\lambda_{\max}$ est dans l’UV, et la queue du spectre dans le visible favorise le bleu : l’étoile paraît **bleu-blanc**.`,
            String.raw`$T = 37+273 = 310\ \text{K}$, $\lambda_{\max} = \dfrac{2{,}898\times10^{-3}}{310} = 9{,}35\times10^{-6}\ \text{m} = 9{,}35\ \mu\text{m}$ : **infrarouge**. Le corps n’émet pratiquement rien dans le visible : invisible pour l’œil, visible pour une caméra thermique.`,
            String.raw`$\lambda_{\max} = \dfrac{2{,}898\times10^{-3}}{2\,700} = 1{,}07\times10^{-6}\ \text{m} = 1{,}07\ \mu\text{m}$ : **infrarouge**. L’essentiel de la puissance est rayonné dans l’IR (chaleur) et non dans le visible : le rendement lumineux est faible (de l’ordre de 5 %).`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex8',
      title: 'Type bac : la lampe à vapeur de mercure',
      difficulty: 3,
      duration: 30,
      tags: ['type bac', 'niveaux d’énergie', 'spectre de raies', 'photon'],
      statement: [
        {
          type: 'p',
          text: String.raw`Une lampe à vapeur de mercure basse pression est utilisée dans les tubes fluorescents. On donne un extrait du diagramme d’énergie de l’atome de mercure (niveaux en eV) : $E_1 = -10{,}44$ (fondamental) ; $E_2 = -5{,}55$ ; $E_3 = -2{,}71$.`,
        },
        {
          type: 'p',
          text: String.raw`Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ ; $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$. Le visible s’étend de $400\ \text{nm}$ à $800\ \text{nm}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Tracer le diagramme des niveaux. Que signifie « niveau fondamental » ?`,
            String.raw`Dans la lampe, un atome de mercure excité passe de $E_3$ à $E_2$. Calculer l’énergie du photon émis en eV puis en J, puis sa longueur d’onde. La radiation est-elle visible ? De quelle couleur ?`,
            String.raw`Même calcul pour la transition $E_2\to E_1$. Cette radiation est-elle visible ?`,
            String.raw`Le spectre d’émission de la lampe présente notamment des raies à $254\ \text{nm}$ et à $436\ \text{nm}$. Ces résultats sont-ils cohérents avec les questions précédentes ? Calculer l’écart relatif pour la raie visible.`,
            String.raw`Le tube fluorescent est recouvert intérieurement d’un luminophore. Expliquer le rôle de cette couche en termes de photons.`,
            String.raw`Un photon de $3{,}50\ \text{eV}$ peut-il être absorbé par un atome de mercure dans l’état fondamental ? Justifier.`,
          ],
        },
      ],
      hints: [
        String.raw`Pour chaque transition : $\Delta E = |E_{\text{haut}} - E_{\text{bas}}|$ puis $\lambda = hc/\Delta E$.`,
        String.raw`Pour la question 5, comparez l’énergie d’un photon UV à celle d’un photon visible.`,
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Diagramme : trois traits horizontaux à $-10{,}44$, $-5{,}55$ et $-2{,}71\ \text{eV}$ (le plus bas étant $E_1$), avec les flèches des transitions $E_3\to E_2$, $E_2\to E_1$ (et $E_3\to E_1$). Le niveau fondamental est le niveau d’énergie **le plus bas**, état stable de l’atome non excité.`,
            String.raw`$\Delta E_{32} = -2{,}71 - (-5{,}55) = 2{,}84\ \text{eV} = 2{,}84\times1{,}60\times10^{-19} = 4{,}54\times10^{-19}\ \text{J}$. $\lambda_{32} = \dfrac{hc}{\Delta E} = \dfrac{1{,}989\times10^{-25}}{4{,}54\times10^{-19}} = 4{,}38\times10^{-7}\ \text{m} = 438\ \text{nm}$. Elle est comprise entre 400 nm et 800 nm : **visible**, couleur violet-bleu (indigo).`,
            String.raw`$\Delta E_{21} = -5{,}55 - (-10{,}44) = 4{,}89\ \text{eV} = 7{,}82\times10^{-19}\ \text{J}$. $\lambda_{21} = \dfrac{1{,}989\times10^{-25}}{7{,}82\times10^{-19}} = 2{,}54\times10^{-7}\ \text{m} = 254\ \text{nm}$ : $254\ \text{nm} < 400\ \text{nm}$, **ultraviolet** (non visible).`,
            String.raw`Les valeurs calculées (438 nm et 254 nm) sont cohérentes avec les raies observées (436 nm et 254 nm). Écart relatif pour la raie visible : $\dfrac{|438-436|}{436} = 0{,}5\ \%$, négligeable (arrondis des niveaux d’énergie). Le modèle de quantification de l’énergie rend bien compte du spectre de raies.`,
            String.raw`La lampe émet surtout de l’UV (254 nm), invisible et nocif. Le luminophore **absorbe** les photons UV (énergie 4,89 eV) et **réémet** des photons de plus faible énergie, dans le visible (1,6 à 3,1 eV) ; la différence d’énergie est cédée à la matière (chaleur). Le mélange de luminophores donne une lumière blanche et améliore le rendement lumineux.`,
            String.raw`Les photons absorbables depuis $E_1$ ont une énergie égale à $E_2 - E_1 = 4{,}89\ \text{eV}$ ou à $E_3 - E_1 = 7{,}73\ \text{eV}$ (ou plus que $10{,}44\ \text{eV}$ pour ioniser). Un photon de $3{,}50\ \text{eV}$ ne correspond à aucun écart de niveaux : il **ne peut pas** être absorbé, l’atome est transparent à cette radiation.`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex9',
      title: 'Lumière dans l’eau et énergie du photon',
      difficulty: 3,
      duration: 20,
      tags: ['indice', 'photon', 'interprétation'],
      statement: [
        {
          type: 'p',
          text: String.raw`Un faisceau laser orange de longueur d’onde dans le vide $\lambda_0 = 600\ \text{nm}$ traverse successivement l’air ($n\approx1$) puis une cuve d’eau ($n = 1{,}33$). Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Calculer la fréquence $\nu$ de la radiation dans l’air.`,
            String.raw`Calculer sa célérité $v$ et sa longueur d’onde $\lambda$ dans l’eau.`,
            String.raw`Calculer l’énergie d’un photon dans l’air, puis dans l’eau (en eV). Que constate-t-on ?`,
            String.raw`Un élève affirme : « dans l’eau, $\lambda$ est plus petite donc l’énergie du photon est plus grande, la lumière devient bleue ». Réfuter cette affirmation.`,
          ],
        },
      ],
      hints: [String.raw`Que reste-t-il constant quand la lumière change de milieu ?`],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$\nu = \dfrac{c}{\lambda_0} = \dfrac{3{,}00\times10^{8}}{600\times10^{-9}} = 5{,}00\times10^{14}\ \text{Hz}$.`,
            String.raw`$v = \dfrac{c}{n} = \dfrac{3{,}00\times10^{8}}{1{,}33} = 2{,}26\times10^{8}\ \text{m·s}^{-1}$ ; $\lambda = \dfrac{v}{\nu} = \dfrac{2{,}26\times10^{8}}{5{,}00\times10^{14}} = 4{,}51\times10^{-7}\ \text{m} = 451\ \text{nm}$ (= $600/1{,}33$).`,
            String.raw`Dans l’air : $E = h\nu = 6{,}63\times10^{-34}\times5{,}00\times10^{14} = 3{,}32\times10^{-19}\ \text{J} = 2{,}07\ \text{eV}$. Dans l’eau, la fréquence est la même : $E = h\nu = 3{,}32\times10^{-19}\ \text{J}$, soit $2{,}07\ \text{eV}$ aussi. **L’énergie du photon ne change pas** lors du changement de milieu.`,
            String.raw`L’énergie du photon et la couleur sont déterminées par la **fréquence** $\nu$ (qui est imposée par la source et conservée), pas par la longueur d’onde dans le milieu. La formule $E = hc/\lambda$ n’est valable qu’avec la longueur d’onde **dans le vide** $\lambda_0$. La lumière reste orange dans l’eau.`,
          ],
        },
      ],
    },
    {
      id: 'lumiere-photon-ex10',
      title: 'Une LED et son gap',
      difficulty: 3,
      duration: 20,
      tags: ['LED', 'photon', 'énergie'],
      statement: [
        {
          type: 'p',
          text: String.raw`Une LED émet un photon à chaque fois qu’un électron passe d’un niveau d’énergie à un autre, plus bas de $E_g$. On étudie deux LED. Données : $h = 6{,}63\times10^{-34}\ \text{J·s}$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ ; $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`Pour la LED A, $E_g = 2{,}50\ \text{eV}$. Calculer la longueur d’onde de la lumière émise et sa couleur.`,
            String.raw`La LED B émet une lumière rouge à $\lambda = 650\ \text{nm}$. Calculer l’écart d’énergie $E_g$ correspondant, en eV.`,
            String.raw`Pour fabriquer une LED émettant un rayonnement infrarouge de télécommande ($\lambda = 940\ \text{nm}$), faut-il un gap plus grand ou plus petit que celui de la LED B ? Le calculer.`,
            String.raw`Une LED blanche est constituée d’une LED bleue et d’un luminophore jaune. Expliquer pourquoi on ne peut pas faire une LED blanche avec un seul gap.`,
          ],
        },
      ],
      solution: [
        {
          type: 'list',
          ordered: true,
          items: [
            String.raw`$E_g = 2{,}50\times1{,}60\times10^{-19} = 4{,}00\times10^{-19}\ \text{J}$, $\lambda = \dfrac{hc}{E_g} = \dfrac{1{,}989\times10^{-25}}{4{,}00\times10^{-19}} = 4{,}97\times10^{-7}\ \text{m} = 497\ \text{nm}$ : bleu-vert (cyan).`,
            String.raw`$E = \dfrac{hc}{\lambda} = \dfrac{1{,}989\times10^{-25}}{650\times10^{-9}} = 3{,}06\times10^{-19}\ \text{J} = \dfrac{3{,}06\times10^{-19}}{1{,}60\times10^{-19}} = 1{,}91\ \text{eV}$.`,
            String.raw`Un rayonnement de plus grande longueur d’onde correspond à des photons moins énergétiques : le gap doit être **plus petit**. $E = \dfrac{1{,}989\times10^{-25}}{940\times10^{-9}} = 2{,}12\times10^{-19}\ \text{J} = 1{,}32\ \text{eV}$ (< 1,91 eV).`,
            String.raw`Un gap unique correspond à une seule énergie de photon, donc à une radiation quasi monochromatique, donc à une couleur pure. Le blanc nécessite plusieurs radiations (synthèse additive) : on mélange le bleu de la LED et le jaune (R + V) du luminophore qui absorbe une partie du bleu et réémet des photons moins énergétiques.`,
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ REPRESENTATIONS
  representations: [
    { type: 'h2', text: 'Visualiser et s’entraîner' },
    { type: 'widget', id: 'wave-simulator', title: 'Onde sinusoïdale : λ, T, c' },
    { type: 'widget', id: 'energy-levels', props: { atom: 'hydrogene' }, title: 'Hydrogène : transitions et spectre' },
    { type: 'widget', id: 'energy-levels', props: { atom: 'sodium' }, title: 'Sodium : le doublet jaune' },
    { type: 'svg', svg: svgSpectreEM, caption: 'Le spectre électromagnétique.' },
    {
      type: 'qcm',
      questions: [
        {
          question: 'La fréquence d’une radiation de longueur d’onde 600 nm dans le vide est :',
          choices: ['5,0×10¹⁴ Hz', '2,0×10⁻¹⁵ Hz', '1,8×10¹⁷ Hz', '5,0×10⁷ Hz'],
          answer: 0,
          explanation: 'ν = c/λ = 3,00×10⁸ / 600×10⁻⁹ = 5,0×10¹⁴ Hz.',
        },
        {
          question: 'Quand la lumière passe de l’air à l’eau, quelle grandeur ne change pas ?',
          choices: ['La longueur d’onde', 'La célérité', 'La fréquence', 'Aucune'],
          answer: 2,
          explanation: 'La fréquence est imposée par la source ; λ et v diminuent.',
        },
        {
          question: 'Quel photon est le plus énergétique ?',
          choices: ['Rouge (700 nm)', 'Vert (550 nm)', 'Violet (400 nm)', 'Infrarouge (1 µm)'],
          answer: 2,
          explanation: 'E = hc/λ augmente quand λ diminue.',
        },
        {
          question: '1 eV vaut :',
          choices: ['1,60×10⁻¹⁹ J', '6,63×10⁻³⁴ J', '3,00×10⁸ J', '1,60×10¹⁹ J'],
          answer: 0,
          explanation: 'Définition de l’électronvolt.',
        },
        {
          question: 'Un atome émet un photon lorsque :',
          choices: [
            'son électron passe à un niveau d’énergie plus élevé',
            'son électron passe à un niveau d’énergie plus bas',
            'il se déplace',
            'il est ionisé uniquement',
          ],
          answer: 1,
          explanation: 'L’énergie perdue est emportée par le photon : hν = E_haut − E_bas.',
        },
        {
          question: 'Un spectre de raies d’absorption se présente comme :',
          choices: ['des raies colorées sur fond noir', 'des raies noires sur fond coloré continu', 'un fond continu sans raies', 'une seule raie'],
          answer: 1,
          explanation: 'Les radiations absorbées par le gaz froid manquent dans la lumière blanche.',
        },
        {
          question: 'D’après la loi de Wien, si la température d’un corps augmente, λ_max :',
          choices: ['augmente', 'diminue', 'ne change pas', 'devient nulle'],
          answer: 1,
          explanation: 'λ_max·T = constante : λ_max est inversement proportionnelle à T.',
        },
        {
          question: 'Quelle est l’énergie d’un photon de 500 nm ?',
          choices: ['2,49 eV', '0,25 eV', '25 eV', '3,98 eV'],
          answer: 0,
          explanation: 'E = hc/λ = 3,98×10⁻¹⁹ J = 2,49 eV.',
        },
        {
          question: 'Dans l’émission stimulée, le photon émis a :',
          choices: [
            'une longueur d’onde différente de celle du photon incident',
            'les mêmes caractéristiques que le photon incident',
            'une énergie nulle',
            'une direction aléatoire',
          ],
          answer: 1,
          explanation: 'Même longueur d’onde, même direction, même phase : principe du laser.',
        },
      ],
    },
    {
      type: 'matching',
      title: 'Associer domaine et longueur d’onde',
      pairs: [
        { left: 'Rayons X', right: '≈ 0,1 nm' },
        { left: 'Ultraviolet', right: '≈ 200 nm' },
        { left: 'Visible', right: '≈ 550 nm' },
        { left: 'Infrarouge', right: '≈ 10 µm' },
        { left: 'Micro-ondes', right: '≈ 12 cm' },
        { left: 'Radio FM', right: '≈ 3 m' },
      ],
    },
    {
      type: 'ordering',
      title: 'Classer par énergie de photon croissante',
      items: ['Onde radio', 'Micro-ondes', 'Infrarouge', 'Visible', 'Ultraviolet', 'Rayons X', 'Rayons γ'],
    },
    {
      type: 'truefalse',
      title: 'Vrai ou faux ?',
      statements: [
        { text: 'Le photon a une masse très faible mais non nulle.', answer: false, explanation: 'Le photon n’a pas de masse ni de charge.' },
        { text: 'L’énergie d’un atome ne peut prendre que certaines valeurs.', answer: true, explanation: 'L’énergie est quantifiée.' },
        { text: 'Un atome peut absorber n’importe quel photon dont l’énergie est supérieure à un écart de niveaux.', answer: false, explanation: 'Pour une excitation entre niveaux liés, il faut l’égalité exacte hν = ΔE.' },
        { text: 'Les raies d’émission et d’absorption d’un même élément ont les mêmes longueurs d’onde.', answer: true, explanation: 'Elles correspondent aux mêmes écarts de niveaux.' },
        { text: 'Le Soleil émet un spectre de raies.', answer: false, explanation: 'Il émet un spectre continu (thermique) parcouru de raies d’absorption.' },
        { text: 'Les photons UV sont plus énergétiques que les photons visibles.', answer: true, explanation: 'Leur longueur d’onde est plus petite.' },
      ],
    },
    {
      type: 'cloze',
      title: 'Texte à trous',
      text: String.raw`La relation entre longueur d’onde et fréquence est c = {{λν|λ×ν|λ·ν}}. L’énergie d’un photon vaut E = {{hν|h×ν|hc/λ}}. L’énergie d’un atome est {{quantifiée}} : elle ne prend que des valeurs {{discrètes}}. Le niveau d’énergie le plus bas est l’état {{fondamental}}. Un spectre de {{raies}} est l’empreinte d’un élément chimique.`,
    },
    {
      type: 'flashcards',
      cards: [
        { front: 'Relation entre λ, ν et c', back: String.raw`$c = \lambda\nu$ ; $c = 3{,}00\times10^{8}\ \text{m·s}^{-1}$ dans le vide.` },
        { front: 'Énergie d’un photon', back: String.raw`$E = h\nu = \dfrac{hc}{\lambda}$, avec $h = 6{,}63\times10^{-34}\ \text{J·s}$.` },
        { front: 'Valeur de l’électronvolt', back: String.raw`$1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$.` },
        { front: 'Domaine visible', back: String.raw`$400\ \text{nm} \leq \lambda \leq 800\ \text{nm}$ dans le vide.` },
        { front: 'Changement de milieu : que devient la lumière ?', back: String.raw`$\nu$ inchangée ; $v = c/n$ ; $\lambda = \lambda_0/n$.` },
        { front: 'Photon émis lors d’une transition', back: String.raw`$h\nu = E_{\text{haut}} - E_{\text{bas}}$, soit $\lambda = hc/|\Delta E|$.` },
        { front: 'Condition d’absorption d’un photon', back: String.raw`Il faut $h\nu = E_{\text{haut}} - E_{\text{bas}}$ exactement (coïncidence).` },
        { front: 'Loi de Wien', back: String.raw`$\lambda_{\max}\cdot T = 2{,}898\times10^{-3}\ \text{m·K}$ ($T$ en kelvins).` },
        { front: 'Spectre continu ou de raies ?', back: 'Corps chaud : continu. Gaz peu dense excité : raies d’émission. Gaz froid : raies d’absorption.' },
        { front: 'Niveaux de l’hydrogène', back: String.raw`$E_n = -13{,}6/n^2$ (eV) ; ionisation : $13{,}6\ \text{eV}$.` },
        { front: 'Principe du laser', back: 'Émission stimulée amplifiée dans une cavité : lumière monochromatique, directive, cohérente.' },
        { front: 'Formule pratique', back: String.raw`$E\,(\text{eV}) \approx 1\,243 / \lambda\,(\text{nm})$.` },
      ],
    },
    {
      type: 'reveal',
      title: 'Comment a-t-on découvert l’hélium ?',
      content: [
        {
          type: 'p',
          text: String.raw`Pendant l’éclipse totale de Soleil du 18 août 1868, l’astronome Jules Janssen observe dans le spectre de la chromosphère solaire une raie jaune ($587{,}6\ \text{nm}$) qui ne correspond à aucun élément connu (elle est proche de, mais différente du doublet du sodium à $589\ \text{nm}$). Norman Lockyer et Édouard Frankland concluent à un nouvel élément qu’ils nomment hélium. Il ne sera isolé sur Terre qu’en 1895, par William Ramsay.`,
        },
      ],
    },
  ],
}

export default chapter
