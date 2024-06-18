export default class RG {
    static ultimoId: number = 0;
    public id: number
    private valor: string
    private dataEmissao: Date
    constructor(valor: string, dataEmissao: Date) {
        RG.ultimoId++;
        this.id = RG.ultimoId;
        this.valor = valor
        this.dataEmissao = dataEmissao
    }
    public get getValor(): string {
        return this.valor
    }
    public get getDataEmissao(): string {
        return this.dataEmissao.toDateString()
    }
}