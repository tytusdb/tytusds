class GuardarArchivo{
    constructor(){

    }
    guardarTexto(text, textConvert){
        var element = document.createElement('a');
        let doc = JSON.stringify({'Cadena Real': text,'Cadena Cifrada': textConvert }, null, '\t')
        //console.log(doc)
        element.setAttribute('href', 'data:json,' + doc);
        element.setAttribute('download', 'Texto.json');
        element.setAttribute('dataType', 'json');
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);        
    }
}
module.exports = GuardarArchivo