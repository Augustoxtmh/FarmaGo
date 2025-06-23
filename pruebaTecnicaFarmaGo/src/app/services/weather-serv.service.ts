import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServService {
  private apiKey = 'cf70361946834a32a64220644251906';
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getWeather(ciudad: string): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${ciudad}`;
    return this.http.get<any>(url);
  }
}
