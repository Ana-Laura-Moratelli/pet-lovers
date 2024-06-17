import Cliente from "../../../modelo/cliente";

export default class ListagemProdutosMaisConsumidosPorTipoPet {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public listarProdutosMaisConsumidosPorTipo(): void {
        console.log("\nProdutos mais consumidos por tipo de Pet:");

        const produtosPorTipo = new Map<string, Map<string, number>>();

        this.clientes.forEach(cliente => {
            cliente.getPets().forEach(pet => {
                const tipo = pet.getTipo; 
                console.log(`Processando tipo: ${tipo}`);

                let produtosConsumidosPorTipo = produtosPorTipo.get(tipo);
                if (!produtosConsumidosPorTipo) {
                    produtosConsumidosPorTipo = new Map<string, number>();
                    produtosPorTipo.set(tipo, produtosConsumidosPorTipo);
                }

                cliente.getProdutosConsumidosPorPet(pet).forEach(({ produto, quantidade }) => {
                    console.log(`Produto consumido: ${produto.nome}, Quantidade: ${quantidade}`);
                    if (!produtosConsumidosPorTipo.has(produto.nome)) {
                        produtosConsumidosPorTipo.set(produto.nome, 0);
                    }
                    produtosConsumidosPorTipo.set(produto.nome, produtosConsumidosPorTipo.get(produto.nome)! + quantidade);
                });
            });
        });

        if (produtosPorTipo.size === 0) {
            console.log(`\nNão há produtos consumidos por tipo de Pet.\n`);
            return;
        }

        produtosPorTipo.forEach((quantidadesPorProduto, tipo) => {
            console.log(`\nTipo: ${tipo}`);
            const produtosOrdenados = Array.from(quantidadesPorProduto.entries()).sort((a, b) => b[1] - a[1]);

            produtosOrdenados.forEach(([produtoNome, quantidade]) => {
                console.log(`- ${produtoNome}: ${quantidade} unidades`);
            });
        });
    }
}
