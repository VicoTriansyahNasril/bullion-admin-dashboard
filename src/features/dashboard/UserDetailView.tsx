import Button from '@/components/ui/Button';
import { UserData } from '@/types/user';
import { formatDateIndo, formatGender, getSplitName } from '@/lib/formatters';

interface UserDetailViewProps {
    user: UserData;
    onEditClick: () => void;
}

const InfoItem = ({ label, value, className }: { label: string; value: string; className?: string }) => (
    <div className={className}>
        <label className="block text-sm font-bold font-header text-black">{label}</label>
        <p className="text-base text-[#231F20] font-sans leading-relaxed">{value}</p>
    </div>
);

const UserDetailView = ({ user, onEditClick }: UserDetailViewProps) => {
    const { first, last } = getSplitName(user);

    return (
        <div className="flex flex-col pb-2 px-2">
            <div className="mb-8 flex flex-col items-center">
                <h4 className="text-sm font-bold font-header text-black mb-4">Foto Profil</h4>
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-100">
                    <img
                        src={`data:image/jpeg;base64,${user.photo}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=User'; }}
                        alt="Profile"
                    />
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6">
                <InfoItem label="Nama Depan" value={first} className="space-y-2" />
                <InfoItem label="Nama Belakang" value={last} className="space-y-2" />
                <InfoItem label="Jenis Kelamin" value={formatGender(user.gender)} className="space-y-2" />
                <InfoItem label="Tanggal Lahir" value={formatDateIndo(user.date_of_birth)} className="space-y-2" />

                <InfoItem label="Email" value={user.email} className="col-span-2 space-y-2" />
                <InfoItem label="No. Handphone" value={user.phone} className="col-span-2 space-y-2" />
                <InfoItem label="Alamat" value={user.address} className="col-span-2 space-y-2" />
            </div>

            <div className="w-full mt-10">
                <Button
                    onClick={onEditClick}
                    className="bg-[#FD5725] hover:bg-orange-600 border-none text-white h-[46px] text-base font-bold font-header w-full"
                >
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default UserDetailView;