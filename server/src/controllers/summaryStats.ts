import { PrismaClient } from "@prisma/client";
import { SummaryStat } from "../types/summaryStats";


const prisma = new PrismaClient();


const getSummaryStats = async (): Promise<SummaryStat[]> => {
    return await prisma.summaryStats.findMany({});
}

const toggleSummaryStat = async (id: number): Promise<SummaryStat | null> => {
    const summaryStat = await prisma.summaryStats.findUnique({ where: { id }});
    if (summaryStat) {
        const toggledSS = await prisma.summaryStats.update({
            where: { id },
            data: { show: !summaryStat?.show }
        });
        return toggledSS;
    }
    return null;
}


export default {
    getSummaryStats,
    toggleSummaryStat
}