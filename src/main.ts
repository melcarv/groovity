import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(() => {
    // Falha na inicialização do aplicativo
    document.body.innerHTML = '<h1>Erro ao iniciar o aplicativo</h1>';
  });
