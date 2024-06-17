import CPF from "./cpf";
import Pet from "./pet";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rg: Array<RG>;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private produtosConsumidos: Array<{ produto: Produto, quantidade: number, pet: Pet }>;
    private servicosConsumidos:Array<{ servico: Servico, pet: Pet }>;
    private pets: Array<Pet>;

    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rg = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
        this.pets = [];
    }

    // Cliente
    public get Cpf(): CPF {
        return this.cpf;
    }
    public get Rgs(): Array<RG> {
        return this.rg;
    }
    
    public get DataCadastro(): Date {
        return this.dataCadastro;
    }
    public get Telefones(): Array<Telefone> {
        return this.telefones;
    }

    // RG
    public adicionarRg(rg: RG): void {
        this.rg.push(rg);
    }
    
    public listarRgs(): string {
        return this.rg.map((rg, index) => {
            return `${index + 1} - Número: ${rg.getValor}, Data de Emissão: ${rg.getDataEmissao.toLocaleDateString()}`;
        }).join("\n");
    }
    
    // Telefone
    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone);
    }

    public listarTelefones(): string {
        return this.telefones.map((telefone, index) => {
            return `${index + 1} - DDD: ${telefone.getDdd}, Número: ${telefone.getNumero}`;
        }).join("\n");
    }

    // Pets
    public getPets(): Array<Pet> {
        return this.pets;
    }
    public listarPets(): string {
        return this.pets.map((pet, index) => {
            return `${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`;
        }).join("\n");
    }
    public adicionarPet(pet: Pet): void {
        this.pets.push(pet);
    }
    public deletarPet(indice: number): Pet | null {
        if (indice >= 0 && indice < this.pets.length) {
            return this.pets.splice(indice, 1)[0];
        }
        return null;
    }
    public atualizarPet(pet: Pet): void {
    
    }

    // Produtos
    public get ProdutosConsumidos(): Array<{ produto: Produto; quantidade: number; pet: Pet }> {
        return this.produtosConsumidos;
    }

    public cadastrarProdutoConsumido(produto: Produto, quantidade: number, pet: Pet): void {
        this.produtosConsumidos.push({ produto, quantidade, pet });
    }

    public getProdutosConsumidosPorPet(pet: Pet): Array<{ produto: Produto; quantidade: number }> {
        return this.produtosConsumidos
            .filter(consumo => consumo.pet === pet)
            .map(consumo => ({ produto: consumo.produto, quantidade: consumo.quantidade }));
    }

    public getTotalQuantidadeConsumida(): number {
        let totalQuantidade = 0;
        this.produtosConsumidos.forEach(consumo => {
            totalQuantidade += consumo.quantidade;
        });
        return totalQuantidade;
    }

    // Serviços
    public get ServicosConsumidos(): Array<{ servico: Servico; pet: Pet }> {
        return this.servicosConsumidos;
    }
    public cadastrarServicoConsumido(servico: Servico, pet: Pet): void {
        this.servicosConsumidos.push({ servico, pet });
    }
}
