const array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
];
let array2 = [0, 1, 0, 0, 1, 1];
data = ""
    // expected output: 15

/*for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < array.length; j++) {
        data += array[j][i].toString() + "-"
    }
}
console.log(data)*/
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
        data += array[i][j].toString() + "-"
    }
}
console.log(data)