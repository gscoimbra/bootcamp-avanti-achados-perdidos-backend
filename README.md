# 📦 Sistema de Achados e Perdidos Comunitário do Bootcamp Avanti

Aplicação web back-end desenvolvida para ajudar pessoas a cadastrarem e consultarem objetos perdidos ou encontrados em locais públicos como escolas, parques, e centros comunitários.

## ⚙️ Tecnologias Utilizadas

- [Node.js]
- [Express]
- [Prisma ORM]
- [PostgreSQL]
- [Multer]

## 🧰 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gscoimbra/bootcamp-avanti-achados-perdidos-backend.git

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure o .env para a sua URL do PostgreSQL, a que segue é só um exemplo:**
   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/achados_perdidos?schema=public"

4. **Rode as migrações do Prisma:**
   ```bash
   npx prisma migrate dev --name init

5. **Inicie o servidor:**
   ```bash
   npm run dev

## ✅ Funcionalidades
- CRUD completo de Itens (com upload de imagem), Usuários e Categorias
- Filtros por status, categoria e local
- Servidor Express com rotas REST
- Integração com PostgreSQL via Prisma ORM
- Upload de imagem usando Multer

## 🔗 Documentação da API
### 📌 `POST /itens`

**Descrição:** Cadastra um novo item perdido ou encontrado.

**Método:** `POST`  
**URL:** `/itens`  
**Tipo de requisição:** `multipart/form-data`  

#### 🔸 Campos esperados (form-data):

| Campo        | Tipo     | Obrigatório | Observação                                  |
|--------------|----------|-------------|---------------------------------------------|
| nome         | Texto    | ✅          | Ex: "Carteira preta com zíper"              |
| data         | Texto    | ✅          | Formato: `YYYY-MM-DD`                       |
| localizacao  | Texto    | ✅          | Local onde o item foi perdido/encontrado    |
| contato      | Texto    | ✅          | E-mail ou telefone de contato               |
| status       | Texto    | ✅          | `PERDIDO` ou `ENCONTRADO`                   |
| usuarioId    | Número   | ✅          | ID de um usuário existente                  |
| categoriaId  | Número   | ✅          | ID de uma categoria existente               |
| foto         | Arquivo  | ❌          | Formatos permitidos: `.jpg`, `.png`, `.webp`|

#### 🧪 Exemplo (no Postman — tipo `form-data`):

- `nome`: Carteira preta  
- `data`: 2025-04-01  
- `localizacao`: Terminal Central  
- `contato`: maria@email.com  
- `status`: PERDIDO  
- `usuarioId`: 1  
- `categoriaId`: 2  
- `foto`: *(arquivo de imagem escolhido)*

#### ✅ Resposta de sucesso:
`
{
  "id": 12,
  "nome": "Carteira preta",
  "data": "2025-04-01T00:00:00.000Z",
  "localizacao": "Terminal Central",
  "contato": "maria@email.com",
  "foto": "1712096723456-carteira.jpg",
  "status": "PERDIDO",
  "usuarioId": 1,
  "categoriaId": 2
}`

### 📌 `POST /usuarios`

**Descrição:** Cadastra um novo usuário no sistema.

**Método:** `POST`  
**URL:** `/usuarios`  
**Tipo de requisição:** `application/json`

#### 🔸 Corpo da requisição (JSON):
`
{
  "nome": "João da Silva",
  "telefone": "11999999999",
  "email": "joao@email.com"
}`

#### ✅ Resposta de sucesso:
`{
  "id": 1,
  "nome": "João da Silva",
  "telefone": "11999999999",
  "email": "joao@email.com"
}`

### 📌 `POST /categorias`

**Descrição:** Cadastra uma nova categoria no sistema.

**Método:** `POST`  
**URL:** `/categoria`  
**Tipo de requisição:** `application/json`

#### 🔸 Corpo da requisição (JSON):
`
{
  "nome": "Documentos",
}`

#### ✅ Resposta de sucesso:
`{
  "id": 1,
  "nome": "Documentos",
}`

---

### 📌 `GET /itens`

**Descrição:** Lista todos os itens cadastrados, com suporte a filtros opcionais por status, categoria, local e palavras-chave.

**Método:** `GET`  
**URL:** `/itens`  
**Tipo de requisição:** `query string` (parâmetros opcionais)

#### 🔸 Parâmetros opcionais:

| Parâmetro     | Tipo     | Exemplo           | Descrição                                  |
|---------------|----------|-------------------|----------------------------------------------|
| status        | Texto    | `PERDIDO`         | Filtra por status (`PERDIDO` ou `ENCONTRADO`) |
| categoriaId   | Número   | `1`               | Filtra por ID da categoria                   |
| localizacao   | Texto    | `parque`          | Busca parcial por localização                |
| busca         | Texto    | `chave`           | Busca parcial pelo nome do item              |

#### 🧪 Exemplos de requisição:

- Listar todos os itens: GET `/itens`
- Filtrar por itens perdidos: GET `/itens?status=PERDIDO`
- Buscar itens encontrados da categoria 2 na estação: GET `/itens?status=ENCONTRADO&categoriaId=2&localizacao=Estação`
- Buscar por nome com palavra-chave: GET `/itens?busca=carteira`

#### ✅ Resposta de sucesso (exemplo simplificado):
`
[
{
  "id": 1,
  "nome": "Carteira preta",
  "data": "2025-04-01T00:00:00.000Z",
  "localizacao": "Terminal Central",
  "contato": "joao@email.com",
  "foto": "1712096723456-carteira.jpg",
  "status": "PERDIDO",
  "usuario": {
    "id": 1,
    "nome": "João da Silva"
  },
  "categoria": {
    "id": 2,
    "nome": "Documentos"
  }
}
]`

### 📌 `GET /usuarios`

**Descrição:** Lista todos os usuários cadastrados no sistema.

**Método:** `GET`  
**URL:** `/usuarios`  
**Tipo de requisição:** Nenhum corpo ou parâmetro necessário

- Listar todos os usuários: GET `/usuarios`

#### ✅ Resposta de sucesso (exemplo simplificado):
`[
{
 "id": 1,
 "nome": "João da Silva",
 "telefone": "11999999999",
 "email": "joao@email.com"
},
{
 "id": 2,
 "nome": "Maria Oliveira",
 "telefone": "11988887777",
 "email": "maria@email.com"
}
]`

### 📌 `GET /categorias`

**Descrição:** Lista todas as categorias disponíveis para classificação dos itens (ex: Chaves, Documentos, Eletrônicos).

**Método:** `GET`  
**URL:** `/categorias`  
**Tipo de requisição:** Nenhum corpo ou parâmetro necessário

- Listar todas as categorias: GET `/categorias`

#### ✅ Resposta de sucesso (exemplo simplificado):
`[
  {
    "id": 1,
    "nome": "Documentos"
  },
  {
    "id": 2,
    "nome": "Eletrônicos"
  },
  {
    "id": 3,
    "nome": "Chaves"
  }
]`

---

### 📌 `PUT /itens/:id`

**Descrição:** Atualiza todos os dados de um item existente, incluindo a imagem, se enviada.

**Método:** `PUT`  
**URL:** `/itens/:id`  
**Tipo de requisição:** `multipart/form-data`

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                       |
|-----------|--------|-------------|---------------------------------|
| id        | Número | ✅          | ID do item a ser atualizado     |

#### 🔸 Campos do formulário (`form-data`):

| Campo        | Tipo     | Obrigatório | Observação                               |
|--------------|----------|-------------|-------------------------------------------|
| nome         | Texto    | ✅          | Nome do item                              |
| data         | Texto    | ✅          | Formato: `YYYY-MM-DD`                     |
| localizacao  | Texto    | ✅          | Local onde foi perdido/encontrado         |
| contato      | Texto    | ✅          | Telefone ou e-mail                        |
| status       | Texto    | ✅          | `PERDIDO` ou `ENCONTRADO`                 |
| usuarioId    | Número   | ✅          | ID de um usuário existente                |
| categoriaId  | Número   | ✅          | ID de uma categoria existente             |
| foto         | Arquivo  | ❌          | Envie nova imagem caso deseje substituir  |

#### 🧪 Exemplo:

**URL:** PUT `/itens/3`
**Tipo de requisição:** `multipart/form-data`
#### 🔸 Corpo da requisição (multipart/form-data):
- `nome`: Carteira atualizada  
- `data`: 2025-04-02  
- `localizacao`: Estação Central  
- `contato`: novo@email.com  
- `status`: ENCONTRADO  
- `usuarioId`: 1  
- `categoriaId`: 2  
- `foto`: *(arquivo de novo, opcional)*

#### ✅ Resposta de sucesso (exemplo):

`
{
"id": 3,
"nome": "Carteira atualizada",
"data": "2025-04-02T00:00:00.000Z",
"localizacao": "Estação Central",
"contato": "novo@email.com",
"foto": "1712099999999-nova-imagem.png",
"status": "ENCONTRADO",
"usuarioId": 1,
"categoriaId": 2
}`

### 📌 `PUT /usuarios/:id`

**Descrição:** Atualiza os dados de um usuário existente no sistema.

**Método:** `PUT`  
**URL:** `/usuarios/:id`  
**Tipo de requisição:** `application/json`

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                      |
|-----------|--------|-------------|--------------------------------|
| id        | Número | ✅          | ID do usuário a ser atualizado |

####🧪 Exemplo:
PUT `/usuarios/1`

#### 🔸 Corpo da requisição (JSON):

`
{
  "nome": "João Atualizado",
  "telefone": "11988887777",
  "email": "joao.atualizado@email.com"
}`

#### ✅ Resposta de sucesso (exemplo):

`
{
  "id": 1,
  "nome": "João Atualizado",
  "telefone": "11988887777",
  "email": "joao.atualizado@email.com"
}`

### 📌 `PUT /categorias/:id`

**Descrição:** Atualiza os dados de uma categoria existente.

**Método:** `PUT`  
**URL:** `/categorias/:id`  
**Tipo de requisição:** `application/json`

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                         |
|-----------|--------|-------------|-----------------------------------|
| id        | Número | ✅          | ID da categoria a ser atualizada  |

####🧪 Exemplo:
PUT `/categorias/2`


#### 🔸 Corpo da requisição (JSON):

`
{
  "nome": "Eletrônicos"
}`

#### ✅ Resposta de sucesso (exemplo):

`
{
  "id": 2,
  "nome": "Eletrônicos"
}`

---

### 📌 `DELETE /itens/:id`

**Descrição:** Remove um item do sistema com base no seu ID.

**Método:** `DELETE`  
**URL:** `/itens/:id`  
**Tipo de requisição:** Não requer corpo (apenas o ID na URL)

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                     |
|-----------|--------|-------------|-------------------------------|
| id        | Número | ✅          | ID do item a ser removido     |

#### 🧪 Exemplo:
DELETE `/itens/5`

#### ✅ Resposta de sucesso:

`
{
  "mensagem": "Item removido com sucesso"
}`

### 📌 `DELETE /usuarios/:id`

**Descrição:** Remove um usuário do sistema com base no seu ID.

**Método:** `DELETE`  
**URL:** `/usuarios/:id`  
**Tipo de requisição:** Não requer corpo (apenas o ID na URL)

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                       |
|-----------|--------|-------------|---------------------------------|
| id        | Número | ✅          | ID do usuário a ser removido    |

#### 🧪 Exemplo:
DELETE `/usuarios/2`

#### ✅ Resposta de sucesso:

`
{
  "mensagem": "Usuário removido com sucesso"
}`

### 📌 `DELETE /categorias/:id`

**Descrição:** Remove uma categoria do sistema com base no seu ID.

**Método:** `DELETE`  
**URL:** `/categorias/:id`  
**Tipo de requisição:** Não requer corpo (apenas o ID na URL)

#### 🔸 Parâmetros de rota:

| Parâmetro | Tipo   | Obrigatório | Descrição                          |
|-----------|--------|-------------|------------------------------------|
| id        | Número | ✅          | ID da categoria a ser removida     |

#### 🧪 Exemplo:
DELETE `/categorias/3`

#### ✅ Resposta de sucesso:

`
{
  "mensagem": "Categoria removida com sucesso"
}`






