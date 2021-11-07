import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
