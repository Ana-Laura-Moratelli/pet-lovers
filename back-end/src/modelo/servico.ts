export default class Servico {
    static ultimoId: number = 0;
    public id: number;
    private nome: string;
    private preco: number;

    constructor(nome: string, preco: number) {
        Servico.ultimoId++;
        this.id = Servico.ultimoId;
        this.nome = nome;
        this.preco = preco;
    }

    public get getNome() { return this.nome; }
    public get getPreco() { return this.preco; }

    public set setNome(nome: string) { this.nome = nome; }
    public set setPreco(preco: number) { this.preco = preco; }
}