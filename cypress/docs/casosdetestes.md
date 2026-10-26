# Casos de teste

Este documento descreve os cenários automatizados do projeto e os resultados que cada teste verifica. Os serviços do ServeRest precisam estar disponíveis para executar os testes.

## 1. Usuários e autenticação pela API

Arquivo: [API_login.cy.js](../e2e/API_login.cy.js)

### CT-001 — Criar usuário administrador com dados válidos

- **Objetivo:** Validar o cadastro de um usuário administrador pela API.
- **Pré-condições:** API disponível; e-mail exclusivo para o cadastro.
- **Passos:**
  1. Gerar um e-mail único.
  2. Enviar nome, e-mail, senha e perfil de administrador para o endpoint de usuários.
- **Resultado esperado:** HTTP 201, mensagem de cadastro realizado com sucesso e identificador do usuário retornado.
- **Automatizado:** Sim. Atualmente selecionado por `it.only`.

### CT-002 — Impedir cadastro com e-mail já utilizado

- **Objetivo:** Verificar se a API rejeita o cadastro de um e-mail duplicado.
- **Pré-condições:** CT-001 executado com sucesso; usuário já cadastrado com o e-mail usado.
- **Passos:**
  1. Enviar novamente os dados do usuário cadastrado em CT-001.
- **Resultado esperado:** HTTP 400 e mensagem `Este email já está sendo usado`.
- **Automatizado:** Sim. Atualmente selecionado por `it.only`.

### CT-003 — Listar usuários

- **Objetivo:** Verificar se a API permite consultar a lista de usuários.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar usuários.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim. Não é executado enquanto CT-001 e CT-002 estiverem marcados com `it.only`.

### CT-004 — Consultar usuário pelo identificador

- **Objetivo:** Verificar a consulta de um usuário específico.
- **Pré-condições:** Usuário cadastrado e identificador disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o identificador do usuário criado em CT-001.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim. Não é executado enquanto houver `it.only` neste arquivo.

### CT-005 — Atualizar usuário cadastrado

- **Objetivo:** Validar a atualização dos dados de um usuário existente.
- **Pré-condições:** Usuário cadastrado e identificador disponível.
- **Passos:**
  1. Enviar uma requisição de atualização para o identificador do usuário.
  2. Informar os dados atualizados.
- **Resultado esperado:** HTTP 200 e mensagem `Registro alterado com sucesso`.
- **Automatizado:** Sim. Não é executado enquanto houver `it.only` neste arquivo.

### CT-006 — Realizar login pela API

- **Objetivo:** Verificar a autenticação de um usuário com credenciais válidas.
- **Pré-condições:** Usuário cadastrado com e-mail e senha conhecidos.
- **Passos:**
  1. Enviar e-mail e senha para o endpoint de login.
- **Resultado esperado:** A resposta contém um token de autorização.
- **Automatizado:** Sim. Não é executado enquanto houver `it.only` neste arquivo.

### CT-007 — Excluir usuário cadastrado

- **Objetivo:** Validar a remoção de um usuário existente.
- **Pré-condições:** Usuário cadastrado e identificador disponível.
- **Passos:**
  1. Enviar uma requisição de exclusão para o identificador do usuário.
- **Resultado esperado:** HTTP 200 e mensagem `Registro excluído com sucesso`.
- **Automatizado:** Sim. Não é executado enquanto houver `it.only` neste arquivo.

## 2. Produtos pela API

Arquivo: [API_produtos.cy.js](../e2e/API_produtos.cy.js)

### CT-008 — Cadastrar produto com usuário administrador

- **Objetivo:** Validar o cadastro de um produto por um usuário autenticado com perfil de administrador.
- **Pré-condições:** API disponível; dados do produto definidos em [produto.json](../fixtures/produto.json).
- **Passos:**
  1. Criar um usuário administrador com e-mail exclusivo.
  2. Realizar login e obter o token de autorização.
  3. Enviar os dados do produto com um nome único para a API.
- **Resultado esperado:** HTTP 201, mensagem de cadastro realizado com sucesso e identificador do produto retornado.
- **Automatizado:** Sim.

### CT-009 — Listar produtos

- **Objetivo:** Verificar se a API permite consultar os produtos cadastrados.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar produtos.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim. O teste valida o status, não o conteúdo da lista.

### CT-010 — Consultar produto pelo identificador

- **Objetivo:** Verificar a consulta de um produto específico.
- **Pré-condições:** Produto criado em CT-008 e identificador disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o identificador do produto.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim.

### CT-011 — Atualizar produto cadastrado

- **Objetivo:** Validar a atualização dos dados de um produto existente.
- **Pré-condições:** Produto criado em CT-008; token de administrador válido.
- **Passos:**
  1. Enviar os dados atualizados do produto usando o token de autorização.
- **Resultado esperado:** HTTP 200 e mensagem `Registro alterado com sucesso`.
- **Automatizado:** Sim.

### CT-012 — Excluir produto cadastrado

- **Objetivo:** Validar a remoção de um produto existente.
- **Pré-condições:** Produto criado em CT-008; token de administrador válido.
- **Passos:**
  1. Enviar uma requisição de exclusão usando o identificador do produto e o token de autorização.
- **Resultado esperado:** HTTP 200 e mensagem `Registro excluído com sucesso`.
- **Automatizado:** Sim.

## 3. Carrinho pela API

Arquivo: [API_carrinho.cy.js](../e2e/API_carrinho.cy.js)

### CT-013 — Cadastrar carrinho com produto válido

- **Objetivo:** Validar a criação de um carrinho com um produto disponível.
- **Pré-condições:** API disponível; usuário administrador e produto criados para o cenário.
- **Passos:**
  1. Criar um usuário administrador e autenticar.
  2. Cadastrar um produto para o teste.
  3. Enviar uma requisição de criação de carrinho com uma unidade desse produto.
- **Resultado esperado:** HTTP 201, mensagem de cadastro realizado com sucesso e identificador do carrinho retornado.
- **Automatizado:** Sim.

### CT-014 — Listar carrinhos

- **Objetivo:** Verificar se a API permite consultar os carrinhos.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar carrinhos.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim. O teste valida o status, não o conteúdo da lista.

### CT-015 — Consultar carrinho pelo identificador

- **Objetivo:** Verificar a consulta do carrinho criado para o cenário.
- **Pré-condições:** Carrinho criado em CT-013 e identificador disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o identificador do carrinho.
- **Resultado esperado:** A API retorna HTTP 200.
- **Automatizado:** Sim.

### CT-016 — Cancelar compra e reabastecer estoque

- **Objetivo:** Verificar o cancelamento da compra associada ao carrinho.
- **Pré-condições:** Carrinho criado em CT-013; token do usuário administrador válido.
- **Passos:**
  1. Enviar a requisição de cancelamento da compra com o token de autorização.
- **Resultado esperado:** HTTP 200 e mensagem informando a exclusão do registro e a reposição do estoque.
- **Automatizado:** Sim.

## 4. Login, cadastro e usuários pela interface

Arquivo: [login.cy.js](../e2e/login.cy.js)

### CT-017 — Cadastrar usuário administrador com dados válidos

- **Objetivo:** Validar o cadastro de um usuário pela interface.
- **Pré-condições:** Aplicação web disponível; dados de usuário definidos em [usuario.json](../fixtures/usuario.json).
- **Passos:**
  1. Acessar a tela de login.
  2. Abrir a opção `Cadastre-se`.
  3. Preencher nome, e-mail e senha.
  4. Selecionar o perfil de administrador.
  5. Clicar em `Cadastrar`.
- **Resultado esperado:** A requisição de cadastro recebe HTTP 201.
- **Automatizado:** Sim.

### CT-018 — Validar cadastro sem campos obrigatórios

- **Objetivo:** Verificar as mensagens de validação do formulário de cadastro vazio.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Acessar a tela de cadastro.
  2. Enviar o formulário sem preencher os campos.
- **Resultado esperado:** São exibidas as mensagens de nome, e-mail e senha obrigatórios.
- **Automatizado:** Sim.

### CT-019 — Realizar login com credenciais válidas

- **Objetivo:** Validar o acesso de um usuário cadastrado.
- **Pré-condições:** Usuário de teste criado antes da execução da suíte.
- **Passos:**
  1. Informar e-mail e senha válidos na tela de login.
  2. Clicar em `Entrar`.
- **Resultado esperado:** A área autenticada é exibida com os elementos principais da página inicial.
- **Automatizado:** Sim.

### CT-020 — Conferir nome do usuário após login

- **Objetivo:** Confirmar que a interface identifica corretamente o usuário autenticado.
- **Pré-condições:** Usuário de teste criado.
- **Passos:**
  1. Realizar login com as credenciais válidas.
- **Resultado esperado:** A página exibe `Bem Vindo` seguido do nome do usuário.
- **Automatizado:** Sim.

### CT-021 — Encerrar sessão

- **Objetivo:** Verificar o logout do usuário autenticado.
- **Pré-condições:** Usuário autenticado.
- **Passos:**
  1. Clicar no botão `Logout`.
- **Resultado esperado:** O navegador retorna à rota `/login`.
- **Automatizado:** Sim.

### CT-022 — Rejeitar login com senha incorreta

- **Objetivo:** Verificar o comportamento da interface diante de uma senha inválida.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Informar um e-mail e uma senha incorreta.
  2. Clicar em `Entrar`.
- **Resultado esperado:** É exibida a mensagem `Email e/ou senha inválidos`.
- **Automatizado:** Sim.

### CT-023 — Validar formato de e-mail no login

- **Objetivo:** Verificar a validação de formato do campo de e-mail.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Informar um e-mail em formato inválido e uma senha.
  2. Clicar em `Entrar`.
- **Resultado esperado:** É exibida a mensagem `Email deve ser um email válido`.
- **Automatizado:** Sim.

### CT-024 — Validar login sem campos obrigatórios

- **Objetivo:** Verificar as validações do formulário de login vazio.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Acessar a tela de login.
  2. Clicar em `Entrar` sem preencher e-mail ou senha.
- **Resultado esperado:** São exibidas as mensagens de e-mail e senha obrigatórios.
- **Automatizado:** Sim.

### CT-025 — Acessar a listagem de usuários

- **Objetivo:** Verificar o acesso à funcionalidade de listagem de usuários pela área administrativa.
- **Pré-condições:** Usuário administrador autenticado.
- **Passos:**
  1. Acessar a área administrativa.
  2. Clicar na opção de listar usuários.
- **Resultado esperado:** A ação de listagem é acionada. O teste não verifica os registros exibidos.
- **Automatizado:** Sim.

## 5. Produtos pela interface

Arquivo: [cadastro_produto.cy.js](../e2e/cadastro_produto.cy.js)

### CT-026 — Cadastrar produto com imagem

- **Objetivo:** Validar o preenchimento e envio do formulário de cadastro de produto.
- **Pré-condições:** Aplicação web disponível; usuário administrador criado; dados de produto e imagem de teste disponíveis.
- **Passos:**
  1. Acessar a área administrativa.
  2. Abrir `Cadastrar Produtos`.
  3. Preencher nome, preço, descrição e quantidade.
  4. Anexar [produtolariplay.png](../fixtures/produtolariplay.png).
  5. Clicar em `Cadastrar`.
- **Resultado esperado:** O formulário é preenchido e enviado. O teste não verifica mensagem de sucesso nem persistência do produto.
- **Automatizado:** Sim. Não é executado enquanto CT-028 estiver marcado com `it.only`.

### CT-027 — Consultar produto na listagem

- **Objetivo:** Verificar a exibição de um produto esperado na lista de produtos.
- **Pré-condições:** Aplicação web disponível; usuário administrador autenticado; produto esperado disponível na listagem.
- **Passos:**
  1. Acessar a área administrativa.
  2. Abrir `Listar Produtos`.
- **Resultado esperado:** A página exibe `Lista dos Produtos`, `Produto Lariplay` e a descrição `Produto de teste para o site serverest`.
- **Automatizado:** Sim. Não é executado enquanto CT-028 estiver marcado com `it.only`.

### CT-028 — Carregar listagem com resposta vazia

- **Objetivo:** Verificar que a página de listagem dispara a consulta de produtos quando a API responde com uma lista vazia.
- **Pré-condições:** Aplicação web disponível; usuário administrador autenticado.
- **Passos:**
  1. Interceptar a requisição `GET /produtos` e configurar resposta HTTP 200 com lista vazia.
  2. Abrir `Listar Produtos`.
  3. Aguardar a requisição interceptada.
- **Resultado esperado:** A requisição interceptada é observada. O teste não valida a mensagem ou o estado vazio apresentado na tela.
- **Automatizado:** Sim. Atualmente selecionado por `it.only`.


## Observações

- Os testes marcados com `it.only` restringem a execução no respectivo arquivo. Em [API_login.cy.js](../e2e/API_login.cy.js), CT-001 e CT-002 são os únicos selecionados. Em [cadastro_produto.cy.js](../e2e/cadastro_produto.cy.js), CT-028 é o único selecionado. Remova o `.only` para executar os demais casos desses arquivos.
- Os testes de listagem da API verificam o status HTTP, mas não validam o formato ou os registros retornados.
- Não há cenários automatizados identificados para identificadores inexistentes, autorização ausente ou inválida, nem respostas de erro de validação para cadastro de produtos e carrinhos pela API.
- Os relatórios existentes em `cypress/reports` são resultados de execuções anteriores e não substituem uma execução atual da suíte.
