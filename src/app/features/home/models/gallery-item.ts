export interface GalleryItem {
  readonly src: string;
  readonly alt: string;
}

/** A polaroid around the hero title. Decorative, so it carries no alt text. */
export interface HeroPhoto {
  readonly src: string;
  /** How far it drifts up while the hero scrolls away, in px. Nearer photos drift more. */
  readonly depth: number;
}

export interface ProductAttribute {
  readonly icon: 'leaf' | 'hand' | 'hourglass' | 'gift' | 'cake' | 'sparkles' | 'calendar' | 'heart' | 'flame' | 'star';
  readonly text: string;
}
