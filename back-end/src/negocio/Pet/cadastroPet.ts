import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";
import Cadastro from "../cadastro";

export default class CadastroPet extends Cadastro {
    private pets: Array<Pet>;
    private clientes: Array<Cliente>;

    constructor(pets: Array<Pet>, clientes: Array<Cliente>) {
        super();
        this.pets = pets;
        this.clientes = clientes;
    }

    public listarClientes(): Array<Cliente> {
        return this.clientes;
    }

    public listarPets(): Array<{ pet: Pet, clienteNome: string }> {
        return this.pets.map(pet => {
            const cliente = this.clientes.find(cliente => cliente.getPets().includes(pet));
            return {
                pet: pet,
                clienteNome: cliente ? cliente.nome : "Desconhecido"
            };
        });
    }

    public excluirPet(id: number): void {
        this.pets = this.pets.filter(pet => pet.id !== id);
        this.clientes.forEach(cliente => {
            cliente.setPets(cliente.getPets().filter(pet => pet.id !== id));
        });
    }
    public atualizarPet(id: number, nome: string, tipo: string, raca: string, genero: string): void {
        const pet = this.pets.find(pet => pet.id === id);
        if (pet) {
            pet.setNome = nome;
            pet.setTipo = tipo;
            pet.setRaca = raca;
            pet.setGenero = genero;
        }
    }
    
    public cadastrar(nome: string, tipo: string, raca: string, genero: string, clienteId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);
            if (!cliente) {
                return reject(new Error("Cliente não encontrado"));
            }

            const pet = new Pet(nome, tipo, raca, genero);
            cliente.adicionarPet(pet);
            this.pets.push(pet);

            resolve();
        });
    }
}
