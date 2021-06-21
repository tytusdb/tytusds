//export default class  selectionSort{
    export function num(arr) {       
        for(let i = 0; i < arr.length; i++) {
            let min=i;
            for(let x = i + 1; x < arr.length; x++) {            
                if (arr[min] > arr[x]) {              
                    min = x;
                }            
            }
            console.log(arr.toString());
            [arr[min],arr[i]] = [arr[i],arr[min]] 
        }
        return arr;
    }
//}