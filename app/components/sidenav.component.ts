import { Component, OnInit } from '@angular/core';
import { Environment } from '../models/environment';
import { EnvironmentService } from '../services/environments-data.service';

@Component({
    moduleId: module.id,
    selector: 'sidenav',
    templateUrl: '../templates/sidenav.component.html'
})
export class SidenavComponent implements OnInit {
    environmentName: string;
    serverName: string;
    environments: Environment[];

    constructor(private _environmentSrv: EnvironmentService) {}
    ngOnInit() {
        this.getEnvironments();
    }
    getEnvironments() {
        this._environmentSrv.getEnvironmentData().subscribe(res => {
            this.environments = res;
        });
    }
    setServerInfo(envName: string, svrName: string){
        this.environmentName = envName;
        this.serverName = svrName;
        console.log(this.environmentName + ' | ' + this.serverName);
    }
}
