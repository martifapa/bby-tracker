import axios from "axios";
import { QuickAction, QuickActionRequest } from "../common/types";
import { BASE_URL_ACTIONS } from "../common/constants";


const getActions = async (): Promise<QuickAction[]> => {
    const response = await axios.get(BASE_URL_ACTIONS);
    return response.data;
}

const createQuickAction = async (quickAction: QuickActionRequest): Promise<QuickAction> => {
    try {
        const response = await axios.post(
            BASE_URL_ACTIONS,
            quickAction
        );
        return response.data as QuickAction;
    } catch (error) {
        console.error('Error creating quick action:', error);
        throw error;
    }
}

const deleteQuickAction = async (id: number): Promise<number> => {
    try {
        await axios.delete(
        BASE_URL_ACTIONS,
        { data: { id } }
        );
    } catch (error) {
        console.log('ERROR', error)
    }
    return id;
}

export default {
    getActions,
    createQuickAction,
    deleteQuickAction
}