import * as yup from 'yup';

export const getUserFormSchema = (isEditMode: boolean) => {
    return yup.object({
        first_name: yup.string().required('Wajib diisi'),
        last_name: yup.string().required('Wajib diisi'),
        gender: yup.string().oneOf(['male', 'female'], 'Pilih gender').required() as yup.StringSchema<'male' | 'female'>,
        date_of_birth: yup.string().required('Wajib diisi'),
        email: yup.string().email('Format salah').required('Wajib diisi'),
        phone: yup.string().matches(/^[0-9]+$/, 'Hanya angka').required('Wajib diisi'),
        address: yup.string().required('Wajib diisi'),
        password: yup.string().min(8, 'Min 8 char').required('Wajib diisi'),
        confirm_password: yup.string().oneOf([yup.ref('password')], 'Password beda').required('Wajib diisi'),
        photo: yup.mixed<FileList>().when([], {
            is: () => !isEditMode,
            then: (schema) => schema.test('required', 'Wajib upload', (v) => v && v.length > 0),
            otherwise: (schema) => schema.notRequired(),
        }),
    });
};