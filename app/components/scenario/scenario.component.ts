import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "scenario",
    templateUrl:'scenario.component.html'
})

export class ScenarioComponent{
    name = "Scenario Name";
    steps = [];
    status = "PASSED";
}