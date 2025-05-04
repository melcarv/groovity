# 🎵 Groovity

Groovity é uma aplicação frontend desenvolvida com Angular v16 que consome a API pública do Spotify. O objetivo é permitir aos usuários buscar artistas, visualizar seus álbuns e faixas, explorando o conteúdo musical de forma simples, responsiva e com foco em boas práticas de desenvolvimento.

> Projeto desenvolvido como parte de um desafio técnico de Front-end Angular para a NTT Data.

---

## ✨ Funcionalidades

- Busca de artistas
- Detalhamento do artista
- Listagem dos álbuns do artista
- Detalhamento de um álbum com capa, data e lista de faixas
- Layout responsivo e estilizado com SCSS puro

---

## 🧰 Tecnologias Utilizadas

- [Angular 16](https://angular.io/)
- [NodeJs 18.10.0](https://nodejs.org/pt)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- SCSS (sem frameworks visuais externos)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

---

## 🏗️ Arquitetura do Projeto

A aplicação foi estruturada com foco em separação de responsabilidades, escalabilidade e reutilização de componentes. Utiliza a arquitetura modular do Angular:

- `core/`: serviços centrais e interceptadores globais
- `shared/`: componentes e pipes reutilizáveis
- `features/`: módulos de páginas principais com roteamento dedicado
- `styles/`: SCSS global modularizado
- `environments/`: variáveis de ambiente por build

---

## 📁 Estrutura do projeto

```txt
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── spotify.service.ts
│   │   └── interceptors/
│   │       └── auth.interceptor.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── artist-card/
│   │   │   ├── album-card/
│   │   │   ├── pagination/
│   │   │   ├── loading-spinner/
│   │   │   ├── error-message/
│   │   │   ├── search-bar/
│   │   │   └── header/
│   │   ├── pipes/
│   │   │   └── truncate.pipe.ts
│   │   └── shared.module.ts
│   ├── features/
│   │   ├── search/
│   │   ├── artist-detail/
│   │   ├── album-detail/
│   │   ├── not-found/
│   │   └── features-routing.module.ts
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.{ts,html,scss}
│
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── styles/
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── main.scss
├── styles.scss
├── main.ts
├── index.html
```

---

## 🔐 Autenticação com a API do Spotify

Groovity utiliza o fluxo [Client Credentials Flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow) para obter um token de acesso com segurança. Para isso, um backend leve foi criado usando **Vercel** para proteger os dados sensíveis (`client_id` e `client_secret`).

---

### ⚙️ Como configurar seu próprio backend de token (caso deseje usar/forkar este projeto)

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crie um novo app e copie seu `Client ID` e `Client Secret`
3. Faça fork ou clone do repositório [spotify-token-api] (https://github.com/melcarv/spotify-token-api)
4. Vá até [Vercel](https://vercel.com)
   - Crie um novo projeto importando o repositório `spotify-token-api`
   - Durante o deploy, crie estas variáveis de ambiente:

     ```
     SPOTIFY_CLIENT_ID=seu_client_id
     SPOTIFY_CLIENT_SECRET=seu_client_secret
     ```

5. Após o deploy, Vercel fornecerá uma URL parecida com:

   ```
   https://spotify-token-api-sua-conta.vercel.app
   ```

6. Copie essa URL e utilize no `AuthService` do projeto Angular para buscar o token de forma segura.

7. Construir um "backend" foi uma forma de otimizar tempo, já que o token expira a cada 1h e precisaria ser gerado e substituido manualmente. Dessa forma, é possivel gerar e atualizar o token automaticamente.

---

## ▶️ Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/melcarv/groovity.git
cd groovity
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o endpoint do backend no arquivo de ambiente:
```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  spotifyApiBaseUrl: 'https://api.spotify.com/v1',
  spotifyTokenUrl: 'https://seu-projeto.vercel.app/api/token' // Substitua pelo seu e inclua manualmente o caminho /api/token. Ao escrever essa Url no navegador, ela deve retornar o objeto com seu token. Aí sim, estará pronto para ser usado.
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

## 🧩 Componentes Extras Implementados

- `pagination`: componente reutilizável de paginação
- `loading-spinner`: spinner para carregamento de dados
- `error-message`: exibe mensagens de erro de forma amigável
- `search-bar`: input desacoplado para reutilização
- `header` e `footer`: estrutura visual fixa e responsiva
- `not-found`: tela 404 para rotas inválidas

---

## 💡 Possíveis Melhorias Futuras

- Testes unitários com Jest
-

---

## 📜 Licença

Este projeto foi desenvolvido exclusivamente para fins avaliativos.
