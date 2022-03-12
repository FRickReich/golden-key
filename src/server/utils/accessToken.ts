import 'dotenv/config';
import jwt from 'jsonwebtoken';

interface IUserData
{
    username: string;
}

const sign = (data : IUserData) =>
{
    const secret = process.env.SECRET_TOKEN || 'default';

    return jwt.sign(data, secret, { expiresIn: '1800s' });
};

export default { sign };
