import Action from "./Action";

const PinnedActions = () => {
    const emojis = [
        {emoji: '😴', label: 'Sleep'},
        {emoji: '🌅', label: 'Wake up'},
        {emoji: '🍼', label: 'Eat'}

        // ,
        // {emoji: '🌅', label: 'Wake up'},
        // {emoji: '🍼', label: 'Eat'},
        // {emoji: '🌅', label: 'Wake up'},
        // {emoji: '🍼', label: 'Eat'},
        // {emoji: '🍼', label: 'Eat'}
    ];

    return (
        <div className="pinned-actions">
            <div className="custom-actions">
                {emojis.map(emoji =>
                    <Action emoji={emoji.emoji} label={emoji.label} />
                )}
            </div>
            <div className="pinned-action new-action">
                <button className="pin-action emoji-wrapper big">
                    <span className="cross"></span>
                </button>
                <p className="action-label">New</p>    
            </div>
        </div>
    );
};


export default PinnedActions;