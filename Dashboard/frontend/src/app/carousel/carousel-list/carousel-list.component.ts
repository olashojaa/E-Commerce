import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carousel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-list.component.html',
  styleUrl: './carousel-list.component.css'
})
export class CarouselListComponent {
  carousels: any[]=[];
  constructor(private carouselService: CarouselService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carouselService.getCarousels().subscribe((data) => {
      this.carousels = data;
    });
  }
  goToAddCarousel(): void {
    // Navigate to the "add Carousel" page
    this.router.navigate(['carousels', 'add']);
  }
  editRow(CarouselId: any): void {
    this.router.navigate(['carousels/edit', CarouselId]);

  }

  deleteRow(id: number): void {

    this.carouselService.deleteCarousel(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.carouselService.getCarousels().subscribe((data) => {
        this.carousels = data;
      });
    });
  }

}
