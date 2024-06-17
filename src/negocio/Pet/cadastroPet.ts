import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet";
import Cliente from "../../modelo/cliente";
import Cadastro from "../cadastro";

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do Pet`);

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para vincular o Pet: ") - 1;

        if (indiceCliente >= 0 && indiceCliente < this.clientes.length) {
            let nome = this.entrada.receberTexto(`Por favor informe o nome do Pet: `);
            let tipo = this.entrada.receberTexto(`Por favor informe o tipo do Pet: `);
            let raca = this.entrada.receberTexto(`Por favor informe a raça do Pet: `);
            let genero = this.entrada.receberTexto(`Por favor informe o gênero do Pet: `);

            let pet = new Pet(nome, tipo, raca, genero);

            this.clientes[indiceCliente].adicionarPet(pet);
            console.log(`\nCadastro do Pet concluído e vinculado ao cliente ${this.clientes[indiceCliente].nome}\n`);
        } else {
            console.log("Número de cliente inválido!");
        }
    }
}
