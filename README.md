# Qual a Sua Senha

Sistema de login e registro com validação de campos.

## Tecnologias

- HTML, CSS e JavaScript (Frontend)
- Node.js com Express (Backend)

## Funcionalidades

- Página de registro com validação de múltiplas regras
- Página de login com autenticação JWT
- Dashboard protegido por autenticação
- Validação no backend
- Sistema de tokens para sessão

## Como usar

1. Instalar dependências do backend:
```bash
cd back
npm install
```

2. Iniciar o servidor:
```bash
npm start
```

3. Abrir o arquivo `front/index.html` no navegador

## Estrutura

```
/front
  - index.html - Página de login
  - register.html - Página de cadastro
  - dashboard.html - Página protegida (após login)
  - style.css - Estilos
  - login.js - Lógica do login
  - register.js - Lógica do cadastro
  - dashboard.js - Lógica do dashboard

/back
  - server.js - Servidor Node.js com JWT
  - package.json - Dependências
```