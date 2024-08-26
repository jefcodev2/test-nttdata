import { Component, OnInit} from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  public products: Product[] = [];
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  resultsCount: number = 0;
  selectedRows: number = 5;
  public ocultarModalCrear: boolean = true;
  public ocultarModalUpdate: boolean = true;

  selectedProduct: any = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  /* Método para cargar productos */
  loadProducts() {
    this.productService.loadProducts()
      .subscribe(resp => {
        this.products = resp;
        this.updateFilteredProducts();
      });
  }

  /* Método para eliminar productos */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id)
      .subscribe((resp: any) => {
        console.log('Elemento eliminado');
        this.loadProducts();
      },
        (err) => {
          console.log(err.error.message);
        });
  }

  //Update productos filtrados
  updateFilteredProducts() {
    this.filteredProducts = this.getFilteredProducts();
    this.resultsCount = this.filteredProducts.length;
    this.displayedProducts = this.filteredProducts.slice(0, this.selectedRows);
  }


  // Obtener productos filtrados
  getFilteredProducts() {
    if (!this.searchTerm) {
      return this.products;
    }
    const searchTerms = this.searchTerm.toLowerCase().split(' ');
    return this.products.filter(product => {
      const name = product.name.toLowerCase();
      const description = product.description.toLowerCase();
      const allTermsMatch = searchTerms.every(term =>
        name.includes(term) || description.includes(term)
      );
      const formattedDateRelease = this.formatDate(product.date_release);
      const formattedDateRevision = this.formatDate(product.date_revision);
      return allTermsMatch ||
        formattedDateRelease.includes(this.searchTerm) ||
        formattedDateRevision.includes(this.searchTerm);
    });
  }

  formatDate(date: string | Date): string {
    const dateFormat = new Date(date);
    // Obtener y ajustar a la zona horaria
    const day = ('0' + dateFormat.getUTCDate()).slice(-2);
    const month = ('0' + (dateFormat.getUTCMonth() + 1)).slice(-2);
    const year = dateFormat.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  
  // Metoo para el cambio valores 5, 10, 20
  onRowsChange(event: any) {
    this.selectedRows = +event.target.value;
    this.updateFilteredProducts(); // Actualiza los productos mostrados
  }

  /* Modal para crear producto */
  cerrarModalCreate() {
    this.ocultarModalCrear = true;
  }
  abrirModalCreate() {
    this.selectedProduct = null;
    this.ocultarModalCrear = false;
  }

  /* Modal para editar producto */
  cerrarModalUpdate() {
    this.ocultarModalUpdate = true;
  }
  abrirModalUpdate(product: Product) {
    this.selectedProduct = product; // Pasa el producto seleccionado
    this.ocultarModalUpdate = false;
  }

  /* Metodo para cerrar el modal y cargarlos productos*/
  handleFormClose() {
    this.ocultarModalCrear = true;
    this.ocultarModalUpdate = true;
    this.loadProducts();  
  }
 
}
