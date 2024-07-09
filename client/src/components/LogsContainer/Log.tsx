interface Props {
    emoji: string,
    main: string, 
    secondary: string
}


const Log = ({ emoji, main, secondary }: Props) => {
    return (
        <div className="log">
            <div className="emoji-wrapper small">
                <p className="emoji">{emoji}</p>
            </div>
            <div className="log-content">
                <p className="log-content__main">{main}</p>
                {secondary && <p className="log-content__secondary">({secondary})</p>}
            </div>
        </div>
    );
};


export default Log;