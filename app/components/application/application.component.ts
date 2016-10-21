import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'test-app',
    templateUrl: 'application.component.html' 
})

export class ApplicationComponent {
    name = "App Name";
    version = "9.64";
    features = [];
}