import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: number;
  usuarioId: number;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:3000/tarea';

  constructor(private http: HttpClient) {}

  create(tarea: Tarea): Observable<any> {
    return this.http.post(this.apiUrl, tarea);
  }

  getAll(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getAllByUserId(userId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/${userId}`);
  }

  getById(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  update(id: number, tarea: Partial<Tarea>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarea);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
