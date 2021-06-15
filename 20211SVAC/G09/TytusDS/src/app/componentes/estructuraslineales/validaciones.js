  
class Noda{
    constructor(data, next){
      this.data = data;
      this.next = next;
    };
  };
  
  class LinkedList {
    constructor(){
      this.head = null;
      this.size = 0;
    };
  
    add(data){
      const newNodo = new Noda(data, null);
      if(!this.head){
        this.head = newNodo
      }else{
        let current = this.head;
        while(current.next){
          current = current.next;
        };
        current.next = newNodo;
      };
      this.size++
    };
  };
  
  const linkedList = new LinkedList();
  

function funcion1(variable){
    
    linkedList.add(variable);
    console.log(linkedList)

    
    
    
}