import React, { Component, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type Props = {
    tema: string
}

type Pet = {
    id: number,
    clienteId: number,
    clienteNome: string,
    nome: string,
    tipo: string,
    raca: string,
    genero: string,
    editando: boolean,
    originalValues?: {
        nome: string,
        tipo: string,
        raca: string,
        genero: string
    }
};

type Cliente = {
    id: number,
    nome: string,
};

type State = {
    pets: Pet[],
    clientes: Cliente[],
    novoPet: {
        nome: string,
        tipo: string,
        raca: string,
        genero: string,
        clienteId: number | null,
    }
};

export default class ListaPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pets: [],
            clientes: [],
            novoPet: {
                nome: '',
                tipo: '',
                raca: '',
                genero: '',
                clienteId: null,
            }
        };
    }

    componentDidMount() {
        this.fetchClientes();
    }

    fetchClientes = () => {
        axios.get('http://localhost:5000/clientes')
            .then(response => {
                this.setState({ clientes: response.data }, this.fetchPets);
            })
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }

    fetchPets = () => {
        axios.get('http://localhost:5000/pets')
            .then(response => {
                const pets = response.data.map((petData: { pet: Pet, clienteNome: string }) => ({
                    ...petData,
                    editando: false
                }));
                this.setState({ pets });
            })
            .catch(error => console.error('Erro ao buscar pets:', error));
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            novoPet: {
                ...prevState.novoPet,
                [name]: value
            }
        }));
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { nome, tipo, raca, genero, clienteId } = this.state.novoPet;
        if (clienteId === null) {
            alert("Selecione um cliente");
            return;
        }

        const petData = { nome, tipo, raca, genero, clienteId: Number(clienteId) };
        axios.post('http://localhost:5000/pets', petData)
            .then(response => {
                this.fetchPets();
                this.setState({
                    novoPet: {
                        nome: '',
                        tipo: '',
                        raca: '',
                        genero: '',
                        clienteId: null
                    }
                });
                alert("Pet cadastrado com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao cadastrar pet:', error.response?.data || error.message);
                alert("Erro ao cadastrar pet. Tente novamente.");
            });
    };

    handleEditClick = (id: number) => {
        this.setState(prevState => ({
            pets: prevState.pets.map(pet =>
                pet.id === id
                    ? {
                        ...pet,
                        editando: !pet.editando,
                        originalValues: pet.editando ? undefined : {
                            nome: pet.nome,
                            tipo: pet.tipo,
                            raca: pet.raca,
                            genero: pet.genero
                        }
                    }
                    : pet
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState(prevState => ({
            pets: prevState.pets.map(pet =>
                pet.id === id
                    ? {
                        ...pet,
                        editando: false,
                        nome: pet.originalValues?.nome || pet.nome,
                        tipo: pet.originalValues?.tipo || pet.tipo,
                        raca: pet.originalValues?.raca || pet.raca,
                        genero: pet.originalValues?.genero || pet.genero,
                        originalValues: undefined
                    }
                    : pet
            ),
        }));
    };

    handlePetInputChange = (id: number, campo: string, valor: string) => {
        this.setState(prevState => ({
            pets: prevState.pets.map(pet =>
                pet.id === id ? { ...pet, [campo]: valor } : pet
            ),
        }));
    };

    handleSaveEditClick = (id: number) => {
        const pet = this.state.pets.find(p => p.id === id);
        if (pet) {
            const { nome, tipo, raca, genero } = pet;
            axios.put(`http://localhost:5000/pets/${id}`, { nome, tipo, raca, genero })
                .then(response => {
                    this.setState(prevState => ({
                        pets: prevState.pets.map(p =>
                            p.id === id
                                ? { ...p, nome, tipo, raca, genero, editando: false }
                                : p
                        )
                    }));
                    alert("Pet atualizado com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao atualizar pet:', error.response?.data || error.message);
                    alert("Erro ao atualizar pet. Tente novamente.");
                });
        }
    };

    handleDeleteClick = (id: number) => {
        axios.post(`http://localhost:5000/pets/excluir/${id}`)
            .then(response => {
                this.fetchPets(); // Refresh the list of pets after deletion
                alert("Pet excluído com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao excluir pet:', error.response?.data || error.message);
                alert("Erro ao excluir pet. Tente novamente.");
            });
    };

    render() {
        const { pets, clientes, novoPet } = this.state;
        const { tema } = this.props;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Pet</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            name="clienteId"
                            value={novoPet.clienteId || ''}
                            onChange={this.handleInputChange}
                        >
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
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Nome"
                            name="nome"
                            value={novoPet.nome}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Tipo"
                            name="tipo"
                            value={novoPet.tipo}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="floatingInput">Tipo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Raça"
                            name="raca"
                            value={novoPet.raca}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="floatingInput">Raça</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Gênero"
                            name="genero"
                            value={novoPet.genero}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="floatingInput">Gênero</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>

                <h2 className="fs-4">Lista Pets</h2>
                <div className="list-group mb-3">
                    {pets.length === 0 ? (
                        <div className="list-group-item">Nenhum pet cadastrado</div>
                    ) : (
                        pets.map((pet) => (
                            <div key={pet.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                {pet.editando ? (
                                    <div>
                                        <span>Nome</span>
                                        <input
                                            type="text"
                                            value={pet.nome}
                                            onChange={(e) => this.handlePetInputChange(pet.id, 'nome', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                        <span>Tipo</span>
                                        <input
                                            type="text"
                                            value={pet.tipo}
                                            onChange={(e) => this.handlePetInputChange(pet.id, 'tipo', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                        <span>Raça</span>
                                        <input
                                            type="text"
                                            value={pet.raca}
                                            onChange={(e) => this.handlePetInputChange(pet.id, 'raca', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                        <span>Gênero</span>
                                        <input
                                            type="text"
                                            value={pet.genero}
                                            onChange={(e) => this.handlePetInputChange(pet.id, 'genero', e.target.value)}
                                            className="form-control mb-1"
                                        />
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column">
                                        <span>Nome do cliente: {pet.clienteNome}</span>
                                        <span>Nome: {pet.nome}</span>
                                        <span>Tipo: {pet.tipo}</span>
                                        <span>Raça: {pet.raca}</span>
                                        <span>Gênero: {pet.genero}</span>
                                    </div>
                                )}
                                <span>
                                    {pet.editando ? (
                                        <>
                                            <i
                                                className="bi bi-floppy me-2"
                                                role="button"
                                                title="Salvar"
                                                onClick={() => this.handleSaveEditClick(pet.id)}
                                            ></i>
                                            <i
                                                className="bi bi-x-lg me-2"
                                                role="button"
                                                title="Cancelar"
                                                onClick={() => this.handleCancelEdit(pet.id)}
                                            ></i>
                                        </>
                                    ) : (
                                        <>
                                            <i
                                                className="bi bi-pencil-square me-2"
                                                role="button"
                                                title="Editar"
                                                onClick={() => this.handleEditClick(pet.id)}
                                            ></i>
                                            <i
                                                className="bi bi-trash"
                                                role="button"
                                                title="Apagar"
                                                onClick={() => this.handleDeleteClick(pet.id)}
                                            ></i>
                                        </>
                                    )}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}
