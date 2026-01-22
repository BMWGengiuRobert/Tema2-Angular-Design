import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Forbidden403Page } from './pages/forbidden-403-page/forbidden-403-page';

export const routes: Routes = [
    {
        path: '', component: HomePage
    },
    {
        path: 'home', component: HomePage
    },
    {
        path: 'inbox', component: Forbidden403Page
    },
    {
        path: '**', redirectTo: 'home'
    }
];
