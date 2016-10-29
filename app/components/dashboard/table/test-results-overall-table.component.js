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
var test_results_service_1 = require('../../../services/test-results.service');
var overall_test_results_1 = require('../../../models/overall-test-results');
var TestResultsOverallTableComponent = (function () {
    function TestResultsOverallTableComponent(_svc) {
        this._svc = _svc;
        this.result = new overall_test_results_1.OverallTestResult();
    }
    TestResultsOverallTableComponent.prototype.ngOnInit = function () {
        this.getOverallResults();
    };
    TestResultsOverallTableComponent.prototype.getOverallResults = function () {
        var _this = this;
        this._svc.getOverallTestResults().subscribe(function (res) {
            _this.result = res;
        });
    };
    TestResultsOverallTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'test-results-overall-table',
            templateUrl: 'test-results-overall-table.component.html'
        }), 
        __metadata('design:paramtypes', [test_results_service_1.TestResultsService])
    ], TestResultsOverallTableComponent);
    return TestResultsOverallTableComponent;
}());
exports.TestResultsOverallTableComponent = TestResultsOverallTableComponent;
//# sourceMappingURL=test-results-overall-table.component.js.map