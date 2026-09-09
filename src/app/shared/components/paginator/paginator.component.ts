import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagingParams } from '../../types/paginations';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalCount: number = 0;
  @Input() totalPages: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageNumber: number = 1;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

  @Output() pageChange = new EventEmitter<PagingParams>();

  get LastItemIndex(): number {
    return Math.min(this.pageNumber * this.pageSize, this.totalCount);
  }

  onPageChange(newPageNumber: number) {
    this.pageNumber = newPageNumber;
    this.emitPageChange();
  }

  onPageSizeChange(newPageSize: Event) {
    const pageSize = Number((newPageSize.target as HTMLSelectElement).value);
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.emitPageChange();
  }

  private emitPageChange() {
    const pagingParams: PagingParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.pageChange.emit(pagingParams);
  }
}
