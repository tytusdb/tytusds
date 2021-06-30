class node{
	constructor(data=null){
		this.data=data;
		this.prev=null;

	}
}

class queue{
	constructor(){
		this.front=null;
		this.back=null;
		this.size=0;
	}

	enqueue(elem){
		var nd = new node(elem);
		if (this.size==0){
			this.front=nd;
			this.back=nd;
			this.size++;
			return;
		}
		this.back.prev=nd;
		this.back=nd;
		this.size++;
	}

	dequeue(){
		this.front=this.front.prev;
		this.size--;	
	}

	search(elem){
		var curr = this.front;
		var count=1;
		while (curr!=null){
			if(curr.data==elem){
				return count;
			}
			count++;
			curr=curr.prev;
		}
		return;
	}

	update(pos, elem){
		if (pos==0){
			this.front.data=elem;
			this.print();
			return;
		}
		var cur=this.front;
		for(var i=0; i<pos-1; i++){
			cur=cur.prev;
		}
		cur.prev.data=elem;
	}

	print(){
		console.log('----');
		var curr=this.front;
		while (curr!=null){
			console.log(curr.data);
			curr=curr.prev;
		}
	}

	getNodes(){
		var curr=this.front;
		var list=[];
		list.push(curr.data);
		curr=curr.prev;
		while (curr!=null){
			list.push(curr.data);
			curr=curr.prev;
		}
	}

}
