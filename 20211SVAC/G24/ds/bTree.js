
class Node {
    constructor(data) {
        this.data=data;
        this.prev=null;
        this.next=null;
        this.right=null;
        this.left=null;
    }
}

class Branch {
    constructor() {
        this.count=0;
        this.leaf=true;
        this.root=null;
    }

    insert(node) {
        if (this.root == null) {
            this.root=node;
            this.count++;
        } else {
            let tmp=this.root;
            do{
				if (node.data <= tmp.data) {
					this.count++;
                    if (tmp == this.root) {
                        this.root.prev=node;
                        this.root.left=node.right;
                        this.root=node;
                        break;
                    } else {
                        node.prev=tmp.prev;
                        node.next=tmp;
                        tmp.prev.next=node;
                        tmp.prev.right=node.left;
                        tmp.prev=node;
                        tmp.left=node.right;
                        break;
                    }
                } else if(tmp.next == null){
                    this.count++;
                    tmp.next=node;
                    tmp.right=node.left;
                    node.prev=tmp;
                    node.next=null;
                    break;
                }
                tmp=tmp.next;
            }while (tmp != null);
        }
    }
    print() {
        let result = "";
        let temp = this.root;
        let contador = 0;
        while (temp != null) {
            if (contador == 0) {
                result = temp.data;
            } else {
                result += "|" + temp.data;
            }
            temp = temp.next;
        }
        return result;
    }
}

class bTree {
    constructor(order){

        this.root=null;
        this.order=order;
    }

    insert(data){
        let node=new Node(data);
        if(this.root == null){
            this.root=new Branch();
            this.root.insert(node);
            return;
        }else{
            let tmp=this.add(node, this.root);
            if (tmp instanceof Node) {
                this.root=new Branch();
                this.root.insert(tmp);
                this.root.leaf=false;
            }
        }
    }

    add(node, branch){
        if (branch.leaf) {
            branch.insert(node);
            if (branch.count == this.order) {
                return this.divideBranch(branch);
            } else {
                return branch;
            }
        }else{
            let tmp=branch.root;
            do{
                if(node.data == tmp.data){
                    return branch;
                }else if(node.data < tmp.data){
                    let aux=this.add(node, tmp.left);
                    if(aux instanceof Node){
                        branch.insert(aux);
                        if(branch.count == this.order){
                            return this.divideBranch(branch);
                        }
                    }
                    return branch

                }else if(tmp.next == null){
                    let aux=this.add(node, tmp.right);
                    if (aux instanceof Node) {
                        branch.insert(aux);
                        if (branch.count == this.order) return this.divideBranch(branch);

                    }return branch
                }
                tmp=tmp.next;
            }while (tmp != null);
        }
        return branch;
    }

    divideBranch(branch){
        let r=new Branch();
        let l=new Branch();
        let m=null;
        let tmp=branch.root;

        let begin=1;
        let mv=parseInt(this.order / 2) + 1;
        let final=this.order;
        for(let i=1; i < this.order + 1; i++, tmp=tmp.next){
            let node=new Node(tmp.data);
            node.left=tmp.left;
            node.right=tmp.right;

            if (node.right != null && node.left != null) {
                l.leaf=false;
                r.leaf=false;
            }

            if (i >= begin && i < mv) {
                l.insert(node);
            } else if (i == mv) {
                m=node;
            } else if (i <= final && i > mv) {
                r.insert(node);
            }
        }

        m.left=l;
        m.right=r;
        return m;
    }
}


a = new bTree(3);
a.insert(1);
a.insert(2);
a.insert(3);
console.log(a.root.print());
