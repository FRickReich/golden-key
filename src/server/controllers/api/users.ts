import 'dotenv/config';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../../utils/logger';
import jwt from 'jsonwebtoken';

import { accessToken } from './../../utils';
import User from '../../models/User';

const signup = (req : Request, res : Response) =>
{
    const { username, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
        return res.status(200).json({
            success: false,
            errors: errors.array().map(err => err.msg)
        });
    }

    const newUser = new User();

    newUser.username = username;
    newUser.password = newUser.hashPassword(password);

    newUser.save()
        .then((user) =>
        {
            const message = `New user ${ user.username } created!`;

            logger.info(message);

            res.status(200).json({
                success: true,
                user,
                message
            });
        });
};

const login = (req: Request, res: Response) =>
{
    const errorMessage = 'Username or Password incorrect';

    const { username, password } = req.body;
    
    User.findOne({ username }).then(foundUser =>
    {
        if(foundUser)
        {
            const token = accessToken.sign({ username: foundUser.username });

            if(foundUser.comparePassword(password))
            {
                res
                    .cookie('access_token', token, {
                        // httpOnly: true,
                        maxAge: 24 * 60 * 60
                    })
                    .status(200)
                    .json({
                        success: true,
                        message: `User '${ foundUser.username }' logged in`
                    });
            }
            else
            {
                res.status(200).json({
                    success: false,
                    errors: [ errorMessage ]
                });
            }
        }
        else
        {
            res.status(200).json({
                success: false,
                errors: [ errorMessage ]
            });
        }
    });
};

const authorize = (req: Request, res: Response) =>
{
    User.findOne({ username: res.locals.user.username }).then(foundUser =>
    {
        if(foundUser)
        {
            res.status(200).json({
                sucess: true,
                user: foundUser,
                message: 'user authenticated'
            });
        }
        else
        {
            res.status(200).json({
                success: false,
                errors: 'Authorization failed'
            });
        }
    });
};

const logout = (req: Request, res: Response) =>
{
    return res
        .clearCookie('access_token')
        .status(200)
        .json({
            sucess: true,
            message: 'User logged out'
        });
};

export default {
    signup,
    login,
    authorize,
    logout
};
