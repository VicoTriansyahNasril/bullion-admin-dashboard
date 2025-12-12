import { UserData } from "@/types/user";

export const formatDateIndo = (dateString: string): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch {
        return '-';
    }
};

export const formatDateISO = (dateString: string): string => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toISOString().split('T')[0];
    } catch {
        return '';
    }
};

export const formatGender = (gender: string): string => {
    if (gender === 'male') return 'Laki-laki';
    if (gender === 'female') return 'Perempuan';
    return '-';
};

export const getSplitName = (user: UserData | null | undefined) => {
    if (!user) return { first: '-', last: '-' };

    if (user.first_name || user.last_name) {
        return {
            first: user.first_name || '-',
            last: user.last_name || '-'
        };
    }

    if (user.name) {
        const parts = user.name.split(' ');
        return {
            first: parts[0] || '-',
            last: parts.slice(1).join(' ') || '-'
        };
    }

    return { first: '-', last: '-' };
};

export const getDisplayName = (user: UserData): string => {
    if (user.name) return user.name;
    if (user.first_name || user.last_name) return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    return 'User';
};