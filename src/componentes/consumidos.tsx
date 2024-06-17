import { Component, ChangeEvent } from "react";

type Props = {
    tema: string
}

type State = {
    value: string;
};

export default class Consumidos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        const numericValue = inputValue.replace(/\D/g, '');

        const formattedValue = this.formatCurrency(numericValue);
        this.setState({ value: formattedValue });
    };


    formatCurrency = (value: string) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatter.format(parseInt(value) / 100);
    };

    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <h2 className="fs-4">Cadastro Produto Consumido</h2>
                <form>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Cliente</option>
                            <option value="1">Cliente 1</option>
                            <option value="2">Cliente 2</option>
                            <option value="3">Cliente 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Pet</option>
                            <option value="1">Pet 1</option>
                            <option value="2">Pet 2</option>
                            <option value="3">Pet 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Produto</option>
                            <option value="1">Produto 1</option>
                            <option value="2">Produto 2</option>
                            <option value="3">Produto 3</option>
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Quantidade"
                            step="1"
                        />
                        <label htmlFor="floatingInput">Quantidade</label>
                    </div>

                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
                <h2 className="fs-4">Cadastro Serviço Consumido</h2>
                <form>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Cliente</option>
                            <option value="1">Cliente 1</option>
                            <option value="2">Cliente 2</option>
                            <option value="3">Cliente 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Pet</option>
                            <option value="1">Pet 1</option>
                            <option value="2">Pet 2</option>
                            <option value="3">Pet 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Selecione o Serviço</option>
                            <option value="1">Serviço 1</option>
                            <option value="2">Serviço 2</option>
                            <option value="3">Serviço 3</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <button className="btn btn-outline-info" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}