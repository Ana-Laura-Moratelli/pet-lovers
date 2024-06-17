import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Servico from "../../modelo/servico";
import ListagemServicos from "../Servico/listagemServico";

export default class CadastroServicoConsumido {
    private clientes: Array<Cliente>;
    private servicosDisponiveis: Array<Servico>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, servicosDisponiveis: Array<Servico>) {
        this.clientes = clientes;
        this.servicosDisponiveis = servicosDisponiveis;
        this.entrada = new Entrada();
    }

    public cadastrarServicoConsumido(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        if (this.servicosDisponiveis.length === 0) {
            console.log(`\nNão há serviços cadastrados.\n`);
            return;
        }

        console.log(`\nCadastro de Serviço Consumido`);
    
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });
    
        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para cadastrar serviços consumidos: ") - 1;
        if (indiceCliente >= 0 && indiceCliente < this.clientes.length) {
            let cliente = this.clientes[indiceCliente];
    
            if (cliente.getPets().length === 0) {
                console.log(`\nNão há pets cadastrados a esse cliente.\n`);
                return;
            }

            console.log("\nPets do cliente:");
            cliente.getPets().forEach((pet, index) => {
                console.log(`${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}`);
            });
    
            let indicePet = this.entrada.receberNumero("Digite o número do pet que está consumindo o serviço: ") - 1;
    
            if (indicePet >= 0 && indicePet < cliente.getPets().length) {
                let pet = cliente.getPets()[indicePet];
    
                console.log("\nServiços disponíveis:");
                const listagemServicos = new ListagemServicos(this.servicosDisponiveis);
                listagemServicos.listar();
    
                let indiceServico = this.entrada.receberNumero("Digite o número do serviço consumido: ") - 1;
    
                if (indiceServico >= 0 && indiceServico < this.servicosDisponiveis.length) {
                    let servico = this.servicosDisponiveis[indiceServico];
                    cliente.cadastrarServicoConsumido(servico, pet);
                    console.log(`\nServiço '${servico.nome}' consumido pelo pet '${pet.getNome}' registrado com sucesso!\n`);
                } else {
                    console.log("Número de serviço inválido!");
                }
            } else {
                console.log("Número de pet inválido!");
            }
        } else {
            console.log("Número de cliente inválido!");
        }
    }
}
