import React, {useEffect, useState, Fragment} from 'react'
import { Navbar } from "./Navbar";
const API = process.env.REACT_APP_API;

var userdata = [];
  


export const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    
    const getClientes = async () => {
      let us = localStorage.getItem("userdata");
      if (us != null) {
        userdata = JSON.parse(us);
      }
      const US = userdata['CodVend'];
      const res = await fetch(`${API}/clientes/${US}`);
      const data = await res.json();
      setClientes(data);
      
    };
  
    useEffect(() => {
      getClientes();
      

    }, []);
  
    return (
      <Fragment>
        <Navbar />
      <div className="row">
        <div className='container p-4'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Vendedor</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
            {clientes.map(item => (
              <tr key={item.codigo}>
                 <td>{item.codigo}</td>
                 <td>{item.nombre}</td>
                 <td>{item.Direc1}</td>
                 <td>{item.vendedor}</td>
                 <td>{item.saldo}</td>  
              </tr>
            ))}
            </tbody>
          </table>
        </div>
       
      </div>
      </Fragment>
    );
  };
