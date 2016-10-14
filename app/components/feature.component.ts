import { Component } from '@angular/core';

@Component({
    selector: "feature",
    template: `<p>{{name}}</p>`
})

export class FeatureComponent {
    name = "Feature Name";
    scenarios = [];
    status = "PASSED";
}