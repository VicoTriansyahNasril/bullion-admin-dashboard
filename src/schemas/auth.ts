import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
    password: yup.string().min(8, 'Minimal 8 karakter').required('Password wajib diisi'),
}).required();

export const registerSchema = yup.object({
    first_name: yup.string().required('Wajib diisi'),
    last_name: yup.string().required('Wajib diisi'),
    gender: yup.string().oneOf(['male', 'female'], 'Pilih gender').required() as yup.StringSchema<'male' | 'female'>,
    date_of_birth: yup.string().required('Wajib diisi'),
    email: yup.string().email('Format salah').required('Wajib diisi'),
    phone: yup.string().matches(/^[0-9]+$/, 'Hanya angka').required('Wajib diisi'),
    address: yup.string().required('Wajib diisi'),
    password: yup.string().min(8, 'Min 8 char').matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Huruf & Angka').matches(/^(?=.*[A-Z])/, 'Huruf Kapital').required('Wajib diisi'),
    confirm_password: yup.string().oneOf([yup.ref('password')], 'Password beda').required('Wajib diisi'),
    photo: yup.mixed<FileList>()
        .test('required', 'Wajib upload', (v) => v && v.length > 0)
        .test('fileSize', 'Max 5MB', (v) => !v || !v[0] || v[0].size <= 5000000)
        .test('fileType', 'JPG/JPEG', (v) => !v || !v[0] || ['image/jpeg', 'image/jpg'].includes(v[0].type)),
});