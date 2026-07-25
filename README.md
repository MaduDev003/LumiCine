<div align="center">
  <img src="./public/logo.png" alt="LumiCine" width="80" />

  <p>
    <strong>LumiCine</strong>
  </p>

  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-7A4E2D?style=flat-square" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white" />
</div>

<div align="center">
  <a href="https://lumi-cine-tau.vercel.app/">
    Acesse a aplicação online
  </a>

  <br>

  <sub>
    O link abrirá a aplicação nesta mesma aba. Recomendo ler o README antes de acessar o deploy.
  </sub>
</div>


## Sessões
- [🎬 O que é o LumiCine](#-o-que-é-o-lumicine)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura](#️-arquitetura)
- [🎨 Design System e UI/UX](#-design-system-e-uiux)
- [⚙️ Decisões Técnicas](#️-decisões-técnicas)
- [🚀 Melhorias futuras](#-melhorias-futuras)
- [💻 Como executar](#-como-executar)
- [©️ Créditos](#️-créditos)



## 🎬 O que é o LumiCine

O **LumiCine** é uma aplicação que simula a experiência de compra de ingressos em um site de cinema, reproduzindo todo o fluxo do usuário, desde a descoberta de um filme até a conclusão da compra.

O fluxo da aplicação é composto pelas seguintes etapas:

- **Página Inicial:** exibe os filmes disponíveis e permite pesquisar títulos por meio da barra de pesquisa.

- **Detalhes do Filme:** apresenta informações como sinopse, elenco, classificação indicativa e outros detalhes. Caso o filme esteja disponível para compra, o usuário pode iniciar o processo de checkout.

- **Escolha da Sessão:** permite selecionar a data, o idioma, a quantidade e o tipo de ingressos desejados.

- **Seleção de Assentos:** possibilita escolher os assentos de acordo com a quantidade e a categoria dos ingressos adquiridos.

- **LumiBar:** representa a bomboniere da aplicação, onde o usuário pode adicionar alimentos e bebidas ao pedido. Essa etapa é opcional e pode ser ignorada caso não haja interesse na compra de produtos.

- **Pagamento:** responsável pela finalização da compra dos ingressos.

- **Meus Ingressos:** após a confirmação do pagamento, os ingressos são gerados em formato de ticket digital e ficam disponíveis para consulta na seção **Meus Ingressos**, localizada no menu da aplicação.

Além do fluxo de compra de ingressos, o LumiCine também disponibiliza o **LumiBar** como uma funcionalidade independente para usuários que desejam adquirir apenas produtos da bomboniere, sem a necessidade de realizar a compra de ingressos.



## ✨ Funcionalidades

A aplicação implementa um fluxo completo de compra de ingressos de cinema, contemplando diferentes cenários e validações para proporcionar uma experiência próxima à de uma plataforma real.

- Catálogo de filmes em cartaz com pesquisa por nome e página de detalhes contendo informações como sinopse, elenco, classificação indicativa e duração.

- Fluxo de checkout dividido em etapas, incluindo seleção de sessão, escolha de assentos, LumiBar, pagamento e conclusão da compra.

- Sistema de seleção de assentos com suporte a:
  - quantidade de assentos compatível com os ingressos adquiridos;
  - assentos convencionais, acessíveis e para acompanhantes;
  - validações para impedir seleções inválidas durante o processo de compra.

- LumiBar disponível tanto como etapa opcional do checkout quanto como funcionalidade independente para compra de alimentos e bebidas.

- Gerenciamento de estado utilizando **Zustand**, com stores organizadas por responsabilidade:
  - **CheckoutStore:** responsável por centralizar o estado do fluxo de checkout, armazenando informações como sessão, quantidade e tipo de ingressos, assentos selecionados, produtos do LumiBar e cálculo automático do valor total da compra.
  - **PurchasedProductsStore:** responsável por armazenar o estado pós-compra, persistindo os ingressos adquiridos para consulta na seção **Meus Ingressos**.

- Simulação de pagamento com as opções de débito e crédito, utilizando a biblioteca **react-19-credit-card** para a interface do cartão.

- Conclusão do checkout com geração de ticket digital.

- Validação de formulários utilizando React Hook Form e Zod.

- Utilização da **Context API** para gerenciamento compartilhado dos filmes e da busca por título, possibilitando o acesso às informações em diferentes telas da aplicação sem a necessidade de prop drilling.

- Interface responsiva para diferentes tamanhos de tela.


## 🏗️ Arquitetura

A arquitetura do LumiCine foi organizada com foco em separação de responsabilidades, reutilização de código e facilidade de manutenção. Cada camada possui uma responsabilidade específica, permitindo que interface, regras de negócio e gerenciamento de estado permaneçam desacoplados.

### App Router

A navegação da aplicação utiliza o **App Router** do Next.js, onde cada etapa do fluxo de compra é representada por uma rota independente.

Exemplos:

- `/` → Página inicial.
- `/movie/[id]` → Detalhes do filme.
- `/checkout/session` → Seleção da sessão.
- `/checkout/seats` → Seleção de assentos.
- `/checkout/lumibar` → Compra de alimentos e bebidas.
- `/checkout/payment` → Pagamento.
- `/checkout/concluded` → Conclusão da compra.
- `/meus-ingressos` → Consulta dos tickets adquiridos.
- `/lumibar` → Compra independente de produtos do lumibar.

### Components

Os componentes foram desenvolvidos com foco em reutilização e composição da interface.

Exemplos:

- Cards de filmes.
- Cards de produtos do lumibar.
- Seletores de assentos.
- Componentes de pagamento.
- Modais.
- Componentes compartilhados do layout.

### Features

A pasta **features** agrupa componentes relacionados ao mesmo domínio da aplicação, mantendo arquivos próximos de suas respectivas funcionalidades.

Exemplos:

- **checkout:** componentes responsáveis pelas etapas do fluxo de compra.
- **movie:** componentes relacionados à exibição e detalhes dos filmes.

O **lumibar** não está dentro de features pois é utilizado em diferentes contextos da aplicação. Por ser compartilhado entre o checkout e uma página independente, foi organizado como componente global.

### Hooks

Os hooks personalizados encapsulam comportamentos reutilizáveis.

Um exemplo é o `useDateFilter`, responsável por centralizar a lógica dos filtros de data, incluindo:

- geração das datas disponíveis;
- paginação dos filtros;
- seleção da data;
- adaptação da quantidade de itens exibidos conforme o tamanho da tela.

### Services

A camada de services concentra regras de negócio e operações que não pertencem diretamente aos componentes.

Exemplos:

- validações do checkout;
- cálculos de valores;
- regras do lumibar;
- manipulação de assentos;
- integração com a API do TMDB.

### Store

A pasta store concentra os estados globais da aplicação utilizando Zustand.

A separação das stores permite organizar diferentes momentos do fluxo:

- **CheckoutStore:** estado temporário durante a compra.
- **PurchasedProductsStore:** dados persistidos após a confirmação da compra.

### Context

A Context API é utilizada para compartilhar informações dos filmes carregados e a busca por título entre diferentes telas da aplicação.

### Schemas

A pasta schemas concentra as regras de validação utilizando Zod.

### Mappers

Os mappers transformam os dados retornados pela API do TMDB para o formato utilizado pela aplicação.

### Types

A pasta types centraliza as tipagens utilizadas entre componentes, serviços e estados globais.

### Utils

A pasta utils reúne funções auxiliares reutilizadas em diferentes partes da aplicação.

### Data

A pasta data armazena dados estáticos utilizados pela aplicação, como produtos do lumibar.

## 🎨 Design System e UI/UX


A interface do LumiCine foi desenvolvida com foco em consistência visual, experiência do usuário e reutilização de componentes. Para isso, foi criado um pequeno Design System utilizado como base para padronizar cores, tipografia, espaçamentos e componentes ao longo de toda a aplicação.

### Identidade visual

A identidade visual foi inspirada no ambiente de um cinema, utilizando uma interface predominantemente escura para destacar pôsteres, informações dos filmes e elementos interativos.

As cores, espaçamentos e componentes foram padronizados para proporcionar uma experiência visual consistente em todas as as telas.

### Componentização

Os componentes foram desenvolvidos buscando reutilização e consistência entre as interfaces.

Alguns exemplos incluem:

- Cards de filmes.
- Cards de produtos do lumibar.
- Botões reutilizáveis.
- Campos de formulário.
- Modais.
- Componentes de navegação.
- Seletores de assentos.
- Tickets digitais.

Essa abordagem reduz duplicação de código e facilita futuras evoluções da interface.

### Decisões de UI/UX

Durante o desenvolvimento, algumas decisões foram tomadas para tornar a navegação mais intuitiva e reduzir a carga cognitiva do usuário.

- **Cards inspirados em ingressos de cinema:** os cards dos filmes foram projetados com elementos visuais que remetem a tickets, reforçando o contexto da aplicação e facilitando a identificação do conteúdo apresentado.

- **Fluxo de checkout em etapas:** o processo de compra foi dividido em telas sequenciais para organizar as informações e evitar que o usuário precise tomar muitas decisões ao mesmo tempo.

- **Indicador visual de progresso:** durante o checkout, um componente indica em qual etapa da compra o usuário se encontra, tornando o fluxo mais previsível e facilitando a navegação.

- **Legenda para seleção de assentos:** a tela de assentos apresenta uma legenda visual para diferenciar assentos disponíveis, selecionados, ocupados, acessíveis e destinados a acompanhantes, tornando a leitura mais rápida.

- **Feedback visual nas interações:** estados como *hover*, foco e seleção foram aplicados aos componentes interativos para deixar claro quais elementos podem ser utilizados e qual ação está sendo executada.

- **Validações visuais durante o checkout:** o usuário recebe feedback ao tentar prosseguir sem preencher informações obrigatórias ou realizar ações inválidas, contribuindo para uma experiência mais segura.

- **Visualização do cartão no pagamento:** foi utilizada a biblioteca **react-19-credit-card** para representar visualmente o cartão durante o preenchimento dos dados de pagamento. Essa escolha teve como objetivo tornar a experiência mais intuitiva, permitindo que o usuário visualize as informações inseridas de forma semelhante a um cartão real.

### Acessibilidade

Durante o desenvolvimento foram adotadas práticas para melhorar a acessibilidade da aplicação, incluindo:

- contraste adequado entre textos e elementos visuais;
- navegação consistente entre as telas;
- componentes desenvolvidos priorizando clareza visual e facilidade de interação.

## ⚙️ Decisões técnicas

Durante o desenvolvimento do LumiCine, algumas decisões técnicas foram tomadas com o objetivo de manter a aplicação organizada, escalável e de fácil manutenção.

### Next.js

O projeto foi desenvolvido utilizando Next.js com App Router, aproveitando uma estrutura baseada em rotas e recursos nativos do framework.

### Separação entre interface e regras de negócio

As regras de negócio foram isoladas em services para evitar componentes responsáveis por múltiplas tarefas.

Essa separação facilita manutenção, reutilização e evolução da aplicação.

### Gerenciamento de estado

O gerenciamento de estado foi dividido conforme a responsabilidade de cada fluxo.

O Zustand foi escolhido para controlar estados globais que possuem compartilhamento entre diferentes telas, enquanto a Context API foi utilizada para informações relacionadas ao catálogo e busca de filmes.

### Validação de formulários

React Hook Form e Zod foram utilizados em conjunto para centralizar validações e facilitar o gerenciamento dos formulários.

### Camada de mapeamento

Foi criada uma camada de mappers para evitar dependência direta da estrutura retornada pela API do TMDB.

Essa abordagem permite que alterações na origem dos dados não impactem diretamente os componentes da interface.

### Tipagem

TypeScript foi utilizado para garantir maior segurança durante o desenvolvimento, reduzindo erros relacionados a tipos e mantendo contratos claros entre as diferentes camadas da aplicação.

Durante o desenvolvimento do LumiCine, algumas decisões técnicas foram tomadas com o objetivo de manter a aplicação organizada, escalável e de fácil manutenção.

### Next.js

O projeto foi desenvolvido utilizando o App Router do Next.js, permitindo uma organização baseada em rotas e aproveitando recursos como renderização híbrida e otimizações nativas do framework.

### Separação entre interface e regras de negócio

As regras de negócio foram isoladas na camada de **services**, mantendo os componentes focados apenas na renderização da interface.

Essa abordagem facilita testes, manutenção e reutilização de lógica em diferentes partes da aplicação.

### Gerenciamento de estado

O gerenciamento de estado foi dividido conforme a responsabilidade de cada fluxo.

Foi utilizado **Zustand** para armazenar estados globais da aplicação, separando:

- **CheckoutStore:** responsável pelo estado temporário do fluxo de compra.
- **PurchasedProductsStore:** responsável pela persistência dos ingressos após a confirmação do pagamento.

Além disso, a **Context API** foi utilizada para compartilhar os filmes carregados pela API e o estado da pesquisa entre diferentes telas, evitando prop drilling.

### Validação de formulários

As validações foram implementadas utilizando **React Hook Form** em conjunto com **Zod**, permitindo centralizar as regras de validação e simplificar o gerenciamento dos formulários.

### Camada de mapeamento

Os dados retornados pela API do TMDB passam por uma camada de **mappers** antes de serem utilizados pelos componentes.

Essa abordagem reduz o acoplamento entre a estrutura da API e a aplicação, facilitando futuras alterações na origem dos dados.

### Tipagem centralizada

Todas as interfaces e tipos da aplicação foram organizados em uma pasta dedicada, garantindo consistência entre componentes, serviços, stores e demais módulos.

### Hooks personalizados

Comportamentos reutilizáveis foram abstraídos em hooks personalizados.

Um exemplo é o `useDateFilter`, que concentra toda a lógica relacionada aos filtros de data, incluindo paginação, seleção da data e adaptação da quantidade de itens exibidos conforme o tamanho da tela.

### Componentização

Os componentes foram desenvolvidos priorizando reutilização e composição, reduzindo duplicação de código e facilitando a criação de novas funcionalidades.

### Estrutura baseada em features

A organização do projeto combina componentes compartilhados com uma estrutura baseada em **features**, agrupando arquivos relacionados ao mesmo domínio da aplicação e facilitando sua evolução.


## 🚀 Melhorias futuras

Algumas melhorias podem ser implementadas futuramente para evoluir a aplicação:

- **Duração dinâmica dos filmes:** utilizar a duração real dos filmes para calcular automaticamente os horários das sessões.

- **Salas dinâmicas:** permitir diferentes configurações de salas e assentos conforme cada sessão, incluindo capacidade e disposição dos lugares.

- **Máscara para campos de pagamento:** adicionar máscaras de entrada para campos como número do cartão, facilitando o preenchimento e melhorando a experiência do usuário.

- **Testes automatizados:** implementação de testes para validar regras de negócio, componentes e fluxos principais da aplicação.



## 💻 Como executar

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

- Node.js
- npm ou outro gerenciador de pacotes

### Instalação

Clone o repositório:

```bash
git clone https://github.com/MaduDev003/LumiCine.git
```

Acesse a pasta do projeto:

```bash
cd LumiCine
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

Após iniciar, a aplicação estará disponível no endereço informado pelo terminal.


## ©️ Créditos

### Imagens

As imagens utilizadas nos produtos do **LumiBar** foram obtidas gratuitamente através do **Unsplash**.

Créditos:
- Fonte: Unsplash
- Os fotógrafos responsáveis estão disponíveis nos links individuais das imagens utilizadas.

### Favicon e Logo do Readme
Créditos:
  - Autor: Andrean Prabowo
  - Fonte: Flaticon

### Tecnologias e bibliotecas

Este projeto utiliza tecnologias e bibliotecas de código aberto:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Zod
- React Hook Form
- react-19-credit-card
- Lucide React