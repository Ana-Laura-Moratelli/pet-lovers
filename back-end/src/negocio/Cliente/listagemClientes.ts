import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
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

            

            console.log(`Telefones: `);
            cliente.Telefones.forEach((telefone, index) => {
                console.log(`  ${index + 1} - (${telefone.getDdd}) ${telefone.getNumero}`);
            });

            console.log(`Data de Cadastro: ` + cliente.DataCadastro.toLocaleDateString());
           
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}