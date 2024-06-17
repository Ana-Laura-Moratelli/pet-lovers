import Cliente from "../../../modelo/cliente";

export default class ListagemClientesMaisConsumiramPorValor {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public listarClientesMaisConsumiramPorValor(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }
        
        console.log("\nClientes que mais consumiram em valor:");

        // Mapa para rastrear o valor total gasto por cada cliente
        const valorTotalPorCliente = new Map<Cliente, number>();

        // Iterar sobre os clientes e calcular o valor total gasto
        this.clientes.forEach(cliente => {
            let valorTotalCliente = 0;

            cliente.ProdutosConsumidos.forEach(({ produto, quantidade }) => {
                valorTotalCliente += produto.preco * quantidade;
            });

            valorTotalPorCliente.set(cliente, valorTotalCliente);
        });

        // Filtrar clientes que gastaram mais que 0
        const clientesComConsumo = Array.from(valorTotalPorCliente.entries()).filter(([cliente, valorTotal]) => valorTotal > 0);

        if (clientesComConsumo.length === 0) {
            console.log(`\nNenhum cliente consumiu.\n`);
            return;
        }

        // Ordenar os clientes por valor total gasto em ordem decrescente
        const clientesOrdenados = clientesComConsumo.sort((a, b) => b[1] - a[1]);

        // Listar os 5 clientes que mais consumiram em valor
        for (let i = 0; i < Math.min(clientesOrdenados.length, 5); i++) {
            const [cliente, valorTotal] = clientesOrdenados[i];
            console.log(`${i + 1} - ${cliente.nome}: R$ ${valorTotal.toFixed(2)}`);
        }
    }
}
