import Servico from "../../modelo/servico";
import Cadastro from "../cadastro";

export default class Cadastroservico extends Cadastro {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
    }

    public cadastrar(data: { nome: string, quantidade: number, preco: number }): void {
        let servico = new Servico(data.nome, data.preco);
        this.servicos.push(servico);
    }

    public listarServicos(): Array<Servico> {
        return this.servicos;
    }

    public atualizarServico(id: number, data: { nome: string, quantidade: number, preco: number }): void {
        const servico = this.servicos.find(servico => servico.id === id);
        if (servico) {
            servico.setNome = data.nome;
            servico.setPreco = data.preco;
        }
    }

    public excluirServico(id: number): void {
        this.servicos = this.servicos.filter(servico => servico.id !== id);
    }
}
