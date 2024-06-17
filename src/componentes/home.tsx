import { Component } from "react";

type Props = {
    tema: string
}

type Cliente = {
    nome: string,
    quantidade: number,
    preco: number,
};

const clientes: Cliente[] = [
    { nome: 'Cliente 1', quantidade: 10, preco: 1000 },
    { nome: 'Cliente 2', quantidade: 9, preco: 900 },
    { nome: 'Cliente 3', quantidade: 8, preco: 800 },
    { nome: 'Cliente 4', quantidade: 7, preco: 700 },
    { nome: 'Cliente 5', quantidade: 6, preco: 600 },
    { nome: 'Cliente 6', quantidade: 5, preco: 500 },
    { nome: 'Cliente 7', quantidade: 4, preco: 400 },
    { nome: 'Cliente 8', quantidade: 3, preco: 300 },
    { nome: 'Cliente 9', quantidade: 2, preco: 200 },
    { nome: 'Cliente 10', quantidade: 1, preco: 100 },
]; 

type Produto = {
    nome: string,
    quantidade: number,
    tipo: string,
    raca: string,
};

const produtos: Produto[] = [
    { nome: 'Ração para Cães', quantidade: 10, tipo: 'cachorro', raca: 'shihtzu' },
    { nome: 'Ração para Gatos', quantidade: 9, tipo: 'gato', raca: 'siamês'},
    { nome: 'Cama para Cães', quantidade: 8, tipo: 'cachorro', raca: 'shihtzu'},
];
export default class ListaCliente extends Component<Props> {
    render() {
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Top 10 clientes que mais consumiram produtos em quantidade</h2>
                <div className="list-group mb-3">
                {clientes.slice(0, 10).map((cliente, index) => (
                    <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>{cliente.nome}</span>
                        <span>Quantidade: {cliente.quantidade}</span>
                    </button>
                ))}
                </div>
                <h2 className="fs-4 mt-3">Top 05 clientes que mais consumiram produtos em valor</h2>
                <div className="list-group mb-3">
                {clientes.slice(0, 5).map((cliente, index) => (
                    <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>{cliente.nome}</span>
                        <span>R$ {cliente.preco.toFixed(2)}</span>
                    </button>
                ))}
            </div>
               
                <h2 className="fs-4 mt-3">Produtos mais consumidos</h2>
                <div className="list-group mb-3">
                    {produtos.map((produto, index) => (
                        <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <span>{produto.nome}</span>
                            <span>Quantidade: {produto.quantidade}</span>
                        </button>
                    ))}
                </div>
                <h2 className="fs-4 mt-3">Produtos mais consumidos por tipo de Pet</h2>
                <div className="list-group mb-3">
                    {produtos.map((produto, index) => (
                        <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                           <div className="d-flex flex-column">
                            <span>{produto.nome}</span>
                            <span>Tipo: {produto.tipo}</span>
                        </div>
                        <span className="ms-auto">Quantidade: {produto.quantidade}</span>
                        </button>
                    ))}
                </div>
                <h2 className="fs-4 mt-3">Produtos mais consumidos por raça do Pet</h2>
                <div className="list-group mb-3">
                    {produtos.map((produto, index) => (
                        <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                           <div className="d-flex flex-column">
                            <span>{produto.nome}</span>
                            <span>Tipo: {produto.raca}</span>
                        </div>
                        <span className="ms-auto">Quantidade: {produto.quantidade}</span>
                        </button>
                    ))}
                </div>
            </div>   
        )
    }
}
