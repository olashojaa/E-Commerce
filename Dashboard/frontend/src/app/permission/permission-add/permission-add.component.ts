import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-permission-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './permission-add.component.html',
  styleUrl: './permission-add.component.css'
})
export class PermissionAddComponent {
  PermissionName: string = '';
  GaurdName: string = '';

  constructor(private permissionService: PermissionService,   private router: Router,
    private route: ActivatedRoute) {}

  addPermission(): void {
    this.permissionService.createPermission({ name: this.PermissionName,gaurd_name: this.GaurdName }).subscribe(() => {
      // Optionally, navigate to the permission list after adding a permission
      this.router.navigate(['/permission']);
    });
  }
}
