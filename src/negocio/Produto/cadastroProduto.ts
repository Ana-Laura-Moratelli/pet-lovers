import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";

export default class CadastroProduto {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log("\nCadastro de Produto:");

        const nome = this.entrada.receberTexto("Digite o nome do produto: ");
        const preco = this.entrada.receberNumero("Digite o preço do produto: ");
        const quantidade = this.entrada.receberNumero("Digite a quantidade do produto: ");

        const novoProduto = new Produto(nome, preco, quantidade);

        this.produtos.push(novoProduto);

        console.log(`\nProduto "${nome}" cadastrado com sucesso.`);
    }
}
