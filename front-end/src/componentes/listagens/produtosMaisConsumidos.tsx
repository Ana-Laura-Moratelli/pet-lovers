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

type ProdutoConsumidoTotal = {
    produto: Produto,
    totalQuantidade: number
};

export default class ProdutosMaisConsumidos extends Component<Props, State> {
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

    getProdutosMaisConsumidos = (): ProdutoConsumidoTotal[] => {
        const { produtos, produtosConsumidos } = this.state;
        const produtoConsumos: { [key: number]: number } = {};

        produtosConsumidos.forEach(pc => {
            if (!produtoConsumos[pc.produtoId]) {
                produtoConsumos[pc.produtoId] = 0;
            }
            produtoConsumos[pc.produtoId] += pc.quantidade;
        });

        const produtosConsumidosTotais: ProdutoConsumidoTotal[] = produtos.map(produto => ({
            produto,
            totalQuantidade: produtoConsumos[produto.id] || 0
        }));

        return produtosConsumidosTotais.filter(pct => pct.totalQuantidade > 0).sort((a, b) => b.totalQuantidade - a.totalQuantidade);
    }

    render() {
        const produtosMaisConsumidos = this.getProdutosMaisConsumidos();

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Produtos Mais Consumidos</h2>
                <div className="list-group mb-3">
                    {produtosMaisConsumidos.length === 0 ? (
                        <div className="list-group-item">Nenhum produto consumido encontrado</div>
                    ) : (
                        produtosMaisConsumidos.map(produtoConsumido => (
                            <div key={produtoConsumido.produto.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>Produto: {produtoConsumido.produto.nome}</span>
                                <span>Total Consumido: {produtoConsumido.totalQuantidade}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}
