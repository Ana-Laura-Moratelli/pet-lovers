export default class CPF {
    private valor: string
    private dataEmissao: Date
    constructor(valor: string, dataEmissao: Date) {
        this.valor = valor;
        this.dataEmissao = dataEmissao;
    }
    public get getValor(): string {
        return this.valor
    }
    public setValor(novoValor: string): void {
        this.valor = novoValor;
    }
    public get getDataEmissao(): Date {
        return this.dataEmissao
    }
    public setDataEmissao(novaData: string): void {
        const partesData = novaData.split('/');
        const dia = parseInt(partesData[0]);
        const mes = parseInt(partesData[1]) - 1;
        const ano = parseInt(partesData[2]);
        this.dataEmissao = new Date(ano, mes, dia);
    }
}