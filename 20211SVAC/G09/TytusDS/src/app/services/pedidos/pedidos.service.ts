import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../apiURL/baseURL";
import { Observable } from 'rxjs';
import { Pedidos } from "../../models/pedidos/pedidos";
import { Infopedido } from 'src/app/models/infopedido/infopedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  getMerklePedidos():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'arbolMerklePedidos', httpOptions);
  }

  ConfigMerklePedidos(pedido: Infopedido):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<Infopedido>(baseURL + 'ConfigMerklePedidos', pedido, httpOptions);
  }

  postPedido(pedir: string):Observable<Pedidos>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    return this.http.post<Pedidos>(baseURL+"Pedidos", pedir, httpOptions)
  }

  getListaPedidos():Observable<Pedidos[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Pedidos[]>(baseURL + 'cargarpedido', httpOptions);
  }
}
