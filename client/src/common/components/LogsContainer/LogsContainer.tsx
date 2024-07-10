import Log from "./Log";

interface Props {
    title: string
}


const LogsContainer = ({ title }: Props) => {
    const logs = [
        {id: 1, emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {id: 2, emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {id: 3, emoji: '😴', main: '19:15', secondary: '33\' ago'},
        {id: 4, emoji: '😴', main: '19:15', secondary: '33\' ago'},
    ]
    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <div className="logs">
                {logs.map(log => 
                    <Log
                        key={log.id}
                        emoji={log.emoji}
                        main={log.main}
                        secondary={log.secondary}/>
                )}
            </div>
        </div>
    );
};


export default LogsContainer;