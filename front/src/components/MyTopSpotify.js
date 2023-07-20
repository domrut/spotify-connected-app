import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import Loader from "./Loader";

function MyTopSpotify() {

    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        setLoading(true);
        const request = async () => {
            const res = await http.post("getMyTopArtists", {token: sessionStorage.getItem("token")
            });
            setTopArtists(res.data.items);
            setLoading(false);
        }
        request().catch(console.error)
    }, [])

    const hideArtistsHandler = () => {
        setIsShown(!isShown)
    }

    return (
        <div className="flex flex-3 flex-col justify-between section-styling">
            <p className="text-white font-bold text-xl whitespace-normal text-center my-6">
                My top artists
                <svg onClick={hideArtistsHandler} className={`fill-white w-8 h-8 inline md:hidden ${isShown ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="down-arrow">
                    <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path>
                </svg>
            </p>
            <div className={`flex-wrap overflow-hidden transition-all duration-700 md:h-auto flex ${isShown ? "h-[0px]" : "h-[1120px] xs:h-[670px] sm:h-[445px] md:h-auto"}`}>
                {loading && <Loader/>}
                {topArtists && topArtists.map((el, index) => {
                    return <div className="text-white top-artist-card grow shrink-0 basis-44 md:basis-36 1.5xl:basis-52 lg:basis-36 3xl:basis-56 4xl:basis-40 p-6 bg-neutral-900 hover:bg-neutral-800 transition duration-300 ease-in m-2 rounded-lg" key={index}>
                        <img className="top-artist-image" src={el.images[el.images.length - 1].url} loading="lazy" alt=""/>
                        <p className="text-center pt-4">{el.name}</p>
                    </div>
                })}
            </div>
        </div>
    );
}

export default MyTopSpotify;