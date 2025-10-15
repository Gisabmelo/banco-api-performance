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

- **[K6](https://k6.io/)** → Ferramenta principal de testes de performance  
- **JavaScript (ES6)** → Linguagem para desenvolvimento dos scripts  
- **Node.js** → Suporte para automações auxiliares e gerenciamento de dependências  
- **Git/GitHub** → Versionamento e colaboração  

---

## 🗂️ Estrutura do Repositório

```
📦 banco-api-performance
 ┣ 📁 tests/              # Scripts de teste organizados por funcionalidade da API
 ┣ 📁 data/                 # Arquivos JSON/CSV usados como massa de dados
 ┣ 📁 reports/              # Saída dos relatórios de execução
 ┣ 📄 .env.example          # Exemplo das variáveis de ambiente necessárias
 ┣ 📄 package.json          # Dependências e scripts NPM (se aplicável)
 ┣ 📄 README.md             # Documentação do projeto
 ┗ 📄 script.js             # Script principal de execução dos testes
```

---

## 🎯 Objetivos dos Grupos de Arquivos

| Diretório / Arquivo | Descrição |
|----------------------|-----------|
| **reports/** | Armazena os relatórios HTML e JSON gerados após a execução. |
| **.env.example** | Modelo de variáveis de ambiente — incluir `BASE_URL` obrigatoriamente. |
| **script.js** | Script principal que orquestra a execução dos testes. |

---

## ⚙️ Modo de Instalação e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Gisabmelo/banco-api-performance.git
cd banco-api-performance
```

### 2️⃣ Instalar dependências (opcional)
> Caso existam utilitários Node.js no projeto:
```bash
npm install
```

### 3️⃣ Configurar variável de ambiente

Antes de rodar os testes, defina o endpoint da API através da variável `BASE_URL`:

#### 💻 Linux / MacOS
```bash
export BASE_URL=https://sua-api.com
```

#### 🪟 Windows (PowerShell)
```powershell
$env:BASE_URL="https://sua-api.com"
```

---

## ▶️ Execução dos Testes

Execute os testes de performance com o comando:

```bash
k6 run script.js
```

### 💻 Execução com acompanhamento em tempo real e exportação de relatório

Para gerar relatórios HTML e visualizar os resultados em tempo real via dashboard local, use as variáveis de ambiente do próprio K6:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html BASE_URL=https://sua-api.com k6 run script.js
```

Após a execução:
- Um dashboard interativo será aberto automaticamente.  
- O relatório completo será exportado para o arquivo `html-report.html` dentro do diretório do projeto.

---

## 📊 Relatórios e Métricas

Durante a execução, o K6 fornece métricas importantes como:
- **http_reqs** → Quantidade total de requisições
- **http_req_duration** → Tempo médio de resposta das requisições
- **vus** → Usuários virtuais simulados
- **checks** → Validações de sucesso ou falha das respostas

Os relatórios podem ser encontrados dentro do diretório:
```
/reports
```

---
