import express from 'express';
import summaryStatsController from '../controllers/summaryStats';


const router = express.Router();


router.route('/summaryStats')
    .get(async (_request, response) => {
        const stats = await summaryStatsController.getSummaryStats();
        response.status(200).json(stats);
    })
    .put(async (request, response) => {
        const id = Number(request.body.id);
        const toggled = await summaryStatsController.toggleSummaryStat(id);
        if (toggled) {
            response.status(201).json(toggled);
        } else {
            response.status(204).end();
        }
    });


export default router;