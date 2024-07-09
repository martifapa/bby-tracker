import Log from "./Log";

interface Props {
    title: string
}


const LogsContainer = ({ title }: Props) => {
    const logs = [
        {emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {emoji: '😴', main: '19:15', secondary: '33\' ago'},
    ]
    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <div className="logs">
                {logs.map(log => 
                    <Log emoji={log.emoji} main={log.main} secondary={log.secondary}/>
                )}
            </div>
        </div>
    );
};


export default LogsContainer;