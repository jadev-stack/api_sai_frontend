import React, {useEffect, useState, Fragment} from 'react'
import { Navbar } from "./Navbar";
const API = process.env.REACT_APP_API;


export const Skus = () => {
    const [skus, setSkus] = useState([]);
  
    
    const getSkus = async () => {
      const res = await fetch(`${API}/skus`);
      const data = await res.json();
      
      setSkus(data);
      
    };
  
    useEffect(() => {
      getSkus();
    }, []);
  
    return (
      <Fragment>
      <Navbar/>
      <div className="row">
        <div className='container p-4'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Existencia</th>
              </tr>
            </thead>
            <tbody>
            {skus.map(item => (
              <tr key={item.CodProd}>
                 <td>{item.CodProd}</td>
                 <td>{item.Descrip}</td>
                 <td>{item.Precio1}</td>
                 <td>{item.Existen}</td>  
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        
      </div>
      </Fragment>
    );
  };
