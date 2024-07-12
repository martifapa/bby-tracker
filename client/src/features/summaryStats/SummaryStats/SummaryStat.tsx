import { SummaryStatType } from "../../../common/types";
import { toCapitalize } from "../../../common/helpers";


interface Props {
    stat: SummaryStatType,
}

const SummaryStat = ({ stat }: Props) => {
        
    return (
        <div className="log summary-stat">
            <div className="emoji-wrapper small">
                <p className="emoji">{stat.emoji}</p>
            </div>
            <div className="log-content">
                <p className="log-content__main">{toCapitalize(stat.title)}</p>
                <p className="log-content__secondary">
                    | {stat.times} times{stat.total
                        ? <span>({stat.total} total)</span>
                        : null}
                    , every {stat.cadence}
                </p>
            </div>
        </div>
    );
};


export default SummaryStat;