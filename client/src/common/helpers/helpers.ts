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

export const getLocalDateTime = (datetime: null|string=null): string => {
    let date;
    if (datetime) {
        date = new Date(datetime);
    } else {
        date = new Date();
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
