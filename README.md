# 🔐 Sistema de Autenticação com JWT - Frontend

Um sistema completo de autenticação desenvolvido em React com TypeScript, consumindo APIs REST com autenticação JWT. Este projeto demonstra as melhores práticas de desenvolvimento frontend moderno com foco em segurança, UX e performance.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estratégias e Metodologias](#estratégias-e-metodologias)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [API Backend](#api-backend)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Este é o frontend de um sistema de autenticação completo que consome APIs REST desenvolvidas em Express.js com autenticação JWT. O projeto foi desenvolvido com foco em:

- **Segurança**: Implementação robusta de autenticação JWT
- **UX/UI**: Interface moderna e responsiva com design system consistente
- **Performance**: Otimizações com Vite e React 19
- **Manutenibilidade**: Código limpo e bem estruturado com TypeScript
- **Escalabilidade**: Arquitetura modular e reutilizável

## ✨ Funcionalidades

### 🔐 Autenticação

- **Login**: Autenticação com email e senha
- **Registro**: Cadastro de novos usuários com validação robusta
- **JWT**: Gerenciamento automático de tokens de acesso e refresh
- **Proteção de Rotas**: Middleware de autenticação para páginas protegidas
- **Logout**: Desconexão segura com limpeza de tokens

### 👤 Gerenciamento de Usuário

- **Perfil**: Visualização de dados do usuário autenticado
- **Validação**: Formulários com validação em tempo real
- **Feedback**: Notificações toast para ações do usuário
- **Loading States**: Estados de carregamento para melhor UX

### 🎨 Interface

- **Design System**: Componentes reutilizáveis com Radix UI
- **Tema Escuro**: Interface moderna com tema dark
- **Responsivo**: Layout adaptável para diferentes dispositivos
- **Acessibilidade**: Componentes acessíveis seguindo padrões WCAG

## 🛠️ Tecnologias Utilizadas

### Core Framework

- **React 19**: Biblioteca JavaScript para interfaces de usuário
- **TypeScript 5.7**: Superset JavaScript com tipagem estática
- **Vite 6.2**: Build tool moderno e rápido

### Roteamento e Navegação

- **React Router 7.6**: Roteamento declarativo para React

### UI/UX e Design System

- **Tailwind CSS 4.1**: Framework CSS utility-first
- **Radix UI**: Componentes primitivos acessíveis
  - `@radix-ui/react-label`
  - `@radix-ui/react-progress`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-tooltip`
  - `@radix-ui/react-icons`
- **Lucide React**: Biblioteca de ícones modernos
- **Class Variance Authority**: Sistema de variantes para componentes
- **CLSX**: Utilitário para classes CSS condicionais
- **Tailwind Merge**: Merge inteligente de classes Tailwind

### Formulários e Validação

- **React Hook Form 7.60**: Biblioteca para formulários performática
- **Zod 4.0**: Validação de esquemas TypeScript-first
- **@hookform/resolvers**: Integração entre React Hook Form e Zod

### Comunicação com API

- **Axios 1.8**: Cliente HTTP para requisições à API

### Notificações e Feedback

- **Sonner 2.0**: Sistema de notificações toast moderno

### Desenvolvimento e Qualidade

- **ESLint 9.21**: Linter para JavaScript/TypeScript
- **TypeScript ESLint**: Regras específicas para TypeScript
- **React Hooks ESLint**: Regras para hooks do React

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   └── register.tsx    # Componente de registro
├── pages/              # Páginas da aplicação
│   ├── homepage/       # Página inicial
│   ├── login/          # Página de login
│   ├── signin/         # Página de registro
│   ├── profile/        # Página de perfil
│   └── components/     # Componentes específicos de páginas
│       ├── loading/    # Componentes de loading
│       └── not_found/  # Página 404
├── services/           # Serviços e configurações
│   └── api.ts         # Configuração do Axios
├── lib/               # Utilitários e helpers
│   └── utils.ts       # Funções utilitárias
└── assets/            # Recursos estáticos
```

### Padrões de Desenvolvimento

#### 1. **Component-Based Architecture**

- Componentes modulares e reutilizáveis
- Separação clara de responsabilidades
- Props tipadas com TypeScript

#### 2. **Custom Hooks Pattern**

- Lógica de negócio reutilizável
- Separação de concerns
- Facilita testes e manutenção

#### 3. **Service Layer Pattern**

- Centralização de chamadas à API
- Configuração única do Axios
- Interceptors para tokens JWT

#### 4. **Form Validation Pattern**

- Validação em tempo real
- Schemas Zod para type safety
- Feedback visual imediato

## 🎯 Estratégias e Metodologias

### 1. **TypeScript-First Development**

- Tipagem estática desde o início
- Interfaces bem definidas
- Type safety em toda a aplicação

### 2. **Modern React Patterns**

- Functional Components com Hooks
- React 19 com melhorias de performance
- Strict Mode para detecção de problemas

### 3. **Security-First Approach**

- Validação robusta de formulários
- Sanitização de dados
- Gerenciamento seguro de tokens JWT

### 4. **Performance Optimization**

- Lazy loading de componentes
- Otimizações do Vite
- Bundle splitting automático

### 5. **Accessibility (A11y)**

- Componentes Radix UI acessíveis
- Navegação por teclado
- Screen reader friendly

### 6. **Responsive Design**

- Mobile-first approach
- Breakpoints consistentes
- Flexbox e Grid layouts

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Passos para Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/matheusscarvalho1/form-login-consuming-api-jwt-express.git
cd form-login-consuming-api-jwt-express
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

4. **Execute o projeto**

```bash
npm run dev
```

5. **Acesse a aplicação**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 📁 Estrutura de Arquivos Detalhada

### Componentes UI (`src/components/ui/`)

- **button.tsx**: Botões com variantes e estados
- **card.tsx**: Cards para layout de conteúdo
- **form.tsx**: Componentes de formulário
- **input.tsx**: Campos de entrada
- **label.tsx**: Labels acessíveis
- **progress.tsx**: Indicadores de progresso
- **sonner.tsx**: Configuração do sistema de notificações
- **tooltip.tsx**: Tooltips informativos

### Páginas (`src/pages/`)

- **homepage/home.tsx**: Página inicial com navegação
- **login/log-in.tsx**: Formulário de login com validação
- **signin/sign-in.tsx**: Formulário de registro
- **profile/profile.tsx**: Perfil do usuário autenticado

### Serviços (`src/services/`)

- **api.ts**: Configuração do cliente Axios com interceptors

## 🔗 API Backend

Este frontend consome as APIs do projeto backend:
**[api-jwt-express](https://github.com/matheusscarvalho1/api-jwt-express)**

### Endpoints Utilizados

- `POST /authenticate/user` - Autenticação de usuário
- `POST /user/create` - Criação de novo usuário
- `GET /user/get/profile` - Obtenção do perfil do usuário

### Autenticação JWT

- **Access Token**: Token de curta duração para requisições
- **Refresh Token**: Token de longa duração para renovação
- **Bearer Token**: Enviado no header Authorization

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
