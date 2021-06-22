import  Node  from './../clase-nodo-simple'

export default class BST{
    public root:Node
    public data:any
    public dot:string
    public datagraph
    public edgegraph
    public contadores:number
    public nulls:number

    constructor(){
        this.root = null
        this.dot = ''
        this.datagraph = []
        this.edgegraph = []
        this.contadores = 0
        this.nulls = 0
    }
    getRoot(){
        return this.root
    }
    insert(data){
        //let newNode = new Node(data,this.contadores)
        if(this.root != null) this.insertNode(data, this.root)
        // console.log(newNode.data)
        else {
            this.root = new Node(data,this.contadores)
            this.contadores += 1
        }
    }
    insertNode(value, node){
        //console.log("Nodos")
        //console.log(node.data, value)
        //console.log("Nodos Padre")
        if(value < node.data) {
            //console.log(value,"ES MENOR QUE",node.data )
            if(node.left != null){
                this.insertNode(value,node.left)
                // node.left.up = node
            }    
            else{
                node.left = new Node(value,this.contadores)
                this.contadores += 1
            }
                
        }else if (value > node.data){
           // console.log(value,"ES MAYOR QUE",node.data )
            //console.log(5>12)
            if(node.right != null) {
                this.insertNode(value,node.right)
                // node.right.up = node
            }
            else {
                node.right = new Node(value,this.contadores)
                this.contadores += 1
            }
        }else { /// Si hay repeticion, si no, se quita y ya
            if(node.left != null) this.insertNode(value,node.left)
            else{
                node.left = new Node(value, this.contadores)
                this.contadores += 1
            }
        }
    }
    inOrder(node){
        if(node !== null){
            //console.log("Se va a ir a la izquierda")
            this.inOrder(node.left)
            console.log("NODE DATA",node.data)
            this.datagraph.push({id:node.id,label:node.data.toString()})
            console.log("DATA",node.data)
            //console.log("Regreso de la izquierda")
            //console.log("IMPRIMIENDO EL DEL CENTRO")
            //console.log(node.data)
            //console.log("******")
            //console.log("Se va a ir a la derecha")
            
            this.inOrder(node.right)
            //console.log("Regreso de la derecha")
        }

    }
    inOrder2(node,retorno){
        if(node !== null){
            //console.log("Se va a ir a la izquierda")
            retorno = this.inOrder2(node.left,retorno)
            console.log("NODE DATA",node.data)
            this.datagraph.push({id:node.id,label:node.data.toString()})
            console.log("DATA",node.data)
            //console.log("Regreso de la izquierda")
            //console.log("IMPRIMIENDO EL DEL CENTRO")
            //console.log(node.data)
            retorno += 
            //console.log("******")
            //console.log("Se va a ir a la derecha")
            
            retorno = this.inOrder2(node.right,retorno)
            //console.log("Regreso de la derecha")
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


    dotgen(tmp) {
        if (tmp != null) {
            console.log(tmp.data)
            if(tmp.ya) {
                this.dot+=tmp.data+'[style="filled",color="turquoise"];'
                tmp.ya = false
            }

            if (tmp.left != null) this.dot += tmp.data+'--'+tmp.left.data+';'
            else {
                this.dot += 'null'+this.nulls+'[color="white", label=""];\n'
                this.dot += tmp.data+'-- null'+this.nulls+'[color="white", label=""];'
            }
            this.nulls += 1
            if (tmp.right != null) this.dot += tmp.data+'--'+tmp.right.data+';'
            else {
                this.dot += 'null'+this.nulls+'[color="white", label=""];\n'
                this.dot += tmp.data+'-- null'+this.nulls+'[color="white", label=""];'
            }
            this.nulls += 1
            this.dotgen(tmp.left)
            this.dotgen(tmp.right)
        }
    }

    dotgenarray(tmp) {
        if (tmp != null) {
            //this.nulls += 1
        
            if (tmp.left != null) {
                this.edgegraph.push({from:tmp.id, to:tmp.left.id})
              //  this.nulls += 1
            }
            if (tmp.right != null) {
                this.edgegraph.push({from:tmp.id,to:tmp.right.id})
                //this.nulls += 1
            }

			
			/*
			if (tmp.left == null)
				this.dot += tmp.value+'-- '+tmp.right.value+';'
			if (tmp.right != null && tmp.left !=null) 
				this.dot += tmp.value+'-- {'+tmp.left.value+' '+temp.right.value+'};'
			
			else if (tmp.right == null)
				this.dot += tmp.value+'-- {'+tmp.left.value+' null};'
				*/
            this.dotgenarray(tmp.left)
            this.dotgenarray(tmp.right)
        }
    }

}