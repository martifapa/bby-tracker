import express from 'express';
import logsController from '../controllers/logs';


const router = express.Router();


router.route('/logs')
    .get(async (request, response) => {
        const { offset } = request.body;
        const logs = await logsController.getLogs(Number(offset));
        response.status(200).json(logs);
    })
    .post(async (request, response) => {
        const log = request.body;
        const newLog = await logsController.createLog(log);
        response.status(201).json(newLog);
    })
    .delete(async (request, response) => {
        const { id } = request.body;
        await logsController.deleteLog(Number(id));
        response.status(204).end();
    });


export default router;