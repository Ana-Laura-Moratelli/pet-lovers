import React from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Painel from './componentes/painel';
import reportWebVitals from './reportWebVitals';
import VerCliente from './componentes/detalhesCliente';
import FormularioClienteEditar from './componentes/atualizarCliente';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Painel textoApp='Pet Lovers'/>,
  },
  {
    path: "/cliente/:id",
    element: <VerCliente />,
  },
  {
    path: "/cliente/editar/:id",
    element: <FormularioClienteEditar />
  }
 
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
