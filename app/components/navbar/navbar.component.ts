import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    inputs: ['title', 'pageTitle']
})
export class NavbarComponent {
    constructor(private _app: AppComponent) {}
    printWindow(){
        window.print();
    }
    refreshTestResults(){
        this._app.refreshTestResults();
    }
}