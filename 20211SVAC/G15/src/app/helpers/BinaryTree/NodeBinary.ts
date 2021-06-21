export class NodeBinary{
    private numero:number
    private id:number
    private left:NodeBinary
    private right:NodeBinary

    constructor(numero:number,id:number){
        this.numero = numero
        this.id = id
        this.left = null 
        this.right = null
    }

    public setNumero(numero:number){
        this.numero = numero
    }
    
    public setId(id:number){
        this.id = id 
    }

    public setLeft(nodo:NodeBinary){
        this.left = nodo 
    }

    public setRight(nodo:NodeBinary){
        this.right = nodo
    }


    public getNumero(){
        return this.numero
    }

    public getId(){
        return this.id 
    }

    public getLeft(){
        return this.left
    }

    public getRight(){
        return this.right
    }

}