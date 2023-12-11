# EOS Teste - Frontend

Frontend do Teste da EOS

## Instruções

Você pode utilizar a url enviada via email para testar o projeto publicado. E para rodar em localhost, siga as instruções abaixo

- Clone o reporitório
- No terminal, rode ``npm install`` e depois ``npm run dev``
- Na raiz do projeto, crie um arquivo ``.env.development`` com as seguintes variáveis de ambiente:
- ``NODE_ENV=development``
- ``NEXT_PUBLIC_API_VERSION=v1``
- ``NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/v1``
- No seu browser preferido, abra http://localhost:3000

A variável de ambiente ``http://localhost:3000:3333`` é a url do backend. Configure o setup dele primeiro para a o projeto rodar por completo

## Descrição das Libs/Framework
- Next.js versão 13 com TypeScript versão 5
- ESLint com Prettier
- Lucide React como biblioteca de ícones
- Next Themes para preferência de cores
- Dayjs para lidar com datas

Para ver o envio de emails funcionando, acesse o Mailtrap com essas credenciais:

- Email: ivanbjunior.93+eos@gmail.com
- Senha: EOS@6QvMfyNvy2
- Link de acesso: [https://mailtrap.io/signin](https://mailtrap.io/signin)

### Requisitos Funcionais
- O usuário deve poder fazer o login
- O usuário deve poder ver/criar/alterar o seu perfil
- O usuário deve poder ver/criar/alterar/excluir um post
- O usuário deve poder ver/criar/alterar/excluir um comentário em um post
- O usuário deve poder dar like ou dislike nos posts

### Regras
- Somente o usuário admin pode ver ou excluir os outros perfis que não seja o dele mesmo (regra criada somente demonstração de verificação de permissões)
- Apenas o proprietário do post pode editar ou excluir o post
- Apenas o proprietário do comentário pode editar um comentário
- Apenas o proprietário do post e o dono do comentário podem excluir um comentário
- Apenas o proprietário do comentário pode editar o comentário
