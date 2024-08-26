import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  @Input() product: any = null; 
  @Output() formClose = new EventEmitter<void>();  // Evento para notificar al padre

  public products: Product[] = [];

  public formSubmitted = false;
  public isEditMode = false; 

  /* Format Dates */
  public dateRelease?: Date;
  public dateRevision?: Date;

  public dateReleaseMin: string = '';
  public dateRevisionYear?: string;

/* Form Product*/
  public productForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    description: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(2000)]],
    logo: ['', [Validators.required]],
    date_release: ['', [Validators.required]],
    date_revision: ['', [Validators.required]],
  },{
    Validators
  });

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private pd: DatePipe) {}

  ngOnInit(): void {
    this.validatorReleaseDate();
    this.setDateRevision();
    this.productForm.get('date_revision')?.disable();
    if (this.product) {
      // Si recibimos un producto, llenamos el formulario con sus datos
      this.productForm.patchValue(this.product);
      this.productForm.get('id')?.disable(); 
    }
  }

 

  createProduct() {
    this.formSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productService.createProduct(this.productForm.getRawValue())
      .subscribe(res => {
        console.log('Producto creado correctamente');
        this.formClose.emit();  
      }, err => {
        console.log(err.error.message);
      });
  }

  loadProducts() {
    this.productService.loadProducts()
      .subscribe(resp => {
        this.products = resp;
        console.log(resp);
      });
  }

  updateProduct() {
    this.formSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productService.updateProduct(this.productForm.getRawValue()) 
      .subscribe(res => {
        console.log('Producto actualizado correctamente');
        this.formClose.emit();  
      }, err => {
        console.log(err.error.message);
      });
  }

  clearForm(){
    if (this.product) {
      this.productForm = this.fb.group({
        name: [''],
        description: [''],
        logo: [''],
        date_release: [''],
        date_revision: [''],
      });
    } else {
      this.productForm = this.fb.group({
        id: [''],
        name: [''],
        description: [''],
        logo: [''],
        date_release: [''],
        date_revision: [''],
      });
    }
     
  }

  onSubmit() {
    if (this.product) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  validateValues(campo: string): boolean {
    if (this.productForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

/* Date validation and control */
  setDateRevision(){
    const dateReleaseControl = this.productForm.get('date_release');
    if (dateReleaseControl?.value) {
      const dateRelease = new Date(dateReleaseControl.value);
      dateRelease.setFullYear(dateRelease.getFullYear() + 1); 
      this.productForm.get('date_revision')?.setValue(this.pd.transform(dateRelease, 'yyyy-MM-dd'));
    }
  }

  validatorReleaseDate(){
    this.dateRelease = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dateReleaseMin = this.pd.transform(this.dateRelease, 'yyyy-MM-dd') || '';
  }

}
