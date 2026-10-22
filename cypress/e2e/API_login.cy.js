describe('API de login do Serverest', () => {
    let id
    let email

    it.only('Criar usuário', () => {
        email = `larissa${Date.now()}@qa.com`
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: 'Larissa teste',
                email,
                password: 'teste123',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')

            id = response.body._id
        })
    })
    it.only('Teste de falha - Criar usuário', () => {
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Larissa teste',
                email,
                password: 'teste123',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Este email já está sendo usado')
        })
    })

    it('Listar usuários', () => {
        cy.buscarUsuario().then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Buscar usuário por ID', () => {
        cy.buscarUsuario(id).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Atualizar usuário', () => {
        cy.api({
            method: 'PUT',
            url: `https://serverest.dev/usuarios/${id}`,
            body: {
                nome: 'Larissa teste atualizada',
                email,
                password: 'teste123',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')
        })
    })
    it('Realizar login do usuário', () => {
        cy.loginApi({
            email,
            password: 'teste123'
        }).then((token) => {
            expect(token).to.exist
        })
    })
    
    it('Excluir usuário', () => {
        cy.api({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${id}`
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })
})