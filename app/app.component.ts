import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from './models/environment';
import { TestResultsService } from './services/test-results.service';
import {Observable} from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector:'atr-app',
    templateUrl: 'app.component.html',
    providers:[ TestResultsService ]
})

export class AppComponent implements OnInit, AfterViewInit{ 
    constructor(private _testResultsSvc: TestResultsService, private _router: Router){}
    title = "ATR | Test Results";
    pageTitle: string = '';
    selectedServerName: string;
    selectedEnvironmentName: string;
    environments: Observable<Environment>;
    ngOnInit() {
        this.getEnvironments();
    }
    ngAfterViewInit() {
        window['ATR_App'].pageInit();
    }
    setPageTitle(pageTitle){
        this.pageTitle = pageTitle;
    }
    getEnvironments(refresh?) {
        this._testResultsSvc.getEnvironmentData().subscribe(res => {
            this.environments = res;
        });
    }
    refreshTestResults(){
        debugger;
        this._testResultsSvc.getEnvironmentData(true).subscribe(res => {
            this.environments = res;


            if(this.environments){
                this.selectedEnvironmentName = this.environments[0].Name;
                this.selectedServerName = this.environments[0].Servers[0].Name;
                this._router.navigate(['/results/' + this.selectedEnvironmentName + '/' + this.selectedServerName]);
            }
        });
    }
}