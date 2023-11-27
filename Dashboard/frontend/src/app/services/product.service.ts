import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Example GET request
  getProducts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}`,{headers});
  }
  getProductbyId(ProductId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${ProductId}`,{headers});
  }
  // Example POST request
  createProduct(ProductData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.apiUrl}`, ProductData,{headers});
  }
  updateProduct(ProductId: number, updatedProduct: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${ProductId}`;
    return this.http.post<any>(url, updatedProduct,{headers});
  }
  deleteProduct(ProductId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${ProductId}`,{headers});
  }

}
