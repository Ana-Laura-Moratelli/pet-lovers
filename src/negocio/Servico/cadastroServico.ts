import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";

export default class CadastroServico {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log("\nCadastro de Serviço:");

        const nome = this.entrada.receberTexto("Digite o nome do serviço: ");
        const preco = this.entrada.receberNumero("Digite o preço do serviço: ");

        const novoServico = new Servico(nome, preco);
        this.servicos.push(novoServico);

        console.log(`Serviço ${novoServico.nome} cadastrado com sucesso.`);
    }
}
