import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import {  useHistory } from "react-router-dom";
import { Navbar } from "./Navbar";

const API = process.env.REACT_APP_API;
var userdata = [];



export const Order = () => {

  const [showClientes, setShowCliente] = useState(false);
  const ClienteClose = () => setShowCliente(false);
  const ClienteShow = () => setShowCliente(true);
  const history = useHistory();

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({ Codigo: "", Nombre: "", Direc1: "" });

  const getClientes = async () => {
    const US = userdata['CodVend'];
    const res = await fetch(`${API}/clientes/${US}`);
    const data = await res.json();
    setClientes(data);
    localStorage.removeItem('pedido');
  };
  useEffect(() => {
    let data = localStorage.getItem("userdata");
    if (data != null) {
      userdata = JSON.parse(data);
    }
    getClientes();
  }, []);



  const [showSku, setShowSku] = useState(false);
  const SkuClose = () => setShowSku(false);
  const SkuShow = () => setShowSku(true);
  const [skus, setSkus] = useState([]);
  const getSkus = async () => {
    const res = await fetch(`${API}/skus`);
    const data = await res.json();
    setSkus(data);
  };

  const [cantPedir, setcantPedir] = useState("");
  const [montoTotal, setMontoTotal] = useState(245);
  const [prod, setProd] = useState({ Codigo: "", Nombre: "", Existen: "", Precio: "", CostAct: "" })

  const [itemsPedido, setItemsPedido] = useState([]);
  useEffect(() => {
    getSkus();
  }, []);

  const send = () => {
    var existing = localStorage.getItem('pedido');
    existing = existing ? JSON.parse(existing) : ([]);
    var linea = existing.length + 1;
    existing.push({
      NroLinea: linea,
      Descrip1: prod.Nombre,
      CodItem: prod.Codigo,
      Existen: parseFloat(prod.Existen),
      Precio: parseFloat(prod.Precio),
      CodVend: String(userdata['CodVend']),
      Costo: parseFloat(prod.CostAct),
      ExistAnt: parseFloat(prod.Existen),
      Cantidad: parseFloat(cantPedir),
      TotalItem: cantPedir * prod.Precio
    });
    localStorage.setItem('pedido', JSON.stringify(existing));
    let data = localStorage.getItem("pedido");
    if (data != null) {
      var Pedido = JSON.parse(data)
      setItemsPedido(Pedido);
      let Total = 0;
      Pedido.map(item => (
        Total = Total + item.TotalItem
      ));

      setMontoTotal(Total);
    }
  };
  const orders = async () => {

    var Order = {
      "order": [
        {
          "CodClie": cliente.Codigo,
          "CodVend": String(userdata['CodVend']),
          "Descrip": cliente.Nombre,
          "Direc1": cliente.Direc1,
          "MtoTotal": montoTotal,
          "items": itemsPedido
        }
      ]
    }

    const res = await fetch(`${API}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Order),
    });
    await res.json();
    if (res.ok === true) {
      localStorage.removeItem('pedido');
      history.push("/home");
    }



  };


  return (
    <Fragment>
      <Navbar />
      <div className="row">

        {/* LEFT HAND */}
        <div className="col-md-6">
          <div className="container">
            <h4 className="bg-primary text-white text-center mt-3 p-4">
              CREA UN NUEVO PEDIDO
                   </h4>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-6">
                  <Button variant="info bt-sm" onClick={ClienteShow}>
                    Selecione un Cliente
                                  </Button>{' '}
                </div>
                <div className="col-md-6">
                  {cliente.Codigo !== "" ? (
                    <Button variant="info bt-sm" className="float-right" onClick={SkuShow}>
                      Add Producto
                    </Button>


                  ) : (
                      <p className="text-center mt-4 float-right">Escoja un Cliente</p>
                    )
                  }

                </div>
              </div>
            </div>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-12 card card-body">
                  <h4>{cliente.Codigo}</h4>
                  <h4>{cliente.Nombre}</h4>
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <div className="row">
                <Form className="card card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="mt-3">Descripción:</label>
                        <input type="text" id="nameProd" className="form-control"
                          value={prod.Nombre}

                          disabled />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label >Codigo:</label>
                        <input type="text" name="codProd" className="form-control"
                          value={prod.Codigo}
                          disabled />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Precio:</label>
                        <input type="text" name="precProd" className="form-control"
                          value={prod.Precio}
                          disabled />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Existencia:</label>
                        <input type="text" name="existProd" className="form-control" value={prod.Existen} disabled />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Cantidad a Pedir:</label>
                        <input type="number" id="cantPedir" className="form-control"
                          onChange={(e) => setcantPedir(e.target.value)}
                          value={cantPedir} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        {prod.Codigo !== "" ? (
                          <Button variant="info bt-sm" className="float-right mt-4" onClick={send}>
                            Add
                          </Button>


                        ) : (
                            <p className="text-center mt-4 float-right">Seleccione un SKU</p>
                          )
                        }


                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HAND */}

        <div className="col-md-6">
          <div className="container">
            <h4 className="bg-primary text-white text-center mt-3 p-4">
              Items del Pedido
            </h4>
          </div>
          <div className="row">
            <div className="container">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsPedido.map(item => (
                        <tr key={item.NroLinea}>
                          <td className="text-center">{item.CodItem}</td>
                          <td >{item.Descrip1}</td>
                          <td className="text-center">{item.Precio}</td>
                          <td className="text-center">{item.Cantidad}</td>
                          <td className="text-center">{item.TotalItem}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {Object.keys(itemsPedido).length === 0 ? (

                  <h4 className="mt-4">Agregue Productos</h4>
                ) : (
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <h3>Total Pedido: {montoTotal} $</h3>
                        </div>

                        <div className="col-md-6">
                          <Button variant="info bt-sm" className="float-right" onClick={orders} type="submit">
                            Enviar
                </Button>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal Clientes */}

      <Modal
        show={showClientes}
        size="lg"
        onHide={ClienteClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
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
                  <td>
                    <div className="form-check">
                      <input type="radio" value={item.codigo} onClick={() => {
                        setCliente({ Codigo: item.codigo, Nombre: item.nombre, Direc1: item.Direc1 });
                        ClienteClose();
                      }}></input>
                    </div>
                  </td>
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
                    <div className="form-check">
                      <input type="radio" value={item.codigo} onClick={() => {
                        setProd({
                          Codigo: item.CodProd, Nombre: item.Descrip,
                          Precio: item.Precio1, Existen: item.Existen, CostAct: item.CostAct
                        });
                        setcantPedir(1);
                        SkuClose();
                      }
                      }>
                      </input>
                    </div>
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
    </Fragment>

  )
}