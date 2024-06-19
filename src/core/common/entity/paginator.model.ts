export interface Ipaginator {
  readonly previousPageIndex?: number;
  readonly nextPageIndex?: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly pageIndex: number;
  readonly pageSize: number;
}

export class Paginator {
  readonly previousPageIndex: number | null;
  readonly nextPageIndex: number | null;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly pageIndex: number;
  readonly pageSize: number;

  constructor(_totalItems: number, _pageIndex: number, _pageSize: number) {
    this.totalItems = _totalItems;
    this.pageIndex = _pageIndex;
    this.pageSize = _pageSize;
    const tp = Math.trunc(_totalItems / this.pageSize);
    this.totalPages = _totalItems % this.pageSize > 0 ? tp + 1 : tp;
    this.previousPageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : null;
    this.nextPageIndex = this.pageIndex < this.totalPages ? this.pageIndex + 1 : null;
  }
}
