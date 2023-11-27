import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {

  CategoryName: string = '';
  isTop: string = '';

  constructor(private categoryService: CategoryService,   private router: Router,
    private route: ActivatedRoute) {}

  addCategory(): void {
    this.categoryService.createCategory({ name: this.CategoryName,is_top: this.isTop }).subscribe(() => {
      // Optionally, navigate to the category list after adding a category
      this.router.navigate(['/categories']);
    });
  }
}
