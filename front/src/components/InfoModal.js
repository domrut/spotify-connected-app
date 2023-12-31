import React from 'react';
import SentCheckmark from "../svgs/sentCheckmark";

function InfoModal() {

    return (
        <>
            <div className="top-0 bottom-0 right-0 left-0 z-20 fixed bg-black opacity-30"></div>
            <div className="fixed w-[200px] p-3 2xs:p-0 2xs:w-[300px] z-[21] h-[300px] sm:w-[500px] rounded-md bg-sectionColor dark:bg-sectionColorLight top-[50%] left-0 right-0 m-auto translate-y-[-50%]">
                    <SentCheckmark info/>
                    <p className="text-white dark:text-black text-center text-xl mt-10">Playlist created</p>
            </div>
        </>
    );
}

export default InfoModal;
