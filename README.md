# Projeto Cypress

Projeto de testes automatizados para a aplicação ServeRest, usando Cypress para validar fluxos pela interface web e pela API.

## Escopo

A suíte cobre autenticação e cadastro de usuários, operações com produtos e carrinho, além de fluxos administrativos pela interface. Os cenários detalhados e seus resultados esperados estão em [Casos de teste](cypress/docs/casosdetestes.md).

Os testes de interface usam `https://front.serverest.dev` e os testes de API usam `https://serverest.dev`. A execução depende da disponibilidade desses serviços e de conexão com a internet.

## Pré-requisitos

- Node.js e npm instalados.
- Acesso à internet para acessar os ambientes do ServeRest.

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

## Executar os testes

Na raiz do projeto, use um dos comandos:

| Comando | Descrição |
|---|---|
| `npm run cy:run` | Executa os testes Cypress em modo headless. |
| `npm run cy:open` | Abre a interface do Cypress para execução interativa. |
| `npm run login` | Executa somente `cypress/e2e/login.cy.js`. |

## Relatórios

O projeto está configurado para gerar relatórios Mochawesome e JUnit em `cypress/reports`. Os arquivos nesse diretório são resultados de execuções anteriores; execute a suíte para gerar resultados atualizados.
