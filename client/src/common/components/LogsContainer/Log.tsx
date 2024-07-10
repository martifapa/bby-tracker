import { parseLogText } from "../../helpers/helpers";


interface Props {
    emoji: string,
    label: string,
    datetime: string, 
    text: string | undefined
}


const Log = ({ emoji, label, datetime, text }: Props) => {
    const [time, elapsedTime] = parseLogText(datetime, label);
    return (
        <div className="log">
            <div className="emoji-wrapper small">
                <p className="emoji">{emoji}</p>
            </div>
            <div className="log-content">
                <p className="log-content__main">{time}</p>
                {label && <p className="log-content__secondary">{`${label} ${elapsedTime}`}</p>}
            </div>
        </div>
    );
};


export default Log;