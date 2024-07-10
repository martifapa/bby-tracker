import { parseLogText } from "../../helpers/helpers";
import Icon from "@mui/material/Icon";
import { EditRounded } from "@mui/icons-material";
import { useState } from "react";



interface Props {
    id: number,
    emoji: string,
    label: string,
    datetime: string, 
    text: string | undefined,
    editMode: boolean,
}


const Log = ({ id, emoji, label, datetime, text, editMode }: Props) => {
    const [time, elapsedTime] = parseLogText(datetime, label);
    const [editable, setEditable] = useState(false);

    const toggleEditPopup = () => {
        setEditable(!editable);
    }

    const handleEditLog = (id: number) => {
        setEditable(!editable)
        console.log(id)
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
                    onClick={() => handleEditLog(id)}
                />}
            <div className={`log__edit-popup__wrapper ${editable ? 'selected' : ''}`}>
                <div className="log__edit-popup">
                    <input value={time}></input>
                    {label && 
                        <input
                            type="datetime-local"
                            value={datetime}
                    ></input>}
                    <div className="popup-buttons">
                        <button className="light-button">Edit</button>
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


export default Log;