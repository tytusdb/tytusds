class node{
	constructor(data=null){
		this.data = data;
		this.next = null;
	}
}

class circularLinkedList{
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
			this.size++;
			return
		}
		this.tail.next=nd;
		this.tail=nd;
		this.tail.next=this.head;
		this.size++;
	}

	del(){
		if (this.head==null){
			return;
		}
		if (this.size==1){
			this.head=null;
			this.tail=null;
			this.size--;
			return;
		}
		var curr=this.head.next
		var prev = null;
		while (curr.next!=this.head){
			prev=curr;
			curr=curr.next;
		}
		if (prev==null){
			this.tail=this.head;
			return;
		}
		prev.next = this.head;
		this.tail=prev;
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

}


