import { Component, ChangeEvent } from "react";
import axios from 'axios';

type Props = {
    tema: string
}

type State = {
    value: string,
    clientes: Cliente[],
    pets: Pet[],
    servicos: Servico[],
    selectedClienteId: number | null,
    selectedPetId: number | null,
    selectedServicoId: number | null,
   
};

type Cliente = {
    id: number,
    nome: string
};

type Pet = {
    id: number,
    nome: string,
    clienteId: number
};

type Servico = {
    id: number,
    nome: string,
};

export default class CadastroServicosConsumidos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            clientes: [],
            pets: [],
            servicos: [],
            selectedClienteId: null,
            selectedPetId: null,
            selectedServicoId: null,
        };
    }

    componentDidMount() {
        this.fetchClientes();
        this.fetchServicos();
    }

    fetchClientes = () => {
        axios.get('http://localhost:5000/clientes')
            .then(response => this.setState({ clientes: response.data }))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }

    fetchServicos = () => {
        axios.get('http://localhost:5000/servicos')
            .then(response => this.setState({ servicos: response.data }))
            .catch(error => console.error('Erro ao buscar serviços:', error));
    }

    fetchPets = (clienteId: number) => {
        axios.get(`http://localhost:5000/clientes/${clienteId}/pets`)
            .then(response => this.setState({ pets: response.data }))
            .catch(error => console.error('Erro ao buscar pets:', error));
    }

    handleChangeCliente = (event: ChangeEvent<HTMLSelectElement>) => {
        const clienteId = parseInt(event.target.value);
        this.setState({ selectedClienteId: clienteId, pets: [], selectedPetId: null });
        this.fetchPets(clienteId);
    }

    handleChangePet = (event: ChangeEvent<HTMLSelectElement>) => {
        const petId = parseInt(event.target.value);
        this.setState({ selectedPetId: petId });
    }

    handleChangeServico = (event: ChangeEvent<HTMLSelectElement>) => {
        const servicoId = parseInt(event.target.value);
        this.setState({ selectedServicoId: servicoId });
    }

  

    handleSubmit = () => {
        const { selectedClienteId, selectedPetId, selectedServicoId, servicos } = this.state;
        if (selectedClienteId && selectedPetId && selectedServicoId ) {
            const servico = servicos.find(p => p.id === selectedServicoId);
            if (servico) {
               
                axios.post('http://localhost:5000/servicos-consumidos', {
                    clienteId: selectedClienteId,
                    petId: selectedPetId,
                    servicoId: selectedServicoId,
                    
                })
                    .then(response => {
                        alert('Serviço consumido cadastrado com sucesso!');
                        this.setState({
                            selectedClienteId: null,
                            selectedPetId: null,
                            selectedServicoId: null,
                           
                            pets: []
                        });
                        this.fetchServicos();
                       
                    })
                    .catch(error => {
                        alert(error.response.data || 'Erro ao cadastrar serviço consumido');
                        console.error('Erro ao cadastrar serviço consumido:', error);
                    });
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    render() {
        const { tema } = this.props;
        const { clientes, pets, servicos, selectedClienteId, selectedPetId, selectedServicoId } = this.state;

        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Serviço Consumido</h2>
                <form>
                    <div className="mb-3">
                        <select className="form-select" value={selectedClienteId ?? ''} onChange={this.handleChangeCliente}>
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
                    <div className="mb-3">
                        <select className="form-select" value={selectedPetId ?? ''} onChange={this.handleChangePet} disabled={!selectedClienteId}>
                            <option value="" disabled>Selecione o Pet</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>{pet.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" value={selectedServicoId ?? ''} onChange={this.handleChangeServico}>
                            <option value="" disabled>Selecione o Serviço</option>
                            {servicos.length === 0 ? (
                                <option value="" disabled>Nenhum serviço encontrado</option>
                            ) : (
                                servicos.map(servico => (
                                    <option key={servico.id} value={servico.id}>{servico.nome}</option>
                                ))
                            )}
                        </select>
                    </div>
                  

                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" onClick={this.handleSubmit} style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}
