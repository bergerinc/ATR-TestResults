import { Component } from '@angular/core';

@Component({
    selector: "test-app",
    template: `<p>{{name}}</p>`
})

export class ApplicationComponent {
    name = "App Name";
    version = "9.64";
    features = [];
}