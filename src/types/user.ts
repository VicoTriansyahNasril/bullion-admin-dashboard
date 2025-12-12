export interface UserData {
    _id: string;
    name: string;
    first_name?: string;
    last_name?: string;

    gender: 'male' | 'female';
    email: string;
    phone: string;
    address: string;
    date_of_birth: string;
    photo?: string;
}

export interface UserListResponse {
    status: number;
    iserror: boolean;
    message: string;
    data: UserData[];
}

export interface UserFormValues {
    first_name: string;
    last_name: string;
    gender: 'male' | 'female';
    date_of_birth: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
    confirm_password?: string;
    photo?: FileList;
}