export interface FormUserData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    country: string;
    city: string;
    homeAddress: string;
    zipCode: string;
    phoneNumber: string;
    luckyNumber: number | string | null;
}

export interface LoginData {
    username: string;
    password: string;
}