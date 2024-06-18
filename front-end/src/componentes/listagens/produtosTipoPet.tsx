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
    tipo: string,
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

type ProdutoConsumidoPorPetTipo = {
    tipoPet: string,
    produto: Produto,
    totalQuantidade: number
};

export default class ProdutosTipoPet extends Component<Props, State> {
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

    getProdutosMaisConsumidosPorTipoPet = (): ProdutoConsumidoPorPetTipo[] => {
        const { pets, produtos, produtosConsumidos } = this.state;
        const produtoConsumosPorTipoPet: { [key: string]: { [key: number]: number } } = {};

        produtosConsumidos.forEach(pc => {
            const pet = Object.values(pets).flat().find(p => p.id === pc.petId);
            if (pet) {
                if (!produtoConsumosPorTipoPet[pet.tipo]) {
                    produtoConsumosPorTipoPet[pet.tipo] = {};
                }
                if (!produtoConsumosPorTipoPet[pet.tipo][pc.produtoId]) {
                    produtoConsumosPorTipoPet[pet.tipo][pc.produtoId] = 0;
                }
                produtoConsumosPorTipoPet[pet.tipo][pc.produtoId] += pc.quantidade;
            }
        });

        const produtosConsumidosPorTipoPet: ProdutoConsumidoPorPetTipo[] = [];

        for (const tipoPet in produtoConsumosPorTipoPet) {
            for (const produtoId in produtoConsumosPorTipoPet[tipoPet]) {
                const produto = produtos.find(p => p.id === parseInt(produtoId));
                if (produto) {
                    produtosConsumidosPorTipoPet.push({
                        tipoPet,
                        produto,
                        totalQuantidade: produtoConsumosPorTipoPet[tipoPet][produtoId]
                    });
                }
            }
        }

        return produtosConsumidosPorTipoPet.filter(pct => pct.totalQuantidade > 0).sort((a, b) => b.totalQuantidade - a.totalQuantidade);
    }

    render() {
        const produtosMaisConsumidosPorTipoPet = this.getProdutosMaisConsumidosPorTipoPet();

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Produtos Mais Consumidos por Tipo de Pet</h2>
                {produtosMaisConsumidosPorTipoPet.length === 0 ? (
                    <div className="list-group-item">Nenhum produto consumido encontrado</div>
                ) : (
                    produtosMaisConsumidosPorTipoPet.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="fs-5">Tipo de Pet: {item.tipoPet}</h3>
                            <div className="list-group">
                                <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>Produto: {item.produto.nome}</span>
                                    <span>Total Consumido: {item.totalQuantidade}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )
    }
}
