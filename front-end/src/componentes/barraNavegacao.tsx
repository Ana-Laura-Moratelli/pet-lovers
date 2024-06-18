/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

export default class BarraNavegacao extends Component<props> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }

    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {
            const dropdownButtons = this.props.botoes.slice(7).map(valor =>
                <li key={valor}><a className="dropdown-item" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a></li>
            );

            const firstButtons = this.props.botoes.slice(0, 7).map(valor =>
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a>
                </li>
            );

            return (
                <>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Listagens
                        </a>
                        <ul className="dropdown-menu">
                            {dropdownButtons}
                        </ul>
                    </li>
                    {firstButtons}
                </>
            );
        }
    }

    render() {
        let tema = this.props.tema
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
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
