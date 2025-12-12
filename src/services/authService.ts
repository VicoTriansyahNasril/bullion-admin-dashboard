import apiClient from '@/lib/axios';
import { hashPassword } from '@/lib/security';
import { LoginResponse } from '@/types/auth';
import { LoginFormData } from '@/pages/Login';

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
    const payload = {
        email: data.email,
        password: hashPassword(data.password),
    };

    const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', payload);
    return response.data;
};