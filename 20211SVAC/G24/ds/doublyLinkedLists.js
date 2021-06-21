class node{
	constructor(data){
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class doublyLinkedList{
	constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	add(elem){	
		var nd = new node(elem);
		if (this.size==0){
			this.head = nd;
			this.tail = nd;
		}else{
			this.tail.next = nd;
			nd.prev = this.tail;
			this.tail = nd;
		}
		this.size++;
	}

	del(){ //pop
		if(this.size==0){
			return
		}
		var curr=this.tail;
		if (this.size==1){
			this.head=null;
			this.tail=null;
		}else{
			this.tail=curr.prev;
			this.tail.next=null;
		}
		this.size--;
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
		this.print();
	}

	search(elem){
		var curr;
		curr = this.head;
		var count=1;
		while (curr!=null){
			if(curr.data==elem){
				return count;
			}
			count++;
			curr=curr.next
		}
		return;
	}

	print(){
		console.log('---');
		var curr=this.head;
		while (curr!=null){
			if (curr.prev==null){
				console.log(curr.data);
				curr=curr.next;
			}
			console.log(String(curr.prev.data)+','+curr.data);
			curr=curr.next;
		}
	}


}
