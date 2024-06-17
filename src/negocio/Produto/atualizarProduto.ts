import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";

export default class AtualizarProduto {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        if (this.produtos.length === 0) {
            console.log(`\nNão há produtos cadastrados.\n`);
            return;
        }

        console.log("\nAtualização de Produto:");

        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - Nome: ${produto.nome}`);
        });

        const indiceProduto = this.entrada.receberNumero("Digite o número do produto que deseja atualizar: ") - 1;

        if (indiceProduto >= 0 && indiceProduto < this.produtos.length) {
            const produto = this.produtos[indiceProduto];
            let continuar = true;

            while (continuar) {
                console.log("\nEscolha uma opção para atualizar:");
                console.log("1 - Atualizar Nome");
                console.log("2 - Atualizar Preço");
                console.log("3 - Atualizar Quantidade");
                console.log("4 - Sair");

                let opcao = this.entrada.receberNumero("Digite o número da opção: ");

                switch (opcao) {
                    case 1:
                        let novoNome = this.entrada.receberTexto(`Novo nome do Produto (atual: ${produto.nome}): `);
                        if (novoNome !== "") produto.nome = novoNome;
                        console.log("Nome do Produto atualizado com sucesso!");
                        break;

                    case 2:
                        let novoPreco = this.entrada.receberNumero(`Novo preço do Produto (atual: ${produto.preco}): `);
                        if (!isNaN(novoPreco) && novoPreco >= 0) produto.preco = novoPreco;
                        console.log("Preço do Produto atualizado com sucesso!");
                        break;

                    case 3:
                        let novaQuantidade = this.entrada.receberNumero(`Nova quantidade do Produto (atual: ${produto.quantidade}): `);
                        if (!isNaN(novaQuantidade) && novaQuantidade >= 0) produto.quantidade = novaQuantidade;
                        console.log("Quantidade do Produto atualizada com sucesso!");
                        break;

                    case 4:
                        continuar = false;
                        console.log("Saindo da atualização de Produto.");
                        break;

                    default:
                        console.log("Opção inválida. Por favor, tente novamente.");
                        break;
                }
            }
        } else {
            console.log("Número de produto inválido!");
        }
    }
}
