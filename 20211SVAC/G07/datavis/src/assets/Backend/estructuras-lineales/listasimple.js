class Node {
     constructor(data, next){
         this.data = data;
         this.next = next;
     }
}
class listasimp {
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

    print(){
        if ( !this.size ){
            return null
        }
        let actual = this.head;
        let result = '';
        while (actual) {
            result += actual.data += '->';
            actual = actual.next;
        }
        result += 'X';
        console.log(result)
        return result;
    }
    removeData(data){
        let actual = this.head;
        let anterior = null;

        while(actual != null){
            if (actual.data === data) {
                if(!anterior){
                    this.head = actual.next;
                }
                else {
                    anterior.next = actual.next;
                }
                this.size--;
                return actual.data
            }
            anterior = actual;
            actual = actual.next;
        }
        return null
    }
}

const lista = new listasimp();

export function AgregarNuevo(valor){
  console.log(lista)
  if(valor != null && valor != ''){
    lista.add(valor);
    lista.print();
  }else{
    lista.print();
  }
}

export function eliminar(valor){
  console.log(lista)
  if(valor != null && valor != ''){
    lista.removeData(valor);
    lista.print();
  }else{
    lista.print();
  }
}
