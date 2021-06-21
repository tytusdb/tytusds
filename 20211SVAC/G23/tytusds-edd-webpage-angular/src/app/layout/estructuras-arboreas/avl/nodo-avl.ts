export class Nodo{
    value: any
    size: number
    left: Nodo
    right: Nodo
    height: number
    id:number
    ya:boolean
    constructor(val,height,size){
        this.value = val
        this.size = size
        this.height = height
        this.right = null
        this.left = null
        this.ya = false
    }
}