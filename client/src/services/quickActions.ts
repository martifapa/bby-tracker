import axios from "axios";
import { QuickAction, QuickActionRequest } from "../common/types";
import { BASE_URL_ACTIONS, BASE_URL_LOGS } from "../common/constants";


const getActions = async (): Promise<QuickAction[]> => {
    const response = await axios.get(BASE_URL_LOGS);
    return response.data;
}

const createQuickAction = async (quickAction: QuickActionRequest): Promise<QuickAction> => {
    console.log('SERVICES', quickAction)
    try {

        const response = await axios.post(
            BASE_URL_ACTIONS,
            quickAction
        );
        console.log('SERVICES', response)
        return response.data as QuickAction;
    } catch (error) {
        console.error('Error creating quick action:', error);
        throw error;
    }
}


export default {
    getActions,
    createQuickAction
}