import { Component } from "react";
import axios from 'axios';

type Props = {
    tema: string
}

type State = {
    clientes: Cliente[],
    pets: { [key: number]: Pet[] },
    produtos: Produto[],
    produtosConsumidos: ProdutoConsumido[]
};

type Cliente = {
    id: number,
    nome: string
};

type Pet = {
    id: number,
    nome: string,
    clienteId: number
};

type Produto = {
    id: number,
    nome: string,
    preco: number
};

type ProdutoConsumido = {
    id: number,
    clienteId: number,
    petId: number,
    produtoId: number,
    quantidade: number
};

type ClienteConsumido = {
    cliente: Cliente,
    totalValor: number
};

export default class ListaConsumidosValor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [],
            pets: {},
            produtos: [],
            produtosConsumidos: []
        };
    }

    componentDidMount() {
        this.fetchClientes();
        this.fetchProdutos();
        this.fetchProdutosConsumidos();
    }

    fetchClientes = () => {
        axios.get('http://localhost:5000/clientes')
            .then(response => {
                this.setState({ clientes: response.data });
                response.data.forEach((cliente: Cliente) => {
                    this.fetchPets(cliente.id);
                });
            })
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }

    fetchPets = (clienteId: number) => {
        axios.get(`http://localhost:5000/clientes/${clienteId}/pets`)
            .then(response => {
                this.setState(prevState => ({
                    pets: { ...prevState.pets, [clienteId]: response.data }
                }));
            })
            .catch(error => console.error('Erro ao buscar pets:', error));
    }

    fetchProdutos = () => {
        axios.get('http://localhost:5000/produtos')
            .then(response => {
                this.setState({ produtos: response.data });
                console.log('Produtos:', response.data);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    fetchProdutosConsumidos = () => {
        axios.get('http://localhost:5000/produtos-consumidos')
            .then(response => {
                this.setState({ produtosConsumidos: response.data });
                console.log('Produtos Consumidos:', response.data);
            })
            .catch(error => console.error('Erro ao buscar produtos consumidos:', error));
    }

    getTop5ClientesPorValor = (): ClienteConsumido[] => {
        const { clientes, produtosConsumidos, produtos } = this.state;
        const clienteConsumos: { [key: number]: number } = {};

        produtosConsumidos.forEach(pc => {
            const produto = produtos.find(p => p.id === pc.produtoId);
            if (produto) {
                if (!clienteConsumos[pc.clienteId]) {
                    clienteConsumos[pc.clienteId] = 0;
                }
                clienteConsumos[pc.clienteId] += pc.quantidade * produto.preco;
            }
        });

        const clientesConsumidos: ClienteConsumido[] = clientes.map(cliente => ({
            cliente,
            totalValor: clienteConsumos[cliente.id] || 0
        })).filter(clienteConsumido => clienteConsumido.totalValor > 0);

        return clientesConsumidos.sort((a, b) => b.totalValor - a.totalValor).slice(0, 5);
    }

    render() {
        const top5Clientes = this.getTop5ClientesPorValor();

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Top 5 Clientes que mais Consumiram Produtos em Valor</h2>
                <div className="list-group mb-3">
                    {top5Clientes.length === 0 ? (
                        <div className="list-group-item">Nenhum cliente encontrado</div>
                    ) : (
                        top5Clientes.map(clienteConsumido => (
                            <div key={clienteConsumido.cliente.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>Cliente: {clienteConsumido.cliente.nome}</span>
                                <span>Total Consumido em Valor: R${clienteConsumido.totalValor.toFixed(2)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}
