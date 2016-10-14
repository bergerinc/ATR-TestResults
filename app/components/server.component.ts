import {Component} from '@angular/core';
@Component({
    selector: "server",
    template: `<p>{{name}}</p>`
})
export class ServerComponent{
    name = "Server Name goes here";
    applications = [];
}