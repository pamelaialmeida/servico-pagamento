# servico-pagamento

## Orientações: Pré-requisitos:
Crie uma classe que possua dois métodos: um para realizar pagamento e outro para consultar o último pagamento. Pagamentos serão armazenados como objetos Javascript dentro de uma lista de pagamentos. Cada pagamento terá as propriedades: Código de Barras, Empresa e Valor. Quando um pagamento for realizado e o valor for maior que 100.00, o pagamento também terá a propriedade categoria como 'cara', caso contrário, a propriedade categoria ficará como 'padrão'. O método de consultar trará apenas o último pagamento.

## Exemplo:
ex. 
const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
console.log(servicoDePagamento.consultarUltimoPagamento());
{
    codigoBarras: '0987-7656-3475',
    empresa: 'Samar',
    valor: 156.87,
    categoria: 'cara'
}

## Instruções para rodar:
1. Clone o projeto para seu local
2. Abra o projeto na IDE
3. Estando na pasta do projeto, abra terminal e rode o comando "npm install"
4. Após init finalizar, para rodar os testes e gerar relatório mochawesome, rode o comando "npm run test"

## Estrutura do Projeto:

```bash
servico-pagamento/                                  --> projeto
│
├── mochawesome-report/                         --> diretório com relatório html gerado pelo mocha com os resultados dos testes
│
├── src/                                        --> diretório com código fonte
│   └── servicoDePagamento.js                   --> arquivo com as funções solicitadas desenvolvidas
│
├── test/                                       --> diretório com suites de testes
│   ├── servicoDePagamento.test.js              --> arquivo com suíte de testes das funções do Serviço de pagamento
│
├── .gitignore                                  --> arquivo com diretórios que devem ser ignorados pelo git e não enviados/rastreados 
├── package-lock.json                           --> arquivo com versões das dependências instaladas/usadas no projeto 
├── package.json                                --> arquivo com dependências do projeto, scripts e metadados do projeto
├── README.md                                   --> arquivo de documentação do projeto
```