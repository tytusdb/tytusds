import { HashNode } from './hash';
import { DataNode } from './nodo-merkle';

export class Merkle {
    public tophash
    public datablock
    public dot
    public index

    constructor() {
      this.tophash = null
      this.datablock = []    
      this.dot = ''
      this.index = 0
    }
  
    add(value) {
      this.datablock.push(new DataNode(value))
    }
  
    createTree(exp) {
      this.tophash = new HashNode(0)
      this._createTree(this.tophash, exp )
    }
  
    _createTree(tmp, exp) {
      if (exp > 0) {
        tmp.left = new HashNode(0)
        tmp.right = new HashNode(0)
        this._createTree(tmp.left, exp - 1)
        this._createTree(tmp.right, exp - 1)
      }
    }
  
    genHash(tmp, n) { // postorder
      if (tmp != null) {
        this.genHash(tmp.left, n)
        this.genHash(tmp.right, n)
        
        if (tmp.left == null && tmp.right == null) {
          tmp.left = this.datablock[n-this.index--]
          tmp.hash = (tmp.left.value*1000).toString(16)
        } else {
          tmp.hash = (parseInt(tmp.left.hash, 16)+parseInt(tmp.right.hash, 16)).toString(16)
        }      
      }
    }
  
    preorder(tmp) {
      if (tmp != null) {
        if (tmp instanceof DataNode) {
          document.getElementById("log").innerHTML+='DB:'+tmp.value+' '
        } else {
          document.getElementById("log").innerHTML+=tmp.hash+' '
        }
        this.preorder(tmp.left)
        this.preorder(tmp.right)
      }
    }
  
    auth() {
      var exp = 1
      while (Math.pow(2, exp) < this.datablock.length) {
        exp += 1
      }
      for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
        this.datablock.push(new DataNode(i*100))
      }
      this.index = Math.pow(2, exp)
      this.createTree(exp)
      this.genHash(this.tophash, Math.pow(2, exp))
      this.preorder(this.tophash)    
    }
  
    show() {
      this.datablock.forEach(element => document.getElementById("log").innerHTML+=element.value+' ');
    }
  
    dotgen(tmp) {
      if (tmp != null) {
        if (tmp.left != null){
          if (tmp.left instanceof DataNode) {
            this.dot += '"'+tmp.left.value+'" [color=gray] -> "0x'+tmp.hash+'";'
          }
        }
        if (tmp.left instanceof HashNode) {
          if (tmp.left != null) this.dot += '"0x'+tmp.left.hash+'" -> "0x'+tmp.hash+'";'
          if (tmp.right != null) this.dot += '"0x'+tmp.right.hash+'" -> "0x'+tmp.hash+'";'
        }
        this.dotgen(tmp.left)
        this.dotgen(tmp.right)
      }
    }
  }
  