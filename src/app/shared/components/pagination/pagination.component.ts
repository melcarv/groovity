import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

/**
 * Componente responsável pela paginação de resultados
 * Gerencia a navegação entre páginas e exibição dos controles de paginação
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() offset = 0;
  @Input() limit = 15;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  //Array com os números das páginas a serem exibidas
  pages: number[] = [];
  currentPage = 0;

  ngOnChanges(): void {
    this.currentPage = Math.floor(this.offset / this.limit);
    const totalPages = Math.ceil(this.total / this.limit);
    
    if (totalPages <= 5) {
      this.pages = Array.from({ length: totalPages }, (_, i) => i);
    } else {
      let startPage = this.currentPage - 2;
      let endPage = this.currentPage + 2;
      if (startPage < 0) {
        startPage = 0;
        endPage = 4;
      }
      if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = Math.max(0, endPage - 4);
      }
      this.pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    }
  }

  goToPage(page: number): void {
    const totalPages = Math.ceil(this.total / this.limit);
    if (page >= 0 && page < totalPages) {
      this.pageChange.emit(page * this.limit);
    }
  }
  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }
  get showFirstPage(): boolean {
    return this.pages.length > 0 && this.pages[0] > 0;
  }
  get showLastPage(): boolean {
    return this.pages.length > 0 && this.pages[this.pages.length - 1] < this.totalPages - 1;
  }
}
