import { Component, ChangeEvent } from "react";

type Props = {
    tema: string
}

type State = {
    produtos: Produto[]
    value: string;
};

type Produto = {
    id: number,
    nome: string,
    quantidade: number,
    preco: number,
    editando: boolean,
};

export default class ListaProdutos extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            produtos: [
                { id: 1, nome: 'Ração para Cães', quantidade: 10, preco: 5000, editando: false },
                { id: 2, nome: 'Ração para Gatos', quantidade: 15, preco: 4000, editando: false },
                { id: 3, nome: 'Cama para Cães', quantidade: 5, preco: 1000, editando: false },
            ],
            value: '',
        };
    }

    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            ...prevState,
            produtos: prevState.produtos.map(produto =>
                produto.id === id ? { ...produto, editando: !produto.editando } : produto
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            produtos: prevState.produtos.map(produto =>
                produto.id === id ? { ...produto, editando: false } : produto
            ),
        }));
    };

    handleInputChange = (id: number, campo: string, valor: string) => {
        const newValue = campo === 'preco' ? parseFloat(valor.replace(/\D/g, '')) : valor;
        this.setState((prevState) => ({
            ...prevState,
            produtos: prevState.produtos.map(produto =>
                produto.id === id ? { ...produto, [campo]: newValue } : produto
            ),
        }));
    };

    handleDelete = (id: number) => {
        this.setState((prevState) => ({
            produtos: prevState.produtos.filter(produto => produto.id !== id),
        }));
    };



    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        const numericValue = inputValue.replace(/\D/g, '');

        const formattedValue = this.formatCurrency(numericValue);
        this.setState({ value: formattedValue });
    };


    formatCurrency = (value: string | number) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });

        const numericValue = typeof value === 'string' ? parseInt(value) : value;

        return formatter.format(numericValue / 100);
    };

    render() {
        const { produtos } = this.state;
        const { tema } = this.props;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Produto</h2>
                <form>
                    <div className="form-floating mb-3">
                        <input type="nome" className="form-control" id="floatingInput" placeholder="Nome" />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Quantidade"
                            step="1"
                        />
                        <label htmlFor="floatingInput">Quantidade</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Preço"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="floatingInput">Preço</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Lista Produtos</h2>
                <div className="list-group mb-3">
                    {produtos.map(produto => (
                        <div key={produto.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            {produto.editando ? (
                                <div>
                                    <span>Nome:</span>
                                    <input
                                        type="text"
                                        value={produto.nome}
                                        onChange={(e) => this.handleInputChange(produto.id, 'nome', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Quantidade:</span>
                                    <input
                                        type="text"
                                        value={produto.quantidade}
                                        onChange={(e) => this.handleInputChange(produto.id, 'quantidade', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Preço:</span>
                                    <input
                                        type="text"
                                        value={this.formatCurrency(String(produto.preco))}
                                        onChange={(e) => this.handleInputChange(produto.id, 'preco', e.target.value)}
                                        className="form-control mb-1"
                                    />


                                </div>
                            ) : (
                                <div className="d-flex flex-column">
                                    <span>Nome: {produto.nome}</span>
                                    <span>Quantidade: {produto.quantidade}</span>
                                    <span>Preço: {this.formatCurrency(parseFloat(produto.preco.toFixed(2)))}</span>




                                </div>
                            )}
                            <span>
                                {produto.editando ? (
                                    <>
                                        <i
                                            className="bi bi-floppy me-2"
                                            role="button"
                                            title="Salvar"
                                            onClick={() => this.handleEditClick(produto.id)}
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
                                        <i className="bi bi-trash"
                                            role="button"
                                            title="Apagar"
                                            onClick={() => this.handleDelete(produto.id)}></i>
                                    </>
                                )}

                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
