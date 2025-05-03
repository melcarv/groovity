import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent,
    SideMenuComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    AlbumCardComponent,
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchBarComponent,
    HeaderComponent,
    SideMenuComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    AlbumCardComponent,
    ArtistCardComponent
  ]
})
export class SharedModule {}
