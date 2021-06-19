var fileInput = document.querySelector('input[type="file"]');
// ejeX
var labels = []
// eje Y
var data = []


function burbuja(arreglo){
  var aux = 0
  for(i=0; i< arreglo.length-1; i++){
      for(j=i+1; j<arreglo.length; j++){
          if(arreglo[i] > arreglo[j]){
              aux = arreglo[i]
              arreglo[i] = arreglo[j]
              arreglo[j] = aux
          }
      }
  }
  return arreglo
}


function read() {
  var temp = []
  var file = fileInput.files.item(0);
  var reader = new FileReader();

  reader.readAsText(file);

  
  reader.onload = function() {
    var obj = JSON.parse(reader.result)
    let val = obj.valores
   
    for(let i=0; i<val.length; i++){
      temp.push(val[i].toString())
    }
  }
  
  console.log(burbuja(temp))

}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    
});