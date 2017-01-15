import { Router } from 'express';

import tweetController from '../../controllers/tweetController';

const routes: Object = Router();

routes.get('/find', tweetController.read);
routes.post('/create', tweetController.create);
routes.put('/update/:id', tweetController.update);
routes.post('/delete/:id', tweetController.delete);

export default routes;