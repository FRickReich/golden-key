import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Notification from '../components/Notification/Notification';

export default function Register()
{
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const handleRegistration = () =>
    {
        axios({
            method: 'post',
            url: '/api/users',
            data: {
                username,
                password,
                passwordConfirmation
            }
        }).then((response) =>
        {
            if(response.data.success === true)
            {
                navigate('/login');
            }
            else
            {
                setErrors(response.data.errors);
            }
        });
    };

    return (
        <div id="Register">
            <h1>Registration</h1>

            <input
                type="text"
                name="username"
                id="usernameInput"
                placeholder="Username"
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
            /><br />
            <input
                type="password"
                name="password"
                id="passwordInput"
                placeholder="Password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
            />
            <br />
            <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmationInput"
                placeholder="Repeat Password"
                value={ passwordConfirmation }
                onChange={ (e) => setPasswordConfirmation(e.target.value) }
            />
            <br />
            <button id="loginButton" className={errors.length > 0 && 'err' } onClick={ () => handleRegistration() }>Register</button>

            {
                errors.map((error, i) =>
                {
                    return <Notification closable={ false } key={ i } type="error">{ error }</Notification>;
                })
            }
        </div>
    );
}
