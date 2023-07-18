import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import Loader from "./Loader";

function MyTopSpotify() {

    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="flex flex-3 flex-col justify-between section-styling">
            <p className="text-white font-bold text-xl text-center my-6">My top artists</p>
            <div className="flex-wrap flex">
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