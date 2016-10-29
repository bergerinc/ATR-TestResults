import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './components/application/application.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { FeatureComponent } from './components/feature/feature.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServerComponent } from './components/server/server.component';
import { ScenarioComponent } from './components/scenario/scenario.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StepComponent } from './components/step/step.component';
import { TestResultsService } from './services/test-results.service';
import { TestRunComponent } from './components/test-run/test-run.component';
import { TestResultsOverallTableComponent } from './components/dashboard/table/test-results-overall-table.component';

import { TestResultsByAppChartDirective } from './components/dashboard/directives/test-results-by-app-chart.directive';
import { TestResultsByEnvChartDirective } from './components/dashboard/directives/test-results-by-env-chart.directive';
import { TestResultsByServerChartDirective } from './components/dashboard/directives/test-results-by-server-chart.directive';

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
        ApplicationComponent,
        DashboardComponent,
        EnvironmentComponent,
        FeatureComponent,
        NavbarComponent,
        ScenarioComponent,
        ServerComponent,
        SidenavComponent,
        StepComponent,
        TestRunComponent,
        TestResultsOverallTableComponent,
        TestResultsByAppChartDirective,
        TestResultsByEnvChartDirective,
        TestResultsByServerChartDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}