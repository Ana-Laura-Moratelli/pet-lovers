import Pet from '../../modelo/pet';
import Cliente from '../../modelo/cliente';

export default class CadastroPet {
    private pets: Array<Pet>;
    private getClientes: () => Array<Cliente>;

    constructor(pets: Array<Pet>, getClientes: () => Array<Cliente>) {
        this.pets = pets;
        this.getClientes = getClientes;
    }

    public async cadastrar(nome: string, tipo: string, raca: string, genero: string, clienteId: number): Promise<void> {
        const cliente = this.getClientes().find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const pet = new Pet(nome, tipo, raca, genero);
        cliente.adicionarPet(pet);
        this.pets.push(pet);
    }

    public listarPets() {
        return this.pets.map(pet => {
            const cliente = this.getClientes().find(c => c.getPets().includes(pet));
            return {
                pet,
                clienteNome: cliente ? cliente.nome : 'Desconhecido'
            };
        });
    }

    public deletarPet(id: number): boolean {
        const petIndex = this.pets.findIndex(pet => pet.id === id);
        if (petIndex === -1) {
            return false;
        }

        const pet = this.pets[petIndex];
        this.pets.splice(petIndex, 1);

        const cliente = this.getClientes().find(c => c.getPets().includes(pet));
        if (cliente) {
            cliente.deletarPet(pet);
        }

        return true;
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
    }

