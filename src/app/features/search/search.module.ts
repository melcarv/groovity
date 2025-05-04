import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SearchComponent }
    ])
  ]
})
export class SearchModule {}
