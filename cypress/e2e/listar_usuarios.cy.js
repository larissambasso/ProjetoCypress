function excluirProximoUsuario(indice = 0) {
    return cy.get('tbody tr').then(($rows) => {
        if (indice >= $rows.length) {
            throw new Error('Nenhum usuário sem carrinho foi encontrado para excluir.');
        }

        return cy.get('tbody tr')
            .eq(indice)
            .contains('button', 'Excluir')
            .click()
            .then(() => cy.wait('@excluirUsuario'))
            .then((interception) => {
                const { response, error, request } = interception;

                if (!response) {
                    throw new Error(
                        `A exclusão de ${request.url} não recebeu resposta HTTP: ${error?.message || 'erro de rede'}`
                    );
                }

                if (response.statusCode === 400 &&
                    response.body.message === 'Não é permitido excluir usuário com carrinho cadastrado') {
                    cy.log('Não é permitido excluir usuário com carrinho cadastrado; tentando o próximo');
                    return cy.wait('@listaUsuarios').then(({ response: listResponse }) => {
                        expect(listResponse.statusCode).to.eq(200);
                        return excluirProximoUsuario(indice + 1);
                    });
                }

                expect(response.statusCode).to.eq(200);
                cy.log(`Usuário da linha ${indice + 1} excluído com sucesso`);
            });
    });
}

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
    it.only('Excluir um usuário sem carrinho da lista', () => {
        cy.loginPadrao();
        cy.visit('/admin/home');
        cy.intercept('GET', '**/usuarios*').as('listaUsuarios');
        cy.intercept('DELETE', 'https://serverest.dev/usuarios/*').as('excluirUsuario');

        cy.get('[data-testid="listarUsuarios"]').click();
        cy.wait('@listaUsuarios')
            .its('response.statusCode')
            .should('eq', 200);

        excluirProximoUsuario();
    });
});