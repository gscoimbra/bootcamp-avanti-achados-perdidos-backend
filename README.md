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

