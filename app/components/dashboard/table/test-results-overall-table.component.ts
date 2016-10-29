import { Component, OnInit } from '@angular/core';
import { TestResultsService } from '../../../services/test-results.service';
import { OverallTestResult } from '../../../models/overall-test-results';

@Component({
    moduleId: module.id,
    selector: 'test-results-overall-table',
    templateUrl: 'test-results-overall-table.component.html'
})
export class TestResultsOverallTableComponent implements OnInit {
    result: OverallTestResult;

    constructor(private _svc: TestResultsService) {
        this.result = new OverallTestResult();
    }

    ngOnInit(){
        this.getOverallResults();
    }

    getOverallResults(){
        this._svc.getOverallTestResults().subscribe(res => {
            this.result = res;
        });
    }
}