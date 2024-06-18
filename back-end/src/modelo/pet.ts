export default class Pet {
    static ultimoId: number = 0;
    public id: number;
    private nome: string;
    private tipo: string;
    private raca: string;
    private genero: string;

    constructor(nome: string, tipo: string, raca: string, genero: string) {
        Pet.ultimoId++;
        this.id = Pet.ultimoId;
        this.nome = nome;
        this.tipo = tipo;
        this.raca = raca;
        this.genero = genero;
    }

    public get getNome() { return this.nome; }
    public get getTipo() { return this.tipo; }
    public get getRaca() { return this.raca; }
    public get getGenero() { return this.genero; }

    public set setNome(nome: string) { this.nome = nome; }
    public set setTipo(tipo: string) { this.tipo = tipo; }
    public set setRaca(raca: string) { this.raca = raca; }
    public set setGenero(genero: string) { this.genero = genero; }
}
