const selectionSort = arr => {
    for ( let j = 0; j < arr.length; ++j ) {
      let i = j;
      let iMin = j
      for ( ++i; i < arr.length; ++i ) {
        ( arr[ i ] < arr[ iMin ] ) && ( iMin = i );
      }
      [ arr[ j ], arr[ iMin ] ] = [ arr[ iMin ], arr[ j ] ];
    }
  
    return arr;
  }
  
  const arr = [10, 4, 40, 32, 67, 12, 43, 31, 65, 1];
  const result = selectionSort(arr);
  
  console.log(result)