import { ArrowBackIosRounded, CalendarMonthRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import LogEntries from "../features/logs/components/LogEntries";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setLogsView } from "../features/logs/logsSlice";


const Logs = () => {
    const dispatch = useAppDispatch();

    const [logType, setLogType] = useState('all');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const logs = useAppSelector(state => state.logs);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);

    const logTypes = [... new Set(logs.logs.map(log => log.emoji))];

    useEffect(() => {
        dispatch(setLogsView(logs.logs));
    }, []);
    
    const toggleDateFilter = () => {
        setDateFilterVisible(!dateFilterVisible);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDateFilterVisible(false);
        setLogType(event.target.value);
    }

    const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
        setDateRange(dates as [Date | null, Date | null]);
    }

    const applyFilters = () => {
        setDateFilterVisible(false);

        const filteredLogs = logs.logs.filter(log => {
            if (logType !== 'all' && log.emoji !== logType) {
                return false;
            }
            if (startDate && endDate
                && (new Date(log.datetime) <= startDate)
                && (new Date(log.datetime) >= endDate)) {
                    return false;
                }
            if (startDate && new Date(log.datetime) <= startDate) {
                return false;
            }
            return true;
        });
        dispatch(setLogsView(filteredLogs));
    }

    const resetFilters = () => {
        setLogType('all');
        setDateRange([null, null]);
        applyFilters();
    }


    return (
        <>
            <div className="header-filters">
                <div className="filter">
                    <p>Type</p>
                    <select onChange={handleTypeChange}>
                        <option value={"all"}>All</option>
                        {logTypes.map(emoji =>
                            <option key={emoji} value={emoji}>{emoji}</option>
                        )}
                    </select>
                </div>
                <div className="daterange">
                    <div className="filter" onClick={toggleDateFilter}>
                        <p className={`${dateRange[0] ? 'selected' : ''}`} >Daterange</p>
                        <div>
                            <ArrowBackIosRounded className={`${dateFilterVisible ? 'expand' : 'collapse'}`} />
                        </div>
                    </div>

                    <div className={`dropdown ${dateFilterVisible ? 'selected' : ''}`}>
                        <CalendarMonthRounded />
                        <DatePicker
                            dateFormat="dd/MM/yy"
                            selectsRange={true}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            onChange={handleDateRangeChange}
                            isClearable={true}
                            placeholderText=" dd/mm/YY - dd/mm/YY"
                        />
                    </div>
                </div>
                <div className="filter-buttons">
                    <button
                        className="dark-button"
                        onClick={applyFilters}
                    >Apply</button>
                    <button
                        className="dark-button"
                        onClick={resetFilters}
                    >Reset</button>
                </div>
            </div>
            <div className="container full-view">
                <h2>Full log history</h2>
                <LogEntries editMode={false} previewLogs={undefined} logs={logs.view}/>
            </div>
        </>
    );
};


export default Logs;