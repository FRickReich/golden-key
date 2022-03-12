import { Router } from 'express';
import controllers from '../../controllers';
import validations from './../../validations';
import middlewares from './../../middlewares';

const router = Router();

router.route('/').post(
    validations.users.password,
    validations.users.passwordConfirmation,
    validations.users.allreadyExits,
    validations.users.username,
    controllers.users.signup
);

router.route('/login').post(
    controllers.users.login
);

router.route('/auth').post(
    middlewares.users.authorize,
    controllers.users.authorize
);

router.route('/logout').post(
    controllers.users.logout
);

export default router;
