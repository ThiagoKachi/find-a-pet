### Regras da Aplicação

- [x] - Deve ser possível cadastrar um pet.
- [x] - Deve ser possível filtrar pets por suas características.
- [x] - Deve ser possível visualizar detalhes de um pet para adoção.
- [x] - Deve ser possível se cadastrar como uma ORG.
- [x] - Deve ser possível realizar login como uma ORG.
- [x] - **Autenticação JWT** deve ser usada para acessar rotas que requerem autenticação.
- [x] - **Cache** deve ser implementado para melhorar a performance da listagem de pets e dos filtros.

### Regras de Negócio

- [x] - Uma ORG precisa ter um endereço e um número de WhatsApp.
- [x] - Um pet deve estar ligado a uma ORG.
- [x] - O usuário que quer adotar, entrará em contato com a ORG via Email.
- [x] - Todos os filtros do pet, são opcionais.
- [x] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada.
- [x] - **Roles e Permissions**: Apenas ORGs autenticadas podem cadastrar ou remover pets.
- [x] - **Cache** deve ser utilizado para armazenar dados frequentemente acessados, como listagens de pets e tokens de autenticação.

## Ferramentas

- Node > Fastify
- Postgres > Prisma ORM > Knexjs
- Autenticação > jsonwebtoken
- Cache > Redis
- Validações > Zod
- Docker
- Email > Resend
- Armazenamento > R2

## Falta fazer
