import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  categories: any[]=[];

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  goToAddCategory(): void {
    // Navigate to the "add category" page
    this.router.navigate(['categories', 'add']);
  }
  editRow(categoryId: any): void {
    this.router.navigate(['categories/edit', categoryId]);

  }

  deleteRow(id: number): void {

    this.categoryService.deleteCategory(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      });
    });
  }
}
