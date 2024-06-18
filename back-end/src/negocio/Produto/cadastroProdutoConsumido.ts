import ProdutoConsumido from "../../modelo/produtoConsumido";
import Produto from "../../modelo/produto";

export default class CadastroProdutoConsumido {
    private produtosConsumidos: Array<ProdutoConsumido>;
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        this.produtosConsumidos = [];
        this.produtos = produtos;
    }

    public cadastrar(clienteId: number, petId: number, produtoId: number, quantidade: number): ProdutoConsumido | Error {
        const produto = this.produtos.find(prod => prod.id === produtoId);
        if (!produto) {
            return new Error("Produto não encontrado");
        }

        if (!produto.consumir(quantidade)) {
            return new Error("Quantidade a consumir excede a quantidade disponível");
        }

        const produtoConsumido = new ProdutoConsumido(clienteId, petId, produtoId, quantidade);
        this.produtosConsumidos.push(produtoConsumido);
        return produtoConsumido;
    }

    public listar(): Array<ProdutoConsumido> {
        return this.produtosConsumidos;
    }
}
