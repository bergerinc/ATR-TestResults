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
var test_results_service_1 = require('./services/test-results.service');
var AppComponent = (function () {
    function AppComponent(_testResultsSvc, _router) {
        this._testResultsSvc = _testResultsSvc;
        this._router = _router;
        this.title = "ATR | Test Results";
        this.pageTitle = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getEnvironments();
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var app = window['ATR_App'];
        app.pageInit();
    };
    AppComponent.prototype.setPageTitle = function (pageTitle) {
        this.pageTitle = pageTitle;
    };
    AppComponent.prototype.getEnvironments = function (refresh) {
        var _this = this;
        this._testResultsSvc.getEnvironmentData().subscribe(function (res) {
            _this.environments = res;
        });
    };
    AppComponent.prototype.refreshTestResults = function () {
        var _this = this;
        this._testResultsSvc.getEnvironmentData(true).subscribe(function (res) {
            _this.environments = res;
            if (_this.environments) {
                _this.selectedEnvironmentName = res[0].Name;
                _this.selectedServerName = res[0].Servers[0].Name;
                _this._router.navigate(['/']);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'atr-app',
            templateUrl: 'app.component.html',
            providers: [test_results_service_1.TestResultsService]
        }), 
        __metadata('design:paramtypes', [test_results_service_1.TestResultsService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map