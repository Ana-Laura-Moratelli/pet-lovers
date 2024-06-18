import React, { Component } from 'react';
import axios from 'axios';

type TelefoneInfo = {
    id: number;
    ddd: string;
    numero: string;
};

type RgInfo = {
    id: number;
    valor: string;
    dataEmissao: string;
};

type Pet = {
    id: number;
    clienteId: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type ProdutoConsumido = {
    id: number;
    nome: string;
    quantidade: number;
};

type ServicoConsumido = {
    id: number;
    nome: string;
};

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: { valor: string; dataEmissao: string };
    rg: RgInfo[];
    telefones: TelefoneInfo[];
    pets?: Pet[];
    produtosConsumidos?: ProdutoConsumido[];
    servicosConsumidos?: ServicoConsumido[];
    editando: boolean;
    original?: Cliente;
    dataCadastro: string;
};

type Props = {
    tema: string;
};

interface State {
    clientes: Cliente[];
    clienteSelecionado: Cliente | null;
    modalType: string;
    nomeEditavel: string;
    nomeSocialEditavel: string;
    editando: boolean;
}

class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            clientes: [],
            clienteSelecionado: null,
            modalType: '',
            nomeEditavel: '',
            nomeSocialEditavel: '',
            editando: false,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/clientes")
            .then(response => {
                const clientes = response.data.map((cliente: Cliente) => ({
                    ...cliente,
                    rg: cliente.rg || [],
                    telefones: cliente.telefones || [],
                    editando: false
                }));
                this.setState({ clientes }, this.fetchPetsAndProducts);
            })
            .catch(error => {
                console.error("Erro ao obter clientes:", error);
            });
    }

    fetchPetsAndProducts = () => {
        const { clientes } = this.state;

        
    
        clientes.forEach(cliente => {
            axios.get(`http://localhost:5000/clientes/${cliente.id}/pets`)
                .then(response => {
                    const updatedClientes = this.state.clientes.map(c =>
                        c.id === cliente.id ? { ...c, pets: response.data } : c
                    );
                    this.setState({ clientes: updatedClientes }, () => {
                        axios.get(`http://localhost:5000/clientes/${cliente.id}/produtos-consumidos`)
                            .then(response => {
                                const updatedClientesWithProducts = this.state.clientes.map(c =>
                                    c.id === cliente.id ? { ...c, produtosConsumidos: response.data } : c
                                );
                                this.setState({ clientes: updatedClientesWithProducts }, () => {
                                    axios.get(`http://localhost:5000/clientes/${cliente.id}/servicos-consumidos`)
                                        .then(response => {
                                            const updatedClientesWithServicos = this.state.clientes.map(c =>
                                                c.id === cliente.id ? { ...c, servicosConsumidos: response.data } : c
                                            );
                                            this.setState({ clientes: updatedClientesWithServicos });
                                        })
                                        .catch(error => {
                                            console.error(`Erro ao obter serviços consumidos para o cliente ${cliente.id}:`, error);
                                        });
                                });
                            })
                            .catch(error => {
                                console.error(`Erro ao obter produtos consumidos para o cliente ${cliente.id}:`, error);
                            });
                    });
                })
                .catch(error => {
                    console.error(`Erro ao obter pets para o cliente ${cliente.id}:`, error);
                });
        });
    };

    fetchPets = () => {
        axios.get('http://localhost:5000/pets')
            .then(response => {
                const pets = response.data;
                this.setState(prevState => ({
                    clientes: prevState.clientes.map(cliente => ({
                        ...cliente,
                        pets: pets.filter((pet: Pet) => pet.clienteId === cliente.id)
                    }))
                }));
            })
            .catch(error => console.error('Erro ao buscar pets:', error));
    }

    handleEditClick = (id: number) => {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === id ? { ...cliente, editando: true, original: { ...cliente, editando: false } } : cliente
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === id && cliente.original ? { ...cliente.original, editando: false } : cliente
            ),
        }));
    };

    handleInputChange = (id: number, field: string, value: string) => {
        const keys = field.split(".");
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente => {
                if (cliente.id === id) {
                    const updatedCliente = { ...cliente };
                    if (keys.length === 2) {
                        const [parentKey, childKey] = keys;
                        (updatedCliente as any)[parentKey] = {
                            ...((updatedCliente as any)[parentKey]),
                            [childKey]: value
                        };
                    } else {
                        (updatedCliente as any)[field] = value;
                    }
                    return updatedCliente;
                }
                return cliente;
            }),
        }));
    };

    handleRgChange = (clienteId: number, rgId: number, field: string, value: string) => {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente => {
                if (cliente.id === clienteId) {
                    const updatedRgs = cliente.rg.map(rg =>
                        rg.id === rgId ? { ...rg, [field]: value } : rg
                    );
                    return { ...cliente, rg: updatedRgs };
                }
                return cliente;
            }),
        }));
    };

    handleTelefoneChange = (clienteId: number, telefoneId: number, field: string, value: string) => {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente => {
                if (cliente.id === clienteId) {
                    const updatedTelefones = cliente.telefones.map(telefone =>
                        telefone.id === telefoneId ? { ...telefone, [field]: value } : telefone
                    );
                    return { ...cliente, telefones: updatedTelefones };
                }
                return cliente;
            }),
        }));
    };

    removerCliente = (cliente: Cliente) => {
        let id = cliente.id;
        if (window.confirm("Tem certeza que deseja remover este cliente? Isso irá excluir os pets vinculados também.")) {
            axios.post(`http://localhost:5000/clientes/excluir/${id}`)
                .then((response) => {
                    this.setState({ clientes: response.data });
                    alert("Cliente excluído com sucesso.");
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        alert(error.response.data.error);
                    } else {
                        console.log(error);
                    }
                });
        }
    };
    

    handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, clienteId: number) => {
        event.preventDefault();

        const clienteSelecionado = this.state.clientes.find(cliente => cliente.id === clienteId);

        if (!clienteSelecionado) {
            console.error("Nenhum cliente selecionado para edição.");
            return;
        }

        axios.put(`http://localhost:5000/clientes/${clienteSelecionado.id}`, clienteSelecionado)
            .then(response => {
                console.log(response.data);
                this.setState(prevState => ({
                    clientes: prevState.clientes.map(cliente =>
                        cliente.id === clienteSelecionado.id ? { ...clienteSelecionado, editando: false } : cliente
                    ),
                }));
                alert("Cliente editado com sucesso.");
            })
            .catch(error => {
                console.error('Erro ao editar cliente:', error);
                alert("Erro ao editar cliente.");
            });
    };

    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    render() {
        return (
            <div className="container-fluid">
                <h3 className="titulo">Clientes</h3>
                <div className="list-group mb-3">
                    {this.state.clientes.length > 0 ? (
                        <>
                            {this.state.clientes.map(cliente => (
                                <div key={cliente.id} className="list-group-item list-group-item-action">
                                    {cliente.editando ? (
                                        <div className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                                            <div>
                                                <span>Nome:</span>
                                                <input
                                                    type="text"
                                                    value={cliente.nome}
                                                    onInput={(e) => {
                                                        if (e.currentTarget.value.length > 50) {
                                                            e.currentTarget.value = e.currentTarget.value.slice(0, 50);
                                                        }
                                                    }}
                                                    onChange={(e) => this.handleInputChange(cliente.id, "nome", e.target.value)}
                                                    className="form-control mb-1"
                                                />
                                                <span>Nome Social</span>
                                                <input
                                                    type="text"
                                                    value={cliente.nomeSocial}
                                                    onInput={(e) => {
                                                        if (e.currentTarget.value.length > 30) {
                                                            e.currentTarget.value = e.currentTarget.value.slice(0, 30);
                                                        }
                                                    }}
                                                    onChange={(e) => this.handleInputChange(cliente.id, "nomeSocial", e.target.value)}
                                                    className="form-control mb-1"
                                                />
                                                <span>CPF</span>
                                                <input
                                                    type="number"
                                                    value={cliente.cpf.valor}
                                                    onInput={(e) => {
                                                        if (e.currentTarget.value.length > 11) {
                                                            e.currentTarget.value = e.currentTarget.value.slice(0, 11);
                                                        }
                                                    }}
                                                    onChange={(e) => this.handleInputChange(cliente.id, "cpf.valor", e.target.value)}
                                                    className="form-control mb-1"
                                                />
                                                <span>Data de emissão CPF</span>
                                                <input
                                                    type="date"
                                                    value={cliente.cpf.dataEmissao}
                                                    onInput={(e) => {
                                                        if (e.currentTarget.value.length > 10) {
                                                            e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                                                        }
                                                    }}
                                                    onChange={(e) => this.handleInputChange(cliente.id, "cpf.dataEmissao", e.target.value)}
                                                    className="form-control mb-1"
                                                />
                                                <label className="form-titulo">RGs e sua data de emissão</label>
                                                {cliente.rg && cliente.rg.length > 0 ? (
                                                    cliente.rg.map(rg => (
                                                        <div key={rg.id} className="input-group mb-3">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="RG"
                                                                value={rg.valor}
                                                                onInput={(e) => {
                                                                    if (e.currentTarget.value.length > 9) {
                                                                        e.currentTarget.value = e.currentTarget.value.slice(0, 9);
                                                                    }
                                                                }}
                                                                onChange={(e) => this.handleRgChange(cliente.id, rg.id, "valor", e.target.value)}
                                                            />
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                placeholder="Data de Emissão do RG"
                                                                value={rg.dataEmissao}
                                                                onInput={(e) => {
                                                                    if (e.currentTarget.value.length > 10) {
                                                                        e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                                                                    }
                                                                }}
                                                                onChange={(e) => this.handleRgChange(cliente.id, rg.id, "dataEmissao", e.target.value)}
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Nenhum RG cadastrado</p>
                                                )}
                                                <label className="form-titulo">Telefones:</label>
                                                {cliente.telefones && cliente.telefones.length > 0 ? (
                                                    cliente.telefones.map(telefone => (
                                                        <div key={telefone.id} className="input-group mb-3">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="DDD"
                                                                value={telefone.ddd}
                                                                onInput={(e) => {
                                                                    if (e.currentTarget.value.length > 2) {
                                                                        e.currentTarget.value = e.currentTarget.value.slice(0, 2);
                                                                    }
                                                                }}
                                                                onChange={(e) => this.handleTelefoneChange(cliente.id, telefone.id, "ddd", e.target.value)}
                                                            />
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Telefone"
                                                                value={telefone.numero}
                                                                onInput={(e) => {
                                                                    if (e.currentTarget.value.length > 9) {
                                                                        e.currentTarget.value = e.currentTarget.value.slice(0, 9);
                                                                    }
                                                                }}
                                                                onChange={(e) => this.handleTelefoneChange(cliente.id, telefone.id, "numero", e.target.value)}
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Nenhum telefone cadastrado</p>
                                                )}
                                            </div>
                                            <div className="icon-container d-flex">
                                                <i
                                                    className="bi bi-floppy me-2"
                                                    role="button"
                                                    title="Salvar"
                                                    onClick={(e) => this.handleSubmit(e as any, cliente.id)}
                                                ></i>
                                                <i
                                                    className="bi bi-x-lg me-2"
                                                    role="button"
                                                    title="Cancelar"
                                                    onClick={() => this.handleCancelEdit(cliente.id)}
                                                ></i>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column">
                                            <div className='d-flex justify-content-between align-items-center'>


                                                <div className='d-flex flex-column '>
                                                    <span>Data de cadastro: {this.formatDate(cliente.dataCadastro)}</span>
                                                    <span>Nome: {cliente.nome}</span>
                                                    <span>Nome Social: {cliente.nomeSocial}</span>
                                                    <span>CPF: {cliente.cpf.valor}</span>
                                                    <span>Data emissão CPF: {this.formatDate(cliente.cpf.dataEmissao)}</span>
                                                    <span>RGs: {cliente.rg.map(rg => (
                                                        <span key={rg.id}>{rg.valor} (Data de Emissão: {this.formatDate(rg.dataEmissao)}) <br /> </span>
                                                    ))}</span>
                                                    <span>Telefones: {cliente.telefones.map(telefone => (
                                                        <span key={telefone.id}>({telefone.ddd}) {telefone.numero} <br /> </span>
                                                    ))}</span>
                                                </div>

                                                <div className="icon-container d-flex">
                                                    <i
                                                        className="bi bi-pencil-square me-2"
                                                        role="button"
                                                        title="Editar"
                                                        onClick={() => this.handleEditClick(cliente.id)}
                                                    ></i>
                                                    <i
                                                        className="bi bi-trash"
                                                        role="button"
                                                        title="Apagar"
                                                        onClick={() => this.removerCliente(cliente)}
                                                    ></i>
                                                </div>
                                            </div>
                                            <h4>Pets:</h4>
                                            {cliente.pets && cliente.pets.length > 0 ? (
                                                cliente.pets.map(pet => (
                                                    <div key={pet.id}>
                                                        <div className="d-flex flex-column align-items-start">
                                                            <span>Nome: {pet.nome}</span>
                                                            <span>Tipo: {pet.tipo}</span>
                                                            <span>Raça: {pet.raca}</span>
                                                            <span>Gênero: {pet.genero}</span>
                                                            <br />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Nenhum pet cadastrado</p>
                                            )}

                                            <div>
                                                <h4>Produtos Consumidos:</h4>
                                                {cliente.produtosConsumidos && cliente.produtosConsumidos.length > 0 ? (
                                                    cliente.produtosConsumidos.map(produto => (
                                                        <div key={produto.id}>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <span>Produto: {produto.nome}</span>
                                                                <span>Quantidade: {produto.quantidade}</span>
                                                                <br />
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Nenhum produto consumido</p>
                                                )}
                                                <h4>Serviços Consumidos:</h4>
                                                {cliente.servicosConsumidos && cliente.servicosConsumidos.length > 0 ? (
                                                    cliente.servicosConsumidos.map(servico => (
                                                        <div key={servico.id}>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <span>Serviço: {servico.nome}</span>
                                                                <br />
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Nenhum serviço consumido</p>
                                                )}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="list-group-item">Nenhum cliente cadastrado</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ListaCliente;
