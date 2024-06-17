import { useEffect, useState } from "react";
import Barra from "./barra";
import { Link } from "react-router-dom";

const DetalhesCliente = () => {
    const [cliente, setCliente] = useState(null);
    const url = window.location.href.split("/");

    useEffect(() => {
        const buscarDetalhesCliente = async () => {
            try {
                const response = await fetch(`http://localhost:32831/cliente/${url[4]}`);
                const data = await response.json();
                setCliente(data);
                console.log("Data:", data);
            } catch (error) {
                console.error(error.message);
            }
        };

        buscarDetalhesCliente();
    });

    return (
        <div>
            <Barra textoApp="PetLovers" />
            {cliente && (
                <div>

                    <section className="container">

                        <Link to={`/`} className="waves-effect waves-light  blue lighten-2 btn-small " style={{ margin: '10px 0px 0px' }}><i className="material-icons left">chevron_left
                        </i>Voltar
                        </Link>

                        <ul className="collection">
                            <li className="collection-item">
                                <h4>Nome</h4>
                                <p>{cliente.nome}</p>
                            </li>

                            <li className="collection-item">
                                <h4>Nome Social</h4>
                                <p>{cliente.nomeSocial}</p>
                            </li>

                            <li className="collection-item">
                                <h4>Telefone</h4>
                                <p>{`(${cliente.telefones[0].ddd}) ${cliente.telefones[0].numero}`}</p>
                            </li>

                            <li className="collection-item">
                                <h4>Endereço</h4>
                                <p>{`${cliente.endereco.rua} n°${cliente.endereco.numero}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - ${cliente.endereco.estado}, ${cliente.endereco.codigoPostal}`}</p>
                            </li>

                            <li className="collection-item">
                                <h4>Informações Adicionais</h4>
                                <p>{cliente.endereco.informacoesAdicionais}</p>
                            </li>
                        </ul>
                    </section>
                </div>
            )}
        </div>

    );
};

export default DetalhesCliente;
