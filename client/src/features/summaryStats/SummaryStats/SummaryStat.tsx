import { useAppSelector } from "../../../common/hooks";
import { SummaryStatType } from "../../../common/types";
import { toCapitalize } from "../../../common/utils/general";
import { calculateSummaryStat } from "../../../common/utils/helpers";


interface Props {
    stat: SummaryStatType,
}


const SummaryStat = ({ stat }: Props) => {
    const logs = useAppSelector(state => state.logs);

    const { times, cadence, total } = calculateSummaryStat(logs.logs, stat.label);

    return (
        <div className="log summary-stat">
            <div className="emoji-wrapper small">
                <p className="emoji">{stat.emoji}</p>
            </div>
            <div className="log-content">
                <p className="log-content__main">{toCapitalize(stat.label)}</p>
                <p className="log-content__secondary">
                    | {times} times{total
                        ? <span>&nbsp;({total} total)</span>
                        : null}
                    , every {cadence}
                </p>
            </div>
        </div>
    );
};


export default SummaryStat;