import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";

export default class DeletarCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        
        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        console.log(`Excluir cliente:`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indice = this.entrada.receberNumero("Digite o número do cliente que deseja excluir: ") - 1;

        if (indice >= 0 && indice < this.clientes.length) {
            let clienteRemovido = this.clientes.splice(indice, 1);
            console.log(`Cliente ${clienteRemovido[0].nome} excluído com sucesso.`);
        } else {
            console.log("Número inválido!");
        }
    }
}
