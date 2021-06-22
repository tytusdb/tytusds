export default class Node{
    private data:any
    private right:Node
    private left:Node
    private id:number
    private ya:boolean

    constructor(data, id){
        this.data = data
        this.left = null
        this.right = null
        this.id = id
        this.ya = true
        //this.up = null
    }
}


//var bst = new BST()
//var root = bst.getRoot()
//var arrayResults = []
//function insertar(){
  //  let agregar = document.querySelector('#agregar')
    //bst.insert(agregar.value)
    //console.log(agregar.value)

//}
//function inOrder(){
  //  bst.inOrder(bst.root)
    //console.log("FUNCIONA")

//}
//function buscar(){

//}
//function eliminar(){

//}
//bst.insert(35)
//bst.insert(5)
//bst.insert(1)
//bst.insert(10)
//bst.insert(12)
//bst.insert(16)
//bst.insert(20)
//bst.insert(50)
//bst.insert(25)
//bst.insert(75)
//bst.insert(35)
//bst.insert(10)//1 10 15 25 32 35 50 55 60 75 79 81
//bst.insert(81)
//bst.insert(15)
//bst.insert(1)
//bst.insert(32)
//bst.insert(79)
//bst.insert(60)
//bst.insert(55)
//bst.inOrder(bst.root)
//console.log("----------------------")
//var x = bst.search(bst.root,5)
//bst.eliminar(25)
//bst.eliminar(60)
//bst.inOrder(bst.root)
//console.log("XXXX",x.up.up.right.data)