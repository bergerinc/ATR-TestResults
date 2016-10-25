import { Component, Input } from '@angular/core';
import { TestApplication } from '../../models/test-application';
import { ServerComponent } from '../server/server.component';

@Component({
    moduleId: module.id,
    selector: 'test-app',
    templateUrl: 'application.component.html',
    inputs: ['app','environmentName', 'serverName']
})

export class ApplicationComponent {

}