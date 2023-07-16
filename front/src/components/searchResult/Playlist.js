import React from 'react';
import {Link} from "react-router-dom";

function Playlist({data}) {
    return (
        <Link to={`playlist/${data.id}/tracks`}>
            <img src={data.images[0].url} alt=""/>
            <p>{data.name}</p>
        </Link>
    );
}

export default Playlist;