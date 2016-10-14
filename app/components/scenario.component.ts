import { Component } from '@angular/core';

@Component({
    selector: "scenario",
    template: `<p>{{name}}</p>`
})

export class ScenarioComponent{
    name = "Scenario Name";
    steps = [];
    status = "PASSED";
}