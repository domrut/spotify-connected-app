import React from 'react';
import {useNavigate} from "react-router";
import followerFormatter from "../../../plugins/followerFormatter"
import ArtistFillerImage from "../../../svgs/artistFillerImage";
function Artist({name, id, image, genres, followers, isInArtistPage}) {
    const nav = useNavigate();
    return (
        <div onClick={() => nav(`/artists/${id}/albums`)}
             className={`search-result-styling ${isInArtistPage && ""}`}>
            {image.length !== 0 ?
                <img
                    className="album-card-image min-w-[60px] 2xs:min-w-[100px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} loading="lazy" alt=""/>
                :
                <ArtistFillerImage/>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm font-semibold w-full inline-block tracking-wide truncate">{name}</span>
                </div>
                <div className="search-result-text">
                    <div>
                        <span className="text-2xs 2xs:text-xs mr-1 whitespace-nowrap">Followers: {followerFormatter(followers)}</span>
                    </div>
                    <div className="w-full truncate sm:whitespace-normal hidden 2xs:block">
                        {genres.map((el, index) => {
                            return <span className="text-2xs 2xs:text-xs capitalize inline relative break-words"
                                         key={index}>
                                {el}
                                {(index >= 0 && index !== genres.length - 1) && <span>, </span>}
                            </span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artist;