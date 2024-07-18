import { PrismaClient } from "@prisma/client";
import { Log, LogRequest } from "../types/logs";


const prisma = new PrismaClient();


const getLogs = async (offset: number | undefined=undefined): Promise<Log[]> => {
    const logs = await prisma.logs.findMany({
        orderBy: {
            datetime: 'desc',
        },
        ...(offset && { take: offset }),
    });
    return logs;
}

const createLog = async (log: LogRequest): Promise<Log> => {
    const newLog = await prisma.logs.create({
        data: log
    });
    return newLog;
}

const updateLog = async (log: Log): Promise<Log> => {
    const updatedLog = await prisma.logs.update({
         where: { id: log.id },
         data: { ...log }
    });
    return updatedLog;
}

const deleteLog = async (id: number) => {
    const deletedLog = await prisma.logs.delete({
        where: { id }
    });
}


export default {
    getLogs,
    createLog,
    updateLog,
    deleteLog
}