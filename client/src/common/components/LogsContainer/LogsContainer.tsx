import { useAppDispatch, useAppSelector } from "../../hooks";
import Log from "./Log";
import Icon from "@mui/material/Icon";
import { EditRounded } from "@mui/icons-material";
import { useState } from "react";

interface Props {
    title: string
}


const LogsContainer = ({ title }: Props) => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector(state => state.logs);
    const [editMode, setEditMode] = useState(false);

    const handleEnableEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <Icon
                component={EditRounded}
                className={`edit-logs ${editMode ? 'selected' : ''}`}
                onClick={handleEnableEditMode}    
            />
            <div className="logs">
                {logs.logs.map(log => 
                    <Log
                        key={log.id}
                        id={log.id}
                        emoji={log.emoji}
                        label ={log.label}
                        datetime={log.datetime}
                        text={log.text}
                        editMode={editMode}
                    />
                )}
            </div>
        </div>
    );
};


export default LogsContainer;