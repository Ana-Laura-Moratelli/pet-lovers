import { Component, ChangeEvent, FormEvent } from "react";
import axios from 'axios';

type Props = {
    tema: string
}

type State = {
    servicos: Servico[],
    value: string,
    novoservico: {
        nome: string,
        quantidade: number,
        preco: string
    }
};

type Servico = {
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

export default class ListaServicos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: [],
            value: '',
            novoservico: {
                nome: '',
                quantidade: 1,
                preco: ''
            }
        };
    }

    componentDidMount() {
        this.fetchservicos();
    }

    fetchservicos = () => {
        axios.get('http://localhost:5000/servicos')
            .then(response => {
                const servicos = response.data.map((servico: Servico) => ({
                    ...servico,
                    editando: false
                }));
                this.setState({ servicos });
            })
            .catch(error => console.error('Erro ao buscar servicos:', error));
    }

    handleInputChange = (id: number, campo: string, valor: string) => {
        this.setState((prevState) => ({
            servicos: prevState.servicos.map(servico =>
                servico.id === id ? { ...servico, [campo]: valor } : servico
            ),
        }));
    };

    handleNovoservicoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            novoservico: {
                ...prevState.novoservico,
                [name]: value
            }
        }));
    };

    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            servicos: prevState.servicos.map(servico =>
                servico.id === id
                    ? {
                        ...servico,
                        editando: !servico.editando,
                        originalValues: servico.editando ? undefined : { ...servico }
                    }
                    : servico
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            servicos: prevState.servicos.map(servico =>
                servico.id === id && servico.originalValues
                    ? { ...servico.originalValues, editando: false, originalValues: undefined }
                    : servico
            ),
        }));
    };

    handleSaveEditClick = (id: number) => {
        const servico = this.state.servicos.find(p => p.id === id);
        if (servico) {
            axios.put(`http://localhost:5000/servicos/${id}`, {
                ...servico,
                preco: parseFloat(servico.preco.toString().replace(',', '.'))
            })
                .then(response => {
                    this.fetchservicos();
                    alert("servico atualizado com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao atualizar servico:', error.response?.data || error.message);
                    alert("Erro ao atualizar servico. Tente novamente.");
                });
        }
    };

    handleDeleteClick = (id: number) => {
        axios.delete(`http://localhost:5000/servicos/${id}`)
            .then(response => {
                this.fetchservicos();
                alert("servico excluído com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao excluir servico:', error.response?.data || error.message);
                alert("Erro ao excluir servico. Tente novamente.");
            });
    };

    handleCadastrarservico = (e: FormEvent) => {
        e.preventDefault();
        const { nome, quantidade, preco } = this.state.novoservico;
        const servicoData = { nome, quantidade, preco: parseFloat(preco.replace(',', '.')) };

        axios.post('http://localhost:5000/servicos', servicoData)
            .then(response => {
                this.fetchservicos();
                this.setState({
                    novoservico: {
                        nome: '',
                        quantidade: 1,
                        preco: ''
                    }
                });
                alert("servico cadastrado com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao cadastrar servico:', error.response?.data || error.message);
                alert("Erro ao cadastrar servico. Tente novamente.");
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
        const { servicos, novoservico } = this.state;
        const { tema } = this.props;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Serviço</h2>
                <form onSubmit={this.handleCadastrarservico}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Nome"
                            name="nome"
                            value={novoservico.nome}
                            onChange={this.handleNovoservicoChange}
                        />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Preço"
                            name="preco"
                            value={novoservico.preco}
                            onChange={this.handleNovoservicoChange}
                        />
                        <label htmlFor="floatingInput">Preço</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Lista Serviços</h2>
                <div className="list-group mb-3">
                    {servicos.length === 0 ? (
                        <div className="list-group-item">Nenhum serviço cadastrado</div>
                    ) : (
                        servicos.map(servico => (
                            <div key={servico.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                {servico.editando ? (
                                    <div>
                                        <span>Nome</span>
                                        <input
                                            type="text"
                                            value={servico.nome}
                                            onChange={(e) => this.handleInputChange(servico.id, 'nome', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                       <span>Preço</span>
                                        <input
                                            type="number"
                                            value={servico.preco.toString()}
                                            onChange={(e) => this.handleInputChange(servico.id, 'preco', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column">
                                        <span>Nome: {servico.nome}</span>
                                        <span>Preço: {this.formatCurrency(servico.preco)}</span>
                                    </div>
                                )}
                                <span>
                                    {servico.editando ? (
                                        <>
                                            <i
                                                className="bi bi-floppy me-2"
                                                role="button"
                                                title="Salvar"
                                                onClick={() => this.handleSaveEditClick(servico.id)}
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
                                        <i
                                        className="bi bi-trash"
                                        role="button"
                                        title="Apagar"
                                        onClick={() => this.handleDeleteClick(servico.id)}
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
