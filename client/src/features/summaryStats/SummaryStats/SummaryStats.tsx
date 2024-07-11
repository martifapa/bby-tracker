

interface Props {
    editMode: boolean,
    // summaryStats: Log[]
}


const SummaryStats = ({ editMode, summaryStats }: Props) => {
    return (<div className="summary-stats">
        {/* {summaryStats.map(log => 
            <SummaryStat />

        )} */}
    </div>);
};


export default SummaryStats;