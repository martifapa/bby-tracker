export const parseLogText = (datetime: string, label: string) => {
    const text = datetime + ' ';
    switch (label) {
        case 'Sleep':
            return text + '5\' ago';
        case 'Wake up':
            return text + '30\' slept';
        case 'Eat':
            return text + '5\' ago';
        default:
            return text + '5\' ago';
    }
}

export const getLocalDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};