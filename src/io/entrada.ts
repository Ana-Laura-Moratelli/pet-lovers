import promptSync from "prompt-sync";

export default class Entrada {
    public receberNumero(mensagem: string): number {
        let prompt = promptSync();
        let valor: string | null;
        let numero: number;

        do {
            valor = prompt(mensagem);
            if (valor !== null && valor !== undefined) {
                numero = Number(valor.trim());
            } else {
                numero = NaN;
            }

            if (isNaN(numero)) {
                console.log("Por favor, digite um número válido.");
            }
        } while (isNaN(numero));

        return numero;
    }

    public receberTexto(mensagem: string): string {
        let prompt = promptSync();
        let texto: string | null;

        do {
            texto = prompt(mensagem);
            if (texto !== null && texto !== undefined) {
                texto = texto.trim();
            } else {
                texto = "";
            }

            if (texto === "") {
                console.log("Por favor, digite um valor.");
            }
        } while (texto === "");

        return texto;
    }
}
