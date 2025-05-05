import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Configuração das rotas da aplicação
 * Define o carregamento lazy loading dos módulos para cada rota
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'artist/:id',
    loadChildren: () =>
      import('./features/artist-detail/artist-detail.module').then(m => m.ArtistDetailModule)
  },
  {
    path: 'album/:id',
    loadChildren: () =>
      import('./features/album-detail/album-detail.module').then(m => m.AlbumDetailModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
