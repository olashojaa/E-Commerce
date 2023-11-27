import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'http://localhost:8080/api/'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPermissions(): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/permissions`,{headers});
  }
  getPermissionbyId(permissionId: number): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/permissions/${permissionId}`,{headers});
  }
  // Example POST request
  createPermission(permissionData: any): Observable<any> {
    const headers = this.getHeaders();
    headers.set('Content-Type','application/json');
     
    return this.http.post(`${this.apiUrl}permissions`, permissionData,{headers});
  }
  updatePermission(permissionId: number, updatedPermissions: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/permissions/${permissionId}`;
    return this.http.put<any>(url, updatedPermissions,{headers});
  }
  deletePermission(permissionId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/permissions/${permissionId}`,{headers});
  }
}
