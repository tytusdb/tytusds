function insertionSort( myArr ) {
    var size = myArr.length,
        slot,
        tmp;

    for ( var item = 0; item < size; item++ ) { // outer loop
      tmp = myArr[item];
      for ( slot = item - 1; slot >= 0 && myArr[slot] > tmp; slot-- ){ // inner loop
        myArr[ slot + 1 ] = myArr[slot];
      }
      myArr[ slot + 1 ] = tmp;
    }
    return myArr;
}
var myArr = ['d', 'f', 'd', 'c', 'a', 'e', 'b'];
console.log( insertionSort( myArr ) ); // ["a", "b", "c", "d", "d", "e", "f"]
export default insertionSort;
