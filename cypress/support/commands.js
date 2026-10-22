Cypress.Commands.add('Login', (user) => {
        cy.visit('/login');
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.contains('Entrar').click();
        cy.contains('Este é seu sistema para administrar seu ecommerce.').should('be.visible');
        cy.contains('Home').should('be.visible');
});

Cypress.Commands.add('buscarUsuario', (id) => {
        const url = id
                ? `https://serverest.dev/usuarios/${id}`
                : 'https://serverest.dev/usuarios';

        return cy.api({
                method: 'GET',
                url
        });
});

Cypress.Commands.add('loginApi', (user) => {
        return cy.api({
                method: 'POST',
                url: 'https://serverest.dev/login',
                body: user
        }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.authorization).to.exist;

                return response.body.authorization;
        });
});

Cypress.Commands.add('prepararUsuarioComProduto', (produto) => {
        const timestamp = Date.now();
        const email = `carrinho${timestamp}@qa.com`;
        const password = 'teste123';
        const novoProduto = {
                ...produto,
                nome: `${produto.nome} ${timestamp}`
        };

        return cy.api({
                method: 'POST',
                url: 'https://serverest.dev/usuarios',
                body: {
                        nome: 'Usuário teste carrinho',
                        email,
                        password,
                        administrador: 'true'
                }
        }).then((userResponse) => {
                expect(userResponse.status).to.eq(201);
                return cy.loginApi({ email, password });
        }).then((token) => {
                return cy.api({
                        method: 'POST',
                        url: 'https://serverest.dev/produtos',
                        body: novoProduto,
                        headers: {
                                Authorization: token
                        }
                }).then((productResponse) => {
                        expect(productResponse.status).to.eq(201);
                        expect(productResponse.body._id).to.exist;

                        return {
                                token,
                                produtoId: productResponse.body._id
                        };
                });
        });
});
