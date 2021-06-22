import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import CachedIcon from "@material-ui/icons/Cached";
import SearchIcon from "@material-ui/icons/Search";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Graph from "react-graph-vis";


//clase nodo
class Nodo {
  constructor(valor, siguiente) {
    this.value = valor;
    this.next = siguiente;
  }
}

//classe lista simple
class lista_simple {
  constructor() {
    this.root = null;
    this.end = null;
    this.size = 0;
  }

  add_fin(valor) {
    let new_nodo = new Nodo(valor, null);

    if (this.root === null) {
      this.root = this.end = new_nodo;
    } else {
      this.end.next = new_nodo;
      this.end = new_nodo;
    }
    this.size++;
  }

  add_ini(valor) {
    let new_nodo = new Nodo(valor, null);
    if (this.root === null) {
      this.root = this.end = new_nodo;
    } else {
      new_nodo.next = this.root;
      this.root = new_nodo;
    }
    this.size++;
  }

  add_order(valor) {
    let new_nodo = new Nodo(valor, null);
    if (this.root === null) {
      this.root = this.end = new_nodo;
    } else {
      var tmp = this.root;
      if (this.root == null || this.root.value >= new_nodo.value) {
        new_nodo.next = this.root;
        this.root = new_nodo;
      } else {
        while (tmp.next != null && tmp.next.value < new_nodo.value)
          tmp = tmp.next;
        
        new_nodo.next = tmp.next;
        tmp.next = new_nodo;
      }
    }
    this.size++;
  }

  delete_nod(valor) {
    var temp_n = this.root;
    if(this.root !== null){
      if(this.size == 1){
        if(temp_n.value == valor){
          this.root = null;
        }
        return;
      }else{
        while(temp_n.next != null){
          if(temp_n.next.value == valor){
            temp_n = temp_n.next.next
          }
        }
      }
    }
  }

  ver_lista() {
    var list_gra = [];
    var tmp_Nod = this.root;
    if (this.size === 0) {
      return;
    } else if (this.size === 1) {
      list_gra.push(String(tmp_Nod.value)+"-> null");
    } else {
      while (tmp_Nod.next != null) {
        list_gra.push(String(tmp_Nod.value)+" -> "+String(tmp_Nod.next.value));
        tmp_Nod = tmp_Nod.next;
      }
      list_gra.push(String(tmp_Nod.value)+" ->  null");
    }
    console.log(list_gra);
    return list_gra;
  }

  nodes_list() {
    var n_list = [];
    let tmp_Nod = this.root;
    if (this.size === 0) {
      return;
    } else if (this.size === 1) {
      n_list.push({ id: tmp_Nod.value, label: "null" });
    } else {
      while (tmp_Nod !== this.end) {
        n_list.push({ id: tmp_Nod.value, label: tmp_Nod.value });
        tmp_Nod = tmp_Nod.next;
      }
      n_list.push({ id: tmp_Nod.value, label: tmp_Nod.value });
    }
    return n_list;
  }

  edges_list() {
    var e_list = [];
    let tmp_Nod = this.root;
    if (this.size === 0) {
      return;
    } else if (this.size === 1) {
      e_list.push({ from: tmp_Nod.value, to: "null" });
    } else {
      while (tmp_Nod !== this.end) {
        e_list.push({ from: tmp_Nod.value, to: tmp_Nod.next.value});
        tmp_Nod = tmp_Nod.next;
      }
      e_list.push({ from: tmp_Nod.value, to: "null" });
    }
    return e_list;
  }

}

const useStyles = makeStyles((theme) => ({
  Fab: {
    margin: theme.spacing(3),
    width: "10",
    textAlign: "center",
    justifyContent: "space-between",
  },
}));

// opciones del grafo
const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

const ListaSimple = () => {
  const tmp_list = new lista_simple(); //inicialice una nueva lista
  const classes = useStyles(); //esto venia con los botones
  var Valueref = useRef(""); //para el textfield

  const update_graph = () => {
    setState(({ graph: { nodes, edges } }) => {
      //const nodes_li = Object.values(tmp_list.nodes_list()) ;
      //const edges_li = Object.values(tmp_list.edges_list());
      return {
        graph: {
          nodes: [],
          edges: [],
        },
      };
    });
  };

  const [state, setState] = useState({
    graph: {
      nodes: [],
      edges: [],
    },
  });

  const { graph, events } = state;

  // retorna el valor del texfield
  const txtValue = () => {
    return parseInt(Valueref.current.value);
  };

  return (
    <div id={"contenido"}>
      <div id={"contol"}>
        <form className=" " noValidate autoComplete="off">
          <div className="center-align  ">
            <TextField id="txt_val" label="Valor" inputRef={Valueref} />
            <Tooltip title="Agregar al inicio">
              <Fab color="primary" onClick={()=>{tmp_list.add_ini(txtValue())}}>
                <FirstPage />
              </Fab>
            </Tooltip>
            <Tooltip title="Agregar al Final">
              <Fab
                color="primary"
                onClick={() => {
                  tmp_list.add_fin(txtValue())
                }}
              >
                <LastPageIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Agregar en orden">
              <Fab
                color="primary"
                onClick={() => {
                  tmp_list.add_order(txtValue())
                }}
              >
                <FormatListNumberedIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Eliminar">
              <Fab
                color="secondary"
                onClick={() => {
                  tmp_list.delete_nod(txtValue());
                }}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Buscar">
              <Fab color="primary"onClick={()=>{tmp_list.ver_lista()}}>
                <SearchIcon />
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
            <TextField
              id="txt_update"
              label="Nuevo Valor"
              inputRef={Valueref}
            />

            <Tooltip title="Actualizar">
              <Fab
                color="primary"
                type="submit"
                onClick={() => {
                  tmp_list.add_fin(txtValue());
                }}
              >
                <CachedIcon />
              </Fab>
            </Tooltip>
          </div>
        </form>
      </div>
      <div className=""> </div>
      <p>Lista Simple : </p>
      <Graph graph={graph} options={options} style={{ height: "640px" }} />
    </div>
  );
};

export default ListaSimple;
