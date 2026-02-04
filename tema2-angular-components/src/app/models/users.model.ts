export interface User {
    id: number;
    firstName: string;
    lastName: string;
    color: string;
    password: string;
}

export const USERS: User[] = [
    { id: 1, firstName: 'Coutrney', lastName: 'Henry', color: '#ca74dd', password: 'abcd1234A@' },
    { id: 2, firstName: 'Albert', lastName: 'Flores', color: '#74a9dd', password: 'abcd1234A@' },
    { id: 3, firstName: 'Dianne', lastName: 'Russell', color: '#74ddaa', password: 'abcd1234A@' },
    { id: 4, firstName: 'Jenny', lastName: 'Wilson', color: '#dddd74', password: 'abcd1234A@' },
    { id: 5, firstName: 'Cameron', lastName: 'William', color: '#aa74dd', password: 'abcd1234A@' },
]