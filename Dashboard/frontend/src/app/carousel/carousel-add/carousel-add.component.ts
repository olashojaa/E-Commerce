import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-carousel-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carousel-add.component.html',
  styleUrl: './carousel-add.component.css'
})
export class CarouselAddComponent {
  products:any={};
  selectedFile: File| undefined;
  
  carouselData = {
    product_id: null,
    img:undefined
  };
  
  
    constructor(private carouselService: CarouselService,private productService:ProductService ,  private router: Router,
      private route: ActivatedRoute) {}
      ngOnInit(): void {
  
          this.productService.getProducts().subscribe((data) => {
            this.products = data;
          });
       
      }
      onFileSelected(event: any): void {
        console.log(event.target.files[0]);
        this.selectedFile= event.target.files[0];
      }
    addCarousel(): void {
      const formData = new FormData();

      formData.append('product_id', String(this.carouselData.product_id));
      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }
      this.carouselService.createCarousel(formData).subscribe(() => {
        this.router.navigate(['/carousels']);
      });
    }
}
