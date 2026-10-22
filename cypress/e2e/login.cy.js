describe('Login do usuário', () => {
    let user

    before(() => {
        cy.fixture('usuario').then(({ criar }) => {
            user = {
                ...criar,
                email: `login${Date.now()}@qa.com`
            }
        })
    })

    it('Realiza o cadastro de um usuário', () => {
        cy.intercept('POST', 'https://serverest.dev/usuarios').as('cadastrarUsuario');
        cy.visit('/login');
        cy.contains('Cadastre-se').click();
        cy.get('#nome').type(user.nome);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('#administrador').check();
        cy.get('[data-testid="cadastrar"]').click();
        cy.wait('@cadastrarUsuario').its('response.statusCode').should('eq', 201);
    });

    it('Realiza login do usuário', () => {
        cy.Login(user);
    });

    it('Lista usuários', () => {
        cy.Login(user);
        cy.visit('/admin/home');
        cy.get('[data-testid="listarUsuarios"]').click();
    });
});