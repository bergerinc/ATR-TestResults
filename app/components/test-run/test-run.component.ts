import { Component } from '@angular/core';
import { Feature } from '../../models/feature';
import { ServerComponent } from '../server/server.component';

@Component({
    moduleId: module.id,
    selector: "test-run",
    templateUrl: 'test-run.component.html',
    inputs: ['app']
})
export class TestRunComponent {
}