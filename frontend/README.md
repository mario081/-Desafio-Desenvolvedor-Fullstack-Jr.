# Pet Shop - Dashboard (Frontend)

SPA do desafio Pet Shop: cadastro de usuário, login e CRUD de animais (gatos e cachorros) com controle de acesso.

## Requisitos

- Node.js 18+
- Backend NestJS rodando (ex.: `http://localhost:3000`)

## Instalação

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do `frontend` (opcional):

```env
VITE_API_URL=http://localhost:3000
```

Se não definir, a aplicação usa `http://localhost:3000` como base da API.

## Executar

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## Build

```bash
npm run build
```

## Funcionalidades

- **Cadastro (pública):** nome, e-mail, senha e contato
- **Login (pública):** e-mail e senha; retorno com JWT
- **Home (privada):**
  - Listar todos os animais de todos os usuários
  - Busca em uma única caixa: nome do animal ou nome do dono
  - Criar animal (nome, idade, tipo, raça) — dono vem do usuário logado
  - Editar e excluir **apenas** animais cadastrados pelo usuário logado (botões só aparecem para os seus; backend retorna 403 para os demais)

## Stack

- Vite + React 18 + TypeScript
- TailwindCSS (mobile first)
- React Router DOM
- Zod + React Hook Form
- Axios

## Estrutura

- `src/api` — client HTTP e chamadas à API
- `src/components` — UI (Layout, ProtectedRoute, AnimalModal, Input, Select, Button)
- `src/contexts` — AuthContext (login/logout e estado do token)
- `src/lib` — schemas Zod, helpers (auth)
- `src/pages` — Cadastro, Login, Home (CRUD)
- `src/types` — tipos TypeScript
