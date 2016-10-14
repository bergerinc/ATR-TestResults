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
var app_component_1 = require('./app.component');
var environment_component_1 = require('./components/environment.component');
var application_component_1 = require('./components/application.component');
var server_component_1 = require('./components/server.component');
var test_run_component_1 = require('./components/test-run.component');
var feature_component_1 = require('./components/feature.component');
var scenario_component_1 = require('./components/scenario.component');
var step_component_1 = require('./components/step.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                environment_component_1.EnvironmentComponent,
                application_component_1.ApplicationComponent,
                server_component_1.ServerComponent,
                test_run_component_1.TestRunComponent,
                feature_component_1.FeatureComponent,
                scenario_component_1.ScenarioComponent,
                step_component_1.StepComponent
            ],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map