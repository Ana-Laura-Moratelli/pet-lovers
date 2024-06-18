import { Component, ChangeEvent, FormEvent } from "react";
import axios from 'axios';

type Props = {
    tema: string
}

type State = {
    produtos: Produto[],
    value: string,
    novoProduto: {
        nome: string,
        quantidade: number,
        preco: string
    }
};

type Produto = {
    id: number,
    nome: string,
    quantidade: number,
    preco: number,
    editando: boolean,
    originalValues?: {
        id: number,
        nome: string,
        quantidade: number,
        preco: number
    }
};

export default class ListaProdutos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produtos: [],
            value: '',
            novoProduto: {
                nome: '',
                quantidade: 1,
                preco: ''
            }
        };
    }

    componentDidMount() {
        this.fetchProdutos();
    }

    fetchProdutos = () => {
        axios.get('http://localhost:5000/produtos')
            .then(response => {
                const produtos = response.data.map((produto: Produto) => ({
                    ...produto,
                    editando: false
                }));
                this.setState({ produtos });
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    handleInputChange = (id: number, campo: string, valor: string) => {
        const newValue = campo === 'preco' ? valor : valor;
        this.setState((prevState) => ({
            produtos: prevState.produtos.map(produto =>
                produto.id === id ? { ...produto, [campo]: newValue } : produto
            ),
        }));
    };

    handleNovoProdutoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            novoProduto: {
                ...prevState.novoProduto,
                [name]: value
            }
        }));
    };

    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            produtos: prevState.produtos.map(produto =>
                produto.id === id
                    ? {
                        ...produto,
                        editando: !produto.editando,
                        originalValues: produto.editando ? undefined : { ...produto }
                    }
                    : produto
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            produtos: prevState.produtos.map(produto =>
                produto.id === id && produto.originalValues
                    ? { ...produto.originalValues, editando: false, originalValues: undefined }
                    : produto
            ),
        }));
    };

    handleSaveEditClick = (id: number) => {
        const produto = this.state.produtos.find(p => p.id === id);
        if (produto) {
            axios.put(`http://localhost:5000/produtos/${id}`, {
                ...produto,
                preco: parseFloat(produto.preco.toString().replace(',', '.')) // Convertendo o valor para número
            })
                .then(response => {
                    this.fetchProdutos();
                    alert("Produto atualizado com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao atualizar produto:', error.response?.data || error.message);
                    alert("Erro ao atualizar produto. Tente novamente.");
                });
        }
    };

    handleDeleteClick = (id: number) => {
        axios.delete(`http://localhost:5000/produtos/${id}`)
            .then(response => {
                this.fetchProdutos();
                alert("Produto excluído com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error.response?.data || error.message);
                alert("Erro ao excluir produto. Tente novamente.");
            });
    };

    handleCadastrarProduto = (e: FormEvent) => {
        e.preventDefault();
        const { nome, quantidade, preco } = this.state.novoProduto;
        const produtoData = { nome, quantidade, preco: parseFloat(preco.replace(',', '.')) };

        axios.post('http://localhost:5000/produtos', produtoData)
            .then(response => {
                this.fetchProdutos();
                this.setState({
                    novoProduto: {
                        nome: '',
                        quantidade: 1,
                        preco: ''
                    }
                });
                alert("Produto cadastrado com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao cadastrar produto:', error.response?.data || error.message);
                alert("Erro ao cadastrar produto. Tente novamente.");
            });
    };

    formatCurrency = (value: string | number) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });

        const numericValue = typeof value === 'string' ? parseFloat(value) : value;

        return formatter.format(numericValue);
    };

    render() {
        const { produtos, novoProduto } = this.state;
        const { tema } = this.props;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Produto</h2>
                <form onSubmit={this.handleCadastrarProduto}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Nome"
                            name="nome"
                            value={novoProduto.nome}
                            onChange={this.handleNovoProdutoChange}
                        />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Quantidade"
                            name="quantidade"
                            value={novoProduto.quantidade}
                            onChange={this.handleNovoProdutoChange}
                        />
                        <label htmlFor="floatingInput">Quantidade</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Preço"
                            name="preco"
                            value={novoProduto.preco}
                            onChange={this.handleNovoProdutoChange}
                        />
                        <label htmlFor="floatingInput">Preço</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Lista Produtos</h2>
                <div className="list-group mb-3">
                    {produtos.length === 0 ? (
                        <div className="list-group-item">Nenhum produto cadastrado</div>
                    ) : (
                        produtos.map(produto => (
                            <div key={produto.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                {produto.editando ? (
                                    <div>
                                        <span>Nome</span>
                                        <input
                                            type="text"
                                            value={produto.nome}
                                            onChange={(e) => this.handleInputChange(produto.id, 'nome', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                        <span>Quantidade</span>
                                        <input
                                            type="number"
                                            value={produto.quantidade}
                                            onChange={(e) => this.handleInputChange(produto.id, 'quantidade', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                        <span>Preço</span>
                                        <input
                                            type="number"
                                            value={produto.preco.toString()}
                                            onChange={(e) => this.handleInputChange(produto.id, 'preco', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column">
                                        <span>Nome: {produto.nome}</span>
                                        <span>Quantidade: {produto.quantidade}</span>
                                        <span>Preço: {this.formatCurrency(produto.preco)}</span>
                                    </div>
                                )}
                                <span>
                                    {produto.editando ? (
                                        <>
                                            <i
                                                className="bi bi-floppy me-2"
                                                role="button"
                                                title="Salvar"
                                                onClick={() => this.handleSaveEditClick(produto.id)}
                                            ></i>
                                            <i
                                                className="bi bi-x-lg me-2"
                                                role="button"
                                                title="Cancelar"
                                                onClick={() => this.handleCancelEdit(produto.id)}
                                            ></i>
                                        </>
                                    ) : (
                                        <>
                                        <i
                                            className="bi bi-pencil-square me-2"
                                            role="button"
                                            title="Editar"
                                            onClick={() => this.handleEditClick(produto.id)}
                                        ></i>
                                        <i
                                        className="bi bi-trash"
                                        role="button"
                                        title="Apagar"
                                        onClick={() => this.handleDeleteClick(produto.id)}
                                    ></i>
                                    </>
                                    )}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}
