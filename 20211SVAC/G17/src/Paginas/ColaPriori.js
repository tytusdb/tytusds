import React, { useState, useRef } from "react";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from "@material-ui/icons/Save";
import CachedIcon from '@material-ui/icons/Cached';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Graph from "react-graph-vis";


class Nodo {
    constructor(valor, siguiente, priori) {
      this.valor = valor;
      this.sig = siguiente;
      this.priorida = priori;
    }
  }
  
  class cola_Prioridad {
    constructor() {
      this.head = null;
      this.size = 0;
    }
  
    encolar(valor, priori) {
      var new_nod = new Nodo(valor, null, priori);
      if (this.head === null) {
        this.head = new_nod;
      } else {
        var tmp_nod = this.head;
        if (this.head == null || this.head.priorida >= new_nod.priorida) {
          new_nod.sig = this.head;
          this.head = new_nod;
        } else {
          while (tmp_nod.sig != null && tmp_nod.sig.priorida < new_nod.priorida)
            tmp_nod = tmp_nod.sig;
  
          new_nod.sig = tmp_nod.sig;
          tmp_nod.sig = new_nod;
        }
        
      }
      this.printlist();
      this.size++;
      
    }

    descolar(){
        if(this.head === null){
            console.log("cola vacia");
        }else if(this.head.sig === null){
            this.head = null;
            console.log("cola vacia");
        }else{
            this.head = this.head.sig;
        }
        this.printlist();
    }

    editar(valor,new_valor){
      if(this.head !== null){
        var tmp = this.head;
        if(this.size == 1){
          if(tmp.valor === valor){
            tmp.valor = new_valor;
          }
        }else{
          while(tmp.sig !== null){
            if(tmp.valor === valor){
              tmp.valor = new_valor;
              break;
            }
            tmp = tmp.sig;
          }
        }
        
      }
      this.printlist();
    }

    printlist() {
      var list_gra = [];
      let tmp_Nod = this.head;
      if (this.size === 0) {
        return ;
      } else if (this.size === 1) {
        list_gra.push(String(this.head.valor) + "-> null");
      } else {
        while (tmp_Nod.sig != null) {
          list_gra.push(
            String(tmp_Nod.valor) + " -> " + String(tmp_Nod.sig.valor)
          );
          tmp_Nod = tmp_Nod.sig;
        }
        list_gra.push(String(tmp_Nod.valor) + " ->  null");
      }
      console.log(list_gra);
      return list_gra;
    }
  };
  
// opciones del grafo
const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};
  

const ColaPriori = () =>{
  var new_cola = new cola_Prioridad();
  var Valueref = useRef("");
  var txtpriority = useRef("");
  var txtUpdate = useRef("");

  const [state, setState] = useState({
      graph: {
        nodes: [],
        edges: []
      },
    });
  
  const { graph, events } = state;
    // retorna el valor del jtexfield
  const txtValue = () => {
    return parseInt(Valueref.current.value);
  };


  const txtPriori =() =>{
    return parseInt(txtpriority.current.value)
  }
  const txtnewValue=()=>{
    return parseInt(txtUpdate.current.value)
  }
    return (
        <div id={"contenido"}>
        <div id={"contol"}>
          <form className=" " noValidate autoComplete="off">
            <div className="center-align  ">
              <TextField id="txt_val" label="Valor" inputRef={Valueref} />
              <TextField id="txt_val" label="Prioridad" inputRef={txtpriority} />
              <Tooltip title="Agregar a cola">
                <Fab color="primary" onClick={() => {new_cola.encolar(txtValue(),txtPriori())}}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Quitar de cola">
                <Fab
                  color="secondary" onClick={() => {new_cola.descolar()}}>
                  <RemoveCircleOutlineIcon />
                </Fab>
              </Tooltip>
              <TextField id="txt_val" label="Nuevo Valor" inputRef={txtUpdate} />
              <Tooltip title="Actualizar">
                <Fab
                  color="primary" onClick={() => {new_cola.editar(txtValue(),txtnewValue())}}>
                 <CachedIcon />
                </Fab>
              </Tooltip>

              <Tooltip title="Cargar JSON">
                <Fab color="primary">
                  <CloudUploadIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Guardar JSON">
                <Fab color="primary" aria-label="add">
                  <SaveIcon />
                </Fab>
              </Tooltip>
              
            </div>
          </form>
        </div>
        <div className=""> </div>
        <p>Lista Simple : </p>
        <Graph
          graph={graph}
          options={options}
          style={{ height: "640px" }}
        />
  
      </div>
    );
  };

export default ColaPriori;
