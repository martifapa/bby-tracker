import { FeedData, Log, SleepData } from "../types";
import { DAY_END, DAY_START } from "../constants";
import { getMinutesDifference, getToday } from "./time";


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


export const calculateSleepHours = (logs: Log[]): SleepData[] => {
    const sleepData: { [date: string]: { total: number, day: number, night: number } } = {};

    let sleepStart: Date | null = null;

    logs.forEach(log => {
        if (log.label === 'Sleep') {
            sleepStart = new Date(log.datetime);
        } else if (log.label === 'Wake up' && sleepStart) {
            const wakeUp = new Date(log.datetime);
            const sleepDate = sleepStart.toISOString().split('T')[0];
            const wakeDate = wakeUp.toISOString().split('T')[0];

            const sleepHours = (wakeUp.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);

            if (!sleepData[sleepDate]) {
                sleepData[sleepDate] = { total: 0, day: 0, night: 0 };
            }
            if (!sleepData[wakeDate]) {
                sleepData[wakeDate] = { total: 0, day: 0, night: 0 };
            }

            sleepData[sleepDate].total += sleepHours;

            const dayStart = new Date(sleepStart);
            dayStart.setHours(DAY_START, 0, 0, 0);

            const dayEnd = new Date(sleepStart);
            dayEnd.setHours(DAY_END, 0, 0, 0);

            if (sleepStart < dayStart && wakeUp <= dayStart) { // Entire sleep within nighttime before 6 AM
                sleepData[sleepDate].night += sleepHours;
            } else if (sleepStart >= dayStart && wakeUp <= dayEnd) { // Entire sleep within daytime
                sleepData[sleepDate].day += sleepHours;
            } else if (sleepStart >= dayEnd && wakeUp > dayEnd) { // Entire sleep within nighttime after 6 PM
                sleepData[sleepDate].night += sleepHours;
            } else { // Sleep spans both day and night
                if (sleepStart < dayStart) {
                    const nightSleep = (dayStart.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
                    sleepData[sleepDate].night += nightSleep;
                    sleepData[sleepDate].day += sleepHours - nightSleep;
                } else if (wakeUp > dayEnd) {
                    const daySleep = (dayEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
                    sleepData[sleepDate].day += daySleep;
                    sleepData[sleepDate].night += sleepHours - daySleep;
                } else {
                    const nightSleep = (dayStart.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
                    const daySleep = sleepHours - nightSleep;
                    sleepData[sleepDate].night += nightSleep;
                    sleepData[sleepDate].day += daySleep;
                }
            }

            sleepStart = null;
        }
    });

    const result = Object.keys(sleepData).map(date => ({
        date,
        totalHours: Math.round(sleepData[date].total * 10) / 10,
        daytimeHours: Math.round(sleepData[date].day * 10) / 10,
        nighttimeHours: Math.round(sleepData[date].night * 10) / 10,
    }));

    return result.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

export const calculateFeedTimes = (logs: Log[]): FeedData[] => {
    // Filter out only the logs that have the label "Eat"
    const eatLogs = logs.filter(log => log.label === 'Eat');
    
    // Group logs by date
    const logsByDate: { [date: string]: Log[] } = eatLogs.reduce((acc, log) => {
        const date = log.datetime.split(' ')[0]; // Extract the date part from datetime
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(log);
        return acc;
    }, {} as { [date: string]: Log[] });

    // Calculate the stats for each date
    const stats = Object.keys(logsByDate).map(date => {
        const dateLogs = logsByDate[date];
        const times = dateLogs.length;

        // Calculate the average time between eats in minutes
        const count = dateLogs.map(log => new Date(log.datetime).getTime());
        const timeSpans = count.slice(1).map((time, index) => (time - count[index]) / (1000 * 60)); // Difference in minutes
        const averageSpan = timeSpans.reduce((a, b) => a + b, 0) / timeSpans.length;

        return {
            date,
            times,
            averageSpan: isNaN(averageSpan) ? 0 : averageSpan
        };
    });

    return stats;
}
