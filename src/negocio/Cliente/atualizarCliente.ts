import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";

export default class AtualizarCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    private receberData(texto: string): string {
        let dataValida = false;
        let dataString: string = "";

        while (!dataValida) {
            let dataTexto = this.entrada.receberTexto(texto);
            let partesData = dataTexto.split('/');

            if (partesData.length === 3) {
                let dia = parseInt(partesData[0]);
                let mes = parseInt(partesData[1]) - 1;
                let ano = parseInt(partesData[2]);
                let data = new Date(ano, mes, dia);

                if (data && data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia) {
                    dataString = dataTexto;
                    dataValida = true;
                } else {
                    console.log("Data inválida. Por favor, insira no formato dd/mm/yyyy.");
                }
            } else {
                console.log("Formato de data inválido. Por favor, insira no formato dd/mm/yyyy.");
            }
        }

        return dataString;
    }

    private verificarCPFDuplicado(cpf: string): boolean {
        const cpfNormalizado = cpf.replace(/\D/g, '');
        return this.clientes.some(cliente => cliente.Cpf.getValor.replace(/\D/g, '') === cpfNormalizado);
    }

    private verificarRGDuplicado(rg: string): boolean {
        const rgNormalizado = rg.replace(/\D/g, '');
        return this.clientes.some(cliente => cliente.Rgs.some(r => r.getValor.replace(/\D/g, '') === rgNormalizado));
    }

    private receberCPF(texto: string): string {
        let cpf: string;

        do {
            cpf = this.entrada.receberTexto(texto).trim();
            if (!/^\d{3}\D*\d{3}\D*\d{3}\D*\d{2}$/.test(cpf)) {
                console.log("Por favor, digite um CPF válido contendo 11 números.");
            } else if (this.verificarCPFDuplicado(cpf)) {
                console.log("Este CPF já está cadastrado. Por favor, insira um CPF diferente.");
            }
        } while ((!/^\d{3}\D*\d{3}\D*\d{3}\D*\d{2}$/.test(cpf)) || this.verificarCPFDuplicado(cpf));

        return cpf;
    }

    private receberRG(texto: string): string {
        let rg: string;

        do {
            rg = this.entrada.receberTexto(texto).trim();
            if (!/^\d{2}\D*\d{3}\D*\d{3}\D*\d$/.test(rg)) {
                console.log("Por favor, digite um RG válido contendo 9 números.");
            } else if (this.verificarRGDuplicado(rg)) {
                console.log("Este RG já está cadastrado. Por favor, insira um RG diferente.");
            }
        } while ((!/^\d{2}\D*\d{3}\D*\d{3}\D*\d$/.test(rg)) || this.verificarRGDuplicado(rg));

        return rg;
    }

    private validarDDD(ddd: string): boolean {
        return /^\d{2}$/.test(ddd.trim());
    }

    public receberDDD(mensagem: string): string {
        let ddd: string;
        do {
            ddd = this.entrada.receberTexto(mensagem).trim();
            if (!this.validarDDD(ddd)) {
                console.log("Por favor, digite um DDD válido (formato: 99).");
            }
        } while (!this.validarDDD(ddd));

        return ddd;
    }

    public atualizar(): void {

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.\n`);
            return;
        }
        
        console.log(`Atualizar cliente:`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        let indice = this.entrada.receberNumero("Digite o número do cliente que deseja atualizar: ") - 1;

        if (indice >= 0 && indice < this.clientes.length) {
            let cliente = this.clientes[indice];
            let continuar = true;

            while (continuar) {
                console.log("\nEscolha uma opção para atualizar:");
                console.log("1 - Atualizar Nome");
                console.log("2 - Atualizar Nome Social");
                console.log("3 - Atualizar CPF");
                console.log("4 - Atualizar RGs");
                console.log("5 - Atualizar Telefones");
                console.log("6 - Sair");

                let opcao = this.entrada.receberNumero("Digite o número da opção: ");

                switch (opcao) {
                    case 1:
                        let novoNome = this.entrada.receberTexto("Novo nome: ");
                        if (novoNome !== "") cliente.nome = novoNome;
                        console.log("Nome atualizado com sucesso!");
                        break;

                    case 2:
                        let novoNomeSocial = this.entrada.receberTexto("Novo nome social: ");
                        if (novoNomeSocial !== "") cliente.nomeSocial = novoNomeSocial;
                        console.log("Nome social atualizado com sucesso!");
                        break;

                    case 3:
                        let novoCpf = this.receberCPF("Novo CPF: ");
                        if (novoCpf !== "") {
                            cliente.Cpf.setValor(novoCpf);
                        }

                        let novaDataEmissao = this.receberData ("Nova data de emissão (dd/mm/yyyy): ");
                        if (novaDataEmissao !== "") {
                            cliente.Cpf.setDataEmissao(novaDataEmissao);
                        }

                        console.log("CPF e data de emissão atualizados com sucesso!");
                        break;


                    case 4:
                        console.log("Rgs cadastrados:");
                        cliente.Rgs.forEach((rg, index) => {
                            console.log(`${index + 1} - Número: ${rg.getValor}, Data de Emissão: ${rg.getDataEmissao.toLocaleDateString()}`);
                        });
                        let indiceRg = this.entrada.receberNumero("Digite o número do RG que deseja atualizar: ") - 1;
                        if (indiceRg >= 0 && indiceRg < cliente.Rgs.length) {
                            let novoRg = this.receberRG("Novo RG: ");
                            if (novoRg !== "") {
                                let novaDataEmissao = this.receberData("Data de emissão do RG (dd/mm/yyyy): ");
                                cliente.Rgs[indiceRg].setValor(novoRg);
                                cliente.Rgs[indiceRg].setDataEmissao(novaDataEmissao);
                                console.log("RG atualizado com sucesso!");
                            }
                        } else {
                            console.log("Número de RG inválido!");
                        }
                        break;

                    case 5:
                        this.atualizarTelefones(cliente);
                        break;

                    case 6:
                        continuar = false;
                        console.log("Saindo da atualização de cliente.");
                        break;

                    default:
                        console.log("Opção inválida. Por favor, tente novamente.");
                        break;
                }
            }
        } else {
            console.log("Número inválido!");
        }
    }

    private atualizarTelefones(cliente: Cliente): void {
        console.log("Telefones cadastrados:");
        console.log(cliente.listarTelefones());

        let continuar = true;
        while (continuar) {
            let indiceTelefone = this.entrada.receberNumero("Digite o número do telefone a ser atualizado: ") - 1;
            if (indiceTelefone >= 0 && indiceTelefone < cliente.Telefones.length) {
                let telefone = cliente.Telefones[indiceTelefone];
                let novoDdd = this.entrada.receberTexto("Novo DDD: ");
                let novoNumero = this.entrada.receberTexto("Novo Número: ");

                telefone.setDdd(novoDdd);
                telefone.setNumero(novoNumero);

                console.log("Telefone atualizado com sucesso!");
            } else {
                console.log("Índice inválido. Tente novamente.");
            }
            break;


        }
    }
}    