import Icon from "@mui/material/Icon";
import { EditRounded, ArrowForwardRounded } from "@mui/icons-material";
import { useState } from "react";


interface Props {
    title: string
}


const SummaryStatsContainer = ({ title }: Props) => {
    const [editMode, setEditMode] = useState(false);

    const handleEnableEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <div className="logs-wrapper__icons">
                <Icon
                    component={EditRounded}
                    className={`edit-logs icon ${editMode ? 'selected' : ''}`}
                    onClick={handleEnableEditMode}
                />
                <Icon
                    component={ArrowForwardRounded}
                    className="goto-logs icon"
                    // onClick={handleEnableEditMode} //go to page
                />
            </div>
            <div className="summary-stats">
                summary-stats
            </div>
        </div>
    );
};


export default SummaryStatsContainer;
