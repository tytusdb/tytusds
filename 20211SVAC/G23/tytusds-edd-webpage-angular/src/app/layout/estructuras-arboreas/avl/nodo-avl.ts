export class Nodo{
    data: any
    left: Nodo
    right: Nodo
    height: number
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
        this.height = 0
    }
}