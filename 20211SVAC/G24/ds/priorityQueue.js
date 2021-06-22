class node{
	constructor(data=null,priority=null){
		this.data=data;
		this.priority=priority;
		this.prev=null;
		this.next=null;
		this.pos=null;
	}
}

class priorityQueue{
	constructor(){
		this.front=null;
		this.back=null;
		this.size=0;
	}

	enqueue(elem,prt){
		var nd = new node(elem,prt);
		if (this.size==0){
			nd.pos=0;
			this.front=nd;
			this.back=nd;
			this.size++;
			return nd;
		}
		if (nd.priority >= this.front.priority ){	
			this.front.next=nd;
			nd.prev=this.front;
			this.front=nd;
			this.size++;
			this.setPos();
			return nd;
		}else if(nd.priority<this.back.priority){
			nd.next=this.back;
			this.back.prev=nd;
			this.back=nd;
			this.size++;
			this.setPos();
			return nd;
		}
		var curr=this.front;
		while(true){
			if(nd.priority>=curr.priority){
				nd.next=curr.next;
				nd.prev=curr.next.prev;
				curr.next.prev=nd;
				curr.next=nd;
				break;
			}
			curr=curr.prev;

		}
		this.setPos();
		this.size++;
		return nd;
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
			return this.front;
		}
		var cur=this.front;
		for(var i=0; i<pos-1; i++){
			cur=cur.prev;
		}
		cur.prev.data=elem;
		return cur.prev;
	}

	setPos(){
		var curr=this.front;
		var i = 0
		while (curr!=null){
			curr.pos=i
			curr=curr.prev;
			i++;
		}
	}

	print(){
		console.log('----');
		var curr=this.front;
		while (curr!=null){
			console.log(curr.data+','+curr.priority+','+curr.pos);
			curr=curr.prev;
		}
	}

	getNodes(){
		var curr=this.front;
		var list=[];
		list.push([curr.data,curr.priority,curr.pos]);
		curr=curr.prev;
		while (curr!=null){
			list.push([curr.data,curr.priority,curr.pos]);
			curr=curr.prev;
		}
		return list;
	}

}
