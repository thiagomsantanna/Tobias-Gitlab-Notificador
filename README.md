# API de notificações no discord referente à mudanças no Boards do GitLab

Atualmente é utilizado Node.js + Express, que utiliza da API do Gitlab para o uso do gitlab via `fetch` juntamente de Webhooks do Gitlab para notificação em tempo real e um webhook nos canais desejados para envio das notificações.

<br>

Atualmente possui 3 endpoints, que realizam:

- `\gitlob\hml`: Notifica novas tarefas incluídas no boards de `9-homologation`, mostrando somente o Id da tarefa com link e seu titulo.
  - ![image](https://github.com/thiagomsantanna/apiGitLabNotifier/blob/master/assets/github/homologation.png)

<br>

- `\gitlob\merges`: Notifica novas tarefas incluídas no boards de `8-merge-request` mostrando a foto do membro que passou a tarefa para merge, junto do Id da tarefa com link e o titulo da mesma, após isso, cria um novo merge-request da source-branch da tarefa (`z-features/feature-{id_da_tarefa}`) para a Homologation
  - ![image](https://github.com/thiagomsantanna/apiGitLabNotifier/blob/master/assets/github/merge.png)

<br>

- `\gitlob\refac`: Notifica novas tarefas passadas para `3-Refactoring`, marcando todos com o cargo de `Desenvolvedor` e mostra o Id da tarefa com link para a mesma e seu título.
  - ![image](https://github.com/thiagomsantanna/apiGitLabNotifier/blob/master/assets/github/refac.png)

# DEV

Para a inclusão de uma nova automação, é necessário:
- Criação de uma nova rota para sua automação, por padrão é utilizado`\gitlob\{automação}`
- Inserção de um webhook com os eventos necessários para a url dessa rota

<br>

- Para execução em localhost para o desenvolvimento de novas automações é necessário possuir um repositório que possa ser alterado sem medo para testes, juntamente de um servidor para o mesmo fim e colocar no arquivo `.env.dev` suas informações:
  - É necessário que tenha as variáveis:
    - `PROJECTID`= Id do projeto de teste
    - `TOKENGITLAB`= token para utilização do [gitlab via API](https://docs.gitlab.com/ee/api/api_resources.html)
    - `DEV_ROLE`= Id de um cargo   
    - `WEBHOOK`= Webhook URL para o canal de notificações gerais
    - `WEBHOOK_MERGE`= Webhook URL para o canal de notificações de merge-requests

Para a execução da API utilize do comando `npm run dev` para utilizar das variáveis de ambiente de desenvolvimento e não interferir no uso em outros servidores ou projetos.
  - `npm run dev`: roda `cross-env ENV=dev node .`

Para o recebimento de webhooks e debug das informações, utilizo o [ngrok](https://ngrok.com/) para "tunelarmos" a instância localhost aos envios de Webhooks do Gitlab
  - Para a execução basta executar o .exe na raiz da pasta e utilizar `ngrok http {sua porta localhost, Ex: 3000}`
    - ![image](https://github.com/thiagomsantanna/apiGitLabNotifier/blob/master/assets/github/ngrok.png)
  - Feito isso, adicione o domínio para o uso que o ngrok dará nos Webhooks de seu projeto de teste e estará livre para desenvolver!
   - ![image](https://github.com/thiagomsantanna/apiGitLabNotifier/blob/master/assets/github/gitlab_webhooks.png)
