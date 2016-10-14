import { Component } from '@angular/core';
import { ApplicationComponent } from './application.component';
import { Environment } from '../models/environment';
import { ENVIRONMENTS } from '../mocks/environments.mock';

@Component({
    selector: "environments",
    template: `<p>{{name}}</p>
               <ul>
                <li *ngFor="let env of environments">
                    {{env.name}}
                </li>
               </ul>
    `
})

export class EnvironmentComponent{
    name = "Environment name goes here.";
    environments: Environment[];
    ngOnInit(){
        this.environments = ENVIRONMENTS;   
    }
}