
class node{
	constructor(data=null){
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class circularDoublyLinkedList{
	constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	add(elem){
		var nd = new node(elem);
		if (this.head==null){
			this.head=nd;
			this.tail=nd;
			this.tail.next=this.head;
			this.head.prev=this.tail;
			this.size++;
			return
		}
		this.tail.next=nd;
		nd.prev=this.tail
		this.tail=nd;
		this.tail.next=this.head;
		this.head.prev=this.tail;
		this.size++;
	}


	del(pos){
		if (this.head==null){
			return;
		}
		if (this.size==1){
			this.head=null;
			this.tail=null;
			this.size--;
			return;
		}
		this.tail=this.tail.prev;
		this.tail.next=this.head;
		this.head.prev=this.tail;
		this.size--;
	}

	print(){
		var curr=this.head;
		console.log('----');
		console.log(curr.data);
		curr=curr.next;
		while(curr!=this.head){
			console.log(curr.data);
			curr=curr.next;
		}		
		console.log('loop '+curr.data);
	}
	
	update(pos,data){
		if (pos==0){
			this.head.data=data;
			return;
		}
		var cur=this.head;
		for(var i=0; i<pos-1; i++){
			cur=cur.next;
		}
		cur.next.data=data;
	}

	search(elem){
		var curr;
		curr = this.head;
		var count=1;
		for (var i= 0;i<this.size;i++){
			if(curr.data==elem){
				return count;
			}
			count++;
			curr=curr.next
		}
		return;
	}

	getNodes(){
		var curr=this.head;
		var list=[];
		list.push(curr.data);
		curr=curr.next;
		while (curr!=this.head){
			list.push(curr.data);
			curr=curr.next;
		}
		return list;
	}

}

