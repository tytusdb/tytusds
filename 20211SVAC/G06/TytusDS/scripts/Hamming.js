const array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
];
let array2 = [0, 1, 0, 0, 1, 1];
data = ""
    // expected output: 15

for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < array.length; j++) {
        data += array[j][i].toString() + "-"
    }
}
console.log(data)

var nuevoArray = new Array(3);
nuevoArray[0] = new Array(3);
nuevoArray[1] = new Array(2);
//Metemos un dato en cada posición
nuevoArray[0][0] = 25;
nuevoArray[0][1] = 12;
nuevoArray[1][0] = 34;
nuevoArray[1][1] = 6;

console.log(nuevoArray)