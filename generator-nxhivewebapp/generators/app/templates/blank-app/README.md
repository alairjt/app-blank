<%=props.appName%>
=================

- NPM's utilizados no projeto:
    Ver arquivo package.json

- Pre-Requisitos:
     NodeJS,
     GRUNT
     Karma
 - Após instalar o NodeJS, digite:
 
    `npm install -g grunt`
 - Para instalar o Karma, digite: (Para execução em windows, é necessário ser a versão 0.10)
 
    `npm install -g karma@0.10` 
 
 - Distribuição do projeto:

    1) No Windows Execute o arquivo "config/grunt-install.bat" para baixar as dependencias do grunt. (dentro da pasta config)
    2) Execute a task "grunt dist" no cmd dentro da pasta config

 - Execução de Testes com Karma

    1) execute a task "grunt karma" no cmd dentro da pasta config
