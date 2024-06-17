import { useState } from "react";

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

export default function FormularioCadastroPet({ tema }: Props) {
    const [pets, setPets] = useState<Pet[]>([
        { id: 1, cliente: 'Ana', nome: 'Pet 1', tipo: 'Cachorro', raca: 'Raca 1', genero: 'Macho', editando: false },
        { id: 2, cliente: 'Ana', nome: 'Pet 2', tipo: 'Gato', raca: 'Raca 2', genero: 'Fêmea', editando: false },
        { id: 3, cliente: 'Ana', nome: 'Pet 3', tipo: 'Cachorro', raca: 'Raca 3', genero: 'Macho', editando: false },
    ]);

    const handleEditClick = (id: number) => {
        setPets(prevPets =>
            prevPets.map(pet =>
                pet.id === id ? { ...pet, editando: !pet.editando } : pet
            )
        );
    };

    const handleCancelEdit = (id: number) => {
        setPets(prevPets =>
            prevPets.map(pet =>
                pet.id === id ? { ...pet, editando: false } : pet
            )
        );
    };

    const handleInputChange = (id: number, campo: string, valor: string) => {
        setPets(prevPets =>
            prevPets.map(pet =>
                pet.id === id ? { ...pet, [campo]: valor } : pet
            )
        );
    };

    const handleDeletePet = (id: number) => {
        setPets(prevPets => prevPets.filter(pet => pet.id !== id));
    };



    return (
        <div className="container-fluid">
            <h2 className="fs-4">Cadastro Pet</h2>

            <form>
                <div className="mb-3">
                    <select className="form-select" aria-label="Floating label select example">
                        <option selected>Selecione o Cliente</option>
                        <option value="1">Cliente 1</option>
                        <option value="2">Cliente 2</option>
                        <option value="3">Cliente 3</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputNome" placeholder="Nome" />
                    <label htmlFor="floatingInputNome">Nome</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputTipo" placeholder="Tipo" />
                    <label htmlFor="floatingInputTipo">Tipo</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputRaca" placeholder="Raça" />
                    <label htmlFor="floatingInputRaca">Raça</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputGenero" placeholder="Gênero" />
                    <label htmlFor="floatingInputGenero">Gênero</label>
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
                                    onChange={(e) => handleInputChange(pet.id, 'nome', e.target.value)}
                                    className="form-control mb-1"
                                />
                                <span>Tipo:</span>
                                <input
                                    type="text"
                                    value={pet.tipo}
                                    onChange={(e) => handleInputChange(pet.id, 'tipo', e.target.value)}
                                    className="form-control mb-1"
                                />
                                <span>Raça:</span>
                                <input
                                    type="text"
                                    value={pet.raca}
                                    onChange={(e) => handleInputChange(pet.id, 'raca', e.target.value)}
                                    className="form-control mb-1"
                                />
                                <span>Gênero:</span>
                                <input
                                    type="text"
                                    value={pet.genero}
                                    onChange={(e) => handleInputChange(pet.id, 'genero', e.target.value)}
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
                                        onClick={() => handleEditClick(pet.id)}
                                    ></i>
                                    <i
                                        className="bi bi-x-lg me-2"
                                        role="button"
                                        title="Cancelar"
                                        onClick={() => handleCancelEdit(pet.id)}
                                    ></i>
                                </>
                            ) : (
                                <>
                                    <i
                                        className="bi bi-pencil-square me-2"
                                        role="button"
                                        title="Editar"
                                        onClick={() => handleEditClick(pet.id)}
                                    ></i>
                                    <i
                                        className="bi bi-trash"
                                        role="button"
                                        title="Apagar"
                                        onClick={() => handleDeletePet(pet.id)}
                                    ></i>
                                </>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
