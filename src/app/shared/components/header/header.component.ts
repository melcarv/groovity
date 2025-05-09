import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';


 //Componente responsável pelo cabeçalho da aplicação
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  //Controle do formulário para o campo de busca
  @Input() searchControl: FormControl = new FormControl('');
  // @Output() menuToggle = new EventEmitter<void>();
}
