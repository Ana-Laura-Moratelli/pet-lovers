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
    raca: string,
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

type ProdutoConsumidoPorPetRaca = {
    racaPet: string,
    produto: Produto,
    totalQuantidade: number
};

export default class ProdutosRacaPet extends Component<Props, State> {
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

    getProdutosMaisConsumidosPorRacaPet = (): ProdutoConsumidoPorPetRaca[] => {
        const { pets, produtos, produtosConsumidos } = this.state;
        const produtoConsumosPorRacaPet: { [key: string]: { [key: number]: number } } = {};

        produtosConsumidos.forEach(pc => {
            const pet = Object.values(pets).flat().find(p => p.id === pc.petId);
            if (pet) {
                if (!produtoConsumosPorRacaPet[pet.raca]) {
                    produtoConsumosPorRacaPet[pet.raca] = {};
                }
                if (!produtoConsumosPorRacaPet[pet.raca][pc.produtoId]) {
                    produtoConsumosPorRacaPet[pet.raca][pc.produtoId] = 0;
                }
                produtoConsumosPorRacaPet[pet.raca][pc.produtoId] += pc.quantidade;
            }
        });

        const produtosConsumidosPorRacaPet: ProdutoConsumidoPorPetRaca[] = [];

        for (const racaPet in produtoConsumosPorRacaPet) {
            for (const produtoId in produtoConsumosPorRacaPet[racaPet]) {
                const produto = produtos.find(p => p.id === parseInt(produtoId));
                if (produto) {
                    produtosConsumidosPorRacaPet.push({
                        racaPet,
                        produto,
                        totalQuantidade: produtoConsumosPorRacaPet[racaPet][produtoId]
                    });
                }
            }
        }

        return produtosConsumidosPorRacaPet.filter(pct => pct.totalQuantidade > 0).sort((a, b) => b.totalQuantidade - a.totalQuantidade);
    }

    render() {
        const produtosMaisConsumidosPorRacaPet = this.getProdutosMaisConsumidosPorRacaPet();

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Produtos Mais Consumidos por Raça de Pet</h2>
                {produtosMaisConsumidosPorRacaPet.length === 0 ? (
                    <div className="list-group-item">Nenhum produto consumido encontrado</div>
                ) : (
                    produtosMaisConsumidosPorRacaPet.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="fs-5">Raça de Pet: {item.racaPet}</h3>
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
