import { Component, HostListener, OnInit } from '@angular/core';

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
  standalone: false,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  pageSize  = 10;
  cakeCols  = 5;
  photoCols = 3;

  private readonly torturiAll: GalleryItem[] = [
    { image: '/images/birthday-cake/birthday-cake-1-removebg-preview.png',  alt: 'Tort aniversar 1' },
    { image: '/images/birthday-cake/birthday-cake-2-removebg-preview.png',  alt: 'Tort aniversar 2' },
    { image: '/images/birthday-cake/birthday-cake-3-removebg-preview.png',  alt: 'Tort aniversar 3' },
    { image: '/images/birthday-cake/birthday-cake-4-removebg-preview.png',  alt: 'Tort aniversar 4' },
    { image: '/images/birthday-cake/birthday-cake-5-removebg-preview.png',  alt: 'Tort aniversar 5' },
    { image: '/images/birthday-cake/birthday-cake-6-removebg-preview.png',  alt: 'Tort aniversar 6' },
    { image: '/images/birthday-cake/birthday-cake-7-removebg-preview.png',  alt: 'Tort aniversar 7' },
    { image: '/images/birthday-cake/birthday-cake-8-removebg-preview.png',  alt: 'Tort aniversar 8' },
    { image: '/images/birthday-cake/birthday-cake-9-removebg-preview.png',  alt: 'Tort aniversar 9' },
    { image: '/images/birthday-cake/birthday-cake-10-removebg-preview.png', alt: 'Tort aniversar 10' },
    { image: '/images/birthday-cake/birthday-cake-11-removebg-preview.png', alt: 'Tort aniversar 11' },
    { image: '/images/birthday-cake/birthday-cake-12-removebg-preview.png', alt: 'Tort aniversar 12' },
    { image: '/images/birthday-cake/birthday-cake-13-removebg-preview.png', alt: 'Tort aniversar 13' },
  ];

  private readonly candyBarAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 1',  size: 'xl' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 2',  size: 'sm' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 3',  size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 4',  size: 'xs' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 5',  size: 'wide' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 6',  size: 'lg' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 7',  size: 'md' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 8',  size: 'xl' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 9',  size: 'xs' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 10', size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 11', size: 'wide' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 12', size: 'sm' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 13', size: 'xl' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Candy bar 14', size: 'lg' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Candy bar 15', size: 'md' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Candy bar 16', size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Candy bar 17', size: 'xs' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Candy bar 18', size: 'wide' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Candy bar 19', size: 'xl' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Candy bar 20', size: 'sm' },
  ];

  private readonly prajituriAll: GalleryItem[] = [
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 1',  size: 'lg' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 2',  size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 3',  size: 'xs' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 4',  size: 'xl' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 5',  size: 'wide' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 6',  size: 'sm' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 7',  size: 'md' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 8',  size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 9',  size: 'xs' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 10', size: 'xl' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 11', size: 'wide' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 12', size: 'lg' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 13', size: 'sm' },
    { image: '/images/candy-bar/candy-bar-4.jpeg', alt: 'Prăjitură 14', size: 'xl' },
    { image: '/images/candy-bar/candy-bar-7.jpeg', alt: 'Prăjitură 15', size: 'portrait' },
    { image: '/images/candy-bar/candy-bar-1.jpeg', alt: 'Prăjitură 16', size: 'wide' },
    { image: '/images/candy-bar/candy-bar-5.jpeg', alt: 'Prăjitură 17', size: 'xs' },
    { image: '/images/candy-bar/candy-bar-3.jpeg', alt: 'Prăjitură 18', size: 'lg' },
    { image: '/images/candy-bar/candy-bar-2.jpeg', alt: 'Prăjitură 19', size: 'md' },
    { image: '/images/candy-bar/candy-bar-6.jpeg', alt: 'Prăjitură 20', size: 'xl' },
  ];

  // How many items are shown per section
  torturiLoaded   = 0;
  candyBarLoaded  = 0;
  prajituriLoaded = 0;

  // Explicit column arrays — items only ever get appended, never moved
  torturiCols:   ColEntry[][] = [];
  candyBarCols:  ColEntry[][] = [];
  prajituriCols: ColEntry[][] = [];

  // Maps globalIndex → stagger delay (ms); present only while entering animation plays
  torturiEntering   = new Map<number, number>();
  candyBarEntering  = new Map<number, number>();
  prajituriEntering = new Map<number, number>();

  get canLoadMoreTorturi()   { return this.torturiLoaded   < this.torturiAll.length; }
  get canLoadMoreCandyBar()  { return this.candyBarLoaded  < this.candyBarAll.length; }
  get canLoadMorePrajituri() { return this.prajituriLoaded < this.prajituriAll.length; }

  ngOnInit(): void {
    this.syncLayout();
    this.fillColumns(         this.torturiAll,   this.torturiCols,   this.cakeCols,   this.torturiEntering,   0, this.pageSize, (n) => (this.torturiLoaded   = n));
    this.fillColumnsBalanced( this.candyBarAll,  this.candyBarCols,  this.photoCols,  this.candyBarEntering,  0, this.pageSize, (n) => (this.candyBarLoaded  = n));
    this.fillColumnsBalanced( this.prajituriAll, this.prajituriCols, this.photoCols,  this.prajituriEntering, 0, this.pageSize, (n) => (this.prajituriLoaded = n));
    this.clearEnteringAfter(this.pageSize);
  }

  @HostListener('window:resize')
  onResize(): void {
    const prevCake  = this.cakeCols;
    const prevPhoto = this.photoCols;
    this.syncLayout();
    if (this.cakeCols !== prevCake || this.photoCols !== prevPhoto) {
      this.torturiCols   = this.buildCols(         this.torturiAll,   this.torturiLoaded,   this.cakeCols);
      this.candyBarCols  = this.buildColsBalanced( this.candyBarAll,  this.candyBarLoaded,  this.photoCols);
      this.prajituriCols = this.buildColsBalanced( this.prajituriAll, this.prajituriLoaded, this.photoCols);
    }
  }

  loadMoreTorturi(): void {
    const prev = this.torturiLoaded;
    const next = Math.min(prev + this.pageSize, this.torturiAll.length);
    this.fillColumns(this.torturiAll, this.torturiCols, this.cakeCols, this.torturiEntering, prev, next, (n) => (this.torturiLoaded = n));
    this.clearEnteringAfter(next - prev, this.torturiEntering);
  }

  loadMoreCandyBar(): void {
    const prev = this.candyBarLoaded;
    const next = Math.min(prev + this.pageSize, this.candyBarAll.length);
    this.fillColumnsBalanced(this.candyBarAll, this.candyBarCols, this.photoCols, this.candyBarEntering, prev, next, (n) => (this.candyBarLoaded = n));
    this.clearEnteringAfter(next - prev, this.candyBarEntering);
  }

  loadMorePrajituri(): void {
    const prev = this.prajituriLoaded;
    const next = Math.min(prev + this.pageSize, this.prajituriAll.length);
    this.fillColumnsBalanced(this.prajituriAll, this.prajituriCols, this.photoCols, this.prajituriEntering, prev, next, (n) => (this.prajituriLoaded = n));
    this.clearEnteringAfter(next - prev, this.prajituriEntering);
  }

  photoClass(item: GalleryItem, entering: Map<number, number>, globalIndex: number): string {
    const base = `photo-item size-${item.size}`;
    return entering.has(globalIndex) ? `${base} entering` : base;
  }

  trackByColIndex(index: number): number { return index; }
  trackByGlobalIndex(_: number, entry: ColEntry): number { return entry.globalIndex; }

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

  /** Append items [from, to) to the correct column, register entering delays */
  private fillColumns(
    source: GalleryItem[],
    cols: ColEntry[][],
    numCols: number,
    entering: Map<number, number>,
    from: number,
    to: number,
    setLoaded: (n: number) => void,
  ): void {
    while (cols.length < numCols) cols.push([]);
    const clampedTo = Math.min(to, source.length);
    for (let i = from; i < clampedTo; i++) {
      cols[i % numCols].push({ item: source[i], globalIndex: i });
      entering.set(i, (i - from) * 50);
    }
    setLoaded(clampedTo);
  }

  /** Rebuild all columns (used on resize breakpoint change) */
  private buildCols(source: GalleryItem[], count: number, numCols: number): ColEntry[][] {
    const cols: ColEntry[][] = Array.from({ length: numCols }, () => []);
    for (let i = 0; i < count; i++) cols[i % numCols].push({ item: source[i], globalIndex: i });
    return cols;
  }

  /** Rebuild columns with height-balanced placement (used on resize for photo sections) */
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

  /**
   * Append items [from, to) into the shortest column each time so all
   * columns stay roughly the same height (greedy bin-packing).
   */
  private fillColumnsBalanced(
    source: GalleryItem[],
    cols: ColEntry[][],
    numCols: number,
    entering: Map<number, number>,
    from: number,
    to: number,
    setLoaded: (n: number) => void,
  ): void {
    while (cols.length < numCols) cols.push([]);
    // Seed column heights from already-placed items
    const heights = cols.map(col => col.reduce((h, e) => h + this.estimateHeight(e.item), 0));
    const clampedTo = Math.min(to, source.length);
    for (let i = from; i < clampedTo; i++) {
      const col = heights.indexOf(Math.min(...heights));
      cols[col].push({ item: source[i], globalIndex: i });
      heights[col] += this.estimateHeight(source[i]);
      entering.set(i, (i - from) * 50);
    }
    setLoaded(clampedTo);
  }

  /** Approximate rendered height (px) for a photo item, used for column balancing */
  private estimateHeight(item: GalleryItem): number {
    const map: Record<string, number> = {
      xs: 166, sm: 256, wide: 206, md: 316, lg: 386, portrait: 476, xl: 536,
    };
    return (item.size ? (map[item.size] ?? 316) : 250) + 16; // +16 for gap
  }

  /** Clear entering maps after all animations in the batch finish */
  private clearEnteringAfter(batchSize: number, ...maps: Array<Map<number, number>>): void {
    const delay = batchSize * 50 + 650; // last item stagger + animation duration
    const targets = maps.length ? maps : [this.torturiEntering, this.candyBarEntering, this.prajituriEntering];
    setTimeout(() => targets.forEach(m => m.clear()), delay);
  }
}
