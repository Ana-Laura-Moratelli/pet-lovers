import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }
        console.log(`\nListagem de Pets por Cliente`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para listar os Pets: ") - 1;

        if (indiceCliente >= 0 && indiceCliente < this.clientes.length) {
            let cliente = this.clientes[indiceCliente];
            console.log(`\nPets do cliente ${cliente.nome}:`);
            if (cliente.listarPets().length > 0) {
                console.log(cliente.listarPets());
            } else {
                console.log("Este cliente não possui pets cadastrados.");
            }
        } else {
            console.log("Número de cliente inválido!");
        }
    }
}
