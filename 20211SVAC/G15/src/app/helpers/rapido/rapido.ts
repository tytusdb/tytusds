import { InjectSetupWrapper } from "@angular/core/testing";

export class seleccion {


    private rapido: any

    swap(items, leftIndex, rightIndex) {
        var temp = items[leftIndex]
        items[leftIndex] = items[rightIndex]
    }

    partition(items, left, rigth) {
        var pivot = items[Math.floor((rigth + left) / 2)],
            i = left,
            j = rigth;
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                this.swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    quickSort(items, left, right) {
        var index;
        if (items.length > 1) {
            index = this.partition(items, left, right);
            if (left < index - 1) {
                this.quickSort(items, left, index - 1);
            }
            if (index < right) {
                this.quickSort(items, index, right);
            }
        }

        var array = this.quickSort(items,0,items.length-1)
        array = 
        console.log(array)
        return items;
    }

   // var array =quickSort(items,0,items.length-1);
   // console.log(array)
}