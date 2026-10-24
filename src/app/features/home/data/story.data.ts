import { HeroPhoto, ProductAttribute } from '../models/gallery-item';

/** Copy for the story sections. Kept out of templates so it can be edited in one place. */
export const STORY = {
  hero: {
    eyebrow: 'Patiserie artizanală · Craiova',
    lead: 'Cozonaci împletiți cu mâna, torturi făcute pe comandă și prăjituri ca la bunica acasă. Toate coapte în cuptorul nostru, în fiecare dimineață.',
    marquee: ['Cozonaci', 'Torturi personalizate', 'Candy bar', 'Prăjituri de casă', 'Plăcinte', 'Brânzoaice'],
    /** Order matters: hero.scss places them by position, corners first. */
    photos: [
      { src: '/images/hero/hero-1.webp', depth: 180 },
      { src: '/images/hero/hero-2.webp', depth: 120 },
      { src: '/images/hero/hero-3.webp', depth: 150 },
      { src: '/images/hero/hero-4.webp', depth: 220 },
      { src: '/images/hero/hero-5.webp', depth: 80 },
      { src: '/images/hero/hero-6.webp', depth: 100 },
    ] satisfies HeroPhoto[],
  },
  cozonac: {
    title: 'Cozonacul bunicii',
    lead: 'Rețeta a trecut din mână în mână, nu din caiet în caiet. Aluatul e frământat manual, lăsat să crească lent și copt cu răbdare, exact cum se făcea în casă. Fără premixuri, fără scurtături.',
    attributes: [
      { icon: 'leaf', text: 'Ingrediente 100% naturale' },
      { icon: 'hand', text: 'Frământat și împletit manual' },
      { icon: 'hourglass', text: 'Crescut lent, copt cu răbdare' },
      { icon: 'gift', text: 'Disponibil la comandă, pentru sărbători sau cadou' },
    ] satisfies ProductAttribute[],
  },
  torturi: {
    eyebrow: 'Torturi personalizate',
    title: 'Torturi pentru zilele',
    titleAccent: 'care contează',
    galleryLabel: 'Din atelierul nostru',
    lead: 'De la torturi clasice cu blat de vanilie până la creații personalizate cu numele celui sărbătorit. Fiecare tort e gândit, copt și decorat pe comandă, pentru exact acea zi.',
    attributes: [
      { icon: 'cake', text: 'Aniversări, botezuri, nunți' },
      { icon: 'sparkles', text: 'Design personalizat după dorința ta' },
      { icon: 'heart', text: 'Blat și creme făcute în casă' },
      { icon: 'calendar', text: 'Comandă cu minim 3 zile înainte' },
    ] satisfies ProductAttribute[],
  },
  candyBar: {
    title: 'O masă întreagă de dulciuri',
    lead: 'Macarons, tarte cu fructe, pavlove, cannoli, prăjituri cu ciocolată: aranjăm masa de dulciuri pentru nunți, botezuri și petreceri, ca oaspeții să aibă ce povesti.',
    // Split so the question always sits on two lines, whatever the width.
    hint: 'Derulează ca să vezi pozele',
    outro: ['Vrei un candy bar', 'la evenimentul tău?'],
    detailsTitle: 'Candy bar',
    detailsLead: 'Fiecare prăjitură spune o poveste',
  },
  vitrina: {
    title: 'Vitrina noastră',
    lead: 'Ce găsești când intri în magazin: fursecuri cu nucă, prăjituri cu cremă, amandine, savarine și ce a mai ieșit din cuptor de dimineață.',
  },
  visit: {
    title: 'Vino să ne cunoști',
    lead: 'Pentru torturi, candy bar și comenzi mari, sună-ne cu cel puțin trei zile înainte. Pentru restul, ușa e deschisă în fiecare zi.',
  },
} as const;
