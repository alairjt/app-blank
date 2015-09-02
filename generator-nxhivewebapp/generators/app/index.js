'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log(yosay(
                'Bem vindo ao ' + chalk.red('NexxeraBlankWeb')
                ));

        var prompts = [{
                type: 'text',
                name: 'appName',
                message: 'Informe o nome da aplicação'
                        //default: //@TODO: Pegar nome do diretório
            }];

        this.prompt(prompts, function (props) {
            this.props = props;

            done();
        }.bind(this));
    },
    renderControllerFiles: function () {
        this.directory(this.templatePath('blank-app'), this.destinationPath());
    },
    install: function () {
        //this.installDependencies();
    }
});
