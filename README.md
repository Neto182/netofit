Neto-fit 💪

Um aplicativo de treino para musculação focado em dar autonomia e controle total ao usuário sobre suas rotinas e progresso. Construído com React Native (Expo) e Supabase.


🎥 Demonstração

| Tela Inicial                   | Criação de Treino               |
|--------------------------------|---------------------------------|
|(![Captura de tela 2025-06-25 - 22 46 17](https://github.com/user-attachments/assets/d566a5ec-ebe1-4f71-a31a-17b7beab3ac6)) | ![Captura de tela 2025-06-25 - 22 46 11](https://github.com/user-attachments/assets/c05a6abd-e1f1-4d61-baea-f2418643ca76) |

| Lista de Treinos               | Detalhes de Exercício           |
|--------------------------------|---------------------------------|
| ![Captura de tela 2025-06-25 - 22 46 00](https://github.com/user-attachments/assets/270c1e14-6636-47c9-955a-e4dcff454d87) | ![Captura de tela 2025-06-25 - 22 56 53](https://github.com/user-attachments/assets/d88df6a4-5a18-410d-afe1-d09a49221436)
 |










📝 Sobre o Projeto

Foi criado o Neto-Fit como um projeto de estudo prático para consolidar conhecimentos em full-stack mobile. Ao longo do desenvolvimento, foram usados:

    Expo & React Native para estruturar e estilizar a interface.

    Supabase para modelar dados, escrever queries em SQL e aplicar RLS (Row Level Security).

    Supabase Auth integrado a React Context para fluxos de cadastro, login e sessão.

    Operações CRUD para exercícios, modelos de treino e registro de recordes (PRs).

    React Navigation para roteamento entre telas (Home, Meus Treinos, Criar Treino, PRs, Histórico, Perfil) em temas dark/light.

A cada implementação — busca de exercícios, criação de rotinas personalizadas, lembrete de suplementação ou gráficos de evolução — novos desafios surgiram e foram oportunidades para aprofundar as boas práticas de código, testes e deployment. O Neto-Fit segue em constante evolução, incorporando diariamente features que ampliam sua robustez e funcionalidade.


✨ Funcionalidades Implementadas

    Autenticação Completa de Usuários:

        Cadastro, Login e Logout seguros usando o Supabase Auth.

        Gerenciamento de sessão em toda a aplicação através de React Context.

        Fluxo de redirecionamento automático: usuários não logados são direcionados para a tela de Login, e usuários logados para a tela principal.

    Enciclopédia de Exercícios:

        Uma base de dados com 50 exercícios detalhados, armazenados no Supabase.

        Tela dedicada com uma lista completa de todos os exercícios.

        Barra de pesquisa para encontrar exercícios por nome em tempo real.

        Filtros dinâmicos por grupo muscular.

        Tela de detalhes para cada exercício, mostrando instruções de execução, equipamento, etc.

    Criação de Modelos de Treino:

        Sistema completo para o usuário criar, salvar e visualizar seus próprios modelos de treino.

        Busca de exercícios integrada na tela de criação para adicionar exercícios ao modelo de forma fluida.

        Os modelos são salvos no banco de dados e associados ao perfil do usuário.

    Segurança no Backend:

        Uso de Row Level Security (RLS) em todas as tabelas, garantindo que um usuário só possa ver e modificar os seus próprios dados.

🛠️ Tecnologias Utilizadas

    Frontend:

        React Native

        Expo (com Expo Router para navegação)

        TypeScript

    Backend:

        Supabase

        PostgreSQL

        Supabase Auth

🚀 Como Executar o Projeto Localmente

Para executar o projeto na sua máquina, siga estes passos:

    Clone o repositório:

    git clone https://github.com/Neto182/netofit.git
    cd netofit

    Instale as dependências:

    npm install

    Configure as Variáveis de Ambiente:

        Este projeto requer uma conexão com um projeto Supabase. Crie um arquivo chamado .env na raiz do projeto.

        Adicione suas chaves do Supabase a este arquivo. Elas podem ser encontradas no painel do seu projeto Supabase em Project Settings > API.

    # Arquivo: .env
    EXPO_PUBLIC_SUPABASE_URL=https://SUA_URL_DO_PROJETO.supabase.co
    EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC_AQUI

    Inicie o projeto:

    npx expo start

        Escaneie o QR Code com o aplicativo Expo Go no seu celular.

🐘 Banco de Dados (Supabase)

A estrutura do banco de dados e as políticas de segurança foram criadas usando scripts SQL. Para replicar o ambiente, você pode executar os scripts de criação de tabelas e de população de exercícios no SQL Editor do seu projeto Supabase.

(Sugestão: Crie uma pasta supabase/ no seu projeto e salve os scripts SQL que criamos lá para referência futura.)
🗺️ Próximos Passos (Roadmap)

    [ ] Implementar a tela de "Treino Ativo" para registrar séries, repetições e peso.

    [ ] Salvar os treinos concluídos na tabela workouts.

    [ ] Criar a tela de "Histórico de Treinos".

    [ ] Desenvolver a tela de "Progresso" com gráficos de evolução de carga e volume.

    [ ] Reformular a tela de Início (index.tsx) para ser um painel de controle dinâmico com os treinos do usuário.


👨‍💻 Autor

Ademir Neto

    GitHub: Neto182
