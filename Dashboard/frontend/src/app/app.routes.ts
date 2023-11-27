import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { CategoryListComponent } from './category/category-list/category-list.component' 
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionAddComponent } from './permission/permission-add/permission-add.component';
import { PermissionUpdateComponent } from './permission/permission-update/permission-update.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleAddComponent} from './role/role-add/role-add.component';
import {RoleUpdateComponent } from './role/role-update/role-update.component';
import {AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminAddComponent} from './admin/admin-add/admin-add.component';
import {AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import {CarouselAddComponent} from './carousel/carousel-add/carousel-add.component';
import {CarouselListComponent} from './carousel/carousel-list/carousel-list.component';
import {CarouselUpdateComponent} from './carousel/carousel-update/carousel-update.component';

import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [authGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
      },
      {
        path: 'categories',
        component: CategoryListComponent,
        title: 'Categories',
        canActivate: [authGuard]
      },
      {
         path: 'categories/add', 
      component: CategoryAddComponent,
      canActivate: [authGuard]
     }, 
      { 
        path: 'categories/edit/:id', 
      component: CategoryUpdateComponent,
      canActivate: [authGuard]
     },

     {
      path: 'products',
      component: ProductListComponent,
      canActivate: [authGuard]
    },
    {
       path: 'products/add', 
    component: ProductAddComponent,
    canActivate: [authGuard]
   }, 
    { 
      path: 'products/edit/:id', 
    component: ProductUpdateComponent,
    canActivate: [authGuard]
   },
   {
    path: 'permission',
    component: PermissionListComponent,
    canActivate: [authGuard]
  },
  {
     path: 'permission/add', 
  component: PermissionAddComponent,
  canActivate: [authGuard]
 }, 
  { 
    path: 'permission/edit/:id', 
  component: PermissionUpdateComponent,
  canActivate: [authGuard]
 },

 {
  path: 'role',
  component: RoleListComponent,
  canActivate: [authGuard]
},
{
   path: 'role/add', 
component: RoleAddComponent,
canActivate: [authGuard]
}, 
{ 
  path: 'role/edit/:id', 
component: RoleUpdateComponent,
canActivate: [authGuard]
},
{
  path: 'admin',
  component: AdminListComponent,
  canActivate: [authGuard]
},
{
   path: 'admin/add', 
component: AdminAddComponent,
canActivate: [authGuard]
}, 
{ 
  path: 'admin/edit/:id', 
component: AdminUpdateComponent,
canActivate: [authGuard]
},
{
  path: 'carousels',
  component: CarouselListComponent,
  canActivate: [authGuard]
},
{
   path: 'carousels/add', 
component: CarouselAddComponent,
canActivate: [authGuard]
}, 
{ 
  path: 'carousels/edit/:id', 
component: CarouselUpdateComponent,
canActivate: [authGuard]
},
];
