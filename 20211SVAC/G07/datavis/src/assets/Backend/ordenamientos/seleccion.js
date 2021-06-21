function swap(myArr, indexOne, indexTwo){
    if( indexOne == indexTwo ){
      return myArr;
    }
    var tmpVal = myArr[indexOne];
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
}

function selectionSort( myArr ){
    var size = myArr.length;
    for( var slot = 0; slot < size -1; slot ++ ){ // outer loop
      var smallest = slot;
      for( var check = slot + 1; check < size; check++ ){ // inner loop
        if( myArr[check] < myArr[smallest] ){
          smallest = check;
        }
      }
      swap( myArr, smallest, slot );
    }
    return myArr;
  }

export default selectionSort;
/*var myArr = ['d', 'f', 'd', 'c', 'a', 'e', 'b'];
console.log( selectionSort( myArr ) ); // ["a", "b", "c", "d", "d", "e", "f"]
*/
