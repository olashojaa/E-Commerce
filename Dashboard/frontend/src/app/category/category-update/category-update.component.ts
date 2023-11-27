import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent {
  categoryId: number=0;
  category: any = {}; // Assuming you have a category object

  constructor(private categoryService: CategoryService,   private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the category ID from the route parameters
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id']; // Convert the parameter to a number
      // Fetch category details based on the ID
      this.categoryService.getCategorybyId(this.categoryId).subscribe((data) => {
        this.category = data;
      });
    });
  }
  updateCategory(): void {
    this.categoryService.updateCategory(this.categoryId,{ name: this.category.name,is_top: this.category.is_top }).subscribe(() => {
      // Optionally, navigate to the category list after adding a category
      this.router.navigate(['/categories']);
    });
  }
}
