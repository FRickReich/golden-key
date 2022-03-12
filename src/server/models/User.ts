import 'dotenv/config';
import { Schema, Document, model } from 'mongoose';
import crypto from 'crypto';

const secret = process.env.SECRET_TOKEN;

interface IUser
{
    username: string;
    password: string;
    lastlogin: Date;
    age: number;
    country: string;
}

export interface IUserModel extends IUser, Document
{
    hashPassword(password : any): string;
    comparePassword(loginPassword : any): boolean;
}

const schema : Schema = new Schema<IUserModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastlogin: { type: Date }, 
    age: { type: Number },
    country: { type: String }
},
{
    timestamps: true,
    toJSON:
    {
        transform: (doc, ret) =>
        {
            delete ret.password;
        }
    }
});

schema.methods.hashPassword = (password : string) : string =>
{
    const hash : string = crypto
        .createHmac('sha256', String(secret))
        .update(password)
        .digest('hex');
    return hash;
};

schema.methods.comparePassword = function (loginPassword : string) : boolean
{
    if(this.password !== this.hashPassword(loginPassword))
    {
        return false;
    }

    return true;
};

const userModel = model<IUserModel>('User', schema, 'users');

export default userModel;
