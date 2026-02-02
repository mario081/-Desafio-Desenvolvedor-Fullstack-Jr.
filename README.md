# 🐾 Pet Manager - Desafio Fullstack Jr

 Robusta de gerenciamento de pets desenvolvida com NestJS, focada em segurança, escalabilidade e boas práticas de arquitetura. O sistema permite o cadastro de usuários e o gerenciamento (CRUD) de anúncios de animais com controle de acesso rigoroso.
 #
🚀 Tecnologias e Ferramentas

Core
- NestJS: Framework Node.js progressivo para aplicações eficientes.

- Prisma ORM: Modelagem de dados e queries seguras com TypeScript.

- PostgreSQL: Banco de dados relacional robusto.

- Passport.js & JWT: Estratégia de autenticação segura via tokens.

- Argon2: Algoritmo moderno e resiliente para hashing de senhas.
#
Arquitetura & Padronização

- DTOs (Data Transfer Objects): Validação rigorosa de entrada de dados.

- Custom Decorators: Decorador @CurrentUser para extração limpa de dados do usuário logado.

- Guards: Proteção de rotas com JwtUserGuard.

- Prisma Adapter: Utilização do @prisma/adapter-pg para máxima performance com Postgres.
#
✨ Funcionalidades

🔐 Autenticação & Usuários

- Cadastro de Usuários: Criação de conta com hash de senha via argon2.

- Login: Autenticação via JWT (JSON Web Token).

- Perfil: Busca de usuários por ID ou Email.

- Segurança: Rotas privadas protegidas por Strategy JWT.

🐶 Gerenciamento de Animais (Pets)

- Anúncios: Cadastro de pets vinculados ao usuário (Relacionamento $1:N$).
- Listagem Pública: Visualização de todos os animais com dados de contato do dono.
- Controle de Acesso (ACL): Apenas o proprietário do anúncio tem permissão para Editar ou Excluir seu pet.
- Validação: Verificação de existência do registro e propriedade antes de qualquer operação.
#
🛠️ Como Executar o Projeto
1. Clonar e Instalar
```bash
git clone https://github.com/RWilker87/desafio-jr-rian.git
cd desafio-jr-rian
npm install
```
2. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

```bash
DATABASE_URL="postgresql://root_user:root_password@localhost:5432/patients_db?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
```
3. Banco de Dados (Docker)
Certifique-se de que o Docker está rodando e inicie o container:

```Bash
docker-compose up -d
```
4. Migrations e Prisma
```Bash
npx prisma migrate dev
npx prisma generate
```
5. Iniciar API
```Bash
# Modo desenvolvimento
npm run start:dev
```
#
📡 Principais Endpoints
```bash
Método    Endpoint            Descrição                          Autenticação
POST      /user               Cadastro de novo usuário               Livre
POST      /user/signin        Login (retorna o Access Token)         Livre
GET       /animal             Listar todos os animais registrados    Livre
POST      /animal             Criar novo anúncio de pet               JWT
PATCH     /animal/:id         Atualizar dados do pet (Apenas dono)    JWT
DELETE    /animal/:id         Remover pet (Apenas dono)               JWT
```
#
🛡️ Decisões Técnicas

- Segurança com Argon2: Diferente do bcrypt, o Argon2 é o vencedor da Password Hashing Competition, oferecendo maior resistência a ataques de GPU.

- Singleton Prisma: O PrismaService foi configurado de forma global para evitar múltiplas conexões desnecessárias com o banco de dados.

- Clean Code: Uso de Param Decorators para evitar a repetição de código ao buscar o usuário dentro das requisições.

<p align="center"> Desenvolvido por <strong>Mário</strong> 🚀 </p>












