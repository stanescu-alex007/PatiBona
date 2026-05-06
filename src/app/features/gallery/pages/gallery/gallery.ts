import { Component, computed, signal } from '@angular/core';

interface GalleryItem {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {

  readonly cozonacImages: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Cozonac cu nucă' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Cozonac cu rahat' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Cozonac împletit' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Cozonac feliat' },
  ];

  private readonly torturiAll: GalleryItem[] = [
    { image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png',  alt: 'Tort aniversar 1'  },
    { image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png',  alt: 'Tort aniversar 2'  },
    { image: '/images/birthday-cake/birthday-cake-3-removebg-preview.png',  alt: 'Tort aniversar 3'  },
    { image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png',  alt: 'Tort aniversar 4'  },
    { image: '/images/birthday-cake/birthday-cake-5-removebg-preview.png',  alt: 'Tort aniversar 5'  },
    { image: '/images/birthday-cake/birthday-cake-6-removebg-preview.png',  alt: 'Tort aniversar 6'  },
    { image: '/images/birthday-cake/birthday-cake-7-removebg-preview.png',  alt: 'Tort aniversar 7'  },
    { image: '/images/birthday-cake/birthday-cake-8-removebg-preview.png',  alt: 'Tort aniversar 8'  },
    { image: '/images/birthday-cake/birthday-cake-9-removebg-preview.png',  alt: 'Tort aniversar 9'  },
    { image: '/images/birthday-cake/birthday-cake-10-removebg-preview.png', alt: 'Tort aniversar 10' },
    { image: '/images/birthday-cake/birthday-cake-11-removebg-preview.png', alt: 'Tort aniversar 11' },
    { image: '/images/birthday-cake/birthday-cake-12-removebg-preview.png', alt: 'Tort aniversar 12' },
    { image: '/images/birthday-cake/birthday-cake-13-removebg-preview.png', alt: 'Tort aniversar 13' },
  ];

  private readonly candyBarAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 1'  },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 2'  },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 3'  },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 4'  },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 5'  },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 6'  },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 8'  },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 9'  },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 10' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 11' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 12' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 13' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 14' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 15' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 16' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 17' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 18' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 19' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 20' },
  ];

  private readonly prajituriAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 1'  },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 2'  },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 3'  },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 4'  },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 5'  },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 6'  },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 7'  },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 8'  },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 9'  },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 10' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 11' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 12' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 13' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 14' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 15' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 16' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 17' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 18' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 19' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 20' },
  ];

  readonly torturiCount   = signal(8);
  readonly candyBarCount  = signal(9);
  readonly prajituriCount = signal(9);

  readonly torturiVisible   = computed(() => this.torturiAll.slice(0, this.torturiCount()));
  readonly candyBarVisible  = computed(() => this.candyBarAll.slice(0, this.candyBarCount()));
  readonly prajituriVisible = computed(() => this.prajituriAll.slice(0, this.prajituriCount()));

  readonly canLoadMoreTorturi   = computed(() => this.torturiCount()   < this.torturiAll.length);
  readonly canLoadMoreCandyBar  = computed(() => this.candyBarCount()  < this.candyBarAll.length);
  readonly canLoadMorePrajituri = computed(() => this.prajituriCount() < this.prajituriAll.length);

  loadMoreTorturi():   void { this.torturiCount.update(n =>   Math.min(n + 8, this.torturiAll.length));   }
  loadMoreCandyBar():  void { this.candyBarCount.update(n =>  Math.min(n + 9, this.candyBarAll.length));  }
  loadMorePrajituri(): void { this.prajituriCount.update(n => Math.min(n + 9, this.prajituriAll.length)); }
}
