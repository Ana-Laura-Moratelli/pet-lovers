import Cliente from "../../../modelo/cliente";

export default class TopClientesPorQuantidade {
    private clientes: Cliente[];

    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    public listar(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }
        
        console.log("\nTop 10 Clientes que mais consumiram em quantidade:");

        const clientesComConsumo = this.clientes.filter(cliente => cliente.getTotalQuantidadeConsumida() > 0);

        if (clientesComConsumo.length === 0) {
            console.log(`\nNenhum cliente consumiu.\n`);
            return;
        }
        
        // Ordenar os clientes por quantidade consumida em ordem decrescente
        const clientesOrdenados = this.clientes.slice().sort((a, b) => {
            const quantidadeA = a.getTotalQuantidadeConsumida();
            const quantidadeB = b.getTotalQuantidadeConsumida();
            return quantidadeB - quantidadeA;
        });

        // Listar os top 10 clientes
        clientesOrdenados.slice(0, 10).forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}: ${cliente.getTotalQuantidadeConsumida()} unidades`);
        });
    }
}
