# Cadastro Nacional de Presbíteros

Sistema de cadastro e consulta de presbíteros católicos do Brasil, incluindo padres, bispos e diáconos.

## Páginas do Sistema

1. **Login** (`/login`)
   - Acesso administrativo
   - Autenticação segura
   - Credenciais de administrador:
     - Email: guthierresc@hotmail.com
     - Senha: Gutim@2025

2. **Página Inicial** (`/`)
   - Busca em tempo real por nome ou diocese
   - Visualização de estatísticas gerais
   - Cards interativos com informações básicas
   - Design responsivo e moderno
   - Resultados dinâmicos conforme digitação

3. **Cadastro** (`/register`)
   - Formulário completo com validações
   - Upload de documentos (ordenação e identidade)
   - Upload de foto de perfil
   - Informações pessoais e eclesiásticas
   - Redes sociais e contatos

4. **Perfil** (`/profile/:id`)
   - Visualização detalhada das informações
   - Foto de perfil
   - Histórico eclesiástico
   - Contatos e redes sociais
   - Documentos verificados

5. **Painel Administrativo** (`/admin`)
   - Dashboard com estatísticas
   - Gerenciamento de cadastros
   - Visualização de dados em gráficos
   - Aprovação/rejeição de novos cadastros
   - Edição de cadastros existentes
   - Exclusão de registros
   - Filtros e busca avançada
   - Visualização detalhada de documentos

## Funcionalidades

### Página Inicial
- Busca em tempo real
- Visualização de estatísticas
- Cards interativos
- Design responsivo

### Cadastro de Presbíteros
- Validações em tempo real
- Upload de documentos
- Foto de perfil
- Dados pessoais e eclesiásticos
- Redes sociais

### Perfil do Presbítero
- Informações detalhadas
- Histórico
- Contatos
- Documentos

### Painel Administrativo
- Estatísticas em tempo real
- Gráficos interativos
- Gerenciamento completo
- Notificações
- Confirmações de ações
- Interface responsiva
- Múltiplas visualizações
- Exportação de dados

## Tecnologias Utilizadas

- Angular 17
- Supabase (Banco de dados e autenticação)
- PrimeNG (Componentes UI)
- Tailwind CSS (Estilização)
- TypeScript
- RxJS

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── admin/
│   │   ├── profile/
│   │   ├── register/
│   │   └── search/
│   ├── models/
│   │   └── clergy.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── clergy.service.ts
│   └── app.module.ts
├── assets/
└── environments/
```

## Segurança

- Autenticação via Supabase
- Row Level Security (RLS)
- Validação de documentos
- Proteção de rotas
- Controle de acesso granular
- Confirmação de ações críticas
- Logs de atividades
- Backup automático

## Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` com as credenciais do Supabase
4. Execute o projeto:
   ```bash
   npm start
   ```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Suporte

Para suporte, envie um email para guthierresc@hotmail.com