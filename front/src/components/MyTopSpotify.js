import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import Loader from "../plugins/Loader";
import {useNavigate} from "react-router";
import CollapseCaret from "../svgs/collapseCaret";
import {updateError} from "../features/spotifyStore";
import {useDispatch} from "react-redux";

function MyTopSpotify() {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        setLoading(true);
        const request = async () => {
            const res = await http.post("getMyTopArtists", {token: localStorage.getItem("token")});
            if (res.error) {
                dispatch(updateError({code: res.error.status, message: res.error.message}))
            } else {
                setTopArtists(res.data.items);
                setLoading(false);
            }
        }
        request().catch(console.error);
    }, [])

    const hideArtistsHandler = () => {
        setIsShown(!isShown)
    }

    return (
        <div className="flex flex-3 flex-col justify-between section-styling">
            <p className="text-white dark:text-black font-bold text-2xl whitespace-normal text-center my-6">
                My top artists
                <CollapseCaret hideArtistsHandler={hideArtistsHandler} isShown={isShown}/>
            </p>
            <div className={`flex-wrap overflow-hidden transition-all duration-700 md:h-auto flex ${isShown ? "h-[0px]" : "h-[1120px] xs:h-[670px] sm:h-[445px] md:h-auto"}`}>
                {loading && <Loader/>}
                {topArtists && topArtists.map((el, index) => {
                    return <div onClick={() => nav(`/artists/${el.id}/albums`)} className="text-white dark:text-black cursor-pointer top-artist-card grow shrink-0 basis-44 md:basis-36 1.5xl:basis-52 lg:basis-36 3xl:basis-56 4xl:basis-40 p-6 bg-neutral-900 dark:bg-neutral-300 hover:bg-neutral-800 dark:hover:bg-neutral-400 transition duration-300 ease-in m-2 rounded-lg dark:border dark:border-black" key={index}>
                        <img className="top-artist-image" src={el.images[el.images.length - 1].url} loading="lazy" alt=""/>
                        <p className="text-center pt-4">{el.name}</p>
                    </div>
                })}
            </div>
        </div>
    );
}

export default MyTopSpotify;