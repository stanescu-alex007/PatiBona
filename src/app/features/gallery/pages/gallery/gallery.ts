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

  readonly torturiImages: GalleryItem[] = [
    { image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png', alt: 'Tort aniversar 1' },
    { image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png', alt: 'Tort aniversar 2' },
    { image: '/images/birthday-cake/birthday-cake-3-removebg-preview.png', alt: 'Tort aniversar 3' },
    { image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png', alt: 'Tort aniversar 4' },
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

  private readonly destroyRef = inject(DestroyRef);
  readonly candyBarGridRef = viewChild<ElementRef<HTMLElement>>('candyBarGrid');

  // Live column count of the photo grid — updated from computed style on resize.
  // Initial guess based on viewport so SSR / first paint matches the CSS breakpoints.
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
      const el = this.candyBarGridRef()?.nativeElement;
      if (!el) return;

      const update = () => {
        const tpl = getComputedStyle(el).gridTemplateColumns;
        const count = tpl.split(' ').filter(s => s.trim().length > 0).length;
        if (count > 0) this.cols.set(count);
      };

      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      this.destroyRef.onDestroy(() => ro.disconnect());
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
