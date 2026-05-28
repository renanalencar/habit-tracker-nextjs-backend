# Habit Tracker Backend

Este é o backend construído em [Next.js](https://nextjs.org) (App Router) para a aplicação móvel **Habit Tracker**. 
Ele fornece a API RESTful e o gerenciamento de dados através do [Prisma ORM](https://www.prisma.io/) com um banco de dados local SQLite.

## Pré-requisitos

- Node.js (versão 18+ recomendada)
- NPM, Yarn, pnpm ou Bun

## Como Executar Localmente

### 1. Instalação

Dentro da pasta `backend`, instale as dependências:

```bash
npm install
```

### 2. Configuração do Banco de Dados (SQLite)

Este projeto utiliza o Prisma com SQLite para armazenar as informações localmente. Para sincronizar o schema e popular o banco de dados com os dados mockados iniciais (seed), execute:

```bash
# Cria/sincroniza as tabelas no arquivo ./dev.db
npx prisma db push

# Popula o banco com os hábitos iniciais
npx prisma db seed
```

### 3. Iniciar o Servidor de Desenvolvimento

Após configurar o banco, rode o servidor:

```bash
npm run dev
```

O backend estará acessível em: [http://localhost:3000](http://localhost:3000).

## Endpoints da API

Todas as rotas estão sob o caminho base `/api/habits`.

- `GET /api/habits`
  Retorna todos os hábitos cadastrados no sistema, ordenados por data de criação.

- `POST /api/habits`
  Cria um novo hábito. O corpo da requisição (JSON) deve incluir:
  - `name` (obrigatório)
  - `frequency` (obrigatório: 'diário', 'semanal', 'mensal')
  - `description` (opcional)

- `PATCH /api/habits/:id/toggle`
  Alterna o estado de `completedToday` do hábito fornecido pelo `:id` (true -> false, ou false -> true) e ajusta a contagem do *streak* automaticamente.

- `DELETE /api/habits/:id`
  Remove o hábito correspondente ao `:id` informado.

## Conexão com o Frontend (Expo)

Por padrão, a aplicação React Native/Expo (frontend) espera se comunicar com este backend através do IP local se rodada em um dispositivo físico, ou `localhost` caso rodada emulada via Web/Simulador.
Certifique-se de iniciar o servidor backend *antes* do app Expo.

> **Nota para Android (Emuladores):** Se o frontend não conseguir alcançar o backend por meio do `localhost`, você pode utilizar `http://10.0.2.2:3000` no arquivo de configuração do cliente (`src/utils/handle-api.ts`).
> **Nota para Dispositivos Físicos:** Se usar o Expo Go no celular, use o IP da sua máquina na mesma rede Wi-Fi (ex: `http://192.168.1.15:3000/api/habits`).

## Arquitetura e Tecnologias

- **Next.js** (App Router para API Routes)
- **Prisma ORM** para comunicação e modelagem de dados
- **SQLite** para persistência simples em arquivo (`dev.db`)
- **TypeScript** para tipagem estática
