import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAdmins(): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/users`,{headers});
  }
  getAdminbyId(adminId: number): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/users/${adminId}`,{headers});
  }
  // Example POST request
  createAdmin(adminData: any): Observable<any> {
    const headers = this.getHeaders();
    headers.set('Content-Type','application/json');
     
    return this.http.post(`${this.apiUrl}users`, adminData,{headers});
  }
  updateAdmin(adminId: number, updatedAdmins: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/users/${adminId}`;
    return this.http.put<any>(url, updatedAdmins,{headers});
  }
  deleteAdmin(adminId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/users/${adminId}`,{headers});
  }
}
