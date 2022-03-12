import { Router } from 'express';

import controllers from './../controllers';

const router = Router();

router.route('/*')
    .get(controllers.frontend);

export default router;
