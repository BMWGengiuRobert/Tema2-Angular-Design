export interface User {
    id: number;
    firstName: string;
    lastName: string;
    color: string;
}

export const USERS: User[] = [
    { id: 1, firstName: 'Coutrney', lastName: 'Henry', color: '#ca74dd' },
    { id: 2, firstName: 'Albert', lastName: 'Flores', color: '#74a9dd' },
    { id: 3, firstName: 'Dianne', lastName: 'Russell', color: '#74ddaa' },
    { id: 4, firstName: 'Jenny', lastName: 'Wilson', color: '#dddd74' },
    { id: 5, firstName: 'Cameron', lastName: 'William', color: '#aa74dd' },
]