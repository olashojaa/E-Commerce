import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(route.routeConfig)
  var component=route.routeConfig.component?.name;

  var loginRes:any  = localStorage.getItem('loginRes');
  loginRes= loginRes ? JSON.parse(loginRes) : {}
  if(loginRes)
{var permissions=loginRes.permissions;
  console.log(permissions);
  console.log(component)
  if (permissions.some((permission: { gaurd_name: any; }) => permission.gaurd_name === component)) {
    return true;

  }
}
 return false
 

};
