export class Nodo{
    data: any
    left: Nodo
    right: Nodo
    height: number
    id:number
    constructor(data,id){
        this.data = data
        this.left = null
        this.right = null
        this.height = 0
        this.id = id
    }
}