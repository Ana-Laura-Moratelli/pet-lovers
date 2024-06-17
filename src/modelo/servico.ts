export default class Servico {
    public nome!: string
    public preco!: number;
    public quantidadeConsumida: number; 

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantidadeConsumida = 0;
    }
}