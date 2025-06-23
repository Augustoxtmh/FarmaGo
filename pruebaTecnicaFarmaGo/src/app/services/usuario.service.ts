import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  contraseña: string;
  fechaRegistro?: string;
  ultimoLogin?: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  create(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getByNombre(nombre: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${nombre}`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, usuario);
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}/${id}`);
  }
}
