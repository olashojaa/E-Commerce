import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent {
  adminId: number=0;
  admin: any = {}; // Assuming you have a admin object
  roles: any[]=[];

  constructor(private RoleService: RoleService,private adminService: AdminService,   private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the admin ID from the route parameters
    this.route.params.subscribe((params) => {
      this.adminId = +params['id']; // Convert the parameter to a number
      // Fetch admin details based on the ID
      this.adminService.getAdminbyId(this.adminId).subscribe((data) => {
        this.admin = data;

        this.RoleService.getRoles().subscribe((data) => {
          this.roles = data;});
      });
    });
  }
  updateAdmin(): void {
    this.adminService.updateAdmin(this.adminId, this.admin ).subscribe(() => {
      // Optionally, navigate to the admin list after adding a admin
      this.router.navigate(['/admin']);
    });
  }
}
