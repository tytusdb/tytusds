import {Nodocirsimple} from './nodocirsimple';
export class Listcirsimple {
  head:Nodocirsimple;
  tail:Nodocirsimple;
  size:number;


  constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	add(elem){
		var nod = new Nodocirsimple(elem);
		if (this.head==null){
			this.head=nod;
			this.tail=nod;
			this.tail.next=this.head;
			this.size++;
			return
		}
		this.tail.next=nod;
		this.tail=nod;
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
		var nxt=this.head.next
		var prev = null;
		while (nxt.next!=this.head){
			prev=nxt;
			nxt=nxt.next;
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
    var valores=[];
		var nxt=this.head;
		//console.log('----');
		console.log(nxt.data);
    valores.push(nxt.data);
		nxt=nxt.next;
    
		while(nxt!=this.head){
			console.log(nxt.data);
      valores.push(nxt.data);
			nxt=nxt.next;
		}
		console.log('loop '+nxt.data);
    return valores;
	}

	update(pos,data){
		if (pos==0){
			this.head.data=data;
			return;
		}
		var nx=this.head;
		for(var i=0; i<pos-1; i++){
			nx=nx.next;
		}
		nx.next.data=data;
	}

	search(elem){
		var nxt;
		nxt = this.head;
		var count=1;
		for (var i= 0;i<this.size;i++){
			if(nxt.data==elem){
				return count;
			}
			count++;
			nxt=nxt.next
		}
		return;
	}
}
