export default class Telefone {
    static ultimoId: number = 0;
    public id: number
    private ddd: string;
    private numero: string;

    constructor(ddd: string, numero: string) {
        Telefone.ultimoId++;
        this.id = Telefone.ultimoId;
        this.ddd = ddd;
        this.numero = numero;
    }

    public get getDdd(): string {
        return this.ddd;
    }

    public get getNumero(): string {
        return this.numero;
    }

    public setDdd(novoValor: string): void {
        this.ddd = novoValor;
    }

    public setNumero(novoNumero: string): void {
        this.numero = novoNumero;
    }
}
