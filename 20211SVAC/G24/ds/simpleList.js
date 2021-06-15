
class node{
	constructor(data=null){
		this.data = data;
		this.next = null;
	}
}
class linkedList{
	constructor(){
		this.head = null;
		this.size = 0;
	}

	add(elem){
		var nd = new node(elem);
		var curr;
		if (this.head == null){
			this.head = nd;
		} else{
			curr = this.head;
			while (curr.next){
				curr = curr.next;
			}
			curr.next = nd;
		}
		this.size++;
	
	}
	del(pos){
		if (pos > 0 && pos >= this.size){
			return
		}
		var curr,prev;
		curr = this.head;	
		if (pos === 0){
			this.head = curr.next;
		}else{
			var it=0;
			while (it<pos){
				it++;
				prev = curr;
				curr = curr.next;
			}
			prev.next = curr.next;
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
			console.log(curr.data);
			curr=curr.next;
		}
	}

}
