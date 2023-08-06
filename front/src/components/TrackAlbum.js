import React from 'react';
import {Link} from "react-router-dom";
import toReadableTime from "../plugins/toReadableTime";
import SpotifyLogo from "../svgs/spotifyLogo";

function TrackAlbum({artists, tracks, type, name, image, copyrights, external_urls, releaseDate, itemDuration}) {

    return (
        <>
            <img className="w-[200px] sm:w-[300px] rounded-md" src={image[0].url} alt=""/>
            <div className="flex flex-col justify-evenly ml-0 xs:ml-10">
                <div className="flex flex-col">
                    <p className="capitalize mb-5">{type}</p>
                    <p className="text-2xl font-bold tracking-wide mb-5 whitespace-normal">{name}</p>
                    <div>
                        {artists && artists.map((el, index) => {
                            return <Link
                                className="text-sm inline break-words hover:text-neutral-200 dark:hover:text-neutral-800"
                                key={index}
                                to={`/artists/${el.id}/albums`}>
                                {el.name}
                                {(index >= 0 && index !== artists.length - 1) && <span>, </span>}
                            </Link>
                        })}
                    </div>
                </div>
                <div className="flex flex-col 2xs:flex-row xs:flex-col my-2 sm:my-0 sm:flex-row [&>*]:mr-2 text-neutral-400 dark:text-neutral-700">
                    <p>{releaseDate}</p>
                    <p>{tracks} songs</p>
                    <p className="whitespace-normal">{toReadableTime(itemDuration).split(":").join(" min ")} sec</p>
                </div>
                <div className="flex items-center">
                    <span className="text-sm mr-2">Listen on</span>
                    <Link to={external_urls} target="_blank">
                        <SpotifyLogo/>
                    </Link>
                </div>
                <p className="text-2xs mb-2 text-neutral-400 dark:text-neutral-700 whitespace-normal">{copyrights[0].text}</p>
            </div>
        </>
    );
}

export default TrackAlbum;