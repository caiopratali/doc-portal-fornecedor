# Funcionalidade: Recessos

### Cenário: Listar meus recessos com sucesso

Dado que temos um token valido \
Quando fizer uma requisição GET na api para rota /recessos \
Então deve retornar status code 200 \
E a listagem de recessos

### Cenário: Buscar um recesso pelo ID com sucesso
Dado que temos um token valido \
Quando fizer uma requisição GET na api para rota /recessos/:id com um ID válido \
Então deve retornar status code 200 \
E um objeto com os dados do recesso

### Cenário: Buscar um recesso com ID inexistente
Dado que temos um token valido \
Quando fizer uma requisição GET na api para rota /recessos/:id com um ID inexistente \
Então deve retornar status code 404 \ 
E uma mensagem de erro

### Cenário: Adicionar um recesso com sucesso

Dado que temos um token valido \
Quando fizer uma requisição POST na api para rota /recessos  \
com os dados validos \
Então deve retornar status code 201 \
E o novo recesso

### Cenário: Adicionar um recesso sem preencher campo obrigatório

Dado que temos um token valido \
Quando fizer uma requisição POST na api para rota /recessos  \
sem preencher algum dado obrigatório \
Então deve retornar status code 400 \
E uma mensagem de erro

### Cenário: Atualizar um recesso com sucesso

Dado que temos um token valido \
Quando fizer uma requisição PUT na api para rota /recessos/:id  \
com os dados válidos \
Então deve retornar status code 200 \
E o objeto atualizado

### Cenário: Atualizar um recesso sem preencher campo obrigatório

Dado que temos um token valido \
Quando fizer uma requisição PUT na api para rota /recessos/:id  \
sem preencher algum dado obrigatório \
Então deve retornar status code 400 \
E uma mensagem de erro

### Cenário: Atualizar um recesso com ID inexistente

Dado que temos um token valido \
Quando fizer uma requisição PUT na api para rota /recessos/:id  \
com um ID inexistente \
Então deve retornar status code 404 \
E uma mensagem de erro

### Cenário: Deletar um recesso com sucesso

Dado que temos um token valido \
Quando fizer uma requisição DELETE na api para rota /recessos/:id  \
com um ID válido \
Então deve retornar status code 200 \
E uma mensagem de sucesso

### Cenário: Deletar um recesso com ID inexistente

Dado que temos um token valido \
Quando fizer uma requisição DELETE na api para rota /recessos/:id  \
com um ID inexistente \
Então deve retornar status code 404 \
E uma mensagem de erro