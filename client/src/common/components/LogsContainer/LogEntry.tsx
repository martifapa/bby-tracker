import { parseLogText } from "../../helpers/helpers";
import Icon from "@mui/material/Icon";
import { EditRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateLog } from "../../../features/logs/logsSlice";
import { Log } from "../../types";



interface Props {
    log: Log,
    editMode: boolean,
}


const LogEntry = ({ log, editMode }: Props) => {
    const { id, datetime, label, emoji } = log;

    const dispatch = useAppDispatch();
    const pinnedActions = useAppSelector(state => state.quickActions);
    const [time, elapsedTime] = parseLogText(datetime, label);
    const [editable, setEditable] = useState(false);
    const [editedLog, setEditedLog] = useState(log);

    const toggleEditPopup = () => {
        setEditable(!editable);
    }

    const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const datetime = event.target.value;
        setEditedLog({...editedLog, datetime});
    }

    const handleEmojiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const label = '';
        const emoji = event.target.value;
        setEditedLog({...editedLog, emoji, label});
        console.log(editedLog)
    }

    const updateLogEntry = () => {
        toggleEditPopup();
        dispatch(updateLog(editedLog));
    }

    return (
        <div className="log">
            <div className="emoji-wrapper small">
                <p className="emoji">{emoji}</p>
            </div>
            <div className="log-content">
                <p className="log-content__main">{time}</p>
                {label && <p className="log-content__secondary">{`${label} ${elapsedTime}`}</p>}
            </div>
            {editMode &&
                <Icon
                    component={EditRounded}
                    className="edit-log"
                    onClick={toggleEditPopup}
                />}
            <div className={`log__edit-popup__wrapper ${editable ? 'selected' : ''}`}>
                <div className="log__edit-popup">
                    <div className="fieldset">
                        <p>Emoji</p>
                        <select name="emoji" onChange={handleEmojiChange}>
                            {pinnedActions.pinned.map(action =>
                                <option
                                    key={action.id}
                                    value={action.emoji}
                                    selected={action.emoji === log.emoji}    
                                >{action.emoji}</option>
                            )}
                        </select>
                    </div>
                    <div className="fieldset">
                        <p>Time</p>
                        <input
                            name="datetime"
                            type="datetime-local"
                            value={datetime}
                            onChange={handleDatetimeChange}>
                        </input>
                    </div>
                    <div className="popup-buttons">
                        <button
                            className="light-button"
                            onClick={updateLogEntry}
                            >Edit</button>
                        <button
                            className="light-button"
                            onClick={toggleEditPopup}    
                        >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LogEntry;