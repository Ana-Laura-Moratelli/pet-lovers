import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    constructor() {
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.adicionarProduto(new Produto("Tapete higiênico", 60, 5));
        this.adicionarProduto(new Produto("Ração", 40, 10));
        this.adicionarProduto(new Produto("Biscoito", 30, 4));
        this.adicionarServico(new Servico("Consulta veterinaria", 40));
        this.adicionarServico(new Servico("Banho e tosa", 50));
        this.adicionarServico(new Servico("Banho e hidratação", 80));

    }
    public get getClientes() {
        return this.clientes
    }
    public get getProdutos() {
        return this.produtos
    }
    public get getServicos() {
        return this.servicos
    }
    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }
    public adicionarServico(servico: Servico): void {
        this.servicos.push(servico);
    }
}