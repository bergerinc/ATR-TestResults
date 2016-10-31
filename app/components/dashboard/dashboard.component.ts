import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TestResultsService } from '../../services/test-results.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
    constructor(private _appComp: AppComponent, private _svc: TestResultsService){
        this._appComp.setPageTitle("Dashboard");
    }
}
