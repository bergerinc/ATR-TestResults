import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Environment } from '../../models/environment';
import { TestResultsService } from '../../services/test-results.service';

@Component({
    moduleId: module.id,
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    inputs: ['environments']
})
export class SidenavComponent {
    environmentName: string;
    serverName: string;
}
