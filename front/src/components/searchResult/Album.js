import React from 'react';

function Album({data}) {
    return (
        <div>
            <p>{data.name}</p>
        </div>
    );
}

export default Album;