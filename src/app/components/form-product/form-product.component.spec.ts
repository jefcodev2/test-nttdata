import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';




describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers:[ProductService,DatePipe]
    });
    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe establecer date_revision basado en date_release', () => {
    component.productForm.get('date_release')?.setValue('2024-01-01');
    component.setDateRevision();
  
    const expectedDateRevision = '2024-12-31'; // Un año después
    expect(component.productForm.get('date_revision')?.value).toEqual(expectedDateRevision);
  });

  test('debería establecer dateReleaseMin en la fecha de hoy', () => {
    component.validatorReleaseDate();
  
    const today = new Date();
    const expectedDate = new DatePipe('en-US').transform(today, 'yyyy-MM-dd');
  
    expect(component.dateReleaseMin).toEqual(expectedDate);
  });

  
  test('debería restablecer el formulario cuando se llama a clearForm', () => {
    component.product = null; // Simular que no estamos en modo edición
    component.clearForm();
  
    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('logo')?.value).toBe('');
    expect(component.productForm.get('date_release')?.value).toBe('');
  });
  
 
  
  test('debe devolver falso si el control de formulario es válido', () => {
    component.formSubmitted = true;
    component.productForm.get('name')?.setValue('Nombre válido');
  
    expect(component.validateValues('name')).toBeFalsy();
  });
  

  test('no debe llamar al servicio createProduct si el formulario no es válido', () => {
    const productService = TestBed.inject(ProductService);
    const productServiceSpy = jest.spyOn(productService, 'createProduct').mockReturnValue(of({}));
  
    component.productForm.get('name')?.setValue(''); // Dejar el formulario inválido
    component.createProduct();
  
    expect(productServiceSpy).not.toHaveBeenCalled();
  });
  

});
