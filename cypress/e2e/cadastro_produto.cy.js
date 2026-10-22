describe('Login do usuário', () => {
    let user

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
    })

    beforeEach(() => {
        cy.session(user.email, () => {
            cy.Login(user);
        })
    })
    it('Cadastro de produtos',()=>{
        cy.fixture("produto").then(function(produto){
            const prod = produto.criar
            cy.visit('/admin/home');
            cy.contains('li','Cadastrar Produtos').click();
            cy.get('#nome').type(prod.nome);
            cy.get('#price').type(prod.preco);
            cy.get('#description').type(prod.descricao);
            cy.get('#quantity').type(prod.quantidade);
            cy.get('#imagem').as('fileInput').attachFile('produtolariplay.png');
            cy.contains('button','Cadastrar').click();
        })
    })
    it ('Listar produto',()=>{
        cy.visit('/admin/home');
        cy.contains('li','Listar Produtos').click();
        cy.contains('Lista dos Produtos').should('be.visible');
        cy.contains('Produto Lariplay').should('be.visible');
        cy.contains('Produto de teste para o site serverest').should('be.visible');
    })
        it.only('Listar produto',()=>{
        cy.visit('/admin/home');
        cy.intercept('GET', 'https://serverest.dev/produtos', {
            statusCode: 200,
            body: { quantidade: 0, produtos: [] }
        }).as('listarProd');
        cy.contains('li','Listar Produtos').click();
        cy.wait('@listarProd')
    })
});