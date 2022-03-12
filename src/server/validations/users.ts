import { body } from 'express-validator';
import User from '../models/User';

const passwordConfirmation = body('passwordConfirmation').custom((value, { req }) =>
{
    if (value !== req.body.password)
    {
        throw new Error('Passwords do not match');
    }

    return true;
});

const allreadyExits = body('username').custom((value) =>
{
    return User.findOne({ username: value }).then(user =>
    {
        if(user)
        {
            return Promise.reject('User already exists!');
        }
    });
});

const password = body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be stronger');

const username = body('username')
    .isEmail()
    .withMessage('Username must be an email adress!');

export default {
    passwordConfirmation,
    allreadyExits,
    password,
    username
};
