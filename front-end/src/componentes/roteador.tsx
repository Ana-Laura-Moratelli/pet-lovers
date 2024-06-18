import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import Home from "./home";
import Cliente from "./cliente";
import Pet from "./pet"; 
import Produtos from "./produtos"; 
import Servicos from "./servicos"; 
import ProdutoConsumido from "./cadastroConsumido/produtoConsumido"; 
import ServicoConsumido from "./cadastroConsumido/servicoConsumido"
import ClientesValor from "./listagens/clientesValor";
import ClientesQuantidade from "./listagens/clientesQuantidade";
import ProdutosMaisConsumidos from "./listagens/produtosMaisConsumidos";
import ProdutosTipoPet from "./listagens/produtosTipoPet";
import ProdutosRacaPet from "./listagens/produtoRacaPet";

type State = {
    tela: string
}

export default class Roteador extends Component<{}, State>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Home'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement>) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        const { tela } = this.state;

        const componentes: { [key: string]: JSX.Element } = {
            'Home': <Home tema="#e3f2fd" />,
            'Cliente': <Cliente tema="#e3f2fd" />,
            'Pet': <Pet tema="#e3f2fd" />,
            'Produtos': <Produtos tema="#e3f2fd" />, 
            'Serviços': <Servicos tema="#e3f2fd" />,
            'Produto Consumido': <ProdutoConsumido tema="#e3f2fd" />,
            'Serviço Consumido': <ServicoConsumido tema="#e3f2fd" /> ,
            'Clientes Quantidade': <ClientesQuantidade tema="#e3f2fd" />,
            'Clientes Valor': <ClientesValor tema="#e3f2fd" /> ,
            'Produtos Mais Consumidos': <ProdutosMaisConsumidos tema="#e3f2fd" /> ,
            'Produtos Tipo Pet': <ProdutosTipoPet tema="#e3f2fd" /> ,
            'Produtos Raça Pet': <ProdutosRacaPet tema="#e3f2fd" /> 


        };

        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#CFE2FF"
                botoes={['Home', 'Cliente', 'Pet', 'Produtos', 'Serviços', 'Produto Consumido','Serviço Consumido','Clientes Quantidade', 'Clientes Valor', 'Produtos Mais Consumidos','Produtos Tipo Pet', 'Produtos Raça Pet']}
            />
        );

        return (
            <>
                {barraNavegacao}
                {componentes[tela]}
            </>
        );
    }
}
