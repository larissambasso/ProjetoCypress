describe('API de carrinho do Serverest', () => {
    let carrinhoId
    let token

    it('Cadastra carrinho', () => {
        cy.fixture('produto').then(({ cria_produto }) => {
            return cy.prepararUsuarioComProduto(cria_produto);
        }).then(({ token: authToken, produtoId }) => {
            token = authToken;
            return cy.api({
                method: 'POST',
                url: 'https://serverest.dev/carrinhos',
                body: {
                    produtos: [{
                        idProduto: produtoId,
                        quantidade: 1
                    }]
                },
                headers: {
                    Authorization: token
                }
            });
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');

            carrinhoId = response.body._id;
            expect(carrinhoId).to.exist;
            cy.log(`Carrinho criado com ID: ${carrinhoId}`);
        });
    });
    it('Lista carrinho', () => {
        cy.api({
            method: 'GET',
            url: 'https://serverest.dev/carrinhos'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
    it('Lista carrinho por ID', () => {
        cy.api({
            method: 'GET',
            url: `https://serverest.dev/carrinhos/${carrinhoId}`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Cancela compra', () => {
        cy.log(`Cancelando compra do carrinho com ID: ${carrinhoId}`);
        cy.api({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/cancelar-compra',
            headers: {
                Authorization: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido');
        });
    });
});
