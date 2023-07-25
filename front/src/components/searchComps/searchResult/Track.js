import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateSelectedTrackURIs} from "../../../features/spotifyStore";
import toReadableTime from "../../../plugins/toReadableTime";
import ExplicitLogo from "../../../svgs/explicitLogo";
import PauseAudio from "../../../svgs/pauseAudio";
import PlayAudio from "../../../svgs/playAudio";

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
                        {explicit ? <ExplicitLogo />: ""}
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
                <div className="z-10 ml-1 w-max" onClick={() => audioPlayer(id)}>
                    {playing ? <PauseAudio/> : <PlayAudio/>}
                    <audio id={id} ref={audioRef} controls className="hidden">
                        <source src={listen} type="audio/mpeg"/>
                    </audio>
                </div> : <PlayAudio rules={"opacity-30 cursor-default ml-1"}/>
            }
            {added && <p className="w-max hidden sm:block text-xs sm:text-base">{added.split("T")[0]}</p>}
            <p className="w-max text-xs sm:text-base">{toReadableTime(duration)}</p>
        </div>
    );
}

export default Track;