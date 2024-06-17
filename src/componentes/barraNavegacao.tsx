/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface BarraNavegacaoProps {
    tema: string;
    botoes: Array<'Home' | 'Clientes' | 'Pet' | 'Produtos' | 'Serviços' | 'Consumidos'>;
    seletorView: (valor: 'Home' | 'Clientes' | 'Pet' | 'Produtos' | 'Serviços' | 'Consumidos', e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function BarraNavegacao(props: BarraNavegacaoProps) {
    
    const gerarListaBotoes = () => {
        if (props.botoes.length === 0) {
            return <></>;
        } else {
            const lista = props.botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => props.seletorView(valor, e)}>{valor}</a>
                </li>
            ));
            return lista;
        }
    };

    let tema = props.tema;

    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                <div className="container-fluid">
                    <span className="me-2">
                        <img src="./logo.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
                    </span>
                    Pet Lovers
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {gerarListaBotoes()}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
