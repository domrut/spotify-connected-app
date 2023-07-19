import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function Album({name, image, releaseDate, artists, id, albumType}) {
    const nav = useNavigate();
    console.log("album rendered")
    return (
        <div onClick={() => nav(`/album/${id}`)}
            className="text-white cursor-pointer album-card p-6 bg-neutral-900 hover:bg-neutral-800 m-2 rounded-lg">
            {image.length !== 0 && <img className="album-card-image" src={image[0].url} loading="lazy" alt=""/>}
            <div className="text-left items-center pt-4">
                <span className="text-sm font-semibold w-full inline-block tracking-wide truncate">{name && name}</span>
            </div>
            <div className="text-neutral-400 flex items-baseline flex-col">
                <div>
                    <span className="text-xs mr-1 whitespace-nowrap">{releaseDate && releaseDate.split("-")[0]} •</span>
                    <span className="text-xs capitalize">{albumType}</span>
                </div>
                <div className="">
                    {artists && artists.map((el, index) => {
                        return <Link className="text-xs break-words hover:text-neutral-200" key={index}
                                     to={`/artist/${el.id}`}>
                            {index !== 0 && <span>, </span>}
                            {el.name}
                        </Link>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Album;