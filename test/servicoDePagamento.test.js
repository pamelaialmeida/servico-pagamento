import assert from 'node:assert';
import ServicoDePagamento from '../src/servicoDePagamento.js';

describe('Testes da funcionalidade de Serviço de Pagamento', () => {

    let servicoDePagamento;

    beforeEach(() => {
        servicoDePagamento = new ServicoDePagamento();
    });

    it('TC01 - Deve retornar mensagem quando nenhum pagamento foi realizado e usuário tenta consultar o último pagamento', () => {
        assert.equal(servicoDePagamento.consultarUltimoPagamento(), 'Ainda não há pagamentos realizados.');
    });

    const dadosPagamento = [
        { codigoDeBarra: '0987-7656-3475', empresa: 'BC Hydro', valorPagamento: 100.00 },
        { codigoDeBarra: '0123-4567-8901', empresa: 'Telus', valorPagamento: 99.99 },
        { codigoDeBarra: '9876-5432-1098', empresa: 'Sanepar', valorPagamento: 0.01 }
    ]

    dadosPagamento.forEach(({ codigoDeBarra, empresa, valorPagamento }) => {
        it(`TC02 - Deve realizar pagamento corretamente e setar categoria como padrão quando dados do pagamento informado são válidos e valor é igual a ${valorPagamento}`, () => {
            servicoDePagamento.pagar(codigoDeBarra, empresa, valorPagamento);
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

            assert.equal(ultimoPagamento.codigobarras, codigoDeBarra);
            assert.equal(ultimoPagamento.empresa, empresa);
            assert.equal(ultimoPagamento.valor, valorPagamento);
            assert.equal(ultimoPagamento.categoria, 'padrão');
        });
    });

    it('TC03 - Deve realizar pagamento corretamente e setar categoria como caro quando dados do pagamento informado são válidos e valor é igual a 100.01', () => {
        const dadosPagamento = { codigoDeBarra: '0917-7654-3420', empresa: 'Copel', valorPagamento: 100.01 };
        servicoDePagamento.pagar(dadosPagamento.codigoDeBarra, dadosPagamento.empresa, dadosPagamento.valorPagamento);

        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        assert.equal(ultimoPagamento.codigobarras, dadosPagamento.codigoDeBarra);
        assert.equal(ultimoPagamento.empresa, dadosPagamento.empresa);
        assert.equal(ultimoPagamento.valor, dadosPagamento.valorPagamento);
        assert.equal(ultimoPagamento.categoria, 'cara');
    });

    it('TC04 - Deve apresentar mensagem quando código de barras informado já estiver pago', () => {
        const dadosPagamento = { codigoDeBarra: '0917-7654-3333', empresa: 'Best buy', valorPagamento: 200.00 };
        servicoDePagamento.pagar(dadosPagamento.codigoDeBarra, dadosPagamento.empresa, dadosPagamento.valorPagamento);

        assert.throws(
            function () { servicoDePagamento.pagar(dadosPagamento.codigoDeBarra, dadosPagamento.empresa, dadosPagamento.valorPagamento) },
            { message: 'Já existe pagamento realizado para o Código de barras informado.' }
        );
    });

    const cenariosDadosFaltantes = [
        { codigoDeBarra: '', empresa: 'Telus', valorPagamento: 180.54, faltante: 'Código de Barras' },
        { codigoDeBarra: '9876-5432-1098', empresa: '', valorPagamento: 66.71, faltante: 'Empresa' },
        { codigoDeBarra: '9876-5432-1098', empresa: 'Sanepar', valorPagamento: null, faltante: 'Valor' }
    ]

    cenariosDadosFaltantes.forEach(({ codigoDeBarra, empresa, valorPagamento, faltante }) => {
        it(`TC05 - Deve apresentar mensagem de erro quando usuário tenta realizar pagamento sem informar dado obrigatório - Dado faltante ${faltante}`, () => {
            assert.throws(
                function () { servicoDePagamento.pagar(codigoDeBarra, empresa, valorPagamento) },
                { message: 'Informar todos os dados necessários para pagamento.' }
            );

        });
    });

    const cenariosDadosTipoInvalido = [
        { codigoDeBarra: 1234567890, empresa: 'Apple', valorPagamento: 2080.21, invalido: 'Código de Barras' },
        { codigoDeBarra: '3476-1232-2158', empresa: 9876543210, valorPagamento: 325.80, invalido: 'Empresa' },
        { codigoDeBarra: '9116-5778-1365', empresa: 'H&M', valorPagamento: '123.20d', invalido: 'Valor' }
    ]

    cenariosDadosTipoInvalido.forEach(({ codigoDeBarra, empresa, valorPagamento, invalido }) => {
        it(`TC06 - Deve apresentar mensagem de erro quando usuário tenta realizar pagamento sem informar dado obrigatório - Dado inválido ${invalido}`, () => {
            assert.throws(
                function () { servicoDePagamento.pagar(codigoDeBarra, empresa, valorPagamento) },
                { message: 'Dados informados estão inválidos.' }
            );
        });
    });

    it('TC07 - Deve apresentar mensagem quando valor informado for igual a 0.00', () => {
        assert.throws(
            function () { servicoDePagamento.pagar('5620-5687-3020', 'Sephora', 0.00) },
            { message: 'Valor informado deve ser um número maior ou igual a zero.' }
        );
    });

    it('TC08 - Deve apresentar mensagem quando valor informado for negativo', () => {
        assert.throws(
            function () { servicoDePagamento.pagar('1122-3344-5566', 'Walmart', -120.32) },
            { message: 'Valor informado deve ser um número maior ou igual a zero.' }
        );
    });

});
