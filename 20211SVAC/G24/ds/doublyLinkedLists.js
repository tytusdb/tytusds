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
	
	addPos(elem ,pos){	
		var nd = new node(elem);
		if (pos > 0 && pos >= this.size){
			return
		}else{
			var curr;
			curr = this.head;	
			if (pos == 0){
				nd.next=this.head;
				this.head.prev=nd
				nd.prev=this.tail;
				this.tail.next=nd;
				this.head=nd;
				this.size++;
				return;
			}else if(pos==this.size-1){
				this.add(elem);
				return;
			}else{
				curr=this.head;
				var it=0;
				while (it<pos){
					it++;
					curr = curr.next;
				}
			}
			nd.next=curr;
			nd.prev=curr.prev;
			curr.prev.next=nd;
			curr.prev=nd;
			this.size++;
		}

	}	
	
	addOrder(elem){
		var curr=this.head;
		if(curr==null){
			this.add(elem);
			return;
		}
		if(this.string2ascii(curr.data)>=this.string2ascii(elem)){
			this.addPos(elem,0)
			return;
		}
		for (var i=0;i<this.size;i++,curr=curr.next){
			console.log(elem,i,curr.data)
			if(this.string2ascii(curr.data)>=this.string2ascii(elem)){
				console.log(curr.data,elem,'?',curr.data>=elem,i)
				this.addPos(elem, i);
				return;
			}
		}
		this.add(elem);
	}
	
	del(pos){
		if (pos > 0 && pos >= this.size){
			return
		}
		var curr;
		curr=this.head;
		if (pos==0){
			this.head=this.head.next;
			this.head.prev=null
			this.size--;
			return;
		}
		var it=0;
		while (it<pos){
			it++;
			curr = curr.next;
		}
		if(pos==this.size-1){
			this.tail=curr.prev;
		}
		if(curr.next!=null){
			curr.next.prev = curr.prev;
			curr.prev.next = curr.next;
		}else{
			curr.prev.next= curr.next;
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
	
	string2ascii(string){
		if(this.isNumber(string)){
			return parseInt(string);
		}else{
			var val=0
			for(var i=0; i<string.length;i++){
				val=val+string.charCodeAt(i);
			}
			return val;
		}

	}

	isNumber(n){
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	getPos(elem){
		var curr=this.head;
		if(elem==curr.data){
			return 0;
		}
		for(var i=0;i<this.size;i++,curr=curr.next){
			if(curr.data==elem){
				return i;
			}	
		}
		return null;
	}

	getNodes(){
		var curr=this.head;
		var list=[];
		while (curr!=null){
			list.push(curr.data);
			curr=curr.next;
		}
		return list;
	}


}
/*var a = new doublyLinkedList();
a.add(1);
a.add(2);
a.add(3);
a.add(4);
a.add(5);
a.add(6);
console.log(a.head,a.tail)
a.print()
a.del(5)
a.print();
a.del(0)
a.print();
a.del(1)
a.print();
console.log(a.head,a.tail)
a.del(2)
a.print();
console.log(a.head,a.tail)
a.addOrder(3)
a.print();
console.log(a.head,a.tail)
a.addOrder(5)
a.print();
console.log(a.head,a.tail)*/
