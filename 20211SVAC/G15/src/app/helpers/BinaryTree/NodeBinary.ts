export class NodeBinary{
    private numero:number|string
    private id:number
    private left:NodeBinary
    private right:NodeBinary
    private estructura:any

    


    constructor(numero:number|string,id:number){
        this.numero = numero
        this.id = id
        this.left = null 
        this.right = null
        
    }

    public setNumero(numero:number|string){
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

    public getEstructura(): any {
        return this.estructura;
    }

    public setEstructura(estructura: any): void {
        this.estructura = estructura;
    }

}