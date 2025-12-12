export interface LoginResponse {
    status: number;
    iserror: boolean;
    message: string;
    data: {
        name: string;
        email: string;
        token: string;
    };
}

export interface User {
    name: string;
    email: string;
}