describe('Pagina de lista de usuarios', () => {
    it('Verificar listagem de usuários', () => {
        cy.loginPadrao();
        cy.visit('/admin/home');
        cy.intercept('GET', '**/usuarios*').as('listaUsuarios');

        cy.get('[data-testid="listarUsuarios"]').click();

        cy.wait('@listaUsuarios')
            .its('response.statusCode')
            .should('eq', 200);
        cy.wait(2000);

        cy.get('body').then(($body) => {
            const userRows = $body.find('tbody tr');

            if (userRows.length > 0) {
                cy.log(`Lista de usuarios exibida: ${userRows.length} usuário(s)`);
            } else {
                cy.log('Chamada da lista ok, Lista de usuarios vazia');
            }
        });
    });
});