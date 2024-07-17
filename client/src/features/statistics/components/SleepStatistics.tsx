import SleepStatistic from "./SleepStatistic";
import { useEffect, useState } from "react";
import { Log, SleepData } from "../../../common/types";
import { calculateSleepHours } from "../../../common/helpers";


interface Props {
    daterangeView: string | null,
    logs: Log[]
}


const SleepStatistics = ({ daterangeView, logs }: Props) => {
    const [data, setData] = useState<SleepData[]>([]);
    const [visibleData, setVisibleData] = useState<SleepData[]>([]);

    useEffect(() => {
        const firstSleepData = calculateSleepHours(logs);
        setData(firstSleepData);
        setVisibleData(firstSleepData.slice(-Number(daterangeView)));        
    }, []);

    useEffect(() => {
        if (daterangeView === null) {
            setVisibleData(data);
        } else {
            setVisibleData(data.slice(-Number(daterangeView)));
        }
    }, [daterangeView, data]);

    return (
        <>

            <SleepStatistic
                data={visibleData}
                xDataKey="date"
                yDataKey="totalHours"
                title="Total sleep hours"
                units="hrs"
                color="#4DD9AF"
            />

            <SleepStatistic
                data={visibleData}
                xDataKey="date"
                yDataKey="daytimeHours"
                title="Daytime sleep hours"
                units="hrs"
                color="#f8d604"
            />

            <SleepStatistic
                data={visibleData}
                xDataKey="date"
                yDataKey="nighttimeHours"
                title="Nighttime sleep hours"
                units="hrs"
                color="#10459a"
            />
        </>
    );
};


export default SleepStatistics;