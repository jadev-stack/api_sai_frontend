import React, { Fragment } from 'react'
import { Link } from "react-router-dom";


export const  Navbar = () => {
  var userdata = [];
  let data = localStorage.getItem("userdata");
  if (data != null) {
        userdata = JSON.parse(data);
      } 

  return(
    <Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/home">Euromobil NE</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
              <li className="nav-item">
          <Link className="nav-link" to="/clientes">Clientes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/skus">SKU</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pedido">Pedido</Link>
        </li>
      </ul>
    </div>
  <p>{userdata['userVend']}</p>
  </nav>
  </Fragment>
)
}