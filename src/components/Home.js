import React, {useEffect, useState, Fragment} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faCog } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from "./Navbar";


const API = process.env.REACT_APP_API;
var userdata = [];

export const Home = () => {
    const [pedidos, setPedidos] = useState([]);
  
    
    const getPedidos = async () => {
      let us = localStorage.getItem("userdata");
      if (us != null) {
        userdata = JSON.parse(us);
      }
      const US = userdata['CodVend'];
      const res = await fetch(`${API}/pedidos/${US}`);
      const data = await res.json();
      
      setPedidos(data);
      
    };
  
    useEffect(() => {
      getPedidos();
    }, []);
    
    const printPedido = async (id) => {
      console.log('Pedido Impreso');
    };
  
    return (
      <Fragment>
        <Navbar/>
      <div className="row">
         <div className='container p-4'>
             
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th className="text-center">Documento</th>
                <th className="text-center">Fecha</th>
                <th className="text-center">Cliente</th>
                <th className="text-center">Monto</th>
                <th className="text-center"><FontAwesomeIcon className ='font-awesome' icon={faCog} size="lg" /></th>
              </tr>
            </thead>
            <tbody>
            {pedidos.map(item => (
              <tr key={item.NumeroD}>
                 <td className="text-center">{item.NumeroD}</td> 
                 <td className="text-center">{item.FechaE}</td>
                 <td className="text-left">{item.Descrip}</td>
                 <td className="text-center">{item.MtoTotal}</td>
                 <td>
                 <div className="text-center">
                <button
                      className="btn btn-danger btn-sm "
                      onClick={(e) => printPedido(item.NumeroD)}>
                      <FontAwesomeIcon className ='font-awesome' icon={faFilePdf} size="lg" />
                </button>
                  </div>  
                  </td>
              </tr>
            ))}
            </tbody>
          </table>
         
        </div>
        
      </div>
      </Fragment>
    );
  };
