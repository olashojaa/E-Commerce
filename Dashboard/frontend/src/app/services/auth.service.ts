import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/'; // Replace with your API endpoint
  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  }

  set isLoggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(value));
  }

  get loginRes(): any {
    const storedValue = localStorage.getItem('loginRes');
    return storedValue ? JSON.parse(storedValue) : {};
  }

  set loginRes(value: any) {
    localStorage.setItem('loginRes', JSON.stringify(value));
  }
  
  get token(): any {
    const storedValue = localStorage.getItem('token');
    return storedValue ? JSON.parse(storedValue) : {};
  }

  set token(value: any) {
    localStorage.setItem('token', JSON.stringify(value));
  }

   login(loginData:any): boolean{
      this.http.post(`${this.apiUrl}login`, loginData).subscribe(
        (response:any)=>{
          if(response.status=="success")
          {this.isLoggedIn=true;
            this.token=response.token
            this.loginRes=jwtDecode(response.token);
            return true;
          }
          else
          {
            this.isLoggedIn=false;
            alert('the Credintial error')
            return false;
          }
        },
        (error)=>{
       console.log(error);
    this.isLoggedIn=false;
        }
      );
      return this.isLoggedIn;
  }
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginRes');
    this.isLoggedIn = false;
  }
  hasPermission(component: string): boolean {
   
  if (this.loginRes.permissions.some((permission: { gaurd_name: any; }) => permission.gaurd_name === component)) {
    return true;

  }
    return false; // Replace with your logic
  }

}
