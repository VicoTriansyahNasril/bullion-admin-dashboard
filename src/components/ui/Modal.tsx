import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: 'max-w-md' | 'max-w-lg' | 'max-w-2xl' | 'max-w-4xl';
}

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 transition-opacity">
            <div
                className={cn(
                    "bg-white rounded-xl shadow-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200",
                    maxWidth
                )}
            >
                <div className="flex items-center justify-between p-6 pb-0">
                    <h2 className="text-2xl font-bold text-gray-900 font-header">{title}</h2>
                    <button
                        onClick={onClose}
                        className="bg-[#FD5725] text-white p-1 rounded-full hover:bg-orange-600 transition-colors"
                    >
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;