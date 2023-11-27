import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-carousel-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carousel-update.component.html',
  styleUrl: './carousel-update.component.css'
})
export class CarouselUpdateComponent {
  products:any={};
  carouselData:any={};
  selectedFile: File| undefined;
  carouselId:number=0;

    constructor(private carouselService: CarouselService,private productService:ProductService ,  private router: Router,
      private route: ActivatedRoute) {}
      ngOnInit(): void {
  
          this.productService.getProducts().subscribe((data) => {
            this.products = data;
          });
          this.route.params.subscribe((params) => {
            this.carouselId = +params['id']; // Convert the parameter to a number
            // Fetch product details based on the ID
            this.carouselService.getCarouselbyId(this.carouselId).subscribe((data) => {
              this.carouselData = data;
            });
          });
       
      }
      onFileSelected(event: any): void {
        console.log(event.target.files[0]);
        this.selectedFile= event.target.files[0];
      }
    updateCarousel(): void {
      const formData = new FormData();
  
      formData.append('product_id', String(this.carouselData.product_id));
      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }
      this.carouselService.updateCarousel(this.carouselId,formData).subscribe(() => {
        this.router.navigate(['/carousels']);
      });
    }
}
