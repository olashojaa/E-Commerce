import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  admins: any[]=[];

  constructor(private AdminService: AdminService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.AdminService.getAdmins().subscribe((data) => {
      this.admins = data;
    });
  }
  goToAddAdmin(): void {
    // Navigate to the "add Admin" page
    this.router.navigate(['admin/add']);
  }
  editRow(AdminId: any): void {

    this.router.navigate(['admin/edit', AdminId]);

  }

  deleteRow(id: number): void {

    this.AdminService.deleteAdmin(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.AdminService.getAdmins().subscribe((data) => {
        this.admins = data;
      });
    });
  }
}
