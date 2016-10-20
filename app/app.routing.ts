import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { ServerComponent } from './components/server.component';

const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'results/:environmentName/:serverName',
        component: ServerComponent
    }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

