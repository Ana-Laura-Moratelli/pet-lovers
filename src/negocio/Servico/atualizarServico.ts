import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";

export default class AtualizarServico {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        if (this.servicos.length === 0) {
            console.log(`\nNão há serviços cadastrados.\n`);
            return;
        }

        console.log("\nAtualização de Serviço:");

        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - Nome: ${servico.nome}, Preço: ${servico.preco}`);
        });

        const indice = this.entrada.receberNumero("Digite o número do serviço que deseja atualizar: ") - 1;

        if (indice >= 0 && indice < this.servicos.length) {
            const servico = this.servicos[indice];
            let continuar = true;

            while (continuar) {
                console.log("\nEscolha uma opção para atualizar:");
                console.log("1 - Atualizar Nome");
                console.log("2 - Atualizar Preço");
                console.log("3 - Sair");

                let opcao = this.entrada.receberNumero("Digite o número da opção: ");

                switch (opcao) {
                    case 1:
                        let novoNome = this.entrada.receberTexto(`Novo nome do Serviço (atual: ${servico.nome}): `);
                        if (novoNome !== "") servico.nome = novoNome;
                        console.log("Nome do Serviço atualizado com sucesso!");
                        break;

                    case 2:
                        let novoPreco = this.entrada.receberNumero(`Novo preço do Serviço (atual: ${servico.preco}): `);
                        if (!isNaN(novoPreco) && novoPreco >= 0) servico.preco = novoPreco;
                        console.log("Preço do Serviço atualizado com sucesso!");
                        break;

                    case 3:
                        continuar = false;
                        console.log("Saindo da atualização de Serviço.");
                        break;

                    default:
                        console.log("Opção inválida. Por favor, tente novamente.");
                        break;
                }
            }
        } else {
            console.log("Número de serviço inválido!");
        }
    }
}
