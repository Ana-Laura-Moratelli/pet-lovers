import Cliente from "../../../modelo/cliente";
import Produto from "../../../modelo/produto";

export default class ProdutosMaisConsumidos {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public listarProdutosMaisConsumidos(): void {

        console.log("\nProdutos mais consumidos:");

        // Mapa para rastrear a quantidade de cada produto consumido
        const quantidadePorProduto = new Map<Produto, number>();

        // Iterar sobre os clientes e seus produtos consumidos
        this.clientes.forEach(cliente => {
            cliente.ProdutosConsumidos.forEach(({ produto, quantidade }) => {
                if (quantidadePorProduto.has(produto)) {
                    quantidadePorProduto.set(produto, quantidadePorProduto.get(produto)! + quantidade);
                } else {
                    quantidadePorProduto.set(produto, quantidade);
                }
            });
        });

        // Verificar se há produtos consumidos
        if (quantidadePorProduto.size === 0) {
            console.log(`\nNão há produtos consumidos.\n`);
            return;
        }

        // Ordenar os produtos por quantidade consumida em ordem decrescente
        const produtosOrdenados = Array.from(quantidadePorProduto.entries()).sort((a, b) => {
            return b[1] - a[1];
        });

        // Listar os produtos mais consumidos
        produtosOrdenados.forEach(([produto, quantidade], index) => {
            console.log(`${index + 1} - ${produto.nome}: ${quantidade} unidades`);
        });
    }
}
