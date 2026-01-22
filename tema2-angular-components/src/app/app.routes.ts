import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { roleGuard } from './guards/role-guard';
import { AdminPage } from './pages/admin-page/admin-page';
import { Forbidden403Page } from './pages/forbidden-403-page/forbidden-403-page';

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
        path: '**', redirectTo: 'home'
    }
];
