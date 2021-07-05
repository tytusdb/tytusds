import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor() { }

  //  Si el usuario decide cargar un archivo
  getDocumento(documento: any): Promise<any> {
    return new Promise<any>( (res, rej) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let contenido = fileReader.result?.toString();
        if (contenido !== undefined){
          let doc = JSON.parse(contenido);
          res(doc);
        }
      }
      fileReader.readAsText(documento.files[0]);
    });
  }
  //  Si el usuario decide cargar un archivo txt
  getDocumento2(documento: any): Promise<any> {
    return new Promise<any>( (res, rej) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let contenido = fileReader.result?.toString();
        if (contenido !== undefined){
          res(contenido);
        }
      }
      fileReader.readAsText(documento.files[0]);
    });
  }

}
