import { Component } from "react";

type Props = {
    tema: string
}

type Pet = {
    id: number,
    cliente: string,
    nome: string,
    tipo: string,
    raca: string,
    genero: string,
    editando: boolean,
};

type State = {
    pets: Pet[],
};

export default class ListaPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pets: [
                { id: 1, cliente: 'Ana', nome: 'Pet 1', tipo: 'Cachorro', raca: 'Raca 1', genero: 'Macho', editando: false },
                { id: 2, cliente: 'Ana', nome: 'Pet 2', tipo: 'Gato', raca: 'Raca 2', genero: 'Fêmea', editando: false },
                { id: 3, cliente: 'Ana', nome: 'Pet 3', tipo: 'Cachorro', raca: 'Raca 3', genero: 'Macho', editando: false },
            ],
        };
    }

    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            pets: prevState.pets.map(pets =>
                pets.id === id ? { ...pets, editando: !pets.editando } : pets
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            pets: prevState.pets.map(pet =>
                pet.id === id ? { ...pet, editando: false } : pet
            ),
        }));
    };

    handleInputChange = (id: number, campo: string, valor: string) => {
        this.setState((prevState) => ({
            pets: prevState.pets.map(cliente =>
                cliente.id === id ? { ...cliente, [campo]: valor } : cliente
            ),
        }));
    };

    handleDelete = (id: number) => {
        this.setState((prevState) => ({
            pets: prevState.pets.filter(pet => pet.id !== id),
        }));
    };

    render() {
        const { pets } = this.state;
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Pet</h2>

                <form>
                    <div className=" mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Cliente</option>
                            <option value="1">Cliente 1</option>
                            <option value="2">Cliente 2</option>
                            <option value="3">Cliente 3</option>
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="nome" className="form-control" id="floatingInput" placeholder="Nome" />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Tipo" />
                        <label htmlFor="floatingInput">Tipo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Raça" />
                        <label htmlFor="floatingInput">Raça</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Gênero" />
                        <label htmlFor="floatingInput">Gênero</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Lista Pets</h2>
                <div className="list-group mb-3">
                    {pets.map(pet => (
                        <div key={pet.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            {pet.editando ? (
                                <div>
                                    <span>Nome:</span>
                                    <input
                                        type="text"
                                        value={pet.nome}
                                        onChange={(e) => this.handleInputChange(pet.id, 'nome', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Tipo:</span>
                                    <input
                                        type="text"
                                        value={pet.tipo}
                                        onChange={(e) => this.handleInputChange(pet.id, 'tipo', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Raça:</span>
                                    <input
                                        type="text"
                                        value={pet.raca}
                                        onChange={(e) => this.handleInputChange(pet.id, 'raca', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Gênero:</span>
                                    <input
                                        type="text"
                                        value={pet.genero}
                                        onChange={(e) => this.handleInputChange(pet.id, 'genero', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                </div>
                            ) : (
                                <div className="d-flex flex-column">
                                    <span>Nome do cliente: {pet.cliente}</span>
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
                                            onClick={() => this.handleEditClick(pet.id)}
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
                                        <i className="bi bi-trash"
                                            role="button"
                                            title="Apagar"
                                            onClick={() => this.handleDelete(pet.id)}></i>
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