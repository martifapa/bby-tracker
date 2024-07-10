import { useEffect, useState } from "react";
import { getLocalDateTime, parseLogText } from "../../../common/helpers/helpers";
import { useAppDispatch } from "../../../common/hooks";
import { unpinQuickAction } from "../quickActionsSlice";


interface Props {
    id: number,
    emoji: string,
    label: string,
    toggleNewActionDD: () => void
}


const Action = ({ id, emoji, label, toggleNewActionDD}: Props) => {
    const dispatch = useAppDispatch();
    
    const [fullView, setFullView] = useState(false);
    const [datetime, setDatetime] = useState(getLocalDateTime);
    const [logText, setLogText] = useState(() => parseLogText(datetime, label));
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setLogText(parseLogText(datetime, label));
    }, [fullView]);

    const toggleDropdown = () => {
        toggleNewActionDD();
        setFullView(!fullView);
    }

    const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatetime(getLocalDateTime(event.target.value));
    }

    const handleUnpinQuickAction = (id: number) => {
        setIsRemoving(true);
        setTimeout(() => {
            dispatch(unpinQuickAction(id));
        }, 500);
    }

    const handleCreateLog = () => {
        toggleDropdown();
    }

    return (
        <div className={`pinned-action ${fullView && !isRemoving ? 'selected' : ''} ${isRemoving ? 'removed' : ''}`}>
            <div
                className="emoji-wrapper big"
                onClick={toggleDropdown}
            >
                <p className="emoji">{emoji}</p>
            </div>
            <p className="action-label">{label}</p>

            <div className={`expand-action ${fullView && !isRemoving ? 'visible' : ''}`}>
                <div className="expand-action__wrapper">
                    <button
                         className="light-button"
                        onClick={() => handleUnpinQuickAction(id)}>Remove</button>
                    <div className="log-field log-time">
                        <span>Log time</span>
                        <input
                            type="datetime-local"
                            value={datetime}
                            onChange={handleDatetimeChange}
                        />
                    </div>
                    <div className="log-field log-result">
                        <span>Logged text</span>
                        <input placeholder={logText}></input>
                    </div>
                    <button
                        className="light-button"
                        onClick={handleCreateLog}
                    >Save</button>
                    <button
                        className="light-button"
                        onClick={toggleDropdown}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
};


export default Action;