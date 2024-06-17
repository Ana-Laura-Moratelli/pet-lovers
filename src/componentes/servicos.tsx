import { Component, ChangeEvent } from "react";

type Props = {
    tema: string
}

type State = {
    servicos: Servico[]
    value: string;
};

type Servico = {
    id: number,
    nome: string,
    quantidade: number,
    preco: number,
    editando: boolean,
};
export default class ListaServicos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: [
                { id: 1, nome: 'Banho e Tosa', quantidade: 10, preco: 5000, editando: false },
                { id: 2, nome: 'Hotel para Pets', quantidade: 15, preco: 4000, editando: false },
                { id: 3, nome: 'Consulta Veterinária', quantidade: 5, preco: 1000, editando: false },
            ],
            value: '',
        };
    }

    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            ...prevState,
            servicos: prevState.servicos.map(servico =>
                servico.id === id ? { ...servico, editando: !servico.editando } : servico
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            servicos: prevState.servicos.map(servico =>
                servico.id === id ? { ...servico, editando: false } : servico
            ),
        }));
    };

    handleInputChange = (id: number, campo: string, valor: string) => {
        const newValue = campo === 'preco' ? parseFloat(valor.replace(/\D/g, '')) : valor;
        this.setState((prevState) => ({
            ...prevState,
            servicos: prevState.servicos.map(servico =>
                servico.id === id ? { ...servico, [campo]: newValue } : servico
            ),
        }));
    };

    handleDelete = (id: number) => {
        this.setState((prevState) => ({
            servicos: prevState.servicos.filter(servico => servico.id !== id),
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
        const { servicos } = this.state;
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Serviço</h2>
                <form>
                    <div className="form-floating mb-3">
                        <input type="nome" className="form-control" id="floatingInput" placeholder="Nome" />
                        <label htmlFor="floatingInput">Nome</label>
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
                <h2 className="fs-4">Lista Serviços</h2>
                <div className="list-group mb-3">
                    {servicos.map(servico => (
                        <div key={servico.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            {servico.editando ? (
                                <div>
                                    <span>Nome:</span>
                                    <input
                                        type="text"
                                        value={servico.nome}
                                        onChange={(e) => this.handleInputChange(servico.id, 'nome', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Preço:</span>
                                    <input
                                        type="text"
                                        value={this.formatCurrency(String(servico.preco))}
                                        onChange={(e) => this.handleInputChange(servico.id, 'preco', e.target.value)}
                                        className="form-control mb-1"
                                    />


                                </div>
                            ) : (
                                <div className="d-flex flex-column">
                                    <span>Nome: {servico.nome}</span>
                                    <span>Preço: {this.formatCurrency(parseFloat(servico.preco.toFixed(2)))}</span>




                                </div>
                            )}
                            <span>
                                {servico.editando ? (
                                     <>
                                     <i
                                         className="bi bi-floppy me-2"
                                         role="button"
                                         title="Salvar"
                                         onClick={() => this.handleEditClick(servico.id)}
                                     ></i>
                                     <i
                                         className="bi bi-x-lg me-2"
                                         role="button"
                                         title="Cancelar"
                                         onClick={() => this.handleCancelEdit(servico.id)}
                                     ></i>
                                 </>
                                ) : (
                                    <>
                                    <i
                                        className="bi bi-pencil-square me-2"
                                        role="button"
                                        title="Editar"
                                        onClick={() => this.handleEditClick(servico.id)}
                                    ></i>
                                     <i className="bi bi-trash"
                                            role="button"
                                            title="Apagar"
                                            onClick={() => this.handleDelete(servico.id)}></i>
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