import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Environment } from './models/environment';
import { EnvironmentService } from './services/environments-data.service';

@Component({
    moduleId: module.id,
    selector:'atr-app',
    templateUrl: 'app.component.html',
    providers:[EnvironmentService]
})

export class AppComponent implements OnInit, AfterViewInit{ 
    title = "ATR | Test Results";
    ngOnInit() {}
    ngAfterViewInit() {
        window['ATR_App'].pageInit();
    }
}