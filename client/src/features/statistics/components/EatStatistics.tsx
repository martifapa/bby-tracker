import { calculateFeedTimes } from "../../../common/utils/helpers";
import { FeedData, Log } from "../../../common/types";
import EatStatistic from "./EatStatistic";
import { useEffect, useState } from "react";


interface Props {
    daterangeView: string | null,
    logs: Log[]
}


const EatStatistics = ({ daterangeView, logs, }: Props) => {
    const [data, setData] = useState<FeedData[]>([]);
    const [visibleData, setVisibleData] = useState<FeedData[]>([]);

    useEffect(() => {
        const firstEatData = calculateFeedTimes(logs);
        setData(firstEatData);
        setVisibleData(firstEatData.slice(- Number(daterangeView)));
    }, []);

    useEffect(() => {
        if (daterangeView === null) {
            setVisibleData(data);
        } else {
            setVisibleData(data.slice(- Number(daterangeView)));
        }
    }, [data, daterangeView]);

    return (
        <>
            <EatStatistic
                data={visibleData}
                xDataKey="date"
                yDataKey="times"
                title="Takes / day"
                units=""
                color="coral"
                timeBased={false}
            />
            
            <EatStatistic
                data={visibleData}
                xDataKey="date"
                yDataKey="averageSpan"
                title="Time in-between takes"
                units=""
                color="coral"
                timeBased={true}
            />
        </>
    );
};


export default EatStatistics;