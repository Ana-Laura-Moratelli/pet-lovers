import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import ListagemProdutos from "../Produto/listagemProduto";

export default class CadastroProdutoConsumido {
    private clientes: Array<Cliente>;
    private produtosDisponiveis: Array<Produto>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, produtosDisponiveis: Array<Produto>) {
        this.clientes = clientes;
        this.produtosDisponiveis = produtosDisponiveis;
        this.entrada = new Entrada();
    }

    public cadastrarProdutoConsumido(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        if (this.produtosDisponiveis.length === 0) {
            console.log(`\nNão há produtos cadastrados.\n`);
            return;
        }

        console.log(`\nCadastro de Produto Consumido`);
    
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });
    
        let indiceCliente = this.entrada.receberNumero("Digite o número do cliente para cadastrar produtos consumidos: ") - 1;
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
    
            let indicePet = this.entrada.receberNumero("Digite o número do pet que está consumindo o produto: ") - 1;
    
            if (indicePet >= 0 && indicePet < cliente.getPets().length) {
                let pet = cliente.getPets()[indicePet];
    
                console.log("\nProdutos disponíveis:");
                const listagemProdutos = new ListagemProdutos(this.produtosDisponiveis);
                listagemProdutos.listar();
    
                let indiceProduto = this.entrada.receberNumero("Digite o número do produto consumido: ") - 1;
    
                if (indiceProduto >= 0 && indiceProduto < this.produtosDisponiveis.length) {
                    let produto = this.produtosDisponiveis[indiceProduto];
                    let quantidadeDisponivel = produto.quantidade; 
    
                    let quantidade: number = this.entrada.receberNumero("Digite a quantidade consumida: ");
    
                    if (quantidade <= quantidadeDisponivel) {
                        cliente.cadastrarProdutoConsumido(produto, quantidade, pet);
                        console.log(`\nProduto '${produto.nome}' consumido pelo pet '${pet.getNome}' registrado com sucesso!\n`);
                    } else {
                        console.log("Quantidade consumida maior do que a quantidade disponível!");
                    }
                } else {
                    console.log("Número de produto inválido!");
                }
            } else {
                console.log("Número de pet inválido!");
            }
        } else {
            console.log("Número de cliente inválido!");
        }
    }
}
