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
            className="text-white cursor-pointer relative flex xs:inline w-[90%] xs:w-[160px] sm:w-[220px] h-[60px] 2xs:h-[100px] xs:h-[260px] sm:h-[300px] p-0 xs:p-3 sm:p-6 bg-neutral-900 hover:bg-neutral-800 m-2 mb-4 2xs:mb-0 rounded-lg">
            {image.length !== 0 &&
                <img
                    className="album-card-image 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} loading="lazy" alt=""/>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm truncate font-semibold w-full inline-block tracking-wide">{name && name}</span>
                </div>
                <div className="text-neutral-400 flex items-baseline flex-row 2xs:flex-col xs:p-0">
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

export default Playlist;