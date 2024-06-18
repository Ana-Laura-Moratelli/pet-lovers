import { Component, ChangeEvent } from "react";
import axios from 'axios';

type Props = {
    tema: string
}

type State = {
    value: string,
    clientes: Cliente[],
    pets: Pet[],
    produtos: Produto[],
    selectedClienteId: number | null,
    selectedPetId: number | null,
    selectedProdutoId: number | null,
    quantidade: number
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
    quantidade: number,
    quantidadeConsumida: number 
};

export default class CadastroProdutosConsumidos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            clientes: [],
            pets: [],
            produtos: [],
            selectedClienteId: null,
            selectedPetId: null,
            selectedProdutoId: null,
            quantidade: 1
        };
    }

    componentDidMount() {
        this.fetchClientes();
        this.fetchProdutos();
    }

    fetchClientes = () => {
        axios.get('http://localhost:5000/clientes')
            .then(response => this.setState({ clientes: response.data }))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }

    fetchProdutos = () => {
        axios.get('http://localhost:5000/produtos')
            .then(response => this.setState({ produtos: response.data }))
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    fetchPets = (clienteId: number) => {
        axios.get(`http://localhost:5000/clientes/${clienteId}/pets`)
            .then(response => this.setState({ pets: response.data }))
            .catch(error => console.error('Erro ao buscar pets:', error));
    }

    handleChangeCliente = (event: ChangeEvent<HTMLSelectElement>) => {
        const clienteId = parseInt(event.target.value);
        this.setState({ selectedClienteId: clienteId, pets: [], selectedPetId: null });
        this.fetchPets(clienteId);
    }

    handleChangePet = (event: ChangeEvent<HTMLSelectElement>) => {
        const petId = parseInt(event.target.value);
        this.setState({ selectedPetId: petId });
    }

    handleChangeProduto = (event: ChangeEvent<HTMLSelectElement>) => {
        const produtoId = parseInt(event.target.value);
        this.setState({ selectedProdutoId: produtoId });
    }

    handleChangeQuantidade = (event: ChangeEvent<HTMLInputElement>) => {
        const quantidade = parseInt(event.target.value);
        this.setState({ quantidade });
    }

    handleSubmit = () => {
        const { selectedClienteId, selectedPetId, selectedProdutoId, quantidade, produtos } = this.state;
        if (selectedClienteId && selectedPetId && selectedProdutoId && quantidade > 0) {
            const produto = produtos.find(p => p.id === selectedProdutoId);
            if (produto) {
                const quantidadeDisponivel = produto.quantidade - produto.quantidadeConsumida;
                if (quantidadeDisponivel === 0) {
                    alert('Em falta no estoque.');
                    return;
                }
                if (quantidade > quantidadeDisponivel) {
                    alert('A quantidade consumida não pode ser maior do que a quantidade disponível.');
                    return;
                }
                axios.post('http://localhost:5000/produtos-consumidos', {
                    clienteId: selectedClienteId,
                    petId: selectedPetId,
                    produtoId: selectedProdutoId,
                    quantidade
                })
                    .then(response => {
                        alert('Produto consumido cadastrado com sucesso!');
                        this.setState({
                            selectedClienteId: null,
                            selectedPetId: null,
                            selectedProdutoId: null,
                            quantidade: 1,
                            pets: []
                        });
                        this.fetchProdutos();
                        if (produto.quantidade - produto.quantidadeConsumida - quantidade === 0) {
                            alert('Atenção: Fim de estoque! A quantidade consumida é igual à quantidade disponível.');
                        }
                    })
                    .catch(error => {
                        alert(error.response.data || 'Erro ao cadastrar produto consumido');
                        console.error('Erro ao cadastrar produto consumido:', error);
                    });
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    render() {
        const { tema } = this.props;
        const { clientes, pets, produtos, selectedClienteId, selectedPetId, selectedProdutoId, quantidade } = this.state;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Produto Consumido</h2>
                <form>
                    <div className="mb-3">
                        <select className="form-select" value={selectedClienteId ?? ''} onChange={this.handleChangeCliente}>
                            <option value="" disabled>Selecione o Cliente</option>
                            {clientes.length === 0 ? (
                                <option value="" disabled>Nenhum cliente encontrado</option>
                            ) : (
                                clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" value={selectedPetId ?? ''} onChange={this.handleChangePet} disabled={!selectedClienteId}>
                            <option value="" disabled>Selecione o Pet</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>{pet.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" value={selectedProdutoId ?? ''} onChange={this.handleChangeProduto}>
                            <option value="" disabled>Selecione o Produto</option>
                            {produtos.length === 0 ? (
                                <option value="" disabled>Nenhum produto encontrado</option>
                            ) : (
                                produtos.map(produto => (
                                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Quantidade"
                            value={quantidade}
                            onChange={this.handleChangeQuantidade}
                            step="1"
                        />
                        <label htmlFor="floatingInput">Quantidade</label>
                    </div>

                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" onClick={this.handleSubmit} style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}
