import{ NgModule } from '@angular/core';
import{ BrowserModule } from '@angular/platform-browser';
import{ FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { EnvironmentComponent } from './components/environment.component';
import { EnvironmentService } from './services/environments-data.service';
import { ApplicationComponent } from './components/application.component';
import { ServerComponent } from './components/server.component';
import { TestRunComponent } from './components/test-run.component';
import { FeatureComponent } from './components/feature.component';
import { ScenarioComponent } from './components/scenario.component';
import { StepComponent } from './components/step.component';

import { SidenavComponent } from './components/sidenav.component';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        EnvironmentComponent,
        ApplicationComponent,
        ServerComponent,
        TestRunComponent,
        FeatureComponent,
        ScenarioComponent,
        StepComponent,
        SidenavComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule{ }