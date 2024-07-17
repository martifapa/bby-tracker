import { ArrowBackIosRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAppSelector } from "../common/hooks";
import EatStatistics from "../features/statistics/components/EatStatistics";
import SleepStatistics from "../features/statistics/components/SleepStatistics";


const Statistics = () => {
    const [activeFilter, setActiveFilter] = useState('sleep');
    const [daterangeVisible, setDateRangeVisible] = useState(false);
    const [daterangeView, setDaterangeView] = useState<string | null>('7');

    const logs = useAppSelector(state => state.logs);



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

                {
                    activeFilter === 'sleep'
                        ? <SleepStatistics 
                            daterangeView={daterangeView}
                            logs={logs.logs}
                        />
                        : <EatStatistics
                            daterangeView={daterangeView}
                            logs={logs.logs}
                        />
                }

            </div>
        </>);
};


export default Statistics;