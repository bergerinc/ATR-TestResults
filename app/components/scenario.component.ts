import { Component } from '@angular/core';

@Component({
    selector: "scenario",
    templateUrl:'/app/templates/scenario-template.html'
})

export class ScenarioComponent{
    name = "Scenario Name";
    steps = [];
    status = "PASSED";
}