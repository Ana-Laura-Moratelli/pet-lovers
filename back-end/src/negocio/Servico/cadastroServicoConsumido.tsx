import ServicoConsumido from "../../modelo/servicoConsumido";
import Servico from "../../modelo/servico";

export default class CadastroServicoConsumido {
    private servicosConsumidos: Array<ServicoConsumido>;
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        this.servicosConsumidos = [];
        this.servicos = servicos;
    }

    public cadastrar(clienteId: number, petId: number, servicoId: number, quantidade: number): ServicoConsumido | Error {
        const servico = this.servicos.find(prod => prod.id === servicoId);
        if (!servico) {
            return new Error("servico não encontrado");
        }

      

        const servicoConsumido = new ServicoConsumido(clienteId, petId, servicoId, quantidade);
        this.servicosConsumidos.push(servicoConsumido);
        return servicoConsumido;
    }

    public listar(): Array<ServicoConsumido> {
        return this.servicosConsumidos;
    }
}
