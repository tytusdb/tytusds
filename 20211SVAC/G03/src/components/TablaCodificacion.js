import React from 'react'
import MUIDataTable from "mui-datatables";
/* 
const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
]; */

const options = {
  filterType: 'checkbox',
};

export default function TablaCodificacion(props) {
    let data = props.estructura.graficardatos()
    let columns = props.estructura.graficarencabezados()
    return (
        <div>
                <MUIDataTable 
                title={props.nombre} 
                data={data} 
                columns={columns} 
                options={options} 
                />
        </div>
    )
}
