/**
 * Copy for the terms page. Separate from the template so it can be reviewed
 * and edited without touching the component.
 */
export interface TermsSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export const TERMS_UPDATED_AT = '12 septembrie 2026';

export const TERMS_INTRO =
  'Acest site prezintă produsele patiseriei Pati Bona din Craiova. Prin folosirea lui ești de acord cu termenii de mai jos. Dacă nu ești de acord, te rugăm să nu îl folosești.';

export const TERMS_SECTIONS: readonly TermsSection[] = [
  {
    id: 'site',
    title: 'Ce face acest site',
    paragraphs: [
      'Site-ul are rol de prezentare. Aici vezi produsele noastre, programul și adresa magazinului.',
      'Nu poți plasa comenzi și nu poți plăti online. Nu vindem produse prin acest site și nu colectăm date prin formulare, pentru că site-ul nu are formulare.',
    ],
  },
  {
    id: 'comenzi',
    title: 'Comenzi, prețuri și anulări',
    paragraphs: [
      'Comenzile se fac telefonic sau direct în magazin. Prețul, aspectul și termenul de livrare se stabilesc împreună cu tine, la momentul comenzii.',
      'Fotografiile de pe site arată produse realizate de noi în trecut. Fiind lucrate manual, produsele pot diferi de imagini prin nuanță, decor sau dimensiune.',
    ],
    bullets: [
      'Torturile și candy bar-ul se comandă cu cel puțin 3 zile înainte.',
      'Dacă vrei să anulezi sau să modifici o comandă, sună-ne cât mai repede.',
      'Pentru comenzile personalizate deja începute, anularea în ultimul moment poate implica plata materialelor folosite.',
    ],
  },
  {
    id: 'alergeni',
    title: 'Ingrediente și alergeni',
    paragraphs: [
      'Produsele noastre sunt preparate în aceeași bucătărie și pot conține sau pot intra în contact cu gluten, ouă, lapte, soia, fructe cu coajă lemnoasă și semințe de susan.',
      'Dacă tu sau invitații tăi aveți alergii ori intoleranțe, spune-ne la momentul comenzii și îți dăm lista completă de ingrediente pentru produsul respectiv.',
    ],
  },
  {
    id: 'continut',
    title: 'Fotografii și texte',
    paragraphs: [
      'Fotografiile produselor, textele și elementele grafice de pe acest site ne aparțin. Poți să le distribui menționând sursa, dar nu le poți folosi în scop comercial fără acordul nostru scris.',
    ],
  },
  {
    id: 'date',
    title: 'Date cu caracter personal',
    paragraphs: [
      'Site-ul nu îți cere și nu îți stochează date personale. Nu există cont, formular sau newsletter.',
      'Când ne suni pentru o comandă, folosim numele și numărul tău de telefon doar ca să pregătim și să îți predăm comanda. Nu le transmitem nimănui altcuiva.',
      'Ai dreptul să ceri accesul la datele tale, corectarea sau ștergerea lor. Ne poți contacta telefonic sau la magazin.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie-uri și servicii externe',
    paragraphs: [
      'Nu folosim cookie-uri de publicitate, nu urmărim vizitatorii și nu salvăm nimic în browserul tău.',
      'Două servicii externe sunt încărcate în pagină: Google Fonts, pentru fonturi, și harta Google Maps din secțiunea de contact. Acestea pot seta propriile cookie-uri, conform politicilor Google.',
    ],
  },
  {
    id: 'reclamatii',
    title: 'Reclamații',
    paragraphs: [
      'Dacă ceva nu a fost în regulă, spune-ne direct: cel mai repede rezolvăm între noi.',
      'Te poți adresa și Autorității Naționale pentru Protecția Consumatorilor, inclusiv prin platforma de soluționare alternativă a litigiilor, sau platformei europene de soluționare online a litigiilor.',
    ],
  },
  {
    id: 'modificari',
    title: 'Modificări',
    paragraphs: [
      'Putem actualiza acești termeni atunci când se schimbă ceva în activitatea noastră. Versiunea publicată aici este cea în vigoare, iar data ultimei actualizări este trecută la începutul paginii.',
    ],
  },
];

export const TERMS_LINKS = [
  { label: 'ANPC · Soluționarea alternativă a litigiilor', url: 'https://anpc.ro/ce-este-sal/' },
  { label: 'Platforma europeană SOL', url: 'https://ec.europa.eu/consumers/odr' },
] as const;
