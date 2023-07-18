import React from 'react';

function Album({data}) {
    return (
        <div className="text-white top-artist-card grow shrink-0 basis-44 md:basis-36 1.5xl:basis-52 lg:basis-36 3xl:basis-56 4xl:basis-40 p-6 bg-neutral-900 hover:bg-neutral-800 transition duration-300 ease-in m-2 rounded-lg">
            <img className="top-artist-image" src={data.images[0].url} loading="lazy" alt=""/>
            <p className="text-center pt-4">{data.name}</p>
        </div>
    );
}

export default Album;