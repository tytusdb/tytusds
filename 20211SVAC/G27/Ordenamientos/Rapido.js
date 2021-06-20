
//metodo de ordenamiento rapido se creo a base de la logica del editor si en dado caso no funciona borralo e intentar con los otros 2 metodos
class QuickSort{

    sort(array){
        if(array.length > 0){
            this.quicksort(array, 0, array.length - 1);

        }
    }
    

    quicksort(array, low, high){
        if(low > high){
            return;
        }

        var i = low;

        var j = high;

        var threshold = array[low];
        
        //Escaneando desde ambos extremos de la lista
        while(i<j){
            //Encuentra la primera posición inferior al umbral de derecha a izquierda

            while(i<j && array[j]>threshold){
                j--;
            }
            //Reemplaze low por un menor
            if(i<j)
                array[i++] = array[j];

            // Encuentre la primera posición mayor que el umbral de izquierda a derecha

            while(i<j && array[i]<=threshold){
                i++;
            }

            if(i<j)
                array[j--]=array[i];

        }

        array[i] = threshold;

        this.quicksort(array, low, i-1); //izquierda rapido ordenar
        this.quicksort(array, i+1, high) //Derecharapido ordenar

    }
};

var QS = new QuickSort();



/* metodo numero 2 por si el uno no funciona

    function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // Moving to next element
        pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};


function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}


array = [7, -2, 4, 1, 6, 5, 0, -4, 2]
quickSortRecursive(array, 0, array.length - 1)

console.log(array)


*/


/*
MEtodo no.3  por si no entiendes los primeros 2 o hay algun problema este tambien funciona
function QuickSort(arr, left = 0, right = arr.length - 1) {
  let len = arr.length,
      index

  if(len > 1) {

    index = partition(arr, left, right)

    if(left < index - 1) {
      QuickSort(arr, left, index - 1)
    } 

    if(index < right) {
      QuickSort(arr, index, right)
    }

  }

  return arr

}

function partition(arr, left, right) {
  let middle = Math.floor((right + left) / 2),
      pivot = arr[middle],
      i = left,                 // Start pointer at the first item in the array
      j = right                 // Start pointer at the last item in the array

  while(i <= j) {

    // Move left pointer to the right until the value at the
    // left is greater than the pivot value
    while(arr[i] < pivot) {
      i++
    }

    // Move right pointer to the left until the value at the
    // right is less than the pivot value
    while(arr[j] > pivot) {
      j--
    }

    // If the left pointer is less than or equal to the 
    // right pointer, then swap values
    if(i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]  // ES6 destructuring swap
      i++
      j--
    }
  }

  return i

}

*/