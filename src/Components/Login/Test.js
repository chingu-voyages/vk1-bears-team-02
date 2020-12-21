import React, { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

const Test = () => {
    const { details, setDetails } = useContext(AuthenticationContext);
    const { auth, setAuth } = useContext(AuthenticationContext);

    var testing = details
    return (
        <div>

            {
                <li> {testing}</li>
                // details.map(detail => (
                //     <li>{detail.username}</li>
                // ))
            }

        </div>
    )
}
export { Test }