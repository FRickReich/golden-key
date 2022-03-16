import React, { useState } from 'react';

import './Notification.scss';

interface INotification
{
    children?: React.ReactNode;
    type: string;
    closable?: boolean;
    key?: number;
}

export = (props : INotification) =>
{
    const [ isClosed, setIsClosed ] = useState(false);

    const handleClose = () : void =>
    {
        setIsClosed(true);
    };

    const notificationType = (type : string) : string =>
    {
        switch(type)
        {
        case 'warning':
            return 'warning';
        case 'success':
            return 'success';
        case 'error':
            return 'error';
        case 'info':
        default:
            return 'info';
        }
    };

    return (
        !isClosed &&
        <div className={`Notification ${ notificationType(props.type) }`}>
            {
                props.closable &&
                <span
                    className="close"
                    onClick={ () => handleClose() }
                >✕</span>
            }
            { props.children }
        </div>
    );
}
