import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import aituBridge from "@btsd/aitu-bridge";

interface GetMeResponse {
    name: string;
    lastname: string;
    sign: string;
}

export const Dashboard: React.FunctionComponent = () => {

    const [name, setName] = useState("<username>");
    const history = useHistory();

    async function getMe() {
        try {
            const data = await aituBridge.getMe();
            setName(data.name);
        } catch (e) {
            // handle error
            console.log(e);
        }
    }

    useEffect(() => {
        if (aituBridge.isSupported()) {
            getMe();
        }
    }, []);

    return (
        <div>
            Hello { name }
        </div>
    )
}

export default Dashboard;