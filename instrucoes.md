# Supranet | Avaliação técnica – Desenvolvedor(a) Frontend (Nuxt 4 + TypeScript + Bun)


## Instruções
* Faça um fork deste repositório ou clone-o. Fica a seu critério. 

* Não esperamos que seja uma tarefa perfeita, mas quanto mais polido o resultado, melhor será a avaliação. 

* Este projeto tem como objetivo fornecer um caso de uso real, que não seja um repositório sem aplicação prática como como "lista de tarefas" ou "calendário simples". 

## Visão Geral

Você deverá desenvolver uma aplicação real, utilizando Nuxt 4, TypeScript e rodando com Bun.\
A aplicação deve ser executável via Docker, pois a avaliação será feita exclusivamente através de uma imagem construída a partir de um Dockerfile que você irá fornecer.

O projeto será um gerador de QR Codes consumindo a API pública do [goQR.me](http://goQR.me).

Este desafio tem como objetivo avaliar:

* Qualidade do código (organização, legibilidade, tipagem, padrões)

* Arquitetura da aplicação

* Capacidade de trabalhar com Nuxt 4 e TypeScript

* Capacidade de configurar e utilizar Bun

* Conhecimento de Docker (produção de uma imagem funcional e reprodutível)

* Tratamento de erros, UX e atenção a detalhes

* Integração com uma API externa

## Descrição da Aplicação – "QR Code Studio"

Você deverá construir uma aplicação chamada "QR Code Studio", que permita ao usuário gerar QR Codes personalizados a partir de textos/URLs e fazer o download da imagem gerada.

## Funcionalidades Obrigatórias

### Tela principal de geração de QR Code

* Campo de entrada de texto para o conteúdo do QR Code (URL, texto livre, etc.).

* Botão para gerar o QR Code.

* Exibir o QR Code retornado pela API em forma de imagem.

* Mostrar mensagem de erro amigável em caso de falhas na geração (ex.: problemas de rede, parâmetro inválido, etc.).

### Configurações do QR Code

Permitir ao usuário configurar pelo menos:

* Tamanho (largura/altura em pixels – por exemplo: 150, 300, 500…)

* Cor de primeiro plano (a cor do QR) – pode ser via input de cor (color input) ou combo com algumas opções predefinidas.

* Formato da imagem (por exemplo: PNG, SVG, JPEG) – limitado ao que a API suportar.

Essas opções devem ser usadas para montar a chamada à API do [goQR.me](http://goQR.me).

**Documentação da API:** [https://goqr.me/api/](https://goqr.me/api/)

### Histórico recente de QR Codes

Manter um histórico dos últimos QR Codes gerados (por exemplo, os últimos 5 ou 10).

Cada item do histórico deve mostrar:

* Miniatura da imagem do QR Code

* Conteúdo (texto/URL)

* Principais configurações (tamanho, formato)

Permitir que o usuário clique em um item do histórico para:

* Recarregar aquelas configurações/conteúdo no formulário, ou

* Reexibir a imagem em destaque.

### Download do QR Code

Fornecer uma forma de o usuário baixar o QR Code gerado como arquivo de imagem.

Pode ser:

* Um botão "Baixar" que faz download direto da imagem exibida, ou

* Link nativo para a URL da imagem com download, se aplicável.

### Persistência simples de estado

* O histórico de QR Codes deve ser persistido entre recargas de página (ex.: via localStorage).

* Ao fechar e abrir o navegador, o histórico ainda deve estar disponível.

### Integração com a API do [goQR.me](http://goQR.me)

Você deve utilizar a API do [goQR.me](http://goQR.me) para gerar os QR Codes.

**Documentação:** [https://goqr.me/api/](https://goqr.me/api/)

É esperado que você:

* Monte a URL da API usando os parâmetros adequados (texto, tamanho, formato, cores, etc.).

* Trate respostas com erro (status não 200, parâmetros inválidos).

* Não "hardcode" a imagem; ela deve sempre vir da API com base nas opções escolhidas pelo usuário.

Você pode optar por:

* Consumir a API diretamente do frontend, ou

* Criar um endpoint intermediário em `server/api` no Nuxt para servir de proxy (por exemplo, para controle de CORS, validação extra, etc.).

## Requisitos Técnicos

### Stack Obrigatória

* Nuxt 4

* TypeScript (tipagem forte, evitar any desnecessários)

* Bun como runtime (para desenvolvimento e/ou produção)

* App rodando em Docker via Dockerfile fornecido por você

### Organização do Código

Utilizar componentização adequada:

* Ex.: componente para o formulário de geração

* Componente para visualização da imagem

* Componente para o histórico

Utilizar composables e/ou stores (Pinia) para:

* Gerenciar estado do histórico de QR Codes

* (Opcional) Gerenciar preferências padrão do usuário (tamanho padrão, formato padrão, etc.)

Utilizar tipos TypeScript explícitos:

* Tipos para item de histórico

* Tipos para as configurações do QR Code

Separar lógica de negócio da camada de apresentação sempre que possível.

### Páginas (sugestão de rotas)

* `/` – Página principal com:

  * Formulário de geração

  * Preview do QR Code

  * Histórico

Você pode adicionar outras rotas (ex.: `/sobre`, `/ajuda`) se desejar, mas não é obrigatório.

## Requisitos de Qualidade

### Boas Práticas de Código

* Código limpo, coeso e legível

* Nomeação clara de variáveis, funções e componentes

* Uso consistente de TypeScript

* Tratamento de erros em chamadas HTTP / fetch à API do [goQR.me](http://goQR.me)

* Separação de responsabilidades (não concentrar tudo em um único arquivo)

### UI/UX

Não exigimos um design sofisticado, mas esperamos:

* Layout minimamente organizado

* Responsividade básica (pelo menos legível em telas menores)

* Feedback ao usuário em ações importantes:

  * Ao gerar um QR Code (estado de carregamento se necessário)

  * Ao ocorrer erro

  * Ao salvar no histórico ou ao carregar algo do histórico

## Requisitos de Docker e Execução

A avaliação será feita exclusivamente via Docker.

Portanto, é obrigatório fornecer:

### Dockerfile funcional

A imagem deve:

* Instalar dependências com Bun

* Buildar o projeto

* Rodar o servidor em modo produção

* O container deve expor uma porta HTTP pela qual a aplicação possa ser acessada (por exemplo, 3000).

### Como iremos rodar

Assuma que iremos executar os comandos abaixo na raiz do projeto:

```bash
# build da imagem
docker build -t qr-code-studio .

# execução
docker run -p 3000:3000 qr-code-studio
```

Após isso, esperamos acessar a aplicação em:\
`http://localhost:3000`

Se for necessário algum comando específico, ele deve estar documentado no [README.md](http://README.md).

## Entrega

### O que deve ser enviado

* Código fonte completo da aplicação

* Dockerfile funcional na raiz do projeto

* Um arquivo [README.md](http://README.md) contendo, no mínimo:

  * Passos para:

    * Clonar/baixar o projeto

    * Buildar a imagem Docker

    * Rodar o container

  * Informações sobre:

    * Porta em que a aplicação sobe

    * Qualquer variável de ambiente necessária (com valores padrão, se possível)

  * Breve explicação da arquitetura e das decisões técnicas mais relevantes

  * Breve explicação de como a integração com a API do [goQR.me](http://goQR.me) foi feita

### Forma de Entrega

* Repositório Git (GitHub, GitLab, etc.) ou arquivo compactado (.zip)

* Garantir que o repositório/arquivo contenha tudo o que é necessário para buildar e rodar o projeto apenas com:

  * Docker

  * Conexão com a internet (para acessar a API do [goQR.me](http://goQR.me))

## Critérios de Avaliação

Avaliaremos principalmente:

### Funcionalidade

* Todos os requisitos obrigatórios foram implementados?

* A aplicação gera QR Codes corretamente com base nas configurações?

* O histórico funciona e é persistido?

### Qualidade do Código

* Organização dos arquivos e pastas

* Qualidade da tipagem TypeScript

* Clareza e legibilidade

### Arquitetura

* Uso adequado de recursos do Nuxt 4 (páginas, layouts, composables, server routes, etc.)

* Separação de camadas (dados, apresentação, estado)

* Integração limpa com a API externa

### Docker / Deploy Local

* Build do Docker funciona sem ajustes manuais adicionais

* Aplicação sobe corretamente a partir da imagem gerada

### Experiência do Usuário

* Navegação e fluxo simples e intuitivo

* Mensagens de erro adequadas

* Feedback visual mínimo nas principais ações

### Diferenciais

* Uso de boas práticas de performance básicas (lazy loading, otimização simples de assets, etc.)

* Uso de um endpoint proxy em `server/api` para encapsular o acesso à API externa (quando fizer sentido)

## Prazo

O prazo para entrega será informado separadamente.

Caso não consiga implementar algo, documente claramente no [README.md](http://README.md) o que ficou faltando e como você teria implementado se tivesse mais tempo.

## Observações Finais

Você é livre para adicionar funcionalidades extras:

* Templates prontos (por exemplo: "Wi-Fi", "Contato", "URL", "Texto livre" com placeholders)

* Tema claro/escuro

* Compartilhamento de links para QR Codes específicos

**Lembre-se:** o foco é demonstrar como você estrutura e desenvolve uma aplicação real com Nuxt 4 + TypeScript + Bun, integrando uma API externa ([goQR.me](http://goQR.me)) e entregando algo que rode facilmente via Docker.