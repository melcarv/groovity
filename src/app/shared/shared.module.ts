import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    AlbumCardComponent,
    ArtistCardComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SearchBarComponent,
    HeaderComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    AlbumCardComponent,
    ArtistCardComponent
  ]
})
export class SharedModule {}
