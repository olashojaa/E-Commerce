import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxEditorModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  categories:any={};
  productData:any={};
  selectedFile: File| undefined;
  productId:number=0;
  editor!: Editor;

  ngOnDestroy(): void {
    if(this.editor)
    this.editor.destroy();
  }
    constructor(private productService: ProductService,private categoryService:CategoryService ,  private router: Router,
      private route: ActivatedRoute) {}
      ngOnInit(): void {
        this.editor = new Editor();

          this.categoryService.getCategories().subscribe((data) => {
            this.categories = data;
          });
          this.route.params.subscribe((params) => {
            this.productId = +params['id']; // Convert the parameter to a number
            // Fetch category details based on the ID
            this.productService.getProductbyId(this.productId).subscribe((data) => {
              this.productData = data;
              if(this.productData.is_top=="0")
              this.productData.is_top=false;
            else
            this.productData.is_top=true
            });
          });
       
      }
      onFileSelected(event: any): void {
        console.log(event.target.files[0]);
        this.selectedFile= event.target.files[0];
      }
    updateProduct(): void {
      const formData = new FormData();
      formData.append('name', this.productData.name);
      formData.append('description', this.productData.description);
      formData.append('short_description', this.productData.short_description);
      formData.append('price', String(this.productData.price));
      formData.append('stock', String(this.productData.stock));
      formData.append('category_id', String(this.productData.category_id));
      if(this.productData.is_top==true)
      formData.append('is_top', String(1));
    else
    formData.append('is_top', String(0));
      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }
      this.productService.updateProduct(this.productId,formData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
}
