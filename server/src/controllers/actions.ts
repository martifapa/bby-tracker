import { PrismaClient } from "@prisma/client";
import { Action, ActionPostRequest } from "../types/actions";


const prisma = new PrismaClient();


const getActions = async (): Promise<Action[]> => {
    const actions = await prisma.actions.findMany({});
    return actions;
}

const createAction = async (action: ActionPostRequest): Promise<Action> => {
    const newAction = await prisma.actions.create({
        data: action
    });
    return newAction;
}

const deleteAction = async (id: number) => {
    const deletedAction = await prisma.actions.delete({
        where: { id }
    });
}


export default {
    getActions,
    createAction,
    deleteAction
}