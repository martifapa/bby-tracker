import express from 'express';
import actions from '../controllers/actions';


const router = express.Router();


router.route('/actions')
    .get(async (_request, response) => {
        const savedActions = await actions.getActions();
        response.status(200).json(savedActions);
    })
    .post(async (request, response) => {
        const actionRequest = request.body;
        const newAction = await actions.createAction(actionRequest);
        response.status(201).json(newAction);
    })
    .delete(async (request, response) => {
        const { id } = request.body;
        await actions.deleteAction(Number(id));
        response.status(204);
    });


export default router;