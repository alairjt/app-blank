'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var utils = require('./utils.js');
var shell = require('shelljs');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();
        
        this.log(utils.nexxSay());
        
        var prompts = [{
            type: 'text',
            name: 'appName',
            message: 'Nome da aplicação',
            default: process.cwd().split("\\").pop()
        }, {
            type: 'confirm',
            name: 'installDependencies',
            message: 'Instalar dependencias?',
            default: true
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
        if (this.props.installDependencies) {
            shell.cd('config');
            this.installDependencies();
        }
    }
});
