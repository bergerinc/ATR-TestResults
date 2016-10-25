import{ NgModule } from '@angular/core';
import{ BrowserModule } from '@angular/platform-browser';
import{ FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { TestResultsService } from './services/test-results.service';
import { ApplicationComponent } from './components/application/application.component';
import { ServerComponent } from './components/server/server.component';
import { TestRunComponent } from './components/test-run/test-run.component';
import { FeatureComponent } from './components/feature/feature.component';
import { ScenarioComponent } from './components/scenario/scenario.component';
import { StepComponent } from './components/step/step.component';

import { SidenavComponent } from './components/sidenav/sidenav.component';

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