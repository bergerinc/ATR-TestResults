"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_component_1 = require('../../app.component');
var test_results_service_1 = require('../../services/test-results.service');
var ServerComponent = (function () {
    function ServerComponent(_appComp, _testResultsSvc, _route, _router) {
        var _this = this;
        this._appComp = _appComp;
        this._testResultsSvc = _testResultsSvc;
        this._route = _route;
        this._router = _router;
        this.eventSub = _router.events.subscribe(function (event) {
            if (event.constructor.name === 'NavigationEnd' && _router.url.indexOf('results')) {
                _this.getApps();
            }
        });
    }
    ServerComponent.prototype.getApps = function () {
        var _this = this;
        this.environmentName = this._route.snapshot.params['environmentName'];
        this.serverName = this._route.snapshot.params['serverName'];
        this._testResultsSvc.getServerData(this.environmentName, this.serverName).subscribe(function (s) {
            _this.applications = s.Applications;
            _this.setSelectedApp(_this.applications[0]);
        });
    };
    ServerComponent.prototype.setSelectedApp = function (app) {
        this.selectedApp = app;
        this._appComp.selectedEnvironmentName = this.environmentName;
        this._appComp.selectedServerName = this.serverName;
        this._appComp.setPageTitle(this.serverName + "(" + this.environmentName + ")");
    };
    ServerComponent.prototype.ngOnDestroy = function () {
        this.eventSub.unsubscribe();
    };
    ServerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'server',
            templateUrl: 'server.component.html'
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, test_results_service_1.TestResultsService, router_1.ActivatedRoute, router_1.Router])
    ], ServerComponent);
    return ServerComponent;
}());
exports.ServerComponent = ServerComponent;
//# sourceMappingURL=server.component.js.map