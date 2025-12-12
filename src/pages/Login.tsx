import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { loginUser } from '@/services/authService';
import { loginSchema } from '@/schemas/auth';
import LoginBg from '@/assets/Left Panel Login.png';

export type LoginFormData = yup.InferType<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                name: response.data.name,
                email: response.data.email
            }));
            toast.success('Login Berhasil!');
            navigate('/admin');
        },
        onError: (error: AxiosError<{ err_message: string; message?: string }>) => {
            const apiError = error.response?.data?.err_message;
            const generalMessage = error.response?.data?.message;
            const defaultError = 'Gagal terhubung ke server atau kredensial salah';
            toast.error(apiError || generalMessage || defaultError);
        },
    });

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <div className="hidden md:block w-[548px] h-full flex-shrink-0 relative">
                <img
                    src={LoginBg}
                    alt="Background"
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="flex-1 flex flex-col items-center bg-white overflow-y-auto">
                <div className="pt-[80px] px-8 w-full flex flex-col items-center">
                    <div className="w-[405px] space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-[32px] font-bold text-gray-900 font-header leading-tight">
                                Login Admin
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit((d) => loginMutation.mutate(d))} className="space-y-6">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Masukkan email"
                                error={errors.email}
                                {...register('email')}
                                className="font-header placeholder:text-gray-400"
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Masukkan password"
                                    error={errors.password}
                                    {...register('password')}
                                    className="font-header placeholder:text-gray-400"
                                />
                            </div>

                            <Button type="submit" isLoading={loginMutation.isPending} className="mt-6 bg-[#FD5725] hover:bg-orange-600 border-none text-white h-[46px] text-base font-bold font-header">
                                Masuk
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;