import { Router } from 'express';

import tweetsRoutes from './tweets';

const routes: Object = Router();

routes.use('/tweets', tweetsRoutes);

export default routes;
