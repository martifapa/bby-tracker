import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { pinQuickAction } from "../quickActionsSlice";
import Action from "./Action";

const PinnedActions = () => {
    const dispatch = useAppDispatch();
    const pinnedActions = useAppSelector(state => state.quickActions);
    const [visibility, setVisibility] = useState(false);
    const [newQuickAction, setNewQuickAction] = useState({emoji: '😴', label: 'Sleep'});
    const [actionVisibility, setActionVisibility] = useState(-1);

    const handlePinNewAction = () => {
        toggleDropdown();
        dispatch(pinQuickAction(newQuickAction));
    }

    const toggleDropdown = () => {
        setVisibility(!visibility);
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const label = event.target.name;
        const value = event.target.value;
        setNewQuickAction({...newQuickAction, [label]: value})
    }

    const handlePinnedActionVisibility = (id: number) => {
        if (id === actionVisibility) {
            setActionVisibility(-1);
        } else {
            setActionVisibility(id);
        }
    }

    return (
        <div className="pinned-actions">
            <div className="custom-actions">
                {pinnedActions.pinned.map(emoji =>
                    <Action
                        key={emoji.id}
                        id={emoji.id}
                        emoji={emoji.emoji}
                        label={emoji.label}
                        newActionDDVisibility={!visibility}
                        visibility={actionVisibility === emoji.id}
                        toggleVisibility={handlePinnedActionVisibility}
                        toggleNewActionDD={() => setVisibility(false)} />
                )}
            </div>
            <div className="pinned-action new-action">
                <button
                    className="pin-action emoji-wrapper big"
                    onClick={toggleDropdown}
                >
                    <span className="cross"></span>
                </button>
                <p className="action-label">New</p>
                <div className={`expand-create-action__wrapper ${visibility ? 'selected' : ''}`}>
                    <div className="expand-create-action">
                        <div className="fieldset">
                            <p>Select an emoji</p>
                            <input
                                type="text"
                                name="emoji"
                                onChange={handleValueChange}
                                value={newQuickAction.emoji}
                            />
                        </div>
                        <div className="fieldset">
                            <p>Write a title</p>
                            <input
                                type="text"
                                name="label"
                                onChange={handleValueChange}
                                value={newQuickAction.label}
                            />
                        </div>
                        <div className="expand-create-action__buttons">
                            <button
                                className="light-button"
                                onClick={handlePinNewAction}    
                            >Save</button>
                            <button
                                className="light-button"
                                onClick={toggleDropdown}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PinnedActions;