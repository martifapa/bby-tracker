
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

export const getMinutesDifference = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const minutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000*60));
    return getElapsedTimeString(minutes);
}

export const getElapsedTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let timeString = '';
    if (hours > 0) {
        timeString += `${hours}h`;
    }
    if (remainingMinutes > 0 || hours === 0) {
        timeString += `${hours > 0 ? ' ' : ''}${remainingMinutes}'`
    }

    return timeString;
}

export const getToday = (): {todayDate: string, todayDatetime: string} => {
    const todayDatetime = new Date().toJSON()
    const todayDate = todayDatetime.slice(0, 10);
    return { todayDate, todayDatetime };
}