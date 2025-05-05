import { Component } from '@angular/core';

/**
 * Componente responsável por exibir um indicador visual de carregamento
 * Utilizado durante operações assíncronas para melhorar a experiência do usuário
 */
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  // Componente puramente visual, sem lógica adicional
}
