import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

/**
 * Componente responsável pela barra de pesquisa
 * Gerencia a entrada de texto e navegação para a página de resultados
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  /** Controle do formulário para o campo de busca */
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder = 'Buscar...';
  /** Evento emitido quando o texto da busca muda */
  @Output() queryChange = new EventEmitter<string>();
  
  private subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.control.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        filter(query => query?.trim().length > 0)
      )
      .subscribe(query => {
        this.navigateToSearch(query);
      });
  }

  /**
   * Limpa a subscription ao destruir o componente para evitar memory leaks
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Navega para a página de resultados com o termo de busca
   * @param query Termo de busca a ser pesquisado
   */
  navigateToSearch(query: string): void {
    if (query?.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: query }
      });
    }
  }

  /**
   * Emite evento quando o texto da busca é alterado
   * @param query Novo termo de busca
   */
  onQueryChange(query: string): void {
    this.queryChange.emit(query);
  }
}
