import React from 'react';

function Track({data}) {
    return (
        <div>
            {/*<img src={data.track.album.images[0].url} loading="lazy" alt=""/>*/}
            {/*<div>*/}
            {/*    {data.track.artists.map((el, index) => {*/}
            {/*        return <a key={index} href={el.external_urls.spotify}>{el.name}</a>*/}
            {/*    })}*/}
            {/*</div>*/}
            {/*<p>{data.track.name}</p>*/}
        </div>
    );
}

export default Track;