import { Component, ChangeEvent } from "react";
import axios from "axios";

type Props = {
    tema: string
}

type TelefoneInfo = {
    ddd: string,
    telefone: string;
};

type RgInfo = {
    rg: string;
    dataEmissao: string;
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: { cpf: string, dataEmissao: any }
    rgList: RgInfo[];
    telefoneList: TelefoneInfo[];
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    state: State = {
        nome: "",
        nomeSocial: "",
        cpf: { cpf: '', dataEmissao: '' },
        rgList: [{ rg: "", dataEmissao: "" }],
        telefoneList: [{ ddd: '', telefone: "" }],
    };

    addRgField = () => {
        this.setState((prevState) => ({
            rgList: [...prevState.rgList, { rg: "", dataEmissao: "" }],
        }));
    };

    addTelefoneField = () => {
        this.setState((prevState) => ({
            telefoneList: [...prevState.telefoneList, { ddd: '', telefone: "" }],
        }));
    };

    handleRgChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        this.setState((prevState) => {
            const updatedRgList = [...prevState.rgList];
            updatedRgList[index].rg = value;
            return { rgList: updatedRgList };
        });
    };

    handleDataEmissaoChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        this.setState((prevState) => {
            const updatedRgList = [...prevState.rgList];
            updatedRgList[index].dataEmissao = value;
            return { rgList: updatedRgList };
        });
    };

    handleDDDChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        this.setState((prevState) => {
            const updatedTelefoneList = [...prevState.telefoneList];
            updatedTelefoneList[index].ddd = value;
            return { telefoneList: updatedTelefoneList };
        });
    };

    handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        this.setState((prevState) => {
            const updatedTelefoneList = [...prevState.telefoneList];
            updatedTelefoneList[index].telefone = value;
            return { telefoneList: updatedTelefoneList };
        });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let data = {
            'nome': this.state.nome,
            'nomeSocial': this.state.nomeSocial,
            'cpf': this.state.cpf,
            'rg': this.state.rgList,
            'telefone': this.state.telefoneList
        }
        console.log("Dados enviados:", data); // Adicionando mensagem de depuração
        axios.post('http://localhost:5000/clientes', data)
            .then((response) => {
                alert("Cliente cadastrado com sucesso!");
                this.setState({
                    nome: "",
                    nomeSocial: "",
                    cpf: { cpf: '', dataEmissao: '' },
                    rgList: [{ rg: "", dataEmissao: "" }],
                    telefoneList: [{ ddd: '', telefone: "" }],
                });
            })
            .catch(function (error) {
                if (error.response.data) {
                    alert("CPF já cadastrado!");
                }
            });
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string, maxLength: number) => {
        const value = e.target.value.slice(0, maxLength);
        this.setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }

    handleCpfChange = (e: ChangeEvent<HTMLInputElement>, field: string, maxLength: number) => {
        const value = e.target.value.slice(0, maxLength);
        this.setState((prevState) => ({
            cpf: {
                ...prevState.cpf,
                [field]: value,
            }
        }));
    }

    render() {
        let tema = this.props.tema;
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Cliente</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={this.state.nome} placeholder="Nome" onChange={(e) => this.handleInputChange(e, "nome", 50)} required />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={this.state.nomeSocial} placeholder="Nome Social" onChange={(e) => this.handleInputChange(e, "nomeSocial", 30)} required />
                        <label htmlFor="floatingNomeSocial">Nome Social</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" value={this.state.cpf.cpf} placeholder="CPF" onChange={(e) => this.handleCpfChange(e, "cpf", 11)} required />
                        <label htmlFor="floatingCPF">CPF</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="date" className="form-control" value={this.state.cpf.dataEmissao} placeholder="Data de emissão CPF" onChange={(e) => this.handleCpfChange(e, "dataEmissao", 10)} required />
                        <label htmlFor="floatingDataEmissaoCPF">Data de emissão CPF</label>
                    </div>

                    <label className="form-titulo">RG e sua data de emissão:</label>
                    {this.state.rgList.map((rg, index) => (
                        <div key={index} className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Digite o RG"
                                value={rg.rg}
                                onChange={(e) => this.handleRgChange(e, index)} required
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 9) {
                                        e.currentTarget.value = e.currentTarget.value.slice(0, 9);
                                    }
                                }}
                            />
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Data de Emissão do RG"
                                value={rg.dataEmissao}
                                onChange={(e) => this.handleDataEmissaoChange(e, index)} required
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 10) {
                                        e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                                    }
                                }}
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

                    <br />

                    <label className="form-titulo">Telefone:</label>
                    {this.state.telefoneList.map((telefone, index) => (
                        <div key={index} className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Digite o DDD do telefone"
                                value={telefone.ddd}
                                onChange={(e) => this.handleDDDChange(e, index)} required
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 2) {
                                        e.currentTarget.value = e.currentTarget.value.slice(0, 2);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Digite o número do telefone"
                                value={telefone.telefone}
                                onChange={(e) => this.handleTelefoneChange(e, index)} required
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 9) {
                                        e.currentTarget.value = e.currentTarget.value.slice(0, 9);
                                    }
                                }}
                            />
                        </div>
                    ))}

                    <button
                        className="btn btn-outline-info"
                        type="button"
                        style={{ background: tema, marginBottom: 10 }}
                        onClick={this.addTelefoneField}
                    >
                        Adicionar Telefone
                    </button>

                    <div className="input-group mb-3 d-flex justify-content-center">
                        <button className="btn btn-outline-info" type="submit" style={{ background: tema }}>
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
