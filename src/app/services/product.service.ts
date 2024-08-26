import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Product } from '../models/product.model';

import { ProductForm } from '../interfaces/product-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

   /* C - CRUD */
   createProduct(formData: ProductForm) {
    console.log('Enviando datos al backend:', formData);
    const url = `${base_url}/products`;
    return this.http.post(url, formData);
  }

  /* R -CRUD */
  loadProducts() {
    const url = `${base_url}/products`;
    return this.http.get<{ data: Product[] }>(url)
      .pipe(
        map(({ data }) => data)
      );
  }

   /* U - CRUD */
   updateProduct(product: Product){
    const url = `${base_url}/products/${product.id}`;
    return this.http.put(url,product);
  }

  /* D - CRUD */
  deleteProduct(id: string) {
    const url = `${base_url}/products/${id}`;
    console.log(url);
    return this.http.delete(url,{});
  }
}
