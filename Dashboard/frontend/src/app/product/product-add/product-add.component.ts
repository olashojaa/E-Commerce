import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxEditorModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
categories:any={};
selectedFile: File| undefined;
  editor!: Editor;

// make sure to destory the editor
ngOnDestroy(): void {
  if(this.editor)
  this.editor.destroy();
}

productData = {
  name: '',
  description: '',
  price: null,
  stock: null,
  category_id: null,
  isTop: false,
  img:undefined,
  short_description:''
};


  constructor(private productService: ProductService,private categoryService:CategoryService ,  private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.editor = new Editor();

        this.categoryService.getCategories().subscribe((data) => {
          this.categories = data;
        });
     
    }
    onFileSelected(event: any): void {
      console.log(event.target.files[0]);
      this.selectedFile= event.target.files[0];
    }
  addProduct(): void {
    console.log(this.productData)
    const formData = new FormData();
    formData.append('name', this.productData.name);
    formData.append('description', this.productData.description);
    formData.append('short_description', this.productData.short_description);
    formData.append('price', String(this.productData.price));
    formData.append('stock', String(this.productData.stock));
    formData.append('category_id', String(this.productData.category_id));
    if(this.productData.isTop==true)
    formData.append('is_top', String(1));
  else
  formData.append('is_top', String(0));

    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    this.productService.createProduct(formData).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
