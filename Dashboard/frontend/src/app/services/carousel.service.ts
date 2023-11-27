import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private apiUrl = 'http://localhost:8080/api/carousel'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Example GET request
  getCarousels(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}`,{headers});
  }
  getCarouselbyId(CarouselId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${CarouselId}`,{headers});
  }
  // Example POST request
  createCarousel(CarouselData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.apiUrl}`, CarouselData,{headers});
  }
  updateCarousel(CarouselId: number, updatedCarousel: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${CarouselId}`;
    return this.http.post<any>(url, updatedCarousel,{headers});
  }
  deleteCarousel(CarouselId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${CarouselId}`,{headers});
  }

}
