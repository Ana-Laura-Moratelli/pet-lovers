import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";

export default class DeletarPet {
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

        console.log(`\nExcluir Pet:`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para selecionar o Pet: ") - 1;

        if (indiceCliente >= 0 && indiceCliente < this.clientes.length) {
            let cliente = this.clientes[indiceCliente];
            console.log(`\nPets do cliente ${cliente.nome}:`);

            let pets = cliente.getPets();
            if (pets.length > 0) {
                pets.forEach((pet, index) => {
                    console.log(`${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`);
                });

                let indicePet = this.entrada.receberNumero("Digite o número do Pet que deseja excluir: ") - 1;

                if (indicePet >= 0 && indicePet < pets.length) {
                    let petRemovido = cliente.deletarPet(indicePet);
                    if (petRemovido) {
                        console.log(`\nPet ${petRemovido.getNome} excluído com sucesso!`);
                    } else {
                        console.log("Erro ao remover o pet.");
                    }
                } else {
                    console.log("Número de Pet inválido!");
                }
            } else {
                console.log("Este cliente não possui pets cadastrados.");
            }
        } else {
            console.log("Número de cliente inválido!");
        }
    }
}
