class Node {
    constructor(data, next){
        this.data = data;
        this.next = next;
    }
  }
  class Cola {
   constructor() {
       this.head = null;
       this.size = 0;
   }
   add(data){
       const newNode = new Node(data, null);
       if ( !this.head ) {
           this.head = newNode
       }
       else {
           let actual = this.head
           while (actual.next) {
               actual = actual.next;
           }
           actual.next = newNode;
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




