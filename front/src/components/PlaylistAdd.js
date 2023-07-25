import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import CreatePlaylistForm from "./CreatePlaylistForm";

function PlaylistAdd({user, setRefresh, refresh}) {
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [createdSuccesfully, setCreatedSuccesfully] = useState();
    const inputs = {
        name: useRef(),
        description: useRef()
    }

    const checkboxHandle = () => {
        setIsChecked(!isChecked);
    }
    const createPlaylistHandler = async (e) => {
        e.preventDefault();
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
        setRefresh(!refresh);
        res.error ? setCreatedSuccesfully(false) : setCreatedSuccesfully(true)
    }

    return (
        <>
            {user &&
                <div className="section-styling mb-2">
                    <p className="text-white whitespace-normal text-2xl text-center">Create new playlist</p>
                    {error && <p className="text-red-800 whitespace-normal mt-2 text-base text-center">{error}</p>}
                    {createdSuccesfully ? <p className="text-green-700 whitespace-normal mt-2 text-xl text-center">Playlist created</p> : <p className="text-red-800 mt-2 text-xl text-center">Playlist creation failed</p>}
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