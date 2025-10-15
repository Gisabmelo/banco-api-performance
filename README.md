# 🧪 Testes de Performance com K6 - Banco API

Repositório destinado à automação de **testes de performance** utilizando **JavaScript** e **[K6](https://k6.io)**.  
O objetivo é garantir a qualidade, estabilidade e escalabilidade da API do projeto **Banco API**.

📍 Repositório: [Gisabmelo/banco-api-performance](https://github.com/Gisabmelo/banco-api-performance/tree/iniciando-projeto)

---

## 🚀 Introdução

Este projeto contém scripts de teste de carga e desempenho, desenvolvidos para avaliar a **resiliência**, **tempo de resposta** e **comportamento sob estresse** de uma API REST.  
Os testes são escritos em JavaScript e executados via **K6**, ferramenta open source amplamente utilizada para **Performance Testing** e **Load Testing**.

---

## 🧰 Tecnologias Utilizadas

- **[K6](https://k6.io/)** – Ferramenta principal de testes de performance  
- **JavaScript (ES6)** – Linguagem de criação dos scripts  
- **Node.js** – Gerenciamento de dependências e execução de utilitários auxiliares  
- **Git/GitHub** – Versionamento e colaboração  

---

## 🗂️ Estrutura do Repositório

```
📦 banco-api-performance
 ┣ 📁 scripts/              # Contém os scripts de teste (ex: cadastro, login, etc.)
 ┣ 📁 data/                 # Arquivos JSON ou CSV com dados de entrada
 ┣ 📁 reports/              # Saída dos relatórios de execução
 ┣ 📁 utils/                # Funções auxiliares e configurações comuns
 ┣ 📄 .env.example          # Exemplo de variáveis de ambiente
 ┣ 📄 package.json          # Dependências e scripts npm
 ┣ 📄 README.md             # Documentação do projeto
 ┗ 📄 script.js             # Script principal de teste
```

---

## 🎯 Objetivos dos Grupos de Arquivos

| Diretório / Arquivo | Descrição |
|----------------------|-----------|
| **scripts/** | Contém os cenários de teste de performance separados por funcionalidade da API. |
| **data/** | Dados utilizados para requisições dinâmicas nos testes (ex: usuários, tokens). |
| **utils/** | Funções genéricas reutilizáveis (como geração de headers, logs, etc). |
| **reports/** | Armazena relatórios HTML ou JSON exportados após a execução dos testes. |
| **.env.example** | Exemplo de configuração de variáveis de ambiente, como `BASE_URL`. |
| **script.js** | Script principal que executa o conjunto completo de testes. |

---

## ⚙️ Modo de Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/Gisabmelo/banco-api-performance.git
cd banco-api-performance
```

### 2. Instalar dependências (se aplicável)
> Caso existam utilitários Node.js:
```bash
npm install
```

### 3. Configurar variável de ambiente

Antes de executar o teste, defina a variável `BASE_URL` com o endpoint da API a ser testada:
```bash
export BASE_URL=https://sua-api.com
```

> 💡 No Windows (PowerShell):
```powershell
$env:BASE_URL="https://sua-api.com"
```

---

## ▶️ Execução dos Testes

Para rodar os testes de performance com o **K6**, execute o comando:

```bash
k6 run script.js
```

### 💻 Execução com Acompanhamento em Tempo Real e Exportação de Relatório

O K6 permite visualizar o teste via **dashboard web** e exportar o resultado em HTML.  
Use as variáveis de ambiente abaixo:

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
BASE_URL=https://sua-api.com \
k6 run script.js
```

Após a execução, um arquivo `html-report.html` será gerado na pasta do projeto, contendo os resultados detalhados.

---

## 📊 Relatórios e Métricas

Durante a execução, o K6 exibe métricas como:
- **http_reqs** → Número total de requisições
- **http_req_duration** → Tempo médio de resposta
- **vus** → Usuários virtuais simulados
- **checks** → Validação das respostas (sucesso/falha)

Os relatórios exportados podem ser encontrados no diretório:
```
/reports
```

---


