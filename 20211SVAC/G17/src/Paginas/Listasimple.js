import React from "react";


const ListaSimple = () =>{

    return (
    <div id={"contenido"}>
        <div id={"contol"}>
            <table id={"controles"}>
                <td>
                    <input type={"text"} size={"10"}/>
                </td>
                <td>
                    <input type={"Button"}value={"Agregar"}/>
                </td>
                <td>
                    <input type={"Button"}value={"Eliminar"}/>
                </td>
                <td>
                    <input type={"Button"}value={"Buscar"}/>
                </td>
            </table>

        </div>
        <div>
            <h3>Aquí va la lista simple</h3>
        </div>
    </div>

    );
}

export default ListaSimple;