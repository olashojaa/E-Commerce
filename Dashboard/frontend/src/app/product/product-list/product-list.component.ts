import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[]=[];
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  goToAddProduct(): void {
    // Navigate to the "add Product" page
    this.router.navigate(['products', 'add']);
  }
  editRow(ProductId: any): void {
    this.router.navigate(['products/edit', ProductId]);

  }

  deleteRow(id: number): void {

    this.productService.deleteProduct(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
      });
    });
  }

}
