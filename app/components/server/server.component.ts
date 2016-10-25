import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { TestApplication } from '../../Models/test-application';
import { TestResultsService } from '../../services/test-results.service';

@Component({
    moduleId: module.id,
    selector: 'server',
    templateUrl: 'server.component.html'
})
export class ServerComponent {
    eventSub: any;
    constructor(private _appComp: AppComponent, private _testResultsSvc: TestResultsService, private _route: ActivatedRoute, private _router: Router){
        this.eventSub = _router.events.subscribe(event => {
            if (event.constructor.name === 'NavigationEnd' && _router.url.indexOf('results')) {
                this.getApps();
            }
        });
    }
    environmentName: string;
    serverName: string;
    selectedApp: TestApplication;
    applications: TestApplication[];
    getApps(){
        this.environmentName = this._route.snapshot.params['environmentName'];
        this.serverName = this._route.snapshot.params['serverName'];
        this._testResultsSvc.getServerData(this.environmentName, this.serverName).subscribe(s => {
            this.applications = s.Applications;
            this.setSelectedApp(this.applications[0]);
        });
    }
    setSelectedApp(app: TestApplication){
        this.selectedApp = app;
        this._appComp.selectedEnvironmentName = this.environmentName;
        this._appComp.selectedServerName = this.serverName;
        this._appComp.setPageTitle(this.serverName + "("  + this.environmentName + ")");
    }
    ngOnDestroy() {
        this.eventSub.unsubscribe();
    }
}