

async function probe(){
   await swap("0","1",1000)
    console.log("ok")
}

async function swap(id1,id2,speed){
       let element1=document.getElementById("a"+id1);
       let element2=document.getElementById("a"+id2);
       await move(id2*90,id1,speed);
       await move(id1*90,id2,speed);
       element1.id="a"+id2;
       element2.id="a"+id1;
}

function changeColor(id,color,speed){
    return new Promise(resolve => {
        let element=document.getElementById("a"+id);
        element.style.animation="colorChange"+color
        +speed/1000+"s"+"ease";
        setTimeout(()=>{
            element.style.animation=null;
            element.style.borderColor=color;
            resolve()
        },speed);
    });
}

function move(x,i,speed){
    return new Promise(resolve => {
        let element=document.getElementById("a"+i.toString());
        let posx=element.style.left;
        element.animate(
            [
                {left:posx},
                {left:x+"px"}
            ],
            {
                duration: speed,
                fill: "forwards"
            }
        );
        setTimeout(()=>{
            element.style.animation=null;
            element.style.left=x+"px";
            resolve()
        },speed);
    });
}
var prb=[20,5,3,8,2,15,47]

async function ordenamiento_burbuja(array,comp,speed) {
    var arreglo = array
    for (var i = (arreglo.length - 1); i >= 0; i--) {
        let id="a"+i;
        await changeColor(i,"Green",speed)
        for (var j = 0; j < i; j++) {
            let id2="a"+j;
            let id3n=j+1
            let id3="a"+id3n;
            await changeColor(j,"Red",speed)
            await changeColor(j+1,"Red",speed)
            var compvalue=comp(arreglo[j],arreglo[j+1])
            if(compvalue===1){
                var b=j+1;
                swapArrayElements(arreglo,j,j+1)
                await swap(j,b,speed)
            }
            await changeColor(j,"Black",speed)
            await changeColor(j+1,"Black",speed)
        }
        await changeColor(i,"Black",speed)
    }
}


function ordenarBurbuja(){
    prb=ordenamiento_burbuja(prb,numberComparison,500);

}
function ordenarInsertion(){
    prb=insertionSort(prb,numberComparison,1000);
}

function numberComparison(a,b){
    if (a < b) {
        return -1;
    }else
    if (a > b) {
        return 1;
    }else
    return 0;
}



function quicksort(unsortedArray,comparisonFunction){
    const sortedArray=[...unsortedArray];
    recursiveSort(sortedArray, 0, unsortedArray.length - 1,comparisonFunction);
    return sortedArray;
}
function swapArrayElements(arrayToSwap,i,j){
    const a = arrayToSwap[i];
    arrayToSwap[i]=arrayToSwap[j];
    arrayToSwap[j]=a;
}
function partition(arrayToDivide,start,end,comp){
    const pivot=arrayToDivide[end];
    let splitIndex=start;
    for (let j = start; j <=end-1; j++) {
        const sortValue=comp(arrayToDivide[j],pivot);
        if (sortValue === -1) {
            swapArrayElements(arrayToDivide, splitIndex, j);
            splitIndex++;
        }
    }
    swapArrayElements(arrayToDivide,splitIndex,end);
    return splitIndex;
}
function recursiveSort(arrayToSort,start,end,comparisonFunction){
    if (start<end) {
        const pivotPosition=partition(arrayToSort,start,end,comparisonFunction);
        recursiveSort(arrayToSort,start,pivotPosition-1,comparisonFunction);
        recursiveSort(arrayToSort,pivotPosition+1,end,comparisonFunction);
    }
}

async function insertionSort(arr,comp,speed){
    const len=arr.length;
    const arreglo=arr
    for (let i = 0; i < len; i++) {
        let elem=arreglo[i]
        let elemt=document.getElementById("a"+i)
        let temp
        temp=document.getElementById("a"+i)
        let j=i-1;
            for (j;j>=0 && comp(arreglo[j],elem)===1;j--){
                await move((j+1)*90,j,speed)
                let t=j+1;
                document.getElementById("a"+j).id="a"+t;
                arreglo[j+1]=arreglo[j]
            }
        elemt.id="at"
        await move((j+1)*90,"t",speed)
        let t1=j+1;
        elemt.id="a"+t1;
        arreglo[j+1]=elem;
       }

}
function show(){
    let lef=0;
    for (const k in prb) {
        let pos=k.toString();
        document.getElementById('result').innerHTML +=
            `<div class="myDiv" style="top: 50px;left: ${lef.toString()+'px'}" id=${"a"+pos}>${prb[k]}</div><br />`;
        lef+=90
    }
}

function selectionSort(arr,comp) {
    let n = arr.length;
    const arrayu=arr;
    for(let i = 0; i < n; i++) {

        let min = i;
        for(let j = i+1; j < n; j++){
            let comparison=comp(arrayu[j].val,arrayu[min].val)
            if(comparison===-1) {
                min=j;
            }
        }
        if (min != i) {
            // Swapping the elements
            let tmp = arrayu[i];
            arrayu[i] = arrayu[min];
            arrayu[min] = tmp;
        }
    }
    return arrayu;
}

