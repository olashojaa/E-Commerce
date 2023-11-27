import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.css'
})
export class PermissionListComponent implements OnInit{
  permissions: any[]=[];

  constructor(private PermissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PermissionService.getPermissions().subscribe((data) => {
      this.permissions = data;
    });
  }
  goToAddPermission(): void {
    // Navigate to the "add Permission" page
    this.router.navigate(['permission/add']);
  }
  editRow(PermissionId: any): void {
    this.router.navigate(['permission/edit', PermissionId]);

  }

  deleteRow(id: number): void {

    this.PermissionService.deletePermission(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.PermissionService.getPermissions().subscribe((data) => {
        this.permissions = data;
      });
    });
  }
}
