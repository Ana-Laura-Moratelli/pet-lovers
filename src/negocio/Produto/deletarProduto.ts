import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";

export default class DeletarProduto {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public deletar(): void {

        if (this.produtos.length === 0) {
            console.log(`\nNão há produtos cadastrados.\n`);
            return;
        }

        console.log("\nExclusão de Produto:");

        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - Nome: ${produto.nome}`);
        });

        const indiceProduto = this.entrada.receberNumero("Digite o número do produto que deseja excluir: ") - 1;

        if (indiceProduto >= 0 && indiceProduto < this.produtos.length) {
            const produtoRemovido = this.produtos.splice(indiceProduto, 1);
            console.log(`Produto ${produtoRemovido[0].nome} excluído com sucesso.`);
        } else {
            console.log("Número de produto inválido!");
        }
    }
}
