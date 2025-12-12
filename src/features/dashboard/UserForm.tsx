import { useEffect, useState } from 'react';
import { useForm, Resolver, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { createUser, updateUser } from '@/services/userService';
import { UserData, UserFormValues } from '@/types/user';
import { getUserFormSchema } from '@/schemas/user';
import { formatDateIndo, formatDateISO, getSplitName } from '@/lib/formatters';

import EyeIcon from '@/assets/eye.svg';
import CalendarIcon from '@/assets/calendar-alt.svg';
import UploadIcon from '@/assets/cloud-arrow-up.svg';

interface UserFormProps {
    initialData?: UserData | null;
    onSuccess: () => void;
}

const UserForm = ({ initialData, onSuccess }: UserFormProps) => {
    const queryClient = useQueryClient();
    const isEditMode = !!initialData;
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDateFocused, setIsDateFocused] = useState(false);

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<UserFormValues>({
        resolver: yupResolver(getUserFormSchema(isEditMode)) as Resolver<UserFormValues>,
    });

    const dobValue = useWatch({ control, name: 'date_of_birth' });
    const photoValue = useWatch({ control, name: 'photo' });

    const currentDob = dobValue || (initialData?.date_of_birth ? formatDateISO(initialData.date_of_birth) : "");

    const getPhotoName = () => {
        if (photoValue && photoValue.length > 0) return photoValue[0].name;
        if (isEditMode) return "fotomatt.jpg";
        return "Pilih foto profil";
    };

    const dobRegister = register('date_of_birth');

    useEffect(() => {
        if (initialData) {
            const { first, last } = getSplitName(initialData);

            reset({
                first_name: first,
                last_name: last,
                email: initialData.email || '',
                phone: initialData.phone || '',
                address: initialData.address || '',
                gender: initialData.gender || 'male',
                date_of_birth: formatDateISO(initialData.date_of_birth),
                password: '*************',
                confirm_password: '*************'
            });
        }
    }, [initialData, reset]);

    const mutation = useMutation({
        mutationFn: (data: UserFormValues) => {
            if (isEditMode) {
                return updateUser({ id: initialData!._id, data });
            }
            return createUser(data);
        },
        onSuccess: () => {
            toast.success(isEditMode ? 'Berhasil disimpan' : 'Berhasil ditambah');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onSuccess();
        },
        onError: (error: AxiosError<{ err_message: string }>) => {
            toast.error(error.response?.data?.err_message || 'Gagal menyimpan');
        }
    });

    return (
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
                <Input label="Nama Depan" placeholder="Masukkan nama depan" error={errors.first_name} {...register('first_name')} />
                <Input label="Nama Belakang" placeholder="Masukkan nama belakang" error={errors.last_name} {...register('last_name')} />
            </div>

            <div className="grid grid-cols-2 gap-5">
                <Select
                    label="Jenis Kelamin"
                    placeholder="Pilih..."
                    options={[
                        { value: 'male', label: 'Laki-laki' },
                        { value: 'female', label: 'Perempuan' }
                    ]}
                    error={errors.gender}
                    {...register('gender')}
                />

                <Input
                    label="Tanggal Lahir"
                    type={isDateFocused ? "date" : "text"}
                    value={isDateFocused ? currentDob : formatDateIndo(currentDob)}
                    placeholder={isEditMode ? "" : "Masukkan email"}
                    {...dobRegister}
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={(e) => {
                        dobRegister.onBlur(e);
                        setIsDateFocused(false);
                    }}
                    error={errors.date_of_birth}
                    suffixIcon={<img src={CalendarIcon} alt="calendar" className="w-5 h-5" />}
                    className="focus:ring-[#FD5725] focus:border-[#FD5725] cursor-pointer"
                />
            </div>

            <Input label="Email" type="email" placeholder="Masukkan email" error={errors.email} {...register('email')} className="focus:ring-[#FD5725] focus:border-[#FD5725]" />

            <Input label="No. Handphone" placeholder="Masukkan no handphone" error={errors.phone} {...register('phone')} className="focus:ring-[#FD5725] focus:border-[#FD5725]" />

            <Input label="Alamat" placeholder="Masukkan alamat" error={errors.address} {...register('address')} className="focus:ring-[#FD5725] focus:border-[#FD5725]" />

            <div className="grid grid-cols-2 gap-5">
                <div className="relative">
                    <Input
                        type={showPass ? "text" : "password"}
                        label="Password"
                        placeholder="Masukkan password"
                        error={errors.password}
                        {...register('password')}
                        className="focus:ring-[#FD5725] focus:border-[#FD5725]"
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
                        className="focus:ring-[#FD5725] focus:border-[#FD5725]"
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
                        id="file-upload-form"
                        accept="image/jpeg, image/jpg"
                        {...register('photo')}
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload-form"
                        className={`flex h-[46px] w-full items-center justify-between rounded-lg border ${errors.photo ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 focus-within:ring-1 focus-within:ring-[#FD5725] focus-within:border-[#FD5725] transition-all`}
                    >
                        <span className="text-gray-500 truncate font-sans">{getPhotoName()}</span>
                        <img src={UploadIcon} alt="upload" className="w-5 h-5" />
                    </label>
                </div>
                {errors.photo && <span className="text-xs text-red-500 font-medium mt-1 block">{errors.photo.message}</span>}
            </div>

            <div className="pt-4">
                <Button type="submit" isLoading={mutation.isPending} className="bg-[#FD5725] hover:bg-orange-600 border-none text-white h-[46px] text-base font-bold font-header w-full">
                    {isEditMode ? 'Simpan' : 'Tambah User'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;