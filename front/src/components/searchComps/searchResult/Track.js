import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateSelectedTrackURIs} from "../../../features/spotifyStore";
import toReadableTime from "../../../plugins/toReadableTime";

function Track({artists, duration, explicit, uri, id, name, listen, index, selectedTracks, added}) {

    const dispatch = useDispatch();
    const audioRef = useRef();
    const selectTrack = (id) => {
        dispatch(updateSelectedTrackURIs(id))
    }
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (listen) {
            let audio = audioRef.current;
            if (audio) {
                audio.load();
            }
        }
    }, [listen])
    const audioPlayer = (id) => {
        const audio = document.getElementById(id);
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
            setPlaying(true);
            setTimeout(() => {
                setPlaying(false);
            }, 30000)
        } else {
            setPlaying(false);
            audio.pause();
        }
    }

    return (
        <div
             className={`text-white relative m-1 cursor-pointer ${selectedTracks.includes(uri) ? "bg-green-900" : "bg-neutral-900"} items-center track-styling mb-2 sm:mb-5 grid grid-flow-col auto-cols-mobileTrack sm:auto-cols-track`}>
            <p className="text-neutral-400 w-max text-xs sm:text-base">{index + 1}</p>
            <div className="absolute bg-transparent top-0 bottom-0 left-0 right-0 w-full h-full"
                 onClick={() => selectTrack(uri)}>
            </div>
            <div className="flex flex-col truncate">
                <p className="flex whitespace-normal text-xs sm:text-base">{name}
                        {explicit ?
                            <svg className="ml-1 hidden xs:inline min-w-[20px]" width="20px" height="20px" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5"
                                      d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                                      fill="#fff"/>
                                <path
                                    d="M8.25 8C8.25 7.0335 9.0335 6.25 10 6.25H15C15.4142 6.25 15.75 6.58579 15.75 7C15.75 7.41421 15.4142 7.75 15 7.75H10C9.86193 7.75 9.75 7.86193 9.75 8V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9.75V16C9.75 16.1381 9.86193 16.25 10 16.25H15C15.4142 16.25 15.75 16.5858 15.75 17C15.75 17.4142 15.4142 17.75 15 17.75H10C9.0335 17.75 8.25 16.9665 8.25 16V8Z"
                                    fill="#000"/>
                            </svg> : ""}
                </p>
                <div>
                    {artists && artists.map((el, index) => {
                        return <Link
                            className="text-2xs sm:text-xs inline relative z-10 break-words hover:text-neutral-200"
                            key={index}
                            to={`/artists/${el.id}/albums`}>
                            {el.name}
                            {(index >= 0 && index !== artists.length - 1) && <span>, </span>}
                        </Link>
                    })}
                </div>
            </div>
            {listen ?
                <div className="z-10 w-max" onClick={() => audioPlayer(id)}>
                    {playing ?
                        <svg className="fill-white w-[20px] sm:w-[40px]" width="40px" height="40px" viewBox="0 0 256 256"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M46.677 64.652c0-9.362 7.132-17.387 16.447-17.394 9.315-.007 24.677.007 34.55.007 9.875 0 17.138 7.594 17.138 16.998 0 9.403-.083 119.094-.083 127.82 0 8.726-7.58 16.895-16.554 16.837-8.975-.058-25.349.115-34.963.058-9.614-.058-16.646-7.74-16.646-17.254 0-9.515.11-117.71.11-127.072zm14.759.818s-.09 118.144-.09 123.691c0 5.547 3.124 5.315 6.481 5.832 3.358.518 21.454.47 24.402.47 2.947 0 7.085-1.658 7.167-6.14.08-4.483-.082-119.507-.082-123.249 0-3.742-4.299-4.264-7.085-4.66-2.787-.395-25.796 0-25.796 0l-4.997 4.056zm76.664-.793c.027-9.804 7.518-17.541 17.125-17.689 9.606-.147 25.283.148 35.004.148 9.72 0 17.397 8.52 17.397 17.77s-.178 117.809-.178 127c0 9.192-7.664 17.12-16.323 17.072-8.66-.05-26.354 0-34.991.048-8.638.05-17.98-8.582-18.007-17.783-.027-9.201-.055-116.763-.027-126.566zm16.917.554s-.089 118.145-.089 123.692c0 5.547 3.123 5.314 6.48 5.832 3.359.518 21.455.47 24.402.47 2.948 0 7.086-1.659 7.167-6.141.081-4.482-.08-119.506-.08-123.248 0-3.742-4.3-4.265-7.087-4.66-2.786-.396-25.796 0-25.796 0l-4.997 4.055z"/>
                        </svg>
                        :
                        <svg className="fill-white w-[20px] sm:w-[40px]" width="40px" height="40px" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"/>
                        </svg>
                    }
                    <audio id={id} ref={audioRef} controls className="hidden">
                        <source src={listen} type="audio/mpeg"/>
                    </audio>
                </div> :
                <svg className="fill-white w-[20px] sm:w-[40px] opacity-30 cursor-default" width="40px" height="40px" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"/>
                </svg>
            }
            {added && <p className="w-max hidden sm:block text-xs sm:text-base">{added.split("T")[0]}</p>}
            <p className="w-max text-xs sm:text-base">{toReadableTime(duration)}</p>
        </div>
    );
}

export default Track;