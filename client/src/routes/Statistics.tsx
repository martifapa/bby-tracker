import { ArrowBackIosRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { calculateFeedTimes, calculateSleepHours } from "../common/helpers";
import { useAppSelector } from "../common/hooks"
import Statistic from "../features/statistics/components/Statistic"
import { SleepData } from "../common/types";


const Statistics = () => {
    const [activeFilter, setActiveFilter] = useState('sleep');
    const [daterangeVisible, setDateRangeVisible] = useState(false);
    const [daterangeView, setDaterangeView] = useState<string | null>('7');
    const [data, setData] = useState<SleepData[]>([]);
    const [visibleData, setVisibleData] = useState<SleepData[]>([]);

    const logs = useAppSelector(state => state.logs);

    useEffect(() => {
        let firstData = [];
        if (activeFilter === 'sleep') {
            firstData = calculateSleepHours(logs.logs);
        } else {
            firstData = calculateFeedTimes(logs.logs);
            console.log(firstData)
        }
        setData(firstData);
        setVisibleData(firstData.slice(-Number(daterangeView)));
    }, [activeFilter]);

    useEffect(() => {
        if (daterangeView === null) {
            setVisibleData(data);
        } else {
            setVisibleData(data.slice(-Number(daterangeView)));
        }
    }, [daterangeView, data]);

    const handleFilterChange = (event: React.SyntheticEvent) => {
        const filter = event.currentTarget.getAttribute('value');
        setActiveFilter(filter || 'sleep');
    }

    const toggleDateView = () => {
        setDateRangeVisible(!daterangeVisible);
    }

    const handleDaterangeChange = (event: React.SyntheticEvent) => {
        const value = event.currentTarget.getAttribute('data-value');
        if (value === 'all') {
            setDaterangeView(null);
        } else {
            setDaterangeView(value);
        }
    }

    return (
        <>
            <div className="header-filters">
                <div className="left">
                    <button
                        value="sleep"
                        onClick={handleFilterChange}
                        className={`statistic-filter ${activeFilter === 'sleep' ? 'active' : ''}`}
                    >Sleep</button>
                    <button
                        value="eat"
                        onClick={handleFilterChange}
                        className={`statistic-filter ${activeFilter === 'eat' ? 'active' : ''}`}
                    >Eat</button>
                </div>
                <div className="right">
                    <div className="filter">
                        <p>View</p>
                        <p
                            onClick={toggleDateView}
                            className="selected-option"
                        >
                            {daterangeView === null ? 'All' : `Last ${daterangeView} days`}
                        </p>
                    </div>
                    <div
                        className={`select dropdown ${daterangeVisible ? 'selected' : ''}`}
                        onClick={toggleDateView}
                    >
                        <p onClick={handleDaterangeChange} data-value="7">Last 7 days</p>
                        <p onClick={handleDaterangeChange} data-value="14">Last 14 days</p>
                        <p onClick={handleDaterangeChange} data-value="30">Last 30 days</p>
                        <p onClick={handleDaterangeChange} data-value="all">All</p>
                    </div>
                    <div>
                        <ArrowBackIosRounded
                            onClick={toggleDateView}
                            className={`${daterangeVisible ? 'expand' : 'collapse'}`} />
                    </div>
                </div>
            </div>

            <div className="statistics">
                <Statistic
                    data={visibleData}
                    xDataKey="date"
                    yDataKey="totalHours"
                    title="Total sleep hours"
                    units="hrs"
                    color="#4DD9AF"
                />

                <Statistic
                    data={visibleData}
                    xDataKey="date"
                    yDataKey="daytimeHours"
                    title="Daytime sleep hours"
                    units="hrs"
                    color="#f8d604"
                />

                <Statistic
                    data={visibleData}
                    xDataKey="date"
                    yDataKey="nighttimeHours"
                    title="Nighttime sleep hours"
                    units="hrs"
                    color="#10459a"
                />
            </div>
        </>);
};


export default Statistics;