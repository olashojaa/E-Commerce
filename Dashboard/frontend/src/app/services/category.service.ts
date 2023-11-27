import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  // Example GET request
  getCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/categories`,{headers});
  }
  getCategorybyId(categoryId: number): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}`,{headers});
  }
  // Example POST request
  createCategory(categoryData: any): Observable<any> {
    const headers = this.getHeaders();
headers.set('Content-Type','application/json');
    return this.http.post(`${this.apiUrl}categories`, categoryData,{headers});
  }
  updateCategory(categoryId: number, updatedCategory: any): Observable<any> {
    const headers = this.getHeaders();

    const url = `${this.apiUrl}/categories/${categoryId}`;
    return this.http.put<any>(url, updatedCategory,{headers});
  }
  deleteCategory(categoryId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/categories/${categoryId}`,{headers});
  }

}
