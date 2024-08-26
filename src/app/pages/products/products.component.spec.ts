import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';

import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product.model';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });


 
  test('Debe traer el listado de los productos', () => {
    
    const dummyProduct = {
      "id": "trj-crd",
      "name": "Tarjetas de Crédito",
      "description": "Tarjeta de consumo bajo la modalidad de crédito",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "date_release": "2023-02-01"
  }
    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
    fixture.detectChanges();

  });
  
  test('Debe eliminar el producto', (done) => {
    const productId = 'trj-crd';
  
    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeTruthy(); 
      done();
    });
    const req = httpMock.expectOne(`http://localhost:3002/bp/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); 
  });

  test('debería abrir y cerrar el modo de creación de producto', () => {
    component.abrirModalCreate();
    expect(component.ocultarModalCrear).toBeFalsy();
    expect(component.selectedProduct).toBeNull();
  
    component.cerrarModalCreate();
    expect(component.ocultarModalCrear).toBeTruthy();
  });
  
  test('debería abrir y cerrar el modal de actualización del producto', () => {
    const product: Product = {
      id: "trj-crd",
      name: "Tarjetas de Crédito",
      description: "Tarjeta de consumo bajo la modalidad de crédito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: new Date('2023-02-01'),
      date_revision: new Date('2024-02-01')
    };
  
    component.abrirModalUpdate(product);
    expect(component.ocultarModalUpdate).toBeFalsy();
    expect(component.selectedProduct).toEqual(product);
  
    component.cerrarModalUpdate();
    expect(component.ocultarModalUpdate).toBeTruthy();
  });

  test('debe actualizar los productos mostrados cuando se cambian las filas', () => {
    const event = { target: { value: '10' } };
    component.onRowsChange(event);
  
    expect(component.selectedRows).toBe(10);
    expect(component.displayedProducts.length).toBeLessThanOrEqual(10);
  });
});


