# Finper 📈

Gestão pessoal de ativos

Projeto para por em prática padrões e técnicas de desenvolvimento e criar uma aplicação para gerenciar investimentos pessoais.

## Objetivo da aplicação 🎯

A aplicação deve permitir o cadastro de ativos de renda variável manualmente, a consulta de preços, a totalização do patrimônio e o acompanhamento mensal da variação do patrimônio.

## Projeto 📋

Este projeto é desenvolvimento em NodeJS versão 18.x ou superior com TypeScript versão 5.x ou superior.

No diretório root existe um diretório `projects` com o objetivo de conter os _workspaces_ do projeto. Cada _workspace_ corresponde a uma macro divisão do projeto e possui suas dependências independentes entre si.

### Variáveis de ambiente

| Nome       | Descrição            | Obrigatório | Padrão        |
| ---------- | -------------------- | :---------: | ------------- |
| `NODE_ENV` | Ambiente de execução |             | `development` |

### Comandos

| Comando             | Descrição                                                  |
| ------------------- | ---------------------------------------------------------- |
| `yarn backend ...`  | Alias para executar comandos dentro do workspace back-end  |
| `yarn frontend ...` | Alias para executar comandos dentro do workspace front-end |

## Links úteis 🔗

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
