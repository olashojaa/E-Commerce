import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../services/permission.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-permission-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './permission-update.component.html',
  styleUrl: './permission-update.component.css'
})
export class PermissionUpdateComponent {
  permissionId: number=0;
  permission: any = {}; // Assuming you have a permission object

  constructor(private permissionService: PermissionService,   private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the permission ID from the route parameters
    this.route.params.subscribe((params) => {
      this.permissionId = +params['id']; // Convert the parameter to a number
      // Fetch permission details based on the ID
      this.permissionService.getPermissionbyId(this.permissionId).subscribe((data) => {
        this.permission = data;
      });
    });
  }
  updatePermission(): void {
    this.permissionService.updatePermission(this.permissionId,{ name: this.permission.name,gaurd_name: this.permission.gaurd_name }).subscribe(() => {
      // Optionally, navigate to the permission list after adding a permission
      this.router.navigate(['/permission']);
    });
  }
}
