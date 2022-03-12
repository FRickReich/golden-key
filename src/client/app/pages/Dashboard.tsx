import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { UserDataContext } from '../UserDataProvider';

export default function Dashboard()
{
    const { user, setUser } = useContext(UserDataContext);
    
    const navigate = useNavigate();

    useEffect(() =>
    {
        axios({
            method: 'post',
            url: '/api/users/auth',

        }).then((response : any) =>
        {
            setUser({ ...response.data.user, loggedIn: true });

        }).catch((error: AxiosError) =>
        {
            if (error.response?.status === 403)
            {
                navigate('/login');
            }
        });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Willkommen auf deinem Dashboard, { user.username }</h2>
        </div>
    );
}
