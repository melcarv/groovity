import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtistDetailComponent } from './artist-detail.component';

@NgModule({
  declarations: [
    ArtistDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ArtistDetailComponent }
    ]),
    SharedModule
  ]
})
export class ArtistDetailModule { } 