import Icon from "@mui/material/Icon";
import { EditRounded, ArrowForwardRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import SummaryStats from "./SummaryStats";


interface Props {
    title: string
}


const SummaryStatsContainer = ({ title }: Props) => {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const overlay = document.querySelector('.overlay');
        if (editMode) overlay?.classList.add('active');
        else overlay?.classList.remove('active');
    }, [editMode]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <div className="logs-wrapper__icons">
                <Icon
                    component={EditRounded}
                    className={`edit-logs icon ${editMode ? 'selected' : ''}`}
                    onClick={toggleEditMode}
                />
                <Icon
                    component={ArrowForwardRounded}
                    className="goto-logs icon"
                    // onClick={toggleEditMode} //go to page
                />
            </div>
            <div className="summary-stats">
                <SummaryStats editMode={editMode} toggleEditMode={toggleEditMode} />
            </div>
        </div>
    );
};


export default SummaryStatsContainer;
