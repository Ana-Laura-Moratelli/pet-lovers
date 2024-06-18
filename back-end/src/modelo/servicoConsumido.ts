export default class ServicoConsumido {
    static ultimoId: number = 0;
    public id: number;
    public clienteId: number;
    public petId: number;
    public servicoId: number;
    public quantidade: number;

    constructor(clienteId: number, petId: number, servicoId: number, quantidade: number) {
        ServicoConsumido.ultimoId++;
        this.id = ServicoConsumido.ultimoId;
        this.clienteId = clienteId;
        this.petId = petId;
        this.servicoId = servicoId;
        this.quantidade = quantidade;
    }
}
