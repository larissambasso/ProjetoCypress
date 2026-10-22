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

    it('Cadastro sem preencher campos', () => {
        cy.visit('/login');
        cy.get('[data-testid="cadastrar"]').click();
        cy.contains('button', 'Cadastrar').click()
        cy.contains('Nome é obrigatório').should('be.visible');
        cy.contains('Email é obrigatório').should('be.visible');
        cy.contains('Password é obrigatório').should('be.visible');
    });

    it('Realiza login do usuário', () => {
        cy.Login(user);
    });

    it('Exibe o nome correto após realizar login', () => {
        cy.Login(user);
        cy.contains(`Bem Vindo ${user.nome}`).should('be.visible');
    });

    it('Fazer logout do usuário', () => {
        cy.Login(user);
        cy.contains('button', 'Logout').click()
        cy.url().should('include', '/login')
    });
    
    it('Login invalido do usuário', () => {
        cy.visit('/login');

        cy.get('[data-testid="email"]').type('teste@qa.com');
        cy.get('[data-testid="senha"]').type('senha errada');
        cy.get('[data-testid="entrar"]').click();

        cy.contains('Email e/ou senha inválidos').should('be.visible');
    });
        it('Email invalido do usuário', () => {
        cy.visit('/login');

        cy.get('[data-testid="email"]').type('teste@teste');
        cy.get('[data-testid="senha"]').type('senha');
        cy.get('[data-testid="entrar"]').click();

        cy.contains('Email deve ser um email válido').should('be.visible');
    });

    it('Login sem preencher campos', () => {
        cy.visit('/login');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('Email é obrigatório').should('be.visible');
        cy.contains('Password é obrigatório').should('be.visible');
    });

    it('Lista usuários', () => {
        cy.Login(user);
        cy.visit('/admin/home');
        cy.get('[data-testid="listarUsuarios"]').click();
    });
});