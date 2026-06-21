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
servico-pagamento/                              --> projeto
│
├── .github/                                    --> diretório com configurações do github actions
│   └── workflows                               --> diretório onde estão os arquivos de workflow
│       └── pipeline.yml                        --> pipeline de CI
│
├── mochawesome-report/                         --> diretório com relatório html gerado pelo mocha com os resultados dos testes
│
├── src/                                        --> diretório com código fonte
│   └── servicoDePagamento.js                   --> arquivo com as funções solicitadas desenvolvidas
│
├── test/                                       --> diretório com suites de testes
│   └── servicoDePagamento.test.js              --> arquivo com suíte de testes das funções do Serviço de pagamento
│
├── .gitignore                                  --> arquivo com diretórios que devem ser ignorados pelo git e não enviados/rastreados
├── package-lock.json                           --> arquivo com versões das dependências instaladas/usadas no projeto
├── package.json                                --> arquivo com dependências do projeto, scripts e metadados do projeto
├── README.md                                   --> arquivo de documentação do projeto
```

# Trabalho de conclusão da matéria de Integração Contínua para Automação de Testes:

## Solução:

A pipeline de CI (integração contínua) desenvolvida como solução deste trabalho foi configurada para rodar no Github actions como solicitado.
Para isto, a seguinte estrutura de pastas foi adicionada ao projeto anteriormente desenvolvido: .github/workflows/pipeline.yml

Na pipeline temos os eventos que disparam a execução da mesma, que ficam na sessão 'on', bem como cada tarefa/etapa a ser executada, que ficam na sessão 'jobs'. Esta não é uma self-hosted pipeline, visto que faz uso do próprio Github Actions para executar as etapas e rodar os testes.

Como etapas, inclui a execução dos testes lint, sendo executados testes de formatação com prettier e testes de validação de qualidade de código com o eslint, e por fim a execução dos testes unitários, criados utilizando mocha, e a publicação do relatório gerado pelo mesmo.

Como foi solicitado que utilizassemos o projeto desenvolvido na última matéria, esta pipeline não inclui testes feitos através de UI, portanto, não temos testes utilizando ferramentas como Playwright por exemplo, pois este projeto possui somente testes unitarios de código, sem validações via interface.

## Conceitos utilizados:

### Integração Contínua

**Integração contínua (CI)** é a prática de desenvolvimento de software em que desenvolvedores frequentemente juntam suas alterações de código em um repositório central, onde são executadas em seguida inspeções e testes, com o objetivo de encontrar possíveis problemas de forma antecipada, reduzindo tempo de identificação e correção dos mesmos, se existirem.

### Pipeline

**Pipeline** é um processo, um fluxo a ser seguido. Resumidamente, para descrever a pipeline (ou seja, o fluxo/processo), precisamos criar um arquivo que irá descrever quais tarefas devem ser executadas, contendo para cada tarefa os passos e configurações necessários para sua execução, além dos eventos que irão disparar esta sequência de tarefas.

### Gatilhos / Triggers

**Gatilhos** definem os eventos que irão disparar o fluxo da pipeline. Conforme solicitado, para este projeto foram utilizados 3 possíveis gatilhos:

1. <u>Execução manual</u> -> permitindo que a pipeline seja disparada de forma manual pela aba Actions no Github, acionada através de um clique de botão, usando o gatilho _workflow_dispatch_.

2. <u>Execução por push</u> -> fazendo com que a pipeline seja disparada de forma automática a cada vez que um envio de código é realizado para a branch _master_.

3. <u>Execução agendada (schedule)</u> -> fazendo com que a pipeline seja disparada de forma automática a cada 10 minutos, através do gatilho _schedule_ com o tempo configurado em 'cron'.

### Etapas / Tarefas / Jobs

**Tarefas** definem cada fase que deve ser executada como parte do fluxo/processo.
No caso da pipeline desenvolvida para este trabalho, a mesma é composta por dois jobs:

1. <u>lint</u> -> tarefa que faz verificação da qualidade do código de forma geral, utilizando o prettier para verificar formatação do código e eslint para verificar boas práticas e possíveis erros. Pra isso, é utilizada uma máquina ubuntu, realizado clone do projeto, instalação do node, yarn e dependências do projeto e só então os testes são executados.

2. <u>unit-tests</u> -> tarefa na qual os testes unitários desenvolvidos com mocha são executados e o relatório mochawesome gerado é publicado como artefato da execução, podendo ser acessado na aba Actions do Github. Pra isso, também é utilizada uma máquina ubuntu, realizado clone do projeto, instalação do node, yarn e dependências do projeto e só então os testes são executados. Esta tarefa só é executada caso a etapa de lint seja executada com sucesso.

### Dependência entre Etapas / Tarefas / Jobs

Como foi ensinado em aula a dependência entre jobs, resolvi implementar um exemplo neste trabalho. Para isso, utilizei o _needs_ na tarefa de _unit-tests_, criando uma dependência desta tarefa com a de _lint_. Isso significa que o job de testes unitários só será executado se o job de lint passar com sucesso, garantindo a ordem de execução e evitando rodar etapas posteriores quando uma anterior já falhou.
