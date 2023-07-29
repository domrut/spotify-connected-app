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
                <div className="section-styling mb-2">
                    <p className="text-white whitespace-normal font-bold tracking-wide my-5 text-2xl text-center">Create new playlist</p>
                    {error && <p className="text-red-800 whitespace-normal mt-2 text-base text-center">{error}</p>}
                    <CreatePlaylistForm
                        inputs={inputs}
                        createPlaylistHandler={createPlaylistHandler}
                        checkboxHandle={checkboxHandle}
                    />
                </div>
            }
        </>
    );
}

export default PlaylistAdd;