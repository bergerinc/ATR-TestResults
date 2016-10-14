import{ NgModule } from '@angular/core';
import{ BrowserModule } from '@angular/platform-browser';
import{ FormsModule } from '@angular/forms';

import{ AppComponent } from './app.component';
import { EnvironmentComponent } from './components/environment.component';
import { ApplicationComponent } from './components/application.component';
import { ServerComponent } from './components/server.component';
import { TestRunComponent } from './components/test-run.component';
import { FeatureComponent } from './components/feature.component';
import { ScenarioComponent } from './components/scenario.component';
import { StepComponent } from './components/step.component';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
    ] ,
    declarations: [
        AppComponent,
        EnvironmentComponent,
        ApplicationComponent,
        ServerComponent,
        TestRunComponent,
        FeatureComponent,
        ScenarioComponent,
        StepComponent
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule{ }