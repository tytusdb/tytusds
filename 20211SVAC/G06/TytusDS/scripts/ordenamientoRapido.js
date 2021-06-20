function quickSort(array, izq, der) {
    let pivote = array[(izq + der) / 2]
    let i = izq
    let j = der
    let aux;
    do {
        while (array[i] < pivote) i++;
        while (array[j] > pivote) j--;
        if (i <= j) {
            aux = array[i]
            array[i] = array[j]
            array[j] = aux
            i++
            j--
        }
    } while (i <= j)

    if (izq <= j) {
        quickSort(array, izq, j)
    }
    if (i < der) {
        quickSort(array, i, der)
    }
}

function rapido(a, l, r) {
    let p = a[l]
    let i = l
    let j = r
    let aux
    while (i < j) {
        while (a[i] <= p) i++;
        while (a[j] > p) j--;
        if (i < j) {
            aux = a[i]
            a[i] = a[j]
            a[j] = aux
        }
    }
    a[l] = a[j]
    a[j] = p
    if (l < j - 1) {
        rapido(a, l, j - 1)
    }
    if (j + 1 < r) {
        rapido(a, j + 1, r)
    }
}