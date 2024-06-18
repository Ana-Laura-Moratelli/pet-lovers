export default class Produto {
    static ultimoId: number = 0;
    public id: number;
    private nome: string;
    private quantidade: number;
    private preco: number;
    public quantidadeConsumida: number; 

    constructor(nome: string, quantidade: number, preco: number) {
        Produto.ultimoId++;
        this.id = Produto.ultimoId;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.quantidadeConsumida = 0; 
    }

    public get getNome() { return this.nome; }
    public get getQuantidade() { return this.quantidade; }
    public get getPreco() { return this.preco; }

    public set setNome(nome: string) { this.nome = nome; }
    public set setQuantidade(quantidade: number) { this.quantidade = quantidade; }
    public set setPreco(preco: number) { this.preco = preco; }

    public consumir(quantidade: number): boolean {
        if (quantidade > this.quantidade - this.quantidadeConsumida) {
            return false;
        }
        this.quantidadeConsumida += quantidade;
        return true;
    }
}
