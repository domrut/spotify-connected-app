import React from 'react';

function Artist({data}) {
    return (
        <div>
            <p>{data.name}</p>
        </div>
    );
}

export default Artist;