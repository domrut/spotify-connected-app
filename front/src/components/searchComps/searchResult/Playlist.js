import React from 'react';
import {Link} from "react-router-dom";

function Playlist({data}) {
    return (
        <Link to={`playlists/${data.id}/tracks`}>
            {data.images.length !== 0 && <img src={data.images[0].url} alt=""/>}
            <p>{data.name}</p>
        </Link>
    );
}

export default Playlist;