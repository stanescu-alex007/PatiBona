import { Component } from '@angular/core';

interface Milestone {
  year: string;
  icon: string;
  title: string;
  description: string;
}

interface Value {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-despre',
  standalone: false,
  templateUrl: './despre.html',
  styleUrl: './despre.scss',
})
export class Despre {

  milestones: Milestone[] = [
    {
      year: '—',
      icon: '🥐',
      title: 'Plăcinte, cozonaci, covrigi și brânzoaice',
      description: 'Bunica și bunicul au început cu produse simple din aluat bun: plăcinte, cozonaci, covrigi și brânzoaice. Gusturi cinstite, făcute cu mâna, care aduceau oamenii din tot cartierul.',
    },
    {
      year: '—',
      icon: '🍕',
      title: 'Aventura cu pizza',
      description: 'La un moment dat au deschis și un restaurant cu pizza — o perioadă plină de energie. Dar inima lor a rămas mereu la patiserie și aluaturi dulci.',
    },
    {
      year: '—',
      icon: '🎂',
      title: 'Înapoi la patiserie',
      description: 'După ce au închis restaurantul, s-au întors la ce știau cel mai bine: prăjituri, torturi personalizate și toată patiseria cu care au crescut generații de clienți fideli.',
    },
    {
      year: 'Recent',
      icon: '🍬',
      title: 'Candy bar pentru fiecare ocazie',
      description: 'De câțiva ani am adăugat și serviciul de candy bar — zeci de dulciuri artizanale care colorează nunți, botezuri și petreceri.',
    },
  ];

  values: Value[] = [
    {
      icon: '🌿',
      title: 'Natural',
      text: 'Ingrediente 100% naturale, fără premixuri, fără amelioratori. Exact cum se gătea în bucătăria bunicii.',
    },
    {
      icon: '❤️',
      title: 'Cu dragoste',
      text: 'Fiecare prăjitură este pregătită cu grijă și răbdare, ca pentru un musafir drag.',
    },
    {
      icon: '🏡',
      title: 'Tradiție',
      text: 'Rețetele noastre trec din generație în generație, păstrând gustul autentic al copilăriei.',
    },
    {
      icon: '✋',
      title: 'Artizanal',
      text: 'Totul este făcut manual, cu atenție la fiecare detaliu — niciodată în serie.',
    },
  ];
}
