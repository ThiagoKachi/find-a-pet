### Regras da Aplicação

- [] - Deve ser possível cadastrar um pet.
- [] - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade.
- [] - Deve ser possível filtrar pets por suas características.
- [] - Deve ser possível visualizar detalhes de um pet para adoção.
- [] - Deve ser possível se cadastrar como uma ORG.
- [] - Deve ser possível realizar login como uma ORG.
- [] - **Autenticação JWT** deve ser usada para acessar rotas que requerem autenticação.
- [] - **Filas** devem ser usadas para o envio de Emails/WhatsApp quando um usuário deseja entrar em contato com uma ORG.
- [] - **Cache** deve ser implementado para melhorar a performance da listagem de pets e dos filtros.

### Regras de Negócio

- [] - Para listar os pets, obrigatoriamente precisamos informar a cidade.
- [] - Uma ORG precisa ter um endereço e um número de WhatsApp.
- [] - Um pet deve estar ligado a uma ORG.
- [] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp ou Email.
- [] - Todos os filtros, além da cidade, são opcionais.
- [] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada.
- [] - **Roles e Permissions**: Apenas ORGs autenticadas (admins) podem cadastrar ou remover pets.
- [] - **Filas** devem ser usadas para processamento assíncrono de tarefas, como envio de notificações.
- [] - **Cache** deve ser utilizado para armazenar dados frequentemente acessados, como listagens de pets e tokens de autenticação.

## Ferramentas

- Node > Fastify
- Postgres > Prisma ORM
- Autenticação > jsonwebtoken
- Filas > Bull
- Cache > Redis | NodeCache
- Validações > Zod
- Docker
- Email - Resend
- Armazenamento - S3
