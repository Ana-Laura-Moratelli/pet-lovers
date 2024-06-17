import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Cadastro from "../cadastro";
import Telefone from "../../modelo/telefone"; 

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    private receberData(texto: string): Date {
        let dataValida = false;
        let data: Date = new Date();

        while (!dataValida) {
            let dataTexto = this.entrada.receberTexto(texto);
            let partesData = dataTexto.split('/');

            if (partesData.length === 3) {
                let dia = parseInt(partesData[0]);
                let mes = parseInt(partesData[1]) - 1; 
                let ano = parseInt(partesData[2]);
                data = new Date(ano, mes, dia);

                if (data && data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia) {
                    dataValida = true;
                } else {
                    console.log("Data inválida. Por favor, insira no formato dd/mm/yyyy.");
                }
            } else {
                console.log("Formato de data inválido. Por favor, insira no formato dd/mm/yyyy.");
            }
        }

        return data;
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
            }
            else if (this.verificarCPFDuplicado(cpf)) {
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
            }
            else if (this.verificarRGDuplicado(rg)) {
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
            ddd = this.entrada.receberTexto(mensagem);
            if (!this.validarDDD(ddd)) {
                console.log("Por favor, digite um DDD válido (formato: 99).");
            }
        } while (!this.validarDDD(ddd));

        return ddd;
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        let valorCpf = this.receberCPF(`Por favor informe o número do CPF: `);
        let dataEmissaoCpf = this.receberData(`Por favor informe a data de emissão do CPF, no padrão dd/mm/yyyy: `);
        let cpf = new CPF(valorCpf, dataEmissaoCpf);
        let cliente = new Cliente(nome, nomeSocial, cpf);
        this.clientes.push(cliente);
        let adicionarMaisRg = true;
        while (adicionarMaisRg) {
            let rg = this.receberRG(`Por favor informe o número do RG: `);
            let dataEmissaoRg = this.receberData(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
            cliente.adicionarRg(new RG(rg, dataEmissaoRg));

            let resposta: string;
            do {
                resposta = this.entrada.receberTexto("Deseja adicionar outro RG? (s/n): ").toLowerCase();
                if (resposta !== 's' && resposta !== 'n') {
                    console.log("Opção não entendida, digite 's' para adicionar mais e 'n' para não adicionar mais");
                }
            } while (resposta !== 's' && resposta !== 'n');
    
            if (resposta === 'n') {
                adicionarMaisRg = false;
            }
        }
        let adicionarMaisTelefone = true; 

        while (adicionarMaisTelefone) {
            let ddd = this.receberDDD(`Por favor informe o DDD do telefone (formato 99): `);
    
            let telefoneFormatoValido = false;
            do {
                let numero = this.entrada.receberTexto(`Por favor informe o número do telefone: (formato 99999-9999) `);
                if (/^\d{5}-\d{4}$/.test(numero.trim())) {
                    telefoneFormatoValido = true;
                    let telefone = new Telefone(ddd, numero);
                    cliente.adicionarTelefone(telefone);
                } else {
                    console.log("Por favor, digite um número de telefone válido no formato 99999-9999.");
                }
            } while (!telefoneFormatoValido);
        
            let resposta: string;
            do {
                resposta = this.entrada.receberTexto("Deseja adicionar outro telefone? (s/n): ").toLowerCase();
                if (resposta !== 's' && resposta !== 'n') {
                    console.log("Opção não entendida, digite 's' para adicionar mais e 'n' para não adicionar mais");
                }
            } while (resposta !== 's' && resposta !== 'n');
    
            if (resposta === 'n') {
                adicionarMaisTelefone = false;
            }
        }
        

        console.log(`\nCadastro concluído :)\n`);
    }
}
