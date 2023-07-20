import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function Album({name, image, releaseDate, artists, id, albumType}) {
    const nav = useNavigate();
    return (
        <div
            className="text-white cursor-pointer relative block w-[90%] xs:w-[160px] h-[260px] sm:h-[300px] xs:inline sm:w-[220px] p-0 xs:p-3 sm:p-6 bg-neutral-900 hover:bg-neutral-800 m-2 rounded-lg">
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" onClick={() => nav(`/albums/${id}/tracks`)}>
            </div>
            {image.length !== 0 && <img className="album-card-image m-0 w-full rounded-md" src={image[0].url} loading="lazy" alt=""/>}
            <div className="text-left items-center px-3 xs:px-0 pt-4">
                <span className="text-sm font-semibold w-full inline-block tracking-wide truncate">{name && name}</span>
            </div>
            <div className="text-neutral-400 flex items-baseline flex-col p-3 xs:p-0">
                <div>
                    <span className="text-xs mr-1 whitespace-nowrap">{releaseDate && releaseDate.split("-")[0]} •</span>
                    <span className="text-xs capitalize">{albumType}</span>
                </div>
                <div className="w-full truncate sm:whitespace-normal">
                    {artists && artists.map((el, index) => {
                        return <Link className="text-xs inline relative z-10 break-words hover:text-neutral-200" key={index}
                                    to={`/artists/${el.id}/albums`}>
                            {el.name}
                            {(index >= 0 && index !== artists.length - 1) && <span>, </span>}
                        </Link>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Album;