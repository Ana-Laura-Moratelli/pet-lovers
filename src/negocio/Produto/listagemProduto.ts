import Produto from "../../modelo/produto";

export default class ListagemProdutos {
    private produtos: Produto[];

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
    }

    public listar(): void {

        if (this.produtos.length === 0) {
            console.log(`\nNão há produtos cadastrados.\n`);
            return;
        }

        console.log("\nListagem de Produtos:");

        if (this.produtos.length === 0) {
            console.log("Nenhum produto cadastrado.");
        } else {
            this.produtos.forEach((produto, index) => {
                console.log(`${index + 1} - Nome: ${produto.nome}, Preço: ${produto.preco}, Quantidade: ${produto.quantidade}`);
            });
        }
    }
}
