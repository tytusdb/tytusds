import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioIntento1Service {

  constructor(private http: HttpClient) {}
  
  getElementos(){}
  
}
