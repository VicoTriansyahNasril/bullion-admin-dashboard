import { useState } from 'react';
import { useForm, Resolver, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { createUser } from '@/services/userService';
import { UserFormValues } from '@/types/user';
import { registerSchema } from '@/schemas/auth';

import RegisterBg from '@/assets/Left Panel Register.png';
import EyeIcon from '@/assets/eye.svg';
import CalendarIcon from '@/assets/calendar-alt.svg';
import UploadIcon from '@/assets/cloud-arrow-up.svg';

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [dateType, setDateType] = useState('text');

    const { register, handleSubmit, control, formState: { errors } } = useForm<UserFormValues>({
        resolver: yupResolver(registerSchema) as Resolver<UserFormValues>,
    });

    const photoValue = useWatch({ control, name: 'photo' });
    const photoName = photoValue && photoValue[0] ? photoValue[0].name : "Pilih foto profil";

    const dobRegister = register('date_of_birth');

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success('Registrasi Berhasil! Silakan login.');
            navigate('/login');
        },
        onError: (error: AxiosError<{ err_message: string }>) => {
            if (error.response) {
                toast.error(error.response.data?.err_message || 'Gagal registrasi');
            } else {
                toast.error('Gagal terhubung ke server');
            }
        }
    });

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <div className="hidden md:block w-[548px] h-full flex-shrink-0 relative">
                <img
                    src={RegisterBg}
                    alt="Background"
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
                <div className="flex flex-col items-center pt-[80px] pb-10 px-8 min-h-full">

                    <div className="w-[405px]">
                        <h2 className="text-[32px] font-bold text-gray-900 font-header leading-tight mb-8 text-left">
                            Daftar
                        </h2>

                        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Nama Depan"
                                    placeholder="Masukkan email"
                                    error={errors.first_name}
                                    {...register('first_name')}
                                />
                                <Input
                                    label="Nama Belakang"
                                    placeholder="Masukkan email"
                                    error={errors.last_name}
                                    {...register('last_name')}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    label="Jenis Kelamin"
                                    placeholder="Pilih jenis kelamin"
                                    options={[
                                        { value: 'male', label: 'Laki-laki' },
                                        { value: 'female', label: 'Perempuan' }
                                    ]}
                                    error={errors.gender}
                                    {...register('gender')}
                                    className="focus:ring-[#2E74B2] focus:border-[#2E74B2] placeholder:text-gray-400"
                                />

                                <Input
                                    type={dateType}
                                    onFocus={() => setDateType('date')}
                                    {...dobRegister}
                                    onBlur={(e) => {
                                        dobRegister.onBlur(e);
                                        if (!e.target.value) setDateType('text');
                                    }}
                                    label="Tanggal Lahir"
                                    placeholder="Masukkan email"
                                    error={errors.date_of_birth}
                                    suffixIcon={<img src={CalendarIcon} alt="calendar" className="w-5 h-5" />}
                                    className="focus:ring-[#2E74B2] focus:border-[#2E74B2] cursor-pointer"
                                />
                            </div>

                            <Input label="Email" type="email" placeholder="Masukkan email" error={errors.email} {...register('email')} className="focus:ring-[#2E74B2] focus:border-[#2E74B2]" />

                            <Input label="No. Handphone" placeholder="Masukkan no handphone" error={errors.phone} {...register('phone')} className="focus:ring-[#2E74B2] focus:border-[#2E74B2]" />

                            <Input label="Alamat" placeholder="Masukkan alamat" error={errors.address} {...register('address')} className="focus:ring-[#2E74B2] focus:border-[#2E74B2]" />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <Input
                                        type={showPass ? "text" : "password"}
                                        label="Password"
                                        placeholder="Masukkan password"
                                        error={errors.password}
                                        {...register('password')}
                                        className="focus:ring-[#2E74B2] focus:border-[#2E74B2]"
                                    />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[42px]">
                                        <img src={EyeIcon} alt="toggle password" className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        type={showConfirm ? "text" : "password"}
                                        label="Konfirmasi Password"
                                        placeholder="Konfirmasi password"
                                        error={errors.confirm_password}
                                        {...register('confirm_password')}
                                        className="focus:ring-[#2E74B2] focus:border-[#2E74B2]"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-[42px]">
                                        <img src={EyeIcon} alt="toggle password" className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black font-header block tracking-wide">Foto Profil</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="file-upload-reg"
                                        accept="image/jpeg, image/jpg"
                                        {...register('photo')}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file-upload-reg"
                                        className={`flex h-[46px] w-full items-center justify-between rounded-lg border ${errors.photo ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 focus-within:ring-1 focus-within:ring-[#2E74B2] focus-within:border-[#2E74B2] transition-all`}
                                    >
                                        <span className="text-gray-500 truncate font-sans">{photoName}</span>
                                        <img src={UploadIcon} alt="upload" className="w-5 h-5" />
                                    </label>
                                </div>
                                {errors.photo && <span className="text-xs text-red-500 font-medium mt-1 block">{errors.photo.message}</span>}
                            </div>

                            <div className="pt-2">
                                <Button type="submit" isLoading={mutation.isPending} className="bg-[#2E74B2] hover:bg-blue-700 border-none text-white h-[46px] text-base font-bold font-header">
                                    Tambah
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;