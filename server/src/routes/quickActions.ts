import express, { response } from 'express';

const router = express.Router();

router.route('/quickActions')
    .get((_request, response) => {
        response.send('get pinned actions');
    })
    .post((_request, response) => {
        response.send('pin new action');
    })
    .delete((_request, response) => {
        response.send('unpin action');
    });

export default router;