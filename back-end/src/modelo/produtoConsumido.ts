export default class ProdutoConsumido {
    static ultimoId: number = 0;
    public id: number;
    public clienteId: number;
    public petId: number;
    public produtoId: number;
    public quantidade: number;

    constructor(clienteId: number, petId: number, produtoId: number, quantidade: number) {
        ProdutoConsumido.ultimoId++;
        this.id = ProdutoConsumido.ultimoId;
        this.clienteId = clienteId;
        this.petId = petId;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }
}
