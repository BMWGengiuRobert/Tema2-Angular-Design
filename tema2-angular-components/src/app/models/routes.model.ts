export interface Route {
    id: number;
    name: string;
    path: string;
    icon: string;
}

export const ROUTES = [
    {id: 1, name: 'Home', path: '/home', icon: 'fa fa-home' },
    {id: 2, name: 'Prodify Ai', path: '/prodify-ai', icon: 'fa-regular fa-star' },
    {id: 3, name: 'My Tasks', path: '/my-tasks', icon: 'fa fa-tasks' },
    {id: 4, name: 'Inbox', path: '/inbox', icon: 'fa fa-inbox' },
    {id: 5, name: 'Calendar', path: '/calendar', icon: 'fa-regular fa-calendar' },
    {id: 6, name: 'Reports & Analytics', path: '/reports-analytics', icon: 'fa-regular fa-chart-bar' },
];