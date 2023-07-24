import React from 'react';
import {Link} from "react-router-dom";

function Error404() {
    return (
        <div>
            <h1>Page no exist</h1>
            <Link to="/">Go home</Link>
        </div>
    );
}

export default Error404;