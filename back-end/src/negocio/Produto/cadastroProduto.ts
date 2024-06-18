import Produto from "../../modelo/produto";
import Cadastro from "../cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
    }

    public cadastrar(data: { nome: string, quantidade: number, preco: number }): void {
        let produto = new Produto(data.nome, data.quantidade, data.preco);
        this.produtos.push(produto);
    }

    public listarProdutos(): Array<Produto> {
        return this.produtos;
    }

    public atualizarProduto(id: number, data: { nome: string, quantidade: number, preco: number }): void {
        const produto = this.produtos.find(produto => produto.id === id);
        if (produto) {
            produto.setNome = data.nome;
            produto.setQuantidade = data.quantidade;
            produto.setPreco = data.preco;
        }
    }

    public excluirProduto(id: number): void {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
    }
}
