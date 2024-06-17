import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }

        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.Cpf.getValor);
            console.log(`Data de emissão CPF: ` + cliente.Cpf.getDataEmissao.toLocaleDateString());

            console.log(`RGs: `);
            cliente.Rgs.forEach((rg, index) => {
                console.log(`  ${index + 1} - RG: ${rg.getValor}, Data de Emissão RG: ${rg.getDataEmissao.toLocaleDateString()}`);
            });

            console.log(`Telefones: `);
            cliente.Telefones.forEach((telefone, index) => {
                console.log(`  ${index + 1} - (${telefone.getDdd}) ${telefone.getNumero}`);
            });

            console.log(`Data de Cadastro: ` + cliente.DataCadastro.toLocaleDateString());

            console.log(`Pets: `);
            if (cliente.getPets().length > 0) {
                cliente.getPets().forEach((pet, index) => {
                    console.log(`  ${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`);
                });
            } else {
                console.log("  Não há pets cadastrados.");
            }

            console.log(`Produtos Consumidos: `);
            if (cliente.ProdutosConsumidos.length > 0) {
                cliente.ProdutosConsumidos.forEach((consumo, index) => {
                    console.log(`  ${index + 1} - Produto: ${consumo.produto.nome}, Quantidade: ${consumo.quantidade}, Consumido por: ${consumo.pet.getNome}`);
                });
            } else {
                console.log("  Não há produtos consumidos.");
            }

            console.log(`Serviços Consumidos: `);
            if (cliente.ServicosConsumidos.length > 0) {
                cliente.ServicosConsumidos.forEach((consumo, index) => {
                    console.log(`  ${index + 1} - Serviço: ${consumo.servico.nome}, Consumido por: ${consumo.pet.getNome}`);
                });
            } else {
                console.log("  Não há serviços consumidos.");
            }

            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
