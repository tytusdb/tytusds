class Node{
	constructor(data, next = null){
		this.data = data;
		this.next = next;
        
	}
}
class CircularLinkedList{
    constructor(){
        this.head = null;
    }

    insertAtFirst(data){
        let newNode = new Node(data);

        if(!this.head){
            newNode.next = newNode;
            this.head = newNode;
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = newNode;
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtLast(data){
        let newNode = new Node(data);

        if(!this.head){
            newNode.next = newNode;
            this.head = newNode;
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = newNode;
        newNode.next = this.head;
    }

    print(){
        if(!this.head){
            return;
        }
        let curr = this.head;
        while(curr.next !== this.head){
            console.log(curr.data);
            curr = curr.next;
        }
        console.log(curr.data);
    }

    count(){
        if(!this.head){
            return;
        }
        let curr = this.head;
        let count = 0;
        while(curr.next !== this.head){
            curr = curr.next;
            count++;
        }
        return count;
    }

    removeFirst(){
        if(!this.head){
            return 
        }
        let curr = this.head;
        while(curr.next !== this.head){
            curr = curr.next;
        }
        curr.next = this.head.next;
        this.head = this.head.next;

        return this.head;
    }
    clear() {
        this.head = null;
        } 
        


    find(valor){
        var actualNode = this.head;
        while(actualNode.valor != valor){
        actualNode = actualNode.next;
        }
            return actualNode;
        }
    

    removeLast(){
        if(!this.head){
            return 
        }
        let curr = this.head.next;
        let prev = null;
        while(curr.next !== this.head){
            prev = curr;
            curr = curr.next;
        }
        prev.next = this.head;

        return this.head;
    }
}

let cList = new CircularLinkedList();
//cList.clear();
//cList.insertAtFirst("cero")
//cList.print();

