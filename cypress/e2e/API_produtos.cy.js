describe('API de produtos do Serverest', () => {
    let id
    let token

    it('Cadastro de produtos', () => {
        cy.fixture('produto').then((produto) => {
            const prod = {
                ...produto.cria_produto,
                nome: `${produto.cria_produto.nome} ${Date.now()}`
            }
            const email = `larissa${Date.now()}@qa.com`
            const password = 'teste123'

            cy.api({
                method: 'POST',
                url: 'https://serverest.dev/usuarios',
                body: {
                    nome: 'Larissa teste',
                    email,
                    password,
                    administrador: 'true'
                }
            }).then((userResponse) => {
                expect(userResponse.status).to.eq(201)

                return cy.loginApi({ email, password })
            }).then((authToken) => {
                token = authToken
                return cy.api({
                    method: 'POST',
                    url: 'https://serverest.dev/produtos',
                    body: prod,
                    headers: {
                        Authorization: token
                    }
                })
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')

                id = response.body._id
                expect(id).to.exist
            })
        })
    })
    it('Listar produtos', () => {
        cy.api({
            method: 'GET',
            url: 'https://serverest.dev/produtos'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Buscar produto por ID', () => {
        cy.api({
            method: 'GET',
            url: `https://serverest.dev/produtos/${id}`
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Atualiza produto', () => {
        cy.log(`Atualizando produto com ID: ${id}`)
        cy.fixture('produto').then(function (produto) {
            const atlz = {
                ...produto.atlz_produto,
                nome: `${produto.atlz_produto.nome} ${Date.now()}`
            }
            cy.api({
                method: 'PUT',
                url: `https://serverest.dev/produtos/${id}`,
                body: atlz,
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            })
        })
    })
    it('Excluir produto', () => {
        cy.log(`Excluindo produto com ID: ${id}`)
        cy.api({
            method: 'DELETE',
            url: `https://serverest.dev/produtos/${id}`,
            headers: {
                Authorization: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })
})
