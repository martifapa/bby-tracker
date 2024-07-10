import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { pinQuickAction } from "../quickActionsSlice";
import Action from "./Action";

const PinnedActions = () => {
    const dispatch = useAppDispatch();
    const pinnedActions = useAppSelector(state => state.quickActions)

    const handlePinNewAction = () => {
        dispatch(pinQuickAction(
            {id: 3, emoji: '🌅', label: 'Eat'}));
    }

    return (
        <div className="pinned-actions">
            <div className="custom-actions">
                {pinnedActions.pinned.map(emoji =>
                    <Action
                        key={emoji.id}
                        id={emoji.id}
                        emoji={emoji.emoji}
                        label={emoji.label} />
                )}
            </div>
            <div className="pinned-action new-action">
                <button
                    className="pin-action emoji-wrapper big"
                    onClick={handlePinNewAction}
                >
                    <span className="cross"></span>
                </button>
                <p className="action-label">New</p>    
            </div>
        </div>
    );
};


export default PinnedActions;