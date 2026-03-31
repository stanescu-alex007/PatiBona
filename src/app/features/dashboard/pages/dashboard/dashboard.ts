import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  galleryPreview = [
    {
      image: '/images/candy-bar/candy-bar-1.jpeg',
      title: 'Mini eclere',
      size: 'tall',
    },
    {
      image: '/images/candy-bar/candy-bar-2.jpeg',
      // title: 'Tartă cu fructe',
      title: 'Tartă cu fructe',
      size: 'medium',
    },
    {
      image: '/images/candy-bar/candy-bar-3.jpeg',
      // title: 'Candy bar pastel',
      title: 'Candy bar pastel',
      size: 'short',
    },
    {
      image: '/images/candy-bar/candy-bar-4.jpeg',
      // title: 'Amandine',
      title: 'Amandine',
      size: 'tall',
    },
    {
      image: '/images/candy-bar/candy-bar-5.jpeg',
      // title: 'Prăjituri de casă',
      title: 'Prăjituri de casă',
      size: 'medium',
    },
    {
      image: '/images/candy-bar/candy-bar-6.jpeg',
      // title: 'Macarons',
      title: 'Macarons',
      size: 'short',
    },
  ];

  quotes = [
    'Peste 30 de ani de experiență în gusturi care aduc aminte de copilărie.',
    'Folosim ingrediente proaspete, fără amelioratori, doar rețete curate și naturale.',
    'Fiecare prăjitură este pregătită cu răbdare, grijă și multă dragoste.',
    'La noi, desertul nu este doar frumos — este făcut ca acasă, cu suflet.',
  ];

  cakes = [
    {
      image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-12-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-5-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-6-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-7-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-11-removebg-preview.png',
      size: 'large'
    },
    {
      image: '/images/birthday-cake/birthday-cake-13-removebg-preview.png',
      size: 'large'
    },

  ];

// loop infinit
  cakesLoop = [...this.cakes, ...this.cakes, ...this.cakes, ...this.cakes];

}
