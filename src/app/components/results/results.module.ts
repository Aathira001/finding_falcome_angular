import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './errors/errors.component';
import { ResultsComponent } from './results/results.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ErrorsComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ErrorsComponent,
    ResultsComponent
  ]
})
export class ResultsModule { }
