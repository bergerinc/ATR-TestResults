import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "step",
    templateUrl: 'step.component.html'
})

export class StepComponent{
    name = "Step Name";
    stackTrace = "n/a";
    duration: '0m 0s';
    status: "PASSED";
}