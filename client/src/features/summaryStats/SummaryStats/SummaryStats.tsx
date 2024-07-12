import { toCapitalize } from "../../../common/helpers";
import { useAppSelector } from "../../../common/hooks";
import SummaryStat from "./SummaryStat";


interface Props {
    editMode: boolean,
    toggleEditMode: () => void,
}


const SummaryStats = ({ editMode, toggleEditMode }: Props) => {
    const summaryStats = useAppSelector(state => state.summaryStats);
    
    return (<div className="logs">
        {summaryStats.stats.map(stat => 
            <SummaryStat
            key={stat.title}
            stat={stat} />
        )}
        <div className={`popup__wrapper ${editMode ? 'selected' : ''}`}>
            <div className="summary-stats-popup">
                <button
                    className="close"
                    onClick={toggleEditMode}    
                ></button>
                {summaryStats.stats.map(stat =>
                    <div key={stat.title} className="summary-stat-edit">
                        <div className="summary-stat-edit__icon">
                            <p className="emoji-wrapper small">{stat.emoji}</p>
                            <p>{toCapitalize(stat.title)}</p>
                        </div>
                        <button
                            className="light-button"
                            // onClick={}
                        >Hide</button>
                    </div>
                )}
            </div>
        </div>
        
    </div>);
};


export default SummaryStats;