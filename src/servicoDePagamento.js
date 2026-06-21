/**
 * Serviço responsável por gerenciar pagamentos de contas.
 * Armazena um histórico interno de pagamentos realizados na sessão atual.
 * Exemplo de uso: const servico = new ServicoDePagamento(); servico.pagar('1234-5678-9012', 'Copel', 150.00);
 */
export default class ServicoDePagamento {
  #pagamentos;

  /**
   * Inicializa o serviço com uma lista de pagamentos vazia.
   */
  constructor() {
    this.#pagamentos = [];
  }

  /**
   * Realiza um pagamento e o registra no histórico interno.
   * Pagamentos com valor acima de R$ 100,00 são categorizados como 'cara', demais como 'padrão'.
   * Exemplo de uso: servico.pagar('1234-5678-9012', 'BC Hydro', 43.50)
   * @param {string} codigoDeBarra - Código de barras da conta a ser paga.
   * @param {string} empresa - Nome da empresa/credor do boleto.
   * @param {number} valorPagamento - Valor a ser pago. Deve ser um número maior que zero.
   * @throws {Error} Se algum parâmetro não for informado, for do tipo errado, o valor for <= 0 ou o código de barras já tiver sido pago.
   */
  pagar(codigoDeBarra, empresa, valorPagamento) {
    if (
      !codigoDeBarra ||
      !empresa ||
      valorPagamento == undefined ||
      valorPagamento == null
    ) {
      throw new Error("Informar todos os dados necessários para pagamento.");
    }

    if (
      typeof codigoDeBarra !== "string" ||
      typeof empresa !== "string" ||
      typeof valorPagamento !== "number"
    ) {
      throw new Error("Dados informados estão inválidos.");
    }

    if (valorPagamento <= 0) {
      throw new Error(
        "Valor informado deve ser um número maior que zero.",
      );
    }

    if (
      this.#pagamentos.some(
        (pagamento) => pagamento.codigoBarras === codigoDeBarra,
      )
    ) {
      throw new Error(
        "Já existe pagamento realizado para o Código de barras informado.",
      );
    }

    this.#pagamentos.push({
      codigoBarras: codigoDeBarra,
      empresa: empresa,
      valor: valorPagamento,
      categoria: valorPagamento > 100 ? "cara" : "padrão",
    });
  }

  /**
   * Retorna o último pagamento registrado no histórico.
   * Ex. de retorno: { codigoBarras: '1234-5678-9012', empresa: 'Copel', valor: 150.00, categoria: 'cara' }
   * @returns {Object|string} O objeto do último pagamento realizado, ou uma mensagem informando que ainda não há pagamentos.
   */
  consultarUltimoPagamento() {
    if (this.#pagamentos.length === 0) {
      return "Ainda não há pagamentos realizados.";
    }
    return this.#pagamentos.at(-1);
  }
}
