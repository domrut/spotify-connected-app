import React from 'react';
import {Link} from "react-router-dom";
import toReadableTime from "../plugins/toReadableTime";
import SpotifyLogo from "../svgs/spotifyLogo";

function TrackPlaylist({owner, tracks, name, type, image, description, external_urls, itemDuration}) {
    return (
        <>
            <img className="w-[200px] sm:w-[300px] rounded-md mb-5 xs:mb-0" src={image.length !== 0 ? image[0].url: ""} alt=""/>
            <div className="flex flex-col justify-evenly ml-0 xs:ml-10">
                <div className="flex flex-col">
                    <p className="capitalize mb-5">{type}</p>
                    <p className="text-2xl font-bold tracking-wide mb-5 whitespace-normal">{name}</p>
                    <p className="text-sm mb-5 text-neutral-400 whitespace-normal">{description}</p>
                    <div>
                        <Link className="text-sm inline break-words hover:text-neutral-200"
                              to={owner.external_urls.spotify}>
                            {owner.display_name}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col 2xs:flex-row xs:flex-col my-2 sm:my-0 sm:flex-row [&>*]:mr-2 text-neutral-400">
                    <p>{tracks} songs</p>
                    <p className="whitespace-normal">{toReadableTime(itemDuration).split(":").join(" min ")} sec</p>
                </div>
                <div className="flex items-center">
                    <span className="text-sm mr-2">Listen on</span>
                    <Link to={external_urls} target="_blank">
                        <SpotifyLogo/>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default TrackPlaylist;