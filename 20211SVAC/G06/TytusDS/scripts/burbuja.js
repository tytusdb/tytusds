function burbuja(array) {
    let aux;
    let ordenado = [];
    for (let i = 0; i < (array.length - 1); i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {
            if (array[j + 1] < array[j]) {
                aux = array[j + 1]
                array[j + 1] = array[j]
                array[j] = aux
                    //console.log(array)
            }
        }
    }
    ordenado = array;
    return ordenado;

}