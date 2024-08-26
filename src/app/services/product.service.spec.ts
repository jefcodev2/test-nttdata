import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductForm } from '../interfaces/product-form.interface';

describe('ProductService', () => {
  let service: ProductService;


  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProductService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Debe traer el listado de los productos', (done) => {
    service.loadProducts()
      .subscribe(data => {
        expect(data).toBeTruthy(); 
        done();
      });
  });

  test('Debe crear el producto', (done) => {
    const mockProduct: ProductForm = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };

    service.createProduct(mockProduct)
      .subscribe((response) => {
        expect(response).toBeTruthy();
        done();
      });
  });

  test('Debe actualizar un producto existente', (done) => {
    const mockProduct: ProductForm = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };
    service.updateProduct(mockProduct)
      .subscribe((response) => {
        expect(response).toBeTruthy();
        done();
      });
  });

  test('Debe eliminar un producto', (done) => {
    const productId = '123';
    service.deleteProduct(productId)
      .subscribe((response) => {
        expect(response).toBeTruthy();
        done();
      });
  });
});


