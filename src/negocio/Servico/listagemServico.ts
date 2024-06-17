import Servico from "../../modelo/servico";

export default class ListagemServico {
    private servicos: Servico[];

    constructor(servicos: Servico[]) {
        this.servicos = servicos;
    }

    public listar(): void {

        if (this.servicos.length === 0) {
            console.log(`\nNão há serviços cadastrados.\n`);
            return;
        }
        
        console.log("\nListagem de Serviços:");

        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - Nome: ${servico.nome}, Preço: ${servico.preco}`);
        });

        if (this.servicos.length === 0) {
            console.log("Nenhum serviço cadastrado.");
        }
    }
}
