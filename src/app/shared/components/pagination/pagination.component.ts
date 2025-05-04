import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() offset = 0;
  @Input() limit = 12;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];
  currentPage = 0;

  ngOnChanges(): void {
    this.currentPage = Math.floor(this.offset / this.limit);
    const totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    this.pageChange.emit(page * this.limit);
  }
}
