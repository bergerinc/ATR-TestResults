"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var application_component_1 = require('./components/application/application.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var environment_component_1 = require('./components/environment/environment.component');
var feature_component_1 = require('./components/feature/feature.component');
var navbar_component_1 = require('./components/navbar/navbar.component');
var server_component_1 = require('./components/server/server.component');
var scenario_component_1 = require('./components/scenario/scenario.component');
var sidenav_component_1 = require('./components/sidenav/sidenav.component');
var step_component_1 = require('./components/step/step.component');
var test_run_component_1 = require('./components/test-run/test-run.component');
var test_results_overall_table_component_1 = require('./components/dashboard/table/test-results-overall-table.component');
var test_results_by_app_chart_directive_1 = require('./components/dashboard/directives/test-results-by-app-chart.directive');
var test_results_by_env_chart_directive_1 = require('./components/dashboard/directives/test-results-by-env-chart.directive');
var test_results_by_server_chart_directive_1 = require('./components/dashboard/directives/test-results-by-server-chart.directive');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                application_component_1.ApplicationComponent,
                dashboard_component_1.DashboardComponent,
                environment_component_1.EnvironmentComponent,
                feature_component_1.FeatureComponent,
                navbar_component_1.NavbarComponent,
                scenario_component_1.ScenarioComponent,
                server_component_1.ServerComponent,
                sidenav_component_1.SidenavComponent,
                step_component_1.StepComponent,
                test_run_component_1.TestRunComponent,
                test_results_overall_table_component_1.TestResultsOverallTableComponent,
                test_results_by_app_chart_directive_1.TestResultsByAppChartDirective,
                test_results_by_env_chart_directive_1.TestResultsByEnvChartDirective,
                test_results_by_server_chart_directive_1.TestResultsByServerChartDirective
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map