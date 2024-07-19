import { toCapitalize } from "../../../common/utils/general";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import SummaryStat from "./SummaryStat";
import { initializeSummaryStats, toggleSummaryStat } from "../summaryStatsSlice";
import { useEffect } from "react";


interface Props {
    editMode: boolean,
    toggleEditMode: () => void,
}


const SummaryStats = ({ editMode, toggleEditMode }: Props) => {
    const dispatch = useAppDispatch();
    const summaryStats = useAppSelector(state => state.summaryStats);
    const stats = summaryStats.stats.filter(stat => stat.show);

    useEffect(() => {
        dispatch(initializeSummaryStats());
    }, []);

    const handleToggleStat = (id: number) => {
        dispatch(toggleSummaryStat(id));
    }
    
    return (<div className="logs">
        {stats.map(stat => 
            <SummaryStat
            key={stat.label}
            stat={stat} />
        )}
        <div className={`popup__wrapper ${editMode ? 'selected' : ''}`}>
            <div className="summary-stats-popup">
                <button
                    className="close"
                    onClick={toggleEditMode}    
                ></button>
                {summaryStats.stats.map(stat =>
                    <div key={stat.label} className="summary-stat-edit">
                        <div className="summary-stat-edit__icon">
                            <p className="emoji-wrapper small">{stat.emoji}</p>
                            <p>{toCapitalize(stat.label)}</p>
                        </div>
                        <button
                            className="light-button"
                            onClick={() => handleToggleStat(stat.id)}
                        >{stat.show ? 'Hide' : 'Show'}</button>
                    </div>
                )}
            </div>
        </div>
        
    </div>);
};


export default SummaryStats;