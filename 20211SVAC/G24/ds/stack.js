class node{
	constructor(data=null){
		this.data=data;
		this.prev=null;
	}
}

class stack{
	constructor(){
		this.top=null;
		this.bottom=null;
		this.size=0;
	}

	push(elem){
		var nd = new node(elem);
		if (this.size==0){
			this.top=nd;
			this.bottom=nd;
			this.size++;
			return;
		}
		nd.prev=this.top;
		this.top=nd;
		this.size++;
	}

	pop(){
		this.top=this.top.prev;
		this.size--;
	}

	update(pos,elem){
		if (pos==this.size-1){
			this.top.data=elem;
			return;
		}
		var curr = this.top;
		var i=this.size-1;
		while (i>parseInt(pos)+1){
			curr=curr.prev;
			i--;
		}
		curr.prev.data=elem;
	}

	search(elem){
		var curr;
		curr = this.top;
		var count=this.size-1;
		while (curr!=null){
			if(curr.data==elem){
				return count;
			}
			count--;
			curr=curr.prev;
		}
		return;
	}

	print(){
		var curr=this.top;
		console.log('----');
		while (curr!=null){
			console.log(curr.data);
			curr=curr.prev;
		}
	}
	getNodes(){
		var curr=this.top;
		var list=[];
		list.push(curr.data);
		curr=curr.prev;
		while (curr!=null){
			list.push(curr.data);
			curr=curr.prev;
		}
		return list.reverse();
	}
}
