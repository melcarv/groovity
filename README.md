# 🎵 Groovity

Groovity é uma aplicação frontend desenvolvida com Angular v16 que consome a API pública do Spotify. O objetivo da aplicação é proporcionar uma navegação fluida e responsiva pela base musical do Spotify, permitindo que usuários explorem artistas, seus álbuns e faixas, com visual moderno e código limpo.

> Projeto desenvolvido como parte de um desafio técnico.

---

## Funcionalidades

- Busca de artistas
- Visualização de detalhes do artista
- Visualização dos álbuns do artista
- Detalhes de um álbum: capa, data de lançamento, lista de faixas

---

## Possiveis melhorias

- Cache de token e renovação automática
- Tela de loading entre rotas
- Testes unitários com Jest

## Tecnologias Utilizadas

- [Angular 16](https://angular.io/)
- [NodeJs 18.10.0](https://nodejs.org/pt)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- SCSS (sem uso de frameworks)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

---

## Arquitetura do Projeto

A estrutura do projeto foi intencionalmente modularizada para refletir boas práticas de arquitetura escalável, mesmo sendo uma aplicação pequena. Também uma separação clara de responsabilidades:

src/
├── app/
│   ├── core/                  # Serviços e interceptadores globais
│   │   ├── services/
│   │   └── interceptors/
│   ├── shared/                # Componentes e pipes reutilizáveis
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
│   │   └── shared.module.ts
│   ├── features/              # Funcionalidades principais
│   │   ├── search/
│   │   ├── artist-detail/
│   │   ├── album-detail/
│   │   ├── not-found/
│   │   └── features-routing.module.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/                    # Imagens e arquivos estáticos
│
├── environments/              # Variáveis de ambiente
│
├── styles/                    # Estilização global em SCSS
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── main.scss
│
├── index.html
├── main.ts
├── styles.scss                # Importa styles/main.scss

---

## Decisões de Arquitetura

### 1. **Modularização**
Cada funcionalidade principal está contida em um módulo próprio dentro de `features/`, facilitando a escalabilidade e o lazy loading se necessário.

### 2. **Serviços Centralizados**
O `SpotifyService` encapsula as chamadas à API. O `AuthService` gerencia o `access_token` obtido via Client Credentials Flow.

### 3. **Interceptor de Requisições**
Um `HttpInterceptor` adiciona automaticamente o token de acesso às chamadas HTTP, mantendo o código nos serviços mais limpo.

### 4. **Responsividade e Layout**
O layout foi construído com SCSS puro, utilizando flexbox e grid para garantir uma boa usabilidade em diferentes resoluções, com foco na clareza e estética.

### 5. **Boas práticas**
- Uso de `async pipe` em templates
- Tipagem explícita com interfaces
- Organização por responsabilidades
- Separação entre lógica de negócios (services) e apresentação (components)

---

## ⚙️ Instalação e Execução

Clone o repositório:

git clone https://github.com/melcarv/groovity.git
cd groovity

Instale as dependências:

npm install

Configure seu token temporário no arquivo:

src/environments/environment.ts

Exemplo:

export const environment = {
  production: false,
  spotifyApiBaseUrl: 'https://api.spotify.com/v1',
  accessToken: 'SEU_TOKEN_AQUI'
};

⚠️ Nunca versionar o token real nem o Client Secret no GitHub!

Inicie o projeto:

ng serve

Acesse:

http://localhost:4200

---

### Autenticação com Spotify

Este projeto utiliza o [Client Credentials Flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow) para autenticação.

### Como gerar o token:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Crie um novo app e copie seu `Client ID` e `Client Secret`
3. Use este comando para obter um token:
```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Authorization: Basic BASE64(client_id:client_secret)" \
     -d grant_type=client_credentials
