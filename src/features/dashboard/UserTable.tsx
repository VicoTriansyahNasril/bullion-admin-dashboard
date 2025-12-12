import { cn } from '@/lib/utils';
import { UserData } from '@/types/user';
import { getDisplayName } from '@/lib/formatters';
import EyeIcon from '@/assets/eye.svg';
import EditIcon from '@/assets/edit.svg';

interface UserTableProps {
    users: UserData[];
    isLoading: boolean;
    isError: boolean;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
}

const UserTable = ({ users, isLoading, isError, onView, onEdit }: UserTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="px-6 py-5 font-bold font-header text-black w-32 whitespace-nowrap align-middle">Acoount ID</th>
                        <th className="px-6 py-5 font-bold font-header text-black whitespace-nowrap align-middle">Name</th>
                        <th className="px-6 py-5 font-bold font-header text-black whitespace-nowrap align-middle">Date</th>
                        <th className="px-6 py-5 font-bold font-header text-black text-center whitespace-nowrap align-middle">Status</th>
                        <th className="px-6 py-5 font-bold font-header text-black text-center whitespace-nowrap align-middle">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading...</td></tr>
                    ) : isError ? (
                        <tr><td colSpan={5} className="p-8 text-center text-red-500">Error memuat data</td></tr>
                    ) : users.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-400">Tidak ada data</td></tr>
                    ) : (
                        users.map((user, idx) => (
                            <tr
                                key={user._id}
                                className={cn(
                                    "transition-opacity h-[72px]",
                                    idx % 2 === 0 ? 'bg-[#FFF5F0]' : 'bg-white'
                                )}
                            >
                                <td className="px-6 font-medium font-header text-black align-middle">
                                    #{user._id.slice(-5)}
                                </td>
                                <td className="px-6 text-black font-medium font-header align-middle">
                                    {getDisplayName(user)}
                                </td>
                                <td className="px-6 text-black font-header align-middle">
                                    {new Date(user.date_of_birth).toLocaleDateString('en-GB')}
                                </td>
                                <td className="px-6 text-center align-middle">
                                    <span className="inline-flex items-center justify-center w-[160px] py-2 rounded-full text-xs font-bold bg-[#E0F7EF] text-[#2E7D32] font-header">
                                        Registered
                                    </span>
                                </td>
                                <td className="px-6 align-middle">
                                    <div className="flex justify-center items-center gap-6">
                                        <button
                                            onClick={() => onView(user._id)}
                                            className="text-[#FD5725] hover:text-orange-700 flex items-center gap-2 text-sm font-medium font-header"
                                        >
                                            <img src={EyeIcon} alt="Lihat" className="w-[18px] h-[18px]" />
                                            Lihat
                                        </button>
                                        <button
                                            onClick={() => onEdit(user._id)}
                                            className="text-[#FD5725] hover:text-orange-700 flex items-center gap-2 text-sm font-medium font-header"
                                        >
                                            <img src={EditIcon} alt="Edit" className="w-[18px] h-[18px]" />
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;