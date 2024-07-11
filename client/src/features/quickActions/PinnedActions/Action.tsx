import { useEffect, useState } from "react";
import { getLocalDateTime, parseLogText } from "../../../common/helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { unpinQuickAction } from "../quickActionsSlice";


interface Props {
    id: number,
    emoji: string,
    label: string,
    newActionDDVisibility: boolean,
    visibility: boolean,
    toggleVisibility: (id: number) => void,
    toggleNewActionDD: () => void
}


const Action = ({ id, emoji, label, newActionDDVisibility, visibility, toggleVisibility, toggleNewActionDD}: Props) => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector(state => state.logs.logs);
    
    // const [fullView, setFullView] = useState(false);
    const [datetime, setDatetime] = useState(getLocalDateTime);
    const [logText, setLogText] = useState(() => parseLogText(datetime, label, logs));
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setLogText(parseLogText(datetime, label, logs));
    }, [visibility, datetime, label, logs]);

    useEffect(() => {
        if (!newActionDDVisibility) {
            toggleVisibility(-1);
            // setFullView(false);
        }
    }, [newActionDDVisibility, toggleVisibility])

    const toggleDropdown = () => {
        toggleNewActionDD();
        toggleVisibility(id);
        // setFullView(!fullView);
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
        <div className={`pinned-action ${visibility && !isRemoving ? 'selected' : ''} ${isRemoving ? 'removed' : ''}`}>
            <div
                className="emoji-wrapper big"
                onClick={toggleDropdown}
            >
                <p className="emoji">{emoji}</p>
            </div>
            <p className="action-label">{label}</p>

            <div className={`expand-action ${visibility && !isRemoving ? 'visible' : ''}`}>
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
                        <input placeholder={logText.join(' ')}></input>
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