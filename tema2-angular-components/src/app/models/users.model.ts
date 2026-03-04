export interface User {
    id: number;
    firstName: string;
    lastName: string;
    color: string;
    password: string;
    email: string;
    username: string;
}

export const USERS: User[] = [
    { id: 1, firstName: 'Coutrney', lastName: 'Henry', color: '#ca74dd', password: 'abcd1234A@', email: 'courtney.henry@example.com', username: 'courtney.henry' },
    { id: 2, firstName: 'Albert', lastName: 'Flores', color: '#74a9dd', password: 'abcd1234A@', email: 'albert.flores@example.com', username: 'albert.flores' },
    { id: 3, firstName: 'Dianne', lastName: 'Russell', color: '#74ddaa', password: 'abcd1234A@', email: 'dianne.russell@example.com', username: 'dianne.russell' },
    { id: 4, firstName: 'Jenny', lastName: 'Wilson', color: '#dddd74', password: 'abcd1234A@', email: 'jenny.wilson@example.com', username: 'jenny.wilson' },
    { id: 5, firstName: 'Cameron', lastName: 'William', color: '#aa74dd', password: 'abcd1234A@', email: 'cameron.william@example.com', username: 'cameron.william' },
]