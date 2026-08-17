# 🚀 ADTEAM — Sistema de Marketing para Emprendedores

**Suite de marketing con equipo de agentes de IA** (perfiles, calendario de contenido, diseñador de carruseles, estratega de contenido, gestor de Meta Ads y analíticas en tiempo real) construida con React + TypeScript sobre Gemini AI.

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=white)](#)

🇦🇷 [Español](#-sobre-el-proyecto) | 🇬🇧 [English](#-about-the-project)

---

## 📌 Sobre el proyecto

Versión temprana de una agencia de marketing autónoma pensada para emprendedores que no tienen equipo de marketing propio: un panel único donde un "equipo" de agentes de IA se encarga de perfilar la marca, armar el calendario de contenido, diseñar carruseles, redactar estrategia y gestionar campañas de Meta Ads, con analíticas en tiempo real. Este repo fue el punto de partida del proyecto más completo [SistemaDeMarketingCompleto](https://github.com/octi35/SistemaDeMarketingCompleto).

## ✨ Características principales

- **Perfiles de agentes** (`AgentProfiles`): configuración del equipo de IA y sus roles.
- - **Calendario de contenido** (`CalendarManager`): planificación y organización de publicaciones.
  - - **Diseñador de carruseles** (`CarouselDesigner`): creación de carruseles para redes sociales.
    - - **Estratega de contenido** (`ContentStrategist`): generación de estrategia y copys con IA.
      - - **Gestor de Meta Ads** (`MetaAdsManager`): configuración y seguimiento de campañas publicitarias.
        - - **Analíticas en tiempo real** (`RealTimeAnalytics`): métricas de rendimiento del contenido y las campañas.
          - - **Pipeline y workflow de equipo** (`TeamPipeline`, `TeamWorkflow`): orquestación del trabajo entre agentes.
            - - **Integraciones** (`IntegrationsManager`): conexión con servicios externos.
             
              - ## 🛠️ Stack tecnológico
             
              - | Capa | Tecnología |
              - |---|---|
              - | Frontend | React + TypeScript + Vite |
              - | IA | Google Gemini API |
              - | Backend | `server.ts` (Node) |
             
              - ## 🚀 Cómo correrlo localmente
             
              - ```bash
                git clone https://github.com/octi35/Sistema-de-marketing-ADTEAM-GEMINI.git
                cd Sistema-de-marketing-ADTEAM-GEMINI
                npm install

                # Copiar .env.example a .env.local y completar GEMINI_API_KEY
                npm run dev
                ```

                Conseguí tu API key gratuita en [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

                ## 📁 Estructura del proyecto

                ```
                src/
                ├── App.tsx
                └── components/
                    ├── AgentProfiles.tsx
                    ├── CalendarManager.tsx
                    ├── CarouselDesigner.tsx
                    ├── ContentStrategist.tsx
                    ├── IntegrationsManager.tsx
                    ├── MetaAdsManager.tsx
                    ├── RealTimeAnalytics.tsx
                    ├── TeamPipeline.tsx
                    └── TeamWorkflow.tsx
                server.ts   # Backend / integraciones con Gemini
                ```

                ## 📄 Licencia

                MIT

                ---

                ## 🇬🇧 About the project

                An early version of an autonomous marketing agency built for entrepreneurs without an in-house marketing team: a single dashboard where a "team" of AI agents handles brand profiling, content calendars, carousel design, content strategy and Meta Ads campaign management, with real-time analytics. This repo was the starting point for the more complete [SistemaDeMarketingCompleto](https://github.com/octi35/SistemaDeMarketingCompleto) project.

                ### ✨ Key features

                AI agent profiles, a content calendar manager, a social carousel designer, an AI content strategist, a Meta Ads campaign manager, real-time analytics, and team pipeline/workflow orchestration between agents.

                ### 🛠️ Tech stack

                React + TypeScript + Vite frontend powered by the Google Gemini API, with a lightweight Node (`server.ts`) backend.

                ### 🚀 Getting started

                ```bash
                npm install
                # copy .env.example to .env.local and set GEMINI_API_KEY
                npm run dev
                ```

                ---

                ## 👤 Autor / Author

                **Octavio Fakiani** — Full Stack Developer & Analista de Sistemas

                - 🌐 Portfolio: [octaviofakiani.vercel.app](https://octaviofakiani.vercel.app/)
                - - 💼 LinkedIn: [octavio-fakiani](https://www.linkedin.com/in/octavio-fakiani-6662b5274/)
                  - - 🐙 GitHub: [@octi35](https://github.com/octi35)
                    - - ✉️ Email: octifaki@gmail.com
                      - 
