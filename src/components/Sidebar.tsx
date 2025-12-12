import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import LogoBullion from '@/assets/logo-bullion.png';
import SidebarToggleIcon from '@/assets/sidebar-toggle.svg';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/admin' && location.pathname.startsWith('/admin')) return true;
        return location.pathname === path;
    };

    const menuItems = [
        { label: 'User Aktif', path: '/admin', isMain: true },
        { label: 'Menu 2', path: '/menu-2', isMain: false },
        { label: 'Menu 3', path: '/menu-3', isMain: false },
        { label: 'Menu 4', path: '/menu-4', isMain: false },
        { label: 'Menu 5', path: '/menu-5', isMain: false },
    ];

    return (
        <aside
            className={cn(
                "bg-white h-full flex flex-col shadow-sm transition-all duration-300 z-30 fixed md:relative border-r border-gray-100",
                isOpen ? "w-[260px] translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0 overflow-hidden"
            )}
        >
            <div className="h-[80px] flex items-center justify-between px-6 mb-4">
                <img
                    src={LogoBullion}
                    alt="Bullion"
                    className={cn("w-[104px] h-[32px] object-contain transition-opacity", !isOpen && "opacity-0")}
                />

                <button
                    onClick={toggleSidebar}
                    className="focus:outline-none hover:opacity-70 transition-opacity"
                >
                    <img
                        src={SidebarToggleIcon}
                        alt="Toggle Sidebar"
                        className="w-[24px] h-[24px]"
                    />
                </button>
            </div>
            <nav className="flex-1 space-y-1">
                {menuItems.map((item, idx) => {
                    const active = isActive(item.path);
                    return (
                        <div
                            key={idx}
                            onClick={() => item.isMain ? navigate(item.path) : toast.error('Menu belum tersedia')}
                            className={cn(
                                "flex items-center px-6 h-[45px] cursor-pointer transition-all duration-200 group",
                                active
                                    ? "bg-[#FD5725] text-white"
                                    : "text-[#231F20] hover:bg-gray-50"
                            )}
                        >
                            <div
                                className="w-[14px] h-[14px] bg-[#5D2E2E] rounded-[2px] flex-shrink-0 mr-[12px]"
                            />

                            <span
                                className={cn(
                                    "text-sm font-header whitespace-nowrap tracking-wide",
                                    !isOpen && "hidden",
                                    active ? "font-bold" : "font-medium"
                                )}
                            >
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;