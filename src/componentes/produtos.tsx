import { useState, ChangeEvent } from "react";

type Props = {
    tema: string
}

type Produto = {
    id: number,
    nome: string,
    quantidade: number,
    preco: number,
    editando: boolean,
};

export default function ListaProdutos({ tema }: Props) {
    const [produtos, setProdutos] = useState<Produto[]>([
        { id: 1, nome: 'Ração para Cães', quantidade: 10, preco: 5000, editando: false },
        { id: 2, nome: 'Ração para Gatos', quantidade: 15, preco: 4000, editando: false },
        { id: 3, nome: 'Cama para Cães', quantidade: 5, preco: 1000, editando: false },
    ]);
    const [value, setValue] = useState<string>('');

    const handleEditClick = (id: number) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.id === id ? { ...produto, editando: !produto.editando } : produto
            )
        );
    };

    const handleCancelEdit = (id: number) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.id === id ? { ...produto, editando: false } : produto
            )
        );
    };

    const handleInputChange = (id: number, campo: string, valor: string) => {
        const newValue = campo === 'preco' ? parseFloat(valor.replace(/\D/g, '')) : valor;
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.id === id ? { ...produto, [campo]: campo === 'preco' ? newValue : newValue } : produto
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



    const handleDeleteProduto = (id: number) => {
        setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== id));
    };

    return (
        <div className="container-fluid">
            <h2 className="fs-4">Cadastro Produto</h2>
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
                    <button className="btn btn-outline-info" type="button" style={{ background: tema }}>
                        Cadastrar
                    </button>
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
                                    onChange={(e) => handleInputChange(produto.id, 'nome', e.target.value)}
                                    className="form-control mb-1"
                                />
                                <span>Quantidade:</span>
                                <input
                                    type="text"
                                    value={produto.quantidade}
                                    onChange={(e) => handleInputChange(produto.id, 'quantidade', e.target.value)}
                                    className="form-control mb-1"
                                />
                                <span>Preço:</span>
                                <input
                                    type="text"
                                    value={formatCurrency(produto.preco)}
                                    onChange={(e) => handleInputChange(produto.id, 'preco', e.target.value)}
                                    className="form-control mb-1"
                                />
                            </div>
                        ) : (
                            <div className="d-flex flex-column">
                                <span>Nome: {produto.nome}</span>
                                <span>Quantidade: {produto.quantidade}</span>
                                <span>Preço: {formatCurrency(produto.preco)}</span>
                            </div>
                        )}
                        <span>
                            {produto.editando ? (
                                <>
                                    <i
                                        className="bi bi-floppy me-2"
                                        role="button"
                                        title="Salvar"
                                        onClick={() => handleEditClick(produto.id)}
                                    ></i>
                                    <i
                                        className="bi bi-x-lg me-2"
                                        role="button"
                                        title="Cancelar"
                                        onClick={() => handleCancelEdit(produto.id)}
                                    ></i>
                                </>
                            ) : (
                                <>
                                    <i
                                        className="bi bi-pencil-square me-2"
                                        role="button"
                                        title="Editar"
                                        onClick={() => handleEditClick(produto.id)}
                                    ></i>
                                    <i
                                        className="bi bi-trash"
                                        role="button"
                                        title="Apagar"
                                        onClick={() => handleDeleteProduto(produto.id)}
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
