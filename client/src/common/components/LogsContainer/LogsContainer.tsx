import { useAppDispatch, useAppSelector } from "../../hooks";
import LogEntry from "./LogEntry";
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
                    <LogEntry
                        key={log.id}
                        log={log}
                        editMode={editMode}
                    />
                )}
            </div>
        </div>
    );
};


export default LogsContainer;