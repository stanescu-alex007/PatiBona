import { Component, HostListener, OnInit, WritableSignal, computed, signal } from '@angular/core';

interface GalleryItem {
  image: string;
  alt: string;
  size?: string;
}

export interface ColEntry {
  item: GalleryItem;
  globalIndex: number;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  private pageSize = 10;
  private cakeCols = 5;
  private photoCols = 3;

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
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 1',  size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 2',  size: 'sm'      },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 3',  size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 4',  size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 5',  size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 6',  size: 'lg'      },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 7',  size: 'md'      },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 8',  size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 9',  size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 10', size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 11', size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 12', size: 'sm'      },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 13', size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 14', size: 'lg'      },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 15', size: 'md'      },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 16', size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 17', size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 18', size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 19', size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 20', size: 'sm'      },
  ];

  private readonly prajituriAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 1',  size: 'lg'      },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 2',  size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 3',  size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 4',  size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 5',  size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 6',  size: 'sm'      },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 7',  size: 'md'      },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 8',  size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 9',  size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 10', size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 11', size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 12', size: 'lg'      },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 13', size: 'sm'      },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 14', size: 'xl'      },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 15', size: 'portrait'},
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 16', size: 'wide'    },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 17', size: 'xs'      },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 18', size: 'lg'      },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 19', size: 'md'      },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 20', size: 'xl'      },
  ];

  readonly torturiLoaded   = signal(0);
  readonly candyBarLoaded  = signal(0);
  readonly prajituriLoaded = signal(0);

  readonly torturiCols   = signal<ColEntry[][]>([]);
  readonly candyBarCols  = signal<ColEntry[][]>([]);
  readonly prajituriCols = signal<ColEntry[][]>([]);

  readonly torturiEntering   = signal<Map<number, number>>(new Map());
  readonly candyBarEntering  = signal<Map<number, number>>(new Map());
  readonly prajituriEntering = signal<Map<number, number>>(new Map());

  readonly canLoadMoreTorturi   = computed(() => this.torturiLoaded()   < this.torturiAll.length);
  readonly canLoadMoreCandyBar  = computed(() => this.candyBarLoaded()  < this.candyBarAll.length);
  readonly canLoadMorePrajituri = computed(() => this.prajituriLoaded() < this.prajituriAll.length);

  ngOnInit(): void {
    this.syncLayout();
    this.fillColumns(        this.torturiAll,   this.torturiCols,   this.cakeCols,  this.torturiEntering,   this.torturiLoaded,   0, this.pageSize);
    this.fillColumnsBalanced(this.candyBarAll,  this.candyBarCols,  this.photoCols, this.candyBarEntering,  this.candyBarLoaded,  0, this.pageSize);
    this.fillColumnsBalanced(this.prajituriAll, this.prajituriCols, this.photoCols, this.prajituriEntering, this.prajituriLoaded, 0, this.pageSize);
    this.clearEnteringAfter(this.pageSize);
  }

  @HostListener('window:resize')
  onResize(): void {
    const prevCake  = this.cakeCols;
    const prevPhoto = this.photoCols;
    this.syncLayout();
    if (this.cakeCols !== prevCake || this.photoCols !== prevPhoto) {
      this.torturiCols.set(  this.buildCols(         this.torturiAll,   this.torturiLoaded(),   this.cakeCols));
      this.candyBarCols.set( this.buildColsBalanced( this.candyBarAll,  this.candyBarLoaded(),  this.photoCols));
      this.prajituriCols.set(this.buildColsBalanced( this.prajituriAll, this.prajituriLoaded(), this.photoCols));
    }
  }

  loadMoreTorturi(): void {
    const prev = this.torturiLoaded();
    const next = Math.min(prev + this.pageSize, this.torturiAll.length);
    this.fillColumns(this.torturiAll, this.torturiCols, this.cakeCols, this.torturiEntering, this.torturiLoaded, prev, next);
    this.clearEnteringAfter(next - prev, this.torturiEntering);
  }

  loadMoreCandyBar(): void {
    const prev = this.candyBarLoaded();
    const next = Math.min(prev + this.pageSize, this.candyBarAll.length);
    this.fillColumnsBalanced(this.candyBarAll, this.candyBarCols, this.photoCols, this.candyBarEntering, this.candyBarLoaded, prev, next);
    this.clearEnteringAfter(next - prev, this.candyBarEntering);
  }

  loadMorePrajituri(): void {
    const prev = this.prajituriLoaded();
    const next = Math.min(prev + this.pageSize, this.prajituriAll.length);
    this.fillColumnsBalanced(this.prajituriAll, this.prajituriCols, this.photoCols, this.prajituriEntering, this.prajituriLoaded, prev, next);
    this.clearEnteringAfter(next - prev, this.prajituriEntering);
  }

  photoClass(item: GalleryItem, entering: Map<number, number>, globalIndex: number): string {
    const base = `photo-item size-${item.size}`;
    return entering.has(globalIndex) ? `${base} entering` : base;
  }

  // ── Private helpers ─────────────────────────────────────────

  private syncLayout(): void {
    const w = window.innerWidth;
    this.pageSize = w < 768 ? 5 : 10;
    if      (w >= 1200) { this.cakeCols = 5; this.photoCols = 3; }
    else if (w >= 992)  { this.cakeCols = 4; this.photoCols = 3; }
    else if (w >= 768)  { this.cakeCols = 3; this.photoCols = 2; }
    else if (w >= 480)  { this.cakeCols = 3; this.photoCols = 2; }
    else                { this.cakeCols = 2; this.photoCols = 1; }
  }

  private fillColumns(
    source: GalleryItem[],
    colsSignal: WritableSignal<ColEntry[][]>,
    numCols: number,
    enteringSignal: WritableSignal<Map<number, number>>,
    loadedSignal: WritableSignal<number>,
    from: number,
    to: number,
  ): void {
    const cols = colsSignal().map(col => [...col]);
    while (cols.length < numCols) cols.push([]);
    const entering = new Map(enteringSignal());
    const clampedTo = Math.min(to, source.length);
    for (let i = from; i < clampedTo; i++) {
      cols[i % numCols].push({ item: source[i], globalIndex: i });
      entering.set(i, (i - from) * 50);
    }
    colsSignal.set(cols);
    enteringSignal.set(entering);
    loadedSignal.set(clampedTo);
  }

  private buildCols(source: GalleryItem[], count: number, numCols: number): ColEntry[][] {
    const cols: ColEntry[][] = Array.from({ length: numCols }, () => []);
    for (let i = 0; i < count; i++) cols[i % numCols].push({ item: source[i], globalIndex: i });
    return cols;
  }

  private buildColsBalanced(source: GalleryItem[], count: number, numCols: number): ColEntry[][] {
    const cols: ColEntry[][] = Array.from({ length: numCols }, () => []);
    const heights = new Array<number>(numCols).fill(0);
    for (let i = 0; i < count; i++) {
      const col = heights.indexOf(Math.min(...heights));
      cols[col].push({ item: source[i], globalIndex: i });
      heights[col] += this.estimateHeight(source[i]);
    }
    return cols;
  }

  private fillColumnsBalanced(
    source: GalleryItem[],
    colsSignal: WritableSignal<ColEntry[][]>,
    numCols: number,
    enteringSignal: WritableSignal<Map<number, number>>,
    loadedSignal: WritableSignal<number>,
    from: number,
    to: number,
  ): void {
    const cols = colsSignal().map(col => [...col]);
    while (cols.length < numCols) cols.push([]);
    const entering = new Map(enteringSignal());
    const heights = cols.map(col => col.reduce((h, e) => h + this.estimateHeight(e.item), 0));
    const clampedTo = Math.min(to, source.length);
    for (let i = from; i < clampedTo; i++) {
      const col = heights.indexOf(Math.min(...heights));
      cols[col].push({ item: source[i], globalIndex: i });
      heights[col] += this.estimateHeight(source[i]);
      entering.set(i, (i - from) * 50);
    }
    colsSignal.set(cols);
    enteringSignal.set(entering);
    loadedSignal.set(clampedTo);
  }

  private estimateHeight(item: GalleryItem): number {
    const map: Record<string, number> = {
      xs: 166, sm: 256, wide: 206, md: 316, lg: 386, portrait: 476, xl: 536,
    };
    return (item.size ? (map[item.size] ?? 316) : 250) + 16;
  }

  private clearEnteringAfter(batchSize: number, ...enteringSignals: Array<WritableSignal<Map<number, number>>>): void {
    const delay = batchSize * 50 + 650;
    const targets = enteringSignals.length
      ? enteringSignals
      : [this.torturiEntering, this.candyBarEntering, this.prajituriEntering];
    setTimeout(() => targets.forEach(s => s.set(new Map())), delay);
  }
}
