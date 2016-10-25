"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var server_component_1 = require('./components/server/server.component');
var appRoutes = [
    {
        path: '',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'results/:environmentName/:serverName',
        component: server_component_1.ServerComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map