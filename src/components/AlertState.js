import React, { useState } from 'react';
import AlertContext from './alertcontext';

export default function AlertState(props) {
    const [req, setReq] = useState({ message: "" });

    const showalert = (message, timeout = 5000) => {
        setReq({ message: message });

        setTimeout(() => {
            setReq({ message: "" });
        }, timeout);
    };

    return (
        <AlertContext.Provider value={{ req, showalert }}>
            {props.children}
        </AlertContext.Provider>
    );
}
