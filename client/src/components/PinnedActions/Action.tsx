interface Props {
    emoji: string,
    label: string
}


const Action = ({ emoji, label}: Props) => {
    return (
        <div className="pinned-action">
            <div className="emoji-wrapper big">
                <p className="emoji">{emoji}</p>
            </div>
            <p className="action-label">{label}</p>
        </div>
    );
};


export default Action;