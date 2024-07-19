import axios from 'axios';
import { SummaryStatType } from '../common/types';
import { BASE_URL_STATS } from '../common/constants';


const getSummaryStats = async (): Promise<SummaryStatType[]> => {
    const response = await axios.get(BASE_URL_STATS);
    return response.data;
}

const toggleSummaryStat = async (id: number): Promise<SummaryStatType | null> => {
    const response = await axios.put(
        BASE_URL_STATS,
        { id }
    );
    const result = response.data;
    if (result) return result;
    return null;
}


export default {
    getSummaryStats,
    toggleSummaryStat
}