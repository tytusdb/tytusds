
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

	addPos(elem,pos){
		var nd = new node(elem);
		if (pos > 0 && pos >= this.size){
			return
		}else{
			var curr,prev;
			curr = this.head;	
			if (pos == 0){
				nd.next=this.head;
				this.head=nd;
				this.size++;
				return;
			}else{
				curr=this.head;
				var it=0;
				while (it<pos){
					it++;
					prev = curr;
					curr = curr.next;
				}
			}
			nd.next=curr;
			prev.next=nd;
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
			if(this.string2ascii(curr.data)>=this.string2ascii(elem)){
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

	getNodes(){
		var curr=this.head;
		var list=[];
		while (curr!=null){
			list.push(curr.data);
			curr=curr.next;
		}
		return list;
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
