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
var TestResultsByAppChartDirective = (function () {
    function TestResultsByAppChartDirective(_elem, _zone, _testResultsSvc) {
        this._elem = _elem;
        this._zone = _zone;
        this._testResultsSvc = _testResultsSvc;
        this.element = this._elem.nativeElement;
        this.getTestResults();
    }
    TestResultsByAppChartDirective.prototype.setUI = function (results) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            var chart_labels = [];
            var chart_failed = [];
            var chart_passed = [];
            results.forEach(function (result) {
                chart_labels.push(result.ApplicationName);
                chart_failed.push((result.TotalFailedScenarios /
                    ((result.TotalScenarios > 0) ? result.TotalScenarios : 0) * 100)
                    .toFixed(0));
                chart_passed.push((result.TotalPassedScenarios /
                    ((result.TotalScenarios > 0) ? result.TotalScenarios : 0) * 100)
                    .toFixed(0));
            });
            var chartOptions = {
                tooltips: {
                    enabled: false
                },
                hover: {
                    animationDuration: 0
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: false
                            },
                            gridLines: {},
                            stacked: true
                        }],
                    yAxes: [{
                            gridLines: {
                                display: false,
                                color: "#fff",
                                zeroLineColor: "#fff",
                                zeroLineWidth: 0
                            },
                            stacked: true
                        }]
                },
                legend: {
                    display: false
                }
            };
            var data = {
                labels: chart_labels,
                datasets: [
                    {
                        label: "Failed",
                        backgroundColor: "#e95151",
                        data: chart_failed
                    },
                    {
                        label: "Passed",
                        backgroundColor: "#9cb074",
                        data: chart_passed
                    }
                ]
            };
            var canvas = _this.element;
            var ctx = canvas.getContext('2d');
            var options = {
                scales: {
                    xAxes: [{
                            stacked: true,
                            categorySpacing: 0
                        }],
                    yAxes: [{
                            stacked: true,
                            type: "linear",
                            display: true,
                            position: "left",
                            id: "y-axis-1",
                        }]
                }
            };
            var config = {
                type: 'bar',
                data: data,
                options: options
            };
            _this.thisChart = new Chart(ctx, config);
        });
    };
    TestResultsByAppChartDirective.prototype.getTestResults = function () {
        var _this = this;
        this._testResultsSvc.getTestResultsByApplication().subscribe(function (res) {
            _this.setUI(res);
        });
    };
    TestResultsByAppChartDirective = __decorate([
        core_1.Directive({
            selector: '[test-results-by-app-chart]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone, test_results_service_1.TestResultsService])
    ], TestResultsByAppChartDirective);
    return TestResultsByAppChartDirective;
}());
exports.TestResultsByAppChartDirective = TestResultsByAppChartDirective;
//# sourceMappingURL=test-results-by-app-chart.directive.js.map