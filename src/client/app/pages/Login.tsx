import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Notification from '../components/Notification/Notification';

export default function Login()
{
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const handleLogin = () =>
    {
        axios({
            method: 'post',
            url: '/api/users/login',
            data: {
                username,
                password
            }
        }).then((response) =>
        {
            if(response.data.success)
            {
                navigate('/dashboard');
            }
            else
            {
                setErrors(response.data.errors);
            }
        });
    };

    return (
        <div id="Login">
            <h1>Login</h1>

            <input
                type="text"
                name="username"
                id="usernameInput"
                placeholder="Username"
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                id="passwordInput"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
            />
            <br />
            <button id="loginButton" onClick={ () => handleLogin() }>Login</button>
            
            {
                errors.map((error, i) =>
                {
                    return <Notification closable={ false } key={ i } type="error">{ error }</Notification>;
                })
            }
        </div>
    );
}
