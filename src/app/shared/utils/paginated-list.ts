import { computed, signal } from '@angular/core';

/**
 * "Load more" state over an in-memory list. Keeps the visible slice and
 * whether more items remain, so components stay free of slicing logic.
 */
export class PaginatedList<T> {
  private readonly limit = signal(0);

  readonly visible = computed(() => this.items.slice(0, this.limit()));
  readonly hasMore = computed(() => this.limit() < this.items.length);
  readonly remaining = computed(() => Math.max(this.items.length - this.limit(), 0));

  constructor(
    private readonly items: readonly T[],
    private readonly pageSize: number,
    initial: number = pageSize,
  ) {
    this.limit.set(Math.min(initial, items.length));
  }

  loadMore(): void {
    this.limit.update((n) => Math.min(n + this.pageSize, this.items.length));
  }
}
