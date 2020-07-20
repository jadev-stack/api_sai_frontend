import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";


const API = process.env.REACT_APP_API;

export const Pedido = () => {
  //  const order = []

  var prod = []

  const [showClientes, setShowCliente] = useState(false);
  const ClienteClose = () => setShowCliente(false);
  const ClienteShow = () => setShowCliente(true);

  const [showSku, setShowSku] = useState(false);
  const SkuClose = () => setShowSku(false);
  const SkuShow = () => setShowSku(true);





  const [clientes, setClientes] = useState([]);
  const getClientes = async () => {
    const res = await fetch(`${API}/clientes`);
    const data = await res.json();
    setClientes(data);
  };
  const [codclie, setCodClie] = useState({ codigo: "", nombre: "" });
  const selecCliente = (cod, nom) => {
    setCodClie(cod, nom);
    ClienteClose();
  };

  useEffect(() => {
    getClientes();
  }, []);
  const [skus, setSkus] = useState([]);
  const getSkus = async () => {
    const res = await fetch(`${API}/skus`);
    const data = await res.json();

    setSkus(data);

  };
  const [addsku, setAddSku] = useState({ codigo: "", nombre: "", precio: "" });
  const selecSku = (cod, nom, prec) => {
    setAddSku(cod, nom, prec);

    SkuClose();
  };
  useEffect(() => {
    getSkus();
  }, []);


  const getLinea = async (cod, nom, prec) => {

    const linea = prod.length
    prod.append({
      CodProd: cod,
      Descrip: nom,
      Precio1: prec,
      NroLinea: linea
    })
    console.log(prod);

  };

  return (
    <div className="row">
      <div className="col-md-4">
        <Button variant="primary bt-sm" onClick={ClienteShow}>
          Selecione un Cliente
            </Button>{' '}
      </div>
      <div className="col-md-6"><h3>Toma de Pedido</h3></div>
      <div className="col-md-2"></div>
      <div className="col-md-6">
        <h3>{codclie.codigo}</h3>
        <h3>{codclie.nombre}</h3></div>
      <div className="col-md-4"></div>
      <div className="col-md-2">
        <Button variant="primary" onClick={SkuShow}>
          Product
            </Button>{' '}
      </div>




      <div className="col-md-12">
        <h5>{addsku.codigo}  {addsku.nombre}  {addsku.precio}  <input type="number"></input>
          <Button variant="info" onClick={() => getLinea({ codigo: addsku.codigo, nombre: addsku.nombre, precio: addsku.precio })}>
            Add
            </Button>{' '}</h5>
      </div>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <td className="col-md-1">#</td>
            <td className="col-md-2">Codigo</td>
            <td className="col-md-3">Nombre</td>
            <td className="col-md-2">Precio</td>
            <td className="col-md-2">Cantidad</td>
            <td className="col-md-2">Total</td>
          </tr>
        </thead>
        <tbody>

          {
            prod.map(item => (
              <tr key={item.NroLinea}>
                <td>{prod.CodProd}</td>
                <td>{prod.Descrip}</td>
                <td>{prod.Precio1}</td>
                <td>{prod.NroLinea}</td>
                <td>{prod.NroLinea}</td>
              </tr>
            ))
          }

        </tbody>
      </table>

      {/* Modal Clientes */}
      <Modal
        show={showClientes}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lista de Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Saldo</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(item => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.nombre}</td>
                  <td>{item.saldo}</td>
                  <td><input type="radio" value={item.codigo} onClick={() => selecCliente({ codigo: item.codigo, nombre: item.nombre })}></input></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ClienteClose}>
            Salir
              </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal SKUS */}
      <Modal
        show={showSku}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>SKUS Disponibles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Existencia</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {skus.map(item => (
                <tr key={item.CodProd}>
                  <td>{item.CodProd}</td>
                  <td>{item.Descrip}</td>
                  <td>{item.Precio1}</td>
                  <td>{item.Existen}</td>
                  <td>
                    <input type="radio" value={item.codigo}
                      onClick={() => selecSku({ codigo: item.CodProd, nombre: item.Descrip, precio: item.Precio1 })}>
                    </input>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={SkuClose}>
            Salir
              </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};