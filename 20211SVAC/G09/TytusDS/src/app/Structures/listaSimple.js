  
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

  print(){
    if(!this.size){
      return null
    };
    let current = this.head;
    let result = '';
    while(current){
      result += current.data += '->';
      current = current.next;
    };
    result += 'X';
    return result;
  }
};

const linkedList = new LinkedList();

function funcion2(){
  //console.log(linkedList.print())
  return linkedList.print()
}
function funcion1(variable){
  console.log(variable)
  linkedList.add(variable);
  console.log(linkedList)
  
 
}


