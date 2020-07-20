import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Clientes } from "./components/Clientes";
import { Skus } from "./components/Skus";
import { Home } from "./components/Home";
import { Order } from "./components/Order";
import { Login } from "./components/Login";




function App() {
  return (
    <Router>
      
        <Switch>
          <Route path="/clientes" component={Clientes} />
          <Route path="/skus" component={Skus} />
          <Route path="/pedido" component={Order} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Login} />
        </Switch>
    </Router>
  );
}

export default App;
