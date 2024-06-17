import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import Home from "./home";
import Cliente from "./cliente";
import Pet from "./pet";
import Produtos from "./produtos";
import Servicos from "./servicos";
import Consumidos from "./consumidos";

const componentesTela = {
    Home: Home,
    Clientes: Cliente,
    Pet: Pet,
    Produtos: Produtos,
    Serviços: Servicos,
    Consumidos: Consumidos,
} as const;

export default function Roteador() {
    const [tela, setTela] = useState<'Home' | 'Clientes' | 'Pet' | 'Produtos' | 'Serviços' | 'Consumidos'>('Home');
    
    const selecionarView = (valor: keyof typeof componentesTela, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setTela(valor);
    };

    const TelaAtual = componentesTela[tela];

    return (
        <>
            <BarraNavegacao 
                seletorView={selecionarView} 
                tema="#CFE2FF" 
                botoes={['Home', 'Clientes', 'Pet', 'Produtos', 'Serviços', 'Consumidos']} 
            />
            <TelaAtual tema="#e3f2fd" />
        </>
    );
}
