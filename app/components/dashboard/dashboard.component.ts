import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
    constructor(private _appComp: AppComponent, private _route: ActivatedRoute, private _router: Router){
        this._appComp.setPageTitle("Dashboard");
    }
}
