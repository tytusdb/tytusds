class GuardarArchivo{
    constructor(){

    }
    guardarTexto(text, textConvert){
        let doc = JSON.stringify({'Cadena Real': text,'Cadena Cifrada': textConvert }, null, '\t')
        this.generarGuardado(doc, "Texto.json")
    }
    guardarMatriz(valores, nombre){
        let doc = JSON.stringify({'categoria': "Estructura Compuesta",'nombre': nombre,'animacion': 10,'valores':valores}, null, '\t');
        this.generarGuardado(doc, nombre+".json")        
    }
    guardarGrafo(valores, nombre){
        let doc = JSON.stringify({'categoria': "Estructura No Lineal",'nombre': nombre,'animacion': 10,'valores':valores}, null, '\t');
        this.generarGuardado(doc, nombre+".json")        
    }    
    generarGuardado(doc, nameFile){
        let element = document.createElement('a');
        element.setAttribute('href', 'data:json,' + doc);
        element.setAttribute('download', nameFile);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);  
    }
}
module.exports = GuardarArchivo