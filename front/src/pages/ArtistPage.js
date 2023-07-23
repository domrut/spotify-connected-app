import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import http from "../plugins/http";
import {updateError, updateArtistAlbums} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import Album from "../components/searchComps/searchResult/Album";
import Loader from "../components/Loader";
import MainArtistHeader from "../components/MainArtistHeader";

function ArtistPage({store}) {
    const params = useParams();
    const dispatch = useDispatch();
    const [artist, setArtist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [relatedArtists, setRelatedArtists] = useState([]);

    useEffect(() => {
        const getArtistAlbums = async () => {
            setIsLoading(true);
            const res = await http.post("getArtistAlbums", {id: params.id, token: sessionStorage.getItem("token")})
            res.error ?
                dispatch(updateError({code: res.error.status, message: res.error.message})) :
                dispatch(updateArtistAlbums(res.data.items))
            const resSecond = await http.post("getArtist", {id: params.id, token: sessionStorage.getItem("token")})
            resSecond.error ?
                dispatch(updateError({code: res.error.status, message: res.error.message})) :
                setArtist(resSecond.data)
            const resThird = await http.post("getRelatedArtists", {id: params.id, token: sessionStorage.getItem("token")})
            resSecond.error ?
                dispatch(updateError({code: res.error.status, message: res.error.message})) :
                setRelatedArtists(resThird.data)
                setIsLoading(false);
        }


        getArtistAlbums().catch(console.error)
    }, [params.id])

    return (
        <>
            {isLoading ? <Loader/> :
                <>
                    <div className="mb-2">
                        {artist.length !== 0 &&
                            <MainArtistHeader
                                relatedArtists={relatedArtists}
                                image={artist.images}
                                name={artist.name}
                                genres={artist.genres}
                                followers={artist.followers}
                                external_urls={artist.external_urls}
                            />
                        }
                    </div>
                    <div className="section-styling">
                        <p className="text-xl text-center mt-10 text-white">Top "{artist.name}" albums</p>
                        <span className="text-center p-0 mb-10 text-xs text-neutral-400 block">(Use search to find more)</span>
                        <div
                            className="flex-wrap block 2xs:flex h-[800px] content-start justify-center max-h-[800px] overflow-y-scroll">
                            {store.artistAlbums.length !== 0 && store.artistAlbums.map((el, index) => {
                                    return <Album
                                        key={index}
                                        name={el.name}
                                        albumType={el.album_type}
                                        releaseDate={el.release_date}
                                        artists={el.artists}
                                        id={el.id}
                                        image={el.images}
                                    />
                                }
                            )}
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default ArtistPage;