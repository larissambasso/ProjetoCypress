describe('Login do usuário', () => {
    let user
    let produtoTeste

    before(() => {
        cy.fixture('usuario').then(({ criar }) => {
            user = {
                ...criar,
                email: `produto${Date.now()}@qa.com`
            }

            return cy.api({
                method: 'POST',
                url: 'https://serverest.dev/usuarios',
                body: user
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })

        cy.fixture('produto').then(({ cria_produto }) => {
            produtoTeste = {
                ...cria_produto,
                nome: `${cria_produto.nome} ${Date.now()}`
            }
        })
    })

    beforeEach(() => {
        cy.session(user.email, () => {
            cy.Login(user);
        })
    })
    it('Cadastrar produto com imagem',()=>{
        cy.visit('/admin/home');
        cy.contains('li','Cadastrar Produtos').click();
        cy.get('#nome').type(produtoTeste.nome);
        cy.get('#price').type(produtoTeste.preco);
        cy.get('#description').type(produtoTeste.descricao);
        cy.get('#quantity').type(produtoTeste.quantidade);
        cy.get('#imagem').attachFile('produtolariplay.png');
        cy.intercept('POST', '**/produtos').as('cadastrarProduto');
        cy.contains('button','Cadastrar').click();
        cy.wait('@cadastrarProduto').its('response.statusCode').should('eq', 201);
    })
    it('Exibir produto cadastrado na listagem',()=>{
        cy.visit('/admin/home');
        cy.contains('li','Listar Produtos').click();
        cy.contains('Lista dos Produtos').should('be.visible');
        cy.contains(produtoTeste.nome).should('be.visible');
        cy.contains(produtoTeste.descricao).should('be.visible');
    })
    it('Carregar listagem quando a API retorna produtos vazios',()=>{
        cy.visit('/admin/home');
        cy.intercept('GET', 'https://serverest.dev/produtos', {
            statusCode: 200,
            body: { quantidade: 0, produtos: [] }
        }).as('listarProd');
        cy.contains('li','Listar Produtos').click();
        cy.wait('@listarProd').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.deep.equal({ quantidade: 0, produtos: [] });
        });
    })
});