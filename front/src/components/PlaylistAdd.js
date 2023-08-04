import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import CreatePlaylistForm from "./CreatePlaylistForm";
import InfoModal from "./InfoModal";

function PlaylistAdd({user, setRefresh, refresh}) {
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [createdSuccesfully, setCreatedSuccesfully] = useState(false);
    const inputs = {
        name: useRef(),
        description: useRef()
    }

    const checkboxHandle = () => {
        setIsChecked(!isChecked);
    }
    const createPlaylistHandler = async (e) => {
        e.preventDefault();
        setError("")
        if (inputs.name.current.value === "") return setError("Enter your full name");
        const res = await http.post("createPlaylist",
            {
                id: user,
                data: {
                    "name": inputs.name.current.value,
                    "description": inputs.description.current.value,
                    "public": isChecked
                },
                token: sessionStorage.getItem("token")
            }
        );
        res.error ? setCreatedSuccesfully(false) : setCreatedSuccesfully(true)
        setRefresh(!refresh);
        setTimeout(() => {
            setCreatedSuccesfully(false)
        }, 2000)
    }

    return (
        <>
            {createdSuccesfully && <InfoModal />}
            {user &&
                <div className="flex flex-col sm:flex-row gap-x-0 sm:gap-x-2">
                    <div className="section-styling mb-2 flex flex-col flex-3">
                        <p className="text-white whitespace-normal font-bold mt-0 sm:mt-10 mb-5 sm:mb-20 tracking-wide text-xl sm:text-[1.75rem] text-center">
                            Create new playlist
                        </p>
                        <div className="text-neutral-300 max-w-xl mx-auto">
                            <p className="whitespace-normal text-md text-center mt-10 sm:mt-0">Playlists you have created before are here for you to add songs.</p>
                            <p className="whitespace-normal text-md text-center my-10">If you wish to create a new playlist you can do that with this form.</p>
                            <p className="whitespace-normal text-md text-center my-10">You need to enter the playlist name, also if you want you can enter the playlist description and make this playlist private if you wish.</p>
                        </div>
                    </div>
                    <div className="section-styling mb-2 flex-3">
                        {error && <p className="text-red-800 whitespace-normal mt-2 text-base text-center">{error}</p>}
                        <CreatePlaylistForm
                            inputs={inputs}
                            createPlaylistHandler={createPlaylistHandler}
                            checkboxHandle={checkboxHandle}
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default PlaylistAdd;