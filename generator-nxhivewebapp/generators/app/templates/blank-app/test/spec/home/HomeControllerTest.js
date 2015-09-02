/*
 * Created by rafael.ferrari since 26/01/2015.
 */
describe('Teste: HomeController.js', function () {
    var scope, createController, $httpBackend, $state;

    beforeEach(module('hiveApp', 'testMockRun'));
    var retorno = [{"status": "PENDENTE", "valor": 140188.46, "quantidade": 94},
        {"status": "ENVIADO_PARA_PAGAMENTO", "valor": 566.01, "quantidade": 1},
        {"status": "AGENDADO", "valor": 11.01, "quantidade": 1},
        {"status": "LIQUIDADO", "valor": 71.01, "quantidade": 1},
        {"status": "INCONSISTENTE", "valor": 91.01, "quantidade": 1},
        {"status": "VENCIDO", "valor": 59.91, "quantidade": 1},
        {"status": "DEVOLVIDO", "valor": 51.99, "quantidade": 1},
        {"status": "DESCONHECIDO", "valor": 151.00, "quantidade": 99}];

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $state = $injector.get('$state');
        });
        jasmine.clock().mockDate(new Date(2015, 03, 26));
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $state.current = {};
        $state.current.data = {};
        $state.current.data.hideMessagesForHTTPCodes = [200];
        createController = function () {
            return $controller('HomeController', {
                '$scope': scope,
                '$state': $state
            });
        };

        scope.$digest();
    }));

    it('Deve carregar pagamentos anteriores', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();

        /*** When ***/
        scope.carregarDadosAnteriores();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresAnteriores.length).toBe(8);
        expect(scope.carregandoDadosAnteriores).toBe(false);
    });

    it('Não deve carregar pagamentos anteriores', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(404);
        createController();

        /*** When ***/
        scope.carregarDadosAnteriores();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresAnteriores.length).toBe(0);
    });

    it('Deve carregar pagamentos atuais', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();

        /*** When ***/
        scope.carregarDadosAtuais();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresAtuais.length).toBe(8);
    });

    it('Não deve carregar pagamentos atuais', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(404);
        createController();

        /*** When ***/
        scope.carregarDadosAtuais();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresAtuais.length).toBe(0);
    });

    it('Deve carregar pagamentos posteriores', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();

        /*** When ***/
        scope.carregarDadosPosteriores();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresPosteriores.length).toBe(8);
    });

    it('Não deve carregar pagamentos posteriores', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(404);
        createController();

        /*** When ***/
        scope.carregarDadosPosteriores();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.totalaziadoresPosteriores.length).toBe(0);
    });

    it('Deve carregar pagamentos e totalizar', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();

        /*** When ***/
        scope.carregarDadosPosteriores();
        $httpBackend.flush();

        /*** Then ***/
        expect(scope.getTotalPagamentos(scope.totalaziadoresPosteriores)).toBe(199);
    });

    it('Deve validar o range de datas anteriores', function () {
        /*** Given ***/
        //new Date(2015, 03, 26)

        /*** When ***/
        createController();

        /*** Then ***/
        expect(scope.dataIntervaloAnterior.toString()).toBe({inicio: new Date(2015, 03, 22), fim: new Date(2015, 03, 25)}.toString());
    });

    it('Deve validar o range de datas atuais', function () {
        /*** Given ***/
        //new Date(2015, 03, 26)

        /*** When ***/
        createController();

        /*** Then ***/
        expect(scope.dataAtual.toString()).toBe({inicio: new Date(), fim: new Date()}.toString());
    });

    it('Deve validar o range de datas posteriores', function () {
        /*** Given ***/
        //new Date(2015, 03, 26)

        /*** When ***/
        createController();

        /*** Then ***/
        expect(scope.dataIntervaloPosterior.toString()).toBe({inicio: new Date(2015, 03, 27), fim: new Date(2015, 03, 29)}.toString());
    });

    it('Deve buscar o estilo de acordo com o status', function () {
        /*** Given ***/
        //new Date(2015, 03, 26)

        /*** When ***/
        createController();

        /*** Then ***/
        expect(scope.getStatusStyle("LIQUIDADO")).toBe("badge badge-ok");
        expect(scope.getStatusStyle("AGENDADO")).toBe("badge badge-warning");
        expect(scope.getStatusStyle("Qualquer status que não seja reconhecido")).toBe("badge badge-alert");
    });

    it('Deve buscar o label de acordo com o status', function () {
        /*** Given ***/
        //new Date(2015, 03, 26)

        /*** When ***/
        createController();

        /*** Then ***/
        expect(scope.getStatusLabel("PENDENTE")).toBe("label.pendentes");
        expect(scope.getStatusLabel("ENVIADO_PARA_PAGAMENTO")).toBe("label.enviado_para_pagamento");
        expect(scope.getStatusLabel("Qualquer status que não seja reconhecido")).toBe("label.desconhecidos");
    });

    it('Deve ordenar os pagamentos', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();
        scope.carregarDadosAtuais();
        $httpBackend.flush();

        /*** When ***/
        var index = scope.orderPagamentoStatus(scope.totalaziadoresAtuais[1]);

        /*** Then ***/
        expect(index).toBe(4);
    });

    it('Não deve ordenar os pagamentos', function () {
        /*** Given ***/
        $httpBackend.whenGET(/.*/).respond(200, retorno);
        createController();

        /*** When ***/
        var index = scope.orderPagamentoStatus("Qualquer coisa que não seja um  pagamento valido");

        /*** Then ***/
        expect(index).toBe("");
    });
});