import Cliente from "../../../modelo/cliente";

export default class ListagemProdutosMaisConsumidosPorRaca {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public listarProdutosMaisConsumidosPorRaca(): void {
        console.log("\nProdutos mais consumidos por raça de Pet:");

        const produtosPorRaca = new Map<string, Map<string, number>>();
        let encontrouProdutos = false;

        this.clientes.forEach(cliente => {
            cliente.getPets().forEach(pet => {
                const raca = pet.getRaca;
                let produtosConsumidosPorRaca = produtosPorRaca.get(raca);

                if (!produtosConsumidosPorRaca) {
                    produtosConsumidosPorRaca = new Map<string, number>();
                    produtosPorRaca.set(raca, produtosConsumidosPorRaca);
                }

                cliente.getProdutosConsumidosPorPet(pet).forEach(({ produto, quantidade }) => {
                    if (!produtosConsumidosPorRaca.has(produto.nome)) {
                        produtosConsumidosPorRaca.set(produto.nome, 0);
                    }
                    produtosConsumidosPorRaca.set(produto.nome, produtosConsumidosPorRaca.get(produto.nome)! + quantidade);
                });
            });
        });

        produtosPorRaca.forEach((quantidadesPorProduto, raca) => {
            if (quantidadesPorProduto.size > 0) {
                encontrouProdutos = true;
                console.log(`\nRaça: ${raca}`);
                const produtosOrdenados = Array.from(quantidadesPorProduto.entries()).sort((a, b) => b[1] - a[1]);

                produtosOrdenados.forEach(([produtoNome, quantidade]) => {
                    console.log(`- ${produtoNome}: ${quantidade} unidades`);
                });
            }
        });

        if (!encontrouProdutos) {
            console.log(`\nNão há produtos consumidos por raça de Pet.\n`);
        }
    }
}
