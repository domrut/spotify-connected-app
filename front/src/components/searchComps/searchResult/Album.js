import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {updateTracks, updateTracksAudioData, updateTrackURIs} from "../../../features/spotifyStore";
import {useDispatch} from "react-redux";
import AlbumImageFiller from "../../../svgs/albumImageFiller";

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
            className="search-result-styling">
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
                 onClick={() => clearStoreAndNavigate(id)}>
            </div>
            {image.length !== 0 ?
                <img
                    className="album-card-image 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} loading="lazy" alt=""/>
                :
                <AlbumImageFiller/>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm font-semibold w-full inline-block tracking-wide truncate">{name && name}</span>
                </div>
                <div className="search-result-text">
                    <div>
                        <span
                            className="text-2xs 2xs:text-xs mr-1 whitespace-nowrap">{releaseDate && releaseDate.split("-")[0]} •</span>
                        <span className="text-2xs 2xs:text-xs capitalize hidden 2xs:inline">{albumType}</span>
                    </div>
                    <div className="w-full truncate sm:whitespace-normal">
                        {artists && artists.map((el, index) => {
                            return <Link
                                className="text-2xs 2xs:text-xs inline relative z-10 break-words hover:text-neutral-200 dark:hover:text-white"
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