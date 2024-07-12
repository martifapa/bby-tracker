import { Log } from "../types";


export const toCapitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const parseLogText = (datetime: string, label: string, logs: Log[]) => {
    const { todayDate, todayDatetime } = getToday();
    const date = datetime.slice(0, 10);
    const shortDate = date.slice(2);
    const time = datetime.slice(-5);

    const isToday = date === todayDate;
    let logParts = [];

    switch (label) {
        case 'Wake up':
            // eslint-disable-next-line no-case-declarations
            const sleepLog = logs.find(log =>
                log.label === 'Sleep'
                && new Date(log.datetime) < new Date(datetime));
            // eslint-disable-next-line no-case-declarations
            const minutesSlept = sleepLog ? getMinutesDifference(sleepLog.datetime, datetime) : 0;
            
            if (isToday) {
                logParts = [time, `slept for ${minutesSlept}`];
            } else {
                logParts = [shortDate, `${time} slept for ${minutesSlept}`];
            }
            return logParts;
        default:
            // eslint-disable-next-line no-case-declarations
            const minutesAgo = getMinutesDifference(datetime, todayDatetime)
            if (isToday) {
                logParts = [time, `${minutesAgo} ago`];
            } else {
                logParts = [shortDate, time]
            }
            return logParts;
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

const getMinutesDifference = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const minutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000*60));
    return getElapsedTimeString(minutes);
}

const getElapsedTimeString = (minutes: number): string => {
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

const getToday = (): {todayDate: string, todayDatetime: string} => {
    const todayDatetime = new Date().toJSON()
    const todayDate = todayDatetime.slice(0, 10);
    return { todayDate, todayDatetime };
}
