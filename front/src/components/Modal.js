import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateModalMenu} from "../features/hamburgerMenuStore";
import http from "../plugins/http";
import {updateError, updateSelectedTrackURIs, updateTracks} from "../features/spotifyStore";
import SentCheckmark from "../svgs/sentCheckmark";
import {useNavigate} from "react-router";

function Modal({store}) {
    const modalStore =  useSelector(store => store.hamburgerMenuStore)
    const [selectedPlaylist, setSelectedPlaylist] = useState(store.playlists[0].id);
    const nav = useNavigate();
    const [isDataSent, setIsDataSent] = useState(false);
    const dispatch = useDispatch();

    const addToPlaylist = () => {
        setIsDataSent(false);
        for (let i = 0; i < store.selectedTrackURIs.length; i += 100) {
            const chunk = [...store.selectedTrackURIs].slice(i, i + 100);
            const fetchData = async () => {
                const res = await http.post("addItemsToPlaylist",
                    {
                        url: `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks?uris=${chunk.join(",")}`,
                        token: localStorage.getItem("token")
                    }
                );
                if (res.error) {
                    dispatch(updateError({code: res.error.status, message: res.error.message}))
                } else {
                    return res.data
                }
            }
            fetchData().then(dispatch(updateSelectedTrackURIs([])));
            setIsDataSent(true);
        }
    }

    const toPlaylist = () => {
        dispatch(updateModalMenu(!modalStore.modalOpen))
        dispatch(updateTracks([]));
        nav(`/playlists/${selectedPlaylist}/tracks`)
    }

    return (
        <>
            <div onClick={() => dispatch(updateModalMenu(!modalStore.modalOpen))} className="top-0 bottom-0 right-0 left-0 z-20 fixed bg-black opacity-70"></div>
            <div className="fixed w-[200px] p-3 2xs:p-0 2xs:w-[300px] z-[21] h-[400px] sm:w-[500px] rounded-md bg-sectionColor dark:bg-sectionColorLight top-[50%] left-0 right-0 m-auto translate-y-[-50%]">
                    {isDataSent ?
                        <div className="text-center mt-[4rem]">
                            <SentCheckmark />
                            <p className="text-white dark:text-black text-xl my-10">Songs added</p>
                            <button className="rounded-xl transition duration-300 ease-in border-2 border-black bg-green-700 dark:bg-green-500 text-center p-2 sm:p-3 font-semibold tracking-wide w-max hover:bg-green-500 dark:hover:bg-green-700" onClick={toPlaylist}>Go to playlist</button>
                        </div> :
                        <div className="flex flex-col items-center mt-[3rem] sm:mt-[4rem]">
                            <p className="text-white dark:text-black text-base whitespace-normal text-center sm:text-xl my-10">Select the playlist to add songs</p>
                            <div className="playlist_svg">
                                <select className="my-2 sm:w-[250px] w-[180px] mb-14 bg-sectionColor dark:bg-sectionColorLight rounded-md border-2 p-2 border-white dark:border-black text-white dark:text-black" onChange={event => setSelectedPlaylist(event.target.value)} name="playlists"
                                        id="playlists">
                                    {store.playlists.filter(item => item.owner.id === store.currentUser.id).map((el, index) => {
                                        return <option className="bg-sectionColor dark:bg-sectionColorLight text-white dark:text-black" key={index} value={el.id}>{el.name}</option>
                                    })}
                                </select>
                            </div>
                            <button className="rounded-xl transition duration-300 ease-in border-2 border-black bg-green-700 dark:bg-green-500 text-center p-2 sm:p-3 font-semibold tracking-wide w-max hover:bg-green-500 dark:hover:bg-green-700" onClick={addToPlaylist}>Add to play list</button>
                        </div>
                    }
            </div>
        </>
    );
}

export default Modal;
