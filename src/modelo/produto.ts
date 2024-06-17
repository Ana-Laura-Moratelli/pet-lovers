export default class Produto {
    public nome!: string;
    public preco!: number;
    public quantidade: number;
    public quantidadeConsumida: number; 

    constructor(nome: string, preco: number, quantidade: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.quantidadeConsumida = 0; 

    }

      public consumir(quantidade: number): void {
        this.quantidadeConsumida += quantidade;
    }
}
