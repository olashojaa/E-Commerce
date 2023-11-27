import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CategoryService } from './services/category.service';
import {ProductService} from './services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from './services/auth.service';
import {PermissionService} from './services/permission.service';
import {RoleService} from './services/role.service';
import {AdminService} from './services/admin.service';
import {LoginComponent} from './login/login.component';
import { HttpClient  } from '@angular/common/http';
import {CarouselService} from './services/carousel.service';
import { NgxEditorModule } from 'ngx-editor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    HttpClientModule,
    LoginComponent,
    NgxEditorModule,
    
   ],
  providers: [CategoryService,ProductService,AuthService,PermissionService,AdminService,RoleService,HttpClient,CarouselService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'your-app-name';
  constructor(private authService: AuthService){}
  isUserLoggedIn(): boolean {
// console.log(this.authService.isLoggedIn);
    return this.authService.isLoggedIn;
  }
}
