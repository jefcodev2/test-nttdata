import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormProductComponent } from './form-product/form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe],
  exports:[
    FormProductComponent
  ]
})
export class ComponentsModule { }
