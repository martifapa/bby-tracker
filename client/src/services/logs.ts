import axios from 'axios';
import { Log, LogRequest } from '../common/types';
import { BASE_URL_LOGS } from '../common/constants';


const getLogs = async (offset?: number): Promise<Log[]> => {
    const response = await axios.get(
        BASE_URL_LOGS,
        { data: { offset }}
    );
    return response.data;
}

const createLog = async (log: LogRequest): Promise<Log> => {
    const response = await axios.post(
        BASE_URL_LOGS,
        log
    );
    return response.data;
}

const updateLog = async (log: Log): Promise<Log> => {
    const response = await axios.patch(
        BASE_URL_LOGS,
        log
    );
    return response.data;
}

const deleteLog = async (id: number): Promise<number> => {
    await axios.delete(
        BASE_URL_LOGS,
        { data: { id }}
    );
    return id;
}


export default {
    getLogs,
    createLog,
    updateLog,
    deleteLog
}