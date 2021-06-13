import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../apiURL/baseURL";
import { Observable } from 'rxjs';
import { Inventario } from "../../models/inventario/inventario";
import { Pedidos } from "../../models/pedidos/pedidos";
import { ComentProducto } from "../../models/ComentProducto/coment-producto";
import { Productos } from 'src/app/models/Productos/productos';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  getMerkleProductos():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'arbolMerkleProductos', httpOptions);
  }

  getHashProductos():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'tablaHashProductos', httpOptions);
  }

  ConfigMerkleProductos(producto: Productos):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<Productos>(baseURL + 'ConfigMerkleProductos', producto, httpOptions);
  }

  postComentarioProducto(producto: ComentProducto):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<ComentProducto>(baseURL+"subirComentarioProducto", producto, httpOptions)
  }

  getComentariosProducto():Observable<ComentProducto[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<ComentProducto[]>(baseURL + 'verComentarioProducto', httpOptions);
  }


  postInventario(invent: string):Observable<Inventario>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Inventario>(baseURL+"Inventario", invent, httpOptions)
  }

  getListaInventarios():Observable<Inventario[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Inventario[]>(baseURL + 'cargarinventario', httpOptions);
  }

  postCarritoDeCompras(carrito: any):Observable<Pedidos>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Pedidos>(baseURL+"Pedidos", carrito, httpOptions)
  }
}
