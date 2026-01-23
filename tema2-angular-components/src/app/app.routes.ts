import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { roleGuard } from './guards/role-guard';
import { AdminPage } from './pages/admin-page/admin-page';
import { Forbidden403Page } from './pages/forbidden-403-page/forbidden-403-page';
import { NotFound404 } from './pages/not-found-404/not-found-404';
import { InternalServerError500 } from './pages/internal-server-error-500/internal-server-error-500';
import { BadGateway502 } from './pages/bad-gateway-502/bad-gateway-502';
import { Unauthorized401 } from './pages/unauthorized-401/unauthorized-401';

export const routes: Routes = [
    {
        path: '', component: HomePage
    },
    {
        path: 'home', component: HomePage
    },
    {
        path: 'admin', component: AdminPage, canActivate: [roleGuard]
    },
    {
        path: '403-forbidden', component: Forbidden403Page
    },
    {
        path: '404-not-found', component: NotFound404
    },
    {
        path: '500-internal-server-error', component: InternalServerError500
    },
    {
        path: '502-bad-gateway', component: BadGateway502
    },
    {
        path: '401-unauthorized', component: Unauthorized401
    },
    {
        path: '**', redirectTo: '404-not-found'
    }
];
