[Documentação Técnica RFC do projeto](https://docs.google.com/document/d/11Tobzwm5-JkiURC2DJRTKl8LARjj46NG/edit?usp=sharing&ouid=113156827946997430842&rtpof=true&sd=true)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=bugs)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)

# ZloApp- Aplicativo de Gerenciamento de Pulseiras

## Descrição do Projeto

O aplicativo **ZloApp** foi desenvolvido para gerenciar as pulseiras de auxílio para pessoas dependentes. Através deste aplicativo, o **responsável** pode gerenciar as pulseiras adquiridas, acompanhar a localização dos dependentes, editar dados de perfil e interagir com a pulseira por meio de NFC.

## Objetivo do Aplicativo

O objetivo principal do **ZloApp** é proporcionar uma solução intuitiva, prática e segura para o gerenciamento das pulseiras de auxílio para dependentes. O aplicativo está em **andamento**, e algumas funcionalidades, especialmente as relacionadas à segurança, podem não estar implementadas no momento, mas serão desenvolvidas em futuras atualizações. O projeto está sendo desenvolvido levando em consideração a importância da segurança dos dados dos usuários, incluindo a conformidade com a LGPD (Lei Geral de Proteção de Dados), PHI (Protected Health Information) e HIPAA (Health Insurance Portability and Accountability Act). Além disso, o **ZloApp** busca criar um processo eficiente para o gerenciamento de dependentes e contas, sendo **prático e intuitivo** para todos os usuários, independentemente da idade.

A seguir, os pontos principais:

1. **Gerenciamento de Dependentes e Contas**:
   - O aplicativo permite que o responsável gerencie de forma simples e eficiente os dados de dependentes, incluindo a localização, dados de perfil e interações com as pulseiras. O processo de cadastro, visualização e edição de dependentes foi projetado para ser **prático e intuitivo**, facilitando o uso por qualquer pessoa, independentemente da idade.

2. **Conformidade com LGPD e Proteção de Dados Pessoais**:
   - O **ZloApp** seguirá os princípios estabelecidos pela LGPD, garantindo a proteção dos dados pessoais dos usuários, como informações de login, localização dos dependentes e dados de perfil. Todos os dados coletados serão armazenados de forma segura e utilizados somente para os fins específicos do aplicativo, com o consentimento explícito dos responsáveis.

3. **Proteção de Informações de Saúde (PHI) e HIPAA (Futuro)**:
   - O aplicativo irá lidar com dados sensíveis, como a localização dos dependentes, suas interações com as pulseiras de rastreamento e seus dados médicos que são considerados informações de saúde (PHI). Para garantir a conformidade com o HIPAA, o **ZloApp** implementará medidas rigorosas de segurança no futuro, incluindo criptografia de ponta a ponta e controle de acesso restrito para proteger essas informações. Essas funcionalidades de segurança ainda estão em desenvolvimento e serão implementadas em versões futuras.

4. **Interface Intuitiva e Acessível**:
   - O **ZloApp** foi projetado para ser **intuitivo** e fácil de usar, atendendo a todas as idades. A interface é simples, com navegação fluida e funcionalidades claras. O processo de gerenciamento de dependentes e contas foi otimizado para garantir uma experiência prática e acessível, com funcionalidades que podem ser compreendidas facilmente por qualquer usuário, independentemente de sua familiaridade com tecnologia.

O projeto está em constante evolução, e futuras atualizações irão incluir mais recursos de segurança, tornando o aplicativo ainda mais seguro e confiável para os usuários.

### Funcionalidades Principais:

- **Cadastro/Login:** O responsável pode se cadastrar, fazer login ou recuperar a senha.
- **Home:** Exibe os dependentes cadastrados e permite editar, excluir ou trocar dependentes.
- **Perfil:** Permite que o responsável altere seus dados de usuário.
- **Interação com Pulseira:** O aplicativo solicita a inserção de uma URL no chip NFC da pulseira ao manipular os dados de dependentes.
- **Notificações:** O responsável pode acessar as notificações da conta.
- **Mapa de Localizações:** Exibe um mapa com as últimas localizações do dependente.
- **Trocar senha:** Permite o usuário alterar a senha, por meio de uma confirmação de código pelo e-mail.

---

## Visão Geral

### Introdução
O aplicativo ZloApp foi desenvolvido em **React Native** e está disponível para plataformas Android. Ele é utilizado para gerenciar a interação com a pulseira ZloTrackband através da tecnologia NFC.

### Principais Tecnologias Utilizadas
- **React Native**: Framework JavaScript para desenvolvimento mobile.
- **Axios**: Para chamadas de APIs externas.
- **React Navigation**: Para gerenciamento de navegação entre telas.

---

## Estrutura do Projeto
```
zloTrackbandMobile/
├── android/                  # Configurações e arquivos do Android
├── ios/                      # Configurações e arquivos do iOS
├── src/
│   ├── components/           # Componentes React Native
│   ├── screens/              # Telas do aplicativo
│   ├── navigation/           # Navegação do aplicativo
│   ├── services/             # Serviços para chamadas de APIs externas
│   ├── urls/                 # Arquivo com as URLs utilizadas nas APIs
│   ├── App.js                # Componente principal
│   ├── index.js              # Ponto de entrada do aplicativo
├── package.json
└── README.md
```

### Descrição dos Diretórios
- **android/**: Configurações específicas para as plataformas Android.
- **src/components/**: Contém os componentes reutilizáveis no React Native.
- **src/pages/**: Telas do aplicativo, cada uma representando uma funcionalidade ou fluxo.
- **src/services/**: Serviços de integração com APIs externas.
- **src/urls/**: Arquivo centralizado para gerenciar URLs usadas nas requisições.
- **src/utils/**: Arquivo centralizado para gerenciar métodos gerais usadas nas requisições.

---

## Funcionalidades
- Autenticação com JWT Token, incluindo verificação de expiração e redirecionamento para a tela de login.
- Consumo de um microserviço de autenticação para login, cadastro e alteração de senha.
- Navegação fluida entre telas com React Navigation.

### Desenvolvedores

- Wesley Erik Sardi
- Davi Prudente Ferreira

### Contribuições são bem-vindas! Para contribuir, abra uma issue ou envie um pull request.
