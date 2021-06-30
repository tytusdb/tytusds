function descarga(nombre, text) {
    var element = document.createElement('a');
    element.setAttribute('href','data:json;charset=utf-8, ' + encodeURIComponent(text));
    element.setAttribute('download', nombre);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export default descarga