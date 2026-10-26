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
- **Resultado esperado:** A API deve retornar HTTP 201, mensagem de "cadastro realizado com sucesso" e o ID do usuário criado.

### CT-002 — Impedir cadastro com e-mail já utilizado

- **Objetivo:** Verificar se a API rejeita o cadastro de um e-mail duplicado.
- **Pré-condições:** CT-001 executado com sucesso; usuário já cadastrado com o e-mail usado.
- **Passos:**
  1. Enviar novamente os dados do usuário cadastrado em CT-001.
- **Resultado esperado:** A API deve retornar HTTP 400 e mensagem "Este email já está sendo usado".

### CT-003 — Listar usuários

- **Objetivo:** Verificar se a API permite consultar a lista de usuários na url front.serverest.dev/admin/listarusuarios.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar usuários.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-004 — Consultar usuário pelo ID

- **Objetivo:** Verificar a consulta de um usuário específico.
- **Pré-condições:** Usuário cadastrado e ID disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o ID do usuário criado em CT-001.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-005 — Atualizar usuário cadastrado

- **Objetivo:** Validar a atualização dos dados de um usuário existente.
- **Pré-condições:** Usuário cadastrado e ID disponível.
- **Passos:**
  1. Enviar uma requisição de atualização para o ID do usuário.
  2. Informar os dados atualizados.
- **Resultado esperado:** A API deve retornar HTTP 200 e mensagem "Registro alterado com sucesso".

### CT-006 — Realizar login pela API

- **Objetivo:** Verificar a autenticação de um usuário com credenciais válidas.
- **Pré-condições:** Usuário cadastrado com e-mail e senha.
- **Passos:**
  1. Enviar e-mail e senha para o endpoint de login.
- **Resultado esperado:** A resposta deve conter um token de autorização.

### CT-007 — Excluir usuário cadastrado

- **Objetivo:** Validar a remoção de um usuário existente.
- **Pré-condições:** Usuário cadastrado e ID disponível.
- **Passos:**
  1. Enviar uma requisição de exclusão para o ID do usuário.
- **Resultado esperado:** A API deve retornar HTTP 200 e mensagem "Registro excluído com sucesso".

## 2. Produtos pela API

Arquivo: [API_produtos.cy.js](../e2e/API_produtos.cy.js)

### CT-008 — Cadastrar produto com usuário administrador

- **Objetivo:** Validar o cadastro de um produto por um usuário autenticado com perfil de administrador.
- **Pré-condições:** API disponível; dados do produto definidos em [produto.json](../fixtures/produto.json).
- **Passos:**
  1. Criar um usuário administrador.
  2. Realizar login e obter o token de autorização.
  3. Enviar os dados do produto com um nome único para a API.
- **Resultado esperado:** A API deve retornar HTTP 201, mensagem de "Cadastro realizado com sucesso" e ID do produto retornado.

### CT-009 — Listar produtos

- **Objetivo:** Verificar se a API permite consultar os produtos cadastrados.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar produtos via URL front.serverest.dev/admin/listarprodutos.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-010 — Consultar produto pelo ID

- **Objetivo:** Verificar a consulta de um produto específico.
- **Pré-condições:** Produto criado em CT-008 e ID disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o ID do produto.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-011 — Atualizar produto cadastrado

- **Objetivo:** Validar a atualização dos dados de um produto existente.
- **Pré-condições:** Produto criado em CT-008; token de administrador válido.
- **Passos:**
  1. Enviar os dados atualizados do produto usando o token de autorização.
- **Resultado esperado:** A API deve retornar HTTP 200 e mensagem "Registro alterado com sucesso", e na listagem o produto deve ter sido atualizado.

### CT-012 — Excluir produto cadastrado

- **Objetivo:** Validar a remoção de um produto existente.
- **Pré-condições:** Produto criado em CT-008; token de administrador válido.
- **Passos:**
  1. Enviar uma requisição de exclusão usando o ID do produto e o token de autorização.
- **Resultado esperado:** HTTP 200 e mensagem "Registro excluído com sucesso".

## 3. Carrinho pela API

Arquivo: [API_carrinho.cy.js](../e2e/API_carrinho.cy.js)

### CT-013 — Cadastrar carrinho com produto válido

- **Objetivo:** Validar a criação de um carrinho com um produto disponível.
- **Pré-condições:** API disponível; usuário administrador e produto criados para o cenário.
- **Passos:**
  1. Criar um usuário administrador e autenticar.
  2. Cadastrar um produto para o teste.
  3. Enviar uma requisição de criação de carrinho com uma unidade desse produto.
- **Resultado esperado:** A API deve retornar HTTP 201, mensagem de "Cadastro realizado com sucesso" e ID do carrinho retornado.

### CT-014 — Listar carrinhos

- **Objetivo:** Verificar se a API permite consultar os carrinhos.
- **Pré-condições:** API disponível.
- **Passos:**
  1. Enviar uma requisição para listar carrinhos.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-015 — Consultar carrinho pelo ID

- **Objetivo:** Verificar a consulta do carrinho criado para o cenário.
- **Pré-condições:** Carrinho criado em CT-013 e ID disponível.
- **Passos:**
  1. Enviar uma requisição de consulta usando o ID do carrinho.
- **Resultado esperado:** A API deve retornar HTTP 200.

### CT-016 — Cancelar compra e reabastecer estoque

- **Objetivo:** Verificar o cancelamento da compra associada ao carrinho.
- **Pré-condições:** Carrinho criado em CT-013; token do usuário administrador válido.
- **Passos:**
  1. Enviar a requisição de cancelamento da compra com o token de autorização.
- **Resultado esperado:** A API deve retornar HTTP 200 e mensagem "Registro excluído com sucesso. Estoque dos produtos reabastecido".

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
- **Resultado esperado:** A requisição de cadastro deve receber HTTP 201.

### CT-018 — Validar cadastro sem campos obrigatórios

- **Objetivo:** Verificar as mensagens de validação do formulário de cadastro vazio.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Acessar a tela de cadastro.
  2. Enviar o formulário sem preencher os campos.
- **Resultado esperado:** Devem ser exibidas as mensagens de nome, e-mail e senha obrigatórios e nao permitir o cadastro do usuario.

### CT-019 — Realizar login com credenciais válidas

- **Objetivo:** Validar o acesso de um usuário cadastrado.
- **Pré-condições:** Usuário de teste criado antes da execução da suíte.
- **Passos:**
  1. Informar e-mail e senha válidos na tela de login.
  2. Clicar em `Entrar`.
- **Resultado esperado:** A área autenticada deve ser exibida com os elementos principais da página inicial.

### CT-020 — Conferir nome do usuário após login

- **Objetivo:** Confirmar que a interface identifica corretamente o usuário autenticado.
- **Pré-condições:** Usuário de teste criado.
- **Passos:**
  1. Realizar login com as credenciais válidas.
- **Resultado esperado:** A página deve exibir `Bem Vindo` seguido do nome do usuário.

### CT-021 — Encerrar sessão

- **Objetivo:** Verificar o logout do usuário autenticado.
- **Pré-condições:** Usuário autenticado.
- **Passos:**
  1. Clicar no botão `Logout`.
- **Resultado esperado:** O navegador retorna para rota `/login`.

### CT-022 — Rejeitar login com senha incorreta

- **Objetivo:** Verificar o comportamento da interface diante de uma senha inválida.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Informar um e-mail e uma senha incorreta.
  2. Clicar em `Entrar`.
- **Resultado esperado:** É exibida a mensagem "Email e/ou senha inválidos".

### CT-023 — Validar formato de e-mail no login

- **Objetivo:** Verificar a validação de formato do campo de e-mail.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Informar um e-mail em formato inválido exemplo: email@email e uma senha.
  2. Clicar em `Entrar`.
- **Resultado esperado:** É exibida a mensagem `Email deve ser um email válido`.

### CT-024 — Validar login sem campos obrigatórios

- **Objetivo:** Verificar as validações do formulário quando o login estiver com os campos vazios.
- **Pré-condições:** Aplicação web disponível.
- **Passos:**
  1. Acessar a tela de login.
  2. Clicar em `Entrar` sem preencher e-mail ou senha.
- **Resultado esperado:** São exibidas as mensagens de e-mail e senha obrigatórios.

### CT-025 — Acessar a listagem de usuários

- **Objetivo:** Verificar o acesso à funcionalidade de listagem de usuários pela área administrativa.
- **Pré-condições:** Usuário administrador autenticado.
- **Passos:**
  1. Acessar a área administrativa.
  2. Clicar na opção de listar usuários.
- **Resultado esperado:** A ação de listagem é deve ser exibida.

## 5. Produtos pela interface

Arquivo: [cadastro_produto.cy.js](../e2e/cadastro_produto.cy.js)

### CT-026 — Cadastrar produto com imagem

- **Objetivo:** Validar o preenchimento e envio do formulário de cadastro de produto.
- **Pré-condições:** Aplicação web disponível; usuário administrador criado; dados de produto e imagem de teste disponíveis; dependência `cypress-file-upload` instalada e carregada pelo suporte do Cypress para permitir o envio automatizado do arquivo.
- **Passos:**
  1. Acessar a área administrativa.
  2. Abrir `Cadastrar Produtos`.
  3. Preencher nome, preço, descrição e quantidade.
  4. Anexar [produtolariplay.png](../fixtures/produtolariplay.png).
  5. Clicar em `Cadastrar`.
- **Resultado esperado:** A solicitação de cadastro do produto deve retornar HTTP 201.

### CT-027 — Consultar produto na listagem

- **Objetivo:** Verificar a exibição de um produto esperado na lista de produtos.
- **Pré-condições:** CT-026 concluído com sucesso; usuário administrador autenticado.
- **Passos:**
  1. Acessar a área administrativa.
  2. Abrir `Listar Produtos`.
- **Resultado esperado:** A página deve exibir `Lista dos Produtos`, o nome exclusivo do produto cadastrado em CT-026 e sua descrição.

### CT-028 — Carregar listagem com resposta vazia

- **Objetivo:** Verificar que a página de listagem dispara a consulta de produtos quando a API responde com uma lista vazia.
- **Pré-condições:** Aplicação web disponível; usuário administrador autenticado.
- **Passos:**
  1. Interceptar a requisição `GET /produtos` e configurar resposta HTTP 200 com lista vazia.
  2. Abrir `Listar Produtos`.
  3. Aguardar a requisição interceptada.
- **Resultado esperado:** A requisição interceptada retorna HTTP 200 com quantidade zero e uma lista vazia.
