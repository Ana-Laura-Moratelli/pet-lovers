import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import Cadastro from "../cadastro";
import Pet from '../../modelo/pet';

interface Data {
    nome: string;
    nomeSocial: string;
    cpf: { cpf: string; dataEmissao: Date };
    rg: Array<{ rg: string; dataEmissao: Date }>;
    telefone: Array<{ ddd: string; telefone: string }>;
}

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private pets: Array<Pet>;

    constructor(clientes: Array<Cliente>, pets: Array<Pet> = []) {
        super();
        this.clientes = clientes;
        this.pets = pets; // Inicializa a propriedade 'pets'
    }

    public removerPet(pet: Pet): void {
        this.pets = this.pets.filter(p => p.id !== pet.id);
    }

    public cadastrar(data: Data): { status: number; msg: string } | void {
        if (this.clientes.some(cliente => cliente.Cpf.getValor === data.cpf.cpf)) {
            return { status: 400, msg: "CPF já cadastrado" };
        }

        let cpf = new CPF(data.cpf.cpf, data.cpf.dataEmissao);
        const cliente = new Cliente(data.nome, data.nomeSocial, cpf);

        data.rg.forEach(rg => {
            let rgAdd = new RG(rg.rg, rg.dataEmissao);
            cliente.addRgs(rgAdd);
        });

        data.telefone.forEach(tel => {
            let telAdd = new Telefone(tel.ddd, tel.telefone);
            cliente.adicionarTelefone(telAdd);
        });

        this.clientes.push(cliente);
        return { status: 200, msg: "Cliente cadastrado com sucesso" };
    }
}
