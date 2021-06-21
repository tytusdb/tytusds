import { ThisReceiver } from "@angular/compiler"
import { Nodo } from "./nodo-avl"
export class AVL{
    root:Nodo
    dot:String
    contadores:number
    nulls:number
    constructor(){
        this.root = null
        this.dot = ''
        this.contadores = 0
        this.nulls = 0
    }

    isEmpty() {
        return this.root == null;
    }

    //size() {
      //  return size(root);
    //}

    size(x) {
        if (x == null) return 0;
        return x.size;
    }

    height(x) {
        if (x == null) return -1;
        return x.height;
    }

    put(val) {
        this.root = this.puts(this.root, val);
    }

    find(val, x)
    {
        if (x==null)
        {
            return null;
        }
        
        if (x.value==val)
        {
            return x;
        }
        else if (val < x.value)
        {
            return this.find(val,x.left);
        }
        else
        {
            return this.find(val,x.right);
        }
    }

    puts(x, val) {
        if (x == null) {
            this.contadores += 1
            var q = new Nodo(val,0,1)
            q.ya = true
            return q
        }
        
        if (val < x.value) {
            x.left = this.puts(x.left, val);
        }
        else if (val > x.value) {
            x.right = this.puts(x.right, val);
        }
        else {
            x.value = val;
            return x;
        }
        x.size = 1 + this.size(x.left) + this.size(x.right);
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return this.balance(x);
    }

    balance(x) {
        if (this.balanceFactor(x) > 1) {
            if (this.balanceFactor(x.right) < 0) {
                x.right = this.rotateRight(x.right);
            }
            x = this.rotateLeft(x);
        }
        else if (this.balanceFactor(x) < -1) {
            if (this.balanceFactor(x.left) > 0) {
                x.left = this.rotateLeft(x.left);
            }
            x = this.rotateRight(x);
        }
        return x;
    }

    balanceFactor(x) {
        return this.height(x.right) - this.height(x.left);
    }

    rotateRight(x) {
        
        var y = x.left;
        x.left = y.right;
        y.right = x;
        y.size = x.size;
        x.size = 1 + this.size(x.left) + this.size(x.right);
        x.height = 1 + Math.max(this.height(x.left),this.height(x.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    rotateLeft(x) {
        var y = x.right;
        x.right = y.left;
        y.left = x;
        y.size = x.size;
        x.size = 1 + this.size(x.left) + this.size(x.right);
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    delete(val) {
        this.root = this.delete2(this.root, val);
    }

    delete2(x, val) {
        if (val < x.value) {
            x.left = this.delete2(x.left, val);
        }
        else if (val > x.value) {
            x.right = this.delete2(x.right, val);
        }
        else {
            if (x.left == null) {
                return x.right;
            }
            else if (x.right == null) {
                console.log("X:RIGHT == UNDEFINED")
                return x.left;
            }
            else {
                var y = x;
                console.log("Y.RIGHT2",y.right.value)
                console.log("X.RIGHT",x.right.value)
                x = this.min(y.right);
                x.right = this.deleteMin(y.right);
                x.left = y.left;
            }
        }
        x.size = 1 + this.size(x.left) + this.size(x.right);
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return this.balance(x);
    }  

    deleteMin(x) {
        if (x.left == null) return x.right;
        x.left = this.deleteMin(x.left);
        x.size = 1 + this.size(x.left) + this.size(x.right);
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return this.balance(x);
    }

    min(x) {
        if (x.left == null) return x;
        return this.min(x.left);
    }

    inOrden(n)
    {
        if (n!=null)
        {
            this.inOrden(n.left);
            console.log(n.value + ", ");
            this.inOrden(n.right);
        }
    }

    preOrden(n)
    {
        if (n!=null)
        {
            console.log(n.value + ", ");
            this.preOrden(n.left);
            this.preOrden(n.right);
        }
    }

    postOrden(n)
    {
        if (n!=null)
        {
            this.postOrden(n.left);
            this.postOrden(n.right);
            console.log(n.value + ", ");
        }
    }
    


    dotgen(tmp) {
        if (tmp != null) {
            console.log("DENTRO DE DOTGEN",tmp.value)
            if(tmp.ya) {
                this.dot+=tmp.value+'[style="filled",color="turquoise"];'
                tmp.ya = false
            }


            if (tmp.left != null) this.dot += tmp.value+'--'+tmp.left.value+';'
            else {
                this.dot += 'null'+this.nulls+'[color="white", label=""];\n'
                this.dot += tmp.value+'-- null'+this.nulls+'[color="white", label=""];'
            }
            this.nulls += 1
            if (tmp.right != null) this.dot += tmp.value+'--'+tmp.right.value+';'
            else {
                this.dot += 'null'+this.nulls+'[color="white", label=""];\n'
                this.dot += tmp.value+'-- null'+this.nulls+'[color="white", label=""];'
            }
            this.nulls += 1
            this.dotgen(tmp.left)
            this.dotgen(tmp.right)
        }
    }

}