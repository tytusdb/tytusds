import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../apiURL/baseURL";
import { Observable } from 'rxjs';
import { Cuentas } from "../../models/cuentas/cuentas";
import { Eliminarusuario } from "../../models/eliminarusuario/eliminarusuario";
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getMerkleUsuarios():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'arbolMerkleUsuario', httpOptions);
  }

  ConfigMerkleUsuarios(usuario: Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<Usuario>(baseURL + 'ConfigMerkleUsuario', usuario, httpOptions);
  }

  postCuentas(usuario: any):Observable<Cuentas>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Cuentas>(baseURL+"nuevoUsuarios", usuario, httpOptions)
  }

  postUsuarioIndividual(membresia: Cuentas):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<Cuentas>(baseURL + 'nuevoUsuarios', membresia, httpOptions);
  }

  deleteUsuario(elimusuario: any):Observable<Eliminarusuario>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Eliminarusuario>(baseURL+"EliminarUsuario", elimusuario, httpOptions)
  }

  getListaUsuarios():Observable<Cuentas[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Cuentas[]>(baseURL + 'cargarusuarios', httpOptions);
  }

  getUsuariosEncriptados():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'Encriptacion', httpOptions);
  }
}
