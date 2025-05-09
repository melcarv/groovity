import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, switchMap, catchError } from 'rxjs/operators';

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
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder = 'Buscar...';
  @Output() queryChange = new EventEmitter<string>();
  
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(600),
        distinctUntilChanged(),
        filter(query => query?.trim().length > 0),
        switchMap(query => {
          this.onQueryChange(query);
          return this.navigateToSearch(query);
        }),
        catchError(error => {
          console.error('Erro na busca:', error);
          return [];
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Navega para a rota /search?q=termo, ativando a página de resultados de busca.
   * @param query Termo de busca a ser pesquisado
   */
  navigateToSearch(query: string): Promise<boolean> {
    if (query?.trim()) {
      return this.router.navigate(['/search'], {
        queryParams: { q: query }
      });
    }
    return Promise.resolve(false);
  }

  //Se alguém quiser reagir à mudança da query fora do componente (como atualizar um estado pai), pode ouvir esse evento.
  onQueryChange(query: string): void {
    this.queryChange.emit(query);
  }
}
