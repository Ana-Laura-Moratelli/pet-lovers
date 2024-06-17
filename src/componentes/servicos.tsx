import { useState, ChangeEvent } from "react";

type Props = {
    tema: string
}

type Servico = {
    id: number,
    nome: string,
    preco: number,
    editando: boolean,
};

export default function ListaServicos({ tema }: Props) {
    const [servicos, setServicos] = useState<Servico[]>([
        { id: 1, nome: 'Banho e Tosa',  preco: 5000, editando: false },
        { id: 2, nome: 'Hotel para Pets',  preco: 4000, editando: false },
        { id: 3, nome: 'Consulta Veterinária',  preco: 1000, editando: false },
    ]);
    const [value, setValue] = useState<string>('');

    const handleEditClick = (id: number) => {
        setServicos(prevServicos =>
            prevServicos.map(servico =>
                servico.id === id ? { ...servico, editando: !servico.editando } : servico
            )
        );
    };

    const handleCancelEdit = (id: number) => {
        setServicos(prevServicos =>
            prevServicos.map(servico =>
                servico.id === id ? { ...servico, editando: false } : servico
            )
        );
    };

    const handleInputChange = (id: number, campo: string, valor: string) => {
        const newValue = campo === 'preco' ? parseFloat(valor.replace(/\D/g, '')) : valor;
        setServicos(prevServicos =>
            prevServicos.map(servico =>
                servico.id === id ? { ...servico, [campo]: newValue } : servico
            )
        );
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        const formattedValue = formatCurrency(numericValue);
        setValue(formattedValue);
    };

    const formatCurrency = (value: string | number) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });

        const numericValue = typeof value === 'string' ? parseInt(value) : value;
        return formatter.format(numericValue / 100);
    };


    const handleDeleteServico = (id: number) => {
        setServicos(prevServicos => prevServicos.filter(servico => servico.id !== id));
    };

    return (
        <div className="container-fluid">
            <h2 className="fs-4">Cadastro Serviço</h2>
            <form>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputNome" placeholder="Nome" />
                    <label htmlFor="floatingInputNome">Nome</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInputQuantidade"
                        placeholder="Quantidade"
                        step="1"
                    />
                    <label htmlFor="floatingInputQuantidade">Quantidade</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputPreco"
                        placeholder="Preço"
                        value={value}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInputPreco">Preço</label>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-info" type="button" style={{ background: tema }} >
                        Cadastrar
                    </button>
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
                                    onChange={(e) => handleInputChange(servico.id, 'nome', e.target.value)}
                                    className="form-control mb-1"
                                />
                              
                                <span>Preço:</span>
                                <input
                                    type="text"
                                    value={formatCurrency(servico.preco)}
                                    onChange={(e) => handleInputChange(servico.id, 'preco', e.target.value)}
                                    className="form-control mb-1"
                                />
                            </div>
                        ) : (
                            <div className="d-flex flex-column">
                                <span>Nome: {servico.nome}</span>
                                <span>Preço: {formatCurrency(servico.preco)}</span>
                            </div>
                        )}
                        <span>
                            {servico.editando ? (
                                <>
                                    <i
                                        className="bi bi-floppy me-2"
                                        role="button"
                                        title="Salvar"
                                        onClick={() => handleEditClick(servico.id)}
                                    ></i>
                                    <i
                                        className="bi bi-x-lg me-2"
                                        role="button"
                                        title="Cancelar"
                                        onClick={() => handleCancelEdit(servico.id)}
                                    ></i>
                                </>
                            ) : (
                                <>
                                    <i
                                        className="bi bi-pencil-square me-2"
                                        role="button"
                                        title="Editar"
                                        onClick={() => handleEditClick(servico.id)}
                                    ></i>
                                    <i
                                        className="bi bi-trash"
                                        role="button"
                                        title="Apagar"
                                        onClick={() => handleDeleteServico(servico.id)}
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
