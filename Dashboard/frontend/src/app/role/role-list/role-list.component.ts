import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  roles: any[]=[];

  constructor(private RoleService: RoleService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.RoleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  goToAddRole(): void {
    // Navigate to the "add Role" page
    this.router.navigate(['role/add']);
  }
  editRow(RoleId: any): void {
    this.router.navigate(['role/edit', RoleId]);

  }

  deleteRow(id: number): void {

    this.RoleService.deleteRole(id).subscribe(() => {
      // After successful deletion, refresh the table data
      this.RoleService.getRoles().subscribe((data) => {
        this.roles = data;
      });
    });
  }
}
