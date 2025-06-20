# 🏋️‍♂️ Neto‑Fit

App Android de treinos personalizado, focado em evolução contínua, progressão de carga e registro de PRs (recordes pessoais).

## 🔥 Visão Geral

Neto‑Fit é um app completo, desenvolvido com Expo + React Native, que traz:
- Tela inicial com saudação e menu intuitivo
- Registros diários de treino, com séries, repetições e peso
- Planilha automática de progressão, sugerindo cargas futuras
- PR Tracker para acompanhar seus recordes por exercício
- Histórico detalhado de treinos com filtros por data
- Themes dark/light e visual moderno
- Controle de suplementação (ex: creatina) com reminders e histórico
- Integração futura com backend (Firebase/Supabase) para backup e login

## 🛠️ Estrutura do Projeto

```bash
neto‑fit/
├─ app/
│ ├─ navigation/ ← configuração de rotas (bottom tab)
│ └─ screens/ ← telas: Home, Treino, Histórico, PRs, Perfil
├─ components/ ← botões, cards, timers, inputs, etc.
├─ assets/ ← imagens, ícones, fontes
├─ hooks/ ← hooks customizados
├─ constants/ ← cores, strings, configs
├─ services/ ← AsyncStorage ou chamadas a API
├─ utils/ ← helper functions
├─ App.tsx ← Entry point que inicia a navegação
└─ package.json, tsconfig.json, etc.



## 🚀 Começando

**Pré-requisitos:**
- Node.js (versão LTS)
- Yarn ou npm
- Expo Go instalado no Android

**Passos:**
```bash
# Clonar o repositório
git clone <URL-do-repo>
cd neto‑fit

# Instalar dependências
npm install
# ou
yarn install

# Rodar o app
npx expo start

🎯 Funcionalidades Principais

    Navegação por bottom tabs entre as principais telas

    Registro de treinos: input de peso, reps e conclusão

    Planilha de progressão: sugestão de aumento de carga

    Painel de PRs: visualização e atualização automática

    Histórico de treinos: detalhes e datas ordenadas

    Suplementos: controle diário, lembrete e histórico de uso

    Tema escuro/claro: visual moderno, confortável


🛠️ Roadmap / Próximos passos

Implementar backend com Firebase Auth e Firestore

Sincronização de dados em múltiplos dispositivos

Gráficos avançados de evolução (volume, força)

Timer de descanso inteligente entre séries

Exportar relatórios (CSV / PDF)

Configurações de metas (cutting, bulking, força)

    Testes unitários e de interface


🧪 Tecnologias

    Expo

    React Native

    React Navigation

    [AsyncStorage] ou [Firebase/Supabase] — p/ armazenamento

    Outros libs: victory-native, react-native-reanimated, etc.


🤝 Contribuição

    Fork do projeto

    Crie uma branch (feature/minha-funcionalidade)

    Commit com mensagem clara

    Pull Request explicativo

📄 Licença

Distribuído sob a MIT License.
