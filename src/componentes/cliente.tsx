import { Component } from "react";
import InputMask from "react-input-mask";

type Props = {
    tema: string
}

type RG = {
    rg: string,
    dataEmissao: string,
};

type Cliente = {
    id: number,
    nome: string,
    nomeSocial: string,
    cpf: string,
    dataEmissaoCpf: string,
    rgs: RG[],
    celulares: { numero: string }[],
    dataCadastro: Date,
    editando: boolean,
    pets: Pet[],
    produtosConsumidos: ProdutoConsumido[],
    servicosConsumidos: ServicoConsumido[],
};

type Pet = {
    id: number;
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

type State = {
    clientes: Cliente[],
    rgs: { rg: string, dataEmissao: string }[],
    celulares: { numero: string }[],
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [
                {
                    id: 1,
                    nome: 'Cliente 1',
                    nomeSocial: 'Nome Social 1',
                    cpf: '123.456.789-00',
                    dataEmissaoCpf: '25/05/2024',
                    rgs: [{ rg: '12.345.678-9', dataEmissao: '25/05/2024' }],
                    celulares: [{ numero: '(12) 34567-8910' }],
                    dataCadastro: new Date('2023-01-01'),
                    editando: false,
                    pets: [
                        { id: 1, nome: 'Pet 1', tipo: 'Cachorro', raca: 'Shihtzu', genero: 'Macho' },
                        { id: 2, nome: 'Pet 2', tipo: 'Gato', raca: 'Siamês', genero: 'Fêmea' }
                    ],
                    produtosConsumidos: [
                        { id: 1, nome: 'Ração para Cães', quantidade: 10 },
                        { id: 2, nome: 'Brinquedo para Gatos', quantidade: 5 }
                    ],
                    servicosConsumidos: [
                        { id: 1, nome: 'Banho e Tosa' },
                        { id: 2, nome: 'Consulta Veterinária' }
                    ]
                },
                {
                    id: 2,
                    nome: 'Cliente 2',
                    nomeSocial: 'Nome Social 2',
                    cpf: '987.654.321-00',
                    dataEmissaoCpf: '25/05/2024',
                    rgs: [{ rg: '98.765.432-1', dataEmissao: '25/05/2024' }],
                    celulares: [{ numero: '(98) 76543-2109' }],
                    dataCadastro: new Date('2023-01-01'),
                    editando: false,
                    pets: [
                        { id: 3, nome: 'Pet 3', tipo: 'Cachorro', raca: 'Labrador', genero: 'Macho' }
                    ],
                    produtosConsumidos: [
                        { id: 3, nome: 'Ração para Gatos', quantidade: 8 }
                    ],
                    servicosConsumidos: [
                        { id: 3, nome: 'Consulta Veterinária' }
                    ]
                },
                {
                    id: 3,
                    nome: 'Cliente 3',
                    nomeSocial: 'Nome Social 3',
                    cpf: '123.123.123-12',
                    dataEmissaoCpf: '25/05/2024',
                    rgs: [{ rg: '12.123.123-1', dataEmissao: '25/05/2024' }],
                    celulares: [{ numero: '(12) 12345-1234' }],
                    dataCadastro: new Date('2023-01-01'),
                    editando: false,
                    pets: [
                        { id: 4, nome: 'Pet 4', tipo: 'Gato', raca: 'Persa', genero: 'Fêmea' }
                    ],
                    produtosConsumidos: [
                        { id: 4, nome: 'Cama para Gatos', quantidade: 3 }
                    ],
                    servicosConsumidos: [
                        { id: 4, nome: 'Banho e Tosa' }
                    ]
                }
            ],
            rgs: [{ rg: '', dataEmissao: '' }],
            celulares: [{ numero: '' }],
        };
    }
    handleEditClick = (id: number) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === id ? { ...cliente, editando: !cliente.editando } : cliente
            ),
        }));
    };

    handleCancelEdit = (id: number) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === id ? { ...cliente, editando: false } : cliente
            ),
        }));
    };

    handleInputChange = (id: number, campo: string, valor: string) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === id ? { ...cliente, [campo]: valor } : cliente
            ),
        }));
    };

    handleDeleteCliente = (id: number) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.filter(cliente => cliente.id !== id),
        }));
    };

    handleRgChange = (index: number, field: string, value: string) => {
        this.setState((prevState) => {
            const newRgs = [...prevState.rgs];
            newRgs[index] = { ...newRgs[index], [field]: value };
            return { rgs: newRgs };
        });
    };

    handleCelularChange = (index: number, value: string) => {
        this.setState((prevState) => {
            const newCelulares = [...prevState.celulares];
            newCelulares[index] = { numero: value };
            return { celulares: newCelulares };
        });
    };

    addRgField = () => {
        this.setState((prevState) => ({
            rgs: [...prevState.rgs, { rg: '', dataEmissao: '' }],
        }));
    };

    addCelularField = () => {
        this.setState((prevState) => ({
            celulares: [...prevState.celulares, { numero: '' }],
        }));
    };

    render() {
        const { clientes, rgs, celulares } = this.state;
        const { tema } = this.props;
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Cliente</h2>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nome" />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingNomeSocial" placeholder="Nome Social" />
                        <label htmlFor="floatingNomeSocial">Nome Social</label>
                    </div>
                    <div className="form-floating mb-3">
                        <InputMask
                            mask="999.999.999-99"
                            className="form-control"
                            id="floatingCPF"
                            placeholder="CPF"
                        />
                        <label htmlFor="floatingCPF">CPF</label>
                    </div>
                    <div className="form-floating mb-3">
                        <InputMask
                            mask="99/99/9999"
                            className="form-control"
                            id="floatingDataCPF"
                            placeholder="Data Emissão CPF"
                        />
                        <label htmlFor="floatingDataCPF">Data Emissão CPF</label>
                    </div>
                    {rgs.map((rg, index) => (
                        <div key={index} className="input-group mb-3">
                            <InputMask
                                mask="99.999.999-9"
                                className="form-control"
                                id={`floatingRG-${index}`}
                                placeholder="RG"
                                value={rg.rg}
                                onChange={(e) => this.handleRgChange(index, 'rg', e.target.value)}
                            />
                            <InputMask
                                mask="99/99/9999"
                                className="form-control"
                                id={`floatingDataRG-${index}`}
                                placeholder="Data Emissão RG"
                                value={rg.dataEmissao}
                                onChange={(e) => this.handleRgChange(index, 'dataEmissao', e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        style={{ background: tema, marginBottom: 10 }}
                        onClick={this.addRgField}
                    >
                        Adicionar RG
                    </button>
                    {celulares.map((celular, index) => (
                        <div key={index} className="form-floating mb-3">
                            <InputMask
                                mask="(99) 99999-9999"
                                className="form-control"
                                id={`floatingCel-${index}`}
                                placeholder="Telefone"
                                value={celular.numero}
                                onChange={(e) => this.handleCelularChange(index, e.target.value)}
                            />
                            <label htmlFor={`floatingCel-${index}`}>Telefone</label>
                        </div>
                    ))}
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        style={{ background: tema, marginBottom: 10 }}
                        onClick={this.addCelularField}
                    >
                        Adicionar Telefone
                    </button>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Lista Clientes</h2>
                <div className="list-group mb-3">
                    {clientes.map(cliente => (
                        <div key={cliente.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            {cliente.editando ? (
                                <div>
                                    <span>Nome:</span>
                                    <input
                                        type="text"
                                        value={cliente.nome}
                                        onChange={(e) => this.handleInputChange(cliente.id, 'nome', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Nome Social:</span>
                                    <input
                                        type="text"
                                        value={cliente.nomeSocial}
                                        onChange={(e) => this.handleInputChange(cliente.id, 'nomeSocial', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>CPF:</span>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cliente.cpf}
                                        onChange={(e) => this.handleInputChange(cliente.id, 'cpf', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    <span>Data emissão CPF:</span>
                                    <InputMask
                                        mask="99/99/9999"
                                        value={cliente.dataEmissaoCpf}
                                        onChange={(e) => this.handleInputChange(cliente.id, 'dataEmissaoCpf', e.target.value)}
                                        className="form-control mb-1"
                                    />
                                    {cliente.rgs.map((rg, idx) => (
                                        <div key={idx}>
                                            <span>RGs:</span>
                                            <InputMask
                                                mask="99.999.999-9"
                                                value={rg.rg}
                                                onChange={(e) => this.handleInputChange(cliente.id, `rgs[${idx}].rg`, e.target.value)}
                                                className="form-control mb-1"
                                            />
                                            <span>Data emissão RG:</span>
                                            <InputMask
                                                mask="99/99/9999"
                                                value={rg.dataEmissao}
                                                onChange={(e) => this.handleInputChange(cliente.id, `rgs[${idx}].dataEmissao`, e.target.value)}
                                                className="form-control mb-1"
                                            />
                                        </div>
                                    ))}
                                    {cliente.celulares.map((celular, idx) => (
                                        <div key={idx}>
                                            <span>Telefones:</span>
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={celular.numero}
                                                onChange={(e) => this.handleInputChange(cliente.id, `celulares[${idx}].numero`, e.target.value)}
                                                className="form-control mb-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="d-flex flex-column">
                                    <span>Data de Cadastro: {cliente.dataCadastro.toLocaleDateString()}</span>
                                    <span>Nome: {cliente.nome}</span>
                                    <span>Nome Social: {cliente.nomeSocial}</span>
                                    <span>CPF: {cliente.cpf}</span>
                                    <span>Data emissão CPF: {cliente.dataEmissaoCpf}</span>
                                    <span>RGs: {cliente.rgs.map(rg => rg.rg).join(', ')}</span>
                                    <span>Data emissão RG: {cliente.rgs.map(rg => rg.dataEmissao).join(', ')}</span>
                                    <span>Telefones: {cliente.celulares.map(celular => celular.numero).join(', ')}</span>
                                    <span>Pets:</span>
                                    <ul>
                                        {cliente.pets.map(pet => (
                                            <li key={pet.id}>{pet.nome} ({pet.tipo} - {pet.raca} - {pet.genero})</li>
                                        ))}
                                    </ul>
                                    <span>Produtos Consumidos:</span>
                                    <ul>
                                        {cliente.produtosConsumidos.map(produto => (
                                            <li key={produto.id}>{produto.nome} (Quantidade: {produto.quantidade})</li>
                                        ))}
                                    </ul>
                                    <span>Serviços Consumidos:</span>
                                    <ul>
                                        {cliente.servicosConsumidos.map(servico => (
                                            <li key={servico.id}>{servico.nome}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <span>
                                {cliente.editando ? (
                                    <>
                                        <i
                                            className="bi bi-floppy me-2"
                                            role="button"
                                            title="Salvar"
                                            onClick={() => this.handleEditClick(cliente.id)}
                                        ></i>
                                        <i
                                            className="bi bi-x-lg me-2"
                                            role="button"
                                            title="Cancelar"
                                            onClick={() => this.handleCancelEdit(cliente.id)}
                                        ></i>
                                    </>
                                ) : (
                                    <>
                                        <i
                                            className="bi bi-pencil-square me-2"
                                            role="button"
                                            title="Editar"
                                            onClick={() => this.handleEditClick(cliente.id)}
                                        ></i>
                                        <i className="bi bi-trash"
                                            role="button"
                                            title="Apagar"
                                            onClick={() => this.handleDeleteCliente(cliente.id)}></i>
                                    </>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
