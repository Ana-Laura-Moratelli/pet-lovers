import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";

export default class DeletarServico {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public deletar(): void {

        if (this.servicos.length === 0) {
            console.log(`\nNão há serviços cadastrados.\n`);
            return;
        }
        
        console.log("\nExclusão de Serviço:");

        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - Nome: ${servico.nome}, Preço: ${servico.preco}`);
        });

        const indice = this.entrada.receberNumero("Digite o número do serviço que deseja excluir: ") - 1;

        if (indice >= 0 && indice < this.servicos.length) {
            const servicoRemovido = this.servicos.splice(indice, 1);
            console.log(`Serviço ${servicoRemovido[0].nome} excluído com sucesso.`);
        } else {
            console.log("Número de serviço inválido!");
        }
    }
}
