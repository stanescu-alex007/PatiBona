import { describe, expect, it } from 'vitest';
import { PaginatedList } from './paginated-list';

describe('PaginatedList', () => {
  const items = Array.from({ length: 19 }, (_, i) => i + 1);

  it('shows the first page initially', () => {
    const list = new PaginatedList(items, 8);
    expect(list.visible()).toHaveLength(8);
    expect(list.hasMore()).toBe(true);
    expect(list.remaining()).toBe(11);
  });

  it('grows by one page per loadMore and never exceeds the source', () => {
    const list = new PaginatedList(items, 8);
    list.loadMore();
    expect(list.visible()).toHaveLength(16);
    list.loadMore();
    expect(list.visible()).toHaveLength(19);
    expect(list.hasMore()).toBe(false);
    expect(list.remaining()).toBe(0);
    list.loadMore();
    expect(list.visible()).toHaveLength(19);
  });

  it('accepts a custom initial size', () => {
    const list = new PaginatedList(items, 4, 10);
    expect(list.visible()).toHaveLength(10);
  });
});
