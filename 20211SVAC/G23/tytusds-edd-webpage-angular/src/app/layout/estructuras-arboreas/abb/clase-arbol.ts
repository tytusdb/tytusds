import  Node  from './../clase-nodo-simple'

export default class BST{
    public root:Node
    public data:any
    public dot:string
    constructor(){
        this.root = null
        this.dot = ''
    }
    getRoot(){
        return this.root
    }
    insert(data){
        let newNode = new Node(data)
        if(this.root === null){
            this.root = newNode
               // console.log(newNode.data)
        }else{
            this.insertNode(this.root,newNode)
        }

    }
    insertNode(node, newNode){
        //console.log("Nodos")
        //console.log(node.data, newNode.data)
        //console.log("Nodos Padre")
        if(node !== this.root){
            //console.log(node.up.data, newNode.up.data)
        }else{
            //console.log("Es NULL",newNode.up.data)
        }
        if(newNode.data < node.data) {
            if(node.left === null){
             node.left = newNode
            // node.left.up = node
            }    
            else this.insertNode(node.left, newNode)
        }else if (newNode.data > node.data){
            if(node.right === null) {
                node.right = newNode
               // node.right.up = node
            }
            else this.insertNode(node.right, newNode)
        }else { /// Si hay repeticion, si no, se quita y ya
            if(node.left === null) node.left = newNode
            else this.insertNode(node.left, newNode)
        }
    }
    inOrder(node, retorno){
        if(node !== null){
            retorno = this.inOrder(node.left,retorno)
            console.log(node.data)
            console.log("******")
            retorno += node.data.toString()  + " ----- "
            
            retorno = this.inOrder(node.right,retorno)
        }
        return retorno
    }

    search(node,founding){
        if(node === null) return null
        else if(founding < node.data) {
            return this.search(node.left,founding)
        }
        else if(founding > node.data) {
            return this.search(node.right,founding)
        }else  {
            console.log(node.data)
            return node
        }

    }
    eliminar(valor){
        this.root = this.eliminarN(this.root,valor)
        
    }

    eliminarN(nodo_aux,valor){
        console.log("ENTRO A ELIMINAR N.---- Y está eliminando : ",valor)
        if(nodo_aux == null) return null
        else if(valor < nodo_aux.data){
            let iz = this.eliminarN(nodo_aux.left,valor)
            nodo_aux.left = iz
        }else if( valor > nodo_aux.data){
            let der = this.eliminarN(nodo_aux.right,valor)
            nodo_aux.right = der
        }else{
            let p = nodo_aux
            if(p.right == null){
                nodo_aux = p.left
            }else if(p.left == null){
                nodo_aux = p.right
            }else{
                p = this.cambiar(p)
            }
            p = null
        }
        return nodo_aux
    }

    cambiar(nodo_aux){
        let p = nodo_aux
        let a = nodo_aux.left
        while(a.right != null){
            p = a
            a = a.right
        }
        console.log("Nodo aux",nodo_aux.data)
        console.log("A",a.data)
        nodo_aux.data = a.data
        if(p == nodo_aux){
            p.left = a.left
        }else{
            p.right = a.left
        }return a
    }

    actualizar(nodo){
        
    }

    dotgen(tmp) {
        if (tmp != null) {

            if (tmp.left != null) this.dot += tmp.value+'--'+tmp.left.value+';'
            if (tmp.right != null) this.dot += tmp.value+'--'+tmp.right.value+';'

			
			/*
			if (tmp.left == null)
				this.dot += tmp.value+'-- '+tmp.right.value+';'
			if (tmp.right != null && tmp.left !=null) 
				this.dot += tmp.value+'-- {'+tmp.left.value+' '+temp.right.value+'};'
			
			else if (tmp.right == null)
				this.dot += tmp.value+'-- {'+tmp.left.value+' null};'
				*/
            this.dotgen(tmp.left)
            this.dotgen(tmp.right)
        }
    }

}