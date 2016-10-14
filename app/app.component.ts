import { Component } from '@angular/core';

@Component({
    selector:'my-app',
    template: `
    <h1>{{title}}</h1>
    <environments></environments>
    `
})

export class AppComponent{ 
    title = "This App Title";
}