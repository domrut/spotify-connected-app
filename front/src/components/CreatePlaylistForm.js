import React from 'react';

function CreatePlaylistForm({inputs, createPlaylistHandler, checkboxHandle}) {
    return (
        <form className="flex flex-col max-w-md m-auto [&>label]:mt-5">
            <label htmlFor="name">
                <span className="text-white dark:text-black">Enter name</span>
                <strong><span className="text-red-600 ml-0.5" aria-label="required">*</span></strong>
            </label>
            <input
                className="my-4 outline-none w-full bg-sectionColor dark:bg-sectionColorLight border-b-2 border-white dark:border-black text-white dark:text-black px-2 py-0.5"
                type="text" id="name" name="name" placeholder="Playlist name" ref={inputs.name} required/>
            <label htmlFor="description">
                <span className="text-white dark:text-black">Enter description</span>
            </label>
            <textarea
                className="resize-none my-4 w-full bg-sectionColor dark:bg-sectionColorLight rounded-xl border-2 border-white dark:border-black text-white dark:text-black px-2 py-0.5"
                rows="4" cols="30" id="description" name="description" placeholder="Playlist description"
                ref={inputs.description}/>
            <span>
                            <input className="checked:accent-green-700" type="checkbox" id="checkbox" name="checkbox"
                                   onChange={checkboxHandle}/>
                            <label htmlFor="checkbox">
                                <span className="text-white dark:text-black ml-2">Make playlist private</span>
                            </label>
                        </span>
            <div className="text-center mt-10">
                <button
                    className="rounded-xl transition duration-300 ease-in border-2 border-black bg-green-700 dark:bg-green-500 text-center p-2 sm:p-5 font-semibold tracking-wide w-max hover:bg-green-500 dark:hover:bg-green-700"
                    onClick={(e) => createPlaylistHandler(e)}>Create playlist
                </button>
            </div>
        </form>
    );
}

export default CreatePlaylistForm;