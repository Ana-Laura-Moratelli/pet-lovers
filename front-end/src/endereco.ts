export default class Endereco {
    private estado: string
    private cidade: string
    private bairro: string
    private rua: string
    private codigoPostal: string
    private numero: string
    private informacoesAdicionais: string

    constructor(estado:string,cidade:string,bairro:string,rua:string,codigoPostal:string, numero:string, informacoesAdicionais: string) {
        this.estado = estado
        this.cidade = cidade
        this.bairro = bairro
        this.rua = rua
        this.codigoPostal = codigoPostal
        this.numero = numero
        this.informacoesAdicionais = informacoesAdicionais
    }
}