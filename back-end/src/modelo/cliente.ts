import CPF from "./cpf";
import Pet from "./pet";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    static ultimoId: number = 0;
    public id: number
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rg: Array<RG>;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private produtosConsumidos: Array<{ produto: Produto, quantidade: number, pet: Pet }>;
    private servicosConsumidos: Array<Servico>;
    private pets: Array<Pet>;

    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        Cliente.ultimoId++;
        this.id = Cliente.ultimoId;
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
    public addRgs(Rg : RG): void{
        this.Rgs.push(Rg)
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

    
    public setPets(pets: Array<Pet>): void {
        this.pets = pets;
    }
    public listarPets(): string {
        return this.pets.map((pet, index) => {
            return `${index + 1} - Nome: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`;
        }).join("\n");
    }
    public adicionarPet(pet: Pet): void {
        this.pets.push(pet);
    }
    public deletarPet(pet: Pet): void {
        this.pets = this.pets.filter(p => p.id !== pet.id);
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
    public get ServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos;
    }

      // Métodos de atualização (sets)
      public setNome(nome: string): void {
        this.nome = nome;
    }
    public setNomeSocial(nomeSocial: string): void {
        this.nomeSocial = nomeSocial;
    }
    public setCpf(cpf: CPF): void {
        this.cpf = cpf;
    }
    public setRgs(rgs: Array<RG>): void {
        this.rg = rgs;
    }
    public setTelefones(telefones: Array<Telefone>): void {
        this.telefones = telefones;
    }
}
