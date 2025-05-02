# 🎵 Groovity

Groovity é uma aplicação frontend desenvolvida com Angular v16 que consome a API pública do Spotify. O objetivo é permitir aos usuários buscar artistas, visualizar seus álbuns e faixas, explorando o conteúdo musical de forma simples, responsiva e com foco em boas práticas de desenvolvimento.

> Projeto desenvolvido como parte de um desafio técnico de Front-end Angular para a NTT Data.

---

## Funcionalidades

- Busca de artistas
- Detalhamento do artista
- Listagem dos álbuns do artista
- Detalhamento de um álbum com capa, data e lista de faixas
- Layout responsivo e estilizado com SCSS puro

---

## Tecnologias Utilizadas

- [Angular 16](https://angular.io/)
- [NodeJs 18.10.0](https://nodejs.org/pt)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- SCSS (sem frameworks visuais externos)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

---

## Arquitetura do Projeto

A aplicação foi estruturada com foco em separação de responsabilidades, escalabilidade e reutilização de componentes. Utiliza a arquitetura modular do Angular:

- `core/`: serviços centrais e interceptadores globais
- `shared/`: componentes e pipes reutilizáveis
- `features/`: módulos de páginas principais com roteamento dedicado
- `styles/`: SCSS global modularizado
- `environments/`: variáveis de ambiente por build

---

## Estrutura do projeto

```txt
src/
├── app/
│   ├── core/                         # Serviços e interceptadores globais
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── spotify.service.ts
│   │   └── interceptors/
│   │       └── auth.interceptor.ts
│   ├── shared/                       # Componentes reutilizáveis e pipes
│   │   ├── components/
│   │   │   ├── artist-card/
│   │   │   ├── album-card/
│   │   │   ├── pagination/
│   │   │   ├── loading-spinner/
│   │   │   ├── error-message/
│   │   │   ├── search-bar/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── pipes/
│   │   │   └── truncate.pipe.ts
│   │   └── shared.module.ts
│   ├── features/                    # Páginas principais da aplicação
│   │   ├── search/
│   │   ├── artist-detail/
│   │   ├── album-detail/
│   │   ├── not-found/
│   │   └── features-routing.module.ts
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.{ts,html,scss}
│
├── assets/                          # Arquivos estáticos
├── environments/                    # Variáveis de ambiente
│   ├── environment.ts
│   └── environment.prod.ts
├── styles/                          # SCSS global modular
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── main.scss
├── styles.scss                      # Importa main.scss
├── main.ts
├── index.html
```

---

## Autenticação com o Spotify

O projeto utiliza o [Client Credentials Flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow) da Spotify API.

### Obtenção do token:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Crie um app e copie seu `Client ID` e `Client Secret`
3. Gere um token com:

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Authorization: Basic BASE64(client_id:client_secret)" \
     -d grant_type=client_credentials
```

> ⚠️ **O token pode ser inserido temporariamente em `environment.ts` para testes, mas o segredo nunca deve ser exposto no repositório.**

---

## Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/melcarv/groovity.git
cd groovity
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o token manualmente (temporário) em:
```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  spotifyApiBaseUrl: 'https://api.spotify.com/v1',
  accessToken: 'SEU_ACCESS_TOKEN_AQUI'
};
```

4. Rode o projeto:
```bash
ng serve
```

5. Acesse no navegador:
```
http://localhost:4200
```

---

## Componentes Extras Implementados

- `pagination`: componente reutilizável de paginação
- `loading-spinner`: spinner para carregamento de dados
- `error-message`: exibe mensagens de erro de forma amigável
- `search-bar`: input desacoplado para reutilização
- `header` e `footer`: estrutura visual fixa e responsiva
- `not-found`: tela 404 para rotas inválidas

---

## Possíveis Melhorias Futuras

- Armazenamento local seguro do token e renovação automática
- Testes unitários com Jest
- Filtro e ordenação de álbuns ou faixas

---

## Licença

Este projeto foi desenvolvido exclusivamente para fins avaliativos.
