import React, { useState, useEffect } from 'react';
import socket from 'src/utils/socket';

const Role = () => {
    const [role, setRole] = useState('');
    useEffect(() => {
        socket.on('dealtArchetype', (data: { archetype: string; role: string }) => {
            setRole(data.role);
        });
    }, []);

    return <div className="role">Role: {role}</div>;
};

export default Role;
