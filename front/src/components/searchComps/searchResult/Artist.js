import React from 'react';

function Artist({data}) {
    return (
        <div>
            <p>{data.name}</p>
            {console.log("artist rendered")}
        </div>
    );
}

export default Artist;