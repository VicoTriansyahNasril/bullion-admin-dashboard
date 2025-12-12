import apiClient from '@/lib/axios';
import { hashPassword } from '@/lib/security';
import { UserListResponse, UserData, UserFormValues } from '@/types/user';

const DEFAULT_LIMIT = 10;

export const getUsers = async (page: number): Promise<UserListResponse> => {
    const offset = (page - 1) * DEFAULT_LIMIT;
    const response = await apiClient.get<UserListResponse>(
        `/api/v1/admin?offset=${offset}&limit=${DEFAULT_LIMIT}`
    );
    return response.data;
};

export const getUserDetail = async (id: string): Promise<UserData> => {
    const response = await apiClient.get<{ data: UserData }>(`/api/v1/admin/${id}`);
    return response.data.data;
};

export const createUser = async (data: UserFormValues) => {
    const formData = new FormData();

    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('phone', data.phone);
    formData.append('address', data.address);

    const isoDate = new Date(data.date_of_birth).toISOString();
    formData.append('date_of_birth', isoDate);

    if (data.password) formData.append('password', hashPassword(data.password));
    if (data.confirm_password) formData.append('confirm_password', hashPassword(data.confirm_password));

    if (data.photo && data.photo[0]) {
        formData.append('photo', data.photo[0]);
    }

    const response = await apiClient.post('/api/v1/auth/register', formData);
    return response.data;
};

export const updateUser = async ({ id, data }: { id: string; data: UserFormValues }) => {
    const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        date_of_birth: new Date(data.date_of_birth).toISOString(),
        email: data.email,
        phone: data.phone,
        address: data.address
    };

    const response = await apiClient.put(`/api/v1/admin/${id}/update`, payload);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/admin/${id}/delete`);
};