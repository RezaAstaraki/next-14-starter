export const formatToPersianNumber = (num: number | null | undefined): string => {
    if (num === undefined || num === null) return '';
    // return new Intl.NumberFormat('fa-IR').format(num / 10);
    return (num / 10).toLocaleString('fa-IR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } catch (e) {
        return dateString || '';
    }
};
