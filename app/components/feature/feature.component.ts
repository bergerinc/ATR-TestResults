import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "feature",
    templateUrl: 'feature.component.html'
})

export class FeatureComponent {
    name = "Issue Categories";
    scenarios = [];
    status = "PASSED";
}