import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { ServerTestResult } from '../../../models/server-test-result';
import { TestResultsService } from '../../../services/test-results.service'
declare var Chart: any;

@Directive({
    selector: '[test-results-by-server-chart]',
})
export class TestResultsByServerChartDirective {
    element: any;
    thisChart: any;

    constructor(private _elem: ElementRef, private _zone: NgZone, private _testResultsSvc: TestResultsService) {
        this.element = this._elem.nativeElement;
        this.getTestResults();
    }

    setUI(results: ServerTestResult[]) {

        this._zone.runOutsideAngular(() => {

            var chart_labels: any[] = [];
            var chart_failed: any[] = [];
            var chart_passed: any[] = [];
            results.forEach(function (result) {
                chart_labels.push(result.ServerName);
                chart_failed.push(
                    (
                        result.TotalFailedScenarios / 
                        ((result.TotalScenarios > 0)? result.TotalScenarios : 0) * 100)
                        .toFixed(0)
                );
                chart_passed.push(
                    (
                        result.TotalPassedScenarios / 
                        ((result.TotalScenarios > 0)? result.TotalScenarios : 0) * 100)
                        .toFixed(0)
                );
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
                        gridLines: {
                        },
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

            let canvas = this.element;
            let ctx = canvas.getContext('2d');
            let options = {
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
            
            let config = {
                type: 'bar',
                data: data,
                options: options
            }

            this.thisChart = new Chart(ctx, config);

        });
    }

    getTestResults(){
        this._testResultsSvc.getTestResultsByServer().subscribe(res => {
            this.setUI(res);
        });
    }
}