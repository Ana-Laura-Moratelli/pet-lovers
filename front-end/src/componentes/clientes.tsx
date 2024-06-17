/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import RemovedorClienteLocal from "../removedores/removedorClienteLocal";
import BuscadorClientes from "../buscadores/buscadorClientes";
import RemovedorCliente from "../removedores/removedorCliente";
import { Link } from "react-router-dom";

type state = {
    clientes: Object[]
}
class Clientes extends Component<{}, state> {
    constructor(props) {
        super(props)
        this.state = { clientes: [] }
        this.excluirLocal = this.excluirLocal.bind(this)
    }

    public buscarClientes() {
        let buscadorClientes = new BuscadorClientes()
        const clientes = buscadorClientes.buscar()
        clientes.then(clientes => {
            this.setState({ clientes })
        })
    }

    public excluirRemoto(idCliente: string) {
        let removedor = new RemovedorCliente()
        removedor.remover({ id: idCliente })
    }

    public excluirLocal(id: string, e: any) {
        e.preventDefault()
        let removedorLocal = new RemovedorClienteLocal()
        let clientes = removedorLocal.remover(this.state.clientes, id)
        this.setState({
            clientes: clientes
        })
        this.excluirRemoto(id)
    }

    componentDidMount() {
        this.buscarClientes()
    }

    render() {
        let quantidadeClientes = this.state.clientes.length
        if (quantidadeClientes > 0) {
            let lista = this.state.clientes.map(cliente =>
                <li className="collection-item avatar" key={cliente['id']}>
                    <div className="row">
                        <div className="col s4">
                            <i className="material-icons circle blue lighten-2">person</i>
                            <span className="title">{cliente['nome']}</span>
                            <p>{cliente['nomeSocial']}</p>
                        </div>
                        <div className=" right-align">
                           
                                <Link to={`/cliente/editar/${cliente["id"]}`} className="btn-floating  waves-effect blue lighten-2">
                                    <i className="material-icons">edit</i>
                                </Link>
                          
                                <Link to={`/cliente/${cliente["id"]}`} className="btn-floating  waves-effect teal lighten-2"  style={{ margin: '0 10px' }}>
                                    <i className="material-icons">visibility</i>
                                </Link>
                            
                                <a href="#" onClick={(e) => this.excluirLocal(cliente['id'], e)} className="btn-floating  waves-effect deep-orange lighten-2">
                                    <i className="material-icons">delete</i>
                                </a>
                           
                        </div>
                    </div>
                </li>

            )
            return (
                <div>
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Clientes</h4></li>
                        {lista}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Clientes</h4></li>
                    <li className="collection-item">
                        <p>Não há clientes cadastrados.</p>
                    </li>
                </ul>
            </div>
            )
        }
    }
}
export default Clientes