import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Environment } from './models/environment';
import { EnvironmentService } from './services/environments-data.service';

@Component({
    selector:'atr-app',
    templateUrl: '/app/templates/app-template.html',
    providers:[EnvironmentService]
})

export class AppComponent implements OnInit, AfterViewInit{ 
    title = "ATR | Test Results";
    ngOnInit() {}
    ngAfterViewInit() {
        window['ATR_App'].pageInit();
    }
}