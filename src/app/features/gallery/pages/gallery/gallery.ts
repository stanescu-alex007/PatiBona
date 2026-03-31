import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {

  torturi = [
    { image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-3-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-5-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-6-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-7-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-8-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-9-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-10-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-11-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-12-removebg-preview.png' },
    { image: '/images/birthday-cake/birthday-cake-13-removebg-preview.png' },
  ];

  candyBar = [
    { image: '/images/candy-bar/candy-bar-1.jpeg' },
    { image: '/images/candy-bar/candy-bar-2.jpeg' },
    { image: '/images/candy-bar/candy-bar-3.jpeg' },
    { image: '/images/candy-bar/candy-bar-4.jpeg' },
    { image: '/images/candy-bar/candy-bar-5.jpeg' },
    { image: '/images/candy-bar/candy-bar-6.jpeg' },
    { image: '/images/candy-bar/candy-bar-7.jpeg' },
  ];

  prajituri = [
    { image: '/images/prajituri/p1.jpeg' },
    { image: '/images/prajituri/p2.jpeg' },
  ];


}
