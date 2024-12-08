[Documentação Técnica RFC do projeto](https://docs.google.com/document/d/11Tobzwm5-JkiURC2DJRTKl8LARjj46NG/edit?usp=sharing&ouid=113156827946997430842&rtpof=true&sd=true)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=bugs)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=WesleySardi_projeto-conclusao-curso-mobile&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=WesleySardi_projeto-conclusao-curso-mobile)

# ZloApp- Aplicativo de Gerenciamento de Pulseiras

## Descrição do Projeto

O aplicativo **ZloApp** foi desenvolvido para gerenciar as pulseiras de auxílio para pessoas dependentes. Através deste aplicativo, o **responsável** pode gerenciar as pulseiras adquiridas, acompanhar a localização dos dependentes, editar dados de perfil e interagir com a pulseira por meio de NFC.

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

### Tecnologias Utilizadas
- **React Native**: Framework JavaScript para desenvolvimento mobile.
- **Styled Components**: Para estilização de componentes.
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
- **src/screens/**: Telas do aplicativo, cada uma representando uma funcionalidade ou fluxo.
- **src/navigation/**: Configuração das rotas e navegação entre telas.
- **src/services/**: Serviços de integração com APIs externas.
- **src/urls/**: Arquivo centralizado para gerenciar URLs usadas nas requisições.

---

## Funcionalidades
- Autenticação com JWT Token, incluindo verificação de expiração e redirecionamento para a tela de login.
- Consumo de um microserviço de autenticação para login, cadastro e alteração de senha.
- Navegação fluida entre telas com React Navigation.

### Desenvolvedores

- Wesley Erik Sardi
- Davi Prudente Ferreira

### Contribuições são bem-vindas! Para contribuir, abra uma issue ou envie um pull request.
