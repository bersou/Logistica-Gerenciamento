# 🚀 Express Logistic: Dashboard de Gerenciamento
(Projeto de Portfólio)

**Link do Projeto (Live):** [Ainda não publicado - em breve no Vercel!]

Este é um projeto de portfólio de um Dashboard de Logística completo, construído do zero com Vue.js e Vuetify. O objetivo foi criar um SaaS (Software as a Service) 100% interativo e responsivo, capaz de gerenciar clientes, entregas e perfis de usuário, tudo conectado a um banco de dados real na nuvem (Supabase).

---

## 📸 Capturas de Tela

| Dashboard Principal (com Chatbot) | Cadastro de Perfil (com Upload) |
| :---: | :---: |
| ![Dashboard com KPI e Chatbot](./Gerenciamento%20De%20Logistica%20Online%20(1).png) | ![Cadastro de Perfil com Foto](./Gerenciamento%20De%20Logistica%20Online%20(10).png) |

| Página de Clientes (com Logos e Pop-ups) | Mapa de Rotas (Localizado) |
| :---: | :---: |
| ![Página de Clientes com Logos](./Gerenciamento%20De%20Logistica%20Online%20(7).png) | ![Mapa de Rotas](./Gerenciamento%20De%20Logistica%20Online%20(6).jpg) |

| Pop-ups Interativos (KPIs e Detalhes) | Tabela de Entregas |
| :---: | :---: |
| ![Pop-up de Detalhes de Entrega](./Gerenciamento%20De%20Logistica%20Online%20(9).png) | ![Tabela de Entregas](./Gerenciamento%20De%20Logistica%20Online%20(5).png) |

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * **Vue.js 3:** (Composition API e `<script setup>`)
    * **Vuetify 3:** Para a biblioteca de componentes (Material Design) e responsividade.
    * **Pinia:** Para gerenciamento de estado global (guardar o perfil do usuário no "cérebro" do app).
    * **Vue Router:** Para a navegação entre as páginas.
    * **Vue-Leaflet:** Para a renderização do mapa interativo.

* **Backend (BaaS):**
    * **Supabase:** Utilizado como banco de dados PostgreSQL e para o **Storage** de arquivos (upload das fotos de perfil).
    * **RLS (Row Level Security):** Políticas de segurança configuradas para o banco e o storage.

* **Outras Ferramentas:**
    * **Clearbit API:** Para buscar dinamicamente os logotipos das empresas na página de clientes.
    * **Vite:** Para o build e servidor de desenvolvimento.
    * **Vercel:** (Próximo passo) Para o deploy (publicação) do projeto.

---

## ✨ Funcionalidades Principais

* **Dashboard Interativo:**
    * KPIs (Indicadores) que abrem pop-ups com detalhes (drill-down).
    * **Chatbot Simulado:** Um assistente de IA (mock) que reconhece palavras-chave (`rota`, `status`, `tempo`) e dá respostas realistas para o portfólio.

* **Gerenciamento de Clientes (Simulado):**
    * Listagem de clientes com logos dinâmicos (via API Clearbit).
    * Cadastro (falso) de novos clientes que atualiza a lista em tempo real.
    * Pop-ups para "Ver Detalhes" e "Ver Entregas" de cada cliente.

* **Cadastro de Usuário 100% Funcional:**
    * Conexão real com o banco de dados **Supabase**.
    * Upload de fotos de perfil para o **Supabase Storage**.
    * O nome e a foto do usuário são "fixados" no layout (lidos do banco através do Pinia).

* **Outras Páginas:**
    * Página de **Entregas** com tabela de dados (busca, ordenação).
    * Página de **Mapa de Rotas** (Leaflet) centralizada em Gravataí, RS.