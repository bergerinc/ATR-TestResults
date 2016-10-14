import { Component } from '@angular/core';

@Component({
    selector: "step",
    template: `<p>{{name}}</p>`
})

export class StepComponent{
    name = "Step Name";
    stackTrace = "n/a";
    duration: '0m 0s';
    status: "PASSED";
}