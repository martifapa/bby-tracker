import { useAppDispatch, useAppSelector } from "../../hooks";
import Log from "./Log";

interface Props {
    title: string
}


const LogsContainer = ({ title }: Props) => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector(state => state.logs);

    return (
        <div className="logs-wrapper">
            <h2>{title}</h2>
            <div className="logs">
                {logs.logs.map(log => 
                    <Log
                        key={log.id}
                        emoji={log.emoji}
                        label ={log.label}
                        datetime={log.datetime}
                        text={log.text}/>
                )}
            </div>
        </div>
    );
};


export default LogsContainer;