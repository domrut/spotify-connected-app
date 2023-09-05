import React from 'react';
import {useNavigate} from "react-router";
import {updateTracks, updateTracksAudioData, updateTrackURIs} from "../../../features/spotifyStore";
import {useDispatch} from "react-redux";

function Playlist({name, id, owner, image, trackTotal}) {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const clearStoreAndNavigate = (id) => {
        dispatch(updateTracks([]))
        dispatch(updateTrackURIs([]))
        dispatch(updateTracksAudioData([]))
        nav(`/playlists/${id}/tracks`)
    }

    return (
        <div onClick={() => clearStoreAndNavigate(id)}
            className="search-result-styling">
            {image.length !== 0 &&
                <img
                    className="album-card-image 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} alt=""/>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm truncate font-semibold w-full inline-block tracking-wide">{name && name}</span>
                </div>
                <div className="search-result-text">
                    <div>
                        <span className="text-2xs 2xs:text-xs capitalize">By {owner}</span>
                    </div>
                    <div>
                        <span className="text-2xs 2xs:text-xs capitalize hidden 2xs:inline">Tracks: {trackTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Playlist);