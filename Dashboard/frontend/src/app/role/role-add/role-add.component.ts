import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-role-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './role-add.component.html',
  styleUrl: './role-add.component.css'
})
export class RoleAddComponent implements OnInit{
  RoleName: string = '';
  permissions_selected: string = '';
  permissions: any[]=[];

  constructor(private PermissionService: PermissionService,private roleService: RoleService,   private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.PermissionService.getPermissions().subscribe((data) => {
        this.permissions = data;
      });
    }
  addRole(): void {
    this.roleService.createRole({ name: this.RoleName,permissions: this.permissions_selected }).subscribe(() => {
      // Optionally, navigate to the role list after adding a role
      this.router.navigate(['/role']);
    });
  }
}
