import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly galleryPreview = [
    { image: '/images/candy-bar/candy-bar-1.jpeg', title: 'Mini eclere',       size: 'tall'   },
    { image: '/images/candy-bar/candy-bar-2.jpeg', title: 'Tartă cu fructe',   size: 'medium' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', title: 'Candy bar pastel',  size: 'short'  },
    { image: '/images/candy-bar/candy-bar-4.jpeg', title: 'Amandine',          size: 'tall'   },
    { image: '/images/candy-bar/candy-bar-5.jpeg', title: 'Prăjituri de casă', size: 'medium' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', title: 'Macarons',          size: 'short'  },
  ];

  readonly quotes = [
    'Peste 30 de ani de experiență în gusturi care aduc aminte de copilărie.',
    'Folosim ingrediente proaspete, fără amelioratori, doar rețete curate și naturale.',
    'Fiecare prăjitură este pregătită cu răbdare, grijă și multă dragoste.',
    'La noi, desertul nu este doar frumos — este făcut ca acasă, cu suflet.',
  ];

  readonly cakes = [
    { image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-12-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-5-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-6-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-7-removebg-preview.png'  },
    { image: '/images/birthday-cake/birthday-cake-11-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-13-removebg-preview.png' },
  ];

  readonly cakesLoop = [...this.cakes, ...this.cakes, ...this.cakes, ...this.cakes];
}
