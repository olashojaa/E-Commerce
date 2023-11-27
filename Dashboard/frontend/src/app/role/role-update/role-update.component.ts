import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.css'
})
export class RoleUpdateComponent {
  roleId: number=0;
  role: any = {}; // Assuming you have a role object
  permissions: any[]=[];

  constructor(private PermissionService: PermissionService,private roleService: RoleService,   private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the role ID from the route parameters
    this.route.params.subscribe((params) => {
      this.roleId = +params['id']; // Convert the parameter to a number
      // Fetch role details based on the ID
      this.roleService.getRolebyId(this.roleId).subscribe((data) => {
        this.role = data;

        this.PermissionService.getPermissions().subscribe((data) => {
          this.permissions = data;});
      });
    });
  }
  updateRole(): void {
    this.roleService.updateRole(this.roleId,{ name: this.role.name,permissions: this.role.permissions }).subscribe(() => {
      // Optionally, navigate to the role list after adding a role
      this.router.navigate(['/role']);
    });
  }
}
