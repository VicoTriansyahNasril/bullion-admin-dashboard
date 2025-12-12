import Button from '@/components/ui/Button';

interface DashboardHeaderProps {
    onAddUser: () => void;
    showButton: boolean;
}

const DashboardHeader = ({ onAddUser, showButton }: DashboardHeaderProps) => {
    return (
        <div className="bg-white px-8 py-6 rounded-lg shadow-sm mb-6 flex justify-between items-center">
            <h1 className="text-[32px] font-bold text-[#231F20] font-header">
                User Aktif
            </h1>

            {showButton && (
                <Button
                    onClick={onAddUser}
                    className="bg-[#FD5725] hover:bg-[#e0481d] text-white rounded-[8px] font-bold font-header text-sm h-[46px] w-[200px] shadow-sm"
                >
                    Tambah User
                </Button>
            )}
        </div>
    );
};

export default DashboardHeader;