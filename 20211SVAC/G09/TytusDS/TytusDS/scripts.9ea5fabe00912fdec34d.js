class Nodo{constructor(e,t){this.data=e,this.next=t}}class listaSimple{constructor(){this.head=null,this.size=0}add(e){const t=new Nodo(e,null);if(this.head){let e=this.head;for(;e.next;)e=e.next;e.next=t}else this.head=t;this.size++}delete(e){let t,i=this.head;if(e!=i.data)for(;null!=i;){if(t=i.next,console.log(i.data+"  "+t.data),t.data==e){t=t.next,i.next=t,this.size--;break}i=i.next}else this.head=i.next}refresh(e,t){let i=this.head;for(;null!=i.next;){if(i.data==e)return void(i.data=t);i=i.next}}search(e){let t=this.head;for(;null!=t.next;){if(t.data==e)return!0;t=t.next}return!1}cargar(){}guardar(){}print(){var e=[];let t=this.head;for(;null!=t;)e.push(t.data),t=t.next;return e}}const listSimple=new listaSimple;function lsimpleAdd(e){return listSimple.add(e),listSimple.print()}function lsimpleDelete(e){listSimple.delete(e)}function lsimpleRefresh(e,t){listSimple.refresh(e,t)}function lsimpleSearch(e){return listSimple.search(e)}function lsimpleCargar(e){listSimple.cargar()}function lsimpleGuardar(e){listSimple.guardar()}function lsimplePrint(){return print()}