import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Modal from '@/components/ui/Modal';
import Pagination from '@/components/ui/Pagination';
import DashboardHeader from '@/features/dashboard/DashboardHeader';
import UserTable from '@/features/dashboard/UserTable';
import UserForm from '@/features/dashboard/UserForm';
import UserDetailView from '@/features/dashboard/UserDetailView';

import { getUsers, getUserDetail } from '@/services/userService';
import { UserData } from '@/types/user';

const Dashboard = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create');
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', page],
        queryFn: () => getUsers(page),
        placeholderData: (prev) => prev,
    });

    const userList = data?.data || [];
    const hasMoreData = userList.length === 10;
    const showHeaderButton = isModalOpen && (modalType === 'view' || modalType === 'edit');

    const fetchDetail = async (id: string, type: 'edit' | 'view') => {
        try {
            const detail = await getUserDetail(id);
            if (detail) {
                setSelectedUser(detail);
                setModalType(type);
                setIsModalOpen(true);
            } else {
                toast.error('Data user tidak ditemukan');
            }
        } catch {
            toast.error('Gagal ambil data');
        }
    };

    const handleOpenCreate = () => {
        setSelectedUser(null);
        setModalType('create');
        setIsModalOpen(true);
    };

    const getModalTitle = () => {
        if (modalType === 'create') return 'Tambah User';
        if (modalType === 'edit') return 'Edit User';
        return 'Lihat User';
    };

    return (
        <div className="space-y-4">
            <DashboardHeader
                onAddUser={handleOpenCreate}
                showButton={showHeaderButton}
            />

            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 min-h-[500px]">
                <UserTable
                    users={userList}
                    isLoading={isLoading}
                    isError={isError}
                    onView={(id) => fetchDetail(id, 'view')}
                    onEdit={(id) => fetchDetail(id, 'edit')}
                />

                <Pagination
                    currentPage={page}
                    hasMoreData={hasMoreData}
                    onPageChange={setPage}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={getModalTitle()}
            >
                {modalType === 'view' && selectedUser ? (
                    <UserDetailView
                        user={selectedUser}
                        onEditClick={() => setModalType('edit')}
                    />
                ) : (
                    <UserForm
                        initialData={selectedUser}
                        onSuccess={() => setIsModalOpen(false)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Dashboard;