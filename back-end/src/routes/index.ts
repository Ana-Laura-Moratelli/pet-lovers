import { Router, Request, Response } from 'express';
import Empresa from '../modelo/empresa';
import CadastroCliente from '../negocio/Cliente/cadastroCliente';
import CadastroPet from '../negocio/Pet/cadastroPet';
import CadastroProduto from '../negocio/Produto/cadastroProduto';
import CadastroProdutoConsumido from '../negocio/Produto/cadastroProdutoConsumido';
import CadastroServico from '../negocio/Servico/cadastroServico';
import CadastroServicoConsumido from '../negocio/Servico/cadastroServicoConsumido';

const router = Router();
let empresa = new Empresa();

const cadastroPet = new CadastroPet([], () => empresa.getClientes);
const cadastroProduto = new CadastroProduto(empresa.getProdutos);
const cadastroProdutoConsumido = new CadastroProdutoConsumido(empresa.getProdutos);
const cadastroServico = new CadastroServico(empresa.getServicos);
const cadastroServicoConsumido = new CadastroServicoConsumido(empresa.getServicos);

router.get('/', (req, res) => {
    return res.json('Rodando');
});


router.get('/clientes', (req, res) => {
    res.json(empresa.getClientes);
});

router.post('/clientes', async (req: Request, res: Response) => {
    let cadastro = new CadastroCliente(empresa.getClientes);
    try {
        const insert = cadastro.cadastrar(req.body);
        if (insert && 'status' in insert) return res.status(insert.status).json(insert.msg);
        res.json('Cliente cadastrado com sucesso');
    } catch (error) {
        res.json("Erro ao cadastrar cliente");
    }
});

router.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = empresa.getClientes.find(cliente => cliente.id == id);
    res.json(cliente);
});

router.post('/clientes/excluir/:id', (req, res) => {
    const { id } = req.params;
    const clienteId = parseInt(id);

    // Verificar se o cliente existe
    const cliente = empresa.getClientes.find(cliente => cliente.id === clienteId);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Remover pets vinculados
    const petsVinculados = cliente.getPets();
    petsVinculados.forEach(pet => {
        cadastroPet.excluirPet(pet.id);
    });

    // Remover cliente
    empresa.removerCliente(clienteId);
    res.status(200).json(empresa.getClientes);
});

router.put('/clientes/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;

    let cliente = empresa.getClientes.find(cliente => cliente.id === id);

    if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    try {
        if (dadosAtualizados.nome) cliente.setNome(dadosAtualizados.nome);
        if (dadosAtualizados.nomeSocial) cliente.setNomeSocial(dadosAtualizados.nomeSocial);
        if (dadosAtualizados.cpf) cliente.setCpf(dadosAtualizados.cpf);
        if (dadosAtualizados.rg) cliente.setRgs(dadosAtualizados.rg);
        if (dadosAtualizados.telefones) cliente.setTelefones(dadosAtualizados.telefones);

        res.json({ message: 'Cliente atualizado com sucesso', cliente });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
});

router.get('/pets', (req: Request, res: Response) => {
    const pets = cadastroPet.listarPets().map(p => ({
        id: p.pet.id,
        nome: p.pet.getNome,
        tipo: p.pet.getTipo,
        raca: p.pet.getRaca,
        genero: p.pet.getGenero,
        clienteNome: p.clienteNome
    }));
    res.json(pets);
});

router.post('/pets', async (req: Request, res: Response) => {
    const { nome, tipo, raca, genero, clienteId } = req.body;

    try {
        const cliente = empresa.getClientes.find(cliente => cliente.id === parseInt(clienteId));

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        await cadastroPet.cadastrar(nome, tipo, raca, genero, clienteId);
        res.status(201).send("Pet cadastrado com sucesso!");
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        res.status(400).send('erro');
    }
});


router.post('/pets/excluir/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    cadastroPet.excluirPet(parseInt(id));
    res.status(200).json(cadastroPet.listarPets().map(p => ({
        id: p.pet.id,
        nome: p.pet.getNome,
        tipo: p.pet.getTipo,
        raca: p.pet.getRaca,
        genero: p.pet.getGenero,
        clienteNome: p.clienteNome
    })));
});

router.put('/pets/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, tipo, raca, genero } = req.body;
    cadastroPet.atualizarPet(parseInt(id), nome, tipo, raca, genero);
    res.status(200).json(cadastroPet.listarPets().map(p => ({
        id: p.pet.id,
        nome: p.pet.getNome,
        tipo: p.pet.getTipo,
        raca: p.pet.getRaca,
        genero: p.pet.getGenero,
        clienteNome: p.clienteNome
    })));
});

router.get('/clientes/:clienteId/pets', (req: Request, res: Response) => {
    const { clienteId } = req.params;
    const cliente = empresa.getClientes.find(cliente => cliente.id === parseInt(clienteId));
    if (cliente) {
        res.json(cliente.getPets());
    } else {
        res.status(404).send('Cliente não encontrado');
    }
});

router.get('/clientes/:clienteId/produtos-consumidos', (req: Request, res: Response) => {
    const { clienteId } = req.params;
    const produtosConsumidos = cadastroProdutoConsumido.listar().filter(pc => pc.clienteId === parseInt(clienteId));

    const produtosAgrupados = produtosConsumidos.reduce((acc, pc) => {
        const produto = cadastroProduto.listarProdutos().find(p => p.id === pc.produtoId);
        if (produto) {
            if (!acc[pc.produtoId]) {
                acc[pc.produtoId] = {
                    id: pc.produtoId,
                    nome: produto.getNome,
                    quantidade: 0
                };
            }
            acc[pc.produtoId].quantidade += pc.quantidade;
        }
        return acc;
    }, {} as { [key: number]: { id: number, nome: string, quantidade: number } });

    res.json(Object.values(produtosAgrupados));
});

router.get('/clientes/:clienteId/servicos-consumidos', (req: Request, res: Response) => {
    const { clienteId } = req.params;
    const servicosConsumidos = cadastroServicoConsumido.listar().filter(pc => pc.clienteId === parseInt(clienteId));

    const servicosAgrupados = servicosConsumidos.reduce((acc, pc) => {
        const servico = cadastroServico.listarServicos().find(p => p.id === pc.servicoId);
        if (servico) {
            if (!acc[pc.servicoId]) {
                acc[pc.servicoId] = {
                    id: pc.servicoId,
                    nome: servico.getNome,
                    quantidade: 0
                };
            }
            acc[pc.servicoId].quantidade += pc.quantidade;
        }
        return acc;
    }, {} as { [key: number]: { id: number, nome: string, quantidade: number } });

    res.json(Object.values(servicosAgrupados));
});

router.get('/produtos', (req, res) => {
    res.json(cadastroProduto.listarProdutos());
});

router.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = cadastroProduto.listarProdutos().find(produto => produto.id === id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

router.post('/produtos', (req: Request, res: Response) => {
    try {
        cadastroProduto.cadastrar(req.body);
        res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao cadastrar produto');
        }
    }
});

router.put('/produtos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        cadastroProduto.atualizarProduto(parseInt(id), req.body);
        res.status(200).send("Produto atualizado com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao atualizar produto');
        }
    }
});

router.delete('/produtos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        cadastroProduto.excluirProduto(parseInt(id));
        res.status(200).send("Produto excluído com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao excluir produto');
        }
    }
});

router.post('/produtos-consumidos', (req: Request, res: Response) => {
    const { clienteId, petId, produtoId, quantidade } = req.body;
    try {
        const produtoConsumido = cadastroProdutoConsumido.cadastrar(clienteId, petId, produtoId, quantidade);
        res.status(201).json(produtoConsumido);
    } catch (error) {
        res.status(400).send('Erro ao cadastrar produto consumido');
    }
});

router.get('/produtos-consumidos', (req: Request, res: Response) => {
    res.json(cadastroProdutoConsumido.listar());
});

router.get('/produtos-consumidos/:clienteId', (req: Request, res: Response) => {
    const { clienteId } = req.params;
    const produtosConsumidos = cadastroProdutoConsumido.listar().filter(pc => pc.clienteId === parseInt(clienteId));
    res.json(produtosConsumidos);
});

router.get('/servicos', (req, res) => {
    res.json(cadastroServico.listarServicos());
});

router.get('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const servico = cadastroServico.listarServicos().find(servico => servico.id === id);
    if (servico) {
        res.json(servico);
    } else {
        res.status(404).send('Serviço não encontrado');
    }
});

router.post('/servicos', (req: Request, res: Response) => {
    try {
        cadastroServico.cadastrar(req.body);
        res.status(201).send("Serviço cadastrado com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao cadastrar serviço');
        }
    }
});

router.put('/servicos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        cadastroServico.atualizarServico(parseInt(id), req.body);
        res.status(200).send("Servico atualizado com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao atualizar serviço');
        }
    }
});

router.delete('/servicos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        cadastroServico.excluirServico(parseInt(id));
        res.status(200).send("Serviço excluído com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('Erro desconhecido ao excluir serviço');
        }
    }
});

router.post('/servicos-consumidos', (req: Request, res: Response) => {
    const { clienteId, petId, servicoId, quantidade } = req.body;
    try {
        const servicoConsumido = cadastroServicoConsumido.cadastrar(clienteId, petId, servicoId, quantidade);
        res.status(201).json(servicoConsumido);
    } catch (error) {
        res.status(400).send('Erro ao serviço produto consumido');
    }
});

router.get('/servicos-consumidos', (req: Request, res: Response) => {
    res.json(cadastroServicoConsumido.listar());
});

router.get('/servicos-consumidos/:clienteId', (req: Request, res: Response) => {
    const { clienteId } = req.params;
    const servicosConsumidos = cadastroServicoConsumido.listar().filter(pc => pc.clienteId === parseInt(clienteId));
    res.json(servicosConsumidos);
});

export default router;
