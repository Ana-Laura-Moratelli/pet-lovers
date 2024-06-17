import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import Home from "./home";
import Cliente from "./cliente";
import Pet from "./pet"; 
import Produtos from "./produtos"; 
import Servicos from "./servicos"; 
import Consumidos from "./consumidos"; 

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
            'Consumidos': <Consumidos tema="#e3f2fd" /> 
        };

        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#CFE2FF"
                botoes={['Home', 'Cliente', 'Pet', 'Produtos', 'Serviços', 'Consumidos']}
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
