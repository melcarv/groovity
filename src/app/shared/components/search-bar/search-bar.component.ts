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
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder = 'Buscar...';
  @Output() queryChange = new EventEmitter<string>();
  
  private subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.control.valueChanges
      .pipe(
        debounceTime(600), //Espera 600ms sem digitar antes de agir
        distinctUntilChanged(),
        filter(query => query?.trim().length > 0)
      )
      .subscribe(query => {
        this.navigateToSearch(query);
      });
  }

  
  //Cancela a inscrição quando o componente for destruído para evitar memory leaks.
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Navega para a rota /search?q=termo, ativando a página de resultados de busca.
   * @param query Termo de busca a ser pesquisado
   */
  navigateToSearch(query: string): void {
    if (query?.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: query }
      });
    }
  }

  //Se alguém quiser reagir à mudança da query fora do componente (como atualizar um estado pai), pode ouvir esse evento.
  onQueryChange(query: string): void {
    this.queryChange.emit(query);
  }
}
