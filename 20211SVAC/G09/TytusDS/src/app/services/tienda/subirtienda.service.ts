import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../apiURL/baseURL";
import { Observable } from 'rxjs';
import { Tienda } from "../../models/tienda/tienda";
import { Datos } from 'src/app/models/datos/datos';
import { Eliminarespecifico } from 'src/app/models/eliminarespecifico/eliminarespecifico';
import { Buscarespecifico } from 'src/app/models/buscarespecifico/buscarespecifico';
import { Info } from 'src/app/models/info/info';
import { ComentTienda } from 'src/app/models/ComentTienda/coment-tienda';

@Injectable({
  providedIn: 'root'
})
export class SubirtiendaService {

  constructor(private http: HttpClient) { 
    
  }

  getMerkleTiendas():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'arbolMerkleTiendas', httpOptions);
  }

  getHashTiendas():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'tablaHashTiendas', httpOptions);
  }

  ConfigMerkleTiendas(tienda: Info):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<Info>(baseURL + 'ConfigMerkleTiendas', tienda, httpOptions);
  }

  postComentarioTienda(tienda: ComentTienda):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<ComentTienda>(baseURL+"subirComentarioTienda", tienda, httpOptions)
  }

  getComentariosTienda():Observable<ComentTienda[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<ComentTienda[]>(baseURL + 'verComentarioTienda', httpOptions);
  }


  postTienda(tienda: any):Observable<Tienda>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Tienda>(baseURL+"cargartienda/subir", tienda, httpOptions)
  }

  deleteTienda(eliminar: any):Observable<Eliminarespecifico>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Eliminarespecifico>(baseURL+"Eliminar", eliminar, httpOptions)
  }

  buscarTienda(buscar: string):Observable<Info>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Info>(baseURL+"TiendaEspecifica", buscar, httpOptions)
  }

  //obtenerTienda():Observable<Info[]>{
    //const httpOptions = {
      //headers: new HttpHeaders({
        //'Content-Type': 'application/json',
      //}),
    //};
    //return this.http.get<Info[]>(baseURL + 'TiendaEspecifica', httpOptions);
  //}

  getListaTiendas():Observable<Tienda[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Tienda[]>(baseURL + 'cargartienda', httpOptions);
  }

}
