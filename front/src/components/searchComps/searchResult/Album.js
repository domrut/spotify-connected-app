import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {updateTracks, updateTracksAudioData, updateTrackURIs} from "../../../features/spotifyStore";
import {useDispatch} from "react-redux";

function Album({name, image, releaseDate, artists, id, albumType}) {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const clearStoreAndNavigate = (id) => {
        dispatch(updateTracks([]))
        dispatch(updateTrackURIs([]))
        dispatch(updateTracksAudioData([]))
        nav(`/albums/${id}/tracks`)
    }
    return (
        <div
            className="text-white cursor-pointer overflow-hidden relative flex xs:inline w-[90%] xs:w-[160px] sm:w-[220px] h-[60px] 2xs:h-[100px] xs:h-[260px] sm:h-[300px] p-0 xs:p-3 sm:p-6 bg-neutral-900 hover:bg-neutral-800 m-2 mb-4 2xs:mb-0 rounded-lg">
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
                 onClick={() => clearStoreAndNavigate(id)}>
            </div>
            {image.length !== 0 ?
                <img
                    className="album-card-image 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} loading="lazy" alt=""/>
                :
                <svg
                    className="fill-neutral-600 w-[60px] h-[60px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:m-auto rounded-md"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none"
                          d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-4 8H6c0-3.309 2.691-6 6-6v2c-2.206 0-4 1.794-4 4zm3.993 2a2.007 2.007 0 1 1 0-4.014 2.007 2.007 0 0 1 0 4.014z"/>
                    <circle cx="11.993" cy="11.993" r="2.007"/>
                    <path
                        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="M12 6c-3.309 0-6 2.691-6 6h2c0-2.206 1.794-4 4-4V6z"/>
                </svg>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm font-semibold w-full inline-block tracking-wide truncate">{name && name}</span>
                </div>
                <div className="text-neutral-400 flex items-baseline flex-row 2xs:flex-col xs:p-0">
                    <div>
                        <span
                            className="text-2xs 2xs:text-xs mr-1 whitespace-nowrap">{releaseDate && releaseDate.split("-")[0]} •</span>
                        <span className="text-2xs 2xs:text-xs capitalize hidden 2xs:inline">{albumType}</span>
                    </div>
                    <div className="w-full truncate sm:whitespace-normal">
                        {artists && artists.map((el, index) => {
                            return <Link
                                className="text-2xs 2xs:text-xs inline relative z-10 break-words hover:text-neutral-200"
                                key={index}
                                to={`/artists/${el.id}/albums`}>
                                {el.name}
                                {(index >= 0 && index !== artists.length - 1) && <span>, </span>}
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Album;