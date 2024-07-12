import Icon from "@mui/material/Icon";
import { EditRounded, ArrowForwardRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import SummaryStats from "./SummaryStats";
import { useNavigate } from "react-router-dom";


interface Props {
    title: string
}


const SummaryStatsContainer = ({ title }: Props) => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const overlay = document.querySelector('.overlay');
        if (editMode) overlay?.classList.add('active');
        else overlay?.classList.remove('active');
    }, [editMode]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const goToStatsPage = () => {
        navigate('/statistics');
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
                    onClick={goToStatsPage}
                />
            </div>
            <div className="summary-stats">
                <SummaryStats editMode={editMode} toggleEditMode={toggleEditMode} />
            </div>
        </div>
    );
};


export default SummaryStatsContainer;
