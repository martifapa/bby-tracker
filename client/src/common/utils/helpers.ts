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
    
    const sortedLogs = [...logs].sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    sortedLogs.forEach(log => {
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
    const eatLogs = logs.filter(log => log.label === 'Eat');
    
    // Group logs by date
    const logsByDate: { [date: string]: Log[] } = eatLogs.reduce((acc, log) => {
        const date = log.datetime.split(' ')[0];
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
        count.sort((a, b) => a - b);
        const timeSpans = count.slice(1).map((time, index) => (time - count[index]) / (1000 * 60)); // Difference in minutes
        const averageSpan = timeSpans.reduce((a, b) => a + b, 0) / timeSpans.length;

        return {
            date,
            times,
            averageSpan: isNaN(averageSpan) ? 0 : averageSpan
        };
    });

    return stats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export const calculateSummaryStat = (logs: Log[], logType: string): {
    times: number, cadence: string, total: string | null
} => {
    const today = new Date().toISOString().split('T')[0];
    const filteredLogs = logs.filter(log => log.label.toLowerCase() === logType && log.datetime.startsWith(today));

    const times = filteredLogs.length;

    if (times === 0) {
        return { times, cadence: 'N/A', total: null };
    }

    filteredLogs.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    let total = null;
    let cadence = 'N/A';

    if (logType === 'sleep') {
        let totalSleepHours = 0;
        for (let i = 0; i < filteredLogs.length; i += 2) {
            if (filteredLogs[i] && filteredLogs[i + 1]) {
                const sleepStart = new Date(filteredLogs[i].datetime);
                const wakeUp = new Date(filteredLogs[i + 1].datetime);
                totalSleepHours += (wakeUp.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
            }
        }
        const totalHours = Math.floor(totalSleepHours);
        const totalMinutes = Math.round((totalSleepHours % 1) * 60);

        if (totalHours === 0) {
            total = `${totalMinutes}'`;
        } else if (totalMinutes === 0) {
            total = `${totalHours}h`;
        } else {
            total = `${totalHours}h ${totalMinutes}'`;
        }
    }

    if (times > 1) {
        let totalInterval = 0;
        for (let i = 1; i < filteredLogs.length; i++) {
            const prevLogTime = new Date(filteredLogs[i - 1].datetime).getTime();
            const currentLogTime = new Date(filteredLogs[i].datetime).getTime();
            totalInterval += (currentLogTime - prevLogTime);
        }
        const averageInterval = totalInterval / (times - 1);
        const averageHours = Math.floor(averageInterval / (1000 * 60 * 60));
        const averageMinutes = Math.round((averageInterval % (1000 * 60 * 60)) / (1000 * 60));
        
        if (averageHours === 0) {
            cadence = `${averageMinutes}'`;
        } else if (averageMinutes === 0) {
            cadence = `${averageHours}h`;
        } else {
            cadence = `${averageHours}h ${averageMinutes}'`;
        }
    }

    return { times, cadence, total };
}