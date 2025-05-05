import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * Módulo core da aplicação
 * Contém serviços singleton, configurações e funcionalidades que devem ser carregadas uma única vez
 */
@NgModule({
  imports: [HttpClientModule],  // Módulo necessário para realizar requisições HTTP
  providers: []
})
export class CoreModule {
  /**
   * Construtor que garante que o CoreModule seja importado apenas uma vez
   * @param parentModule Referência para verificar se o módulo já foi importado
   * @throws Error se tentar importar o CoreModule mais de uma vez
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi importado. Importe apenas no AppModule.');
    }
  }
}
