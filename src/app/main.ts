import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/Cliente/cadastroCliente";
import ListagemClientes from "../negocio/Cliente/listagemClientes";
import AtualizarCliente from "../negocio/Cliente/atualizarCliente";
import DeletarCliente from "../negocio/Cliente/deletarCliente";
import CadastroPet from "../negocio/Pet/cadastroPet";
import ListagemPets from "../negocio/Pet/listagemPet";
import AtualizarPet from "../negocio/Pet/atualizarPet";
import DeletarPet from "../negocio/Pet/deletarPet";
import CadastrarProduto from "../negocio/Produto/cadastroProduto";
import CadastrarProdutoConsumido from "../negocio/Produto/cadastroProdutoConsumido";
import ListagemProduto from "../negocio/Produto/listagemProduto";
import AtualizarProduto from "../negocio/Produto/atualizarProduto";
import DeletarProduto from "../negocio/Produto/deletarProduto";
import CadastrarServico from "../negocio/Servico/cadastroServico";
import CadastrarServicoConsumido from "../negocio/Servico/cadastroServicoConsumido";
import ListagemServico from "../negocio/Servico/listagemServico";
import AtualizarServico from "../negocio/Servico/atualizarServico";
import DeletarServico from "../negocio/Servico/deletarServico";
import ListagemClientesProdutos from "../negocio/Listagem/Produtos/clientesMaisConsumiram";
import ListagemProdutosMaisConsumidos from "../negocio/Listagem/Produtos/produtosMaisConsumidos";
import ListagemClientesMaisConsumiramPorValor from "../negocio/Listagem/Produtos/clientesValorConsumiram";
import ListagemProdutosMaisConsumidosPorRaca from "../negocio/Listagem/Produtos/produtosRaca";
import ListagemProdutosMaisConsumidosPorTipoPet from "../negocio/Listagem/Produtos/produtosTipo";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`\n`);
    console.log(`Opções:`);
    console.log(`\nCliente`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Atualizar cliente`);
    console.log(`4 - Deletar cliente`);
    console.log(`\nPet`);
    console.log(`5 - Cadastrar Pet`);
    console.log(`6 - Listar Pet`);
    console.log(`7 - Atualizar Pet`);
    console.log(`8 - Deletar Pet`);
    console.log(`\nProduto`);
    console.log(`9 - Cadastrar Produto`);
    console.log(`10 - Cadastrar Produto consumido`);
    console.log(`11 - Listar Produtos`);
    console.log(`12 - Atualizar Produto`);
    console.log(`13 - Deletar Produto`);
    console.log(`\nServiço`);
    console.log(`14 - Cadastrar Serviço`);
    console.log(`15 - Cadastrar Serviço consumido`);
    console.log(`16 - Listar Serviços`);
    console.log(`17 - Atualizar Serviço`);
    console.log(`18 - Deletar Serviço`);
    console.log(`\nListagens`);
    console.log(`19 - 10 clientes que mais consumiram produtos em quantidade`);
    console.log(`20 - Produtos mais consumidos`);
    console.log(`21 - Produtos mais consumidos por raça de pets`);
    console.log(`22 - Produtos mais consumidos por tipo de pets`);
    console.log(`23 - 5 clientes que mais consumiram produtos em valor`);

    console.log(`\n0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    const clientes = empresa.getClientes;
    const produtosDisponiveis = empresa.getProdutos;
    const servicosDisponiveis = empresa.getServicos;

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let atualizar = new AtualizarCliente(empresa.getClientes)
            atualizar.atualizar()
            break;
        case 4:
            let deletar = new DeletarCliente(empresa.getClientes)
            deletar.deletar()
            break;
        case 5:
            let cadastroPet = new CadastroPet(empresa.getClientes);
            cadastroPet.cadastrar();
            break;
        case 6:
            let listagemPet = new ListagemPets(empresa.getClientes);
            listagemPet.listar();
            break;
        case 7:
            let atualizarPet = new AtualizarPet(empresa.getClientes);
            atualizarPet.atualizar();
            break;
        case 8:
            let deletarPet = new DeletarPet(empresa.getClientes);
            deletarPet.deletar();
            break;
        case 9:
            let cadastroProduto = new CadastrarProduto(empresa.getProdutos);
            cadastroProduto.cadastrar();
            break;
        case 10:
            let cadastroProdutoConsumido = new CadastrarProdutoConsumido(clientes, produtosDisponiveis);
            cadastroProdutoConsumido.cadastrarProdutoConsumido();
            break;
        case 11:
            let listagemProduto = new ListagemProduto(empresa.getProdutos);
            listagemProduto.listar();
            break;
        case 12:
            let atualizarProduto = new AtualizarProduto(empresa.getProdutos);
            atualizarProduto.atualizar();
            break;
        case 13:
            let deletarProduto = new DeletarProduto(empresa.getProdutos);
            deletarProduto.deletar();
            break;
        case 14:
            let cadastroServico = new CadastrarServico(empresa.getServicos);
            cadastroServico.cadastrar();
            break;
        case 15:
            let cadastroServicoConsumido = new CadastrarServicoConsumido(clientes, servicosDisponiveis);
            cadastroServicoConsumido.cadastrarServicoConsumido();
            break;
        case 16:
            let listagemServico = new ListagemServico(empresa.getServicos);
            listagemServico.listar();
            break;
        case 17:
            let atualizarServico = new AtualizarServico(empresa.getServicos);
            atualizarServico.atualizar();
            break;
        case 18:
            let deletarServico = new DeletarServico(empresa.getServicos);
            deletarServico.deletar();
            break;
        case 19:
            let TopClientesPorQuantidade = new ListagemClientesProdutos(empresa.getClientes);
            TopClientesPorQuantidade.listar();
            break;
        case 20:
            let ProdutosMaisConsumidos = new ListagemProdutosMaisConsumidos(empresa.getClientes);
            ProdutosMaisConsumidos.listarProdutosMaisConsumidos();
            break;
        case 21:
            let ListagemProdutosRaca = new ListagemProdutosMaisConsumidosPorRaca(empresa.getClientes);
            ListagemProdutosRaca.listarProdutosMaisConsumidosPorRaca();
            break;
        case 22:
            let ListagemProdutosTipo = new ListagemProdutosMaisConsumidosPorTipoPet(empresa.getClientes);
            ListagemProdutosTipo.listarProdutosMaisConsumidosPorTipo();
            break;
        case 23:
            let ListagemClientesProdutosValor = new ListagemClientesMaisConsumiramPorValor(empresa.getClientes);
            ListagemClientesProdutosValor.listarClientesMaisConsumiramPorValor();
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}