class Node {
    constructor(data, next){
        this.data = data;
        this.next = next;
    }
  }
  class Pila {
   constructor() {
       this.head = null;
       this.size = 0;
   }
   addPrimero(data){
    const newNode = new Node(data, null);
    if ( !this.head ) {
      this.head = newNode
    }
    else {
      newNode.next = this.head
      this.head = newNode
    }
    this.size++
  }
  
   removeData(){
    if (this.size<0){
      return null;
    }else{
      let actual = this.head;
      this.head = actual.next;
      this.size--;
      return actual.data;
    }
  
  
  }
  }
  
  
  
export default pila;
