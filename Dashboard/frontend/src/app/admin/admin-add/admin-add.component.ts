import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-admin-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  role_id: string = '';
  roles: any[]=[];

  constructor(private RoleService: RoleService,private adminService: AdminService,   private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.RoleService.getRoles().subscribe((data) => {
        this.roles = data;
      });
    }
  addAdmin(): void {
    this.adminService.createAdmin({ username: this.username,password:this.password,email:this.email,role_id: this.role_id }).subscribe(() => {
      // Optionally, navigate to the admin list after adding a admin
      this.router.navigate(['/admin']);
    });
  }
}
