import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Atualizar from "../atualizar";

export default class AtualizarPet extends Atualizar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        console.log(`\nAtualização de informações do Pet`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para selecionar o Pet: ") - 1;

        if (indiceCliente >= 0 && indiceCliente < this.clientes.length) {
            let cliente = this.clientes[indiceCliente];
            console.log(`\nPets do cliente ${cliente.nome}:`);

            if (cliente.getPets().length > 0) {
                cliente.getPets().forEach((pet, index) => {
                    console.log(`${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`);
                });

                let indicePet = this.entrada.receberNumero("Digite o número do Pet para atualizar as informações: ") - 1;

                if (indicePet >= 0 && indicePet < cliente.getPets().length) {
                    let pet = cliente.getPets()[indicePet];
                    let continuar = true;

                    while (continuar) {
                        console.log("\nEscolha uma opção para atualizar:");
                        console.log("1 - Atualizar Nome");
                        console.log("2 - Atualizar Tipo");
                        console.log("3 - Atualizar Raça");
                        console.log("4 - Atualizar Gênero");
                        console.log("5 - Sair");

                        let opcao = this.entrada.receberNumero("Digite o número da opção: ");

                        switch (opcao) {
                            case 1:
                                let novoNome = this.entrada.receberTexto(`Novo nome do Pet (atual: ${pet.getNome}): `);
                                if (novoNome !== "") pet.setNome = novoNome;
                                console.log("Nome do Pet atualizado com sucesso!");
                                break;

                            case 2:
                                let novoTipo = this.entrada.receberTexto(`Novo tipo do Pet (atual: ${pet.getTipo}): `);
                                if (novoTipo !== "") pet.setTipo = novoTipo;
                                console.log("Tipo do Pet atualizado com sucesso!");
                                break;

                            case 3:
                                let novaRaca = this.entrada.receberTexto(`Nova raça do Pet (atual: ${pet.getRaca}): `);
                                if (novaRaca !== "") pet.setRaca = novaRaca;
                                console.log("Raça do Pet atualizada com sucesso!");
                                break;

                            case 4:
                                let novoGenero = this.entrada.receberTexto(`Novo gênero do Pet (atual: ${pet.getGenero}): `);
                                if (novoGenero !== "") pet.setGenero = novoGenero;
                                console.log("Gênero do Pet atualizado com sucesso!");
                                break;

                            case 5:
                                continuar = false;
                                console.log("Saindo da atualização de Pet.");
                                break;

                            default:
                                console.log("Opção inválida. Por favor, tente novamente.");
                                break;
                        }
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
