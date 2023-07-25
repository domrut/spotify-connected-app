import React from 'react';
import followerFormatter from "../plugins/followerFormatter";
import {Link} from "react-router-dom";
import Artist from "./searchComps/searchResult/Artist";
import SpotifyLogo from "../svgs/spotifyLogo";

function MainArtistHeader({relatedArtists, image, name, genres, followers, external_urls}) {
    return (
        <>
            <div className="text-white flex flex-col 1.5md:flex-row">
                <div className="section-styling mb-2 1.5md:mb-0 1.5md:mr-2 flex-2">
                    <img className="w-[200px] sm:w-[300px] m-auto rounded-lg" src={image[0].url} alt={name}/>
                    <div className="mt-10">
                        <p className="text-2xl mb-5">{name}</p>
                        <div className="mb-5">
                            <p className="text-base text-neutral-200 my-2">Genres</p>
                            <span className="text-md text-neutral-500">{genres.join(", ")}</span>
                        </div>
                        <div className="mb-5">
                            <p className="text-base text-neutral-200 my-2">Followers</p>
                            <p className="text-md text-neutral-500">{followerFormatter(followers.total)}</p>
                        </div>
                        <div className="mb-5">
                            <p className="text-base text-neutral-200 my-2">Find them on</p>
                            <Link to={external_urls.spotify} target="_blank">
                                <SpotifyLogo/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="section-styling flex flex-4 flex-col">
                    <p className="text-2xl text-center mb-2">Related artists</p>
                    <div className="flex max-w-[720px] m-auto flex-wrap justify-center">
                        {relatedArtists.artists.slice(0, 5).map((el, index) => {
                            return <Artist
                                key={index}
                                name={el.name}
                                id={el.id}
                                image={el.images}
                                genres={el.genres.slice(0, 2)}
                                followers={el.followers.total}
                                isInArtistPage
                            />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainArtistHeader;