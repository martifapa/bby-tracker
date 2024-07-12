import { ArrowBackIosRounded } from "@mui/icons-material";
import { useAppSelector } from "../common/hooks";
import LogEntries from "../features/logs/components/LogEntries";
import { useRef, useState } from "react";


const Logs = () => {
    const toDateRangeInput = useRef<HTMLInputElement>(null);
    const logs = useAppSelector(state => state.logs);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);

    const logTypes = [... new Set(logs.logs.map(log => log.emoji))];

    const toggleDateFilter = () => {
        setDateFilterVisible(!dateFilterVisible);
    }

    const handleDateRangeChange = () => {
        if (toDateRangeInput.current) {
            toDateRangeInput.current.focus();
            const event = new Event('click', { bubbles: true });
            toDateRangeInput.current.dispatchEvent(event);
        }
    }

    return (
        <>
            <div className="filter-logs">
                <div className="filter">
                    <p>Type</p>
                    <select>
                        {logTypes.map(type =>
                            <option key={type} value={type}>{type}</option>
                        )}
                    </select>
                </div>
                <div className="filter">
                    <p>Daterange</p>
                    <div onClick={toggleDateFilter}>
                        <ArrowBackIosRounded className={`${dateFilterVisible ? 'expand' : 'collapse'}`} />
                    </div>
                    <div className={`range-dropdow ${dateFilterVisible ? 'selected' : ''}`}>
                        <div className="filter">
                            <p>From</p>
                            <input
                                type="date" name="date-from" id="date-from"
                                onChange={handleDateRangeChange}
                            />
                        </div>
                        <div className="filter">
                            <p>To</p>
                            <input
                                type="date" name="date-to" id="date-to"
                                ref={toDateRangeInput}
                            />
                        </div>
                    </div>
                </div>
                <button className="dark-button">Apply</button>
            </div>
            <div className="container full-view">
                <h2>Full log history</h2>
                <LogEntries editMode={false} previewLogs={false} />
            </div>
        </>
    );
};


export default Logs;