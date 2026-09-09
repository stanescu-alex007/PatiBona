import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

interface GalleryItem {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  readonly cozonacImages: GalleryItem[] = [
    { image: '/images/cozonaci/cozonac-5.jpeg', alt: 'Cozonac' },
    { image: '/images/cozonaci/cozonac-1.jpeg', alt: 'Cozonac' },
    { image: '/images/cozonaci/cozonac-2.jpeg', alt: 'Cozonac' },
    { image: '/images/cozonaci/cozonac-6.jpeg', alt: 'Cozonac' },
  ];

  readonly tortiCarousel: GalleryItem[] = [
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

  readonly carouselIndex = signal(0);

  readonly prezentariImages: GalleryItem[] = [
    { image: '/images/candy-bar/prezentari/prezentare-1.jpeg', alt: 'Prezentare candy bar 1' },
    { image: '/images/candy-bar/prezentari/prezentare-2.jpeg', alt: 'Prezentare candy bar 2' },
    { image: '/images/candy-bar/prezentari/prezentare-3.jpeg', alt: 'Prezentare candy bar 3' },
    { image: '/images/candy-bar/prezentari/prezentare-4.jpeg', alt: 'Prezentare candy bar 4' },
    { image: '/images/candy-bar/prezentari/prezentare-5.jpeg', alt: 'Prezentare candy bar 5' },
    { image: '/images/candy-bar/prezentari/prezentare-6.jpeg', alt: 'Prezentare candy bar 6' },
    { image: '/images/candy-bar/prezentari/prezentare-7.jpeg', alt: 'Prezentare candy bar 7' },
  ];

  private readonly candyBarAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 2'  },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 3'  },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 4'  },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 5'  },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 6'  },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-8.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-9.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-10.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-11.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-12.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-13.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-14.jpeg', alt: 'Candy bar 7'  },
    // { image: '/images/candy-bar/candy-bar-15.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-16.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-17.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-18.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-19.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-20.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-21.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-22.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-23.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-24.jpeg', alt: 'Candy bar 7'  },
    // { image: '/images/candy-bar/candy-bar-25.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-26.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-27.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-28.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-29.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-30.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-31.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-32.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-33.jpeg', alt: 'Candy bar 7'  },
    { image: '/images/candy-bar/candy-bar-34.jpeg', alt: 'Candy bar 7'  },
  ];

  private readonly prajituriAll: GalleryItem[] = [
    { image: '/images/shop/magazin-1.jpeg', alt: 'Prăjitură 1'  },
    { image: '/images/shop/magazin-2.jpeg', alt: 'Prăjitură 2'  },
    { image: '/images/shop/magazin-3.jpeg', alt: 'Prăjitură 3'  },
    { image: '/images/shop/magazin-4.jpeg', alt: 'Prăjitură 4'  },
    { image: '/images/shop/magazin-5.jpeg', alt: 'Prăjitură 5'  },
    { image: '/images/shop/magazin-6.jpeg', alt: 'Prăjitură 6'  },
    { image: '/images/shop/magazin-7.jpeg', alt: 'Prăjitură 7'  },
    { image: '/images/shop/magazin-8.jpeg', alt: 'Prăjitură 8'  },
    { image: '/images/shop/magazin-9.jpeg', alt: 'Prăjitură 9'  },
    { image: '/images/shop/magazin-10.jpeg', alt: 'Prăjitură 10' },
    { image: '/images/shop/magazin-11.jpeg', alt: 'Prăjitură 11' },
    { image: '/images/shop/magazin-12.jpeg', alt: 'Prăjitură 12' },
    { image: '/images/shop/magazin-13.jpeg', alt: 'Prăjitură 13' },
    { image: '/images/shop/magazin-14.jpeg', alt: 'Prăjitură 14' },
    { image: '/images/shop/magazin-15.jpeg', alt: 'Prăjitură 15' },
    { image: '/images/shop/magazin-16.jpeg', alt: 'Prăjitură 16' },
    { image: '/images/shop/magazin-17.jpeg', alt: 'Prăjitură 17' },
    { image: '/images/shop/magazin-18.jpeg', alt: 'Prăjitură 18' },
    { image: '/images/shop/magazin-19.jpeg', alt: 'Prăjitură 19' },
  ];

  private readonly destroyRef = inject(DestroyRef);
  readonly candyBarGridRef = viewChild<ElementRef<HTMLElement>>('candyBarGrid');

  readonly cols = signal(this.detectInitialCols());

  readonly candyBarRows  = signal(3);
  readonly prajituriRows = signal(3);

  readonly candyBarVisible = computed(() =>
    this.candyBarAll.slice(0, Math.min(this.cols() * this.candyBarRows(), this.candyBarAll.length)),
  );
  readonly prajituriVisible = computed(() =>
    this.prajituriAll.slice(0, Math.min(this.cols() * this.prajituriRows(), this.prajituriAll.length)),
  );

  readonly canLoadMoreCandyBar  = computed(() => this.candyBarVisible().length  < this.candyBarAll.length);
  readonly canLoadMorePrajituri = computed(() => this.prajituriVisible().length < this.prajituriAll.length);

  loadMoreCandyBar():  void { this.candyBarRows.update(r =>  r + 2); }
  loadMorePrajituri(): void { this.prajituriRows.update(r => r + 2); }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `${location.pathname}${location.search}#${id}`);
  }

  constructor() {
    afterNextRender(() => {
      // carousel auto-advance
      const timer = setInterval(() => {
        this.carouselIndex.update(i => (i + 1) % this.tortiCarousel.length);
      }, 3000);
      this.destroyRef.onDestroy(() => clearInterval(timer));

      // candy-bar grid cols detection
      const el = this.candyBarGridRef()?.nativeElement;
      if (el) {
        const update = () => {
          const tpl = getComputedStyle(el).gridTemplateColumns;
          const count = tpl.split(' ').filter(s => s.trim().length > 0).length;
          if (count > 0) this.cols.set(count);
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        this.destroyRef.onDestroy(() => ro.disconnect());
      }
    });
  }

  private detectInitialCols(): number {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w <= 600) return 2;
    if (w <= 991) return 3;
    return 4;
  }
}
