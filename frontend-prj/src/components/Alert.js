import React, { useContext } from 'react';
import AlertContext from './alertcontext';

export default function Alert() {
    const { req } = useContext(AlertContext);

    if (!req.message) return null;

    return (
        <div className="alert alert-primary" role="alert">
            {req.message}
        </div>
    );
}
