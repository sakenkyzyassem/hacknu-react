import React, { useState, useEffect } from 'react';

export interface Props {
    name?: string | 'Assem'
}

export const Welcome: React.FunctionComponent<Props> = ({name}) => {

    useEffect(() => {
        
    }, []);

    return (
        <div>
            This is Welcome {name}
        </div>
    )
}

export default Welcome;