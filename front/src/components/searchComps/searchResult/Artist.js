import React from 'react';
import {useNavigate} from "react-router";
import followerFormatter from "../../../plugins/followerFormatter"
function Artist({name, id, image, genres, followers}) {
    const nav = useNavigate();
    return (
        <div onClick={() => nav(`/artists/${id}/albums`)}
             className="text-white cursor-pointer relative flex xs:inline w-[90%] xs:w-[160px] sm:w-[220px] h-[60px] 2xs:h-[100px] xs:h-[260px] sm:h-[300px] p-0 xs:p-3 sm:p-6 bg-neutral-900 hover:bg-neutral-800 m-2 mb-4 2xs:mb-0 rounded-lg">
            {image.length !== 0 ?
                <img
                    className="album-card-image min-w-[60px] 2xs:min-w-[100px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:w-[150px] sm:m-auto rounded-md"
                    src={image[0].url} loading="lazy" alt=""/>
                :
                <svg
                    className="fill-neutral-600 w-[60px] h-[60px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:m-auto rounded-md"
                    fill="#000000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"/>
                </svg>
            }
            <div className="truncate flex flex-col justify-evenly pl-2 2xs:p-3 xs:p-0 sm:mt-2">
                <div className="text-left items-center xs:px-0 pt-2 xs:pt-4">
                    <span
                        className="text-xs 2xs:text-sm font-semibold w-full inline-block tracking-wide truncate">{name}</span>
                </div>
                <div className="text-neutral-400 flex items-baseline flex-row 2xs:flex-col xs:p-0">
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